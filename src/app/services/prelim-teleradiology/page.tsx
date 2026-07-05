import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqSection, faqSchema, type Faq } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { images, modalities } from "@/lib/images";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Teleradiology Preliminary Reads & After-Hours Coverage",
  description:
    "Licensed prelim teleradiologists covering nights, weekends, and overflow. 18-minute median TAT, QA on every read, per-report pricing. Request a rate card.",
  alternates: { canonical: "/services/prelim-teleradiology/" },
};

const faqs: Faq[] = [
  {
    q: "What is a preliminary read?",
    a: "A preliminary interpretation issued to support immediate clinical decisions — typically after hours or during overflow — with the final interpretation completed by your facility's radiologist. Critical findings are communicated per your protocol.",
  },
  {
    q: "How fast are preliminary reads returned?",
    a: "Median prelim turnaround across active engagements is 18 minutes, with STAT thresholds and escalation rules set to your written protocols during onboarding.",
  },
  {
    q: "Which modalities are covered?",
    a: "CT, MRI, X-ray, and ultrasound, matched to your case mix during the discovery call.",
  },
  {
    q: "Who performs the reads?",
    a: "Board-eligible and licensed radiologists using voice recognition for efficient dictation, with standardized QA checklists applied to every read.",
  },
  {
    q: "How does after-hours and weekend coverage work?",
    a: "Coverage runs 24/7/365, including nights, weekends, and holidays, with no gap scheduling. It scales with your study volume rather than your headcount, so census swings do not leave you exposed.",
  },
  {
    q: "How are preliminary reads priced?",
    a: "Per report, by modality, with volume and urgency discounts available. There are no setup fees and no annual contract. See our pricing page or request a rate card for your facility.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Teleradiology Preliminary Reads",
  serviceType: "Preliminary teleradiology interpretation",
  description:
    "Licensed prelim teleradiologists providing after-hours, weekend, and overflow preliminary reads for CT, MRI, X-ray, and ultrasound with QA on every read.",
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: { "@type": "Country", name: "United States" },
  url: `${siteConfig.url}/services/prelim-teleradiology/`,
};

export default function PrelimTeleradiologyPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="Prelim Teleradiologists"
        title="Preliminary reads and after-hours radiology coverage"
        description="Licensed teleradiologists deliver preliminary interpretations when your team is off shift or at capacity — nights, weekends, holidays, and overflow — inside your existing PACS."
        image={images.servicePrelim}
        imageAlt="Teleradiologist providing after-hours preliminary reads at a night operations desk"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="The Coverage Model"
                title="Coverage that scales with volume, not headcount"
                description="Overnight census spikes, weekend gaps, vacation coverage, and daytime overflow all draw from the same reader pool. You are never staffing for your peak — and never exposed at it. Studies land in your existing PACS worklist; preliminary reports come back with critical findings relayed per your protocol."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "24/7/365 coverage including nights, weekends, and holidays",
                  "CT, MRI, X-ray, and ultrasound based on your case mix",
                  "Voice recognition for efficient dictation",
                  "Standardized QA checklists on every read",
                  "Per-report pricing with no annual contract required",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-3 w-3 text-accent" />
                    </span>
                    <span className="text-navy-800">{feature}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={images.homePrelimCard}
                  alt="Night teleradiology operations covering after-hours preliminary reads"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { value: "18 min", label: "Median Prelim TAT" },
                  { value: "247+", label: "Daily Read Volume" },
                  { value: "99.2%", label: "QA Pass Rate" },
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
              eyebrow="Modalities"
              title="Matched to your case mix"
              description="Modality coverage is set during the discovery call and can expand as your volumes change."
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {modalities.map((m, index) => (
              <FadeIn key={m.code} delay={index * 0.05}>
                <div className="rounded-2xl border border-border p-6 text-center">
                  <p className="heading-display text-2xl text-navy-950">{m.code}</p>
                  <p className="mt-1 text-xs text-muted">{m.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-tight bg-cream-100">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="Quality Assurance"
                title="QA on every read, reviewed with you weekly"
                description="Standardized checklists on every study, discrepancy reviews, TAT audits, and shared performance reports keep read quality consistent with your internal standards — currently a 99.2% internal QA pass rate."
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <SectionHeading
                eyebrow="Working With Your Team"
                title="STAT rules and escalation paths set before go-live"
                description="During onboarding we document your STAT thresholds, relay protocols, and on-call paths, then run a shadow period alongside your staff. Critical findings follow the same documented relay workflow as our PACS admin service."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding-tight bg-cream-50">
        <div className="container-narrow px-5">
          <FadeIn>
            <SectionHeading
              eyebrow="End to End"
              title="How a preliminary read moves through your workflow"
            />
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                A study lands on your worklist the same way it always does — nothing changes for your
                technologists. Our reader picks it up from your existing PACS environment,
                dictates the preliminary interpretation with voice recognition, runs the standardized QA
                checklist, and returns the report to your system. If the study carries a critical finding,
                it is relayed to your on-shift provider per your written protocol and documented with an
                audit trail. Your radiologist completes the final interpretation on their normal schedule,
                with the prelim and any relay documentation already attached to the case.
              </p>
              <p>
                This matters more as staffing tightens. Radiology workforce shortages and rising imaging
                demand are squeezing after-hours coverage across the U.S., and hiring for the overnight
                shift is the hardest recruiting problem in the specialty. Per-report prelim coverage lets
                you meet that demand without adding permanent headcount — and without asking your own
                radiologists to carry call schedules that burn them out. Many groups pair prelim coverage
                with our <a href="/services/virtual-pacs-admin/" className="text-accent font-medium">virtual
                PACS admin service</a> so the relay and documentation discipline extends to every study,
                not just the ones we read.
              </p>
              <p>
                Quality stays visible throughout: discrepancy reviews compare preliminary and final
                interpretations, TAT audits track turnaround against your targets, and shared weekly
                reports keep your medical director in the loop. If something needs tuning — STAT
                thresholds, escalation paths, coverage hours — your named U.S. account contact adjusts it
                directly.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Preliminary read questions" />

      <CTABand
        title="Cover your nights, weekends, and overflow"
        description="Share your volumes and modality mix. We will return a scoped rate card within one business day."
        primaryLabel="Request Rate Card"
        primaryHref="/book-a-call"
        secondaryLabel="See Pricing Model"
        secondaryHref="/pricing"
      />
    </>
  );
}
