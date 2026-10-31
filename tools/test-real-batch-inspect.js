const fs = require('fs');

let passcode = '';
if (fs.existsSync('.env.local')) {
  for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    if (line.startsWith('SEO_DASHBOARD_PASSCODE=')) {
      passcode = line.split('=')[1].trim().replace(/^["']|["']$/g, '');
    }
  }
}

async function runBatchInspect() {
  console.log('Testing live batch inspection via http://localhost:3000/api/seo-monitor/inspect-batch (batchSize: 3)...');
  const res = await fetch('http://localhost:3000/api/seo-monitor/inspect-batch', {
    method: 'POST',
    headers: {
      'x-seo-passcode': passcode,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ batchSize: 3 })
  });

  console.log('HTTP Status:', res.status, res.statusText);
  const data = await res.json();
  if (!res.ok) {
    console.error('Batch inspection failed:', data.error);
    process.exit(1);
  }

  console.log('Batch inspection succeeded!');
  console.log('  Inspected this run:', data.inspectedThisRun);
  console.log('  Batch Size:', data.batchSize);
  console.log('  Progress:', data.progress);
  console.log('  Inspected URLs:');
  for (const item of (data.results || [])) {
    console.log(`    - [${item.status}] ${item.inspectionUrl} (verdict: ${item.verdict}, coverage: ${item.coverageState})`);
  }
}

runBatchInspect().catch(console.error);

