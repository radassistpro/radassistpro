"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

export function ScanLineOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]"
      aria-hidden
    >
      <div className="scan-line absolute inset-0" />
    </div>
  );
}
