export const AUTH_COOKIE_NAME = 'ssi_admin_session';
export const TOKEN_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface SessionPayload {
  userId: number;
  username: string;
  role: string;
  exp: number;
}

export function isAuthorizedOwnerRole(role?: string | null): boolean {
  if (!role) return false;
  return role === 'superadmin' || role === 'admin' || role === 'owner';
}

const DEFAULT_FALLBACK_SECRET =
  'shiv_shakti_industries_precision_admin_auth_key_2026_super_secure_sha256_vadodara_gidc';

function getSecretKey(): string {
  const secret = process.env.ADMIN_SECRET_KEY;
  if (secret && secret.trim().length >= 32) {
    return secret.trim();
  }
  return DEFAULT_FALLBACK_SECRET;
}

/**
 * Edge-compatible session verification using Web Crypto API (SubtleCrypto)
 * Fully supported in Next.js Middleware and Edge Runtime without Node 'crypto' dependencies.
 */
export async function verifySessionTokenEdge(
  token: string | null | undefined
): Promise<SessionPayload | null> {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;

  try {
    const encoder = new TextEncoder();
    const secret = getSecretKey();
    if (!secret) return null;

    const key = await globalThis.crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const normalizedSignature = signature.replace(/-/g, '+').replace(/_/g, '/');
    const signatureBytes = Uint8Array.from(
      atob(normalizedSignature.padEnd(Math.ceil(normalizedSignature.length / 4) * 4, '=')),
      (character) => character.charCodeAt(0)
    );
    const isValid = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(payloadB64)
    );
    if (!isValid) {
      return null;
    }

    const normalizedPayload = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
    const jsonStr = atob(normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, '='));
    const payload = JSON.parse(jsonStr) as SessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (
      !Number.isSafeInteger(payload.userId) ||
      typeof payload.username !== 'string' ||
      typeof payload.role !== 'string' ||
      !Number.isSafeInteger(payload.exp) ||
      payload.exp <= now
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
