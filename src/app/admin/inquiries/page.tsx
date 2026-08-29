"use client";

import { useState, useEffect } from "react";
import { Mail, Users, Download, Trash2, CheckCircle, Clock, AlertCircle, Send, MessageSquare } from "lucide-react";
import { useAdminApi } from "@/hooks/useAdminApi";

export default function AdminInquiriesPage() {
  const { api } = useAdminApi();
  const [contacts, setContacts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"contacts" | "subscribers">("contacts");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { void loadData(); }, []);

  async function loadData() {
    setLoading(true);
    try {
      const res = await api("/api/admin/inquiries");
      if (res.success) {
        setContacts(res.contacts ?? []);
        setSubscribers(res.subscribers ?? []);
      }
    } catch {} finally { setLoading(false); }
  }

  async function handleStatusChange(id: string, status: string) {
    const res = await api("/api/admin/inquiries", {
      method: "POST",
      body: JSON.stringify({ action: "updateStatus", id, status }),
    });
    if (res.success) void loadData();
    else alert(res.error ?? "Failed to update status");
  }

  async function handleDeleteContact(id: string) {
    if (!confirm("Delete this submission?")) return;
    await api("/api/admin/inquiries", {
      method: "POST",
      body: JSON.stringify({ action: "deleteContact", id }),
    });
    void loadData();
  }

  async function handleDeleteSubscriber(id: string) {
    if (!confirm("Remove subscriber?")) return;
    await api("/api/admin/inquiries", {
      method: "POST",
      body: JSON.stringify({ action: "deleteSubscriber", id }),
    });
    void loadData();
  }

  function exportSubscribersCSV() {
    if (subscribers.length === 0) return alert("No subscribers to export");
    const headers = "Email,Confirmed,Source,Signed Up At\n";
    const rows = subscribers.map(s => `"${s.email}",${s.confirmed},"${s.source || "website"}","${s.created_at}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `afronova-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  }

  const filteredContacts = statusFilter === "all"
    ? contacts
    : contacts.filter(c => c.status === statusFilter);

  const newCount = contacts.filter(c => c.status === "new").length;

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Inquiries & Leads</h1>
          <p className="text-white/40 text-sm mt-1">Review contact form submissions and newsletter subscribers</p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "subscribers" && (
            <button
              onClick={exportSubscribersCSV}
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-white/10 mb-8">
        <button
          onClick={() => setActiveTab("contacts")}
          className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "contacts" ? "border-[#D6A34A] text-[#D6A34A]" : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Contact Messages ({contacts.length})
          {newCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-[#D6A34A] text-black font-bold">
              {newCount} new
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("subscribers")}
          className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "subscribers" ? "border-[#D6A34A] text-[#D6A34A]" : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          <Mail className="w-4 h-4" /> Newsletter Subscribers ({subscribers.length})
        </button>
      </div>

      {/* Contacts Tab */}
      {activeTab === "contacts" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">Status filter:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-white"
              >
                <option value="all">All Statuses ({contacts.length})</option>
                <option value="new">New ({newCount})</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-white/30">Loading contact submissions...</div>
          ) : filteredContacts.length === 0 ? (
            <div className="card-dark p-8 text-center text-white/30 rounded-xl">
              No contact submissions found matching this filter.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((c) => (
                <div key={c.id} className="card-dark p-6 rounded-xl border border-white/5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-white text-base">{c.name}</span>
                        {c.inquiry && (
                          <span className="text-xs px-2.5 py-0.5 rounded bg-white/10 text-[#D6A34A] font-medium">
                            {c.inquiry}
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                          c.status === "new" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                          c.status === "accepted" ? "bg-green-500/20 text-green-400" :
                          c.status === "rejected" ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/60"
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span>{c.email}</span>
                        {c.phone && <span>&bull; {c.phone}</span>}
                        <span>&bull; {new Date(c.created_at).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className="px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-white"
                      >
                        <option value="new">Mark New</option>
                        <option value="reviewed">Mark Reviewed</option>
                        <option value="accepted">Mark Accepted</option>
                        <option value="rejected">Mark Rejected</option>
                      </select>

                      <a
                        href={`mailto:${c.email}?subject=Re: AfroNova Inquiry - ${c.inquiry || "General"}`}
                        className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
                        title="Reply via Email"
                      >
                        <Send className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDeleteContact(c.id)}
                        className="p-1.5 rounded text-white/30 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-black/30 border border-white/5 text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                    {c.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === "subscribers" && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-white/30">Loading subscribers...</div>
          ) : subscribers.length === 0 ? (
            <div className="card-dark p-8 text-center text-white/30 rounded-xl">
              No newsletter subscribers yet.
            </div>
          ) : (
            <div className="card-dark rounded-xl overflow-hidden border border-white/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-xs text-white/40 uppercase font-mono">
                  <tr>
                    <th className="px-6 py-3">Email Address</th>
                    <th className="px-6 py-3">Source</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Signed Up Date</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {subscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{s.email}</td>
                      <td className="px-6 py-4 text-xs font-mono text-white/50">{s.source || "website"}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-white/40">{new Date(s.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteSubscriber(s.id)}
                          className="p-1.5 text-white/30 hover:text-red-400 rounded"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

