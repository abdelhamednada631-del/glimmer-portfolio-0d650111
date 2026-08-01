"use client";
import { useEffect, useState } from "react";

/**
 * Returns true once the browser is idle after first paint.
 *
 * Used to keep heavy, non-critical work (the WebGL hero canvas) off the
 * critical path so it never competes with hydration — the source of the very
 * high Total Blocking Time reported by Lighthouse on mobile.
 */
export function useIdleReady(fallbackDelay = 1200) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleHandle = 0;
    let timeout = 0;

    const done = () => {
      if (!cancelled) setReady(true);
    };

    const schedule = () => {
      const ric = (
        window as Window & {
          requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (typeof ric === "function") {
        idleHandle = ric(() => done(), { timeout: fallbackDelay });
      } else {
        timeout = window.setTimeout(done, fallbackDelay);
      }
    };

    if (document.readyState === "complete") {
      schedule();
      return () => {
        cancelled = true;
      };
    }

    window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      window.clearTimeout(timeout);
      const cic = (
        window as Window & { cancelIdleCallback?: (h: number) => void }
      ).cancelIdleCallback;
      if (idleHandle && typeof cic === "function") cic(idleHandle);
    };
  }, [fallbackDelay]);

  return ready;
}
