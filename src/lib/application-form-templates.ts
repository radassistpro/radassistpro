export type FormFieldType = "text" | "email" | "tel" | "url" | "textarea" | "file";

export type FormFieldWidth = "full" | "half";

export type FormFieldDefinition = {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  accept?: string;
  rows?: number;
  width?: FormFieldWidth;
};

export type ApplicationFormTemplate = {
  id: string;
  slug: string;
  name: string;
  description: string;
  fields: FormFieldDefinition[];
};

export const CORE_TEMPLATE_FIELD_IDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "resume",
] as const;

export const COLUMN_FIELD_MAP: Record<string, string> = {
  firstName: "first_name",
  lastName: "last_name",
  email: "email",
  phone: "phone",
  linkedin: "linkedin",
  city: "city",
  yearsExperience: "years_experience",
  primarySoftware: "primary_software",
  portfolioUrl: "portfolio_url",
  videoLinks: "video_links",
  currentComp: "current_comp",
  expectedComp: "expected_comp",
  coverNote: "cover_note",
};

const FIELD_ID_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]*$/;

const FIELD_TYPES = new Set<FormFieldType>(["text", "email", "tel", "url", "textarea", "file"]);

export function slugifyTemplateName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeTemplateFields(raw: unknown): FormFieldDefinition[] {
  if (!Array.isArray(raw)) return [];
  const fields: FormFieldDefinition[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const id = String(row.id || "").trim();
    const label = String(row.label || "").trim();
    const type = String(row.type || "text") as FormFieldType;
    if (!id || !label || !FIELD_TYPES.has(type)) continue;
    fields.push({
      id,
      label,
      type,
      required: Boolean(row.required),
      placeholder: row.placeholder ? String(row.placeholder).slice(0, 200) : undefined,
      helpText: row.helpText ? String(row.helpText).slice(0, 300) : undefined,
      accept: row.accept ? String(row.accept).slice(0, 200) : undefined,
      rows: typeof row.rows === "number" ? Math.min(12, Math.max(2, row.rows)) : undefined,
      width: row.width === "half" ? "half" : "full",
    });
  }
  return fields;
}

export function validateTemplateFields(fields: FormFieldDefinition[]): string | null {
  if (fields.length === 0) return "Add at least one field to the template.";

  const ids = new Set<string>();
  for (const field of fields) {
    if (!FIELD_ID_PATTERN.test(field.id)) {
      return `Invalid field id "${field.id}". Use letters, numbers, and underscores.`;
    }
    if (ids.has(field.id)) {
      return `Duplicate field id "${field.id}".`;
    }
    ids.add(field.id);
    if (!field.label.trim()) {
      return `Field "${field.id}" needs a label.`;
    }
  }

  for (const requiredId of CORE_TEMPLATE_FIELD_IDS) {
    const field = fields.find((f) => f.id === requiredId);
    if (!field) {
      return `Template must include required field: ${requiredId}.`;
    }
    if (!field.required) {
      return `Field "${requiredId}" must be marked required.`;
    }
    if (requiredId === "resume" && field.type !== "file") {
      return "The resume field must be type file.";
    }
    if (requiredId === "email" && field.type !== "email") {
      return "The email field must be type email.";
    }
  }

  return null;
}

export function validateApplicationAgainstTemplate(
  fields: FormFieldDefinition[],
  values: Record<string, string>,
  hasResume: boolean,
): string | null {
  for (const field of fields) {
    if (field.type === "file") {
      if (field.required && !hasResume) {
        return `Please upload your ${field.label.toLowerCase()}.`;
      }
      continue;
    }

    const value = (values[field.id] || "").trim();
    if (field.required && !value) {
      return `Please complete: ${field.label}.`;
    }

    if (value && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Enter a valid email address.";
    }
  }
  return null;
}

export function splitApplicationPayload(
  fields: FormFieldDefinition[],
  values: Record<string, string>,
) {
  const columns: Record<string, string | null> = {};
  const formResponses: Record<string, string> = {};

  for (const field of fields) {
    if (field.type === "file") continue;
    const value = (values[field.id] || "").trim();
    const column = COLUMN_FIELD_MAP[field.id];
    if (column) {
      columns[column] = value || null;
    } else if (value) {
      formResponses[field.id] = value;
    }
  }

  return { columns, formResponses };
}

export const FIELD_TYPE_OPTIONS: { value: FormFieldType; label: string }[] = [
  { value: "text", label: "Short text" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "url", label: "URL" },
  { value: "textarea", label: "Long text" },
  { value: "file", label: "File upload" },
];

export const PRESET_FIELDS: FormFieldDefinition[] = [
  { id: "firstName", label: "First name", type: "text", required: true, width: "half" },
  { id: "lastName", label: "Last name", type: "text", required: true, width: "half" },
  { id: "email", label: "Email", type: "email", required: true, width: "half" },
  { id: "phone", label: "Phone", type: "tel", required: true, width: "half" },
  { id: "linkedin", label: "LinkedIn URL", type: "url", required: true, width: "full" },
  { id: "city", label: "Current city / location", type: "text", required: true, width: "half" },
  { id: "yearsExperience", label: "Years of experience", type: "text", required: true, width: "half" },
  {
    id: "primarySoftware",
    label: "Primary editing software",
    type: "text",
    required: true,
    width: "full",
  },
  {
    id: "portfolioUrl",
    label: "Portfolio / showreel URL",
    type: "url",
    required: true,
    width: "full",
  },
  {
    id: "videoLinks",
    label: "Links to sample work",
    type: "textarea",
    required: true,
    width: "full",
    rows: 3,
  },
  {
    id: "pacsSystems",
    label: "PACS / RIS systems experience",
    type: "textarea",
    required: true,
    width: "full",
    rows: 3,
  },
  {
    id: "certifications",
    label: "Certifications & licenses",
    type: "textarea",
    required: true,
    width: "full",
    rows: 3,
  },
  {
    id: "clinicalBackground",
    label: "Clinical / radiology background",
    type: "textarea",
    required: true,
    width: "full",
    rows: 4,
  },
  {
    id: "relevantExperience",
    label: "Relevant experience",
    type: "textarea",
    required: true,
    width: "full",
    rows: 4,
  },
  {
    id: "toolsPlatforms",
    label: "Tools & platforms",
    type: "text",
    required: true,
    width: "full",
  },
  { id: "currentComp", label: "Current compensation", type: "text", required: true, width: "half" },
  { id: "expectedComp", label: "Expected compensation", type: "text", required: true, width: "half" },
  {
    id: "coverNote",
    label: "Additional information",
    type: "textarea",
    required: false,
    width: "full",
    rows: 4,
  },
  {
    id: "resume",
    label: "Resume (PDF, DOC, DOCX)",
    type: "file",
    required: true,
    width: "full",
    accept: ".pdf,.doc,.docx",
  },
];

export function mapTemplateRow(row: {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  fields: unknown;
}): ApplicationFormTemplate {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description || "",
    fields: normalizeTemplateFields(row.fields),
  };
}
