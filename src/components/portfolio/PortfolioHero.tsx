"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function PortfolioHero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden bg-[#040b15] min-h-[92vh] flex items-center justify-center">
      
      {/* CINEMATIC BACKGROUND GLOWS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute top-[40%] right-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full flex flex-col items-center text-center font-sans">
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
            WMS Transport Showcase
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            ผลงานจริงจาก <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">ทุกพื้นที่ทั่วไทย</span>
          </h1>
        </motion.div>
        
        {/* Floating Image Cards */}
        <div className="relative w-full max-w-5xl mt-12 mb-16 h-[250px] sm:h-[350px] md:h-[450px] flex justify-center items-center gap-4 md:gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: [0, -15, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }
            }}
            className="relative w-1/3 aspect-[3/4] md:aspect-[4/5] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10 -rotate-6"
          >
            <Image src="/images/WM11.webp" alt="Transport Work 1" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b15]/80 via-transparent to-transparent opacity-80" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: [0, -20, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.3 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            className="relative w-2/5 aspect-[4/5] md:aspect-square rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden z-20"
          >
            <Image src="/images/WM15.webp" alt="Transport Work 2" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b15]/80 via-transparent to-transparent opacity-80" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: [0, -15, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.4 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="relative w-1/3 aspect-[3/4] md:aspect-[4/5] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10 rotate-6"
          >
            <Image src="/images/WMS24.webp" alt="Transport Work 3" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b15]/80 via-transparent to-transparent opacity-80" />
          </motion.div>

        </div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <a href="#gallery-list" className="mt-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer text-lg font-medium">
            <ChevronDown className="animate-bounce w-6 h-6"/> เลื่อนดูผลงาน
          </a>
        </motion.div>

      </div>
      
      {/* Anchor identifier for scrolling */}
      <div id="gallery-list" className="absolute bottom-0 left-0 w-full h-[1px]" />
    </section>
  );
}
