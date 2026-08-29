export type NewsArticle = {
  slug: string;
  category: "event" | "partnership" | "business" | "recap" | "production";
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "africa-celebrates-2026-announced", category: "event", date: "July 10, 2026", readTime: "4 min read",
    title: "Africa Celebrates 2026, 6th Edition Officially Announced for November in Addis Ababa",
    excerpt: "AfroNova confirms the 6th edition of Africa Celebrates, taking place November 10 to 15 at AU HQ and UNECA.",
    paragraphs: [
      "AfroNova Media House & Events is proud to announce Africa Celebrates 2026, the sixth edition of the continent’s Pan-African festival. The event will take place November 10 to 15, 2026 at the African Union Headquarters and the United Nations Economic Commission for Africa in Addis Ababa, Ethiopia.",
      "This year’s theme, One Africa, One People, brings culture, innovation and enterprise together on one world-class stage.",
      "The programme includes gala fashion and awards nights, a business and trade forum, and an open exhibition for artisans, vendors and corporate delegations from across Africa and the diaspora.",
    ],
  },
  {
    slug: "legendary-gold-partnership", category: "partnership", date: "June 28, 2026", readTime: "3 min read",
    title: "AfroNova and Legendary Gold Strengthen Their Partnership",
    excerpt: "The partnership expands the event’s reach and strengthens its commitment to African creative excellence.",
    paragraphs: ["AfroNova and Legendary Gold Limited are extending their collaboration for Africa Celebrates 2026.", "The partnership supports a stronger international platform for African culture, enterprise and creative talent."],
  },
  {
    slug: "au-uneca-venues-confirmed", category: "event", date: "May 30, 2026", readTime: "3 min read",
    title: "AU and UNECA Venues Confirmed for Africa Celebrates 2026",
    excerpt: "The festival will convene across two of Addis Ababa’s most significant continental institutions.",
    paragraphs: ["The African Union Headquarters and UNECA have been confirmed as the venues for Africa Celebrates 2026.", "The two locations reflect the festival’s commitment to continental connection, dialogue and shared prosperity."],
  },
  {
    slug: "fashion-night-highlights", category: "recap", date: "Nov 20, 2025", readTime: "5 min read",
    title: "Fashion Night Highlights from Africa Celebrates 2025",
    excerpt: "A look back at the designers, performances and stories that lit up the 2025 celebration.",
    paragraphs: ["Fashion Night brought together established and emerging designers in a celebration of African creativity.", "The programme highlighted craft, contemporary expression and the designers shaping the next chapter of the industry."],
  },
  {
    slug: "trade-forum-outcomes-2025", category: "business", date: "Nov 18, 2025", readTime: "4 min read",
    title: "Trade Forum Outcomes Point to New Cross-Border Opportunities",
    excerpt: "Delegates explored practical ways to turn Pan-African connections into lasting economic collaboration.",
    paragraphs: ["The 2025 business and trade forum convened entrepreneurs, investors and public-sector leaders.", "Sessions focused on partnerships that can strengthen intra-African commerce and innovation."],
  },
  {
    slug: "multimedia-awards-2025", category: "production", date: "Oct 5, 2025", readTime: "2 min read",
    title: "AfroNova Recognised for Multimedia Production Excellence",
    excerpt: "A new recognition celebrates the team’s commitment to compelling African visual storytelling.",
    paragraphs: ["AfroNova has been recognised for multimedia work that places authentic African stories at the centre.", "The recognition reinforces the team’s focus on thoughtful production, craft and cultural impact."],
  },
];

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export async function getDbNewsArticles(locale: string = "en"): Promise<NewsArticle[]> {
  try {
    const { createServerClient } = await import("@/lib/supabase");
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return newsArticles;
    }

    return data.map((item) => ({
      slug: item.slug,
      category: item.category as any,
      date: item.article_date || new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: item.read_time || "4 min read",
      title: item.title,
      excerpt: item.excerpt || "",
      paragraphs: item.paragraphs || [],
    }));
  } catch {
    return newsArticles;
  }
}

export async function getDbNewsArticleBySlug(slug: string, locale: string = "en"): Promise<NewsArticle | undefined> {
  try {
    const { createServerClient } = await import("@/lib/supabase");
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return getNewsArticle(slug);
    }

    return {
      slug: data.slug,
      category: data.category as any,
      date: data.article_date || new Date(data.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: data.read_time || "4 min read",
      title: data.title,
      excerpt: data.excerpt || "",
      paragraphs: data.paragraphs || [],
    };
  } catch {
    return getNewsArticle(slug);
  }
}
