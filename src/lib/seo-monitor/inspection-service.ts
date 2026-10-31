import { inspectUrl, type UrlInspectionResult } from './gsc-client';
import { getSeoSnapshot, saveSeoSnapshot, saveSingleInspection } from './seo-store';

let isBatchInProgress = false;
let batchStartedTimestamp = 0;
const BATCH_LOCK_TIMEOUT_MS = 60000; // 60s lock safety fallback

export function isInspectionBatchActive(): boolean {
  return isBatchInProgress && (Date.now() - batchStartedTimestamp < BATCH_LOCK_TIMEOUT_MS);
}

export function setInspectionBatchActiveForTesting(active: boolean): void {
  isBatchInProgress = active;
  batchStartedTimestamp = active ? Date.now() : 0;
}

export interface BatchInspectionProgress {
  totalSitemapUrls: number;
  inspectedCount: number;
  indexedCount: number;
  notIndexedCount: number;
  pendingCount: number;
  errorCount: number;
  unknownCount: number;
  historicalCount: number;
  percentageComplete: number;
  lastBatchRunAt?: string;
  lastFailedBatchAt?: string;
  lastBatchError?: string;
}

export interface BatchInspectionRunResult {
  batchSize: number;
  inspectedThisRun: number;
  results: UrlInspectionResult[];
  progress: BatchInspectionProgress;
}

/**
 * Dynamically fetches sitemap URLs from live sitemap.xml
 * Falls back to local sitemap generator if network is unavailable.
 * Never hardcodes any URL count!
 */
export async function fetchDynamicSitemapUrls(siteUrl: string = 'https://wms-transport.com'): Promise<string[]> {
  const sitemapUrl = `${siteUrl.replace(/\/$/, '')}/sitemap.xml`;
  try {
    const res = await fetch(sitemapUrl, {
      headers: { 'User-Agent': 'WMS-SEO-Monitor/1.0' },
      next: { revalidate: 3600 }
    });

    if (res.ok) {
      const xml = await res.text();
      const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
      const unique = Array.from(new Set(matches)).filter(u => u.startsWith(siteUrl));
      if (unique.length > 0) {
        return unique;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch live sitemap.xml, falling back to local routes:', err);
  }

  // Fallback to local dynamic generator if offline
  try {
    const sitemapModule = await import('@/app/sitemap');
    if (typeof sitemapModule.default === 'function') {
      const entries = await sitemapModule.default();
      return entries.map(e => e.url);
    }
  } catch (err) {
    console.warn('Failed to load local sitemap generator:', err);
  }

  return [];
}

/**
 * Categorizes an inspection result based on Google's documented verdict semantics
 * and explicit coverage state strings (English and Thai).
 *
 * CRITICAL RULE: Never use broad substring matching for 'indexed' because negative states
 * like 'Crawled - currently not indexed' and 'Discovered - currently not indexed' contain the word 'indexed'.
 * Negative and error states are strictly evaluated before any positive classification.
 */
export function categorizeInspectionResult(item: UrlInspectionResult): 'indexed' | 'not_indexed' | 'error' | 'unknown' {
  // 1. Explicit API or Network Errors
  if (
    item.status === 'error' ||
    Boolean(item.errorMessage) ||
    item.coverageState?.toLowerCase().includes('api error') ||
    item.coverageState?.toLowerCase().includes('inspection error')
  ) {
    return 'error';
  }

  const cov = (item.coverageState || '').trim().toLowerCase();
  const verdict = item.verdict;

  // 2. Explicit Not-Indexed States (Checked FIRST to prevent negative states containing "indexed" from matching)
  const isExplicitNotIndexedState =
    cov.includes('not indexed') ||
    cov.includes('not_indexed') ||
    cov.includes('ยังไม่ได้จัดทำดัชนี') ||
    cov.includes('crawled - currently not indexed') ||
    cov.includes('discovered - currently not indexed') ||
    cov.includes('รวบรวมข้อมูลแล้ว - ปัจจุบันยังไม่ได้จัดทำดัชนี') ||
    cov.includes('พบแล้ว - ยังไม่ได้จัดทำดัชนี') ||
    cov.includes('excluded') ||
    cov.includes('แยกออกแล้ว') ||
    cov.includes('noindex') ||
    cov.includes('blocked by robots.txt') ||
    cov.includes('ถูกบล็อกโดย robots.txt') ||
    cov.includes('page with redirect') ||
    cov.includes('หน้าที่มีการเปลี่ยนเส้นทาง') ||
    cov.includes('alternate page with proper canonical tag') ||
    cov.includes('หน้าสำรองที่มีแท็ก canonical') ||
    cov.includes('duplicate without user-selected canonical') ||
    cov.includes('หน้าซ้ำที่ไม่มี canonical') ||
    cov.includes('soft 404') ||
    cov.includes('not found (404)') ||
    cov.includes('ไม่พบ (404)') ||
    cov.includes('server error (5xx)') ||
    cov.includes('ข้อผิดพลาดของเซิร์ฟเวอร์');

  if (isExplicitNotIndexedState) {
    return 'not_indexed';
  }

  // Google verdict semantics: NEUTRAL and FAIL mean the URL is not indexed or excluded
  if (verdict === 'NEUTRAL' || verdict === 'FAIL') {
    return 'not_indexed';
  }

  // 3. Explicit Positive Indexed States
  const isExplicitIndexedState =
    cov === 'submitted and indexed' ||
    cov === 'indexed, not submitted in sitemap' ||
    cov.startsWith('submitted and indexed') ||
    cov.startsWith('indexed, not submitted') ||
    cov.includes('ส่งและจัดทำดัชนีแล้ว') ||
    cov.includes('จัดทำดัชนีแล้ว แต่ไม่ได้ส่งในแผนผัง');

  if (verdict === 'PASS' || isExplicitIndexedState) {
    return 'indexed';
  }

  // 4. Unspecified / Unknown States
  if (verdict === 'VERDICT_UNSPECIFIED' || !cov || cov === 'ไม่มีข้อมูล' || cov === 'unknown') {
    return 'unknown';
  }

  return 'unknown';
}

/**
 * Calculates current progress across all sitemap URLs.
 */
export async function calculateInspectionProgress(): Promise<BatchInspectionProgress> {
  const snapshot = await getSeoSnapshot();
  const allUrls = await fetchDynamicSitemapUrls();
  const totalSitemapUrls = allUrls.length;
  const allUrlsSet = new Set(allUrls);

  const inspectionMap = new Map<string, UrlInspectionResult>();
  for (const item of snapshot.inspections || []) {
    inspectionMap.set(item.inspectionUrl, item);
  }

  let inspectedCount = 0;
  let indexedCount = 0;
  let notIndexedCount = 0;
  let errorCount = 0;
  let unknownCount = 0;

  for (const url of allUrls) {
    const item = inspectionMap.get(url);
    if (!item || item.status === 'pending') {
      continue;
    }
    inspectedCount++;
    const cat = categorizeInspectionResult(item);
    if (cat === 'indexed') indexedCount++;
    else if (cat === 'not_indexed') notIndexedCount++;
    else if (cat === 'error') errorCount++;
    else unknownCount++;
  }

  // Count historical URLs that were inspected but no longer in the active sitemap
  let historicalCount = 0;
  for (const item of snapshot.inspections || []) {
    if (!allUrlsSet.has(item.inspectionUrl)) {
      historicalCount++;
    }
  }

  const pendingCount = Math.max(0, totalSitemapUrls - inspectedCount);
  const percentageComplete = totalSitemapUrls > 0
    ? Math.round((inspectedCount / totalSitemapUrls) * 100)
    : 0;

  return {
    totalSitemapUrls,
    inspectedCount,
    indexedCount,
    notIndexedCount,
    pendingCount,
    errorCount,
    unknownCount,
    historicalCount,
    percentageComplete,
    lastBatchRunAt: snapshot.lastInspectionBatchAt || snapshot.lastSyncAt || undefined,
    lastFailedBatchAt: snapshot.lastFailedInspectionAt || undefined,
    lastBatchError: snapshot.lastInspectionError || undefined
  };
}

/**
 * Executes a bounded batch of URL inspections.
 * Resumes from uninspected URLs, then oldest inspected URLs.
 * Persists results incrementally to survive timeouts or interruptions.
 * Protects against overlapping concurrent runs and permanent error starvation.
 */
export async function executeInspectionBatch(
  requestedBatchSize: number = 10,
  siteUrl: string = 'https://wms-transport.com/'
): Promise<BatchInspectionRunResult> {
  const now = Date.now();
  if (isBatchInProgress && (now - batchStartedTimestamp < BATCH_LOCK_TIMEOUT_MS)) {
    throw new Error('A batch inspection is currently in progress. Please wait for the active batch to finish.');
  }

  isBatchInProgress = true;
  batchStartedTimestamp = now;

  try {
    const boundedSize = Math.max(1, Math.min(requestedBatchSize, 10)); // Bounded to 10 URLs to fit serverless execution
    const allUrls = await fetchDynamicSitemapUrls(siteUrl.replace(/\/$/, ''));
    const snapshot = await getSeoSnapshot();

    const existingMap = new Map<string, UrlInspectionResult>();
    for (const item of snapshot.inspections || []) {
      existingMap.set(item.inspectionUrl, item);
    }

    // 1. URLs never inspected or pending
    const neverInspected = allUrls.filter(u => !existingMap.has(u) || existingMap.get(u)?.status === 'pending');

    // 2. URLs previously inspected successfully, sorted by oldest lastInspectedAt
    const previouslyInspected = allUrls
      .filter(u => existingMap.has(u) && existingMap.get(u)?.status === 'inspected')
      .map(u => ({ url: u, record: existingMap.get(u)! }))
      .sort((a, b) => {
        const timeA = a.record.lastInspectedAt ? new Date(a.record.lastInspectedAt).getTime() : 0;
        const timeB = b.record.lastInspectedAt ? new Date(b.record.lastInspectedAt).getTime() : 0;
        return timeA - timeB;
      })
      .map(item => item.url);

    // 3. Error URLs - avoid letting permanent errors starve the queue:
    // Only retry errors that haven't been attempted in the last 15 minutes, and take at most 2 per batch
    const fifteenMinutesAgo = now - 15 * 60 * 1000;
    const retryableErrors = allUrls
      .filter(u => existingMap.has(u) && existingMap.get(u)?.status === 'error')
      .map(u => ({ url: u, record: existingMap.get(u)! }))
      .filter(item => {
        const lastAttempt = item.record.lastInspectedAt ? new Date(item.record.lastInspectedAt).getTime() : 0;
        return lastAttempt < fifteenMinutesAgo;
      })
      .sort((a, b) => {
        const timeA = a.record.lastInspectedAt ? new Date(a.record.lastInspectedAt).getTime() : 0;
        const timeB = b.record.lastInspectedAt ? new Date(b.record.lastInspectedAt).getTime() : 0;
        return timeA - timeB;
      })
      .map(item => item.url)
      .slice(0, 2);

    // Assemble target slice
    const targetUrls: string[] = [];
    // Prioritize uninspected
    for (const u of neverInspected) {
      if (targetUrls.length >= boundedSize) break;
      targetUrls.push(u);
    }
    // Mix in eligible error retries
    for (const u of retryableErrors) {
      if (targetUrls.length >= boundedSize) break;
      if (!targetUrls.includes(u)) targetUrls.push(u);
    }
    // Fill remaining slots with oldest inspected URLs (refresh cycle)
    for (const u of previouslyInspected) {
      if (targetUrls.length >= boundedSize) break;
      if (!targetUrls.includes(u)) targetUrls.push(u);
    }

    const batchResults: UrlInspectionResult[] = [];

    for (const url of targetUrls) {
      try {
        const res = await inspectUrl(siteUrl, url);
        const fullRes: UrlInspectionResult = {
          ...res,
          status: 'inspected',
          errorMessage: undefined,
          lastInspectedAt: new Date().toISOString()
        };
        batchResults.push(fullRes);
        existingMap.set(url, fullRes);

        // Incremental persistence: save immediately to database/store
        await saveSingleInspection(fullRes);
      } catch (e: any) {
        const errRes: UrlInspectionResult = {
          inspectionUrl: url,
          verdict: 'VERDICT_UNSPECIFIED',
          coverageState: `Google API Error: ${e.message}`,
          status: 'error',
          errorMessage: e.message,
          lastInspectedAt: new Date().toISOString()
        };
        batchResults.push(errRes);
        existingMap.set(url, errRes);

        // Incremental persistence of error state
        await saveSingleInspection(errRes);
      }

      // Rate-limiting pause (500ms) between Google API calls
      await new Promise(r => setTimeout(r, 500));
    }

    // Update full snapshot timestamps
    snapshot.inspections = Array.from(existingMap.values());
    snapshot.lastInspectionBatchAt = new Date().toISOString();
    snapshot.lastFailedInspectionAt = null;
    snapshot.lastInspectionError = null;
    try {
      await saveSeoSnapshot(snapshot);
    } catch {}

    const progress = await calculateInspectionProgress();

    return {
      batchSize: targetUrls.length,
      inspectedThisRun: batchResults.length,
      results: batchResults,
      progress
    };
  } catch (err: any) {
    const rawMsg = err.message || 'Batch inspection failed';
    const sanitized = rawMsg.replace(/key=[^&\s]+/gi, 'key=***').replace(/AIza[0-9A-Za-z-_]{35}/g, '***');
    try {
      const snap = await getSeoSnapshot();
      snap.lastFailedInspectionAt = new Date().toISOString();
      snap.lastInspectionError = sanitized;
      await saveSeoSnapshot(snap);
    } catch {}
    throw err;
  } finally {
    isBatchInProgress = false;
  }
}

