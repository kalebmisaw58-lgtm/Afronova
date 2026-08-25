"use client";

import Link from "next/link";
import {
  ArrowRight, Star, Globe2, Camera, Megaphone,
  ChevronRight, Calendar, MapPin, BookOpen,
  Printer, CheckCircle, Play, ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";
import HeroSlideshow from "@/components/ui/HeroSlideshow";
import CountdownTimer from "@/components/ui/CountdownTimer";
import PartnerLogo from "@/components/ui/PartnerLogo";
import { partners as partnerList } from "@/lib/partners";

export default function HomePage() {
  const { t } = useLanguage();

  const services = [
    { icon: Calendar, title: t("svc1_title"), description: t("svc1_desc"), href: "/services#event-management", iconBg: "rgba(214,163,74,0.15)", iconColor: "#D6A34A" },
    { icon: Camera,   title: t("svc2_title"), description: t("svc2_desc"), href: "/services#multimedia",       iconBg: "rgba(185,133,59,0.15)", iconColor: "#B9853B" },
    { icon: Megaphone,title: t("svc3_title"), description: t("svc3_desc"), href: "/services#advertising",      iconBg: "rgba(154,106,49,0.15)",  iconColor: "#9A6A31" },
    { icon: Printer,  title: t("svc4_title"), description: t("svc4_desc"), href: "/services#print-brand",      iconBg: "rgba(240,184,79,0.15)", iconColor: "#F0B84F" },
    { icon: BookOpen, title: t("svc5_title"), description: t("svc5_desc"), href: "/services#publication",      iconBg: "rgba(154,106,49,0.15)",  iconColor: "#9A6A31" },
  ];

  const stats = [
    { value: "50+",  label: t("stat1_label") },
    { value: "5",    label: t("stat2_label") },
    { value: "14+",  label: t("stat3_label") },
    { value: "10K+", label: t("stat4_label") },
  ];

  const reasons = [
    { title: t("why1_title"), desc: t("why1_desc"), color: "#D6A34A" },
    { title: t("why2_title"), desc: t("why2_desc"), color: "#B9853B" },
    { title: t("why3_title"), desc: t("why3_desc"), color: "#9A6A31" },
    { title: t("why4_title"), desc: t("why4_desc"), color: "#F0B84F" },
  ];

  const featuredWork = [
    { title: t("fw1_title"), type: t("fw1_type"), desc: t("fw1_desc"), accent: "#D6A34A", href: "/africa-celebrates-2026", isEvent: true },
    { title: t("fw2_title"), type: t("fw2_type"), desc: t("fw2_desc"), accent: "#B9853B", href: "/portfolio", isEvent: false },
    { title: t("fw3_title"), type: t("fw3_type"), desc: t("fw3_desc"), accent: "#9A6A31", href: "/portfolio", isEvent: false },
  ];

  return (
    <>
      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroSlideshow />
        <div className="absolute inset-0 adinkra-bg opacity-25 z-[1] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 accent-line opacity-60 z-[2] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 accent-line opacity-60 z-[2] pointer-events-none" />

        <div className="relative z-[3] pt-28 pb-24" style={{ paddingLeft: "2rem" }}>
          <div className="max-w-lg xl:max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-8 animate-fade-in"
                 style={{ border: "1px solid rgba(214,163,74,0.40)", background: "rgba(214,163,74,0.12)", color: "#D6A34A" }}>
              <Star className="w-3 h-3" style={{ fill: "#D6A34A" }} />
              {t("hero_badge")}
            </div>
            <h1 className="font-display font-black leading-none tracking-tight mb-5 animate-slide-up"
                style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}>
              <span className="text-white">Afro</span><span className="text-gradient">Nova</span>
            </h1>
            <p className="text-xl md:text-2xl font-display font-bold text-gradient mb-5 leading-snug">
              {t("hero_tagline")}
            </p>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl">{t("hero_body")}</p>
            <div className="flex flex-col sm:flex-row flex-wrap items-start gap-3">
              <Link href="/about" className="btn-primary text-base px-7 py-3.5">
                {t("hero_cta_discover")} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/services" className="btn-outline text-base px-7 py-3.5">{t("hero_cta_services")}</Link>
              <Link href="/contact" className="btn-ghost border border-white/25 text-base px-7 py-3.5">{t("hero_cta_work")}</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-1 animate-bounce pointer-events-none">
          <div className="w-px h-8" style={{ background: "rgba(214,163,74,0.45)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#D6A34A" }} />
        </div>
      </section>

      {/* ══ 2. AFRICA CELEBRATES COUNTDOWN ══════════════════ */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #070908 0%, #17130E 45%, #070908 100%)" }} />
        <div className="absolute inset-0 adinkra-bg opacity-45 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 accent-line" />
        <div className="absolute bottom-0 left-0 right-0 accent-line" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left space-y-3 max-w-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                   style={{ background: "rgba(214,163,74,0.15)", border: "1px solid rgba(214,163,74,0.40)", color: "#D6A34A" }}>
                <Star className="w-3 h-3" style={{ fill: "#D6A34A" }} /> {t("countdown_badge")}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-none">
                {t("countdown_title1")} <span className="text-gradient">{t("countdown_title2")}</span> {t("countdown_title3")}
              </h2>
              <p className="text-white/55 text-sm leading-relaxed">{t("countdown_theme")}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/55 justify-center lg:justify-start pt-1">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" style={{ color: "#F0B84F" }} />{t("countdown_date")}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: "#F0B84F" }} />{t("countdown_venue")}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#F0B84F" }}>{t("countdown_label")}</p>
              <CountdownTimer />
            </div>
            <div className="flex flex-col items-center lg:items-end gap-3">
              <a href="https://africacelebrates.com" target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-3 text-sm">
                {t("countdown_visit")} <ExternalLink className="w-4 h-4" />
              </a>
              <Link href="/africa-celebrates-2026" className="btn-outline px-7 py-3 text-sm">
                {t("countdown_details")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. STATS ══════════════════════════════════════════ */}
      <section className="border-y border-white/5 py-14 section-overlay">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl md:text-5xl font-display font-black text-gradient mb-1">{value}</p>
                <p className="text-white/45 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. WHO WE ARE ════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <SectionHeader eyebrow={t("who_eyebrow")} title={t("who_title")} titleHighlight={t("who_highlight")} />
              <p className="text-white/60 leading-relaxed text-lg">{t("who_body1")}</p>
              <p className="text-white/55 leading-relaxed">
                {t("who_body2")} <strong style={{ color: "#F0B84F" }}>{t("who_partner")}</strong>.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[t("tag_events"), t("tag_media"), t("tag_advertising"), t("tag_publishing"), t("tag_merch")].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(214,163,74,0.12)", border: "1px solid rgba(214,163,74,0.28)", color: "#D6A34A" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/about" className="btn-primary inline-flex">{t("who_story")} <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="space-y-4">
              <div className="card-dark p-7 space-y-3">
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{t("who_mission_label")}</p>
                <p className="text-white/80 leading-relaxed">{t("who_mission")}</p>
              </div>
              <div className="card-dark p-7 space-y-3">
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">{t("who_vision_label")}</p>
                <p className="text-white/80 leading-relaxed">{t("who_vision")}</p>
              </div>
              <div className="card-dark p-5 flex items-center gap-4" style={{ borderLeft: "3px solid #D6A34A" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                     style={{ background: "linear-gradient(135deg,#9A6A31,#D6A34A)" }}>
                  <Globe2 className="w-5 h-5 text-white" />
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  <strong className="text-white">{t("who_location")}</strong> {t("who_location_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. SERVICES ══════════════════════════════════════ */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader eyebrow={t("services_eyebrow")} title={t("services_title")} titleHighlight={t("services_highlight")} description={t("services_desc")} />
            <Link href="/services" className="btn-outline shrink-0">{t("services_all")} <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, description, href, iconBg, iconColor }) => (
              <Link key={title} href={href} className="card-dark p-7 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: iconBg }}>
                  <Icon className="w-6 h-6" style={{ color: iconColor }} />
                </div>
                <h3 className="text-white font-display font-bold text-lg mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{description}</p>
                <span className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: iconColor }}>
                  {t("services_learn")} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. WHY AFRONOVA ══════════════════════════════════ */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader eyebrow={t("why_eyebrow")} title={t("why_title")} titleHighlight={t("why_highlight")} centered className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reasons.map(({ title, desc, color }) => (
              <div key={title} className="card-dark p-6 space-y-3 hover:-translate-y-1 transition-all" style={{ borderTopWidth: 3, borderTopColor: color }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" style={{ color }} />
                  <h4 className="text-white font-semibold">{title}</h4>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. FEATURED WORK ════════════════════════════════ */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader eyebrow={t("work_eyebrow")} title={t("work_title")} titleHighlight={t("work_highlight")} description={t("work_desc")} />
            <Link href="/portfolio" className="btn-outline shrink-0">{t("work_portfolio")} <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredWork.map(({ title, type, desc, accent, href, isEvent }) => (
              <Link key={title} href={href} className="card-dark p-7 flex flex-col gap-4 group hover:-translate-y-1 transition-all">
                <div className="aspect-video rounded-xl flex items-center justify-center overflow-hidden"
                     style={{ background: `linear-gradient(135deg,${accent}25,rgba(0,0,0,0.60))`, border: `1px solid ${accent}35` }}>
                  {isEvent
                    ? <div className="text-center space-y-0.5"><p className="font-display font-black text-3xl" style={{ color: accent }}>AC</p><p className="text-white/35 text-xs">Africa Celebrates</p></div>
                    : <Play className="w-9 h-9 opacity-35" style={{ color: accent }} />
                  }
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: `${accent}18`, color: accent }}>{type}</span>
                  {isEvent && <span className="text-white/30 text-xs">{t("work_flagship")}</span>}
                </div>
                <h3 className="text-white font-display font-bold text-xl group-hover:text-[#D6A34A] transition-colors">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{desc}</p>
                <span className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: accent }}>
                  {t("work_view")} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. PARTNERS ══════════════════════════════════════ */}
      <section className="py-14 border-t border-white/5 section-overlay">
        <div className="container-custom">
          <p className="text-center text-white/30 text-xs uppercase tracking-widest font-semibold mb-8">{t("partners_label")}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {partnerList.map((p) => (
              <div key={p.name} className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2.5 cursor-default"
                   style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }}
                   onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214,163,74,0.45)"; (e.currentTarget as HTMLDivElement).style.color = "rgba(214,163,74,0.85)"; }}
                   onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.35)"; }}>
                <PartnerLogo logo={p.logo} name={p.name} initials={p.initials} accent={p.accent} width={24} height={24} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. CTA ═══════════════════════════════════════════ */}
      <section className="py-20 section-overlay">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionHeader eyebrow={t("cta_eyebrow")} title={t("cta_title")} titleHighlight={t("cta_highlight")} centered />
            <p className="text-white/55 text-lg leading-relaxed">{t("cta_body")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">{t("cta_start")} <ArrowRight className="w-5 h-5" /></Link>
              <Link href="/services" className="btn-outline text-base px-8 py-4">{t("cta_explore")}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
