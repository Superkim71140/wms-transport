import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
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
  
  if (!record || record.province !== province) {
    return {
      title: "พื้นที่บริการ | WMS TRANSPORT",
      robots: "noindex, nofollow",
    };
  }

  const indexable = isDistrictPageIndexable(record);
  const name = record.districtThaiName;
  const provName = provConfig?.name ?? province;
  
  return {
    title: `${record.primaryIntent} | WMS TRANSPORT`,
    description: `บริการรถรับจ้างตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโด ย่าน${name} ${provName} ${record.actualServiceCapability}. ${record.localOperationalNotes.substring(0, 80)}...`,
    alternates: {
      canonical: `/areas/${province}/${district}`,
    },
    robots: indexable ? "index, follow" : "noindex, nofollow",
  };
}

export default async function AreaLandingPage({ params }: AreaPageProps) {
  const { province, district } = await params;
  const record = districtLandingPages[district];
  const provConfig = provinceMap[province];

  if (!record || record.province !== province) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex flex-col justify-between">
        <div className="grow flex flex-col items-center justify-center pt-32 pb-24 px-4 text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mb-6" />
          <h1 className="text-3xl font-black mb-4">ไม่พบหน้าพื้นที่ให้บริการนี้</h1>
          <p className="text-slate-400 mb-8 max-w-md">หน้าเพจที่คุณกำลังค้นหาอาจอยู่ระหว่างการอัปเดตข้อมูลหรือยังไม่เปิดให้บริการอย่างเป็นทางการ</p>
          <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition-all">
            กลับหน้าแรก
          </Link>
        </div>
        </div>
    );
  }

  // indexable flag computed for metadata only; page always renders
  const name = record.districtThaiName;
  const provThai = provConfig?.name ?? province;
  const provShort = provConfig?.shortName ?? province;

  // Parent geo zone data available via geoMatrix[province] if needed for future expansions

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <main className="grow relative pt-24 pb-24">
        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent" />
          <div className="absolute bottom-[20%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-indigo-500/5 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-6">
            <Breadcrumbs
              items={[
                { name: "พื้นที่ให้บริการ", item: "/#areas" },
                { name: provThai, item: `/service/${province}` },
                { name: `เขต${name}`, item: `/areas/${province}/${district}` },
              ]}
            />
          </div>

          {/* Hero Section */}
          <IntentHero
            h1={record.primaryIntent}
            supporting={record.actualServiceCapability}
            badge={`พื้นที่บริการย่อย · เขต${name}`}
            className="pt-6 pb-12 text-center"
          />

          {/* SGE Answer Surface */}
          <div className="mb-16">
            <DecisionAnswerSurface
              data={{
                directAnswer: `WMS TRANSPORT เปิดบริการรถกระบะตู้ทึบรับจ้าง ย้ายหอพัก คอนโด บ้าน และขนส่งมอเตอร์ไซค์ครอบคลุมพื้นที่เขต${name} ${provThai} ด้วยมาตรฐานความปลอดภัยสูงสุด มีพนักงานยกของพร้อมบริการ`,
                bestFitCustomer: "ผู้อยู่อาศัยในเขตคอนโด ทาวน์โฮม หรือผู้ต้องการส่งของเชิงอุตสาหกรรมในพื้นที่",
                serviceCoverage: `ทั่วเขต${name} และเชื่อมต่อไปยังทุกจังหวัดทั่วประเทศไทย`,
                vehicleSuitability: "รถกระบะตู้ทึบตอนเดียว ความสูง 2.1 เมตร ป้องกันสภาพอากาศได้ 100% วิ่งเข้าซอยแคบได้ดี",
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
              <div className="perf-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <MapPin className="text-blue-400 h-6 w-6" />
                  <span>ข้อมูลวิเคราะห์โลจิสติกส์พื้นที่ {name}</span>
                </h2>
                
                <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">สภาพการเข้าถึงและข้อจำกัดหน้างาน:</h3>
                    <p className="bg-white/2 border border-white/5 rounded-xl p-4">{record.localOperationalNotes}</p>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-base mb-2">อาคารและโครงสร้างส่วนใหญ่:</h3>
                    <p className="bg-white/2 border border-white/5 rounded-xl p-4">{record.propertyAccessContext}</p>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-base mb-2">เส้นทางคมนาคมหลัก:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {record.travelCorridors.map((c, i) => (
                        <span key={i} className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-bold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Local Evidence / Case Study link */}
              <div className="perf-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-white mb-6">
                  หลักฐานผลงานจริงในพื้นที่ เขต{name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {record.images.map((img, i) => (
                    <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-slate-900 group">
                      <div className="relative w-full aspect-video">
                        <Image
                          src={img.path}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                      <div className="p-4 bg-slate-950/80">
                        <p className="text-xs text-blue-400 font-bold mb-1">งานขนย้ายในเขต {name}</p>
                        <h3 className="text-white font-extrabold text-sm mb-2">{img.caption}</h3>
                        <p className="text-xs text-slate-400">ตรวจสอบความถูกต้องและอนุมัติความปลอดภัยเรียบร้อย</p>
                      </div>
                    </div>
                  ))}

                  <div className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col justify-center items-center text-center bg-white/1">
                    <ShieldCheck className="h-10 w-10 text-emerald-400 mb-3" />
                    <h3 className="text-white font-bold text-sm mb-1">คะแนนตรวจสอบความน่าเชื่อถือ</h3>
                    <span className="text-3xl font-black text-emerald-400">{record.proofScore}/100</span>
                    <p className="text-[11px] text-slate-500 mt-2 max-w-[200px]">ข้อมูลได้รับการยืนยันจากพิกัด GPS รถขนส่งและภาพการส่งงานจริงของคนขับ</p>
                  </div>
                </div>
              </div>

              {/* Local FAQs */}
              <div className="perf-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-white mb-6">คำถามที่พบบ่อยของเขต{name}</h2>
                <div className="space-y-4">
                  {record.localFaq.map((faq, i) => (
                    <div key={i} className="bg-white/2 border border-white/5 rounded-xl p-5">
                      <h3 className="text-white font-extrabold text-sm sm:text-base mb-2">Q: {faq.q}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">A: {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: CTA & Pricing Links */}
            <div className="space-y-8">
              {/* Booking CTA Card */}
              <div className="bg-linear-to-b from-blue-600/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
                <h2 className="text-xl font-black text-white mb-4">จองรถขนย้ายเขต{name}</h2>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-semibold">
                  ประเมินราคาตามจริง รวดเร็ว คุยง่าย พนักงานขับรถชำนาญเส้นทาง{name} พร้อมพนักงานช่วยยกของมืออาชีพ
                </p>

                <div className="space-y-4">
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-sm font-black shadow-lg"
                  >
                    <Image src="/images/LINE_icon.webp" alt="LINE" width={20} height={20} className="shrink-0" />
                    <span>สอบถามคิวและราคา (LINE)</span>
                  </a>
                  <a
                    href="tel:0612402436"
                    className="w-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-sm font-bold"
                  >
                    <Phone className="h-4 w-4 text-blue-400" />
                    <span className="font-mono">061-240-2436</span>
                  </a>
                </div>
              </div>

              {/* Related Service links */}
              <div className="perf-card rounded-2xl p-6">
                <h3 className="text-white font-extrabold text-sm mb-4 border-b border-white/10 pb-2">บริการย่อยที่เกี่ยวข้อง</h3>
                <div className="flex flex-col gap-2">
                  <Link href={`/service/${province}/moving`} className="text-xs font-bold text-slate-300 hover:text-blue-400 p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between">
                    <span>ย้ายบ้าน คอนโด หอพัก {name}</span>
                    <ArrowRight className="h-3 w-3 shrink-0" />
                  </Link>
                  <Link href={`/service/${province}/motorcycle`} className="text-xs font-bold text-slate-300 hover:text-blue-400 p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between">
                    <span>ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ {name}</span>
                    <ArrowRight className="h-3 w-3 shrink-0" />
                  </Link>
                  <Link href={`/service/${province}/freight`} className="text-xs font-bold text-slate-300 hover:text-blue-400 p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between">
                    <span>รถกระบะรับจ้างขนส่งสินค้า {name}</span>
                    <ArrowRight className="h-3 w-3 shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Pricing Shortcut */}
              <div className="perf-card rounded-2xl p-6">
                <h3 className="text-white font-extrabold text-sm mb-4 border-b border-white/10 pb-2">ตารางราคาอ้างอิง</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-semibold text-slate-400">
                    <span>ประเภทบริการ</span>
                    <span>ราคาเริ่มต้น</span>
                  </div>
                  <div className="flex justify-between text-xs font-extrabold text-white">
                    <span>ย้ายหอพัก / คอนโด</span>
                    <span className="text-blue-400">1,500 บาท</span>
                  </div>
                  <div className="flex justify-between text-xs font-extrabold text-white">
                    <span>ส่งมอเตอร์ไซค์</span>
                    <span className="text-blue-400">2,500 บาท</span>
                  </div>
                  <div className="flex justify-between text-xs font-extrabold text-white">
                    <span>ขนส่งสินค้า (เหมาเที่ยว)</span>
                    <span className="text-blue-400">1,000 บาท</span>
                  </div>
                  <Link href="/pricing" className="block text-center text-xs text-blue-400 hover:underline font-bold mt-4">
                    ดูนโยบายราคาแบบละเอียด →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      </div>
  );
}
