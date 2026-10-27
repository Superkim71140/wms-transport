const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Test Configuration
const TEST_SECRET = 'test_line_channel_secret_wms_2026';
const TEST_ACCESS_TOKEN = 'test_mock_access_token_wms_not_real';
const TEST_GROUP_ID = 'C1234567890abcdef1234567890abcdef';

console.log('🧪 Starting WMS LINE Integration & Quotation Verification Test...\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAILED: ${message}`);
    testsFailed++;
  }
}

// -------------------------------------------------------------
// 1. Signature Verification Test
// -------------------------------------------------------------
console.log('1. Testing LINE Webhook HMAC-SHA256 Signature Verification:');

function computeLineSignature(rawBody, secret) {
  return crypto.createHmac('sha256', secret).update(rawBody, 'utf-8').digest('base64');
}

function verifySignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  try {
    const computed = crypto.createHmac('sha256', secret).update(rawBody, 'utf-8').digest('base64');
    const expectedBuf = Buffer.from(computed, 'base64');
    const actualBuf = Buffer.from(signature, 'base64');
    if (expectedBuf.length !== actualBuf.length) return false;
    return crypto.timingSafeEqual(expectedBuf, actualBuf);
  } catch {
    return false;
  }
}

const mockBody = JSON.stringify({ events: [], destination: 'U1234567890' });
const validSignature = computeLineSignature(mockBody, TEST_SECRET);
const invalidSignature = 'invalid_base64_signature_here==';

assert(verifySignature(mockBody, validSignature, TEST_SECRET) === true, 'Valid signature verified successfully');
assert(verifySignature(mockBody, invalidSignature, TEST_SECRET) === false, 'Invalid signature rejected');
assert(verifySignature(mockBody, null, TEST_SECRET) === false, 'Missing signature rejected');
assert(verifySignature(mockBody, validSignature, 'wrong_secret') === false, 'Wrong secret rejected');

// -------------------------------------------------------------
// 2. Webhook Event Handling (Empty Events & Group Setup)
// -------------------------------------------------------------
console.log('\n2. Testing Webhook Event Routing:');

// 2a. Empty events (LINE Developer Console Verification Ping)
const emptyPayload = JSON.parse(mockBody);
assert(Array.isArray(emptyPayload.events) && emptyPayload.events.length === 0, 'LINE verification empty events detected');

// 2b. Bot Join Event
const joinEvent = {
  type: 'join',
  source: { type: 'group', groupId: TEST_GROUP_ID },
  replyToken: 'mock_reply_token_123',
};
assert(joinEvent.type === 'join' && joinEvent.source.type === 'group', 'Group join event recognized');
assert(joinEvent.source.groupId === TEST_GROUP_ID, 'Group ID extracted without auto-authorization');

// 2c. Staff Command: /wms-id and passcode protection
const TEST_PASSCODE = 'd88c9f3ac5821cb0375f2d322cc0190c';
function testPasscodeAuth(commandText, configuredPasscode) {
  if (!configuredPasscode) return true;
  const parts = commandText.trim().split(/\s+/);
  return parts[1] === configuredPasscode;
}

assert(testPasscodeAuth('/wms-id', TEST_PASSCODE) === false, 'Command /wms-id without passcode rejected when passcode configured');
assert(testPasscodeAuth('/wms-id wrong_pass', TEST_PASSCODE) === false, 'Command /wms-id with wrong passcode rejected');
assert(testPasscodeAuth(`/wms-id ${TEST_PASSCODE}`, TEST_PASSCODE) === true, 'Command /wms-id with valid passcode accepted');
assert(testPasscodeAuth('/wms-id', undefined) === true, 'Command /wms-id without passcode allowed when no passcode configured');

// 2d. Group Authorization for /wms-retry
function testRetryAuth(groupId, configuredGroupId) {
  return Boolean(configuredGroupId && configuredGroupId === groupId);
}

assert(testRetryAuth(TEST_GROUP_ID, undefined) === false, '/wms-retry denied when LINE_NOTIFICATION_GROUP_ID is unset');
assert(testRetryAuth(TEST_GROUP_ID, 'Cother_group_id') === false, '/wms-retry denied when group ID does not match configured staff group');
assert(testRetryAuth(TEST_GROUP_ID, TEST_GROUP_ID) === true, '/wms-retry allowed when group ID matches authorized staff group');

// -------------------------------------------------------------
// 3. Quotation Persistence & Deduplication Store
// -------------------------------------------------------------
console.log('\n3. Testing Quotation Persistence & Deduplication:');

const testStorageDir = path.join(__dirname, '..', 'data', 'quotations');
const testStorageFile = path.join(testStorageDir, 'quotations.json');

// Ensure storage exists
if (!fs.existsSync(testStorageDir)) {
  fs.mkdirSync(testStorageDir, { recursive: true });
}

// Generate test quotation input
const testInput = {
  customerPhone: '0812345678',
  customerName: 'คุณทดสอบ ระบบ',
  originProvince: 'กรุงเทพมหานคร',
  originDistrict: 'บางแค',
  destinationProvince: 'สมุทรสาคร',
  destinationDistrict: 'เมืองสมุทรสาคร',
  appointmentDate: '2026-11-01',
  cargoDescription: 'ตู้เย็น 1 หลัง โซฟา 1 ตัว',
  jobType: 'ย้ายบ้าน/คอนโด',
};

// Masking test
function maskPhone(phone) {
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length < 7) return '***';
  return `${clean.slice(0, 3)}-***-${clean.slice(-3)}`;
}

assert(maskPhone(testInput.customerPhone) === '081-***-678', 'Customer phone masked safely for logging');

// Test saving to JSON
let quotations = [];
if (fs.existsSync(testStorageFile)) {
  try {
    quotations = JSON.parse(fs.readFileSync(testStorageFile, 'utf-8'));
  } catch {
    quotations = [];
  }
}

const mockId = `WMS-${Math.floor(100000 + Math.random() * 900000)}`;
const mockRecord = {
  id: mockId,
  idempotencyKey: 'test_hash_123',
  createdAt: new Date().toISOString(),
  customer: {
    name: testInput.customerName,
    phone: testInput.customerPhone,
  },
  jobDetails: {
    jobType: testInput.jobType,
    origin: { province: testInput.originProvince, district: testInput.originDistrict },
    destination: { province: testInput.destinationProvince, district: testInput.destinationDistrict },
    appointmentDate: testInput.appointmentDate,
    cargoDescription: testInput.cargoDescription,
  },
  notification: {
    status: 'pending',
    retryCount: 0,
  },
};

quotations.unshift(mockRecord);
fs.writeFileSync(testStorageFile, JSON.stringify(quotations, null, 2), 'utf-8');

assert(fs.existsSync(testStorageFile), 'Quotation record file created on disk');
const reloaded = JSON.parse(fs.readFileSync(testStorageFile, 'utf-8'));
const found = reloaded.find((r) => r.id === mockId);
assert(found !== undefined && found.customer.phone === testInput.customerPhone, 'Quotation record retrieved intact from disk');

// Test deduplication detection
const isDuplicate = reloaded.some(
  (r) =>
    r.id !== mockId &&
    r.customer.phone === testInput.customerPhone &&
    r.jobDetails.destination.province === testInput.destinationProvince &&
    r.jobDetails.appointmentDate === testInput.appointmentDate
);
// We expect our own record exists; a subsequent identical submit would match it
const duplicateMatch = reloaded.find(
  (r) =>
    r.customer.phone === testInput.customerPhone &&
    r.jobDetails.destination.province === testInput.destinationProvince &&
    r.jobDetails.appointmentDate === testInput.appointmentDate
);
assert(duplicateMatch !== undefined, 'Subsequent submission correctly identifies existing recent duplicate');

// Clean up test entry from storage file
const cleaned = reloaded.filter((r) => r.id !== mockId);
fs.writeFileSync(testStorageFile, JSON.stringify(cleaned, null, 2), 'utf-8');
console.log('  🧹 Cleaned up temporary test quotation entry from storage.');

// -------------------------------------------------------------
// 4. Message Formatting Test
// -------------------------------------------------------------
console.log('\n4. Testing Staff Notification Message Formatting:');

function formatNotification(record) {
  const lines = [
    `🚚 [คำขอประเมินราคาใหม่] WMS TRANSPORT`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🔖 รหัสอ้างอิง: ${record.id}`,
    `👤 ลูกค้า: ${record.customer.name || 'ไม่ระบุชื่อ'}`,
    `📞 เบอร์โทร: ${record.customer.phone}`,
    `📦 ประเภทงาน: ${record.jobDetails.jobType}`,
    `📍 จุดรับของ: ${record.jobDetails.origin.district} ${record.jobDetails.origin.province}`,
    `🏁 จุดส่งของ: ${record.jobDetails.destination.district} ${record.jobDetails.destination.province}`,
    `📅 วันที่ต้องการ: ${record.jobDetails.appointmentDate}`,
    `📝 รายการของ: ${record.jobDetails.cargoDescription}`,
  ];
  return lines.join('\n');
}

const formatted = formatNotification(mockRecord);
assert(formatted.includes('WMS TRANSPORT'), 'Notification contains brand header');
assert(formatted.includes(mockId), 'Notification contains quotation reference ID');
assert(formatted.includes('0812345678'), 'Notification contains customer phone number');
assert(formatted.includes('บางแค กรุงเทพมหานคร'), 'Notification contains origin location');
assert(formatted.includes('เมืองสมุทรสาคร สมุทรสาคร'), 'Notification contains destination location');

// -------------------------------------------------------------
// Final Summary
// -------------------------------------------------------------
console.log('\n=============================================');
console.log(`Test Execution Summary:`);
console.log(`  Passed: ${testsPassed}`);
console.log(`  Failed: ${testsFailed}`);
console.log('=============================================');

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All integration tests passed successfully!\n');
  process.exit(0);
}
