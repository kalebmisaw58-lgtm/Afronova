import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";

/* GET  /api/admin/inquiries → returns contact_submissions and newsletter_subscribers
 * POST /api/admin/inquiries { action: "updateStatus"|"deleteContact"|"deleteSubscriber", id, status? }
 */
export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerClient();

  const [resContacts, resSubscribers] = await Promise.all([
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
    supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
  ]);

  if (resContacts.error) {
    console.error("[admin/inquiries] contacts query error:", resContacts.error.message);
    return NextResponse.json({ success: false, error: resContacts.error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    contacts: resContacts.data || [],
    subscribers: resSubscribers.data || [],
  });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = createServerClient();

  if (body.action === "updateStatus") {
    const { id, status } = body;
    if (!id || !status) return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });

    const { data, error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, contact: data });
  }

  if (body.action === "deleteContact") {
    const { id } = body;
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.action === "deleteSubscriber") {
    const { id } = body;
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

    const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}

