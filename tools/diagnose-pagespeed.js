/**
 * WMS SEO Monitor - Isolated PageSpeed Diagnostic Runner
 *
 * Requirements:
 * 1. Checks presence of PAGESPEED_API_KEY without exposing secret value.
 * 2. Stage 1: Calls Google PageSpeed Insights API in isolation with timeout and retry handling.
 * 3. Stage 2: Verifies Lighthouse output and parses metrics.
 * 4. Stage 3: Tests snapshot persistence and round-trip retrieval.
 * 5. Closes all connections cleanly and exits naturally.
 */

const fs = require('fs');
const path = require('path');

// 1. Load .env.local
const envFile = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envFile)) {
  const content = fs.readFileSync(envFile, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq !== -1) {
      const k = trimmed.slice(0, eq).trim();
      let v = trimmed.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) {
        process.env[k] = v;
      }
    }
  }
}

const TARGET_URL = 'https://wms-transport.com/';
const STRATEGY = 'mobile';
const CATEGORY = 'performance';
const REQUEST_TIMEOUT_MS = 45000; // 45 seconds for mobile Lighthouse audit
const SCRIPT_DEADLINE_MS = 90000; // 90 seconds overall script deadline
const MAX_TRANSIENT_RETRIES = 2;

function maskKey(key) {
  if (!key) return '(not configured)';
  if (key.length <= 8) return '***';
  return `${key.slice(0, 4)}...${key.slice(-4)} (length: ${key.length})`;
}

async function fetchWithTimeout(urlStr, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(urlStr, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function runIsolatedApiCall(apiKey) {
  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  endpoint.searchParams.set('url', TARGET_URL);
  endpoint.searchParams.set('strategy', STRATEGY);
  endpoint.searchParams.set('category', CATEGORY);
  endpoint.searchParams.set('key', apiKey);

  let attempt = 0;
  while (attempt <= MAX_TRANSIENT_RETRIES) {
    attempt++;
    const startTime = Date.now();
    console.log(`\n[Stage 1: Google API Call] Attempt ${attempt} -> Strategy: ${STRATEGY}, URL: ${TARGET_URL}`);
    try {
      const res = await fetchWithTimeout(
        endpoint.toString(),
        { headers: { Accept: 'application/json' } },
        REQUEST_TIMEOUT_MS
      );
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`[Stage 1: Google API Call] HTTP Status: ${res.status} (${res.statusText}) in ${elapsed}s`);

      if (!res.ok) {
        const errText = await res.text();
        let errorReason = `HTTP ${res.status}`;
        try {
          const parsed = JSON.parse(errText);
          if (parsed.error?.message) {
            errorReason = parsed.error.message;
          }
        } catch {
          errorReason = errText.slice(0, 200);
        }

        console.error(`[Stage 1: Google API Call] Error Reason: ${errorReason}`);

        // Check if transient
        if ([500, 502, 503, 504].includes(res.status) && attempt <= MAX_TRANSIENT_RETRIES) {
          console.warn(`[Stage 1: Google API Call] Transient server error encountered. Retrying in 2s...`);
          await new Promise((r) => setTimeout(r, 2000));
          continue;
        }

        // Fatal client / restriction / quota error
        return {
          ok: false,
          httpStatus: res.status,
          errorReason,
          data: null
        };
      }

      const data = await res.json();
      return {
        ok: true,
        httpStatus: res.status,
        elapsed,
        data
      };
    } catch (err) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      const isTimeout = err.name === 'AbortError' || err.message.includes('aborted');
      console.error(`[Stage 1: Google API Call] Network failure in ${elapsed}s: ${isTimeout ? 'Request Timeout (exceeded 45s)' : err.message}`);

      if (attempt <= MAX_TRANSIENT_RETRIES) {
        console.warn(`[Stage 1: Google API Call] Retrying after transient error in 2s...`);
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }

      return {
        ok: false,
        httpStatus: 0,
        errorReason: isTimeout ? 'Request Timeout after 45s' : err.message,
        data: null
      };
    }
  }

  return { ok: false, httpStatus: 0, errorReason: 'Max retries exhausted', data: null };
}

function parseLighthouseData(data) {
  console.log('\n[Stage 2: Lighthouse Response Validation]');
  if (!data) {
    throw new Error('API returned empty response body.');
  }

  const lh = data.lighthouseResult;
  if (!lh) {
    throw new Error('Response is missing lighthouseResult object.');
  }

  if (lh.runtimeError) {
    throw new Error(`Lighthouse runtime error: ${lh.runtimeError.code} - ${lh.runtimeError.message}`);
  }

  const scoreRaw = lh.categories?.performance?.score;
  const performanceScore = scoreRaw != null ? Math.round(scoreRaw * 100) : null;
  const audits = lh.audits || {};

  const fcp = audits['first-contentful-paint']?.numericValue;
  const lcp = audits['largest-contentful-paint']?.numericValue;
  const cls = audits['cumulative-layout-shift']?.numericValue;
  const tbt = audits['total-blocking-time']?.numericValue;

  // Field Data (CrUX)
  const cruxMetrics = data.loadingExperience?.metrics || {};
  const hasCrux = Boolean(
    cruxMetrics.LARGEST_CONTENTFUL_PAINT_MS ||
    cruxMetrics.CUMULATIVE_LAYOUT_SHIFT_SCORE ||
    cruxMetrics.INTERACTION_TO_NEXT_PAINT
  );

  const cruxLcp = cruxMetrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile;
  const cruxClsRaw = cruxMetrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile;
  const cruxCls = cruxClsRaw != null ? cruxClsRaw / 100 : undefined;
  const cruxInp = cruxMetrics.INTERACTION_TO_NEXT_PAINT?.percentile;

  const record = {
    url: TARGET_URL,
    device: STRATEGY,
    templateName: 'Homepage',
    performanceScore,
    fcp: fcp != null ? Math.round(fcp) : undefined,
    lcp: lcp != null ? Math.round(lcp) : undefined,
    cls: cls != null ? Number(cls.toFixed(3)) : undefined,
    tbt: tbt != null ? Math.round(tbt) : undefined,
    hasCruxData: hasCrux,
    cruxLcp,
    cruxCls,
    cruxInp,
    status: 'completed',
    auditedAt: new Date().toISOString()
  };

  console.log('✅ Lighthouse validation succeeded:');
  console.log(`   - Performance Score: ${record.performanceScore}/100`);
  console.log(`   - First Contentful Paint (FCP): ${record.fcp} ms`);
  console.log(`   - Largest Contentful Paint (LCP): ${record.lcp} ms`);
  console.log(`   - Cumulative Layout Shift (CLS): ${record.cls}`);
  console.log(`   - Total Blocking Time (TBT): ${record.tbt} ms`);
  console.log(`   - CrUX Real-User Field Data: ${record.hasCruxData ? 'Available' : 'Insufficient Real-User Traffic'}`);
  if (record.hasCruxData) {
    if (record.cruxLcp) console.log(`     * CrUX LCP: ${record.cruxLcp} ms`);
    if (record.cruxCls) console.log(`     * CrUX CLS: ${record.cruxCls}`);
    if (record.cruxInp) console.log(`     * CrUX INP: ${record.cruxInp} ms`);
  }

  return record;
}

async function persistAuditRecord(auditRecord) {
  console.log('\n[Stage 3: Persistence & Round-Trip Verification]');
  const { getSeoSnapshot, saveSeoSnapshot } = require('../src/lib/seo-monitor/seo-store');

  const snapshot = await getSeoSnapshot();
  console.log(`[Stage 3: Persistence] Current storage engine: ${snapshot.storageEngine}`);

  const existingAudits = Array.isArray(snapshot.pageSpeedAudits) ? snapshot.pageSpeedAudits : [];
  const idx = existingAudits.findIndex((a) => a.url === auditRecord.url && a.device === auditRecord.device);
  if (idx >= 0) {
    existingAudits[idx] = auditRecord;
  } else {
    existingAudits.push(auditRecord);
  }
  snapshot.pageSpeedAudits = existingAudits;

  await saveSeoSnapshot(snapshot);
  console.log(`[Stage 3: Persistence] Snapshot saved successfully.`);

  // Verify round-trip
  const reloaded = await getSeoSnapshot();
  const found = (reloaded.pageSpeedAudits || []).find(
    (a) => a.url === auditRecord.url && a.device === auditRecord.device
  );

  if (!found || found.status !== 'completed' || found.performanceScore !== auditRecord.performanceScore) {
    throw new Error('Round-trip persistence verification failed: record not restored correctly.');
  }

  console.log(`✅ [Stage 3: Persistence] Round-trip verified. Record persisted in storage engine: ${reloaded.storageEngine}`);
  return reloaded.storageEngine;
}

async function main() {
  const overallDeadline = setTimeout(() => {
    console.error(`\n❌ SCRIPT DEADLINE EXCEEDED (${SCRIPT_DEADLINE_MS / 1000}s). Terminating.`);
    process.exit(1);
  }, SCRIPT_DEADLINE_MS);

  try {
    console.log('========================================================');
    console.log('   WMS SEO Monitor - Isolated PageSpeed Diagnostic');
    console.log('========================================================');

    const apiKey = process.env.PAGESPEED_API_KEY;
    console.log(`Key Configured: ${Boolean(apiKey)}`);
    console.log(`Key Mask: ${maskKey(apiKey)}`);

    if (!apiKey) {
      console.error('❌ Error: PAGESPEED_API_KEY is not defined in environment or .env.local');
      return;
    }

    // Stage 1: API Call
    const apiResult = await runIsolatedApiCall(apiKey);
    if (!apiResult.ok) {
      console.error(`\n❌ Stage 1 failed: HTTP ${apiResult.httpStatus} - ${apiResult.errorReason}`);
      return;
    }

    // Stage 2: Lighthouse Parsing
    const auditRecord = parseLighthouseData(apiResult.data);

    // Stage 3: Persistence
    const storageEngine = await persistAuditRecord(auditRecord);

    console.log('\n========================================================');
    console.log('🎉 DIAGNOSTIC TEST COMPLETED SUCCESSFULLY');
    console.log(`- URL: ${auditRecord.url}`);
    console.log(`- Device: ${auditRecord.device}`);
    console.log(`- Score: ${auditRecord.performanceScore}/100`);
    console.log(`- Storage Engine: ${storageEngine}`);
    console.log('========================================================');
  } finally {
    clearTimeout(overallDeadline);
    try {
      const { closePgPool } = require('../src/lib/seo-monitor/seo-store');
      await closePgPool();
    } catch {}
  }
}

main().catch((err) => {
  console.error('\n❌ Diagnostic script crashed:', err);
  process.exit(1);
});
