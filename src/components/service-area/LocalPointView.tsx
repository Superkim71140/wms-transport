"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  FileText,
  AlertTriangle,
  ParkingCircle,
  ArrowUpDown,
  MessageCircle
} from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";
import { escapeJsonLd } from "@/lib/seo/schema";
import TwoToneHeading from "./TwoToneHeading";
import ServiceAreaQuoteBanner from "./ServiceAreaQuoteBanner";
import QuotationPlanner from "./QuotationPlanner";
import type { ZoneHubItem, LocalPointItem } from "@/data/areaZonesData";

const POINT_HERO_IMAGES: Record<string, { src: string; alt: string; caption: string; focalPoint?: string }> = {
  "maha-chai": {
    src: "/images/WM8.webp",
    alt: "รถกระบะตู้ทึบ WMS ประจำจุดบริการโซนมหาชัย สมุทรสาคร",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS ปฏิบัติงานในพื้นที่โซนมหาชัย สมุทรสาคร",
    focalPoint: "object-[center_35%]",
  },
  "krathumbaen-omnoi": {
    src: "/images/WM14.webp",
    alt: "รถกระบะตู้ทึบ WMS ขนส่งสินค้าโรงงานและย้ายบ้านโซนกระทุ่มแบน อ้อมน้อย",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS บริการขนส่งสินค้าโรงงานโซนกระทุ่มแบน-อ้อมน้อย",
  },
  "rama2-bangkradi": {
    src: "/images/WM11.webp",
    alt: "รถกระบะตู้ทึบ WMS สแตนด์บายรับงานขนย้ายถนนพระราม 2 บางกระดี่",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS สแตนด์บายบนแนวเส้นทางถนนพระราม 2 และบางกระดี่",
  },
  "bangbon-ekachai": {
    src: "/images/WM16.webp",
    alt: "รถกระบะตู้ทึบ WMS จัดเรียงสิ่งของและยานพาหนะบริการโซนบางบอน เอกชัย",
    caption: "ภาพงานจริง: จัดเรียงสิ่งของและยานพาหนะในตู้ทึบมิดชิดโซนบางบอน-เอกชัย",
  },
  "nongkhaem-phetkasem81": {
    src: "/images/WM15.webp",
    alt: "รถกระบะตู้ทึบ WMS ขนย้ายสิ่งของโซนหนองแขม เพชรเกษม 81",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS ขนย้ายสิ่งของโซนหนองแขม เพชรเกษม 81",
    focalPoint: "object-[center_35%]",
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

interface LocalPointViewProps {
  point: LocalPointItem;
  zone: ZoneHubItem;
}

export default function LocalPointView({ point, zone }: LocalPointViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const pointHeroImage = POINT_HERO_IMAGES[zone.slug] || {
    src: "/images/WM15.webp",
    alt: `รถกระบะตู้ทึบ WMS พร้อมให้บริการงานขนย้ายทั่วไป`,
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS พร้อมให้บริการงานขนย้ายทั่วไป (ภาพมาตรฐานบริการ)",
    focalPoint: "object-[center_35%]",
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // 1. Breadcrumb Schema
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
      {
        "@type": "ListItem",
        position: 4,
        name: point.thaiName,
        item: `${siteConfig.baseUrl}${point.preferredUrl}`,
      },
    ],
  };

  // 2. Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.baseUrl}${point.preferredUrl}#service`,
    name: `${point.primaryKeyword} WMS TRANSPORT`,
    description: point.directAnswer,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType: "Moving and Freight Transportation",
    areaServed: {
      "@type": "AdministrativeArea",
      name: point.thaiName,
      description: point.disambiguation,
    },
  };

  // 3. FAQ Schema
  const faqSchema = point.localFaqs && point.localFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: point.localFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(breadcrumbSchema)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(serviceSchema)) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(faqSchema)) }}
        />
      )}

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24 md:pb-12">
        {/* ── A. Breadcrumb Navigation ── */}
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
              <li>
                <Link href={`/areas/${zone.slug}`} className="hover:text-blue-600 transition-colors truncate max-w-[160px] sm:max-w-none">
                  {zone.thaiName}
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-slate-400" /></li>
              <li className="font-semibold text-slate-900 truncate" aria-current="page">
                {point.thaiName}
              </li>
            </ol>
          </div>
        </nav>

        {/* ── B & C. Hero Surface: Deep Navy Reference #07152F with 2-Column Balanced Layout ── */}
        <header
          className="w-full text-white relative overflow-hidden py-8 sm:py-12"
          style={{
            backgroundColor: "#07152F",
            backgroundImage:
              "radial-gradient(ellipse 65% 55% at 85% 15%, rgba(56, 189, 248, 0.12), transparent)",
            borderBottom: "1px solid rgba(30, 41, 59, 0.8)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column (58% desktop): Text, Answers & CTAs */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-medium mb-3">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>พื้นที่ให้บริการ • โซน {zone.thaiName}</span>
                </div>

                {/* B. Clear H1 with Two-Tone Location Accent */}
                <TwoToneHeading
                  as="h1"
                  text={point.h1}
                  highlightPhrase={[point.thaiName, point.primaryKeyword]}
                  variant="dark"
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight mb-3"
                  highlightClassName="text-sky-300 font-black"
                />

                <p className="text-xs sm:text-sm text-slate-300 mb-6 font-normal">
                  ขอบเขตพื้นที่บริการ: <span className="text-white font-medium">{point.disambiguation}</span>
                </p>

                {/* C. Direct Answer Summary Surface */}
                <div className="bg-[#0B2444]/90 border border-sky-400/20 rounded-2xl p-5 sm:p-6 mb-7 shadow-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <TwoToneHeading
                        as="h2"
                        text={`ข้อมูลสรุปบริการรถรับจ้าง ${point.thaiName}`}
                        highlightPhrase={point.thaiName}
                        variant="dark"
                        className="text-sm sm:text-base font-bold text-white mb-1.5"
                        highlightClassName="text-sky-300 font-bold"
                      />
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                        {point.directAnswer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* D & E. Primary & Secondary CTAs (min 48px touch targets) */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={siteConfig.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-[0.98]"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                    <span>ส่งรูปประเมินราคาทาง LINE</span>
                  </a>
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm sm:text-base shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>โทรสอบถามคิวรถ {siteConfig.phone}</span>
                  </a>
                </div>
              </div>

              {/* Right Column (42% desktop): Semantic Figure / Figcaption in Opaque Card */}
              <div className="lg:col-span-5">
                <div className="relative group">
                  <div
                    className="absolute -inset-1.5 rounded-3xl bg-sky-500/15 blur-xl pointer-events-none"
                    aria-hidden="true"
                  />
                  <figure className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-[#0B2444] border border-sky-400/25 flex flex-col m-0">
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-slate-900 overflow-hidden">
                      <Image
                        src={pointHeroImage.src}
                        alt={pointHeroImage.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className={`object-cover ${pointHeroImage.focalPoint || "object-center"} w-full h-full`}
                      />
                    </div>
                    {/* Readable opaque navy caption surface in normal document flow */}
                    <figcaption className="px-4 py-3 sm:px-5 sm:py-3.5 bg-[#0B2444] border-t border-sky-400/20 text-slate-200 text-xs sm:text-sm leading-relaxed flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 inline-block" aria-hidden="true" />
                      <span className="font-medium">{pointHeroImage.caption}</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── In-Page Navigation Menu (Non-sticky on mobile to prevent obstruction; sticky below header on sm+) ── */}
        <div className="static sm:sticky sm:top-[calc(var(--site-header-offset)+8px)] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            {/* Mobile: Compact topic selector */}
            <details className="sm:hidden group">
              <summary className="flex items-center justify-between text-xs font-semibold text-slate-700 py-1 cursor-pointer list-none select-none">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>เลือกหัวข้อในหน้านี้</span>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="flex flex-wrap gap-1.5 pt-2 pb-1 border-t border-slate-100 mt-1">
                <a href="#overview" className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs">ภาพรวม</a>
                <a href="#services" className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs">บริการที่รองรับ</a>
                <a href="#access" className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs">ทางเข้าและจุดจอด</a>
                <a href="#quotation-planner" className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium">คำนวณราคา</a>
                <a href="#evidence" className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs">ภาพมาตรฐานรถ</a>
                <a href="#nearby" className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs">พื้นที่ใกล้เคียง</a>
                <a href="#faqs" className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs">คำถามพบบ่อย</a>
              </div>
            </details>

            {/* Desktop / Tablet horizontal links */}
            <nav aria-label="In-page jump menu" className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar text-xs sm:text-sm">
              <span className="text-slate-400 font-medium shrink-0 mr-1">นำทางในหน้านี้:</span>
              <a href="#overview" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium shrink-0 transition-colors">
                ภาพรวมพื้นที่
              </a>
              <a href="#services" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium shrink-0 transition-colors">
                บริการที่รองรับ
              </a>
              <a href="#access" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium shrink-0 transition-colors">
                ทางเข้าและจุดจอด
              </a>
              <a href="#quotation-planner" className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-medium shrink-0 border border-blue-200">
                คำนวณขอราคาด่วน
              </a>
              <a href="#evidence" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium shrink-0 transition-colors">
                ภาพมาตรฐานรถ
              </a>
              <a href="#nearby" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium shrink-0 transition-colors">
                พื้นที่ใกล้เคียง
              </a>
              <a href="#faqs" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium shrink-0 transition-colors">
                คำถามพบบ่อย
              </a>
            </nav>
          </div>
        </div>

        {/* ── Main Content Container ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
          {/* ── F. Section 1: Local Logistics Context & Readiness ── */}
          <section id="overview" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs scroll-mt-20">
            <TwoToneHeading
              as="h2"
              text={`ลักษณะพื้นที่และการคมนาคมในย่าน ${point.thaiName}`}
              highlightPhrase={point.thaiName}
              variant="light"
              className="text-xl sm:text-2xl font-bold text-slate-900 mb-3"
            />
            <p className="text-base text-slate-700 leading-relaxed mb-6">
              {point.localContext}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>สังกัดโซน: <strong className="text-slate-900">{zone.thaiName}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>ประเภทรถ: <strong className="text-slate-900">กระบะตู้ทึบ 4 ล้อ (ไม่ติดเวลา)</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>การนัดหมาย: <strong className="text-slate-900">จองคิวล่วงหน้า / สอบถามคิวรอบวัน</strong></span>
              </div>
            </div>
          </section>

          {/* ── F. Section 2: Actual Supported Job Types ── */}
          <section id="services" className="scroll-mt-20">
            <div className="mb-6">
              <TwoToneHeading
                as="h2"
                text={`บริการขนย้ายที่รองรับในพื้นที่ ${point.thaiName}`}
                highlightPhrase={point.thaiName}
                variant="light"
                className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5"
              />
              <p className="text-sm text-slate-600">
                บริการขนย้ายที่พร้อมให้บริการตามขนาดรถและเส้นทางที่ยืนยันแล้ว
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {point.verifiedServices.map((svc, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/90 hover:border-blue-300 transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {svc.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pl-10">
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── G & H. Interactive Quotation Preparation Component ── */}
          <QuotationPlanner areaName={point.thaiName} />

          {/* ── I. Section 4: Verified Local Pickup, Access, and Loading Guidance ── */}
          <section id="access" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs scroll-mt-20">
            <TwoToneHeading
              as="h2"
              text={`ข้อควรตรวจสอบ: ทางเข้า จุดจอดรถ และการลำเลียงสิ่งของ (${point.thaiName})`}
              highlightPhrase={point.thaiName}
              variant="light"
              className="text-xl sm:text-2xl font-bold text-slate-900 mb-2"
            />
            <p className="text-sm text-slate-600 mb-6">
              ตรวจสอบข้อมูลทางกายภาพหน้างานก่อนวันนัดหมายเพื่อความสะดวกรวดเร็วในการเข้าเทียบรถ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
                <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                  <ParkingCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  <h3 className="text-sm sm:text-base text-slate-900">จุดจอดรถและการเทียบ</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {point.accessAndLoading.parking}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
                <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <h3 className="text-sm sm:text-base text-slate-900">ความสูงและซุ้มประตู</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {point.accessAndLoading.heightClearance}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-700 font-bold mb-2">
                  <ArrowUpDown className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3 className="text-sm sm:text-base text-slate-900">บันได ลิฟต์ และคนช่วยยก</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {point.accessAndLoading.elevatorOrStairs}
                </p>
              </div>
            </div>

            {/* Pickup checklist - Progressive Disclosure */}
            {point.pickupGuidance && point.pickupGuidance.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <details className="group bg-slate-50/70 rounded-2xl border border-slate-200/90 transition-all duration-200 overflow-hidden open:bg-white open:border-blue-300 open:shadow-xs">
                  <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none hover:bg-slate-100/60 transition-colors font-bold text-xs sm:text-sm text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>ดูรายการข้อมูลจุดรับของที่ควรแจ้งเจ้าหน้าที่ล่วงหน้า ({point.pickupGuidance.length} รายการ)</span>
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/80 transition-colors">
                      <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" />
                    </div>
                  </summary>
                  <div className="p-4 sm:p-5 pt-2 border-t border-slate-200/70 bg-white">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {point.pickupGuidance.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            )}
          </section>

          {/* ── Approved Service-Confidence Banner (Positioned immediately above work gallery) ── */}
          <ServiceAreaQuoteBanner areaName={point.thaiName} className="my-8" />

          {/* ── J. Section 5: Authentic Work and Equipment Photos ── */}
          <section id="evidence" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs scroll-mt-20">
            <TwoToneHeading
              as="h2"
              text="ภาพตัวอย่างมาตรฐานรถและอุปกรณ์การขนส่ง WMS TRANSPORT"
              highlightPhrase="WMS TRANSPORT"
              variant="light"
              className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5"
            />
            <p className="text-sm text-slate-600 mb-6">
              ภาพบันทึกจากการปฏิบัติงานจริงของทีมงาน WMS แสดงมาตรฐานตู้บรรทุก อุปกรณ์รัดตรึง และการป้องกันความเสียหาย
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs flex flex-col m-0">
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/WM8.webp"
                    alt="ตัวอย่างรถกระบะตู้ทึบขนของ WMS TRANSPORT ปิดมิดชิดป้องกันฝุ่นและละอองฝน"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 text-xs sm:text-sm text-slate-600 flex-1 bg-slate-50 border-t border-slate-100">
                  <strong className="block text-slate-900 mb-1 text-sm sm:text-base font-bold">มาตรฐานรถกระบะตู้ทึบ 4 ล้อ</strong>
                  ตู้สแตนเลสปิดมิดชิด ป้องกันฝุ่นละอองและละอองฝน เหมาะสำหรับเฟอร์นิเจอร์และสินค้าโรงงาน (ภาพตัวอย่างมาตรฐานรถทั่วไป)
                </figcaption>
              </figure>
              <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs flex flex-col m-0">
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/WM10.webp"
                    alt="ทีมงาน WMS TRANSPORT ใช้ฟิล์มยืดและผ้านวมแรปป้องกันรอยขีดข่วน"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 text-xs sm:text-sm text-slate-600 flex-1 bg-slate-50 border-t border-slate-100">
                  <strong className="block text-slate-900 mb-1 text-sm sm:text-base font-bold">การแพ็กกิ้งและป้องกันริ้วรอย</strong>
                  มีผ้านวมหนาและฟิล์มยืดแรปเฟอร์นิเจอร์ชิ้นใหญ่เพื่อลดการเสียดสีระหว่างเคลื่อนย้าย (ภาพตัวอย่างมาตรฐานบริการ)
                </figcaption>
              </figure>
              <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs flex flex-col m-0">
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/WM11.webp"
                    alt="การล็อกล้อและสายรัดนิรภัยสำหรับขนส่งรถจักรยานยนต์"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 text-xs sm:text-sm text-slate-600 flex-1 bg-slate-50 border-t border-slate-100">
                  <strong className="block text-slate-900 mb-1 text-sm sm:text-base font-bold">การยึดตรึงรถมอเตอร์ไซค์</strong>
                  ใช้อุปกรณ์ล็อกล้อหน้าและสายรัดนิรภัยมาตรฐานเพื่อไม่ให้รถขยับตัวระหว่างการเดินทาง (ภาพตัวอย่างมาตรฐานขนส่งมอเตอร์ไซค์)
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ── M. Relevant Nearby Areas & Zone Link ── */}
          <section id="nearby" className="bg-slate-100/70 rounded-2xl p-6 sm:p-8 border border-slate-200 scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <TwoToneHeading
                  as="h2"
                  text={`พื้นที่ใกล้เคียงในโซน ${zone.thaiName}`}
                  highlightPhrase={zone.thaiName}
                  variant="light"
                  className="text-lg sm:text-xl font-bold text-slate-900"
                />
                <p className="text-xs sm:text-sm text-slate-600">
                  สำรวจจุดบริการในเส้นทางเชื่อมโยงสำหรับงานขนส่งระยะใกล้
                </p>
              </div>
              <Link
                href={`/areas/${zone.slug}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
              >
                <span>ดูภาพรวมโซน {zone.thaiName}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {point.nearbyAreas.map((area, idx) => (
                <Link
                  key={idx}
                  href={area.url}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-2xs transition-all flex items-center justify-between group"
                >
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {area.name}
                    </strong>
                    <span className="text-xs text-slate-500">{area.relation}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </section>

          {/* ── K. Section 6: Useful Local FAQs (Reference 2 Styling - Positioned at Very Bottom) ── */}
          {point.localFaqs && point.localFaqs.length > 0 && (
            <section id="faqs" className="bg-[#EFF6FF] border border-blue-200/60 rounded-3xl p-6 sm:p-10 scroll-mt-24">
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>คำถามที่พบบ่อย</span>
                </div>
                <TwoToneHeading
                  as="h2"
                  text={`คำถามที่พบบ่อยเกี่ยวกับ ${point.thaiName}`}
                  highlightPhrase={point.thaiName}
                  variant="light"
                  className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight mb-2"
                />
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  ข้อสงสัยที่พบบ่อยเกี่ยวกับการนัดหมายรถ การประเมินราคา และข้อจำกัดพื้นที่
                </p>
              </div>

              <div className="space-y-3.5">
                {point.localFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  const btnId = `faq-btn-${idx}`;
                  const panelId = `faq-panel-${idx}`;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
                        isOpen
                          ? "bg-white border-blue-300 shadow-md ring-2 ring-blue-500/10"
                          : "bg-white border-slate-200/90 shadow-2xs hover:border-slate-300"
                      }`}
                    >
                      <button
                        type="button"
                        id={btnId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors cursor-pointer"
                      >
                        <span className="leading-snug">{faq.question}</span>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isOpen ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transform transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-blue-600" : ""
                            }`}
                          />
                        </div>
                      </button>
                      {isOpen && (
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 bg-[#F8FAFF] text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-blue-50"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </main>

        {/* ── N. Mobile Sticky Contact Bar (min 48px height, safe area padded) ── */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom))] shadow-xl flex items-center gap-2">
          <a
            href={siteConfig.phoneHref}
            className="flex-1 min-h-[48px] px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>โทร {siteConfig.phone}</span>
          </a>
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[48px] px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>ส่งรูปขอราคา LINE</span>
          </a>
        </div>
      </div>
    </>
  );
}
