"use client";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { TextRotator } from "./text-morph";
import { profile } from "@/lib/data";
import { useIdleReady } from "@/hooks/use-idle-ready";

const HeroCanvas = lazy(() => import("./hero-canvas"));

export function Hero() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  // Keep three.js off the critical path: mount only after the browser goes idle.
  const idleReady = useIdleReady();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /**
   * Pointer parallax for the static hero field.
   *
   * The old aurora ran an infinite keyframe loop on a 60px-blurred layer. This
   * writes two CSS custom properties at most once per frame and only while the
   * pointer is actually over the hero — no continuous work, nothing on mobile
   * (fine pointers only), and nothing at all under reduced motion.
   */
  useEffect(() => {
    const el = sectionRef.current;
    const field = fieldRef.current;
    if (!el || !field) return;
    if (typeof matchMedia === "undefined") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let nx = 0;
    let ny = 0;
    const apply = () => {
      raf = 0;
      field.style.setProperty("--hx", nx.toFixed(3));
      field.style.setProperty("--hy", ny.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      nx = (e.clientX - r.left) / r.width - 0.5;
      ny = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      nx = 0;
      ny = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const roles = i18n.language?.startsWith("ar") ? profile.rolesAr : profile.roles;
  const chips = ["React", "Next.js", "TypeScript", "Supabase", "Python"];

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Luxe static field — replaces the perpetually animated aurora */}
      <div ref={fieldRef} aria-hidden className="hero-field">
        <div className="hf-glow" />
        <div className="hf-silk" />
        <div className="hf-horizon" />
        <div className="hf-vignette" />
      </div>
      {/* 3D layer — only mounted while hero is visible to keep the GPU idle on scroll */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-90 [mask-image:radial-gradient(60%_60%_at_70%_40%,#000_40%,transparent_75%)]">
        {inView && idleReady && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </div>


      <div className="relative z-[2] mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="inline-flex items-center gap-2 self-start rounded-full glass-subtle px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.95] tracking-[-0.03em]"
        >
          {t("hero.title_pre")} <br />
          <span className="text-gradient animate-gradient">{t("hero.title_grad")}</span>
          {t("hero.title_post")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
          className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.46 }}
          className="flex flex-wrap items-center gap-3"
        >
          <MagneticButton variant="primary">
            <Link to="/projects" className="contents">
              {t("hero.view_work")} <ArrowRight className="size-4 rtl-flip" />
            </Link>
          </MagneticButton>
          <MagneticButton variant="outline">
            <Link to="/contact" className="contents">
              {t("hero.lets_talk")} <ArrowUpRight className="size-4" />
            </Link>
          </MagneticButton>
          <div className="ms-2 hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
            <span className="size-1 rounded-full bg-current/40" />
            <TextRotator items={roles} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-2 flex flex-wrap items-center gap-2"
        >
          {chips.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.06, duration: 0.5 }}
              className="rounded-full glass-subtle px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-[var(--glass-3)] motion-reduce:transition-none"
            >
              {c}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span>{t("hero.scroll")}</span>
          <ChevronDown className="size-4 animate-float" />
        </motion.div>
      </div>
    </section>
  );
}
