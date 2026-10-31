import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserByUsername, verifyPassword } from '@/lib/db';
import {
  createSessionToken,
  AUTH_COOKIE_NAME,
  TOKEN_MAX_AGE_SECONDS,
  isAuthorizedOwnerRole,
} from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // Rate Limiting: 15 login attempts per 15 minutes per IP (50 in non-production)
    const maxAttempts = process.env.NODE_ENV === 'production' ? 15 : 50;
    const rateLimit = checkRateLimit(`login_${clientIp}`, maxAttempts, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Please try again in ${Math.ceil(rateLimit.retryAfterSeconds / 60)} minutes.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid request payload.' }, { status: 400 });
    }

    const { username = '', password = '' } = body;

    if (!username.trim() || !password) {
      return NextResponse.json({ success: false, error: 'Username and password are required.' }, { status: 400 });
    }

    const user = await getAdminUserByUsername(username.trim());
    if (!user) {
      // Fake time delay to prevent timing attacks
      await new Promise((r) => setTimeout(r, 200));
      return NextResponse.json({ success: false, error: 'Invalid username or password.' }, { status: 401 });
    }

    const isValid = verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid username or password.' }, { status: 401 });
    }

    // Strict Server-Side Role Enforcement
    if (!isAuthorizedOwnerRole(user.role)) {
      return NextResponse.json({ success: false, error: 'Access denied: unauthorized role.' }, { status: 403 });
    }

    // Generate session token
    const token = createSessionToken(user.id, user.username, user.role);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TOKEN_MAX_AGE_SECONDS,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin Login Error:', error);
    return NextResponse.json({ success: false, error: 'An unexpected authentication error occurred.' }, { status: 500 });
  }
}
