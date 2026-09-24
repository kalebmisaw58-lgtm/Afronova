import { type Locale } from "@/context/LanguageContext";

/**
 * Canonical partner list used across the site (Home, About, Partners pages).
 *
 * `logo` is the filename placed in `/public/partners/`. If omitted the
 * component falls back to the colored initial-circle.
 */
export interface Partner {
  name: string;
  initials: string;
  categoryKey: string;
  accent: string;
  logo: string;
  website?: string;
  // Per-locale description / role keys used on the Partners page
  descKey: string;
  roleKey: string;
  // Whether this is a primary/featured partner (used on the homepage)
  featured?: boolean;
}

export const partners: Partner[] = [
  { name: "African Union",            initials: "AU",  categoryKey: "cat_institutional", accent: "#D6A34A", logo: "african-union.png",  website: "https://au.int",                descKey: "p_au_desc",  roleKey: "p_au_role",  featured: true },
  { name: "Legendary Gold",           initials: "LG",  categoryKey: "cat_strategic",     accent: "#F0B84F", logo: "legendary-gold.png",website: "https://legendarygold.co.uk",      descKey: "p_lg_desc",  roleKey: "p_lg_role",  featured: true },
  { name: "British Council",          initials: "BC",  categoryKey: "cat_cultural",      accent: "#9A6A31", logo: "british-council.png",website: "https://britishcouncil.org",     descKey: "p_bc_desc",  roleKey: "p_bc_role" },
  { name: "Ethiopian Airlines",       initials: "ET",  categoryKey: "cat_corporate",     accent: "#D6A34A", logo: "ethiopian-airlines.png", website: "https://ethiopianairlines.com",  descKey: "p_ea_desc",  roleKey: "p_ea_role", featured: true },
  { name: "European Union",           initials: "EU",  categoryKey: "cat_diplomatic",    accent: "#B9853B", logo: "european-union.png", website: "https://europa.eu",              descKey: "p_eu_desc",  roleKey: "p_eu_role" },
  { name: "Embassy of Nigeria",       initials: "NG",  categoryKey: "cat_diplomatic",    accent: "#9A6A31", logo: "nigeria-embassy.png", website: "https://ng.indembassy.gov.et",    descKey: "p_ng_desc",  roleKey: "p_ng_role" },
  { name: "Embassy of Burundi",       initials: "BI",  categoryKey: "cat_diplomatic",    accent: "#F0B84F", logo: "burundi-embassy.png", website: "https://bi.indembassy.gov.et",    descKey: "p_bi_desc",  roleKey: "p_bi_role" },
  { name: "Embassy of Côte d'Ivoire", initials: "CI",  categoryKey: "cat_diplomatic",    accent: "#D6A34A", logo: "ivory-coast-embassy.png", website: "https://ci.indembassy.gov.et",    descKey: "p_ci_desc",  roleKey: "p_ci_role" },
  { name: "New Zealand Embassy",      initials: "NZ",  categoryKey: "cat_diplomatic",    accent: "#B9853B", logo: "nz-embassy.png",    website: "https://nzembassy.org",          descKey: "p_nz_desc",  roleKey: "p_nz_role" },
  { name: "US Mission to AU",          initials: "USAU", categoryKey: "cat_diplomatic",   accent: "#477A9D", logo: "images.jpg", website: "https://usau.usmission.gov", descKey: "p_usau_desc", roleKey: "p_usau_role" },
  { name: "Kana TV",                  initials: "KT",  categoryKey: "cat_media",         accent: "#9A6A31", logo: "kana-tv.png",       website: "https://kanatv.com",            descKey: "p_kt_desc",  roleKey: "p_kt_role" },
  { name: "Skylight Hotel",           initials: "SH",  categoryKey: "cat_hospitality",   accent: "#F0B84F", logo: "skylight-hotel.png",  website: "https://skylighthotels.com",      descKey: "p_sh_desc",  roleKey: "p_sh_role" },
  { name: "Ethiopia Tourism",         initials: "ET2", categoryKey: "cat_government",    accent: "#9A6A31", logo: "ethiopia-tourism.png", website: "https://ethiopia.travel",          descKey: "p_et_desc",  roleKey: "p_et_role" },
    { name: "Africa Fashion Reception", initials: "AF",  categoryKey: "cat_cultural",      accent: "#9A6A31", logo: "africa-fashion-reception.png", website: "https://africafashionreception.com", descKey: "p_af_desc",  roleKey: "p_af_role" },
];

/** Convenience helpers -------------------------------------------------- */

export const catAccents: Record<string, string> = {
  cat_institutional: "#D6A34A",
  cat_strategic:     "#F0B84F",
  cat_diplomatic:    "#B9853B",
  cat_corporate:     "#D6A34A",
  cat_media:         "#9A6A31",
  cat_cultural:      "#9A6A31",
  cat_hospitality:   "#F0B84F",
  cat_government:    "#9A6A31",
};

export const categoryLabels: Record<string, Record<Locale, string>> = {
  cat_institutional: { en: "Institutional",     am: "የሥርዓት",             fr: "Institutionnel",    pt: "Institucional",   ar: "مؤسسي" },
  cat_strategic:     { en: "Strategic Partner", am: "ስትራተጌዛቤ አባላት", fr: "Partenaire stratégique", pt: "Parceiro estratégico", ar: "شريك إستراتيجي" },
  cat_diplomatic:    { en: "Diplomatic",        am: "ዲፖላማሪ",          fr: "Diplomatique",    pt: "Diplomático",    ar: "دبلوماسي" },
  cat_corporate:     { en: "Corporate",         am: "ኮርፖሬት",           fr: "Entreprise",    pt: "Corporativo",    ar: "شركات" },
  cat_media:         { en: "Media",             am: "ሚዲያ",            fr: "Médias",        pt: "Mídia",          ar: "وسائل إعلام" },
  cat_cultural:      { en: "Cultural",          am: "ባህላዊ",          fr: "Culturel",      pt: "Cultural",       ar: "ثقافي" },
  cat_hospitality:   { en: "Hospitality",       am: "ሕግድት",            fr: "Hôtelière",     pt: "Hospitalidade",  ar: "ضيافة" },
  cat_government:    { en: "Government",        am: "መንበብ አስተያየት", fr: "Gouvernement",  pt: "Governamental",  ar: "حكومي" },
};

export function getPartnersByCategory(locale: Locale) {
  const grouped: Record<string, Partner[]> = {};
  for (const p of partners) {
    if (!grouped[p.categoryKey]) grouped[p.categoryKey] = [];
    grouped[p.categoryKey].push(p);
  }
  return Object.entries(grouped).map(([key, items]) => ({
    label: tCategory(key, locale),
    accent: catAccents[key],
    items,
  }));
}

export function tCategory(key: string, locale: Locale): string {
  return categoryLabels[key]?.[locale] ?? key;
}

export async function getDbPartners(locale: Locale = "en"): Promise<Partner[]> {
  try {
    const { createBrowserClient, createServerClient } = await import("@/lib/supabase");
    const supabase = typeof window !== "undefined" ? createBrowserClient() : createServerClient();
    const { data: dbPartners, error } = await supabase
      .from("partners")
      .select(`
        *,
        descriptions:partner_descriptions(*)
      `)
      .order("sort_order", { ascending: true });

    if (error || !dbPartners) {
      return partners;
    }

    // If database table has rows, return database partners
    return dbPartners.map((item) => {
      const descObj = item.descriptions?.find((d: any) => d.locale === locale) || item.descriptions?.[0];
      return {
        name: item.name,
        initials: item.initials || item.name.substring(0, 2).toUpperCase(),
        categoryKey: item.category_key || "cat_corporate",
        accent: item.accent || "#D6A34A",
        logo: item.logo || "",
        website: item.website || undefined,
        descKey: descObj?.description || "",
        roleKey: descObj?.role || "",
        featured: item.featured ?? false,
      };
    });
  } catch {
    return partners;
  }
}