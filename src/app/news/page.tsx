"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Tag, Search, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getDbNewsArticles, NewsArticle } from "@/lib/news";

export default function NewsPage() {
  const { t, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dbArticles, setDbArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadArticles();
    async function loadArticles() {
      setLoading(true);
      try {
        const fetched = await getDbNewsArticles(locale);
        setDbArticles(fetched);
      } catch {} finally {
        setLoading(false);
      }
    }
  }, [locale]);

  const defaultFeatured = {
    slug: "africa-celebrates-2026-announced",
    category: t("news_cat_event"), categoryKey: "event",
    date: "July 10, 2026",
    title: t("news_feat_title"),
    excerpt: t("news_feat_excerpt"),
    readTime: "4 min read",
  };

  const defaultArticles = [
    { slug: "legendary-gold-partnership", category: t("news_cat_partner"), categoryKey: "partner", date: "June 28, 2026", title: t("art1_title"), excerpt: t("art1_excerpt"), readTime: "3 min read", accent: "#9A6A31" },
    { slug: "au-uneca-venues-confirmed", category: t("news_cat_event"), categoryKey: "event", date: "May 30, 2026", title: t("art3_title"), excerpt: t("art3_excerpt"), readTime: "9A6A31" },
    { slug: "fashion-night-highlights", category: t("news_cat_recap"), categoryKey: "recap", date: "Nov 20, 2025", title: t("art4_title"), excerpt: t("art4_excerpt"), readTime: "5 min read", accent: "#B9853B" },
    { slug: "trade-forum-outcomes-2025", category: t("news_cat_business"), categoryKey: "business", date: "Nov 18, 2025", title: t("art5_title"), excerpt: t("art5_excerpt"), readTime: "4 min read", accent: "#9A6A31" },
    { slug: "multimedia-awards-2025", category: t("news_cat_production"), categoryKey: "production", date: "Oct 5, 2025", title: t("art6_title"), excerpt: t("art6_excerpt"), readTime: "2 min read", accent: "#B9853B" },
  ];

  const displayList = dbArticles.length > 0
    ? dbArticles.map((a, i) => ({
        slug: a.slug,
        category: a.category,
        categoryKey: a.category === "partnership" ? "partner" : a.category,
        date: a.date,
        title: a.title,
        excerpt: a.excerpt,
        readTime: a.readTime,
        accent: ["#9A6A31", "#B9853B", "#D6A34A", "#9A6A31"][i % 4],
      }))
    : defaultArticles;

  const featured = displayList.length > 0 ? displayList[0] : defaultFeatured;
  const articles = displayList.length > 1 ? displayList.slice(1) : defaultArticles;

  const categories = [
    { key: "all", label: t("news_cat_all") }, { key: "event", label: t("news_cat_event") }, { key: "partner", label: t("news_cat_partner") },
    { key: "business", label: t("news_cat_business") }, { key: "recap", label: t("news_cat_recap") }, { key: "production", label: t("news_cat_production") },
  ];

  const visibleArticles = displayList.filter((article) => {
    const matchesCat = activeCategory === "all" || article.categoryKey === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || article.title.toLowerCase().includes(q) || article.excerpt.toLowerCase().includes(q) || article.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden bg-transparent">
        <div className="absolute inset-0 adinkra-bg opacity-30" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(214,163,74,0.12) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          <p className="section-subheading">{t("news_eyebrow")}</p>
          <h1 className="section-heading text-[#101312] mb-4">{t("news_h1")} <span className="text-gradient">{t("news_h1b")}</span></h1>
          <p className="text-[#101312]/75 text-lg leading-relaxed font-medium">{t("news_hero_body")}</p>
        </div>
      </section>

      <section className="section-padding bg-white/60 backdrop-blur-[2px]">
        <div className="container-custom">
          {/* Search Bar & Category filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-[#101312]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-gray-300 text-sm text-[#101312] focus:outline-none focus:border-[#D6A34A] transition-colors shadow-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#101312]/40 hover:text-[#101312]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(({ key, label }) => (
                <button key={key} type="button" onClick={() => setActiveCategory(key)} aria-pressed={activeCategory === key} className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all border"
                  style={activeCategory === key
                    ? { background: "linear-gradient(90deg,#9A6A31,#D6A34A)", borderColor: "transparent", color: "#fff" }
                    : { borderColor: "rgba(16,19,18,0.20)", color: "rgba(16,19,18,0.70)" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured */}
          <Link href={`/news/${featured.slug}`}
                className="block card-dark p-8 md:p-10 mb-8 group hover:-translate-y-0.5 transition-all">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0 w-full md:w-64 h-40 md:h-auto rounded-xl flex items-center justify-center border border-gray-200 bg-white shadow-sm"
                   style={{ background: "linear-gradient(135deg,rgba(214,163,74,0.18),rgba(248,246,240,0.90))" }}>
                <span className="font-display font-black text-4xl" style={{ color: "rgba(154,106,49,0.35)" }}>AC</span>
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{ background: "rgba(214,163,74,0.18)", border: "1px solid rgba(214,163,74,0.35)", color: "#9A6A31" }}>
                    {t("news_featured")}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[#101312]/70 text-xs font-semibold">{featured.category}</span>
                </div>
                <h2 className="text-[#101312] font-display font-bold text-2xl group-hover:text-[#9A6A31] transition-colors leading-snug">{featured.title}</h2>
                <p className="text-[#101312]/75 leading-relaxed font-medium">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[#101312]/60 font-semibold pt-1">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#9A6A31]" /> {featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map(({ slug, category, date, title, excerpt, readTime, accent }) => (
              <Link key={slug} href={`/news/${slug}`}
                    className="card-dark p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-all">
                <div className="aspect-video rounded-xl flex items-center justify-center border border-gray-200 bg-white"
                     style={{ background: `linear-gradient(135deg,${accent}15,rgba(248,246,240,0.90))` }}>
                  <span className="font-display font-black text-3xl" style={{ color: `${accent}50` }}>A</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-gray-200 text-[#101312]/65 text-xs font-semibold">
                    <Tag className="w-3 h-3 text-[#9A6A31]" /> {category}
                  </span>
                  <span className="flex items-center gap-1 text-[#101312]/60 text-xs font-semibold">
                    <Calendar className="w-3 h-3 text-[#9A6A31]" /> {date}
                  </span>
                </div>
                <h3 className="text-[#101312] font-bold leading-snug group-hover:text-[#9A6A31] transition-colors">{title}</h3>
                <p className="text-[#101312]/70 text-sm leading-relaxed flex-1 font-medium">{excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#101312]/60 text-xs font-medium">{readTime}</span>
                  <span className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: accent }}>
                    {t("news_read")} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
