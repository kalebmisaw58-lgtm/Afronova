import { z } from "zod";

// ── Shared field helpers ──────────────────────────────────────
const phone   = z.string().max(30).optional().or(z.literal(""));
const optStr  = z.string().max(500).optional().or(z.literal(""));

// ── 1. Contact form ───────────────────────────────────────────
export const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters").max(100),
  email:   z.string().email("Please enter a valid email address"),
  phone,
  inquiry: optStr,
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ── 2. Newsletter ─────────────────────────────────────────────
export const newsletterSchema = z.object({
  email:  z.string().email("Please enter a valid email address"),
  source: z.string().max(100).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// ── Helper: format Zod errors for API responses ───────────────
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  return Object.fromEntries(
    error.errors.map((e) => [e.path.join("."), e.message])
  );
}
