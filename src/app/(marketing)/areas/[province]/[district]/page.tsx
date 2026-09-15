import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  HelpCircle,
  Compass,
  Home,
  Bike,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import { buildDistrictMetadata } from "@/lib/seo/metadata";
import { getDistrictBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { escapeJsonLd } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import ServiceAreaPromoBanner from "@/components/service-area/ServiceAreaPromoBanner";
import CompactServiceSummary from "@/components/service-area/CompactServiceSummary";
import { provinceMap } from "../../../service/[province]/page";
import {
  districtLandingPages,
  isDistrictPageIndexable,
} from "@/data/districtLandingPages";

interface AreaPageProps {
  params: Promise<{
    province: string;
    district: string;
  }>;
}

export const dynamicParams = false;

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

  if (!record || record.province !== province || !provConfig || !isDistrictPageIndexable(record)) {
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

  if (!record || record.province !== province || !provConfig || !isDistrictPageIndexable(record)) {
    notFound();
  }

  const name = record.districtThaiName;
  const provThai = provConfig?.name ?? province;
  const provShort = provConfig?.shortName ?? province;

  // JSON-LD Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าหลัก",
        item: siteConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: provThai,
        item: `${siteConfig.baseUrl}/service/${province}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `เขต${name}`,
        item: `${siteConfig.baseUrl}/areas/${province}/${district}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.baseUrl}/areas/${province}/${district}#service`,
    name: `บริการรถรับจ้างขนของ เขต${name} WMS TRANSPORT`,
    description: record.directAnswer,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType: "Moving and Freight Transportation",
    areaServed: {
      "@type": "AdministrativeArea",
      name: `เขต${name}`,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: provThai,
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: record.localFaq.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const imageSchema = record.images?.[0]
    ? {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        contentUrl: `${siteConfig.baseUrl}${record.images[0].path}`,
        description: record.images[0].alt,
        caption: record.images[0].caption,
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans text-slate-900">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(breadcrumbSchema)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(serviceSchema)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(faqSchema)) }}
      />
      {imageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(imageSchema)) }}
        />
      )}

      <main className="grow relative pt-24 pb-20 md:pt-28 md:pb-28">
        {/* Ambient subtle light background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-6">
            <Breadcrumbs
              items={getDistrictBreadcrumbs(provThai, province, `เขต${name}`, district)}
            />
          </div>

          {/* Hero Header */}
          <section className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>พื้นที่บริการย่อย · เขต{name} ({provShort})</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              {record.h1}
            </h1>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs text-left">
              <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>ข้อมูลสรุปการบริการเขต{name}</span>
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                {record.directAnswer}
              </p>
            </div>
          </section>

          {/* Promotional Showcase Banner */}
          <ServiceAreaPromoBanner areaName={`เขต${name}`} />

          {/* Compact Local Service Summary */}
          <CompactServiceSummary
            locationName={`เขต${name}`}
            serviceAreas={[
              ...(record.subdistricts || []).slice(0, 2).map((s) => `แขวง${s}`),
              ...(record.travelCorridors || []).slice(0, 3),
            ]}
            services={[
              `ย้ายบ้าน คอนโด ${name}`,
              `ขนส่งมอเตอร์ไซค์ ${name}`,
              "รถกระบะขนส่งสินค้า",
            ]}
          />

          {/* Sub-Services in this district */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 text-center mb-6">
              บริการขนย้ายที่พร้อมให้บริการในเขต{name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold mb-3">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">
                  ย้ายบ้าน คอนโด ทาวน์โฮม
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  บริการย้ายที่อยู่อาศัยพร้อมทีมงานช่วยยกของ แรปฟิล์มป้องกันรอย และจัดเรียงสัมภาระอย่างเป็นระบบ
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold mb-3">
                  <Bike className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">
                  ขนส่งมอเตอร์ไซค์ บิ๊กไบค์
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ขนส่งในตู้ทึบมิดชิด รัดตรึงด้วยสายรัด Ratchet Strap ป้องกันการล้มและริ้วรอยตลอดเส้นทาง
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold mb-3">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">
                  ขนส่งสินค้า เหมาเที่ยว
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  รถกระบะตู้ทึบรับส่งสินค้าทั่วไป อุปกรณ์สำนักงาน สินค้าโรงงาน กระจายสู่ทุกจังหวัด
                </p>
              </div>
            </div>
          </section>

          {/* Main 2-Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
            {/* Left Column (2 Cols): Logistics and Context */}
            <div className="lg:col-span-2 space-y-8">
              {/* Local Logistics & Road Corridors */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2.5">
                  <MapPin className="text-blue-600 h-6 w-6 shrink-0" />
                  <span>ข้อมูลวิเคราะห์โลจิสติกส์และการเดินทางเขต{name}</span>
                </h2>

                <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  {/* Subdistricts */}
                  {record.subdistricts && record.subdistricts.length > 0 && (
                    <div>
                      <h3 className="text-slate-900 font-bold text-base mb-2">
                        แขวงการปกครองอย่างเป็นทางการในเขต{name}:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {record.subdistricts.map((sub, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-md font-medium"
                          >
                            แขวง{sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Travel Corridors */}
                  <div>
                    <h3 className="text-slate-900 font-bold text-base mb-2">
                      เส้นทางคมนาคมหลักที่ทีมงานใช้สัญจร:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {record.travelCorridors.map((c, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full font-bold"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Operational Notes */}
                  <div>
                    <h3 className="text-slate-900 font-bold text-base mb-2">
                      สภาพการเข้าถึงและข้อจำกัดหน้างาน:
                    </h3>
                    <p className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {record.localOperationalNotes}
                    </p>
                  </div>

                  {/* Property Access */}
                  <div>
                    <h3 className="text-slate-900 font-bold text-base mb-2">
                      การเข้าถึงประเภทอาคารและข้อกำหนดความสูง:
                    </h3>
                    <p className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {record.propertyAccessContext}
                    </p>
                  </div>

                  {/* Property Types */}
                  {record.propertyTypes && record.propertyTypes.length > 0 && (
                    <div>
                      <h3 className="text-slate-900 font-bold text-base mb-2">
                        ประเภทอสังหาริมทรัพย์ที่ให้บริการเป็นประจำ:
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                        {record.propertyTypes.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Evaluation & Pricing Factors */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2.5">
                  <CheckCircle2 className="text-blue-600 h-6 w-6 shrink-0" />
                  <span>เกณฑ์การประเมินราคาและขั้นตอนประเมินงาน</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  WMS TRANSPORT ประเมินค่าบริการตามข้อเท็จจริงของหน้างานโดยไม่มีการคิดค่าธรรมเนียมแอบแฝง:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {record.jobEvaluationFactors.map((factor, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-500 bg-blue-50/60 border border-blue-200/60 p-3 rounded-lg">
                  💡 สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่เพื่อรับใบเสนอราคาล่วงหน้าฟรี
                </div>
              </div>

              {/* Real Evidence Photos */}
              {record.images && record.images.length > 0 && (
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
                    หลักฐานผลงานจริงในพื้นที่เขต{name}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {record.images.map((img, i) => (
                      <div
                        key={i}
                        className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
                      >
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
                          <p className="text-xs text-blue-600 font-bold mb-1">
                            งานขนย้ายในเขต{name}
                          </p>
                          <h3 className="text-slate-900 font-bold text-sm mb-1.5">
                            {img.caption}
                          </h3>
                          <p className="text-xs text-slate-500">
                            ตรวจสอบความถูกต้องและอนุมัติความปลอดภัยเรียบร้อย
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="border border-slate-200 rounded-xl p-6 flex flex-col justify-center items-center text-center bg-emerald-50/60">
                      <ShieldCheck className="h-10 w-10 text-emerald-600 mb-3" />
                      <h3 className="text-emerald-950 font-bold text-sm mb-1">
                        คะแนนความพร้อมและหลักฐานงาน
                      </h3>
                      <span className="text-3xl font-black text-emerald-700">
                        {record.proofScore}/100
                      </span>
                      <p className="text-xs text-slate-600 mt-2 max-w-[200px]">
                        ผ่านเกณฑ์การตรวจสอบหลักฐานผลงานและการปฏิบัติงานจริง
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Local FAQs */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
                  คำถามที่พบบ่อยของเขต{name}
                </h2>
                <div className="space-y-3.5">
                  {record.localFaq.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4.5"
                    >
                      <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1.5 flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{faq.q}</span>
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium pl-6">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: CTA & Contextual Links */}
            <div className="space-y-6 lg:sticky lg:top-28">
              {/* Booking CTA Card */}
              <div className="bg-[#0B1F3A] border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-md text-white">
                <h2 className="text-xl font-black text-white mb-2">จองรถขนย้ายเขต{name}</h2>
                <p className="text-xs text-blue-100/80 leading-relaxed mb-6 font-medium">
                  ประเมินราคาตามจริง รวดเร็ว คุยง่าย พนักงานขับรถชำนาญเส้นทาง{name} พร้อมทีมงานช่วยยกของ
                </p>

                <div className="space-y-3">
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-sm font-bold shadow-sm"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt="LINE"
                      width={18}
                      height={18}
                      className="shrink-0"
                    />
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

              {/* Hub Navigation Link */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                <h3 className="text-slate-900 font-bold text-sm mb-3 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>ศูนย์รวมข้อมูลฝั่งธนบุรี</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  สำรวจภาพรวมการขนย้ายทั้ง 15 เขต และข้อกำหนดความสูงรถของฝั่งธนบุรี
                </p>
                <Link
                  href="/service/bkk-thonburi"
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>กลับไปยังหน้าหลักฝั่งธนบุรี</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Neighboring District Links */}
              {record.nearbyDistrictSlugs && record.nearbyDistrictSlugs.length > 0 && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                  <h3 className="text-slate-900 font-bold text-sm mb-3 border-b border-slate-100 pb-2">
                    พื้นที่ใกล้เคียงที่เกี่ยวข้อง
                  </h3>
                  <div className="flex flex-col gap-2">
                    {record.nearbyDistrictSlugs.map((slug) => {
                      const nearby = districtLandingPages[slug];
                      if (!nearby) return null;
                      const isPublished = isDistrictPageIndexable(nearby);
                      return (
                        <div key={slug}>
                          {isPublished ? (
                            <Link
                              href={`/areas/${nearby.province}/${slug}`}
                              className="text-xs font-semibold text-slate-700 hover:text-blue-600 p-2 hover:bg-blue-50/50 rounded-lg transition-colors flex items-center justify-between"
                            >
                              <span>เขต{nearby.districtThaiName}</span>
                              <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            </Link>
                          ) : (
                            <div className="text-xs text-slate-500 p-2 flex items-center justify-between">
                              <span>เขต{nearby.districtThaiName}</span>
                              <span className="text-[10px] text-slate-400">(ครอบคลุมบริการ)</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Service links */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                <h3 className="text-slate-900 font-bold text-sm mb-4 border-b border-slate-100 pb-2">
                  บริการย่อยที่เกี่ยวข้อง
                </h3>
                <div className="flex flex-col gap-1.5">
                  <Link
                    href={`/service/${province}/moving`}
                    className="text-xs font-semibold text-slate-700 hover:text-blue-600 p-2 hover:bg-blue-50/50 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>ย้ายบ้าน คอนโด หอพัก {name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  </Link>
                  <Link
                    href={`/service/${province}/motorcycle`}
                    className="text-xs font-semibold text-slate-700 hover:text-blue-600 p-2 hover:bg-blue-50/50 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ {name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  </Link>
                  <Link
                    href={`/service/${province}/freight`}
                    className="text-xs font-semibold text-slate-700 hover:text-blue-600 p-2 hover:bg-blue-50/50 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>รถกระบะรับจ้างขนส่งสินค้า {name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Last-Reviewed Note */}
              <div className="text-[11px] text-slate-400 text-center">
                ตรวจสอบความถูกต้องข้อมูลล่าสุด: {record.lastReviewedDate}
              </div>
            </div>
          </div>
        </div>
      </main>
      <InternalLinks currentCategory="area" currentSlug={district} />
    </div>
  );
}
