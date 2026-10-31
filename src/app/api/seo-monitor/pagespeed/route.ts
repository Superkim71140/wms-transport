import { NextResponse } from 'next/server';
import { isRequestAuthorized } from '@/lib/seo-monitor/auth';
import {
  isPageSpeedKeyConfigured,
  runRepresentativeAudits,
  REPRESENTATIVE_TEMPLATES
} from '@/lib/seo-monitor/pagespeed-client';
import { getSeoSnapshot, saveSeoSnapshot } from '@/lib/seo-monitor/seo-store';

export async function GET(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required.' },
      { status: 401 }
    );
  }

  const configured = isPageSpeedKeyConfigured();
  const snapshot = await getSeoSnapshot();

  return NextResponse.json({
    configured,
    templates: REPRESENTATIVE_TEMPLATES,
    audits: snapshot.pageSpeedAudits || []
  });
}

export async function POST(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required to execute PageSpeed audits.' },
      { status: 401 }
    );
  }

  if (!isPageSpeedKeyConfigured()) {
    return NextResponse.json(
      {
        error: 'PAGESPEED_API_KEY is not configured on the server.',
        instructions: {
          step1: 'Go to Google Cloud Console (project: wms-seo-monitor).',
          step2: 'Navigate to APIs & Services > Credentials.',
          step3: 'Click Create Credentials > API Key.',
          step4: 'Restrict the key to "PageSpeed Insights API".',
          step5: 'Add PAGESPEED_API_KEY to your server-side environment variables (.env.local or Vercel Environment Variables).'
        }
      },
      { status: 400 }
    );
  }

  try {
    const records = await runRepresentativeAudits();
    const snapshot = await getSeoSnapshot();
    snapshot.pageSpeedAudits = records;
    snapshot.lastPageSpeedAuditAt = new Date().toISOString();
    await saveSeoSnapshot(snapshot);

    return NextResponse.json({
      ok: true,
      message: 'PageSpeed audits completed successfully.',
      audits: records
    });
  } catch (err: any) {
    const rawMsg = err.message || 'Failed to run PageSpeed audits';
    const sanitized = rawMsg.replace(/key=[^&\s]+/gi, 'key=***').replace(/AIza[0-9A-Za-z-_]{35}/g, '***');
    return NextResponse.json(
      { error: sanitized },
      { status: 500 }
    );
  }
}

