import React from "react";
import { GeoZone } from "@/app/data/geoMatrix";
import Link from "next/link";
import { AlertCircle, Clock, MapPin, Truck, ChevronDown } from "lucide-react";

export default function LocalOperationsAtlas({ geoData }: { geoData: GeoZone }) {
  if (!geoData.demandPatterns && !geoData.accessConstraints) return null;

  return (
    <section className="my-10 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs" id="local-operations">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#07152F] mb-1 flex items-center gap-2.5">
          <MapPin className="w-6 h-6 text-blue-600 shrink-0" />
          <span>รายละเอียดการเข้ารับสินค้าในพื้นที่ {geoData.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          ข้อมูลลักษณะหน้างานจริงและการเตรียมความพร้อมก่อนการขนย้ายในเขต {geoData.name}
        </p>
      </div>

      {/* Essential Booking Caution / Visible Preview Summary (Always Visible) */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 mb-5 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 block mb-0.5">ข้อแนะนำสำคัญสำหรับการนัดหมายรถรับจ้าง {geoData.name}:</strong>
          <span>
            {geoData.accessConstraints && geoData.accessConstraints.length > 0
              ? geoData.accessConstraints[0]
              : "ตรวจสอบจุดจอดเทียบรถและคิวจองลิฟต์ล่วงหน้า เพื่อความสะดวกรวดเร็วในการขนถ่ายสิ่งของ"}
          </span>
        </div>
      </div>

      {/* Accessible Progressive Disclosure for Detailed Operational Notes */}
      <details className="group bg-slate-50/70 rounded-2xl border border-slate-200/90 transition-all duration-200 overflow-hidden open:bg-white open:border-blue-300 open:shadow-xs">
        <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none hover:bg-slate-100/60 transition-colors font-bold text-xs sm:text-sm text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
          <span>ดูรายละเอียดหน้างานและข้อกำหนดการเตรียมตัวเพิ่มเติม</span>
          <div className="w-7 h-7 rounded-full bg-white text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/80 transition-colors">
            <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" />
          </div>
        </summary>
        <div className="p-5 sm:p-6 pt-2 border-t border-slate-200/70 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-5">
              {geoData.commonPropertyTypes && geoData.commonPropertyTypes.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>ลักษณะหน้างานที่พบบ่อย</span>
                  </h3>
                  <ul className="list-disc pl-5 text-slate-700 space-y-1.5 text-xs sm:text-sm">
                    {geoData.commonPropertyTypes.map((type, i) => (
                      <li key={i}>{type}</li>
                    ))}
                  </ul>
                </div>
              )}

              {geoData.demandPatterns && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>รูปแบบความต้องการรถรับจ้าง</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">{geoData.demandPatterns}</p>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {geoData.accessConstraints && geoData.accessConstraints.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/90 p-4 rounded-xl">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>สิ่งที่ลูกค้าควรเตรียมตัว</span>
                  </h3>
                  <ul className="list-disc pl-5 text-slate-700 space-y-1.5 text-xs sm:text-sm">
                    {geoData.accessConstraints.map((constraint, i) => (
                      <li key={i}>{constraint}</li>
                    ))}
                    {geoData.commonLoadingConditions?.map((cond, i) => (
                      <li key={`load-${i}`}>{cond}</li>
                    ))}
                  </ul>
                  {geoData.localServiceNotes && (
                    <p className="mt-3 text-xs text-slate-500 italic">
                      * {geoData.localServiceNotes}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </details>

      {/* Prominent Local Proof Links (Always Visible) */}
      {geoData.localProofItems && geoData.localProofItems.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
            หลักฐานงานขนย้ายในพื้นที่
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {geoData.localProofItems.map((proof, i) => (
               <Link
                 key={i}
                 href={proof.url}
                 className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-1.5 rounded-lg transition-colors"
               >
                 {proof.label}
               </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
