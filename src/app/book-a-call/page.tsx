import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CalBookingEmbed } from "@/components/booking/CalBookingEmbed";
import { CalEmbedScript } from "@/components/booking/CalEmbedScript";
import { calcomConfig } from "@/lib/calcom";
import { FadeIn } from "@/components/ui/FadeIn";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Book a Call: Scope Your Radiology Coverage",
  description:
    "Schedule a 15-minute workflow review with the RadAssistPro U.S. team. Get a scoped radiology coverage plan and rate card within one business day.",
  alternates: { canonical: "/book-a-call/" },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Book a Call with RadAssistPro",
  description:
    "Schedule a 15-minute workflow review covering study volumes, modality mix, and coverage gaps.",
  url: `${siteConfig.url}/book-a-call/`,
};

export default function BookCallPage() {
  return (
    <>
      <CalEmbedScript />
      <JsonLd data={contactPageSchema} />
      <section className="relative min-h-[44vh] overflow-hidden bg-navy-950 pt-32 pb-14 grain lg:pt-36 lg:pb-16">
        <div className="hero-ken-burns absolute inset-0">
          <Image
            src={images.bookCallHero}
            alt="RadAssistPro scheduling coordinator ready for consultation"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="video-overlay absolute inset-0" />
        <div className="container-wide relative px-5 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Book a Call
            </p>
            <h1 className="heading-display mt-4 max-w-3xl text-4xl text-white md:text-5xl">
              Let&apos;s scope your radiology workflow
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">
              Choose a time below for a {calcomConfig.durationMinutes}-minute call
              with our U.S. team. We follow up with a scoped plan within one
              business day.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding-tight bg-cream-50">
        <div className="container-wide">
          <FadeIn>
            <CalBookingEmbed className="mx-auto w-full max-w-5xl" />
          </FadeIn>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            <FadeIn delay={0.05}>
              <div>
                <h2 className="heading-section text-xl text-navy-950">
                  What we&apos;ll cover
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-muted">
                  <li>Study volumes, modality mix, and coverage hours</li>
                  <li>Current PACS workflow and pain points</li>
                  <li>STAT rules, relay protocols, and TAT goals</li>
                  <li>Custom rate card and go-live timeline</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-border bg-surface p-6 md:col-span-1 lg:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  Direct Contact
                </p>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  <li className="flex items-center gap-3 text-sm text-navy-800">
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    <a
                      href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                      className="hover:text-accent cursor-pointer"
                    >
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-navy-800">
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="hover:text-accent cursor-pointer"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-navy-800 sm:col-span-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {siteConfig.address}
                  </li>
                  <li className="flex items-center gap-3 text-sm text-navy-800 sm:col-span-2">
                    <Clock className="h-4 w-4 shrink-0 text-accent" />
                    Responds within 1 business day
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
