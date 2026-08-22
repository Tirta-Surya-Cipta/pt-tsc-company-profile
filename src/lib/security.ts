/**
 * Security Utilities for Production Hardening
 * 
 * Provides HTML escaping, input sanitization, rate-limit header helpers,
 * and origin validation utilities.
 */

// ─── HTML Escaping (for email templates) ─────────────────────────────────────

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

/**
 * Escapes HTML special characters to prevent XSS in email templates.
 * Must be used on ALL user-provided values inserted into HTML emails.
 */
export function escapeHtml(str: string): string {
  return str.replace(/[&<>"'/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

// ─── Input Sanitization ──────────────────────────────────────────────────────

/**
 * Strips newlines and control characters from a string.
 * Use on values inserted into email headers (Subject, From, To) to prevent
 * email header injection attacks.
 */
export function stripHeaderInjection(str: string): string {
  return str.replace(/[\r\n\t\x00-\x1f]/g, "").trim();
}

/**
 * Clamps a numeric value between min and max (inclusive).
 * Used for pagination parameters, search limits, etc.
 */
export function clampInt(value: number, min: number, max: number): number {
  if (isNaN(value) || !isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.floor(value)));
}

// ─── Rate Limiting (Vercel-compatible, headers-based) ────────────────────────

/**
 * In-memory rate limiter with automatic cleanup.
 * 
 * IMPORTANT: On Vercel serverless, each instance has its own memory.
 * This means the rate limiter is per-instance, not global. This provides
 * partial protection (each instance limits independently). For full
 * distributed rate limiting, use Upstash Redis or Vercel KV.
 * 
 * This is still valuable because:
 * 1. Vercel reuses instances for warm invocations (common case)
 * 2. It stops automated single-source attacks effectively
 * 3. It can be swapped for a Redis-based implementation without API changes
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 60 seconds to prevent memory leaks
let cleanupInterval: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore) {
      if (now > entry.resetAt) {
        rateLimitStore.delete(key);
      }
    }
    // If empty, clear the interval
    if (rateLimitStore.size === 0 && cleanupInterval) {
      clearInterval(cleanupInterval);
      cleanupInterval = null;
    }
  }, 60_000);
  // Don't prevent Node from exiting
  if (cleanupInterval && typeof cleanupInterval === "object" && "unref" in cleanupInterval) {
    cleanupInterval.unref();
  }
}

export interface RateLimitConfig {
  /** Unique identifier prefix for the limiter (e.g., "login", "contact") */
  prefix: string;
  /** Maximum number of requests allowed in the window */
  maxRequests: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Extracts a client identifier from request headers.
 * Uses X-Forwarded-For (set by Vercel/proxies), falls back to X-Real-IP.
 */
export function getClientIdentifier(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // Take the first IP (client IP before proxies)
    return forwarded.split(",")[0].trim();
  }
  return headers.get("x-real-ip") || "unknown";
}

/**
 * Check and consume a rate limit token.
 * Returns whether the request is allowed.
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  ensureCleanup();

  const key = `${config.prefix}:${identifier}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + config.windowSeconds * 1000,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: now + config.windowSeconds * 1000,
    };
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

// ─── Pre-configured Rate Limiters ────────────────────────────────────────────

export const RATE_LIMITS = {
  /** Login: 5 attempts per 15 minutes per IP */
  login: { prefix: "login", maxRequests: 5, windowSeconds: 900 } as RateLimitConfig,
  /** Contact form: 3 submissions per 5 minutes per IP */
  contact: { prefix: "contact", maxRequests: 3, windowSeconds: 300 } as RateLimitConfig,
  /** Quote form: 3 submissions per 5 minutes per IP */
  quote: { prefix: "quote", maxRequests: 3, windowSeconds: 300 } as RateLimitConfig,
  /** Upload: 10 uploads per 5 minutes per IP */
  upload: { prefix: "upload", maxRequests: 10, windowSeconds: 300 } as RateLimitConfig,
  /** General API: 60 requests per minute per IP */
  api: { prefix: "api", maxRequests: 60, windowSeconds: 60 } as RateLimitConfig,
} as const;
