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
  title: "Radiology Support for Teleradiology Groups",
  description:
    "Multi-site teleradiology groups get consistent relay documentation, after-hours prelims, and call coverage without adding staff at every location. Book a call.",
  alternates: { canonical: "/for/teleradiology-groups/" },
};

const faqs: Faq[] = [
  {
    q: "We already read remotely. What does RadAssistPro add?",
    a: "The operational layer around the reads: documented critical result relays, call handling with audit trails, addendum tracking, and worklist triage — plus prelim capacity for overflow and after-hours volume when your own readers are at capacity.",
  },
  {
    q: "Can you work across multiple sites and PACS environments?",
    a: "Yes. We work as provisioned users in each of your existing PACS environments, with relay and escalation protocols documented per site during onboarding.",
  },
  {
    q: "How do you keep relay documentation consistent across sites?",
    a: "Every relay is logged to the site's written protocol with an audit trail, and weekly performance reports cover relay compliance and TAT by site.",
  },
  {
    q: "Do we have to commit to a long-term contract?",
    a: "No. Coverage is scoped per site and can scale up or down without penalties, with per-report pricing for reads and hourly rates for PACS admin coverage.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Radiology Support for Teleradiology Groups",
  serviceType: "PACS administration and preliminary teleradiology for multi-site groups",
  provider: { "@type": "Organization", name: "RadAssistPro", url: "https://radassistpro.com" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://radassistpro.com/for/teleradiology-groups/",
};

export default function TeleradiologyGroupsPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="Who We Serve"
        title="Support for multi-site teleradiology groups"
        description="Consistent relay documentation, after-hours prelims, and call coverage across every site you serve — without adding full-time staff at each location."
        image={images.audienceTelerad}
        imageAlt="Multi-site teleradiology network operations center"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="The Multi-Site Problem"
                title="Every site multiplies the operational load"
                description="Each facility brings its own relay protocol, referrer relationships, escalation paths, and phone traffic. Staffing that operational layer at every location does not scale — and pushing it onto reading radiologists costs you read capacity exactly when volumes peak."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Relay documentation kept consistent across every site's protocol",
                  "After-hours and overflow prelims that scale with group-wide volume",
                  "Call coverage without a coordinator hired at each location",
                  "Per-site weekly reporting: TAT, relay compliance, open items",
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
                  src={images.audienceTelerad}
                  alt="Teleradiology group coordinating reads across multiple hospital sites"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { value: "33+", label: "U.S. Facilities Supported" },
                  { value: "100%", label: "Documented Relay Compliance" },
                  { value: "18 min", label: "Median Prelim TAT" },
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
              title="Most groups combine both services"
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <FadeIn>
              <Link href="/services/virtual-pacs-admin/" className="group block h-full rounded-2xl border border-border p-8 transition-colors hover:border-accent/40">
                <h3 className="heading-section text-xl text-navy-950">Virtual PACS Admins</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Relays, calls, addendums, and worklist triage handled per site, documented to each facility&apos;s protocol.
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
                  Licensed readers absorb after-hours and overflow volume so your own radiologists stay on contracted work.
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
            <SectionHeading eyebrow="Getting Started" title="Onboarding a multi-site group" />
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                Multi-site onboarding follows the same documented five-step roadmap as any engagement —
                discovery, agreement and BAA, provisioning, protocols and shadow period, go-live — run per site so each facility&apos;s relay
                protocols, STAT thresholds, and escalation paths are captured in writing before coverage
                begins. A BAA is executed once, users are provisioned in each PACS environment you
                operate, and a shadow period alongside your existing team confirms handoffs before we take
                the load. Most sites are operational within 10–15 business days; see the full
                <a href="/how-it-works/" className="text-accent font-medium"> onboarding roadmap</a>.
              </p>
              <p>
                After go-live, weekly per-site reports give your operations lead one view of TAT, relay
                compliance, and open items across the network — and your named U.S. account contact
                rebalances coverage as site volumes shift, without contract penalties. The result is a
                consistent operational standard across every facility you serve, at a cost that follows
                volume instead of headcount.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Teleradiology group questions" />

      <CTABand
        title="Scope coverage across your sites"
        description="Book a 15-minute call. We will map your per-site volumes to a coverage plan and go-live timeline."
        primaryLabel="Book a Call"
        primaryHref="/book-a-call"
        secondaryLabel="See How Onboarding Works"
        secondaryHref="/how-it-works"
      />
    </>
  );
}
