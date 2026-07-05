"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, Hospital, Siren } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { audiences } from "@/lib/constants";

const icons = [Building2, Hospital, Siren];
const audienceHrefs = [
  "/for/teleradiology-groups",
  "/for/imaging-centers",
  "/for/urgent-care-er",
];
const audienceImages = [
  images.audienceTelerad,
  images.audienceImaging,
  images.audienceUrgent,
];

export function AudienceSection() {
  return (
    <section className="section-padding-tight bg-navy-950 text-white grain">
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            eyebrow="Who This Is For"
            title="Built for U.S. radiology operations"
            description="Whether you're a tele-radiology group, imaging center, or urgent care network, we fit your workflow."
            dark
            align="center"
            className="mx-auto"
          />
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-3">
          {audiences.map((audience, index) => {
            const Icon = icons[index];
            return (
              <StaggerItem key={audience.title}>
                <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-blue-400/30">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={audienceImages[index]}
                      alt={audience.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-navy-950/40" />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/15 text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="heading-section text-lg text-white">{audience.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{audience.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {audience.points.map((point) => (
                        <li key={point} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/70">
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={audienceHrefs[index]}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
