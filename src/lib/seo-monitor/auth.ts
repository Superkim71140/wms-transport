import crypto from 'node:crypto';

const AUTH_COOKIE_NAME = 'wms_seo_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

/**
 * Resolves the signing secret for dashboard sessions.
 * FAILS CLOSED: Never falls back to default passwords or third-party channel secrets.
 */
function getSecretKey(): string {
  const secret = process.env.SEO_SESSION_SECRET || process.env.SEO_DASHBOARD_PASSCODE;
  if (!secret || secret.trim().length === 0) {
    throw new Error('Authentication secret is not configured. SEO_DASHBOARD_PASSCODE or SEO_SESSION_SECRET must be set.');
  }
  return secret.trim();
}

export function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyPasscode(passcode: string): boolean {
  const expectedPasscode = process.env.SEO_DASHBOARD_PASSCODE;
  if (!expectedPasscode || expectedPasscode.trim().length === 0 || !passcode || typeof passcode !== 'string') {
    return false;
  }
  return timingSafeEqualStrings(passcode.trim(), expectedPasscode.trim());
}

export function createSessionToken(): string {
  const secret = getSecretKey();
  const now = Date.now();
  const payload = {
    auth: true,
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS * 1000
  };
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(b64Payload)
    .digest('base64url');
  return `${b64Payload}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [b64Payload, signature] = parts;
  if (!b64Payload || !signature) return false;

  let secret: string;
  try {
    secret = getSecretKey();
  } catch {
    // Fail closed if secret is missing
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(b64Payload)
    .digest('base64url');

  if (!timingSafeEqualStrings(signature, expectedSignature)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
    if (!payload || typeof payload !== 'object') {
      return false;
    }
    // Strict structure checks
    if (payload.auth !== true) {
      return false;
    }
    if (typeof payload.exp !== 'number' || !Number.isFinite(payload.exp)) {
      return false;
    }
    const now = Date.now();
    // Expiration check
    if (payload.exp < now) {
      return false;
    }
    // Sanity check: token lifetime cannot exceed max age + 1 day grace
    if (payload.exp > now + (SESSION_MAX_AGE_SECONDS + 86400) * 1000) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates Origin/Referer header to prevent CSRF attacks on state-changing requests.
 */
export function verifyCsrfOrigin(request: Request): boolean {
  const method = request.method?.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return true;
  }

  const origin = request.headers.get('origin');
  if (!origin) {
    return true;
  }

  try {
    const originHost = new URL(origin).hostname.toLowerCase();
    const requestHost = (request.headers.get('host') || request.headers.get('x-forwarded-host') || '').split(':')[0].toLowerCase();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname.toLowerCase() : '';

    if (
      originHost === requestHost ||
      originHost === siteUrl ||
      originHost === 'localhost' ||
      originHost === '127.0.0.1' ||
      originHost === 'wms-transport.com' ||
      originHost.endsWith('.vercel.app')
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Checks authentication on incoming API or Page requests.
 * Accepts:
 * 1. Cookie: wms_seo_session
 * 2. Header: x-seo-passcode
 * 3. Header: Authorization: Bearer <passcode_or_token>
 */
export function isRequestAuthorized(request: Request): boolean {
  if (!verifyCsrfOrigin(request)) {
    return false;
  }

  // 1. Header: x-seo-passcode
  const headerPasscode = request.headers.get('x-seo-passcode');
  if (headerPasscode && verifyPasscode(headerPasscode)) {
    return true;
  }

  // 2. Header: Authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const bearer = authHeader.slice(7).trim();
    if (verifyPasscode(bearer) || verifySessionToken(bearer)) {
      return true;
    }
  }

  // 3. Cookie: wms_seo_session
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${AUTH_COOKIE_NAME}=([^;]+)`));
  if (match) {
    const token = match[1];
    if (verifySessionToken(token)) {
      return true;
    }
  }

  return false;
}

export { AUTH_COOKIE_NAME, SESSION_MAX_AGE_SECONDS };
