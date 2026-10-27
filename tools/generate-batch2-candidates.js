/**
 * tools/generate-batch2-candidates.js
 * 
 * Generates:
 * 1. reports/batch2-localities-10.csv
 * 2. reports/batch2-keyword-seeds.csv (20 seeds x 10 localities = 200 rows)
 */

const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, '../reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const batch2Localities = [
  {
    id: 1,
    name: "อ้อมใหญ่",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "เทศบาลตำบล / ย่านอุตสาหกรรมและชุมชนหนาแน่น",
    boundary: "ตำบลอ้อมใหญ่ แนวถนนเพชรเกษม กม. 27-31 รอยต่อตำบลอ้อมน้อย (กระทุ่มแบน สมุทรสาคร)",
    existingUrl: "/areas/krathumbaen-omnoi/om-noi",
    ownerUrl: "/areas/krathumbaen-omnoi/om-noi",
    overlap: "เชื่อมต่อแนวเศรษฐกิจอ้อมน้อย-อ้อมใหญ่ ไร้รอยต่อข้ามเขตจังหวัด (เพชรเกษม)",
    availability: "confirmed (รถตู้ทึบสแตนด์บายทุกวัน ห่างศูนย์ WMS บ้านเกาะ 12 กม.)",
    evidence: "general_fleet_available (ภาพ WM14 สแตนด์บายแนวเพชรเกษม ยังไม่มีเอกสารบิลงานเฉพาะระบุชื่ออ้อมใหญ่)",
    utility: "จุดโหลดของซอยวัดอ้อมใหญ่, หน้าบิ๊กซีอ้อมใหญ่, ซอยเทศบาล 1-13 ซอยโรงงานแคบ มีคานกั้น ต้องระบุความสูงรถ 2.1 ม. ชัดเจน ไม่เคลมงานโรงงาน/ย้ายบ้านเกินจริง",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "อ้อมใหญ่เป็นย่านเศรษฐกิจที่เชื่อมต่อกับอ้อมน้อยโดยตรง ไม่ควรสร้าง URL แยกใหม่เพื่อหลีกเลี่ยง Thin Content / Doorway ให้บรรจุเป็นหัวข้อบริการสำคัญในหน้า /areas/krathumbaen-omnoi/om-noi"
  },
  {
    id: 2,
    name: "กระทุ่มล้ม",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "เทศบาลเมือง / ย่านชุมชนและโรงงานขนาดย่อม",
    boundary: "ตำบลกระทุ่มล้ม แนวถนนพุทธมณฑลสาย 4 ช่วงตัดเพชรเกษมถึงถนนพุทธมณฑลสาย 5",
    existingUrl: "/areas/phutthamonthon-sai-1-4/phutthamonthon-sai-4",
    ownerUrl: "/areas/phutthamonthon-sai-1-4/phutthamonthon-sai-4",
    overlap: "คาบเกี่ยวกับพื้นที่บริการพุทธมณฑลสาย 4 และรอยต่อหนองแขม/บางแค",
    availability: "confirmed (วิ่งงานสาย 4 สม่ำเสมอ)",
    evidence: "general_fleet_available (WM10, WM14 ผ่านเส้นทางสาย 4)",
    utility: "ซอยกระทุ่มล้ม 1 ถึง 27 มีโกดังและทาวน์โฮม ต้องตรวจความกว้างซอยและการกลับรถของรถกระบะตู้ทึบ",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "เป็นพื้นที่แกนหลักบนถนนพุทธมณฑลสาย 4 ควรรวมเป็นหัวข้อพื้นที่บริการในหน้าพุทธมณฑลสาย 4 /areas/phutthamonthon-sai-1-4/phutthamonthon-sai-4"
  },
  {
    id: 3,
    name: "บางกระทึก",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "ตำบลการปกครอง / โกดังสินค้าและหมู่บ้านจัดสรร",
    boundary: "ตำบลบางกระทึก เชื่อมต่อพุทธมณฑลสาย 4 และพุทธมณฑลสาย 5",
    existingUrl: "/areas/phutthamonthon-sai-1-4/phutthamonthon-sai-4",
    ownerUrl: "/areas/phutthamonthon-sai-1-4/phutthamonthon-sai-4",
    overlap: "ซ้อนทับแนวสาย 4-5 และแนวเชื่อมเพชรเกษม",
    availability: "confirmed (ให้บริการรับส่งสินค้าโกดังและย้ายบ้าน)",
    evidence: "general_fleet_available (ฟลีตรถตู้ทึบวิ่งสาย 4-5)",
    utility: "มีคลังสินค้าและหมู่บ้านจัดสรรใหม่หลายโครงการ ทางเข้ากว้าง รถกระบะตู้ทึบเข้าเทียบโหลดได้สะดวก",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "เสริมเนื้อหาลงในหน้าพุทธมณฑลสาย 4 ให้ครอบคลุมแนวเชื่อมต่อสาย 5 ยังไม่ควรเปิด URL แยก"
  },
  {
    id: 4,
    name: "ท่าตลาด",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "ตำบลการปกครอง / ชุมชนริมเพชรเกษมและแม่น้ำท่าจีน",
    boundary: "ตำบลท่าตลาด อำเภอสามพราน ที่ตั้งสวนสามพรานเดิมและตลาดสด",
    existingUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    ownerUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    overlap: "เป็นส่วนหนึ่งของศูนย์กลางอำเภอสามพรานริมถนนเพชรเกษม",
    availability: "confirmed (สายวิ่งหลักเพชรเกษม-นครปฐม)",
    evidence: "general_fleet_available (วิ่งผ่านเป็นประจำ)",
    utility: "ชุมชนร้านค้าอาคารพาณิชย์ริมถนนเพชรเกษมและริมแม่น้ำ ระวังทางลาดชันสะพานข้ามคลอง",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "รวมเป็นหัวข้อย่อยและจุดรับส่งสินค้าในหน้าแม่ /areas/phutthamonthon-sai-1-4/sam-phran"
  },
  {
    id: 5,
    name: "ยายชา",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "ตำบลการปกครอง / ที่ตั้ง รร.นรต. และชุมชนริมน้ำ",
    boundary: "ตำบลยายชา ริมแม่น้ำท่าจีน ที่ตั้งโรงเรียนนายร้อยตำรวจสามพราน",
    existingUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    ownerUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    overlap: "ใจกลางอำเภอสามพราน",
    availability: "confirmed (ให้บริการย้ายบ้านพักข้าราชการและชุมชน)",
    evidence: "general_fleet_available",
    utility: "ชุมชนริมแม่น้ำและแฟลตพักข้าราชการ ทางเข้ามีสะพานข้ามคลอง รถกระบะตู้ทึบเข้าออกสะดวกกว่ารถ 6 ล้อ",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "เป็นพื้นที่สำคัญของสามพราน ควรรวมเป็นหัวข้อในหน้า /areas/phutthamonthon-sai-1-4/sam-phran"
  },
  {
    id: 6,
    name: "หอมเกร็ด",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "ตำบลการปกครอง / สวนเกษตรและชุมชนริมน้ำ",
    boundary: "ตำบลหอมเกร็ด เชื่อมต่อระหว่างถนนบรมราชชนนีและถนนเพชรเกษมผ่านพุทธมณฑลสาย 6",
    existingUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    ownerUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    overlap: "แนวเชื่อมต่อระหว่างศาลายา สามพราน และนครชัยศรี",
    availability: "confirmed (รับงานเหมารายเที่ยว)",
    evidence: "general_fleet_available",
    utility: "ทางเลียบแม่น้ำท่าจีน ซอยสวนผลไม้ ถนนแคบ ต้องนัดหมายจุดเทียบจอดล่วงหน้า",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "บรรจุข้อมูลทางเข้าและเส้นทางสาย 6 ในหน้าสามพราน"
  },
  {
    id: 7,
    name: "คลองใหม่",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "เทศบาลตำบล / ย่านโรงงานแปรรูปริมเพชรเกษม",
    boundary: "ตำบลคลองใหม่ อำเภอสามพราน แนวกิโลเมตรที่ 34-37 ถนนเพชรเกษม",
    existingUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    ownerUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    overlap: "แนวถนนเพชรเกษมมุ่งหน้านครปฐม",
    availability: "confirmed (ขนส่งสินค้าโรงงานและย้ายบ้าน)",
    evidence: "general_fleet_available",
    utility: "มีโรงงานอุตสาหกรรมเกษตรและอาหารแปรรูป รถกระบะตู้ทึบเข้าเทียบโหลดสินค้าได้มาตรฐาน",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "รวมเป็นหัวข้อจุดบริการโรงงานในหน้า /areas/phutthamonthon-sai-1-4/sam-phran"
  },
  {
    id: 8,
    name: "บางช้าง",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "ตำบลการปกครอง / สวนผลไม้และชุมชนดั้งเดิม",
    boundary: "ตำบลบางช้าง อำเภอสามพราน ริมแม่น้ำท่าจีน",
    existingUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    ownerUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    overlap: "ส่วนหนึ่งของพื้นที่อนุรักษ์เกษตรกรรมสามพราน",
    availability: "confirmed (เหมารายเที่ยวตามสั่ง)",
    evidence: "general_fleet_available",
    utility: "สวนฝรั่ง มะพร้าว พืชสวน *ข้อควรระวัง: รถกระบะตู้ทึบ WMS เป็นรถตู้ปิดมิดชิดทั่วไป ไม่ใช่รถห้องเย็นควบคุมอุณหภูมิ เหมาะสำหรับสินค้าบรรจุลัง/กล่อง ไม่รองรับอาหารแช่แข็ง*",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "เสริมคำแนะนำเรื่องรถตู้ทึบไม่ใช่รถห้องเย็นในหน้าสามพราน เพื่อความชัดเจนต่อลูกค้า"
  },
  {
    id: 9,
    name: "คลองจินดา",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "ตำบลการปกครอง / แหล่งสวนผลไม้และทางเชื่อมบ้านแพ้ว",
    boundary: "ตำบลคลองจินดา ทางหลวงชนบท นฐ.1011 เชื่อมต่ออำเภอบ้านแพ้ว สมุทรสาคร",
    existingUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    ownerUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    overlap: "รอยต่อสามพราน-บ้านแพ้ว เชื่อมต่อกับหน้าบ้านแพ้ว",
    availability: "confirmed (เส้นทางประจำเชื่อมระหว่างสองศูนย์บริการ)",
    evidence: "general_fleet_available (วิ่งเส้นทางนี้เชื่อมสมุทรสาคร-นครปฐม)",
    utility: "เส้นทางสวนผลไม้ยกร่อง ถนนเลียบคลอง รถกระบะตู้ทึบเข้าซอยสวนได้คล่องตัวกว่ารถใหญ่ *ไม่ใช่รถห้องเย็น*",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "เป็นทางเชื่อมสำคัญระหว่างสามพรานและบ้านแพ้ว ควรระบุในหน้าสามพรานและบ้านแพ้ว"
  },
  {
    id: 10,
    name: "ตลาดจินดา",
    district: "สามพราน",
    province: "นครปฐม",
    placeType: "ศูนย์กลางการค้าชุมชน / ตลาดสดท้องถิ่น",
    boundary: "ศูนย์กลางค้าขายในตำบลคลองจินดา ริมคลองจินดา",
    existingUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    ownerUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    overlap: "เป็นจุดศูนย์กลางย่อยภายในตำบลคลองจินดา",
    availability: "confirmed (รับส่งสินค้าและร้านค้า)",
    evidence: "general_fleet_available",
    utility: "ตลาดชุมชน ขนย้ายแผงค้าและสินค้าเกษตรบรรจุตะกร้า ช่วงเช้ามีรถสัญจรหนาแน่น",
    searchDemand: "unknown (unmeasured)",
    recommendation: "add_section",
    recommendationReason: "ไม่ใช่ตำบลอิสระ แต่เป็นจุดนัดรับของที่คนท้องถิ่นเรียก ให้ระบุเป็นจุดรับส่งในหน้าสามพราน"
  }
];

// Generate 20 keyword seeds per locality = 200 keyword seeds
const seedPatterns = [
  { p: "รถรับจ้าง{name}", intent: "Primary Local Intent" },
  { p: "รถขนของ{name}", intent: "General Transport Intent" },
  { p: "รถกระบะรับจ้าง{name}", intent: "Vehicle Type Intent" },
  { p: "รถกระบะตู้ทึบ{name}", intent: "Vehicle Feature Intent" },
  { p: "ย้ายบ้าน{name}", intent: "House Moving Intent" },
  { p: "ย้ายหอ{name}", intent: "Dorm Moving Intent" },
  { p: "ย้ายคอนโด{name}", intent: "Condo Moving Intent" },
  { p: "รถรับจ้างพร้อมคนยก{name}", intent: "Helper Service Intent" },
  { p: "ขนส่งมอเตอร์ไซค์{name}", intent: "Motorcycle Delivery Intent" },
  { p: "ส่งบิ๊กไบค์{name}", intent: "Bigbike Delivery Intent" },
  { p: "ขนส่งสินค้า{name}", intent: "Commercial Freight Intent" },
  { p: "รถรับจ้างเหมาวัน{name}", intent: "Day Charter Intent" },
  { p: "รถกระบะรับจ้าง{name}ราคา", intent: "Pricing Query Intent" },
  { p: "ค่ารถรับจ้าง{name}", intent: "Pricing Query Intent" },
  { p: "รถรับจ้าง{name}ไปกรุงเทพ", intent: "Corridor Intent (to BKK)" },
  { p: "รถรับจ้าง{name}ไปต่างจังหวัด", intent: "Corridor Intent (Inter-provincial)" },
  { p: "จ้างรถขนของ{name}พร้อมคนยก", intent: "High Commercial Intent" },
  { p: "เหมารถกระบะตู้ทึบ{name}", intent: "Full Truckload Intent" },
  { p: "หารถรับจ้าง{name}", intent: "Search Discovery Intent" },
  { p: "รถขนส่งสินค้าโรงงาน{name}", intent: "Industrial Freight Intent" },
];

// Write batch2-localities-10.csv
const locHeader = [
  "Candidate ID",
  "Candidate Name",
  "Amphoe",
  "Province",
  "Place Type",
  "Geographic Boundary Note",
  "Existing Owning URL",
  "Proposed Parent Page",
  "Overlap & Alias Notes",
  "Service Availability",
  "Usable Original Job Evidence",
  "Customer Utility & Access Guidance (Non-refrigerated note)",
  "Search Demand Status",
  "Recommendation",
  "Reason for Recommendation"
].map(h => `"${h}"`).join(',');

const locRows = batch2Localities.map(loc => [
  `"${loc.id}"`,
  `"${loc.name}"`,
  `"${loc.district}"`,
  `"${loc.province}"`,
  `"${loc.placeType}"`,
  `"${loc.boundary.replace(/"/g, '""')}"`,
  `"${loc.existingUrl}"`,
  `"${loc.ownerUrl}"`,
  `"${loc.overlap.replace(/"/g, '""')}"`,
  `"${loc.availability.replace(/"/g, '""')}"`,
  `"${loc.evidence.replace(/"/g, '""')}"`,
  `"${loc.utility.replace(/"/g, '""')}"`,
  `"${loc.searchDemand}"`,
  `"${loc.recommendation}"`,
  `"${loc.recommendationReason.replace(/"/g, '""')}"`
].join(','));

fs.writeFileSync(
  path.join(reportsDir, 'batch2-localities-10.csv'),
  '\uFEFF' + [locHeader, ...locRows].join('\n'),
  'utf8'
);

console.log('✅ Generated reports/batch2-localities-10.csv (10 localities)');

// Write batch2-keyword-seeds.csv (200 rows)
const kwHeader = [
  "Candidate ID",
  "Locality Name",
  "Keyword Seed (Thai)",
  "Intent Category",
  "Owning URL",
  "Recommended Action",
  "Measured Search Volume Status"
].map(h => `"${h}"`).join(',');

const kwRows = [];
for (const loc of batch2Localities) {
  for (const pat of seedPatterns) {
    const kw = pat.p.replace(/{name}/g, loc.name);
    kwRows.push([
      `"${loc.id}"`,
      `"${loc.name}"`,
      `"${kw}"`,
      `"${pat.intent}"`,
      `"${loc.ownerUrl}"`,
      `"${loc.recommendation}"`,
      `"unknown (unmeasured)"`
    ].join(','));
  }
}

fs.writeFileSync(
  path.join(reportsDir, 'batch2-keyword-seeds.csv'),
  '\uFEFF' + [kwHeader, ...kwRows].join('\n'),
  'utf8'
);

console.log(`✅ Generated reports/batch2-keyword-seeds.csv (${kwRows.length} keyword seeds)`);
