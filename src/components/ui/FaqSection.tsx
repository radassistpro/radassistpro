import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type Faq = { q: string; a: string };

export function FaqSection({ faqs, title = "Common questions" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="section-padding-tight bg-navy-950 text-white grain">
      <div className="container-wide">
        <FadeIn>
          <SectionHeading eyebrow="FAQ" title={title} dark align="center" className="mx-auto" />
        </FadeIn>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4">
          {faqs.map((faq, index) => (
            <FadeIn key={faq.q} delay={index * 0.05}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{faq.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
