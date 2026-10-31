const crypto = require('crypto');
const fs = require('fs');

console.log('================================================================');
console.log('SHIV SHAKTI INDUSTRIES — SENIOR ARCHITECT SECURITY TEST SUITE');
console.log('================================================================\n');

require('dotenv').config({ path: '.env.local' });

const secretKey = process.env.ADMIN_SECRET_KEY || 'shiv_shakti_industries_precision_admin_auth_key_2026_super_secure_sha256_vadodara_gidc';
const ownerPath = process.env.OWNER_ACCESS_PATH || '/owner-access-7x9k';

function makeToken(userId, username, role, expired = false) {
  const exp = Math.floor(Date.now() / 1000) + (expired ? -3600 : 7 * 86400);
  const payload = { userId, username, role, exp };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secretKey).update(payloadB64).digest('base64url');
  return `${payloadB64}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [pB64, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', secretKey).update(pB64).digest('base64url');
  if (sig !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(pB64, 'base64url').toString('utf8'));
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function isAuthorizedOwnerRole(role) {
  if (!role) return false;
  return role === 'superadmin' || role === 'admin' || role === 'owner';
}

function simulateMiddleware(pathname, cookieValue) {
  // 1. PUBLIC /admin MUST ALWAYS RETURN 404 NOT FOUND (Unconditional Lockout)
  // Even if owner is logged in or user has active session, typing /admin returns 404!
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return { action: 'REWRITE_404', target: '/_not-found', status: 404 };
  }

  // 2. Secret Owner Access Route
  if (pathname === ownerPath) {
    return { action: 'ALLOW', status: 200 };
  }

  // 3. Secret Owner Subroutes
  if (pathname.startsWith(`${ownerPath}/`)) {
    const session = verifyToken(cookieValue);
    if (!session || !isAuthorizedOwnerRole(session.role)) {
      return { action: 'REDIRECT', target: ownerPath, status: 307 };
    }
    return { action: 'ALLOW', status: 200 };
  }

  // 4. Admin APIs
  if (pathname.startsWith('/api/admin/')) {
    if (pathname === '/api/admin/auth/login') {
      return { action: 'ALLOW', status: 200 };
    }
    const session = verifyToken(cookieValue);
    if (!session || !isAuthorizedOwnerRole(session.role)) {
      return { action: 'JSON_404', status: 404 };
    }
    return { action: 'ALLOW', status: 200 };
  }

  // 5. Normal public pages
  return { action: 'ALLOW', status: 200 };
}

let passed = 0;
let total = 0;

function assertTest(desc, condition) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${desc}`);
  } else {
    console.error(`  ✗ FAIL: ${desc}`);
  }
}

// ----------------------------------------------------------------------------
// TEST SUITE 1: Public /admin Returns Genuine 404 (Unconditional)
// ----------------------------------------------------------------------------
console.log('\n[1/5] Testing Public Access to /admin and /admin/* (Unconditional 404)');
const res1 = simulateMiddleware('/admin', null);
assertTest('/admin without session returns 404 Rewrite', res1.status === 404 && res1.action === 'REWRITE_404');

const res2 = simulateMiddleware('/admin/login', null);
assertTest('/admin/login without session returns 404 Rewrite', res2.status === 404 && res2.action === 'REWRITE_404');

const res3 = simulateMiddleware('/admin/products', null);
assertTest('/admin/products without session returns 404 Rewrite', res3.status === 404 && res3.action === 'REWRITE_404');

const res4 = simulateMiddleware('/admin/enquiries', null);
assertTest('/admin/enquiries without session returns 404 Rewrite', res4.status === 404 && res4.action === 'REWRITE_404');

// Crucial: Even WITH active owner cookie, /admin returns 404
const validOwnerToken = makeToken(1, 'admin', 'superadmin');
const resAdminWithCookie = simulateMiddleware('/admin', validOwnerToken);
assertTest('CRUCIAL: /admin WITH active owner session STILL returns 404 (Zero access via /admin)', resAdminWithCookie.status === 404 && resAdminWithCookie.action === 'REWRITE_404');

const resAdminSubWithCookie = simulateMiddleware('/admin/products', validOwnerToken);
assertTest('CRUCIAL: /admin/products WITH active owner session STILL returns 404', resAdminSubWithCookie.status === 404 && resAdminSubWithCookie.action === 'REWRITE_404');

// ----------------------------------------------------------------------------
// TEST SUITE 2: Private Owner Portal Route (/owner-access-7x9k)
// ----------------------------------------------------------------------------
console.log('\n[2/5] Testing Private Owner Login & Route Security');
const resOwnerPage = simulateMiddleware(ownerPath, null);
assertTest(`Private portal ${ownerPath} without session returns 200 OK (Displays Login form)`, resOwnerPage.status === 200 && resOwnerPage.action === 'ALLOW');

const resOwnerPageAuth = simulateMiddleware(ownerPath, validOwnerToken);
assertTest(`Private portal ${ownerPath} with valid session returns 200 OK (Displays Dashboard)`, resOwnerPageAuth.status === 200 && resOwnerPageAuth.action === 'ALLOW');

// Subroute without session must redirect to login
const resSubUnauth = simulateMiddleware(`${ownerPath}/products`, null);
assertTest(`Subroute ${ownerPath}/products without session redirects to ${ownerPath}`, resSubUnauth.status === 307 && resSubUnauth.action === 'REDIRECT' && resSubUnauth.target === ownerPath);

// Check credentials verification in users.json
const users = JSON.parse(fs.readFileSync('data/store/users.json', 'utf8'));
const adminUser = users.find(u => u.username === 'admin');
assertTest('Admin user exists in database with superadmin role', adminUser && adminUser.role === 'superadmin');

const [salt, origHash] = adminUser.password_hash.split(':');
const computed = crypto.pbkdf2Sync('Admin@ShivShakti2026!', salt, 100000, 64, 'sha512').toString('hex');
assertTest('PBKDF2-SHA512 password hash successfully verified', computed === origHash);

const invalidComputed = crypto.pbkdf2Sync('wrong_password', salt, 100000, 64, 'sha512').toString('hex');
assertTest('Invalid password properly rejected by PBKDF2 verification', invalidComputed !== origHash);

// ----------------------------------------------------------------------------
// TEST SUITE 3: Unauthorized API Requests Return 404 Not Found
// ----------------------------------------------------------------------------
console.log('\n[3/5] Testing Unauthorized Admin API Requests');
const endpoints = [
  '/api/admin/products',
  '/api/admin/customers',
  '/api/admin/sales',
  '/api/admin/enquiries',
  '/api/admin/stats',
  '/api/admin/backup',
  '/api/admin/content',
  '/api/admin/seo',
  '/api/admin/upload'
];

endpoints.forEach(ep => {
  const r = simulateMiddleware(ep, null);
  assertTest(`${ep} without session returns HTTP 404`, r.status === 404);
});

// Forged token with invalid signature
const forgedToken = makeToken(1, 'hacker', 'superadmin') + '_tampered';
const rTampered = simulateMiddleware('/api/admin/products', forgedToken);
assertTest('Tampered/forged token on /api/admin/products returns HTTP 404', rTampered.status === 404);

// Expired token
const expiredToken = makeToken(1, 'admin', 'superadmin', true);
const rExpired = simulateMiddleware('/api/admin/products', expiredToken);
assertTest('Expired token on /api/admin/products returns HTTP 404', rExpired.status === 404);

// Customer role token (attempting admin access)
const customerToken = makeToken(99, 'john_doe', 'customer');
const rCustomer = simulateMiddleware('/api/admin/products', customerToken);
assertTest('Non-admin role (customer) attempting /api/admin/products returns HTTP 404', rCustomer.status === 404);

// Customer role token attempting owner subroute
const rCustomerSub = simulateMiddleware(`${ownerPath}/products`, customerToken);
assertTest(`Non-admin role (customer) attempting ${ownerPath}/products redirects to login`, rCustomerSub.status === 307 && rCustomerSub.action === 'REDIRECT');

// ----------------------------------------------------------------------------
// TEST SUITE 4: Normal Customer Public Access
// ----------------------------------------------------------------------------
console.log('\n[4/5] Testing Normal Customer Public Access (Zero Disruption)');
const publicPages = ['/', '/products', '/services', '/capabilities', '/industries', '/quality', '/contact'];
publicPages.forEach(p => {
  const r = simulateMiddleware(p, null);
  assertTest(`Public page ${p} is unrestricted (200 OK)`, r.status === 200 && r.action === 'ALLOW');
});

const rRfq = simulateMiddleware('/api/rfq', null);
assertTest('Public RFQ submission API /api/rfq is accessible', rRfq.status === 200 && rRfq.action === 'ALLOW');

const rContact = simulateMiddleware('/api/contact', null);
assertTest('Public Contact submission API /api/contact is accessible', rContact.status === 200 && rContact.action === 'ALLOW');

// ----------------------------------------------------------------------------
// TEST SUITE 5: Authorized Owner Access
// ----------------------------------------------------------------------------
console.log('\n[5/5] Testing Authorized Owner Access on Secret Portal');
const rAuthOwnerSub = simulateMiddleware(`${ownerPath}/products`, validOwnerToken);
assertTest(`${ownerPath}/products WITH valid owner session is ALLOWED (200 OK)`, rAuthOwnerSub.status === 200 && rAuthOwnerSub.action === 'ALLOW');

const rAuthApi = simulateMiddleware('/api/admin/products', validOwnerToken);
assertTest('/api/admin/products WITH valid owner session is ALLOWED (200 OK)', rAuthApi.status === 200 && rAuthApi.action === 'ALLOW');

console.log('\n================================================================');
console.log(`TEST RESULTS: ${passed} / ${total} CHECKS PASSED`);
console.log('================================================================\n');

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
