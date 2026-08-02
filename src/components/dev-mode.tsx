"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "./logo";
import { STACK, ARCH } from "@/lib/dev-manifest";
import { trackEvent } from "./monitoring";

export function DevModeButton() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // Lock page scroll while the drawer is open (iOS Safari scrolls the page
  // behind fixed overlays otherwise) and restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevTouch = body.style.touchAction;
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 60);
    return () => {
      body.style.overflow = prevOverflow;
      body.style.touchAction = prevTouch;
      window.clearTimeout(focusTimer);
      triggerRef.current?.focus();
    };
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-auto fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm"
          onClick={close}
        >
          <motion.aside
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={t("dev.title")}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ marginBottom: "max(env(safe-area-inset-bottom), 0.75rem)" }}
            className="pointer-events-auto mx-auto w-[calc(100%-1.5rem)] max-w-md max-h-[82dvh] overflow-y-auto overscroll-contain rounded-3xl glass-strong p-6 outline-none [-webkit-overflow-scrolling:touch]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Logo size={28} />
                <div>
                  <div className="font-display text-2xl leading-tight">{t("dev.title")}</div>
                  <div className="text-xs text-muted-foreground">{t("dev.subtitle")}</div>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={close}
                className="pointer-events-auto grid size-11 shrink-0 place-items-center rounded-full glass-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                <X className="size-4" />
              </button>
            </div>

            <section className="mt-6">
              <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("dev.arch")}
              </h4>
              <ul className="mt-2 space-y-1 font-mono text-xs text-foreground/80">
                {ARCH.map((line) => (
                  <li key={line} className="opacity-90">
                    · {line}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-5">
              <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("dev.libs")}
              </h4>
              <ul className="mt-2 grid grid-cols-1 gap-1.5 text-sm">
                {STACK.map(([name, desc]) => (
                  <li
                    key={name}
                    className="flex items-baseline justify-between gap-3 border-b border-[var(--glass-border)] py-1.5"
                  >
                    <span className="font-medium">{name}</span>
                    <span className="text-xs text-muted-foreground">{desc}</span>
                  </li>
                ))}
              </ul>
            </section>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setOpen(true);
          void trackEvent("devmode_open");
        }}
        aria-label="View developer mode"
        aria-expanded={open}
        aria-haspopup="dialog"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="pointer-events-auto grid size-10 place-items-center rounded-full glass-strong shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      >
        <Code2 className="size-4 opacity-90" strokeWidth={1.75} />
      </motion.button>

      {/* Rendered in a portal: the FAB stack wrapper is `pointer-events-none`,
          which previously made the overlay (and its close button) unclickable. */}
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
