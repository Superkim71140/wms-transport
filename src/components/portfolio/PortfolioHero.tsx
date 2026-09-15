"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function PortfolioHero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white min-h-[75vh] md:min-h-[85vh] flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full flex flex-col items-center text-center font-sans">
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-blue-700 tracking-wide uppercase font-bold text-xs sm:text-sm bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 mb-5 inline-block">
            WMS Transport Showcase
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1F3A] leading-tight mb-4 max-w-4xl tracking-tight">
            ผลงานจริงของ <span className="text-blue-600">WMS Transport</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            รวมตัวอย่างงานขนย้ายและขนส่งจริงจากลูกค้าของเรา การันตีความปลอดภัยทุกเที่ยว
          </p>
        </motion.div>
        
        {/* Floating Image Cards */}
        <div className="relative w-full max-w-5xl mt-4 mb-8 h-[220px] sm:h-[320px] md:h-[380px] flex justify-center items-center gap-4 md:gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }
            }}
            className="relative hidden md:block w-1/3 aspect-4/5 rounded-2xl border border-slate-200/90 shadow-md overflow-hidden z-10 -rotate-4 bg-white"
          >
            <Image src="/images/WM11.webp" alt="Transport Work 1" fill sizes="33vw" className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -12, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.3 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            className="relative w-[75%] sm:w-1/2 md:w-2/5 aspect-4/5 md:aspect-square rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden z-20 bg-white"
          >
            <Image src="/images/WM15.webp" alt="Transport Work 2" fill sizes="(max-width: 768px) 75vw, 40vw" className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.4 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="relative hidden md:block w-1/3 aspect-4/5 rounded-2xl border border-slate-200/90 shadow-md overflow-hidden z-10 rotate-4 bg-white"
          >
            <Image src="/images/WMS24.webp" alt="Transport Work 3" fill sizes="33vw" className="object-cover" />
          </motion.div>

        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center relative z-40 mt-4"
        >
          <a
            href="https://line.me/ti/p/DtICkMaDet"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white font-bold rounded-xl transition-colors shadow-xs w-full sm:w-auto min-h-[44px]"
          >
            <Image
              src="/images/LINE_icon.webp"
              alt="LINE"
              width={20}
              height={20}
              className="h-5 w-5 object-contain shrink-0"
            />
            <span>ติดต่อขนส่งผ่าน LINE</span>
          </a>
          <a
            href="#gallery-list"
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold rounded-xl transition-colors shadow-xs w-full sm:w-auto min-h-[44px]"
          >
            <span>ดูผลงานทั้งหมด</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#gallery-list" className="mt-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer text-sm font-medium">
            <ChevronDown className="animate-bounce w-4 h-4"/> เลื่อนดูผลงาน
          </a>
        </motion.div>

      </div>
      
      {/* Anchor identifier for scrolling */}
      <div id="gallery-list" className="absolute bottom-0 left-0 w-full h-[1px]" />
    </section>
  );
}
