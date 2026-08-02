import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { GlassCard } from "@/components/glass-card";
import { projects } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";
import { useEffect } from "react";
import { trackEvent } from "@/components/monitoring";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    const p = loaderData;
    if (!p) return { meta: [{ title: "Project — Abdelhamed Nada" }] };
    return {
      meta: [
        { title: `${p.title} · Abdelhamed Nada` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.title} — Case Study` },
        { property: "og:description", content: p.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${p.slug}` },
        { property: "og:image", content: absoluteUrl(p.cover) },
        { name: "twitter:image", content: absoluteUrl(p.cover) },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/projects/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.title,
            description: p.tagline,
            url: p.live,
            author: { "@type": "Person", name: "Abdelhamed Nada" },
            dateCreated: p.year,
          }),
        },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="grid min-h-[60svh] place-items-center px-4">
      <div className="text-center">
        <h1 className="font-display text-4xl">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block text-sm underline">
          Back to projects
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="grid min-h-[60svh] place-items-center px-4">
      <div className="text-center">
        <h1 className="font-display text-3xl">Couldn't load this case study</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-full bg-foreground px-4 py-2 text-sm text-primary-foreground"
        >
          Retry
        </button>
      </div>
    </div>
  ),
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const p = projects.find((x) => x.slug === slug)!;
  const { t, i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");

  useEffect(() => {
    void trackEvent("project_view", { slug });
  }, [slug]);




  return (
    <article className="relative">
      <div aria-hidden className="aurora" />

      <section className="relative z-[1] px-4 pt-32 pb-8 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            <ArrowLeft className="size-4 rtl-flip" /> {t("projects.back")}
          </Link>

          <SectionReveal>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {p.year} · {isAr ? p.roleAr : p.role}
            </div>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,7vw,5rem)] leading-[0.98] tracking-[-0.02em]">
              {isAr ? p.titleAr : p.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {isAr ? p.taglineAr : p.tagline}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} — ${t("projects.live")}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
              >
                {t("projects.live")} <ExternalLink className="size-4" />
              </a>
              {p.repos?.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.title} — ${r.label} (GitHub)`}
                  className="inline-flex items-center gap-2 rounded-full glass-subtle px-4 py-2.5 text-sm transition hover:bg-[var(--glass-3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                >
                  <Github className="size-4" /> {r.label}
                </a>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="relative z-[1] px-4 pb-8">
        <div className="mx-auto max-w-6xl">
          <SectionReveal delay={0.05}>
            <GlassCard className="overflow-hidden">
              <img
                src={p.cover}
                alt={`${p.title} — hero`}
                className="h-auto w-full"
                loading="eager"
                decoding="async"
              />
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      <section className="relative z-[1] px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <SectionReveal>
            <GlassCard className="p-8 sm:p-10">
              <h2 className="font-display text-3xl tracking-tight">{t("projects.overview")}</h2>
              <p className="mt-4 text-pretty leading-relaxed text-foreground/90">
                {isAr ? p.overviewAr : p.overview}
              </p>
            </GlassCard>
          </SectionReveal>
          <SectionReveal delay={0.06}>
            <GlassCard className="h-full p-8 sm:p-10">
              <h2 className="font-display text-2xl tracking-tight">{t("projects.stack")}</h2>
              <dl className="mt-5 space-y-5">
                {Object.entries(p.stack).map(([k, items]) => (
                  <div key={k}>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {items.map((s) => (
                        <span
                          key={s}
                          className="rounded-full glass-subtle px-3 py-1 text-[12px] text-foreground/85"
                        >
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      <section className="relative z-[1] px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <h2 className="font-display text-3xl tracking-tight">{t("projects.features")}</h2>
          </SectionReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.features.map((f, i) => (
              <SectionReveal key={f.t} delay={i * 0.03}>
                <GlassCard className="h-full p-6">
                  <div className="font-display text-lg">{f.t}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {(p.architecture.length > 0 || p.security.length > 0) && (
        <section className="relative z-[1] px-4 py-8 sm:py-10">
          <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2">
            {p.architecture.length > 0 && (
              <SectionReveal>
                <GlassCard className="h-full p-8 sm:p-10">
                  <h2 className="font-display text-2xl tracking-tight">
                    {t("projects.architecture")}
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {p.architecture.map((a, i) => (
                      <li key={a.t} className="grid grid-cols-[auto_1fr] items-baseline gap-3">
                        <span className="font-mono text-xs text-muted-foreground">
                          0{i + 1}
                        </span>
                        <div>
                          <div className="font-medium">{a.t}</div>
                          <p className="mt-1 text-sm text-muted-foreground">{a.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </SectionReveal>
            )}
            {p.security.length > 0 && (
              <SectionReveal delay={0.06}>
                <GlassCard className="h-full p-8 sm:p-10">
                  <h2 className="font-display text-2xl tracking-tight">
                    {t("projects.security")}
                  </h2>
                  <ul className="mt-6 space-y-3 text-sm text-foreground/85">
                    {p.security.map((s) => (
                      <li key={s} className="border-l-2 border-[var(--glass-border)] ps-4">
                        {s}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </SectionReveal>
            )}
          </div>
        </section>
      )}

      {p.commands.length > 0 && (
        <section className="relative z-[1] px-4 py-8 sm:py-10">
          <div className="mx-auto max-w-6xl">
            <SectionReveal>
              <h2 className="font-display text-3xl tracking-tight">{t("projects.commands")}</h2>
            </SectionReveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {p.commands.map((c, i) => (
                <SectionReveal key={c.c} delay={i * 0.02}>
                  <GlassCard className="p-5">
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-sm text-foreground">{c.c}</code>
                      <span className="rounded-full glass-subtle px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {c.k}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
                  </GlassCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative z-[1] px-4 py-8 pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionReveal>
            <h2 className="font-display text-3xl tracking-tight">{t("projects.gallery")}</h2>
          </SectionReveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {p.gallery.map((g, i) => (
              <SectionReveal key={g.src} delay={i * 0.05}>
                <GlassCard className="group overflow-hidden transition-colors duration-300 hover:bg-[var(--glass-3)] motion-reduce:transition-none">
                  <div className="overflow-hidden">
                    <img
                      src={g.src}
                      alt={g.caption}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <div className="p-4 text-xs text-muted-foreground">{g.caption}</div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
