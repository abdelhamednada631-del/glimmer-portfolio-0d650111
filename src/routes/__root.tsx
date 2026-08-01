import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import "../lib/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { IntroExperience } from "@/components/intro";
import { FabStack } from "@/components/fab-stack";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Monitoring, reportMonitoringError } from "@/components/monitoring";
import { lazy, Suspense as ReactSuspense } from "react";
const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
);
const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then((m) => ({ default: m.SpeedInsights })),
);
import { useTranslation } from "react-i18next";
import { applyDirection } from "@/lib/i18n";

const themeBootstrap = `
(function(){try{
  var ls=localStorage.getItem('an_theme');
  var sys=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
  var t=ls||sys;
  var c=document.documentElement.classList;
  c.toggle('light',t==='light');
  c.toggle('dark',t==='dark');
  var lng=localStorage.getItem('an_lang')||(navigator.language||'en').slice(0,2);
  if(lng!=='ar')lng='en';
  document.documentElement.setAttribute('lang',lng);
  document.documentElement.setAttribute('dir',lng==='ar'?'rtl':'ltr');
}catch(e){}})();
`;

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="relative flex min-h-[100svh] items-center justify-center px-4">
      <div aria-hidden className="aurora animate-gradient" />
      <div className="relative max-w-lg text-center">
        <div className="font-display text-[clamp(6rem,18vw,11rem)] leading-none text-gradient animate-gradient">
          404
        </div>
        <h2 className="mt-2 font-display text-2xl tracking-tight">{t("notfound.title")}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{t("notfound.subtitle")}</p>
        <div className="mt-7">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {t("notfound.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
    void reportMonitoringError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center px-4">
      <div aria-hidden className="aurora" />
      <div className="relative max-w-md text-center">
        <h1 className="font-display text-3xl tracking-tight">Something broke.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          You found an edge of the universe. Try again, or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full glass-subtle px-5 py-2.5 text-sm hover:bg-[var(--glass-3)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#000000", media: "(prefers-color-scheme: dark)" },
      { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" },
      { title: "Abdelhamed Nada" },
      {
        name: "description",
        content:
          "Portfolio of Abdelhamed Nada — full-stack developer crafting cinematic, production-grade frontends with React, Next.js, TypeScript, and Supabase.",
      },
      { name: "author", content: "Abdelhamed Nada" },
      { property: "og:site_name", content: "Abdelhamed Nada" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: "@abdelhamednada" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://vitals.vercel-insights.com", crossOrigin: "" },
      { rel: "preconnect", href: "https://api.heronsignal.com", crossOrigin: "" },
      { rel: "dns-prefetch", href: "https://api.heronsignal.com" },
      { rel: "dns-prefetch", href: "https://vitals.vercel-insights.com" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href:
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%237d6cff'/><stop offset='50%' stop-color='%235fc8e8'/><stop offset='100%' stop-color='%23e89cd8'/></linearGradient></defs><circle cx='32' cy='32' r='30' fill='url(%23g)' opacity='0.18'/><path d='M19 46 L29 18 L35 18 L45 46' fill='none' stroke='url(%23g)' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/><path d='M24 36 L40 36' fill='none' stroke='url(%23g)' stroke-width='3' stroke-linecap='round'/><path d='M30 46 L30 22 L44 42 L44 18' fill='none' stroke='url(%23g)' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>`,
          ),
      },
    ],
    scripts: [
      { children: themeBootstrap },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abdelhamed Nada",
          jobTitle: "Full-Stack Developer",
          email: "mailto:dior53634@gmail.com",
          sameAs: ["https://github.com/abbn7"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function LangSync() {
  const { i18n } = useTranslation();
  useEffect(() => {
    applyDirection(i18n.language || "en");
  }, [i18n.language]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LangSync />
      <SmoothScroll />
      <Monitoring />
      <IntroExperience />
      <Nav />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
      <FabStack />
      <ReactSuspense fallback={null}>
        <Analytics />
        <SpeedInsights />
      </ReactSuspense>
    </QueryClientProvider>
  );
}
