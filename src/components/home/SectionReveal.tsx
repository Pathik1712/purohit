"use client";

import { motion, useReducedMotion } from "motion/react";

export function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -30% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
