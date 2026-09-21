/**
 * SEO Data Integrity & Quality Validator for WMS TRANSPORT
 * Enforces Google Search Essentials, Schema.org standards, and claude-seo guidelines.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');

function loadTs(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${relPath}`);
  }
  const code = fs.readFileSync(fullPath, 'utf8');
  const js = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', js);
  fn(mod, mod.exports, (p) => {
    if (p === './site-config' || p === '@/lib/seo/site-config') {
      return loadTs('src/lib/seo/site-config.ts');
    }
    if (p === './schema' || p === '@/lib/seo/schema') {
      return loadTs('src/lib/seo/schema.ts');
    }
    if (p === './breadcrumbs' || p === '@/lib/seo/breadcrumbs') {
      return loadTs('src/lib/seo/breadcrumbs.ts');
    }
    if (p === '@/data/searchIntentMap' || p === './searchIntentMap') {
      return loadTs('src/data/searchIntentMap.ts');
    }
    if (p === '@/data/districtLandingPages' || p === './districtLandingPages') {
      return loadTs('src/data/districtLandingPages.ts');
    }
    if (p === '@/data/guidesData' || p === './guidesData') {
      return loadTs('src/data/guidesData.ts');
    }
    if (p === '@/data/mediaEvidence' || p === './mediaEvidence') {
      return loadTs('src/data/mediaEvidence.ts');
    }
    if (p === '@/data/approvedRouteCorridors' || p === './approvedRouteCorridors') {
      return loadTs('src/data/approvedRouteCorridors.ts');
    }
    throw new Error(`External require not supported in validator: ${p}`);
  }, path.dirname(fullPath), fullPath);
  return mod.exports;
}

let errors = [];
let warnings = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function warn(condition, message) {
  if (!condition) {
    warnings.push(message);
  }
}

console.log('🔍 Running WMS TRANSPORT Strict SEO & Source-of-Truth Validator...\n');

// 1. Load authoritative datasets
let siteConfig, searchIntentMap, districtLandingPages, guidesData, portfolioCasesData, schemaHelper, approvedRouteCorridorsMod;

try {
  siteConfig = loadTs('src/lib/seo/site-config.ts').siteConfig;
  searchIntentMap = loadTs('src/data/searchIntentMap.ts').searchIntentMap;
  districtLandingPages = loadTs('src/data/districtLandingPages.ts').districtLandingPages;
  guidesData = loadTs('src/data/guidesData.ts').guidesData;
  portfolioCasesData = loadTs('src/data/mediaEvidence.ts').portfolioCasesData;
  schemaHelper = loadTs('src/lib/seo/schema.ts');
  approvedRouteCorridorsMod = loadTs('src/data/approvedRouteCorridors.ts');
} catch (e) {
  console.error('❌ Failed to load TypeScript datasets:', e.message);
  process.exit(1);
}

const baseUrl = siteConfig.baseUrl || 'https://wms-transport.com';

// ==========================================
// CHECK 1: SITE CONFIG & BRAND INDEPENDENCE
// ==========================================
console.log('1️⃣ Checking siteConfig & brand independence...');
assert(siteConfig.businessName === 'WMS TRANSPORT', `[BRAND ERROR] Unexpected business name: ${siteConfig.businessName}`);
assert(baseUrl.startsWith('https://'), `[BASEURL ERROR] baseUrl must start with https:// (found ${baseUrl})`);
assert(!baseUrl.includes('mj-th'), `[LEAK ERROR] baseUrl contains mj-th!`);
assert(!siteConfig.phone.includes('095-583-0371'), `[LEAK ERROR] Reference phone found in siteConfig!`);
assert(siteConfig.phone.length >= 9, `[PHONE ERROR] Invalid phone length`);

// ==========================================
// CHECK 2: CANONICAL URL & HOST CONSISTENCY
// ==========================================
console.log('2️⃣ Checking canonical URLs and host consistency...');
const canonicalUrls = new Set();

function validateCanonical(pathOrUrl, context) {
  assert(typeof pathOrUrl === 'string' && pathOrUrl.length > 0, `[CANONICAL EMPTY] Empty canonical in ${context}`);
  const fullUrl = pathOrUrl.startsWith('http') ? pathOrUrl : `${baseUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
  
  try {
    const parsed = new URL(fullUrl);
    assert(parsed.origin === new URL(baseUrl).origin, `[HOST MISMATCH] Host ${parsed.origin} does not match baseUrl ${baseUrl} in ${context}`);
    assert(!fullUrl.includes('localhost'), `[LOCALHOST LEAK] Localhost found in canonical: ${fullUrl}`);
    assert(!fullUrl.includes('vercel.app'), `[VERCEL LEAK] vercel.app found in canonical: ${fullUrl}`);
  } catch (e) {
    errors.push(`[INVALID CANONICAL] Malformed canonical URL "${fullUrl}" in ${context}`);
  }

  canonicalUrls.add(fullUrl);
}

Object.values(searchIntentMap).forEach(item => {
  validateCanonical(item.canonicalPath, `Intent: ${item.primaryKeyword}`);
});

Object.values(districtLandingPages).forEach(item => {
  validateCanonical(`/areas/${item.province}/${item.districtSlug}`, `District: ${item.districtSlug}`);
});

Object.values(guidesData).forEach(item => {
  validateCanonical(`/guides/${item.slug}`, `Guide: ${item.slug}`);
});

Object.values(portfolioCasesData).forEach(item => {
  validateCanonical(`/portfolio/${item.slug}`, `Portfolio: ${item.slug}`);
});

// ==========================================
// CHECK 3: ROUTE ALLOWLIST INTEGRITY
// ==========================================
console.log('3️⃣ Checking route corridors allowlist...');
const corridors = approvedRouteCorridorsMod.approvedRouteCorridors || [];
assert(Array.isArray(corridors) && corridors.length === 10, `[ROUTE ALLOWLIST] Expected exactly 10 approved route corridors, found ${corridors.length}`);

corridors.forEach(({ from, to }) => {
  assert(from && to && from !== to, `[ROUTE ERROR] Invalid corridor pair ${from} -> ${to}`);
  validateCanonical(`/route/${from}/${to}`, `Route: ${from} -> ${to}`);
});

// ==========================================
// CHECK 4: ROUTE CONFLICTS & 404 INTEGRITY
// ==========================================
console.log('4️⃣ Checking route conflict resolution & 404 integrity...');
assert(!fs.existsSync(path.join(ROOT, 'src/app/page.tsx')), `[ROUTE CONFLICT] src/app/page.tsx must not exist alongside (marketing)/page.tsx`);
assert(fs.existsSync(path.join(ROOT, 'src/app/(marketing)/page.tsx')), `[HOMEPAGE MISSING] src/app/(marketing)/page.tsx must exist`);
assert(fs.existsSync(path.join(ROOT, 'src/app/not-found.tsx')), `[404 MISSING] src/app/not-found.tsx must exist`);
assert(!fs.existsSync(path.join(ROOT, 'src/components/SocialProofPopup.tsx')), `[SYNTHETIC POPUP] src/components/SocialProofPopup.tsx must be completely deleted`);

// ==========================================
// CHECK 5: COMPREHENSIVE SOURCE SCAN FOR PROHIBITED PATTERNS
// ==========================================
console.log('5️⃣ Scanning src/ for schema abuse, fake branches, synthetic tokens & unsupported claims...');

function walkFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkFiles(full));
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      results.push(full);
    }
  });
  return results;
}

const srcFiles = walkFiles(path.join(ROOT, 'src'));

// Prohibited pattern definitions
const prohibitedPatterns = [
  // Schema Violations
  {
    pattern: /AggregateRating/i,
    name: "Self-serving AggregateRating schema for WMS business",
    allowedIn: []
  },
  {
    pattern: /priceRange\s*[:=]\s*["']\$\$["']/i,
    name: 'Provisional priceRange="$$"',
    allowedIn: ['src/lib/seo/site-config.ts'] // Allowed only in comment
  },
  {
    pattern: /itemType=["']https:\/\/schema\.org\/MovingCompany["']/i,
    name: "Simulated provincial MovingCompany microdata",
    allowedIn: []
  },
  {
    pattern: /itemScope/i,
    name: "itemScope microdata",
    allowedIn: []
  },
  // Fake provincial LocalBusiness entities
  {
    pattern: /"@type"\s*:\s*"LocalBusiness"/i,
    name: "Embedded LocalBusiness branch schema (must reference canonical #moving-company)",
    allowedIn: ['src/lib/seo/schema.ts'] // Canonical entity definition only
  },
  // Synthetic data
  {
    pattern: /WMS-(?:TX|MC|FR)-\d+/i,
    name: "Synthetic booking transaction tokens (WMS-TX-*, WMS-MC-*, WMS-FR-*)",
    allowedIn: []
  },
  {
    pattern: /bookingToken/i,
    name: "Synthetic bookingToken fields",
    allowedIn: []
  },
  {
    pattern: /SocialProofPopup/i,
    name: "SocialProofPopup reference",
    allowedIn: []
  },
  {
    pattern: /liveUpdates\s*=/i,
    name: "Synthetic liveUpdates array",
    allowedIn: []
  },
  // Unsupported numerical / absolute claims
  {
    pattern: /100[,.]?000\s*(?:บาท|THB|บ\.)/i,
    name: "100,000 THB unverified insurance figure",
    allowedIn: []
  },
  {
    pattern: /10[,.]?000\s*(?:บาท|THB|บ\.)/i,
    name: "10,000 THB unverified insurance figure",
    allowedIn: []
  },
  {
    pattern: /20[,.]?000\s*(?:บาท|THB|บ\.)/i,
    name: "20,000 THB unverified insurance figure",
    allowedIn: []
  },
  {
    pattern: /50[,.]?000\s*(?:บาท|THB|บ\.)/i,
    name: "50,000 THB unverified insurance figure",
    allowedIn: []
  },
  {
    pattern: /100k/i,
    name: "100k insurance claim",
    allowedIn: []
  },
  {
    pattern: /10[,.]?000\+/i,
    name: "10,000+ jobs claim",
    allowedIn: []
  },
  {
    pattern: /99%/i,
    name: "99% satisfaction claim",
    allowedIn: []
  },
  {
    pattern: /1\.8\s*ตัน/i,
    name: "1.8 ton unconfirmed payload capacity",
    allowedIn: []
  },
  {
    pattern: /2(?:\.0)?\s*ตัน/i,
    name: "2-ton payload capacity claim",
    allowedIn: []
  },
  {
    pattern: /พิกัด\s*GPS\s*รถขนส่ง/i,
    name: "Unverified GPS live vehicle tracking claim",
    allowedIn: []
  },
  {
    pattern: /ผ่านระบบ\s*GPS/i,
    name: "Unverified GPS tracking claim",
    allowedIn: []
  },
  // Competitor data leaks
  {
    pattern: /mj-th-express/i,
    name: "MJ-TH Express domain leak",
    allowedIn: []
  },
  {
    pattern: /095-583-0371/i,
    name: "MJ-TH phone number leak",
    allowedIn: []
  }
];

let violationsCount = 0;

srcFiles.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');

  prohibitedPatterns.forEach(({ pattern, name, allowedIn }) => {
    if (allowedIn && allowedIn.includes(relPath)) {
      return;
    }
    if (pattern.test(content)) {
      errors.push(`[RULE VIOLATION] Found "${name}" in ${relPath}`);
      violationsCount++;
    }
  });
});

if (violationsCount === 0) {
  console.log('   ✅ All src/ files are 100% clean of schema abuse, fake branches, synthetic data, and unsupported claims.');
}

// ==========================================
// CHECK 6: LOCAL SEO BEST PRACTICES & LIGHTWEIGHT WARNINGS
// ==========================================
console.log('6️⃣ Checking local SEO best practices, titles, keywords & internal links...');

// 6.1 Title length & duplicate titles
const registeredTitles = new Map();

function checkTitle(title, pageContext) {
  if (!title) return;
  // Lightweight warning for overly long title (> 65 chars recommended SERP display limit)
  warn(title.length <= 65, `[TITLE LENGTH] Title in "${pageContext}" exceeds 65 characters (${title.length} chars): "${title}"`);
  
  // Warning for duplicate titles
  if (registeredTitles.has(title)) {
    warn(false, `[DUPLICATE TITLE] Duplicate title detected between "${pageContext}" and "${registeredTitles.get(title)}": "${title}"`);
  } else {
    registeredTitles.set(title, pageContext);
  }
}

// Check searchIntentMap titles
Object.entries(searchIntentMap).forEach(([key, item]) => {
  checkTitle(item.title, `Intent: ${key}`);
});

// Check district titles & identical H1/title patterns
Object.entries(districtLandingPages).forEach(([slug, record]) => {
  const pageTitle = record.seoTitle || `${record.primaryIntent} | ${siteConfig.businessName}`;
  checkTitle(pageTitle, `District: ${slug}`);

  // 6.2 Identical H1/title patterns across local pages
  warn(pageTitle !== record.h1, `[IDENTICAL H1/TITLE] District "${slug}" has identical title and H1: "${pageTitle}"`);
});

// 6.3 Location keywords assigned to multiple primary landing pages
const locationKeywordMap = new Map();
Object.entries(districtLandingPages).forEach(([slug, record]) => {
  const locKey = record.districtThaiName;
  if (locKey) {
    if (locationKeywordMap.has(locKey)) {
      warn(false, `[KEYWORD CANNIBALIZATION] Primary location keyword "${locKey}" is assigned to multiple landing pages: "${slug}" and "${locationKeywordMap.get(locKey)}"`);
    } else {
      locationKeywordMap.set(locKey, slug);
    }
  }
});

// 6.4 Unsupported claims audit (response times, vehicle height, equipment, pricing, 24-hr)
const unverifiedClaimPatterns = [
  { pattern: /(?:ตอบไว|ตอบกลับ|ประเมินราคา(?:ฟรี)?(?:ภายใน|ใน))\s*\d+\s*นาที/i, name: "Unsupported exact response time claim (X minutes)" },
  { pattern: /รับประกัน\s*\d+%/i, name: "Unverified guarantee percentage" },
  { pattern: /เจ้าเดียวใน/i, name: "Unverified exclusivity claim (เจ้าเดียวใน...)" },
  { pattern: /อันดับ\s*1\s*ใน/i, name: "Unverified ranking claim (อันดับ 1 ใน...)" },
  { pattern: /ความสูงภายใน(?:\s*ตู้)?\s*2\.1\s*(?:เมตร|ม\.)/i, name: "Unsupported exact vehicle height claim (2.1 เมตร)" },
  { pattern: /สายรัด\s*Ratchet\s*Strap/i, name: "Unsupported specific equipment claim (Ratchet Strap)" },
  { pattern: /ราคาเริ่มต้น\s*1,500\s*บาท/i, name: "Unsupported exact starting price claim (1,500 บาท)" },
];

srcFiles.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  if (
    relPath === 'src/components/ThonburiHubView.tsx' ||
    relPath === 'src/app/(marketing)/service/[province]/page.tsx' ||
    relPath === 'src/app/(marketing)/areas/[province]/[district]/page.tsx'
  ) {
    const content = fs.readFileSync(file, 'utf8');
    unverifiedClaimPatterns.forEach(({ pattern, name }) => {
      if (pattern.test(content)) {
        warn(false, `[UNVERIFIED LOCAL CLAIM] Found "${name}" in ${relPath}`);
      }
    });
  }
});

// 6.5 Multiple LocalBusiness entities representing service areas
srcFiles.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  if (relPath.startsWith('src/app/(marketing)/areas') || relPath.startsWith('src/app/(marketing)/service')) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('"@type": "LocalBusiness"') || content.includes('"@type":"LocalBusiness"')) {
      assert(false, `[PROHIBITED LOCALBUSINESS ENTITY] Found LocalBusiness entity in service-area route ${relPath}. Service area pages must only use Service schema referencing root business entity.`);
    }
  }
});

// 6.6 Location-specific image claims without verified evidence
Object.entries(districtLandingPages).forEach(([slug, record]) => {
  const hasVerifiedEvidence = record.evidenceItems?.some(e => e.verificationStatus === 'verified');
  if (!hasVerifiedEvidence && record.images) {
    record.images.forEach((img, idx) => {
      const landmarkKeywords = ['MRT', 'BTS', 'ตลาดทะเลไทย', 'เดอะมอลล์', 'สถานี'];
      const mentionsLandmark = landmarkKeywords.some(kw => (img.alt && img.alt.includes(kw)) || (img.caption && img.caption.includes(kw)));
      warn(!mentionsLandmark, `[UNVERIFIED LANDMARK CLAIM IN IMAGE] District "${slug}" image #${idx + 1} makes location-specific landmark claim without verified evidence: "${img.caption || img.alt}"`);
    });
  }
});

// 6.7 Target pages incoming internal links (Homepage and contextual pricing pages)
const targetLocalPages = [
  { url: '/service/bkk-thonburi', name: 'Thonburi Hub' },
  { url: '/areas/bkk-thonburi/bang-khae', name: 'Bang Khae District' },
  { url: '/service/samutsakhon', name: 'Samut Sakhon Hub' },
  { url: '/areas/samutsakhon/maha-chai', name: 'Maha Chai District' },
];

const serviceMapFile = path.join(ROOT, 'src/components/ServiceMap.tsx');
if (fs.existsSync(serviceMapFile)) {
  const serviceMapContent = fs.readFileSync(serviceMapFile, 'utf8');
  targetLocalPages.forEach(target => {
    assert(serviceMapContent.includes(target.url), `[HOMEPAGE MISSING LINK] Homepage (ServiceMap.tsx) is missing a crawlable link to target page "${target.url}" (${target.name})`);
  });
}

const movingPricingFile = path.join(ROOT, 'src/app/(marketing)/pricing/moving/page.tsx');
if (fs.existsSync(movingPricingFile)) {
  const movingContent = fs.readFileSync(movingPricingFile, 'utf8');
  assert(movingContent.includes('/service/bkk-thonburi'), `[CONTEXTUAL LINK MISSING] /pricing/moving is missing link to /service/bkk-thonburi`);
  assert(movingContent.includes('/areas/bkk-thonburi/bang-khae'), `[CONTEXTUAL LINK MISSING] /pricing/moving is missing link to /areas/bkk-thonburi/bang-khae`);
}

const freightPricingFile = path.join(ROOT, 'src/app/(marketing)/pricing/freight/page.tsx');
if (fs.existsSync(freightPricingFile)) {
  const freightContent = fs.readFileSync(freightPricingFile, 'utf8');
  assert(freightContent.includes('/service/samutsakhon'), `[CONTEXTUAL LINK MISSING] /pricing/freight is missing link to /service/samutsakhon`);
  assert(freightContent.includes('/areas/samutsakhon/maha-chai'), `[CONTEXTUAL LINK MISSING] /pricing/freight is missing link to /areas/samutsakhon/maha-chai`);
}

// 6.8 Duplicate exact-match anchors repeated sitewide
const genericOrRepetitiveAnchors = ['คลิกที่นี่', 'ดูรายละเอียด', 'อ่านต่อ', 'คลิกเลย', 'click here'];
srcFiles.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  if (relPath.startsWith('src/app/(marketing)') || relPath.startsWith('src/components')) {
    const content = fs.readFileSync(file, 'utf8');
    genericOrRepetitiveAnchors.forEach(anchor => {
      const regex = new RegExp(`>\\s*${anchor}\\s*<`, 'i');
      if (regex.test(content)) {
        warn(false, `[GENERIC ANCHOR TEXT] Found low-quality anchor "${anchor}" in ${relPath}. Use descriptive destination anchors.`);
      }
    });
  }
});

// 6.9 Metadata that does not match the page's assigned primary intent
Object.entries(districtLandingPages)
  .filter(([, record]) => record.isIndexable && record.status === 'published')
  .forEach(([slug, record]) => {
    const intentKey = record.districtThaiName;
    const titleMatches = record.seoTitle ? record.seoTitle.includes(intentKey) : false;
    const h1Matches = record.h1.includes(intentKey);
    const descMatches = record.metaDescription ? record.metaDescription.includes(intentKey) : false;
    warn(titleMatches, `[METADATA INTENT MISMATCH] District "${slug}" title does not reflect primary intent key "${intentKey}"`);
    warn(h1Matches, `[METADATA INTENT MISMATCH] District "${slug}" H1 does not reflect primary intent key "${intentKey}"`);
    warn(descMatches, `[METADATA INTENT MISMATCH] District "${slug}" meta description does not reflect primary intent key "${intentKey}"`);
  });

// 6.10 District pages missing an incoming contextual internal link from parent hub
const hubFiles = [
  { province: 'bkk-thonburi', file: 'src/components/ThonburiHubView.tsx' },
  { province: 'samutsakhon', file: 'src/app/(marketing)/service/[province]/page.tsx' },
];

const hubContents = {};
hubFiles.forEach(({ province, file }) => {
  const fullPath = path.join(ROOT, file);
  if (fs.existsSync(fullPath)) {
    hubContents[province] = fs.readFileSync(fullPath, 'utf8');
  }
});

Object.values(districtLandingPages)
  .filter(record => record.isIndexable && record.status === 'published')
  .forEach(record => {
    const parentHubContent = hubContents[record.province];
    if (parentHubContent) {
      const linkPattern = `/areas/${record.province}/${record.districtSlug}`;
      const hasLink = parentHubContent.includes(linkPattern);
      warn(hasLink, `[DISTRICT MISSING INCOMING LINK] Published district page "${linkPattern}" is missing an incoming contextual internal link from its parent hub (${record.province})`);
    }
  });

// ==========================================
// SUMMARY
// ==========================================
console.log('\n==========================================');
console.log('📊 WMS SEO DATA VALIDATION SUMMARY');
console.log('==========================================');
console.log(`Verified Canonical URLs: ${canonicalUrls.size}`);
console.log(`Errors Found:            ${errors.length}`);
console.log(`Warnings Found:          ${warnings.length}`);

if (warnings.length > 0) {
  console.log('\n⚠️ WARNINGS:');
  warnings.forEach(w => console.log('  ' + w));
}

if (errors.length > 0) {
  console.log('\n❌ ERRORS:');
  errors.forEach(e => console.log('  ' + e));
  console.log('\n💥 VALIDATION FAILED!');
  process.exit(1);
} else {
  console.log('\n✅ ALL WMS SEO DATA CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
}
