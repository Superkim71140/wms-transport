import React from "react";
import Link from "next/link";
import { Signpost } from "lucide-react";

export interface NearbyAreaCardItem {
  title?: string;
  name?: string;
  badge?: string;
  description: string;
  price?: string;
  href: string;
}

export interface ServiceAreaNearbyLinksProps {
  thaiName: string;
  nearbyAreas?: NearbyAreaCardItem[];
}

const DEFAULT_NEARBY_AREAS: NearbyAreaCardItem[] = [
  {
    title: "สมุทรสาคร (มหาชัย–พระราม 2)",
    description: "ฐานปฏิบัติการหลักและจุดสแตนด์บายรถกระบะตู้ทึบ ขนส่งสินค้าโรงงานและย้ายบ้านตลอด 24 ชั่วโมง",
    price: "เริ่มต้น 1,500 บาท",
    href: "/service/samutsakhon",
  },
  {
    title: "กรุงเทพฯ ฝั่งธนบุรี (15 เขต)",
    description: "ครอบคลุมเพชรเกษม กาญจนาภิเษก ราชพฤกษ์ ย้ายคอนโดแนว BTS/MRT และหอพักพร้อมคนยก",
    price: "เริ่มต้น 1,500 บาท",
    href: "/service/bkk-thonburi",
  },
  {
    title: "ชลบุรีและภาคตะวันออก (EEC)",
    description: "เส้นทางขนส่งสินค้าโรงงาน นิคมอุตสาหกรรม พัทยา ศรีราชา และย้ายบ้านข้ามจังหวัด",
    price: "เริ่มต้น 3,000 บาท",
    href: "/service/chonburi",
  },
];

export default function ServiceAreaNearbyLinks({
  thaiName,
  nearbyAreas = [],
}: ServiceAreaNearbyLinksProps) {
  const activeAreas =
    nearbyAreas && nearbyAreas.length > 0 ? nearbyAreas : DEFAULT_NEARBY_AREAS;

  return (
    <section
      className="w-full bg-white py-12 md:py-16 border-b border-slate-100"
      aria-label={`พื้นที่ใกล้เคียงและเส้นทางเชื่อมต่อ ${thaiName}`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-6 pb-2">
          <div>
            <span
              className="px-3 py-1.5 rounded-full font-bold text-xs mb-2 inline-flex items-center gap-1.5"
              style={{
                backgroundColor: "rgba(8, 123, 255, 0.1)",
                color: "#087BFF",
                border: "1px solid rgba(8, 123, 255, 0.2)",
              }}
            >
              <Signpost className="w-3.5 h-3.5" />
              <span>เครือข่ายเส้นทางเชื่อมโยง</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
              พื้นที่ใกล้เคียงและเส้นทางเชื่อมต่อยอดนิยม โซน{thaiName}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mb-0 leading-relaxed">
              เชื่อมต่อการขนส่งด้วยรถกระบะตู้ทึบมาตรฐานระหว่าง {thaiName} กับศูนย์กลางเศรษฐกิจและจังหวัดข้างเคียงทั่วประเทศ
            </p>
          </div>

          <div>
            <Link
              href="/areas"
              className="text-blue-600 font-bold text-xs sm:text-sm no-underline inline-flex items-center gap-1 hover:underline whitespace-nowrap"
              aria-label="ดูพื้นที่ให้บริการทั้งหมด"
            >
              <span>ดูพื้นที่ให้บริการทั้งหมด →</span>
            </Link>
          </div>
        </div>

        {/* 3 Wide Bordered Cards Per Row on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          {activeAreas.map((na, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Top Price Pill / Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                    {na.badge || na.price || "เริ่มต้น 1,500 บาท"}
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">เส้นทางยอดนิยม ➔</span>
                </div>

                {/* Area Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  {na.title || na.name}
                </h3>

                {/* Route Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {na.description}
                </p>
              </div>

              {/* Bottom Link Button */}
              <Link
                href={na.href}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors no-underline group"
              >
                <span>เช็คเส้นทาง {(na.title || na.name || "").split("(")[0].trim()}</span>
                <span className="group-hover:translate-x-1 transition-transform">➔</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
