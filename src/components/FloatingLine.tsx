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
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 sm:left-auto sm:right-8 sm:bottom-8 z-50 flex items-center justify-between sm:justify-start gap-4 p-2 pl-5 sm:pl-6 bg-slate-950/75 backdrop-blur-xl border border-white/10 sm:border-blue-500/20 rounded-full shadow-[0_10px_40px_rgba(2,8,23,0.5)] blue-glow-pulse font-sans sm:w-auto"
        >
          
          {/* Left Section: Status & Text */}
          <div className="flex items-center gap-3 pr-4 sm:pr-5 border-r border-white/10">
            {/* Minimalist Live Ping */}
            <div className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
              <span className="status-pulse-custom absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </div>
            {/* Solid, Crisp Text */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
              <span className="text-[12px] sm:text-sm font-black text-slate-100 tracking-wide whitespace-nowrap flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-blue-400" />
                ติดต่อแอดมิน
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap self-start sm:self-auto">
                ONLINE 24 ชม.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-2 sm:pl-3">
            {/* LINE Button - Custom Motion Link */}
            <motion.a
              href="https://line.me/ti/p/~@wmstransport"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ติดต่อเราผ่าน LINE @wmstransport"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full line-btn-pulse border border-[#06C755]/30 cursor-pointer shadow-[0_4px_15px_rgba(6,199,85,0.3)] p-2.5 sm:p-3"
            >
              <Image 
                src="/images/LINE_Brand_icon.png" 
                alt="LINE Logo" 
                width={28} 
                height={28} 
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
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#166FE5] cursor-pointer transition-colors duration-300 shadow-[0_4px_15px_rgba(24,119,242,0.3)] p-2 sm:p-2.5"
            >
              <Image 
                src="/images/Facebook_Logo_.png" 
                alt="Facebook Logo" 
                width={24} 
                height={24} 
                className="w-full h-full object-contain shrink-0" 
              />
            </motion.a>

            {/* Phone Button */}
            <motion.a
              href="tel:0612402436"
              aria-label="โทรติดต่อ WMS Transport ที่เบอร์ 061-240-2436"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 cursor-pointer transition-colors duration-300 shadow-[0_4px_15px_rgba(37,99,235,0.3)]"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" />
            </motion.a>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
