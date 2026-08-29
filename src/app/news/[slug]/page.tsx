import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Tag, Clock } from "lucide-react";
import { getNewsArticle, newsArticles, getDbNewsArticleBySlug } from "@/lib/news";

export function generateStaticParams() {
  return newsArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getDbNewsArticleBySlug(params.slug);
  if (!article) return { title: "Article Not Found | AfroNova" };

  return {
    title: `${article.title} | AfroNova News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://afronova.org/news/${params.slug}`,
      type: "article",
      siteName: "AfroNova Media House & Events",
      images: [
        {
          url: article.paragraphs.find((p) => p.startsWith("http") || p.startsWith("/")) || "/logo.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.paragraphs.find((p) => p.startsWith("http") || p.startsWith("/")) || "/logo.png"],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getDbNewsArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <article className="pt-32 pb-20" style={{ background: "#101312" }}>
      <div className="container-custom max-w-3xl">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors text-white/40 hover:text-[#D6A34A]"><ArrowLeft className="w-4 h-4" /> Back to News</Link>
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap text-xs">
            <span className="px-3 py-1 rounded-full font-semibold" style={{ background: "rgba(214,163,74,0.12)", border: "1px solid rgba(214,163,74,0.25)", color: "#D6A34A" }}><Tag className="w-3 h-3 inline mr-1" />{article.category}</span>
            <span className="flex items-center gap-1 text-white/35"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1 text-white/35"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
          </div>
          <h1 className="section-heading text-white leading-tight">{article.title}</h1>
          <div className="flex items-center gap-3 pt-2"><div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "linear-gradient(135deg,#9A6A31,#D6A34A)" }}>AN</div><div><p className="text-white text-sm font-medium">AfroNova Editorial Team</p><p className="text-white/35 text-xs">AfroNova Media House &amp; Events</p></div></div>
        </div>
        <div className="aspect-video rounded-2xl flex items-center justify-center mb-10 border border-white/8" style={{ background: "linear-gradient(135deg,rgba(214,163,74,0.15),rgba(185,133,59,0.10),rgba(154,106,49,0.10))" }}><span className="font-display font-black text-5xl" style={{ color: "rgba(214,163,74,0.20)" }}>AfroNova</span></div>
        <div className="space-y-6">{article.paragraphs.map((paragraph) => <p key={paragraph} className="text-white/55 leading-relaxed">{paragraph}</p>)}</div>
        <div className="mt-12 p-8 rounded-2xl text-center space-y-4" style={{ background: "linear-gradient(135deg,rgba(214,163,74,0.10),rgba(185,133,59,0.07))", border: "1px solid rgba(214,163,74,0.22)" }}><h3 className="text-white font-display font-bold text-2xl">Be Part of Africa Celebrates 2026</h3><p className="text-white/50">Contact the AfroNova team about sponsorship, media partnerships, or attendance.</p><div className="flex flex-col sm:flex-row gap-3 justify-center"><Link href="/contact" className="btn-primary">Contact AfroNova</Link><Link href="/africa-celebrates-2026" className="btn-outline">Learn More</Link></div></div>
      </div>
    </article>
  );
}
