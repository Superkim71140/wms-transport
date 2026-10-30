import crypto from 'node:crypto';

const AUTH_COOKIE_NAME = 'wms_seo_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey(): string {
  return process.env.SEO_DASHBOARD_PASSCODE || process.env.LINE_SETUP_PASSCODE || 'wms-seo-default-secret';
}

export function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyPasscode(passcode: string): boolean {
  const expectedPasscode = process.env.SEO_DASHBOARD_PASSCODE;
  if (!expectedPasscode) {
    // If not configured, require explicit configuration
    return false;
  }
  return timingSafeEqualStrings(passcode.trim(), expectedPasscode.trim());
}

export function createSessionToken(): string {
  const payload = {
    auth: true,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  };
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecretKey())
    .update(b64Payload)
    .digest('base64url');
  return `${b64Payload}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  if (!token || !token.includes('.')) return false;
  const [b64Payload, signature] = token.split('.');
  const expectedSignature = crypto
    .createHmac('sha256', getSecretKey())
    .update(b64Payload)
    .digest('base64url');

  if (!timingSafeEqualStrings(signature, expectedSignature)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
    if (!payload.auth || payload.exp < Date.now()) {
      return false;
    }
    return true;
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
