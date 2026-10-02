"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import TikTokIcon from "@/components/ui/TikTokIcon";

export default function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: MapPin, label: t("contact_office"), lines: ["Africa Avenue", "Addis Ababa, Ethiopia"], href: "https://maps.app.goo.gl/WfyUFKJmgt7YLtpZ9" },
    { icon: Phone,  label: t("contact_phone"),  lines: ["+251 965 081 998", "+234 809 562 4444"], href: "tel:+251965081998" },
    { icon: Clock,  label: t("contact_hours"),  lines: [t("contact_hours_val")], href: undefined },
  ];

  const socials = [
    { icon: Instagram, href: "https://www.instagram.com/afronova__",              label: "Instagram",   handle: "@afronova__" },
    { icon: Facebook,  href: "https://facebook.com/afronova",                    label: "Facebook",    handle: "AfroNova" },
    { icon: Twitter,   href: "https://x.com/socialafronova",                     label: "Twitter / X", handle: "@socialafronova" },
    { icon: Youtube,   href: "https://youtube.com/afronova",                     label: "YouTube",     handle: "AfroNova" },
    { icon: Linkedin,  href: "https://www.linkedin.com/company/afronova-mediahub/", label: "LinkedIn",    handle: "AfroNova" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@afronova_",                label: "TikTok",      handle: "@afronova_" },
  ];

  const contactFields = [
    { name: "name",    label: t("contact_field_name"),    required: true, placeholder: t("contact_field_name_ph") },
    { name: "email",   label: t("contact_field_email"),   type: "email" as const, required: true, placeholder: "you@example.com" },
    { name: "phone",   label: t("contact_field_phone"),   placeholder: t("contact_field_phone_ph") },
    { name: "inquiry", label: t("contact_field_inquiry"), options: [
      t("contact_inquiry_general"), t("contact_inquiry_event"), t("contact_inquiry_media"),
      t("contact_inquiry_ads"), t("contact_inquiry_ac"), t("contact_inquiry_sponsor"),
      t("contact_inquiry_press"), t("contact_inquiry_talent"), t("contact_inquiry_other"),
    ]},
    { name: "message", label: t("contact_field_msg"), type: "textarea" as const, required: true, placeholder: t("contact_field_msg_ph") },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden bg-transparent">
        <div className="absolute inset-0 adinkra-bg opacity-30" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(214,163,74,0.12) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          <p className="section-subheading">{t("contact_eyebrow")}</p>
          <h1 className="section-heading text-[#101312] mb-4">{t("contact_h1")} <span className="text-gradient">{t("contact_h1b")}</span></h1>
          <p className="text-[#101312]/75 text-lg leading-relaxed font-medium">{t("contact_hero_body")}</p>
        </div>
      </section>

      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, lines, href }) => (
                  <div key={label} className="card-dark p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(214,163,74,0.18)" }}>
                      <Icon className="w-5 h-5 text-[#9A6A31]" />
                    </div>
                    <div>
                      <p className="text-[#9A6A31] text-xs uppercase tracking-wider font-bold mb-1">{label}</p>
                      {lines.map((line) => href
                        ? <a key={line} href={href} target="_blank" rel="noopener noreferrer" className="block text-[#101312] text-sm font-semibold hover:text-[#9A6A31] transition-colors">{line}</a>
                        : <p key={line} className="text-[#101312] text-sm font-semibold">{line}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[#101312]/60 text-xs uppercase tracking-wider font-bold mb-4">{t("contact_follow")}</p>
                <div className="space-y-1">
                  {socials.map(({ icon: Icon, href, label, handle }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors group">
                      <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#101312]/70 group-hover:border-[#D6A34A] group-hover:text-[#9A6A31] transition-all bg-white">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[#101312] text-sm font-semibold group-hover:text-[#9A6A31] transition-colors">{label}</p>
                        <p className="text-[#101312]/50 text-xs font-medium">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 space-y-3 bg-white shadow-sm"
                   style={{ border: "1px solid rgba(214,163,74,0.30)" }}>
                <p className="text-sm font-bold text-[#9A6A31]">{t("contact_direct")}</p>
                <p className="text-[#101312] font-bold text-base">Tesfaye Gebremichael</p>
                <p className="text-[#101312]/65 text-xs font-semibold">Executive Director, AfroNova</p>
                <div className="space-y-1 text-[#101312]/75 text-sm font-medium">
                  <p>📞 +251 965 081 998</p>
                  <p>📞 +234 809 562 4444</p>
                  <p>✉ tesfaye.afronova@gmail.com</p>
                  <p>🌐 www.afronova.org</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <SectionHeader eyebrow={t("contact_form_eyebrow")} title={t("contact_form_title")} titleHighlight={t("contact_form_highlight")} className="mb-8" />
              <div className="card-dark p-8">
                <ContactForm
                  fields={contactFields}
                  submitLabel={t("contact_send")}
                  endpoint="/api/contact"
                  successMessage={t("contact_success")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200/80 bg-white py-12">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{
                border: "1px solid rgba(214,163,74,0.40)",
                background: "rgba(214,163,74,0.10)",
                color: "#9A6A31",
              }}
            >
              <MapPin className="w-3.5 h-3.5 text-[#9A6A31]" />
              {t("contact_map")}
            </div>
          </div>

          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-3xl overflow-hidden shadow-xl border-2 border-[#D6A34A]/30 bg-gray-100">
            <iframe
              src="https://www.google.com/maps?q=8.9866842,38.7884885&z=18&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AfroNova location on Google Maps"
            />
            
            {/* Overlay badge with Google Maps link */}
            <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#D6A34A]/35 flex items-center gap-3 max-w-[calc(100%-2rem)]">
              <div className="w-8 h-8 rounded-xl bg-[#D6A34A]/15 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#9A6A31]" />
              </div>
              <div className="min-w-0 pr-1">
                <p className="text-[#101312] text-xs font-bold leading-tight truncate">AfroNova Headquarters</p>
                <p className="text-[#101312]/60 text-[11px] font-medium truncate">Africa Avenue, Addis Ababa</p>
              </div>
              <a
                href="https://maps.app.goo.gl/WfyUFKJmgt7YLtpZ9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs px-3 py-1.5 rounded-xl hidden sm:inline-flex items-center gap-1 shrink-0 ml-2 shadow-sm"
              >
                Open Maps ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
