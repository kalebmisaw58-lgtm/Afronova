"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { Globe, FileText, Users, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const locales = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "am", label: "Amharic", flag: "🇪🇹" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
] as const;

export default function AdminDashboardPage() {
  const { admin, logout } = useAdmin();
  const [stats, setStats] = useState({
    contentStrings: 0,
    newsArticles: 0,
    partners: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      if (json.success) setStats(json.stats);
    } catch (e) {
      console.error("Failed to fetch stats:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/45 text-sm mt-1">
              Signed in as <strong>{admin?.email}</strong> ({admin?.role})
            </p>
          </div>
          <Link href="/" target="_blank" className="text-white/30 hover:text-[#D6A34A] transition-colors">
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
        <button
          onClick={logout}
          className="btn-outline text-sm px-4 py-2"
        >
          Sign Out
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Globe} label="Content Strings" value={stats.contentStrings} loading={loading} />
        <StatCard icon={FileText} label="News Articles" value={stats.newsArticles} loading={loading} />
        <StatCard icon={Users} label="Partners" value={stats.partners} loading={loading} />
        <StatCard icon={Calendar} label="Testimonials" value={stats.testimonials} loading={loading} />
      </div>

      {/* Content management */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-white mb-4">Content Management</h2>

        <Link href="/admin/content"
              className="card-dark p-4 flex items-center justify-between group hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5" style={{ color: "#D6A34A" }} />
            <div>
              <span className="text-white font-semibold">Website Translations</span>
              <p className="text-white/40 text-xs">Edit all UI text strings across 5 locales</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#D6A34A] transition-colors" />
        </Link>

        <Link href="/admin/news"
              className="card-dark p-4 flex items-center justify-between group hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5" style={{ color: "#D6A34A" }} />
            <div>
              <span className="text-white font-semibold">News Articles</span>
              <p className="text-white/40 text-xs">Create, edit, and manage blog posts</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#D6A34A] transition-colors" />
        </Link>

        <Link href="/admin/partners"
              className="card-dark p-4 flex items-center justify-between group hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5" style={{ color: "#D6A34A" }} />
            <div>
              <span className="text-white font-semibold">Partners</span>
              <p className="text-white/40 text-xs">Manage partner listings and logos</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#D6A34A] transition-colors" />
        </Link>

        {/* Quick locale switch */}
        <div className="card-dark p-4 mt-6">
          <p className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-3">Preview Locale</p>
          <div className="flex flex-wrap gap-2">
            {locales.map((l) => (
              <Link
                key={l.code}
                href={`/?hl=en`}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <span>{l.flag}</span> {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, loading }: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: number;
  loading: boolean;
}) {
  return (
    <div className="card-dark p-5 text-center">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
           style={{ background: "rgba(214,163,74,0.12)", border: "1px solid rgba(214,163,74,0.25)" }}>
        <Icon className="w-5 h-5" style={{ color: "#D6A34A" }} />
      </div>
      <p className="text-2xl font-display font-black text-white">{loading ? "…" : value}</p>
      <p className="text-white/40 text-xs">{label}</p>
    </div>
  );
}
