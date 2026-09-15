"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";

export default function FloatingLine() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-[90] left-3 right-3 bottom-3 md:left-auto md:right-6 md:bottom-6 md:w-auto md:max-w-md pb-[env(safe-area-inset-bottom)] md:pb-0 mx-auto md:mx-0 select-none transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="w-full rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-[0_10px_30px_-5px_rgba(11,31,58,0.15)] px-3.5 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Section: Status & Text */}
        <div className="flex items-center gap-2 pr-2 sm:pr-3 border-r border-slate-200 py-0.5">
          {/* Live indicator */}
          <div className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          {/* Crisp Text */}
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#0B1F3A] tracking-wide whitespace-nowrap">
              <span className="min-[380px]:hidden">ติดต่อ</span>
              <span className="hidden min-[380px]:inline">ติดต่อแอดมิน</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap self-start sm:self-auto">
              24 ชม.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Call button */}
          <a
            href="tel:0612402436"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-bold transition-all active:scale-95"
            aria-label="โทรติดต่อ WMS"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-mono hidden sm:inline">061-240-2436</span>
          </a>

          {/* LINE Button */}
          <a
            href="https://line.me/ti/p/DtICkMaDet"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via LINE"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Image 
              src="/images/LINE_icon.webp" 
              alt="LINE" 
              width={18} 
              height={18} 
              className="h-4 w-4 object-contain shrink-0" 
            />
            <span className="whitespace-nowrap">ทัก LINE</span>
          </a>
        </div>
      </div>
    </div>
  );
}
