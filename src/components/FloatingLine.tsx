"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function FloatingLine() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-[#040b15]/95 backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] font-sans w-[calc(100%-2rem)] max-w-sm sm:w-auto justify-between sm:justify-start select-none"
        >
          
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
            {/* LINE Button - Custom Motion Link */}
            <motion.a
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via LINE"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 flex items-center justify-center rounded-full line-btn-pulse border border-[#06C755]/30 cursor-pointer shadow-[0_4px_15px_rgba(6,199,85,0.3)] p-2.5"
            >
              <Image 
                src="/images/LINE_Brand_icon.png" 
                alt="LINE Logo" 
                width={20} 
                height={20} 
                className="w-full h-full object-contain shrink-0" 
              />
            </motion.a>

            {/* Facebook Button */}
            <motion.a
              href="https://www.facebook.com/share/1DnN6iGodp/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via Facebook"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#166FE5] cursor-pointer transition-colors duration-300 shadow-[0_4px_15px_rgba(24,119,242,0.3)] p-2.5"
            >
              <Image 
                src="/images/Facebook_Logo_.png" 
                alt="Facebook Logo" 
                width={18} 
                height={18} 
                className="w-full h-full object-contain shrink-0" 
              />
            </motion.a>

            {/* Phone Button */}
            <motion.a
              href="tel:0612402436"
              aria-label="Call WMS Transport"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 cursor-pointer transition-colors duration-300 shadow-[0_4px_15px_rgba(37,99,235,0.3)]"
            >
              <Phone className="w-5 h-5 text-white" fill="currentColor" />
            </motion.a>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
