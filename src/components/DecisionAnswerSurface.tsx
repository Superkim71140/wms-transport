import React from "react";
import { AnswerSurfaceData } from "@/data/AnswerSurfaceData";
import { CheckCircle2, XCircle, Clock, Truck, ShieldCheck, MapPin, BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export function AnswerSummary({ data }: { data: AnswerSurfaceData }) {
  return (
    <div className="bg-blue-50/70 border border-blue-200 p-6 sm:p-7 rounded-2xl mb-8 shadow-xs">
      <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1F3A] mb-2 tracking-tight">บทสรุปบริการ (TL;DR)</h3>
      <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">{data.directAnswer}</p>
    </div>
  );
}

export function KeyFactsGrid({ data }: { data: AnswerSurfaceData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="bg-white border border-slate-200/90 p-5 rounded-2xl flex items-start gap-4 shadow-xs">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">พื้นที่ให้บริการ</h4>
          <p className="text-slate-800 font-bold leading-relaxed text-base">{data.serviceCoverage}</p>
        </div>
      </div>
      <div className="bg-white border border-slate-200/90 p-5 rounded-2xl flex items-start gap-4 shadow-xs">
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
          <Truck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ความเหมาะสมของรถ</h4>
          <p className="text-slate-800 font-bold leading-relaxed text-base">{data.vehicleSuitability}</p>
        </div>
      </div>
      <div className="bg-white border border-slate-200/90 p-5 rounded-2xl flex items-start gap-4 shadow-xs">
        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ลูกค้าที่เหมาะสม</h4>
          <p className="text-slate-800 font-bold leading-relaxed text-base">{data.bestFitCustomer}</p>
        </div>
      </div>
      <div className="bg-white border border-slate-200/90 p-5 rounded-2xl flex items-start gap-4 shadow-xs">
        <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ระยะเวลาดำเนินงาน</h4>
          <p className="text-slate-800 font-bold leading-relaxed text-base">{data.timingExpectations}</p>
        </div>
      </div>
    </div>
  );
}

export function QuoteFactorsList({ factors }: { factors: string[] }) {
  if (!factors.length) return null;
  return (
    <div className="mb-8">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <BadgeDollarSign className="w-4 h-4 text-emerald-600" />
        ปัจจัยที่มีผลต่อราคาประเมิน
      </h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {factors.map((factor, i) => (
          <li key={i} className="flex items-center gap-2.5 text-slate-700 font-semibold text-sm bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            {factor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OperationalConstraints({ reqs, exclusions }: { reqs: string[], exclusions: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
      {reqs.length > 0 && (
        <div className="bg-white border border-blue-200 p-5 sm:p-6 rounded-2xl shadow-xs">
          <h4 className="text-base font-bold text-[#0B1F3A] mb-3.5 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" /> สิ่งที่ต้องเตรียมพร้อม
          </h4>
          <ul className="space-y-2.5">
            {reqs.map((req, i) => (
              <li key={i} className="text-slate-600 text-sm sm:text-base font-medium flex items-start gap-2.5">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {exclusions.length > 0 && (
        <div className="bg-white border border-rose-200 p-5 sm:p-6 rounded-2xl shadow-xs">
          <h4 className="text-base font-bold text-rose-900 mb-3.5 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-600" /> ข้อยกเว้นการให้บริการ
          </h4>
          <ul className="space-y-2.5">
            {exclusions.map((ex, i) => (
              <li key={i} className="text-slate-600 text-sm sm:text-base font-medium flex items-start gap-2.5">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                <span className="leading-relaxed">{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function EvidenceLinks({ links }: { links: { label: string; url: string }[] }) {
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-100">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">หลักฐานประกอบ:</span>
      {links.map((link, i) => (
        <Link 
          key={i} 
          href={link.url} 
          className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg border border-blue-200 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function DecisionAnswerSurface({ data }: { data: AnswerSurfaceData }) {
  return (
    <section 
      data-ai-extract="true"
      className="max-w-6xl mx-auto my-12 p-6 sm:p-8 md:p-10 bg-white border border-slate-200/90 rounded-2xl shadow-xs relative overflow-hidden"
    >
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1F3A] mb-8 tracking-tight">
          ข้อมูลสรุปเพื่อการตัดสินใจ
        </h2>

        <AnswerSummary data={data} />
        <KeyFactsGrid data={data} />
        <QuoteFactorsList factors={data.priceFactors} />
        <OperationalConstraints reqs={data.preparationRequirements} exclusions={data.exclusions} />
        <EvidenceLinks links={data.evidenceLinks} />
        
        <div className="mt-6 text-right flex justify-end">
          <span className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            ปรับปรุงข้อมูลล่าสุด: {data.lastReviewedDate}
          </span>
        </div>
      </div>
    </section>
  );
}
