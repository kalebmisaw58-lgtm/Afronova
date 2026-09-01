import React from "react";

export function TikTokIcon({ className = "w-5 h-5", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.36a6.33 6.33 0 0 0-1-.08 6.26 6.26 0 0 0-6.26 6.26A6.26 6.26 0 0 0 9.34 21.8a6.26 6.26 0 0 0 6.26-6.26V9.12a8.16 8.16 0 0 0 4.09 1.15v-3.58a4.86 4.86 0 0 1-.1-.01z" />
    </svg>
  );
}

export default TikTokIcon;


