import { NextResponse } from 'next/server';
import { isRequestAuthorized } from '@/lib/seo-monitor/auth';
import { getSeoSnapshot } from '@/lib/seo-monitor/seo-store';

export async function GET(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required to view WMS SEO Monitor data.' },
      { status: 401 }
    );
  }

  try {
    const snapshot = await getSeoSnapshot();
    return NextResponse.json(snapshot);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'Failed to load SEO monitor data' },
      { status: 500 }
    );
  }
}
