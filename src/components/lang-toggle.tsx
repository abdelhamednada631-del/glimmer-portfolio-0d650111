"use client";
import { useTranslation } from "react-i18next";
import { applyDirection } from "@/lib/i18n";
import { trackEvent } from "./monitoring";

export function LangToggle() {
  const { i18n } = useTranslation();
  const next = i18n.language?.startsWith("ar") ? "en" : "ar";
  function swap() {
    i18n.changeLanguage(next);
    applyDirection(next);
    void trackEvent("lang_switch", { to: next });
  }
  return (
    <button
      type="button"
      onClick={swap}
      aria-label="Switch language"
      className="grid h-10 min-w-10 place-items-center rounded-full glass-subtle px-3 text-xs font-medium tracking-widest hover:bg-[var(--glass-3)] transition"
    >
      {next.toUpperCase()}
    </button>
  );
}
