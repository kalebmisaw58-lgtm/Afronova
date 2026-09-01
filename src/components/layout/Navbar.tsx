"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type Locale } from "@/context/LanguageContext";

type NavItem = { key: string; href: string; highlight?: boolean };

const navItems: NavItem[] = [
  { key: "nav_home",      href: "/" },
  { key: "nav_about",     href: "/about" },
  { key: "nav_services",  href: "/services" },
  { key: "nav_portfolio", href: "/portfolio" },
  { key: "nav_news",      href: "/news" },
  { key: "nav_partners",  href: "/partners" },
  { key: "nav_contact",   href: "/contact" },
];

const localeLabels: Record<Locale, string> = {
  en: "EN",
  am: "አማ",
  fr: "FR",
  pt: "PT",
  ar: "ع",
};

// Human-readable names shown in the dropdown
const localeNames: Record<Locale, string> = {
  en: "English",
  am: "አማርኛ",
  fr: "Français",
  pt: "Português",
  ar: "العربية",
};

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md shadow-lg shadow-black/60 border-b border-white/5"
          : "bg-transparent"
      )}
      style={scrolled ? { background: "rgba(10,3,0,0.92)" } : undefined}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── LOGO ─────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-16 h-16 md:w-[72px] md:h-[72px]">
              <Image
                src="/logo.png"
                alt="AfroNova logo"
                fill
                sizes="72px"
                className="object-contain drop-shadow-[0_2px_8px_rgba(214,163,74,0.5)]
                           group-hover:drop-shadow-[0_4px_14px_rgba(214,163,74,0.75)]
                           transition-all duration-300"
                priority
              />
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="font-display font-black text-white text-lg tracking-tight leading-none">
                AFRO<span className="text-gradient">NOVA</span>
              </p>
              <p className="text-white/40 text-[9px] tracking-widest uppercase mt-0.5">
                Media House &amp; Events
              </p>
            </div>
          </Link>

          {/* ── DESKTOP NAV ──────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-5">
            {navItems.map((item) =>
              item.highlight ? (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300",
                    pathname === item.href
                      ? "text-white shadow-lg"
                      : "border text-[#D6A34A] hover:text-white"
                  )}
                  style={
                    pathname === item.href
                      ? { background: "linear-gradient(90deg,#9A6A31,#D6A34A)", borderColor: "transparent", boxShadow: "0 2px 12px rgba(214,163,74,0.45)" }
                      : { borderColor: "rgba(214,163,74,0.45)" }
                  }
                  onMouseEnter={(e) => {
                    if (pathname !== item.href) {
                      (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(90deg,#9A6A31,#D6A34A)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "transparent";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== item.href) {
                      (e.currentTarget as HTMLAnchorElement).style.background = "";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(214,163,74,0.45)";
                    }
                  }}
                >
                  {t(item.key)}
                </Link>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "nav-link pb-0.5",
                    pathname === item.href && "nav-link-active"
                  )}
                >
                  {t(item.key)}
                </Link>
              )
            )}
          </nav>

          {/* ── RIGHT CONTROLS ───────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-white/65 hover:text-[#D6A34A]
                           transition-colors text-sm font-medium px-2 py-1 rounded-lg hover:bg-white/5"
                aria-label="Change language"
                aria-expanded={langOpen}
                aria-haspopup="menu"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{localeLabels[locale]}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", langOpen && "rotate-180")} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl shadow-2xl overflow-hidden z-50
                                border border-white/10"
                     style={{ background: "rgba(10,3,0,0.97)" }}
                     role="menu">
                  {(["en", "am", "fr", "pt", "ar"] as Locale[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors flex items-center gap-2",
                        locale === l ? "text-[#D6A34A] font-semibold" : "text-white/65"
                      )}
                      dir="ltr"
                      role="menuitem"
                    >
                      <span className="text-white/40 text-xs w-6 shrink-0">{localeLabels[l]}</span>
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE DRAWER ────────────────────────────────────── */}
      <div className={cn(
        "lg:hidden transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-screen" : "max-h-0"
      )}>
        <nav className="border-t border-white/5 px-4 py-4 flex flex-col gap-1"
             style={{ background: "rgba(10,3,0,0.98)" }}>

          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                item.highlight
                  ? pathname === item.href
                    ? "text-white"
                    : "text-[#D6A34A] border border-[#D6A34A]/30 hover:text-white"
                  : pathname === item.href
                  ? "text-[#D6A34A] bg-white/5"
                  : "text-white/75 hover:bg-white/5 hover:text-white"
              )}
              style={
                item.highlight && pathname !== item.href
                  ? {}
                  : item.highlight
                  ? { background: "linear-gradient(90deg,#9A6A31,#D6A34A)" }
                  : {}
              }
            >
              {t(item.key)}
            </Link>
          ))}

          {/* Mobile language pills */}
          <div className="flex flex-wrap gap-2 mt-3 px-1">
            {(["en", "am", "fr", "pt", "ar"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                  locale === l
                    ? "text-white border-transparent"
                    : "border-white/20 text-white/55 hover:border-[#D6A34A]/50 hover:text-[#D6A34A]"
                )}
                style={locale === l ? { background: "linear-gradient(90deg,#9A6A31,#D6A34A)" } : {}}
                dir="ltr"
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

