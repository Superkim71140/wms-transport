const fs = require('fs');

let passcode = '';
if (fs.existsSync('.env.local')) {
  for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    if (line.startsWith('SEO_DASHBOARD_PASSCODE=')) {
      passcode = line.split('=')[1].trim().replace(/^["']|["']$/g, '');
    }
  }
}

async function runSync() {
  console.log('Testing live authenticated sync via http://localhost:3000/api/seo-monitor/sync...');
  const res = await fetch('http://localhost:3000/api/seo-monitor/sync', {
    method: 'POST',
    headers: {
      'x-seo-passcode': passcode,
      'Content-Type': 'application/json'
    }
  });

  console.log('HTTP Status:', res.status, res.statusText);
  const data = await res.json();
  if (!res.ok) {
    console.error('Sync failed:', data.error);
    process.exit(1);
  }

  console.log('Sync succeeded!');
  console.log('  Site URL:', data.snapshot?.siteUrl);
  console.log('  Last Sync At:', data.snapshot?.lastSyncAt);
  console.log('  Storage Engine:', data.snapshot?.storageEngine);
  console.log('  Sitemaps Count:', (data.snapshot?.sitemaps || []).length);
  console.log('  Inspections Count:', (data.snapshot?.inspections || []).length);
  console.log('  Analytics 28d Rows:', (data.snapshot?.analyticsLatest28d || []).length);
  console.log('  Site Aggregates:', data.snapshot?.siteAggregatesLatest28d);
  console.log('  Alerts Count:', (data.snapshot?.alerts || []).length);
  console.log('  PageSpeed Audits Count:', (data.snapshot?.pageSpeedAudits || []).length);
}

runSync().catch(console.error);

