import { NextResponse } from 'next/server';
import {
  verifyPasscode,
  createSessionToken,
  AUTH_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS
} from '@/lib/seo-monitor/auth';

interface AttemptRecord {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown-client';
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const now = Date.now();

  const record = loginAttempts.get(clientIp);
  if (record) {
    if (now < record.resetAt) {
      if (record.count >= MAX_ATTEMPTS) {
        const remainingMinutes = Math.ceil((record.resetAt - now) / 60000);
        return NextResponse.json(
          {
            error: `พยายามเข้าสู่ระบบผิดพลาดเกินกำหนด กรุณารออีก ${remainingMinutes} นาที (Too many failed attempts. Try again in ${remainingMinutes} minutes.)`
          },
          { status: 429 }
        );
      }
    } else {
      loginAttempts.delete(clientIp);
    }
  }

  try {
    const body = await request.json();
    const { passcode } = body || {};

    if (!passcode || typeof passcode !== 'string') {
      return NextResponse.json({ error: 'Passcode is required.' }, { status: 400 });
    }

    if (!verifyPasscode(passcode)) {
      const current = loginAttempts.get(clientIp) || { count: 0, resetAt: now + LOCKOUT_WINDOW_MS };
      current.count += 1;
      current.resetAt = now + LOCKOUT_WINDOW_MS;
      loginAttempts.set(clientIp, current);

      const attemptsRemaining = Math.max(0, MAX_ATTEMPTS - current.count);
      return NextResponse.json(
        {
          error: `รหัสผ่านไม่ถูกต้อง (Invalid Passcode). เหลือโอกาสอีก ${attemptsRemaining} ครั้ง`
        },
        { status: 401 }
      );
    }

    // Success - reset attempts
    loginAttempts.delete(clientIp);

    const token = createSessionToken();
    const response = NextResponse.json({ ok: true, message: 'Authenticated successfully.' });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS
    });

    return response;
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Authentication error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true, message: 'Logged out successfully.' });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });
  return response;
}
