"use client";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/data";
import { trackEvent } from "./monitoring";

export function WhatsAppFab() {
  return (
    <div className="pointer-events-none relative">
      {/* Outer halo — sits OUTSIDE the glass disk so it doesn't wash the icon */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-lg opacity-60 animate-pulse-soft"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(37,211,102,0.55), transparent 70%)",
        }}
      />
      <motion.a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => void trackEvent("whatsapp_click")}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto relative grid size-12 place-items-center rounded-full glass-strong shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      >
        <svg viewBox="0 0 32 32" className="size-5 fill-[#25D366]" aria-hidden>
          <path d="M19.11 17.62c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.13.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.28-.07-.11-.25-.18-.52-.31zM16.03 5.33c-5.9 0-10.7 4.8-10.7 10.69 0 1.89.5 3.74 1.44 5.37L5 27.33l6.1-1.59a10.66 10.66 0 0 0 4.92 1.25h.01c5.9 0 10.7-4.8 10.7-10.69 0-2.86-1.11-5.54-3.13-7.56a10.62 10.62 0 0 0-7.57-3.12zm0 19.55h-.01a8.86 8.86 0 0 1-4.52-1.24l-.32-.19-3.62.95.97-3.53-.21-.36a8.83 8.83 0 0 1-1.36-4.7c0-4.89 3.98-8.86 8.88-8.86 2.37 0 4.6.92 6.27 2.6a8.79 8.79 0 0 1 2.6 6.27c0 4.89-3.98 8.86-8.88 8.86z" />
        </svg>
      </motion.a>
    </div>
  );
}
