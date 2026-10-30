import { NextResponse } from 'next/server';
import { isRequestAuthorized } from '@/lib/seo-monitor/auth';
import {
  fetchSitemaps,
  querySearchAnalytics,
  inspectUrl,
  type UrlInspectionResult
} from '@/lib/seo-monitor/gsc-client';
import {
  saveSeoSnapshot,
  deriveAlertsAndOpportunities,
  getDefaultPageSpeedAudits,
  type SeoMonitorSnapshot
} from '@/lib/seo-monitor/seo-store';

const SITE_URL = 'https://wms-transport.com/';

const REPRESENTATIVE_INSPECTION_URLS = [
  'https://wms-transport.com/',
  'https://wms-transport.com/areas',
  'https://wms-transport.com/pricing',
  'https://wms-transport.com/service/bkk-thonburi',
  'https://wms-transport.com/blog/how-to-request-quote-checklist'
];

export async function POST(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required to execute GSC sync.' },
      { status: 401 }
    );
  }

  try {
    // 1. Fetch Sitemaps
    const sitemaps = await fetchSitemaps(SITE_URL);

    // 2. Fetch Search Analytics (Latest 28d + Previous 28d)
    const today = new Date();
    // GSC data typically has ~3 day lag
    const endLatest = new Date(today);
    endLatest.setDate(endLatest.getDate() - 3);
    const startLatest = new Date(endLatest);
    startLatest.setDate(startLatest.getDate() - 27);

    const endPrev = new Date(startLatest);
    endPrev.setDate(endPrev.getDate() - 1);
    const startPrev = new Date(endPrev);
    startPrev.setDate(startPrev.getDate() - 27);

    const latestRange = {
      start: startLatest.toISOString().split('T')[0],
      end: endLatest.toISOString().split('T')[0]
    };

    const prevRange = {
      start: startPrev.toISOString().split('T')[0],
      end: endPrev.toISOString().split('T')[0]
    };

    const [analyticsLatest, analyticsPrev] = await Promise.all([
      querySearchAnalytics(SITE_URL, {
        startDate: latestRange.start,
        endDate: latestRange.end,
        dimensions: ['query', 'page'],
        rowLimit: 500
      }),
      querySearchAnalytics(SITE_URL, {
        startDate: prevRange.start,
        endDate: prevRange.end,
        dimensions: ['query', 'page'],
        rowLimit: 500
      }).catch(err => {
        console.warn('Previous 28d search analytics warning:', err.message);
        return [];
      })
    ]);

    // 3. Inspect representative URLs (bounded sequence to respect API rate limits)
    const inspections: UrlInspectionResult[] = [];
    for (const url of REPRESENTATIVE_INSPECTION_URLS) {
      try {
        const res = await inspectUrl(SITE_URL, url);
        inspections.push(res);
      } catch (e: any) {
        inspections.push({
          inspectionUrl: url,
          verdict: 'VERDICT_UNSPECIFIED',
          coverageState: `Inspection Error: ${e.message}`,
          httpStatus: undefined
        });
      }
    }

    // 4. Derive alerts & opportunities
    const alerts = deriveAlertsAndOpportunities(inspections, analyticsLatest, analyticsPrev);

    // 5. Build snapshot & save
    const snapshot: SeoMonitorSnapshot = {
      siteUrl: SITE_URL,
      lastSyncAt: new Date().toISOString(),
      storageEngine: process.env.DATABASE_URL ? 'postgresql' : 'local_durable_file',
      sitemaps,
      inspections,
      analyticsLatest28d: analyticsLatest,
      analyticsPrev28d: analyticsPrev,
      analyticsDateRange: {
        latest: latestRange,
        previous: prevRange
      },
      alerts,
      pageSpeedAudits: getDefaultPageSpeedAudits()
    };

    await saveSeoSnapshot(snapshot);

    return NextResponse.json({
      ok: true,
      message: 'GSC data synchronized successfully.',
      snapshot
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'Failed to sync GSC data' },
      { status: 500 }
    );
  }
}
