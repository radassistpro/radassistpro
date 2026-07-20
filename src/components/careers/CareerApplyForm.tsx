"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Job } from "@/lib/careers";
import type { FormFieldDefinition } from "@/lib/application-form-templates";

type Props = {
  job: Job;
};

const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function CareerApplyForm({ job }: Props) {
  const fields = useMemo(
    () => job.formTemplate?.fields ?? [],
    [job.formTemplate?.fields],
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("jobId", job.id);
    fd.set("jobSlug", job.slug);
    fd.set("jobTitle", job.title);

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/careers/apply/", {
        method: "POST",
        body: fd,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not submit your application.");
      }
      setStatus("success");
      form.reset();
      setFileNames({});
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="heading-section mt-4 text-2xl text-navy-950">Application received</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Thank you for applying to <strong>{job.title}</strong>. Our team will review your
          submission and reach out if there is a fit.
        </p>
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <p className="text-sm text-muted">
        Applications are temporarily unavailable for this role. Please check back soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
      <p className="text-xs text-muted">
        Fields marked with <span className="text-accent">*</span> are required.
        {job.formTemplate?.name && (
          <> Form: <strong>{job.formTemplate.name}</strong>.</>
        )}
      </p>
      <DynamicFieldGrid fields={fields} fileNames={fileNames} setFileNames={setFileNames} />

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit application"}
        <ArrowRight className="h-4 w-4" />
      </Button>

      {status === "error" && (
        <p className="text-center text-sm font-medium text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      <p className="text-center text-xs text-muted">
        By applying you agree we may contact you about this role. No account required.
      </p>
    </form>
  );
}

function DynamicFieldGrid({
  fields,
  fileNames,
  setFileNames,
}: {
  fields: FormFieldDefinition[];
  fileNames: Record<string, string>;
  setFileNames: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const nodes: React.ReactNode[] = [];
  let halfBuffer: FormFieldDefinition | null = null;

  function flushHalf() {
    if (!halfBuffer) return;
    nodes.push(
      <DynamicField
        key={halfBuffer.id}
        field={halfBuffer}
        fileNames={fileNames}
        setFileNames={setFileNames}
      />,
    );
    halfBuffer = null;
  }

  for (const field of fields) {
    if (field.width === "half") {
      if (halfBuffer) {
        nodes.push(
          <div key={`${halfBuffer.id}-${field.id}`} className="grid gap-5 sm:grid-cols-2">
            <DynamicField field={halfBuffer} fileNames={fileNames} setFileNames={setFileNames} />
            <DynamicField field={field} fileNames={fileNames} setFileNames={setFileNames} />
          </div>,
        );
        halfBuffer = null;
      } else {
        halfBuffer = field;
      }
      continue;
    }

    flushHalf();
    nodes.push(
      <DynamicField
        key={field.id}
        field={field}
        fileNames={fileNames}
        setFileNames={setFileNames}
      />,
    );
  }

  flushHalf();
  return <>{nodes}</>;
}

function DynamicField({
  field,
  fileNames,
  setFileNames,
}: {
  field: FormFieldDefinition;
  fileNames: Record<string, string>;
  setFileNames: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const label = (
    <span className="mb-2 block text-sm font-medium text-navy-800">
      {field.label}
      {field.required ? (
        <span className="text-accent"> *</span>
      ) : (
        <span className="font-normal text-muted"> (optional)</span>
      )}
    </span>
  );

  const inputClass =
    "w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

  if (field.type === "textarea") {
    return (
      <label className="block">
        {label}
        <textarea
          name={field.id}
          required={field.required}
          rows={field.rows || 4}
          placeholder={field.placeholder}
          className={`${inputClass} resize-none`}
        />
        {field.helpText && <p className="mt-1 text-xs text-muted">{field.helpText}</p>}
      </label>
    );
  }

  if (field.type === "file") {
    const accept = field.accept || RESUME_ACCEPT;
    return (
      <label className="block cursor-pointer">
        {label}
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-cream-50 px-4 py-4 transition-colors hover:border-accent/50">
          <Upload className="h-5 w-5 text-accent" />
          <span className="text-sm text-muted">
            {fileNames[field.id] || field.placeholder || "Upload file — max 5MB"}
          </span>
        </div>
        <input
          type="file"
          name={field.id}
          required={field.required}
          accept={accept}
          className="sr-only"
          onChange={(e) =>
            setFileNames((prev) => ({
              ...prev,
              [field.id]: e.target.files?.[0]?.name ?? "",
            }))
          }
        />
        {field.helpText && <p className="mt-1 text-xs text-muted">{field.helpText}</p>}
      </label>
    );
  }

  return (
    <label className="block">
      {label}
      <input
        name={field.id}
        type={field.type}
        required={field.required}
        placeholder={field.placeholder}
        className={inputClass}
      />
      {field.helpText && <p className="mt-1 text-xs text-muted">{field.helpText}</p>}
    </label>
  );
}
