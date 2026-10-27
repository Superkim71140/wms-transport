"use client";

import React from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export interface FAQItem {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

export interface ServiceAreaFAQProps {
  thaiName: string;
  faqs?: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  isFullWidthSection?: boolean;
}

export default function ServiceAreaFAQ({
  thaiName,
  faqs = [],
  title,
  subtitle,
  className = "",
  isFullWidthSection = true,
}: ServiceAreaFAQProps) {
  // Default representative FAQs if none supplied
  const defaultFaqs: FAQItem[] = [
    {
      question: `รถรับจ้างตู้ทึบในเขต ${thaiName} คิดราคาอย่างไร?`,
      answer: `WMS TRANSPORT คำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดรับของไปยังจุดหมายปลายทาง และปริมาณสัมภาระ โดยมีราคาเริ่มต้นที่โปร่งใส แจ้งราคาสุทธิตรงไปตรงมาก่อนเริ่มงาน ไม่มีบวกเพิ่มหน้างาน`,
    },
    {
      question: `รถกระบะตู้ทึบสามารถเข้าลานจอดใต้อาคารคอนโดมิเนียมได้หรือไม่?`,
      answer: `ความสูงภายในตู้สินค้าคือ 2.10 เมตร เพื่อจุของได้เต็มที่ ส่วนความสูงรวมตัวรถภายนอกอยู่ที่ประมาณ 2.80 - 3.00 เมตร จึงไม่สามารถเข้าใต้อาคารที่มีคานกั้นต่ำกว่า 2.80 ม. ได้ โดยทีมงานจะเทียบจุดโหลดของชั้นล่าง (Loading Bay) หรือหน้าโถงล็อบบี้อย่างปลอดภัย`,
    },
    {
      question: `มีทีมงานช่วยยกของด้วยหรือไม่ และต้องจองคิวล่วงหน้ากี่วัน?`,
      answer: `มีบริการทีมงานช่วยยกของมืออาชีพตามขนาดงานที่ตกลง พร้อมอุปกรณ์ผ้านวมและฟิล์มแรปกันรอย แนะนำให้นัดหมายคิวล่วงหน้า 1-2 วัน โดยเฉพาะช่วงวันหยุดสุดสัปดาห์หรือสิ้นเดือน เพื่อให้ตรงกับคิวจองลิฟต์ของอาคาร`,
    },
  ];

  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  const content = (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header with Vivid Location Emphasis (Reference 2 Direction) */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2.5">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>คำถามที่พบบ่อย</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#07152F] tracking-tight mb-2">
          {title || (
            <>
              คำถามที่พบบ่อยเกี่ยวกับ <span className="text-blue-600 font-black">{thaiName}</span>
            </>
          )}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
          {subtitle || `รวมข้อสงสัยสำคัญเกี่ยวกับการนัดหมายรถ การจัดเตรียมสิ่งของ และการคิดราคาในพื้นที่${thaiName}`}
        </p>
      </div>

      {/* Accordion List (All collapsed by default, 16-20px rounded cards, no repetitive badges) */}
      <div className="space-y-3">
        {activeFaqs.map((item, idx) => {
          const qText = item.question || item.q || "";
          const aText = item.answer || item.a || "";
          return (
            <details
              key={idx}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs open:border-blue-300 open:ring-1 open:ring-blue-500/20 open:shadow-xs transition-all duration-200 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-4.5 sm:p-5 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                <span className="font-semibold text-slate-900 text-sm sm:text-base pr-4 group-hover:text-blue-600 transition-colors leading-snug">
                  {qText}
                </span>
                <span className="shrink-0 text-slate-400 group-hover:text-blue-600 group-open:rotate-180 group-open:text-blue-600 transition-transform duration-200">
                  <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </span>
              </summary>
              <div className="px-5 pb-5 pt-3.5 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-[#F8FAFF]">
                {aText}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );

  if (isFullWidthSection) {
    return (
      <section
        id="faqs"
        aria-label={`คำถามที่พบบ่อย ${thaiName}`}
        className={`w-full bg-[#EFF6FF] border-t border-blue-100/80 py-12 md:py-16 scroll-mt-24 ${className}`}
      >
        {content}
      </section>
    );
  }

  return (
    <section id="faqs" aria-label={`คำถามที่พบบ่อย ${thaiName}`} className={`py-8 scroll-mt-24 ${className}`}>
      {content}
    </section>
  );
}
