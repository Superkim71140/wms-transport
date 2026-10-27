import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PricingComparisonTable() {
  const comparisonData = [
    {
      feature: "ราคาเริ่มต้น (ประเมินตามจริง)",
      moving: "1,500 บาท",
      motorcycle: "1,000 บาท",
      freight: "1,000 บาท",
    },
    {
      feature: "ลักษณะรถและตู้บรรทุก",
      moving: "กระบะตู้ทึบสูง 2.1 ม. (7.62 ลบ.ม.)",
      motorcycle: "กระบะตู้ทึบ มีทางลาดขึ้นรถ (Ramp)",
      freight: "กระบะตู้ทึบ จุ 7.62 ลบ.ม. (เหมาคัน)",
    },
    {
      feature: "ความมิดชิดและป้องกันสภาพอากาศ",
      moving: "ตู้ทึบปิดมิดชิด กันฝน 100%",
      motorcycle: "ตู้ทึบปิดมิดชิด กันฝน/หินกระเด็น",
      freight: "ตู้ทึบปิดมิดชิด ไม่ปะปนสินค้าอื่น",
    },
    {
      feature: "อุปกรณ์นิรภัยประจำรถ",
      moving: "ฟรีแรปฟิล์มยืดของใหญ่ 1-2 ชิ้น",
      motorcycle: "แท่นล็อกล้อ Wheel Chock + สายรัด 4 จุด",
      freight: "สายรัดสินค้า + แผงกั้นท้ายตู้",
    },
    {
      feature: "การช่วยยก / โหลดสินค้า",
      moving: "คนขับช่วยจัดท้ายตู้ (สั่งคนยกเสริมได้)",
      motorcycle: "คนขับช่วยเข็นขึ้น-ลงและรัดยึด",
      freight: "โหลดหน้างาน (หรือระบุคนยกเสริมล่วงหน้า)",
    },
    {
      feature: "เกณฑ์คิดราคาหลัก",
      moving: "ปริมาตรสิ่งของ (CBM), ชั้น, ระยะทาง",
      motorcycle: "ขนาดกระบอกสูบ (cc), ระยะทาง",
      freight: "น้ำหนัก (กก.), ปริมาตร, จุดแวะส่ง",
    },
    {
      feature: "เอกสารประกอบ",
      moving: "ใบเสร็จยืนยันการรับชำระเงิน",
      motorcycle: "สำเนาเล่มทะเบียน + ใบรับส่ง",
      freight: "ใบเสร็จรับเงิน / ใบส่งสินค้าเชิงพาณิชย์",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            เปรียบเทียบความแตกต่างของ 3 บริการ
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            เลือกบริการที่ตรงกับประเภทสิ่งของของคุณ เพื่อความคุ้มค่าและความปลอดภัยสูงสุด
          </p>
        </div>
        <span className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-bold self-start sm:self-auto">
          สรุปเปรียบเทียบ
        </span>
      </div>

      <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
        <table className="w-full min-w-[620px] text-left border-collapse text-xs sm:text-sm font-medium">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-700 font-bold">
              <th className="py-3 px-3.5 rounded-l-xl w-1/4">หัวข้อบริการ</th>
              <th className="py-3 px-3.5 w-1/4 text-blue-900">
                ย้ายบ้าน / คอนโด
              </th>
              <th className="py-3 px-3.5 w-1/4 text-blue-900">
                ขนส่งมอเตอร์ไซค์
              </th>
              <th className="py-3 px-3.5 rounded-r-xl w-1/4 text-blue-900">
                เหมารถส่งสินค้า
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {comparisonData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              >
                <td className="py-3 px-3.5 font-bold text-slate-800">
                  {row.feature}
                </td>
                <td className="py-3 px-3.5 text-slate-700">
                  {row.moving}
                </td>
                <td className="py-3 px-3.5 text-slate-700">
                  {row.motorcycle}
                </td>
                <td className="py-3 px-3.5 text-slate-700">
                  {row.freight}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-slate-200">
              <td className="py-4 px-3.5 font-bold text-slate-800">
                ลิงก์ข้อมูลละเอียด
              </td>
              <td className="py-4 px-3.5">
                <Link
                  href="/pricing/moving"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>ดูราคาย้ายบ้าน</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </td>
              <td className="py-4 px-3.5">
                <Link
                  href="/pricing/motorcycle-transport"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>ดูราคาส่งมอไซค์</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </td>
              <td className="py-4 px-3.5">
                <Link
                  href="/pricing/freight"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>ดูราคาขนส่งสินค้า</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
