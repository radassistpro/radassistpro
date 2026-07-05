import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, FileText, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqSection, faqSchema, type Faq } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing: How Radiology Support Is Scoped and Billed",
  description:
    "Prelim teleradiology priced per report by modality; virtual PACS admins at flexible hourly rates. No setup fees, no annual contract. Request a rate card.",
  alternates: { canonical: "/pricing/" },
};

const faqs: Faq[] = [
  {
    q: "Why not publish a rate table?",
    a: "Because the same service costs different amounts at different facilities. Study volume, modality mix, coverage hours, and urgency mix all move the per-report and hourly rates. A scoped rate card reflects your actual workload instead of a worst-case list price.",
  },
  {
    q: "Are there setup or onboarding fees?",
    a: "No. Discovery, BAA execution, user provisioning, and the shadow period are all part of getting started, at no charge.",
  },
  {
    q: "Is there a minimum commitment or annual contract?",
    a: "No annual contract is required. Coverage can scale up or down without penalties.",
  },
  {
    q: "How quickly will we get a rate card?",
    a: "Share your volumes, modality mix, and coverage hours on a 15-minute call and we will return a scoped rate card within one business day.",
  },
  {
    q: "What determines the per-report rate for prelims?",
    a: "Modality and study type, urgency (routine versus STAT), and volume. Volume and urgency discounts are available as reads scale.",
  },
];

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "RadAssistPro Pricing",
  description:
    "How RadAssistPro scopes and bills virtual PACS admin coverage and preliminary teleradiology reads.",
  url: `${siteConfig.url}/pricing/`,
};

const drivers = [
  { icon: FileText, title: "Study volume", text: "Monthly read and relay volume is the base of every quote — and where volume discounts apply." },
  { icon: TrendingUp, title: "Modality mix", text: "Per-report rates vary by modality and study type; CT and MRI price differently than radiographs." },
  { icon: Clock, title: "Coverage hours", text: "Business hours, nights, weekends, or full 24/7 — PACS admin coverage is scoped to the hours you actually need." },
  { icon: ShieldCheck, title: "Urgency mix", text: "Routine and STAT work are priced separately, so an ER-heavy worklist is quoted on its real profile." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing model, scoped to your volume"
        description="Prelim reads are priced per report by modality. Virtual PACS admin coverage runs on flexible hourly rates. No setup fees, no annual contract, no penalties for scaling."
        image={images.servicesHero}
        imageAlt="Radiology coverage pricing scoped to study volumes and modality mix"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-2xl border border-border bg-surface p-8">
                <h2 className="heading-section text-2xl text-navy-950">Virtual PACS Admins</h2>
                <p className="mt-2 text-sm font-medium text-accent">Flexible hourly rates</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Scoped to your coverage hours and call volume",
                    "Relays, calls, addendums, and triage included",
                    "Scale hours up or down without penalties",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-navy-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/services/virtual-pacs-admin/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  About the service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="h-full rounded-2xl border border-border bg-surface p-8">
                <h2 className="heading-section text-2xl text-navy-950">Prelim Teleradiologists</h2>
                <p className="mt-2 text-sm font-medium text-accent">Per report, by modality</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Pay for reads performed, not idle coverage",
                    "Volume and urgency discounts available",
                    "No annual contract required",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-navy-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/services/prelim-teleradiology/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  About the service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-wide">
          <FadeIn>
            <SectionHeading
              eyebrow="What Moves the Number"
              title="Four inputs determine your rate card"
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {drivers.map((d, index) => (
              <FadeIn key={d.title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-border p-8">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <h3 className="heading-section text-lg text-navy-950">{d.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{d.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-tight bg-navy-950 text-white grain">
        <div className="container-wide">
          <FadeIn>
            <SectionHeading
              eyebrow="What You Will Never Pay For"
              title="No setup fees. No annual contract. No scaling penalties."
              description="Onboarding — discovery, BAA, provisioning, and the shadow period — is free. Coverage flexes with your census, and you can add or reduce it at any time."
              dark
              align="center"
              className="mx-auto"
            />
          </FadeIn>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Pricing questions" />

      <CTABand
        title="Get your rate card in one business day"
        description="A 15-minute call covering volumes, modality mix, and hours is all we need to scope it."
        primaryLabel="Request Rate Card"
        primaryHref="/book-a-call"
        secondaryLabel="See How Onboarding Works"
        secondaryHref="/how-it-works"
      />
    </>
  );
}
