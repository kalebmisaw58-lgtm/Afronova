"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Globe, Images, Tag, Calendar, CheckCircle, Upload, Loader2 } from "lucide-react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { LOCALES } from "@/lib/content-sections";

const CATEGORIES = ["event", "recap", "production", "campaign", "publication"];

export default function AdminPortfolioPage() {
  const { api } = useAdminApi();
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [imageKeys, setImageKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const supabase = typeof window !== "undefined"
        ? require("@/lib/supabase").createBrowserClient()
        : null;

      let token = "";
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        token = session?.access_token ?? "";
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setImgKeyForm((prev) => ({ ...prev, value: json.url }));
        alert("Picture uploaded successfully! The image URL has been filled in. Click 'Save Image' to apply.");
      } else {
        alert(json.error ?? "Failed to upload image from local storage");
      }
    } catch (err: any) {
      alert("Upload error: " + (err.message || String(err)));
    } finally {
      setUploading(false);
    }
  }
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

          {/* Gallery Image Keys (pf_gal1 .. pf_gal9) */}
          <div className="card-dark p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-md font-semibold text-white flex items-center gap-2">
                  <Images className="w-4 h-4 text-[#D6A34A]" /> Portfolio Gallery Image Keys
                </h2>
                <p className="text-xs text-white/40 mt-0.5">
                  Set image URLs for slots <code className="text-[#D6A34A]">pf_gal1</code> through <code className="text-[#D6A34A]">pf_gal9</code>.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, idx) => {
                const keyName = `pf_gal${idx + 1}`;
                const existing = imageKeys.find((k) => k.key === keyName);
                const currentVal = existing?.value ?? "";
                const hasImg = currentVal.startsWith("http") || currentVal.startsWith("/");

                return (
                  <div key={keyName} className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs space-y-2 flex flex-col justify-between">
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[#D6A34A] font-semibold">{keyName}</span>
                        <span className="text-[10px] text-white/30">Slot #{idx + 1}</span>
                      </div>
                      {hasImg ? (
                        <div className="relative h-24 rounded overflow-hidden border border-white/10 mt-1 bg-black/40">
                          <img src={currentVal} alt={keyName} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-16 rounded border border-dashed border-white/10 flex items-center justify-center text-white/20 text-[11px]">
                          No image set
                        </div>
                      )}
                      <p className="text-white/50 text-[11px] truncate mt-1">{currentVal || "(empty)"}</p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => {
                          setEditingKey(keyName);
                          setImgKeyForm({ key: keyName, value: currentVal, section: "portfolio" });
                        }}
                        className="flex-1 py-1.5 px-2 rounded bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <Edit className="w-3 h-3 text-[#D6A34A]" /> {currentVal ? "Edit" : "Set Image"}
                      </button>
                      {currentVal && (
                        <button
                          type="button"
                          onClick={async () => {
                            if (!confirm(`Clear image from slot ${keyName}?`)) return;
                            const res = await api("/api/admin/portfolio", {
                              method: "POST",
                              body: JSON.stringify({ action: "saveKey", key: keyName, value: "", section: "portfolio" }),
                            });
                            if (res.success) void loadPortfolio();
                          }}
                          className="p-1.5 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs shrink-0"
                          title="Clear/Delete Image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {editingKey && (
              <form onSubmit={handleSaveImageKey} className="p-4 rounded-lg bg-black/60 border border-[#D6A34A]/30 space-y-4 mt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-[#D6A34A] font-semibold">Editing Image Slot: {editingKey}</span>
                  <button type="button" onClick={() => setEditingKey(null)} className="text-white/40 hover:text-white"><X className="w-4 h-4" /></button>
                </div>

                {/* Option A: Upload from Computer */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                  <label className="text-xs text-white/90 font-medium flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#D6A34A]" /> Option A: Select Picture from Your Computer
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="text-xs text-white/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D6A34A] file:text-black hover:file:bg-[#b9853b] cursor-pointer"
                    />
                    {uploading && (
                      <span className="text-xs text-[#D6A34A] flex items-center gap-1.5 font-medium">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Supabase Storage...
                      </span>
                    )}
                  </div>
                </div>

                {/* Option B: Direct URL */}
                <div className="space-y-1">
                  <label className="text-[11px] text-white/60">Option B: Image URL (http://... or /images/...)</label>
                  <input
                    type="text"
                    placeholder="Image URL or uploaded file path..."
                    value={imgKeyForm.value}
                    onChange={(e) => setImgKeyForm({ ...imgKeyForm, value: e.target.value })}
                    className="input-dark w-full text-xs"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const sampleImgs = [
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
                      ];
                      const randomSample = sampleImgs[Math.floor(Math.random() * sampleImgs.length)];
                      setImgKeyForm({ ...imgKeyForm, value: randomSample });
                    }}
                    className="text-[11px] text-[#D6A34A] underline hover:text-white"
                  >
                    + Insert Sample Event Photo URL
                  </button>

                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditingKey(null)} className="text-xs text-white/40 hover:text-white px-2 py-1">Cancel</button>
                    <button type="submit" className="btn-primary text-xs px-3 py-1 flex items-center gap-1">
                      <Save className="w-3 h-3" /> Save Image URL
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
