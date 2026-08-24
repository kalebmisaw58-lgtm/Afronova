"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Phone, Clock,
  Instagram, Facebook, Twitter, Youtube, Linkedin,
  ArrowRight, Send, Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const socials = [
  { icon: Instagram, href: "https://instagram.com/afronova",              label: "Instagram" },
  { icon: Facebook,  href: "https://facebook.com/afronova",               label: "Facebook" },
  { icon: Twitter,   href: "https://twitter.com/afronova",                label: "Twitter / X" },
  { icon: Youtube,   href: "https://youtube.com/afronova",                label: "YouTube" },
  { icon: Linkedin,  href: "https://linkedin.com/company/afronova",       label: "LinkedIn" },
];

export default function Footer() {
  const { t } = useLanguage();
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [newsError, setNewsError] = useState("");

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
        setNewsError(json.errors?.email ?? json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      setEmail("");
    } catch {
      setNewsError("Unable to subscribe. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-white/8 adinkra-bg section-overlay-strong">

      {/* ── TOP BAND — colourful wheel stripe echoing the logo ── */}
      <div className="w-full h-1 wheel-shimmer opacity-70" />

      {/* ── MAIN GRID ─────────────────────────────────────────── */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-14 h-14 shrink-0">
                <Image
                  src="/logo.png"
                  alt="AfroNova"
                  fill
                  sizes="56px"
                  className="object-contain drop-shadow-[0_2px_10px_rgba(214,163,74,0.45)]
                             group-hover:drop-shadow-[0_4px_16px_rgba(214,163,74,0.7)]
                             transition-all duration-300"
                />
              </div>
              <div className="leading-tight">
                <p className="font-display font-black text-white text-xl tracking-tight">
                  AFRO<span className="text-gradient">NOVA</span>
                </p>
                <p className="text-white/35 text-[9px] tracking-widest uppercase mt-0.5">
                  Media House &amp; Events
                </p>
              </div>
            </Link>

            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              {t("footer_tagline")}
            </p>

            {/* Contact */}
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#D6A34A" }} />
                Africa Avenue, Addis Ababa 1000, Ethiopia
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/55">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "#D6A34A" }} />
                <a href="tel:+251965081998" className="hover:text-[#D6A34A] transition-colors">
                  +251 96 508 1998
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/55">
                <Clock className="w-4 h-4 shrink-0" style={{ color: "#D6A34A" }} />
                Mon – Fri, 9:00 AM – 5:00 PM
              </li>
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2.5 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#D6A34A";
                    (e.currentTarget as HTMLAnchorElement).style.color       = "#D6A34A";
                    (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(214,163,74,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.color       = "rgba(255,255,255,0.45)";
                    (e.currentTarget as HTMLAnchorElement).style.background  = "";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
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
                  <Link href={l.href} className="text-white/50 text-sm transition-colors flex items-center gap-1 group hover:text-[#D6A34A]">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
              {t("footer_event")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Africa Celebrates 2026", href: "/africa-celebrates-2026" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 text-sm transition-colors flex items-center gap-1 group hover:text-[#D6A34A]">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
              {t("footer_stay")}
            </h4>
            <p className="text-white/50 text-sm mb-4 leading-relaxed">
              {t("footer_stay_desc")}
            </p>
            {submitted ? (
              <div className="space-y-1">
                <p className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#D6A34A" }}>
                  ✓ {t("footer_subscribed")}
                </p>
                <p className="text-white/35 text-xs">Check your inbox for a welcome email.</p>
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
                  className="form-input text-sm py-2.5"
                />
                {newsError && (
                  <p className="text-xs" style={{ color: "#C18A45" }}>{newsError}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm
                             font-semibold rounded-xl text-white transition-all hover:opacity-90
                             disabled:opacity-60 disabled:cursor-not-allowed"
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
      <div className="border-t border-white/5">
        <div className="container-custom py-3 flex flex-col sm:flex-row items-center
                        justify-between gap-3">
          <p className="text-white/35 text-xs">{t("footer_rights")}</p>
          <div className="flex items-center gap-4">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use",   href: "/terms" },
              { label: "Cookie Policy",  href: "/cookies" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-white/35 hover:text-[#D6A34A] text-xs transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
