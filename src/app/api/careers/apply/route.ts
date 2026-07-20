import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createInsforgeAdmin, createPublicClient } from "@/lib/insforge";
import { guardApiRequest, securityErrorResponse } from "@/lib/api-security";
import {
  mapTemplateRow,
  splitApplicationPayload,
  validateApplicationAgainstTemplate,
} from "@/lib/application-form-templates";

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
    const jobId = str(fd, "jobId");
    if (!jobId) {
      return NextResponse.json(
        { ok: false, error: "This role is no longer accepting applications." },
        { status: 422 },
      );
    }

    const publicClient = createPublicClient();
    const { data: job, error: jobError } = await publicClient.database
      .from("jobs")
      .select("id, status, form_template_id")
      .eq("id", jobId)
      .eq("status", "published")
      .maybeSingle();

    if (jobError || !job) {
      return NextResponse.json(
        { ok: false, error: "This role is no longer accepting applications." },
        { status: 404 },
      );
    }

    let template = null;
    if (job.form_template_id) {
      const { data } = await publicClient.database
        .from("application_form_templates")
        .select("*")
        .eq("id", job.form_template_id)
        .maybeSingle();
      template = data;
    }
    if (!template) {
      const { data } = await publicClient.database
        .from("application_form_templates")
        .select("*")
        .eq("slug", "video-editor")
        .maybeSingle();
      template = data;
    }

    if (!template) {
      return NextResponse.json(
        { ok: false, error: "Application form is not configured for this role." },
        { status: 503 },
      );
    }

    const formTemplate = mapTemplateRow(template);
    const values: Record<string, string> = {};
    for (const field of formTemplate.fields) {
      if (field.type === "file") continue;
      const max = field.id === "coverNote" ? MAX_NOTE : MAX_FIELD;
      values[field.id] = str(fd, field.id, max);
    }

    const resumeField = formTemplate.fields.find((f) => f.type === "file");
    const resume = resumeField ? fd.get(resumeField.id) : fd.get("resume");
    const hasResume = resume instanceof File && resume.size > 0;

    const validationError = validateApplicationAgainstTemplate(
      formTemplate.fields,
      values,
      hasResume,
    );
    if (validationError) {
      return NextResponse.json({ ok: false, error: validationError }, { status: 422 });
    }

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

    const { columns, formResponses } = splitApplicationPayload(formTemplate.fields, values);

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
          first_name: columns.first_name || "",
          last_name: columns.last_name || "",
          email: columns.email || "",
          phone: columns.phone || "",
          linkedin: columns.linkedin || null,
          city: columns.city || "",
          years_experience: columns.years_experience || "",
          primary_software: columns.primary_software || "",
          portfolio_url: columns.portfolio_url || "",
          video_links: columns.video_links || "",
          current_comp: columns.current_comp || "",
          expected_comp: columns.expected_comp || "",
          cover_note: columns.cover_note || null,
          form_responses: formResponses,
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
