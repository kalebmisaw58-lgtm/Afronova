import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema, formatZodErrors } from "@/lib/validators";
import { createServerClient } from "@/lib/supabase";
import { sendNewsletterWelcome } from "@/lib/resend";
import { getClientIp, isRateLimited, newsletterRateLimiter } from "@/lib/rate-limit";

// ── Mailchimp subscription helper ────────────────────────────
async function subscribeToMailchimp(email: string): Promise<void> {
  const apiKey   = process.env.MAILCHIMP_API_KEY;
  const listId   = process.env.MAILCHIMP_AUDIENCE_ID;
  const dc       = process.env.MAILCHIMP_DC;

  if (!apiKey || !listId || !dc) {
    console.warn("[newsletter] Mailchimp env vars not set — skipping Mailchimp sync");
    return;
  }

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      tags: ["AfroNova Website", "Africa Celebrates 2026"],
    }),
  });

  // 400 with title "Member Exists" is acceptable — already subscribed
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    if (data?.title !== "Member Exists") {
      console.error("[newsletter] Mailchimp error:", data?.title ?? res.statusText);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate limit ──────────────────────────────────────────
    const ip = getClientIp(req);

    if (await isRateLimited(newsletterRateLimiter, ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ── Validate ────────────────────────────────────────────
    const body   = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: formatZodErrors(parsed.error) },
        { status: 422 }
      );
    }

    const { email, source } = parsed.data;

    // ── Check for duplicate in Supabase ─────────────────────
    const supabase = createServerClient();
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      // Already subscribed — return success silently (don't leak info)
      return NextResponse.json(
        { success: true, message: "You're already on the list!" },
        { status: 200 }
      );
    }

    // ── Save to Supabase ────────────────────────────────────
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, confirmed: true, source: source ?? "website" });

    if (dbError) {
      console.error("[newsletter] Supabase insert error:", dbError.message);
      if (dbError.code === "23505") {
        return NextResponse.json({ success: true, message: "You're already on the list!" });
      }
      return NextResponse.json(
        { success: false, error: "We could not save your subscription. Please try again shortly." },
        { status: 503 }
      );
    }

    // Await the optional sync so serverless runtimes do not discard it early.
    await subscribeToMailchimp(email);

    // ── Send welcome email ──────────────────────────────────
    await sendNewsletterWelcome(email);

    return NextResponse.json(
      { success: true, message: "You're subscribed! Welcome to AfroNova." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[newsletter] Unhandled error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
