import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import { buildDistrictMetadata } from "@/lib/seo/metadata";
import { getDistrictBreadcrumbs } from "@/lib/seo/breadcrumbs";
import IntentHero from "@/components/IntentHero";
import DecisionAnswerSurface from "@/components/DecisionAnswerSurface";
import TLDRVerdict from "@/components/TLDRVerdict";
import { provinceMap } from "../../../service/[province]/page";
import { districtLandingPages, isDistrictPageIndexable } from "@/data/districtLandingPages";

interface AreaPageProps {
  params: Promise<{
    province: string;
    district: string;
  }>;
}

export async function generateStaticParams() {
  return Object.values(districtLandingPages)
    .filter(isDistrictPageIndexable)
    .map((record) => ({
      province: record.province,
      district: record.districtSlug,
    }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { province, district } = await params;
  const record = districtLandingPages[district];
  const provConfig = provinceMap[province];
  
  if (!record || record.province !== province || !provConfig) {
    return {
      title: "ไม่พบพื้นที่บริการ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  const provName = provConfig?.name ?? province;
  return buildDistrictMetadata(record, provName);
}

export default async function AreaLandingPage({ params }: AreaPageProps) {
  const { province, district } = await params;
  const record = districtLandingPages[district];
  const provConfig = provinceMap[province];

  if (!record || record.province !== province || !provConfig) {
    notFound();
  }

  // indexable flag computed for metadata only; page always renders
  const name = record.districtThaiName;
  const provThai = provConfig?.name ?? province;
  const provShort = provConfig?.shortName ?? province;

  // Parent geo zone data available via geoMatrix[province] if needed for future expansions

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans">
      <main className="grow relative pt-24 pb-20 md:pt-28 md:pb-28">
        {/* Ambient subtle light background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-6">
            <Breadcrumbs items={getDistrictBreadcrumbs(provThai, province, `เขต${name}`, district)} />
          </div>

          {/* Hero Section */}
          <IntentHero
            h1={record.primaryIntent}
            supporting={record.actualServiceCapability}
            badge={`พื้นที่บริการย่อย · เขต${name}`}
            className="pt-4 pb-8 text-center"
          />

          {/* SGE Answer Surface */}
          <div className="mb-14">
            <DecisionAnswerSurface
              data={{
                directAnswer: `WMS TRANSPORT เปิดบริการรถกระบะตู้ทึบรับจ้าง ย้ายหอพัก คอนโด บ้าน และขนส่งมอเตอร์ไซค์ครอบคลุมพื้นที่เขต${name} ${provThai} ด้วยมาตรฐานความปลอดภัยสูงสุด มีพนักงานยกของพร้อมบริการ`,
                bestFitCustomer: "ผู้อยู่อาศัยในเขตคอนโด ทาวน์โฮม หรือผู้ต้องการส่งของเชิงอุตสาหกรรมในพื้นที่",
                serviceCoverage: `ทั่วเขต${name} และเชื่อมต่อไปยังทุกจังหวัดทั่วประเทศไทย`,
                vehicleSuitability: "รถกระบะตู้ทึบตอนเดียว ความสูง 2.1 เมตร ป้องกันสภาพอากาศอย่างมิดชิด วิ่งเข้าซอยแคบได้ดี",
                priceFactors: ["ระยะทางขับขี่", "จำนวนทีมงานยกของ", "ชั้นอาคารและลิฟต์"],
                timingExpectations: "เข้าถึงหน้างานภายใน 2-3 ชั่วโมงสำหรับการจองล่วงหน้าด่วน หรือล็อกคิวตามวันเวลาที่สะดวก",
                preparationRequirements: ["คัดแยกสิ่งของใส่กล่อง", "แจ้งนิติบุคคลของคอนโดหรือหมู่บ้านเพื่อจองลิฟต์และขอสิทธิ์เข้าจอด"],
                exclusions: ["ไม่บริการขนส่งของสดปริมาณมากที่ไม่บรรจุหีบห่อ", "ไม่ขนส่งสิ่งของผิดกฎหมายทุกประเภท"],
                evidenceLinks: [{ label: "ตรวจสอบผลงานย้ายจริง", url: "/portfolio" }],
                lastReviewedDate: record.lastReviewedDate,
              }}
            />
            <TLDRVerdict location={`เขต${name} (${provShort})`} />
          </div>

          {/* Grid Layout for details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
            {/* Left/Middle Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Local Logistics Details */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2.5">
                  <MapPin className="text-blue-600 h-6 w-6 shrink-0" />
                  <span>ข้อมูลวิเคราะห์โลจิสติกส์พื้นที่ {name}</span>
                </h2>
                
                <div className="space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  <div>
                    <h3 className="text-slate-900 font-bold text-base mb-2">สภาพการเข้าถึงและข้อจำกัดหน้างาน:</h3>
                    <p className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-slate-700">{record.localOperationalNotes}</p>
                  </div>

                  <div>
                    <h3 className="text-slate-900 font-bold text-base mb-2">อาคารและโครงสร้างส่วนใหญ่:</h3>
                    <p className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-slate-700">{record.propertyAccessContext}</p>
                  </div>

                  <div>
                    <h3 className="text-slate-900 font-bold text-base mb-2">เส้นทางคมนาคมหลัก:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {record.travelCorridors.map((c, i) => (
                        <span key={i} className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full font-bold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Local Evidence / Case Study link */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
                  หลักฐานผลงานจริงในพื้นที่ เขต{name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {record.images.map((img, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                      <div className="relative w-full aspect-video">
                        <Image
                          src={img.path}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                      <div className="p-4 bg-white border-t border-slate-100">
                        <p className="text-xs text-blue-600 font-bold mb-1">งานขนย้ายในเขต {name}</p>
                        <h3 className="text-slate-900 font-bold text-sm mb-1.5">{img.caption}</h3>
                        <p className="text-xs text-slate-500">ตรวจสอบความถูกต้องและอนุมัติความปลอดภัยเรียบร้อย</p>
                      </div>
                    </div>
                  ))}

                  <div className="border border-slate-200 rounded-xl p-6 flex flex-col justify-center items-center text-center bg-emerald-50/60">
                    <ShieldCheck className="h-10 w-10 text-emerald-600 mb-3" />
                    <h3 className="text-emerald-950 font-bold text-sm mb-1">คะแนนตรวจสอบความน่าเชื่อถือ</h3>
                    <span className="text-3xl font-black text-emerald-700">{record.proofScore}/100</span>
                    <p className="text-xs text-slate-600 mt-2 max-w-[200px]">ข้อมูลได้รับการตรวจสอบจากบันทึกการส่งงานและภาพถ่ายจริงของทีมงาน</p>
                  </div>
                </div>
              </div>

              {/* Local FAQs */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">คำถามที่พบบ่อยของเขต{name}</h2>
                <div className="space-y-3.5">
                  {record.localFaq.map((faq, i) => (
                    <div key={i} className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4.5">
                      <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1.5">Q: {faq.q}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">A: {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: CTA & Pricing Links */}
            <div className="space-y-6 lg:sticky lg:top-28">
              {/* Booking CTA Card */}
              <div className="bg-[#0B1F3A] border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-md text-white">
                <h2 className="text-xl font-black text-white mb-3">จองรถขนย้ายเขต{name}</h2>
                <p className="text-xs text-blue-100/80 leading-relaxed mb-6 font-medium">
                  ประเมินราคาตามจริง รวดเร็ว คุยง่าย พนักงานขับรถชำนาญเส้นทาง{name} พร้อมพนักงานช่วยยกของมืออาชีพ
                </p>

                <div className="space-y-3">
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-sm font-bold shadow-sm"
                  >
                    <Image src="/images/LINE_icon.webp" alt="LINE" width={18} height={18} className="shrink-0" />
                    <span>สอบถามคิวและราคา (LINE)</span>
                  </a>
                  <a
                    href="tel:0612402436"
                    className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-sm font-semibold"
                  >
                    <Phone className="h-4 w-4 text-blue-300" />
                    <span className="font-mono">061-240-2436</span>
                  </a>
                </div>
              </div>

              {/* Related Service links */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                <h3 className="text-slate-900 font-bold text-sm mb-4 border-b border-slate-100 pb-2">บริการย่อยที่เกี่ยวข้อง</h3>
                <div className="flex flex-col gap-1.5">
                  <Link href={`/service/${province}/moving`} className="text-xs font-semibold text-slate-700 hover:text-blue-600 p-2 hover:bg-blue-50/50 rounded-lg transition-colors flex items-center justify-between">
                    <span>ย้ายบ้าน คอนโด หอพัก {name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  </Link>
                  <Link href={`/service/${province}/motorcycle`} className="text-xs font-semibold text-slate-700 hover:text-blue-600 p-2 hover:bg-blue-50/50 rounded-lg transition-colors flex items-center justify-between">
                    <span>ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ {name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  </Link>
                  <Link href={`/service/${province}/freight`} className="text-xs font-semibold text-slate-700 hover:text-blue-600 p-2 hover:bg-blue-50/50 rounded-lg transition-colors flex items-center justify-between">
                    <span>รถกระบะรับจ้างขนส่งสินค้า {name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Pricing Shortcut */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                <h3 className="text-slate-900 font-bold text-sm mb-4 border-b border-slate-100 pb-2">ตารางราคาอ้างอิง</h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>ประเภทบริการ</span>
                    <span>ราคาเริ่มต้น</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>ย้ายหอพัก / คอนโด</span>
                    <span className="text-blue-600">1,500 บาท</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>ส่งมอเตอร์ไซค์</span>
                    <span className="text-blue-600">2,500 บาท</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>ขนส่งสินค้า (เหมาเที่ยว)</span>
                    <span className="text-blue-600">1,000 บาท</span>
                  </div>
                  <Link href="/pricing" className="block text-center text-xs text-blue-600 hover:underline font-bold mt-3.5 pt-2 border-t border-slate-100">
                    ดูนโยบายราคาแบบละเอียด →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <InternalLinks currentCategory="area" currentSlug={district} />
    </div>
  );
}
