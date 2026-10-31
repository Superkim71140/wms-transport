const fs = require('fs');

let passcode = '';
if (fs.existsSync('.env.local')) {
  for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    if (line.startsWith('SEO_DASHBOARD_PASSCODE=')) {
      passcode = line.split('=')[1].trim().replace(/^["']|["']$/g, '');
    }
  }
}

async function check() {
  const res = await fetch('http://localhost:3000/api/seo-monitor/pagespeed', {
    headers: { 'x-seo-passcode': passcode }
  });
  console.log('HTTP Status:', res.status);
  const data = await res.json();
  console.log('PageSpeed configured in server:', data.configured);
  console.log('Audits count:', (data.audits || []).length);
  const mobileAudit = (data.audits || []).find(
    (a) => a.url === 'https://wms-transport.com/' && a.device === 'mobile'
  );
  if (mobileAudit) {
    console.log('Found Mobile Audit in Dashboard API:');
    console.log('  Status:', mobileAudit.status);
    console.log('  Performance Score:', mobileAudit.performanceScore);
    console.log('  FCP:', mobileAudit.fcp, 'ms');
    console.log('  LCP:', mobileAudit.lcp, 'ms');
    console.log('  CLS:', mobileAudit.cls);
    console.log('  TBT:', mobileAudit.tbt, 'ms');
    console.log('  Audited At:', mobileAudit.auditedAt);
  } else {
    console.log('Mobile audit not found in dashboard audits array!');
  }
}

check().catch(console.error);

