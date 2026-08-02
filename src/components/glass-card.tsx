import { forwardRef, useCallback, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type Variant = "subtle" | "default" | "strong";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  noise?: boolean;
  glow?: boolean;
  /** Pointer-tracked light sheen across the surface (overlay only). */
  sheen?: boolean;
  as?: keyof HTMLElementTagNameMap;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  {
    className,
    variant = "default",
    noise = true,
    glow = false,
    sheen = false,
    children,
    onPointerMove,
    ...rest
  },
  ref,
) {
  const v =
    variant === "strong" ? "glass-strong" : variant === "subtle" ? "glass-subtle" : "glass";

  const handleMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(e);
      if (!sheen) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    },
    [sheen, onPointerMove],
  );

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        v,
        noise && "noise",
        sheen && "sheen",
        className,
      )}
      {...rest}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[120%] w-[80%] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, #7d6cff, #5fc8e8, #e89cd8, #7d6cff)",
          }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
});
