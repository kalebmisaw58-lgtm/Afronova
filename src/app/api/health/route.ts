import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = process.env.HEALTHCHECK_TOKEN;
  if (token && req.headers.get("authorization") !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const checks: Record<string, string> = {};

  // ── Supabase ────────────────────────────────────────────────
  try {
    const supabase = createServerClient();
    const { error } = await supabase
      .from("contact_submissions")
      .select("id")
      .limit(1);
    checks.supabase = error ? "unavailable" : "ok";
  } catch {
    checks.supabase = "unreachable";
  }

  // ── Resend ──────────────────────────────────────────────────
  checks.resend = process.env.RESEND_API_KEY ? "configured" : "missing key";

  // ── Mailchimp ───────────────────────────────────────────────
  checks.mailchimp =
    process.env.MAILCHIMP_API_KEY &&
    process.env.MAILCHIMP_AUDIENCE_ID &&
    process.env.MAILCHIMP_DC
      ? "configured"
      : "missing keys";

  // Mailchimp sync is optional; contact persistence and email are required.
  const allOk = checks.supabase === "ok" && checks.resend === "configured";

  return NextResponse.json({ status: allOk ? "healthy" : "degraded" }, { status: allOk ? 200 : 503 });
}
