"use client";

import { Settings, Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Settings</h1>
      </div>
      <div className="card-dark p-8 border border-white/5 rounded-xl space-y-6">
        <div>
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Admin Users
          </h3>
          <p className="text-white/40 text-sm">
            Manage who can access the admin dashboard. User accounts are created
            in Supabase Auth and granted admin access via the admin_users table.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">API Configuration</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-white/40">Resend:</span>
              <span style={{ color: process.env.NEXT_PUBLIC_RESEND_STATUS ?? "#D6A34A" }}>
                {process.env.NEXT_PUBLIC_RESEND_STATUS ?? "configured"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/40">Supabase:</span>
              <span style={{ color: "#10b981" }}>connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
