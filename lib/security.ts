/**
 * Security and Data Sanitization Utilities
 * Implements OWASP recommendations for input sanitization, rate limiting, and upload protection.
 */

// In-memory sliding window rate limiter store
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up old rate limit entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * HTML Escapes unsafe strings to prevent Stored & Reflected XSS
 */
export function escapeHtml(str: unknown): string {
  if (typeof str !== "string") {
    return "";
  }
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Validates email addresses
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string" || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone numbers (supports international formats)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");
  return /^\+?[0-9]{7,15}$/.test(cleaned);
}

/**
 * Allowed CAD, drawing, and document file extensions for RFQs
 */
export const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  // CAD / 3D models
  ".step",
  ".stp",
  ".iges",
  ".igs",
  ".dwg",
  ".dxf",
  ".sldprt",
  ".x_t",
  // Documents / Archives
  ".pdf",
  ".zip",
  ".rar",
  ".7z",
  // Images
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

export const MAX_UPLOAD_SIZE_BYTES = 15 * 1024 * 1024; // 15 Megabytes

/**
 * Validates if the file extension is safe
 */
export function isAllowedFileExtension(filename: string): boolean {
  if (!filename || typeof filename !== "string") return false;
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return false;
  const ext = filename.substring(lastDot).toLowerCase();
  return ALLOWED_UPLOAD_EXTENSIONS.has(ext);
}

/**
 * Generates a sanitized, collision-resistant filename
 */
export function sanitizeFileName(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  const ext = lastDot !== -1 ? filename.substring(lastDot).toLowerCase() : "";
  const nameWithoutExt = lastDot !== -1 ? filename.substring(0, lastDot) : filename;

  // Remove dangerous path characters, null bytes, and non-alphanumeric chars
  const cleanBase = nameWithoutExt
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_{2,}/g, "_")
    .substring(0, 50);

  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${cleanBase}_${timestamp}_${randomSuffix}${ext}`;
}

/**
 * Extracts client IP address safely from request headers
 */
export function getClientIp(req: Request): string {
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return "127.0.0.1";
}

/**
 * In-memory sliding-window rate limiter
 * Returns rate limit state with standard headers
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, newRecord);
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: newRecord.resetTime,
      retryAfterSeconds: 0,
    };
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfterSeconds: Math.max(1, retryAfter),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
    retryAfterSeconds: 0,
  };
}
