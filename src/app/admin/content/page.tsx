"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Save, Download, Search, Globe, LayoutGrid, List, CheckCircle, RefreshCw, X, Filter,
} from "lucide-react";
import { ContentItem, CONTENT_SECTIONS, LOCALES } from "@/lib/content-sections";
import SectionCard from "@/components/admin/SectionCard";

type GroupedItems = Record<string, ContentItem[]>;

export default function ContentManagerPage() {
  const [viewMode, setViewMode] = useState<"single" | "matrix">("matrix");
  const [selectedLocale, setSelectedLocale] = useState("en");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [originalValues, setOriginalValues] = useState<Map<string, string>>(new Map());
  const [englishDefaults, setEnglishDefaults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(CONTENT_SECTIONS.map((s) => s.key))
  );
  const [saveMessage, setSaveMessage] = useState("");

  // Matrix state: { [key]: { section: string, values: { en: "", am: "", fr: "", pt: "", ar: "" } } }
  const [matrixData, setMatrixData] = useState<Record<string, { section: string; values: Record<string, string> }>>({});
  const [matrixDirtyKeys, setMatrixDirtyKeys] = useState<Set<string>>(new Set());

  // Load English defaults for reference column
  useEffect(() => {
    fetch("/api/content?locale=en")
      .then((r) => r.json())
      .then((json) => {
        if (json.translations) setEnglishDefaults(json.translations);
      })
      .catch(() => {});
  }, []);

  // Load content when viewMode or selectedLocale changes
  useEffect(() => {
    if (viewMode === "single") {
      loadContent(selectedLocale);
    } else {
      loadMatrix();
    }
  }, [selectedLocale, viewMode]);

  async function getAccessToken(): Promise<string | null> {
    const { createBrowserClient } = await import("@/lib/supabase");
    const supabase = createBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token ?? null;
  }

  async function loadContent(locale: string) {
    setLoading(true);
    setSaveMessage("");
    const token = await getAccessToken();
    const res = await fetch(`/api/admin/content?locale=${locale}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const json = await res.json();
    const loaded: ContentItem[] = json.items ?? [];
    setItems(loaded);
    const orig = new Map<string, string>();
    loaded.forEach((item) => orig.set(item.id, item.value));
    setOriginalValues(orig);
    setLoading(false);
  }

  async function loadMatrix() {
    setLoading(true);
    setSaveMessage("");
    const token = await getAccessToken();
    const res = await fetch(`/api/admin/content?matrix=true`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const json = await res.json();
    const rawItems: any[] = json.items ?? [];

    const matrix: Record<string, { section: string; values: Record<string, string> }> = {};

    // Populate matrix with DB values
    rawItems.forEach((row) => {
      if (!matrix[row.key]) {
        matrix[row.key] = {
          section: row.section || "general",
          values: { en: "", am: "", fr: "", pt: "", ar: "" },
        };
      }
      matrix[row.key].values[row.locale] = row.value || "";
    });

    // Fallback to English defaults for keys not in DB
    Object.entries(englishDefaults).forEach(([key, val]) => {
      if (!matrix[key]) {
        matrix[key] = {
          section: "general",
          values: { en: val, am: "", fr: "", pt: "", ar: "" },
        };
      } else if (!matrix[key].values.en) {
        matrix[key].values.en = val;
      }
    });

    setMatrixData(matrix);
    setMatrixDirtyKeys(new Set());
    setLoading(false);
  }

  function updateValue(id: string, newValue: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  }

  function updateMatrixValue(key: string, locale: string, newValue: string) {
    setMatrixData((prev) => {
      const next = { ...prev };
      if (next[key]) {
        next[key] = {
          ...next[key],
          values: {
            ...next[key].values,
            [locale]: newValue,
          },
        };
      }
      return next;
    });
    setMatrixDirtyKeys((prev) => new Set(prev).add(key));
  }

  const dirtyIds = useMemo(() => {
    const dirty = new Set<string>();
    items.forEach((item) => {
      const orig = originalValues.get(item.id);
      if (orig !== undefined && orig !== item.value) dirty.add(item.id);
    });
    return dirty;
  }, [items, originalValues]);

  const totalDirty = dirtyIds.size;

  async function saveAllSingle() {
    if (totalDirty === 0) return;
    setSaving(true);
    setSaveMessage("");
    const token = await getAccessToken();
    const dirtyItems = items.filter((item) => dirtyIds.has(item.id));
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        action: "bulk",
        locale: selectedLocale,
        items: dirtyItems.map((i) => ({ key: i.key, value: i.value, section: i.section })),
      }),
    });
    const json = await res.json();
    if (json.success) {
      setSaveMessage(`Saved ${dirtyItems.length} changes.`);
      const newOrig = new Map(originalValues);
      dirtyItems.forEach((item) => newOrig.set(item.id, item.value));
      setOriginalValues(newOrig);
    } else {
      setSaveMessage(`Error: ${json.error ?? "Failed to save"}`);
    }
    setSaving(false);
  }

  async function saveMatrixKey(key: string) {
    setSaving(true);
    setSaveMessage("");
    const token = await getAccessToken();
    const entry = matrixData[key];
    if (!entry) return;

    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        action: "batchUpsertKey",
        key,
        section: entry.section,
        values: entry.values,
      }),
    });

    const json = await res.json();
    if (json.success) {
      setSaveMessage(`Saved translations for '${key}' across 5 languages.`);
      setMatrixDirtyKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    } else {
      setSaveMessage(`Error: ${json.error ?? "Failed to save key"}`);
    }
    setSaving(false);
  }

  async function saveAllMatrix() {
    if (matrixDirtyKeys.size === 0) return;
    setSaving(true);
    setSaveMessage("");
    const token = await getAccessToken();

    let savedCount = 0;
    for (const key of Array.from(matrixDirtyKeys)) {
      const entry = matrixData[key];
      if (!entry) continue;
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "batchUpsertKey",
          key,
          section: entry.section,
          values: entry.values,
        }),
      });
      const json = await res.json();
      if (json.success) savedCount++;
    }

    setSaveMessage(`Saved ${savedCount} keys across all 5 languages.`);
    setMatrixDirtyKeys(new Set());
    setSaving(false);
  }

  async function importDefaults() {
    if (!confirm(`Import English defaults for '${selectedLocale}'? Missing keys will be created with English values.`)) return;
    setImporting(true);
    setSaveMessage("");
    const token = await getAccessToken();
    const res = await fetch("/api/admin/content/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ locale: selectedLocale }),
    });
    const json = await res.json();
    if (json.success) {
      setSaveMessage(json.message ?? `Imported ${json.imported} strings.`);
      loadContent(selectedLocale);
    } else {
      setSaveMessage(`Error: ${json.error ?? "Import failed"}`);
    }
    setImporting(false);
  }

  // Matrix Filtered Entries
  const filteredMatrixEntries = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return Object.entries(matrixData).filter(([key, data]) => {
      const matchesSec = sectionFilter === "all" || data.section === sectionFilter;
      if (!matchesSec) return false;
      if (!term) return true;
      const matchesKey = key.toLowerCase().includes(term);
      const matchesVal = Object.values(data.values).some((v) => (v || "").toLowerCase().includes(term));
      return matchesKey || matchesVal;
    });
  }, [matrixData, searchTerm, sectionFilter]);

  const grouped = useMemo(() => {
    const groups: GroupedItems = {};
    items.forEach((item) => {
      const section = item.section || "general";
      if (!groups[section]) groups[section] = [];
      groups[section].push(item);
    });
    return groups;
  }, [items]);

  const filteredGrouped = useMemo(() => {
    if (!searchTerm.trim()) return grouped;
    const term = searchTerm.toLowerCase();
    const filtered: GroupedItems = {};
    Object.entries(grouped).forEach(([section, sectionItems]) => {
      const match = sectionItems.filter(
        (item) =>
          item.key.toLowerCase().includes(term) ||
          item.value.toLowerCase().includes(term) ||
          (englishDefaults[item.key] ?? "").toLowerCase().includes(term)
      );
      if (match.length > 0) filtered[section] = match;
    });
    return filtered;
  }, [grouped, searchTerm, englishDefaults]);

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#101312]">Website Content & Translations</h1>
          <p className="text-[#101312]/65 text-sm mt-1 font-medium">
            Manage multi-language UI strings across English, Amharic, French, Portuguese, and Arabic
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm shrink-0">
          <button
            onClick={() => setViewMode("matrix")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "matrix" ? "bg-[#D6A34A] text-white shadow-sm" : "text-[#101312]/65 hover:text-[#101312] hover:bg-gray-100"
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> 5-Language Matrix
          </button>
          <button
            onClick={() => setViewMode("single")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "single" ? "bg-[#D6A34A] text-white shadow-sm" : "text-[#101312]/65 hover:text-[#101312] hover:bg-gray-100"
            }`}
          >
            <List className="w-4 h-4" /> Single Locale Editor
          </button>
        </div>
      </div>

      {/* Save message banner */}
      {saveMessage && (
        <div className="p-4 mb-6 rounded-xl text-sm font-semibold shadow-sm" style={{
          background: saveMessage.startsWith("Error")
            ? "rgba(154,106,49,0.12)" : "rgba(214,163,74,0.15)",
          border: "1px solid",
          borderColor: saveMessage.startsWith("Error")
            ? "rgba(154,106,49,0.35)" : "rgba(214,163,74,0.40)",
          color: saveMessage.startsWith("Error") ? "#9A6A31" : "#7A5323",
        }}>
          {saveMessage}
        </div>
      )}

      {/* MATRIX VIEW */}
      {viewMode === "matrix" && (
        <div className="space-y-6">
          {/* Controls toolbar */}
          <div className="card-dark p-4 rounded-2xl border border-[#D6A34A]/25 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-[#101312]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search keys or translated text..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-9 py-1.5 text-xs w-full"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#9A6A31]" />
                <select
                  value={sectionFilter}
                  onChange={(e) => setSectionFilter(e.target.value)}
                  className="form-input px-3 py-1.5 text-xs"
                >
                  <option value="all">All Sections ({Object.keys(matrixData).length})</option>
                  {CONTENT_SECTIONS.map((s) => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadMatrix}
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-[#101312]/70 hover:text-[#101312] transition-colors cursor-pointer"
                title="Refresh Matrix"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={saveAllMatrix}
                disabled={saving || matrixDirtyKeys.size === 0}
                className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" /> Save All Matrix Changes ({matrixDirtyKeys.size})
              </button>
            </div>
          </div>

          {/* Matrix Table */}
          {loading ? (
            <div className="text-[#101312]/60 py-12 text-center font-semibold">Loading 5-language matrix...</div>
          ) : filteredMatrixEntries.length === 0 ? (
            <div className="card-dark p-8 text-center text-[#101312]/60 bg-white border border-[#D6A34A]/25 rounded-2xl">
              No translation keys found matching search or section filter.
            </div>
          ) : (
            <div className="card-dark rounded-2xl border border-[#D6A34A]/25 bg-white shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#FAF8F4] text-[#9A6A31] border-b border-[#D6A34A]/20 uppercase font-mono">
                  <tr>
                    <th className="p-3 min-w-[170px] sticky left-0 bg-[#FAF8F4] z-10 border-r border-[#D6A34A]/20 font-bold">Translation Key</th>
                    {LOCALES.map((l) => (
                      <th key={l.code} className="p-3 min-w-[200px] font-bold">
                        <span className="mr-1.5">{l.flag}</span>{l.label} ({l.code.toUpperCase()})
                      </th>
                    ))}
                    <th className="p-3 w-16 text-right font-bold">Save</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[#101312]">
                  {filteredMatrixEntries.map(([key, data]) => {
                    const isDirty = matrixDirtyKeys.has(key);
                    return (
                      <tr key={key} className={`hover:bg-[#FAF8F4] transition-colors ${isDirty ? "bg-[#D6A34A]/10" : ""}`}>
                        <td className="p-3 font-mono text-[#9A6A31] sticky left-0 bg-white z-10 border-r border-gray-200">
                          <span className="block font-bold truncate max-w-[160px]" title={key}>{key}</span>
                          <span className="text-[10px] text-[#101312]/50 block uppercase font-sans font-semibold mt-0.5">{data.section}</span>
                        </td>
                        {LOCALES.map((l) => (
                          <td key={l.code} className="p-2">
                            <textarea
                              rows={2}
                              value={data.values[l.code] || ""}
                              onChange={(e) => updateMatrixValue(key, l.code, e.target.value)}
                              placeholder={`Translate to ${l.label}...`}
                              className={`w-full p-2.5 rounded-xl border text-xs text-[#101312] bg-white focus:outline-none transition-colors ${
                                l.code === "ar" ? "text-right dir-rtl" : ""
                              } ${
                                !data.values[l.code] ? "border-amber-500/40 bg-amber-50/20" : "border-gray-200 focus:border-[#D6A34A]"
                              }`}
                            />
                          </td>
                        ))}
                        <td className="p-3 text-right vertical-top">
                          <button
                            onClick={() => saveMatrixKey(key)}
                            disabled={!isDirty || saving}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${
                              isDirty ? "bg-[#D6A34A] text-white hover:scale-105 shadow-sm" : "text-gray-300 hover:text-gray-400"
                            }`}
                            title="Save Key Across Languages"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SINGLE LOCALE VIEW */}
      {viewMode === "single" && (
        <>
          {/* Locale selector + actions */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#9A6A31]" />
              <select
                value={selectedLocale}
                onChange={(e) => setSelectedLocale(e.target.value)}
                className="form-input py-2 text-sm max-w-xs font-semibold"
              >
                {LOCALES.map((l) => (
                  <option key={l.code} value={l.code}>{l.flag} {l.label} ({l.code})</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={importDefaults}
                disabled={importing || selectedLocale === "en"}
                className="btn-outline text-sm px-4 py-2 flex items-center gap-2"
              >
                {importing ? "Importing…" : <><Download className="w-4 h-4" /> Import English Defaults</>}
              </button>
              <button
                onClick={saveAllSingle}
                disabled={saving || totalDirty === 0}
                className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
              >
                {saving ? "Saving…" : <><Save className="w-4 h-4" /> Save {totalDirty > 0 && `(${totalDirty})`}</>}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#101312]/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search keys or values…"
              className="form-input pl-10 py-2.5 text-sm"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-[#101312]/60 py-10 text-center font-semibold">Loading content…</div>
          )}

          {/* Sections */}
          {!loading && (
            <div className="space-y-3">
              {CONTENT_SECTIONS.map((section) => {
                const sectionItems = filteredGrouped[section.key];
                if (!sectionItems || sectionItems.length === 0) return null;
                return (
                  <SectionCard
                    key={section.key}
                    section={section}
                    items={sectionItems}
                    isExpanded={expandedSections.has(section.key)}
                    onToggle={() => toggleSection(section.key)}
                    updateValue={updateValue}
                    englishDefaults={englishDefaults}
                    dirtyIds={dirtyIds}
                  />
                );
              })}

              {/* Unknown sections */}
              {Object.entries(filteredGrouped)
                .filter(([key]) => !CONTENT_SECTIONS.some((s) => s.key === key))
                .map(([sectionKey, sectionItems]) => (
                  <SectionCard
                    key={sectionKey}
                    section={{ key: sectionKey, label: sectionKey, desc: "" }}
                    items={sectionItems}
                    isExpanded={expandedSections.has(sectionKey)}
                    onToggle={() => toggleSection(sectionKey)}
                    updateValue={updateValue}
                    englishDefaults={englishDefaults}
                    dirtyIds={dirtyIds}
                  />
                ))}

              {Object.keys(filteredGrouped).length === 0 && !loading && (
                <div className="text-center py-12 text-[#101312]/60 bg-white rounded-2xl border border-[#D6A34A]/25 p-8">
                  <p className="font-semibold text-base">No content found for this locale.</p>
                  <p className="text-sm mt-2 text-[#101312]/60">Click &lsquo;Import English Defaults&rsquo; to create translation keys.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

