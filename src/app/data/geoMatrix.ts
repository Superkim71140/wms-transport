export interface GeoZone {
  name: string;
  landmarks: string[];
  districts: string[];
  corridors: string[];
  images: { url: string; alt: string }[];
  wikidata?: string;
  wikipedia?: string;
  // Hyperlocal Operations Atlas fields
  demandPatterns?: string;
  commonPropertyTypes?: string[];
  accessConstraints?: string[];
  commonLoadingConditions?: string[];
  localProofItems?: { url: string; label: string }[];
  localServiceNotes?: string;
  lastReviewedDate?: string;
}

export const geoMatrix: Record<string, GeoZone> = {
  "samutsakhon": {
    name: "สมุทรสาคร",
    landmarks: ["ตลาดทะเลไทย", "นิคมอุตสาหกรรมสมุทรสาคร", "เซ็นทรัลมหาชัย", "พอร์โต้ ชิโน่ (Porto Chino)", "วัดเจษฎาราม"],
    districts: ["มหาชัย", "กระทุ่มแบน", "บ้านแพ้ว", "อ้อมน้อย", "บางปลา", "ตำบลบ้านเกาะ"],
    corridors: ["ถนนพระราม 2", "ถนนเศรษฐกิจ 1", "ถนนเพชรเกษม"],
    images: [
      { url: "/images/WM8.webp", alt: "บริการรถรับจ้างตู้ทึบขนของสมุทรสาคร ใกล้ ตลาดทะเลไทย นิคมอุตสาหกรรมสมุทรสาคร" },
      { url: "/images/WM9.webp", alt: "รถกระบะรับจ้างย้ายบ้าน คอนโด ย่าน เซ็นทรัลมหาชัย พอร์โต้ ชิโน่ (Porto Chino) วัดเจษฎาราม" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q240608",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดสมุทรสาคร",
    demandPatterns: "สูงในช่วงวันหยุดเสาร์-อาทิตย์ สำหรับย้ายหอพักพนักงานโรงงาน",
    commonPropertyTypes: ["ทาวน์โฮม", "หอพักพนักงาน", "โกดังสินค้า"],
    accessConstraints: ["ซอยแคบในย่านชุมชนมหาชัย", "ข้อจำกัดเวลาเข้าออกนิคมอุตสาหกรรม"],
    commonLoadingConditions: ["มีที่จอดรถหน้าอาคาร", "ต้องใช้รถเข็นเข้าซอยลึก"],
    localProofItems: [{ url: "/portfolio", label: "ผลงานย้ายสินค้าโรงงาน" }],
    localServiceNotes: "ควรเผื่อเวลาการเดินทางในช่วงเวลาเร่งด่วนบนถนนพระราม 2",
    lastReviewedDate: "2026-06-25"
  },
  "bkk-thonburi": {
    name: "กรุงเทพฯ ฝั่งธนบุรี",
    landmarks: ["ไอคอนสยาม (IconSiam)", "เดอะมอลล์บางแค", "ซีคอนบางแค", "ช่างชุ่ย", "มหาวิทยาลัยพระจอมเกล้าธนบุรี (บางมด)"],
    districts: ["วงเวียนใหญ่", "ปิ่นเกล้า", "บางแค", "จรัญสนิทวงศ์", "ตลาดพลู", "ท่าพระ", "หนองแขม", "เพชรเกษม"],
    corridors: ["ถนนเพชรเกษม", "ถนนบรมราชชนนี", "ถนนราชพฤกษ์", "ถนนกาญจนาภิเษก"],
    images: [
      { url: "/images/WM10.webp", alt: "บริการรถกระบะตู้ทึบย้ายหอคอนโด ฝั่งธนบุรี ใกล้ ไอคอนสยาม (IconSiam) เดอะมอลล์บางแค" },
      { url: "/images/WM11.webp", alt: "ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ ฝั่งธน วงเวียนใหญ่ ปิ่นเกล้า บางแค จรัญสนิทวงศ์" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q1056586",
    wikipedia: "https://th.wikipedia.org/wiki/ฝั่งธนบุรี",
    demandPatterns: "กระจายตัวสม่ำเสมอ เน้นย้ายคอนโดช่วงปลายเดือน",
    commonPropertyTypes: ["คอนโดมิเนียม High-rise", "บ้านเดี่ยว", "ทาวน์โฮม"],
    accessConstraints: ["นิติบุคคลคอนโดจำกัดเวลาทำงาน 09:00-17:00", "ที่จอดรถจำกัดความสูง (มักไม่เกิน 2.1ม.)"],
    commonLoadingConditions: ["ต้องใช้ลิฟต์ขนของ (Service Lift)", "ระยะเดินจากจุดจอดรถถึงลิฟต์ค่อนข้างไกล"],
    localProofItems: [{ url: "/portfolio", label: "ผลงานย้ายคอนโดย่านท่าพระ" }],
    localServiceNotes: "ลูกค้าต้องติดต่อล่วงหน้าเพื่อขอนุญาตินิติบุคคลและจองลิฟต์ขนของ",
    lastReviewedDate: "2026-06-25"
  },
  "bkk-phra-nakhon": {
    name: "กรุงเทพฯ ฝั่งพระนคร",
    landmarks: ["สนามหลวง", "ถนนข้าวสาร", "เยาวราช (Chinatown)", "สยามพารากอน", "ตึกมหานคร (King Power Mahanakov)", "สถานีกลางกรุงเทพอภิวัฒน์"],
    districts: ["สุขุมวิท", "สีลม", "สาทร", "ลาดพร้าว", "ห้วยขวาง", "พระราม 9", "จตุจักร", "ดอนเมือง", "บางนา"],
    corridors: ["ถนนพหลโยธิน", "ถนนวิภาวดีรังสิต", "ถนนรัชดาภิเษก", "ทางด่วนขั้นที่ 1 และ 2"],
    images: [
      { url: "/images/WM12.webp", alt: "บริการย้ายบ้าน ย้ายสำนักงาน ฝั่งพระนคร ย่าน สาทร สีลม สุขุมวิท ห้วยขวาง" },
      { url: "/images/WM13.webp", alt: "รถกระบะตู้ทึบรับจ้าง กรุงเทพฯ ฝั่งพระนคร ใกล้ สยามพารากอน เยาวราช (Chinatown)" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q1861",
    wikipedia: "https://th.wikipedia.org/wiki/ฝั่งพระนคร"
  },
  "bangkok": {
    name: "กรุงเทพมหานคร",
    landmarks: ["สนามหลวง", "ถนนข้าวสาร", "เยาวราช (Chinatown)", "สยามพารากอน", "ตึกมหานคร (King Power Mahanakov)", "สถานีกลางกรุงเทพอภิวัฒน์"],
    districts: ["สุขุมวิท", "สีลม", "สาทร", "ลาดพร้าว", "ห้วยขวาง", "พระราม 9", "จตุจักร", "ดอนเมือง", "บางนา"],
    corridors: ["ถนนพหลโยธิน", "ถนนวิภาวดีรังสิต", "ถนนรัชดาภิเษก", "ทางด่วนขั้นที่ 1 และ 2"],
    images: [
      { url: "/images/WM14.webp", alt: "บริการรถกระบะตู้ทึบรับจ้างทั่วไป กรุงเทพมหานคร ย้ายคอนโด หอพัก" },
      { url: "/images/WM15.webp", alt: "รถรับจ้างย้ายบ้าน กรุงเทพฯ ครอบคลุม สุขุมวิท ลาดพร้าว พระราม 9 จตุจักร" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q1861",
    wikipedia: "https://th.wikipedia.org/wiki/กรุงเทพมหานคร"
  },
  "phuket": {
    name: "ภูเก็ต",
    landmarks: ["ป่าตอง", "แหลมพรหมเทพ", "เมืองเก่าภูเก็ต", "เซ็นทรัล ภูเก็ต"],
    districts: ["เมืองภูเก็ต", "กะทู้", "ถลาง", "ป่าตอง"],
    corridors: ["ถนนเทพกระษัตรี", "ถนนเฉลิมพระเกียรติ ร.9"],
    images: [
      { url: "/images/WM16.webp", alt: "บริการขนส่งรถมอเตอร์ไซค์ บิ๊กไบค์ ไปภูเก็ต ป่าตอง เมืองเก่าภูเก็ต" },
      { url: "/images/WM17.webp", alt: "รถกระบะรับจ้างย้ายบ้านภูเก็ต บริการรถตู้ทึบขนของขึ้นล่องกรุงเทพ-ภูเก็ต" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q236166",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดภูเก็ต"
  },
  "samut-songkhram": {
    name: "สมุทรสงคราม",
    landmarks: ["อัมพวา", "ตลาดร่มหุบ", "ดอนหอยหลอด", "วัดเพชรสมุทรวรวิหาร"],
    districts: ["เมืองสมุทรสงคราม", "อัมพวา", "บางคนที"],
    corridors: ["ถนนพระราม 2", "ถนนสมุทรสงคราม-บางแพ"],
    images: [
      { url: "/images/WMS21-processedpng.webp", alt: "บริการย้ายบ้าน ย้ายหอพัก สมุทรสงคราม อัมพวา ตลาดร่มหุบ" },
      { url: "/images/WMS22-processed.webp", alt: "รถรับจ้างตู้ทึบปิดมิดชิด ขนส่งสินค้าสมุทรสงคราม-กรุงเทพฯ" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q271810",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดสมุทรสงคราม"
  },
  "chonburi": {
    name: "ชลบุรี",
    landmarks: ["พัทยา", "บางแสน", "ท่าเรือแหลมฉบัง", "เซ็นทรัล ชลบุรี"],
    districts: ["เมืองชลบุรี", "ศรีราชา", "บางละมุง", "สัตหีบ", "พานทอง"],
    corridors: ["ถนนสุขุมวิท", "ทางหลวงพิเศษหมายเลข 7 (มอเตอร์เวย์)"],
    images: [
      { url: "/images/WMS23-processed(lightpdf.com).webp", alt: "บริการรถกระบะตู้ทึบรับจ้าง ชลบุรี พัทยา บางแสน ท่าเรือแหลมฉบัง" },
      { url: "/images/WMS24.webp", alt: "รถรับจ้างขนของ ชลบุรี ย้ายบ้าน ออฟฟิศ ขนส่งสินค้าโรงงาน" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q218817",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดชลบุรี"
  },
  "chiang-mai": {
    name: "เชียงใหม่",
    landmarks: ["วัดพระธาตุดอยสุเทพ", "ประตูท่าแพ", "ไนท์บาซาร์", "เซ็นทรัล เฟสติวัล เชียงใหม่"],
    districts: ["เมืองเชียงใหม่", "หางดง", "สารภี", "แม่ริม", "สันทราย"],
    corridors: ["ถนนซุปเปอร์ไฮเวย์", "ถนนห้วยแก้ว"],
    images: [
      { url: "/images/WMS4.webp", alt: "รถกระบะรับจ้างย้ายบ้าน เชียงใหม่-กรุงเทพ ขนส่งรวดเร็ว มีประกันสินค้า" },
      { url: "/images/WMS6.webp", alt: "บริการส่งมอเตอร์ไซค์ บิ๊กไบค์ ไปเชียงใหม่ ประตูท่าแพ วัดพระธาตุดอยสุเทพ" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q220612",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดเชียงใหม่"
  },
  "nonthaburi": {
    name: "นนทบุรี",
    landmarks: ["เมืองทองธานี", "เซ็นทรัลแจ้งวัฒนะ", "เซ็นทรัลรัตนาธิเบศร์", "วัดบรมราชากาญจนาภิเษกอนุสรณ์ (วัดเล่งเน่ยยี่ 2)"],
    districts: ["ปากเกร็ด", "บางใหญ่", "บางบัวทอง", "เมืองนนทบุรี", "บางกรวย", "ไทรน้อย"],
    corridors: ["ถนนงามวงศ์วาน", "ถนนแจ้งวัฒนะ", "ถนนรัตนาธิเบศร์", "ถนนราชพฤกษ์"],
    images: [
      { url: "/images/WM8.webp", alt: "รถรับจ้างขนของ นนทบุรี ย่าน เมืองทองธานี เซ็นทรัลแจ้งวัฒนะ" },
      { url: "/images/WM10.webp", alt: "บริการย้ายบ้าน ย้ายหอพัก นนทบุรี บางใหญ่ ปากเกร็ด รวดเร็ว ปลอดภัย" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q270725",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดนนทบุรี"
  },
  "pathum-thani": {
    name: "ปทุมธานี",
    landmarks: ["รังสิต", "ฟิวเจอร์พาร์ครังสิต", "ตลาดไท", "มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต", "ดรีมเวิลด์"],
    districts: ["คลองหลวง", "ธัญบุรี", "เมืองปทุมธานี", "ลำลูกกา", "สามโคก", "ลาดหลุมแก้ว", "หนองเสือ"],
    corridors: ["ถนนพหลโยธิน", "ถนนรังสิต-นครนายก", "ถนนวิภาวดีรังสิต", "ทางด่วนอุดรรัถยา"],
    images: [
      { url: "/images/WM9.webp", alt: "รถรับจ้างตู้ทึบ ปทุมธานี รังสิต ฟิวเจอร์พาร์ค ตลาดไท" },
      { url: "/images/WM11.webp", alt: "บริการย้ายบ้าน ขนส่งมอเตอร์ไซค์ ลำลูกกา ธัญบุรี คลองหลวง ปทุมธานี" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q381987",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดปทุมธานี"
  }
};
