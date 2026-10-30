import React from 'react';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/seo-monitor/auth';
import { getSeoSnapshot } from '@/lib/seo-monitor/seo-store';
import { SeoLoginScreen } from './SeoLoginScreen';
import { SeoDashboardClient } from './SeoDashboardClient';

export const metadata: Metadata = {
  title: 'WMS SEO Monitor | Search Console & Performance Dashboard',
  description: 'แดชบอร์ดติดตามประสิทธิภาพการค้นหา ดัชนี และ Core Web Vitals ของ WMS TRANSPORT',
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = 'force-dynamic';

export default async function SeoMonitorPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  const isAuthenticated = Boolean(sessionCookie && verifySessionToken(sessionCookie));

  if (!isAuthenticated) {
    return <SeoLoginScreen />;
  }

  const snapshot = await getSeoSnapshot();

  return <SeoDashboardClient initialSnapshot={snapshot} />;
}
