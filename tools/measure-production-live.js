const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPORT_DIR = path.join(__dirname, 'reports');
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const PROD_URL = 'https://wms-transport.com/';
const RUNS = 3;

function runAudit(runIndex) {
  const outputPath = path.join(REPORT_DIR, `prod-live-run-${runIndex}.json`);
  console.log(`\n==============================================`);
  console.log(`[Run ${runIndex}/${RUNS}] Auditing ${PROD_URL}...`);
  console.log(`==============================================`);

  const cmd = `npx lighthouse ${PROD_URL} --categories=performance,accessibility,best-practices,seo --emulated-form-factor=mobile --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox"`;
  execSync(cmd, { stdio: 'inherit' });

  const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  const audits = report.audits;
  const categories = report.categories;

  // LCP breakdown
  let lcpSubparts = {
    ttfb: 0,
    loadDelay: 0,
    loadDuration: 0,
    renderDelay: 0
  };
  let lcpElementSnippet = '';

  const lcpInsight = audits['lcp-breakdown-insight'];
  if (lcpInsight && lcpInsight.details && lcpInsight.details.items) {
    for (const item of lcpInsight.details.items) {
      if (item.type === 'table' && item.items) {
        for (const sub of item.items) {
          if (sub.subpart === 'timeToFirstByte') lcpSubparts.ttfb = Math.round(sub.duration);
          if (sub.subpart === 'resourceLoadDelay') lcpSubparts.loadDelay = Math.round(sub.duration);
          if (sub.subpart === 'resourceLoadDuration') lcpSubparts.loadDuration = Math.round(sub.duration);
          if (sub.subpart === 'elementRenderDelay') lcpSubparts.renderDelay = Math.round(sub.duration);
        }
      }
      if (item.type === 'node') {
        lcpElementSnippet = item.snippet || item.selector || '';
      }
    }
  }

  // Best practices failures
  const bpFailures = [];
  for (const ref of categories['best-practices'].auditRefs) {
    const a = audits[ref.id];
    if (a && a.score !== null && a.score < 1) {
      bpFailures.push({ id: ref.id, title: a.title, score: a.score, displayValue: a.displayValue || '' });
    }
  }

  const result = {
    run: runIndex,
    timestamp: report.fetchTime,
    scores: {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100)
    },
    throttledMetrics: {
      fcp: Math.round(audits['first-contentful-paint']?.numericValue || 0),
      lcp: Math.round(audits['largest-contentful-paint']?.numericValue || 0),
      tbt: Math.round(audits['total-blocking-time']?.numericValue || 0),
      cls: Number((audits['cumulative-layout-shift']?.numericValue || 0).toFixed(4)),
      ttfb: Math.round(audits['server-response-time']?.numericValue || 0)
    },
    unthrottledLcpSubparts: lcpSubparts,
    lcpElement: lcpElementSnippet,
    bestPracticesFailures: bpFailures
  };

  console.log(`Run ${runIndex} Scores:`, result.scores);
  console.log(`Run ${runIndex} Throttled Metrics:`, result.throttledMetrics);
  console.log(`Run ${runIndex} Unthrottled LCP Subparts:`, result.unthrottledLcpSubparts);
  return result;
}

async function main() {
  const results = [];
  for (let i = 1; i <= RUNS; i++) {
    results.push(runAudit(i));
  }

  const sorted = [...results].sort((a, b) => a.scores.performance - b.scores.performance);
  const median = sorted[Math.floor(sorted.length / 2)];

  const summary = {
    target: PROD_URL,
    runs: results,
    median: median
  };

  fs.writeFileSync(path.join(REPORT_DIR, 'prod-live-summary.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log('\n==============================================');
  console.log('🏁 PROD LIVE MEASUREMENTS COMPLETE');
  console.log('Median Scores:', median.scores);
  console.log('Median Throttled Metrics:', median.throttledMetrics);
  console.log('Median Unthrottled LCP:', median.unthrottledLcpSubparts);
  console.log('Best Practices Failures on Prod:', median.bestPracticesFailures);
  console.log('==============================================');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
