"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown, ChevronRight, Save, Download, Search, Globe,
} from "lucide-react";
import { ContentItem, CONTENT_SECTIONS, LOCALES } from "@/lib/content-sections";
import SectionCard from "@/components/admin/SectionCard";

type GroupedItems = Record<string, ContentItem[]>;

export default function ContentManagerPage() {
  const [selectedLocale, setSelectedLocale] = useState("en");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [originalValues, setOriginalValues] = useState<Map<string, string>>(new Map());
  const [englishDefaults, setEnglishDefaults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(CONTENT_SECTIONS.map((s) => s.key))
  );
  const [saveMessage, setSaveMessage] = useState("");

  // Load English defaults for reference column
  useEffect(() => {
    fetch("/api/content?locale=en")
      .then((r) => r.json())
      .then((json) => {
        if (json.translations) setEnglishDefaults(json.translations);
      })
      .catch(() => {});
  }, []);

  // Load content when locale changes
  useEffect(() => {
    loadContent(selectedLocale);
  }, [selectedLocale]);

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

  async function getAccessToken(): Promise<string | null> {
    const { createBrowserClient } = await import("@/lib/supabase");
    const supabase = createBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token ?? null;
  }

  function updateValue(id: string, newValue: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
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

  async function saveAll() {
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
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Website Content</h1>
        <p className="text-white/45 text-sm mt-1">
          Edit all UI text strings for the {selectedLocale} locale
        </p>
      </div>

      {/* Locale selector + actions */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-white/40" />
          <select
            value={selectedLocale}
            onChange={(e) => setSelectedLocale(e.target.value)}
            className="form-input py-2 text-sm"
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
            onClick={saveAll}
            disabled={saving || totalDirty === 0}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            {saving ? "Saving…" : <><Save className="w-4 h-4" /> Save {totalDirty > 0 && `(${totalDirty})`}</>}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search keys or values…"
          className="form-input pl-10 py-2.5 text-sm"
        />
      </div>

      {/* Save message */}
      {saveMessage && (
        <div className="p-3 mb-4 rounded-xl text-sm" style={{
          background: saveMessage.startsWith("Error")
            ? "rgba(154,106,49,0.12)" : "rgba(214,163,74,0.12)",
          border: "1px solid",
          borderColor: saveMessage.startsWith("Error")
            ? "rgba(154,106,49,0.35)" : "rgba(214,163,74,0.35)",
          color: saveMessage.startsWith("Error") ? "#F0D49A" : "#D6A34A",
        }}>
          {saveMessage}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-white/40 py-10 text-center">Loading content…</div>
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

          {/* Unknown sections (not in known list) */}
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
            <div className="text-center py-12 text-white/40">
              <p>No content found for this locale.</p>
                             <p className="text-sm mt-2">Click &lsquo;Import English Defaults&rsquo; to create translation keys.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
