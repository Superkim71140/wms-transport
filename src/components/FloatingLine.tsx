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
      <div className="w-full rounded-2xl bg-[#040b15] md:bg-[#040b15]/90 border border-white/10 md:backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] px-3 py-2 flex items-center justify-between gap-3 sm:gap-5">
        {/* Left Section: Status & Text */}
        <div className="flex items-center gap-2 pr-2 sm:pr-4 border-r border-white/10 py-0.5">
          {/* Minimalist Live Ping */}
          <div className="relative flex h-2 w-2 items-center justify-center shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          {/* Solid, Crisp Text */}
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xs sm:text-sm font-black text-slate-100 tracking-wide whitespace-nowrap" style={{ fontFamily: "var(--font-noto-sans-thai), sans-serif" }}>
              <span className="min-[380px]:hidden">ติดต่อ</span>
              <span className="hidden min-[380px]:inline">ติดต่อแอดมิน</span>
            </span>
            <span className="text-[8px] sm:text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap self-start sm:self-auto">
              24 ชม.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* LINE Button */}
          <a
            href="https://line.me/ti/p/DtICkMaDet"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via LINE"
            className="w-11 h-11 flex items-center justify-center rounded-full line-btn-pulse border border-[#06C755]/30 cursor-pointer shadow-[0_4px_15px_rgba(6,199,85,0.3)] p-2.5 transition-all duration-300 hover:scale-110 md:active:scale-95"
          >
            <Image 
              src="/images/LINE_icon.webp" 
              alt="LINE Logo" 
              width={20} 
              height={20} 
              className="h-5 w-5 object-contain shrink-0" 
            />
          </a>

          {/* Facebook Button */}
          <a
            href="https://www.facebook.com/share/1DnN6iGodp/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via Facebook"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#166FE5] cursor-pointer shadow-[0_4px_15px_rgba(24,119,242,0.3)] p-2.5 transition-all duration-300 hover:scale-110 md:active:scale-95"
          >
            <Image 
              src="/images/Facebook_Logo_.png" 
              alt="Facebook Logo" 
              width={18} 
              height={18} 
              className="w-full h-full object-contain shrink-0" 
            />
          </a>

          {/* Phone Button */}
          <a
            href="tel:0612402436"
            aria-label="Call WMS Transport"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 cursor-pointer shadow-[0_4px_15px_rgba(37,99,235,0.3)] transition-all duration-300 hover:scale-110 md:active:scale-95"
          >
            <Phone className="w-5 h-5 text-white" fill="currentColor" />
          </a>
        </div>
      </div>
    </div>
  );
}
