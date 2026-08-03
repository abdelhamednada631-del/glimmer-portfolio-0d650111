import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { SectionHeader } from "@/components/section-header";
import { GlassCard } from "@/components/glass-card";
import { profile, education, skills, highlights } from "@/lib/data";
import { OG_IMAGE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Abdelhamed Nada" },
      {
        name: "description",
        content:
          "Abdelhamed Nada — Full-Stack Developer with a frontend specialism, AI-augmented workflow, and dual academic tracks in CS and AI.",
      },
      { property: "og:title", content: "About — Abdelhamed Nada" },
      {
        property: "og:description",
        content: "Full-Stack Developer. Frontend specialist. AI-augmented workflow.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");
  return (
    <div className="relative">
      <div aria-hidden className="aurora" />
      <section className="relative z-[1] px-4 pt-32 pb-10 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <h1 className="sr-only">About Abdelhamed Nada</h1>
          <SectionReveal>
            <SectionHeader kicker={t("about.kicker")} title={t("about.title")} />
          </SectionReveal>

          <SectionReveal delay={0.06}>
            <GlassCard className="glass-rim mt-10 p-8 sm:p-12" glow>
              <p className="text-pretty text-lg leading-relaxed text-foreground/90">
                {isAr ? profile.summaryAr : profile.summary}
              </p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm">{profile.email}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Phone
                  </dt>
                  <dd className="mt-1 text-sm">{profile.phone}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm">{isAr ? profile.locationAr : profile.location}</dd>
                </div>
              </dl>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent("CV request")}`}
                className="mt-8 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
              >
                {t("about.download_cv")} <ArrowUpRight className="size-4" />
              </a>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      <section className="relative z-[1] px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <h2 className="font-display text-3xl tracking-tight">Key strengths</h2>
          </SectionReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <SectionReveal key={h.title} delay={i * 0.05}>
                <GlassCard className="lift p-6">
                  <div className="font-display text-2xl">{isAr ? h.titleAr : h.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{isAr ? h.descAr : h.desc}</p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-[1] px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <h2 className="font-display text-3xl tracking-tight">Technical skills</h2>
          </SectionReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g, i) => (
              <SectionReveal key={g.group} delay={i * 0.04}>
                <GlassCard className="lift h-full p-6">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {g.group}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full glass-subtle px-3 py-1 text-[12px] text-foreground/85"
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

      <section className="relative z-[1] px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <h2 className="font-display text-3xl tracking-tight">{t("about.education")}</h2>
          </SectionReveal>
          <SectionReveal delay={0.06}>
            <GlassCard className="mt-8 p-8">
              <ol className="space-y-8">
                {education.map((e) => (
                  <li
                    key={e.school}
                    className="grid gap-1 border-l-2 border-[var(--glass-border)] ps-5"
                  >
                    <div className="text-xs text-muted-foreground">{e.period}</div>
                    <div className="font-display text-xl">{e.degree}</div>
                    <div className="text-sm text-muted-foreground">{e.school}</div>
                    <p className="mt-1 text-sm text-foreground/80">{e.note}</p>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
