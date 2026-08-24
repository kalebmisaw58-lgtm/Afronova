"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: MapPin, label: t("contact_office"), lines: ["Africa Avenue", "Addis Ababa, Ethiopia"], href: "https://www.google.com/maps/search/?api=1&query=Africa+Avenue+Addis+Ababa+Ethiopia" },
    { icon: Phone,  label: t("contact_phone"),  lines: ["+251 965 081 998", "+234 809 562 4444"], href: "tel:+251965081998" },
    { icon: Clock,  label: t("contact_hours"),  lines: [t("contact_hours_val")], href: undefined },
  ];

  const socials = [
    { icon: Instagram, href: "https://instagram.com/afronova",          label: "Instagram",   handle: "@afronova" },
    { icon: Facebook,  href: "https://facebook.com/afronova",           label: "Facebook",    handle: "AfroNova" },
    { icon: Twitter,   href: "https://twitter.com/afronova",            label: "Twitter / X", handle: "@afronova" },
    { icon: Youtube,   href: "https://youtube.com/afronova",            label: "YouTube",     handle: "AfroNova TV" },
    { icon: Linkedin,  href: "https://linkedin.com/company/afronova",   label: "LinkedIn",    handle: "AfroNova" },
  ];

  const contactFields = [
    { name: "name",    label: t("contact_field_name"),    required: true, placeholder: t("contact_field_name_ph") },
    { name: "email",   label: t("contact_field_email"),   type: "email" as const, required: true, placeholder: "you@example.com" },
    { name: "phone",   label: t("contact_field_phone"),   placeholder: t("contact_field_phone_ph") },
    { name: "inquiry", label: t("contact_field_inquiry"), options: [
      t("contact_inquiry_general"), t("contact_inquiry_event"), t("contact_inquiry_media"),
      t("contact_inquiry_ads"), t("contact_inquiry_ac"), t("contact_inquiry_sponsor"),
      t("contact_inquiry_press"), t("contact_inquiry_other"),
    ]},
    { name: "message", label: t("contact_field_msg"), type: "textarea" as const, required: true, placeholder: t("contact_field_msg_ph") },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 adinkra-bg opacity-60" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(154,106,49,0.22) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          <p className="section-subheading">{t("contact_eyebrow")}</p>
          <h1 className="section-heading text-white mb-4">{t("contact_h1")} <span className="text-gradient">{t("contact_h1b")}</span></h1>
          <p className="text-white/55 leading-relaxed">{t("contact_hero_body")}</p>
        </div>
      </section>

      <section className="section-padding section-overlay">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, lines, href }) => (
                  <div key={label} className="card-dark p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(214,163,74,0.10)" }}>
                      <Icon className="w-5 h-5" style={{ color: "#D6A34A" }} />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider font-medium mb-1">{label}</p>
                      {lines.map((line) => href
                        ? <a key={line} href={href} target="_blank" rel="noopener noreferrer" className="block text-white text-sm hover:text-[#D6A34A] transition-colors">{line}</a>
                        : <p key={line} className="text-white text-sm">{line}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider font-medium mb-4">{t("contact_follow")}</p>
                <div className="space-y-1">
                  {socials.map(({ icon: Icon, href, label, handle }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/45 group-hover:border-[#D6A34A] group-hover:text-[#D6A34A] transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-white/65 text-sm font-medium group-hover:text-[#D6A34A] transition-colors">{label}</p>
                        <p className="text-white/30 text-xs">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 space-y-3"
                   style={{ background: "linear-gradient(135deg,rgba(214,163,74,0.10),rgba(185,133,59,0.07))", border: "1px solid rgba(214,163,74,0.22)" }}>
                <p className="text-sm font-bold" style={{ color: "#D6A34A" }}>{t("contact_direct")}</p>
                <p className="text-white font-semibold text-sm">Tesfaye Gebremichael</p>
                <p className="text-white/50 text-xs">Executive Director, AfroNova</p>
                <div className="space-y-1 text-white/55 text-sm">
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

      <section className="border-t border-white/5">
        <div className="container-custom py-4 mb-2">
          <p className="text-white/30 text-xs text-center mb-4 uppercase tracking-wider">{t("contact_map")}</p>
        </div>
        <div className="w-full h-80 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7177!2d38.7578!3d9.0065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAfrica%20Avenue%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1"
            width="100%" height="100%"
            style={{ border: 0, filter: "invert(0.88) hue-rotate(180deg) saturate(0.6) brightness(0.9)" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="AfroNova location on Google Maps"
          />
        </div>
      </section>
    </>
  );
}
