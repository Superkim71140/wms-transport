import React from "react";
import { CheckCircle2, AlertCircle, Info, Sparkles } from "lucide-react";

export interface PricingPriceCardProps {
  startingPrice: number;
  pricePrefix?: string;
  badgeText?: string;
  priceHeadline: string;
  eligibilityNote: string;
  includedItems: string[];
  excludedItems: string[];
  volumeNote?: string;
  lastReviewedDate?: string;
}

export default function PricingPriceCard({
  startingPrice,
  pricePrefix,
  badgeText,
  priceHeadline,
  eligibilityNote,
  includedItems,
  excludedItems,
  volumeNote,
  lastReviewedDate,
}: PricingPriceCardProps) {
  return (
    <div className="space-y-6 my-8">
      {/* Starting Price Box */}
      <div className="bg-gradient-to-b from-blue-50/80 to-white border-2 border-blue-200/90 rounded-2xl p-6 sm:p-8 text-center shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{badgeText || "อัตราค่าบริการเริ่มต้นที่ตรวจสอบแล้ว"}</span>
        </div>

        <div className="text-sm sm:text-base font-bold text-slate-700 mt-1">
          {priceHeadline}
        </div>

        <div className="my-3 flex items-baseline justify-center gap-1.5 sm:gap-2">
          {pricePrefix && (
            <span className="text-base sm:text-xl font-bold text-slate-600">
              {pricePrefix}
            </span>
          )}
          <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {startingPrice.toLocaleString()}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-blue-600">บาท</span>
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
          {eligibilityNote}
        </p>

        {volumeNote && (
          <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs sm:text-sm text-amber-900 font-medium flex items-center justify-center gap-2 text-left">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{volumeNote}</span>
          </div>
        )}

        {lastReviewedDate && (
          <div className="mt-3 text-xs text-slate-500 font-medium">
            อัปเดตเกณฑ์ราคาล่าสุด: {lastReviewedDate}
          </div>
        )}
      </div>

      {/* Side-by-side / Stacked Included vs Excluded Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Included */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-900">
                รวมในราคาเริ่มต้น
              </h3>
              <p className="text-xs text-emerald-700">ไม่มีเรียกเก็บซ้ำซ้อน</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 font-medium">
            {includedItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded / Extra Costs */}
        <div className="bg-white border border-rose-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-rose-100">
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-rose-900">
                มีค่าใช้จ่ายเพิ่มเติมเมื่อใด
              </h3>
              <p className="text-xs text-rose-700">ประเมินตามจริงก่อนเริ่มงาน</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 font-medium">
            {excludedItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-1" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
