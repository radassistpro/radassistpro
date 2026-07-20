import { NextResponse } from "next/server";

const TRUSTED_HOSTS = new Set([
  "radassistpro.com",
  "www.radassistpro.com",
  "localhost:3010",
  "localhost:3000",
]);

type RateBucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, RateBucket>();

/** Best-effort in-memory limiter (per serverless instance). */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }

  bucket.count += 1;
  return { ok: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function hostAllowed(host: string): boolean {
  return TRUSTED_HOSTS.has(host);
}

/** Reject cross-site POSTs to state-changing API routes in production. */
export function assertTrustedOrigin(request: Request): void {
  if (process.env.NODE_ENV !== "production") return;

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const { host } = new URL(origin);
      if (!hostAllowed(host)) throw new SecurityError("Forbidden", 403);
      return;
    } catch (e) {
      if (e instanceof SecurityError) throw e;
      throw new SecurityError("Forbidden", 403);
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const { host } = new URL(referer);
      if (!hostAllowed(host)) throw new SecurityError("Forbidden", 403);
      return;
    } catch {
      throw new SecurityError("Forbidden", 403);
    }
  }

  throw new SecurityError("Forbidden", 403);
}

export class SecurityError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function securityErrorResponse(err: unknown) {
  if (err instanceof SecurityError) {
    const headers: Record<string, string> = {};
    if (err.status === 429) {
      headers["Retry-After"] = "60";
    }
    return NextResponse.json({ ok: false, error: err.message }, { status: err.status, headers });
  }
  return null;
}

type GuardOptions = {
  rateKey: string;
  limit: number;
  windowMs: number;
  requireOrigin?: boolean;
};

export function guardApiRequest(request: Request, opts: GuardOptions): void {
  if (opts.requireOrigin !== false) {
    assertTrustedOrigin(request);
  }

  const ip = getClientIp(request);
  const rl = rateLimit(`${opts.rateKey}:${ip}`, opts.limit, opts.windowMs);
  if (!rl.ok) {
    throw new SecurityError("Too many requests. Please wait and try again.", 429);
  }
}

export async function readJsonBody<T>(request: Request, maxBytes = 32_768): Promise<T> {
  const len = request.headers.get("content-length");
  if (len && Number.parseInt(len, 10) > maxBytes) {
    throw new SecurityError("Payload too large", 413);
  }

  const raw = await request.text();
  if (raw.length > maxBytes) throw new SecurityError("Payload too large", 413);
  if (!raw.trim()) throw new SecurityError("Empty body", 400);

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new SecurityError("Invalid JSON", 400);
  }
}

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return vercel.startsWith("http") ? vercel : `https://${vercel}`;
  return "https://radassistpro.com";
}

/** Generic response — avoids email enumeration on auth flows. */
export const PASSWORD_RESET_SENT =
  "If an HR account exists for that email, a reset code has been sent.";
