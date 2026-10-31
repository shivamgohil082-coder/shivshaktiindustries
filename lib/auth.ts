import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'ssi_admin_session';
const TOKEN_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

const DEFAULT_FALLBACK_SECRET =
  'shiv_shakti_industries_precision_admin_auth_key_2026_super_secure_sha256_vadodara_gidc';

export function isSessionAuthConfigured(): boolean {
  return true;
}

function getSecretKey(): string {
  const secret = process.env.ADMIN_SECRET_KEY;
  if (secret && secret.trim().length >= 32) {
    return secret.trim();
  }
  return DEFAULT_FALLBACK_SECRET;
}

export interface SessionPayload {
  userId: number;
  username: string;
  role: string;
  exp: number;
}

/**
 * Creates a tamper-proof signed session token using HMAC-SHA256
 */
export function createSessionToken(userId: number, username: string, role: string): string {
  const secretKey = getSecretKey();

  const payload: SessionPayload = {
    userId,
    username,
    role,
    exp: Math.floor(Date.now() / 1000) + TOKEN_MAX_AGE_SECONDS,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies a signed session token and checks for expiration
 */
export function verifySessionToken(token: string | null | undefined): SessionPayload | null {
  if (!token || typeof token !== 'string') return null;
  const secretKey = getSecretKey();
  if (!secretKey) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', secretKey)
    .update(payloadB64)
    .digest('base64url');

  const providedSignature = Buffer.from(signature);
  const expectedSignature = Buffer.from(expectedSig);
  if (
    providedSignature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(providedSignature, expectedSignature)
  ) {
    return null;
  }

  try {
    const jsonStr = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload = JSON.parse(jsonStr) as SessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (
      !Number.isSafeInteger(payload.userId) ||
      typeof payload.username !== 'string' ||
      typeof payload.role !== 'string' ||
      !Number.isSafeInteger(payload.exp) ||
      payload.exp <= now
    ) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

export function isAuthorizedOwnerRole(role?: string | null): boolean {
  if (!role) return false;
  return role === 'superadmin' || role === 'admin' || role === 'owner';
}

export function getOwnerAccessPath(): string {
  const custom = process.env.OWNER_ACCESS_PATH?.trim();
  if (custom && custom.startsWith('/') && custom.length >= 8) {
    return custom;
  }
  return '/owner-access-7x9k';
}

/**
 * Server-side helper to read and verify admin session from Request
 */
export function getAdminSessionFromRequest(req: NextRequest): SessionPayload | null {
  const cookie = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : cookie;

  return verifySessionToken(token);
}

/**
 * Strict Server-side guard: validates token AND asserts authorized admin/owner role
 */
export function requireAdminSession(req: NextRequest): SessionPayload | null {
  const session = getAdminSessionFromRequest(req);
  if (!session || !isAuthorizedOwnerRole(session.role)) {
    return null;
  }
  return session;
}

/**
 * Server Component helper to read and verify session from cookies()
 */
export async function getAdminSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export { AUTH_COOKIE_NAME, TOKEN_MAX_AGE_SECONDS };
