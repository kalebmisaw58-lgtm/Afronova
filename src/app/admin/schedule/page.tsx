"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, Edit, Trash2, Save, X, Clock, CheckCircle } from "lucide-react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { LOCALES } from "@/lib/content-sections";

export default function AdminSchedulePage() {
  const { api } = useAdminApi();
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [localeFilter, setLocaleFilter] = useState("en");

  // Day Form state
  const [editingDayId, setEditingDayId] = useState<string | null>(null);
  const [dayForm, setDayForm] = useState({ day: "", title: "", sort_order: 0 });
  const [isCreatingDay, setIsCreatingDay] = useState(false);

  // Item Form state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState({ schedule_id: "", description: "", sort_order: 0 });
  const [creatingItemForDay, setCreatingItemForDay] = useState<string | null>(null);

  useEffect(() => { void loadSchedule(); }, [localeFilter]);

  async function loadSchedule() {
    setLoading(true);
    try {
      const res = await api(`/api/admin/schedule?locale=${localeFilter}`);
      if (res.success) setSchedule(res.schedule ?? []);
    } catch {} finally { setLoading(false); }
  }

  // --- Day Actions ---
  async function handleSubmitDay(e: React.FormEvent) {
    e.preventDefault();
    const action = isCreatingDay ? "createDay" : "updateDay";
    const res = await api("/api/admin/schedule", {
      method: "POST",
      body: JSON.stringify({
        action,
        id: editingDayId,
        day: dayForm.day,
        title: dayForm.title,
        sort_order: dayForm.sort_order,
        locale: localeFilter,
      }),
    });
    if (res.success) {
      resetDayForm();
      void loadSchedule();
    } else {
      alert(res.error ?? "Failed to save schedule day");
    }
  }

  async function handleDeleteDay(id: string) {
    if (!confirm("Delete this entire schedule day and its activities?")) return;
    await api("/api/admin/schedule", {
      method: "POST",
      body: JSON.stringify({ action: "deleteDay", id }),
    });
    void loadSchedule();
  }

  function editDay(d: any) {
    setEditingDayId(d.id);
    setDayForm({ day: d.day, title: d.title, sort_order: d.sort_order ?? 0 });
    setIsCreatingDay(false);
  }

  function resetDayForm() {
    setEditingDayId(null);
    setIsCreatingDay(false);
    setDayForm({ day: "", title: "", sort_order: 0 });
  }

  // --- Item Actions ---
  async function handleSubmitItem(e: React.FormEvent) {
    e.preventDefault();
    const isCreate = creatingItemForDay !== null;
    const action = isCreate ? "createItem" : "updateItem";
    const res = await api("/api/admin/schedule", {
      method: "POST",
      body: JSON.stringify({
        action,
        id: editingItemId,
        schedule_id: isCreate ? creatingItemForDay : itemForm.schedule_id,
        description: itemForm.description,
        sort_order: itemForm.sort_order,
        locale: localeFilter,
      }),
    });
    if (res.success) {
      resetItemForm();
      void loadSchedule();
    } else {
      alert(res.error ?? "Failed to save schedule item");
    }
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Delete this activity item?")) return;
    await api("/api/admin/schedule", {
      method: "POST",
      body: JSON.stringify({ action: "deleteItem", id }),
    });
    void loadSchedule();
  }

  function editItem(item: any) {
    setEditingItemId(item.id);
    setItemForm({ schedule_id: item.schedule_id, description: item.description, sort_order: item.sort_order ?? 0 });
    setCreatingItemForDay(null);
  }

  function resetItemForm() {
    setEditingItemId(null);
    setCreatingItemForDay(null);
    setItemForm({ schedule_id: "", description: "", sort_order: 0 });
  }

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#101312]">Event Schedule Manager</h1>
          <p className="text-[#101312]/50 text-sm mt-1">Manage 6-Day Africa Celebrates 2026 Programme & Activities</p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={localeFilter}
            onChange={(e) => setLocaleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#FAF8F4] border border-[#D6A34A]/25 text-sm text-[#101312] focus:outline-none focus:ring-2 focus:ring-[#D6A34A]"
          >
            {LOCALES.map(l => (
              <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
            ))}
          </select>
          {!isCreatingDay && (
            <button
              onClick={() => { resetDayForm(); setIsCreatingDay(true); }}
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
            >
              <Plus className="w-4 h-4" /> Add Event Day
            </button>
          )}
        </div>
      </div>

      {/* Day Edit/Create Form */}
      {(isCreatingDay || editingDayId) && (
        <form onSubmit={handleSubmitDay} className="card-dark p-6 rounded-xl mb-8 space-y-4 border border-[#D6A34A]/30">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#101312]">
              {isCreatingDay ? "Add New Event Day" : "Edit Event Day"}
            </h2>
            <button type="button" onClick={resetDayForm} className="text-[#101312]/50 hover:text-[#101312]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <input type="text" placeholder="Day (e.g. Day 1 - Nov 10)" value={dayForm.day}
              onChange={(e) => setDayForm({ ...dayForm, day: e.target.value })} className="input-dark" required />

            <input type="text" placeholder="Day Title (e.g. Opening Ceremony & Gala)" value={dayForm.title}
              onChange={(e) => setDayForm({ ...dayForm, title: e.target.value })} className="input-dark" required />

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#101312]/60 shrink-0">Sort Order:</span>
              <input type="number" value={dayForm.sort_order}
                onChange={(e) => setDayForm({ ...dayForm, sort_order: parseInt(e.target.value) || 0 })} className="input-dark w-full" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={resetDayForm} className="px-4 py-2 text-sm text-[#101312]/60 hover:text-[#101312]">Cancel</button>
            <button type="submit" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
              <Save className="w-4 h-4" /> {isCreatingDay ? "Create Day" : "Save Day"}
            </button>
          </div>
        </form>
      )}

      {/* Schedule Days List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-[#101312]/50">Loading schedule...</div>
        ) : schedule.length === 0 ? (
          <div className="card-dark p-8 text-center text-[#101312]/50 rounded-xl">
            No schedule days configured for {localeFilter.toUpperCase()}. Click &quot;Add Event Day&quot; above to create one!
          </div>
        ) : (
          schedule.map((day) => (
            <div key={day.id} className="card-dark p-6 rounded-xl border border-[#D6A34A]/25 space-y-4">
              <div className="flex items-center justify-between border-b border-[#D6A34A]/25 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#D6A34A] uppercase tracking-wider">{day.day}</span>
                  <h2 className="text-xl font-display font-bold text-[#101312] mt-0.5">{day.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { resetItemForm(); setCreatingItemForDay(day.id); }}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-white/20 text-xs font-medium text-[#101312] flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D6A34A]" /> Add Activity
                  </button>
                  <button onClick={() => editDay(day)} className="p-1.5 text-[#101312]/50 hover:text-[#101312] rounded" title="Edit Day">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteDay(day.id)} className="p-1.5 text-[#101312]/50 hover:text-red-400 rounded" title="Delete Day">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add Activity Item Form for this Day */}
              {(creatingItemForDay === day.id || (editingItemId && itemForm.schedule_id === day.id)) && (
                <form onSubmit={handleSubmitItem} className="p-4 rounded-lg bg-white border border-[#D6A34A]/25 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#D6A34A]">
                      {creatingItemForDay === day.id ? `New Activity for ${day.title}` : "Edit Activity Item"}
                    </span>
                    <button type="button" onClick={resetItemForm} className="text-[#101312]/50 hover:text-[#101312]"><X className="w-4 h-4" /></button>
                  </div>
                  <input
                    type="text"
                    placeholder="Activity Description (e.g. Grand Opening Gala & Welcome Reception)"
                    value={itemForm.description}
                    onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                    className="input-dark w-full text-xs"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={resetItemForm} className="text-xs text-[#101312]/50 hover:text-[#101312] px-2 py-1">Cancel</button>
                    <button type="submit" className="btn-primary text-xs px-3 py-1">Save Activity</button>
                  </div>
                </form>
              )}

              {/* Activities List under Day */}
              <div className="space-y-2">
                {!day.items || day.items.length === 0 ? (
                  <p className="text-xs text-[#101312]/50 italic">No activity items added to this day yet.</p>
                ) : (
                  day.items.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F4] border border-[#D6A34A]/25 text-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-[#D6A34A] shrink-0" />
                        <span className="text-[#101312]/80">{item.description}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => editItem(item)} className="p-1 text-[#101312]/50 hover:text-[#101312] rounded"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteItem(item.id)} className="p-1 text-[#101312]/50 hover:text-red-400 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

