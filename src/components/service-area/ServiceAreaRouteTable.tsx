import React from "react";
import { Table, MapPin, Clock, Info } from "lucide-react";

export interface RouteRateItem {
  route: string;
  distanceOrScope: string;
  transitTime: string;
  price: string;
}

export interface ServiceAreaRouteTableProps {
  thaiName: string;
  rates?: RouteRateItem[];
  customTitle?: string;
  customDescription?: string;
}

export default function ServiceAreaRouteTable({
  thaiName,
  rates = [],
  customTitle,
  customDescription,
}: ServiceAreaRouteTableProps) {
  // Default representative rates for WMS if none provided
  const displayRates: RouteRateItem[] =
    rates && rates.length > 0
      ? rates
      : [
          {
            route: `ในเขต ${thaiName} และรัศมีใกล้เคียง`,
            distanceOrScope: "ย้ายหอพัก คอนโด สินค้าทั่วไป และส่งมอเตอร์ไซค์",
            transitTime: "30 - 60 นาที",
            price: "เริ่มต้น 1,500 บาท",
          },
          {
            route: `${thaiName} ➔ กรุงเทพฯ และปริมณฑล`,
            distanceOrScope: "ขนย้ายบ้าน ทาวน์โฮม สินค้าโรงงาน และบิ๊กไบค์",
            transitTime: "1 - 3 ชั่วโมง",
            price: "เริ่มต้น 1,800 บาท",
          },
          {
            route: `${thaiName} ➔ ภาคกลาง / ภาคตะวันออก (ชลบุรี, ระยอง)`,
            distanceOrScope: "ขนส่งเหมาเที่ยว สินค้าโรงงาน และย้ายที่อยู่อาศัย",
            transitTime: "2 - 4 ชั่วโมง",
            price: "เริ่มต้น 3,000 บาท",
          },
          {
            route: `${thaiName} ➔ ต่างจังหวัดระยะไกล (เหนือ, อีสาน, ใต้)`,
            distanceOrScope: "เหมารถกระบะตู้ทึบวิ่งตรง ไม่รวมของ ส่งมอบ Door-to-Door",
            transitTime: "6 - 18 ชั่วโมง",
            price: "เริ่มต้นตามระยะทางจริง",
          },
        ];

  return (
    <div className="mb-8">
      <div className="mb-3">
        <span
          className="px-3 py-1 rounded-full font-bold text-xs mb-2 inline-flex items-center gap-1.5"
          style={{
            backgroundColor: "rgba(8, 123, 255, 0.1)",
            color: "#087BFF",
            border: "1px solid rgba(8, 123, 255, 0.2)",
          }}
        >
          <Table className="w-3.5 h-3.5 text-blue-600" />
          <span>ตารางอัตราค่าบริการและระยะเวลาจัดส่ง</span>
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 leading-snug">
          {(() => {
            const raw = customTitle || `ตารางประเมินราคาเบื้องต้นและระยะเวลาจัดส่ง รถกระบะตู้ทึบโซน${thaiName}`;
            if (!thaiName || !raw.includes(thaiName)) {
              return raw;
            }
            const parts = raw.split(thaiName);
            return (
              <>
                {parts[0]}
                <span className="text-blue-600 font-black">{thaiName}</span>
                {parts.slice(1).join(thaiName)}
              </>
            );
          })()}
        </h3>
        <p className="text-slate-500 text-sm mb-0">
          {customDescription || "ข้อมูลเส้นทางยอดนิยม เวลาเดินทางเฉลี่ย (ETA) และราคาเริ่มต้นสำหรับรถกระบะตู้ทึบเหมาคัน"}
        </p>
      </div>

      {/* Route Pricing Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs mb-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm mb-0">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th scope="col" className="py-3.5 px-4 font-bold whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>เส้นทางขนส่ง</span>
                  </span>
                </th>
                <th scope="col" className="py-3.5 px-4 font-bold whitespace-nowrap">
                  ลักษณะงาน / ขอบเขตพื้นที่
                </th>
                <th scope="col" className="py-3.5 px-4 font-bold text-center whitespace-nowrap">
                  ระยะเวลาจัดส่ง (ETA)
                </th>
                <th scope="col" className="py-3.5 px-4 font-bold text-right whitespace-nowrap">
                  ราคาเริ่มต้น (รถกระบะตู้ทึบ)
                </th>
              </tr>
            </thead>
            <tbody>
              {displayRates.map((item, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-150 ${
                    idx % 2 === 1 ? "bg-slate-50/60" : "bg-white"
                  } border-b border-slate-100 last:border-b-0`}
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                      <span>{item.route}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs sm:text-sm">
                    {item.distanceOrScope}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      <span>{item.transitTime}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      <span>{item.price}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clarification & Vehicle Clearance Note Box */}
      <div
        className="p-3.5 rounded-xl border"
        style={{ backgroundColor: "#F8FAFC", borderColor: "#E2E8F0" }}
      >
        <p className="text-xs sm:text-sm text-slate-600 mb-0 leading-relaxed">
          <span className="inline-flex items-center gap-1.5 font-bold text-slate-900">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>หมายเหตุความสูงและจุดจอด:</span>
          </span>{" "}
          ความสูง 2.10 เมตรคือความสูงภายในตู้บรรทุกสินค้าเพื่อความจุสูงสุด ส่วนความสูงรวมตัวรถภายนอกจากพื้นถนนถึงหลังคาตู้ทึบอยู่ที่ประมาณ 2.80 - 3.00 เมตร จึงไม่สามารถเข้าลานจอดรถใต้อาคารที่มีคานจำกัดความสูงต่ำกว่า 2.80 เมตรได้ สำหรับคอนโดมิเนียมและหอพัก จะเข้าเทียบจุดรับ-ส่งสินค้าภายนอกอาคารหรือหน้าโถงล็อบบี้/Loading Bay ชั้นล่าง
        </p>
      </div>
    </div>
  );
}
