"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Search, X } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PartnerLogo from "@/components/ui/PartnerLogo";
import { useLanguage } from "@/context/LanguageContext";
import { partners, catAccents, getDbPartners, tCategory, Partner } from "@/lib/partners";

function PartnerCard({ name, logo, initials, accent, description, role, category, hoverHint, website }: {
  name: string; logo: string; initials: string; accent: string;
  description: string; role: string; category: string; hoverHint: string; website?: string;
}) {
  return (
    <div className="flip-card h-[270px] focus-within:outline-none" tabIndex={0}>
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front flex flex-col items-center justify-between p-6 text-center relative"
             style={{ background: "rgba(255, 255, 255, 0.94)", border: "1px solid rgba(214, 163, 74, 0.30)", boxShadow: "0 4px 20px rgba(16,19,18,0.05)" }}>
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
               style={{ background: `linear-gradient(90deg, ${accent}99, ${accent})` }} />
          
          <div className="flex items-center justify-center w-24 h-24 shrink-0 my-auto">
            <PartnerLogo logo={logo} name={name} initials={initials} accent={accent} width={88} height={88} />
          </div>

          <div className="space-y-1.5 w-full">
            <h3 className="text-[#101312] font-display font-bold text-base leading-snug line-clamp-1">{name}</h3>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}40` }}>
              {category}
            </span>
          </div>

          <div className="pt-2 w-full">
            {website ? (
              <a href={website} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-1 text-xs text-[#101312]/60 hover:text-[#9A6A31] transition-colors"
                 onClick={(e) => e.stopPropagation()}>
                <ExternalLink className="w-3 h-3" /> {hoverHint}
              </a>
            ) : (
              <p className="text-[#101312]/40 text-xs text-center">{hoverHint}</p>
            )}
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back flex flex-col justify-between p-6 relative"
             style={{ background: `linear-gradient(135deg, ${accent}15 0%, rgba(255, 255, 255, 0.98) 100%)`, border: `1px solid ${accent}50` }}>
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
               style={{ background: `linear-gradient(90deg, ${accent}99, ${accent})` }} />
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <PartnerLogo logo={logo} name={name} initials={initials} accent={accent} width={48} height={48} />
              <div>
                <h3 className="text-[#101312] font-display font-bold text-sm leading-snug line-clamp-1">{name}</h3>
                <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{role}</p>
              </div>
            </div>
            <p className="text-[#101312]/75 text-xs leading-relaxed font-medium line-clamp-4">{description}</p>
          </div>
          <span className="text-xs font-semibold mt-2" style={{ color: accent }}>{category}</span>
        </div>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  const { t, locale } = useLanguage();
  const [partnerList, setPartnerList] = useState<Partner[]>(partners);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    void loadPartners();
    async function loadPartners() {
      try {
        const fetched = await getDbPartners(locale);
        if (fetched) setPartnerList(fetched);
      } catch {}
    }
  }, [locale]);

  const visiblePartners = partnerList.filter((p) => {
    const matchesCat = activeCategory === "All" || p.categoryKey === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const desc = t(p.descKey) || "";
    const role = t(p.roleKey) || "";
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || role.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden bg-transparent">
        <div className="absolute inset-0 adinkra-bg opacity-10" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(214,163,74,0.12) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <p className="section-subheading">{t("partners_eyebrow")}</p>
          <h1 className="section-heading text-[#101312] mb-6">{t("partners_h1")} <span className="text-gradient">{t("partners_h1b")}</span></h1>
          <p className="text-[#101312]/80 text-lg leading-relaxed font-medium">
            From our headquarters in Addis Ababa, AfroNova connects and collaborates with governments, diplomatic missions, international organizations, broadcasters, and cultural institutions from across Africa and around the world. Hover over any card to explore our partnerships and collaborations.
          </p>
        </div>
      </section>


      {/* Category chips & Search */}
      <section className="pt-14 pb-4 bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom space-y-6">
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-[#101312]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search partners by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 rounded-full bg-white border border-gray-300 text-sm text-[#101312] focus:outline-none focus:border-[#D6A34A] transition-colors shadow-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#101312]/40 hover:text-[#101312]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {["All", ...Object.keys(catAccents)].map((key) => {
              const label = key === "All" ? t("partners_all") || "All Partners" : t(key);
              const accent = catAccents[key] ?? "#D6A34A";
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveCategory(key)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer"
                  style={isActive
                    ? { background: accent, borderColor: accent, color: "#FFFFFF" }
                    : { background: `${accent}15`, borderColor: `${accent}35`, color: accent }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flip Cards */}
      <section className="section-padding pt-8 bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          {visiblePartners.length === 0 ? (
            <div className="card-dark p-8 text-center text-[#101312]/60 rounded-xl">
              No partners found matching your search. Try clearing the search or category filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visiblePartners.map((p) => (
                <PartnerCard
                  key={p.name}
                  name={p.name}
                  logo={p.logo}
                  initials={p.initials}
                  accent={p.accent}
                  description={t(p.descKey)}
                  role={t(p.roleKey)}
                  category={tCategory(p.categoryKey, locale)}
                  hoverHint={t("partners_hover")}
                  website={p.website}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white/70 backdrop-blur-sm border-t border-gray-200">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto rounded-2xl p-8 md:p-12 text-center space-y-5 card-dark">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                 style={{ background: "rgba(214,163,74,0.12)", border: "1px solid rgba(214,163,74,0.35)", color: "#9A6A31" }}>
              {t("partners_cta_badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#101312]">
              {t("partners_cta_h")} <span className="text-gradient">{t("partners_cta_hb")}</span>
            </h2>
            <p className="text-[#101312]/75 leading-relaxed max-w-xl mx-auto font-medium">{t("partners_cta_body")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact" className="btn-primary px-8 py-3.5 shadow-md">{t("partners_cta_btn")} <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/about" className="btn-outline px-8 py-3.5">{t("partners_about_btn")}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

