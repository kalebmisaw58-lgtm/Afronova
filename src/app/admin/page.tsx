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

  async function getAccessToken(): Promise<string | null> {
    const { createBrowserClient } = await import("@/lib/supabase");
    const supabase = createBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token ?? null;
  }

  async function fetchStats() {
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/admin/stats", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const json = await res.json();
      if (json.success) setStats(json.stats);
    } catch (e) {
      console.error("Failed to fetch stats:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-[#101312]">Admin Dashboard</h1>
            <p className="text-[#101312]/65 text-sm mt-1 font-medium">
              Signed in as <strong className="text-[#9A6A31]">{admin?.email}</strong> ({admin?.role})
            </p>
          </div>
          <Link href="/" target="_blank" title="View Public Website" className="text-[#101312]/40 hover:text-[#9A6A31] transition-colors p-1.5 rounded-lg hover:bg-black/5">
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
        <button
          onClick={logout}
          className="btn-outline text-sm px-5 py-2.5 shadow-sm"
        >
          Sign Out
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <StatCard icon={Globe} label="Content Strings" value={stats.contentStrings} loading={loading} />
        <StatCard icon={FileText} label="News Articles" value={stats.newsArticles} loading={loading} />
        <StatCard icon={Users} label="Partners" value={stats.partners} loading={loading} />
        <StatCard icon={Calendar} label="Testimonials" value={stats.testimonials} loading={loading} />
      </div>

      {/* Content management */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-[#101312] mb-4">Content Management</h2>

        <Link href="/admin/content"
              className="card-dark p-5 flex items-center justify-between group hover:-translate-y-0.5 transition-all bg-white border border-[#D6A34A]/25 shadow-sm rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D6A34A]/15 border border-[#D6A34A]/30 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-[#9A6A31]" />
            </div>
            <div>
              <span className="text-[#101312] font-bold text-base group-hover:text-[#9A6A31] transition-colors">Website Translations</span>
              <p className="text-[#101312]/65 text-xs font-medium mt-0.5">Edit all UI text strings across 5 locales</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#9A6A31] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link href="/admin/news"
              className="card-dark p-5 flex items-center justify-between group hover:-translate-y-0.5 transition-all bg-white border border-[#D6A34A]/25 shadow-sm rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D6A34A]/15 border border-[#D6A34A]/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#9A6A31]" />
            </div>
            <div>
              <span className="text-[#101312] font-bold text-base group-hover:text-[#9A6A31] transition-colors">News Articles</span>
              <p className="text-[#101312]/65 text-xs font-medium mt-0.5">Create, edit, and manage blog posts</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#9A6A31] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link href="/admin/partners"
              className="card-dark p-5 flex items-center justify-between group hover:-translate-y-0.5 transition-all bg-white border border-[#D6A34A]/25 shadow-sm rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D6A34A]/15 border border-[#D6A34A]/30 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#9A6A31]" />
            </div>
            <div>
              <span className="text-[#101312] font-bold text-base group-hover:text-[#9A6A31] transition-colors">Partners</span>
              <p className="text-[#101312]/65 text-xs font-medium mt-0.5">Manage partner listings and logos</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#9A6A31] group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Quick locale switch */}
        <div className="card-dark p-5 mt-6 bg-white border border-[#D6A34A]/25 shadow-sm rounded-2xl">
          <p className="text-[#9A6A31] text-xs uppercase tracking-widest font-bold mb-3">Preview Locale</p>
          <div className="flex flex-wrap gap-2.5">
            {locales.map((l) => (
              <Link
                key={l.code}
                href={`/?hl=${l.code}`}
                target="_blank"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FAF8F4] border border-[#D6A34A]/30 text-[#101312] hover:bg-[#D6A34A] hover:text-white transition-all shadow-xs flex items-center gap-2"
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
    <div className="card-dark p-6 text-center bg-white border border-[#D6A34A]/25 rounded-2xl shadow-sm hover:border-[#D6A34A] hover:shadow-md transition-all">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
           style={{ background: "rgba(214,163,74,0.14)", border: "1px solid rgba(214,163,74,0.30)" }}>
        <Icon className="w-6 h-6 text-[#9A6A31]" />
      </div>
      <p className="text-3xl font-display font-black text-[#101312]">{loading ? "…" : value}</p>
      <p className="text-[#101312]/65 text-xs font-bold uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

