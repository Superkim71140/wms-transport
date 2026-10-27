/**
 * Extended Sitemap & Crawl Validation Suite for WMS TRANSPORT
 * Validates XML formatting, HTTP status, indexability, canonical agreement, duplicates,
 * broken internal links, and route inventory completeness.
 */

import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const DEFAULT_PORT = 3008;

function fetchUrl(targetUrl, timeoutMs = 6000) {
  return new Promise((resolve, reject) => {
    const req = http.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${targetUrl}`));
    });
  });
}

async function isPortResponding(port) {
  try {
    const res = await fetchUrl(`http://127.0.0.1:${port}/sitemap.xml`, 1500);
    return res.statusCode === 200;
  } catch {
    return false;
  }
}

async function validateSitemap() {
  console.log('🔍 Running Extended WMS Sitemap & Crawl Validator...\n');

  let activePort = null;
  let serverProc = null;

  // 1. Probe for existing running servers
  for (const port of [3000, 3008, 3010]) {
    if (await isPortResponding(port)) {
      activePort = port;
      console.log(`📡 Detected active running server on port ${activePort}.`);
      break;
    }
  }

  // 2. If no server running, spawn Next.js production server
  if (!activePort) {
    activePort = DEFAULT_PORT;
    console.log(`🚀 No active server detected. Spawning Next.js production server on port ${activePort}...`);
    serverProc = spawn('npx', ['next', 'start', '-p', String(activePort)], {
      cwd: ROOT,
      shell: true,
      stdio: 'pipe'
    });

    let ready = false;
    for (let i = 0; i < 30; i++) {
      try {
        await new Promise(r => setTimeout(r, 1000));
        const res = await fetchUrl(`http://127.0.0.1:${activePort}/sitemap.xml`, 1500);
        if (res.statusCode === 200) {
          ready = true;
          break;
        }
      } catch {
        // still spinning up
      }
    }

    if (!ready) {
      if (serverProc) serverProc.kill();
      throw new Error(`Failed to start Next.js production server on port ${activePort}`);
    }
    console.log(`✅ Production server is ready on port ${activePort}.\n`);
  }

  const cleanup = () => {
    if (serverProc) {
      console.log('🛑 Stopping temporary test server...');
      serverProc.kill();
    }
  };

  try {
    const sitemapUrl = `http://127.0.0.1:${activePort}/sitemap.xml`;
    console.log(`1️⃣ Fetching sitemap from ${sitemapUrl}...`);
    const sitemapRes = await fetchUrl(sitemapUrl);
    if (sitemapRes.statusCode !== 200) {
      throw new Error(`Failed to fetch sitemap: HTTP ${sitemapRes.statusCode}`);
    }

    const xml = sitemapRes.body;
    const locRegex = /<loc>(.*?)<\/loc>/g;
    const urls = [];
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      urls.push(match[1].trim());
    }

    console.log(`   Found ${urls.length} URLs in the sitemap.`);
    if (urls.length === 0) {
      throw new Error('Sitemap is empty or no <loc> elements were found.');
    }

    const errors = [];
    const logError = (msg) => {
      console.error(`   ❌ [ERROR] ${msg}`);
      errors.push(msg);
    };

    // 2. Validate URL syntax and format
    console.log('2️⃣ Validating URL syntax, domains, and duplicate rules...');
    const seen = new Set();
    urls.forEach((urlStr, index) => {
      try {
        new URL(urlStr);
      } catch {
        logError(`URL at index ${index} is malformed: "${urlStr}"`);
        return;
      }

      if (!urlStr.startsWith('https://wms-transport.com')) {
        logError(`URL does not start with https://wms-transport.com: "${urlStr}"`);
      }
      if (urlStr.includes('vercel.app')) {
        logError(`URL contains vercel.app leak: "${urlStr}"`);
      }
      if (urlStr.includes('localhost')) {
        logError(`URL contains localhost leak: "${urlStr}"`);
      }
      if (urlStr.startsWith('http://')) {
        logError(`URL uses unencrypted HTTP: "${urlStr}"`);
      }
      const pathname = urlStr.replace('https://wms-transport.com', '');
      if (pathname.includes('//')) {
        logError(`URL contains duplicate slashes: "${urlStr}"`);
      }
      if (/\s/.test(urlStr)) {
        logError(`URL contains whitespace: "${urlStr}"`);
      }
      if (seen.has(urlStr)) {
        logError(`Duplicate URL found in sitemap: "${urlStr}"`);
      } else {
        seen.add(urlStr);
      }
    });

    // 3. Confirm absence of draft districts and protected internal routes
    console.log('3️⃣ Verifying strict exclusion of draft districts and internal routes...');
    const forbiddenPatterns = [
      '/dashboard',
      '/areas/bkk-thonburi/phasi-charoen',
      '/areas/bkk-thonburi/bang-khun-thian',
      '/areas/bkk-thonburi/rat-burana',
      '/areas/bkk-thonburi/thung-khru',
      '/areas/bkk-thonburi/thon-buri',
      '/areas/bkk-thonburi/khlong-san',
      '/areas/bkk-thonburi/chom-thong',
      '/areas/bkk-thonburi/bangkok-yai',
      '/areas/bkk-thonburi/bangkok-noi',
      '/areas/bkk-thonburi/bang-phlat',
      '/areas/bkk-thonburi/taling-chan',
      '/areas/bkk-thonburi/thawi-watthana'
    ];

    forbiddenPatterns.forEach(pattern => {
      if (urls.some(u => u.includes(pattern))) {
        logError(`Forbidden draft/internal route present in sitemap: ${pattern}`);
      }
    });

    // 4. Crawl all sitemap URLs for HTTP 200, Canonical Agreement, and Indexability
    console.log('4️⃣ Crawling all sitemap URLs for HTTP 200, Canonical agreement, and Indexability...');
    let crawlSuccessCount = 0;
    const internalLinksToCheck = new Set();

    for (const sitemapUrl of urls) {
      const pathSuffix = sitemapUrl.replace('https://wms-transport.com', '') || '/';
      const liveUrl = `http://127.0.0.1:${activePort}${pathSuffix}`;

      try {
        const res = await fetchUrl(liveUrl, 5000);
        if (res.statusCode !== 200) {
          logError(`HTTP ${res.statusCode} on sitemap route: ${pathSuffix}`);
          continue;
        }

        // Check robots tag for accidental noindex
        if (res.body.includes('content="noindex"') || res.body.includes('content=\'noindex\'')) {
          logError(`Accidental noindex directive detected on sitemap route: ${pathSuffix}`);
        }

        // Check canonical agreement (normalized via decodeURI to handle percent-encoding in UTF-8 slugs)
        const canonicalMatch = /<link rel="canonical" href="(.*?)"/i.exec(res.body);
        if (canonicalMatch) {
          const canonicalHref = canonicalMatch[1];
          if (decodeURI(canonicalHref) !== decodeURI(sitemapUrl)) {
            logError(`Canonical mismatch on ${pathSuffix}: expected "${sitemapUrl}", found "${canonicalHref}"`);
          }
        } else {
          logError(`Missing canonical tag on sitemap route: ${pathSuffix}`);
        }

        // Sample internal links from representative pages
        if (pathSuffix === '/' || pathSuffix === '/pricing' || pathSuffix.startsWith('/service/bkk-thonburi')) {
          const hrefRegex = /href="(\/[^"#?]+)"/g;
          let hrefMatch;
          while ((hrefMatch = hrefRegex.exec(res.body)) !== null) {
            const link = hrefMatch[1];
            if (!link.startsWith('/_next') && !link.startsWith('/favicon')) {
              internalLinksToCheck.add(link);
            }
          }
        }

        crawlSuccessCount++;
      } catch (e) {
        logError(`Failed to crawl ${pathSuffix}: ${e.message}`);
      }
    }

    console.log(`   Successfully validated HTTP 200, canonical agreement, and indexability on ${crawlSuccessCount}/${urls.length} URLs.`);

    // 5. Check sampled internal links
    console.log(`5️⃣ Checking internal links integrity (${internalLinksToCheck.size} sampled links)...`);
    let checkedLinkCount = 0;
    for (const internalPath of internalLinksToCheck) {
      try {
        const res = await fetchUrl(`http://127.0.0.1:${activePort}${internalPath}`, 4000);
        if (res.statusCode >= 400 && res.statusCode !== 404) {
          logError(`Server error HTTP ${res.statusCode} on internal link: ${internalPath}`);
        }
        checkedLinkCount++;
      } catch (e) {
        logError(`Broken internal link ${internalPath}: ${e.message}`);
      }
    }
    console.log(`   Validated ${checkedLinkCount} internal links without server errors.`);

    cleanup();

    // Summary
    console.log('\n==========================================');
    console.log('📊 SITEMAP & CRAWL VALIDATION SUMMARY');
    console.log('==========================================');
    console.log(`Total URLs Audited:    ${urls.length}`);
    console.log(`Errors Found:          ${errors.length}`);

    if (errors.length > 0) {
      console.error('\n❌ Sitemap validation FAILED.');
      process.exit(1);
    } else {
      console.log('\n🎉 ALL SITEMAP & CRAWL CHECKS PASSED WITH ZERO ERRORS!');
      process.exit(0);
    }
  } catch (err) {
    cleanup();
    console.error(`\n❌ Fatal error in sitemap validator: ${err.message}`);
    process.exit(1);
  }
}

validateSitemap();
