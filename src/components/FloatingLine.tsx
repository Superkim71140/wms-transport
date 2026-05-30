"use client";

import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 flex items-center p-1.5 pl-5 sm:pl-6 bg-[#061224]/85 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 font-sans"
        >
          
          {/* Left Section: Status & Text */}
          <div className="flex items-center gap-3 pr-4 sm:pr-5 border-r border-white/10">
            {/* Minimalist Live Ping */}
            <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 items-center justify-center shrink-0">
              <span className="animate-ping absolute inline-flex h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-emerald-400 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </div>
            {/* Solid, Crisp Text */}
            <span className="text-[13px] sm:text-sm font-bold text-white tracking-wide whitespace-nowrap">
              ติดต่อแอดมิน 24 ชม.
            </span>
          </div>

          {/* Right Section: Action Buttons */}
          <div className="flex items-center gap-2 pl-4 sm:pl-5">
            {/* LINE Button - CLEAN SVG ONLY */}
            <a
              href="https://line.me/ti/p/~@wmstransport"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LINE Contact"
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full line-btn-pulse border border-[#06C755]/30 transition-all duration-300 hover:scale-105 active:scale-95 transform hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-white">
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.586.39.084.92.258 1.058.592.12.301.079.772.038 1.077l-.164 1.037c-.05.312-.244 1.219 1.05 1.05 1.294-.17 6.973-4.108 9.516-7.034 1.849-2.029 2.466-4.048 2.466-6.313zm-14.86 3.652H7.284a.43.43 0 0 1-.43-.43v-4.57c0-.237.193-.43.43-.43h1.856a.43.43 0 1 1 0 .86H7.714v1.547h1.426a.43.43 0 1 1 0 .86H7.714v1.273h1.426a.43.43 0 1 1 0 .86zm4.195 0h-1.856a.43.43 0 0 1-.43-.43v-4.57c0-.237.193-.43.43-.43h1.856a.43.43 0 1 1 0 .86H11.6v1.547h1.426a.43.43 0 1 1 0 .86H11.6v1.273h1.426a.43.43 0 1 1 0 .86zm4.847 0h-1.078a.43.43 0 0 1-.43-.43V9.387c0-.237.193-.43.43-.43h1.078c.237 0 .43.193.43.43v3.707a.43.43 0 0 1-.43.43zm-2.923 0H14.15a.43.43 0 0 1-.43-.43v-4.57c0-.237.193-.43.43-.43h1.11a.43.43 0 1 1 0 .86h-.68v1.547h.68a.43.43 0 1 1 0 .86h-.68v1.273h.68a.43.43 0 1 1 0 .86z"/>
              </svg>
            </a>


            {/* Phone Button */}
            <a
              href="tel:0941310131"
              aria-label="Call WMS Transport"
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(37,99,235,0.3)]"
            >
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" />
            </a>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
