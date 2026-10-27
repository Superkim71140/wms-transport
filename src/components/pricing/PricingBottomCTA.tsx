import React from "react";
import Image from "next/image";
import { Phone, ShieldCheck, Clock } from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";

interface PricingBottomCTAProps {
  title?: string;
  description?: string;
  serviceTag?: string;
}

export default function PricingBottomCTA({
  title = "รับราคาประเมินละเอียดสำหรับงานของคุณฟรี",
  description = "เพียงแจ้งพิกัดต้นทาง-ปลายทาง และรายละเอียดสิ่งของ ทีมงาน WMS ประเมินราคาจริงใจ ไม่ทิ้งงาน ไม่ชาร์จเพิ่มลึกลับหน้างาน",
  serviceTag = "จองคิวรถขนส่ง WMS",
}: PricingBottomCTAProps) {
  return (
    <section className="my-12 bg-[#0B1F3A] border border-blue-900/60 rounded-3xl p-6 sm:p-10 text-center text-white shadow-lg relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <span className="inline-block text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
          {serviceTag}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 font-medium">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5">
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-base rounded-xl transition-all shadow-md active:scale-[0.98]"
            aria-label="ประเมินราคาผ่าน LINE"
          >
            <Image
              src="/images/LINE_icon.webp"
              alt="LINE"
              width={22}
              height={22}
              className="shrink-0"
            />
            <span>ประเมินราคาด่วนผ่าน LINE</span>
          </a>

          <a
            href={siteConfig.phoneHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base rounded-xl transition-all active:scale-[0.98]"
            aria-label={`โทรติดต่อ ${siteConfig.phone}`}
          >
            <Phone className="h-4.5 w-4.5 text-blue-400 shrink-0" />
            <span className="font-mono">โทร. {siteConfig.phone}</span>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            แอดมินพร้อมตอบและประเมินงานทุกวัน
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ตู้ทึบสะอาด ปิดมิดชิด ปลอดภัยทุกเที่ยว
          </span>
        </div>
      </div>
    </section>
  );
}
