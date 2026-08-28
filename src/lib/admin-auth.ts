import { NextRequest } from "next/server";
import { supabaseUrl, createServerClient } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
}

const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Verify the bearer token from the request and check whether the
 * authenticated user has an admin_users record.
 * Returns { user, adminUser } or null if not authorised.
 */
export async function getAdminUser(req: NextRequest): Promise<{
  user: { id: string; email: string };
  adminUser: AdminUser;
} | null> {
  const authHeader = req.headers.get("authorization")?.match(/Bearer\s+(.*)/)?.[1];
  if (!authHeader) return null;

  // Verify the token using a client configured with the anon key
  // and the user's access token injected via global headers.
  const tokenClient = createClient(
    supabaseUrl,
    supabaseAnonKey,
    { global: { headers: { Authorization: `Bearer ${authHeader}` } } }
  );

  const { data: { user }, error: authError } = await tokenClient.auth.getUser();
  if (authError || !user) return null;

  // Look up the admin_users table (service-role client bypasses RLS)
  const adminClient = createServerClient();
  const { data: adminRecord, error: adminError } = await adminClient
    .from("admin_users")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();

    if (adminError || !adminRecord) return null;

  return {
    user: { id: user.id, email: user.email ?? "" },
    adminUser: {
      id: user.id,
      email: user.email ?? "",
      full_name: adminRecord.full_name ?? null,
      role: adminRecord.role ?? "editor",
    },
  };
}
