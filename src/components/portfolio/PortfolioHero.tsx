"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function PortfolioHero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-40 md:pb-36 overflow-hidden bg-[#040b15] min-h-[75vh] md:min-h-[92vh] flex items-center justify-center">
      
      {/* CINEMATIC BACKGROUND GLOWS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute top-[40%] right-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full flex flex-col items-center text-center font-sans">
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-xs sm:text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
            WMS Transport Showcase
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 max-w-4xl">
            ผลงานจริงของ <span className="text-blue-400">WMS Transport</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 font-semibold max-w-2xl mx-auto mb-8">
            รวมตัวอย่างงานขนย้ายและขนส่งจริงจากลูกค้าของเรา
          </p>
        </motion.div>
        
        {/* Floating Image Cards */}
        <div className="relative w-full max-w-5xl mt-6 mb-10 h-[220px] sm:h-[350px] md:h-[420px] flex justify-center items-center gap-4 md:gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }
            }}
            className="relative hidden md:block w-1/3 aspect-[3/4] md:aspect-[4/5] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10 -rotate-6"
          >
            <Image src="/images/WM11.webp" alt="Transport Work 1" fill sizes="33vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b15]/80 via-transparent to-transparent opacity-80" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -15, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.3 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            className="relative w-[70%] sm:w-1/2 md:w-2/5 aspect-[4/5] md:aspect-square rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden z-20"
          >
            <Image src="/images/WM15.webp" alt="Transport Work 2" fill sizes="(max-width: 768px) 70vw, 40vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b15]/80 via-transparent to-transparent opacity-80" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.4 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="relative hidden md:block w-1/3 aspect-[3/4] md:aspect-[4/5] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10 rotate-6"
          >
            <Image src="/images/WMS24.webp" alt="Transport Work 3" fill sizes="33vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b15]/80 via-transparent to-transparent opacity-80" />
          </motion.div>

        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center relative z-40 mt-4"
        >
          <a
            href="https://line.me/ti/p/DtICkMaDet"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white font-black rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_15px_rgba(6,199,85,0.3)] w-full sm:w-auto min-h-[44px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
              <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-15.008 3.018h-2.158c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h2.158c.287 0 .521.233.521.521v3.954h1.479c.287 0 .521.234.521.521v1.041c0 .287-.234.521-.521.521zm4.842 0h-1.042c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h1.042c.287 0 .521.233.521.521v4.996c0 .287-.234.521-.521.521zm2.355 0h-1.042c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h1.042c.287 0 .521.233.521.521v1.942l1.62-1.942c.13-.156.326-.239.531-.239h1.018c.36 0 .584.382.399.696l-1.688 2.015 1.776 2.456c.164.228-.002.548-.283.548h-.988c-.173 0-.336-.084-.438-.224l-1.306-1.851v1.597c0 .287-.234.521-.521.521z"/>
            </svg>
            <span>ติดต่อขนส่งผ่าน LINE</span>
          </a>
          <a
            href="#gallery-list"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-blue-400/40 font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto min-h-[44px]"
          >
            <span>ดูผลงานทั้งหมด</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <a href="#gallery-list" className="mt-10 flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-medium">
            <ChevronDown className="animate-bounce w-5 h-5"/> เลื่อนดูผลงาน
          </a>
        </motion.div>

      </div>
      
      {/* Anchor identifier for scrolling */}
      <div id="gallery-list" className="absolute bottom-0 left-0 w-full h-[1px]" />
    </section>
  );
}
