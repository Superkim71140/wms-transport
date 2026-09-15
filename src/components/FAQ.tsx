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
    answer: "เราประเมินราคาตามระยะทางจริงและประเภทของรถที่ใช้ครับ รับรองความโปร่งใส เสนอราคาไหน จ่ายราคานั้น ไม่มีค่าใช้จ่ายแอบแฝง แจ้งราคาชัดเจนก่อนเริ่มงาน",
    icon: Calculator,
    colorTheme: "bg-amber-50 border-amber-200 text-amber-700"
  },
  {
    question: "มีพนักงานช่วยแพ็กของและยกของให้ด้วยไหม?",
    answer: "มีครับ! เรามีทีมงานมืออาชีพที่ผ่านการอบรมด้านการขนย้ายโดยเฉพาะ พร้อมให้บริการทั้งแพ็กซีลกันกระแทกและยกของจัดวางถึงที่หมายตามที่คุณต้องการ",
    icon: Users,
    colorTheme: "bg-emerald-50 border-emerald-200 text-emerald-700"
  },
  {
    question: "การดูแลความปลอดภัยของสิ่งของระหว่างขนย้ายเป็นอย่างไร?",
    answer: "อุ่นใจได้เลยครับ ทีมงานมีมาตรการดูแลและป้องกันความเสียหายตลอดเส้นทาง พร้อมอุปกรณ์รัดยึดและวัสดุหุ้มกันกระแทกมาตรฐาน",
    icon: ShieldCheck,
    colorTheme: "bg-rose-50 border-rose-200 text-rose-700"
  },
  {
    question: "ต้องจองคิวล่วงหน้ากี่วัน? มีบริการด่วนไหม?",
    answer: "แนะนำให้จองคิวล่วงหน้า 1-3 วันเพื่อล็อกคิวรถและทีมงานครับ แต่หากคุณมีความจำเป็นเร่งด่วน เรามีบริการ 24 ชม. ที่สามารถจัดรถเข้าหน้างานได้ภายใน 1-2 ชั่วโมง (ขึ้นอยู่กับสถานะรถว่าง)",
    icon: CalendarClock,
    colorTheme: "bg-blue-50 border-blue-200 text-blue-700"
  },
  {
    question: "รถกระบะตู้ทึบสามารถกันฝนและกันฝุ่นได้ดีหรือไม่?",
    answer: "แน่นอนครับ เราใช้รถกระบะตู้ทึบโครงสร้างมาตรฐาน ปิดล็อกมิดชิดหนาแน่น สามารถกันน้ำ กันฝน และฝุ่นละอองได้เป็นอย่างดี ปลอดภัยต่อเฟอร์นิเจอร์และเครื่องใช้ไฟฟ้าอย่างมั่นใจ",
    icon: Truck,
    colorTheme: "bg-indigo-50 border-indigo-200 text-indigo-700"
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
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative w-full z-10 font-sans section-contain">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      
      <div className="max-w-[880px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4">
            <MessageCircleQuestion className="w-4 h-4" />
            <span>คำถามที่พบบ่อย</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] mb-4 tracking-tight">
            ข้อสงสัย<span className="text-blue-600">ในการขนย้าย?</span>
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            รวบรวมข้อสงสัยยอดนิยมเกี่ยวกับการขนส่งและขนย้าย WMS พร้อมตอบอย่างจริงใจและโปร่งใสที่สุด
          </p>
        </div>

        {/* Short info note above FAQ */}
        <div className="mb-6 flex items-center gap-3 p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs sm:text-sm text-slate-700">
          <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
          <p>
            หากมีคำถามเพิ่มเติมหรือบริการนอกเหนือจากนี้ สามารถติดต่อแอดมินเพื่อสอบถามข้อมูลได้ตลอด 24 ชั่วโมง
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-200 overflow-hidden relative ${
                  isActive
                    ? "bg-blue-50/30 border-blue-300 shadow-xs"
                    : "bg-white border-slate-200/90 shadow-xs hover:border-slate-300"
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  id={`faq-title-${index}`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isActive}
                  aria-controls={`faq-content-${index}`}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none group cursor-pointer gap-4"
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 transition-colors ${
                      isActive
                        ? faq.colorTheme
                        : "bg-slate-100 border-slate-200 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200"
                    }`}>
                      {(() => {
                        const IconComponent = faq.icon;
                        return <IconComponent className="w-5 h-5" />;
                      })()}
                    </div>
                    <span className={`text-base sm:text-lg font-bold transition-colors ${
                      isActive ? "text-[#0B1F3A]" : "text-slate-800 group-hover:text-blue-600"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Rotating Chevron Icon */}
                  <div className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all ${
                    isActive 
                      ? "border-blue-200 bg-blue-100 text-blue-700" 
                      : "border-slate-200 bg-slate-50 text-slate-400 group-hover:text-slate-700 group-hover:border-slate-300"
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {/* Animated Answer Panel via Native CSS Grid */}
                <div 
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-title-${index}`}
                  className={`grid transition-all duration-200 ease-in-out ${
                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 pt-1 pl-[4.25rem]">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-sm sm:text-base leading-relaxed">
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
