"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const slides = [
  {
    name: "Kwame Nkrumah",
    title: "Father of Pan-Africanism · Ghana · 1909 to 1972",
    quote: "Africa is one continent, one people, and one nation.",
    initial: "KN",
    photo: "/heroes/kwame-nkrumah.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "Ghana",
    flag: "🇬🇭",
  },
  {
    name: "Nelson Mandela",
    title: "Madiba · South Africa · 1918 to 2013",
    quote: "It always seems impossible until it's done.",
    initial: "NM",
    photo: "/heroes/nelson-mandela.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "South Africa",
    flag: "🇿🇦",
  },
  {
    name: "Haile Selassie I",
    title: "Lion of Judah · Ethiopia · 1892 to 1975",
    quote: "Throughout history, it has been the inaction of those who could have acted that has made it possible for evil to triumph.",
    initial: "HS",
    photo: "/heroes/haile-selassie.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#B9853B",
    country: "Ethiopia",
    flag: "🇪🇹",
  },
  {
    name: "Patrice Lumumba",
    title: "Hero of Independence · DR Congo · 1925 to 1961",
    quote: "Africa will write its own history, a history of glory and dignity.",
    initial: "PL",
    photo: "/heroes/patrice-lumumba.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "DR Congo",
    flag: "🇨🇩",
  },
  {
    name: "Thomas Sankara",
    title: "The Upright Man · Burkina Faso · 1949 to 1987",
    quote: "You cannot carry out fundamental change without a certain amount of madness.",
    initial: "TS",
    photo: "/heroes/thomas-sankara.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "Burkina Faso",
    flag: "🇧🇫",
  },
  {
    name: "Jomo Kenyatta",
    title: "Founding Father · Kenya · 1897 to 1978",
    quote: "The African is not struggling for his dignity; he has it.",
    initial: "JK",
    photo: "/heroes/jomo-kenyatta.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#B9853B",
    country: "Kenya",
    flag: "🇰🇪",
  },
  {
    name: "Julius Nyerere",
    title: "Mwalimu · Tanzania · 1922 to 1999",
    quote: "We are at war with poverty and oppression, and this is a war we must win.",
    initial: "JN",
    photo: "/heroes/julius-nyerere.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "Tanzania",
    flag: "🇹🇿",
  },
  {
    name: "Amílcar Cabral",
    title: "Revolutionary Poet · Guinea-Bissau · 1924 to 1973",
    quote: "Mask no difficulties, tell no lies, claim no easy victories.",
    initial: "AC",
    photo: "/heroes/amilcar-cabral.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "Guinea-Bissau",
    flag: "🇬🇼",
  },
  {
    name: "Wangari Maathai",
    title: "Green Belt Movement · Kenya · 1940 to 2011",
    quote: "In the course of history, there comes a time when humanity is called to shift to a new level of consciousness.",
    initial: "WM",
    photo: "/heroes/wangari-maathai.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#B9853B",
    country: "Kenya",
    flag: "🇰🇪",
  },
  {
    name: "Miriam Makeba",
    title: "Mama Africa · South Africa · 1932 to 2008",
    quote: "I look at an ant and I see myself: a native South African, enduring.",
    initial: "MM",
    photo: "/heroes/miriam-makeba.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "South Africa",
    flag: "🇿🇦",
  },
  {
    name: "Steve Biko",
    title: "Black Consciousness · South Africa · 1946 to 1977",
    quote: "The most potent weapon in the hands of the oppressor is the mind of the oppressed.",
    initial: "SB",
    photo: "/heroes/steve-biko.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#B9853B",
    country: "South Africa",
    flag: "🇿🇦",
  },
  {
    name: "Cheikh Anta Diop",
    title: "Historian of Africa · Senegal · 1923 to 1986",
    quote: "Africa has a history, and it was a great one.",
    initial: "CD",
    photo: "/heroes/cheikh-anta-diop.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "Senegal",
    flag: "🇸🇳",
  },
  {
    name: "Fela Kuti",
    title: "Father of Afrobeat · Nigeria · 1938 to 1997",
    quote: "Music is the weapon of the future.",
    initial: "FK",
    photo: "/heroes/fela-kuti.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#B9853B",
    country: "Nigeria",
    flag: "🇳🇬",
  },
  {
    name: "Edward Wilmot Blyden",
    title: "Pioneer of Pan-African Thought · West Indies & Liberia · 1832 to 1912",
    quote: "An African is an African, possessing distinct gifts for humanity.",
    initial: "EB",
    photo: "/heroes/edward-wilmot-blyden.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "Liberia",
    flag: "🇱🇷",
  },
  {
    name: "Martin Delany",
    title: "Father of Black Nationalism · United States · 1812 to 1885",
    quote: "We are a race, a people, possessing the inherent capacity for self-government.",
    initial: "MD",
    photo: "/heroes/martin-delany.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#B9853B",
    country: "United States",
    flag: "🇺🇸",
  },
  {
    name: "Achille Mbembe",
    title: "Pan-African Philosopher · Cameroon · Born 1957",
    quote: "Africa is at the heart of the world's movement into tomorrow.",
    initial: "AM",
    photo: "/heroes/achille-mbembe.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "Cameroon",
    flag: "🇨🇲",
  },
  {
    name: "Wole Soyinka",
    title: "Pan-African Literary Icon · Nigeria · Born 1934",
    quote: "A tiger does not proclaim his tigritude, he pounces.",
    initial: "WS",
    photo: "/heroes/wole-soyinka.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#B9853B",
    country: "Nigeria",
    flag: "🇳🇬",
  },
  {
    name: "Thabo Mbeki",
    title: "Pan-African Statesman · South Africa · Born 1942",
    quote: "I am an African. I owe my being to the hills and the valleys of our continent.",
    initial: "TM",
    photo: "/heroes/thabo-mbeki.jpg",
    bg: "radial-gradient(ellipse 90% 90% at 75% 35%, #FDFBF7 0%, #F5F3EC 55%, #FFFFFF 100%)",
    accentColor: "#9A6A31",
    country: "South Africa",
    flag: "🇿🇦",
  },
];

const INTERVAL = 5500;

function AdinkraPattern({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.06 }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`adinkra-${color.replace("#","")}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 5 L75 40 L40 75 L5 40 Z" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="40" cy="40" r="12" fill="none" stroke={color} strokeWidth="1.5" />
          <line x1="40" y1="28" x2="40" y2="52" stroke={color} strokeWidth="1" />
          <line x1="28" y1="40" x2="52" y2="40" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#adinkra-${color.replace("#","")})`} />
    </svg>
  );
}

export default function HeroSlideshow() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const id = setInterval(goNext, INTERVAL);
    return () => clearInterval(id);
  }, [goNext]);

  const activeSlide = slides[current];

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden bg-transparent">
      {/* ── Slide background layers ────────────────────────────── */}
      {slides.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={slide.name}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms]",
              isActive ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Colour gradient background */}
            <div className="absolute inset-0" style={{ background: slide.bg }} />

            {/* Adinkra pattern */}
            <AdinkraPattern color={slide.accentColor} />

            {/* Giant decorative initial */}
            <div
              className={cn(
                "absolute right-[2%] top-1/2 -translate-y-1/2",
                "font-display font-black select-none pointer-events-none",
                "transition-all duration-[1400ms]",
                isActive ? "opacity-[0.04] translate-x-0" : "opacity-0 translate-x-20"
              )}
              style={{
                fontSize: "clamp(12rem, 28vw, 26rem)",
                lineHeight: 1,
                color: slide.accentColor,
              }}
            >
              {slide.initial}
            </div>

            {/* Light overlay gradients */}
            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background:
                  "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0.30) 75%, transparent 100%)",
              }}
            />
          </div>
        );
      })}

      {/* ── Responsive Content Grid (Zero Collision) ───────────── */}
      <div className="container-custom relative z-10 pt-28 pb-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Hero Text Content */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase animate-fade-in"
              style={{
                border: "1px solid rgba(214,163,74,0.45)",
                background: "rgba(214,163,74,0.12)",
                color: "#9A6A31",
              }}
            >
              <Star className="w-3.5 h-3.5 fill-[#9A6A31] text-[#9A6A31]" />
              {t("hero_badge")}
            </div>

            <h1 className="font-display font-black leading-none tracking-tight animate-slide-up text-[#101312]"
                style={{ fontSize: "clamp(3rem, 7.5vw, 6.5rem)" }}>
              Afro<span className="text-gradient">Nova</span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gradient leading-snug">
              {t("hero_tagline")}
            </p>

            <p className="text-[#101312]/75 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
              {t("hero_body")}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <Link href="/about" className="btn-primary text-base px-7 py-3.5 shadow-md justify-center">
                {t("hero_cta_discover")} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/services" className="btn-outline text-base px-7 py-3.5 justify-center">
                {t("hero_cta_services")}
              </Link>
              <Link
                href="/contact"
                className="btn-ghost border border-[#101312]/20 text-[#101312] hover:bg-black/5 text-base px-7 py-3.5 justify-center"
              >
                {t("hero_cta_work")}
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Hero Portrait 3D Layered Card Deck */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center mt-4 lg:mt-0 pr-7 sm:pr-10 lg:pr-12">
            <div className="relative w-full aspect-[4/5] max-w-[290px] sm:max-w-[350px] lg:max-w-[400px] select-none">
              {slides.map((slide, i) => {
                const offset = (i - current + slides.length) % slides.length;
                const isFront = offset === 0;
                const isMiddle = offset === 1;
                const isBack = offset === 2;
                const isVisible = isFront || isMiddle || isBack;

                return (
                  <div
                    key={slide.name}
                    role={isMiddle || isBack ? "button" : undefined}
                    tabIndex={isMiddle || isBack ? 0 : -1}
                    aria-label={isMiddle || isBack ? `View leader ${slide.name}` : undefined}
                    aria-hidden={!isVisible}
                    onClick={() => {
                      if (isMiddle) setCurrent((c) => (c + 1) % slides.length);
                      if (isBack) setCurrent((c) => (c + 2) % slides.length);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        if (isMiddle) setCurrent((c) => (c + 1) % slides.length);
                        if (isBack) setCurrent((c) => (c + 2) % slides.length);
                      }
                    }}
                    className={cn(
                      "absolute inset-0 rounded-3xl overflow-hidden transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none origin-bottom-left",
                      isFront && "z-30 opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0 shadow-2xl border-2 border-[#D6A34A]/40 pointer-events-auto",
                      isMiddle && "z-20 opacity-85 scale-[0.92] sm:scale-[0.93] translate-x-[14px] sm:translate-x-[22px] lg:translate-x-[28px] translate-y-[8px] sm:translate-y-[12px] rotate-[4deg] shadow-xl border border-[#D6A34A]/25 cursor-pointer hover:opacity-100 hover:scale-[0.94] focus-visible:ring-2 focus-visible:ring-[#9A6A31]",
                      isBack && "z-10 opacity-60 scale-[0.84] sm:scale-[0.86] translate-x-[26px] sm:translate-x-[40px] lg:translate-x-[50px] translate-y-[16px] sm:translate-y-[22px] rotate-[8deg] shadow-lg border border-[#D6A34A]/15 cursor-pointer hover:opacity-85 hover:scale-[0.87] focus-visible:ring-2 focus-visible:ring-[#9A6A31]",
                      !isVisible && "z-0 opacity-0 pointer-events-none scale-[0.78] translate-x-[60px] translate-y-[28px] rotate-[12deg]"
                    )}
                    style={{
                      background: "linear-gradient(135deg, #F8F6F0 0%, #EFECE3 100%)",
                    }}
                  >
                    <Image
                      src={slide.photo}
                      alt={slide.name}
                      fill
                      sizes="(max-width: 1024px) 90vw, 400px"
                      className={cn(
                        "object-cover object-top transition-transform duration-700",
                        isFront && "hover:scale-105"
                      )}
                      priority={i <= 2}
                    />

                    {/* Vignette overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: isFront
                          ? "linear-gradient(to top, rgba(16,19,18,0.92) 0%, rgba(16,19,18,0.40) 35%, transparent 70%)"
                          : "linear-gradient(to top, rgba(16,19,18,0.85) 0%, rgba(16,19,18,0.20) 50%, transparent 80%)",
                      }}
                    />

                    {/* Front card full details caption */}
                    {isFront && (
                      <div className="absolute bottom-5 left-5 right-5 text-right text-white z-10 animate-fade-in">
                        <div
                          className="ml-auto mb-1.5 h-0.5 w-10 rounded-full"
                          style={{ background: slide.accentColor }}
                        />
                        <p className="text-white/70 text-[10px] mb-0.5 tracking-widest uppercase font-semibold">
                          {slide.flag}&nbsp; {slide.country}
                        </p>
                        <p className="font-display font-black text-lg sm:text-xl leading-tight text-white drop-shadow-md">
                          {slide.name}
                        </p>
                        <p
                          className="text-[11px] font-bold tracking-wide mt-0.5 leading-snug"
                          style={{ color: "#F0B84F" }}
                        >
                          {slide.title}
                        </p>
                      </div>
                    )}

                    {/* Middle and Back card quick indicator tag */}
                    {(isMiddle || isBack) && (
                      <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white border border-white/20 text-[10px] font-bold tracking-wider flex items-center gap-1.5 opacity-80 hover:opacity-100">
                        <span>{slide.flag}</span>
                        <span className="hidden sm:inline">{slide.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── Dot indicators ─────────────────────────────────── */}
      <div className="relative z-20 flex items-center gap-1.5 flex-wrap justify-center px-4 pb-8">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to ${slide.name}`}
            title={slide.name}
            className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9A6A31]/50 cursor-pointer"
            style={{
              width: i === current ? 22 : 6,
              height: 6,
              background: i === current ? activeSlide.accentColor : "rgba(16,19,18,0.25)",
            }}
          />
        ))}
      </div>

      {/* ── Prev arrow ─────────────────────────────────────── */}
      <button
        onClick={goPrev}
        aria-label="Previous"
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
                   items-center justify-center
                   opacity-60 hover:opacity-100 focus:opacity-100 transition-opacity duration-200 cursor-pointer"
        style={{ background: "rgba(255,255,255,0.85)", border: `1px solid ${activeSlide.accentColor}60` }}
      >
        <svg className="w-4 h-4 text-[#101312]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* ── Next arrow ─────────────────────────────────────── */}
      <button
        onClick={goNext}
        aria-label="Next"
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
                   items-center justify-center
                   opacity-60 hover:opacity-100 focus:opacity-100 transition-opacity duration-200 cursor-pointer"
        style={{ background: "rgba(255,255,255,0.85)", border: `1px solid ${activeSlide.accentColor}60` }}
      >
        <svg className="w-4 h-4 text-[#101312]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
