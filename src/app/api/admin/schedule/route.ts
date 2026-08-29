import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";

/* GET  /api/admin/schedule?locale=en → list days with nested items
 * POST /api/admin/schedule { action: "createDay"|"updateDay"|"deleteDay"|"createItem"|"updateItem"|"deleteItem", ... }
 */
export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const locale = req.nextUrl.searchParams.get("locale") ?? "en";
  const supabase = createServerClient();

  const { data: days, error: e1 } = await supabase
    .from("event_schedule")
    .select(`
      *,
      items:schedule_items(*)
    `)
    .eq("locale", locale)
    .order("sort_order", { ascending: true });

  if (e1) {
    console.error("[admin/schedule] GET error:", e1.message);
    return NextResponse.json({ success: false, error: e1.message }, { status: 500 });
  }

  // Sort child items by sort_order
  const formattedDays = (days || []).map((d: any) => ({
    ...d,
    items: (d.items || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
  }));

  return NextResponse.json({ success: true, schedule: formattedDays });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = createServerClient();

  // --- Day Actions ---
  if (body.action === "createDay") {
    const { day, title, locale = "en", sort_order = 0 } = body;
    if (!day || !title) return NextResponse.json({ success: false, error: "Missing day or title" }, { status: 400 });

    const { data, error } = await supabase.from("event_schedule").insert({
      day, title, locale, sort_order,
    }).select().single();

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, day: data });
  }

  if (body.action === "updateDay") {
    const { id, day, title, sort_order } = body;
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

    const { data, error } = await supabase.from("event_schedule").update({
      day, title, sort_order, updated_at: new Date().toISOString(),
    }).eq("id", id).select().single();

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, day: data });
  }

  if (body.action === "deleteDay") {
    const { id } = body;
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

    const { error } = await supabase.from("event_schedule").delete().eq("id", id);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  // --- Schedule Item Actions ---
  if (body.action === "createItem") {
    const { schedule_id, description, locale = "en", sort_order = 0 } = body;
    if (!schedule_id || !description) return NextResponse.json({ success: false, error: "Missing schedule_id or description" }, { status: 400 });

    const { data, error } = await supabase.from("schedule_items").insert({
      schedule_id, description, locale, sort_order,
    }).select().single();

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, item: data });
  }

  if (body.action === "updateItem") {
    const { id, description, sort_order } = body;
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

    const { data, error } = await supabase.from("schedule_items").update({
      description, sort_order,
    }).eq("id", id).select().single();

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, item: data });
  }

  if (body.action === "deleteItem") {
    const { id } = body;
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

    const { error } = await supabase.from("schedule_items").delete().eq("id", id);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}

