import React from "react";
import { MapPin, Truck, Calculator, ChevronDown, Check } from "lucide-react";
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
  // Limit visible service areas to 3-5 items
  const visibleAreas = serviceAreas.slice(0, 5);
  // Limit visible services to 2-4 items
  const visibleServices = services.slice(0, 4);

  return (
    <section
      aria-label={`ข้อมูลบริการในพื้นที่แบบย่อ ${locationName}`}
      className={`bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 sm:p-6 md:p-7 my-10 shadow-2xs ${className}`}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b border-slate-200/70">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
          <span>ข้อมูลบริการในพื้นที่แบบย่อ</span>
          {locationName && (
            <span className="text-slate-500 font-semibold text-sm sm:text-base">
              · {locationName}
            </span>
          )}
        </h2>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
          ข้อมูลสรุปสำหรับวางแผนและประเมินงาน
        </span>
      </div>

      {/* 3 Compact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: จุดให้บริการหลัก */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:border-blue-200 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/70 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">จุดให้บริการหลัก</h3>
            </div>
            {visibleAreas.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {visibleAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-md"
                  >
                    {area}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                ครอบคลุมเส้นทางคมนาคมหลักและพื้นที่โดยรอบ
              </p>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
            บริการรถกระบะตู้ทึบเข้าถึงจุดนัดหมาย
          </p>
        </div>

        {/* Card 2: งานที่รองรับ */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:border-emerald-200 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">งานที่รองรับ</h3>
            </div>
            <ul className="space-y-1.5 pt-1">
              {visibleServices.map((srv, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
            พร้อมทีมงานช่วยยกของตามที่ตกลง
          </p>
        </div>

        {/* Card 3: ข้อมูลที่ใช้ประเมินราคา */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:border-indigo-200 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200/70 text-indigo-600 flex items-center justify-center shrink-0">
                <Calculator className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">ข้อมูลที่ใช้ประเมินราคา</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2 font-medium">
              ส่งจุดรับ–จุดส่ง รูปสิ่งของ และวันที่ต้องการ เพื่อให้เจ้าหน้าที่ประเมินงาน:
            </p>
            <ul className="space-y-1">
              {quotationRequirements.slice(0, 3).map((req, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
            แจ้งเงื่อนไขและราคาชัดเจนก่อนเริ่มงาน
          </p>
        </div>

      </div>

      {/* Collapsible Service Conditions Disclosure */}
      <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <details className="group cursor-pointer">
          <summary className="font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 py-1 select-none min-h-[36px] list-none">
            <span className="underline underline-offset-2">ดูเงื่อนไขและข้อจำกัดการให้บริการ</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="mt-2 p-3 bg-white border border-slate-200/70 rounded-lg text-slate-600 space-y-1 text-xs leading-relaxed">
            {conditions.map((cond, idx) => (
              <p key={idx} className="flex items-start gap-1.5">
                <span className="text-slate-400">•</span>
                <span>{cond}</span>
              </p>
            ))}
          </div>
        </details>

        <Link
          href="/pricing"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 py-1"
        >
          <span>ดูนโยบายราคาและบริการ</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
