import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/constants";

export function ProcessPreview() {
  return (
    <section className="section-padding bg-surface overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Process"
              title="From first call to active coverage in two to three weeks"
              description="Five documented steps. Most facilities are live within 10–15 business days."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover cursor-pointer"
            >
              Full onboarding roadmap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <FadeIn key={step.step} delay={index * 0.08}>
              <Link
                href="/how-it-works"
                className="group block h-full rounded-2xl border border-border bg-cream-50 p-6 transition-colors hover:border-accent/30 hover:bg-cream-100 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="heading-display text-3xl text-accent/25 transition-colors group-hover:text-accent/40">
                    {step.step}
                  </span>
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-4 heading-section text-lg text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                  {step.description}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
