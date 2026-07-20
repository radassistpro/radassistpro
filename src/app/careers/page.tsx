import type { Metadata } from "next";
import { CareersJobBoard } from "@/components/careers/CareersJobBoard";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTABand } from "@/components/ui/CTABand";
import { getPublishedJobs } from "@/lib/careers";
import { siteConfig } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers: Build With RadAssistPro",
  description:
    "Join RadAssistPro and RxOnWeb. Open roles across marketing, operations, PACS administration, and growth. Apply on the website — no login required.",
  alternates: { canonical: "/careers/" },
};

export default async function CareersPage() {
  const jobs = await getPublishedJobs();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Careers at RadAssistPro",
    description: "Open roles at RadAssistPro, a unit of RxOnWeb.",
    url: `${siteConfig.url}/careers/`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: jobs.length,
      itemListElement: jobs.map((job, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.url}/careers/${job.slug}/`,
        name: job.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20 grain lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.45_0.12_250_/_0.35),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,oklch(0.18_0.04_260))]" />
        <div className="container-wide relative px-5 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
              Careers
            </p>
            <h1 className="heading-display mt-5 max-w-4xl text-balance text-[clamp(2.75rem,6vw,4.75rem)] text-white">
              Work that demands precision.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              RadAssistPro and RxOnWeb hire operators and creatives who raise the
              standard — in radiology operations and in how we tell the story of
              AI and technology.
            </p>
            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8 text-sm text-white/55">
              <div>
                <p className="text-2xl font-semibold text-white">{jobs.length}</p>
                <p className="mt-1 uppercase tracking-[0.14em]">Open roles</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">Remote-first</p>
                <p className="mt-1 uppercase tracking-[0.14em]">Flexible teams</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">Apply online</p>
                <p className="mt-1 uppercase tracking-[0.14em]">No login required</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Open positions
            </p>
            <h2 className="heading-display mt-3 text-3xl text-navy-950 md:text-4xl">
              Roles worth applying for
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              We keep listings selective. Every role below is active and hiring —
              review the brief carefully before you apply.
            </p>
          </div>
          <CareersJobBoard jobs={jobs} />
        </div>
      </section>

      <section className="section-padding-tight bg-surface">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              {
                title: "High bar, clear ownership",
                text: "We hire people who already know their craft. You own outcomes — not tickets.",
              },
              {
                title: "Real-world systems",
                text: "From PACS operations to AI media, the work ships to real users and clients.",
              },
              {
                title: "Built for grown professionals",
                text: "Flexible schedules, remote options, and compensation that matches capability.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-accent/40 pl-6">
                <h3 className="heading-section text-xl text-navy-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Don’t see the right role?"
        description={`Send your background to ${siteConfig.email} — we keep strong profiles on file.`}
        primaryLabel="Email Careers"
        primaryHref={`mailto:${siteConfig.email}?subject=Careers%20inquiry`}
        secondaryLabel="About RadAssistPro"
        secondaryHref="/about"
      />
    </>
  );
}
