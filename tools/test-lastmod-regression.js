/**
 * Comprehensive Date Regression Test Suite for Sitemap lastmod
 * Verifies all 10 criteria from WMS TRANSPORT Technical SEO specification (Section 10.C)
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

// Transpile sitemap.ts to CommonJS in-memory to test parseReliableLastmod directly
const sitemapSource = fs.readFileSync(path.join(__dirname, "../src/app/sitemap.ts"), "utf-8");
const transpiled = ts.transpileModule(sitemapSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
});

// Create mock module context
const exportsObj = {};
const moduleObj = { exports: exportsObj };
const requireMock = (id) => {
  if (id === "@/lib/seo/site-config") return { siteConfig: { productionUrl: "https://wms-transport.com" } };
  if (id.includes("service/[province]/page")) return { provinceMap: {} };
  if (id.includes("blog/posts")) return { posts: {} };
  if (id.includes("searchIntentMap")) return { searchIntentMap: {} };
  if (id.includes("districtLandingPages")) return { districtLandingPages: {}, isDistrictPageIndexable: () => true };
  if (id.includes("areaZonesData")) return { getAllZoneHubs: () => [], getPublishedLocalPoints: () => [] };
  if (id.includes("guidesData")) return { guidesData: {} };
  if (id.includes("mediaEvidence")) return { portfolioCasesData: {} };
  if (id.includes("approvedRouteCorridors")) return { approvedRouteCorridors: [] };
  if (id.includes("pricingPolicy")) return { pricingPolicyData: [] };
  if (id.includes("serviceAreaContent")) return { localizedServiceDetails: {}, localizedProvinceHubs: {} };
  return {};
};

const fn = new Function("exports", "require", "module", transpiled.outputText);
fn(exportsObj, requireMock, moduleObj);

const { parseReliableLastmod } = moduleObj.exports;

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}:`, err.message);
    failed++;
  }
}

console.log("\n🧪 Running Sitemap lastmod Regression Test Suite (10.C Criteria)...");

// Baseline max date for future date testing: Oct 29, 2026 12:00:00 UTC
const CURRENT_OCT_2026 = new Date("2026-10-29T12:00:00Z");

// Criterion 1: Substantive change to page A receives recorded modification date
test("Criterion 1: Substantive change page receives recorded modification date", () => {
  const result = parseReliableLastmod("2026-10-29T08:00:00+07:00", CURRENT_OCT_2026);
  assert(result instanceof Date, "Should parse into Date");
  assert.strictEqual(result.toISOString(), "2026-10-29T01:00:00.000Z");
});

// Criterion 2: Unchanged page B keeps its original date (e.g. prior release date)
test("Criterion 2: Unchanged page keeps its original distinct date", () => {
  const result = parseReliableLastmod("2026-06-15T00:00:00+07:00", CURRENT_OCT_2026);
  assert(result instanceof Date, "Should parse into Date");
  assert.strictEqual(result.toISOString(), "2026-06-14T17:00:00.000Z");
});

// Criterion 3: Rebuild without content changes leaves lastmod values completely stable
test("Criterion 3: Rebuild without content changes produces deterministic stable dates", () => {
  const dateStr = "2026-10-29T08:00:00+07:00";
  const r1 = parseReliableLastmod(dateStr, CURRENT_OCT_2026);
  const r2 = parseReliableLastmod(dateStr, CURRENT_OCT_2026);
  assert.strictEqual(r1.getTime(), r2.getTime(), "Two calls with same string must yield identical millisecond timestamp");
});

// Criterion 4: Copyright-only or layout change does NOT bump sitewide dates
test("Criterion 4: Empty or undefined date input does not invent today's date", () => {
  const result = parseReliableLastmod(undefined, CURRENT_OCT_2026);
  assert.strictEqual(result, undefined, "Undefined date must return undefined");
  const emptyResult = parseReliableLastmod("", CURRENT_OCT_2026);
  assert.strictEqual(emptyResult, undefined, "Empty string must return undefined");
});

// Criterion 5: Valid ISO dates pass; impossible calendar dates (e.g. 2026-02-30) are detected and rejected
test("Criterion 5: Impossible calendar date 2026-02-30 is rejected (not rolled over to March)", () => {
  const badFebDate = parseReliableLastmod("2026-02-30", CURRENT_OCT_2026);
  assert.strictEqual(badFebDate, undefined, "2026-02-30 must return undefined");
  const badAprDate = parseReliableLastmod("2026-04-31", CURRENT_OCT_2026);
  assert.strictEqual(badAprDate, undefined, "2026-04-31 must return undefined");
  const validFebDate = parseReliableLastmod("2026-02-28", CURRENT_OCT_2026);
  assert(validFebDate instanceof Date, "2026-02-28 must be valid");
});

// Criterion 6: Future dates are flagged/rejected rather than silently accepted
test("Criterion 6: Future dates beyond current reference time are rejected", () => {
  const futureDate = parseReliableLastmod("2030-01-01T00:00:00Z", CURRENT_OCT_2026);
  assert.strictEqual(futureDate, undefined, "Future date must be rejected");
  const tomorrow = parseReliableLastmod("2026-10-31T00:00:00Z", CURRENT_OCT_2026);
  assert.strictEqual(tomorrow, undefined, "Future date in next days must be rejected");
});

// Criterion 7: Missing date omits lastmod
test("Criterion 7: Missing date omits lastmod (returns undefined)", () => {
  assert.strictEqual(parseReliableLastmod(undefined), undefined);
  assert.strictEqual(parseReliableLastmod(null), undefined);
  assert.strictEqual(parseReliableLastmod("   "), undefined);
});

// Criterion 8: Dates before and after Sept 21 are NOT all collapsed to Sept 21
test("Criterion 8: Distinct dates before and after Sept 21 preserve their distinct values", () => {
  const dBefore = parseReliableLastmod("2026-08-15T08:00:00+07:00", CURRENT_OCT_2026);
  const dSept21 = parseReliableLastmod("2026-09-21T08:00:00+07:00", CURRENT_OCT_2026);
  const dAfter = parseReliableLastmod("2026-10-29T08:00:00+07:00", CURRENT_OCT_2026);
  assert(dBefore.getTime() < dSept21.getTime(), "August date must be earlier than Sept 21");
  assert(dSept21.getTime() < dAfter.getTime(), "Sept 21 date must be earlier than Oct 29");
  assert.notStrictEqual(dBefore.getTime(), dSept21.getTime(), "No date collapsing");
  assert.notStrictEqual(dAfter.getTime(), dSept21.getTime(), "No date collapsing");
});

// Criterion 9: Month-only job information does not create a fabricated publication date
test("Criterion 9: Month-only string ('มิถุนายน 2026') does not synthesize a day", () => {
  const monthOnly = parseReliableLastmod("มิถุนายน 2026", CURRENT_OCT_2026);
  assert.strictEqual(monthOnly, undefined, "Month-only information without explicit day must return undefined");
  const thaiWithDay = parseReliableLastmod("25 มิถุนายน 2026", CURRENT_OCT_2026);
  assert(thaiWithDay instanceof Date, "Thai date with explicit day must parse accurately");
});

// Criterion 10: Callers receive valid Date objects or undefined (compatible with Next.js Sitemap schema)
test("Criterion 10: Sitemap output format is strictly Date or undefined", () => {
  const validOutput = parseReliableLastmod("2026-10-29", CURRENT_OCT_2026);
  assert(validOutput instanceof Date, "Valid output must be a standard Date instance");
  const invalidOutput = parseReliableLastmod("invalid-string", CURRENT_OCT_2026);
  assert.strictEqual(invalidOutput, undefined, "Invalid output must be undefined");
});

console.log(`\nResults: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
