"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PartnerLogoProps {
  /** Filename inside /public/partners/ (e.g. "african-union.svg") */
  logo: string;
  name: string;
  initials: string;
  accent: string;
  /** Fixed width the logo should render at */
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Renders a partner logo SVG. Falls back to a colored initial-circle
 * if the image fails to load or no logo file is supplied.
 */
export default function PartnerLogo({
  logo,
  name,
  initials,
  accent,
  width = 64,
  height = 64,
  className,
}: PartnerLogoProps) {
  const [error, setError] = useState(false);

  if (!logo || error) {
    // Graceful fallback, colored initial circle
    return (
      <div
        className={cn(
          "rounded-2xl flex items-center justify-center font-display font-black text-white shrink-0 shadow-sm",
          className
        )}
        style={{
          width,
          height,
          minWidth: width,
          background: `linear-gradient(135deg, ${accent}BB, ${accent})`,
        }}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }

  const src = logo.startsWith("http") || logo.startsWith("/") ? logo : `/partners/${logo}`;

  return (
    <div
      className={cn("relative rounded-2xl flex items-center justify-center shrink-0 overflow-hidden bg-white p-2.5 border border-gray-200/80 shadow-sm hover:border-[#D6A34A]/60 hover:shadow-md transition-all", className)}
      style={{ width, height, minWidth: width }}
      aria-label={name}
    >
      <img
        src={src}
        alt={name}
        onError={() => setError(true)}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
