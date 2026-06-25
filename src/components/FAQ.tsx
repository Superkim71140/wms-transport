"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  MessageCircleQuestion, 
  HelpCircle,
  Calculator, 
  Users, 
  ShieldCheck, 
  CalendarClock, 
  Truck 
} from "lucide-react";

const faqs = [
  {
    question: "คิดค่าบริการอย่างไร? มีบวกเพิ่มหน้างานไหม?",
    answer: "เราประเมินราคาตามระยะทางจริงและประเภทของรถที่ใช้ครับ รับรองความโปร่งใส เสนอราคาไหน จ่ายราคานั้น จบปัญหาการบวกเพิ่มจุกจิกหน้างาน 100%",
    icon: Calculator,
    colorTheme: "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
  },
  {
    question: "มีพนักงานช่วยแพ็กของและยกของให้ด้วยไหม?",
    answer: "มีครับ! เรามีทีมงานมืออาชีพที่ผ่านการอบรมด้านการขนย้ายโดยเฉพาะ พร้อมให้บริการทั้งแพ็กซีลกันกระแทกและยกของจัดวางถึงที่หมายตามที่คุณต้องการ",
    icon: Users,
    colorTheme: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
  },
  {
    question: "สินค้าเกิดความเสียหายระหว่างขนส่ง มีรับประกันไหม?",
    answer: "อุ่นใจได้เลยครับ บริการของเรามาพร้อมวงเงินประกันภัยอุบัติเหตุระหว่างการขนส่งสูงสุดถึง 100,000 บาท (ตามเงื่อนไขที่ตกลง) เพื่อคุ้มครองทรัพย์สินของคุณตลอดเส้นทาง",
    icon: ShieldCheck,
    colorTheme: "bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
  },
  {
    question: "ต้องจองคิวล่วงหน้ากี่วัน? มีบริการด่วนไหม?",
    answer: "แนะนำให้จองคิวล่วงหน้า 1-3 วันเพื่อล็อกคิวรถและทีมงานครับ แต่หากคุณมีความจำเป็นเร่งด่วน เรามีบริการ 24 ชม. ที่สามารถจัดรถเข้าหน้างานได้ภายใน 1-2 ชั่วโมง (ขึ้นอยู่กับสถานะรถว่าง)",
    icon: CalendarClock,
    colorTheme: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
  },
  {
    question: "รถกระบะตู้ทึบสามารถกันฝนและกันฝุ่นได้ 100% หรือไม่?",
    answer: "แน่นอนครับ เราใช้รถกระบะตู้ทึบโครงสร้างมาตรฐาน ปิดล็อกมิดชิดหนาแน่น สามารถกันน้ำ กันฝน และฝุ่นละอองได้ 100% ปลอดภัยต่อเฟอร์นิเจอร์และเครื่องใช้ไฟฟ้าแน่นอน",
    icon: Truck,
    colorTheme: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 relative w-full z-10 font-sans section-contain">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      
      {/* Premium Ambient Glow Orbs - Desktop Only */}
      <div className="absolute top-0 left-0 md:left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10 hidden md:block" />
      <div className="absolute bottom-0 right-0 md:right-1/4 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[180px] pointer-events-none -z-10 hidden md:block" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen hidden md:block" />
      
      <div className="max-w-[880px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <MessageCircleQuestion className="w-4 h-4" />
            <span>คำถามที่พบบ่อย</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-md">
            ข้อสงสัย<span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">ในการขนย้าย?</span>
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            รวบรวมข้อสงสัยยอดนิยมเกี่ยวกับการขนส่งและขนย้าย WMS พร้อมตอบอย่างจริงใจและโปร่งใสที่สุด
          </p>
        </div>

        {/* Short info note above FAQ */}
        <div className="mb-8 flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-xs sm:text-sm text-slate-300">
          <HelpCircle className="w-5 h-5 text-blue-400 shrink-0" />
          <p>
            หากมีคำถามเพิ่มเติมหรือบริการนอกเหนือจากนี้ สามารถติดต่อแอดมินเพื่อสอบถามข้อมูลได้ตลอด 24 ชั่วโมง
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden relative ${
                  isActive
                    ? "bg-linear-to-br from-blue-900/40 via-[#040b15]/80 to-[#040b15] border-cyan-400/50 shadow-[0_20px_50px_rgba(34,211,238,0.15)]"
                    : "perf-card hover:border-white/20 hover:bg-white/5"
                }`}
              >

                {/* Accordion Trigger Button */}
                <button
                  id={`faq-title-${index}`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isActive}
                  aria-controls={`faq-content-${index}`}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left focus:outline-none group cursor-pointer gap-4"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Glassmorphic square for Lucide Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0 ${
                      isActive
                        ? faq.colorTheme
                        : "bg-white/2 border-white/10 text-slate-400 group-hover:bg-white/5 group-hover:text-slate-300 group-hover:border-white/20 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                    }`}>
                      {(() => {
                        const IconComponent = faq.icon;
                        return <IconComponent className="w-5 h-5" />;
                      })()}
                    </div>
                    <span className={`text-base sm:text-lg font-bold pr-2 transition-colors duration-300 ${
                      isActive ? "text-white drop-shadow-md" : "text-slate-200 group-hover:text-white"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Rotating Chevron Icon */}
                  <div className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                      : "border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isActive ? "rotate-180 text-cyan-400" : "text-slate-400 group-hover:text-white"}`} />
                  </div>
                </button>

                {/* Animated Answer Panel via Native CSS Grid */}
                <div 
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-title-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-7 pb-6 pl-[3.5rem] sm:pl-[4.25rem]">
                      <div className="pl-4 border-l-2 border-blue-500/60 text-slate-300 text-sm sm:text-base font-normal leading-relaxed bg-white/1 p-4 rounded-r-xl">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
