"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingFAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export default function PricingFAQ({
  title = "คำถามที่พบบ่อยเกี่ยวกับค่าบริการ",
  subtitle = "รวบรวมข้อสงสัยที่ลูกค้าสอบถามบ่อย เพื่อความชัดเจนก่อนเริ่มงาน",
  faqs,
}: PricingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="my-10 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
        {subtitle}
      </p>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 text-left bg-slate-50/60 hover:bg-slate-50 transition-colors gap-3 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 bg-white border-t border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
