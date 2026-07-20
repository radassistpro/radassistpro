"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import {
  CORE_TEMPLATE_FIELD_IDS,
  FIELD_TYPE_OPTIONS,
  PRESET_FIELDS,
  slugifyTemplateName,
  type ApplicationFormTemplate,
  type FormFieldDefinition,
  type FormFieldType,
} from "@/lib/application-form-templates";

type Props = {
  template?: ApplicationFormTemplate | null;
  onSaved: () => void;
  onCancel: () => void;
};

function emptyTemplate(): Omit<ApplicationFormTemplate, "id"> & { id?: string } {
  return {
    name: "",
    slug: "",
    description: "",
    fields: PRESET_FIELDS.filter((f) =>
      ["firstName", "lastName", "email", "phone", "linkedin", "city", "yearsExperience", "currentComp", "expectedComp", "coverNote", "resume"].includes(
        f.id,
      ),
    ),
  };
}

export function AdminFormTemplateEditor({ template, onSaved, onCancel }: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<FormFieldDefinition[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isEdit = Boolean(template?.id);

  useEffect(() => {
    if (template) {
      setName(template.name);
      setSlug(template.slug);
      setSlugTouched(true);
      setDescription(template.description);
      setFields(template.fields);
    } else {
      const blank = emptyTemplate();
      setName(blank.name);
      setSlug(blank.slug);
      setSlugTouched(false);
      setDescription(blank.description);
      setFields(blank.fields);
    }
    setError("");
  }, [template]);

  function updateField(index: number, patch: Partial<FormFieldDefinition>) {
    setFields((prev) => prev.map((field, i) => (i === index ? { ...field, ...patch } : field)));
  }

  function moveField(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= fields.length) return;
    setFields((prev) => {
      const copy = [...prev];
      [copy[index], copy[next]] = [copy[next], copy[index]];
      return copy;
    });
  }

  function removeField(index: number) {
    const field = fields[index];
    if (CORE_TEMPLATE_FIELD_IDS.includes(field.id as (typeof CORE_TEMPLATE_FIELD_IDS)[number])) {
      setError(`"${field.label}" is a core field and cannot be removed.`);
      return;
    }
    setFields((prev) => prev.filter((_, i) => i !== index));
    setError("");
  }

  function addPreset(presetId: string) {
    const preset = PRESET_FIELDS.find((f) => f.id === presetId);
    if (!preset) return;
    if (fields.some((f) => f.id === preset.id)) {
      setError(`Field "${preset.label}" is already in this template.`);
      return;
    }
    setFields((prev) => [...prev, { ...preset }]);
    setError("");
  }

  function addCustomField() {
    const base = `customField${fields.length + 1}`;
    setFields((prev) => [
      ...prev,
      {
        id: base,
        label: "Custom field",
        type: "text",
        required: true,
        width: "full",
      },
    ]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/form-templates/", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: template?.id,
          name,
          slug: slug || slugifyTemplateName(name),
          description,
          fields,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not save template");
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save template");
    } finally {
      setSaving(false);
    }
  }

  const availablePresets = PRESET_FIELDS.filter((p) => !fields.some((f) => f.id === p.id));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <p className="admin-panel-title">{isEdit ? "Edit form template" : "New form template"}</p>
            <p className="mt-1 text-sm admin-muted">
              Define which fields candidates see when applying to roles using this template.
            </p>
          </div>
        </div>

        <div className="admin-panel-body space-y-8">
          <section className="admin-form-section">
            <h3 className="admin-form-section-title">Template details</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="admin-label">Template name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!slugTouched) setSlug(slugifyTemplateName(e.target.value));
                  }}
                  placeholder="Clinical / PACS"
                  className="admin-input"
                />
              </label>
              <label className="block">
                <span className="admin-label">Slug</span>
                <input
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(slugifyTemplateName(e.target.value));
                  }}
                  placeholder="clinical-pacs"
                  className="admin-input"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="admin-label">Description</span>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="When to use this template"
                className="admin-textarea"
              />
            </label>
          </section>

          <section className="admin-form-section">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="admin-form-section-title">Form fields</h3>
                <p className="admin-hint mt-1">
                  Core fields (name, email, phone, resume) are required in every template.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  className="admin-select"
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      addPreset(e.target.value);
                      e.target.value = "";
                    }
                  }}
                >
                  <option value="">Add preset field…</option>
                  {availablePresets.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.label}
                    </option>
                  ))}
                </select>
                <button type="button" className="admin-btn admin-btn-sm" onClick={addCustomField}>
                  <Plus className="h-3.5 w-3.5" />
                  Custom field
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {fields.map((field, index) => {
                const isCore = CORE_TEMPLATE_FIELD_IDS.includes(
                  field.id as (typeof CORE_TEMPLATE_FIELD_IDS)[number],
                );
                return (
                  <div key={`${field.id}-${index}`} className="rounded-xl border border-white/10 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-white">
                        {field.label || field.id}
                        {isCore && <span className="ml-2 admin-chip">Core</span>}
                      </p>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          className="admin-btn admin-btn-sm admin-btn-ghost"
                          onClick={() => moveField(index, -1)}
                          disabled={index === 0}
                          aria-label="Move up"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn-sm admin-btn-ghost"
                          onClick={() => moveField(index, 1)}
                          disabled={index === fields.length - 1}
                          aria-label="Move down"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        {!isCore && (
                          <button
                            type="button"
                            className="admin-btn admin-btn-sm admin-btn-danger"
                            onClick={() => removeField(index)}
                            aria-label="Remove field"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {!isCore && (
                        <label className="block">
                          <span className="admin-label">Field id</span>
                          <input
                            required
                            value={field.id}
                            onChange={(e) =>
                              updateField(index, {
                                id: e.target.value.replace(/[^a-zA-Z0-9_]/g, ""),
                              })
                            }
                            className="admin-input"
                          />
                        </label>
                      )}
                      <label className="block">
                        <span className="admin-label">Label</span>
                        <input
                          required
                          value={field.label}
                          onChange={(e) => updateField(index, { label: e.target.value })}
                          className="admin-input"
                        />
                      </label>
                      <label className="block">
                        <span className="admin-label">Type</span>
                        <select
                          value={field.type}
                          disabled={isCore && (field.id === "email" || field.id === "resume")}
                          onChange={(e) =>
                            updateField(index, { type: e.target.value as FormFieldType })
                          }
                          className="admin-select"
                        >
                          {FIELD_TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className="admin-label">Width</span>
                        <select
                          value={field.width || "full"}
                          onChange={(e) =>
                            updateField(index, {
                              width: e.target.value as FormFieldDefinition["width"],
                            })
                          }
                          className="admin-select"
                        >
                          <option value="full">Full width</option>
                          <option value="half">Half width</option>
                        </select>
                      </label>
                      <label className="flex items-center gap-3 pt-6 text-sm admin-muted">
                        <input
                          type="checkbox"
                          checked={field.required}
                          disabled={isCore || field.id === "coverNote"}
                          onChange={(e) => updateField(index, { required: e.target.checked })}
                          className="h-4 w-4 rounded accent-[var(--admin-accent)]"
                        />
                        Required field
                      </label>
                      {field.type !== "file" && (
                        <label className="block md:col-span-2">
                          <span className="admin-label">Placeholder</span>
                          <input
                            value={field.placeholder || ""}
                            onChange={(e) => updateField(index, { placeholder: e.target.value })}
                            className="admin-input"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {error && (
            <div className="admin-toast error" role="alert">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save template" : "Create template"}
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
