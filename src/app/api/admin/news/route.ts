import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";
import { z } from "zod";

/* GET  /api/admin/news?locale=en             → list articles
 * POST /api/admin/news
 *   { action:"create"|"update"|"delete", article?, id? }  → mutate
 */

const ArticleSchema = z.object({
  slug: z.string().min(1),
  locale: z.enum(["en", "am", "fr", "pt", "ar"]).default("en"),
  category: z.enum(["event", "partnership", "business", "recap", "production"]).default("event"),
  article_date: z.string().nullable().optional(),
  read_time: z.string().nullable().optional(),
  title: z.string().min(1),
  excerpt: z.string().nullable().optional(),
  paragraphs: z.array(z.string()),
  published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const locale = req.nextUrl.searchParams.get("locale") ?? "all";
  const supabase = createServerClient();

  let query = supabase.from("news_articles").select("*").order("sort_order");
  if (locale !== "all") query = query.eq("locale", locale);

  const { data, error } = await query;
  if (error) {
    console.error("[admin/news] GET error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, articles: data });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = createServerClient();

  if (body.action === "create") {
    const parsed = ArticleSchema.safeParse(body.article);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.message }, { status: 400 });
    const { data, error } = await supabase.from("news_articles").insert(parsed.data).select().single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, article: data });
  }

  if (body.action === "update") {
    const parsed = ArticleSchema.safeParse(body.article);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.message }, { status: 400 });
    const { data, error } = await supabase.from("news_articles").update(parsed.data).eq("id", body.id).select().single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, article: data });
  }

  if (body.action === "delete") {
    const { error } = await supabase.from("news_articles").delete().eq("id", body.id);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}