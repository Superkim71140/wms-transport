import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowLeft, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import IntentHero from "@/components/IntentHero";
import { pricingPolicyData } from "@/data/pricingPolicy";

export const metadata: Metadata = {
  title: "ราคาเหมารถกระบะตู้ทึบขนส่งสินค้าโรงงานสินค้าทั่วไป | WMS TRANSPORT",
  description: "ตารางราคาบริการขนส่งสินค้าโรงงานและกระจายสินค้าเชิงพาณิชย์แบบเหมาเที่ยวทั่วไทย คิดตามจริงพร้อมเอกสารประกอบครบถ้วนและประกันภัยสินค้า",
  alternates: {
    canonical: "/pricing/freight",
  },
};

export default function PricingFreightPage() {
  const policy = pricingPolicyData.find(p => p.serviceType === "freight")!;

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <main className="grow relative pt-24 pb-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent" />
          <div className="absolute bottom-[20%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-indigo-500/5 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-6">
            <Breadcrumbs
              items={[
                { name: "อัตราค่าบริการ", item: "/pricing" },
                { name: "เหมารถตู้ทึบขนส่งสินค้า", item: "/pricing/freight" }
              ]}
            />
          </div>

          <div className="mb-6">
            <Link 
              href="/pricing"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>กลับหน้าอัตราค่าบริการรวม</span>
            </Link>
          </div>

          {/* Hero Section */}
          <IntentHero
            h1={policy.scenario}
            supporting="ประเมินราคาตามจริงพร้อมจดรับส่งครอบคลุมนิคมอุตสาหกรรมและเชิงพาณิชย์ ออกเอกสารกำกับภาษีได้"
            badge="FREIGHT SERVICE PRICE"
            className="pt-4 pb-8 text-center"
          />

          {/* Main Info Blocks */}
          <div className="space-y-8">
            {/* Price Highlight Card */}
            <div className="bg-linear-to-br from-blue-600/20 to-indigo-900/10 border border-blue-500/30 rounded-3xl p-6 sm:p-8 text-center">
              <span className="text-xs text-blue-400 font-black tracking-widest uppercase block mb-1">อัตราค่าบริการเหมารายเที่ยวเริ่มต้น</span>
              <span className="text-4xl sm:text-5xl font-black text-white block my-2">
                {policy.startingPrice.toLocaleString()} <span className="text-xl sm:text-2xl font-bold text-slate-400">บาท</span>
              </span>
              <p className="text-xs text-slate-400 font-semibold italic mt-2">
                *สำหรับงานเหมาระยะไกล (300กม. ขึ้นไป) ราคาคิดเริ่มต้นที่กิโลเมตรละ 16 บาท อัปเดตล่าสุด ณ วันที่ {policy.lastReviewedDate}
              </p>
            </div>

            {/* Included & Excluded Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Included Items */}
              <div className="perf-card rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="text-base sm:text-lg font-black text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span>รายการที่รวมในราคาเริ่มต้น</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-semibold">
                  {policy.includedItems.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-emerald-400 shrink-0 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded Items */}
              <div className="perf-card rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="text-base sm:text-lg font-black text-rose-400 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
                  <span>รายการที่ไม่รวม (บริการเพิ่มเติม)</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-semibold">
                  {policy.excludedItems.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-rose-400 shrink-0 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Variable Factors */}
            <div className="perf-card rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-400 shrink-0" />
                <span>ปัจจัยหน้างานขนส่งเชิงอุตสาหกรรม</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-semibold list-decimal list-inside">
                {policy.priceVariables.map((variable, idx) => (
                  <li key={idx} className="leading-relaxed pl-1">
                    {variable}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote Assumptions */}
            <div className="perf-card rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base sm:text-lg font-black text-white">
                ข้อตกลงการรับสินค้าเชิงพาณิชย์ WMS (Assumptions)
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-semibold list-disc list-inside">
                {policy.quoteAssumptions.map((asm, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {asm}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-linear-to-b from-[#071426] to-[#040B15] border border-white/10 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent pointer-events-none" />
            <h3 className="text-xl sm:text-2xl font-black text-white mb-4">ขอใบเสนอราคาขนส่งสินค้าอุตสาหกรรม</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6 font-semibold">
              แจ้งรายการกล่องสินค้า น้ำหนักรวม จุดแวะพัก และวันเวลาโหลดงาน เพื่อรับเอกสารเสนอราคาเชิงพาณิชย์ในรูปแบบบริษัท
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#06C755] hover:bg-[#05B34F] text-white py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all text-sm font-black"
              >
                <Image src="/images/LINE_icon.webp" alt="LINE" width={20} height={20} className="shrink-0" />
                <span>ทักแชท LINE ขอใบเสนอราคา</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-white/10 text-white py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 text-sm font-bold"
              >
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="font-mono">061-240-2436</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      </div>
  );
}
