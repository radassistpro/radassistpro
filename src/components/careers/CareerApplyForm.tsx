"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Job } from "@/lib/careers";

type Props = {
  job: Job;
};

export function CareerApplyForm({ job }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");

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
      setFileName("");
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
          portfolio and reach out if there is a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" required />
        <Field label="Last name" name="lastName" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" required />
      </div>
      <Field label="LinkedIn URL" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Current city / location" name="city" required />
        <Field label="Years of experience" name="yearsExperience" required placeholder="e.g. 4" />
      </div>
      <Field
        label="Primary editing software"
        name="primarySoftware"
        required
        placeholder="e.g. Adobe Premiere Pro"
      />
      <Field
        label="Portfolio / showreel URL"
        name="portfolioUrl"
        type="url"
        required
        placeholder="https://…"
      />
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-navy-800">
          Links to AI / tech videos you edited
        </span>
        <textarea
          name="videoLinks"
          required
          rows={3}
          placeholder="Paste links, one per line"
          className="w-full resize-none rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Current compensation" name="currentComp" required placeholder="e.g. ₹40,000 / month" />
        <Field label="Expected compensation" name="expectedComp" required placeholder="e.g. ₹50,000 / month" />
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-navy-800">Cover note</span>
        <textarea
          name="coverNote"
          rows={4}
          placeholder="Why this role — and what makes your AI/tech editing distinctive"
          className="w-full resize-none rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </label>

      <label className="block cursor-pointer">
        <span className="mb-2 block text-sm font-medium text-navy-800">Resume (PDF, DOC, DOCX)</span>
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-cream-50 px-4 py-4 transition-colors hover:border-accent/50">
          <Upload className="h-5 w-5 text-accent" />
          <span className="text-sm text-muted">
            {fileName || "Upload resume — max 5MB"}
          </span>
        </div>
        <input
          type="file"
          name="resume"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </label>

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

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-navy-800">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
