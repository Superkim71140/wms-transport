import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";

interface PricingMobileBottomBarProps {
  serviceLabel?: string;
}

export default function PricingMobileBottomBar({
  serviceLabel = "ประเมินราคาขนส่ง",
}: PricingMobileBottomBarProps) {
  return (
    <aside
      role="region"
      aria-label="ติดต่อด่วนสำหรับมือถือ"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="max-w-md mx-auto flex items-center gap-2">
        <a
          href={siteConfig.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#06C755] active:bg-[#05B34F] text-white font-bold text-sm shadow-xs transition-transform active:scale-[0.98]"
          aria-label={`ทัก LINE ประเมินราคา ${serviceLabel}`}
        >
          <Image
            src="/images/LINE_icon.webp"
            alt="LINE"
            width={20}
            height={20}
            className="shrink-0"
          />
          <span className="truncate">ทัก LINE ประเมินราคา</span>
        </a>

        <a
          href={siteConfig.phoneHref}
          className="flex-none flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-slate-900 active:bg-slate-800 text-white font-bold text-sm shadow-xs transition-transform active:scale-[0.98]"
          aria-label={`โทรติดต่อ ${siteConfig.phone}`}
        >
          <Phone className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-mono text-sm">{siteConfig.phone}</span>
        </a>
      </div>
    </aside>
  );
}
