"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  departments,
  jobTypes,
  locations,
  type JobStatus,
} from "@/lib/careers";
import {
  dbJobToForm,
  emptyJobForm,
  formToDbPayload,
  slugify,
  type JobFormValues,
} from "@/lib/job-form";

type DbJob = Parameters<typeof dbJobToForm>[0] & { id: string };

type Props = {
  job?: DbJob | null;
  onSaved: () => void;
  onCancel: () => void;
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      {children}
      {hint && <p className="admin-hint">{hint}</p>}
    </label>
  );
}

export function AdminJobForm({ job, onSaved, onCancel }: Props) {
  const [values, setValues] = useState<JobFormValues>(emptyJobForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isEdit = Boolean(job?.id);

  useEffect(() => {
    if (job) {
      setValues(dbJobToForm(job));
      setSlugTouched(true);
    } else {
      setValues(emptyJobForm());
      setSlugTouched(false);
    }
    setError("");
  }, [job]);

  function update<K extends keyof JobFormValues>(key: K, value: JobFormValues[K]) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugTouched) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = formToDbPayload(values);
    if (!payload.title) {
      setError("Title is required.");
      setSaving(false);
      return;
    }
    if (!payload.slug) {
      setError("Slug is required.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/careers/", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { id: job!.id, ...payload } : payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not save job");
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save job");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <p className="admin-panel-title">{isEdit ? "Editing role" : "New role"}</p>
            <p className="mt-1 text-sm admin-muted">
              Mirrors the public job page at /careers/[slug]/
            </p>
          </div>
          {isEdit && job?.status === "published" && (
            <a
              href={`/careers/${job.slug}/`}
              target="_blank"
              rel="noreferrer"
              className="admin-btn admin-btn-sm"
            >
              Preview live
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <div className="admin-panel-body space-y-8">
          <section className="admin-form-section">
            <h3 className="admin-form-section-title">Hero & job board listing</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Job title">
                <input
                  required
                  value={values.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Senior Video Editor — AI & Technology"
                  className="admin-input"
                />
              </Field>
              <Field label="URL slug" hint="Used in /careers/your-slug/">
                <input
                  required
                  value={values.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    update("slug", slugify(e.target.value));
                  }}
                  placeholder="senior-video-editor-ai-technology"
                  className="admin-input"
                />
              </Field>
              <Field label="Department">
                <select
                  value={values.department}
                  onChange={(e) =>
                    update("department", e.target.value as JobFormValues["department"])
                  }
                  className="admin-select"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Location">
                <select
                  value={values.location}
                  onChange={(e) => update("location", e.target.value as JobFormValues["location"])}
                  className="admin-select"
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Employment type">
                <select
                  value={values.employmentType}
                  onChange={(e) =>
                    update("employmentType", e.target.value as JobFormValues["employmentType"])
                  }
                  className="admin-select"
                >
                  {jobTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Pay / compensation">
                <input
                  required
                  value={values.pay}
                  onChange={(e) => update("pay", e.target.value)}
                  placeholder="Up to ₹50,000.00 per month"
                  className="admin-input"
                />
              </Field>
              <Field label="Status">
                <select
                  value={values.status}
                  onChange={(e) => update("status", e.target.value as JobStatus)}
                  className="admin-select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </Field>
              <Field label="Posted date">
                <input
                  type="date"
                  value={values.postedAt}
                  onChange={(e) => update("postedAt", e.target.value)}
                  className="admin-input"
                />
              </Field>
            </div>
            <div className="mt-5">
              <Field
                label="Summary"
                hint="Short line on the careers listing page (under the title)."
              >
                <textarea
                  required
                  rows={3}
                  value={values.summary}
                  onChange={(e) => update("summary", e.target.value)}
                  className="admin-textarea"
                />
              </Field>
            </div>
            <label className="mt-4 flex items-center gap-3 text-sm admin-muted">
              <input
                type="checkbox"
                checked={values.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="h-4 w-4 rounded accent-[var(--admin-accent)]"
              />
              Featured role (shown first on careers page)
            </label>
          </section>

          <section className="admin-form-section">
            <h3 className="admin-form-section-title">About the role</h3>
            <Field
              label="About the role"
              hint="Separate paragraphs with a blank line — each becomes its own paragraph on the job page."
            >
              <textarea
                required
                rows={8}
                value={values.about}
                onChange={(e) => update("about", e.target.value)}
                className="admin-textarea"
              />
            </Field>
            <div className="mt-5">
              <Field label="Important note" hint="Optional. Shown in the dark callout box.">
                <textarea
                  rows={3}
                  value={values.importantNote}
                  onChange={(e) => update("importantNote", e.target.value)}
                  className="admin-textarea"
                />
              </Field>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            {(
              [
                ["responsibilities", "Key responsibilities", "Numbered list on the job page."],
                ["requirements", "Required skills & experience", "Bullet list on the job page."],
                ["lookingFor", "What we're looking for", "Bullet list on the job page."],
                ["mustKnowSoftware", "Must-know software", "Shown as tags/chips."],
                ["benefits", "Benefits", "Listed under compensation."],
                [
                  "applicationIncludes",
                  "When applying, include",
                  "Numbered list in the apply section.",
                ],
              ] as const
            ).map(([key, label, hint]) => (
              <div key={key} className="admin-form-section">
                <Field label={label} hint={`One item per line. ${hint}`}>
                  <textarea
                    rows={key === "mustKnowSoftware" ? 4 : 7}
                    value={values[key]}
                    onChange={(e) => update(key, e.target.value)}
                    className="admin-textarea"
                  />
                </Field>
              </div>
            ))}
          </section>

          {error && (
            <div className="admin-toast error" role="alert">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save changes" : "Create job"}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
