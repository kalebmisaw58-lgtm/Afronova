"use client";

import { Users, Plus } from "lucide-react";

export default function AdminPartnersPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Partners</h1>
        <button className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus className="w-4 h-4" /> Add Partner
        </button>
      </div>
      <div className="card-dark p-8 text-center py-16 border border-white/5 rounded-xl">
        <Users className="w-12 h-12 mx-auto text-white/20 mb-4" />
        <p className="text-white/40">Partner management coming soon.</p>
        <p className="text-white/30 text-sm mt-2">
          Partners are currently defined in <code>src/lib/partners.ts</code>.
        </p>
      </div>
    </div>
  );
}
