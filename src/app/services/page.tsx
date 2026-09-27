"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, CheckCircle, ArrowRight, Camera, Megaphone, Printer, BookOpen } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      id: "event-management", icon: Calendar, image: "/heroes/nelson-mandela.jpg", accentColor: "#9A6A31", accentBg: "rgba(214,163,74,0.15)",
      eyebrow: "Service 01", title: "Event Management & Facilitation", description: "Cultural festivals, business forums, summits, gala nights, and diplomatic gatherings executed with precision.",
      features: ["End-to-End Event Operations & Protocol", "Diplomatic & Government Liaison", "Venue Logistics & Production", "Delegation & VIP Management", "Post-Event Reporting & Media Archiving"],
      cta: "Book Event Services", ctaHref: "/contact", flip: false,
    },
    {
      id: "multimedia", icon: Camera, image: "/heroes/miriam-makeba.jpg", accentColor: "#B9853B", accentBg: "rgba(185,133,59,0.15)",
      eyebrow: "Service 02", title: "Multimedia Production & Storytelling", description: "Documentaries, broadcast coverage, video production, photography, and high-impact digital storytelling.",
      features: ["Docu-Series & Feature Films", "Live Festival & Summit Broadcasting", "High-Resolution Photography", "Sound & Audio Production", "Social & Digital Content Curation"],
      cta: "Explore Production", ctaHref: "/contact", flip: true,
    },
    {
      id: "advertising", icon: Megaphone, image: "/heroes/fela-kuti.jpg", accentColor: "#9A6A31", accentBg: "rgba(154,106,49,0.15)",
      eyebrow: "Service 03", title: "Strategic Communications & Advertising", description: "Pan-African brand campaigns, media relations, public relations, and culturally grounded advertising.",
      features: ["Pan-African Media Campaigns", "Press & Public Relations", "Brand Positioning & Identity", "Diplomatic Communications", "Crisis Communications & Advocacy"],
      cta: "Launch Campaign", ctaHref: "/contact", flip: false,
    },
    {
      id: "publication", icon: BookOpen, image: "/heroes/cheikh-anta-diop.jpg", accentColor: "#B9853B", accentBg: "rgba(240,184,79,0.15)",
      eyebrow: "Service 04", title: "Publishing & Knowledge Media", description: "Annual reports, cultural catalogues, policy briefs, magazines, and Pan-African publications.",
      features: ["Custom Magazine & Journal Publishing", "Annual Reports & Catalogues", "Policy & Trade Papers", "Editorial & Translation Services", "Print & Digital Distribution"],
      cta: "Publish With Us", ctaHref: "/contact", flip: true,
    },
    {
      id: "strategic-engagement", icon: Printer, image: "/heroes/haile-selassie.jpg", accentColor: "#9A6A31", accentBg: "rgba(154,106,49,0.15)",
      eyebrow: "Service 05", title: "Strategic Engagement", description: "Building enduring relationships, high-level diplomatic bridges, and multi-stakeholder strategic engagement across Africa and globally.",
      features: ["Government & Diplomatic Advisory", "Cross-Border Stakeholder Mapping", "Institutional Alliance Building", "B2B & B2G Matchmaking", "Long-Term Value Partnerships"],
      cta: "Engage Strategically", ctaHref: "/contact", flip: false,
    },
    {
      id: "pan-african-projects", icon: Camera, image: "/heroes/kwame-nkrumah.jpg", accentColor: "#D6A34A", accentBg: "rgba(214,163,74,0.15)",
      eyebrow: "Service 06", title: "Pan-African Projects & Initiatives", description: "We conceptualize, develop, coordinate, and implement impactful Pan-African projects and initiatives that bring together institutions, communities, partners, and resources around shared continental priorities and opportunities.",
      features: ["Continental Program Design & Execution", "Cross-Border Resource Mobilization", "Multi-Country Cultural & Trade Initiatives", "Institutional Coordination & Monitoring", "Legacy & Impact Measurement"],
      cta: "Develop an Initiative", ctaHref: "/contact", flip: true,
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
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 adinkra-bg opacity-10" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(214,163,74,0.12) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <p className="section-subheading">{t("svc_eyebrow")}</p>
          <h1 className="section-heading text-[#101312] mb-6">
            {t("svc_h1")} <span className="text-gradient">{t("svc_h1b")}</span>
          </h1>
          <p className="text-[#101312]/75 text-lg leading-relaxed font-medium">{t("svc_hero_body")}</p>
        </div>
      </section>

      {/* Quick nav */}
      <div className="sticky top-20 z-30 backdrop-blur-md bg-white/95 border-b border-gray-200 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center gap-5 py-3 overflow-x-auto">
            {services.map(({ id, title }) => (
              <a key={id} href={`#${id}`}
                 className="text-[#101312]/75 hover:text-[#9A6A31] text-sm font-semibold whitespace-nowrap transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#D6A34A]">
                {title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Service sections */}
      {services.map(({ id, icon: Icon, image, accentColor, accentBg, eyebrow, title, description, features, cta, ctaHref, flip }, i) => (
        <section key={id} id={id} className={`section-padding border-t border-gray-200 ${i % 2 === 1 ? "bg-white/60 backdrop-blur-[2px]" : "bg-transparent"}`}>
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className={`space-y-6 ${flip ? "md:order-2" : ""}`}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: accentBg }}>
                  <Icon className="w-7 h-7" style={{ color: accentColor }} />
                </div>
                <SectionHeader eyebrow={eyebrow} title={title} />
                <p className="text-[#101312]/75 leading-relaxed font-medium">{description}</p>
                <ul className="space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[#101312]/80 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />{f}
                    </li>
                  ))}
                </ul>
                <Link href={ctaHref} className="btn-primary inline-flex shadow-md">{cta} <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className={flip ? "md:order-1" : ""}>
                <div className="relative aspect-square max-w-sm mx-auto rounded-3xl flex items-center justify-center overflow-hidden shadow-lg border border-gray-200 bg-white">
                  <Image src={image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover opacity-85 transition duration-500 hover:scale-105 hover:opacity-100" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accentColor}25, rgba(16,19,18,0.50))` }} />
                  <Icon className="relative z-10 w-24 h-24 text-white opacity-80" strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process */}
      <section id="process" className="section-padding border-t border-gray-200 bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          <SectionHeader eyebrow={t("svc_process_eyebrow")} title={t("svc_process_title")} centered className="mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ step, title, desc }) => (
              <div key={step} className="card-dark p-6 space-y-3 relative overflow-hidden">
                <span className="text-6xl font-display font-black absolute top-2 right-4 leading-none select-none"
                      style={{ color: "rgba(154,106,49,0.12)" }}>{step}</span>
                <p className="text-sm font-bold text-[#9A6A31]">{step}</p>
                <h4 className="text-[#101312] font-bold text-lg">{title}</h4>
                <p className="text-[#101312]/70 text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white/70 backdrop-blur-sm border-t border-gray-200">
        <div className="container-custom text-center space-y-5">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#101312]">
            {t("svc_cta_h")} <span className="text-gradient">{t("svc_cta_hb")}</span>
          </h2>
          <p className="text-[#101312]/75 max-w-xl mx-auto font-medium">{t("svc_cta_body")}</p>
          <Link href="/contact" className="btn-primary inline-flex mt-2 shadow-md">{t("svc_cta_btn")} <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </>
  );
}
