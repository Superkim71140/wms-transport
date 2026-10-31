const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPORT_DIR = path.join(__dirname, 'reports');
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const TARGET_URL = 'http://localhost:3000/';
const RUNS = 3;

async function runLighthouse(runIndex) {
  const outputPath = path.join(REPORT_DIR, `baseline-run-${runIndex}.json`);
  console.log(`\n==============================================`);
  console.log(`[Run ${runIndex}/${RUNS}] Auditing ${TARGET_URL}...`);
  console.log(`==============================================`);

  const cmd = `npx lighthouse ${TARGET_URL} --categories=performance,accessibility,best-practices,seo --emulated-form-factor=mobile --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox"`;
  
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
          if (sub.subpart === 'timeToFirstByte') lcpSubparts.ttfb = sub.duration;
          if (sub.subpart === 'resourceLoadDelay') lcpSubparts.loadDelay = sub.duration;
          if (sub.subpart === 'resourceLoadDuration') lcpSubparts.loadDuration = sub.duration;
          if (sub.subpart === 'elementRenderDelay') lcpSubparts.renderDelay = sub.duration;
        }
      }
      if (item.type === 'node') {
        lcpElementSnippet = item.snippet || item.selector || '';
      }
    }
  }

  const result = {
    run: runIndex,
    timestamp: report.fetchTime,
    lighthouseVersion: report.lighthouseVersion,
    scores: {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100)
    },
    metrics: {
      fcp: Math.round(audits['first-contentful-paint'].numericValue),
      lcp: Math.round(audits['largest-contentful-paint'].numericValue),
      tbt: Math.round(audits['total-blocking-time'].numericValue),
      cls: Number(audits['cumulative-layout-shift'].numericValue.toFixed(4)),
      ttfb: Math.round(audits['server-response-time']?.numericValue || 0)
    },
    lcpBreakdown: lcpSubparts,
    lcpElement: lcpElementSnippet
  };

  console.log(`Results Run ${runIndex}:`, result.scores, result.metrics);
  return result;
}

async function main() {
  const results = [];
  for (let i = 1; i <= RUNS; i++) {
    const res = await runLighthouse(i);
    results.push(res);
  }

  // Calculate Median based on Performance Score (or LCP if score is identical)
  const sorted = [...results].sort((a, b) => a.scores.performance - b.scores.performance);
  const median = sorted[Math.floor(sorted.length / 2)];

  const summary = {
    targetUrl: TARGET_URL,
    runsCount: RUNS,
    commit: execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim(),
    nextVersion: require('../package.json').dependencies.next,
    runs: results,
    median: median
  };

  fs.writeFileSync(path.join(REPORT_DIR, 'baseline-summary.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log('\n==============================================');
  console.log('🏁 BASELINE MEASUREMENTS COMPLETE');
  console.log('Median Performance Score:', median.scores.performance);
  console.log('Median LCP:', median.metrics.lcp, 'ms');
  console.log('Median FCP:', median.metrics.fcp, 'ms');
  console.log('Median TBT:', median.metrics.tbt, 'ms');
  console.log('Median CLS:', median.metrics.cls);
  console.log('Median TTFB:', median.metrics.ttfb, 'ms');
  console.log('LCP Breakdown:', median.lcpBreakdown);
  console.log('==============================================\n');
}

main().catch(console.error);

