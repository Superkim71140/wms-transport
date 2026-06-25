import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import IntentHero from "@/components/IntentHero";
import { portfolioCasesData } from "@/data/mediaEvidence";

interface CaseDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(portfolioCasesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioCasesData[slug];

  if (!item) {
    return {
      title: "เคสผลงานขนย้ายของ | WMS TRANSPORT",
      robots: "noindex, nofollow",
    };
  }

  const categoryLabel = 
    item.serviceType === "moving" ? "บริการย้ายบ้านคอนโด" : 
    item.serviceType === "motorcycle" ? "ขนส่งมอเตอร์ไซค์" : 
    item.serviceType === "freight" ? "ขนส่งสินค้า" : "บริการขนย้าย";

  return {
    title: `${item.title} | WMS TRANSPORT`,
    description: `รายงานผลงานการปฏิบัติงานจริง: ${categoryLabel} ย่าน${item.broadArea}. ${item.jobChallenge.substring(0, 80)}...`,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    robots: "index, follow",
  };
}

export default async function PortfolioCaseDetailPage({ params }: CaseDetailPageProps) {
  const { slug } = await params;
  const item = portfolioCasesData[slug];

  if (!item) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex flex-col justify-between">
        <div className="grow flex flex-col items-center justify-center pt-32 pb-24 px-4 text-center">
          <h1 className="text-3xl font-black mb-4">ไม่พบรายงานผลงานชิ้นนี้</h1>
          <p className="text-slate-400 mb-8 max-w-md">ข้อมูลเคสผลงานที่คุณกำลังค้นหาไม่มีอยู่ในระบบหรือถูกนำออกจากระบบแล้ว</p>
          <Link href="/portfolio" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition-all">
            กลับหน้ารวมผลงาน
          </Link>
        </div>
        </div>
    );
  }

  const serviceName = 
    item.serviceType === "moving" ? "ย้ายบ้าน/คอนโด" : 
    item.serviceType === "motorcycle" ? "ส่งมอเตอร์ไซค์" : 
    item.serviceType === "freight" ? "ขนส่งสินค้าโรงงาน" : "บริการช่วยยก";

  // Schema for image
  const imageObjectSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": `https://wms-transport.com${item.approvedPhotos[0]?.path}`,
    "name": item.approvedPhotos[0]?.alt,
    "description": item.title,
    "contentLocation": {
      "@type": "Place",
      "name": item.broadArea
    },
    "acquireLicensePage": "https://wms-transport.com/portfolio"
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      {/* JSON-LD Image Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }}
      />

      <main className="grow relative pt-24 pb-24">
        {/* Ambient background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent" />
          <div className="absolute bottom-[20%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-indigo-500/5 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-6">
            <Breadcrumbs
              items={[
                { name: "ผลงานขนย้าย", item: "/portfolio" },
                { name: serviceName, item: item.relatedServiceLink },
                { name: item.title.substring(0, 15) + "...", item: `/portfolio/${slug}` }
              ]}
            />
          </div>

          <div className="mb-6">
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>กลับหน้ารวมผลงานทั้งหมด</span>
            </Link>
          </div>

          {/* Hero Header */}
          <IntentHero
            h1={item.title}
            supporting={`รายงานบันทึกการขนย้ายจริงย่าน${item.broadArea}`}
            badge={`เคสงานจริง · ${serviceName}`}
            className="pt-4 pb-8"
          />

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
            
            {/* Left/Middle: Case details */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Photo Evidence with Next/Image and responsive sizing */}
              <div className="border border-white/10 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl relative">
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>ภาพถ่ายหน้างานจริง</span>
                  </span>
                </div>
                
                <div className="relative w-full aspect-4/3 sm:aspect-16/10 overflow-hidden">
                  {item.approvedPhotos[0] && (
                    <Image
                      src={item.approvedPhotos[0].path}
                      alt={item.approvedPhotos[0].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 700px"
                      priority
                    />
                  )}
                </div>
                
                <div className="p-4 bg-slate-950/80 border-t border-white/5 text-center text-xs sm:text-sm text-slate-400 font-semibold italic">
                  {item.approvedPhotos[0]?.alt}
                </div>
              </div>

              {/* Challenge block */}
              <div className="perf-card rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="text-lg sm:text-xl font-black text-white border-b border-white/5 pb-2">
                  โจทย์และความท้าทายของงาน (The Challenge)
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-semibold">
                  {item.jobChallenge}
                </p>
              </div>

              {/* Process steps */}
              <div className="perf-card rounded-2xl p-6 sm:p-8 space-y-6">
                <h2 className="text-lg sm:text-xl font-black text-white border-b border-white/5 pb-2">
                  ขั้นตอนการปฏิบัติงานของทีม WMS (The Process)
                </h2>
                <div className="space-y-4">
                  {item.process.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start bg-white/1 border border-white/5 rounded-xl p-4">
                      <span className="flex h-7 w-7 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 items-center justify-center font-mono font-black text-sm shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold mt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome block */}
              <div className="perf-card rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="text-lg sm:text-xl font-black text-white border-b border-white/5 pb-2">
                  ผลลัพธ์และความพึงพอใจ (The Outcome)
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-semibold">
                  {item.outcome}
                </p>
              </div>

            </div>

            {/* Right Side: Metadata, score & CTA */}
            <div className="space-y-6">
              
              {/* Proof Score Card */}
              <div className="perf-card rounded-2xl p-6 text-center border border-white/10 bg-[#071426]/80 flex flex-col justify-center items-center">
                <ShieldCheck className="h-12 w-12 text-emerald-400 mb-2" />
                <span className="text-[10px] text-slate-500 tracking-widest font-black uppercase">PROVENANCE SCORE</span>
                <span className="text-4xl font-black text-emerald-400 my-2">{item.proofScore}/100</span>
                <p className="text-[10px] text-slate-400 leading-relaxed font-semibold max-w-[200px]">
                  หลักฐานงานขนย้ายชิ้นนี้ได้รับการตรวจสอบความถูกต้องทางตำแหน่งและภาพถ่าย ไม่มีเจตนาบิดเบือนข้อมูลใดๆ
                </p>
              </div>

              {/* Geo Entity Matrix connections */}
              <div className="perf-card rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-extrabold text-sm border-b border-white/10 pb-2">การเชื่อมโยงพื้นที่และบริการ</h3>
                
                <div className="space-y-3.5 text-xs font-semibold text-slate-300">
                  <div className="flex justify-between items-center">
                    <span>ประเภทบริการ:</span>
                    <Link href={item.relatedServiceLink} className="text-blue-400 hover:underline">
                      {serviceName}
                    </Link>
                  </div>
                  {item.relatedDistrictLink && (
                    <div className="flex justify-between items-center">
                      <span>พื้นที่บริการย่อย:</span>
                      <Link href={item.relatedDistrictLink} className="text-blue-400 hover:underline">
                        เขต{item.broadArea.split(" ")[0]}
                      </Link>
                    </div>
                  )}
                  {item.relatedRouteLink && (
                    <div className="flex justify-between items-center">
                      <span>เส้นทางขนส่ง:</span>
                      <Link href={item.relatedRouteLink} className="text-blue-400 hover:underline">
                        เส้นทางหลัก
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Quote booking CTA */}
              <div className="bg-linear-to-b from-blue-600/20 to-blue-900/10 border border-blue-500/20 rounded-2xl p-6 text-center space-y-5">
                <h4 className="text-white font-black text-sm">ต้องการขนย้ายของลักษณะใกล้เคียงกัน?</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  ให้ทีมงานมืออาชีพของ WMS วางแผนจัดรถและคนช่วยยกที่พอดีกับของ เพื่อความประหยัดและความปลอดภัย
                </p>
                <div className="space-y-3">
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-xs font-black"
                  >
                    <Image src="/images/LINE_icon.webp" alt="LINE" width={16} height={16} className="shrink-0" />
                    <span>แชร์ภาพประเมินราคา (LINE)</span>
                  </a>
                  <a
                    href="tel:0612402436"
                    className="w-full bg-slate-900 border border-white/5 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:-translate-y-0.5 text-xs font-bold"
                  >
                    <Phone className="h-3 w-3 text-blue-400" />
                    <span className="font-mono">061-240-2436</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      </div>
  );
}
