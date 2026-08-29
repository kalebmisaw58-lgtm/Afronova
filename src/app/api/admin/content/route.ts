import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";

/**
 * Admin content API.
 *
 * GET  /api/admin/content?locale=en          → list all content rows
 * POST /api/admin/content    { locale, key, value, section }  → upsert one
 * POST /api/admin/content/bulk { locale, items: [...] }       → bulk upsert
 */

export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const isMatrix = req.nextUrl.searchParams.get("matrix") === "true";
  const locale = req.nextUrl.searchParams.get("locale") ?? "en";
  const supabase = createServerClient();

  if (isMatrix) {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("section")
      .order("key");

    if (error) {
      console.error("[admin/content] Matrix GET error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, items: data || [] });
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("locale", locale)
    .order("section")
    .order("key");

  if (error) {
    console.error("[admin/content] GET error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, items: data });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { action, locale, items, ...item } = body;
  const supabase = createServerClient();

  // Batch upsert across multiple locales for a single key
  if (action === "batchUpsertKey" && body.key && body.values) {
    const section = body.section || "general";
    const rows = Object.entries(body.values).map(([loc, val]) => ({
      locale: loc,
      key: body.key,
      value: String(val ?? ""),
      section,
    }));

    const { error } = await supabase.from("site_content").upsert(rows, {
      onConflict: "locale,key",
    });

    if (error) {
      console.error("[admin/content] batchUpsertKey error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, count: rows.length });
  }

  // Bulk upsert for single locale
  if (action === "bulk" && locale && Array.isArray(items)) {
    const rows = items.map((i: any) => ({
      locale,
      key: i.key,
      value: i.value ?? "",
      section: i.section ?? "general",
    }));
    const { error } = await supabase.from("site_content").upsert(rows, {
      onConflict: "locale,key",
    });
    if (error) {
      console.error("[admin/content] bulk error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, count: rows.length });
  }

  // Single upsert
  if (item.locale && item.key) {
    const { error } = await supabase.from("site_content").upsert({
      locale: item.locale,
      key: item.key,
      value: item.value ?? "",
      section: item.section ?? "general",
    }, { onConflict: "locale,key" });

    if (error) {
      console.error("[admin/content] upsert error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
}
