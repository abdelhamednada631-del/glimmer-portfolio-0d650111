import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Hero } from "@/components/hero";
import { SectionReveal } from "@/components/section-reveal";
import { SectionHeader } from "@/components/section-header";
import { GlassCard } from "@/components/glass-card";
import { profile, skills, projects, process as proc, processAr, highlights } from "@/lib/data";
import { OG_IMAGE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdelhamed Nada — Full-Stack Developer & Frontend Specialist" },
      {
        name: "description",
        content:
          "Cinematic, production-grade frontends. React · Next.js · TypeScript · Supabase. Built and shipped, with AI woven into the workflow.",
      },
      { property: "og:title", content: "Abdelhamed Nada — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Abdelhamed Nada — cinematic, production-grade frontends in React & Next.js.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");
  const process = isAr ? processAr : proc;
  const featured = projects[0];

  return (
    <>
      <Hero />

      {/* About */}
      <section id="about" className="relative px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <SectionHeader kicker={t("about.kicker")} title={t("about.title")} />
          </SectionReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <SectionReveal>
              <GlassCard className="p-8 sm:p-10" glow>
                <p className="text-pretty text-lg leading-relaxed text-foreground/90">
                  {isAr ? profile.summaryAr : profile.summary}
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {highlights.map((h) => (
                    <div key={h.title} className="rounded-2xl glass-subtle p-4">
                      <div className="font-display text-lg">{isAr ? h.titleAr : h.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {isAr ? h.descAr : h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <GlassCard className="p-8 sm:p-10 h-full">
                <h3 className="font-display text-2xl">{t("about.education")}</h3>
                <ul className="mt-6 space-y-5">
                  <li className="border-l-2 border-[var(--glass-border)] ps-4">
                    <div className="text-sm text-muted-foreground">2024 — Present</div>
                    <div className="mt-0.5 font-medium">
                      B.Sc. Computer Science & Artificial Intelligence
                    </div>
                    <div className="text-sm text-muted-foreground">Tanta University</div>
                  </li>
                  <li className="border-l-2 border-[var(--glass-border)] ps-4">
                    <div className="text-sm text-muted-foreground">2022 — 2024</div>
                    <div className="mt-0.5 font-medium">B.Sc. Computer Science</div>
                    <div className="text-sm text-muted-foreground">
                      Pharos University in Alexandria
                    </div>
                  </li>
                </ul>
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent("CV request")}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm text-foreground/90 underline-offset-4 hover:underline"
                >
                  {t("about.download_cv")} <ArrowUpRight className="size-4" />
                </a>
              </GlassCard>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="relative px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <SectionHeader kicker={t("skills.kicker")} title={t("skills.title")} />
          </SectionReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g, i) => (
              <SectionReveal key={g.group} delay={i * 0.05}>
                <GlassCard className="h-full p-6">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {g.group}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full glass-subtle px-3 py-1 text-[12px] text-foreground/85 transition-colors hover:text-foreground hover:bg-[var(--glass-3)] motion-reduce:transition-none"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured project */}
      <section className="relative px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <SectionHeader kicker={t("projects.kicker")} title={t("projects.title")} />
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <GlassCard sheen className="mt-12 overflow-hidden" glow>
              <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {featured.year} · {isAr ? featured.roleAr : featured.role}
                  </div>
                  <h3 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-tight">
                    {isAr ? featured.titleAr : featured.title}
                  </h3>
                  <p className="mt-4 max-w-md text-muted-foreground">
                    {isAr ? featured.taglineAr : featured.tagline}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {Object.values(featured.stack).flat().slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="rounded-full glass-subtle px-3 py-1 text-[11px] text-foreground/85 transition-colors hover:bg-[var(--glass-3)] motion-reduce:transition-none"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: featured.slug }}
                      className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                    >
                      {t("projects.view_case")}{" "}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 motion-reduce:transition-none" />
                    </Link>
                    <a
                      href={featured.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full glass-subtle px-5 py-3 text-sm transition hover:bg-[var(--glass-3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                    >
                      {t("projects.live")} <ExternalLink className="size-4" />
                    </a>
                    {featured.repos?.[0] && (
                      <a
                        href={featured.repos[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                      >
                        <Github className="size-4" /> {t("projects.code")}
                      </a>
                    )}
                  </div>
                </div>

                <div className="group relative min-h-72 overflow-hidden border-t border-[var(--glass-border)] lg:border-t-0 lg:border-s">
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      {/* Process */}
      <section className="relative px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <SectionHeader kicker={t("process.kicker")} title={t("process.title")} />
          </SectionReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <SectionReveal key={p.t} delay={i * 0.06}>
                <GlassCard className="h-full p-6 transition-colors duration-300 hover:bg-[var(--glass-3)] motion-reduce:transition-none">
                  <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
                  <div className="mt-3 font-display text-2xl tracking-tight">{p.t}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <GlassCard className="p-10 sm:p-14 text-center" glow>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("contact.kicker")}
              </div>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] leading-tight tracking-tight">
                Let's build something{" "}
                <span className="text-gradient animate-gradient">the web remembers</span>.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{t("contact.subtitle")}</p>
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                >
                  {t("nav.cta")}{" "}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 motion-reduce:transition-none" />
                </Link>
              </div>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
