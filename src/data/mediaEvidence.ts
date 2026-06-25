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
    descriptiveAltText: "รถจักรยานยนต์บิ๊กไบค์ยึดแน่นด้วยสายรัด Ratchet Strap 4 จุดในรถตู้ทึบ WMS ปิ่นเกล้า",
    caption: "การล็อกล้อหน้าและจัดตรึงรถมอเตอร์ไซค์ในตู้ทึบอย่างปลอดภัยส่งปิ่นเกล้า",
    dateOrMonth: "มิถุนายน 2026",
    privacyStatus: "safe_public",
    relatedLinks: ["/areas/bkk-thonburi/pinklao", "/service/bkk-thonburi/motorcycle"],
    isIndexable: true
  }
};

export const portfolioCasesData: Record<string, PortfolioCase> = {
  "moving-condo-bang-khae": {
    slug: "moving-condo-bang-khae",
    title: "เคสขนย้ายคอนโด High-rise 1 ห้องนอน ย่านบางแค เพชรเกษม MRT หลักสอง",
    serviceType: "moving",
    broadArea: "บางแค กรุงเทพฯ (ฝั่งธนบุรี)",
    jobChallenge: "ต้องขนของออกจากห้องชั้น 18 ข้ามสะพานเข้าลิฟต์บริการคอนโดที่มีความสูงจำกัด และจราจรหนาแน่นช่วงวันหยุดเสาร์อาทิตย์",
    process: [
      "คัดแยกสิ่งของลงกล่อง ล็อกของแตกง่ายด้วยแอร์บับเบิลหนา 3 ชั้น",
      "แรปฟิล์มกันรอยเฟอร์นิเจอร์หลัก เช่น โซฟาผ้า โต๊ะกินข้าว ตู้ไม้ลิ้นชัก เพื่อป้องกันรอยขูดขีด",
      "ใช้รถกระบะตอนเดียวตู้ทึบขนาดมาตรฐาน ความสูง 2.1 ม. วิ่งจอดใต้อาคารจอดรถของคอนโดที่มีความสูงจำกัดได้พอดี",
      "พนักงานยกของ 2 คนขนสินค้าทั้งหมดขึ้นลิฟต์และนำใส่ตู้เสร็จสิ้นภายใน 1.5 ชั่วโมง"
    ],
    outcome: "สิ่งของทั้งหมดถูกจัดส่งถึงห้องใหม่ปลายทางอย่างปลอดภัย ไร้ริ้วรอยขีดข่วน ปิดตู้มิดชิดกันฝนและฝุ่น 100%",
    approvedPhotos: [
      { path: "/images/WM10.webp", alt: "งานย้ายของและแรปฟิล์มเฟอร์นิเจอร์คอนโดบางแค" }
    ],
    relatedServiceLink: "/service/bkk-thonburi/moving",
    relatedDistrictLink: "/areas/bkk-thonburi/bang-khae",
    proofScore: 92
  },
  "motorcycle-delivery-pinklao": {
    slug: "motorcycle-delivery-pinklao",
    title: "บริการจัดส่งรถบิ๊กไบค์ Kawasaki Ninja 400 จากกรุงเทพฯ ไปย่านปิ่นเกล้า",
    serviceType: "motorcycle",
    broadArea: "ปิ่นเกล้า กรุงเทพฯ (ฝั่งธนบุรี)",
    jobChallenge: "บิ๊กไบค์มีน้ำหนักมากและมีแฟริ่งแต่งรอบคันที่เปราะบาง เจ้าของรถกังวลเรื่องสีถลอกและการเอียงล้มของรถระหว่างการเบรก",
    process: [
      "ใช้ตัวล็อกล้อหน้า Wheel Chock เพื่อประคองรถให้อยู่ในแนวตั้งตรง 90 องศา",
      "แรปหุ้มชิ้นส่วนแฮนด์และโครเมียมปลายท่อไอเสียด้วยแผ่นกันกระแทก",
      "ใช้สายรัด Ratchet Strap ขนาดใหญ่รัดเข้ากับจุดยึดเหล็กหนาในตู้อลูมิเนียม 4 จุดเฉียง 45 องศา โดยไม่ให้สายรัดกดทับแฟริ่งรถ",
      "วิ่งด้วยรถตู้ปิดมิดชิด ความสูง 2.1 เมตร ป้องกันสะเก็ดหิน ลม พายุฝน และฝุ่นละอองตลอดทาง"
    ],
    outcome: "จัดส่งถึงมือลูกค้าปลายทางตามเวลาที่นัดหมาย รถคงสภาพเดิม 100% ไม่มีรอยถลอกหรือลื่นไถลใดๆ",
    approvedPhotos: [
      { path: "/images/WM11.webp", alt: "การรัดยึดบิ๊กไบค์ภายในตู้ทึบอย่างปลอดภัย" }
    ],
    relatedServiceLink: "/service/bkk-thonburi/motorcycle",
    relatedDistrictLink: "/areas/bkk-thonburi/pinklao",
    proofScore: 88
  },
  "freight-delivery-maha-chai": {
    slug: "freight-delivery-maha-chai",
    title: "เคสเหมาตู้ทึบกระจายสินค้าบรรจุกล่องสำเร็จรูป จากโรงงานมหาชัยไปคลังสินค้า",
    serviceType: "freight",
    broadArea: "มหาชัย สมุทรสาคร",
    jobChallenge: "ต้องขนส่งสินค้าเชิงพาณิชย์น้ำหนักเกือบ 1.5 ตัน มีเวลาเข้าคลังสินค้าที่จำกัด และต้องการเอกสารรับส่งใบเสร็จถูกต้องสำหรับฝ่ายบัญชี",
    process: [
      "รับกล่องบรรจุภัณฑ์ขึ้นรถและจัดเรียงอย่างแน่นหนาเพื่อป้องกันการยุบเอียงล้มระหว่างเลี้ยวรถ",
      "คนขับวิ่งเส้นทางถนนพระราม 2 ชำนาญทางหลบหลีกพื้นที่ซ่อมสะพาน",
      "อัปเดตตำแหน่งจุดวิ่งของรถผ่านระบบ GPS ให้ลูกค้าฝ่ายประสานงานทราบทุกระยะ",
      "ส่งของถึงหน้าคลังสินค้าปลายทางและให้พนักงานคลังเช็กยอดเซ็นเอกสารครบถ้วน"
    ],
    outcome: "สินค้าบรรจุกล่องถึงเป้าหมายครบถ้วน ปลอดภัย ไม่มีรอยบุบกระแทก ใบเสร็จส่งคืนแผนกบัญชีทันใจ",
    approvedPhotos: [
      { path: "/images/WM8.webp", alt: "รถตู้ทึบ WMS ประจำที่จุดโหลดสินค้าโรงงานมหาชัย" }
    ],
    relatedServiceLink: "/service/samutsakhon/freight",
    relatedDistrictLink: "/areas/samutsakhon/maha-chai",
    proofScore: 90
  }
};
