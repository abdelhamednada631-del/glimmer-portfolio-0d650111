"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const baseVariants = (reduced: boolean): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: reduced ? 0.001 : 0.9, ease: [0.16, 1, 0.3, 1] },
  },
});

export function SectionReveal({
  children,
  delay = 0,
  className,
  as: As = "div" as const,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof motion;
}) {
  const reduced = useReducedMotion() ?? false;
  const Comp = motion[As] as typeof motion.div;
  return (
    <Comp
      variants={baseVariants(reduced)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass-subtle px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] eyebrow-accent">
      <span className="size-1.5 rounded-full brand-gradient animate-pulse-soft" />
      {children}
    </div>
  );
}
