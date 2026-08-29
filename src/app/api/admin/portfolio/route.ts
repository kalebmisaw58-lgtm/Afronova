import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";
import { z } from "zod";

/* GET  /api/admin/portfolio?locale=en  → list
 * POST /api/admin/portfolio { action:"create"|"update"|"delete", id?, item? }

   Portfolio items map to the DB-backed "portfolio_items" table
   (locale, slug, title, subtitle, excerpt, year, category, accent, sort_order, published)
   Images are managed via content keys prefixed "pf_".
 */

const PortfolioSchema = z.object({
  locale: z.enum(["en", "am", "fr", "pt", "ar"]).default("en"),
  slug: z.string().min(1),
  category: z.enum(["event", "recap", "production", "campaign", "publication"]).default("event"),
  title: z.string().min(1),
  subtitle: z.string().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  accent: z.string().default("#D6A34A"),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const locale = req.nextUrl.searchParams.get("locale") ?? "en";
  const supabase = createServerClient();

  const { data: portfolio, error: e1 } = await supabase
    .from("portfolio_items").select("*")
    .eq("locale", locale).order("sort_order");
  if (e1) return NextResponse.json({ success: false, error: e1.message }, { status: 500 });

  // also fetch DB-stored content keys that look like they belong to portfolio images
  const { data: imageKeys, error: e2 } = await supabase
    .from("site_content").select("key,value,section")
    .eq("locale", locale).like("key", "pf_%")
    .order("section").order("key");
  if (e2) return NextResponse.json({ success: false, error: e2.message }, { status: 500 });

  return NextResponse.json({ success: true, portfolio, imageKeys });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = createServerClient();

  // --- Update an image URL content key ---
  if (body.action === "updateImage") {
    const { key, value, locale = "en", section = "portfolio" } = body;
    if (!key) return NextResponse.json({ success: false, error: "Missing key" }, { status: 400 });
    const { data, error } = await supabase.from("site_content").upsert({
      locale, key, value: value ?? "", section,
    }, { onConflict: "locale,key" }).select().single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, item: data });
  }

  // --- CRUD for portfolio_items rows ---
  if (body.action === "create") {
    const parsed = PortfolioSchema.safeParse(body.item);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.message }, { status: 400 });
    const { data, error } = await supabase.from("portfolio_items").insert(parsed.data).select().single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, item: data });
  }

  if (body.action === "update") {
    const parsed = PortfolioSchema.safeParse(body.item);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.message }, { status: 400 });
    const { data, error } = await supabase.from("portfolio_items").update(parsed.data).eq("id", body.id).select().single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, item: data });
  }

  if (body.action === "delete") {
    const { error } = await supabase.from("portfolio_items").delete().eq("id", body.id);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}