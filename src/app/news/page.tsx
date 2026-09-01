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
    { slug: "legendary-gold-partnership", category: t("news_cat_partner"), categoryKey: "partner", date: "June 28, 2026", title: t("art1_title"), excerpt: t("art1_excerpt"), readTime: "3 min read", accent: "#D6A34A" },
    { slug: "au-uneca-venues-confirmed", category: t("news_cat_event"), categoryKey: "event", date: "May 30, 2026", title: t("art3_title"), excerpt: t("art3_excerpt"), readTime: "3 min read", accent: "#9A6A31" },
    { slug: "fashion-night-highlights", category: t("news_cat_recap"), categoryKey: "recap", date: "Nov 20, 2025", title: t("art4_title"), excerpt: t("art4_excerpt"), readTime: "5 min read", accent: "#F0B84F" },
    { slug: "trade-forum-outcomes-2025", category: t("news_cat_business"), categoryKey: "business", date: "Nov 18, 2025", title: t("art5_title"), excerpt: t("art5_excerpt"), readTime: "4 min read", accent: "#D6A34A" },
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
        accent: ["#D6A34A", "#9A6A31", "#F0B84F", "#B9853B"][i % 4],
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
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 adinkra-bg opacity-60" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(154,106,49,0.22) 0%, transparent 65%)" }} />
        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          <p className="section-subheading">{t("news_eyebrow")}</p>
          <h1 className="section-heading text-white mb-4">{t("news_h1")} <span className="text-gradient">{t("news_h1b")}</span></h1>
          <p className="text-white/55 leading-relaxed">{t("news_hero_body")}</p>
        </div>
      </section>

      <section className="section-padding section-overlay">
        <div className="container-custom">
          {/* Search Bar & Category filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D6A34A] transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(({ key, label }) => (
                <button key={key} type="button" onClick={() => setActiveCategory(key)} aria-pressed={activeCategory === key} className="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
                  style={activeCategory === key
                    ? { background: "linear-gradient(90deg,#9A6A31,#D6A34A)", borderColor: "transparent", color: "#fff" }
                    : { borderColor: "rgba(255,255,255,0.13)", color: "rgba(255,255,255,0.50)" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured */}
          <Link href={`/news/${featured.slug}`}
                className="block card-dark p-8 md:p-10 mb-8 group hover:-translate-y-0.5 transition-all">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0 w-full md:w-64 h-40 md:h-auto rounded-xl flex items-center justify-center border border-white/8"
                   style={{ background: "linear-gradient(135deg,rgba(214,163,74,0.18),rgba(154,106,49,0.10))" }}>
                <span className="font-display font-black text-4xl" style={{ color: "rgba(214,163,74,0.35)" }}>AC</span>
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(214,163,74,0.12)", border: "1px solid rgba(214,163,74,0.25)", color: "#D6A34A" }}>
                    {t("news_featured")}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/45 text-xs">{featured.category}</span>
                </div>
                <h2 className="text-white font-display font-bold text-2xl group-hover:text-[#D6A34A] transition-colors leading-snug">{featured.title}</h2>
                <p className="text-white/50 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-white/30 pt-1">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featured.date}</span>
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
                <div className="aspect-video rounded-xl flex items-center justify-center border border-white/5"
                     style={{ background: `linear-gradient(135deg,${accent}18,rgba(0,0,0,0.55))` }}>
                  <span className="font-display font-black text-3xl" style={{ color: `${accent}40` }}>A</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 text-white/40 text-xs">
                    <Tag className="w-3 h-3" /> {category}
                  </span>
                  <span className="flex items-center gap-1 text-white/30 text-xs">
                    <Calendar className="w-3 h-3" /> {date}
                  </span>
                </div>
                <h3 className="text-white font-semibold leading-snug group-hover:text-[#D6A34A] transition-colors">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed flex-1">{excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/25 text-xs">{readTime}</span>
                  <span className="text-sm flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: accent }}>
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

