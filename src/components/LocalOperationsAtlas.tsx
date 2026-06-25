import React from "react";
import { GeoZone } from "@/app/data/geoMatrix";
import Link from "next/link";
import { AlertCircle, Clock, MapPin, Truck } from "lucide-react";

export default function LocalOperationsAtlas({ geoData }: { geoData: GeoZone }) {
  if (!geoData.demandPatterns && !geoData.accessConstraints) return null;

  return (
    <section className="my-16 bg-white/2 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="w-8 h-8 text-blue-400" />
        <h2 className="text-2xl font-black text-white">
          ข้อมูลปฏิบัติการในพื้นที่ {geoData.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {geoData.commonPropertyTypes && geoData.commonPropertyTypes.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-blue-300 mb-2 flex items-center gap-2">
                <Truck className="w-5 h-5" /> ลักษณะหน้างานที่พบบ่อย
              </h3>
              <ul className="list-disc pl-5 text-slate-300 space-y-1">
                {geoData.commonPropertyTypes.map((type, i) => (
                  <li key={i}>{type}</li>
                ))}
              </ul>
            </div>
          )}

          {geoData.demandPatterns && (
            <div>
              <h3 className="text-lg font-bold text-blue-300 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" /> รูปแบบความต้องการรถรับจ้าง
              </h3>
              <p className="text-slate-300 leading-relaxed">{geoData.demandPatterns}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {geoData.accessConstraints && geoData.accessConstraints.length > 0 && (
            <div className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-2xl">
              <h3 className="text-lg font-bold text-blue-300 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> สิ่งที่ลูกค้าควรเตรียมตัว
              </h3>
              <ul className="list-disc pl-5 text-slate-300 space-y-1">
                {geoData.accessConstraints.map((constraint, i) => (
                  <li key={i}>{constraint}</li>
                ))}
                {geoData.commonLoadingConditions?.map((cond, i) => (
                  <li key={`load-${i}`}>{cond}</li>
                ))}
              </ul>
              {geoData.localServiceNotes && (
                <p className="mt-4 text-sm text-slate-400 italic">
                  * {geoData.localServiceNotes}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {geoData.localProofItems && geoData.localProofItems.length > 0 && (
        <div className="mt-8 pt-6 border-t border-white/10">
          <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">
            หลักฐานงานขนย้ายในพื้นที่
          </h4>
          <div className="flex flex-wrap gap-3">
            {geoData.localProofItems.map((proof, i) => (
               <Link
                 key={i}
                 href={proof.url}
                 className="text-xs font-bold text-white bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 px-4 py-2 rounded-full transition-colors"
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
