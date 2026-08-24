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
    // Graceful fallback — colored initial circle
    return (
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-display font-black text-white shrink-0",
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

  return (
    <div
      className={cn("relative rounded-xl flex items-center justify-center shrink-0", className)}
      style={{ width, height, minWidth: width }}
      aria-label={name}
    >
      <Image
        src={`/partners/${logo}`}
        alt={name}
        width={width * 0.7}
        height={height * 0.7}
        onError={() => setError(true)}
        className="object-contain"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}