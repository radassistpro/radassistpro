import { NextResponse } from "next/server";
import { createInsforgeAdmin } from "@/lib/insforge";
import { requireHrUser } from "@/lib/admin-auth";
import {
  assertTrustedOrigin,
  guardApiRequest,
  readJsonBody,
  securityErrorResponse,
} from "@/lib/api-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JOB_STATUSES = new Set(["draft", "published", "archived"]);

type JobPayload = {
  title?: string;
  slug?: string;
  department?: string;
  location?: string;
  employment_type?: string;
  status?: string;
  featured?: boolean;
  summary?: string;
  about?: string;
  responsibilities?: string[];
  requirements?: string[];
  looking_for?: string[];
  must_know_software?: string[];
  important_note?: string | null;
  application_includes?: string[];
  pay?: string;
  benefits?: string[];
  posted_at?: string | null;
  updated_at?: string;
};

function sanitizePayload(body: JobPayload) {
  const title = body.title?.trim();
  const slug = body.slug?.trim();
  if (!title || !slug) {
    return { error: "Title and slug are required." as const };
  }
  if (body.status && !JOB_STATUSES.has(body.status)) {
    return { error: "Invalid status." as const };
  }

  return {
    data: {
      title,
      slug,
      department: body.department?.trim() || "Other",
      location: body.location?.trim() || "Flexible / TBD",
      employment_type: body.employment_type?.trim() || "Full-time",
      status: body.status || "draft",
      featured: Boolean(body.featured),
      summary: body.summary?.trim() || "",
      about: body.about?.trim() || "",
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      looking_for: Array.isArray(body.looking_for) ? body.looking_for : [],
      must_know_software: Array.isArray(body.must_know_software) ? body.must_know_software : [],
      important_note: body.important_note?.trim() || null,
      application_includes: Array.isArray(body.application_includes)
        ? body.application_includes
        : [],
      pay: body.pay?.trim() || "",
      benefits: Array.isArray(body.benefits) ? body.benefits : [],
      posted_at: body.posted_at || null,
      updated_at: new Date().toISOString(),
    },
  };
}

export async function GET() {
  try {
    await requireHrUser();
    const admin = createInsforgeAdmin();

    const [{ data: jobs }, { data: applications }] = await Promise.all([
      admin.database.from("jobs").select("*").order("updated_at", { ascending: false }),
      admin.database
        .from("applications")
        .select("*, jobs(title, slug)")
        .order("created_at", { ascending: false }),
    ]);

    const appRows = applications || [];
    const counts: Record<string, number> = {};
    for (const app of appRows) {
      counts[app.job_id] = (counts[app.job_id] || 0) + 1;
    }

    return NextResponse.json({
      ok: true,
      jobs: (jobs || []).map((j) => ({ ...j, applicationCount: counts[j.id] || 0 })),
      applications: appRows,
      stats: {
        jobs: (jobs || []).length,
        published: (jobs || []).filter((j) => j.status === "published").length,
        applications: appRows.length,
        newApplications: appRows.filter((a) => a.status === "new").length,
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    assertTrustedOrigin(request);
    guardApiRequest(request, { rateKey: "admin-jobs-write", limit: 60, windowMs: 60 * 60 * 1000 });
    await requireHrUser();
    const body = await readJsonBody<JobPayload>(request, 256_000);
    const parsed = sanitizePayload(body);
    if ("error" in parsed) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 422 });
    }

    const admin = createInsforgeAdmin();
    const { data, error } = await admin.database
      .from("jobs")
      .insert([parsed.data])
      .select("*")
      .maybeSingle();

    if (error) {
      const message =
        error.message?.includes("duplicate") || error.message?.includes("unique")
          ? "A job with this slug already exists."
          : error.message || "Could not create job.";
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, job: data });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Create job failed", err);
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    assertTrustedOrigin(request);
    guardApiRequest(request, { rateKey: "admin-jobs-write", limit: 60, windowMs: 60 * 60 * 1000 });
    await requireHrUser();
    const body = await readJsonBody<JobPayload & { id?: string }>(request, 256_000);
    const id = body.id?.trim();
    if (!id) {
      return NextResponse.json({ ok: false, error: "Job id is required." }, { status: 422 });
    }

    const parsed = sanitizePayload(body);
    if ("error" in parsed) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 422 });
    }

    const admin = createInsforgeAdmin();
    const { data, error } = await admin.database
      .from("jobs")
      .update(parsed.data)
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) {
      const message =
        error.message?.includes("duplicate") || error.message?.includes("unique")
          ? "A job with this slug already exists."
          : error.message || "Could not update job.";
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, job: data });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Update job failed", err);
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  try {
    assertTrustedOrigin(request);
    guardApiRequest(request, { rateKey: "admin-jobs-write", limit: 30, windowMs: 60 * 60 * 1000 });
    await requireHrUser();
    const body = await readJsonBody<{ id?: string }>(request);
    const id = body.id?.trim();
    if (!id) {
      return NextResponse.json({ ok: false, error: "Job id is required." }, { status: 422 });
    }

    const admin = createInsforgeAdmin();
    const { error } = await admin.database.from("jobs").delete().eq("id", id);
    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || "Could not delete job." },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Delete job failed", err);
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
