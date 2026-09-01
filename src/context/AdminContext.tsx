"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
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

// Inactivity timeout: 15 minutes (in milliseconds)
const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const lastActivityRef = useRef<number>(Date.now());
  const router = useRouter();

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

  // ── Auto-logout timer for inactivity ───────────────────────
  useEffect(() => {
    if (!admin) return;

    // Reset timer on any user activity
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];
    events.forEach((evt) => window.addEventListener(evt, updateActivity, { passive: true }));

    // Periodically check if idle time exceeded threshold
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActivityRef.current;
      if (idleTime >= INACTIVITY_TIMEOUT_MS) {
        void handleAutoLogout();
      }
    }, 5000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, updateActivity));
      clearInterval(interval);
    };
  }, [admin]);

  async function handleAutoLogout() {
    await logout();
    router.replace("/admin/login?reason=inactivity");
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
    lastActivityRef.current = Date.now();
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

