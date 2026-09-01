"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slides = [
  {
    name: "Kwame Nkrumah",
    title: "Father of Pan-Africanism · Ghana · 1909 to 1972",
    quote: "Africa is one continent, one people, and one nation.",
    initial: "KN",
    photo: "/heroes/kwame-nkrumah.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #171A18 0%, #070908 60%)",
    accentColor: "#D6A34A",
    country: "Ghana",
    flag: "🇬🇭",
  },
  {
    name: "Nelson Mandela",
    title: "Madiba · South Africa · 1918 to 2013",
    quote: "It always seems impossible until it's done.",
    initial: "NM",
    photo: "/heroes/nelson-mandela.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #1B1813 0%, #070908 60%)",
    accentColor: "#D6A34A",
    country: "South Africa",
    flag: "🇿🇦",
  },
  {
    name: "Haile Selassie I",
    title: "Lion of Judah · Ethiopia · 1892 to 1975",
    quote: "Throughout history, it has been the inaction of those who could have acted that has made it possible for evil to triumph.",
    initial: "HS",
    photo: "/heroes/haile-selassie.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #171A18 0%, #070908 60%)",
    accentColor: "#F0B84F",
    country: "Ethiopia",
    flag: "🇪🇹",
  },
  {
    name: "Patrice Lumumba",
    title: "Hero of Independence · DR Congo · 1925 to 1961",
    quote: "Africa will write its own history, a history of glory and dignity.",
    initial: "PL",
    photo: "/heroes/patrice-lumumba.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #18151A 0%, #070908 60%)",
    accentColor: "#B9853B",
    country: "DR Congo",
    flag: "🇨🇩",
  },
  {
    name: "Thomas Sankara",
    title: "The Upright Man · Burkina Faso · 1949 to 1987",
    quote: "You cannot carry out fundamental change without a certain amount of madness.",
    initial: "TS",
    photo: "/heroes/thomas-sankara.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #1B1813 0%, #070908 60%)",
    accentColor: "#D6A34A",
    country: "Burkina Faso",
    flag: "🇧🇫",
  },
  {
    name: "Jomo Kenyatta",
    title: "Founding Father · Kenya · 1897 to 1978",
    quote: "The African is not struggling for his dignity; he has it.",
    initial: "JK",
    photo: "/heroes/jomo-kenyatta.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #171A18 0%, #070908 60%)",
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
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #1B1813 0%, #070908 60%)",
    accentColor: "#D6A34A",
    country: "Tanzania",
    flag: "🇹🇿",
  },
  {
    name: "Amílcar Cabral",
    title: "Revolutionary Poet · Guinea-Bissau · 1924 to 1973",
    quote: "Mask no difficulties, tell no lies, claim no easy victories.",
    initial: "AC",
    photo: "/heroes/amilcar-cabral.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #171313 0%, #070908 60%)",
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
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #171A18 0%, #070908 60%)",
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
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #1B1518 0%, #070908 60%)",
    accentColor: "#B9853B",
    country: "South Africa",
    flag: "🇿🇦",
  },
  {
    name: "Steve Biko",
    title: "Black Consciousness · South Africa · 1946 to 1977",
    quote: "The most potent weapon in the hands of the oppressor is the mind of the oppressed.",
    initial: "SB",
    photo: "/heroes/steve-biko.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #1B1A14 0%, #070908 60%)",
    accentColor: "#F0B84F",
    country: "South Africa",
    flag: "🇿🇦",
  },
  {
    name: "Cheikh Anta Diop",
    title: "Historian of Africa · Senegal · 1923 to 1986",
    quote: "Africa has a history, and it was a great one.",
    initial: "CD",
    photo: "/heroes/cheikh-anta-diop.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #14191B 0%, #070908 60%)",
    accentColor: "#B9853B",
    country: "Senegal",
    flag: "🇸🇳",
  },
  {
    name: "Fela Kuti",
    title: "Father of Afrobeat · Nigeria · 1938 to 1997",
    quote: "Music is the weapon of the future.",
    initial: "FK",
    photo: "/heroes/fela-kuti.jpg",
    bg: "radial-gradient(ellipse 80% 80% at 70% 40%, #1B1813 0%, #070908 60%)",
    accentColor: "#F0B84F",
    country: "Nigeria",
    flag: "🇳🇬",
  },
];

const INTERVAL = 5500;

// Inline Adinkra SVG pattern, no network request
function AdinkraPattern({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.045 }}
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
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const id = setInterval(goNext, INTERVAL);
    return () => clearInterval(id);
  }, [goNext]);

  return (
    <div className="absolute inset-0 overflow-hidden">
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
            {/* ── Layer 1: colour gradient background ─────── */}
            <div className="absolute inset-0" style={{ background: slide.bg }} />

            {/* ── Layer 2: the real photo, right half ─────── */}
            <div
              className="absolute"
              style={{
                top: "5%",
                right: "4%",
                width: "44%",
                height: "90%",
              }}
            >
              <Image
                src={slide.photo}
                alt={slide.name}
                fill
                sizes="44vw"
                className="object-contain object-top drop-shadow-2xl"
                priority={i <= 1}
              />
              {/* Soft vignette around the photo so it blends into the bg */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(13,4,0,0.80) 100%)",
                }}
              />
            </div>

            {/* ── Layer 3: Adinkra pattern ─────────────────── */}
            <AdinkraPattern color={slide.accentColor} />

            {/* ── Layer 4: faint large initial (decorative) ── */}
            <div
              className={cn(
                "absolute right-[-2%] top-1/2 -translate-y-1/2",
                "font-display font-black select-none pointer-events-none",
                "transition-all duration-[1400ms]",
                isActive ? "opacity-[0.05] translate-x-0" : "opacity-0 translate-x-20"
              )}
              style={{
                fontSize: "clamp(12rem, 28vw, 26rem)",
                lineHeight: 1,
                color: slide.accentColor,
              }}
            >
              {slide.initial}
            </div>

            {/* ── Layer 5: text readability overlays ─────────
                Left-to-right: dark → transparent so text is clear
                but photo on the right stays visible               */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(5,1,0,0.88) 0%, rgba(5,1,0,0.65) 30%, rgba(5,1,0,0.20) 55%, transparent 75%)",
              }}
            />
            {/* Bottom fade into next section */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48"
              style={{ background: "linear-gradient(to top, #0d0400 0%, rgba(13,4,0,0.40) 60%, transparent 100%)" }}
            />
            {/* Top fade for navbar */}
            <div
              className="absolute top-0 left-0 right-0 h-28"
              style={{ background: "linear-gradient(to bottom, rgba(5,1,0,0.65) 0%, transparent 100%)" }}
            />

            {/* ── Layer 6: caption bottom-right ───────────── */}
            <div
              className={cn(
                "absolute bottom-24 right-5 md:right-12 max-w-[260px] text-right z-10",
                "transition-all duration-700 delay-400",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
            >
              <div
                className="ml-auto mb-2 h-0.5 w-10 rounded-full"
                style={{ background: slide.accentColor }}
              />
              <p className="text-white/45 text-[11px] mb-1 tracking-widest uppercase font-medium">
                {slide.flag}&nbsp; {slide.country}
              </p>
              <p
                className="font-display font-black text-xl md:text-2xl leading-tight"
                style={{
                  color: "#fff",
                  textShadow: `0 2px 24px ${slide.accentColor}70`,
                }}
              >
                {slide.name}
              </p>
              <p
                className="text-[11px] font-semibold tracking-wide mt-1 mb-2 leading-snug"
                style={{ color: slide.accentColor }}
              >
                {slide.title}
              </p>
              <p className="text-white/40 text-[11px] italic leading-relaxed hidden md:block">
                &ldquo;{slide.quote}&rdquo;
              </p>
            </div>
          </div>
        );
      })}

      {/* ── Dot indicators ─────────────────────────────────── */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 flex-wrap justify-center px-4 max-w-sm">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to ${slide.name}`}
            title={slide.name}
            className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            style={{
              width:      i === current ? 22 : 6,
              height:     6,
              background: i === current
                ? slides[current].accentColor
                : "rgba(255,255,255,0.28)",
            }}
          />
        ))}
      </div>

      {/* ── Prev arrow ─────────────────────────────────────── */}
      <button
        onClick={goPrev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
                   flex items-center justify-center
                   opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
        style={{ background: "rgba(0,0,0,0.55)", border: `1px solid ${slides[current].accentColor}50` }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* ── Next arrow ─────────────────────────────────────── */}
      <button
        onClick={goNext}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
                   flex items-center justify-center
                   opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
        style={{ background: "rgba(0,0,0,0.55)", border: `1px solid ${slides[current].accentColor}50` }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

