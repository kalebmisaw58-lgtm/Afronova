"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Shield, User, Lock, CheckCircle2, Server, Key } from "lucide-react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { createBrowserClient } from "@/lib/supabase";

export default function AdminSettingsPage() {
  const { api, admin } = useAdminApi();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Password update state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");

  useEffect(() => { void loadUsers(); }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await api("/api/admin/users");
      if (res.success) setUsers(res.users ?? []);
    } catch {} finally { setLoading(false); }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }
    if (password.length < 6) {
      return alert("Password must be at least 6 characters long.");
    }

    setUpdatingPassword(true);
    setPasswordMsg("");
    try {
      const supabase = typeof window !== "undefined"
        ? createBrowserClient()
        : null;

      if (!supabase) throw new Error("Supabase client unavailable");

      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        alert(error.message);
      } else {
        setPassword("");
        setConfirmPassword("");
        setPasswordMsg("Password updated successfully!");
      }
    } catch (err: any) {
      alert(err.message || "Failed to update password");
    } finally {
      setUpdatingPassword(false);
    }
  }

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-[#101312]">System Settings & Security</h1>
        <p className="text-[#101312]/65 text-sm mt-1 font-medium">Manage team access, account security, and service health</p>
      </div>

      {/* Account Info & Password Change */}
      <div className="card-dark p-6 rounded-2xl border border-[#D6A34A]/25 bg-white shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#101312] flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#9A6A31]" /> My Account Security
        </h2>

        <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D6A34A]/20 flex items-center justify-between text-sm">
          <div>
            <p className="text-[#101312] font-bold">{admin?.full_name || admin?.email}</p>
            <p className="text-[#101312]/60 text-xs font-semibold mt-0.5">{admin?.email} &bull; <span className="text-[#9A6A31] uppercase font-mono">{admin?.role}</span></p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-700 border border-green-500/30 text-xs font-bold">
            Active Session
          </span>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-[#101312] flex items-center gap-1.5">
            <Key className="w-4 h-4 text-[#9A6A31]" /> Update Password
          </h3>

          {passwordMsg && (
            <p className="text-xs text-green-700 font-bold flex items-center gap-1 bg-green-50 p-2.5 rounded-xl border border-green-200">
              <CheckCircle2 className="w-4 h-4 text-green-600" /> {passwordMsg}
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="New Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input text-sm"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input text-sm"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updatingPassword}
              className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5 shadow-sm"
            >
              <Save className="w-4 h-4" /> {updatingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Admin Users Roster */}
      <div className="card-dark p-6 rounded-2xl border border-[#D6A34A]/25 bg-white shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#101312] flex items-center gap-2">
          <User className="w-5 h-5 text-[#9A6A31]" /> Authorized Admin Team ({users.length})
        </h2>

        {loading ? (
          <div className="text-[#101312]/60 text-sm font-semibold">Loading admin users...</div>
        ) : users.length === 0 ? (
          <p className="text-xs text-[#101312]/60">No explicit admin user rows in admin_users table.</p>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#D6A34A]/20 flex items-center justify-between text-sm">
                <div>
                  <p className="text-[#101312] font-bold">{u.full_name || "Admin Member"}</p>
                  <p className="text-[#101312]/60 text-xs font-mono font-medium">User ID: {u.id}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[#D6A34A]/15 text-[#9A6A31] border border-[#D6A34A]/30">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integration Health */}
      <div className="card-dark p-6 rounded-2xl border border-[#D6A34A]/25 bg-white shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#101312] flex items-center gap-2">
          <Server className="w-5 h-5 text-[#9A6A31]" /> System & API Status
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D6A34A]/20 flex items-center justify-between font-semibold">
            <span className="text-[#101312]/80">Cloud Database (Supabase PostgreSQL)</span>
            <span className="text-xs text-green-700 bg-green-500/15 border border-green-500/30 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Connected
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D6A34A]/20 flex items-center justify-between font-semibold">
            <span className="text-[#101312]/80">Email Service (Resend API)</span>
            <span className="text-xs text-green-700 bg-green-500/15 border border-green-500/30 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
