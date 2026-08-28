// Known content sections for the admin content editor.
// Each section corresponds to a group of translation keys used
// on specific pages of the website.

export const CONTENT_SECTIONS = [
  { key: "nav", label: "Navigation", desc: "Menu items in the header" },
  { key: "hero", label: "Hero Section", desc: "Main banner on the homepage" },
  { key: "about", label: "About Page", desc: "Who we are, values, leadership" },
  { key: "services", label: "Services Page", desc: "Service descriptions and process" },
  { key: "contact", label: "Contact Page", desc: "Contact form, info, and labels" },
  { key: "footer", label: "Footer", desc: "Footer links and newsletter text" },
  { key: "news", label: "News", desc: "News listing and article labels" },
  { key: "partners", label: "Partners", desc: "Partner page and category labels" },
  { key: "portfolio", label: "Portfolio", desc: "Portfolio project labels" },
  { key: "ac", label: "Africa Celebrates 2026", desc: "Event page content" },
  { key: "general", label: "General", desc: "Misc strings" },
] as const;

export type SectionKey = (typeof CONTENT_SECTIONS)[number]["key"];

export const LOCALES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "am", label: "Amharic", flag: "🇪🇹" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export interface ContentItem {
  id: string;
  locale: string;
  key: string;
  value: string;
  section: string;
}
