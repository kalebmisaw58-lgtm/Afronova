import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// ── Browser client (public, anon key) ────────────────────────
// Safe to use in Client Components
export function createBrowserClient() {
  if (!supabaseUrl || !supabaseAnon) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createClient(supabaseUrl, supabaseAnon);
}

// ── Server client (service role key) ─────────────────────────
// Only use in API routes / Server Components, never expose to browser
export function createServerClient() {
  if (!supabaseUrl || !supabaseService) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(supabaseUrl, supabaseService, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ── Database types ────────────────────────────────────────────
export type SubmissionStatus = "new" | "reviewed" | "accepted" | "rejected";

export interface ContactSubmission {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string | null;
  inquiry: string | null;
  message: string;
  status: SubmissionStatus;
  ip: string | null;
}

export interface NewsletterSubscriber {
  id?: string;
  created_at?: string;
  email: string;
  confirmed: boolean;
  source: string | null;
}
