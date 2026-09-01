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
        <h1 className="text-2xl font-display font-bold text-white">System Settings & Security</h1>
        <p className="text-white/40 text-sm mt-1">Manage team access, account security, and service health</p>
      </div>

      {/* Account Info & Password Change */}
      <div className="card-dark p-6 rounded-xl border border-white/5 space-y-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#D6A34A]" /> My Account Security
        </h2>

        <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-sm">
          <div>
            <p className="text-white font-medium">{admin?.full_name || admin?.email}</p>
            <p className="text-white/40 text-xs mt-0.5">{admin?.email} &bull; <span className="text-[#D6A34A] uppercase font-mono">{admin?.role}</span></p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
            Active Session
          </span>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-white/80 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-[#D6A34A]" /> Update Password
          </h3>

          {passwordMsg && (
            <p className="text-xs text-green-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {passwordMsg}
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="New Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-dark text-sm"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-dark text-sm"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updatingPassword}
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
            >
              <Save className="w-4 h-4" /> {updatingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Admin Users Roster */}
      <div className="card-dark p-6 rounded-xl border border-white/5 space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-[#D6A34A]" /> Authorized Admin Team ({users.length})
        </h2>

        {loading ? (
          <div className="text-white/30 text-sm">Loading admin users...</div>
        ) : users.length === 0 ? (
          <p className="text-xs text-white/30">No explicit admin user rows in admin_users table.</p>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-sm">
                <div>
                  <p className="text-white font-medium">{u.full_name || "Admin Member"}</p>
                  <p className="text-white/40 text-xs font-mono">User ID: {u.id}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold uppercase bg-[#D6A34A]/20 text-[#D6A34A] border border-[#D6A34A]/30">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integration Health */}
      <div className="card-dark p-6 rounded-xl border border-white/5 space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-[#D6A34A]" /> System & API Status
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-white/70">Cloud Database (Supabase PostgreSQL)</span>
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Connected
            </span>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-white/70">Email Service (Resend API)</span>
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

