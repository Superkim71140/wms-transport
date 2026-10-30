export interface MediaRecord {
  imagePath: string;
  originalFileName: string;
  ownershipPermission: 'owned_by_wms' | 'customer_consented' | 'license_approved';
  serviceType: 'moving' | 'motorcycle' | 'freight' | 'helpers';
  broadLocation: string;
  projectEvidenceId: string;
  descriptiveAltText: string;
  caption: string;
  dateOrMonth: string;
  privacyStatus: 'safe_public' | 'anonymized_public';
  relatedLinks: string[]; // routes, services, areas links
  isIndexable: boolean;
}

export interface PortfolioCase {
  slug: string;
  title: string;
  serviceType: 'moving' | 'motorcycle' | 'freight' | 'helpers';
  broadArea: string;
  jobChallenge: string;
  process: string[];
  outcome: string;
  approvedPhotos: { path: string; alt: string }[];
  relatedServiceLink: string;
  relatedDistrictLink?: string;
  relatedRouteLink?: string;
  proofScore: number;
  dateOrMonth?: string;
  contentModifiedAt?: string;
}

export const mediaEvidenceData: Record<string, MediaRecord> = {
  "WM8": {
    imagePath: "/images/WM8.webp",
    originalFileName: "WM8.webp",
    ownershipPermission: "owned_by_wms",
    serviceType: "freight",
    broadLocation: "มหาชัย สมุทรสาคร",
    projectEvidenceId: "freight-delivery-maha-chai",
    descriptiveAltText: "รถกระบะตอนเดียวตู้ทึบสีขาวของ WMS จอดในโรงงานเตรียมขนส่งกล่องกระดาษบรรจุสินค้า",
    caption: "เหมารถกระบะตู้ทึบขนของส่งสินค้าอุตสาหกรรมในพื้นที่มหาชัย",
    dateOrMonth: "มิถุนายน 2026",
    privacyStatus: "safe_public",
    relatedLinks: ["/areas/samutsakhon/maha-chai", "/service/samutsakhon/freight"],
    isIndexable: true
  },
  "WM10": {
    imagePath: "/images/WM10.webp",
    originalFileName: "WM10.webp",
    ownershipPermission: "owned_by_wms",
    serviceType: "moving",
    broadLocation: "บางแค กรุงเทพฯ",
    projectEvidenceId: "moving-condo-bang-khae",
    descriptiveAltText: "พนักงาน WMS กำลังแรปฟิล์มยืดกันรอยตู้ไม้และขนย้ายออกจากลิฟต์คอนโดบางแค",
    caption: "ทีมยกของ WMS บริการแพ็กแรปฟิล์มและเคลื่อนย้ายคอนโดเขตบางแค",
    dateOrMonth: "พฤษภาคม 2026",
    privacyStatus: "safe_public",
    relatedLinks: ["/areas/bkk-thonburi/bang-khae", "/service/bkk-thonburi/moving"],
    isIndexable: true
  },
  "WM11": {
    imagePath: "/images/WM11.webp",
    originalFileName: "WM11.webp",
    ownershipPermission: "owned_by_wms",
    serviceType: "motorcycle",
    broadLocation: "ปิ่นเกล้า กรุงเทพฯ",
    projectEvidenceId: "motorcycle-delivery-pinklao",
    descriptiveAltText: "รถจักรยานยนต์จัดตรึงแน่นด้วยสายรัด Ratchet Strap ในรถตู้ทึบ WMS ปิ่นเกล้า",
    caption: "การล็อกล้อหน้าและจัดตรึงรถมอเตอร์ไซค์ในตู้ทึบอย่างปลอดภัยส่งปิ่นเกล้า",
    dateOrMonth: "มิถุนายน 2026",
    privacyStatus: "safe_public",
    relatedLinks: ["/areas/bkk-thonburi/pinklao", "/service/bkk-thonburi/motorcycle"],
    isIndexable: true
  },
  "WM15": {
    imagePath: "/images/WM15.webp",
    originalFileName: "WM15.webp",
    ownershipPermission: "owned_by_wms",
    serviceType: "moving",
    broadLocation: "หนองแขม - บางแค กรุงเทพฯ",
    projectEvidenceId: "moving-house-nongkhaem-bang-khae",
    descriptiveAltText: "รถกระบะตอนเดียวตู้ทึบ WMS จอดเทียบหน้าบ้านพักอาศัยเพื่อขนย้ายของในแนวเขตหนองแขม–บางแค",
    caption: "บริการรถกระบะตู้ทึบย้ายบ้านพักอาศัยในแนวหนองแขม–บางแค พร้อมทีมงานช่วยยกของ",
    dateOrMonth: "กรกฎาคม 2026",
    privacyStatus: "safe_public",
    relatedLinks: ["/areas/bkk-thonburi/nong-khaem", "/areas/bkk-thonburi/bang-khae", "/service/bkk-thonburi/moving"],
    isIndexable: true
  },
  "WM16": {
    imagePath: "/images/WM16.webp",
    originalFileName: "WM16.webp",
    ownershipPermission: "owned_by_wms",
    serviceType: "moving",
    broadLocation: "บางบอน กรุงเทพฯ",
    projectEvidenceId: "moving-townhouse-bang-bon",
    descriptiveAltText: "ทีมงาน WMS ขนย้ายกล่องบรรจุภัณฑ์และเฟอร์นิเจอร์ขึ้นรถกระบะตู้ทึบในเขตบางบอน",
    caption: "งานขนย้ายของและเฟอร์นิเจอร์บ้านพักอาศัยถนนบางบอน พร้อมอุปกรณ์รัดตรึงแน่นหนา",
    dateOrMonth: "สิงหาคม 2026",
    privacyStatus: "safe_public",
    relatedLinks: ["/areas/bkk-thonburi/bang-bon", "/service/bkk-thonburi/moving"],
    isIndexable: true
  }
};

export const portfolioCasesData: Record<string, PortfolioCase> = {
  "moving-condo-bang-khae": {
    slug: "moving-condo-bang-khae",
    title: "ตัวอย่างงานขนย้ายคอนโดมิเนียมและหอพัก เขตบางแค ถนนเพชรเกษม",
    serviceType: "moving",
    broadArea: "บางแค กรุงเทพฯ (ฝั่งธนบุรี)",
    jobChallenge: "การขนย้ายสิ่งของและเฟอร์นิเจอร์ออกจากอาคารสูง มีระเบียบการใช้ลิฟต์บริการและเวลาจอดเทียบโหลดของที่จำกัด รวมทั้งการจราจรหนาแน่นช่วงวันหยุดเสาร์อาทิตย์",
    process: [
      "คัดแยกสิ่งของลงกล่อง ล็อกของแตกง่ายด้วยแอร์บับเบิลกันกระแทก",
      "แรปฟิล์มกันรอยเฟอร์นิเจอร์หลัก เช่น โซฟาผ้า โต๊ะกินข้าว ตู้ไม้ลิ้นชัก เพื่อป้องกันรอยขูดขีด",
      "ใช้รถกระบะตอนเดียวตู้ทึบขนาดมาตรฐาน ความสูงภายในตู้ 2.1 ม. ขนย้ายสิ่งของชิ้นใหญ่ได้มิดชิด พร้อมประสานงานจุดโหลดของชั้นล่างกับนิติบุคคล",
      "พนักงานยกของ 2 คนขนสินค้าทั้งหมดขึ้นลิฟต์บริการและนำใส่ตู้เสร็จสิ้นภายในเวลาที่นัดหมาย"
    ],
    outcome: "สิ่งของทั้งหมดถูกจัดส่งถึงห้องใหม่ปลายทางอย่างปลอดภัย เรียบร้อย ปิดตู้มิดชิดป้องกันฝนและฝุ่นละอองตลอดเส้นทาง",
    approvedPhotos: [
      { path: "/images/WM10.webp", alt: "งานย้ายของและแรปฟิล์มเฟอร์นิเจอร์คอนโดบางแค" }
    ],
    relatedServiceLink: "/service/bkk-thonburi/moving",
    relatedDistrictLink: "/areas/bkk-thonburi/bang-khae",
    proofScore: 90,
    dateOrMonth: "พฤษภาคม 2026",
    contentModifiedAt: "2026-10-29T08:00:00+07:00"
  },
  "motorcycle-delivery-pinklao": {
    slug: "motorcycle-delivery-pinklao",
    title: "ตัวอย่างการขนส่งรถจักรยานยนต์ในตู้ทึบ ย่านปิ่นเกล้า–ธนบุรี",
    serviceType: "motorcycle",
    broadArea: "ปิ่นเกล้า กรุงเทพฯ (ฝั่งธนบุรี)",
    jobChallenge: "การจัดส่งรถจักรยานยนต์ขนาดใหญ่ต้องระมัดระวังริ้วรอยรอบคันเป็นพิเศษ และป้องกันการเอียงล้มขณะรถออกตัวหรือเบรกกะทันหัน",
    process: [
      "ใช้ตัวล็อกล้อหน้า Wheel Chock เพื่อประคองรถให้อยู่ในแนวตั้งตรง 90 องศา",
      "แรปหุ้มชิ้นส่วนแฮนด์และโครเมียมปลายท่อไอเสียด้วยแผ่นกันกระแทก",
      "ใช้สายรัด Ratchet Strap ขนาดใหญ่รัดเข้ากับจุดยึดเหล็กหนาในตู้อลูมิเนียม 4 จุดเฉียง 45 องศา โดยไม่ให้สายรัดกดทับแฟริ่งรถ",
      "วิ่งด้วยรถตู้ปิดมิดชิด ความสูง 2.1 เมตร ป้องกันสะเก็ดหิน ลม พายุฝน และฝุ่นละอองตลอดทาง"
    ],
    outcome: "จัดส่งถึงมือลูกค้าปลายทางตามเวลาที่นัดหมาย รถคงสภาพสมบูรณ์เรียบร้อย ไม่มีรอยถลอกหรือลื่นไถลใดๆ",
    approvedPhotos: [
      { path: "/images/WM11.webp", alt: "การรัดยึดมอเตอร์ไซค์ภายในตู้ทึบอย่างปลอดภัย" }
    ],
    relatedServiceLink: "/service/bkk-thonburi/motorcycle",
    relatedDistrictLink: "/areas/bkk-thonburi/pinklao",
    proofScore: 88,
    dateOrMonth: "มิถุนายน 2026",
    contentModifiedAt: "2026-10-29T08:00:00+07:00"
  },
  "freight-delivery-maha-chai": {
    slug: "freight-delivery-maha-chai",
    title: "เคสเหมาตู้ทึบกระจายสินค้าบรรจุกล่องสำเร็จรูป จากโรงงานมหาชัยไปคลังสินค้า",
    serviceType: "freight",
    broadArea: "มหาชัย สมุทรสาคร",
    jobChallenge: "ต้องขนส่งสินค้าเชิงพาณิชย์ไปยังคลังสินค้าที่มีเวลาเข้าจำกัด และต้องการเอกสารรับส่งบิลชัดเจนสำหรับฝ่ายบัญชี",
    process: [
      "รับกล่องบรรจุภัณฑ์ขึ้นรถและจัดเรียงอย่างแน่นหนาเพื่อป้องกันการยุบเอียงล้มระหว่างเลี้ยวรถ",
      "คนขับวิ่งเส้นทางถนนพระราม 2 ชำนาญทางหลบหลีกพื้นที่ซ่อมสะพาน",
      "คนขับและทีมงานประสานงานอัปเดตสถานะการเดินทางให้ลูกค้าทราบเป็นระยะ",
      "ส่งของถึงหน้าคลังสินค้าปลายทางและให้พนักงานคลังเช็กยอดเซ็นเอกสารครบถ้วน"
    ],
    outcome: "สินค้าบรรจุกล่องถึงเป้าหมายครบถ้วน ปลอดภัย ไม่มีรอยบุบกระแทก เอกสารการรับส่งส่งคืนแผนกที่เกี่ยวข้องเรียบร้อย",
    approvedPhotos: [
      { path: "/images/WM8.webp", alt: "รถตู้ทึบ WMS ประจำที่จุดโหลดสินค้าโรงงานมหาชัย" }
    ],
    relatedServiceLink: "/service/samutsakhon/freight",
    relatedDistrictLink: "/areas/samutsakhon/maha-chai",
    proofScore: 90,
    dateOrMonth: "มิถุนายน 2026",
    contentModifiedAt: "2026-10-29T08:00:00+07:00"
  },
  "moving-house-nongkhaem-bang-khae": {
    slug: "moving-house-nongkhaem-bang-khae",
    title: "ตัวอย่างงานย้ายบ้านในแนวหนองแขม–บางแค พร้อมทีมยกของ",
    serviceType: "moving",
    broadArea: "หนองแขม - บางแค กรุงเทพฯ (ฝั่งธนบุรี)",
    jobChallenge: "การขนย้ายสิ่งของที่อยู่อาศัยในแนวเชื่อมต่อระหว่างเขตหนองแขมและบางแค ต้องจัดสรรพื้นที่วางเฟอร์นิเจอร์ชิ้นใหญ่และเครื่องใช้ไฟฟ้าให้ปลอดภัยตลอดเส้นทาง",
    process: [
      "สำรวจประเมินขนาดสัมภาระและจัดเตรียมพลาสติกแรปฟิล์มกันรอยสำหรับเตียงนอน ตู้เสื้อผ้า และตู้เย็น",
      "จัดทีมงานยกของช่วยขนย้ายสิ่งของออกจากตัวบ้านอย่างระมัดระวัง",
      "จัดเรียงสินค้าภายในตู้ทึบความสูง 2.1 เมตร พร้อมยึดตรึงด้วยสายรัด Ratchet Strap ป้องกันการเลื่อนไถล",
      "เดินทางผ่านแนวถนนเพชรเกษมและยกสิ่งของเข้าจัดวางในจุดที่ลูกค้าต้องการอย่างเรียบร้อย"
    ],
    outcome: "สิ่งของทุกชิ้นเดินทางถึงปลายทางในเขตบางแคอย่างปลอดภัย ไร้รอยขูดขีด และเสร็จสิ้นตามกรอบเวลาที่นัดหมาย",
    approvedPhotos: [
      { path: "/images/WM15.webp", alt: "งานย้ายบ้านแนวหนองแขม–บางแคโดย WMS TRANSPORT" }
    ],
    relatedServiceLink: "/service/bkk-thonburi/moving",
    relatedDistrictLink: "/areas/bkk-thonburi/nong-khaem",
    proofScore: 82,
    dateOrMonth: "กรกฎาคม 2026",
    contentModifiedAt: "2026-10-29T08:00:00+07:00"
  },
  "moving-townhouse-bang-bon": {
    slug: "moving-townhouse-bang-bon",
    title: "ตัวอย่างงานขนย้ายที่อยู่อาศัยและสินค้าในเขตบางบอน ถนนเอกชัย",
    serviceType: "moving",
    broadArea: "บางบอน กรุงเทพฯ (ฝั่งธนบุรี)",
    jobChallenge: "การขนย้ายสิ่งของในย่านที่พักอาศัยและโรงงานขนาดย่อม ต้องจัดระเบียบสินค้าและสัมภาระในตู้ทึบอย่างเป็นระบบเพื่อไม่ให้เกิดการกดทับ",
    process: [
      "จัดระเบียบสินค้าและสัมภาระ แยกระหว่างกล่องสินค้ากับเฟอร์นิเจอร์ในบ้าน",
      "แรปฟิล์มป้องกันฝุ่นและรอยขีดข่วนสำหรับเครื่องใช้ไฟฟ้าและเฟอร์นิเจอร์หลัก",
      "บรรทุกสิ่งของเข้าตู้ทึบขนาดมาตรฐาน 2.1 เมตร วางกล่องหนักไว้ด้านล่างและยึดสายรัดอย่างแน่นหนา",
      "จัดส่งถึงปลายทางและขนถ่ายเข้าสู่พื้นที่จัดเก็บตามตำแหน่งที่กำหนด"
    ],
    outcome: "การขนย้ายเสร็จสิ้นราบรื่น ปลอดภัย สินค้าและเฟอร์นิเจอร์ไม่ได้รับความเสียหาย ประหยัดเวลาของลูกค้า",
    approvedPhotos: [
      { path: "/images/WM16.webp", alt: "งานขนย้ายที่อยู่อาศัยและสินค้าในย่านบางบอนโดย WMS TRANSPORT" }
    ],
    relatedServiceLink: "/service/bkk-thonburi/moving",
    relatedDistrictLink: "/areas/bkk-thonburi/bang-bon",
    proofScore: 82,
    dateOrMonth: "สิงหาคม 2026",
    contentModifiedAt: "2026-10-29T08:00:00+07:00"
  }
};
