import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "png";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const supabase = createServerClient();
    const { data, error } = await supabase.storage
      .from("portfolio")
      .upload(filename, buffer, {
        contentType: file.type || "image/png",
        upsert: true,
      });

    if (error) {
      console.error("[upload] storage error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("portfolio").getPublicUrl(filename);
    return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
  } catch (err: any) {
    console.error("[upload] exception:", err.message);
    return NextResponse.json({ success: false, error: err.message || "Upload failed" }, { status: 500 });
  }
}
