"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Globe, Tag, Calendar, FileText, Upload, Loader2 } from "lucide-react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { LOCALES } from "@/lib/content-sections";
import { compressImage } from "@/lib/image-compression";

const CATEGORIES = ["event", "partnership", "business", "recap", "production"];

export default function AdminNewsPage() {
  const { api } = useAdminApi();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
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

      if (!res.ok) {
        if (res.status === 413) {
          alert("The uploaded image is too large. Please select a smaller file.");
          return;
        }
        const text = await res.text();
        alert(`Upload failed (HTTP ${res.status}): ${text.substring(0, 150)}`);
        return;
      }

      const json = await res.json();
      if (json.success && json.url) {
        // Appends image markdown or URL
        setForm((prev: any) => ({
          ...prev,
          paragraphs: [json.url, ...prev.paragraphs],
        }));
        alert("Image uploaded and inserted!");
      } else {
        alert(json.error ?? "Failed to upload image");
      }
    } catch (err: any) {
      alert("Upload error: " + (err.message || String(err)));
    } finally {
      setUploadingImage(false);
    }
  }
  const [form, setForm] = useState({
    slug: "", locale: "en", category: "event",
    article_date: "", read_time: "", title: "", excerpt: "",
    paragraphs: [""], published: true, sort_order: 0,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [localeFilter, setLocaleFilter] = useState("all");

  useEffect(() => { void loadArticles(); }, [localeFilter]);

  async function loadArticles() {
    setLoading(true);
    try {
      const res = await api(`/api/admin/news?locale=${localeFilter}`);
      if (res.success) setArticles(res.articles ?? []);
    } catch {} finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const action = isCreating ? "create" : "update";
    const res = await api("/api/admin/news", {
      method: "POST",
      body: JSON.stringify({ action, article: form, id: editingId }),
    });
    if (res.success) { resetForm(); void loadArticles(); }
    else alert(res.error ?? "Failed");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    await api("/api/admin/news", {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
    void loadArticles();
  }

  function editArticle(article: any) {
    setEditingId(article.id);
    setForm({
      slug: article.slug, locale: article.locale ?? "en",
      category: article.category ?? "event",
      article_date: article.article_date ?? "",
      read_time: article.read_time ?? "",
      title: article.title, excerpt: article.excerpt ?? "",
      paragraphs: article.paragraphs?.length ? article.paragraphs : [""],
      published: article.published ?? true,
      sort_order: article.sort_order ?? 0,
    });
    setIsCreating(false);
  }

  function resetForm() {
    setEditingId(null);
    setIsCreating(false);
    setForm({
      slug: "", locale: "en", category: "event",
      article_date: "", read_time: "", title: "", excerpt: "",
      paragraphs: [""], published: true, sort_order: 0,
    });
  }

  function updateParagraph(idx: number, val: string) {
    setForm({ ...form, paragraphs: form.paragraphs.map((p: string, i: number) => i === idx ? val : p) });
  }
  function addParagraph() { setForm({ ...form, paragraphs: [...form.paragraphs, ""] }); }
  function removeParagraph(idx: number) { setForm({ ...form, paragraphs: form.paragraphs.filter((_: string, i: number) => i !== idx) }); }

    const isEditing = editingId !== null || isCreating;

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-white">News Articles</h1>

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
              <Plus className="w-4 h-4" /> New Article
            </button>
          )}
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="card-dark p-6 rounded-xl mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{isCreating ? "Add New Article" : "Edit Article"}</h2>
            <button type="button" onClick={resetForm} className="text-white/40 hover:text-white">
              <X className="w-5 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Slug" value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-dark" required />
            <select value={form.locale}
              onChange={(e) => setForm({ ...form, locale: e.target.value as any })} className="input-dark">
              {LOCALES.map(l => (
                <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
              ))}
            </select>
            <select value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as any })} className="input-dark">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="Read time (e.g. 4 min read)" value={form.read_time}
              onChange={(e) => setForm({ ...form, read_time: e.target.value })} className="input-dark" />
            <input type="date" value={form.article_date}
              onChange={(e) => setForm({ ...form, article_date: e.target.value })} className="input-dark" />
            <input type="text" placeholder="Title" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-dark sm:col-span-2" required />
          </div>

          <textarea placeholder="Excerpt / summary" value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="input-dark w-full h-20" />

          <div className="space-y-2">
            <label className="text-sm text-white/60">Body Paragraphs</label>
            {form.paragraphs.map((p: string, i: number) => (
              <div key={i} className="flex gap-2">
                <textarea value={p}
                  onChange={(e) => updateParagraph(i, e.target.value)} className="input-dark flex-1" rows={3} />
                {form.paragraphs.length > 1 && (
                  <button type="button" onClick={() => removeParagraph(i)}
                    className="text-red-400 hover:text-red-300" title="Remove">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addParagraph}
              className="text-sm text-[#D6A34A] hover:text-[#B9853B]">+ Add paragraph</button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[#D6A34A]" />
              Published
            </label>
            <div className="flex gap-2">
              <button type="button" onClick={resetForm}
                className="px-4 py-2 text-sm text-white/50 hover:text-white">Cancel</button>
              <button type="submit" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
                <Save className="w-4 h-4" /> {isCreating ? "Create" : "Save"} Article
              </button>
            </div>
          </div>
                </form>
      )}

      {!isCreating && editingId === null && (
        <div className="space-y-3">
          {loading ? (
            <div className="text-white/30">Loading articles...</div>
          ) : articles.length === 0 ? (
            <div className="card-dark p-8 text-center text-white/30 rounded-xl">
              No articles found. Create one above!
            </div>
          ) : (
            articles.map((a: any) => (
              <div key={a.id} className="card-dark p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D6A34A]/20 to-[#9A6A31]/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#D6A34A]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{a.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-white/40 mt-1">
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {a.locale}</span>
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {a.category}</span>
                      {a.article_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {a.article_date}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    a.published ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                  }`}>
                    {a.published ? "Pub" : "Draft"}
                  </span>
                  <button onClick={() => editArticle(a)} className="p-1.5 text-white/40 hover:text-white rounded" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="p-1.5 text-white/40 hover:text-red-400 rounded" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
