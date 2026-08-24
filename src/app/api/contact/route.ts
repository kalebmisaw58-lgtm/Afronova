import { NextRequest, NextResponse } from "next/server";
import { contactSchema, formatZodErrors } from "@/lib/validators";
import { sendContactEmail } from "@/lib/resend";
import { createServerClient } from "@/lib/supabase";
import { contactRateLimiter, getClientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ───────────────────────────────────────
    const ip = getClientIp(req);

    if (await isRateLimited(contactRateLimiter, ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a few minutes and try again." },
        { status: 429 }
      );
    }

    // ── Parse & validate ────────────────────────────────────
    const body   = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: formatZodErrors(parsed.error) },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // ── Save to Supabase ────────────────────────────────────
    const supabase = createServerClient();
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name:    data.name,
        email:   data.email,
        phone:   data.phone   || null,
        inquiry: data.inquiry || null,
        message: data.message,
        status:  "new",
        ip,
      });

    if (dbError) {
      console.error("[contact] Supabase insert error:", dbError.message);
      return NextResponse.json(
        { success: false, error: "We could not save your message. Please try again shortly." },
        { status: 503 }
      );
    }

    // ── Send emails ─────────────────────────────────────────
    await sendContactEmail({
      name:    data.name,
      email:   data.email,
      phone:   data.phone,
      inquiry: data.inquiry,
      message: data.message,
    });

    return NextResponse.json(
      { success: true, message: "Your message has been received. We'll be in touch within 1–2 business days." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[contact] Unhandled error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again or email us directly at tesfaye.afronova@gmail.com" },
      { status: 500 }
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
