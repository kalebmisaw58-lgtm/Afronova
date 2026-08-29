import { MetadataRoute } from "next";
import { newsArticles } from "@/lib/news";
import { createServerClient } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://afronova.org";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/partners`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/africa-celebrates-2026`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic news articles from Supabase
  let dbSlugs: string[] = [];
  try {
    const supabase = createServerClient();
    const { data } = await supabase.from("news_articles").select("slug, updated_at").eq("published", true);
    if (data && data.length > 0) {
      dbSlugs = data.map((d: any) => d.slug);
    }
  } catch {}

  const allSlugs = Array.from(new Set([...newsArticles.map((a) => a.slug), ...dbSlugs]));

  const articleRoutes: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
