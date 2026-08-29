"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Globe, Images, Tag, Calendar, CheckCircle } from "lucide-react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { LOCALES } from "@/lib/content-sections";

const CATEGORIES = ["event", "recap", "production", "campaign", "publication"];

export default function AdminPortfolioPage() {
  const { api } = useAdminApi();
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [imageKeys, setImageKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    locale: "en", slug: "", category: "event", title: "",
    subtitle: "", excerpt: "", year: "", accent: "#D6A34A",
    sort_order: 0, published: true,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [localeFilter, setLocaleFilter] = useState("en");

  // State for image key edits
  const [imgKeyForm, setImgKeyForm] = useState({ key: "", value: "", section: "portfolio" });
  const [editingKey, setEditingKey] = useState<string | null>(null);

  useEffect(() => { void loadPortfolio(); }, [localeFilter]);

  async function loadPortfolio() {
    setLoading(true);
    try {
      const res = await api(`/api/admin/portfolio?locale=${localeFilter}`);
      if (res.success) {
        setPortfolio(res.portfolio ?? []);
        setImageKeys(res.imageKeys ?? []);
      }
    } catch {} finally { setLoading(false); }
  }

  async function handleSubmitItem(e: React.FormEvent) {
    e.preventDefault();
    const action = isCreating ? "create" : "update";
    const res = await api("/api/admin/portfolio", {
      method: "POST",
      body: JSON.stringify({ action, item: form, id: editingId }),
    });
    if (res.success) { resetForm(); void loadPortfolio(); }
    else alert(res.error ?? "Failed to save portfolio item");
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Delete this portfolio item?")) return;
    await api("/api/admin/portfolio", {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
    void loadPortfolio();
  }

  async function handleSaveImageKey(e: React.FormEvent) {
    e.preventDefault();
    if (!imgKeyForm.key) return;
    const res = await api("/api/admin/portfolio", {
      method: "POST",
      body: JSON.stringify({
        action: "updateImage",
        key: imgKeyForm.key,
        value: imgKeyForm.value,
        locale: localeFilter,
        section: imgKeyForm.section,
      }),
    });
    if (res.success) {
      setEditingKey(null);
      setImgKeyForm({ key: "", value: "", section: "portfolio" });
      void loadPortfolio();
    } else {
      alert(res.error ?? "Failed to update image key");
    }
  }

  function editItem(item: any) {
    setEditingId(item.id);
    setForm({
      locale: item.locale ?? "en", slug: item.slug ?? "",
      category: item.category ?? "event", title: item.title ?? "",
      subtitle: item.subtitle ?? "", excerpt: item.excerpt ?? "",
      year: item.year ?? "", accent: item.accent ?? "#D6A34A",
      sort_order: item.sort_order ?? 0, published: item.published ?? true,
    });
    setIsCreating(false);
  }

  function resetForm() {
    setEditingId(null);
    setIsCreating(false);
    setForm({
      locale: localeFilter, slug: "", category: "event", title: "",
      subtitle: "", excerpt: "", year: "", accent: "#D6A34A",
      sort_order: 0, published: true,
    });
  }

  const isEditing = editingId !== null || isCreating;

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Portfolio Items & Showcase</h1>
          <p className="text-white/40 text-sm mt-1">Manage project showcase items and gallery image URLs</p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={localeFilter}
            onChange={(e) => setLocaleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D6A34A]"
          >
            {LOCALES.map(l => (
              <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
            ))}
          </select>
          {!isEditing && (
            <button
              onClick={() => { resetForm(); setIsCreating(true); }}
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          )}
        </div>
      </div>

      {/* Item Form */}
      {isEditing && (
        <form onSubmit={handleSubmitItem} className="card-dark p-6 rounded-xl mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {isCreating ? "Add Portfolio Item" : "Edit Portfolio Item"}
            </h2>
            <button type="button" onClick={resetForm} className="text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Title" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-dark" required />

            <input type="text" placeholder="Slug (e.g. africa-celebrates-2026)" value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-dark" required />

            <select value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-dark">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <input type="text" placeholder="Subtitle / Tagline" value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="input-dark" />

            <input type="text" placeholder="Year (e.g. 2026)" value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })} className="input-dark" />

            <input type="text" placeholder="Accent Color (e.g. #D6A34A)" value={form.accent}
              onChange={(e) => setForm({ ...form, accent: e.target.value })} className="input-dark" />
          </div>

          <div>
            <label className="text-sm text-white/60">Excerpt / Description</label>
            <textarea placeholder="Short summary of this portfolio project..." value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="input-dark w-full h-24 mt-1" />
          </div>

          <div className="flex items-center gap-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[#D6A34A]" />
              Published
            </label>
            <div className="flex items-center gap-2">
              <span className="text-white/60">Sort Order:</span>
              <input type="number" value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className="input-dark w-20 px-2 py-1" />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={resetForm} className="px-4 py-2 text-sm text-white/50 hover:text-white">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
              <Save className="w-4 h-4" /> {isCreating ? "Create Item" : "Save Changes"}
            </button>
          </div>
        </form>
      )}

      {/* Portfolio Items List */}
      {!isEditing && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white/90">Portfolio Projects ({portfolio.length})</h2>
            {loading ? (
              <div className="text-white/30">Loading portfolio items...</div>
            ) : portfolio.length === 0 ? (
              <div className="card-dark p-8 text-center text-white/30 rounded-xl">
                No portfolio items found for {localeFilter.toUpperCase()}. Create one above!
              </div>
            ) : (
              portfolio.map((item) => (
                <div key={item.id} className="card-dark p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-white">{item.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70 font-mono">{item.category}</span>
                      {item.year && <span className="text-xs text-white/40">{item.year}</span>}
                      {item.published && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                    {item.subtitle && <p className="text-xs text-white/60">{item.subtitle}</p>}
                    <p className="text-xs text-white/40 font-mono">slug: /{item.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editItem(item)} className="p-2 text-white/40 hover:text-white rounded" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-white/40 hover:text-red-400 rounded" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Image Key Editor */}
          <div className="card-dark p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-md font-semibold text-white flex items-center gap-2">
                <Images className="w-4 h-4 text-[#D6A34A]" /> Portfolio Gallery Image Keys ({imageKeys.length})
              </h2>
            </div>

            {imageKeys.length === 0 ? (
              <p className="text-xs text-white/30">No gallery image keys (`pf_*`) configured in site_content yet.</p>
            ) : (
              <div className="grid gap-3">
                {imageKeys.map((k) => (
                  <div key={k.key} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                    <div className="space-y-1 overflow-hidden pr-2">
                      <span className="font-mono text-[#D6A34A] font-semibold">{k.key}</span>
                      <p className="text-white/70 truncate">{k.value || "(empty image URL)"}</p>
                    </div>
                    <button
                      onClick={() => { setEditingKey(k.key); setImgKeyForm({ key: k.key, value: k.value ?? "", section: k.section ?? "portfolio" }); }}
                      className="p-1.5 text-white/40 hover:text-white rounded shrink-0"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {editingKey && (
              <form onSubmit={handleSaveImageKey} className="p-4 rounded-lg bg-black/40 border border-white/10 space-y-3 mt-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-[#D6A34A]">Editing Key: {editingKey}</span>
                  <button type="button" onClick={() => setEditingKey(null)} className="text-white/40 hover:text-white"><X className="w-4 h-4" /></button>
                </div>
                <input
                  type="text"
                  placeholder="Image URL (e.g. /images/portfolio/gallery-1.jpg)"
                  value={imgKeyForm.value}
                  onChange={(e) => setImgKeyForm({ ...imgKeyForm, value: e.target.value })}
                  className="input-dark w-full text-xs"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingKey(null)} className="text-xs text-white/40 hover:text-white px-2 py-1">Cancel</button>
                  <button type="submit" className="btn-primary text-xs px-3 py-1">Save Image URL</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
