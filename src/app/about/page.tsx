import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Target, Users, Award, Globe, Clock } from "lucide-react";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us: U.S. Radiology Support Team",
  description:
    "Meet RadAssistPro, the team behind virtual PACS administration and prelim teleradiology for 33+ U.S. facilities. A unit of RxOnWeb. Book a 15-minute call.",
  alternates: { canonical: "/about/" },
};

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every relay logged to your protocol. Every addendum tracked to completion. Documented handoffs your compliance team can audit.",
  },
  {
    icon: Clock,
    title: "Responsiveness",
    description:
      "Median prelim TAT of 18 minutes across active engagements. Critical relays documented in under three minutes on average.",
  },
  {
    icon: Shield,
    title: "Compliance",
    description:
      "HIPAA-aligned workflows, executed BAAs, and relay documentation that meets your facility's audit requirements.",
  },
  {
    icon: Users,
    title: "Accountability",
    description:
      "A named U.S. account contact who knows your escalation rules, volumes, and coverage schedule. Phone and email, not a ticket queue.",
  },
];

const milestones = [
  { year: "Founded", detail: "Built by operators who managed radiology workflows before building a service around them." },
  { year: "33+", detail: "U.S. facilities currently supported with PACS admin and prelim coverage." },
  { year: "50,000+", detail: "Studies managed across active client engagements to date." },
  { year: "24/7", detail: "Coverage available nights, weekends, and holidays with no gap scheduling." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About RadAssistPro"
        title="PACS operations support for U.S. radiology groups"
        description="RadAssistPro is a unit of RxOnWeb. We provide PACS administration and preliminary reading support so radiologists can stay on interpretation, not operational tasks."
        image={images.aboutHero}
        imageAlt="RadAssistPro support team campus for U.S. radiology operations"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="Our Mission"
                title="Free radiologists to do what only they can do"
                description="Radiology groups across the U.S. face the same challenge: talented physicians spending hours on tasks that don't require a medical degree. We built RadAssistPro to take that burden off their shoulders."
              />
              <p className="mt-6 text-muted leading-relaxed">
                Our team works inside your existing PACS environment.
                No new software. No workflow disruption. Just trained professionals
                handling the operational work that keeps your practice running.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={images.aboutMission}
                  alt="Healthcare team collaborating in a modern facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-wide">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Values"
              title="What we stand for"
              align="center"
              className="mx-auto"
            />
          </FadeIn>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.1}>
                <div className="h-full rounded-2xl border border-border p-8">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="heading-section text-xl text-navy-950">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-950 text-white grain">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="By the Numbers"
                title="Built on measurable results"
                description="Directional metrics from our client engagements across the United States."
                dark
              />
            </FadeIn>

            <div className="space-y-6">
              {milestones.map((item, index) => (
                <FadeIn key={item.year} delay={index * 0.1}>
                  <div className="flex gap-6 border-b border-white/10 pb-6 last:border-0">
                    <span className="heading-display shrink-0 text-2xl text-blue-400 md:text-3xl">
                      {item.year}
                    </span>
                    <p className="text-white/70 leading-relaxed">{item.detail}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <FadeIn>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-xl shadow-navy-950/10 lg:mx-0">
                <Image
                  src={images.founder}
                  alt="Prashant Rana, Founder and CEO of RadAssistPro"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Leadership
              </p>
              <h2 className="heading-display mt-4 text-3xl text-navy-950 md:text-4xl">
                Prashant Rana
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-muted">
                Founder &amp; CEO, RadAssistPro
              </p>
              <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-navy-800">
                <p>
                  Prashant Rana founded RadAssistPro on a simple, data-backed
                  observation: radiology groups lose 3+ hours per radiologist
                  per day to administrative friction — call handling, relay
                  logging, and documentation that pulls physicians away from
                  reading. RadAssistPro exists to give that time back.
                </p>
                <p>
                  Before RadAssistPro, Prashant co-founded Zepp Media and
                  RxOnWeb Pvt. Ltd., working across growth strategy, digital
                  consulting, and MVP solutions. That background in building
                  lean, high-leverage operations shapes how RadAssistPro is run
                  today: not as a software company, but as a precision-trained
                  operational layer that plugs into a group&apos;s existing PACS
                  without disrupting how they already work.
                </p>
                <p>
                  Prashant holds his education from DY Patil University and is
                  based in the Greater Delhi area, working directly with U.S.
                  teleradiology groups, imaging centers, and radiologists to
                  build coverage models suited to how independent practices
                  actually operate.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/prashantranaofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-navy-900/15 bg-surface px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:border-accent hover:text-accent"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current text-[#0A66C2]"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream-100">
        <div className="container-wide">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
            <FadeIn>
              <div className="relative aspect-square overflow-hidden rounded-2xl lg:aspect-[4/5]">
                <Image
                  src={images.aboutSupport}
                  alt="Medical professional in clinical environment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <SectionHeading
                eyebrow={siteConfig.unit}
                title="U.S.-based support you can reach directly"
              />
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Globe className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold text-navy-950">
                      Direct U.S. Contact
                    </h3>
                    <p className="mt-1 text-sm text-muted leading-relaxed">
                      A dedicated point of contact who knows your workflow, your
                      team, and your priorities. Real conversations, not ticket
                      queues.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Award className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold text-navy-950">
                      Regular QA Reports
                    </h3>
                    <p className="mt-1 text-sm text-muted leading-relaxed">
                      Scheduled performance reports covering TAT, critical relay
                      compliance, and quality metrics. Full visibility into your
                      operations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold text-navy-950">
                      HIPAA-Compliant
                    </h3>
                    <p className="mt-1 text-sm text-muted leading-relaxed">
                      Every communication, workflow, and interaction is fully
                      HIPAA-compliant. Your patients&apos; data is always protected.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTABand
        title="Talk to our team"
        description="Book a 15-minute call to learn how RadAssistPro fits your radiology operations."
        primaryLabel="Book a 15-Minute Call"
        primaryHref="/book-a-call"
        secondaryLabel="See Onboarding Steps"
        secondaryHref="/how-it-works"
      />
    </>
  );
}
