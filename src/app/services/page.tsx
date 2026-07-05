import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { images } from "@/lib/images";
import { services, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Radiology Support Services: PACS Admins & Prelim Reads",
  description:
    "Two services, one workflow: virtual PACS admins and licensed prelim teleradiologists working inside your existing PACS. Request a rate card.",
  alternates: { canonical: "/services/" },
};

const serviceHrefs: Record<string, string> = {
  "pacs-admins": "/services/virtual-pacs-admin/",
  "prelim-readers": "/services/prelim-teleradiology/",
};

const hubSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "RadAssistPro Services",
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: service.title,
    url: `${siteConfig.url}${serviceHrefs[service.id]}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={hubSchema} />
      <PageHero
        eyebrow="Our Services"
        title="PACS admin support and preliminary reads"
        description="Both services run inside your existing PACS. We provision users in your environment. No new software licenses or integrations."
        image={images.servicesHero}
        imageAlt="Radiology modalities covered by RadAssistPro PACS admin and prelim read services"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, index) => (
              <FadeIn key={service.id} delay={index * 0.1}>
                <Link
                  href={serviceHrefs[service.id]}
                  className="group block h-full overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/40 to-transparent" />
                  </div>
                  <div className="p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Service 0{index + 1}
                    </p>
                    <h2 className="heading-section mt-3 text-2xl text-navy-950">{service.title}</h2>
                    <p className="mt-3 text-muted leading-relaxed">{service.description}</p>
                    <ul className="mt-6 space-y-2.5">
                      {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-navy-800">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
                      {service.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="heading-display text-xl text-navy-950">{metric.value}</p>
                          <p className="mt-1 text-xs text-muted">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                    <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Explore {service.title}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-tight bg-navy-950 text-white grain">
        <div className="container-wide">
          <FadeIn>
            <SectionHeading
              eyebrow="Pricing"
              title="Tailored to your volume"
              description="Pricing is scoped to your study volumes, modality mix, and hours of coverage. No setup fees. No annual contract required."
              dark
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-10 text-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-blue-50"
              >
                See How Pricing Works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTABand
        title="Request a rate card for your facility"
        description="Share your volumes and coverage hours. We will return a scoped rate card within one business day."
        primaryLabel="Request Rate Card"
        primaryHref="/book-a-call"
        secondaryLabel="See Onboarding Steps"
        secondaryHref="/how-it-works"
      />
    </>
  );
}
