"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Star, Globe2, Camera, Megaphone,
  ChevronRight, Calendar, MapPin, BookOpen,
  CheckCircle, Play, ExternalLink, Users2, Building2,
  Landmark, Sparkles, Layers, Handshake, ShieldCheck, Compass,
  Briefcase, GraduationCap, Award
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";
import HeroSlideshow from "@/components/ui/HeroSlideshow";
import CountdownTimer from "@/components/ui/CountdownTimer";
import PartnerLogo from "@/components/ui/PartnerLogo";
import { partners as partnerList } from "@/lib/partners";

export default function HomePage() {
  const { t } = useLanguage();

  const sixPillars = [
    {
      icon: Calendar,
      title: "Event Management & Facilitation",
      description: "Cultural festivals, business forums, summits and diplomatic gatherings executed with precision.",
      href: "/services#event-management",
      accent: "#9A6A31"
    },
    {
      icon: Camera,
      title: "Multimedia Production & Storytelling",
      description: "Documentaries, broadcast coverage, video production and high-impact digital storytelling.",
      href: "/services#multimedia",
      accent: "#B9853B"
    },
    {
      icon: Megaphone,
      title: "Strategic Communications & Advertising",
      description: "Pan-African brand campaigns, media relations and culturally grounded public relations.",
      href: "/services#advertising",
      accent: "#D6A34A"
    },
    {
      icon: BookOpen,
      title: "Publishing & Knowledge Media",
      description: "Annual reports, cultural catalogues, policy papers and Pan-African publications.",
      href: "/services#publication",
      accent: "#9A6A31"
    },
    {
      icon: Handshake,
      title: "Strategic Engagement",
      description: "Building enduring relationships, diplomatic bridges, and multi-stakeholder strategic engagement across Africa and globally.",
      href: "/services#strategic-engagement",
      accent: "#B9853B"
    },
    {
      icon: Layers,
      title: "Pan-African Projects & Initiatives",
      description: "We conceptualize, develop, coordinate, and implement impactful Pan-African projects and initiatives that bring together institutions, communities, partners, and resources around shared continental priorities.",
      href: "/services#pan-african-projects",
      accent: "#D6A34A"
    },
  ];

  const stats = [
    { value: "10+",  label: t("stat1_label") },
    { value: "6",    label: t("stat2_label") },
    { value: "15+",  label: t("stat3_label") },
    { value: "10+",  label: "Pan-African Initiatives" },
  ];

  const whyAfroNova = [
    {
      title: "Cultural Intelligence",
      desc: "We understand Africa beyond stereotypes, its cultures, histories, institutions, audiences, and contemporary realities.",
      icon: Compass,
      color: "#9A6A31"
    },
    {
      title: "Institutional Access",
      desc: "Based in Addis Ababa, AfroNova operates within an ecosystem of governments, diplomatic missions, international organizations, media, business, and cultural institutions.",
      icon: Landmark,
      color: "#B9853B"
    },
    {
      title: "Continental Perspective",
      desc: "We bring together African and global perspectives to create platforms that cross borders and disciplines.",
      icon: Globe2,
      color: "#D6A34A"
    },
    {
      title: "Creative Excellence",
      desc: "We combine African creativity with contemporary production, media, technology, and storytelling.",
      icon: Sparkles,
      color: "#9A6A31"
    },
    {
      title: "Strategic Partnership",
      desc: "We don't simply deliver projects. We build relationships and platforms designed for long-term value.",
      icon: ShieldCheck,
      color: "#B9853B"
    },
  ];

  const whoWeWorkWith = [
    { title: "Governments & Public Institutions", icon: Landmark },
    { title: "Diplomatic Missions", icon: Globe2 },
    { title: "African & International Organizations", icon: Building2 },
    { title: "Corporations & Brands", icon: Briefcase },
    { title: "Media & Broadcasters", icon: Megaphone },
    { title: "Cultural & Creative Institutions", icon: Sparkles },
    { title: "Foundations & NGOs", icon: Users2 },
    { title: "Artists, Creatives & Cultural Leaders", icon: Award },
  ];

  const featuredWork = [
    {
      title: "Africa Celebrates 2025, 5th Edition",
      type: "Flagship Platform",
      desc: "Lead Implementing Partner in Ethiopia translating the vision of 40+ nations into forums, fashion galas, and trade summits.",
      accent: "#9A6A31",
      image: "/heroes/kwame-nkrumah.jpg",
      href: "/africa-celebrates-2026",
      isEvent: true
    },
    {
      title: "AFRIMA 2025 Music Conference",
      type: "Media Partnership",
      desc: "Full event facilitation and media coverage for All Africa Music Awards' World Media Calendar Unveiling.",
      accent: "#B9853B",
      image: "/heroes/miriam-makeba.jpg",
      href: "/portfolio",
      isEvent: false
    },
    {
      title: "PATIC Industrial Launch",
      type: "Pan-African Initiative",
      desc: "Pan-African Transcontinental Industrial Corporation launch event connecting trade delegates across borders.",
      accent: "#D6A34A",
      image: "/heroes/haile-selassie.jpg",
      href: "/portfolio",
      isEvent: false
    },
  ];

  return (
    <>
      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <HeroSlideshow />

      {/* ══ 2. AFRICA CELEBRATES COUNTDOWN ══════════════════ */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #181B1A 0%, #252019 50%, #181B1A 100%)" }} />
        <div className="absolute inset-0 adinkra-bg opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 accent-line" />
        <div className="absolute bottom-0 left-0 right-0 accent-line" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Column: Information & Action Buttons */}
            <div className="text-center lg:text-left space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                   style={{ background: "rgba(214,163,74,0.18)", border: "1px solid rgba(214,163,74,0.45)", color: "#F0B84F" }}>
                <Star className="w-3 h-3 fill-[#F0B84F] text-[#F0B84F]" /> AfroNova Flagship Partner
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-white leading-tight">
                {t("countdown_title1")} <span className="text-gradient">{t("countdown_title2")}</span> {t("countdown_title3")}
              </h2>
              <p className="text-white/90 text-sm leading-relaxed font-medium">
                Africa Celebrates brings together culture, enterprise, innovation, dialogue, creativity, and continental connection on one Pan-African platform. AfroNova serves as a lead implementing partner in Ethiopia, helping translate the vision into experiences, forums, partnerships, and storytelling.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-white/95 justify-center lg:justify-start pt-1 font-semibold">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#F0B84F]" />{t("countdown_date")}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#F0B84F]" />African Union HQ, Addis Ababa</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a href="https://africacelebrates.com" target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-3 text-sm">
                  {t("countdown_visit")} <ExternalLink className="w-4 h-4" />
                </a>
                <Link href="/africa-celebrates-2026" className="btn-outline border-white/30 text-white hover:bg-white/10 px-6 py-3 text-sm">
                  {t("countdown_details")} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Dedicated Countdown Display Card */}
            <div className="flex flex-col items-center gap-4 w-full lg:w-auto shrink-0 p-6 sm:p-7 rounded-3xl bg-white/5 border border-[#D6A34A]/30 backdrop-blur-md shadow-2xl">
              <p className="text-xs font-bold tracking-widest uppercase text-[#F0B84F]">{t("countdown_label")}</p>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. STATS BAR ══════════════════════════════════════ */}
      <section className="border-y border-gray-200 py-12 bg-white/80 backdrop-blur-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl md:text-5xl font-display font-black text-gradient mb-1">{value}</p>
                <p className="text-[#101312]/75 text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. AFRICA & ITS GLOBAL DIASPORA ════════════════════ */}
      <section className="section-padding bg-white/50 backdrop-blur-[2px]">
        <div className="container-custom">
          <div className="card-dark p-8 md:p-12 rounded-3xl relative overflow-hidden"
               style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,246,240,0.95) 100%)", border: "1px solid rgba(214,163,74,0.30)" }}>
            <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-8 space-y-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#9A6A31] bg-[#D6A34A]/15 border border-[#D6A34A]/30">
                  Global Connection
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-[#101312]">
                  Africa &amp; Its <span className="text-gradient">Global Diaspora</span>
                </h2>
                <p className="text-[#101312]/80 text-base md:text-lg leading-relaxed font-medium">
                  Africa&apos;s story does not stop at its shores. AfroNova creates platforms that connect the continent with its global African family, bringing together culture, ideas, talent, enterprise, and shared identity across borders.
                </p>
              </div>
              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-xl border border-[#D6A34A]/40"
                     style={{ background: "linear-gradient(135deg,#9A6A31,#D6A34A)" }}>
                  <Globe2 className="w-12 h-12 md:w-16 md:h-16 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. FROM ADDIS ABABA TO THE WORLD ═══════════════════ */}
      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionHeader
                eyebrow="Continental Capital"
                title="FROM ADDIS ABABA"
                titleHighlight="TO THE WORLD"
              />
              <p className="text-[#101312]/85 leading-relaxed text-lg md:text-xl font-medium">
                Based in Addis Ababa, one of Africa&apos;s principal centers of diplomacy and continental affairs, AfroNova works at the intersection of African culture, institutions, creativity, media, and global engagement.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Diplomatic Capital", "African Union City", "Cross-Border Media", "Pan-African Partnerships"].map((pill) => (
                  <span key={pill} className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-[#D6A34A]/35 text-[#9A6A31] shadow-sm">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
            <div className="card-dark p-8 rounded-2xl space-y-5 border-l-4 border-[#D6A34A]">
              <div className="flex items-center gap-3 text-[#9A6A31]">
                <Landmark className="w-6 h-6" />
                <h3 className="font-display font-bold text-xl text-[#101312]">Headquarters &amp; Global Reach</h3>
              </div>
              <p className="text-[#101312]/75 text-sm leading-relaxed font-medium">
                Headquartered at <strong className="text-[#101312]">Africa Avenue, Bole Sub-City, Woreda 02, House No. New, Addis Ababa, Ethiopia</strong>, AfroNova operates as a strategic bridge connecting African institutions with audiences and markets worldwide.
              </p>
              <div className="pt-2">
                <Link href="/about" className="btn-primary inline-flex text-sm px-6 py-2.5">
                  Learn More About AfroNova <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. WHY AFRONOVA ══════════════════════════════════ */}
      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Why AfroNova"
            title="African by Origin."
            titleHighlight="Global by Outlook."
            centered
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAfroNova.map(({ title, desc, icon: Icon, color }) => (
              <div key={title} className="card-dark p-7 space-y-4 hover:-translate-y-1 transition-all" style={{ borderTopWidth: 3, borderTopColor: color }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm border border-gray-100">
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="text-[#101312] font-display font-bold text-lg">{title}</h3>
                <p className="text-[#101312]/75 text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. WHO WE WORK WITH ═══════════════════════════════ */}
      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Strategic Network"
            title="WHO WE"
            titleHighlight="WORK WITH"
            description="Connecting key stakeholders across the continent and global ecosystem."
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {whoWeWorkWith.map(({ title, icon: Icon }) => (
              <div key={title} className="card-dark p-6 rounded-2xl flex flex-col items-center text-center space-y-3 hover:-translate-y-1 transition-all border border-gray-200/80 bg-white">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#D6A34A]/12 text-[#9A6A31]">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-[#101312] text-sm font-bold leading-tight">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. SIX PILLARS OF PAN-AFRICAN EXCELLENCE ═════════ */}
      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              eyebrow="What We Do"
              title="Six Pillars of"
              titleHighlight="Pan-African Excellence"
              description="End-to-end capabilities across events, media, advertising, publishing, strategic engagement, and Pan-African projects."
            />
            <Link href="/services" className="btn-outline shrink-0">{t("services_all")} <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sixPillars.map(({ icon: Icon, title, description, href, accent }) => (
              <Link key={title} href={href} className="card-dark p-7 group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between" style={{ borderTopWidth: 3, borderTopColor: accent }}>
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform bg-[#D6A34A]/12">
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                  <h3 className="text-[#101312] font-display font-bold text-lg mb-3">{title}</h3>
                  <p className="text-[#101312]/75 text-sm leading-relaxed mb-5 font-medium">{description}</p>
                </div>
                <span className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto" style={{ color: accent }}>
                  {t("services_learn")} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. FEATURED WORK ════════════════════════════════ */}
      <section className="section-padding bg-transparent">
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

      {/* ══ 10. VERY SMALL TRUSTED PARTNERS ══════════════════ */}
      <section className="py-12 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container-custom text-center">
          <p className="text-[#101312]/60 text-xs uppercase tracking-widest font-bold mb-6">{t("partners_label")}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {partnerList.map((p) => (
              <div key={p.name} className="flex items-center justify-center transition-transform duration-200 hover:scale-105 opacity-85 hover:opacity-100">
                <PartnerLogo logo={p.logo} name={p.name} initials={p.initials} accent={p.accent} width={42} height={42} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. CTA (SHAPE THE NEXT CHAPTER OF AFRICA) ════════ */}
      <section className="py-20 bg-white/70 backdrop-blur-sm border-t border-gray-200">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#9A6A31] bg-[#D6A34A]/15 border border-[#D6A34A]/30">
              Partner With Us
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#101312]">
              Shape the Next <span className="text-gradient">Chapter of Africa</span>
            </h2>
            <p className="text-[#101312]/80 text-lg leading-relaxed font-medium">
              Partner with AfroNova to create experiences, platforms, stories, and connections that move Africa forward.
            </p>
            <p className="text-[#9A6A31] text-sm font-semibold italic">
              &ldquo;We create platforms, experiences, narratives and connections that shape how Africa engages with itself and the world.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/contact" className="btn-primary text-base px-8 py-4 shadow-md">{t("cta_start")} <ArrowRight className="w-5 h-5" /></Link>
              <Link href="/services" className="btn-outline text-base px-8 py-4">{t("cta_explore")}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
