const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPORT_DIR = path.join(__dirname, 'reports');
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const HOMEPAGE_URL = 'http://localhost:3000/';
const REPRESENTATIVE_TEMPLATES = [
  { name: 'areas', url: 'http://localhost:3000/areas' },
  { name: 'service-hub', url: 'http://localhost:3000/service/bkk-thonburi' },
  { name: 'service-item', url: 'http://localhost:3000/service/bkk-thonburi/moving' },
  { name: 'blog-post', url: 'http://localhost:3000/blog/moving-house-checklist' }
];

const RUNS = 3;

function runLighthouseAudit(targetUrl, outputPath) {
  console.log(`\n==============================================`);
  console.log(`Auditing ${targetUrl}...`);
  console.log(`Saving to: ${outputPath}`);
  console.log(`==============================================`);

  const cmd = `npx lighthouse ${targetUrl} --categories=performance,accessibility,best-practices,seo --emulated-form-factor=mobile --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox"`;
  
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
    targetUrl,
    timestamp: report.fetchTime,
    lighthouseVersion: report.lighthouseVersion,
    scores: {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100)
    },
    metrics: {
      fcp: Math.round(audits['first-contentful-paint']?.numericValue || 0),
      lcp: Math.round(audits['largest-contentful-paint']?.numericValue || 0),
      tbt: Math.round(audits['total-blocking-time']?.numericValue || 0),
      cls: Number((audits['cumulative-layout-shift']?.numericValue || 0).toFixed(4)),
      ttfb: Math.round(audits['server-response-time']?.numericValue || 0)
    },
    lcpBreakdown: lcpSubparts,
    lcpElement: lcpElementSnippet
  };

  console.log(`Scores:`, result.scores);
  console.log(`Metrics:`, result.metrics);
  return result;
}

async function main() {
  console.log('🚀 STARTING POST-OPTIMIZATION LIGHTHOUSE AUDITS...');

  // 1. Homepage 3 runs
  const homepageResults = [];
  for (let i = 1; i <= RUNS; i++) {
    const outPath = path.join(REPORT_DIR, `post-opt-run-${i}.json`);
    const res = runLighthouseAudit(HOMEPAGE_URL, outPath);
    res.run = i;
    homepageResults.push(res);
  }

  const sorted = [...homepageResults].sort((a, b) => a.scores.performance - b.scores.performance);
  const homepageMedian = sorted[Math.floor(sorted.length / 2)];

  // 2. Representative Templates
  const templateResults = [];
  for (const t of REPRESENTATIVE_TEMPLATES) {
    const outPath = path.join(REPORT_DIR, `post-opt-template-${t.name}.json`);
    const res = runLighthouseAudit(t.url, outPath);
    res.name = t.name;
    templateResults.push(res);
  }

  const summary = {
    evaluatedAt: new Date().toISOString(),
    commit: execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim(),
    nextVersion: require('../package.json').dependencies.next,
    homepage: {
      runs: homepageResults,
      median: homepageMedian
    },
    representativeTemplates: templateResults
  };

  const summaryPath = path.join(REPORT_DIR, 'post-opt-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log('\n==============================================');
  console.log('🏁 POST-OPTIMIZATION AUDITS COMPLETE!');
  console.log(`Summary saved to ${summaryPath}`);
  console.log('Homepage Median Result:', homepageMedian.scores, homepageMedian.metrics);
  console.log('==============================================\n');
}

main().catch(err => {
  console.error('Fatal error running audits:', err);
  process.exit(1);
});
