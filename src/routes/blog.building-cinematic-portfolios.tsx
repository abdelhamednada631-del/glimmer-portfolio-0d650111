import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SectionReveal, Kicker } from "@/components/section-reveal";
import { GlassCard } from "@/components/glass-card";
import { OG_IMAGE } from "@/lib/site";

const TITLE = "Building Cinematic Developer Portfolios";
const DESCRIPTION =
  "A technical guide to building high-performance, cinematic developer portfolios with Three.js, Framer Motion, and TanStack Start — using this site as a case study.";

export const Route = createFileRoute("/blog/building-cinematic-portfolios")({
  head: () => ({
    meta: [
      { title: `${TITLE} · Abdelhamed Nada` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blog/building-cinematic-portfolios" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog/building-cinematic-portfolios" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          author: { "@type": "Person", name: "Abdelhamed Nada" },
          datePublished: "2026-07-06",
          mainEntityOfPage: "/blog/building-cinematic-portfolios",
          keywords: [
            "developer portfolio",
            "portfolio website examples",
            "frontend developer portfolio",
            "Three.js",
            "Framer Motion",
            "TanStack Start",
            "React",
          ],
        }),
      },
    ],
  }),
  component: ArticlePage,
});

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative z-[1] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <Kicker>{kicker}</Kicker>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] tracking-[-0.02em]">
            {title}
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.06}>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-foreground/85">
            {children}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function ArticlePage() {
  return (
    <article className="relative">
      <div aria-hidden className="aurora" />

      <header className="relative z-[1] px-4 pt-32 pb-6 sm:pt-40">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Back to work
            </Link>
            <div className="mt-6">
              <Kicker>Guide · Frontend</Kicker>
            </div>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.02] tracking-[-0.02em]">
              {TITLE}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              How to combine Three.js, Framer Motion, and TanStack Start to ship a portfolio that
              feels cinematic without wrecking Core Web Vitals. Written from the architecture of
              this site.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "React 19",
                "TanStack Start",
                "Three.js",
                "Framer Motion",
                "TypeScript",
                "Tailwind v4",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full glass-subtle px-3 py-1 text-[11px] text-foreground/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <GlassCard className="mt-10 p-6 sm:p-7">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Contents
              </div>
              <ol className="mt-4 space-y-2 text-sm">
                <li>
                  <a className="hover:text-foreground text-foreground/80" href="#why-cinematic">
                    1. Why cinematic portfolios convert
                  </a>
                </li>
                <li>
                  <a className="hover:text-foreground text-foreground/80" href="#stack">
                    2. The stack, and why each piece
                  </a>
                </li>
                <li>
                  <a className="hover:text-foreground text-foreground/80" href="#three-motion">
                    3. Three.js + Framer Motion without jank
                  </a>
                </li>
                <li>
                  <a className="hover:text-foreground text-foreground/80" href="#perf">
                    4. Performance budget & Core Web Vitals
                  </a>
                </li>
                <li>
                  <a className="hover:text-foreground text-foreground/80" href="#seo">
                    5. SEO for JS-heavy sites
                  </a>
                </li>
                <li>
                  <a className="hover:text-foreground text-foreground/80" href="#checklist">
                    6. Ship checklist
                  </a>
                </li>
              </ol>
            </GlassCard>
          </SectionReveal>
        </div>
      </header>

      <Section id="why-cinematic" kicker="01" title="Why cinematic portfolios convert">
        <p>
          A developer portfolio has one job: convince a recruiter or a founder — in under thirty
          seconds — that you can ship the thing they need. Static, template-y portfolios don't
          fail because they look bad; they fail because they look interchangeable. A cinematic
          portfolio signals taste and engineering rigor at the same time.
        </p>
        <p>
          "Cinematic" doesn't mean maximalist. It means intentional motion, real depth, and a
          consistent rhythm. Every animation earns its place: it either reveals hierarchy, hints
          at interactivity, or rewards attention. Nothing loops just to loop.
        </p>
      </Section>

      <Section id="stack" kicker="02" title="The stack, and why each piece">
        <p>
          The whole point of choosing a modern stack is that each tool solves exactly one problem
          well. Here's the split this site uses:
        </p>
        <ul className="list-disc space-y-2 ps-5 marker:text-muted-foreground">
          <li>
            <strong>TanStack Start</strong> — file-based routing, SSR, and typed loaders. Every
            case study renders on the server so search engines get real HTML, not a JS shell.
          </li>
          <li>
            <strong>React 19 + TypeScript</strong> — Suspense boundaries around heavy islands
            (the hero canvas, the intro), strict types across every route param and loader.
          </li>
          <li>
            <strong>Three.js via @react-three/fiber</strong> — declarative WebGL for the hero.
            Fiber lets you treat scenes like React trees and reuse component patterns.
          </li>
          <li>
            <strong>Framer Motion</strong> — DOM animation, layout transitions, and reveal
            choreography. It respects <code>prefers-reduced-motion</code> out of the box.
          </li>
          <li>
            <strong>Tailwind v4 + a small design-token layer</strong> — semantic tokens
            (<code>bg-background</code>, <code>text-foreground</code>) so dark mode and RTL are
            free.
          </li>
          <li>
            <strong>i18next</strong> — English and Arabic with a single JSON per language and
            automatic <code>dir</code> switching.
          </li>
        </ul>
        <p>
          None of these are magic on their own. What matters is that they compose without
          fighting each other — Fiber renders inside React, Framer animates the DOM around it,
          and TanStack Start ships the whole thing with SSR.
        </p>
      </Section>

      <Section id="three-motion" kicker="03" title="Three.js + Framer Motion without jank">
        <p>
          The most common mistake in cinematic portfolios: running a WebGL canvas at 60fps
          <em>and</em> animating dozens of DOM elements at the same time. On a mid-range laptop
          the main thread stalls, Framer's rAF loop backs up, and the hero stutters exactly when
          it should feel most alive.
        </p>
        <p>Three rules keep the two layers from stepping on each other:</p>
        <ol className="list-decimal space-y-3 ps-5 marker:text-muted-foreground">
          <li>
            <strong>Demand-driven rendering.</strong> Set the Fiber canvas to
            <code>frameloop="demand"</code> and invalidate only when the scene actually needs to
            move. Idle tabs cost zero frames. Reduced-motion users see a static hero.
          </li>
          <li>
            <strong>One reveal system for the DOM.</strong> Wrap every section in a single
            <code>{"<SectionReveal />"}</code> primitive that uses
            <code>whileInView</code> with <code>once: true</code>. No per-child stagger loops
            fighting the scroll thread.
          </li>
          <li>
            <strong>Lower the WebGL cost, not the polish.</strong> A torus knot at 128×20 looks
            identical to 160×24, ships fewer verts, and cuts GPU time. Trim
            <code>attenuationDistance</code>, use <code>meshPhysicalMaterial</code> instead of
            <code>MeshTransmissionMaterial</code>, and drop the HDR environment map — three
            directional lights read almost the same and save hundreds of KB.
          </li>
        </ol>
        <p>
          Removing the environment map and switching to physical material on this site cut the
          hero bundle from roughly 2.0 MB to 863 KB with zero visual difference on desktop.
        </p>
      </Section>

      <Section id="perf" kicker="04" title="Performance budget & Core Web Vitals">
        <p>
          Cinematic and fast aren't a trade-off; they're a scheduling problem. Set a budget up
          front and every design decision gets easier.
        </p>
        <ul className="list-disc space-y-2 ps-5 marker:text-muted-foreground">
          <li>
            <strong>LCP under 2.5s</strong> on 4G. The largest element on the home page is text,
            not the canvas. Preload the display font, inline critical CSS, and let the canvas
            hydrate after.
          </li>
          <li>
            <strong>CLS under 0.05.</strong> Reserve aspect-ratio boxes for every image and
            every canvas. Never let the intro overlay push layout when it exits.
          </li>
          <li>
            <strong>Ship images as WebP.</strong> Vite's <code>vite-imagetools</code> plugin
            converts source JPEGs at build time with a query string —
            <code>?format=webp&quality=78&w=1600</code>. Zero runtime cost, ~400 KB saved on
            project covers alone.
          </li>
          <li>
            <strong>Lazy-load analytics.</strong> Wrap Vercel Analytics and Speed Insights in
            <code>React.lazy</code> and a <code>{"<Suspense>"}</code>, then preconnect to their
            beacon domain in the head so the first request is warm when they wake up.
          </li>
        </ul>
      </Section>

      <Section id="seo" kicker="05" title="SEO for JS-heavy sites">
        <p>
          A cinematic site is JS-heavy by definition. SSR is what makes it indexable. TanStack
          Start renders every route to HTML, and each route's <code>head()</code> owns its own
          title, description, canonical, and Open Graph tags. Copy the checklist:
        </p>
        <ul className="list-disc space-y-2 ps-5 marker:text-muted-foreground">
          <li>One <code>{"<h1>"}</code> per route. Use <code>sr-only</code> if the visual
            hierarchy leads with a kicker + h2.</li>
          <li>Unique <code>{"<title>"}</code> under 60 characters and a description between 50
            and 160.</li>
          <li>Add <code>og:image</code> only on leaf routes — root-level images override
            every child.</li>
          <li>Ship a real <code>/sitemap.xml</code>, a <code>robots.txt</code> that mirrors
            it, and a <code>/llms.txt</code> so AI assistants can summarize the site without
            crawling every route.</li>
          <li>JSON-LD per route: <code>Person</code> at the root, <code>CreativeWork</code> or
            <code>Article</code> on case studies and posts like this one.</li>
        </ul>
      </Section>

      <Section id="checklist" kicker="06" title="Ship checklist">
        <p>Before you publish:</p>
        <ul className="list-disc space-y-2 ps-5 marker:text-muted-foreground">
          <li>Lighthouse Performance ≥ 85 on internal routes, CLS ≤ 0.05 everywhere.</li>
          <li>Reduced-motion path verified — the hero canvas stops animating, reveals collapse
            to fade only.</li>
          <li>Every image has an <code>alt</code>, every icon-only button has an
            <code>aria-label</code>.</li>
          <li>Dark and light theme both pass WCAG AA on body text.</li>
          <li>The site works with JS disabled at least far enough to read the pitch and
            contact info.</li>
          <li>404 and error boundaries have their own copy — a broken page is still a design
            surface.</li>
        </ul>
        <p>
          A cinematic portfolio doesn't beat a fast, boring one on paper. It beats it on
          <em>memorability</em>. Ship both.
        </p>

        <div className="pt-6">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Talk about your portfolio
          </Link>
        </div>
      </Section>
    </article>
  );
}
