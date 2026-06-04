"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Calculator } from "lucide-react";
import Image from "next/image";

export default function PortfolioCTA() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#040b15]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#040b15] via-[#061224] to-[#040b15] opacity-90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center font-sans">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            พร้อมให้เราดูแลงานของคุณ <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">แล้วหรือยัง?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            ติดต่อนัดหมายหรือสอบถามข้อมูลเพิ่มเติมได้ตลอด 24 ชั่วโมง เราพร้อมประเมินราคาฟรีและวางแผนการขนย้ายให้คุณอย่างดีที่สุด
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a 
              href="tel:0612402436"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#040b15] font-bold text-base hover:bg-slate-100 transition-colors shadow-xl"
            >
              <Phone className="h-5 w-5 text-blue-600" />
              <span>โทรเลย: 061-240-2436</span>
            </a>
            
            <a 
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact WMS Transport via LINE"
              className="line-btn-pulse group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl text-white font-black text-base transform active:scale-95 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Image 
                src="/images/LINE_icon.webp" 
                alt="LINE Logo" 
                width={20} 
                height={20} 
                className="h-5 w-5 object-contain shrink-0" 
              />
              <span>ติดต่อขนส่งผ่าน LINE</span>
            </a>

            <a 
              href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white font-black text-base transform active:scale-95 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_15px_rgba(24,119,242,0.3)]"
            >
              <Image 
                src="/images/Facebook_Logo_.png" 
                alt="Facebook Logo" 
                width={20} 
                height={20} 
                className="w-5 h-5 object-contain shrink-0" 
              />
              <span>สอบถามขนส่งผ่าน Facebook</span>
            </a>

            <a 
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get a free quote via LINE"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border border-[#06C755]/30 hover:border-[#06C755] text-white hover:bg-[#06C755]/10 font-bold text-base transition-all duration-300 active:scale-95"
            >
              <Calculator className="h-5 w-5 text-emerald-400" />
              <span>ประเมินราคาฟรีผ่าน LINE</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform ml-1 hidden sm:block" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

