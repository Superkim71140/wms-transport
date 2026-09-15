import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Phone } from "lucide-react";

export interface ServiceAreaPromoBannerProps {
  areaName?: string;
  phoneHref?: string;
  lineHref?: string;
  className?: string;
}

export default function ServiceAreaPromoBanner({
  phoneHref = "tel:0612402436",
  lineHref = "https://line.me/ti/p/DtICkMaDet",
  className = "",
}: ServiceAreaPromoBannerProps) {
  const highlights = [
    "รถกระบะตู้ทึบพร้อมคนขับ",
    "บริการย้ายบ้านและย้ายคอนโด",
    "บริการขนส่งมอเตอร์ไซค์",
    "ประเมินงานก่อนยืนยันบริการ",
  ];

  return (
    <section
      aria-label="โปรโมชั่นและบริการขนย้าย WMS TRANSPORT"
      className={`relative isolate w-full overflow-hidden rounded-3xl my-12 lg:my-16 ${className}`}
    >
      {/* Background with Ambient Glow & Route Background Texture */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl bg-slate-900">
        <Image
          src="/wms-transport-route-background.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover object-center opacity-25"
          quality={90}
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/95 via-[#0D2545]/90 to-[#102A4C]/85" />
        {/* Soft decorative glow */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-10 xl:p-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 lg:gap-6">
          
          {/* Left Column: WMS Employee Image */}
          <div className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] xl:max-w-[420px] shrink-0 flex justify-center lg:justify-start -mb-2 sm:-mb-4 lg:mb-0">
            <div className="relative w-[240px] sm:w-[300px] md:w-[340px] lg:w-[380px] aspect-[1197/1314] select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
              <Image
                src="/wms-transport-employee.png"
                alt="พนักงาน WMS TRANSPORT พร้อมกล่องสำหรับงานขนย้าย"
                fill
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 380px"
                className="object-contain object-bottom"
                quality={90}
                priority={false}
              />
            </div>
          </div>

          {/* Right Column: Dark Navy Information Panel Content */}
          <div className="w-full lg:flex-1 text-white">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
              <span>WMS TRANSPORT · บริการมาตรฐาน</span>
            </div>

            {/* Headline using h2 (strictly avoiding h1 duplication) */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug mb-3">
              ขนย้ายสะดวก <span className="text-blue-400">พร้อมดูแลทุกขั้นตอน</span>
            </h2>

            {/* Supporting text */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              บริการรถกระบะตู้ทึบสำหรับย้ายบ้าน ย้ายคอนโด ขนส่งมอเตอร์ไซค์ และขนส่งสินค้า ประเมินงานและแจ้งเงื่อนไขก่อนเริ่มบริการ
            </p>

            {/* Highlights Grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-8 max-w-xl">
              {highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-slate-100"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-500/30 border border-blue-400/50 flex items-center justify-center shrink-0 text-cyan-300">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <a
                href={lineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-base shadow-md hover:shadow-[#06C755]/20 transition-all active:scale-[0.98] -translate-y-0 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 min-h-[48px]"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain shrink-0"
                />
                <span>ขอประเมินงานทาง LINE</span>
              </a>

              {phoneHref && (
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[48px]"
                >
                  <Phone className="w-4 h-4 text-blue-300" aria-hidden="true" />
                  <span className="font-mono">061-240-2436</span>
                </a>
              )}

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-white/10 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[48px]"
              >
                <span>ดูบริการทั้งหมด</span>
                <ArrowRight className="w-4 h-4 text-blue-300" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
