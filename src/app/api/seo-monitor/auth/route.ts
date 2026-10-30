import { NextResponse } from 'next/server';
import {
  verifyPasscode,
  createSessionToken,
  AUTH_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS
} from '@/lib/seo-monitor/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body || {};

    if (!passcode || typeof passcode !== 'string') {
      return NextResponse.json({ error: 'Passcode is required.' }, { status: 400 });
    }

    if (!verifyPasscode(passcode)) {
      return NextResponse.json({ error: 'รหัสผ่านไม่ถูกต้อง (Invalid Passcode)' }, { status: 401 });
    }

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
