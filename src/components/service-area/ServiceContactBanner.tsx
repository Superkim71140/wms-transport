"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";

export interface ServiceContactBannerProps {
  headingFirst?: string;
  headingSecond?: string;
  heading?: string;
  supportingText?: string;
  className?: string;
  areaName?: string;
}

/**
 * ServiceContactBanner
 *
 * Shared WMS TRANSPORT Contact Banner
 * - Deep navy background (#07152F) with subtle blue border and glow
 * - Rounded 20-24px corners with subtle shadow
 * - Container-query driven layout:
 *   - Under ~900px (including article columns max-w-[780px]): Content stacked above buttons
 *   - On genuinely wide containers (>= 900px): Clean two-column layout
 * - Heading:
 *   - First phrase (white): "ต้องการรถรับจ้างขนของ?"
 *   - Second phrase (bright cyan #67E8F9, 12:1 contrast): "ปรึกษาและประเมินราคาได้เลย"
 * - Supporting text: "ส่งจุดรับ–ส่งและรายการของให้ทีมงาน WMS TRANSPORT ช่วยแนะนำรถและประเมินราคาให้เหมาะกับงานของคุณ"
 * - High-contrast action buttons:
 *   1. Green LINE button ("ประเมินราคาทาง LINE") -> siteConfig.lineUrl
 *   2. Contrasting outlined phone button ("โทร 061-240-2436") -> siteConfig.phoneHref
 * - Touch targets >= 48px, accessible keyboard focus, natural Thai text wrapping
 */
export default function ServiceContactBanner({
  headingFirst,
  headingSecond,
  heading,
  supportingText,
  className = "",
  areaName,
}: ServiceContactBannerProps) {
  const defaultFirstPhrase = "ต้องการรถรับจ้างขนของ?";
  const defaultSecondPhrase = "ปรึกษาและประเมินราคาได้เลย";
  const defaultSupporting =
    "ส่งจุดรับ–ส่งและรายการของให้ทีมงาน WMS TRANSPORT ช่วยแนะนำรถและประเมินราคาให้เหมาะกับงานของคุณ";

  const finalFirstPhrase = headingFirst || defaultFirstPhrase;
  const finalSecondPhrase = headingSecond || defaultSecondPhrase;
  const finalSupporting = supportingText || defaultSupporting;

  return (
    <aside
      aria-label="ติดต่อและขอประเมินราคารถรับจ้าง WMS TRANSPORT"
      className={`w-full rounded-2xl md:rounded-3xl bg-[#07152F] border border-blue-900/50 p-6 sm:p-8 md:p-10 text-white shadow-lg shadow-blue-950/20 my-8 sm:my-10 relative overflow-hidden wms-contact-banner-container ${className}`}
    >
      {/* Subtle background ambient glows */}
      <div
        className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 wms-contact-banner-layout">
        {/* Content Area */}
        <div className="wms-contact-banner-content text-left">
          {heading ? (
            <h2 className="text-[22px] sm:text-[25px] md:text-[28px] lg:text-[30px] font-bold leading-[1.4] mb-3 sm:mb-3.5 tracking-normal break-words text-white">
              {heading}
            </h2>
          ) : (
            <h2 className="text-[22px] sm:text-[25px] md:text-[28px] lg:text-[30px] font-bold leading-[1.4] mb-3 sm:mb-3.5 tracking-normal break-words">
              <span className="text-white block sm:inline">{finalFirstPhrase} </span>
              <span className="text-[#67E8F9] block sm:inline">{finalSecondPhrase}</span>
            </h2>
          )}

          <p className="text-[16px] sm:text-[17px] md:text-[18px] text-slate-300 font-normal leading-[1.75] tracking-normal break-words">
            {finalSupporting}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="wms-contact-banner-actions">
          {/* 1. Green LINE Button */}
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ประเมินราคาทาง LINE (เปิดหน้าต่างใหม่)"
            className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05B34F] active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152F] w-full sm:w-auto"
          >
            <Image
              src="/images/LINE_icon.webp"
              alt="LINE"
              width={20}
              height={20}
              className="w-5 h-5 object-contain shrink-0"
              priority={false}
            />
            <span className="whitespace-nowrap">ประเมินราคาทาง LINE</span>
          </a>

          {/* 2. Contrasting Outlined Phone Button */}
          <a
            href={siteConfig.phoneHref}
            aria-label={`โทร ${siteConfig.phone}`}
            className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-[0.98] text-white border border-blue-400/50 hover:border-white font-bold text-sm sm:text-base transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152F] w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-[#67E8F9] shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">โทร {siteConfig.phone}</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
