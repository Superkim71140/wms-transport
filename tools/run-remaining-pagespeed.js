/**
 * WMS SEO Monitor - Batch PageSpeed Audit Runner for Remaining Templates
 */

const fs = require('fs');
const path = require('path');

// Load environment variables safely
const envFile = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq !== -1) {
      const k = trimmed.slice(0, eq).trim();
      let v = trimmed.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

const {
  REPRESENTATIVE_TEMPLATES,
  auditSingleUrl
} = require('../src/lib/seo-monitor/pagespeed-client');

const {
  getSeoSnapshot,
  saveSeoSnapshot,
  closePgPool
} = require('../src/lib/seo-monitor/seo-store');

async function main() {
  console.log('========================================================');
  console.log('   WMS SEO Monitor - Running Remaining PageSpeed Audits');
  console.log('========================================================\n');

  const snapshot = await getSeoSnapshot();
  const existingAudits = Array.isArray(snapshot.pageSpeedAudits) ? [...snapshot.pageSpeedAudits] : [];

  // Generate targets
  const allTasks = [];
  for (const tpl of REPRESENTATIVE_TEMPLATES) {
    for (const device of ['mobile', 'desktop']) {
      // Check if already completed recently
      const existing = existingAudits.find(
        (a) => a.url === tpl.url && a.device === device && a.status === 'completed'
      );
      if (existing) {
        console.log(`[SKIP] Already completed: ${tpl.templateName} (${device}) -> Score: ${existing.performanceScore}/100`);
      } else {
        allTasks.push({ url: tpl.url, device, templateName: tpl.templateName });
      }
    }
  }

  console.log(`\nRemaining audits to run: ${allTasks.length}\n`);

  for (let i = 0; i < allTasks.length; i++) {
    const task = allTasks[i];
    console.log(`[${i + 1}/${allTasks.length}] Auditing: ${task.templateName} (${task.device}) -> ${task.url}`);

    const record = await auditSingleUrl(task.url, task.device, task.templateName);
    console.log(`    Status: ${record.status}`);
    if (record.status === 'completed') {
      console.log(`    Score: ${record.performanceScore}/100 | FCP: ${record.fcp}ms | LCP: ${record.lcp}ms | CLS: ${record.cls} | TBT: ${record.tbt}ms`);
      console.log(`    CrUX Field Data: ${record.hasCruxData ? 'Available' : 'Insufficient Field Data (Not Assumed Passing)'}`);
    } else {
      console.error(`    Error: ${record.errorMessage}`);
    }

    // Save incrementally
    const idx = existingAudits.findIndex((a) => a.url === record.url && a.device === record.device);
    if (idx >= 0) {
      existingAudits[idx] = record;
    } else {
      existingAudits.push(record);
    }

    snapshot.pageSpeedAudits = existingAudits;
    await saveSeoSnapshot(snapshot);
    console.log(`    Saved to snapshot (${snapshot.storageEngine}).\n`);

    // Pacing delay between requests to stay well within quotas
    if (i < allTasks.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log('========================================================');
  console.log('🎉 ALL REPRESENTATIVE PAGESPEED AUDITS COMPLETED');
  console.log('========================================================');
}

main()
  .catch((e) => {
    console.error('Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    try {
      await closePgPool();
    } catch {}
  });

