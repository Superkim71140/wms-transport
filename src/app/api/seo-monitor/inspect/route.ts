import { NextResponse } from 'next/server';
import { isRequestAuthorized } from '@/lib/seo-monitor/auth';
import { inspectUrl } from '@/lib/seo-monitor/gsc-client';
import { getSeoSnapshot, saveSeoSnapshot } from '@/lib/seo-monitor/seo-store';

const SITE_URL = 'https://wms-transport.com/';

export async function POST(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { url } = body || {};

    if (!url || typeof url !== 'string' || !url.startsWith('https://wms-transport.com/')) {
      return NextResponse.json(
        { error: 'Invalid URL. Must be a full URL on https://wms-transport.com/' },
        { status: 400 }
      );
    }

    const inspection = await inspectUrl(SITE_URL, url);

    // Update existing inspection in snapshot if present
    const snapshot = await getSeoSnapshot();
    const existingIndex = snapshot.inspections.findIndex(i => i.inspectionUrl === url);
    if (existingIndex >= 0) {
      snapshot.inspections[existingIndex] = inspection;
    } else {
      snapshot.inspections.unshift(inspection);
    }

    await saveSeoSnapshot(snapshot);

    return NextResponse.json({
      ok: true,
      inspection
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'Inspection failed' },
      { status: 500 }
    );
  }
}
