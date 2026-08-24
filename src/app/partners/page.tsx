"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PartnerLogo from "@/components/ui/PartnerLogo";
import { useLanguage } from "@/context/LanguageContext";
import { partners, catAccents } from "@/lib/partners";

function PartnerCard({ name, logo, initials, accent, description, role, category, hoverHint, website }: {
  name: string; logo: string; initials: string; accent: string;
  description: string; role: string; category: string; hoverHint: string; website?: string;
}) {
  return (
    <div className="flip-card h-56 focus-within:outline-none" tabIndex={0}>
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front flex flex-col items-center justify-center gap-4 p-6 text-center relative"
             style={{ background: "rgba(0,0,0,0.40)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
               style={{ background: `linear-gradient(90deg, ${accent}99, ${accent})` }} />
          <div className="flex items-center justify-center w-32 h-32 shrink-0">
            <PartnerLogo logo={logo} name={name} initials={initials} accent={accent} width={112} height={112} />
          </div>
          <div>
            <h3 className="text-white font-display font-bold text-base leading-snug">{name}</h3>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
              {category}
            </span>
          </div>
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer"
               className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1 text-xs text-white/30 hover:text-[#D6A34A] transition-colors"
               onClick={(e) => e.stopPropagation()}>
              <ExternalLink className="w-3 h-3" /> {hoverHint}
            </a>
          )}
          {!website && (
            <p className="text-white/30 text-xs absolute bottom-4 left-0 right-0 text-center">{hoverHint}</p>
          )}
        </div>
        {/* BACK */}
        <div className="flip-card-back flex flex-col justify-between p-6 relative"
             style={{ background: `linear-gradient(135deg, ${accent}22 0%, rgba(0,0,0,0.70) 100%)`, border: `1px solid ${accent}50` }}>
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
               style={{ background: `linear-gradient(90deg, ${accent}99, ${accent})` }} />
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <PartnerLogo logo={logo} name={name} initials={initials} accent={accent} width={56} height={56} />
              <div>
                <h3 className="text-white font-display font-bold text-base leading-snug">{name}</h3>
                <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{role}</p>
              </div>
            </div>
            <p className="text-white/70 text-xs leading-relaxed line-clamp-5">{description}</p>
          </div>
          <span className="text-xs font-medium mt-2" style={{ color: `${accent}CC` }}>{category}</span>
        </div>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 adinkra-bg opacity-60" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(154,106,49,0.22) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <p className="section-subheading">{t("partners_eyebrow")}</p>
          <h1 className="section-heading text-white mb-6">{t("partners_h1")} <span className="text-gradient">{t("partners_h1b")}</span></h1>
          <p className="text-white/60 text-lg leading-relaxed">{t("partners_hero_body")}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 py-10 section-overlay">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "15+", label: t("partners_stat1") },
              { value: "50+", label: t("partners_stat2") },
              { value: "6",   label: t("partners_stat3") },
              { value: "5+",  label: t("partners_stat4") },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-display font-black text-gradient mb-1">{value}</p>
                <p className="text-white/45 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="pt-14 pb-4">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {["All", ...Object.keys(catAccents)].map((key) => {
              const label = key === "All" ? t("partners_all") || "All" : t(key);
              const accent = catAccents[key] ?? "#D6A34A";
              return (
                <span key={key} className="px-4 py-1.5 rounded-full text-xs font-semibold cursor-default"
                      style={{ background: `${accent}15`, border: `1px solid ${accent}35`, color: accent }}>
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flip Cards */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {partners.map((p) => (
              <PartnerCard
                key={p.name}
                name={p.name}
                logo={p.logo}
                initials={p.initials}
                accent={p.accent}
                description={t(p.descKey)}
                role={t(p.roleKey)}
                category={t(p.categoryKey)}
                hoverHint={t("partners_hover")}
                website={p.website}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto rounded-2xl p-8 md:p-12 text-center space-y-5"
               style={{ background: "rgba(0,0,0,0.30)", border: "1px solid rgba(214,163,74,0.25)" }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                 style={{ background: "rgba(214,163,74,0.12)", border: "1px solid rgba(214,163,74,0.35)", color: "#D6A34A" }}>
              {t("partners_cta_badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              {t("partners_cta_h")} <span className="text-gradient">{t("partners_cta_hb")}</span>
            </h2>
            <p className="text-white/60 leading-relaxed max-w-xl mx-auto">{t("partners_cta_body")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact" className="btn-primary px-8 py-3.5">{t("partners_cta_btn")} <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/about" className="btn-outline px-8 py-3.5">{t("partners_about_btn")}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
