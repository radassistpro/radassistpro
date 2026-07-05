"use client";

import { motion, useReducedMotion } from "framer-motion";

const items = [
  "33+ U.S. Facilities Supported",
  "50,000+ Studies Managed",
  "Documented Relay Compliance",
  "18 min Median Prelim TAT",
  "HIPAA-Aligned Workflows",
  "24/7/365 Coverage",
  "Works in Your PACS",
  "99.2% Internal QA Pass Rate",
];

export function ProofMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const doubled = [...items, ...items];

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-4 px-5 py-6">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-navy-800"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-y border-border bg-navy-950 py-4">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-950 to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-950 to-transparent" />

      <motion.div
        className="flex w-max gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-3 text-sm font-medium tracking-wide text-white/70"
          >
            <span className="h-1 w-1 rounded-full bg-blue-400" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
