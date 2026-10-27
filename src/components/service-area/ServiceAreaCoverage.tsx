import React from "react";
import Link from "next/link";
import { MapPin, Check, GitFork, ChevronDown } from "lucide-react";

export interface ChildAreaItem {
  id?: string;
  name: string;
  href: string;
  subtitle?: string;
}

export interface ServiceAreaCoverageProps {
  coverageAreas: string[];
  title?: string;
  childAreas?: ChildAreaItem[];
  childTitle?: string;
}

export default function ServiceAreaCoverage({
  coverageAreas = [],
  title = "อำเภอและเขตพื้นที่ที่ครอบคลุม",
  childAreas = [],
  childTitle = "พื้นที่ย่อยในความดูแล (ตำบล/แขวง)",
}: ServiceAreaCoverageProps) {
  return (
    <div className="mb-8 space-y-8" id="coverage-section">
      {/* 1. Prominent Published Child Areas Navigation (Always Visible) */}
      {childAreas && childAreas.length > 0 && (
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-blue-600 shrink-0" />
            <span>{childTitle}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {childAreas.map((child, idx) => (
              <Link
                key={child.id || idx}
                href={child.href}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all flex justify-between items-center no-underline group"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">
                    {child.name}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {child.subtitle || "รถกระบะตู้ทึบรับจ้างขนย้ายมาตรฐาน WMS"}
                  </div>
                </div>
                <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. Covered Administrative Areas (Progressive Disclosure - Clean 2-col List) */}
      {coverageAreas && coverageAreas.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
              <span>{title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              ครอบคลุมทุกอำเภอ ตำบลหลัก และโครงข่ายถนนเชื่อมโยง พร้อมรถกระบะตู้ทึบเข้าเทียบรับ–ส่งถึงหน้างาน
            </p>
          </div>

          <details className="group bg-slate-50/70 rounded-xl border border-slate-200/90 overflow-hidden transition-all duration-200 open:border-blue-300 open:bg-white open:shadow-xs">
            <summary className="flex items-center justify-between p-3.5 sm:p-4 cursor-pointer list-none select-none font-bold text-slate-800 text-xs sm:text-sm hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                <span>ดูรายชื่อพื้นที่ทั้งหมด</span>
                <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                  {coverageAreas.length} พื้นที่
                </span>
              </span>
              <div className="w-6 h-6 rounded-full bg-white text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 transition-colors border border-slate-200/80">
                <ChevronDown className="w-3.5 h-3.5 transform group-open:rotate-180 transition-transform duration-200" />
              </div>
            </summary>
            <div className="p-4 pt-1 sm:p-5 sm:pt-2 border-t border-slate-200/70 bg-white">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-700">
                {coverageAreas.map((cov, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 py-1 border-b border-slate-100 last:border-b-0 sm:last:border-b"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">{cov}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
