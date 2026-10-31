const https = require('https');

function check() {
  return new Promise((resolve) => {
    https.get('https://wms-transport.com/robots.txt?t=' + Date.now(), {
      headers: { 'Cache-Control': 'no-cache, no-store' }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const hasPreviewDisallow = data.includes('/preview/');
        resolve({
          statusCode: res.statusCode,
          hasPreviewDisallow,
          date: res.headers['date'],
          age: res.headers['age'],
          robotsText: data
        });
      });
    }).on('error', () => resolve({ statusCode: 0, hasPreviewDisallow: false }));
  });
}

async function poll() {
  console.log('Polling production for deployment of commit 5ac2051...');
  for (let i = 1; i <= 20; i++) {
    const res = await check();
    console.log(`[Attempt ${i}/20] Status: ${res.statusCode}, Disallow /preview/ present: ${res.hasPreviewDisallow}, Age: ${res.age}`);
    if (res.hasPreviewDisallow) {
      console.log('🎉 Production deployment LIVE with commit 5ac2051!');
      return true;
    }
    await new Promise(r => setTimeout(r, 6000));
  }
  console.log('Still waiting or cached...');
  return false;
}

poll();

