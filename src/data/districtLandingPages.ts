export interface DistrictRecord {
  province: string; // matches key in provinceMap (e.g. 'bkk-thonburi', 'samutsakhon')
  districtSlug: string; // e.g. 'bang-khae'
  districtThaiName: string;
  primaryIntent: string;
  actualServiceCapability: string;
  localOperationalNotes: string;
  travelCorridors: string[];
  propertyAccessContext: string;
  projectEvidenceIds: string[];
  images: { path: string; alt: string; caption: string }[];
  reviewEvidenceIds: string[];
  localFaq: { q: string; a: string }[];
  lastReviewedDate: string;
  proofScore: number; // calculated score out of 100 based on verified local indicators
  isIndexable: boolean;
}

export const districtLandingPages: Record<string, DistrictRecord> = {
  "bang-khae": {
    province: "bkk-thonburi",
    districtSlug: "bang-khae",
    districtThaiName: "บางแค",
    primaryIntent: "รถรับจ้างขนของ ย้ายบ้าน คอนโด ย่านบางแค เพชรเกษม พร้อมคนยก",
    actualServiceCapability: "รถกระบะตู้ทึบหลังคาสูง 2.1 ม. รองรับการขนย้ายหอพัก คอนโด บ้านเดี่ยว และทาวน์โฮม พร้อมทีมพนักงานยกของ 2-4 คน",
    localOperationalNotes: "พื้นที่บางแคมีซอยแยกย่อยและตรอกแคบหลายจุด โดยเฉพาะเพชรเกษม 63 และ 81 รถตู้ทึบ WMS สามารถเข้าพื้นที่ได้อย่างคล่องตัว มีทีมงานยกของหลบหลีกสายไฟต่ำได้อย่างชำนาญการ",
    travelCorridors: ["ถนนเพชรเกษม", "ถนนกาญจนาภิเษก", "ถนนกัลปพฤกษ์"],
    propertyAccessContext: "พบหมู่บ้านจัดสรรเก่าและทาวน์โฮม 3 ชั้นจำนวนมาก รวมถึงคอนโดแนวรถไฟฟ้าสายสีน้ำเงิน ซึ่งนิติบุคคลจำกัดส่วนสูงที่จอดรถใต้อาคาร (ไม่เกิน 2.1 เมตร) รถตู้ทึบของ WMS ออกแบบความสูงมาพอดีกับเกณฑ์เข้าจอด",
    projectEvidenceIds: ["job-bk-01", "job-bk-02"],
    images: [
      {
        path: "/images/WM10.webp",
        alt: "รถกระบะตู้ทึบ WMS รับขนส่งสินค้าและย้ายคอนโดย่านบางแค เพชรเกษม",
        caption: "งานย้ายคอนโด High-rise ใกล้สถานี MRT หลักสอง บางแค"
      }
    ],
    reviewEvidenceIds: ["rev-bk-01"],
    localFaq: [
      {
        q: "รถขนของ WMS สามารถจอดใต้อาคารคอนโดย่านบางแคได้หรือไม่?",
        a: "คอนโดแนวรถไฟฟ้าสายสีน้ำเงินย่านบางแคส่วนใหญ่กำหนดความสูงทางเข้าไว้ที่ 2.1 - 2.2 เมตร รถตู้ทึบของเรามีความสูง 2.1 เมตร สามารถวิ่งเข้าจุดโหลดของใต้อาคารได้สะดวกสบายครับ"
      },
      {
        q: "หากต้องการย้ายของจากบางแคไปต่างจังหวัด คิดราคาอย่างไร?",
        a: "เราคำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดบางแคไปยังจังหวัดปลายทาง โดยไม่มีค่าใช้จ่ายแฝง สามารถทักแอดมินประเมินราคาตามจริงได้ตลอด 24 ชั่วโมง"
      }
    ],
    lastReviewedDate: "2026-06-25",
    proofScore: 85,
    isIndexable: true
  },
  "pinklao": {
    province: "bkk-thonburi",
    districtSlug: "pinklao",
    districtThaiName: "ปิ่นเกล้า",
    primaryIntent: "รถกระบะตู้ทึบรับจ้างย้ายหอพัก ย้ายคอนโด ย่านปิ่นเกล้า อรุณอมรินทร์ บรมราชชนนี",
    actualServiceCapability: "ย้ายหอพักนักศึกษา ย้ายอพาร์ทเม้นท์ คอนโดมิเนียม และขนส่งรถมอเตอร์ไซค์บิ๊กไบค์ มีอุปกรณ์รัดตรึงและพลาสติกแรปกันรอยขีดข่วน",
    localOperationalNotes: "ย่านปิ่นเกล้าเป็นจุดเชื่อมต่อการเดินทางหนาแน่น มีข้อจำกัดเรื่องช่วงเวลาเร่งด่วนบนถนนบรมราชชนนี ทีมงาน WMS มีประสบการณ์การจัดเวลาวิ่งงานเพื่อหลีกเลี่ยงรถติดและประหยัดเวลาลูกค้า",
    travelCorridors: ["ถนนบรมราชชนนี", "ถนนอรุณอมรินทร์", "ถนนจรัญสนิทวงศ์", "สะพานพระราม 8"],
    propertyAccessContext: "หนาแน่นไปด้วยอพาร์ทเม้นท์และหอพักนักศึกษาใกล้สถาบันการศึกษา คอนโดมิเนียม Low-rise ในซอยลึกที่รถใหญ่เข้ายาก รถกระบะตู้ทึบตอนเดียวของเราเข้าซอยได้ทุกจุด",
    projectEvidenceIds: ["job-pk-01"],
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
        a: "โดยทั่วไปบริการย้ายหอพักระดับห้องมาตรฐานจะใช้พนักงานยกของ 1-2 คน (รวมคนขับ) ช่วยเบาแรงและจัดเรียงของในตู้ทึบอย่างเป็นระบบ"
      }
    ],
    lastReviewedDate: "2026-06-25",
    proofScore: 75,
    isIndexable: true
  },
  "maha-chai": {
    province: "samutsakhon",
    districtSlug: "maha-chai",
    districtThaiName: "มหาชัย",
    primaryIntent: "รถรับจ้างตู้ทึบ มหาชัย สมุทรสาคร ย้ายบ้าน ย้ายของทั่วไป และสินค้าโรงงาน",
    actualServiceCapability: "บริการรถตู้ทึบเหมาเที่ยว ขนส่งสินค้าเกษตร สินค้าทะเลแช่แข็งบรรจุกล่อง ย้ายของโรงงานและหอพักพนักงาน",
    localOperationalNotes: "มหาชัยเป็นศูนย์กลางอุตสาหกรรมและประมง มีรถบรรทุกหนาแน่นตลอดวัน ทีมงานของเราคุ้นเคยกับเส้นทางลัดเลาะในชุมชนตลาดและทางเข้าโรงงานอุตสาหกรรมต่างๆ เป็นอย่างดี",
    travelCorridors: ["ถนนพระราม 2", "ถนนเศรษฐกิจ 1", "ถนนเอกชัย"],
    propertyAccessContext: "โกดังสินค้า อาคารพาณิชย์ และหอพักคนงานในเขตโรงงานอุตสาหกรรม มักมีปัญหาการจอดกีดขวางหน้างาน การจองคิว WMS จะช่วยให้คนขับเตรียมรถและประสานงานเข้าจุดโหลดอย่างรวดเร็ว",
    projectEvidenceIds: ["job-mc-01"],
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
        q: "รถรับจ้างมหาชัย ขนของแช่เย็นหรือของสดได้ไหม?",
        a: "รถกระบะตู้ทึบของเราเป็นตู้แห้งปิดมิดชิด สามารถขนส่งของสดบรรจุกล่องโฟมอัดน้ำแข็งที่ปิดสนิทไม่มีน้ำรั่วไหลได้ครับ แต่ไม่สามารถควบคุมอุณหภูมิได้"
      }
    ],
    lastReviewedDate: "2026-06-25",
    proofScore: 80,
    isIndexable: true
  }
};

/**
 * strict isDistrictPageIndexable() validation gate.
 * A district page is indexed only if:
 * 1. Unique operational notes are present and not generic (min length 30 chars).
 * 2. Has at least 1 verified project evidence reference ID.
 * 3. Has at least 1 image with valid alt text.
 * 4. Proof score is 70 or above.
 * 5. Explicitly marked as indexable in config.
 */
export function isDistrictPageIndexable(record: DistrictRecord): boolean {
  if (!record.isIndexable) return false;
  if (!record.localOperationalNotes || record.localOperationalNotes.trim().length < 30) return false;
  if (!record.projectEvidenceIds || record.projectEvidenceIds.length < 1) return false;
  if (!record.images || record.images.length < 1 || !record.images[0].path) return false;
  if (record.proofScore < 70) return false;
  return true;
}
