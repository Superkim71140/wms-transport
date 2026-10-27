const fs = require('fs');
const path = require('path');

const AREAS = [
  {
    nameEn: "MAHA CHAI",
    nameTh: "มหาชัย",
    owningUrl: "/areas/samutsakhon/maha-chai",
    seeds8: [
      { kw: "รถรับจ้างตลาดมหาชัย", cluster: "Commercial Market Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in market transport & commercial delivery service category" },
      { kw: "ขนส่งสินค้าร้านค้ามหาชัย", cluster: "Retail & Commercial Freight", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in shop & retail distribution category" },
      { kw: "รถรับจ้างย้ายร้านมหาชัย", cluster: "Commercial Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in commercial moving category" },
      { kw: "ขนย้ายสำนักงานมหาชัย", cluster: "Office Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in office moving and document transfer" },
      { kw: "รถรับจ้างมหาชัยไปกรุงเทพ", cluster: "Inter-provincial Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Contextual link to route corridor /route/samutsakhon/bangkok", routeUrl: "/route/samutsakhon/bangkok" },
      { kw: "รถขนของมหาชัยไปต่างจังหวัด", cluster: "Nationwide Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in nationwide long-distance freight section" },
      { kw: "ราคาค่ารถรับจ้างมหาชัย", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in pricing factors & quote checklist" },
      { kw: "เตรียมของย้ายบ้านมหาชัย", cluster: "Moving Preparation", role: "supporting", section: "faq", avail: "confirmed", note: "Target in FAQ moving preparation advice" },
    ]
  },
  {
    nameEn: "KRATHUM BAEN",
    nameTh: "กระทุ่มแบน",
    owningUrl: "/areas/krathumbaen-omnoi/krathum-baen",
    seeds8: [
      { kw: "ขนส่งสินค้าโรงงานกระทุ่มแบน", cluster: "Industrial Freight", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in industrial factory freight category" },
      { kw: "ขนย้ายสต็อกสินค้ากระทุ่มแบน", cluster: "Warehouse & Stock Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in warehouse stock & packaging goods" },
      { kw: "รถรับจ้างย้ายสำนักงานกระทุ่มแบน", cluster: "Office Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in commercial office moving section" },
      { kw: "ขนย้ายอุปกรณ์ร้านค้ากระทุ่มแบน", cluster: "Retail Equipment Moving", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in shop equipment & display fixtures" },
      { kw: "รถรับจ้างกระทุ่มแบนไปกรุงเทพ", cluster: "Inter-provincial Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Link to route corridor /service/samutsakhon or Bangkok inbound route" },
      { kw: "รถขนของกระทุ่มแบนไปต่างจังหวัด", cluster: "Nationwide Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in provincial long-distance cargo delivery" },
      { kw: "ราคาค่ารถรับจ้างกระทุ่มแบน", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in transparent distance-based pricing section" },
      { kw: "เตรียมสินค้าขึ้นรถกระทุ่มแบน", cluster: "Cargo Loading Prep", role: "supporting", section: "faq", avail: "confirmed", note: "Target in FAQ loading & pallet preparation" },
    ]
  },
  {
    nameEn: "NONG KHAEM",
    nameTh: "หนองแขม",
    owningUrl: "/areas/bkk-thonburi/nong-khaem",
    seeds8: [
      { kw: "รถรับจ้างย้ายทาวน์เฮาส์หนองแขม", cluster: "Townhouse Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in townhouse & residential moving category" },
      { kw: "ขนของขึ้นลงบันไดหนองแขม", cluster: "Stairs & Multi-floor Handling", role: "supporting", section: "access_loading", avail: "confirmed", note: "Target in access & helper handling checklist" },
      { kw: "ขนย้ายสำนักงานหนองแขม", cluster: "Office Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in small office & home office moving" },
      { kw: "รถรับจ้างย้ายร้านหนองแขม", cluster: "Retail Moving", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in commercial shophouse relocation" },
      { kw: "รถรับจ้างหนองแขมไปสมุทรสาคร", cluster: "Inter-district Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Contextual link to neighbouring Samut Sakhon hub /service/samutsakhon" },
      { kw: "รถขนของหนองแขมไปต่างจังหวัด", cluster: "Nationwide Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in long-haul moving and motorcycle delivery" },
      { kw: "ราคาค่ารถรับจ้างหนองแขม", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in pricing section and quotation factors" },
      { kw: "เตรียมพื้นที่จอดรถขนของหนองแขม", cluster: "Site Parking Prep", role: "supporting", section: "access_loading", avail: "confirmed", note: "Target in parking & alleyway accessibility section" },
    ]
  },
  {
    nameEn: "BANG KHAE",
    nameTh: "บางแค",
    owningUrl: "/areas/bkk-thonburi/bang-khae",
    seeds8: [
      { kw: "ขนของคอนโดมีลิฟต์บางแค", cluster: "Condo Moving with Elevator", role: "supporting", section: "access_loading", avail: "confirmed", note: "Target in condo moving & loading bay coordination" },
      { kw: "ขนย้ายสำนักงานบางแค", cluster: "Office Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in commercial office & shophouse moving" },
      { kw: "รถรับจ้างย้ายร้านบางแค", cluster: "Retail Store Moving", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in store & market stall moving" },
      { kw: "ขนย้ายเตียงและตู้บางแค", cluster: "Bulky Furniture Handling", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in bed, wardrobe, furniture wrapping service" },
      { kw: "รถรับจ้างบางแคไปนครปฐม", cluster: "Western Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Contextual link to western route and Salaya/Phutthamonthon" },
      { kw: "รถขนของบางแคไปต่างจังหวัด", cluster: "Nationwide Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in inter-provincial moving service" },
      { kw: "ราคาค่ารถรับจ้างบางแค", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in pricing factors & quote checklist" },
      { kw: "เตรียมย้ายคอนโดบางแค", cluster: "Condo Move Preparation", role: "supporting", section: "faq", avail: "confirmed", note: "Target in FAQ condo rule coordination & freight lift booking" },
    ]
  },
  {
    nameEn: "BAN PHAEO",
    nameTh: "บ้านแพ้ว",
    owningUrl: "/areas/maha-chai/ban-phaeo",
    seeds8: [
      { kw: "ขนส่งผลผลิตเกษตรบ้านแพ้ว", cluster: "Agricultural Produce Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Ambient-temperature boxed fruit/produce only (no cold-chain claims)" },
      { kw: "ขนย้ายอุปกรณ์ร้านค้าบ้านแพ้ว", cluster: "Retail Equipment Moving", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in store fixtures & shop equipment" },
      { kw: "รถรับจ้างย้ายสำนักงานบ้านแพ้ว", cluster: "Office Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in local office and community shophouse moving" },
      { kw: "รถขนของเข้าซอยสวนบ้านแพ้ว", cluster: "Canal & Orchard Alley Access", role: "supporting", section: "access_loading", avail: "confirmed", note: "Target in narrow road, canal bridge & orchard path access guidance" },
      { kw: "รถรับจ้างบ้านแพ้วไปมหาชัย", cluster: "Local District Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Contextual link to district hub /areas/samutsakhon/maha-chai" },
      { kw: "รถขนของบ้านแพ้วไปต่างจังหวัด", cluster: "Nationwide Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in long-haul moving from Ban Phaeo" },
      { kw: "ราคาค่ารถรับจ้างบ้านแพ้ว", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in transparent pricing factors" },
      { kw: "เตรียมจุดรับส่งสินค้าบ้านแพ้ว", cluster: "Pickup Location Prep", role: "supporting", section: "access_loading", avail: "confirmed", note: "Target in loading point preparation & bridge clearance verification" },
    ]
  },
  {
    nameEn: "OM NOI",
    nameTh: "อ้อมน้อย",
    owningUrl: "/areas/krathumbaen-omnoi/om-noi",
    seeds8: [
      { kw: "ขนส่งสินค้าโรงงานอ้อมน้อย", cluster: "Industrial Factory Freight", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in factory & warehouse B2B delivery" },
      { kw: "ขนย้ายสต็อกสินค้าอ้อมน้อย", cluster: "Inventory & Stock Transfer", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in stock transfer and pallet/carton logistics" },
      { kw: "รถรับจ้างย้ายร้านอ้อมน้อย", cluster: "Retail Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in roadside store & restaurant relocation" },
      { kw: "ขนของขึ้นลงหอพักอ้อมน้อย", cluster: "Dormitory Moving", role: "supporting", section: "access_loading", avail: "confirmed", note: "Target in worker dormitory, stairs handling & packing" },
      { kw: "รถรับจ้างอ้อมน้อยไปกรุงเทพ", cluster: "Inbound Metro Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Contextual link to Bangkok inbound service /service/bkk-thonburi" },
      { kw: "รถขนของอ้อมน้อยไปต่างจังหวัด", cluster: "Nationwide Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in long-distance freight & motorcycle transport" },
      { kw: "ราคาค่ารถรับจ้างอ้อมน้อย", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in pricing section & transparent rates" },
      { kw: "เตรียมขนย้ายหอพักอ้อมน้อย", cluster: "Dormitory Move Preparation", role: "supporting", section: "faq", avail: "confirmed", note: "Target in FAQ dormitory packing and booking notice" },
    ]
  },
  {
    nameEn: "BANG BON",
    nameTh: "บางบอน",
    owningUrl: "/areas/bkk-thonburi/bang-bon",
    seeds8: [
      { kw: "ขนส่งสินค้าร้านค้าบางบอน", cluster: "Retail Goods Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in retail delivery and commercial distribution" },
      { kw: "ขนย้ายสำนักงานบางบอน", cluster: "Office Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in commercial office & factory front office moving" },
      { kw: "ขนย้ายสต็อกสินค้าบางบอน", cluster: "Stock & Inventory Moving", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in garment, plastics, hardware stock transfer" },
      { kw: "รถรับจ้างย้ายทาวน์เฮาส์บางบอน", cluster: "Townhouse Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in townhouse & housing estate moving" },
      { kw: "รถรับจ้างบางบอนไปสมุทรสาคร", cluster: "Outbound Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Contextual link to Samut Sakhon /service/samutsakhon" },
      { kw: "รถขนของบางบอนไปต่างจังหวัด", cluster: "Nationwide Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in nationwide delivery and motorcycle shipping" },
      { kw: "ราคาค่ารถรับจ้างบางบอน", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in distance-based pricing factors" },
      { kw: "เตรียมจุดจอดรถขนของบางบอน", cluster: "Site Parking Prep", role: "supporting", section: "access_loading", avail: "confirmed", note: "Target in parking & street loading coordination" },
    ]
  },
  {
    nameEn: "RAMA 2",
    nameTh: "พระราม 2",
    owningUrl: "/areas/rama2-bangkradi/rama-2",
    seeds8: [
      { kw: "ขนย้ายสำนักงานพระราม 2", cluster: "Office Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in warehouse office & business moving" },
      { kw: "ขนส่งสินค้าร้านค้าพระราม 2", cluster: "Retail Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in commercial store & showroom goods transport" },
      { kw: "รถรับจ้างย้ายบ้านจัดสรรพระราม 2", cluster: "Housing Estate Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in housing estate & detached home moving" },
      { kw: "ขนย้ายสต็อกสินค้าพระราม 2", cluster: "Warehouse Stock Transfer", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in logistics park & warehouse stock distribution" },
      { kw: "รถรับจ้างพระราม 2 ไปสมุทรสาคร", cluster: "Inter-provincial Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Contextual link to Samut Sakhon /service/samutsakhon" },
      { kw: "รถขนของพระราม 2 ไปต่างจังหวัด", cluster: "Southern Corridor & Nationwide", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in Southern Thailand transport corridor" },
      { kw: "ราคาค่ารถรับจ้างพระราม 2", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in transparent distance-based pricing" },
      { kw: "เตรียมจุดขึ้นลงสินค้าพระราม 2", cluster: "Loading Bay Prep", role: "supporting", section: "access_loading", avail: "confirmed", note: "Target in warehouse loading bay & height clearance checks" },
    ]
  },
  {
    nameEn: "SALAYA",
    nameTh: "ศาลายา",
    owningUrl: "/areas/phutthamonthon-sai-1-4/salaya",
    seeds8: [
      { kw: "รถขนของหอพักนักศึกษาศาลายา", cluster: "Student Dormitory Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in Mahidol Salaya student dorm moving" },
      { kw: "ขนย้ายโต๊ะและชั้นหนังสือศาลายา", cluster: "Study Furniture Moving", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in desk, bookshelf, personal study gear" },
      { kw: "รถรับจ้างย้ายร้านศาลายา", cluster: "Shop Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in community mall & campus shop moving" },
      { kw: "ขนย้ายสำนักงานศาลายา", cluster: "Office Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in university office & local commercial moving" },
      { kw: "รถรับจ้างศาลายาไปกรุงเทพ", cluster: "Inbound Metro Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Contextual link to Bangkok service /service/bkk-thonburi" },
      { kw: "รถขนของศาลายาไปต่างจังหวัด", cluster: "Nationwide Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in nationwide moving & student graduation moves" },
      { kw: "ราคาค่ารถรับจ้างศาลายา", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in transparent student & household rates" },
      { kw: "เตรียมย้ายหอพักศาลายา", cluster: "Student Move Preparation", role: "supporting", section: "faq", avail: "confirmed", note: "Target in FAQ dormitory packing and room checkout timing" },
    ]
  },
  {
    nameEn: "SAM PHRAN",
    nameTh: "สามพราน",
    owningUrl: "/areas/phutthamonthon-sai-1-4/sam-phran",
    seeds8: [
      { kw: "ขนส่งสินค้าโรงงานสามพราน", cluster: "Industrial Factory Freight", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in factory & manufacturing cargo" },
      { kw: "ขนย้ายสต็อกสินค้าสามพราน", cluster: "Warehouse Stock Moving", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in stock transfer & packaging materials" },
      { kw: "รถรับจ้างย้ายร้านสามพราน", cluster: "Retail Store Moving", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in retail shop & local business moving" },
      { kw: "ขนส่งสินค้าจากสวนสามพราน", cluster: "Agricultural Produce Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Ambient produce/nursery plant freight (no cold-chain claims)" },
      { kw: "รถรับจ้างสามพรานไปกรุงเทพ", cluster: "Inbound Metro Corridor", role: "supporting", section: "nearby_links", avail: "confirmed", note: "Contextual link to Bangkok inbound corridor /service/bkk-thonburi" },
      { kw: "รถขนของสามพรานไปต่างจังหวัด", cluster: "Nationwide Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Target in inter-provincial moving and motorcycle shipping" },
      { kw: "ราคาค่ารถรับจ้างสามพราน", cluster: "Pricing Transparency", role: "supporting", section: "pricing_factors", avail: "confirmed", note: "Target in distance-based pricing factors" },
      { kw: "เตรียมจุดรับส่งสินค้าสามพราน", cluster: "Pickup Location Prep", role: "supporting", section: "access_loading", avail: "confirmed", note: "Target in loading point verification and truck approach space" },
    ]
  }
];

const BASE_12_PATTERNS = [
  { template: "รถรับจ้าง{AREA}", cluster: "General Local Transport", role: "primary", section: "h1_direct_answer", avail: "confirmed", note: "Target as Primary Keyword in H1, Title & Meta Description" },
  { template: "รถขนของ{AREA}", cluster: "Cargo & Goods Moving", role: "supporting", section: "h1_direct_answer", avail: "confirmed", note: "Direct synonym in direct answer and lead copy" },
  { template: "รถกระบะรับจ้าง{AREA}", cluster: "Pickup Truck Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Fleet vehicle type definition in service overview" },
  { template: "รถกระบะตู้ทึบรับจ้าง{AREA}", cluster: "Enclosed Box Truck Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Core WMS vehicle standard (weatherproof enclosed box truck)" },
  { template: "รถรับจ้างพร้อมคนยก{AREA}", cluster: "Driver & Helper Crew Service", role: "supporting", section: "service_summary", avail: "confirmed", note: "Service option with professional lifting crew" },
  { template: "ย้ายบ้าน{AREA}", cluster: "House & Home Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Core moving service category for detached homes/townhouses" },
  { template: "ย้ายหอพัก{AREA}", cluster: "Dormitory & Room Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Core moving category for apartments and worker/student dorms" },
  { template: "ย้ายคอนโด{AREA}", cluster: "Condo Relocation", role: "supporting", section: "service_summary", avail: "confirmed", note: "Core moving category for high-rise/low-rise condominiums" },
  { template: "ขนย้ายเฟอร์นิเจอร์{AREA}", cluster: "Bulky Item Moving", role: "supporting", section: "service_summary", avail: "confirmed", note: "Furniture & protective blanket/stretch wrap handling" },
  { template: "ขนย้ายเครื่องใช้ไฟฟ้า{AREA}", cluster: "Appliance Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Refrigerator, washing machine, TV upright transport" },
  { template: "ขนส่งสินค้า{AREA}", cluster: "Commercial Freight Delivery", role: "supporting", section: "service_summary", avail: "confirmed", note: "B2B & retail cargo, factory goods and cartons" },
  { template: "ส่งมอเตอร์ไซค์จาก{AREA}", cluster: "Motorcycle Transport", role: "supporting", section: "service_summary", avail: "confirmed", note: "Door-to-door motorcycle shipping with wheel-chock & ratchet straps" },
];

const rows = [
  [
    "Row ID",
    "Area",
    "Full Keyword",
    "Intent Cluster",
    "Keyword Role",
    "Owning URL",
    "Suggested Page Section",
    "Service Availability",
    "Demand Evidence & Source",
    "Publication Recommendation",
    "Implementation Notes"
  ]
];

let rowId = 1;

for (const area of AREAS) {
  // 12 base patterns
  for (let i = 0; i < BASE_12_PATTERNS.length; i++) {
    const pat = BASE_12_PATTERNS[i];
    const kw = pat.template.replace("{AREA}", area.nameTh);
    rows.push([
      rowId++,
      area.nameTh,
      kw,
      pat.cluster,
      pat.role,
      area.owningUrl,
      pat.section,
      pat.avail,
      "Industry seed pattern / verified core service capability",
      pat.role === "primary" ? "target_primary_h1_title" : "target_service_category",
      pat.note
    ]);
  }

  // 8 area-specific patterns
  for (let j = 0; j < area.seeds8.length; j++) {
    const s = area.seeds8[j];
    const targetUrl = s.routeUrl || area.owningUrl;
    rows.push([
      rowId++,
      area.nameTh,
      s.kw,
      s.cluster,
      s.role,
      targetUrl,
      s.section,
      s.avail,
      "Area-specific seed pattern / verified operational corridor",
      s.routeUrl ? "internal_link_to_route_corridor" : (s.section === 'faq' ? 'target_faq_section' : (s.section === 'pricing_factors' ? 'target_pricing_section' : 'target_service_category')),
      s.note
    ]);
  }
}

// Convert to CSV with proper quoting
const csvContent = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\r\n');

const outPath = path.resolve(__dirname, '..', 'docs', 'priority-10-areas-keyword-seeds.csv');
fs.writeFileSync(outPath, '\uFEFF' + csvContent, 'utf8'); // Add BOM for Excel Thai readability
console.log(`Successfully generated ${rows.length - 1} keyword seed rows in ${outPath}`);
