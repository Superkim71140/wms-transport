import React from "react";
import { MapPin, Truck, Calculator, ChevronDown, Check, Info } from "lucide-react";
import Link from "next/link";

export interface CompactServiceSummaryProps {
  locationName: string;
  serviceAreas: string[];
  services?: string[];
  quotationRequirements?: string[];
  conditions?: string[];
  className?: string;
}

export default function CompactServiceSummary({
  locationName,
  serviceAreas = [],
  services = [
    "ย้ายบ้านและย้ายหอพัก",
    "ย้ายคอนโดมิเนียม",
    "ขนส่งมอเตอร์ไซค์",
    "ขนส่งสินค้าทั่วไป",
  ],
  quotationRequirements = [
    "จุดรับและจุดส่งจริง",
    "รูปถ่ายหรือรายการสิ่งของ",
    "วันที่ต้องการใช้บริการ",
    "จำนวนคนช่วยยก (หากต้องการ)",
  ],
  conditions = [
    "ประเมินราคาตามระยะทางจริง ปริมาณสัมภาระ และจำนวนคนยกของ",
    "ไม่รับขนส่งสิ่งของผิดกฎหมาย สัตว์เลี้ยง หรือวัตถุอันตราย",
    "กรณีคอนโดมิเนียมหรืออาคารสูง แนะนำประสานงานจองลิฟต์และจุดจอดล่วงหน้า",
  ],
  className = "",
}: CompactServiceSummaryProps) {
  // Limit visible service areas to 5 items
  const visibleAreas = serviceAreas.slice(0, 5);
  // Limit visible services to 4 items
  const visibleServices = services.slice(0, 4);

  return (
    <section
      aria-label={`ข้อมูลบริการในพื้นที่แบบย่อ ${locationName}`}
      className={`bg-slate-50/90 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 my-10 shadow-2xs ${className}`}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3.5 border-b border-slate-200/80">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shrink-0"></span>
          <span>ข้อมูลบริการในพื้นที่แบบย่อ</span>
          {locationName && (
            <span className="text-blue-700 font-bold text-sm sm:text-base">
              · {locationName}
            </span>
          )}
        </h2>
        <span className="text-xs sm:text-sm text-slate-600 font-medium hidden sm:inline-block">
          ข้อมูลสรุปสำหรับวางแผนและประเมินงาน
        </span>
      </div>

      {/* 3 Compact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Card 1: จุดให้บริการหลัก */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-blue-200 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/70 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">จุดให้บริการหลัก</h3>
            </div>
            {visibleAreas.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {visibleAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg"
                  >
                    {area}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                ครอบคลุมเส้นทางคมนาคมหลักและพื้นที่โดยรอบ
              </p>
            )}
          </div>
          <p className="text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
            <span>บริการรถกระบะตู้ทึบเข้าถึงจุดนัดหมาย</span>
          </p>
        </div>

        {/* Card 2: งานที่รองรับ */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-emerald-200 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">งานที่รองรับ</h3>
            </div>
            <ul className="space-y-2 pt-1">
              {visibleServices.map((srv, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span>พร้อมทีมงานช่วยยกของตามที่ตกลง</span>
          </p>
        </div>

        {/* Card 3: ข้อมูลที่ใช้ประเมินราคา */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-indigo-200 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200/70 text-indigo-600 flex items-center justify-center shrink-0">
                <Calculator className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">ข้อมูลที่ใช้ประเมินราคา</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2.5 font-medium">
              ส่งจุดรับ–จุดส่ง รูปสิ่งของ และวันที่ต้องการ เพื่อให้เจ้าหน้าที่ประเมินงาน:
            </p>
            <ul className="space-y-1.5">
              {quotationRequirements.slice(0, 3).map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
            <span>แจ้งเงื่อนไขและราคาชัดเจนก่อนเริ่มงาน</span>
          </p>
        </div>

      </div>

      {/* Accessible Progressive-Disclosure for Conditions */}
      <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <details className="group">
          <summary className="font-bold text-slate-700 hover:text-blue-600 flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 transition-all select-none min-h-[40px] cursor-pointer w-fit shadow-2xs">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>ดูเงื่อนไขและข้อจำกัดการให้บริการ</span>
            <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="mt-3 p-4 bg-white border border-slate-200 rounded-xl text-slate-700 space-y-2 text-xs sm:text-sm leading-relaxed shadow-2xs">
            {conditions.map((cond, idx) => (
              <p key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                <span>{cond}</span>
              </p>
            ))}
          </div>
        </details>

        <Link
          href="/pricing"
          className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1.5 py-1.5 px-2"
        >
          <span>ดูนโยบายราคาและเงื่อนไขทั้งหมด</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
