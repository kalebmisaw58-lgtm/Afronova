import { useAdmin } from "@/context/AdminContext";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase";

/**
 * Lightweight hook that returns an authenticated fetch wrapper
 * for admin API calls. It automatically injects the Supabase
 * access token as a Bearer header.
 */
export function useAdminApi() {
  const { admin } = useAdmin();

  const api = async (path: string, options: RequestInit = {}) => {
    const supabase = typeof window !== "undefined"
      ? createBrowserClient()
      : null;

    let token = "";
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      token = session?.access_token ?? "";
    }

    const headers = new Headers(options.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (!headers.has("Content-Type") && options.body) headers.set("Content-Type", "application/json");

    const res = await fetch(path, { ...options, headers });
    if (!res.ok && res.status === 401) {
      // Token might have expired; you could trigger a re-check here
    }
    return res.json();
  };

  return { api, admin };
}

/**
 * Simple data-fetcher hook for admin pages.
 */
export function useAdminData<T>(url: string) {
  const { api } = useAdminApi();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    if (!url) return;
    setLoading(true);
    try {
      const json = await api(url);
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, [url]);

  return { data, loading, error, refetch: () => { void loadData(); } };
}