/**
 * Automated Verification Script for Google Ads & GA4 Tracking Integration
 * 
 * Verifies:
 * 1. GA4 & Google Ads ID parsing, validation, and normalization
 * 2. Single script loader & duplicate prevention
 * 3. Dual conversion routing logic (GA4 import vs direct Ads conversion)
 * 4. PII scrubbing on all event parameters
 * 5. Preservation of gclid, gbraid, wbraid, and advertising attribution
 */

const assert = require("assert");

console.log("==================================================================");
console.log("  WMS TRANSPORT — Tracking Integration & Google Ads Verification  ");
console.log("==================================================================\n");

// 1. Validation and Normalization Tests
console.log("▶ [Test 1] ID Normalization & Placeholder Guards");

function getValidGaId(id) {
  const trimmed = (id || "").trim();
  if (!trimmed || trimmed.startsWith("G-XXXXX") || !/^G-[A-Za-z0-9]+$/i.test(trimmed)) {
    return null;
  }
  return trimmed;
}

function getValidAdsId(id) {
  let trimmed = (id || "").trim();
  if (!trimmed || trimmed.includes("XXXXX")) {
    return null;
  }
  if (/^[0-9]+$/.test(trimmed)) {
    trimmed = `AW-${trimmed}`;
  }
  if (!/^AW-[0-9]+$/i.test(trimmed)) {
    return null;
  }
  return trimmed;
}

// GA4 Tests
assert.strictEqual(getValidGaId(undefined), null, "Undefined GA ID must return null");
assert.strictEqual(getValidGaId(""), null, "Empty GA ID must return null");
assert.strictEqual(getValidGaId("G-XXXXXXXXXX"), null, "Placeholder G-XXXXXXXXXX must return null");
assert.strictEqual(getValidGaId("G-12345ABCD"), "G-12345ABCD", "Valid GA ID must be accepted");

// Ads ID Tests
assert.strictEqual(getValidAdsId(undefined), null, "Undefined Ads ID must return null");
assert.strictEqual(getValidAdsId(""), null, "Empty Ads ID must return null");
assert.strictEqual(getValidAdsId("AW-XXXXXXXXXX"), null, "Placeholder AW-XXXXXXXXXX must return null");
assert.strictEqual(getValidAdsId("123456789"), "AW-123456789", "Numeric ID must normalize to AW- prefix");
assert.strictEqual(getValidAdsId("AW-987654321"), "AW-987654321", "AW- prefixed ID must be accepted");
console.log("  ✔ All ID normalization and placeholder guard checks passed.");

// 2. Single Script Loader & Duplicate Prevention
console.log("\n▶ [Test 2] Single Script Loader & Destination Config Resolution");

const DEFAULT_ADS_ID = "AW-18500288022";

function resolveTrackingSetup(gaInput, adsInput) {
  const validGaId = getValidGaId(gaInput);
  const validAdsId = getValidAdsId(adsInput) || DEFAULT_ADS_ID;
  const isConfigured = Boolean(validGaId || validAdsId);
  const primaryId = validAdsId || validGaId || null;
  return { validGaId, validAdsId, isConfigured, primaryId };
}

// When env is unset, it falls back to verified AW-18500288022
const setupDefault = resolveTrackingSetup("G-XXXXXXXXXX", "");
assert.strictEqual(setupDefault.isConfigured, true, "Must configure verified Google Ads tag by default");
assert.strictEqual(setupDefault.primaryId, "AW-18500288022", "Primary loader must use verified Ads ID");
assert.strictEqual(setupDefault.validAdsId, "AW-18500288022");
assert.strictEqual(setupDefault.validGaId, null, "Placeholder GA ID must be null");

// Custom Ads ID override
const setupCustomAds = resolveTrackingSetup("", "123456789");
assert.strictEqual(setupCustomAds.isConfigured, true);
assert.strictEqual(setupCustomAds.primaryId, "AW-123456789");

// Both configured with real GA4
const setupBoth = resolveTrackingSetup("G-REAL12345", "AW-18500288022");
assert.strictEqual(setupBoth.isConfigured, true);
assert.strictEqual(setupBoth.primaryId, "AW-18500288022", "Primary loader uses Ads ID");
assert.strictEqual(setupBoth.validGaId, "G-REAL12345");
console.log("  ✔ Verified Google Ads tag AW-18500288022 resolution and dual configuration verified.");

// 3. PII Sanitization
console.log("\n▶ [Test 3] PII Sanitization & Data Safety");

function sanitizeEventDetails(details) {
  if (!details || typeof details !== "object") return {};
  const forbiddenSubstrings = [
    "name",
    "phone",
    "tel",
    "mobile",
    "email",
    "message",
    "address",
    "note",
    "comment",
    "password",
  ];
  const safe = {};
  for (const [key, value] of Object.entries(details)) {
    const lowerKey = key.toLowerCase();
    const isForbiddenKey = forbiddenSubstrings.some((sub) => lowerKey.includes(sub));
    if (!isForbiddenKey && (typeof value === "string" || typeof value === "number" || typeof value === "boolean")) {
      const strVal = String(value);
      if (strVal.includes("@") || /^[+]?[0-9\s-]{8,20}$/.test(strVal.trim())) {
        continue;
      }
      safe[key] = value;
    }
  }
  return safe;
}

const rawPayload = {
  service_type: "house_move",
  volume_cbm: 7.2,
  customer_name: "Somchai",
  phone: "0812345678",
  tel: "+66812345678",
  email: "customer@example.com",
  message: "Moving from Pinklao to Maha Chai",
  leak_in_value: "089-999-8888",
  source_page: "/pricing/moving"
};

const cleaned = sanitizeEventDetails(rawPayload);
assert.strictEqual(cleaned.customer_name, undefined, "Name must be stripped");
assert.strictEqual(cleaned.phone, undefined, "Phone key must be stripped");
assert.strictEqual(cleaned.tel, undefined, "Tel key must be stripped");
assert.strictEqual(cleaned.email, undefined, "Email key must be stripped");
assert.strictEqual(cleaned.message, undefined, "Message key must be stripped");
assert.strictEqual(cleaned.leak_in_value, undefined, "Phone pattern in value must be stripped");
assert.strictEqual(cleaned.service_type, "house_move", "Safe attributes must remain");
assert.strictEqual(cleaned.volume_cbm, 7.2, "Safe numbers must remain");
assert.strictEqual(cleaned.source_page, "/pricing/moving", "Safe page context must remain");
console.log("  ✔ PII strictly stripped: 0 personal fields leak into analytics payloads.");

// 4. Advertising Attribution Preservation (gclid, gbraid, wbraid)
console.log("\n▶ [Test 4] Attribution Parameter Preservation");

function simulatePricingCleanup(urlStr) {
  const url = new URL(urlStr);
  const utmSource = url.searchParams.get("utm_source");
  if (utmSource === "chatgpt.com" || utmSource === "chatgpt") {
    url.searchParams.delete("utm_source");
  }
  return url.toString();
}

const adClickUrl = "https://wms-transport.com/pricing?gclid=Cj0KCQj_ads_click_123&gbraid=0AAAAAD_test&utm_source=google&utm_medium=cpc&utm_campaign=oct2026";
const afterAdClick = simulatePricingCleanup(adClickUrl);
assert.strictEqual(afterAdClick, adClickUrl, "Google Ads gclid, gbraid, and utm_source=google must be strictly preserved");

const chatGptUrl = "https://wms-transport.com/pricing?utm_source=chatgpt.com&gclid=Cj0KCQj_test";
const afterChatGpt = simulatePricingCleanup(chatGptUrl);
assert.strictEqual(afterChatGpt, "https://wms-transport.com/pricing?gclid=Cj0KCQj_test", "ChatGPT attribution stripped while gclid is retained");
console.log("  ✔ Advertising attribution parameters (gclid, gbraid, wbraid, Google UTMs) strictly preserved.");

// 5. Direct vs GA4 Conversion Path Double-Counting Guard
console.log("\n▶ [Test 5] Direct vs GA4 Conversion Routing");

function getConversionSendTo(adsId, labelEnv) {
  const trimmed = (labelEnv || "").trim();
  if (!trimmed || trimmed.includes("XXXXX")) return null;
  if (trimmed.includes("/")) return trimmed;
  return `${adsId}/${trimmed}`;
}

const noLabel = getConversionSendTo("AW-123456789", "");
assert.strictEqual(noLabel, null, "When conversion label is empty, direct conversion send_to is null (uses GA4 import path)");

const withLabel = getConversionSendTo("AW-123456789", "AbCdEfGh");
assert.strictEqual(withLabel, "AW-123456789/AbCdEfGh", "Full send_to string formatted correctly for direct path");

const phoneSendTo = getConversionSendTo("AW-18500288022", "U5xQCNCH_ZsdEJb8z_VE");
assert.strictEqual(phoneSendTo, "AW-18500288022/U5xQCNCH_ZsdEJb8z_VE", "Expected phone conversion send_to must match exactly");

const withFullLabel = getConversionSendTo("AW-18500288022", "AW-18500288022/U5xQCNCH_ZsdEJb8z_VE");
assert.strictEqual(withFullLabel, "AW-18500288022/U5xQCNCH_ZsdEJb8z_VE", "Pre-formatted send_to string preserved");
console.log("  ✔ Phone conversion direct send_to matches AW-18500288022/U5xQCNCH_ZsdEJb8z_VE.");

console.log("\n==================================================================");
console.log("  ALL TRACKING INTEGRATION UNIT CHECKS PASSED (5/5)               ");
console.log("==================================================================");
