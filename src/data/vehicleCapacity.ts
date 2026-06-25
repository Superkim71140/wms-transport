export interface DimensionSpec {
  widthInternalMeters: number;
  lengthInternalMeters: number;
  heightInternalMeters: number;
  totalVolumeCbm: number;
  payloadCapacityKg: number;
  verificationStatus: 'approved_by_wms' | 'pending_field_validation' | 'verified_by_manufacturer';
  verifiedBy?: string;
  verifiedDate?: string;
  notes?: string;
}

export interface VehicleCapacityRecord {
  vehicleId: string;
  vehicleName: string;
  thaiName: string;
  dimensions: DimensionSpec;
  maxFittedItems: { itemName: string; qty: number; volumeCbm: number }[];
  limitations: string[];
}

export const vehicleCapacityData: Record<string, VehicleCapacityRecord> = {
  "standard-pickup-box-210": {
    vehicleId: "standard-pickup-box-210",
    vehicleName: "Standard Single-Cab Closed Box Pickup (2.1m)",
    thaiName: "รถกระบะตอนเดียวตู้ทึบ (ความสูงตู้ 2.1 เมตร)",
    dimensions: {
      widthInternalMeters: 1.65,
      lengthInternalMeters: 2.20,
      heightInternalMeters: 2.10,
      totalVolumeCbm: 7.62,
      payloadCapacityKg: 1800,
      verificationStatus: "approved_by_wms",
      verifiedBy: "WMS Logistical Safety Committee",
      verifiedDate: "2026-06-25",
      notes: "วัดจากขอบยางยางซีลและพื้นที่ตู้ภายในจริง หักลบมุมโค้งเหล็กค้ำตู้แล้ว"
    },
    maxFittedItems: [
      { itemName: "ที่นอน 6 ฟุต (พับหรือตั้งเอียง)", qty: 1, volumeCbm: 1.2 },
      { itemName: "ตู้เย็นขนาดใหญ่ 12 คิว (แนวตั้ง)", qty: 1, volumeCbm: 0.9 },
      { itemName: "เครื่องซักผ้าฝาหน้า", qty: 1, volumeCbm: 0.4 },
      { itemName: "โซฟา 2 ที่นั่ง", qty: 1, volumeCbm: 0.8 },
      { itemName: "กล่องกระดาษลูกฟูก Size L (50x50x50ซม.)", qty: 15, volumeCbm: 1.875 },
      { itemName: "พัดลมตั้งพื้น/เครื่องดูดฝุ่น/ของจิปาถะ", qty: 5, volumeCbm: 0.5 }
    ],
    limitations: [
      { text: "ความสูงทางเข้าอาคาร/ที่จอดรถต้องไม่ต่ำกว่า 2.15 เมตร", isApproved: true },
      { text: "น้ำหนักบรรทุกรวมห้ามเกิน 2,200 กิโลกรัม (ตามข้อกำหนดความปลอดภัยของ WMS)", isApproved: true },
      { text: "ไม่สามารถบรรทุกตู้เสื้อผ้าขนาดใหญ่กว้างเกิน 1.6 เมตรแบบชิ้นเดียวโดยไม่ถอดประกอบ", isApproved: true }
    ].map(l => l.text)
  }
};
