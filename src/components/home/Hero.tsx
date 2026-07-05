"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScanLineOverlay } from "@/components/ui/ScrollProgress";
import { LiveOpsPanel } from "@/components/home/LiveOpsPanel";
import { images } from "@/lib/images";
import { siteConfig, trustBadges } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-navy-950">
      <div className="hero-ken-burns absolute inset-0">
        <Image
          src={images.hero}
          alt="Radiologist reviewing studies at a PACS workstation in a U.S. reading room"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={75}
        />
      </div>

      <div className="video-overlay absolute inset-0" />
      <ScanLineOverlay />
      <div className="grain absolute inset-0" />

      <div className="hero-grid-overlay pointer-events-none absolute inset-0 opacity-[0.07]" />

      <div className="relative flex min-h-[100svh] flex-col justify-end pb-12 pt-28 lg:pb-20 lg:pt-36">
        <div className="container-wide px-5 lg:px-8">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <FadeIn>
                <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
                  </span>
                  Now serving 33+ U.S. facilities
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="heading-display max-w-4xl text-balance text-[clamp(2.75rem,6.5vw,5.25rem)] text-white">
                  {siteConfig.tagline}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="mt-6 max-w-2xl text-xl font-semibold leading-snug text-white/95 md:text-2xl">
                  Virtual PACS Admins and Prelim Teleradiology for U.S. Radiology
                  Groups
                </h1>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                  PACS-trained administrators and licensed prelim readers who work
                  inside your existing systems. No new software. No workflow
                  rebuild. Coverage that fits how your group already operates.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button href="/book-a-call" variant="primary" size="lg">
                    Book a 15-Minute Call
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    href="/how-it-works"
                    variant="outlineLight"
                    size="lg"
                  >
                    <Play className="h-4 w-4" />
                    How Onboarding Works
                  </Button>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="mt-12 flex flex-wrap gap-2.5">
                  {trustBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-white/12 bg-white/6 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white/75 backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </FadeIn>

              <div className="mt-10 lg:hidden">
                <LiveOpsPanel />
              </div>
            </div>

            <div className="hidden lg:block">
              <LiveOpsPanel />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream-50 via-cream-50/80 to-transparent" />
    </section>
  );
}
