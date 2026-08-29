"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Edit, Trash2, Save, X, Tag, Globe } from "lucide-react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { LOCALES } from "@/lib/content-sections";

const CATEGORIES = [
  { value: "cat_corporate", label: "Corporate" },
  { value: "cat_government", label: "Government" },
  { value: "cat_media", label: "Media" },
  { value: "cat_community", label: "Community" },
  { value: "cat_educational", label: "Educational" },
];

export default function AdminPartnersPage() {
  const { api } = useAdminApi();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "", initials: "", category_key: "cat_corporate",
    accent: "#D6A34A", logo: "", website: "",
    featured: false, sort_order: 0,
  });
  const [descriptions, setDescriptions] = useState(
    LOCALES.reduce((acc: any, l) => ({ ...acc, [l.code]: { description: "", role: "" } }), {})
  );
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => { void loadPartners(); }, []);

  async function loadPartners() {
    setLoading(true);
    try {
      const res = await api("/api/admin/partners");
      if (res.success) setPartners(res.partners ?? []);
    } catch {} finally { setLoading(false); }
  }

  function editPartner(p: any) {
    setEditingId(p.id);
    setForm({
      name: p.name, initials: p.initials ?? "", category_key: p.category_key ?? "cat_corporate",
      accent: p.accent ?? "#D6A34A", logo: p.logo ?? "", website: p.website ?? "",
      featured: p.featured ?? false, sort_order: p.sort_order ?? 0,
    });
    const desc: any = {};
    LOCALES.forEach(l => {
      const d = p.descriptions?.find((x: any) => x.locale === l.code);
      desc[l.code] = { description: d?.description ?? "", role: d?.role ?? "" };
    });
    setDescriptions(desc);
    setIsCreating(false);
  }

  function resetForm() {
    setEditingId(null);
    setIsCreating(false);
    setForm({
      name: "", initials: "", category_key: "cat_corporate",
      accent: "#D6A34A", logo: "", website: "",
      featured: false, sort_order: 0,
    });
    setDescriptions(
      LOCALES.reduce((acc: any, l) => ({ ...acc, [l.code]: { description: "", role: "" } }), {})
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const action = isCreating ? "create" : "update";
    const descArray = Object.entries(descriptions).map(([locale, d]: [string, any]) => ({
      locale, ...d
    }));
    const res = await api("/api/admin/partners", {
      method: "POST",
      body: JSON.stringify({ action, partner: form, descriptions: descArray, id: editingId }),
    });
    if (res.success) { resetForm(); void loadPartners(); }
    else alert(res.error ?? "Failed");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this partner?")) return;
    await api("/api/admin/partners", {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
    void loadPartners();
  }

  const isEditing = editingId !== null || isCreating;

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Partners</h1>
        {!isEditing && (
          <button
            onClick={() => { resetForm(); setIsCreating(true); }}
            className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
          >
            <Plus className="w-4 h-4" /> Add Partner
          </button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="card-dark p-6 rounded-xl mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{isCreating ? "Add New Partner" : "Edit Partner"}</h2>
            <button type="button" onClick={resetForm} className="text-white/40 hover:text-white">
              <X className="w-5 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Partner Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-dark" required />
            <input type="text" placeholder="Initials (e.g. AC)" value={form.initials}
              onChange={(e) => setForm({ ...form, initials: e.target.value })} className="input-dark" />
            <select value={form.category_key}
              onChange={(e) => setForm({ ...form, category_key: e.target.value })} className="input-dark">
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <input type="color" value={form.accent}
              onChange={(e) => setForm({ ...form, accent: e.target.value })} className="input-dark h-10" />
            <input type="url" placeholder="Logo URL (image)" value={form.logo}
              onChange={(e) => setForm({ ...form, logo: e.target.value })} className="input-dark sm:col-span-2" />
            <input type="url" placeholder="Website URL" value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })} className="input-dark" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#D6A34A]" />
              Featured
            </label>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-white/60">Per-Language Descriptions</label>
            {Object.entries(descriptions).map(([locale, d]: [string, any]) => (
              <div key={locale} className="border border-white/10 rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-medium text-white/60 flex items-center gap-1">
                  <Globe className="w-4 h-4" /> {locale.toUpperCase()}
                </h4>
                <input type="text" placeholder="Role / title" value={d.role}
                  onChange={(e) => setDescriptions({ ...descriptions, [locale]: { ...d, role: e.target.value } })}
                  className="input-dark w-full" />
                <textarea placeholder="Description" value={d.description}
                  onChange={(e) => setDescriptions({ ...descriptions, [locale]: { ...d, description: e.target.value } })}
                  className="input-dark w-full h-16" />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={resetForm}
              className="px-4 py-2 text-sm text-white/50 hover:text-white">Cancel</button>
            <button type="submit" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
              <Save className="w-4 h-4" /> {isCreating ? "Create" : "Save"} Partner
            </button>
          </div>
        </form>
      )}
  {isEditing && false ? null : null}

      {!isEditing && (
        <div className="space-y-3">
          {loading ? (
            <div className="text-white/30">Loading partners...</div>
          ) : partners.length === 0 ? (
            <div className="card-dark p-8 text-center text-white/30 rounded-xl">
              No partners found. Create one above!
            </div>
          ) : (
            partners.map((p: any) => (
              <div key={p.id} className="card-dark p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="w-12 h-12 rounded-lg object-contain bg-white/5" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D6A34A]/20 to-[#9A6A31]/20 flex items-center justify-center">
                      <span className="font-display font-bold text-[#D6A34A] text-lg">
                        {p.initials || p.name?.charAt(0) || <Users className="w-6 h-6" />}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-white">{p.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-white/40 mt-1">
                      {p.category_key && <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{p.category_key.replace("cat_", "")}</span>}
                      {p.featured && <span className="text-[#D6A34A]">Featured</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editPartner(p)} className="p-1.5 text-white/40 hover:text-white rounded" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-white/40 hover:text-red-400 rounded" title="Delete">
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
