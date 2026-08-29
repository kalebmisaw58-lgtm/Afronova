import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";
import { z } from "zod";

/* GET  /api/admin/testimonials?locale=en  → list
 * POST /api/admin/testimonials { action, id?, testimonial? } → create/update/delete
 */

const TestimonialSchema = z.object({
  locale: z.enum(["en", "am", "fr", "pt", "ar"]).default("en"),
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().optional().nullable(),
  organisation: z.string().optional().nullable(),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const locale = req.nextUrl.searchParams.get("locale") ?? "all";
  const supabase = createServerClient();

  let query = supabase.from("testimonials").select("*").order("sort_order");
  if (locale !== "all") query = query.eq("locale", locale);

  const { data, error } = await query;
  if (error) {
    console.error("[admin/testimonials] GET error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, testimonials: data });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = createServerClient();

  if (body.action === "create") {
    const parsed = TestimonialSchema.safeParse(body.testimonial);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.message }, { status: 400 });
    const { data, error } = await supabase.from("testimonials").insert(parsed.data).select().single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, testimonial: data });
  }

  if (body.action === "update") {
    const parsed = TestimonialSchema.safeParse(body.testimonial);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.message }, { status: 400 });
    const { data, error } = await supabase.from("testimonials").update(parsed.data).eq("id", body.id).select().single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, testimonial: data });
  }

  if (body.action === "delete") {
    const { error } = await supabase.from("testimonials").delete().eq("id", body.id);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}