"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { getDbPortfolioGalleryImages, DEFAULT_GALLERY_IMAGES } from "@/lib/portfolio";

export default function PortfolioPage() {
  const { t, locale } = useLanguage();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [dbGalleryImages, setDbGalleryImages] = useState<string[]>(DEFAULT_GALLERY_IMAGES);

  useEffect(() => {
    let active = true;
    void getDbPortfolioGalleryImages(locale).then((imgs) => {
      if (active && imgs && imgs.length > 0) {
        setDbGalleryImages(imgs);
      }
    });
    return () => { active = false; };
  }, [locale]);

  const flagshipProject = {
    title: "Africa Celebrates 2025, 5th Edition",
    theme: "Justice for Africans and People of African Descent through and Beyond Reparations",
    role: "Lead Implementing Partner in Ethiopia",
    highlights: [
      "Coordinated 42 participating African nations and global diaspora delegations in Addis Ababa",
      "Organized Gala Fashion Night, Pan-African Trade Forums, and Cultural Exhibitions",
      "Delivered full broadcast, press relations, and VIP protocol management",
      "Generated multi-million dollar trade commitments and cross-border partnerships",
    ],
    accent: "#9A6A31", year: "2025",
  };

  const associatedInitiatives = [
    {
      title: "AFRIMA 2025 Music Conference",
      theme: "World Media Calendar Unveiling & Music Conference, \"Music Beyond Borders\"",
      role: "Full Event Facilitator & Media Partner",
      desc: "Hosted in conjunction with Africa Celebrates, convening music executives, artists, and broadcasting networks from across Africa.",
      accent: "#B9853B", year: "2025",
    },
    {
      title: "Pan-African Transcontinental Industrial Corporation (PATIC) Launch",
      theme: "Industrializing Africa: Cross-Border Enterprise & Economic Integration",
      role: "Strategic Partner & Event Facilitator",
      desc: "Official continental launch bringing together industrial leaders, trade ministers, investors, and corporate delegates to drive intra-African enterprise.",
      accent: "#D6A34A", year: "2025",
    },
  ];

  const mediaProjects = [
    { title: "Africa Celebrates Official Docu-Series", type: t("mp_doc"),  year: "2025", desc: t("mp1_desc"), accent: "#9A6A31" },
    { title: "AFRIMA Music Beyond Borders Coverage",   type: t("mp_bcast"),year: "2025", desc: t("mp2_desc"), accent: "#B9853B" },
    { title: "Pan-African Brand Campaigns",            type: t("mp_ads"),  year: "2024", desc: t("mp3_desc"), accent: "#9A6A31" },
    { title: "AfroNova Annual Report 2024",            type: t("mp_pub"),  year: "2024", desc: t("mp4_desc"), accent: "#B9853B" },
    { title: "Diaspora Connects Podcast",              type: t("mp_audio"),year: "2023", desc: t("mp5_desc"), accent: "#9A6A31" },
    { title: "Ethiopian Tourism Campaign",             type: t("mp_ads"),  year: "2023", desc: t("mp6_desc"), accent: "#B9853B" },
  ];

  const galleryItems = [
    t("gal1"), t("gal2"), t("gal3"), t("gal4"), t("gal5"), t("gal6"), t("gal7"), t("gal8"), t("gal9"),
  ];

  const defaultGalleryImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
  ];

  // AFRIMA Gallery items
  const afrimaGalleryItems = [
    {
      title: "AFRIMA Red Carpet & Media Unveiling",
      category: "AFRIMA Music Conference",
      imgUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
      isVideo: false,
    },
    {
      title: "Music Beyond Borders Live Concert",
      category: "AFRIMA Music Conference",
      imgUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      isVideo: true,
    },
    {
      title: "Pan-African Artist & Producer Summit",
      category: "AFRIMA Music Conference",
      imgUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
      isVideo: false,
    },
    {
      title: "All Africa Music Rights & Broadcasters Forum",
      category: "AFRIMA Music Conference",
      imgUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      isVideo: false,
    },
  ];

  // Combined gallery items for continuous Lightbox navigation
  const mainGalleryList = galleryItems.map((label, i) => {
    const translatedVal = t(`pf_gal${i + 1}`);
    const hasCustomImg = translatedVal && (translatedVal.startsWith("http") || translatedVal.startsWith("/"));
    const dbImg = dbGalleryImages[i];
    const hasDbImg = dbImg && (dbImg.startsWith("http") || dbImg.startsWith("/"));
    const imgUrl = hasCustomImg ? translatedVal : hasDbImg ? dbImg : defaultGalleryImages[i % defaultGalleryImages.length];
    return {
      title: label,
      category: "Africa Celebrates",
      imgUrl,
      isVideo: i === 4,
    };
  });

  const allGalleryItems = [...mainGalleryList, ...afrimaGalleryItems];

  const handlePrevLightbox = useCallback(() => {
    setActiveLightboxIndex((prev) => (prev === null ? null : prev === 0 ? allGalleryItems.length - 1 : prev - 1));
  }, [allGalleryItems.length]);

  const handleNextLightbox = useCallback(() => {
    setActiveLightboxIndex((prev) => (prev === null ? null : prev === allGalleryItems.length - 1 ? 0 : prev + 1));
  }, [allGalleryItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") setActiveLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrevLightbox();
      if (e.key === "ArrowRight") handleNextLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, handlePrevLightbox, handleNextLightbox]);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 adinkra-bg opacity-30" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(214,163,74,0.12) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <p className="section-subheading">{t("portfolio_eyebrow")}</p>
          <h1 className="section-heading text-[#101312] mb-6">{t("portfolio_h1")} <span className="text-gradient">{t("portfolio_h1b")}</span></h1>
          <p className="text-[#101312]/75 text-lg leading-relaxed font-medium">{t("portfolio_hero_body")}</p>
        </div>
      </section>

      {/* Flagship Project */}
      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom space-y-12">
          <SectionHeader eyebrow="Flagship Platform" title="Africa Celebrates 2025" titleHighlight="5th Edition" className="mb-8" />
          
          {/* Main Flagship Card */}
          <div className="card-dark p-8 md:p-10 space-y-6 border-t-4 border-[#9A6A31]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#9A6A31]/15 text-[#9A6A31] border border-[#9A6A31]/30">
                Primary Flagship · {flagshipProject.year}
              </span>
              <span className="text-[#101312]/60 text-xs font-semibold">{flagshipProject.role}</span>
            </div>
            <h2 className="text-[#101312] font-display font-bold text-3xl md:text-4xl">{flagshipProject.title}</h2>
            <p className="text-base italic leading-relaxed font-semibold text-[#9A6A31]">&ldquo;{flagshipProject.theme}&rdquo;</p>
            
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#101312]/60">Key Operational Highlights</p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {flagshipProject.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-[#101312]/80 text-sm font-medium">
                    <span className="mt-1.5 w-2 h-2 rounded-full shrink-0 bg-[#9A6A31]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Associated Initiatives Under Flagship */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-display font-bold text-[#101312]">Associated Initiatives &amp; High-Level Launches</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {associatedInitiatives.map(({ title, theme, role, desc, accent, year }) => (
                <div key={title} className="card-dark p-7 space-y-4" style={{ borderTopWidth: 3, borderTopColor: accent }}>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${accent}18`, color: accent }}>{year}</span>
                    <span className="text-[#101312]/60 text-xs font-semibold">{role}</span>
                  </div>
                  <h4 className="text-[#101312] font-display font-bold text-xl">{title}</h4>
                  <p className="text-xs italic font-semibold" style={{ color: accent }}>&ldquo;{theme}&rdquo;</p>
                  <p className="text-[#101312]/75 text-sm leading-relaxed font-medium">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Primary Gallery (Africa Celebrates) */}
      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom space-y-12">
          <SectionHeader
            eyebrow={t("portfolio_gallery_eyebrow")}
            title={t("portfolio_gallery_title")}
            titleHighlight={t("portfolio_gallery_highlight")}
            className="mb-8"
          />

          {/* Africa Celebrates Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mainGalleryList.map((item, i) => {
              const accents = ["rgba(214,163,74,0.20)", "rgba(185,133,59,0.16)", "rgba(154,106,49,0.16)"];
              const heights = ["aspect-square", "aspect-[4/3]", "aspect-[3/4]"];
              return (
                <div
                  key={item.title + i}
                  onClick={() => setActiveLightboxIndex(i)}
                  className={`${heights[i % 3]} rounded-2xl border border-gray-200 relative overflow-hidden group cursor-pointer shadow-md bg-white`}
                  style={{ background: `linear-gradient(135deg,${accents[i % 3]},rgba(248,246,240,0.90))` }}
                >
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    {item.isVideo ? (
                      <div className="w-14 h-14 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg" style={{ background: "rgba(214,163,74,0.95)" }}>
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    ) : (
                      <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 drop-shadow-md" />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10">
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-[#F0B84F] font-bold">{item.isVideo ? "Video" : "Photography"}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AFRIMA Music Conference Gallery (Right at the bottom of the current gallery) */}
          <div className="pt-10 space-y-8 border-t border-gray-200">
            <SectionHeader
              eyebrow="Media Partnership Gallery"
              title="AFRIMA Music Conference"
              titleHighlight="Showcase"
              description="Facilitation, red carpet, and broadcast media coverage for All Africa Music Awards' World Media Unveiling."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {afrimaGalleryItems.map((item, localIdx) => {
                const globalIdx = mainGalleryList.length + localIdx; // 9..12
                return (
                  <div
                    key={item.title}
                    onClick={() => setActiveLightboxIndex(globalIdx)}
                    className="aspect-[4/3] rounded-2xl border border-gray-200 relative overflow-hidden group cursor-pointer shadow-md bg-white"
                  >
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      {item.isVideo ? (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg" style={{ background: "rgba(214,163,74,0.95)" }}>
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </div>
                      ) : (
                        <ExternalLink className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 drop-shadow-md" />
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10">
                      <p className="text-white text-xs sm:text-sm font-semibold leading-tight line-clamp-1">{item.title}</p>
                      <p className="text-[11px] text-[#F0B84F] font-bold mt-0.5">{item.isVideo ? "Broadcast Video" : "AFRIMA Photography"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Media Projects */}
      <section className="section-padding bg-transparent border-t border-gray-200">
        <div className="container-custom">
          <SectionHeader eyebrow={t("portfolio_media_eyebrow")} title={t("portfolio_media_title")} titleHighlight={t("portfolio_media_highlight")} className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaProjects.map(({ title, type, year, desc, accent }) => (
              <div key={title} className="card-dark p-6 space-y-3 hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: `${accent}18`, color: accent }}>{type}</span>
                  <span className="text-[#101312]/60 text-xs font-semibold">{year}</span>
                </div>
                <h3 className="text-[#101312] font-bold text-lg">{title}</h3>
                <p className="text-[#101312]/70 text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Screen Lightbox Modal */}
      {activeLightboxIndex !== null && (() => {
        const curIdx = activeLightboxIndex;
        const currentItem = allGalleryItems[curIdx];
        if (!currentItem) return null;

        return (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-8 transition-opacity">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-white max-w-6xl z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-[#F0B84F]">
                  {currentItem.category}
                </span>
                <span className="text-sm font-bold tracking-wider text-white/70">
                  {curIdx + 1} / {allGalleryItems.length}
                </span>
              </div>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Image View */}
            <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4">
              <button
                onClick={handlePrevLightbox}
                className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-xl"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="relative max-h-[75vh] max-w-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                <img
                  src={currentItem.imgUrl}
                  alt={currentItem.title}
                  className="max-h-[75vh] w-auto object-contain rounded-2xl"
                />
              </div>

              <button
                onClick={handleNextLightbox}
                className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-xl"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="w-full text-center max-w-xl text-white space-y-1 z-10 pb-2">
              <p className="font-display font-bold text-lg md:text-xl text-[#F0B84F]">{currentItem.title}</p>
              <p className="text-xs text-white/60 font-medium uppercase tracking-widest">{currentItem.isVideo ? "Featured Video Coverage" : "Portfolio Photography"}</p>
            </div>
          </div>
        );
      })()}
    </>
  );
}
