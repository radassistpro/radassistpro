"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { stats } from "@/lib/constants";

export function StatsBar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative z-10 section-padding pt-0 pb-8">
      <div className="container-wide">
        <FadeIn>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-navy-950/8">
            <div className="border-b border-border bg-navy-950 px-6 py-3 lg:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                Performance Across Active Engagements
              </p>
            </div>
            <div className="p-8 lg:p-10">
              <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
                {stats.map((stat) => (
                  <StaggerItem key={stat.label}>
                    <motion.div
                      className="text-center lg:text-left"
                      whileHover={
                        prefersReducedMotion ? undefined : { y: -2 }
                      }
                      transition={{ duration: 0.2 }}
                    >
                      <p className="heading-display text-3xl text-navy-950 md:text-4xl">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm text-muted">{stat.label}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
