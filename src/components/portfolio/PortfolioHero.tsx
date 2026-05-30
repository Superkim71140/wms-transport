"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function PortfolioHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#040b15] min-h-[90vh] flex items-center">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/wms-cover.png"
          alt="WMS Transport Fleet"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
        {/* Gradients to blend image with background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040b15] via-[#040b15]/80 to-[#040b15]/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040b15] via-[#040b15]/90 to-transparent z-10" />
        
        {/* Light effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse z-10" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px] mix-blend-screen animate-pulse z-10" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">Premium Logistics</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              ผลงานจริงของ <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">
                WMS TRANSPORT
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              รวมงานขนย้ายและขนส่งจริงจากลูกค้าทั่วไทย ไม่ว่าจะเป็นงานย้ายบ้าน คอนโด ออฟฟิศ หรือส่งมอเตอร์ไซค์ เราดูแลด้วยมาตรฐานระดับพรีเมียม
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a 
                href="https://line.me/ti/p/~@wmstransport"
                target="_blank"
                rel="noreferrer"
                className="line-btn-pulse group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white text-base border border-[#06C755]/30 transform active:scale-95 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 10.304c0-4.757-5.37-8.561-12-8.561s-12 3.804-12 8.561c0 4.22 4.266 7.748 10.029 8.442.39.084.92.258.92.657v1.815c0 .428-.23.931.817.636 1.048-.296 5.629-3.284 7.683-5.507 3.023-3.111 4.551-6.185 4.551-9.479z" />
                </svg>
                <span>💬 ขอใบเสนอราคาฟรีผ่าน LINE</span>
              </a>
              <a 
                href="#featured"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/5 transition-colors text-base backdrop-blur-md"
              >
                <span>ดูผลงานทั้งหมด</span>
              </a>
            </div>
          </motion.div>

          {/* Right Content / Glowing Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex items-center justify-center mt-10 lg:mt-0 hidden md:flex w-full"
          >
             <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
                <Image
                  src="/images/WM11.jpg"
                  alt="WMS Premium Logistics"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040b15] via-[#040b15]/40 to-transparent opacity-90" />
                
                {/* Floating elements inside card */}
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center gap-4 bg-[#040b15]/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-lg">
                     <div className="h-12 w-12 rounded-full bg-blue-600/80 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <ShieldCheck className="h-6 w-6 text-white" />
                     </div>
                     <div>
                       <p className="text-white font-bold text-lg leading-tight drop-shadow-md">บริการขนส่งระดับพรีเมียม</p>
                       <p className="text-slate-200 text-sm mt-1 drop-shadow-sm">ปลอดภัยด้วยทีมงานมืออาชีพ</p>
                     </div>
                   </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
