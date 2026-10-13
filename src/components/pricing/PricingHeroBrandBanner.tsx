import React from "react";
import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";

interface PricingHeroBrandBannerProps {
  customSubtitle?: string;
  checklistItems?: string[];
  className?: string;
}

export default function PricingHeroBrandBanner({
  customSubtitle,
  checklistItems,
  className = "",
}: PricingHeroBrandBannerProps) {
  const defaultChecklist = [
    "รถกระบะตู้ทึบปิดมิดชิดพร้อมคนขับ",
    "บริการขนส่งมอเตอร์ไซค์ทั่วไทย",
    "บริการย้ายบ้าน ย้ายคอนโด หอพัก",
    "มีทีมงานช่วยยกของมืออาชีพ (แจ้งล่วงหน้า)",
    "ประเมินราคาโปร่งใสก่อนเริ่มงาน",
  ];

  const items = checklistItems || defaultChecklist;
  const subtitle =
    customSubtitle ||
    "บริการรถกระบะตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านและย้ายคอนโด พร้อมทีมคนยกของ ประเมินราคาชัดเจนก่อนจอง";

  return (
    <section
      aria-label="จุดเด่นบริการ WMS TRANSPORT"
      className={`relative isolate w-full overflow-hidden rounded-3xl my-6 sm:my-8 bg-gradient-to-b from-white via-[#F3F8FF] to-white border border-blue-100 shadow-sm ${className}`}
    >
      {/* Blue Route Background Layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl" />

        <Image
          src="/wms-transport-route-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30 sm:opacity-35"
          quality={90}
          priority={false}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Connected Split-Layout: Desktop side-by-side, Mobile stacked without cropping */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-6 lg:gap-0">
          
          {/* Employee Image Container */}
          <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-none lg:w-[42%] shrink-0 z-20 flex justify-center lg:justify-end lg:-mr-12 xl:-mr-16">
            <div className="relative w-full aspect-[1197/1314] select-none filter drop-shadow-[0_12px_24px_rgba(11,31,58,0.18)]">
              <Image
                src="/wms-transport-employee.png"
                alt="ภาพประกอบทีมงาน WMS TRANSPORT และกล่องบรรจุสิ่งของสำหรับงานขนย้าย"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 460px"
                className="object-contain object-bottom"
                quality={90}
                priority={false}
              />
            </div>
          </div>

          {/* Navy Information Panel */}
          <div className="w-full lg:w-[62%] xl:w-[64%] z-10 rounded-2xl sm:rounded-3xl bg-[#0B1F3A] bg-gradient-to-br from-[#0B1F3A] via-[#0D2545] to-[#102A4C] border border-blue-900/50 shadow-xl p-6 sm:p-8 lg:p-10 lg:pl-16 xl:pl-20 text-white relative overflow-hidden">
            <div
              className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border border-blue-400/10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug sm:leading-tight mb-3">
                ขนย้ายทุกงาน <span className="text-sky-400">มั่นใจได้ทุกเส้นทาง</span>
              </h2>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-6 max-w-xl">
                {subtitle}
              </p>

              {/* Checklist Points */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-slate-100"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-500/25 border border-blue-400/40 flex items-center justify-center shrink-0 text-sky-300">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Contact Actions (LINE & Phone) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-[0.98]"
                  aria-label="ติดต่อประเมินราคาผ่าน LINE"
                >
                  <Image
                    src="/images/LINE_icon.webp"
                    alt="LINE"
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  <span>ประเมินราคาผ่าน LINE</span>
                </a>

                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm sm:text-base transition-all active:scale-[0.98]"
                  aria-label={`โทรติดต่อ ${siteConfig.phone}`}
                >
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-mono">โทร. {siteConfig.phone}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
