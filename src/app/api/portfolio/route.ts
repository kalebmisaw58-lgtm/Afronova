import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const revalidate = 0; // Disable static caching so fresh uploads appear immediately

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") ?? "en";
  const supabase = createServerClient();

  try {
    // 1. Fetch site_content rows for portfolio image keys (pf_%)
    const { data: content, error: e1 } = await supabase
      .from("site_content")
      .select("key, value, locale")
      .like("key", "pf_%");

    // 2. Fetch portfolio_items
    const { data: items, error: e2 } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    const imageMap: Record<string, string> = {};
    if (content && !e1) {
      content.forEach((row) => {
        if (row.value && (row.value.startsWith("http") || row.value.startsWith("/"))) {
          if (!imageMap[row.key] || row.locale === locale) {
            imageMap[row.key] = row.value;
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      imageMap,
      items: items ?? [],
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
