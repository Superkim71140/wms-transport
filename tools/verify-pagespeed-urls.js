const urls = [
  { url: 'https://wms-transport.com/', template: 'Homepage' },
  { url: 'https://wms-transport.com/areas', template: 'Service Hub Directory' },
  { url: 'https://wms-transport.com/service/bkk-thonburi', template: 'Regional Service Hub' },
  { url: 'https://wms-transport.com/service/bkk-thonburi/moving', template: 'Subservice Moving Detail' },
  { url: 'https://wms-transport.com/blog/moving-house-checklist', template: 'Article Detail Page' }
];

async function checkUrls() {
  console.log('Verifying representative public URLs:');
  let allValid = true;
  for (const item of urls) {
    try {
      const res = await fetch(item.url, { method: 'HEAD', headers: { 'User-Agent': 'WMS-PageSpeed-Verifier/1.0' } });
      const ok = res.status === 200;
      if (!ok) allValid = false;
      console.log(`  [${res.status}] ${item.template}: ${item.url}`);
    } catch (err) {
      allValid = false;
      console.error(`  [FAIL] ${item.template}: ${item.url} -> ${err.message}`);
    }
  }
  console.log('\nAll 5 representative templates valid 200 OK:', allValid);
}

checkUrls().catch(console.error);
