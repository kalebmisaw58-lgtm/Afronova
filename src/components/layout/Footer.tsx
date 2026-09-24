"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Phone, Clock,
  Instagram, Facebook, Twitter, Youtube, Linkedin,
  ArrowRight, Send, Loader2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import TikTokIcon from "@/components/ui/TikTokIcon";

const DEFAULT_SOCIALS = [
  { icon: Instagram, href: "https://www.instagram.com/afronova__",              label: "Instagram" },
  { icon: Facebook,  href: "https://www.facebook.com/share/19FxHLrzQD/",               label: "Facebook" },
  { icon: Twitter,   href: "https://x.com/socialafronova",                label: "Twitter / X" },
  { icon: Youtube,   href: "https://www.youtube.com/@AfroNovaTV-n2c",                label: "YouTube" },
  { icon: Linkedin,  href: "https://www.linkedin.com/company/afronova-mediahub/",       label: "LinkedIn" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@afronova_",            label: "TikTok" },
];

const FALLBACK_FOOTER = {
  address: "Africa Avenue, Bole Sub-City, Woreda 02, House No. New, Addis Ababa, Ethiopia",
  phone: "+251 96 508 1998",
  hours: "Mon to Fri, 9:00 AM to 5:00 PM",
  mapUrl: "https://maps.app.goo.gl/WfyUFKJmgt7YLtpZ9",
  socials: DEFAULT_SOCIALS,
};

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [newsError, setNewsError] = useState("");
  const [footerData, setFooterData] = useState(FALLBACK_FOOTER);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    let cancelled = false;
    fetch("/api/content?locale=en")
      .then((r) => r.json())
      .then((json) => {
        if (cancelled || !json.translations) return;
        setFooterData({
          address: json.translations.footer_address ?? FALLBACK_FOOTER.address,
          phone: json.translations.footer_phone ?? FALLBACK_FOOTER.phone,
          hours: json.translations.footer_hours ?? FALLBACK_FOOTER.hours,
          mapUrl: json.translations.footer_map_url ?? FALLBACK_FOOTER.mapUrl,
          socials: DEFAULT_SOCIALS.map((s) => ({
            ...s,
            href: json.translations[`footer_${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`] ?? s.href,
          })),
        });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [pathname]);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setNewsError("");

    try {
      const res  = await fetch("/api/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, source: "footer" }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        const err = json.errors?.email ?? json.error ?? "Something went wrong. Please try again.";
        setNewsError(err);
        showToast("Subscription Error", err, "error");
        return;
      }

      setSubmitted(true);
      setEmail("");
      showToast("Subscribed!", "Thank you for subscribing to AfroNova updates.", "success");
    } catch {
      const netErr = "Unable to subscribe. Please check your connection.";
      setNewsError(netErr);
      showToast("Network Error", netErr, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-gray-200 bg-white/75 backdrop-blur-sm text-[#101312] adinkra-bg">

      {/* ── TOP BAND, colourful wheel stripe echoing the logo ── */}
      <div className="w-full h-1 wheel-shimmer opacity-80" />

      {/* ── MAIN GRID ─────────────────────────────────────────── */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3.5 group w-fit">
              <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0">
                <Image
                  src="/logo.png"
                  alt="AfroNova"
                  fill
                  sizes="128px"
                  className="object-contain drop-shadow-[0_2px_12px_rgba(214,163,74,0.35)]
                             group-hover:drop-shadow-[0_4px_22px_rgba(214,163,74,0.65)]
                             transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <div className="leading-none">
                <p className="font-display font-black text-[#101312] text-3xl md:text-4xl tracking-tight">
                  AFRO<span className="text-gradient">NOVA</span>
                </p>
              </div>
            </Link>

            <p className="text-[#101312]/75 text-sm leading-relaxed max-w-xs font-medium">
              {t("footer_tagline")}
            </p>

             {/* Contact */}
             <ul className="space-y-2.5">
               <li className="flex items-start gap-2.5 text-sm text-[#101312]/75 font-medium">
                 <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#9A6A31]" />
                 <a href={footerData.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#9A6A31] transition-colors">
                   {footerData.address}
                 </a>
               </li>
               <li className="flex items-center gap-2.5 text-sm text-[#101312]/75 font-medium">
                 <Phone className="w-4 h-4 shrink-0 text-[#9A6A31]" />
                 <a href={`tel:${footerData.phone.replace(/\s/g, "")}`} className="hover:text-[#9A6A31] transition-colors">
                   {footerData.phone}
                 </a>
               </li>
               <li className="flex items-center gap-2.5 text-sm text-[#101312]/75 font-medium">
                 <Clock className="w-4 h-4 shrink-0 text-[#9A6A31]" />
                 {footerData.hours}
               </li>
             </ul>

             {/* Socials */}
             <div className="flex items-center gap-2.5 pt-1">
               {footerData.socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             transition-all duration-200 border border-gray-300 text-[#101312]/70 bg-white hover:border-[#D6A34A] hover:text-[#9A6A31]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-[#101312] font-bold text-xs uppercase tracking-widest mb-4">
              {t("footer_company")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t("nav_about"),     href: "/about" },
                { label: t("nav_services"),  href: "/services" },
                { label: t("nav_partners"),  href: "/partners" },
                { label: t("nav_portfolio"), href: "/portfolio" },
                { label: t("nav_news"),      href: "/news" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#101312]/70 text-sm font-medium transition-colors flex items-center gap-1 group hover:text-[#9A6A31]">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#9A6A31]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event links */}
          <div>
            <h4 className="text-[#101312] font-bold text-xs uppercase tracking-widest mb-4">
              {t("footer_event")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Africa Celebrates 2026", href: "/africa-celebrates-2026" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#101312]/70 text-sm font-medium transition-colors flex items-center gap-1 group hover:text-[#9A6A31]">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#9A6A31]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#101312] font-bold text-xs uppercase tracking-widest mb-4">
              {t("footer_stay")}
            </h4>
            <p className="text-[#101312]/70 text-sm mb-4 leading-relaxed font-medium">
              {t("footer_stay_desc")}
            </p>
            {submitted ? (
              <div className="space-y-1">
                <p className="text-sm font-bold flex items-center gap-1.5 text-[#9A6A31]">
                  ✓ {t("footer_subscribed")}
                </p>
                <p className="text-[#101312]/60 text-xs">Check your inbox for a welcome email.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setNewsError(""); }}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                  className="form-input text-sm py-2.5 bg-white border-gray-300 text-[#101312]"
                />
                {newsError && (
                  <p className="text-xs" style={{ color: "#C18A45" }}>{newsError}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm
                             font-semibold rounded-xl text-white transition-all hover:opacity-90
                             disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                  style={{ background: "linear-gradient(90deg,#9A6A31,#D6A34A)" }}
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing…</>
                    : <><Send className="w-4 h-4" /> Subscribe</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ────────────────────────────────────────── */}
      <div className="border-t border-gray-300/60 bg-white">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center
                        justify-between gap-3">
          <p className="text-[#101312]/60 text-xs font-medium">{t("footer_rights")}</p>
          <div className="flex items-center gap-4">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use",   href: "/terms" },
              { label: "Cookie Policy",  href: "/cookies" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-[#101312]/60 hover:text-[#9A6A31] text-xs font-medium transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

