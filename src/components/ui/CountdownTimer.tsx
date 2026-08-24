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
    <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
      {blocks.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3 md:gap-4">
          <div className="countdown-block">
            {/* Value in logo orange */}
            <span className="text-3xl md:text-4xl font-display font-bold tabular-nums leading-none"
                  style={{ color: "#D6A34A" }}>
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-white/45 text-xs uppercase tracking-wider mt-1">{label}</span>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-2xl font-bold pb-4" style={{ color: "rgba(214,163,74,0.50)" }}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}
