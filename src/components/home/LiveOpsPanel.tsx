"use client";

import { Activity, Clock, Shield, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const liveMetrics = [
  { icon: Clock, label: "Prelim TAT", value: "18 min", trend: "↓ 35%" },
  { icon: Activity, label: "Worklist", value: "Clear", trend: "Live" },
  { icon: Zap, label: "STAT Relay", value: "< 3 min", trend: "100%" },
  { icon: Shield, label: "QA Score", value: "99.2%", trend: "Excellent" },
];

export function LiveOpsPanel() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="w-full max-w-md rounded-2xl border border-white/15 bg-navy-950/75 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl lg:p-6"
      initial={prefersReducedMotion ? false : { opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
            Live Operations
          </p>
          <p className="mt-1 text-sm font-medium text-white/90">
            PACS Dashboard
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {liveMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="rounded-xl border border-white/8 bg-white/5 p-3.5"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
          >
            <metric.icon className="mb-2 h-4 w-4 text-blue-400" />
            <p className="text-lg font-semibold text-white">{metric.value}</p>
            <p className="text-[11px] text-white/50">{metric.label}</p>
            <p className="mt-1 text-[10px] font-medium text-emerald-400/80">
              {metric.trend}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/8 bg-white/5 p-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/50">Studies today</span>
          <span className="font-semibold text-white">247</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}
