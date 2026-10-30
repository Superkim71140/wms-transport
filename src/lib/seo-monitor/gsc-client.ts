import crypto from 'node:crypto';
import fs from 'node:fs';

export interface GscCredentials {
  clientEmail: string;
  privateKey: string;
  projectId?: string;
}

interface CachedToken {
  token: string;
  expiresAt: number;
}

let cachedToken: CachedToken | null = null;

/**
 * Safely resolves Google Search Console credentials from environment.
 * Priority:
 * 1. GSC_KEY_FILE_PATH (e.g. C:/Users/PC/Desktop/Backowork/wms-seo-monitor-6f6b6c4e4dc0.json)
 * 2. GSC_SERVICE_ACCOUNT_EMAIL + GSC_PRIVATE_KEY (Vercel serverless environment)
 */
export function getGscCredentials(): GscCredentials {
  const filePath = process.env.GSC_KEY_FILE_PATH;
  if (filePath && fs.existsSync(filePath)) {
    try {
      const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (fileData.client_email && fileData.private_key) {
        return {
          clientEmail: fileData.client_email,
          privateKey: fileData.private_key,
          projectId: fileData.project_id
        };
      }
    } catch (e: any) {
      throw new Error(`Failed to read GSC key file from GSC_KEY_FILE_PATH: ${e.message}`);
    }
  }

  const clientEmail = process.env.GSC_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GSC_PRIVATE_KEY;

  if (clientEmail && privateKey) {
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    return { clientEmail, privateKey };
  }

  throw new Error(
    'Search Console credentials not configured. Set GSC_KEY_FILE_PATH or (GSC_SERVICE_ACCOUNT_EMAIL and GSC_PRIVATE_KEY).'
  );
}

function createJwt(email: string, privateKey: string, scopes: string[]): string {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${b64Header}.${b64Payload}`);
  const signature = sign.sign(privateKey, 'base64url');
  return `${b64Header}.${b64Payload}.${signature}`;
}

export async function getGscAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60000) {
    return cachedToken.token;
  }

  const { clientEmail, privateKey } = getGscCredentials();
  const jwt = createJwt(clientEmail, privateKey, [
    'https://www.googleapis.com/auth/webmasters.readonly'
  ]);

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt
  }).toString();

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  if (!res.ok) {
    const errorText = await res.text();
    if (errorText.includes('invalid_grant') || errorText.includes('revoked')) {
      throw new Error('Google OAuth authentication failed: Service account key was revoked or has expired.');
    }
    throw new Error(`Google OAuth token request failed (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const token = data.access_token as string;
  const expiresIn = (data.expires_in || 3600) as number;

  cachedToken = {
    token,
    expiresAt: now + expiresIn * 1000
  };

  return token;
}

export interface SiteInfoResponse {
  siteUrl: string;
  permissionLevel: string;
}

export async function fetchSiteInfo(siteUrl: string): Promise<SiteInfoResponse> {
  const token = await getGscAccessToken();
  const encSiteUrl = encodeURIComponent(siteUrl);
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encSiteUrl}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch site info (${res.status}): ${err}`);
  }

  return res.json();
}

export interface SitemapEntry {
  path: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  warnings?: string;
  errors?: string;
  contents?: Array<{
    type: string;
    submitted: string;
    indexed: string;
  }>;
}

export async function fetchSitemaps(siteUrl: string): Promise<SitemapEntry[]> {
  const token = await getGscAccessToken();
  const encSiteUrl = encodeURIComponent(siteUrl);
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encSiteUrl}/sitemaps`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch sitemaps (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.sitemap || [];
}

export interface SearchAnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchAnalyticsQueryOptions {
  startDate: string;
  endDate: string;
  dimensions: string[];
  rowLimit?: number;
  startRow?: number;
}

export async function querySearchAnalytics(
  siteUrl: string,
  options: SearchAnalyticsQueryOptions
): Promise<SearchAnalyticsRow[]> {
  const token = await getGscAccessToken();
  const encSiteUrl = encodeURIComponent(siteUrl);

  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encSiteUrl}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate: options.startDate,
        endDate: options.endDate,
        dimensions: options.dimensions,
        rowLimit: options.rowLimit || 1000,
        startRow: options.startRow || 0
      })
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to query search analytics (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.rows || [];
}

export interface UrlInspectionResult {
  inspectionUrl: string;
  verdict: 'PASS' | 'FAIL' | 'NEUTRAL' | 'PARTIAL' | 'VERDICT_UNSPECIFIED';
  coverageState: string;
  robotsTxtState?: string;
  indexingState?: string;
  pageFetchState?: string;
  lastCrawlTime?: string;
  googleCanonical?: string;
  userCanonical?: string;
  crawledAs?: string;
  httpStatus?: number;
}

export async function inspectUrl(
  siteUrl: string,
  urlToInspect: string
): Promise<UrlInspectionResult> {
  const token = await getGscAccessToken();

  let httpStatus: number | undefined;
  try {
    const headRes = await fetch(urlToInspect, {
      method: 'HEAD',
      headers: { 'User-Agent': 'WMS-SEO-Monitor/1.0' },
      redirect: 'manual'
    });
    httpStatus = headRes.status;
  } catch {
    httpStatus = undefined;
  }

  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inspectionUrl: urlToInspect,
      siteUrl,
      languageCode: 'th'
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`URL Inspection API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const idx = data.inspectionResult?.indexStatusResult || {};

  return {
    inspectionUrl: urlToInspect,
    verdict: idx.verdict || 'VERDICT_UNSPECIFIED',
    coverageState: idx.coverageState || 'ไม่มีข้อมูล',
    robotsTxtState: idx.robotsTxtState,
    indexingState: idx.indexingState,
    pageFetchState: idx.pageFetchState,
    lastCrawlTime: idx.lastCrawlTime,
    googleCanonical: idx.googleCanonical,
    userCanonical: idx.userCanonical,
    crawledAs: idx.crawledAs,
    httpStatus
  };
}
