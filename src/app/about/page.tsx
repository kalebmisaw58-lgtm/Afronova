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
      <section className="relative pt-32 pb-20 overflow-hidden bg-transparent">
        <div className="absolute inset-0 adinkra-bg opacity-30" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(214,163,74,0.12) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <p className="section-subheading">{t("about_eyebrow")}</p>
            <h1 className="section-heading text-[#101312] mb-6">
              {t("about_h1")}<br />
              <span className="text-gradient">{t("about_h1b")}</span>
            </h1>
            <p className="text-[#101312]/75 text-lg leading-relaxed font-medium">{t("about_hero_body")}</p>
          </div>
        </div>
      </section>

      {/* About text */}
      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <SectionHeader eyebrow={t("about_story_eyebrow")} title={t("about_story_title")} titleHighlight={t("about_story_highlight")} />
              <p className="text-[#101312]/75 leading-relaxed text-lg font-medium">{t("about_story_body1")}</p>
              <p className="text-[#101312]/70 leading-relaxed font-medium">{t("about_story_body2")}</p>
            </div>
            <div className="space-y-4">
              <div className="card-dark p-8 space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#9A6A31]" />
                  <h3 className="text-[#9A6A31] text-xs uppercase tracking-widest font-bold">{t("who_mission_label")}</h3>
                </div>
                <p className="text-[#101312]/80 leading-relaxed font-medium">{t("who_mission")}</p>
              </div>
              <div className="card-dark p-8 space-y-3">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-[#9A6A31]" />
                  <h3 className="text-[#9A6A31] text-xs uppercase tracking-widest font-bold">{t("who_vision_label")}</h3>
                </div>
                <p className="text-[#101312]/80 leading-relaxed font-medium">{t("who_vision")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <SectionHeader eyebrow={t("values_eyebrow")} title={t("values_title")} titleHighlight={t("values_highlight")} centered className="mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-dark p-6 space-y-3 hover:-translate-y-1 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#9A6A31]" />
                </div>
                <h3 className="text-[#101312] font-bold text-lg">{title}</h3>
                <p className="text-[#101312]/70 text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          <SectionHeader eyebrow={t("lead_eyebrow")} title={t("lead_title")} titleHighlight={t("lead_highlight")} centered className="mb-14" />
          <div className="max-w-2xl mx-auto">
            {leadership.map(({ name, role_key, bio_key, initials, bg }) => (
              <div key={name} className="card-dark p-8 text-center space-y-4">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white font-display font-bold text-2xl shadow-md" style={{ background: bg }}>
                  {initials}
                </div>
                <div>
                  <h3 className="text-[#101312] font-display font-bold text-2xl">{name}</h3>
                  <p className="text-[#9A6A31] font-semibold text-sm mt-0.5">{t(role_key)}</p>
                </div>
                <p className="text-[#101312]/70 text-sm leading-relaxed font-medium max-w-lg mx-auto">{t(bio_key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners strip */}
      <section className="py-14 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container-custom">
          <p className="text-center text-[#101312]/60 text-xs uppercase tracking-widest font-bold mb-8">{t("partners_label")}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {partners.slice(0, 10).map((p) => (
              <div key={p.name} className="flex items-center justify-center transition-transform hover:scale-110">
                <PartnerLogo logo={p.logo} name={p.name} initials={p.initials} accent={p.accent} width={60} height={60} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white/70 backdrop-blur-sm border-t border-gray-200">
        <div className="container-custom text-center space-y-6">
          <SectionHeader eyebrow={t("cta_eyebrow")} title={t("cta_title")} titleHighlight={t("cta_highlight")} centered />
          <p className="text-[#101312]/75 text-lg max-w-xl mx-auto font-medium">{t("cta_body")}</p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base px-8 py-4 shadow-md">{t("cta_start")} <ArrowRight className="w-5 h-5" /></Link>
            <Link href="/services" className="btn-outline text-base px-8 py-4">{t("cta_explore")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
