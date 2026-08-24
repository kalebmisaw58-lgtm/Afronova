import { RateLimiterMemory } from "rate-limiter-flexible";
import type { NextRequest } from "next/server";

/** Process-local fallback. Configure a shared store for multi-instance deployments. */
export const contactRateLimiter = new RateLimiterMemory({ points: 5, duration: 10 * 60 });
export const newsletterRateLimiter = new RateLimiterMemory({ points: 3, duration: 60 * 60 });

export function getClientIp(request: NextRequest): string {
  return request.headers.get("x-vercel-forwarded-for")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")
    ?? "unknown";
}

export async function isRateLimited(limiter: RateLimiterMemory, key: string): Promise<boolean> {
  try {
    await limiter.consume(key);
    return false;
  } catch {
    return true;
  }
}
