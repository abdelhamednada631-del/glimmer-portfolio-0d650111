"use client";
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LangToggle } from "./lang-toggle";
import { MagneticButton } from "./magnetic-button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", k: "nav.home" },
  { to: "/about", k: "nav.about" },
  { to: "/projects", k: "nav.projects" },
  { to: "/contact", k: "nav.contact" },
] as const;

export function Nav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4 safe-left safe-right">
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500",
          scrolled ? "glass-strong" : "glass",
        )}
      >
        <Link to="/" className="flex items-center gap-2 pl-2" aria-label="Home">
          <Logo size={28} withWordmark />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "nav-underline relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-full glass-subtle" aria-hidden />
                  )}
                  <span className="relative">{t(l.k)}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <ThemeToggle />
          <div className="hidden md:block">
            <MagneticButton variant="primary">
              <Link to="/contact" className="contents">
                {t("nav.cta")}
              </Link>
            </MagneticButton>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 min-h-11 min-w-11 place-items-center rounded-full glass-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-3 top-20 z-40 md:hidden">
          <div className="glass-strong rounded-3xl p-3">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block rounded-2xl px-4 py-3 text-base hover:bg-[var(--glass-3)]"
                  >
                    {t(l.k)}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-2 px-3 pb-1">
                <LangToggle />
                <Link
                  to="/contact"
                  className="flex-1 rounded-full bg-foreground px-4 py-3 text-center text-sm font-medium text-primary-foreground"
                >
                  {t("nav.cta")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
