import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, Github, MapPin } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { SectionHeader } from "@/components/section-header";
import { GlassCard } from "@/components/glass-card";
import { ContactForm } from "@/components/contact-form";
import { profile, whatsappLink } from "@/lib/data";
import { OG_IMAGE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Abdelhamed Nada" },
      {
        name: "description",
        content:
          "Get in touch with Abdelhamed Nada for freelance and full-time front-end / full-stack engagements.",
      },
      { property: "og:title", content: "Contact — Abdelhamed Nada" },
      { property: "og:description", content: "Let's build something the web remembers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");
  return (
    <div className="relative">
      <div aria-hidden className="aurora" />
      <section className="relative z-[1] px-4 pt-32 pb-8 sm:pt-40 sm:pb-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="sr-only">Contact Abdelhamed Nada</h1>
          <SectionReveal>
            <SectionHeader
              kicker={t("contact.kicker")}
              title={t("contact.title")}
              sub={t("contact.subtitle")}
            />
          </SectionReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <SectionReveal>
              <GlassCard className="p-8 sm:p-10" glow>
                <ContactForm />
              </GlassCard>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <GlassCard className="h-full p-8 sm:p-10">
                <h3 className="font-display text-2xl">Direct lines</h3>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-3 hover:text-foreground text-foreground/85"
                    >
                      <span className="grid size-9 place-items-center rounded-full glass-subtle">
                        <Mail className="size-4" />
                      </span>
                      {profile.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 hover:text-foreground text-foreground/85"
                    >
                      <span className="grid size-9 place-items-center rounded-full glass-subtle">
                        <Phone className="size-4" />
                      </span>
                      {profile.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 hover:text-foreground text-foreground/85"
                    >
                      <span className="grid size-9 place-items-center rounded-full glass-subtle">
                        <Github className="size-4" />
                      </span>
                      github.com/abbn7
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-3 text-foreground/85">
                    <span className="grid size-9 place-items-center rounded-full glass-subtle">
                      <MapPin className="size-4" />
                    </span>
                    {isAr ? profile.locationAr : profile.location}
                  </li>
                </ul>
              </GlassCard>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
