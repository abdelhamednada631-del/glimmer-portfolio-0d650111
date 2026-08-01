"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroExperience() {
  const reduced = useReducedMotion() ?? false;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem("an_intro_seen") === "1") return;
      sessionStorage.setItem("an_intro_seen", "1");
    } catch {}
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 1400);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black"
        >
          <button
            type="button"
            aria-label="Skip intro"
            onClick={() => setShow(false)}
            className="absolute right-4 top-4 rounded-full glass-subtle px-3 py-1.5 text-xs text-white/70 hover:text-white"
          >
            Skip
          </button>

          <div className="relative grid place-items-center">
            <motion.div
              aria-hidden
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute size-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(125,108,255,0.5), rgba(95,200,232,0.3) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <svg
              width="180"
              height="180"
              viewBox="0 0 64 64"
              aria-label="AN monogram"
              className="relative"
            >
              <defs>
                <linearGradient id="intro-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7d6cff" />
                  <stop offset="50%" stopColor="#5fc8e8" />
                  <stop offset="100%" stopColor="#e89cd8" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="32"
                cy="32"
                r="30"
                fill="none"
                stroke="url(#intro-g)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d="M19 46 L29 18 L35 18 L45 46"
                fill="none"
                stroke="url(#intro-g)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d="M24 36 L40 36"
                fill="none"
                stroke="url(#intro-g)"
                strokeWidth="2.4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d="M30 46 L30 22 L44 42 L44 18"
                fill="none"
                stroke="url(#intro-g)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50"
            >
              Abdelhamed Nada
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
