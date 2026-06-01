"use client";

import { useEffect, useState } from "react";
import { Phone, Headphones } from "lucide-react";
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
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#040b15]/90 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] font-sans w-[92%] sm:w-auto justify-between sm:justify-start select-none"
        >
          
          {/* Left Section: Status & Text */}
          <div className="flex items-center gap-2.5 sm:gap-3 pr-3 sm:pr-5 border-r border-white/10 py-0.5">
            {/* Minimalist Live Ping */}
            <div className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            {/* Solid, Crisp Text */}
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-black text-slate-100 tracking-wide whitespace-nowrap" style={{ fontFamily: "var(--font-noto-sans-thai), sans-serif" }}>
                ติดต่อแอดมิน
              </span>
              <span className="text-[9px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap self-start sm:self-auto">
                ONLINE 24 ชม.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 shrink-0">
            {/* LINE Button - Custom Motion Link */}
            <motion.a
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact WMS Transport via LINE"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full line-btn-pulse border border-[#06C755]/30 cursor-pointer shadow-[0_4px_15px_rgba(6,199,85,0.3)] p-2 sm:p-2.5"
            >
              <Image 
                src="/images/LINE_Brand_icon.png" 
                alt="LINE Logo" 
                width={24} 
                height={24} 
                className="w-full h-full object-contain shrink-0" 
              />
            </motion.a>

            {/* Facebook Button */}
            <motion.a
              href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ติดต่อเราผ่าน Facebook"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#166FE5] cursor-pointer transition-colors duration-300 shadow-[0_4px_15px_rgba(24,119,242,0.3)] p-2 sm:p-2.5"
            >
              <Image 
                src="/images/Facebook_Logo_.png" 
                alt="Facebook Logo" 
                width={20} 
                height={20} 
                className="w-full h-full object-contain shrink-0" 
              />
            </motion.a>

            {/* Phone Button */}
            <motion.a
              href="tel:0612402436"
              aria-label="โทรติดต่อ WMS Transport ที่เบอร์ 061-240-2436"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 cursor-pointer transition-colors duration-300 shadow-[0_4px_15px_rgba(37,99,235,0.3)]"
            >
              <Phone className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-white" fill="currentColor" />
            </motion.a>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
