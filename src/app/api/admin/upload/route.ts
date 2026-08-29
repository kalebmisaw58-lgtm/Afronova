import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";

/* POST /api/admin/upload
 * Form-data with file field "file"
 * Uploads local image file to Supabase Storage bucket "portfolio"
 * and returns the public CDN URL.
 */
export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File size exceeds 10MB limit" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const filename = `portfolio-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;

    const supabase = createServerClient();
    const bucketName = "portfolio";

    // Attempt upload
    let uploadRes = await supabase.storage
      .from(bucketName)
      .upload(filename, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    // If bucket doesn't exist, try creating it as public
    if (uploadRes.error && (uploadRes.error.message.includes("not found") || uploadRes.error.message.includes("Bucket"))) {
      await supabase.storage.createBucket(bucketName, { public: true });
      uploadRes = await supabase.storage
        .from(bucketName)
        .upload(filename, buffer, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });
    }

    if (uploadRes.error) {
      console.error("[admin/upload] Supabase storage upload error:", uploadRes.error.message);
      return NextResponse.json({ success: false, error: uploadRes.error.message }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filename);
    const url = publicUrlData.publicUrl;

    return NextResponse.json({ success: true, url, filename });
  } catch (err: any) {
    console.error("[admin/upload] Server error:", err?.message || err);
    return NextResponse.json({ success: false, error: err?.message || "Failed to upload file" }, { status: 500 });
  }
}
