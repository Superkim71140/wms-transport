"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowDown, Sparkles } from "lucide-react";
import Image from "next/image";

export default function PortfolioHero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden bg-[#040b15] min-h-[92vh] flex items-center">
      
      {/* 1. CINEMATIC BACKGROUND GLOWS & GRID */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/wms-cover.png"
          alt="WMS Transport Fleet background"
          fill
          className="object-cover object-center opacity-[0.12] blur-[1px] pointer-events-none"
          priority
        />
        {/* Gradients to blend image with background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040b15] via-[#040b15]/90 to-[#040b15]/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040b15] via-[#040b15]/95 to-transparent z-10" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] z-10 pointer-events-none" />

        {/* Ambient light source orbs */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] mix-blend-screen animate-pulse z-10" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen animate-pulse z-10" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Premium WMS Headline & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 text-center lg:text-left space-y-6"
          >
            {/* Status Indicator Badging */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md shadow-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-blue-300 tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                แกลเลอรีผลงานขนส่งจริง
              </span>
            </div>
            
            {/* Main Title - No Banned Gradient Text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              ยืนยันความเป็นมืออาชีพ <br />
              ด้วย <span className="text-blue-400">ผลงานจริงทั่วประเทศ</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              รวบรวมภาพบันทึกการทำงานจริงหน้างานของทีมงาน WMS Transport ทั้งการขนส่งสินค้า ขนย้ายบ้าน คอนโด รถมอเตอร์ไซค์ และบิ๊กไบค์ ดูแลใกล้ชิดทุกขั้นตอน
            </p>
            
            {/* Action buttons list */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center lg:justify-start pt-2">
              <a 
                href="https://line.me/ti/p/~@wmstransport"
                target="_blank"
                rel="noreferrer"
                className="line-btn-pulse group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-2xl font-black text-white text-[15px] border border-[#06C755]/30 transform active:scale-95 hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
              >
                <Image 
                  src="/images/LINE_Brand_icon.png" 
                  alt="LINE Logo" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5 object-contain shrink-0" 
                />
                <span>ติดต่อขนส่งผ่าน LINE</span>
              </a>

              <a 
                href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#1877F2] hover:bg-[#166FE5] font-black text-white text-[15px] border border-[#1877F2]/30 transform active:scale-95 hover:-translate-y-0.5 transition-all duration-300 shadow-md"
              >
                <Image 
                  src="/images/Facebook_Logo_.png" 
                  alt="Facebook Logo" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5 object-contain shrink-0" 
                />
                <span>สอบถามผ่าน Facebook</span>
              </a>
              
              <a 
                href="#gallery-list"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-slate-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 text-sm backdrop-blur-md"
              >
                <span>ดูผลงานทั้งหมด</span>
                <ArrowDown className="w-4 h-4 text-blue-400" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Multi-layered Floating Work Showcase Collage */}
          <div className="lg:col-span-6 relative h-[480px] lg:h-[520px] w-full hidden md:block select-none mt-12 lg:mt-0">
            
            {/* Base Image Card: Main Transport Fleet */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              whileHover={{ rotate: 0, zIndex: 40, scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-[10%] left-[10%] w-[68%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 cursor-pointer z-20 group"
            >
              <Image
                src="/images/WM11.jpg"
                alt="WMS Premium Logistics Service"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded text-white font-bold uppercase">ขนส่งมอเตอร์ไซค์</span>
              </div>
            </motion.div>

            {/* Floating Image Card 1: House Moving (Offset Left Bottom) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -8, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: -8, y: 0 }}
              whileHover={{ rotate: -2, zIndex: 40, scale: 1.05 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="absolute bottom-[8%] left-[2%] w-[48%] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-white/10 cursor-pointer z-30 group"
            >
              <Image
                src="/images/WM15.jpg"
                alt="WMS House Moving"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-3 left-4">
                <span className="text-[9.5px] bg-blue-600 px-2.5 py-0.5 rounded text-white font-bold uppercase">ย้ายบ้าน / คอนโด</span>
              </div>
            </motion.div>

            {/* Floating Image Card 2: Motorcycle Handling (Offset Right Top) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 6, y: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 6, y: 0 }}
              whileHover={{ rotate: 1, zIndex: 40, scale: 1.05 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="absolute top-[5%] right-[2%] w-[50%] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.65)] border border-white/10 cursor-pointer z-10 group"
            >
              <Image
                src="/images/WMS24.png"
                alt="WMS Motorcycle Bigbike Transport"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-3 left-4">
                <span className="text-[9.5px] bg-blue-600 px-2.5 py-0.5 rounded text-white font-bold uppercase">บิ๊กไบค์ ทั่วไทย</span>
              </div>
            </motion.div>

            {/* Live Stats Floating Tag overlaying the collage */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-[20%] right-[8%] z-40 bg-[#040b15]/75 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 cursor-default hover:border-blue-400/30 transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5.5 w-5.5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-extrabold text-sm leading-tight">ดูแลระดับพรีเมียม</p>
                <p className="text-slate-300 text-xs mt-0.5">ปลอดภัย ทุกจังหวัดทั่วไทย</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
      
      {/* Anchor identifier for scrolling */}
      <div id="gallery-list" className="absolute bottom-0 left-0 w-full h-[1px]" />
    </section>
  );
}
