"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "คิดค่าบริการอย่างไร? มีบวกเพิ่มหน้างานไหม?",
    answer: "เราประเมินราคาตามระยะทางจริงและประเภทของรถที่ใช้ครับ รับรองความโปร่งใส เสนอราคาไหน จ่ายราคานั้น จบปัญหาการบวกเพิ่มจุกจิกหน้างาน 100%"
  },
  {
    question: "มีพนักงานช่วยแพ็กของและยกของให้ด้วยไหม?",
    answer: "มีครับ! เรามีทีมงานมืออาชีพที่ผ่านการอบรมด้านการขนย้ายโดยเฉพาะ พร้อมให้บริการทั้งแพ็กซีลกันกระแทกและยกของจัดวางถึงที่หมายตามที่คุณต้องการ"
  },
  {
    question: "สินค้าเกิดความเสียหายระหว่างขนส่ง มีรับประกันไหม?",
    answer: "อุ่นใจได้เลยครับ บริการของเรามาพร้อมวงเงินประกันภัยอุบัติเหตุระหว่างการขนส่งสูงสุดถึง 100,000 บาท (ตามเงื่อนไขที่ตกลง) เพื่อคุ้มครองทรัพย์สินของคุณตลอดเส้นทาง"
  },
  {
    question: "ต้องจองคิวล่วงหน้ากี่วัน? มีบริการด่วนไหม?",
    answer: "แนะนำให้จองคิวล่วงหน้า 1-3 วันเพื่อล็อกคิวรถและทีมงานครับ แต่หากคุณมีความจำเป็นเร่งด่วน เรามีบริการ 24 ชม. ที่สามารถจัดรถเข้าหน้างานได้ภายใน 1-2 ชั่วโมง (ขึ้นอยู่กับสถานะรถว่าง)"
  },
  {
    question: "รถกระบะตู้ทึบสามารถกันฝนและกันฝุ่นได้ 100% หรือไม่?",
    answer: "แน่นอนครับ เราใช้รถกระบะตู้ทึบโครงสร้างมาตรฐาน ปิดล็อกมิดชิดหนาแน่น สามารถกันน้ำ กันฝน และฝุ่นละอองได้ 100% ปลอดภัยต่อเฟอร์นิเจอร์และเครื่องใช้ไฟฟ้าแน่นอน"
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative w-full z-10 font-sans">
      
      {/* Premium Ambient Glow Orbs */}
      <div className="absolute top-0 left-0 md:left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 md:right-1/4 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      
      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <MessageCircleQuestion className="w-4 h-4" />
            <span>Any Questions?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-md">
            คำถามที่พบบ่อย (FAQ)
          </h2>
          <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            รวบรวมข้อสงสัยเกี่ยวกับการขนย้าย เรามีคำตอบที่ชัดเจนและโปร่งใสให้กับคุณ
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-xl ${
                  isActive
                    ? "bg-white/[0.04] border-blue-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.3)] shadow-blue-500/5"
                    : "bg-white/[0.02] border-white/10 hover:border-blue-400/30 hover:bg-white/[0.03]"
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none group"
                >
                  <span className={`text-lg sm:text-xl font-bold pr-6 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-slate-300 group-hover:text-blue-200"
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Rotating Circular Plus/X Button */}
                  <div className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive ? "border-blue-500/50 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "border-white/20 bg-white/5 group-hover:bg-white/10 group-hover:border-blue-400/50"
                  }`}>
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: "backInOut" }}
                    >
                      <Plus className={`w-5 h-5 transition-colors ${isActive ? "text-blue-400" : "text-slate-400 group-hover:text-blue-300"}`} />
                    </motion.div>
                  </div>
                </button>

                {/* Animated Answer Panel */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-8 pb-8">
                        {/* Premium Left Accent Border */}
                        <div className="pl-5 border-l-4 border-blue-500/60 text-slate-300 text-base font-medium leading-relaxed bg-white/5 p-4 rounded-r-xl">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
