import { NextResponse } from 'next/server';
import { isRequestAuthorized } from '@/lib/seo-monitor/auth';
import {
  fetchSitemaps,
  querySearchAnalytics,
  fetchSiteAggregates,
  inspectUrl,
  type UrlInspectionResult
} from '@/lib/seo-monitor/gsc-client';
import {
  getSeoSnapshot,
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
    const existingSnapshot = await getSeoSnapshot();

    // 1. Fetch Sitemaps dynamically
    const sitemaps = await fetchSitemaps(SITE_URL);

    // 2. Compute date ranges (GSC typically has ~3 day lag)
    const today = new Date();
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

    // 3. Fetch property-level aggregates (true totals) and dimension breakdowns in parallel
    const [siteAggLatest, siteAggPrev, analyticsLatest, analyticsPrev] = await Promise.all([
      fetchSiteAggregates(SITE_URL, latestRange.start, latestRange.end).catch(err => {
        console.warn('Site aggregates latest warning:', err.message);
        return undefined;
      }),
      fetchSiteAggregates(SITE_URL, prevRange.start, prevRange.end).catch(err => {
        console.warn('Site aggregates prev warning:', err.message);
        return undefined;
      }),
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

    // 4. Inspect representative URLs (bounded sequence with pause to respect API rate limits)
    const updatedInspectionsMap = new Map<string, UrlInspectionResult>();
    for (const item of existingSnapshot.inspections || []) {
      updatedInspectionsMap.set(item.inspectionUrl, item);
    }

    for (const url of REPRESENTATIVE_INSPECTION_URLS) {
      try {
        const res = await inspectUrl(SITE_URL, url);
        updatedInspectionsMap.set(url, {
          ...res,
          status: 'inspected',
          lastInspectedAt: new Date().toISOString()
        });
      } catch (e: any) {
        // Record API failure as error, NEVER as "not indexed"
        updatedInspectionsMap.set(url, {
          inspectionUrl: url,
          verdict: 'VERDICT_UNSPECIFIED',
          coverageState: `Inspection Error: ${e.message}`,
          status: 'error',
          errorMessage: e.message,
          lastInspectedAt: new Date().toISOString()
        });
      }
      await new Promise(r => setTimeout(r, 400));
    }

    const inspections = Array.from(updatedInspectionsMap.values());

    // 5. Derive alerts & opportunities
    const alerts = deriveAlertsAndOpportunities(inspections, analyticsLatest, analyticsPrev);

    // 6. Build snapshot & save
    const snapshot: SeoMonitorSnapshot = {
      ...existingSnapshot,
      siteUrl: SITE_URL,
      lastSyncAt: new Date().toISOString(),
      lastFailedSyncAt: null,
      lastSyncError: null,
      storageEngine: process.env.DATABASE_URL
        ? 'postgresql'
        : (process.env.VERCEL === '1' ? 'ephemeral_serverless_warning' : 'local_durable_file'),
      sitemaps,
      inspections,
      siteAggregatesLatest28d: siteAggLatest,
      siteAggregatesPrev28d: siteAggPrev,
      analyticsLatest28d: analyticsLatest,
      analyticsPrev28d: analyticsPrev,
      analyticsDateRange: {
        latest: latestRange,
        previous: prevRange
      },
      alerts,
      pageSpeedAudits: existingSnapshot.pageSpeedAudits && existingSnapshot.pageSpeedAudits.length > 0
        ? existingSnapshot.pageSpeedAudits
        : getDefaultPageSpeedAudits()
    };

    await saveSeoSnapshot(snapshot);

    return NextResponse.json({
      ok: true,
      message: 'GSC data synchronized successfully.',
      snapshot
    });
  } catch (e: any) {
    const rawMsg = e.message || 'Failed to sync GSC data';
    const sanitizedError = rawMsg.replace(/key=[^&\s]+/gi, 'key=***').replace(/AIza[0-9A-Za-z-_]{35}/g, '***');
    try {
      const snap = await getSeoSnapshot();
      snap.lastFailedSyncAt = new Date().toISOString();
      snap.lastSyncError = sanitizedError;
      await saveSeoSnapshot(snap);
    } catch {}

    return NextResponse.json(
      { error: sanitizedError },
      { status: 500 }
    );
  }
}
