import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Briefcase,
  Building2,
  MapPin,
  Banknote,
  AlertTriangle,
} from "lucide-react";
import { CareerApplyForm } from "@/components/careers/CareerApplyForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { getAllJobSlugs, getJobBySlug } from "@/lib/careers";
import { siteConfig } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Role not found" };
  return {
    title: `${job.title} — Careers`,
    description: job.summary,
    alternates: { canonical: `/careers/${job.slug}/` },
  };
}

export default async function CareerJobPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.about,
    datePosted: job.postedAt,
    employmentType: job.type.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "IN",
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        value: 50000,
        unitText: "MONTH",
      },
    },
    url: `${siteConfig.url}/careers/${job.slug}/`,
  };

  return (
    <>
      <JsonLd data={jobSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-16 grain lg:pt-40 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.42_0.11_250_/_0.3),transparent_50%)]" />
        <div className="container-wide relative px-5 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
              Careers · {job.department}
            </p>
            <h1 className="heading-display mt-5 max-w-4xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] text-white">
              {job.title}
            </h1>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-400" />
                {job.type}
              </span>
              <span className="inline-flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-400" />
                {job.department}
              </span>
              <span className="inline-flex items-center gap-2">
                <Banknote className="h-4 w-4 text-blue-400" />
                {job.pay}
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding-tight bg-cream-50">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)] lg:gap-16 xl:gap-20">
            {/* Editorial column */}
            <div className="min-w-0 space-y-14">
              <FadeIn>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                    About the role
                  </p>
                  <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed text-navy-800">
                    {job.about.split("\n\n").map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {job.importantNote && (
                <FadeIn>
                  <aside className="flex gap-4 border border-navy-900/10 bg-navy-950 px-6 py-5 text-white">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                        Important
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        {job.importantNote}
                      </p>
                    </div>
                  </aside>
                </FadeIn>
              )}

              <FadeIn>
                <SectionBlock title="Key responsibilities" items={job.responsibilities} numbered />
              </FadeIn>

              <FadeIn>
                <SectionBlock title="Required skills & experience" items={job.requirements} />
              </FadeIn>

              <FadeIn>
                <SectionBlock title="What we’re looking for" items={job.lookingFor} />
              </FadeIn>

              {job.mustKnowSoftware && job.mustKnowSoftware.length > 0 && (
                <FadeIn>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      Must-know software
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-3">
                      {job.mustKnowSoftware.map((tool) => (
                        <li
                          key={tool}
                          className="border border-navy-900/15 bg-surface px-4 py-2 text-sm font-semibold text-navy-950"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              <FadeIn>
                <div className="grid gap-8 border-t border-border pt-12 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      Compensation
                    </p>
                    <p className="heading-display mt-3 text-2xl text-navy-950 md:text-3xl">
                      {job.pay}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      Salary is not a constraint for the right candidate.
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      Benefits
                    </p>
                    <ul className="mt-4 space-y-2">
                      {job.benefits.map((b) => (
                        <li key={b} className="text-sm text-navy-800">
                          — {b}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-muted">Work location: {job.location}</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="border-t border-border pt-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                    When applying, include
                  </p>
                  <ol className="mt-5 space-y-3">
                    {job.applicationIncludes.map((item, i) => (
                      <li key={item} className="flex gap-4 text-sm text-navy-800">
                        <span className="heading-display text-accent">{String(i + 1).padStart(2, "0")}</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeIn>
            </div>

            {/* Sticky apply */}
            <FadeIn delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-navy-950/[0.06]">
                  <div className="border-b border-border bg-navy-950 px-6 py-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                      Apply now
                    </p>
                    <h2 className="heading-section mt-2 text-xl text-white">
                      Submit your application
                    </h2>
                    <p className="mt-2 text-xs leading-relaxed text-white/60">
                      No account required. Portfolio and resume are reviewed by our hiring team.
                    </p>
                  </div>
                  <div className="p-6">
                    <CareerApplyForm job={job} />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionBlock({
  title,
  items,
  numbered,
}: {
  title: string;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{title}</p>
      <ul className="mt-6 space-y-4">
        {items.map((item, i) => (
          <li key={item} className="flex gap-4 border-b border-border/80 pb-4 last:border-0">
            {numbered ? (
              <span className="heading-display w-8 shrink-0 text-lg text-accent/80">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : (
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            )}
            <p className="text-[1.02rem] leading-relaxed text-navy-800">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
