import React from "react";
import { ClipboardList } from "lucide-react";

export interface ChecklistStep {
  step: string;
  title: string;
  desc: string;
  detailPoints?: string[];
}

export interface PricingChecklistProps {
  title?: string;
  subtitle?: string;
  steps: ChecklistStep[];
}

export default function PricingChecklist({
  title = "ขั้นตอนเตรียมข้อมูลเพื่อขอใบเสนอราคา",
  subtitle = "เตรียมข้อมูล 4 ข้อนี้ เพื่อให้เจ้าหน้าที่คำนวณราคาได้แม่นยำ รวดเร็ว และไม่มีบวกเพิ่มหน้างาน",
  steps,
}: PricingChecklistProps) {
  return (
    <section className="my-8 bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 mb-1">
        <ClipboardList className="w-5 h-5 text-blue-600 shrink-0" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6">
        {subtitle}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((st, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs"
          >
            <div>
              <span className="inline-block text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md mb-2.5">
                {st.step}
              </span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {st.desc}
              </p>
            </div>

            {st.detailPoints && st.detailPoints.length > 0 && (
              <ul className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500 font-medium">
                {st.detailPoints.map((pt, pIdx) => (
                  <li key={pIdx}>• {pt}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
