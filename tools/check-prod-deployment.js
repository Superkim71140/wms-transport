const https = require('https');

function fetchProd() {
  https.get('https://wms-transport.com', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Cache-Control': 'no-cache'
    }
  }, (res) => {
    console.log('--- PRODUCTION HEADERS ---');
    console.log('Status:', res.statusCode);
    console.log('x-vercel-id:', res.headers['x-vercel-id']);
    console.log('x-matched-path:', res.headers['x-matched-path']);
    console.log('age:', res.headers['age']);
    console.log('date:', res.headers['date']);
    
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      // Find buildId in script tags: /_next/static/{buildId}/_buildManifest.js
      const match = body.match(/\/_next\/static\/([^\/]+)\/_buildManifest\.js/);
      console.log('Production Next.js BUILD_ID from HTML:', match ? match[1] : 'not found');
      
      // Also check if ec5e241 application changes are present in HTML
      console.log('Contains new banner text (มั่นใจได้ทุกเส้นทาง):', body.includes('มั่นใจได้ทุกเส้นทาง'));
    });
  });
}

fetchProd();
