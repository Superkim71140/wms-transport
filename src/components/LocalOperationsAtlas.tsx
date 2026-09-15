import React from "react";
import { GeoZone } from "@/app/data/geoMatrix";
import Link from "next/link";
import { AlertCircle, Clock, MapPin, Truck } from "lucide-react";

export default function LocalOperationsAtlas({ geoData }: { geoData: GeoZone }) {
  if (!geoData.demandPatterns && !geoData.accessConstraints) return null;

  return (
    <section className="my-12 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-7 h-7 text-blue-600 shrink-0" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
          ข้อมูลปฏิบัติการในพื้นที่ {geoData.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {geoData.commonPropertyTypes && geoData.commonPropertyTypes.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] mb-2 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" /> ลักษณะหน้างานที่พบบ่อย
              </h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-1.5 text-sm sm:text-base">
                {geoData.commonPropertyTypes.map((type, i) => (
                  <li key={i}>{type}</li>
                ))}
              </ul>
            </div>
          )}

          {geoData.demandPatterns && (
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" /> รูปแบบความต้องการรถรับจ้าง
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{geoData.demandPatterns}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {geoData.accessConstraints && geoData.accessConstraints.length > 0 && (
            <div className="bg-blue-50/70 border border-blue-200 p-5 rounded-xl">
              <h3 className="text-base font-bold text-[#0B1F3A] mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" /> สิ่งที่ลูกค้าควรเตรียมตัว
              </h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-1.5 text-sm sm:text-base">
                {geoData.accessConstraints.map((constraint, i) => (
                  <li key={i}>{constraint}</li>
                ))}
                {geoData.commonLoadingConditions?.map((cond, i) => (
                  <li key={`load-${i}`}>{cond}</li>
                ))}
              </ul>
              {geoData.localServiceNotes && (
                <p className="mt-4 text-xs sm:text-sm text-slate-600 italic">
                  * {geoData.localServiceNotes}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {geoData.localProofItems && geoData.localProofItems.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-100">
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
