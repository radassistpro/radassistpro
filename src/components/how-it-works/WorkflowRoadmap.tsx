"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { images } from "@/lib/images";
import { processSteps } from "@/lib/constants";

const stepImages = [
  images.homeModalityPanel,
  images.workflowSetup,
  images.homeOps,
  images.workflowGoLive,
  images.workflowOptimize,
];

export function WorkflowRoadmap() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding-tight bg-cream-50">
      <div className="container-wide">
        <div className="relative">
          <div className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-0.5 bg-gradient-to-b from-accent via-accent/40 to-border md:left-1/2 md:block md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-0">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <FadeIn key={step.step} delay={index * 0.08}>
                  <div className="relative md:grid md:grid-cols-2 md:gap-12 md:py-10">
                    <div
                      className={`md:flex md:flex-col md:justify-center ${
                        isEven ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 ${
                          isEven ? "md:justify-end" : ""
                        }`}
                      >
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-lg font-bold text-white shadow-lg shadow-navy-950/20">
                          {step.step}
                        </span>
                        <span className="rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                          {step.duration}
                        </span>
                      </div>
                      <h2 className="heading-section mt-5 text-2xl text-navy-950 md:text-3xl">
                        {step.title}
                      </h2>
                      <p className="mt-3 text-muted leading-relaxed">
                        {step.description}
                      </p>
                      <ul className={`mt-5 space-y-2 ${isEven ? "md:ml-auto" : ""}`}>
                        {step.details.map((detail) => (
                          <li
                            key={detail}
                            className={`flex items-start gap-2 text-sm text-navy-800 ${
                              isEven ? "md:flex-row-reverse md:text-right" : ""
                            }`}
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`mt-6 md:mt-0 ${
                        isEven
                          ? "md:col-start-2 md:row-start-1"
                          : "md:col-start-1 md:row-start-1"
                      }`}
                    >
                      <motion.div
                        className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-xl shadow-navy-950/8"
                        whileHover={
                          prefersReducedMotion ? undefined : { y: -4 }
                        }
                        transition={{ duration: 0.35 }}
                      >
                        <Image
                          src={stepImages[index]}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-300">
                            Phase {step.step}
                          </p>
                          <p className="mt-1 font-medium text-white">
                            {step.title}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    <div className="absolute left-[19px] top-8 hidden h-4 w-4 rounded-full border-4 border-cream-50 bg-accent shadow-md md:left-1/2 md:block md:-translate-x-1/2" />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
