"use client";

import Link from "next/link";
import { ArrowRight, Award, Globe2, Target, Eye, Heart, Users, Zap, Shield, Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PartnerLogo from "@/components/ui/PartnerLogo";
import { useLanguage } from "@/context/LanguageContext";
import { partners } from "@/lib/partners";

const leadership = [
  { name: "Tesfaye Gebremichael", role_key: "lead_role", bio_key: "lead_bio", initials: "TG", bg: "linear-gradient(135deg,#9A6A31,#D6A34A)" },
];

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: Shield, title: t("val1_title"), desc: t("val1_desc") },
    { icon: Heart,  title: t("val2_title"), desc: t("val2_desc") },
    { icon: Zap,    title: t("val3_title"), desc: t("val3_desc") },
    { icon: Users,  title: t("val4_title"), desc: t("val4_desc") },
    { icon: Globe2, title: t("val5_title"), desc: t("val5_desc") },
    { icon: Target, title: t("val6_title"), desc: t("val6_desc") },
    { icon: Award,  title: t("val7_title"), desc: t("val7_desc") },
    { icon: Star,   title: t("val8_title"), desc: t("val8_desc") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 adinkra-bg opacity-60" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(154,106,49,0.22) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <p className="section-subheading">{t("about_eyebrow")}</p>
            <h1 className="section-heading text-white mb-6">
              {t("about_h1")}<br />
              <span className="text-gradient">{t("about_h1b")}</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed">{t("about_hero_body")}</p>
          </div>
        </div>
      </section>

      {/* About text */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <SectionHeader eyebrow={t("about_who_eyebrow")} title={t("about_who_title")} titleHighlight={t("about_who_highlight")} />
              <div className="space-y-4 text-white/65 leading-relaxed">
                <p>{t("about_p1")}</p>
                <p>{t("about_p2")}</p>
                <p>{t("about_p3")} <strong style={{ color: "#F0B84F" }}>Legendary Gold Limited</strong>{t("about_p3b")}</p>
              </div>
              <Link href="/services" className="btn-primary inline-flex">
                {t("about_our_services")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl flex items-center justify-center overflow-hidden"
                   style={{ background: "linear-gradient(135deg,rgba(214,163,74,0.18),rgba(185,133,59,0.10))", border: "1px solid rgba(214,163,74,0.25)" }}>
                <div className="text-center p-8 space-y-3">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center font-display font-black text-white text-4xl mx-auto"
                       style={{ background: "linear-gradient(135deg,#9A6A31,#D6A34A)" }}>A</div>
                  <p className="font-display font-bold text-white text-xl">AfroNova</p>
                  <p className="text-sm" style={{ color: "#D6A34A" }}>Pan-African · Events · Media · Innovation · Promotion</p>
                  <p className="text-white/40 text-xs">Africa Avenue, Addis Ababa, Ethiopia</p>
                  <p className="text-white/30 text-xs italic">&ldquo;{t("hero_sub1")} {t("hero_sub2")}&rdquo;</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full flex flex-col items-center justify-center text-white text-center"
                   style={{ background: "linear-gradient(135deg,#9A6A31,#D6A34A)", boxShadow: "0 8px 32px rgba(214,163,74,0.45)" }}>
                <span className="font-display font-black text-3xl leading-none">50+</span>
                <span className="text-xs font-semibold leading-tight mt-0.5">{t("about_countries")}<br/>{t("about_reached")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding border-y border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-dark p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(214,163,74,0.12)" }}>
                <Target className="w-6 h-6" style={{ color: "#D6A34A" }} />
              </div>
              <h3 className="text-white font-display font-bold text-2xl">{t("about_mission_h")}</h3>
              <p className="text-white/60 leading-relaxed">{t("about_mission_body")}</p>
            </div>
            <div className="card-dark p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(185,133,59,0.12)" }}>
                <Eye className="w-6 h-6" style={{ color: "#B9853B" }} />
              </div>
              <h3 className="text-white font-display font-bold text-2xl">{t("about_vision_h")}</h3>
              <p className="text-white/60 leading-relaxed">{t("about_vision_body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legendary Gold Partnership */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 text-center space-y-5"
               style={{ border: "1px solid rgba(240,184,79,0.30)", background: "rgba(0,0,0,0.25)" }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                 style={{ background: "rgba(240,184,79,0.12)", border: "1px solid rgba(240,184,79,0.30)", color: "#F0B84F" }}>
              <Award className="w-3 h-3" /> {t("about_partnership_badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              {t("about_partnership_h")}<br />
              <span className="text-cream-gradient">Legendary Gold Limited</span>
            </h2>
            <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">{t("about_partnership_body")}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding border-t border-white/5">
        <div className="container-custom">
          <SectionHeader eyebrow={t("about_values_eyebrow")} title={t("about_values_title")} titleHighlight={t("about_values_highlight")} centered className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-dark p-6 text-center space-y-3 group hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                     style={{ background: "rgba(214,163,74,0.12)", border: "1px solid rgba(214,163,74,0.25)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#D6A34A" }} />
                </div>
                <h4 className="text-white font-semibold text-sm">{title}</h4>
                <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding section-overlay">
        <div className="container-custom">
          <SectionHeader eyebrow={t("about_lead_eyebrow")} title={t("about_lead_title")} titleHighlight={t("about_lead_highlight")} centered className="mb-12" />
          <div className="max-w-sm mx-auto">
            {leadership.map(({ name, initials, bg }) => (
              <div key={name} className="card-dark p-8 text-center space-y-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-2xl mx-auto"
                     style={{ background: bg }}>{initials}</div>
                <div>
                  <p className="text-white font-display font-bold text-xl">{name}</p>
                  <p className="text-sm font-medium mt-1" style={{ color: "#D6A34A" }}>Executive Director, AfroNova</p>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">
                  Visionary leader and Pan-African strategist driving AfroNova&apos;s mission to reshape how Africa is seen, heard and remembered on the global stage.
                </p>
                <div className="pt-2 space-y-1 text-sm text-white/50">
                  <p>📞 +251 965 081 998 · +234 809 562 4444</p>
                  <p>✉ tesfaye.afronova@gmail.com</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding border-t border-white/5">
        <div className="container-custom">
          <SectionHeader eyebrow={t("about_net_eyebrow")} title={t("about_net_title")} titleHighlight={t("about_net_highlight")} centered className="mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {partners.map((p) => (
              <div key={p.name} className="card-dark px-4 py-3 hover:-translate-y-0.5 transition-all flex items-center gap-3">
                <PartnerLogo logo={p.logo} name={p.name} initials={p.initials} accent={p.accent} width={32} height={32} />
                <div>
                  <p className="text-white text-sm font-medium">{p.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: p.accent }}>{t(p.categoryKey)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/partners" className="btn-primary inline-flex">
              {t("about_view_partners")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
