import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

type CTABandProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABand({
  title = "Need more reading capacity without adding headcount?",
  description = "Tell us about your volumes and coverage hours. We will put together a scope and rate card within one business day.",
  primaryLabel = "Book a 15-Minute Call",
  primaryHref = "/book-a-call",
  secondaryLabel = "See How Onboarding Works",
  secondaryHref = "/how-it-works",
}: CTABandProps) {
  return (
    <section className="section-padding bg-navy-900 grain">
      <div className="container-wide">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-white/10 bg-white/5 p-10 md:flex-row md:items-center md:p-14">
            <div className="max-w-xl">
              <h2 className="heading-section text-3xl text-white md:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg text-white/65">{description}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href={primaryHref} variant="primary" size="lg">
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
              {secondaryLabel && secondaryHref && (
                <Button
                  href={secondaryHref}
                  variant="outlineLight"
                  size="lg"
                >
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
