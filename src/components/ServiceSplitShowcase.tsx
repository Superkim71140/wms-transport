import React from "react";
import Image from "next/image";
import { Check, ArrowRight, ChevronDown } from "lucide-react";

export default function ServiceSplitShowcase() {
  const checklist = [
    "รถกระบะตู้ทึบพร้อมคนขับ",
    "บริการขนส่งมอเตอร์ไซค์",
    "ย้ายบ้านและย้ายคอนโด",
    "มีทีมคนยกของมืออาชีพ",
    "ประเมินราคาชัดเจนก่อนจอง",
  ];

  return (
    <section
      id="services"
      className="relative isolate w-full overflow-hidden py-14 sm:py-18 lg:py-24 bg-gradient-to-b from-white via-[#F3F8FF] to-white"
    >
      {/* Full-viewport Decorative Background Layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        {/* Subtle radial ambient tints */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-sky-100/35 rounded-full blur-[130px]" />

        <Image
          src="/wms-transport-route-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_60%] sm:object-[center_50%] lg:object-center opacity-30 sm:opacity-35 lg:opacity-40"
          quality={90}
          priority={false}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Connected Split-Layout Container */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-end justify-center">
          
          {/* Left Column: WMS Employee Image with depth overlap */}
          <div className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none lg:w-[45%] xl:w-[44%] shrink-0 z-20 flex justify-center lg:justify-end -mb-8 sm:-mb-12 lg:mb-0 lg:-mr-16 xl:-mr-20">
            <div className="relative w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px] xl:w-[510px] aspect-[1197/1314] select-none filter drop-shadow-[0_12px_24px_rgba(11,31,58,0.14)]">
              <Image
                src="/wms-transport-employee.png"
                alt="พนักงาน WMS TRANSPORT พร้อมกล่องสำหรับบริการขนย้าย"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 420px, 510px"
                className="object-contain object-bottom"
                quality={90}
                priority={false}
              />
            </div>
          </div>

          {/* Right Column: Deep Navy Information Panel */}
          <div className="w-full lg:w-[62%] xl:w-[63%] z-10 rounded-[28px] sm:rounded-[32px] bg-[#0B1F3A] bg-gradient-to-br from-[#0B1F3A] via-[#0D2545] to-[#102A4C] border border-blue-900/40 shadow-xl pt-7 pb-7 sm:pt-10 sm:pb-10 lg:pt-13 lg:pb-12 px-6 sm:px-10 lg:px-12 lg:pl-22 xl:pl-26 text-white relative overflow-hidden">
            {/* Subtle decorative background ring */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-blue-500/10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Main Heading */}
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-black text-white tracking-tight leading-[1.25] sm:leading-[1.2] mb-3 text-balance">
                ขนย้ายทุกงาน{" "}
                <span className="text-blue-400">มั่นใจได้ทุกเส้นทาง</span>
              </h2>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base lg:text-[1.0625rem] text-slate-300 font-normal leading-[1.65] mb-6 sm:mb-8 max-w-xl text-pretty">
                บริการรถกระบะตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านและย้ายคอนโด
                พร้อมทีมคนยกของ ประเมินราคาชัดเจนก่อนจอง
              </p>

              {/* Checklist */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-8">
                {checklist.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-slate-100"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-500/25 border border-blue-400/40 flex items-center justify-center shrink-0 text-cyan-300">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <a
                  href="https://line.me/ti/p/~@wmstransport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-md hover:shadow-blue-500/25 transition-all active:scale-[0.98] -translate-y-0 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 min-h-[48px]"
                >
                  <span>ขอประเมินราคา</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#services-grid"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[48px]"
                >
                  <span>ดูบริการทั้งหมด</span>
                  <ChevronDown className="w-4 h-4 text-blue-300" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
