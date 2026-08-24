import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary orange — from logo wordmark & orbs
        brand: {
          DEFAULT: "#D6A34A",
          light:   "#F0B84F",
          dark:    "#9A6A31",
        },
        // Warm cream/sand — Africa silhouette on the logo
        cream: {
          DEFAULT: "#F0B84F",
          light:   "#FFDD70",
          dark:    "#B9853B",
        },
        // Teal — logo colour wheel accent
        teal: {
          DEFAULT: "#B9853B",
          light:   "#4DD4BE",
          dark:    "#1A8070",
        },
        // Forest green — logo colour wheel & tribal patterns
        forest: {
          DEFAULT: "#9A6A31",
          light:   "#B9853B",
          dark:    "#6D4A24",
        },
        // Warm ember red — logo wheel accent
        ember: {
          DEFAULT: "#9A6A31",
          light:   "#C18A45",
        },
        // Deep background tones (used in overlay utilities)
        deep: {
          DEFAULT: "#070908",
          mid:     "#101312",
          warm:    "#2A2117",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #9A6A31 0%, #D6A34A 45%, #F0B84F 100%)",
        "cream-gradient":
          "linear-gradient(90deg, #B9853B 0%, #F0B84F 50%, #B9853B 100%)",
        "wheel-gradient":
          "linear-gradient(135deg, #D6A34A 0%, #F0B84F 25%, #B9853B 50%, #9A6A31 75%, #D6A34A 100%)",
      },
      animation: {
        "fade-in":    "fadeIn 0.8s ease forwards",
        "slide-up":   "slideUp 0.7s ease forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow":  "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
