import Image from "next/image";
import { Quote } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { testimonials } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-cream-100">
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            eyebrow="Client Voices"
            title="What partners report across active engagements"
            description="Metrics drawn from documented client operations. Individual results vary by volume, modality mix, and coverage scope."
            align="center"
            className="mx-auto"
          />
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.author} delay={index * 0.1}>
              <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="border-b border-border bg-navy-950 px-8 py-5">
                  <Quote className="h-6 w-6 text-blue-400/60" />
                </div>
                <blockquote className="flex-1 px-8 py-6 text-base leading-relaxed text-navy-800">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-border bg-cream-50 px-8 py-5">
                  <p className="font-semibold text-navy-950">
                    {testimonial.author}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {testimonial.role}, {testimonial.organization}
                  </p>
                  <p className="text-xs text-muted">{testimonial.location}</p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="relative mt-20 overflow-hidden rounded-2xl">
            <div className="relative aspect-[21/9] min-h-[280px]">
              <Image
                src={images.testimonialsBanner}
                alt="Teleradiology operations center with radiologists reading studies"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/30" />
              <div className="absolute inset-0 flex items-center p-8 md:p-14">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                    Our Promise
                  </p>
                  <p className="heading-display mt-4 text-2xl text-white md:text-4xl">
                    Operational support built for radiology workflows.
                  </p>
                  <p className="mt-4 text-white/70">
                    Documented relays. Consistent QA. A U.S. account team that
                    knows your escalation rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
