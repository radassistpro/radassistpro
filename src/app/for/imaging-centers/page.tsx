import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqSection, faqSchema, type Faq } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Teleradiology & PACS Support for Imaging Centers",
  description:
    "Outpatient imaging centers keep radiologists reading while RadAssistPro handles calls, addendum tracking, TAT monitoring, and overflow prelims. Book a call.",
  alternates: { canonical: "/for/imaging-centers/" },
};

const faqs: Faq[] = [
  {
    q: "Our radiologists lose hours to phones and follow-ups. How does this change that?",
    a: "A virtual PACS admin takes the inbound calls, referrer follow-ups, study notes, and addendum chases — inside your existing PACS — so reading time goes back to reading. Clients report meaningful daily time returned to attendings.",
  },
  {
    q: "Can you absorb daytime overflow, not just after-hours volume?",
    a: "Yes. Prelim coverage scales with study volume, so daytime overflow, vacation gaps, and census spikes draw from the same reader pool as night and weekend coverage.",
  },
  {
    q: "How do you monitor turnaround time?",
    a: "TAT follow-up is part of the admin workflow, and scheduled QA reports track average turnaround against your targets by category.",
  },
  {
    q: "What does setup involve for a single outpatient center?",
    a: "The same five steps as any engagement: discovery call, agreement and BAA, user provisioning by your IT, protocol setup with a shadow period, then live coverage — typically 10–15 business days end to end.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Teleradiology and PACS Support for Imaging Centers",
  serviceType: "PACS administration and preliminary teleradiology for outpatient imaging",
  provider: { "@type": "Organization", name: "RadAssistPro", url: "https://radassistpro.com" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://radassistpro.com/for/imaging-centers/",
};

export default function ImagingCentersPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="Who We Serve"
        title="Radiology support for outpatient imaging centers"
        description="Your radiologists should be reading — not answering phones or chasing addendums across the afternoon worklist. We take the operational load and the overflow."
        image={images.audienceImaging}
        imageAlt="Outpatient imaging center reading room"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="The Outpatient Problem"
                title="Thin margins, lean staff, and a worklist that will not wait"
                description="Outpatient centers rarely carry dedicated PACS admin staff, so calls, addendum requests, and TAT follow-ups land on radiologists and technologists. Every interruption costs read throughput — and referrer relationships suffer when nobody owns the phone."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Call handling with audit trail — referrers reach a person, not a reading room",
                  "Addendum tracking from request to completion",
                  "TAT monitoring against your targets, reported weekly",
                  "Overflow and vacation prelim coverage priced per report",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-3 w-3 text-accent" />
                    </span>
                    <span className="text-navy-800">{point}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={images.audienceImaging}
                  alt="Radiologist at an imaging center focused on the reading worklist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { value: "35,000+", label: "Calls Handled" },
                  { value: "5,000+", label: "Addendums Coordinated" },
                  { value: "99.2%", label: "Internal QA Pass Rate" },
                ].map((metric) => (
                  <div key={metric.label}>
                    <p className="heading-display text-2xl text-navy-950">{metric.value}</p>
                    <p className="mt-1 text-xs text-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-wide">
          <FadeIn>
            <SectionHeading
              eyebrow="The Service Mix"
              title="Start with the phones, add reads when you need them"
              description="Most imaging centers start with virtual PACS admin coverage during business hours, then add per-report prelim coverage for overflow and radiologist time off."
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <FadeIn>
              <Link href="/services/virtual-pacs-admin/" className="group block h-full rounded-2xl border border-border p-8 transition-colors hover:border-accent/40">
                <h3 className="heading-section text-xl text-navy-950">Virtual PACS Admins</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Calls, study notes, addendum tracking, and TAT follow-up handled inside your existing PACS, hourly rates.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link href="/services/prelim-teleradiology/" className="group block h-full rounded-2xl border border-border p-8 transition-colors hover:border-accent/40">
                <h3 className="heading-section text-xl text-navy-950">Prelim Teleradiologists</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Licensed readers for overflow, vacations, and extended hours — per-report pricing, no annual contract.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding-tight bg-cream-50">
        <div className="container-narrow px-5">
          <FadeIn>
            <SectionHeading eyebrow="The Economics" title="What an interruption-free reading day is worth" />
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                An outpatient center&apos;s revenue is a direct function of read throughput, and
                throughput is a direct casualty of interruptions. When the reading radiologist is also
                the de facto phone desk — fielding referrer calls, chasing addendum requests, following up
                on delayed studies — the worklist pays for it. Clients have reported attendings gaining
                back roughly three hours per day once relays, calls, and addendum tracking moved to their
                RadAssistPro admin team.
              </p>
              <p>
                Because coverage is hourly and scoped to your operating hours, a single-site center does
                not buy 24/7 staffing it will never use. Start with business-hours call and addendum
                coverage; add <a href="/services/prelim-teleradiology/" className="text-accent font-medium">per-report
                prelim reads</a> for vacation weeks and census spikes. Setup requires no new software —
                we work inside the PACS you already run — and onboarding typically completes in 10–15 business days.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Imaging center questions" />

      <CTABand
        title="Give your radiologists their day back"
        description="Book a 15-minute call. We will scope coverage for your hours, volumes, and referrer base."
        primaryLabel="Book a 15-Minute Call"
        primaryHref="/book-a-call"
        secondaryLabel="See Pricing Model"
        secondaryHref="/pricing"
      />
    </>
  );
}
