export interface PageSpeedAuditRecord {
  url: string;
  device: 'mobile' | 'desktop';
  templateName: string;
  performanceScore?: number;
  fcp?: number; // ms
  lcp?: number; // ms
  cls?: number; // score
  tbt?: number; // ms (Lighthouse lab metric - NOT CrUX INP)
  hasCruxData: boolean;
  cruxLcp?: number; // ms
  cruxCls?: number; // score
  cruxInp?: number; // ms (CrUX field metric)
  status: 'not_audited' | 'pending_api_key' | 'completed' | 'error';
  errorMessage?: string;
  auditedAt: string;
}

export interface RepresentativeTemplate {
  url: string;
  templateName: string;
}

export const REPRESENTATIVE_TEMPLATES: RepresentativeTemplate[] = [
  {
    url: 'https://wms-transport.com/',
    templateName: 'Homepage'
  },
  {
    url: 'https://wms-transport.com/areas',
    templateName: 'Service Hub Directory'
  },
  {
    url: 'https://wms-transport.com/service/bkk-thonburi',
    templateName: 'Regional Service Hub'
  },
  {
    url: 'https://wms-transport.com/service/bkk-thonburi/moving',
    templateName: 'District / Subservice Page'
  },
  {
    url: 'https://wms-transport.com/blog/moving-house-checklist',
    templateName: 'Article Detail Page'
  }
];

export function isPageSpeedKeyConfigured(): boolean {
  const key = process.env.PAGESPEED_API_KEY;
  return Boolean(key && key.trim().length > 0);
}

export function getInitialPageSpeedRecords(): PageSpeedAuditRecord[] {
  const isConfigured = isPageSpeedKeyConfigured();
  const defaultStatus = isConfigured ? 'not_audited' : 'pending_api_key';
  const records: PageSpeedAuditRecord[] = [];

  for (const tpl of REPRESENTATIVE_TEMPLATES) {
    for (const device of ['mobile', 'desktop'] as const) {
      records.push({
        url: tpl.url,
        templateName: tpl.templateName,
        device,
        status: defaultStatus,
        hasCruxData: false,
        auditedAt: new Date().toISOString()
      });
    }
  }

  return records;
}

/**
 * Runs a single PageSpeed Insights audit via Google API
 */
export async function auditSingleUrl(
  url: string,
  device: 'mobile' | 'desktop',
  templateName: string
): Promise<PageSpeedAuditRecord> {
  const apiKey = process.env.PAGESPEED_API_KEY;

  if (!apiKey) {
    return {
      url,
      device,
      templateName,
      status: 'pending_api_key',
      errorMessage: 'PAGESPEED_API_KEY is not configured on server.',
      hasCruxData: false,
      auditedAt: new Date().toISOString()
    };
  }

  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  endpoint.searchParams.set('url', url);
  endpoint.searchParams.set('strategy', device);
  endpoint.searchParams.set('category', 'performance');
  endpoint.searchParams.set('key', apiKey);

  try {
    const res = await fetch(endpoint.toString(), {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(30000)
    });

    if (!res.ok) {
      const errText = await res.text();
      let parsedMsg = `PageSpeed API HTTP ${res.status}`;
      try {
        const j = JSON.parse(errText);
        if (j.error?.message) parsedMsg = j.error.message;
      } catch {}
      return {
        url,
        device,
        templateName,
        status: 'error',
        errorMessage: parsedMsg,
        hasCruxData: false,
        auditedAt: new Date().toISOString()
      };
    }

    const data = await res.json();
    const lh = data.lighthouseResult || {};
    const audits = lh.audits || {};

    const performanceScore = lh.categories?.performance?.score != null
      ? Math.round(lh.categories.performance.score * 100)
      : undefined;

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

    return {
      url,
      device,
      templateName,
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
  } catch (err: any) {
    return {
      url,
      device,
      templateName,
      status: 'error',
      errorMessage: err.message || 'PageSpeed request failed',
      hasCruxData: false,
      auditedAt: new Date().toISOString()
    };
  }
}

/**
 * Executes audits sequentially with bounded delay to avoid quota bursts.
 */
export async function runRepresentativeAudits(
  templates: RepresentativeTemplate[] = REPRESENTATIVE_TEMPLATES
): Promise<PageSpeedAuditRecord[]> {
  const records: PageSpeedAuditRecord[] = [];

  for (const tpl of templates) {
    for (const device of ['mobile', 'desktop'] as const) {
      const rec = await auditSingleUrl(tpl.url, device, tpl.templateName);
      records.push(rec);
      // 600ms pacing delay between API calls
      await new Promise(r => setTimeout(r, 600));
    }
  }

  return records;
}

