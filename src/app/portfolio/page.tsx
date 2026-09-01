"use client";

import { Play, Calendar, MapPin, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export default function PortfolioPage() {
  const { t } = useLanguage();

  const featuredProjects = [
    {
      title: "Africa Celebrates 2025, 5th Edition",
      theme: "Justice for Africans and People of African Descent through and Beyond Reparations",
      role: "Lead Implementing Partner in Ethiopia",
      highlights: [
        t("fp1_h1"), t("fp1_h2"), t("fp1_h3"), t("fp1_h4"),
      ],
      accent: "#D6A34A", year: "2025",
    },
    {
      title: "AFRIMA 2025",
      theme: "World Media Calendar Unveiling & Music Conference, \"Music Beyond Borders\"",
      role: "Full Event Facilitator & Media Partner",
      highlights: [
        t("fp2_h1"), t("fp2_h2"), t("fp2_h3"), t("fp2_h4"),
      ],
      accent: "#B9853B", year: "2025",
    },
  ];

  const pastEditions = [
    { edition: t("ed5"), year: "2025", theme: "Justice for Africans and People of African Descent through and Beyond Reparations", attendees: "12,000+", nations: "42", accent: "#D6A34A" },
    { edition: t("ed4"), year: "2024", theme: "Unite, Celebrate, Prosper", attendees: "10,000+", nations: "40+", accent: "#B9853B" },
    { edition: t("ed3"), year: "2023", theme: "Africa Rising: Culture & Commerce", attendees: "8,500+", nations: "38", accent: "#9A6A31" },
    { edition: t("ed2"), year: "2022", theme: "One Africa, One People", attendees: "7,000+", nations: "35", accent: "#F0B84F" },
    { edition: t("ed1"), year: "2021", theme: "The Inaugural Africa Celebrates", attendees: "5,000+", nations: "30", accent: "#D6A34A" },
  ];

  const mediaProjects = [
    { title: "Africa Celebrates Official Docu-Series", type: t("mp_doc"),  year: "2025", desc: t("mp1_desc"), accent: "#D6A34A" },
    { title: "AFRIMA Music Beyond Borders Coverage",   type: t("mp_bcast"),year: "2025", desc: t("mp2_desc"), accent: "#B9853B" },
    { title: "Pan-African Brand Campaigns",            type: t("mp_ads"),  year: "2024", desc: t("mp3_desc"), accent: "#9A6A31" },
    { title: "AfroNova Annual Report 2024",            type: t("mp_pub"),  year: "2024", desc: t("mp4_desc"), accent: "#F0B84F" },
    { title: "Diaspora Connects Podcast",              type: t("mp_audio"),year: "2023", desc: t("mp5_desc"), accent: "#D6A34A" },
    { title: "Ethiopian Tourism Campaign",             type: t("mp_ads"),  year: "2023", desc: t("mp6_desc"), accent: "#B9853B" },
  ];

  const galleryItems = [
    t("gal1"), t("gal2"), t("gal3"), t("gal4"), t("gal5"), t("gal6"), t("gal7"), t("gal8"), t("gal9"),
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 adinkra-bg opacity-60" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(154,106,49,0.22) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <p className="section-subheading">{t("portfolio_eyebrow")}</p>
          <h1 className="section-heading text-white mb-6">{t("portfolio_h1")} <span className="text-gradient">{t("portfolio_h1b")}</span></h1>
          <p className="text-white/60 text-lg leading-relaxed">{t("portfolio_hero_body")}</p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <SectionHeader eyebrow={t("portfolio_featured_eyebrow")} title={t("portfolio_featured_title")} titleHighlight={t("portfolio_featured_highlight")} className="mb-12" />
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map(({ title, theme, role, highlights, accent, year }) => (
              <div key={title} className="card-dark p-8 space-y-5" style={{ borderTopWidth: 3, borderTopColor: accent }}>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${accent}20`, color: accent }}>{year}</span>
                  <span className="text-white/30 text-xs">{role}</span>
                </div>
                <h3 className="text-white font-display font-bold text-2xl">{title}</h3>
                <p className="text-sm italic leading-relaxed" style={{ color: `${accent}CC` }}>&ldquo;{theme}&rdquo;</p>
                <ul className="space-y-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-white/60 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />{h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Editions */}
      <section className="section-padding border-y border-white/5">
        <div className="container-custom">
          <SectionHeader eyebrow={t("portfolio_editions_eyebrow")} title={t("portfolio_editions_title")} titleHighlight={t("portfolio_editions_highlight")} className="mb-12" />
          <div className="space-y-4">
            {pastEditions.map(({ edition, year, theme, attendees, nations, accent }) => (
              <div key={edition} className="card-dark p-6 md:p-8 hover:-translate-y-0.5 transition-all" style={{ borderLeftWidth: 3, borderLeftColor: accent }}>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="shrink-0">
                    <p className="font-display font-bold text-2xl" style={{ color: accent }}>{year}</p>
                    <p className="text-white/45 text-sm">{edition}</p>
                  </div>
                  <div className="h-px md:h-10 md:w-px bg-white/8" />
                  <div className="flex-1 space-y-2">
                    <p className="text-white font-semibold italic">&ldquo;{theme}&rdquo;</p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: accent }} /> Addis Ababa, Ethiopia</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" style={{ color: accent }} /> {attendees} {t("portfolio_attendees")}</span>
                      <span className="flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5" style={{ color: accent }} /> {nations} {t("portfolio_nations")}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <SectionHeader eyebrow={t("portfolio_gallery_eyebrow")} title={t("portfolio_gallery_title")} titleHighlight={t("portfolio_gallery_highlight")} className="mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((label, i) => {
              const imgUrl = t(`pf_gal${i + 1}`);
              const hasImg = imgUrl && (imgUrl.startsWith("http") || imgUrl.startsWith("/"));
              const accents = ["rgba(214,163,74,0.20)", "rgba(185,133,59,0.16)", "rgba(154,106,49,0.16)"];
              const heights = ["aspect-square", "aspect-[4/3]", "aspect-[3/4]"];
              const isVideo = i === 4;
              return (
                <div key={label + i} className={`${heights[i % 3]} rounded-2xl border border-white/8 relative overflow-hidden group cursor-pointer`}
                     style={{ background: `linear-gradient(135deg,${accents[i % 3]},rgba(0,0,0,0.60))` }}>
                  {hasImg && (
                    <img
                      src={imgUrl}
                      alt={label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                    {isVideo
                      ? <div className="w-14 h-14 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ background: "rgba(214,163,74,0.90)" }}>
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      : <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    }
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-xs text-[#D6A34A]">{isVideo ? "Video" : "Photography"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media Projects */}
      <section className="section-padding border-t border-white/5">
        <div className="container-custom">
          <SectionHeader eyebrow={t("portfolio_media_eyebrow")} title={t("portfolio_media_title")} titleHighlight={t("portfolio_media_highlight")} className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaProjects.map(({ title, type, year, desc, accent }) => (
              <div key={title} className="card-dark p-6 space-y-3 hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: `${accent}18`, color: accent }}>{type}</span>
                  <span className="text-white/30 text-xs">{year}</span>
                </div>
                <h3 className="text-white font-semibold">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

