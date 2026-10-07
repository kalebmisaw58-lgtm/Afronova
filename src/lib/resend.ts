import { Resend } from "resend";

// ── Client ────────────────────────────────────────────────────
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

const FROM = `${process.env.RESEND_FROM_NAME ?? "AfroNova"} <${process.env.RESEND_FROM_EMAIL ?? "noreply@afronova.org"}>`;
const TO   = process.env.CONTACT_TO_EMAIL ?? "tesfaye.afronova@gmail.com";

// ── Shared HTML wrapper ───────────────────────────────────────
function emailWrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>
    body  { margin:0; padding:0; background:#0d0400; font-family:Arial,sans-serif; color:#fff; }
    .wrap { max-width:600px; margin:0 auto; padding:0; }
    .hdr  { background:linear-gradient(90deg,#9A6A31,#D6A34A); padding:32px 40px; }
    .hdr h1 { margin:0; font-size:22px; color:#fff; letter-spacing:1px; }
    .hdr p  { margin:6px 0 0; font-size:13px; color:rgba(255,255,255,0.75); }
    .bdy  { background:#101312; padding:36px 40px; }
    .row  { margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.07); padding-bottom:20px; }
    .row:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
    .lbl  { font-size:11px; text-transform:uppercase; letter-spacing:1px;
            color:#D6A34A; margin-bottom:4px; font-weight:600; }
    .val  { font-size:15px; color:rgba(255,255,255,0.85); line-height:1.6; white-space:pre-wrap; }
    .ftr  { background:#0d0400; padding:24px 40px; text-align:center;
            font-size:12px; color:rgba(255,255,255,0.30); border-top:1px solid rgba(214,163,74,0.20); }
    a     { color:#D6A34A; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hdr">
      <h1>AFRONOVA</h1>
      <p>Pan-African · Events · Media · Innovation · Promotion</p>
    </div>
    <div class="bdy">${body}</div>
    <div class="ftr">
      © ${new Date().getFullYear()} AfroNova · Africa Avenue, Addis Ababa, Ethiopia<br/>
      <a href="https://afronova.org">afronova.org</a>
    </div>
  </div>
</body>
</html>`;
}

function row(label: string, value: string): string {
  if (!value?.trim()) return "";
  return `<div class="row"><div class="lbl">${escapeHtml(label)}</div><div class="val">${escapeHtml(value)}</div></div>`;
}

/** Escape all user-supplied content before embedding it in an HTML email. */
function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

// ── 1. Contact form email ─────────────────────────────────────
export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  inquiry?: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const body = [
    row("From",    data.name),
    row("Email",   data.email),
    row("Phone",   data.phone   ?? ""),
    row("Inquiry", data.inquiry ?? ""),
    row("Message", data.message),
  ].join("");

  const [notification, confirmation] = await Promise.allSettled([
    // Notify AfroNova team
    getResendClient().emails.send({
      from:    FROM,
      to:      TO,
      reply_to: data.email,
      subject: `[Contact] New message from ${data.name}`,
      html:    emailWrapper(`New Contact: ${data.name}`, body),
    }),
    // Auto-reply to sender — best-effort; failure must not suppress team notification
    getResendClient().emails.send({
      from:    FROM,
      to:      data.email,
      subject: "We received your message, AfroNova",
      html: emailWrapper("Message Received", `
        ${row("Hello", data.name)}
        <div class="row">
          <div class="val">
            Thank you for reaching out to AfroNova. We have received your message and will
            get back to you within <strong style="color:#D6A34A">1 to 2 business days</strong>.<br/><br/>
            In the meantime, follow us on social media for the latest updates on
            Africa Celebrates 2026 and all things AfroNova.<br/><br/>
            <em style="color:rgba(255,255,255,0.50)">"We don't just host events, we ignite movements."</em>
          </div>
        </div>
      `),
    }),
  ]);

  if (notification.status === "rejected") {
    throw new Error(`Team notification failed: ${notification.reason}`);
  }
  if (confirmation.status === "rejected") {
    console.warn("[resend] Auto-reply failed (non-fatal):", confirmation.reason);
  }

  return { notification: notification.value, confirmation: confirmation.status === "fulfilled" ? confirmation.value : null };
}

// ── 2. Newsletter welcome email ───────────────────────────────
export async function sendNewsletterWelcome(email: string) {
  return getResendClient().emails.send({
    from:    FROM,
    to:      email,
    subject: "Welcome to AfroNova, You're on the list!",
    html: emailWrapper("Welcome to AfroNova", `
      <div class="row">
        <div class="val">
          You're now subscribed to the <strong style="color:#D6A34A">AfroNova newsletter</strong>.<br/><br/>
          Expect the latest updates on <strong>Africa Celebrates 2026</strong>, Pan-African events,
          media releases, and exclusive opportunities, straight to your inbox.<br/><br/>
          <strong>Next up:</strong> Africa Celebrates 2026 · Nov 10 to 15 · Addis Ababa<br/><br/>
          <em style="color:rgba(255,255,255,0.50)">"Branding the New Africa. Limitless Possibilities."</em>
        </div>
      </div>
    `),
  });
}
