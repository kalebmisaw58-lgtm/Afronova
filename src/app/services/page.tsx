"use client";

import React from "react";
import Link from "next/link";
import { Calendar, CheckCircle, ArrowRight, Camera, Megaphone, Printer, BookOpen } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      id: "event-management", icon: Calendar, accentColor: "#D6A34A", accentBg: "rgba(214,163,74,0.12)",
      eyebrow: "Service 01", title: t("svc1_title"), description: t("svc1_full_desc"),
      features: [t("svc1_f1"), t("svc1_f2"), t("svc1_f3"), t("svc1_f4"), t("svc1_f5")],
      cta: t("svc1_cta"), ctaHref: "/contact", flip: false,
    },
    {
      id: "multimedia", icon: Camera, accentColor: "#B9853B", accentBg: "rgba(185,133,59,0.12)",
      eyebrow: "Service 02", title: t("svc2_title"), description: t("svc2_full_desc"),
      features: [t("svc2_f1"), t("svc2_f2"), t("svc2_f3"), t("svc2_f4"), t("svc2_f5")],
      cta: t("svc2_cta"), ctaHref: "/contact", flip: true,
    },
    {
      id: "advertising", icon: Megaphone, accentColor: "#9A6A31", accentBg: "rgba(154,106,49,0.12)",
      eyebrow: "Service 03", title: t("svc3_title"), description: t("svc3_full_desc"),
      features: [t("svc3_f1"), t("svc3_f2"), t("svc3_f3"), t("svc3_f4"), t("svc3_f5")],
      cta: t("svc3_cta"), ctaHref: "/contact", flip: false,
    },
    {
      id: "print-brand", icon: Printer, accentColor: "#F0B84F", accentBg: "rgba(240,184,79,0.12)",
      eyebrow: "Service 04", title: t("svc4_title"), description: t("svc4_full_desc"),
      features: [t("svc4_f1"), t("svc4_f2"), t("svc4_f3"), t("svc4_f4")],
      cta: t("svc4_cta"), ctaHref: "/contact", flip: true,
    },
    {
      id: "publication", icon: BookOpen, accentColor: "#9A6A31", accentBg: "rgba(154,106,49,0.12)",
      eyebrow: "Service 05", title: t("svc5_title"), description: t("svc5_full_desc"),
      features: [t("svc5_f1"), t("svc5_f2"), t("svc5_f3"), t("svc5_f4")],
      cta: t("svc5_cta"), ctaHref: "/contact", flip: false,
    },
  ];

  const processSteps = [
    { step: "01", title: t("proc1_title"), desc: t("proc1_desc") },
    { step: "02", title: t("proc2_title"), desc: t("proc2_desc") },
    { step: "03", title: t("proc3_title"), desc: t("proc3_desc") },
    { step: "04", title: t("proc4_title"), desc: t("proc4_desc") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 adinkra-bg opacity-60" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(154,106,49,0.22) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <p className="section-subheading">{t("svc_eyebrow")}</p>
          <h1 className="section-heading text-white mb-6">
            {t("svc_h1")} <span className="text-gradient">{t("svc_h1b")}</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">{t("svc_hero_body")}</p>
        </div>
      </section>

      {/* Quick nav */}
      <div className="sticky top-20 z-30 backdrop-blur border-b border-white/5" style={{ background: "rgba(5,2,0,0.92)" }}>
        <div className="container-custom">
          <div className="flex items-center gap-5 py-3 overflow-x-auto">
            {services.map(({ id, title }) => (
              <a key={id} href={`#${id}`}
                 className="text-white/50 hover:text-[#D6A34A] text-sm font-medium whitespace-nowrap transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#D6A34A]">
                {title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Service sections */}
      {services.map(({ id, icon: Icon, accentColor, accentBg, eyebrow, title, description, features, cta, ctaHref, flip }, i) => (
        <section key={id} id={id} className={`section-padding border-t border-white/5 ${i % 2 === 1 ? "section-overlay" : ""}`}>
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className={`space-y-6 ${flip ? "md:order-2" : ""}`}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: accentBg }}>
                  <Icon className="w-7 h-7" style={{ color: accentColor }} />
                </div>
                <SectionHeader eyebrow={eyebrow} title={title} />
                <p className="text-white/55 leading-relaxed">{description}</p>
                <ul className="space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-white/65 text-sm">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />{f}
                    </li>
                  ))}
                </ul>
                <Link href={ctaHref} className="btn-primary inline-flex">{cta} <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className={flip ? "md:order-1" : ""}>
                <div className="aspect-square max-w-sm mx-auto rounded-2xl flex items-center justify-center p-12"
                     style={{ background: accentBg, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Icon className="w-32 h-32 opacity-20" style={{ color: accentColor }} strokeWidth={0.8} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process */}
      <section id="process" className="section-padding border-t border-white/5 section-overlay">
        <div className="container-custom">
          <SectionHeader eyebrow={t("svc_process_eyebrow")} title={t("svc_process_title")} centered className="mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ step, title, desc }) => (
              <div key={step} className="card-dark p-6 space-y-3 relative overflow-hidden">
                <span className="text-6xl font-display font-black absolute top-2 right-4 leading-none select-none"
                      style={{ color: "rgba(214,163,74,0.08)" }}>{step}</span>
                <p className="text-sm font-bold" style={{ color: "#D6A34A" }}>{step}</p>
                <h4 className="text-white font-semibold text-lg">{title}</h4>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center space-y-5">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            {t("svc_cta_h")} <span className="text-gradient">{t("svc_cta_hb")}</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">{t("svc_cta_body")}</p>
          <Link href="/contact" className="btn-primary inline-flex mt-2">{t("svc_cta_btn")} <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </>
  );
}
