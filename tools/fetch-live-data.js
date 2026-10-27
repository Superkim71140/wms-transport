const https = require('https');
const http = require('http');

function fetchUrl(targetUrl) {
  return new Promise((resolve) => {
    const client = targetUrl.startsWith('https') ? https : http;
    const req = client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url: targetUrl,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', (err) => {
      resolve({
        url: targetUrl,
        statusCode: 0,
        headers: {},
        error: err.message
      });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url: targetUrl,
        statusCode: 0,
        headers: {},
        error: 'Timeout'
      });
    });
  });
}

async function run() {
  console.log('Fetching live production robots.txt and sitemap.xml...');
  
  const robotsRes = await fetchUrl('https://wms-transport.com/robots.txt');
  console.log('\n--- https://wms-transport.com/robots.txt ---');
  console.log('Status:', robotsRes.statusCode);
  console.log('Headers:', robotsRes.headers);
  console.log('Body:\n', robotsRes.body);

  const sitemapRes = await fetchUrl('https://wms-transport.com/sitemap.xml');
  console.log('\n--- https://wms-transport.com/sitemap.xml ---');
  console.log('Status:', sitemapRes.statusCode);
  console.log('Headers:', sitemapRes.headers);
  console.log('Length:', sitemapRes.body ? sitemapRes.body.length : 0);

  // Vercel domain checks
  const vercelRobots = await fetchUrl('https://wms-transport.vercel.app/robots.txt');
  console.log('\n--- https://wms-transport.vercel.app/robots.txt ---');
  console.log('Status:', vercelRobots.statusCode);
  console.log('Headers:', vercelRobots.headers);

  const vercelHome = await fetchUrl('https://wms-transport.vercel.app/');
  console.log('\n--- https://wms-transport.vercel.app/ ---');
  console.log('Status:', vercelHome.statusCode);
  console.log('Location:', vercelHome.headers.location);

  const vercelDeep = await fetchUrl('https://wms-transport.vercel.app/service/bkk-thonburi');
  console.log('\n--- https://wms-transport.vercel.app/service/bkk-thonburi ---');
  console.log('Status:', vercelDeep.statusCode);
  console.log('Location:', vercelDeep.headers.location);
}

run();
