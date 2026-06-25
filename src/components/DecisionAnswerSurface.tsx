import React from "react";
import { AnswerSurfaceData } from "@/data/AnswerSurfaceData";
import { CheckCircle2, XCircle, Clock, Truck, ShieldCheck, MapPin, BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export function AnswerSummary({ data }: { data: AnswerSurfaceData }) {
  return (
    <div className="bg-linear-to-r from-blue-500/10 to-transparent border-l-4 border-blue-500 p-6 sm:p-8 rounded-r-2xl mb-8 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)] transition-all duration-500 hover:bg-white/4 hover:border-blue-400/20 hover:scale-[1.005]">
      <h3 className="text-xl sm:text-2xl font-black text-blue-100 mb-3 tracking-wide drop-shadow-md">บทสรุปบริการ (TL;DR)</h3>
      <p className="text-slate-200/90 text-base sm:text-lg leading-relaxed font-semibold">{data.directAnswer}</p>
    </div>
  );
}

export function KeyFactsGrid({ data }: { data: AnswerSurfaceData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
      <div className="bg-[#071426]/60 backdrop-blur-xl border border-white/5 p-6 rounded-3xl flex items-start gap-5 transition-all duration-500 ease-out hover:bg-white/4 hover:border-blue-400/20 hover:scale-[1.005] group">
        <div className="p-3 bg-sky-500/10 rounded-2xl group-hover:bg-sky-500/20 transition-colors duration-500">
          <MapPin className="w-7 h-7 text-sky-400 shrink-0" />
        </div>
        <div>
          <h4 className="text-sm font-black text-sky-300/80 uppercase tracking-widest mb-1.5">พื้นที่ให้บริการ</h4>
          <p className="text-slate-200 font-bold leading-relaxed text-base">{data.serviceCoverage}</p>
        </div>
      </div>
      <div className="bg-[#071426]/60 backdrop-blur-xl border border-white/5 p-6 rounded-3xl flex items-start gap-5 transition-all duration-500 ease-out hover:bg-white/4 hover:border-blue-400/20 hover:scale-[1.005] group">
        <div className="p-3 bg-emerald-500/10 rounded-2xl group-hover:bg-emerald-500/20 transition-colors duration-500">
          <Truck className="w-7 h-7 text-emerald-400 shrink-0" />
        </div>
        <div>
          <h4 className="text-sm font-black text-emerald-300/80 uppercase tracking-widest mb-1.5">ความเหมาะสมของรถ</h4>
          <p className="text-slate-200 font-bold leading-relaxed text-base">{data.vehicleSuitability}</p>
        </div>
      </div>
      <div className="bg-[#071426]/60 backdrop-blur-xl border border-white/5 p-6 rounded-3xl flex items-start gap-5 transition-all duration-500 ease-out hover:bg-white/4 hover:border-blue-400/20 hover:scale-[1.005] group">
        <div className="p-3 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-colors duration-500">
          <ShieldCheck className="w-7 h-7 text-indigo-400 shrink-0" />
        </div>
        <div>
          <h4 className="text-sm font-black text-indigo-300/80 uppercase tracking-widest mb-1.5">ลูกค้าที่เหมาะสม</h4>
          <p className="text-slate-200 font-bold leading-relaxed text-base">{data.bestFitCustomer}</p>
        </div>
      </div>
      <div className="bg-[#071426]/60 backdrop-blur-xl border border-white/5 p-6 rounded-3xl flex items-start gap-5 transition-all duration-500 ease-out hover:bg-white/4 hover:border-blue-400/20 hover:scale-[1.005] group">
        <div className="p-3 bg-orange-500/10 rounded-2xl group-hover:bg-orange-500/20 transition-colors duration-500">
          <Clock className="w-7 h-7 text-orange-400 shrink-0" />
        </div>
        <div>
          <h4 className="text-sm font-black text-orange-300/80 uppercase tracking-widest mb-1.5">ระยะเวลาดำเนินงาน</h4>
          <p className="text-slate-200 font-bold leading-relaxed text-base">{data.timingExpectations}</p>
        </div>
      </div>
    </div>
  );
}

export function QuoteFactorsList({ factors }: { factors: string[] }) {
  if (!factors.length) return null;
  return (
    <div className="mb-8">
      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-3">
        <BadgeDollarSign className="w-5 h-5 text-emerald-400" />
        ปัจจัยที่มีผลต่อราคาประเมิน
      </h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {factors.map((factor, i) => (
          <li key={i} className="flex items-center gap-3 text-slate-200 font-semibold text-sm bg-white/2 px-4 py-3 rounded-2xl border border-white/5 transition-all duration-500 hover:bg-white/4 hover:border-blue-400/20 hover:scale-[1.005]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0"></span>
            {factor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OperationalConstraints({ reqs, exclusions }: { reqs: string[], exclusions: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {reqs.length > 0 && (
        <div className="bg-[#071426]/60 backdrop-blur-xl border border-blue-500/20 p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:bg-white/4 hover:border-blue-400/30 hover:scale-[1.005]">
          <h4 className="text-base font-black text-blue-300 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-400" /> สิ่งที่ต้องเตรียมพร้อม
          </h4>
          <ul className="space-y-3">
            {reqs.map((req, i) => (
              <li key={i} className="text-slate-300 text-sm sm:text-base font-medium flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)] shrink-0"></span>
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {exclusions.length > 0 && (
        <div className="bg-[#071426]/60 backdrop-blur-xl border border-red-500/20 p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:bg-white/4 hover:border-red-400/30 hover:scale-[1.005]">
          <h4 className="text-base font-black text-red-300 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" /> ข้อยกเว้นการให้บริการ
          </h4>
          <ul className="space-y-3">
            {exclusions.map((ex, i) => (
              <li key={i} className="text-slate-300 text-sm sm:text-base font-medium flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)] shrink-0"></span>
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
    <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-white/10">
      <span className="text-xs font-black text-slate-500 uppercase tracking-widest">หลักฐานประกอบ:</span>
      {links.map((link, i) => (
        <Link 
          key={i} 
          href={link.url} 
          className="text-sm font-bold text-blue-300 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 px-5 py-2.5 rounded-xl border border-blue-500/20 transition-all duration-500 hover:scale-[1.02] shadow-[0_4px_15px_rgba(59,130,246,0.1)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.2)]"
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
      className="max-w-6xl mx-auto my-16 p-6 sm:p-10 md:p-14 bg-[#040B16]/80 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden group transition-all duration-700 hover:border-blue-500/20"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-blue-600/15" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-sky-500/15" />

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tight flex items-center gap-4">
          <span className="w-2 h-10 bg-linear-to-b from-blue-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></span>
          ข้อมูลสรุปเพื่อการตัดสินใจ
        </h2>

        <AnswerSummary data={data} />
        <KeyFactsGrid data={data} />
        <QuoteFactorsList factors={data.priceFactors} />
        <OperationalConstraints reqs={data.preparationRequirements} exclusions={data.exclusions} />
        <EvidenceLinks links={data.evidenceLinks} />
        
        <div className="mt-8 text-right flex justify-end">
          <span className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400/50"></span>
            ปรับปรุงข้อมูลล่าสุด: {data.lastReviewedDate}
          </span>
        </div>
      </div>
    </section>
  );
}
