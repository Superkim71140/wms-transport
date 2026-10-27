import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Truck,
  ArrowRight,
  Compass,
  CheckCircle2,
  ChevronRight,
  FileText,
  Boxes,
  ChevronDown,
} from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";
import { escapeJsonLd } from "@/lib/seo/schema";
import ServiceAreaQuoteBanner from "./ServiceAreaQuoteBanner";
import ServiceContactBanner from "./ServiceContactBanner";
import ServiceAreaFAQ from "./ServiceAreaFAQ";
import TwoToneHeading from "./TwoToneHeading";
import type { ZoneHubItem, LocalPointItem } from "@/data/areaZonesData";

const ZONE_HERO_IMAGES: Record<string, { src: string; alt: string; caption: string }> = {
  "maha-chai": {
    src: "/images/WM8.webp",
    alt: "รถกระบะตู้ทึบ WMS จอดเทียบจุดบริการโซนมหาชัย เมืองสมุทรสาคร เชื่อมต่อถนนพระราม 2",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS ประจำจุดบริการโซนมหาชัย สมุทรสาคร (ศูนย์กลางพระราม 2)",
  },
  "krathumbaen-omnoi": {
    src: "/images/WM14.webp",
    alt: "รถกระบะตู้ทึบ WMS ขนส่งสินค้าโรงงานและย้ายบ้านโซนกระทุ่มแบน อ้อมน้อย",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS บริการขนส่งสินค้าโรงงานและที่พักอาศัยโซนกระทุ่มแบน-อ้อมน้อย",
  },
  "rama2-bangkradi": {
    src: "/images/WM11.webp",
    alt: "รถกระบะตู้ทึบ WMS สแตนด์บายรับงานขนย้ายบนเส้นทางพระราม 2 บางกระดี่",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS สแตนด์บายบนแนวเส้นทางถนนพระราม 2 และบางกระดี่",
  },
  "bangbon-ekachai": {
    src: "/images/WM16.webp",
    alt: "รถกระบะตู้ทึบ WMS จัดเรียงสิ่งของและยานพาหนะบริการโซนบางบอน เอกชัย",
    caption: "ภาพงานจริง: จัดเรียงสิ่งของเครื่องใช้และรถมอเตอร์ไซค์ในตู้ทึบอย่างมิดชิดโซนบางบอน-เอกชัย",
  },
  "nongkhaem-phetkasem81": {
    src: "/images/WM15.webp",
    alt: "รถกระบะตู้ทึบ WMS จัดเรียงสิ่งของและเฟอร์นิเจอร์บริการขนย้ายโซนหนองแขม เพชรเกษม 81",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS จัดเรียงสัมภาระเต็มคันบริการขนย้ายโซนหนองแขม เพชรเกษม 81",
  },
  "bang-khae": {
    src: "/images/WM10.webp",
    alt: "ทีมงาน WMS ขนย้ายคอนโดและที่พักอาศัยโซนบางแค เพชรเกษม",
    caption: "ภาพงานจริง: ทีมงาน WMS บริการขนย้ายคอนโดและที่พักอาศัยโซนบางแค-เพชรเกษม",
  },
  "phutthamonthon-sai-1-4": {
    src: "/images/WM12.webp",
    alt: "รถกระบะตู้ทึบ WMS พร้อมสะพานลาดอลูมิเนียมบริการโซนพุทธมณฑล ศาลายา",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS พร้อมสะพานลาดขึ้นของบริการโซนพุทธมณฑล ศาลายา",
  },
};

interface ZoneHubViewProps {
  zone: ZoneHubItem;
  localPoints: LocalPointItem[];
}

export default function ZoneHubView({ zone, localPoints }: ZoneHubViewProps) {
  const zoneHeroImage = ZONE_HERO_IMAGES[zone.slug] || {
    src: "/images/WM15.webp",
    alt: `รถกระบะตู้ทึบ WMS ประจำจุดบริการโซน ${zone.thaiName}`,
    caption: `ภาพงานจริง: รถกระบะตู้ทึบ WMS ประจำจุดบริการโซน ${zone.thaiName}`,
  };


  // Breadcrumb Schema
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
        name: "พื้นที่บริการ",
        item: `${siteConfig.baseUrl}/areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: zone.thaiName,
        item: `${siteConfig.baseUrl}/areas/${zone.slug}`,
      },
    ],
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.baseUrl}/areas/${zone.slug}#service`,
    name: `บริการรถรับจ้าง โซน${zone.thaiName} WMS TRANSPORT`,
    description: zone.description,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType: "Moving and Freight Transportation",
    areaServed: {
      "@type": "AdministrativeArea",
      name: zone.thaiName,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `บริการรถรับจ้างในโซน${zone.thaiName}`,
      itemListElement: zone.serviceScope.map((s, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.desc,
        },
        position: idx + 1,
      })),
    },
  };

  // ItemList Schema for local points
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `จุดบริการรถรับจ้างในโซน${zone.thaiName}`,
    itemListElement: localPoints.map((pt, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${pt.thaiName} - ${pt.primaryKeyword}`,
      url: `${siteConfig.baseUrl}${pt.preferredUrl}`,
    })),
  };

  return (
    <>
      {/* Structured Data */}
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
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(itemListSchema)) }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-800">
        {/* ── Breadcrumb Navigation ── */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 pt-[calc(var(--site-header-offset)+0.5rem)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 flex-wrap">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  หน้าหลัก
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-slate-400" /></li>
              <li>
                <Link href="/areas" className="hover:text-blue-600 transition-colors">
                  พื้นที่บริการ
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-slate-400" /></li>
              <li className="font-semibold text-slate-900 truncate" aria-current="page">
                {zone.thaiName}
              </li>
            </ol>
          </div>
        </nav>

        {/* ── Hero Section (Deep Navy Reference #07152F with 2-Column Balanced Layout) ── */}
        <section
          className="w-full text-white relative overflow-hidden py-10 sm:py-16"
          style={{
            backgroundColor: "#07152F",
            backgroundImage:
              "radial-gradient(ellipse 65% 55% at 85% 15%, rgba(56, 189, 248, 0.12), transparent)",
            borderBottom: "1px solid rgba(30, 41, 59, 0.8)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (55% desktop balance): Text & Actions */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-medium mb-4">
                  <Compass className="w-4 h-4 text-sky-400" />
                  <span>โซนบริการที่ {zone.zoneNumber} • WMS TRANSPORT</span>
                </div>
                <TwoToneHeading
                  as="h1"
                  text={zone.h1}
                  highlight={zone.thaiName}
                  variant="dark"
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4"
                  highlightClassName="text-sky-300 font-black"
                />
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 font-normal">
                  {zone.intro}
                </p>

                {/* Quick Status Chips */}
                <div className="flex flex-wrap gap-2.5 mb-8 text-xs sm:text-sm">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-200">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    {localPoints.length} พื้นที่บริการย่อย
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-200">
                    <Clock className="w-4 h-4 text-amber-400" />
                    จองคิวรถตรงเวลา
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-200">
                    <Truck className="w-4 h-4 text-sky-400" />
                    ตู้ทึบมิดชิด ป้องกันฝุ่นและละอองฝน
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    ประเมินราคาตามระยะทางจริง
                  </span>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm sm:text-base shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Phone className="w-4 h-4 text-sky-400" />
                    <span>โทรประเมินราคา {siteConfig.phone}</span>
                  </a>
                  <a
                    href={siteConfig.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-[0.98]"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                    <span>แอด LINE ประเมินราคาฟรี</span>
                  </a>
                </div>
              </div>

              {/* Right Column (45% desktop balance): Semantic Figure / Figcaption in Opaque Card */}
              <div className="lg:col-span-5">
                <div className="relative group">
                  {/* Soft blue glow behind image */}
                  <div
                    className="absolute -inset-2 rounded-3xl bg-sky-500/15 blur-xl pointer-events-none"
                    aria-hidden="true"
                  />
                  <figure className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-[#0B2444] border border-sky-400/25 flex flex-col m-0">
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-slate-900 overflow-hidden">
                      <Image
                        src={zoneHeroImage.src}
                        alt={zoneHeroImage.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 520px"
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                    {/* Readable opaque navy caption surface in normal document flow */}
                    <figcaption className="px-4 py-3 sm:px-5 sm:py-3.5 bg-[#0B2444] border-t border-sky-400/20 text-slate-200 text-xs sm:text-sm leading-relaxed flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 inline-block" aria-hidden="true" />
                      <span className="font-medium">{zoneHeroImage.caption}</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main Content Container ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
          {/* ── 1. Zone Overview ── */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <TwoToneHeading
                  as="h2"
                  text={`ภาพรวมโครงข่ายโลจิสติกส์โซน ${zone.thaiName}`}
                  highlight={zone.thaiName}
                  variant="light"
                  className="text-xl sm:text-2xl font-bold text-slate-900"
                  highlightClassName="text-blue-600 font-black"
                />
                <p className="text-sm text-slate-500">
                  โครงสร้างเส้นทางและลักษณะงานขนส่งเฉพาะพื้นที่
                </p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-6">
              {zone.overview}
            </p>

            <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
                จุดบริการและชุมชนสำคัญในโซนนี้
              </h3>
              <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
                {zone.coveragePointsSummary}
              </p>
            </div>
          </section>

          {/* ── Contact Banner matching Screenshot 1 ── */}
          <ServiceContactBanner areaName={`โซน${zone.thaiName}`} className="my-8" />

          {/* ── 2. Local Points Grid (10 Local Pages) ── */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>พื้นที่ให้บริการในโซนนี้</span>
                </div>
                <TwoToneHeading
                  as="h2"
                  text={`เลือกพื้นที่ให้บริการ (${localPoints.length} พื้นที่)`}
                  highlight={`(${localPoints.length} พื้นที่)`}
                  variant="light"
                  className="text-xl sm:text-2xl font-bold text-slate-900"
                  highlightClassName="text-blue-600 font-black"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                คลิกดูข้อมูลเส้นทาง ข้อจำกัดทางเข้า และคำแนะนำใบเสนอราคาเฉพาะจุด
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {localPoints.map((point) => (
                <Link
                  key={point.pointId}
                  href={point.preferredUrl}
                  className="group relative bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        พื้นที่ที่ {point.pointId}
                      </span>
                      {point.action === "existing_reused" && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          หน้าหลักเขต
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                      {point.thaiName}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-2.5">
                      {point.disambiguation}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {point.directAnswer}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>ดูรายละเอียดพื้นที่บริการ</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── 3. Service Scope ── */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <TwoToneHeading
              as="h2"
              text="บริการรถรับจ้างหลักที่ เปิดให้บริการในโซนนี้"
              highlight="เปิดให้บริการในโซนนี้"
              variant="light"
              className="text-xl sm:text-2xl font-bold text-slate-900 mb-6"
              highlightClassName="text-blue-600 font-black"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {zone.serviceScope.map((scope, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-200 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3 text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {scope.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {scope.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 4. Quotation Preparation Guide (Progressive Disclosure) ── */}
          <section className="bg-blue-50/60 rounded-2xl p-6 sm:p-8 border border-blue-100">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-1">
                <FileText className="w-5 h-5 text-blue-600" />
                <TwoToneHeading
                  as="h2"
                  text={`คำแนะนำในการเตรียมข้อมูลเพื่อ ขอใบเสนอราคา (โซน ${zone.thaiName})`}
                  highlight="ขอใบเสนอราคา"
                  variant="light"
                  className="text-lg sm:text-xl font-bold text-slate-900"
                  highlightClassName="text-blue-600 font-black"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                เพื่อให้เจ้าหน้าที่ WMS TRANSPORT สามารถคำนวณราคาได้อย่างถูกต้อง รวดเร็ว และไม่มีค่าใช้จ่ายแอบแฝง
              </p>
            </div>

            <details className="group bg-white rounded-2xl border border-blue-200/80 transition-all duration-200 overflow-hidden open:shadow-xs">
              <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none hover:bg-slate-50 transition-colors font-bold text-xs sm:text-sm text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                <span>ดูข้อแนะนำการเตรียมข้อมูล ({zone.quotationNotes.length} ข้อ)</span>
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/80 transition-colors">
                  <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" />
                </div>
              </summary>
              <div className="p-4 sm:p-5 pt-2 border-t border-blue-100 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {zone.quotationNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-slate-50/70 rounded-xl border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </section>

          {/* ── Approved Service-Confidence Banner (Positioned immediately above work gallery) ── */}
          <ServiceAreaQuoteBanner
            areaName={`โซน${zone.thaiName}`}
            className="my-8"
            quoteHref="/pricing"
            servicesHref="/#services"
          />

          {/* ── 6. Authentic Evidence Showcase (ภาพรถและตัวอย่างผลงาน WMS TRANSPORT) ── */}
          <section id="evidence" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="mb-6">
              <TwoToneHeading
                as="h2"
                text="ภาพตัวอย่างงานขนส่งจริง WMS TRANSPORT"
                highlight="WMS TRANSPORT"
                variant="light"
                className="text-xl sm:text-2xl font-bold text-slate-900 mb-2"
                highlightClassName="text-blue-600 font-black"
              />
              <p className="text-sm text-slate-600">
                ตัวอย่างการทำงานจริงของกองรถกระบะตู้ทึบ การล็อกสินค้า และทีมงานขนย้ายมืออาชีพ
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs flex flex-col m-0">
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/WM8.webp"
                    alt="รถกระบะตู้ทึบ WMS ประจำที่โรงงานขนส่งกล่องสินค้า"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 text-xs sm:text-sm text-slate-600 flex-1 bg-slate-50 border-t border-slate-100">
                  <strong className="block text-slate-900 mb-1 text-sm sm:text-base font-bold">งานขนส่งสินค้าโรงงานและโกดัง</strong>
                  รถกระบะตอนเดียวตู้ทึบสแตนเลส ปิดมิดชิด ป้องกันแดดและฝนอย่างมั่นใจ
                </figcaption>
              </figure>
              <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs flex flex-col m-0">
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/WM10.webp"
                    alt="ทีมงาน WMS แรปฟิล์มกันรอยเฟอร์นิเจอร์คอนโด"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 text-xs sm:text-sm text-slate-600 flex-1 bg-slate-50 border-t border-slate-100">
                  <strong className="block text-slate-900 mb-1 text-sm sm:text-base font-bold">งานขนย้ายคอนโดและบ้านพัก</strong>
                  บริการแพ็กกิ้ง แรปฟิล์มกันรอย และทีมงานช่วยยกของขึ้นลงอาคาร
                </figcaption>
              </figure>
              <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs flex flex-col m-0">
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/WM11.webp"
                    alt="การจัดตรึงและล็อกล้อมอเตอร์ไซค์บิ๊กไบค์ในตู้ทึบ"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 text-xs sm:text-sm text-slate-600 flex-1 bg-slate-50 border-t border-slate-100">
                  <strong className="block text-slate-900 mb-1 text-sm sm:text-base font-bold">งานส่งรถมอเตอร์ไซค์ทั่วไทย</strong>
                  อุปกรณ์ Wheel Chock ล็อกล้อหน้าและสายรัด Ratchet Strap 4 ทิศทาง
                </figcaption>
              </figure>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 text-center">
              * ภาพถ่ายจริงจากบันทึกงานของ WMS TRANSPORT เพื่อแสดงมาตรฐานอุปกรณ์และความพร้อมในการให้บริการ
            </p>
          </section>

          {/* ── 7. Nearby Zones Navigation ── */}
          <section className="bg-slate-100/80 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <TwoToneHeading
              as="h2"
              text="โซนบริการข้างเคียงที่ เชื่อมต่อกัน"
              highlight="เชื่อมต่อกัน"
              variant="light"
              className="text-lg sm:text-xl font-bold text-slate-900 mb-2"
              highlightClassName="text-blue-600 font-black"
            />
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              โครงข่ายเส้นทางที่รถรับจ้าง WMS สามารถวิ่งเชื่อมต่อได้อย่างรวดเร็ว
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {zone.nearbyZones.map((nearby, idx) => (
                <Link
                  key={idx}
                  href={`/areas/${nearby.slug}`}
                  className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-blue-600">
                      โซนข้างเคียง
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {nearby.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {nearby.reason}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── 8. Zone FAQs (Reference 2 Styling - Positioned at Bottom) ── */}
          <ServiceAreaFAQ
            thaiName={`โซน${zone.thaiName}`}
            isFullWidthSection={true}
          />

          {/* ── 9. Bottom Directory Link ── */}
          <section className="text-center py-6">
            <Link
              href="/areas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>กลับสู่สารบัญพื้นที่บริการทั้งหมด (Area Directory)</span>
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
