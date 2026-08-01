"use client";
import { useEffect } from "react";
import type { HeronSignalPayload } from "@heronsignal/web";
import { HERONSIGNAL_PUBLIC_KEY } from "@/lib/monitoring-key";

/**
 * HeronSignal real-user monitoring.
 *
 * Loaded lazily after `load` + idle so the tracker never competes with
 * hydration or the LCP paint. No-ops when no public key is configured.
 */

const PUBLIC_KEY =
  (import.meta.env['VITE_HERONSIGNAL_PUBLIC_KEY'] as string | undefined)?.trim() ||
  HERONSIGNAL_PUBLIC_KEY.trim() ||
  undefined;

let started = false;

async function start() {
  if (started || !PUBLIC_KEY) return;
  started = true;
  try {
    const { initHeronSignal } = await import("@heronsignal/web");
    await initHeronSignal({ publicKey: PUBLIC_KEY });
  } catch {
    // Monitoring must never break the site.
  }
}

/** Report a caught error to HeronSignal (safe to call before init). */
export async function reportMonitoringError(error: unknown, context?: HeronSignalPayload) {
  if (!PUBLIC_KEY) return;
  try {
    const mod = await import("@heronsignal/web");
    mod.captureError(error as Error);
    if (context) mod.log("error", String((error as Error)?.message ?? error), context);
  } catch {
    /* noop */
  }
}

/** Track a product event (e.g. `whatsapp_click`). */
export async function trackEvent(name: string, props?: HeronSignalPayload) {
  if (!PUBLIC_KEY) return;
  try {
    const mod = await import("@heronsignal/web");
    mod.event(name, props);
  } catch {
    /* noop */
  }
}

export function Monitoring() {
  useEffect(() => {
    if (!PUBLIC_KEY) return;
    let idle = 0;
    const schedule = () => {
      const ric = (
        window as Window & {
          requestIdleCallback?: (cb: IdleRequestCallback, o?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (typeof ric === "function") idle = ric(() => void start(), { timeout: 3000 });
      else idle = window.setTimeout(() => void start(), 2000);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      window.clearTimeout(idle);
    };
  }, []);
  return null;
}
