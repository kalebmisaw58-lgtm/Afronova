"use client";

import Link from "next/link";
import { ArrowRight, Award, Globe2, Target, Eye, Heart, Users, Zap, Shield, Star, Briefcase, Camera, Megaphone, Handshake } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PartnerLogo from "@/components/ui/PartnerLogo";
import { useLanguage } from "@/context/LanguageContext";
import { partners } from "@/lib/partners";

export default function AboutPage() {
  const { t } = useLanguage();

  const leadershipStructure = [
    {
      category: "Executive Leadership",
      description: "Directing strategic vision, institutional partnerships, and Pan-African expansion.",
      icon: Briefcase,
      color: "#9A6A31"
    },
    {
      category: "Creative & Production",
      description: "Curating world-class experiences, documentary storytelling, and broadcast excellence.",
      icon: Camera,
      color: "#B9853B"
    },
    {
      category: "Media & Communications",
      description: "Amplifying African narratives, press engagement, and global audience reach.",
      icon: Megaphone,
      color: "#D6A34A"
    },
    {
      category: "Strategic Partnerships",
      description: "Building high-level diplomatic, corporate, and inter-governmental alliances.",
      icon: Handshake,
      color: "#9A6A31"
    },
  ];

  const values = [
    { icon: Shield, title: "Authentic Representation", desc: "Positioning African narratives accurately, with dignity and cultural pride." },
    { icon: Heart,  title: "Cultural Excellence", desc: "Blending traditional heritage with modern creative standards." },
    { icon: Zap,    title: "Innovation & Vision", desc: "Pioneering new platforms for cross-border engagement and enterprise." },
    { icon: Users,  title: "Community & Unity", desc: "Uniting Africans across the continent and throughout the global diaspora." },
  ];

  return (
    <>
      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 adinkra-bg opacity-30" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(214,163,74,0.12) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <p className="section-subheading">Branding the New Africa. Limitless Possibilities.</p>
            <h1 className="section-heading text-[#101312] mb-6">
              ABOUT <span className="text-gradient">AFRONOVA</span>
            </h1>
            <p className="text-[#101312]/85 text-lg md:text-xl leading-relaxed font-medium">
              AfroNova is a Pan-African organization shaping how Africa is experienced, represented, and connected to the world. Headquartered in Addis Ababa, Ethiopia, we bring together culture, creativity, innovation, media, and strategic engagement to create meaningful experiences and platforms that connect Africa with the world.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 2. OUR STORY & MISSION/VISION ═══════════════════ */}
      <section className="section-padding bg-[#F8F6F0]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <SectionHeader eyebrow="Our Story" title="Building the" titleHighlight="Pan-African Legacy" />
              <p className="text-[#101312]/80 leading-relaxed text-base md:text-lg font-medium">
                Founded in Addis Ababa, Ethiopia, AfroNova began with a clear vision: to create platforms that celebrate Africa’s identity, amplify its creativity and ideas, foster meaningful collaboration, and connect the continent with the world.
              </p>
              <p className="text-[#101312]/75 leading-relaxed text-base font-medium">
                From its beginnings in Addis Ababa, AfroNova has evolved into a Pan-African organization working across culture, creativity, media, events, strategic engagement, and partnerships. Today, we collaborate with governments, diplomatic missions, international organizations, media, cultural institutions, and creative leaders across Africa and beyond, creating experiences, shaping narratives, and developing initiatives that contribute to the Africa of today and help shape the Africa of tomorrow.
              </p>
            </div>
            <div className="space-y-6">
              <div className="card-dark p-8 space-y-4 border-l-4 border-[#D6A34A]">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-[#9A6A31]" />
                  <h3 className="text-[#9A6A31] text-xs uppercase tracking-widest font-bold">Our Mission</h3>
                </div>
                <p className="text-[#101312]/85 text-base leading-relaxed font-medium">
                  To shape platforms that amplify African voices, celebrate cultural identity, foster meaningful collaboration, and advance Africa’s creativity, innovation, and global engagement through transformative experiences, storytelling, strategic communications, and Pan-African initiatives.
                </p>
              </div>

              <div className="card-dark p-8 space-y-4 border-l-4 border-[#9A6A31]">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-[#9A6A31]" />
                  <h3 className="text-[#9A6A31] text-xs uppercase tracking-widest font-bold">Our Vision</h3>
                </div>
                <p className="text-[#101312]/85 text-base leading-relaxed font-medium">
                  To shape a future where Africa’s culture, creativity, innovation, and ideas are confidently represented, globally connected, and influential in shaping the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. VALUES ═══════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader eyebrow="What Drives Us" title="Core Organisation" titleHighlight="Values" centered className="mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-dark p-6 space-y-3 hover:-translate-y-1 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#D6A34A]/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#9A6A31]" />
                </div>
                <h3 className="text-[#101312] font-bold text-lg">{title}</h3>
                <p className="text-[#101312]/70 text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. THE PEOPLE BEHIND AFRONOVA ═══════════════════ */}
      <section className="section-padding bg-[#F8F6F0]">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Structure"
            title="The People Behind"
            titleHighlight="AfroNova"
            description="Organized into specialized executive pillars dedicated to Pan-African impact."
            centered
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipStructure.map(({ category, description, icon: Icon, color }) => (
              <div key={category} className="card-dark p-7 space-y-4 hover:-translate-y-1 transition-all" style={{ borderTopWidth: 3, borderTopColor: color }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm border border-gray-100">
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="text-[#101312] font-display font-bold text-xl">{category}</h3>
                <p className="text-[#101312]/75 text-sm leading-relaxed font-medium">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. PARTNERS STRIP ════════════════════════════════ */}
      <section className="py-14 border-t border-gray-200 bg-white">
        <div className="container-custom text-center">
          <p className="text-[#101312]/60 text-xs uppercase tracking-widest font-bold mb-8">Trusted Partners &amp; Collaborators</p>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 md:gap-8">
            {partners.slice(0, 10).map((p) => (
              <div key={p.name} className="flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-90 hover:opacity-100">
                <PartnerLogo logo={p.logo} name={p.name} initials={p.initials} accent={p.accent} width={84} height={84} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. CTA ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#F8F6F0] border-t border-gray-200">
        <div className="container-custom text-center space-y-6">
          <SectionHeader eyebrow="Work With Us" title="Shape the Next" titleHighlight="Chapter of Africa" centered />
          <p className="text-[#101312]/80 text-lg max-w-xl mx-auto font-medium">
            Partner with AfroNova to create experiences, platforms, stories, and connections that move Africa forward.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base px-8 py-4 shadow-md">Start a Conversation <ArrowRight className="w-5 h-5 ml-1" /></Link>
            <Link href="/services" className="btn-outline text-base px-8 py-4">Explore Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
