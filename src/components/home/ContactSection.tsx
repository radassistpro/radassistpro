"use client";

import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/constants";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const submitted = status === "success";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          email: fd.get("email"),
          organization: fd.get("organization"),
          interest: fd.get("interest"),
          message: fd.get("message"),
          source: "home-contact",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section id="contact" className="section-padding bg-cream-50">
      <div className="container-wide">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeIn>
            <SectionHeading
              eyebrow="Get In Touch"
              title="Let's talk about your workflow"
              description="Book a free 15-minute call to scope coverage for your team. We respond within one business day."
            />

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                  Phone
                </p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                  className="mt-2 block text-lg font-medium text-navy-950 hover:text-accent transition-colors cursor-pointer"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 block text-lg font-medium text-navy-950 hover:text-accent transition-colors cursor-pointer"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                  Address
                </p>
                <p className="mt-2 text-lg text-navy-800">{siteConfig.address}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-lg shadow-navy-950/5 lg:p-10">
              {submitted ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Send className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 heading-section text-2xl text-navy-950">
                    Thank you
                  </h3>
                  <p className="mt-3 max-w-sm text-muted">
                    We&apos;ve received your inquiry and will respond within one
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-medium text-navy-800"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-medium text-navy-800"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-navy-800"
                    >
                      Work Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="mb-2 block text-sm font-medium text-navy-800"
                    >
                      Organization
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      required
                      className="w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="interest"
                      className="mb-2 block text-sm font-medium text-navy-800"
                    >
                      Looking for?
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 cursor-pointer"
                    >
                      <option>Virtual PACS Admin Support</option>
                      <option>Prelim Teleradiologist Coverage</option>
                      <option>Both Services</option>
                      <option>Just exploring</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-navy-800"
                    >
                      Anything else?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-950 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending…" : "Book a 15-Minute Call"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  {status === "error" && (
                    <p
                      className="text-center text-sm font-medium text-red-600"
                      role="alert"
                    >
                      {errorMsg}
                    </p>
                  )}

                  <p className="text-center text-xs text-muted">
                    We use your information only to respond to your inquiry and
                    scope coverage.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
