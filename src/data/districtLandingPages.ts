export type ThonburiZone = 'northern' | 'southern';

export interface DistrictRecord {
  province: string; // matches key in provinceMap (e.g. 'bkk-thonburi', 'samutsakhon')
  districtSlug: string; // e.g. 'bang-khae'
  districtThaiName: string;
  zone?: ThonburiZone; // Northern vs Southern Thonburi grouping
  subdistricts?: string[]; // Official BMA Khwaeng
  primaryIntent: string;
  h1: string;
  directAnswer: string;
  actualServiceCapability: string;
  localOperationalNotes: string;
  travelCorridors: string[];
  propertyAccessContext: string;
  propertyTypes: string[];
  jobEvaluationFactors: string[];
  projectEvidenceIds: string[];
  images: { path: string; alt: string; caption: string }[];
  reviewEvidenceIds: string[];
  localFaq: { q: string; a: string }[];
  nearbyDistrictSlugs: string[]; // 3-4 neighboring districts for contextual links
  lastReviewedDate: string;
  proofScore: number; // calculated score out of 100 based on verified local indicators
  isIndexable: boolean;
  status: 'published' | 'draft_evidence_required';
}

export const districtLandingPages: Record<string, DistrictRecord> = {
  // ==========================================
  // SOUTHERN THONBURI (กลุ่มเขตกรุงธนใต้ - 7 เขต)
  // ==========================================

  // 1. บางแค (PILOT - PUBLISHED)
  "bang-khae": {
    province: "bkk-thonburi",
    districtSlug: "bang-khae",
    districtThaiName: "บางแค",
    zone: "southern",
    subdistricts: ["บางแค", "บางแคเหนือ", "บางไผ่", "หลักสอง"],
    primaryIntent: "รถรับจ้างบางแค ย้ายบ้าน ขนของ คอนโด เพชรเกษม กาญจนาภิเษก พร้อมคนยก",
    h1: "รถรับจ้างบางแค บริการย้ายบ้าน ขนของ คอนโด และขนส่งมอเตอร์ไซค์",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตบางแค ครอบคลุมถนนเพชรเกษม กาญจนาภิเษก และพุทธมณฑล สาย 2 รองรับงานย้ายบ้าน ทาวน์โฮม และคอนโดมิเนียมแนวรถไฟฟ้า MRT หลักสอง ด้วยรถกระบะตู้ทึบความสูงภายใน 2.1 เมตร ขนย้ายสิ่งของมิดชิดปลอดภัย พร้อมทีมงานช่วยยกของอย่างระมัดระวัง",
    actualServiceCapability: "รถกระบะตู้ทึบความสูงภายในตู้ 2.1 ม. รองรับการขนย้ายหอพัก คอนโด บ้านเดี่ยว และทาวน์โฮม พร้อมพนักงานช่วยยกของตามขนาดงาน",
    localOperationalNotes: "พื้นที่บางแคมีซอยแยกย่อยและตรอกแคบหลายจุด โดยเฉพาะเพชรเกษม 63, 65 และ 81 รถกระบะตู้ทึบ WMS สามารถเข้าพื้นที่ได้อย่างคล่องตัว มีทีมงานช่วยยกของและดูแลความปลอดภัยของทรัพย์สิน",
    travelCorridors: ["ถนนเพชรเกษม", "ถนนกาญจนาภิเษก", "ถนนกัลปพฤกษ์", "ถนนพุทธมณฑล สาย 2"],
    propertyAccessContext: "พบหมู่บ้านจัดสรรเก่าและทาวน์โฮม 3 ชั้นจำนวนมาก รวมถึงคอนโดแนวรถไฟฟ้าสายสีน้ำเงิน การเข้าจอดเทียบขนย้ายมักดำเนินการที่จุดโหลดสินค้าชั้นล่าง (Loading Bay) หรือลานจอดที่ไม่มีสิ่งกีดขวางความสูง",
    propertyTypes: ["คอนโดมิเนียม High-rise แนวถนนเพชรเกษม", "ทาวน์โฮม 2-3 ชั้นในซอยเพชรเกษม 63/81", "บ้านเดี่ยวโครงการจัดสรรถนนกาญจนาภิเษก", "อาคารพาณิชย์ย่านตลาดบางแค"],
    jobEvaluationFactors: [
      "ระยะทางวิ่งจริงจากต้นทางบางแคไปยังปลายทาง",
      "ชั้นอาคารและการมีอยู่ของลิฟต์โดยสารหรือลิฟต์ขนของ",
      "จำนวนสิ่งของชิ้นใหญ่ที่ต้องถอดประกอบหรือแรปป้องกัน",
      "จำนวนพนักงานยกของที่เหมาะสมกับปริมาณสัมภาระ"
    ],
    projectEvidenceIds: ["moving-condo-bang-khae"],
    images: [
      {
        path: "/images/WM10.webp",
        alt: "พนักงาน WMS กำลังแรปฟิล์มยืดกันรอยตู้ไม้และขนย้ายออกจากลิฟต์คอนโดบางแค",
        caption: "งานย้ายคอนโด High-rise ใกล้สถานี MRT หลักสอง บางแค"
      }
    ],
    reviewEvidenceIds: ["rev-bk-01"],
    localFaq: [
      {
        q: "รถขนของ WMS จอดเทียบขนย้ายที่คอนโดย่านบางแคอย่างไร?",
        a: "รถกระบะตู้ทึบของเรามีความสูงภายในตู้ 2.1 เมตร สามารถบรรจุที่นอน 6 ฟุตและตู้เสื้อผ้าทรงสูงได้ สำหรับการจอดเทียบขนย้าย แนะนำให้นัดหมายจุดโหลดของหรือลานจอดชั้นล่างกับนิติบุคคลของอาคาร"
      },
      {
        q: "ย้ายของจากบางแคเข้าซอยแคบอย่างเพชรเกษม 63 หรือ 81 สะดวกไหม?",
        a: "รถกระบะตอนเดียวตู้ทึบของเรามีความคล่องตัวสูง สามารถเลี้ยวเข้าตรอกซอยในย่านบางแคได้อย่างสะดวกและปลอดภัย"
      },
      {
        q: "หากต้องการย้ายของจากบางแคไปต่างจังหวัด คิดราคาอย่างไร?",
        a: "เราคำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดบางแคไปยังจังหวัดปลายทางและรายละเอียดสิ่งของอย่างโปร่งใส สามารถทักเจ้าหน้าที่เพื่อประเมินราคาตามจริงได้ตลอดเวลา"
      }
    ],
    nearbyDistrictSlugs: ["nong-khaem", "phasi-charoen", "bang-bon"],
    lastReviewedDate: "2026-06-25",
    proofScore: 85,
    isIndexable: true,
    status: "published"
  },

  // 2. หนองแขม (DRAFT / EVIDENCE REQUIRED)
  "nong-khaem": {
    province: "bkk-thonburi",
    districtSlug: "nong-khaem",
    districtThaiName: "หนองแขม",
    zone: "southern",
    subdistricts: ["หนองแขม", "หนองค้างพลู"],
    primaryIntent: "รถรับจ้างหนองแขม ย้ายบ้าน ขนของ ทาวน์โฮม เพชรเกษม 81 พุทธสาคร",
    h1: "รถรับจ้างหนองแขม บริการย้ายบ้าน ขนของ ทาวน์โฮม และขนส่งมอเตอร์ไซค์",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างขนของในเขตหนองแขม ครอบคลุมถนนเพชรเกษม ถนนมาเจริญ (ซอยเพชรเกษม 81) ซอย 69 ซอย 77 ถนนเลียบคลองภาษีเจริญ และถนนพุทธสาคร เหมาะสำหรับการย้ายบ้านเดี่ยว ทาวน์โฮมโครงการจัดสรร และขนส่งสินค้าโรงงานขนาดย่อม พร้อมทีมงานยกของและอุปกรณ์รัดตรึงครบครัน",
    actualServiceCapability: "รถกระบะตู้ทึบตอนเดียว บรรทุกย้ายของทาวน์โฮม บ้านจัดสรร หอพักนักศึกษา และมอเตอร์ไซค์บิ๊กไบค์ มีอุปกรณ์สายรัด Ratchet Strap และพลาสติกแรปหุ้มเฟอร์นิเจอร์",
    localOperationalNotes: "พื้นที่หนองแขมมีโครงการที่อยู่อาศัยแนวราบหนาแน่น การจราจรช่วงเช้าและเย็นบนถนนเพชรเกษม 81 และถนนเลียบคลองภาษีเจริญฝั่งเหนือ/ใต้มีรถหนาแน่น ทีมงาน WMS มีประสบการณ์การวางแผนเวลาเดินทางเพื่อความสะดวกรวดเร็ว",
    travelCorridors: ["ถนนเพชรเกษม", "ถนนมาเจริญ (เพชรเกษม 81)", "ถนนทวีวัฒนา", "ถนนพุทธสาคร", "ถนนเลียบคลองภาษีเจริญฝั่งเหนือ/ใต้"],
    propertyAccessContext: "ส่วนใหญ่เป็นหมู่บ้านทาวน์โฮม 2-3 ชั้นและบ้านเดี่ยว ถนนในซอยมีสะพานข้ามคลองและเนินชะลอความเร็วหลายจุด รถกระบะตู้ทึบช่วงล่างแน่นหนาของเราสามารถขับข้ามได้อย่างนุ่มนวล ป้องกันสิ่งของภายในกระแทกเสียหาย",
    propertyTypes: ["หมู่บ้านทาวน์โฮมจัดสรรย่านเพชรเกษม 81", "บ้านเดี่ยวโครงการใหม่ถนนพุทธสาคร", "อาคารพาณิชย์และร้านค้าริมถนนมาเจริญ", "หอพักและอพาร์ตเมนต์ย่านมหาวิทยาลัยเอเชียอาคเนย์"],
    jobEvaluationFactors: [
      "ระยะทางจากจุดขึ้นของในหนองแขมไปยังปลายทาง",
      "ประเภทอสังหาริมทรัพย์ (ทาวน์โฮม, บ้านเดี่ยว หรือตึกแถว)",
      "จำนวนชั้นที่ต้องยกสัมภาระขึ้น-ลง",
      "ความต้องการพนักงานช่วยยกของและอุปกรณ์แรปหุ้มพิเศษ"
    ],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รถรับจ้างหนองแขม รับขนย้ายในซอยเพชรเกษม 81 หรือซอย 69 หรือไม่?",
        a: "เราให้บริการครอบคลุมเส้นทางในเขตหนองแขม ทั้งเพชรเกษม 69, 77, 81 ถนนมาเจริญ และถนนเลียบคลองภาษีเจริญ รถกระบะตู้ทึบเข้าถึงจุดรับส่งได้ตามเส้นทางที่ตกลง"
      },
      {
        q: "มีบริการคนช่วยยกของหนัก เช่น ตู้เย็นขนาดใหญ่ ที่นอน 6 ฟุต หรือไม่?",
        a: "มีพนักงานช่วยยกของคอยดูแล จัดเรียงสิ่งของและใช้สายรัดตรึงในตู้ทึบอย่างแน่นหนา พร้อมพลาสติกแรปกันรอยขีดข่วนสำหรับเฟอร์นิเจอร์ชิ้นสำคัญ"
      },
      {
        q: "การคิดราคาค่าขนส่งจากหนองแขมไปสมุทรสาครหรือนครปฐมเป็นอย่างไร?",
        a: "เนื่องจากหนองแขมอยู่ติดกับเขตพุทธสาคร กระทุ่มแบน และสามพราน เราคิดค่าบริการตามระยะทางจริงที่วิ่งจริงอย่างเป็นธรรม สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่เพื่อประเมินราคาได้ทันที"
      }
    ],
    nearbyDistrictSlugs: ["bang-khae", "thawi-watthana", "bang-bon"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 3. ภาษีเจริญ (DRAFT / EVIDENCE REQUIRED)
  "phasi-charoen": {
    province: "bkk-thonburi",
    districtSlug: "phasi-charoen",
    districtThaiName: "ภาษีเจริญ",
    zone: "southern",
    subdistricts: ["บางหว้า", "บางด้วน", "บางจาก", "บางแวก", "คลองขวาง", "ปากคลองภาษีเจริญ", "คูหาสวรรค์"],
    primaryIntent: "รถรับจ้างภาษีเจริญ ย้ายบ้าน คอนโด บางหว้า ราชพฤกษ์ บางแวก",
    h1: "รถรับจ้างภาษีเจริญ บริการย้ายบ้าน คอนโดมิเนียม และขนส่งสินค้า",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างขนย้ายในเขตภาษีเจริญ ครอบคลุมสถานีอินเตอร์เชนจ์ BTS/MRT บางหว้า ถนนเพชรเกษม ถนนราชพฤกษ์ ถนนบางแวก และถนนพุทธมณฑล สาย 1 บริการย้ายคอนโดมิเนียม อพาร์ตเมนต์ และบ้านพักอาศัยริมคลอง ด้วยรถตู้ทึบความสูงภายใน 2.1 ม. ขนย้ายของชิ้นใหญ่ได้มิดชิดปลอดภัย",
    actualServiceCapability: "ย้ายคอนโด High-rise & Low-rise ย่านสถานีบางหว้า ขนย้ายบ้านพักอาศัยย่านบางแวก และส่งมอเตอร์ไซค์ข้ามจังหวัด มีอุปกรณ์สายรัดและฟิล์มแรปป้องกันริ้วรอย",
    localOperationalNotes: "ย่านภาษีเจริญมีทั้งจุดเชื่อมต่อการเดินทางสมัยใหม่อย่างสถานีบางหว้า และชุมชนเก่าริมคลองภาษีเจริญที่มีสะพานข้ามคลองชันและซอยย่อย ทีมงานมีความคุ้นเคยกับลักษณะภูมิศาสตร์ท้องถิ่นเป็นอย่างดี",
    travelCorridors: ["ถนนเพชรเกษม", "ถนนราชพฤกษ์", "ถนนบางแวก", "ถนนพุทธมณฑล สาย 1", "ถนนกัลปพฤกษ์"],
    propertyAccessContext: "คอนโดมิเนียมรอบสถานี BTS/MRT บางหว้ามักมีระเบียบการจองลิฟต์และจุดจอดโหลดของ แนะนำให้นัดหมายจุดจอดเทียบหน้าอาคารหรือช่องโหลดสินค้ากับนิติบุคคล",
    propertyTypes: ["คอนโดมิเนียม High-rise ย่าน BTS บางหว้า", "บ้านพักอาศัยและทาวน์โฮมถนนบางแวก", "อาคารพาณิชย์ริมถนนเพชรเกษม", "ชุมชนริมคลองภาษีเจริญและวัดปากน้ำ"],
    jobEvaluationFactors: [
      "ระยะทางระหว่างจุดรับสัมภาระในเขตภาษีเจริญไปยังปลายทาง",
      "กฎเกณฑ์การเข้าจอดและช่วงเวลาโหลดของของนิติบุคคลคอนโดมิเนียม",
      "จำนวนพนักงานยกของที่ต้องการ",
      "ขนาดและปริมาณของเฟอร์นิเจอร์ชิ้นใหญ่"
    ],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "คอนโดแถว BTS บางหว้า ต้องจองคิวรถขนของล่วงหน้านานแค่ไหน?",
        a: "แนะนำให้จองคิวรถขนของ WMS ล่วงหน้า 1-2 วันเพื่อล็อกเวลาที่ตรงกับช่วงเวลาที่นิติบุคคลอนุญาตให้ใช้ลิฟต์ขนของได้สะดวกที่สุด"
      },
      {
        q: "ถนนบางแวกหรือซอยวัดปากน้ำ รถตู้ทึบเข้าได้สะดวกไหม?",
        a: "เข้าได้อย่างสะดวกครับ รถกระบะตอนเดียวตู้ทึบขนาดกะทัดรัดของเราถูกออกแบบให้เข้าตรอกซอยและข้ามสะพานคลองในเขตภาษีเจริญได้คล่องตัวกว่ารถบรรทุกขนาดใหญ่"
      },
      {
        q: "มีบริการขนส่งมอเตอร์ไซค์จากภาษีเจริญไปต่างจังหวัดไหม?",
        a: "มีบริการขนส่งมอเตอร์ไซค์และบิ๊กไบค์แบบตู้ทึบมิดชิด พร้อมอุปกรณ์ล็อกล้อและสายรัดกันกระแทกอย่างปลอดภัยตลอดเส้นทาง"
      }
    ],
    nearbyDistrictSlugs: ["bang-khae", "bangkok-yai", "thon-buri"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 4. บางขุนเทียน (DRAFT / EVIDENCE REQUIRED)
  "bang-khun-thian": {
    province: "bkk-thonburi",
    districtSlug: "bang-khun-thian",
    districtThaiName: "บางขุนเทียน",
    zone: "southern",
    subdistricts: ["ท่าข้าม", "แสมดำ"],
    primaryIntent: "รถรับจ้างบางขุนเทียน ขนส่งสินค้า พระราม 2 ท่าข้าม แสมดำ",
    h1: "รถรับจ้างบางขุนเทียน บริการขนส่งสินค้า ขนย้ายโรงงาน และบ้านพักอาศัย",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างครอบคลุมพื้นที่เขตบางขุนเทียน ถนนพระราม 2 ถนนบางขุนเทียน-ชายทะเล ถนนท่าข้าม และแสมดำ เหมาะสำหรับงานขนส่งสินค้าโรงงาน โกดัง และย้ายบ้านจัดสรร",
    actualServiceCapability: "รถกระบะตู้ทึบขนส่งสินค้าโรงงาน ย้ายบ้านจัดสรรพระราม 2 และขนส่งสินค้าเกษตร/อาหารแปรรูปบรรจุกล่อง",
    localOperationalNotes: "ย่านบางขุนเทียนมีทั้งนิคมอุตสาหกรรม โกดังสินค้า และหมู่บ้านจัดสรรขนาดใหญ่ การจราจรบนถนนพระราม 2 มีความหนาแน่น ต้องวางแผนเวลาวิ่งงานอย่างรอบคอบ",
    travelCorridors: ["ถนนพระราม 2", "ถนนบางขุนเทียน-ชายทะเล", "ถนนกาญจนาภิเษก", "ถนนท่าข้าม"],
    propertyAccessContext: "โกดังสินค้า คลังพัสดุ โรงงานขนาดกลาง และหมู่บ้านจัดสรรขนาดใหญ่ มีทางเข้ากว้างขวาง รถกระบะตู้ทึบเข้าเทียบจุดโหลดของได้สะดวก",
    propertyTypes: ["โกดังสินค้าและโรงงานอุตสาหกรรมแสมดำ", "หมู่บ้านจัดสรรขนาดใหญ่ถนนพระราม 2", "อาคารพาณิชย์ย่านท่าข้าม"],
    jobEvaluationFactors: ["ระยะทางวิ่งจริง", "น้ำหนักและปริมาตรสินค้า", "จำนวนพนักงานช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "พื้นที่บางขุนเทียน ให้บริการครอบคลุมจุดไหนบ้าง?",
        a: "ครอบคลุมถนนพระราม 2 แสมดำ ท่าข้าม และถนนบางขุนเทียน-ชายทะเล สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["bang-bon", "chom-thong", "rat-burana"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 5. บางบอน (DRAFT / EVIDENCE REQUIRED)
  "bang-bon": {
    province: "bkk-thonburi",
    districtSlug: "bang-bon",
    districtThaiName: "บางบอน",
    zone: "southern",
    subdistricts: ["บางบอนเหนือ", "บางบอนใต้", "คลองบางบอน", "คลองบางพราน"],
    primaryIntent: "รถรับจ้างบางบอน ขนของ ย้ายบ้าน เอกชัย บางบอน 1-5",
    h1: "รถรับจ้างบางบอน บริการย้ายบ้าน ขนส่งสินค้า และโรงงานขนาดย่อม",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตบางบอน ถนนเอกชัย ถนนบางบอน 1 ถึงบางบอน 5 รองรับงานย้ายบ้าน ทาวน์โฮม และขนย้ายวัตถุดิบสินค้าสำหรับโรงงานขนาดย่อม",
    actualServiceCapability: "ขนย้ายสินค้าโรงงานการ์เมนต์ โรงกลึง อะไหล่ และย้ายที่อยู่อาศัยทาวน์โฮม",
    localOperationalNotes: "ย่านบางบอนมีซอยเชื่อมระหว่างถนนเอกชัยกับถนนกาญจนาภิเษกหลายจุด รถกระบะตู้ทึบมีความคล่องตัวสูง",
    travelCorridors: ["ถนนเอกชัย", "ถนนบางบอน 1-5", "ถนนกาญจนาภิเษก"],
    propertyAccessContext: "โรงงานขนาดเล็ก อาคารพาณิชย์ และโครงการทาวน์โฮม",
    propertyTypes: ["โรงงานขนาดย่อมและโรงกลึง", "ทาวน์โฮมจัดสรรถนนบางบอน 3-5", "อาคารพาณิชย์ถนนเอกชัย"],
    jobEvaluationFactors: ["ระยะทาง", "จำนวนสิ่งของ", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับขนส่งสินค้าโรงงานแถวบางบอน 3 หรือบางบอน 5 ไหม?",
        a: "ให้บริการทุกซอยในเขตบางบอนครับ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["bang-khae", "bang-khun-thian", "nong-khaem"],
    lastReviewedDate: "2026-06-25",
    proofScore: 65,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 6. ราษฎร์บูรณะ (DRAFT / EVIDENCE REQUIRED)
  "rat-burana": {
    province: "bkk-thonburi",
    districtSlug: "rat-burana",
    districtThaiName: "ราษฎร์บูรณะ",
    zone: "southern",
    subdistricts: ["ราษฎร์บูรณะ", "บางปะกอก"],
    primaryIntent: "รถรับจ้างราษฎร์บูรณะ สุขสวัสดิ์ บางปะกอก ย้ายบ้าน คอนโด",
    h1: "รถรับจ้างราษฎร์บูรณะ บริการย้ายบ้าน คอนโด และขนส่งสินค้า",
    directAnswer: "WMS TRANSPORT ให้บริการรถตู้ทึบรับจ้างในเขตราษฎร์บูรณะ ถนนสุขสวัสดิ์ ถนนราษฎร์บูรณะ และย่านบางปะกอก บริการขนย้ายหอพัก คอนโด และสำนักงาน",
    actualServiceCapability: "ย้ายคอนโดมิเนียมริมแม่น้ำ ทาวน์โฮม และขนส่งพัสดุสำนักงาน",
    localOperationalNotes: "แนวถนนสุขสวัสดิ์และถนนราษฎร์บูรณะ เชื่อมต่อไปยังพระประแดงและสะพานพระราม 9",
    travelCorridors: ["ถนนสุขสวัสดิ์", "ถนนราษฎร์บูรณะ", "ถนนประชาอุทิศ"],
    propertyAccessContext: "คอนโดมิเนียม อาคารสำนักงาน และชุมชนที่อยู่อาศัย",
    propertyTypes: ["คอนโดมิเนียม", "บ้านพักอาศัย", "อาคารสำนักงานริมแม่น้ำ"],
    jobEvaluationFactors: ["ระยะทาง", "ชั้นอาคาร", "จำนวนคนยก"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับขนของย่านสุขสวัสดิ์ บางปะกอก หรือไม่?",
        a: "ให้บริการครอบคลุมทั่วเขตราษฎร์บูรณะ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["thung-khru", "chom-thong", "thon-buri"],
    lastReviewedDate: "2026-06-25",
    proofScore: 66,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 7. ทุ่งครุ (DRAFT / EVIDENCE REQUIRED)
  "thung-khru": {
    province: "bkk-thonburi",
    districtSlug: "thung-khru",
    districtThaiName: "ทุ่งครุ",
    zone: "southern",
    subdistricts: ["บางมด", "ทุ่งครุ"],
    primaryIntent: "รถรับจ้างทุ่งครุ ประชาอุทิศ พุทธบูชา ย้ายหอพักนักศึกษา ย้ายบ้าน",
    h1: "รถรับจ้างทุ่งครุ บริการย้ายหอพัก มจธ. บางมด ย้ายบ้าน และขนส่งสินค้า",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตทุ่งครุ ถนนประชาอุทิศ ถนนพุทธบูชา และย่านมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (มจธ. บางมด) เหมาะสำหรับย้ายหอพักนักศึกษาและบ้านพักอาศัย",
    actualServiceCapability: "ขนย้ายหอพักนักศึกษา อพาร์ตเมนต์ และบ้านจัดสรรย่านประชาอุทิศ-พุทธบูชา",
    localOperationalNotes: "ถนนประชาอุทิศและพุทธบูชามีการจราจรหนาแน่นช่วงเวลาเปิด-ปิดสถาบันการศึกษา",
    travelCorridors: ["ถนนประชาอุทิศ", "ถนนพุทธบูชา", "ถนนครุใน"],
    propertyAccessContext: "หอพักนักศึกษา อพาร์ตเมนต์ และหมู่บ้านจัดสรร",
    propertyTypes: ["หอพักและอพาร์ตเมนต์นักศึกษา", "ทาวน์โฮมและบ้านเดี่ยวถนนประชาอุทิศ"],
    jobEvaluationFactors: ["ระยะทาง", "ขนาดห้องพัก", "จำนวนคนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "ย้ายหอพักนักศึกษาย่าน มจธ. บางมด มีคนช่วยยกของไหม?",
        a: "มีพนักงานช่วยยกของบริการครับ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["rat-burana", "chom-thong", "bang-khun-thian"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // ==========================================
  // NORTHERN THONBURI (กลุ่มเขตกรุงธนเหนือ - 8 เขต)
  // ==========================================

  // 8. ธนบุรี (DRAFT / EVIDENCE REQUIRED)
  "thon-buri": {
    province: "bkk-thonburi",
    districtSlug: "thon-buri",
    districtThaiName: "ธนบุรี",
    zone: "northern",
    subdistricts: ["วัดกัลยาณ์", "หิรัญรูจี", "บางยี่เรือ", "บุคคโล", "ตลาดพลู", "ดาวคะนอง", "สำเหร่"],
    primaryIntent: "รถรับจ้างธนบุรี ตลาดพลู วงเวียนใหญ่ ท่าพระ ดาวคะนอง ย้ายบ้าน ขนของ",
    h1: "รถรับจ้างเขตธนบุรี บริการย้ายบ้าน ขนของ ตลาดพลู วงเวียนใหญ่ สำเหร่",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตธนบุรี ครอบคลุมย่านตลาดพลู วงเวียนใหญ่ สำเหร่ บุคคโล และดาวคะนอง เหมาะสำหรับงานขนย้ายในชุมชนเมืองเก่าและอาคารพาณิชย์",
    actualServiceCapability: "ขนย้ายบ้านพักอาศัย ชุมชนดั้งเดิม อาคารพาณิชย์ และคอนโดมิเนียมแนวรถไฟฟ้า BTS วงเวียนใหญ่-ตลาดพลู",
    localOperationalNotes: "มีตรอกซอยแคบและชุมชนเมืองเก่าหลายจุด รถตู้ทึบตอนเดียวมีความคล่องตัวในการเข้าพื้นที่",
    travelCorridors: ["ถนนประชาธิปก", "ถนนสมเด็จพระเจ้าตากสิน", "ถนนรัชดาภิเษก", "ถนนเทอดไท"],
    propertyAccessContext: "ตึกแถวโบราณ อาคารพาณิชย์ และคอนโดมิเนียมแนวรถไฟฟ้า",
    propertyTypes: ["อาคารพาณิชย์ตลาดพลู", "คอนโดมิเนียมแนว BTS ตลาดพลู/โพธิ์นิมิตร", "บ้านพักในชุมชน"],
    jobEvaluationFactors: ["ระยะทาง", "ความกว้างของซอย", "จำนวนชั้นที่ต้องยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "ซอยแคบแถวตลาดพลูหรือเทอดไท รถเข้าได้ไหม?",
        a: "รถกระบะตู้ทึบตอนเดียวของเราเข้าตรอกซอยแคบได้ดี สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["khlong-san", "bangkok-yai", "chom-thong"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 9. คลองสาน (DRAFT / EVIDENCE REQUIRED)
  "khlong-san": {
    province: "bkk-thonburi",
    districtSlug: "khlong-san",
    districtThaiName: "คลองสาน",
    zone: "northern",
    subdistricts: ["สมเด็จเจ้าพระยา", "คลองสาน", "บางลำภูล่าง"],
    primaryIntent: "รถรับจ้างคลองสาน เจริญนคร กรุงธนบุรี ลาดหญ้า ย้ายคอนโดหรู",
    h1: "รถรับจ้างคลองสาน บริการย้ายคอนโดมิเนียม ย้ายบ้าน เจริญนคร กรุงธนบุรี",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตคลองสาน ถนนเจริญนคร ถนนกรุงธนบุรี ถนนลาดหญ้า เชี่ยวชาญการย้ายคอนโดมิเนียม High-rise ริมแม่น้ำเจ้าพระยา",
    actualServiceCapability: "ขนย้ายคอนโดมิเนียมหรูริมแม่น้ำเจ้าพระยา อาคารสำนักงาน และบ้านพักอาศัย",
    localOperationalNotes: "คอนโดริมน้ำย่านเจริญนครมีระเบียบความสูงอาคารจอดรถและช่วงเวลาขนย้ายเฉพาะ",
    travelCorridors: ["ถนนเจริญนคร", "ถนนกรุงธนบุรี", "ถนนลาดหญ้า", "ถนนสมเด็จเจ้าพระยา"],
    propertyAccessContext: "คอนโดมิเนียม High-rise ทางเข้าอาคารจำกัดความสูง 2.1 เมตร",
    propertyTypes: ["คอนโดมิเนียม High-rise ริมแม่น้ำเจ้าพระยา", "ทาวน์โฮมและอาคารพาณิชย์ถนนลาดหญ้า"],
    jobEvaluationFactors: ["ระยะทาง", "ระเบียบคอนโดมิเนียม", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "คอนโดริมแม่น้ำถนนเจริญนคร มีข้อจำกัดความสูงรถไหม?",
        a: "รถตู้ทึบ WMS สูง 2.1 เมตร สามารถเข้าลานจอดใต้อาคารคอนโดส่วนใหญ่ได้สบาย สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["thon-buri", "bangkok-yai", "rat-burana"],
    lastReviewedDate: "2026-06-25",
    proofScore: 70,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 10. จอมทอง (DRAFT / EVIDENCE REQUIRED)
  "chom-thong": {
    province: "bkk-thonburi",
    districtSlug: "chom-thong",
    districtThaiName: "จอมทอง",
    zone: "northern",
    subdistricts: ["บางขุนเทียน", "บางค้อ", "บางมด", "จอมทอง"],
    primaryIntent: "รถรับจ้างจอมทอง วุฒากาศ เอกชัย พระราม 2 ย้ายบ้าน ขนของ",
    h1: "รถรับจ้างจอมทอง บริการย้ายบ้าน ขนของ ทาวน์โฮม วุฒากาศ เอกชัย",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตจอมทอง ถนนวุฒากาศ ถนนจอมทอง ถนนเอกชัย และเชื่อมต่อพระราม 2 ให้บริการย้ายบ้าน ทาวน์โฮม และอพาร์ตเมนต์",
    actualServiceCapability: "ย้ายบ้านพักอาศัย ทาวน์โฮม และหอพักใกล้แนวรถไฟฟ้า BTS วุฒากาศ",
    localOperationalNotes: "มีทางรถไฟสายวงเวียนใหญ่-มหาชัยตัดผ่าน และซอยเชื่อมต่อวุฒากาศ-เทอดไท",
    travelCorridors: ["ถนนจอมทอง", "ถนนวุฒากาศ", "ถนนเอกชัย", "ถนนพระราม 2"],
    propertyAccessContext: "ทาวน์โฮม อาคารพาณิชย์ และคอนโดมิเนียมใกล้สถานีวุฒากาศ",
    propertyTypes: ["ทาวน์โฮมจัดสรร", "คอนโดมิเนียมแนว BTS วุฒากาศ", "บ้านเดี่ยวย่านบางมด"],
    jobEvaluationFactors: ["ระยะทาง", "ซอยที่ตั้ง", "พนักงานยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับขนของในซอยวัดจอมทอง หรือถนนวุฒากาศ หรือไม่?",
        a: "ให้บริการทุกพื้นที่ในเขตจอมทองครับ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["thon-buri", "bang-khun-thian", "phasi-charoen"],
    lastReviewedDate: "2026-06-25",
    proofScore: 65,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 11. บางกอกใหญ่ (DRAFT / EVIDENCE REQUIRED)
  "bangkok-yai": {
    province: "bkk-thonburi",
    districtSlug: "bangkok-yai",
    districtThaiName: "บางกอกใหญ่",
    zone: "northern",
    subdistricts: ["วัดอรุณ", "วัดท่าพระ"],
    primaryIntent: "รถรับจ้างบางกอกใหญ่ ท่าพระ อิสรภาพ วังเดิม ย้ายบ้าน คอนโด",
    h1: "รถรับจ้างบางกอกใหญ่ บริการย้ายบ้าน คอนโดมิเนียม ท่าพระ อิสรภาพ",
    directAnswer: "WMS TRANSPORT ให้บริการรถตู้ทึบรับจ้างในเขตบางกอกใหญ่ ย่านแยกท่าพระ ถนนอิสรภาพ ถนนจรัญสนิทวงศ์ และถนนวังเดิม บริการขนย้ายคอนโดมิเนียมและบ้านพักอาศัย",
    actualServiceCapability: "ย้ายคอนโดมิเนียมรอบแยกท่าพระ MRT ท่าพระ และชุมชนประวัติศาสตร์ใกล้วัดอรุณ",
    localOperationalNotes: "แยกท่าพระเป็นจุดตัดการจราจรสำคัญ มีคอนโดมิเนียมหนาแน่น",
    travelCorridors: ["ถนนเพชรเกษม", "ถนนจรัญสนิทวงศ์", "ถนนอิสรภาพ", "ถนนวังเดิม"],
    propertyAccessContext: "คอนโดมิเนียมแนว MRT ท่าพระ และบ้านพักในตรอกซอยเก่า",
    propertyTypes: ["คอนโดมิเนียม High-rise แยกท่าพระ", "ตึกแถวริมถนนอิสรภาพ"],
    jobEvaluationFactors: ["ระยะทาง", "ลิฟต์และทางเข้าอาคาร", "จำนวนคนช่วยยก"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "คอนโดรอบแยก MRT ท่าพระ รถตู้ทึบเข้าจอดได้ไหม?",
        a: "รถตู้ทึบของเราความสูง 2.1 ม. เข้าจุดจอดใต้อาคารคอนโดย่านท่าพระได้สะดวก สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["phasi-charoen", "thon-buri", "bangkok-noi"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 12. บางกอกน้อย (DRAFT / EVIDENCE REQUIRED)
  "bangkok-noi": {
    province: "bkk-thonburi",
    districtSlug: "bangkok-noi",
    districtThaiName: "บางกอกน้อย",
    zone: "northern",
    subdistricts: ["ศิริราช", "บ้านช่างหล่อ", "บางขุนนนท์", "บางขุนศรี", "อรุณอมรินทร์"],
    primaryIntent: "รถรับจ้างบางกอกน้อย พรานนก ศิริราช บางขุนนนท์ อรุณอมรินทร์ ย้ายหอพัก",
    h1: "รถรับจ้างบางกอกน้อย บริการย้ายหอพัก คอนโด บ้าน พรานนก ศิริราช บางขุนนนท์",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตบางกอกน้อย ครอบคลุมพรานนก ศิริราช อรุณอมรินทร์ และบางขุนนนท์ เหมาะสำหรับงานย้ายหอพักบุคลากรทางการแพทย์ อพาร์ตเมนต์ และคอนโดมิเนียม",
    actualServiceCapability: "ย้ายหอพักแพทย์ พยาบาล บุคลากรศิริราช ขนส่งมอเตอร์ไซค์ และย้ายบ้านพักอาศัย",
    localOperationalNotes: "การจราจรรอบโรงพยาบาลศิริราชและตลาดพรานนกหนาแน่นตลอดวัน ทีมงานวางแผนเวลาเข้างานอย่างรัดกุม",
    travelCorridors: ["ถนนพรานนก", "ถนนอรุณอมรินทร์", "ถนนอิสรภาพ", "ถนนบางขุนนนท์", "ถนนจรัญสนิทวงศ์"],
    propertyAccessContext: "หอพักบุคลากร อพาร์ตเมนต์ และชุมชนริมคลองบางกอกน้อย",
    propertyTypes: ["หอพักและอพาร์ตเมนต์ย่านศิริราช-พรานนก", "คอนโดมิเนียมถนนจรัญสนิทวงศ์", "บ้านพักอาศัยบางขุนนนท์"],
    jobEvaluationFactors: ["ระยะทาง", "ช่วงเวลาเดินทางเลี่ยงรถติด", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับย้ายหอพักหรือคอนโดแถวศิริราช พรานนก ไหม?",
        a: "ให้บริการประจำในพื้นที่ศิริราช พรานนก และบางขุนนนท์ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["bang-phlat", "bangkok-yai", "taling-chan"],
    lastReviewedDate: "2026-06-25",
    proofScore: 74,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 13. บางพลัด (DRAFT / EVIDENCE REQUIRED)
  "bang-phlat": {
    province: "bkk-thonburi",
    districtSlug: "bang-phlat",
    districtThaiName: "บางพลัด",
    zone: "northern",
    subdistricts: ["บางพลัด", "บางอ้อ", "บางบำหรุ", "บางยี่ขัน"],
    primaryIntent: "รถรับจ้างบางพลัด จรัญสนิทวงศ์ ปิ่นเกล้า สะพานกรุงธน ย้ายคอนโด",
    h1: "รถรับจ้างบางพลัด บริการย้ายบ้าน คอนโดมิเนียม จรัญสนิทวงศ์ ปิ่นเกล้า",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตบางพลัด ครอบคลุมถนนจรัญสนิทวงศ์ ถนนสิรินธร ถนนสมเด็จพระปิ่นเกล้า และสะพานกรุงธน (ซังฮี้) บริการย้ายคอนโดแนวรถไฟฟ้าสายสีน้ำเงินและอพาร์ตเมนต์",
    actualServiceCapability: "ย้ายคอนโดมิเนียมแนวถนนจรัญสนิทวงศ์ หอพักนักศึกษา และขนส่งมอเตอร์ไซค์",
    localOperationalNotes: "ถนนจรัญสนิทวงศ์มีคอนโด High-rise เกิดขึ้นจำนวนมาก และเป็นจุดเชื่อมข้ามสะพานพระราม 7/8",
    travelCorridors: ["ถนนจรัญสนิทวงศ์", "ถนนสิรินธร", "ถนนราชวิถี", "ถนนสมเด็จพระปิ่นเกล้า"],
    propertyAccessContext: "คอนโดมิเนียมแนวรถไฟฟ้า MRT และอพาร์ตเมนต์ในซอยจรัญฯ",
    propertyTypes: ["คอนโดมิเนียมแนว MRT จรัญฯ", "อพาร์ตเมนต์ย่านบางยี่ขัน", "บ้านพักอาศัยถนนสิรินธร"],
    jobEvaluationFactors: ["ระยะทาง", "ความสูงเพดานอาคารจอดรถ", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "คอนโดแนวถนนจรัญสนิทวงศ์ รถตู้ทึบเข้าจอดโหลดของได้ไหม?",
        a: "รถตู้ทึบ WMS สูง 2.1 ม. ได้รับการออกแบบให้เข้าใต้อาคารจอดรถคอนโดได้พอดี สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["bangkok-noi", "taling-chan"],
    lastReviewedDate: "2026-06-25",
    proofScore: 74,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 14. ตลิ่งชัน (DRAFT / EVIDENCE REQUIRED)
  "taling-chan": {
    province: "bkk-thonburi",
    districtSlug: "taling-chan",
    districtThaiName: "ตลิ่งชัน",
    zone: "northern",
    subdistricts: ["คลองชักพระ", "ตลิ่งชัน", "ฉิมพลี", "บางพรม", "บางระมาด", "บางเชือกหนัง"],
    primaryIntent: "รถรับจ้างตลิ่งชัน บรมราชชนนี ราชพฤกษ์ กาญจนาภิเษก ย้ายบ้านเดี่ยว",
    h1: "รถรับจ้างตลิ่งชัน บริการย้ายบ้านเดี่ยว ทาวน์โฮม ราชพฤกษ์ บรมราชชนนี",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตตลิ่งชัน ถนนบรมราชชนนี ถนนราชพฤกษ์ ถนนพรานนก-พุทธมณฑล สาย 4 เชี่ยวชาญการขนย้ายบ้านเดี่ยวจัดสรรและสวนผลไม้เดิม",
    actualServiceCapability: "ย้ายบ้านเดี่ยวโครงการขนาดใหญ่ ทาวน์โฮม และขนส่งเฟอร์นิเจอร์สั่งทำพิเศษ",
    localOperationalNotes: "มีถนนตัดใหม่หลายสายและโครงการบ้านเดี่ยวระดับบน ซอยลึกเชื่อมต่อคลองชักพระ",
    travelCorridors: ["ถนนบรมราชชนนี", "ถนนราชพฤกษ์", "ถนนกาญจนาภิเษก", "ถนนพรานนก-พุทธมณฑล สาย 4"],
    propertyAccessContext: "โครงการบ้านเดี่ยวขนาดใหญ่ ถนนภายในกว้างขวาง ขนย้ายสะดวก",
    propertyTypes: ["บ้านเดี่ยวโครงการจัดสรรระดับบน", "ทาวน์โฮมถนนราชพฤกษ์", "บ้านสวนชุมชนดั้งเดิม"],
    jobEvaluationFactors: ["ระยะทาง", "จำนวนเฟอร์นิเจอร์ชิ้นใหญ่", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับย้ายบ้านเดี่ยวโครงการย่านราชพฤกษ์ ตลิ่งชัน ไหม?",
        a: "ให้บริการเป็นประจำครับ มีพนักงานยกของพร้อมอุปกรณ์แรปหุ้มป้องกันเฟอร์นิเจอร์ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["thawi-watthana", "bang-phlat", "bangkok-noi"],
    lastReviewedDate: "2026-06-25",
    proofScore: 72,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 15. ทวีวัฒนา (DRAFT / EVIDENCE REQUIRED)
  "thawi-watthana": {
    province: "bkk-thonburi",
    districtSlug: "thawi-watthana",
    districtThaiName: "ทวีวัฒนา",
    zone: "northern",
    subdistricts: ["ทวีวัฒนา", "ศาลาธรรมสพน์"],
    primaryIntent: "รถรับจ้างทวีวัฒนา พุทธมณฑล สาย 2 สาย 3 ถนนอักษะ ย้ายบ้านเดี่ยว",
    h1: "รถรับจ้างทวีวัฒนา บริการย้ายบ้านเดี่ยว คฤหาสน์ พุทธมณฑล สาย 2 สาย 3",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตทวีวัฒนา ถนนพุทธมณฑล สาย 2 สาย 3 ถนนอุทยาน (อักษะ) และถนนเลียบคลองทวีวัฒนา บริการย้ายบ้านเดี่ยวโครงการหรูและคฤหาสน์",
    actualServiceCapability: "ย้ายบ้านเดี่ยวขนาดใหญ่ คฤหาสน์ ขนส่งเฟอร์นิเจอร์ลอยตัว และมอเตอร์ไซค์",
    localOperationalNotes: "ถนนกว้างขวาง วางแผนการเดินทางสะดวก เชื่อมต่อไปศาลายาและนครปฐมได้รวดเร็ว",
    travelCorridors: ["ถนนบรมราชชนนี", "ถนนพุทธมณฑล สาย 2", "ถนนพุทธมณฑล สาย 3", "ถนนอุทยาน (อักษะ)", "ถนนเลียบคลองทวีวัฒนา"],
    propertyAccessContext: "บ้านเดี่ยว คฤหาสน์ และโครงการจัดสรรระดับบน ถนนเมนกว้างขวาง",
    propertyTypes: ["บ้านเดี่ยวขนาดใหญ่และคฤหาสน์", "โครงการจัดสรรถนนพุทธมณฑล สาย 2/3"],
    jobEvaluationFactors: ["ระยะทาง", "ปริมาณสัมภาระ", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับย้ายบ้านโครงการย่านพุทธมณฑล สาย 2 หรือสาย 3 หรือไม่?",
        a: "ให้บริการขนย้ายบ้านเดี่ยวและทาวน์โฮมทุกโครงการในเขตทวีวัฒนา สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["taling-chan", "nong-khaem", "bang-khae"],
    lastReviewedDate: "2026-06-25",
    proofScore: 70,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // ==========================================
  // NON-THONBURI / LEGACY AREAS (Preserved)
  // ==========================================
  "maha-chai": {
    province: "samutsakhon",
    districtSlug: "maha-chai",
    districtThaiName: "มหาชัย",
    primaryIntent: "รถรับจ้างตู้ทึบ มหาชัย สมุทรสาคร ย้ายบ้าน ย้ายของทั่วไป และสินค้าโรงงาน",
    h1: "รถรับจ้างตู้ทึบ มหาชัย สมุทรสาคร ขนส่งสินค้าและย้ายที่อยู่อาศัย",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตมหาชัย สมุทรสาคร ครอบคลุมถนนพระราม 2 ถนนเศรษฐกิจ 1 และถนนเอกชัย เหมาะสำหรับงานขนส่งสินค้าโรงงานอุตสาหกรรมและย้ายบ้านพักอาศัย",
    actualServiceCapability: "บริการรถตู้ทึบเหมาเที่ยว ขนส่งสินค้าเกษตร สินค้าทะเลแช่แข็งบรรจุกล่อง ย้ายของโรงงานและหอพักพนักงาน",
    localOperationalNotes: "มหาชัยเป็นศูนย์กลางอุตสาหกรรมและประมง มีรถบรรทุกหนาแน่นตลอดวัน ทีมงานคุ้นเคยกับเส้นทางลัดเลาะในชุมชนตลาดและทางเข้าโรงงานอุตสาหกรรม",
    travelCorridors: ["ถนนพระราม 2", "ถนนเศรษฐกิจ 1", "ถนนเอกชัย"],
    propertyAccessContext: "โกดังสินค้า อาคารพาณิชย์ และหอพักคนงานในเขตโรงงานอุตสาหกรรม",
    propertyTypes: ["โกดังและโรงงานอุตสาหกรรม", "อาคารพาณิชย์ย่านตลาดทะเลไทย", "หอพักพนักงาน"],
    jobEvaluationFactors: ["ระยะทาง", "น้ำหนักสินค้า", "คนช่วยยกของ"],
    projectEvidenceIds: ["freight-delivery-maha-chai"],
    images: [
      {
        path: "/images/WM8.webp",
        alt: "รถกระบะรับจ้างขนส่งสินค้าโรงงานอุตสาหกรรมมหาชัย สมุทรสาคร",
        caption: "งานเหมารถตู้ทึบรับส่งสินค้าจากตลาดทะเลไทย มหาชัย ไปยังเขตอุตสาหกรรมปลายทาง"
      }
    ],
    reviewEvidenceIds: ["rev-mc-01"],
    localFaq: [
      {
        q: "รถรับจ้างมหาชัย ขนส่งสินค้าโรงงานไปต่างจังหวัดคิดราคาอย่างไร?",
        a: "คิดราคาตามระยะทางจริงจากมหาชัยไปยังจังหวัดปลายทาง สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["bang-khun-thian"],
    lastReviewedDate: "2026-06-25",
    proofScore: 78,
    isIndexable: true,
    status: "published"
  },

  "pinklao": {
    province: "bkk-thonburi",
    districtSlug: "pinklao",
    districtThaiName: "ปิ่นเกล้า",
    zone: "northern",
    subdistricts: ["บางยี่ขัน", "อรุณอมรินทร์"],
    primaryIntent: "รถกระบะตู้ทึบรับจ้างย้ายหอพัก ย้ายคอนโด ย่านปิ่นเกล้า อรุณอมรินทร์ บรมราชชนนี",
    h1: "รถรับจ้างปิ่นเกล้า บริการย้ายหอพัก คอนโดมิเนียม และขนส่งมอเตอร์ไซค์",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างย่านปิ่นเกล้า ครอบคลุมถนนสมเด็จพระปิ่นเกล้า ถนนบรมราชชนนี และถนนอรุณอมรินทร์ เหมาะสำหรับย้ายหอพักนักศึกษา คอนโดมิเนียม และขนส่งรถมอเตอร์ไซค์",
    actualServiceCapability: "ย้ายหอพักนักศึกษา ย้ายอพาร์ตเมนต์ คอนโดมิเนียม และขนส่งรถมอเตอร์ไซค์บิ๊กไบค์ มีอุปกรณ์รัดตรึงและพลาสติกแรปกันรอยขีดข่วน",
    localOperationalNotes: "ย่านปิ่นเกล้าเป็นจุดเชื่อมต่อการเดินทางหนาแน่น มีข้อจำกัดเรื่องช่วงเวลาเร่งด่วนบนถนนบรมราชชนนี ทีมงานมีประสบการณ์จัดเวลาวิ่งงานเลี่ยงรถติด",
    travelCorridors: ["ถนนบรมราชชนนี", "ถนนอรุณอมรินทร์", "ถนนจรัญสนิทวงศ์", "สะพานพระราม 8"],
    propertyAccessContext: "อพาร์ตเมนต์และหอพักนักศึกษาใกล้สถาบันการศึกษา คอนโดมิเนียม Low-rise ในซอยลึก รถกระบะตู้ทึบเข้าซอยได้ทุกจุด",
    propertyTypes: ["หอพักนักศึกษา", "คอนโดมิเนียม Low-rise", "อาคารพาณิชย์"],
    jobEvaluationFactors: ["ระยะทาง", "ชั้นอาคารและลิฟต์", "คนช่วยยกของ"],
    projectEvidenceIds: ["motorcycle-delivery-pinklao"],
    images: [
      {
        path: "/images/WM11.webp",
        alt: "บริการส่งมอเตอร์ไซค์บิ๊กไบค์และย้ายหอพักย่านปิ่นเกล้า",
        caption: "การแพ็กและจัดส่งบิ๊กไบค์ของลูกค้าไปยังพื้นที่ปิ่นเกล้าด้วยรถตู้มิดชิด"
      }
    ],
    reviewEvidenceIds: ["rev-pk-01"],
    localFaq: [
      {
        q: "ขนของย้ายหอพักนักศึกษาย่านปิ่นเกล้า มีคนช่วยยกของกี่คน?",
        a: "โดยทั่วไปมีพนักงานยกของ 1-2 คน (รวมคนขับ) ช่วยเบาแรงและจัดเรียงของในตู้ทึบอย่างเป็นระบบ"
      }
    ],
    nearbyDistrictSlugs: ["bang-phlat", "bangkok-noi"],
    lastReviewedDate: "2026-06-25",
    proofScore: 75,
    isIndexable: true,
    status: "published"
  }
};

/**
 * Validates if a district landing page is approved and indexable
 */
export function isDistrictPageIndexable(record: DistrictRecord): boolean {
  if (!record) return false;
  return (
    record.isIndexable === true &&
    record.status === 'published' &&
    record.proofScore >= 75 &&
    (record.projectEvidenceIds?.length ?? 0) > 0
  );
}

/**
 * Returns all 15 official Thonburi districts grouped by zone
 */
export function getThonburiDistrictsByZone(zone: ThonburiZone): DistrictRecord[] {
  return Object.values(districtLandingPages).filter(
    (d) => d.province === 'bkk-thonburi' && d.zone === zone && d.districtSlug !== 'pinklao'
  );
}

/**
 * Returns all published Thonburi districts
 */
export function getPublishedThonburiDistricts(): DistrictRecord[] {
  return Object.values(districtLandingPages).filter(
    (d) => d.province === 'bkk-thonburi' && isDistrictPageIndexable(d)
  );
}
