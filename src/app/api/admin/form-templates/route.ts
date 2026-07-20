import { NextResponse } from "next/server";
import { createInsforgeAdmin } from "@/lib/insforge";
import { requireHrUser } from "@/lib/admin-auth";
import {
  assertTrustedOrigin,
  guardApiRequest,
  readJsonBody,
  securityErrorResponse,
} from "@/lib/api-security";
import {
  mapTemplateRow,
  normalizeTemplateFields,
  slugifyTemplateName,
  validateTemplateFields,
} from "@/lib/application-form-templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TemplatePayload = {
  name?: string;
  slug?: string;
  description?: string;
  fields?: unknown;
};

function sanitizeTemplate(body: TemplatePayload) {
  const name = body.name?.trim();
  if (!name) return { error: "Template name is required." as const };

  const slug = (body.slug?.trim() || slugifyTemplateName(name)).slice(0, 80);
  if (!slug) return { error: "Template slug is required." as const };

  const fields = normalizeTemplateFields(body.fields);
  const fieldError = validateTemplateFields(fields);
  if (fieldError) return { error: fieldError };

  return {
    data: {
      name,
      slug,
      description: body.description?.trim() || "",
      fields,
      updated_at: new Date().toISOString(),
    },
  };
}

export async function GET() {
  try {
    await requireHrUser();
    const admin = createInsforgeAdmin();
    const { data, error } = await admin.database
      .from("application_form_templates")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || "Could not load templates." },
        { status: 500 },
      );
    }

    const templates = (data || []).map((row) => mapTemplateRow(row));
    return NextResponse.json({ ok: true, templates });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    assertTrustedOrigin(request);
    guardApiRequest(request, {
      rateKey: "admin-templates-write",
      limit: 40,
      windowMs: 60 * 60 * 1000,
    });
    await requireHrUser();
    const body = await readJsonBody<TemplatePayload>(request, 128_000);
    const parsed = sanitizeTemplate(body);
    if ("error" in parsed) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 422 });
    }

    const admin = createInsforgeAdmin();
    const { data, error } = await admin.database
      .from("application_form_templates")
      .insert([parsed.data])
      .select("*")
      .maybeSingle();

    if (error) {
      const message =
        error.message?.includes("duplicate") || error.message?.includes("unique")
          ? "A template with this slug already exists."
          : error.message || "Could not create template.";
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, template: mapTemplateRow(data!) });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Create template failed", err);
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    assertTrustedOrigin(request);
    guardApiRequest(request, {
      rateKey: "admin-templates-write",
      limit: 40,
      windowMs: 60 * 60 * 1000,
    });
    await requireHrUser();
    const body = await readJsonBody<TemplatePayload & { id?: string }>(request, 128_000);
    const id = body.id?.trim();
    if (!id) {
      return NextResponse.json({ ok: false, error: "Template id is required." }, { status: 422 });
    }

    const parsed = sanitizeTemplate(body);
    if ("error" in parsed) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 422 });
    }

    const admin = createInsforgeAdmin();
    const { data, error } = await admin.database
      .from("application_form_templates")
      .update(parsed.data)
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) {
      const message =
        error.message?.includes("duplicate") || error.message?.includes("unique")
          ? "A template with this slug already exists."
          : error.message || "Could not update template.";
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, template: mapTemplateRow(data!) });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Update template failed", err);
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  try {
    assertTrustedOrigin(request);
    guardApiRequest(request, {
      rateKey: "admin-templates-write",
      limit: 20,
      windowMs: 60 * 60 * 1000,
    });
    await requireHrUser();
    const body = await readJsonBody<{ id?: string }>(request);
    const id = body.id?.trim();
    if (!id) {
      return NextResponse.json({ ok: false, error: "Template id is required." }, { status: 422 });
    }

    const admin = createInsforgeAdmin();
    const { count } = await admin.database
      .from("jobs")
      .select("id", { count: "exact", head: true })
      .eq("form_template_id", id);

    if ((count || 0) > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "This template is assigned to one or more jobs. Reassign those jobs before deleting.",
        },
        { status: 409 },
      );
    }

    const { error } = await admin.database
      .from("application_form_templates")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || "Could not delete template." },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Delete template failed", err);
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
