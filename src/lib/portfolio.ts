import { createBrowserClient, createServerClient } from "@/lib/supabase";

export interface DbPortfolioItem {
  id?: string;
  locale: string;
  slug: string;
  category: "event" | "recap" | "production" | "campaign" | "publication" | string;
  title: string;
  subtitle?: string | null;
  excerpt?: string | null;
  year?: string | null;
  accent: string;
  sort_order: number;
  published: boolean;
  image_url?: string | null;
}

export const DEFAULT_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
];

/**
 * Fetch portfolio image URLs configured in Admin Dashboard
 */
export async function getDbPortfolioGalleryImages(locale: string = "en", prefix: string = "pf_gal"): Promise<string[]> {
  try {
    let map: Record<string, string> = {};

    if (typeof window !== "undefined") {
      const res = await fetch(`/api/portfolio?locale=${locale}`);
      const json = await res.json();
      if (json.success && json.imageMap) {
        map = json.imageMap;
      }
    } else {
      const supabase = createServerClient();
      const { data } = await supabase
        .from("site_content")
        .select("key, value, locale")
        .like("key", `${prefix}%`);

      if (data) {
        data.forEach((row) => {
          if (row.value && (row.value.startsWith("http") || row.value.startsWith("/"))) {
            if (!map[row.key] || row.locale === locale) {
              map[row.key] = row.value;
            }
          }
        });
      }
    }

    return Array.from({ length: 9 }).map((_, i) => {
      const key = `${prefix}${i + 1}`;
      return map[key] || DEFAULT_GALLERY_IMAGES[i % DEFAULT_GALLERY_IMAGES.length];
    });
  } catch {
    return DEFAULT_GALLERY_IMAGES;
  }
}

/**
 * Fetch portfolio items from portfolio_items table
 */
export async function getDbPortfolioItems(locale: string = "en"): Promise<DbPortfolioItem[]> {
  try {
    if (typeof window !== "undefined") {
      const res = await fetch(`/api/portfolio?locale=${locale}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.items)) {
        return json.items;
      }
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("locale", locale)
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
}

