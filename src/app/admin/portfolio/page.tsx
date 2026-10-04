"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Globe, Images, Tag, Calendar, CheckCircle, Upload, Loader2, Image as ImageIcon, Sparkles } from "lucide-react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { LOCALES } from "@/lib/content-sections";
import { compressImage } from "@/lib/image-compression";

const CATEGORIES = [
  { value: "africa-celebrates", label: "🌍 Africa Celebrates (Flagship)" },
  { value: "afrima", label: "🎵 AFRIMA Music Conference" },
  { value: "patic", label: "🏭 PATIC Industrial Launch" },
  { value: "talent", label: "🌟 Talent Recruitment & Pathways" },
  { value: "event", label: "📅 General Event" },
  { value: "recap", label: "📹 Event Recap" },
  { value: "production", label: "🎬 Media / Production" },
  { value: "campaign", label: "📢 Brand Campaign" },
  { value: "publication", label: "📚 Publication / Report" },
];

const GALLERY_TABS = [
  { id: "pf_gal", name: "🌍 Africa Celebrates", slots: 9, desc: "Main Flagship Platform Gallery (Slots pf_gal1 to pf_gal9)" },
  { id: "pf_afrima", name: "🎵 AFRIMA Music Conference", slots: 9, desc: "Media Partnership Gallery (Slots pf_afrima1 to pf_afrima9)" },
  { id: "pf_patic", name: "🏭 PATIC Industrial Launch", slots: 9, desc: "Strategic Initiative Gallery (Slots pf_patic1 to pf_patic9)" },
  { id: "pf_media", name: "🎬 Media & Docu-Series", slots: 6, desc: "Broadcast & Publication Projects (Slots pf_media1 to pf_media6)" },
  { id: "pf_talent", name: "🌟 Talent Pathways", slots: 6, desc: "Talent & Emerging Artists Showcase (Slots pf_talent1 to pf_talent6)" },
];

export default function AdminPortfolioPage() {
  const { api } = useAdminApi();
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [imageKeys, setImageKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadingItemImg, setUploadingItemImg] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [activeGalleryTab, setActiveGalleryTab] = useState("pf_gal");

  const [form, setForm] = useState({
    locale: "en", slug: "", category: "africa-celebrates", title: "",
    subtitle: "", excerpt: "", year: "2026", accent: "#D6A34A",
    sort_order: 0, published: true, image_url: "",
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

  // Upload handler for Showcase Gallery Images
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileToUpload = await compressImage(file);
      const formData = new FormData();
      formData.append("file", fileToUpload);

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
        alert("Picture uploaded successfully! Click 'Save Image URL' below to apply.");
      } else {
        alert(json.error ?? "Failed to upload image");
      }
    } catch (err: any) {
      alert("Upload error: " + (err.message || String(err)));
    } finally {
      setUploading(false);
    }
  }

  // Upload handler for individual Portfolio Item cover picture
  async function handleItemImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingItemImg(true);
    try {
      const fileToUpload = await compressImage(file);
      const formData = new FormData();
      formData.append("file", fileToUpload);

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
        setForm((prev) => ({ ...prev, image_url: json.url }));
        alert("Portfolio item image uploaded successfully!");
      } else {
        alert(json.error ?? "Failed to upload image");
      }
    } catch (err: any) {
      alert("Upload error: " + (err.message || String(err)));
    } finally {
      setUploadingItemImg(false);
    }
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
      category: item.category ?? "africa-celebrates", title: item.title ?? "",
      subtitle: item.subtitle ?? "", excerpt: item.excerpt ?? "",
      year: item.year ?? "2026", accent: item.accent ?? "#D6A34A",
      sort_order: item.sort_order ?? 0, published: item.published ?? true,
      image_url: item.image_url ?? "",
    });
    setIsCreating(false);
  }

  function resetForm() {
    setEditingId(null);
    setIsCreating(false);
    setForm({
      locale: localeFilter, slug: "", category: "africa-celebrates", title: "",
      subtitle: "", excerpt: "", year: "2026", accent: "#D6A34A",
      sort_order: 0, published: true, image_url: "",
    });
  }

  const isEditing = editingId !== null || isCreating;
  const currentTab = GALLERY_TABS.find((t) => t.id === activeGalleryTab) || GALLERY_TABS[0];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 text-[#101312]">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#101312]">Portfolio & Gallery CMS</h1>
          <p className="text-[#101312]/70 text-sm mt-0.5">Manage AFRIMA, PATIC, Africa Celebrates, Talent Pathways & Showcase photos</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={localeFilter}
            onChange={(e) => setLocaleFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-gray-100 border border-gray-300 text-sm text-[#101312] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D6A34A]"
          >
            {LOCALES.map(l => (
              <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
            ))}
          </select>

          {!isEditing && (
            <button
              onClick={() => { resetForm(); setIsCreating(true); }}
              className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Project
            </button>
          )}
        </div>
      </div>

      {/* Item Form */}
      {isEditing && (
        <form onSubmit={handleSubmitItem} className="bg-white p-6 md:p-8 rounded-2xl border-2 border-[#D6A34A]/40 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-display font-bold text-[#101312]">
              {isCreating ? "Add New Portfolio Project" : "Edit Portfolio Project"}
            </h2>
            <button type="button" onClick={resetForm} className="text-gray-400 hover:text-black p-1">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-[#101312]/70 mb-1 block">Project Title</label>
              <input type="text" placeholder="e.g. AFRIMA 2026 Music Conference" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-dark" required />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-[#101312]/70 mb-1 block">URL Slug</label>
              <input type="text" placeholder="e.g. afrima-2026-conference" value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-dark" required />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-[#101312]/70 mb-1 block">Category</label>
              <select value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-dark font-medium">
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-[#101312]/70 mb-1 block">Subtitle / Tagline</label>
              <input type="text" placeholder="e.g. Music Beyond Borders" value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="input-dark" />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-[#101312]/70 mb-1 block">Year</label>
              <input type="text" placeholder="e.g. 2026" value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })} className="input-dark" />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-[#101312]/70 mb-1 block">Accent Hex Color</label>
              <input type="text" placeholder="e.g. #D6A34A" value={form.accent}
                onChange={(e) => setForm({ ...form, accent: e.target.value })} className="input-dark" />
            </div>
          </div>

          {/* Project Item Cover Picture Upload */}
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-300 space-y-3">
            <label className="text-sm text-[#101312] font-bold flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#9A6A31]" /> Upload Project Cover Image
            </label>
            <div className="grid sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleItemImageUpload}
                    disabled={uploadingItemImg}
                    className="text-xs text-[#101312] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#D6A34A] file:text-white hover:file:bg-[#b9853b] cursor-pointer"
                  />
                  {uploadingItemImg && (
                    <span className="text-xs text-[#9A6A31] flex items-center gap-1.5 font-bold">
                      <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Or enter image URL (https://... or /portfolio/...)"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="input-dark text-xs w-full"
                />
              </div>
              {form.image_url ? (
                <div className="relative h-28 w-full rounded-lg overflow-hidden border border-gray-300 bg-gray-100 shadow-inner">
                  <img src={form.image_url} alt="Cover preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-28 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs font-semibold">
                  No cover picture uploaded
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-[#101312]/70 mb-1 block">Excerpt / Summary Description</label>
            <textarea placeholder="Short summary of this project..." value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="input-dark w-full h-24" />
          </div>

          <div className="flex items-center gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer font-semibold">
              <input type="checkbox" checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-[#D6A34A]" />
              Published
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-[#101312]/70">Sort Order:</span>
              <input type="number" value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className="input-dark w-20 px-2 py-1 text-center" />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
            <button type="button" onClick={resetForm} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-black">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2 text-sm px-6 py-2.5">
              <Save className="w-4 h-4" /> {isCreating ? "Create Project" : "Save Changes"}
            </button>
          </div>
        </form>
      )}

      {/* Portfolio Items List */}
      {!isEditing && (
        <div className="space-y-8">
          
          {/* Projects List */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-[#101312]">Portfolio Projects ({portfolio.length})</h2>
              <span className="text-xs text-gray-500 font-medium">Locale: {localeFilter.toUpperCase()}</span>
            </div>

            {loading ? (
              <div className="py-8 text-center text-gray-400 text-sm">Loading portfolio items...</div>
            ) : portfolio.length === 0 ? (
              <div className="p-8 text-center text-gray-400 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-sm">
                No portfolio items found. Click &ldquo;Add New Project&rdquo; above to create AFRIMA, PATIC, or Africa Celebrates projects!
              </div>
            ) : (
              <div className="grid gap-3">
                {portfolio.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white transition-all flex items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-gray-300 shrink-0" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gray-200 border border-gray-300 flex items-center justify-center shrink-0 text-gray-400">
                          <ImageIcon className="w-7 h-7" />
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[#101312] text-base">{item.title}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D6A34A]/15 text-[#9A6A31] font-bold border border-[#D6A34A]/30">
                            {item.category}
                          </span>
                          {item.year && <span className="text-xs text-gray-500 font-semibold">{item.year}</span>}
                          {item.published && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        {item.subtitle && <p className="text-xs text-gray-600 font-medium">{item.subtitle}</p>}
                        <p className="text-xs text-gray-400 font-mono">slug: /{item.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => editItem(item)} className="p-2 text-gray-600 hover:text-black bg-white rounded-lg border border-gray-200 shadow-sm" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-red-500 hover:text-red-700 bg-white rounded-lg border border-gray-200 shadow-sm" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Portfolio Gallery Showcase Images Management */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-display font-bold text-[#101312] flex items-center gap-2">
                <Images className="w-6 h-6 text-[#9A6A31]" /> Upload Photos for Showcase Galleries
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Select a tab below to upload photos directly from your computer for AFRIMA, PATIC, Africa Celebrates, or Talent Pathways.
              </p>
            </div>

            {/* Gallery Category Selection Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
              {GALLERY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGalleryTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeGalleryTab === tab.id
                      ? "bg-[#101312] text-[#F0B84F] shadow-md border border-[#D6A34A]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black border border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="p-3 bg-[#D6A34A]/10 rounded-xl border border-[#D6A34A]/30 text-xs font-bold text-[#9A6A31]">
              📌 Currently Managing: {currentTab.desc}
            </div>

            {/* Gallery Grid Slots */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: currentTab.slots }).map((_, idx) => {
                const keyName = `${currentTab.id}${idx + 1}`;
                const existing = imageKeys.find((k) => k.key === keyName);
                const currentVal = existing?.value ?? "";
                const hasImg = currentVal.startsWith("http") || currentVal.startsWith("/");

                return (
                  <div key={keyName} className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-3 flex flex-col justify-between shadow-sm">
                    <div className="space-y-2 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[#9A6A31] font-bold text-xs">{keyName}</span>
                        <span className="text-[11px] text-gray-500 font-semibold">Slot #{idx + 1}</span>
                      </div>
                      {hasImg ? (
                        <div className="relative h-28 rounded-lg overflow-hidden border border-gray-300 bg-gray-200 shadow-inner">
                          <img src={currentVal} alt={keyName} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-28 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs font-semibold bg-white">
                          No image set
                        </div>
                      )}
                      <p className="text-gray-500 text-[11px] truncate">{currentVal || "(empty)"}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setEditingKey(keyName);
                          setImgKeyForm({ key: keyName, value: currentVal, section: "portfolio" });
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#101312] hover:bg-black text-[#F0B84F] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" /> {currentVal ? "Change Image" : "Upload Picture"}
                      </button>
                      {currentVal && (
                        <button
                          type="button"
                          onClick={async () => {
                            if (!confirm(`Clear image from slot ${keyName}?`)) return;
                            const res = await api("/api/admin/portfolio", {
                              method: "POST",
                              body: JSON.stringify({ action: "updateImage", key: keyName, value: "", section: "portfolio" }),
                            });
                            if (res.success) void loadPortfolio();
                          }}
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 text-xs shrink-0 border border-red-200"
                          title="Clear/Delete Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Editing Slot Modal */}
            {editingKey && (
              <form onSubmit={handleSaveImageKey} className="p-6 rounded-2xl bg-[#101312] text-white border-2 border-[#D6A34A] space-y-4 shadow-2xl">
                <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-3">
                  <span className="font-mono text-[#F0B84F] font-bold">Editing Image Slot: {editingKey}</span>
                  <button type="button" onClick={() => setEditingKey(null)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>

                {/* Option A: Upload from Computer */}
                <div className="p-4 rounded-xl bg-white/10 border border-white/20 space-y-3">
                  <label className="text-xs text-white font-bold flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#F0B84F]" /> Option A: Select Picture from Your Computer
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="text-xs text-gray-200 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#F0B84F] file:text-black hover:file:bg-[#d49e35] cursor-pointer"
                    />
                    {uploading && (
                      <span className="text-xs text-[#F0B84F] flex items-center gap-1.5 font-bold">
                        <Loader2 className="w-4 h-4 animate-spin" /> Uploading to Storage...
                      </span>
                    )}
                  </div>
                </div>

                {/* Option B: Direct URL */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-semibold">Option B: Image URL (http://... or /portfolio/...)</label>
                  <input
                    type="text"
                    placeholder="Image URL or uploaded file path..."
                    value={imgKeyForm.value}
                    onChange={(e) => setImgKeyForm({ ...imgKeyForm, value: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#F0B84F]"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => {
                      const sampleImgs = [
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
                      ];
                      const randomSample = sampleImgs[Math.floor(Math.random() * sampleImgs.length)];
                      setImgKeyForm({ ...imgKeyForm, value: randomSample });
                    }}
                    className="text-xs text-[#F0B84F] underline hover:text-white font-medium"
                  >
                    + Insert Sample Event Photo URL
                  </button>

                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditingKey(null)} className="text-xs text-gray-400 hover:text-white px-3 py-1.5 font-semibold">Cancel</button>
                    <button type="submit" className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5">
                      <Save className="w-3.5 h-3.5" /> Save Image URL
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
