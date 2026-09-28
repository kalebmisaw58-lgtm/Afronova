"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number; hours: number; minutes: number; seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const TARGET = new Date("2026-11-10T09:00:00+03:00");

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(TARGET));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { label: "Days",    value: timeLeft.days },
    { label: "Hours",   value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2.5 md:gap-3 flex-nowrap shrink-0">
      {blocks.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-1 sm:gap-2.5 md:gap-3 shrink-0">
          <div className="countdown-block px-2 sm:px-3.5 py-2 sm:py-3 min-w-[56px] sm:min-w-[76px] md:min-w-[86px] text-center bg-white border border-[#D6A34A]/40 rounded-2xl shadow-sm">
            {/* Value in high-contrast bronze gold */}
            <span className="text-xl sm:text-2xl md:text-3xl font-display font-black tabular-nums leading-none text-[#9A6A31]">
              {String(value).padStart(2, "0")}
            </span>
            {/* Label in high-contrast dark charcoal text */}
            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-[#101312]/80 mt-1 block">
              {label}
            </span>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-base sm:text-xl md:text-2xl font-bold text-[#F0B84F] shrink-0 pb-1 leading-none">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

