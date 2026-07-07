import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

export function HomeContactCTA() {
  return (
    <section className="section-padding-tight bg-cream-100">
      <div className="container-wide">
        <FadeIn>
          <div className="rounded-2xl border border-border bg-surface p-8 md:flex md:items-center md:justify-between md:gap-10 md:p-10">
            <div className="max-w-xl">
              <SectionHeading
                eyebrow="Next Step"
                title="Talk to someone who knows radiology operations"
                description="A short call with our U.S. team to review your volumes, modalities, and coverage gaps. No obligation."
              />
              <p className="mt-4 text-sm text-muted">
                {siteConfig.phone} · {siteConfig.email}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
              <Button href="/book-a-call" variant="primary" size="lg">
                Book a 15-Minute Call
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/how-it-works" variant="outline" size="lg">
                See Onboarding Steps
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
