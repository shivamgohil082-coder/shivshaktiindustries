import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionTokenEdge, AUTH_COOKIE_NAME, isAuthorizedOwnerRole } from './lib/auth-edge';

const OWNER_ACCESS_PATH = process.env.OWNER_ACCESS_PATH || '/owner-access-7x9k';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --------------------------------------------------------------------------
  // 1. PUBLIC /admin MUST ALWAYS RETURN 404 NOT FOUND (Unconditional Lockout)
  // Even if an authorized owner or anyone visits /admin, return 404.
  // The admin dashboard is strictly mounted on the secret owner path.
  // --------------------------------------------------------------------------
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const notFoundUrl = new URL('/_not-found', request.url);
    const res = NextResponse.rewrite(notFoundUrl, { status: 404 });
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.headers.set('Cache-Control', 'no-store, max-age=0');
    return res;
  }

  // --------------------------------------------------------------------------
  // 2. Secret Owner Access Route (/owner-access-7x9k)
  // --------------------------------------------------------------------------
  if (pathname === OWNER_ACCESS_PATH) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    response.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
    return response;
  }

  // --------------------------------------------------------------------------
  // 3. Secret Owner Subroutes (/owner-access-7x9k/*)
  // Requires valid owner/admin session; unauthenticated users redirect to login
  // --------------------------------------------------------------------------
  if (pathname.startsWith(`${OWNER_ACCESS_PATH}/`)) {
    const adminCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = await verifySessionTokenEdge(adminCookie);

    if (!session || !isAuthorizedOwnerRole(session.role)) {
      return NextResponse.redirect(new URL(OWNER_ACCESS_PATH, request.url));
    }

    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    response.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
    return response;
  }

  // --------------------------------------------------------------------------
  // 4. Admin API endpoints (/api/admin/*) protection
  // --------------------------------------------------------------------------
  if (pathname.startsWith('/api/admin/')) {
    // Only the authentication login endpoint is reachable during owner login
    const isLoginEndpoint = pathname === '/api/admin/auth/login';

    if (!isLoginEndpoint) {
      const adminCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
      const authHeader = request.headers.get('authorization');
      const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : adminCookie;
      const session = await verifySessionTokenEdge(token);

      if (!session || !isAuthorizedOwnerRole(session.role)) {
        return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
      }
    }
  }

  // --------------------------------------------------------------------------
  // 5. Attach Production Security Headers
  // --------------------------------------------------------------------------
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, videos (public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|icons/|videos/).*)',
  ],
};
