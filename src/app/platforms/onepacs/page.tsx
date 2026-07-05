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
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "OnePACS Support: PACS Admins & Prelim Reads for OnePACS Sites",
  description:
    "RadAssistPro teams work inside OnePACS every day — worklist triage, critical relays, addendum tracking, and prelim reads for facilities running OnePACS.",
  alternates: { canonical: "/platforms/onepacs/" },
};

const faqs: Faq[] = [
  {
    q: "Do you support facilities running OnePACS?",
    a: "Yes — OnePACS is an environment our administrators and readers work in daily. Worklist triage, study notes, critical result relays, addendum coordination, and preliminary reads all run inside your existing OnePACS setup.",
  },
  {
    q: "Are you affiliated with OnePACS?",
    a: "No. RadAssistPro is an independent service provider. We are not affiliated with, endorsed by, or a reseller of OnePACS — we simply have deep operational experience supporting facilities that run it.",
  },
  {
    q: "Do we need to change our OnePACS configuration?",
    a: "No. Your IT team provisions our users with the roles you control, and we work within your existing worklist rules, study tags, and routing. No new software, integrations, or configuration changes are required.",
  },
  {
    q: "What access do your admins and readers need?",
    a: "Standard user accounts in your OnePACS environment with permissions your team sets. We provide an exact provisioning checklist up front, and a BAA is executed before any access.",
  },
  {
    q: "How quickly can a OnePACS facility go live?",
    a: "The same 10–15 business day onboarding as any engagement — and familiarity with OnePACS means protocol setup and training on the platform itself adds no extra time.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "OnePACS Support Services",
  serviceType: "PACS administration and preliminary teleradiology for OnePACS facilities",
  description:
    "Virtual PACS administrators and prelim teleradiologists with daily operational experience in OnePACS environments.",
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: { "@type": "Country", name: "United States" },
  url: `${siteConfig.url}/platforms/onepacs/`,
};

const capabilities = [
  "Worklist triage and prioritization using your OnePACS worklist rules",
  "Critical result relays documented per your protocol, with audit trail",
  "Study notes, tagging conventions, and addendum coordination",
  "Preliminary reads returned directly into your OnePACS workflow",
  "TAT follow-up and weekly performance reporting",
  "User provisioning checklist for your IT — no configuration changes",
];

export default function OnePacsPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="Platform Experience"
        title="OnePACS support from a team that works in it every day"
        description="PACS administration and preliminary reads for facilities running OnePACS — delivered inside your existing environment, with no configuration changes."
        image={images.homeOps}
        imageAlt="RadAssistPro administrator working a OnePACS worklist"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="Why It Matters"
                title="Platform fluency is the difference between day one and month one"
                description="Generic support teams learn your PACS on your time. Our administrators and readers already run high-volume radiology operations in OnePACS environments — the worklist behavior, study tags, routing quirks, and reporting workflow are familiar ground. When we join your environment, the ramp is your protocols, not the platform."
              />
              <ul className="mt-8 space-y-4">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-3 w-3 text-accent" />
                    </span>
                    <span className="text-navy-800">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={images.homeOps}
                  alt="PACS workstation running a busy radiology worklist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { value: "50,000+", label: "Studies Managed to Date" },
                  { value: "18 min", label: "Median Prelim TAT" },
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
              eyebrow="Both Services, One Environment"
              title="Everything runs inside your OnePACS setup"
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <FadeIn>
              <Link href="/services/virtual-pacs-admin/" className="group block h-full rounded-2xl border border-border p-8 transition-colors hover:border-accent/40">
                <h3 className="heading-section text-xl text-navy-950">Virtual PACS Admins</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Relays, calls, addendums, and worklist triage handled by administrators fluent in your platform.
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
                  Licensed readers working your worklist and returning preliminary reports into your existing workflow.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title="OnePACS support questions" />

      <section className="bg-navy-950 pb-4">
        <div className="container-wide">
          <p className="text-center text-xs text-white/40">
            OnePACS is a trademark of its respective owner. RadAssistPro is an independent
            service provider and is not affiliated with, endorsed by, or sponsored by OnePACS.
          </p>
        </div>
      </section>

      <CTABand
        title="Running OnePACS? The ramp is short."
        description="Book a 15-minute call. We will scope coverage for your volumes and provide the provisioning checklist for your IT."
        primaryLabel="Book a Call"
        primaryHref="/book-a-call"
        secondaryLabel="See How Onboarding Works"
        secondaryHref="/how-it-works"
      />
    </>
  );
}
