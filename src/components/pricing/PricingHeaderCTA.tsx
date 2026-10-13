import React from "react";
import Image from "next/image";
import { Phone, ShieldCheck, Clock, CheckCircle } from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";

interface PricingHeaderCTAProps {
  badgeText?: string;
  className?: string;
}

export default function PricingHeaderCTA({
  badgeText = "ประเมินราคาฟรี ไม่มีข้อผูกมัด",
  className = "",
}: PricingHeaderCTAProps) {
  return (
    <div className={`w-full max-w-3xl mx-auto my-6 ${className}`}>
      <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>{badgeText}</span>
            </div>
            <p className="text-slate-700 text-sm sm:text-base font-medium">
              ส่งรูปสิ่งของหรือแจ้งเส้นทาง เพื่อรับราคาประเมินทันที
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm sm:text-base transition-colors shadow-xs active:scale-[0.98]"
              aria-label="ติดต่อประเมินราคาผ่าน LINE"
            >
              <Image
                src="/images/LINE_icon.webp"
                alt="LINE"
                width={20}
                height={20}
                className="shrink-0"
              />
              <span>ทัก LINE ทันที</span>
            </a>

            <a
              href={siteConfig.phoneHref}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-sm sm:text-base transition-colors shadow-xs active:scale-[0.98]"
              aria-label={`โทรติดต่อ ${siteConfig.phone}`}
            >
              <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-mono">{siteConfig.phone}</span>
            </a>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1 text-xs text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ตู้ทึบปิดมิดชิด กันฝน 100%
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            เสนอราคาโปร่งใส ไม่บวกเพิ่มหน้างาน
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
            คนขับชำนาญเส้นทาง
          </span>
        </div>
      </div>
    </div>
  );
}
