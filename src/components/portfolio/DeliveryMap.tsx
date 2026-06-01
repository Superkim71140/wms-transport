"use client";

import { motion } from "framer-motion";


export default function DeliveryMap() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#040b15] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay z-0" />
      
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center font-sans">
        <div>
          <span className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)] mb-4 inline-block">
            Nationwide Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-4 mb-6">
            พื้นที่ให้บริการครอบคลุมทั่วไทย
          </h2>
          <p className="text-slate-300 leading-relaxed mb-8 text-lg">
            ไม่ว่าจะเป็นเหนือจรดใต้ หรืออีสานสุดชายแดน เราพร้อมให้บริการขนย้ายและส่งมอบสินค้าถึงปลายทางอย่างปลอดภัย ด้วยทีมงานคุณภาพประจำจุดกระจายงานหลัก
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
              <p className="text-4xl font-black text-blue-400 mb-2 font-mono tracking-tight">77</p>
              <p className="text-sm font-semibold text-slate-300">จังหวัดทั่วไทย</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
              <p className="text-4xl font-black text-blue-400 mb-2 font-mono tracking-tight">24/7</p>
              <p className="text-sm font-semibold text-slate-300">ให้บริการตลอดเวลา</p>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-2">
             <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white border border-white/10">กรุงเทพมหานคร</span>
             <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white border border-white/10">นนทบุรี</span>
             <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white border border-white/10">ปทุมธานี</span>
             <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white border border-white/10">ชลบุรี</span>
             <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white border border-white/10">เชียงใหม่</span>
             <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white border border-white/10">ภูเก็ต</span>
             <span className="px-3 py-1.5 bg-blue-500/20 rounded-full text-xs text-blue-300 border border-blue-500/30 font-bold">และทั่วประเทศ</span>
          </div>
        </div>

        {/* Abstract Animated Map UI representation */}
        <div className="relative h-[400px] sm:h-[500px] w-full bg-[#061224]/50 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
              {/* A stylized SVG path representing routes */}
              <svg viewBox="0 0 400 400" className="w-full h-full stroke-blue-500 stroke-2 fill-none stroke-dasharray-[6,6]">
                 <path d="M 200,80 Q 250,150 200,200 T 250,320" className="animate-dash" />
                 <path d="M 100,120 Q 150,200 200,200 T 300,250" className="animate-dash" />
                 <path d="M 200,200 Q 280,220 320,150" className="animate-dash" />
              </svg>
          </div>
          
          {/* Animated Map Nodes */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-[20%] left-[50%] flex flex-col items-center"
          >
            <div className="h-4 w-4 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] border-2 border-[#040b15]" />
            <span className="text-white text-xs font-bold mt-2 bg-navy/50 px-2 py-0.5 rounded backdrop-blur-sm">เชียงใหม่</span>
          </motion.div>

          <motion.div 
            animate={{ scale: [1, 1.15, 1] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="absolute top-[50%] left-[50%] flex flex-col items-center z-10"
          >
            <div className="h-6 w-6 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.9)] flex items-center justify-center">
              <div className="h-2.5 w-2.5 bg-blue-600 rounded-full" />
            </div>
            <span className="text-white text-sm font-black mt-2 bg-navy/80 px-3 py-1 rounded backdrop-blur-sm border border-white/10">กทม. และปริมณฑล</span>
          </motion.div>

          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            className="absolute top-[80%] left-[60%] flex flex-col items-center"
          >
            <div className="h-4 w-4 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] border-2 border-[#040b15]" />
            <span className="text-white text-xs font-bold mt-2 bg-navy/50 px-2 py-0.5 rounded backdrop-blur-sm">ภูเก็ต</span>
          </motion.div>

          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
            className="absolute top-[40%] left-[75%] flex flex-col items-center"
          >
            <div className="h-4 w-4 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] border-2 border-[#040b15]" />
            <span className="text-white text-xs font-bold mt-2 bg-navy/50 px-2 py-0.5 rounded backdrop-blur-sm">ชลบุรี</span>
          </motion.div>

          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
            className="absolute top-[55%] left-[25%] flex flex-col items-center"
          >
            <div className="h-4 w-4 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] border-2 border-[#040b15]" />
            <span className="text-white text-xs font-bold mt-2 bg-navy/50 px-2 py-0.5 rounded backdrop-blur-sm">ประจวบฯ</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

