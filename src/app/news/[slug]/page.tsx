import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Tag, Clock } from "lucide-react";
import { newsArticles, getDbNewsArticleBySlug } from "@/lib/news";

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
    <article className="pt-32 pb-20 bg-transparent">
      <div className="container-custom max-w-3xl card-dark p-8 md:p-12">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors text-[#101312]/60 hover:text-[#9A6A31] font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap text-xs">
            <span className="px-3 py-1 rounded-full font-bold" style={{ background: "rgba(214,163,74,0.15)", border: "1px solid rgba(214,163,74,0.30)", color: "#9A6A31" }}>
              <Tag className="w-3 h-3 inline mr-1" />{article.category}
            </span>
            <span className="flex items-center gap-1 text-[#101312]/60 font-semibold"><Calendar className="w-3.5 h-3.5 text-[#9A6A31]" /> {article.date}</span>
            <span className="flex items-center gap-1 text-[#101312]/60 font-semibold"><Clock className="w-3.5 h-3.5 text-[#9A6A31]" /> {article.readTime}</span>
          </div>
          <h1 className="section-heading text-[#101312] leading-tight">{article.title}</h1>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm" style={{ background: "linear-gradient(135deg,#9A6A31,#D6A34A)" }}>
              AN
            </div>
            <div>
              <p className="text-[#101312] text-sm font-bold">AfroNova Editorial Team</p>
              <p className="text-[#101312]/50 text-xs font-semibold">AfroNova Media House &amp; Events</p>
            </div>
          </div>
        </div>
        <div className="aspect-video rounded-2xl flex items-center justify-center mb-10 border border-gray-200 bg-white" style={{ background: "linear-gradient(135deg,rgba(214,163,74,0.15),rgba(248,246,240,0.90))" }}>
          <span className="font-display font-black text-5xl text-[#9A6A31]/30">AfroNova</span>
        </div>
        <div className="space-y-6">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[#101312]/75 leading-relaxed font-medium text-lg">{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 p-8 rounded-2xl text-center space-y-4 bg-white/70" style={{ border: "1px solid rgba(214,163,74,0.30)" }}>
          <h3 className="text-[#101312] font-display font-bold text-2xl">Be Part of Africa Celebrates 2026</h3>
          <p className="text-[#101312]/75 font-medium">Contact the AfroNova team about sponsorship, media partnerships, or attendance.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/contact" className="btn-primary shadow-md">Contact AfroNova</Link>
            <Link href="/africa-celebrates-2026" className="btn-outline">Learn More</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
