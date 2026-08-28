import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

/** GET /api/content?locale=en
 * Returns all site_content for the requested locale as a flat
 * { key: value } object (ready to drop into LanguageContext).
 * Falls back to an empty object — the client always has hardcoded
 * fallback strings.
 */
export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") ?? "en";

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("key, value")
    .eq("locale", locale);

  if (error) {
    console.error("[api/content] query error:", error.message);
    return NextResponse.json({ success: false, error: "Failed to load content." }, { status: 500 });
  }

  // Convert [{ key, value }, …] → { key: value, … }
  const translations = Object.fromEntries(data.map((row) => [row.key, row.value]));

  return NextResponse.json({ success: true, locale, translations });
}
