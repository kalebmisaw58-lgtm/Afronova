"use client";

import { FileText, Plus } from "lucide-react";

export default function AdminNewsPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-white">News Articles</h1>
        <button className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>
      <div className="card-dark p-8 text-center py-16 border border-white/5 rounded-xl">
        <FileText className="w-12 h-12 mx-auto text-white/20 mb-4" />
        <p className="text-white/40">News management coming soon.</p>
        <p className="text-white/30 text-sm mt-2">
          Articles are currently defined in <code>src/lib/news.ts</code>.
        </p>
      </div>
    </div>
  );
}
