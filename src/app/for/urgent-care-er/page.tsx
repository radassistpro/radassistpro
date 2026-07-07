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
  title: "STAT Teleradiology for Urgent Care & Emergency Departments",
  description:
    "Reliable STAT prelims and documented critical result relays for urgent care and ER — 24/7 coverage with flexible volume. Book a 15-minute workflow call.",
  alternates: { canonical: "/for/urgent-care-er/" },
};

const faqs: Faq[] = [
  {
    q: "How fast are STAT studies read?",
    a: "STAT thresholds and prioritization rules are set to your written protocols during onboarding. Median prelim turnaround across engagements is 18 minutes, with critical relays documented in a median of 2.4 minutes.",
  },
  {
    q: "What happens when a critical finding comes back at 2 AM?",
    a: "The finding is relayed to your on-shift provider per your escalation path and documented with an audit trail — the same workflow at 2 AM as at 2 PM, every day of the year.",
  },
  {
    q: "Our volume swings hard between shifts. Do we pay for idle coverage?",
    a: "Prelim reads are priced per report, so cost follows your actual volume. Coverage hours can scale up or down without penalties.",
  },
  {
    q: "Which studies can you cover?",
    a: "CT, MRI, X-ray, and ultrasound, matched to your case mix — including the extremity and chest films that dominate urgent care worklists.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "STAT Teleradiology for Urgent Care and Emergency Departments",
  serviceType: "STAT preliminary teleradiology and critical results communication",
  provider: { "@type": "Organization", name: "RadAssistPro", url: "https://radassistpro.com" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://radassistpro.com/for/urgent-care-er/",
};

export default function UrgentCareErPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="Who We Serve"
        title="STAT coverage for urgent care and emergency departments"
        description="Time-sensitive studies need reliable STAT prelims and documented critical relays — especially when your in-house readers are off shift. That is exactly what we run."
        image={images.audienceUrgent}
        imageAlt="Urgent care clinician reviewing a time-sensitive imaging study"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="The After-Hours Problem"
                title="Patients do not schedule emergencies inside reading hours"
                description="Urgent care and emergency volumes peak evenings, weekends, and holidays — precisely when in-house coverage is thinnest. Waiting on a morning read is not an option for a suspected fracture or an acute head CT, and undocumented phone relays are a compliance risk you should not carry."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "STAT prioritization by your written thresholds",
                  "24/7/365 coverage with no gap scheduling",
                  "Critical result relays documented with an audit trail",
                  "Per-report pricing that follows your actual census",
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
                  src={images.audienceUrgent}
                  alt="Emergency department imaging workflow with STAT teleradiology support"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { value: "18 min", label: "Median Prelim TAT" },
                  { value: "2.4 min", label: "Median Relay Time" },
                  { value: "24/7", label: "Coverage, No Gaps" },
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
              title="Reads plus the relay discipline around them"
              description="Facilities with time-sensitive studies typically pair STAT prelim coverage with virtual PACS admins, so every critical finding is both read fast and relayed with documentation."
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <FadeIn>
              <Link href="/services/prelim-teleradiology/" className="group block h-full rounded-2xl border border-border p-8 transition-colors hover:border-accent/40">
                <h3 className="heading-section text-xl text-navy-950">Prelim Teleradiologists</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Licensed readers on your STAT worklist around the clock, with QA checklists on every read.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link href="/services/virtual-pacs-admin/" className="group block h-full rounded-2xl border border-border p-8 transition-colors hover:border-accent/40">
                <h3 className="heading-section text-xl text-navy-950">Virtual PACS Admins</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Documented critical result relays and escalation handling per your protocol, day and night.
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
            <SectionHeading eyebrow="Compliance" title="Documented relays protect more than patients" />
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                In emergency and urgent care settings, the communication of a critical finding matters as
                much as the finding itself — and an undocumented phone call is invisible to your
                compliance program. Every RadAssistPro relay is executed against your written escalation
                protocol and logged with an audit trail: who was notified, when, and how. Median relay
                time across engagements is 2.4 minutes, with 100% documented relay compliance.
              </p>
              <p>
                Coverage is designed around your census curve, not a staffing roster. Per-report pricing
                means a slow Tuesday night costs you almost nothing while a Saturday surge is fully
                covered, and STAT thresholds set during
                <a href="/how-it-works/" className="text-accent font-medium"> onboarding</a> ensure the
                studies that cannot wait never queue behind the ones that can. Facilities running their
                own overnight providers use the same model for weekend and holiday gaps.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Urgent care and ER questions" />

      <CTABand
        title="Close your after-hours gap"
        description="Book a 15-minute call. We will map your peak-hour volumes and STAT rules to a coverage plan."
        primaryLabel="Book a 15-Minute Call"
        primaryHref="/book-a-call"
        secondaryLabel="See How Onboarding Works"
        secondaryHref="/how-it-works"
      />
    </>
  );
}
