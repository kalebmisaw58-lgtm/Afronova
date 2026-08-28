import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";

/** GET /api/admin/me
 *  Returns the current admin user or null.
 */
export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);

  if (!admin) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user: admin.adminUser });
}

// Reject non-GET
export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
