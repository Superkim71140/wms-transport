import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Phone, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import IntentHero from "@/components/IntentHero";
import { portfolioCasesData } from "@/data/mediaEvidence";
import { siteConfig } from "@/lib/seo/site-config";

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
      title: "ไม่พบผลงาน | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  const serviceName = 
    item.serviceType === "moving" ? "ย้ายบ้าน/คอนโด" : 
    item.serviceType === "motorcycle" ? "ส่งมอเตอร์ไซค์" : 
    item.serviceType === "freight" ? "ขนส่งสินค้าโรงงาน" : "บริการช่วยยก";

  return {
    title: `${item.title} | ผลงานขนย้ายจริง WMS TRANSPORT`,
    description: `รายงานบันทึกการขนย้ายจริงย่าน${item.broadArea} บริการ${serviceName} โดยทีมงาน WMS TRANSPORT`,
    alternates: {
      canonical: `${siteConfig.productionUrl}/portfolio/${slug}`,
    },
  };
}

export default async function PortfolioCaseDetailPage({ params }: CaseDetailPageProps) {
  const { slug } = await params;
  const item = portfolioCasesData[slug];

  if (!item) {
    notFound();
  }

  const serviceName = 
    item.serviceType === "moving" ? "ย้ายบ้าน/คอนโด" : 
    item.serviceType === "motorcycle" ? "ส่งมอเตอร์ไซค์" : 
    item.serviceType === "freight" ? "ขนส่งสินค้าโรงงาน" : "บริการช่วยยก";

  // Schema for case study & image
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": item.title,
    "description": `รายงานบันทึกการขนย้ายจริงย่าน${item.broadArea} บริการ${serviceName} โดยทีมงาน WMS TRANSPORT`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.productionUrl}/portfolio/${slug}`
    },
    "author": {
      "@type": "Organization",
      "name": "WMS TRANSPORT",
      "@id": `${siteConfig.productionUrl}/#organization`
    },
    "publisher": {
      "@type": "Organization",
      "name": "WMS TRANSPORT",
      "@id": `${siteConfig.productionUrl}/#organization`,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.productionUrl}/images/logoWMS.webp`
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": `${siteConfig.productionUrl}${item.approvedPhotos[0]?.path}`,
      "name": item.approvedPhotos[0]?.alt,
      "description": item.title,
      "contentLocation": {
        "@type": "Place",
        "name": item.broadArea
      },
      "acquireLicensePage": `${siteConfig.productionUrl}/portfolio`
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      <main className="grow relative pt-12 pb-20">
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
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
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
            className="pt-2 pb-6"
          />

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
            
            {/* Left/Middle: Case details */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Photo Evidence with Next/Image */}
              <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-100 shadow-xs relative">
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
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
                
                <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-xs sm:text-sm text-slate-600 font-medium italic">
                  {item.approvedPhotos[0]?.alt}
                </div>
              </div>

              {/* Challenge block */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs">
                <h2 className="text-lg sm:text-xl font-extrabold text-navy border-b border-slate-100 pb-2.5">
                  โจทย์และความท้าทายของงาน (The Challenge)
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  {item.jobChallenge}
                </p>
              </div>

              {/* Process steps */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
                <h2 className="text-lg sm:text-xl font-extrabold text-navy border-b border-slate-100 pb-2.5">
                  ขั้นตอนการปฏิบัติงานของทีม WMS (The Process)
                </h2>
                <div className="space-y-3">
                  {item.process.map((step, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <span className="flex h-6 w-6 rounded-full bg-blue-100 text-blue-700 items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome block */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs">
                <h2 className="text-lg sm:text-xl font-extrabold text-navy border-b border-slate-100 pb-2.5">
                  ผลลัพธ์และความพึงพอใจ (The Outcome)
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  {item.outcome}
                </p>
              </div>

            </div>

            {/* Right Side: Metadata, score & CTA */}
            <div className="space-y-6">
              
              {/* Proof Score Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-xs flex flex-col justify-center items-center">
                <ShieldCheck className="h-10 w-10 text-emerald-600 mb-1.5" />
                <span className="text-[10px] text-slate-500 tracking-wider font-bold uppercase">PROVENANCE SCORE</span>
                <span className="text-3xl font-black text-emerald-600 my-1.5">{item.proofScore}/100</span>
                <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-55">
                  หลักฐานงานขนย้ายชิ้นนี้ได้รับการตรวจสอบความถูกต้องทางตำแหน่งและภาพถ่าย ไม่มีเจตนาบิดเบือนข้อมูลใดๆ
                </p>
              </div>

              {/* Authenticated Reviewer Card */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">การตรวจสอบและยืนยันข้อมูล</span>
                </div>
                <p className="text-xs text-slate-800 font-bold leading-snug">
                  ผู้บันทึกและตรวจสอบข้อมูลหน้างาน: <span className="text-blue-900">ทีมงานปฏิบัติการ WMS TRANSPORT</span>
                </p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  ตำแหน่ง: ฝ่ายควบคุมงานขนย้ายหน้างาน · ตรวจสอบเมื่อ: มิถุนายน 2569
                </p>
                <p className="text-[11px] text-slate-500 border-t border-slate-200/60 pt-2 leading-normal">
                  ภาพถ่ายของแท้ (<span className="font-mono">owned_by_wms</span>) บันทึกจากงานจริง ไม่ผ่านการตัดต่อ AI
                </p>
              </div>

              {/* Geo Entity Matrix connections */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
                <h3 className="text-navy font-bold text-sm border-b border-slate-100 pb-2">การเชื่อมโยงพื้นที่และบริการ</h3>
                
                <div className="space-y-2.5 text-xs font-medium text-slate-600">
                  <div className="flex justify-between items-center">
                    <span>ประเภทบริการ:</span>
                    <Link href={item.relatedServiceLink} className="text-blue-700 font-bold hover:underline">
                      {serviceName}
                    </Link>
                  </div>
                  {item.relatedDistrictLink && (
                    <div className="flex justify-between items-center">
                      <span>พื้นที่บริการย่อย:</span>
                      <Link href={item.relatedDistrictLink} className="text-blue-700 font-bold hover:underline">
                        เขต{item.broadArea.split(" ")[0]}
                      </Link>
                    </div>
                  )}
                  {item.relatedRouteLink && (
                    <div className="flex justify-between items-center">
                      <span>เส้นทางขนส่ง:</span>
                      <Link href={item.relatedRouteLink} className="text-blue-700 font-bold hover:underline">
                        เส้นทางหลัก
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Quote booking CTA */}
              <div className="bg-navy border border-blue-950 rounded-2xl p-6 text-center text-white space-y-4 shadow-md">
                <h4 className="text-white font-extrabold text-sm">ต้องการขนย้ายของลักษณะใกล้เคียงกัน?</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  ให้ทีมงานมืออาชีพของ WMS วางแผนจัดรถและคนช่วยยกที่พอดีกับของ เพื่อความประหยัดและความปลอดภัย
                </p>
                <div className="space-y-2.5">
                  <a
                    href={siteConfig.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors text-xs font-bold shadow-xs"
                  >
                    <Image src="/images/LINE_icon.webp" alt="LINE" width={16} height={16} className="shrink-0" />
                    <span>แชร์ภาพประเมินราคา (LINE)</span>
                  </a>
                  <a
                    href={siteConfig.phoneHref}
                    className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-blue-400" />
                    <span className="font-mono">{siteConfig.phone}</span>
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
