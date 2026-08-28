import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";

/** GET /api/admin/stats — quick counts for the dashboard */
export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerClient();

  const [contentCount, newsCount, partnersCount, testimonialsCount] = await Promise.all([
    supabase.from("site_content").select("*", { count: "exact", head: true }),
    supabase.from("news_articles").select("*", { count: "exact", head: true }),
    supabase.from("partners").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
  ]);

  const stats = {
    contentStrings: contentCount.count ?? 0,
    newsArticles: newsCount.count ?? 0,
    partners: partnersCount.count ?? 0,
    testimonials: testimonialsCount.count ?? 0,
  };

  return NextResponse.json({ success: true, stats });
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
