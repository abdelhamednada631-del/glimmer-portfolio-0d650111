"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { profile, whatsappLink } from "@/lib/data";
import { trackEvent, trackLog } from "./monitoring";

export function ContactForm() {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const schema = z.object({
      name: z.string().trim().min(1, t("contact.errors.name")).max(80),
      email: z.string().trim().email(t("contact.errors.email")).max(120),
      message: z.string().trim().min(4, t("contact.errors.message")).max(2000),
    });
    const r = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!r.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of r.error.issues) {
        const k = issue.path[0] as keyof typeof errors;
        fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      void trackLog("warn", "contact_validation_failed", {
        fields: Object.keys(fieldErrors).join(","),
      });
      return;
    }
    setErrors({});
    const body = `From: ${r.data.name} <${r.data.email}>\n\n${r.data.message}`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      "Portfolio inquiry — " + r.data.name,
    )}&body=${encodeURIComponent(body)}`;
    void trackEvent("contact_submit");
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <Field id="name" label={t("contact.name")} error={errors.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          className="w-full rounded-xl glass-subtle bg-transparent px-4 py-3 text-sm outline-none focus:bg-[var(--glass-3)]"
        />
      </Field>
      <Field id="email" label={t("contact.email")} error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-xl glass-subtle bg-transparent px-4 py-3 text-sm outline-none focus:bg-[var(--glass-3)]"
        />
      </Field>
      <Field id="message" label={t("contact.message")} error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full resize-none rounded-xl glass-subtle bg-transparent px-4 py-3 text-sm outline-none focus:bg-[var(--glass-3)]"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          {t("contact.send")} <Send className="size-4 rtl-flip" />
        </motion.button>
        <span className="text-xs text-muted-foreground">{t("contact.or")}</span>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full glass-subtle px-4 py-2.5 text-sm hover:bg-[var(--glass-3)]"
        >
          <MessageCircle className="size-4" /> {t("contact.whatsapp")}
        </a>
      </div>

      {sent && (
        <p className="text-sm text-emerald-400/90">{t("contact.sent")}</p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
