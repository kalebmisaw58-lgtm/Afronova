import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";

/**
 * Import English defaults for a target locale.
 * Looks at all English site_content rows, and for the requested
 * locale creates entries with the English value as a starting
 * point (so translators have something to work from).
 *
 * POST /api/admin/content/import { locale: "fr" }
 */
export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const locale: string = body.locale;
  if (!locale) {
    return NextResponse.json({ success: false, error: "locale is required" }, { status: 400 });
  }

  const supabase = createServerClient();

  // 1. Get all English keys
  const { data: enRows, error: enError } = await supabase
    .from("site_content")
    .select("key, value, section")
    .eq("locale", "en");

  if (enError) {
    return NextResponse.json({ success: false, error: enError.message }, { status: 500 });
  }

  // 2. Check which keys already exist for the target locale
  const { data: existing } = await supabase
    .from("site_content")
    .select("key")
    .eq("locale", locale);

  const existingKeys = new Set(existing?.map((r) => r.key) ?? []);

  // 3. Build upsert rows for missing keys only
  const newRows = enRows
    .filter((row) => !existingKeys.has(row.key))
    .map((row) => ({
      locale,
      key: row.key,
      value: row.value,     // copy English as starting point
      section: row.section,
    }));

  if (newRows.length === 0) {
    return NextResponse.json({ success: true, imported: 0, existing: existingKeys.size });
  }

  const { error: upsertError } = await supabase
    .from("site_content")
    .upsert(newRows, { onConflict: "locale,key" });

  if (upsertError) {
    return NextResponse.json({ success: false, error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    imported: newRows.length,
    message: `Imported ${newRows.length} strings from English defaults for locale '${locale}'.`,
  });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
