"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Calculator } from "lucide-react";
import Image from "next/image";

export default function PortfolioCTA() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0B1F3A]">
      <div className="max-w-4xl mx-auto relative z-10 text-center font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            พร้อมให้เราดูแลงานของคุณ <span className="text-blue-400">แล้วหรือยัง?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            ติดต่อนัดหมายหรือสอบถามข้อมูลเพิ่มเติมได้ตลอด 24 ชั่วโมง เราพร้อมประเมินราคาฟรีและวางแผนการขนย้ายให้คุณอย่างดีที่สุด
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <a 
              href="tel:0612402436"
              className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#0B1F3A] font-bold text-base hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Phone className="h-5 w-5 text-blue-600" />
              <span>โทรเลย: 061-240-2436</span>
            </a>
            
            <a 
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact WMS Transport via LINE"
              className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-base transition-colors shadow-xs"
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
              className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-base transition-colors shadow-xs"
            >
              <Image 
                src="/images/Facebook_Logo_.webp"
                alt="Facebook Logo" 
                width={20} 
                height={20} 
                className="w-5 h-5 object-contain shrink-0" 
              />
              <span>สอบถามผ่าน Facebook</span>
            </a>

            <a 
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get a free quote via LINE"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base transition-colors"
            >
              <Calculator className="h-5 w-5 text-emerald-400" />
              <span>ประเมินราคาฟรีผ่าน LINE</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform ml-1 hidden sm:block" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
