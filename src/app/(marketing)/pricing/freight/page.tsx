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
  description: "ตารางราคาบริการขนส่งสินค้าโรงงานและกระจายสินค้าเชิงพาณิชย์แบบเหมาเที่ยวทั่วไทย คิดตามจริงพร้อมเอกสารประกอบครบถ้วนพร้อมมาตรการดูแลความปลอดภัย",
  alternates: {
    canonical: "/pricing/freight",
  },
};

export default function PricingFreightPage() {
  const policy = pricingPolicyData.find(p => p.serviceType === "freight")!;

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <main className="grow relative pt-12 pb-20">
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
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>กลับหน้าอัตราค่าบริการรวม</span>
            </Link>
          </div>

          {/* Hero Section */}
          <IntentHero
            h1={policy.scenario}
            supporting="ประเมินราคาตามจริงพร้อมจัดส่งครอบคลุมนิคมอุตสาหกรรมและเชิงพาณิชย์ ออกเอกสารกำกับภาษีได้"
            badge="FREIGHT SERVICE PRICE"
            className="pt-2 pb-6 text-center"
          />

          {/* Main Info Blocks */}
          <div className="space-y-6">
            {/* Price Highlight Card */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 sm:p-8 text-center shadow-xs">
              <span className="text-xs text-blue-700 font-bold tracking-wide uppercase block mb-1">อัตราค่าบริการเหมารายเที่ยวเริ่มต้น</span>
              <span className="text-4xl sm:text-5xl font-black text-[#0B1F3A] block my-2">
                {policy.startingPrice.toLocaleString()} <span className="text-xl sm:text-2xl font-bold text-blue-600">บาท</span>
              </span>
              <p className="text-xs text-slate-500 font-medium italic mt-2">
                *สำหรับงานเหมาระยะไกล (300กม. ขึ้นไป) ราคาคิดเริ่มต้นที่กิโลเมตรละ 16 บาท อัปเดตล่าสุด ณ วันที่ {policy.lastReviewedDate}
              </p>
            </div>

            {/* Included & Excluded Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Included Items */}
              <div className="bg-white border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>รายการที่รวมในราคาเริ่มต้น</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                  {policy.includedItems.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-emerald-600 shrink-0 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded Items */}
              <div className="bg-white border border-rose-200 rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-rose-800 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
                  <span>รายการที่ไม่รวม (บริการเพิ่มเติม)</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                  {policy.excludedItems.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-rose-600 shrink-0 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Variable Factors */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600 shrink-0" />
                <span>ปัจจัยหน้างานขนส่งเชิงอุตสาหกรรม</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium list-decimal list-inside leading-relaxed">
                {policy.priceVariables.map((variable, idx) => (
                  <li key={idx} className="pl-1">
                    {variable}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote Assumptions */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
                ข้อตกลงการรับสินค้าเชิงพาณิชย์ WMS (Assumptions)
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium list-disc list-inside leading-relaxed">
                {policy.quoteAssumptions.map((asm, idx) => (
                  <li key={idx}>
                    {asm}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#0B1F3A] border border-blue-950 rounded-2xl p-6 sm:p-10 text-center text-white shadow-md relative overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">ขอใบเสนอราคาขนส่งสินค้าอุตสาหกรรม</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6 font-medium">
              แจ้งรายการกล่องสินค้า น้ำหนักรวม จุดแวะพัก และวันเวลาโหลดงาน เพื่อรับเอกสารเสนอราคาเชิงพาณิชย์ในรูปแบบบริษัท
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#06C755] hover:bg-[#05B34F] text-white py-3.5 px-7 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm font-bold shadow-xs"
              >
                <Image src="/images/LINE_icon.webp" alt="LINE" width={20} height={20} className="shrink-0" />
                <span>ทักแชท LINE ขอใบเสนอราคา</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 text-white py-3.5 px-7 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm font-bold"
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
