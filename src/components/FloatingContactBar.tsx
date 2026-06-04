"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";

export default function FloatingContactBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-6 right-6 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto flex items-center gap-2 sm:gap-3 bg-[#040b15]/90 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-[100] select-none"
        >
          {/* Status Indicator & Label */}
          <div className="flex items-center gap-2 pl-3 pr-2 border-r border-white/10 py-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-white text-xs font-bold whitespace-nowrap" style={{ fontFamily: "var(--font-noto-sans-thai), sans-serif" }}>
              ติดต่อแอดมิน
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 pl-1">
            {/* LINE Button */}
            <a
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#06C755] hover:bg-[#05B34F] active:scale-95 transition-all shadow-[0_4px_10px_rgba(6,199,85,0.3)] p-2 hover:scale-105"
              aria-label="Contact LINE"
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
              href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#166FE5] active:scale-95 transition-all shadow-[0_4px_10px_rgba(24,119,242,0.3)] p-1.5 hover:scale-105"
              aria-label="Contact Facebook"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/Facebook_Logo_.png"
                  alt="Facebook Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </a>

            {/* Phone Button */}
            <a
              href="tel:0612402436"
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-[0_4px_10px_rgba(37,99,235,0.3)] hover:scale-105"
              aria-label="Call Phone"
            >
              <Phone className="w-4 h-4 text-white" fill="currentColor" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
