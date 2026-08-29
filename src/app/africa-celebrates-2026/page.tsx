"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Globe2, Star, ArrowRight, Music, Building2, Users, Palette, CheckCircle } from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

// schema.org stays static, not translated
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Africa Celebrates 2026, 6th Edition",
  description: "One Africa, One People: Uniting Culture, Innovation and Enterprise for a Shared Prosperous Future",
  startDate: "2026-11-10", endDate: "2026-11-15",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: [
    { "@type": "Place", name: "African Union Headquarters", address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" } },
    { "@type": "Place", name: "United Nations Economic Commission for Africa (UNECA)", address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" } },
  ],
  organizer: { "@type": "Organization", name: "AfroNova Media House & Events", url: "https://afronova.org" },
};

export default function AfricaCelebrates2026Page() {
  const { t, locale } = useLanguage();
  const [scheduleData, setScheduleData] = useState<any[]>([]);

  useEffect(() => {
    void loadSchedule();
    async function loadSchedule() {
      try {
        const { createBrowserClient } = await import("@/lib/supabase");
        const supabase = createBrowserClient();
        const { data, error } = await supabase
          .from("event_schedule")
          .select(`
            *,
            items:schedule_items(*)
          `)
          .eq("locale", locale)
          .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
          setScheduleData(data);
        }
      } catch {}
    }
  }, [locale]);

  const highlights = [
    { icon: Music,     title: t("ac_h1_title"), desc: t("ac_h1_desc") },
    { icon: Building2, title: t("ac_h2_title"), desc: t("ac_h2_desc") },
    { icon: Globe2,    title: t("ac_h3_title"), desc: t("ac_h3_desc") },
    { icon: Users,     title: t("ac_h4_title"), desc: t("ac_h4_desc") },
    { icon: Palette,   title: t("ac_h5_title"), desc: t("ac_h5_desc") },
    { icon: Star,      title: t("ac_h6_title"), desc: t("ac_h6_desc") },
  ];

  const defaultProgramDays = [
    { date: "Nov 10", title: t("prog1_title"), events: [t("prog1_e1"), t("prog1_e2"), t("prog1_e3")] },
    { date: "Nov 11", title: t("prog2_title"), events: [t("prog2_e1"), t("prog2_e2"), t("prog2_e3"), t("prog2_e4")] },
    { date: "Nov 12", title: t("prog3_title"), events: [t("prog3_e1"), t("prog3_e2"), t("prog3_e3"), t("prog3_e4")] },
    { date: "Nov 13", title: t("prog4_title"), events: [t("prog4_e1"), t("prog4_e2"), t("prog4_e3"), t("prog4_e4")] },
    { date: "Nov 14", title: t("prog5_title"), events: [t("prog5_e1"), t("prog5_e2"), t("prog5_e3"), t("prog5_e4")] },
    { date: "Nov 15", title: t("prog6_title"), events: [t("prog6_e1"), t("prog6_e2"), t("prog6_e3"), t("prog6_e4")] },
  ];

  const programDays = scheduleData.length > 0
    ? scheduleData.map((d: any) => ({
        date: d.day,
        title: d.title,
        events: (d.items || []).sort((a: any, b: any) => a.sort_order - b.sort_order).map((i: any) => i.description),
      }))
    : defaultProgramDays;

  const sponsorTiers = [
    { tier: t("tier1_name"), bg: "linear-gradient(90deg,#9A6A31,#D6A34A)", benefits: [t("tier1_b1"), t("tier1_b2"), t("tier1_b3"), t("tier1_b4"), t("tier1_b5")] },
    { tier: t("tier2_name"), bg: "linear-gradient(90deg,#B9853B,#F0B84F)", benefits: [t("tier2_b1"), t("tier2_b2"), t("tier2_b3"), t("tier2_b4"), t("tier2_b5")] },
    { tier: t("tier3_name"), bg: "linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,0.1))", benefits: [t("tier3_b1"), t("tier3_b2"), t("tier3_b3"), t("tier3_b4")] },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 adinkra-bg opacity-70" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(154,106,49,0.25) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
               style={{ background: "rgba(214,163,74,0.12)", border: "1px solid rgba(214,163,74,0.35)", color: "#D6A34A" }}>
            <Star className="w-3 h-3" style={{ fill: "#D6A34A" }} /> {t("ac_badge")}
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-black leading-none tracking-tight mb-4">
            <span className="text-white">Africa </span><span className="text-gradient">Celebrates</span>
          </h1>
          <p className="text-5xl sm:text-6xl md:text-7xl font-display font-black mb-8" style={{ color: "#F0B84F" }}>2026</p>
          <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto mb-4 italic leading-relaxed">{t("ac_theme")}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm">
            <span className="flex items-center gap-2 text-white/60"><Calendar className="w-4 h-4" style={{ color: "#F0B84F" }} />{t("ac_date")}</span>
            <span className="flex items-center gap-2 text-white/60"><MapPin className="w-4 h-4" style={{ color: "#F0B84F" }} />{t("ac_venue")}</span>
            <span className="flex items-center gap-2 text-white/60"><Globe2 className="w-4 h-4" style={{ color: "#F0B84F" }} />{t("ac_nations")}</span>
          </div>
          <div className="inline-block rounded-2xl px-6 py-6"
               style={{ border: "1px solid rgba(214,163,74,0.25)", background: "rgba(255,255,255,0.04)" }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#F0B84F" }}>{t("ac_countdown_label")}</p>
            <CountdownTimer />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a href="https://africacelebrates.com" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4">
              {t("ac_visit")} <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <SectionHeader eyebrow={t("ac_highlights_eyebrow")} title={t("ac_highlights_title")} titleHighlight={t("ac_highlights_highlight")} centered className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-dark p-6 space-y-3 hover:-translate-y-1 transition-all group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:bg-[rgba(214,163,74,0.20)]"
                     style={{ background: "rgba(214,163,74,0.10)", border: "1px solid rgba(214,163,74,0.20)" }}>
                  <Icon className="w-6 h-6" style={{ color: "#D6A34A" }} />
                </div>
                <h3 className="text-white font-semibold">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="section-padding border-y border-white/5">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <SectionHeader eyebrow={t("ac_schedule_eyebrow")} title={t("ac_schedule_title")} titleHighlight={t("ac_schedule_highlight")} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {programDays.map(({ date, title, events }) => (
              <div key={date} className="card-dark p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: "rgba(214,163,74,0.25)", color: "#D6A34A" }}>{date}</div>
                  <h3 className="text-white font-semibold text-sm">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {events.map((ev: string) => (
                    <li key={ev} className="flex items-start gap-2 text-white/50 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#D6A34A" }} />{ev}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUES */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <SectionHeader eyebrow={t("ac_venues_eyebrow")} title={t("ac_venues_title")} titleHighlight={t("ac_venues_highlight")} centered className="mb-12" />
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { name: t("ac_venue1_name"), desc: t("ac_venue1_desc"), badge: t("ac_venue1_badge"), badgeColor: "#D6A34A" },
              { name: t("ac_venue2_name"), desc: t("ac_venue2_desc"), badge: t("ac_venue2_badge"), badgeColor: "#B9853B" },
            ].map(({ name, desc, badge, badgeColor }) => (
              <div key={name} className="card-dark p-7 space-y-3">
                <div className="inline-flex px-3 py-1 rounded-full border text-xs font-semibold"
                     style={{ color: badgeColor, borderColor: `${badgeColor}50`, background: `${badgeColor}18` }}>{badge}</div>
                <h3 className="text-white font-display font-bold text-xl">{name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                <div className="flex items-center gap-2 text-white/35 text-xs"><MapPin className="w-3.5 h-3.5" /> Addis Ababa, Ethiopia</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORSHIP */}
      <section className="section-padding border-t border-white/5">
        <div className="container-custom">
          <SectionHeader eyebrow={t("ac_sponsor_eyebrow")} title={t("ac_sponsor_title")} titleHighlight={t("ac_sponsor_highlight")}
            centered description={t("ac_sponsor_desc")} className="mb-12" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sponsorTiers.map(({ tier, bg, benefits }) => (
              <div key={tier} className="card-dark p-7 space-y-5">
                <div className="h-1.5 rounded-full" style={{ background: bg }} />
                <h3 className="text-white font-display font-bold text-xl">{tier}</h3>
                <ul className="space-y-2">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-white/60 text-sm">
                      <Star className="w-3 h-3 shrink-0" style={{ color: "#D6A34A" }} /> {b}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-outline w-full justify-center text-sm">{t("ac_sponsor_cta")}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-overlay">
        <div className="container-custom text-center space-y-6 max-w-2xl mx-auto">
          <SectionHeader eyebrow={t("ac_cta_eyebrow")} title={t("ac_cta_title")} titleHighlight={t("ac_cta_highlight")} centered />
          <p className="text-white/55 leading-relaxed">{t("ac_cta_body")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact" className="btn-primary px-8 py-3.5">{t("ac_cta_btn")} <ArrowRight className="w-4 h-4" /></Link>
            <a href="https://africacelebrates.com" target="_blank" rel="noopener noreferrer" className="btn-outline px-8 py-3.5">{t("ac_cta_btn2")}</a>
          </div>
        </div>
      </section>
    </>
  );
}
