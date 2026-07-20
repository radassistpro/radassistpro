import { createPublicClient, createInsforgeAdmin } from "@/lib/insforge";
import {
  mapTemplateRow,
  type ApplicationFormTemplate,
} from "@/lib/application-form-templates";

export type JobStatus = "published" | "draft" | "archived";

export type JobDepartment =
  | "Marketing / Growth"
  | "PACS Administration"
  | "Teleradiology / Clinical"
  | "Operations"
  | "Account Management"
  | "People / HR"
  | "Technology"
  | "Finance / Admin"
  | "Other";

export type JobLocation =
  | "Remote (India)"
  | "Remote (U.S.)"
  | "Hybrid — Greater Delhi"
  | "Hybrid — New Jersey / U.S."
  | "On-site — Greater Delhi"
  | "On-site — Toms River, NJ"
  | "Flexible / TBD";

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Temporary / Project";

export type Job = {
  id: string;
  slug: string;
  title: string;
  department: JobDepartment;
  location: JobLocation;
  type: JobType;
  status: JobStatus;
  summary: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  lookingFor: string[];
  mustKnowSoftware?: string[];
  importantNote?: string;
  applicationIncludes: string[];
  pay: string;
  benefits: string[];
  postedAt: string;
  featured?: boolean;
  formTemplateId?: string;
  formTemplate?: ApplicationFormTemplate;
};

export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "hired";

export const departments: JobDepartment[] = [
  "Marketing / Growth",
  "PACS Administration",
  "Teleradiology / Clinical",
  "Operations",
  "Account Management",
  "People / HR",
  "Technology",
  "Finance / Admin",
  "Other",
];

export const locations: JobLocation[] = [
  "Remote (India)",
  "Remote (U.S.)",
  "Hybrid — Greater Delhi",
  "Hybrid — New Jersey / U.S.",
  "On-site — Greater Delhi",
  "On-site — Toms River, NJ",
  "Flexible / TBD",
];

export const jobTypes: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Temporary / Project",
];

type JobRow = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  status: string;
  featured: boolean;
  summary: string;
  about: string;
  responsibilities: string[] | null;
  requirements: string[] | null;
  looking_for: string[] | null;
  must_know_software: string[] | null;
  important_note: string | null;
  application_includes: string[] | null;
  pay: string;
  benefits: string[] | null;
  posted_at: string | null;
  form_template_id: string | null;
};

type TemplateRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  fields: unknown;
};

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  return [];
}

export function mapJobRow(row: JobRow, template?: ApplicationFormTemplate): Job {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    department: row.department as JobDepartment,
    location: row.location as JobLocation,
    type: row.employment_type as JobType,
    status: row.status as JobStatus,
    featured: Boolean(row.featured),
    summary: row.summary,
    about: row.about,
    responsibilities: asStringArray(row.responsibilities),
    requirements: asStringArray(row.requirements),
    lookingFor: asStringArray(row.looking_for),
    mustKnowSoftware: asStringArray(row.must_know_software),
    importantNote: row.important_note || undefined,
    applicationIncludes: asStringArray(row.application_includes),
    pay: row.pay,
    benefits: asStringArray(row.benefits),
    postedAt: row.posted_at || new Date().toISOString().slice(0, 10),
    formTemplateId: row.form_template_id || undefined,
    formTemplate: template,
  };
}

async function loadTemplateForJob(
  formTemplateId: string | null,
): Promise<ApplicationFormTemplate | undefined> {
  const client = createPublicClient();
  if (formTemplateId) {
    const { data } = await client.database
      .from("application_form_templates")
      .select("*")
      .eq("id", formTemplateId)
      .maybeSingle();
    if (data) return mapTemplateRow(data as TemplateRow);
  }

  const { data: fallback } = await client.database
    .from("application_form_templates")
    .select("*")
    .eq("slug", "video-editor")
    .maybeSingle();
  return fallback ? mapTemplateRow(fallback as TemplateRow) : undefined;
}

export async function getPublishedJobs(): Promise<Job[]> {
  const client = createPublicClient();
  const { data, error } = await client.database
    .from("jobs")
    .select("*")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("posted_at", { ascending: false });

  if (error) {
    console.error("Failed to load published jobs", error);
    return [];
  }
  return ((data || []) as JobRow[]).map((row) => mapJobRow(row));
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  const client = createPublicClient();
  const { data, error } = await client.database
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return undefined;
  const row = data as JobRow;
  const template = await loadTemplateForJob(row.form_template_id);
  return mapJobRow(row, template);
}

export async function getAllJobSlugs(): Promise<string[]> {
  const jobs = await getPublishedJobs();
  return jobs.map((job) => job.slug);
}

export async function getFormTemplates(): Promise<ApplicationFormTemplate[]> {
  const client = createPublicClient();
  const { data, error } = await client.database
    .from("application_form_templates")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to load form templates", error);
    return [];
  }
  return ((data || []) as TemplateRow[]).map(mapTemplateRow);
}

export async function getAdminJobs(): Promise<Job[]> {
  const admin = createInsforgeAdmin();
  const { data, error } = await admin.database
    .from("jobs")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to load admin jobs", error);
    return [];
  }
  return ((data || []) as JobRow[]).map((row) => mapJobRow(row));
}
