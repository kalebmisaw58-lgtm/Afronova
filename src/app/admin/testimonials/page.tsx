"use client";

import { useState, useEffect } from "react";
import { Quote, Plus, Edit, Trash2, Save, X, Globe, CheckCircle } from "lucide-react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { LOCALES } from "@/lib/content-sections";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminTestimonialsPage() {
  const { api } = useAdminApi();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    locale: "en", quote: "", author: "", role: "",
    organisation: "", sort_order: 0, published: true,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [localeFilter, setLocaleFilter] = useState("all");

  useEffect(() => { void loadTestimonials(); }, [localeFilter]);

  async function loadTestimonials() {
    setLoading(true);
    try {
      const res = await api(`/api/admin/testimonials?locale=${localeFilter}`);
      if (res.success) setTestimonials(res.testimonials ?? []);
    } catch {} finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const action = isCreating ? "create" : "update";
    const res = await api("/api/admin/testimonials", {
      method: "POST",
      body: JSON.stringify({ action, testimonial: form, id: editingId }),
    });
    if (res.success) { resetForm(); void loadTestimonials(); }
    else alert(res.error ?? "Failed");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await api("/api/admin/testimonials", {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
    void loadTestimonials();
  }

  function editTestimonial(t: any) {
    setEditingId(t.id);
    setForm({
      locale: t.locale ?? "en", quote: t.quote ?? "", author: t.author ?? "",
      role: t.role ?? "", organisation: t.organisation ?? "",
      sort_order: t.sort_order ?? 0, published: t.published ?? true,
    });
    setIsCreating(false);
  }

  function resetForm() {
    setEditingId(null);
    setIsCreating(false);
    setForm({ locale: "en", quote: "", author: "", role: "", organisation: "", sort_order: 0, published: true });
  }

  const isEditing = editingId !== null || isCreating;

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Testimonials</h1>
        <div className="flex items-center gap-4">
          <select
            value={localeFilter}
            onChange={(e) => setLocaleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D6A34A]"
          >
            <option value="all">All Locales</option>
            {LOCALES.map(l => (
              <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
            ))}
          </select>
          {!isEditing && (
            <button
              onClick={() => { resetForm(); setIsCreating(true); }}
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          )}
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="card-dark p-6 rounded-xl mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {isCreating ? "Add New Testimonial" : "Edit Testimonial"}
            </h2>
            <button type="button" onClick={resetForm} className="text-white/40 hover:text-white">
              <X className="w-5 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <select value={form.locale}
              onChange={(e) => setForm({ ...form, locale: e.target.value as any })} className="input-dark">
              {LOCALES.map(l => (
                <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
              ))}
            </select>
            <input type="text" placeholder="Author Name" value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })} className="input-dark" required />
            <input type="text" placeholder="Role / Title" value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })} className="input-dark" />
            <input type="text" placeholder="Organisation" value={form.organisation}
              onChange={(e) => setForm({ ...form, organisation: e.target.value })} className="input-dark" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[#D6A34A]" />
              Published
            </label>
          </div>

          <div>
            <label className="text-sm text-white/60">Quote</label>
            <textarea placeholder="What did they say?" value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })} className="input-dark w-full h-32" required />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={resetForm}
              className="px-4 py-2 text-sm text-white/50 hover:text-white">Cancel</button>
            <button type="submit" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
              <Save className="w-4 h-4" /> {isCreating ? "Create" : "Save"} Testimonial
                        </button>
          </div>
        </form>
      )}

      {/* Testimonials List */}
      {!isEditing && (
        <div className="space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-dark p-4 rounded-xl space-y-3">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="card-dark p-8 text-center text-white/30 rounded-xl">
              No testimonials found. Create one above!
            </div>
          ) : (
            testimonials.map((t: any) => (
              <div key={t.id} className="card-dark p-4 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D6A34A]/20 to-[#9A6A31]/20 flex items-center justify-center">
                    <Quote className="w-6 h-6 text-[#D6A34A]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/80 italic">&quot;{t.quote}&quot;</p>
                    <div className="flex items-center gap-2 text-xs text-white/40 mt-2">
                      <span className="font-medium text-white/70">{t.author}</span>
                      {t.role && <span>&bull; {t.role}</span>}
                      {t.organisation && <span>&bull; {t.organisation}</span>}
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {t.locale}</span>
                      {t.published && <CheckCircle className="w-3 h-3 text-green-400" />}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => editTestimonial(t)} className="p-1.5 text-white/40 hover:text-white rounded" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 text-white/40 hover:text-red-400 rounded" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

