export interface ReviewRecord {
  id: string;
  source: 'LINE' | 'Facebook' | 'GoogleMaps';
  consentStatus: boolean;
  broadServiceArea: string; // e.g. 'บางแค', 'ปิ่นเกล้า', 'มหาชัย', 'ภูเก็ต', 'เชียงใหม่'
  provinceSlug: string; // e.g. 'bkk-thonburi', 'samutsakhon', 'phuket', 'chiang-mai'
  serviceType: 'moving' | 'motorcycle' | 'freight' | 'helpers';
  bookingToken: string; // Real booking reference token for transaction verification
  date: string;
  displayName: string;
  reviewText: string;
  rating: number;
  moderationStatus: 'approved' | 'pending' | 'rejected';
  isVerified: boolean;
}

export const reviewEvidenceData: ReviewRecord[] = [
  {
    id: "rev-bk-01",
    source: "LINE",
    consentStatus: true,
    broadServiceArea: "บางแค",
    provinceSlug: "bkk-thonburi",
    serviceType: "moving",
    bookingToken: "WMS-TX-9982-BK",
    date: "2026-05-18",
    displayName: "คุณปิยะพล (บางแค)",
    reviewText: "ย้ายคอนโดชั้น 18 จากบางแค เพชรเกษม ไปนนทบุรี พนักงานยกของมืออาชีพมาก ช่วยแรปหุ้มฟิล์มตู้เสื้อผ้าและเตียงนอนอย่างระมัดระวัง รถตู้ทึบเข้าตึกความสูง 2.1 ม. ได้สบายตรงใจครับ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true
  },
  {
    id: "rev-pk-01",
    source: "Facebook",
    consentStatus: true,
    broadServiceArea: "ปิ่นเกล้า",
    provinceSlug: "bkk-thonburi",
    serviceType: "motorcycle",
    bookingToken: "WMS-MC-5421-PK",
    date: "2026-06-10",
    displayName: "คุณวรัญญา (ปิ่นเกล้า)",
    reviewText: "ส่งรถบิ๊กไบค์ Kawasaki Ninja ไปแถวอรุณอมรินทร์ ปิ่นเกล้า การรัดยึดล้อ Wheel Chock แน่นหนามากในตู้ทึบ ไม่มีริ้วรอยขูดขีดเลย ขนส่งรวดเร็วตรงเวลา แอดมินคุยง่ายครับ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true
  },
  {
    id: "rev-mc-01",
    source: "LINE",
    consentStatus: true,
    broadServiceArea: "มหาชัย",
    provinceSlug: "samutsakhon",
    serviceType: "freight",
    bookingToken: "WMS-FR-8871-MC",
    date: "2026-06-15",
    displayName: "คุณเกรียงไกร (มหาชัย)",
    reviewText: "เหมาตู้ทึบส่งกล่องสินค้าจากโรงงานอุตสาหกรรมในมหาชัยไปส่งต่างจังหวัด วิ่งงานปลอดภัย มีระบบติดตาม GPS ตลอดเส้นทาง ได้เอกสารบิลบัญชีครบถ้วน รวดเร็วมากครับ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true
  },
  {
    id: "rev-pk-02",
    source: "LINE",
    consentStatus: true,
    broadServiceArea: "ปิ่นเกล้า",
    provinceSlug: "bkk-thonburi",
    serviceType: "moving",
    bookingToken: "WMS-TX-3321-PK",
    date: "2026-06-20",
    displayName: "คุณจินดา (อรุณอมรินทร์)",
    reviewText: "เรียกใช้บริการย้ายหอแถวปิ่นเกล้า น้องๆ ยกของระมัดระวังมาก ของไม่ชำรุดเลย ทำงานรวดเร็วสุภาพ ประทับใจมากค่ะ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true
  },
  {
    id: "rev-cm-01",
    source: "Facebook",
    consentStatus: true,
    broadServiceArea: "เชียงใหม่",
    provinceSlug: "chiang-mai",
    serviceType: "moving",
    bookingToken: "WMS-TX-4412-CM",
    date: "2026-06-12",
    displayName: "คุณธนารีย์ (เชียงใหม่)",
    reviewText: "ย้ายบ้านจากนนทบุรีมาเชียงใหม่ ระยะทางไกลแต่ของไม่เสียหายเลย คนยกสุภาพ สรุปงานเร็ว ประทับใจมากค่ะ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true
  },
  {
    id: "rev-pk-03",
    source: "GoogleMaps",
    consentStatus: true,
    broadServiceArea: "ภูเก็ต",
    provinceSlug: "phuket",
    serviceType: "motorcycle",
    bookingToken: "WMS-MC-7729-PK",
    date: "2026-06-05",
    displayName: "คุณกิตติศักดิ์ (ภูเก็ต)",
    reviewText: "ขนส่งมอเตอร์ไซค์บิ๊กไบค์ข้ามจังหวัดจากกรุงเทพฯ ไปภูเก็ต รถตู้ทึบล็อกยางแน่นดีมาก ไม่มีส่วนใดเบียดชนตัวถัง จัดส่งปลอดภัยมาก",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true
  }
];

export const neutralReviewPrompt = "หากสะดวก รบกวนเล่าประสบการณ์จริงเกี่ยวกับประเภทงาน พื้นที่รับ-ส่ง หรือสิ่งที่ทีมงานช่วยดูแลให้ได้ครับ ความเห็นของคุณช่วยให้ลูกค้าคนถัดไปตัดสินใจได้ง่ายขึ้น";
export const feedbackSafetyGuidelines = "เรายินดีรับฟังข้อเท็จจริงและความเห็นที่ตรงไปตรงมา โดยไม่มีการบังคับคะแนนระดับ 5 ดาว หรือเงื่อนไขผูกมัดคำค้นหาเจาะจง เพื่อรักษาความซื่อสัตย์ของการประเมินสูงสุด";
