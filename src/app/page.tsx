"use client";

import Link from "next/link";
import Image from "next/image";
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
    { icon: Calendar, title: t("svc1_title"), description: t("svc1_desc"), href: "/services#event-management", iconBg: "rgba(214,163,74,0.15)", iconColor: "#9A6A31" },
    { icon: Camera,   title: t("svc2_title"), description: t("svc2_desc"), href: "/services#multimedia",       iconBg: "rgba(185,133,59,0.15)", iconColor: "#9A6A31" },
    { icon: Megaphone,title: t("svc3_title"), description: t("svc3_desc"), href: "/services#advertising",      iconBg: "rgba(154,106,49,0.15)",  iconColor: "#9A6A31" },
    { icon: Printer,  title: t("svc4_title"), description: t("svc4_desc"), href: "/services#print-brand",      iconBg: "rgba(240,184,79,0.15)", iconColor: "#9A6A31" },
    { icon: BookOpen, title: t("svc5_title"), description: t("svc5_desc"), href: "/services#publication",      iconBg: "rgba(154,106,49,0.15)",  iconColor: "#9A6A31" },
  ];

  const stats = [
    { value: "50+",  label: t("stat1_label") },
    { value: "5",    label: t("stat2_label") },
    { value: "14+",  label: t("stat3_label") },
    { value: "10K+", label: t("stat4_label") },
  ];

  const reasons = [
    { title: t("why1_title"), desc: t("why1_desc"), color: "#9A6A31" },
    { title: t("why2_title"), desc: t("why2_desc"), color: "#B9853B" },
    { title: t("why3_title"), desc: t("why3_desc"), color: "#D6A34A" },
    { title: t("why4_title"), desc: t("why4_desc"), color: "#9A6A31" },
  ];

  const featuredWork = [
    { title: t("fw1_title"), type: t("fw1_type"), desc: t("fw1_desc"), accent: "#9A6A31", image: "/heroes/kwame-nkrumah.jpg", href: "/africa-celebrates-2026", isEvent: true },
    { title: t("fw2_title"), type: t("fw2_type"), desc: t("fw2_desc"), accent: "#C96B4B", image: "/heroes/miriam-makeba.jpg", href: "/portfolio", isEvent: false },
    { title: t("fw3_title"), type: t("fw3_type"), desc: t("fw3_desc"), accent: "#6E8B5B", image: "/heroes/wangari-maathai.jpg", href: "/portfolio", isEvent: false },
  ];

  return (
    <>
      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <HeroSlideshow />

      {/* ══ 2. AFRICA CELEBRATES COUNTDOWN ══════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #181B1A 0%, #252019 50%, #181B1A 100%)" }} />
        <div className="absolute inset-0 adinkra-bg opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 accent-line" />
        <div className="absolute bottom-0 left-0 right-0 accent-line" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left space-y-3 max-w-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                   style={{ background: "rgba(214,163,74,0.18)", border: "1px solid rgba(214,163,74,0.45)", color: "#F0B84F" }}>
                <Star className="w-3 h-3 fill-[#F0B84F] text-[#F0B84F]" /> {t("countdown_badge")}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-none">
                {t("countdown_title1")} <span className="text-gradient">{t("countdown_title2")}</span> {t("countdown_title3")}
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">{t("countdown_theme")}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/70 justify-center lg:justify-start pt-1">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#F0B84F]" />{t("countdown_date")}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#F0B84F]" />{t("countdown_venue")}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs font-bold tracking-widest uppercase text-[#F0B84F]">{t("countdown_label")}</p>
              <CountdownTimer />
            </div>
            <div className="flex flex-col items-center lg:items-end gap-3">
              <a href="https://africacelebrates.com" target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-3 text-sm">
                {t("countdown_visit")} <ExternalLink className="w-4 h-4" />
              </a>
              <Link href="/africa-celebrates-2026" className="btn-outline border-white/30 text-white hover:bg-white/10 px-7 py-3 text-sm">
                {t("countdown_details")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. STATS ══════════════════════════════════════════ */}
      <section className="border-y border-gray-200 py-14 bg-white/70 backdrop-blur-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl md:text-5xl font-display font-black text-gradient mb-1">{value}</p>
                <p className="text-[#101312]/65 text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. WHO WE ARE ════════════════════════════════════ */}
      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <SectionHeader eyebrow={t("who_eyebrow")} title={t("who_title")} titleHighlight={t("who_highlight")} />
              <p className="text-[#101312]/75 leading-relaxed text-lg font-medium">{t("who_body1")}</p>
              <p className="text-[#101312]/70 leading-relaxed font-medium">
                {t("who_body2")} <strong className="text-[#9A6A31]">{t("who_partner")}</strong>.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[t("tag_events"), t("tag_media"), t("tag_advertising"), t("tag_publishing"), t("tag_merch")].map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 rounded-full text-xs font-bold"
                        style={{ background: "rgba(214,163,74,0.12)", border: "1px solid rgba(214,163,74,0.30)", color: "#9A6A31" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/about" className="btn-primary inline-flex">{t("who_story")} <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="space-y-4">
              <div className="card-dark p-7 space-y-3">
                <p className="text-[#9A6A31] text-xs uppercase tracking-widest font-bold">{t("who_mission_label")}</p>
                <p className="text-[#101312]/80 leading-relaxed font-medium">{t("who_mission")}</p>
              </div>
              <div className="card-dark p-7 space-y-3">
                <p className="text-[#9A6A31] text-xs uppercase tracking-widest font-bold">{t("who_vision_label")}</p>
                <p className="text-[#101312]/80 leading-relaxed font-medium">{t("who_vision")}</p>
              </div>
              <div className="card-dark p-5 flex items-center gap-4" style={{ borderLeft: "4px solid #D6A34A" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                     style={{ background: "linear-gradient(135deg,#9A6A31,#D6A34A)" }}>
                  <Globe2 className="w-5 h-5 text-white" />
                </div>
                <p className="text-[#101312]/75 text-sm leading-relaxed font-medium">
                  <strong className="text-[#101312]">{t("who_location")}</strong> {t("who_location_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. SERVICES ══════════════════════════════════════ */}
      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader eyebrow={t("services_eyebrow")} title={t("services_title")} titleHighlight={t("services_highlight")} description={t("services_desc")} />
            <Link href="/services" className="btn-outline shrink-0">{t("services_all")} <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, description, href, iconBg, iconColor }) => (
              <Link key={title} href={href} className="card-dark p-7 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: iconBg }}>
                  <Icon className="w-6 h-6" style={{ color: iconColor }} />
                </div>
                <h3 className="text-[#101312] font-display font-bold text-lg mb-3">{title}</h3>
                <p className="text-[#101312]/70 text-sm leading-relaxed mb-5 font-medium">{description}</p>
                <span className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: iconColor }}>
                  {t("services_learn")} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. WHY AFRONOVA ══════════════════════════════════ */}
      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <SectionHeader eyebrow={t("why_eyebrow")} title={t("why_title")} titleHighlight={t("why_highlight")} centered className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map(({ title, desc, color }) => (
              <div key={title} className="card-dark p-6 space-y-3 hover:-translate-y-1 transition-all" style={{ borderTopWidth: 3, borderTopColor: color }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" style={{ color }} />
                  <h4 className="text-[#101312] font-bold">{title}</h4>
                </div>
                <p className="text-[#101312]/70 text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. FEATURED WORK ════════════════════════════════ */}
      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader eyebrow={t("work_eyebrow")} title={t("work_title")} titleHighlight={t("work_highlight")} description={t("work_desc")} />
            <Link href="/portfolio" className="btn-outline shrink-0">{t("work_portfolio")} <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredWork.map(({ title, type, desc, accent, image, href, isEvent }) => (
              <Link key={title} href={href} className="card-dark p-7 flex flex-col gap-4 group hover:-translate-y-1 transition-all">
                <div className="relative aspect-video rounded-xl flex items-center justify-center overflow-hidden"
                     style={{ background: `linear-gradient(135deg,${accent}15,rgba(248,246,240,0.90))`, border: `1px solid ${accent}35` }}>
                  <Image src={image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                  {isEvent && <span className="absolute top-3 right-3 rounded-md bg-[#101312]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">Africa Celebrates</span>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${accent}18`, color: accent }}>{type}</span>
                  {isEvent && <span className="text-[#101312]/50 text-xs font-semibold">{t("work_flagship")}</span>}
                </div>
                <h3 className="text-[#101312] font-display font-bold text-xl group-hover:text-[#9A6A31] transition-colors">{title}</h3>
                <p className="text-[#101312]/70 text-sm leading-relaxed flex-1 font-medium">{desc}</p>
                <span className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: accent }}>
                  {t("work_view")} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. PARTNERS ══════════════════════════════════════ */}
      <section className="py-16 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container-custom">
          <p className="text-center text-[#101312]/60 text-xs uppercase tracking-widest font-bold mb-8">{t("partners_label")}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {partnerList.map((p) => (
              <div key={p.name} className="flex items-center justify-center transition-transform duration-200 hover:scale-110">
                <PartnerLogo logo={p.logo} name={p.name} initials={p.initials} accent={p.accent} width={66} height={66} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. CTA ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white/70 backdrop-blur-sm border-t border-gray-200">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionHeader eyebrow={t("cta_eyebrow")} title={t("cta_title")} titleHighlight={t("cta_highlight")} centered />
            <p className="text-[#101312]/75 text-lg leading-relaxed font-medium">{t("cta_body")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact" className="btn-primary text-base px-8 py-4 shadow-md">{t("cta_start")} <ArrowRight className="w-5 h-5" /></Link>
              <Link href="/services" className="btn-outline text-base px-8 py-4">{t("cta_explore")}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
