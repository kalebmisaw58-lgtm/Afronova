"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createBrowserClient } from "@/lib/supabase";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient();

  // On mount, check for existing session + admin status
  useEffect(() => {
    void checkSession();
  }, []);

  async function checkSession() {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setAdmin(null);
        return;
      }
      // Verify admin status via API
      const res = await fetch("/api/admin/me", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const json = await res.json();
      setAdmin(json.user ?? null);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) {
      return { success: false, error: error?.message ?? "Login failed" };
    }
    // Verify the user has an admin_users record
    const session = data.session;
    if (!session?.access_token) {
      return { success: false, error: "No session token" };
    }
    const res = await fetch("/api/admin/me", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const json = await res.json();
    if (!json.user) {
      await supabase.auth.signOut();
      return { success: false, error: "You do not have admin access" };
    }
    setAdmin(json.user);
    return { success: true };
  }

  async function logout() {
    await supabase.auth.signOut();
    setAdmin(null);
  }

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
