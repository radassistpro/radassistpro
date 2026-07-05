import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { WorkflowRoadmap } from "@/components/how-it-works/WorkflowRoadmap";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "How It Works: Radiology Coverage in 2–3 Weeks",
  description:
    "Five documented onboarding steps — discovery, BAA, provisioning, protocols, go-live. Most facilities are live in 10–15 business days. See the roadmap.",
  alternates: { canonical: "/how-it-works/" },
};

const faqs = [
  {
    q: "Do I need to install any new software?",
    a: "No. Our team works directly inside your existing PACS systems.",
  },
  {
    q: "How quickly can we go live?",
    a: "Most facilities are live in 10 to 15 business days from the discovery call. The biggest variables are your IT team's provisioning queue and legal review of the BAA — we supply requirements up front to keep both moving.",
  },
  {
    q: "What is a BAA and why do you need one?",
    a: "A Business Associate Agreement is the HIPAA-required contract that governs how we handle protected health information in your systems. We execute it before any system access, alongside the service agreement.",
  },
  {
    q: "What is the shadow period?",
    a: "A parallel run where our team works alongside your existing staff before taking the load — sized to your facility's volume and complexity, with daily check-ins to confirm relays, reads, and handoffs run to spec.",
  },
  {
    q: "What can slow the timeline down?",
    a: "Almost always facility-side dependencies: PACS user provisioning in your IT queue and contract review cycles. Protocol documentation and training run in parallel, so they rarely add time.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Add or reduce coverage anytime without penalties.",
  },
  {
    q: "How do you ensure quality?",
    a: "Strict QA checklists, discrepancy reviews, TAT audits, and shared performance reports.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero
        eyebrow="How It Works"
        title="Go live in two to three weeks — without a workflow rebuild"
        description="Five documented steps from first call to active coverage. Most facilities are live in 10–15 business days, with the timeline scoped on your discovery call."
        image={images.workflowHero}
        imageAlt="Discovery call for radiology workflow onboarding with RadAssistPro"
      />

      <section className="border-b border-border bg-surface py-8">
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {["Discovery", "Agreement & BAA", "Access", "Protocols & Shadow", "Go Live"].map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-navy-800">{label}</span>
                {i < 4 && (
                  <ArrowRight className="hidden h-4 w-4 text-muted md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkflowRoadmap />

      <section className="section-padding-tight bg-navy-950 text-white grain">
        <div className="container-wide">
          <FadeIn>
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions"
              dark
              align="center"
              className="mx-auto"
            />
          </FadeIn>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4">
            {faqs.map((faq, index) => (
              <FadeIn key={faq.q} delay={index * 0.05}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold text-white">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {faq.a}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-12 text-center">
              <Button href="/book-a-call" variant="primary" size="lg">
                Book Your Discovery Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTABand
        title="Ready to review your workflow?"
        description="Book a 15-minute call. We will map your volumes to a coverage plan and go-live timeline."
        primaryLabel="Book a Call"
        primaryHref="/book-a-call"
      />
    </>
  );
}
