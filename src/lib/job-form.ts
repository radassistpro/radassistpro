import {
  departments,
  jobTypes,
  locations,
  type JobDepartment,
  type JobLocation,
  type JobStatus,
  type JobType,
} from "@/lib/careers";

export type JobFormValues = {
  title: string;
  slug: string;
  department: JobDepartment;
  location: JobLocation;
  employmentType: JobType;
  status: JobStatus;
  featured: boolean;
  summary: string;
  about: string;
  responsibilities: string;
  requirements: string;
  lookingFor: string;
  mustKnowSoftware: string;
  importantNote: string;
  applicationIncludes: string;
  pay: string;
  benefits: string;
  postedAt: string;
};

export const emptyJobForm = (): JobFormValues => ({
  title: "",
  slug: "",
  department: departments[0],
  location: locations[0],
  employmentType: jobTypes[0],
  status: "draft",
  featured: false,
  summary: "",
  about: "",
  responsibilities: "",
  requirements: "",
  lookingFor: "",
  mustKnowSoftware: "",
  importantNote: "",
  applicationIncludes: "",
  pay: "",
  benefits: "",
  postedAt: new Date().toISOString().slice(0, 10),
});

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(value: string[] | null | undefined): string {
  return (value || []).join("\n");
}

type DbJob = {
  title: string;
  slug: string;
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
};

export function dbJobToForm(job: DbJob): JobFormValues {
  return {
    title: job.title,
    slug: job.slug,
    department: job.department as JobDepartment,
    location: job.location as JobLocation,
    employmentType: job.employment_type as JobType,
    status: job.status as JobStatus,
    featured: Boolean(job.featured),
    summary: job.summary,
    about: job.about,
    responsibilities: arrayToLines(job.responsibilities),
    requirements: arrayToLines(job.requirements),
    lookingFor: arrayToLines(job.looking_for),
    mustKnowSoftware: arrayToLines(job.must_know_software),
    importantNote: job.important_note || "",
    applicationIncludes: arrayToLines(job.application_includes),
    pay: job.pay,
    benefits: arrayToLines(job.benefits),
    postedAt: job.posted_at || new Date().toISOString().slice(0, 10),
  };
}

export function formToDbPayload(values: JobFormValues) {
  return {
    title: values.title.trim(),
    slug: values.slug.trim() || slugify(values.title),
    department: values.department,
    location: values.location,
    employment_type: values.employmentType,
    status: values.status,
    featured: values.featured,
    summary: values.summary.trim(),
    about: values.about.trim(),
    responsibilities: linesToArray(values.responsibilities),
    requirements: linesToArray(values.requirements),
    looking_for: linesToArray(values.lookingFor),
    must_know_software: linesToArray(values.mustKnowSoftware),
    important_note: values.importantNote.trim() || null,
    application_includes: linesToArray(values.applicationIncludes),
    pay: values.pay.trim(),
    benefits: linesToArray(values.benefits),
    posted_at: values.postedAt || null,
    updated_at: new Date().toISOString(),
  };
}
