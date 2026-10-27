const https = require('https');

const legacyUrls = [
  'https://wms-transport.vercel.app/',
  'https://wms-transport.vercel.app/service/bkk-thonburi',
  'https://wms-transport.vercel.app/pricing',
  'https://wms-transport.vercel.app/blog',
  'https://wms-transport.vercel.app/areas',
  'https://wms-transport.vercel.app/service/bangkok',
  'https://wms-transport.vercel.app/sitemap.xml',
  'https://wms-transport.vercel.app/robots.txt'
];

function checkRedirect(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    }, (res) => {
      resolve({
        url,
        statusCode: res.statusCode,
        location: res.headers.location || 'none'
      });
    });
    req.on('error', err => resolve({ url, statusCode: 0, error: err.message }));
  });
}

async function test() {
  console.log('Testing legacy hostname redirects (https://wms-transport.vercel.app)...');
  for (const u of legacyUrls) {
    const res = await checkRedirect(u);
    console.log(`${res.statusCode} ${res.url} -> ${res.location}`);
  }
}

test();
