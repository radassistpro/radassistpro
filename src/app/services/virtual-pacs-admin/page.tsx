import type { Metadata } from "next";
import Image from "next/image";
import { Check, PhoneCall, FileText, ListChecks, BellRing } from "lucide-react";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqSection, faqSchema, type Faq } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Virtual PACS Admin & Outsourced PACS Administration",
  description:
    "U.S.-focused virtual PACS administrators handle critical result relays, calls, addendums, and worklist triage inside your existing PACS. Book a 15-minute call.",
  alternates: { canonical: "/services/virtual-pacs-admin/" },
};

const faqs: Faq[] = [
  {
    q: "What does a virtual PACS admin actually do?",
    a: "Dedicated administrators trained on PACS workflows handle the operational layer of your reading room: critical result relays with documentation, inbound and outbound calls, study notes, TAT follow-up, addendum coordination, and worklist triage by your rules.",
  },
  {
    q: "Do we need to install new software or change our PACS?",
    a: "No. We provision users inside your existing PACS environment. There are no new licenses, integrations, or workflow rebuilds.",
  },
  {
    q: "How is access secured?",
    a: "We execute a BAA before any system access, work under HIPAA-aligned workflows, and operate as provisioned users in your environment with roles you control.",
  },
  {
    q: "How are critical result relays documented?",
    a: "Every relay is logged to your protocol with an audit trail your compliance team can review. Median relay time across engagements is 2.4 minutes.",
  },
  {
    q: "Can virtual PACS admins replace our in-house admin staff?",
    a: "Most groups use us to extend coverage — after-hours, weekends, and overflow — or to take the phone and documentation load off radiologists. Coverage is scoped to your volumes and hours, and can scale up or down without penalties.",
  },
  {
    q: "How is virtual PACS admin support priced?",
    a: "Flexible hourly rates scoped to your coverage hours and volume, with no setup fees and no annual contract. See our pricing page or request a rate card.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Virtual PACS Admin Services",
  serviceType: "PACS administration and radiology workflow support",
  description:
    "Outsourced PACS administrators handling critical result relays, call management, addendum coordination, and worklist triage inside your existing PACS environment.",
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: { "@type": "Country", name: "United States" },
  url: `${siteConfig.url}/services/virtual-pacs-admin/`,
};

const workflow = [
  {
    icon: BellRing,
    title: "A critical finding lands",
    text: "Your radiologist flags a critical result. Your RadAssistPro admin relays it to the referring physician per your protocol and documents the relay — median 2.4 minutes, 100% documented relay compliance.",
  },
  {
    icon: PhoneCall,
    title: "The phone rings — not at the reading desk",
    text: "Inbound calls from referrers and technologists route to your admin team, with outbound follow-ups handled the same way. Every call carries an audit trail. Radiologists stay on the worklist.",
  },
  {
    icon: FileText,
    title: "Addendums and study notes tracked to completion",
    text: "Requests for addendums, comparisons, and study notes are logged, coordinated with the reading radiologist, and tracked until they close — over 5,000 addendums coordinated to date.",
  },
  {
    icon: ListChecks,
    title: "The worklist stays triaged",
    text: "STAT thresholds, escalation rules, and prioritization run by your written protocols, reviewed in your weekly performance reports alongside TAT and relay compliance.",
  },
];

export default function VirtualPacsAdminPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="Virtual PACS Admins"
        title="Virtual PACS admin services inside your existing systems"
        description="Outsourced PACS administration for U.S. radiology groups: critical result relays, call handling, addendum tracking, and worklist triage — without new software or added headcount."
        image={images.servicePacs}
        imageAlt="Virtual PACS administrator coordinating critical result relays at a workstation"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="The Problem"
                title="Radiologists spend hours on work that does not require a medical degree"
                description="Relays, phone calls, addendum chases, and worklist housekeeping pull your physicians off interpretation. A virtual PACS administrator takes that operational load — working as a provisioned user inside your own PACS environment, under your rules."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Critical result relay and documentation per your protocol",
                  "Inbound and outbound call handling with audit trail",
                  "Study notes, TAT follow-up, and addendum coordination",
                  "Overread and peer-review workflow support",
                  "Worklist triage and prioritization by your rules",
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
                  src={images.homePacsCard}
                  alt="Critical relay coordinator documenting a call for a radiology group"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { value: "35,000+", label: "Calls Handled" },
                  { value: "5,000+", label: "Addendums Coordinated" },
                  { value: "2.4 min", label: "Median Relay Time" },
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
              eyebrow="A Day In Your Workflow"
              title="What outsourced PACS administration looks like in practice"
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {workflow.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-border p-8">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="heading-section text-xl text-navy-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
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
                eyebrow="Quality and Oversight"
                title="Documented, auditable, reviewed weekly"
                description="Every relay, call, and addendum is logged against your written protocols. Scheduled QA reports cover TAT, relay compliance, and open items, and a named U.S. account contact — reachable by phone and email — adjusts coverage as your volumes change."
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <SectionHeading
                eyebrow="Getting Started"
                title="Live in 10–15 business days"
                description="Discovery call, agreement and BAA, user provisioning by your IT team, then protocols and a shadow period sized to your volume before full coverage. No new software is installed at any step. See the onboarding roadmap on our How It Works page."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding-tight bg-cream-50">
        <div className="container-narrow px-5">
          <FadeIn>
            <SectionHeading
              eyebrow="Why Outsource"
              title="The case for outsourced PACS administration"
            />
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                Every interrupted read costs more than the minutes it takes. A radiologist pulled off the
                worklist to relay a result or chase an addendum loses focus, throughput, and — over a full
                shift — a measurable share of read capacity. Hiring dedicated in-house admin staff solves
                the interruption problem but creates a new one: you are now recruiting, training, and
                scheduling coverage for evenings, weekends, and holidays at every site you serve.
              </p>
              <p>
                A virtual PACS administrator gives you the coverage without the headcount. Because our
                team works as provisioned users inside your existing PACS environment, there
                is no software project, no integration risk, and no change for your referrers — the phone
                is simply answered, the relay is made and documented, the addendum is tracked to
                completion. Hourly pricing scoped to your coverage hours means a single-site imaging
                center and a multi-state teleradiology group can both buy exactly the coverage they need.
                Facilities with after-hours read volume often combine this service with our
                <a href="/services/prelim-teleradiology/" className="text-accent font-medium"> prelim
                teleradiology coverage</a> so reads and relays run on one documented workflow.
              </p>
              <p>
                And because every action is logged against your written protocols, outsourcing this work
                improves your audit position instead of weakening it: relay compliance, call
                documentation, and TAT follow-up all become reportable metrics your compliance team can
                review weekly.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Virtual PACS admin questions" />

      <CTABand
        title="Put the phones and paperwork on us"
        description="Book a 15-minute call. We will map your call volumes and coverage hours to a scoped plan."
        primaryLabel="Book a Call"
        primaryHref="/book-a-call"
        secondaryLabel="See Pricing Model"
        secondaryHref="/pricing"
      />
    </>
  );
}
