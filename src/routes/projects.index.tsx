import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { SectionHeader } from "@/components/section-header";
import { GlassCard } from "@/components/glass-card";
import { projects } from "@/lib/data";
import { OG_IMAGE } from "@/lib/site";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Abdelhamed Nada" },
      {
        name: "description",
        content: "Selected work by Abdelhamed Nada — shipped, public, and in production.",
      },
      { property: "og:title", content: "Projects — Abdelhamed Nada" },
      {
        property: "og:description",
        content: "Selected work — shipped, public, and in production.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");
  return (
    <div className="relative">
      <div aria-hidden className="aurora" />
      <section className="relative z-[1] px-4 pt-32 pb-8 sm:pt-40 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="sr-only">Portfolio of Shipped Projects</h1>
          <SectionReveal>
            <SectionHeader kicker={t("projects.kicker")} title={t("projects.title")} />
          </SectionReveal>

          <div className="mt-12 grid gap-6">
            {projects.map((p, i) => (
              <SectionReveal key={p.slug} delay={i * 0.06}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`${isAr ? p.titleAr : p.title} — ${t("projects.view_case")}`}
                >
                  <GlassCard sheen className="overflow-hidden transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-[var(--glass-3)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                    <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
                      <div className="relative min-h-72 overflow-hidden">
                        <img
                          src={p.cover}
                          alt={p.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent" />
                      </div>
                      <div className="p-8 sm:p-10 lg:p-12">
                        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {p.year} · {isAr ? p.roleAr : p.role}
                        </div>
                        <h3 className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight tracking-tight">
                          {isAr ? p.titleAr : p.title}
                        </h3>
                        <p className="mt-3 text-muted-foreground">
                          {isAr ? p.taglineAr : p.tagline}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {Object.values(p.stack).flat().slice(0, 6).map((s) => (
                            <span
                              key={s}
                              className="rounded-full glass-subtle px-3 py-1 text-[11px] text-foreground/85"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="mt-8 inline-flex items-center gap-2 text-sm">
                          {t("projects.view_case")}
                          <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 motion-reduce:transition-none" />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
