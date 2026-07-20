import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createInsforgeAdmin, createPublicClient } from "@/lib/insforge";
import { guardApiRequest, securityErrorResponse } from "@/lib/api-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const MAX_FIELD = 500;
const MAX_NOTE = 4000;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function str(fd: FormData, key: string, max = MAX_FIELD) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    guardApiRequest(request, {
      rateKey: "careers-apply",
      limit: 8,
      windowMs: 60 * 60 * 1000,
    });

    const fd = await request.formData();

    const firstName = str(fd, "firstName");
    const lastName = str(fd, "lastName");
    const email = str(fd, "email");
    const phone = str(fd, "phone");
    const jobId = str(fd, "jobId");
    const city = str(fd, "city");
    const yearsExperience = str(fd, "yearsExperience");
    const primarySoftware = str(fd, "primarySoftware");
    const portfolioUrl = str(fd, "portfolioUrl");
    const videoLinks = str(fd, "videoLinks");
    const currentComp = str(fd, "currentComp");
    const expectedComp = str(fd, "expectedComp");
    const coverNote = str(fd, "coverNote", MAX_NOTE);
    const linkedin = str(fd, "linkedin");

    if (!firstName || !lastName || !email || !phone || !jobId || !portfolioUrl || !videoLinks) {
      return NextResponse.json(
        { ok: false, error: "Please complete all required fields." },
        { status: 422 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email address." },
        { status: 422 },
      );
    }

    const resume = fd.get("resume");
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { ok: false, error: "Please upload your resume." },
        { status: 422 },
      );
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Resume must be 5MB or smaller." },
        { status: 413 },
      );
    }
    if (resume.type && !ALLOWED_TYPES.has(resume.type)) {
      return NextResponse.json(
        { ok: false, error: "Resume must be PDF, DOC, or DOCX." },
        { status: 422 },
      );
    }

    // Confirm job exists and is published (public client)
    const publicClient = createPublicClient();
    const { data: job, error: jobError } = await publicClient.database
      .from("jobs")
      .select("id, status")
      .eq("id", jobId)
      .eq("status", "published")
      .maybeSingle();

    if (jobError || !job) {
      return NextResponse.json(
        { ok: false, error: "This role is no longer accepting applications." },
        { status: 404 },
      );
    }

    const admin = createInsforgeAdmin();
    const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
    const objectKey = `applications/${jobId}/${randomUUID()}-${safeName}`;

    const { data: uploaded, error: uploadError } = await admin.storage
      .from("careers-resumes")
      .upload(objectKey, resume);

    if (uploadError || !uploaded) {
      console.error("Resume upload failed", uploadError);
      return NextResponse.json(
        { ok: false, error: "Could not upload resume. Please try again." },
        { status: 502 },
      );
    }

    const { data: inserted, error: insertError } = await admin.database
      .from("applications")
      .insert([
        {
          job_id: jobId,
          status: "new",
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          linkedin: linkedin || null,
          city,
          years_experience: yearsExperience,
          primary_software: primarySoftware,
          portfolio_url: portfolioUrl,
          video_links: videoLinks,
          current_comp: currentComp,
          expected_comp: expectedComp,
          cover_note: coverNote || null,
          resume_file_name: resume.name,
          resume_key: uploaded.key || objectKey,
          resume_url: uploaded.url || null,
        },
      ])
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("Application insert failed", insertError);
      return NextResponse.json(
        { ok: false, error: "Could not save your application. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: inserted.id });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Career application failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit your application. Please try again." },
      { status: 500 },
    );
  }
}
