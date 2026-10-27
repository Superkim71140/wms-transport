"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Calculator } from "lucide-react";

export interface AreaServiceConfidenceBannerProps {
  className?: string;
  areaName?: string;
  quoteHref?: string;
  servicesHref?: string;
}

/**
 * AreaServiceConfidenceBanner
 * 
 * Shared, responsive service-confidence banner across all service area routes.
 * Features approved visual identity: WMS person with branded boxes, pale background,
 * rounded navy content panel, and live accessible HTML actions.
 * 
 * Headline: "ขนย้ายทุกงาน มั่นใจได้ทุกเส้นทาง"
 * Supporting copy: "บริการรถกระบะตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านและย้ายคอนโด พร้อมทีมยกของ ประเมินราคาชัดเจนก่อนจอง"
 * 
 * Primary CTA: "ขอประเมินราคา" -> links to on-page quote form (#quote-prep) or LINE
 * Secondary CTA: "ดูบริการทั้งหมด" -> links to /#services
 */
export default function AreaServiceConfidenceBanner({
  className = "",
  areaName,
  quoteHref = "#quote-prep",
  servicesHref = "/#services",
}: AreaServiceConfidenceBannerProps) {
  const headline = "ขนย้ายทุกงาน มั่นใจได้ทุกเส้นทาง";
  const supportingCopy =
    "บริการรถกระบะตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านและย้ายคอนโด พร้อมทีมยกของ ประเมินราคาชัดเจนก่อนจอง";

  return (
    <aside
      aria-label="แบนเนอร์ประชาสัมพันธ์บริการรถรับจ้างขนย้าย WMS TRANSPORT"
      className={`w-full rounded-2xl md:rounded-3xl overflow-hidden border border-blue-200/90 bg-white shadow-md shadow-blue-900/5 my-8 sm:my-10 ${className}`}
    >
      {/* 1. Full-fidelity Promotional Artwork (URL-safe path without spaces, responsive) */}
      <div className="w-full bg-[#0B1F3A] relative overflow-hidden">
        <Image
          src="/images/wms-transport-moving-service-banner.webp"
          alt="แบนเนอร์ประชาสัมพันธ์บริการรถรับจ้างขนย้าย WMS TRANSPORT ขนย้ายทุกงาน มั่นใจได้ทุกเส้นทาง"
          width={2172}
          height={724}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
          className="w-full h-auto block select-none object-contain"
          loading="lazy"
          priority={false}
        />
      </div>

      {/* 2. Accessible Live HTML Action & Consultation Area */}
      <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-b from-white via-slate-50/50 to-blue-50/40 border-t border-blue-100/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold mb-2.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
            <span>
              {areaName ? `พร้อมให้บริการพื้นที่ ${areaName} และเส้นทางทั่วไทย` : "รถกระบะตู้ทึบ 2.1 ม. • พร้อมคนยกของ • ประเมินราคาก่อนเริ่มงาน"}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-2 leading-snug">
            {headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {supportingCopy}
          </p>

          <p className="text-[11px] sm:text-xs text-slate-400 mt-2.5 font-normal leading-normal">
            * ภาพประกอบด้านบนเป็นภาพกราฟิกประชาสัมพันธ์ (Promotional Artwork) ของ WMS TRANSPORT การปฏิบัติงานจริงดำเนินงานด้วยฟลีตรถกระบะตู้ทึบและอุปกรณ์รัดตรึงนิรภัยมาตรฐาน
          </p>
        </div>

        {/* Real Interactive CTA Buttons (Touch target >= 48px, WCAG AA Contrast) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href={quoteHref}
            className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-sm transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Calculator className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">ขอประเมินราคา</span>
          </a>

          <Link
            href={servicesHref}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/90 text-slate-800 border border-slate-300/80 font-bold text-sm sm:text-base shadow-2xs transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span className="whitespace-nowrap">ดูบริการทั้งหมด</span>
            <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
