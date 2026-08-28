"use client";

import { MessageSquare, Plus } from "lucide-react";

export default function AdminTestimonialsPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Testimonials</h1>
        <button className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>
      <div className="card-dark p-8 text-center py-16 border border-white/5 rounded-xl">
        <MessageSquare className="w-12 h-12 mx-auto text-white/20 mb-4" />
        <p className="text-white/40">Testimonial management coming soon.</p>
      </div>
    </div>
  );
}
