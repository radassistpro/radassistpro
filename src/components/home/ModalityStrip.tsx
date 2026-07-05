"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { images, modalities } from "@/lib/images";

export function ModalityStrip() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 grain">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={images.modalityBg}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-navy-950/85" />

      <div className="container-wide relative px-5 lg:px-8">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Modalities Covered
            </p>
            <h2 className="heading-section mt-4 max-w-2xl text-2xl text-white md:text-3xl">
              Prelim readers trained across your full modality mix
            </h2>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {modalities.map((mod, i) => (
            <FadeIn key={mod.code} delay={i * 0.08}>
              <div className="modality-glow rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-colors hover:border-blue-400/30 hover:bg-white/8">
                <p className="heading-display text-4xl text-white md:text-5xl">
                  {mod.code}
                </p>
                <p className="mt-2 text-xs text-white/50">{mod.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
