"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bike, Truck, Package, CheckCircle2, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import React from "react";

export interface AuthenticWorkItem {
  id: string;
  category: "all" | "moving" | "motorcycle" | "freight";
  categoryLabel: string;
  serviceType: string;
  location: string;
  icon: React.ReactNode;
  imgUrl: string;
  imgAlt: string;
  title: string;
  caption: string;
  detailHref: string;
  linkLabel: string;
}

const AUTHENTIC_PROJECTS: AuthenticWorkItem[] = [
  {
    id: "case-condo-bang-khae",
    category: "moving",
    categoryLabel: "ย้ายบ้าน/คอนโด",
    serviceType: "ขนย้ายคอนโดและอาคารสูง",
    location: "บางแค กรุงเทพฯ (ฝั่งธนบุรี)",
    icon: <Truck className="w-4 h-4" aria-hidden="true" />,
    imgUrl: "/images/WM10.webp",
    imgAlt: "พนักงาน WMS TRANSPORT แรปฟิล์มยืดกันรอยตู้ไม้และขนย้ายออกจากลิฟต์คอนโดบางแค",
    title: "งานย้ายของคอนโดมิเนียมและแรปฟิล์มกันรอย",
    caption: "แรปฟิล์มยืดกันรอยเฟอร์นิเจอร์ไม้ทุกชิ้น และขนย้ายออกจากลิฟต์บริการคอนโดมิเนียมแนวถนนเพชรเกษม เขตบางแค",
    detailHref: "/portfolio/moving-condo-bang-khae",
    linkLabel: "อ่านบันทึกเคสงานฉบับเต็ม",
  },
  {
    id: "case-motorcycle-pinklao",
    category: "motorcycle",
    categoryLabel: "ขนส่งมอเตอร์ไซค์",
    serviceType: "ขนส่งรถจักรยานยนต์ในตู้ทึบ",
    location: "ปิ่นเกล้า กรุงเทพฯ (ฝั่งธนบุรี)",
    icon: <Bike className="w-4 h-4" aria-hidden="true" />,
    imgUrl: "/images/WM11.webp",
    imgAlt: "การรัดยึดรถมอเตอร์ไซค์ในตู้ทึบ WMS ด้วยสายรัด Ratchet Strap แน่นหนา",
    title: "ล็อกล้อหน้า Wheel Chock และรัดยึด 4 ทิศทาง",
    caption: "ล็อกล้อหน้าด้วยแท่น Wheel Chock และรัดตรึงด้วยสายรัด Ratchet Strap เข้ากับโครงสร้างตู้ทึบส่งมอบย่านปิ่นเกล้า",
    detailHref: "/portfolio/motorcycle-delivery-pinklao",
    linkLabel: "อ่านบันทึกเคสงานฉบับเต็ม",
  },
  {
    id: "case-freight-mahachai",
    category: "freight",
    categoryLabel: "ขนส่งสินค้าโรงงาน",
    serviceType: "ขนส่งสินค้าโรงงานอุตสาหกรรม",
    location: "มหาชัย จังหวัดสมุทรสาคร",
    icon: <Package className="w-4 h-4" aria-hidden="true" />,
    imgUrl: "/images/WM8.webp",
    imgAlt: "รถกระบะตอนเดียวตู้ทึบ WMS เทียบจุดโหลดสินค้าในโรงงานอุตสาหกรรมมหาชัย",
    title: "เหมาตู้ทึบกระจายสินค้าบรรจุกล่องสำเร็จรูป",
    caption: "เหมารถกระบะตู้ทึบขนของส่งสินค้าอุตสาหกรรมจากโรงงานย่านมหาชัย กระจายสู่คลังสินค้าอย่างตรงเวลาและมีเอกสารครบถ้วน",
    detailHref: "/portfolio/freight-delivery-maha-chai",
    linkLabel: "อ่านบันทึกเคสงานฉบับเต็ม",
  },
  {
    id: "case-moving-nongkhaem",
    category: "moving",
    categoryLabel: "ย้ายบ้าน/คอนโด",
    serviceType: "ย้ายบ้านพักอาศัยและทาวน์โฮม",
    location: "หนองแขม–บางแค กรุงเทพฯ",
    icon: <Truck className="w-4 h-4" aria-hidden="true" />,
    imgUrl: "/images/WM15.webp",
    imgAlt: "รถกระบะตอนเดียวตู้ทึบ WMS ขนย้ายสิ่งของและเฟอร์นิเจอร์บ้านพักอาศัยแนวหนองแขม-บางแค",
    title: "ย้ายบ้านพักอาศัยพร้อมทีมงานช่วยยกของ",
    caption: "จัดเรียงสิ่งของและเฟอร์นิเจอร์ขึ้นรถกระบะตู้ทึบความสูง 2.1 ม. ปิดมิดชิดกันแดดกันฝนตลอดการเดินทางในแนวหนองแขม–บางแค",
    detailHref: "/portfolio/moving-house-nongkhaem-bang-khae",
    linkLabel: "อ่านบันทึกเคสงานฉบับเต็ม",
  },
  {
    id: "case-moving-bangbon",
    category: "moving",
    categoryLabel: "ย้ายบ้าน/คอนโด",
    serviceType: "ย้ายบ้านและทาวน์เฮาส์",
    location: "เขตบางบอน กรุงเทพฯ",
    icon: <Truck className="w-4 h-4" aria-hidden="true" />,
    imgUrl: "/images/WM16.webp",
    imgAlt: "ทีมงาน WMS ขนย้ายกล่องบรรจุภัณฑ์และเฟอร์นิเจอร์ขึ้นรถกระบะตู้ทึบในเขตบางบอน",
    title: "งานขนย้ายสัมภาระและที่อยู่อาศัยย่านบางบอน",
    caption: "ทีมงานช่วยยกของและจัดระเบียบสินค้าและสัมภาระในตู้ทึบอย่างเป็นระบบ ย่านถนนเอกชัย–บางบอน ปลอดภัยทุกชิ้นส่วน",
    detailHref: "/portfolio/moving-townhouse-bang-bon",
    linkLabel: "อ่านบันทึกเคสงานฉบับเต็ม",
  },
  {
    id: "case-motorcycle-frontdoor",
    category: "motorcycle",
    categoryLabel: "ขนส่งมอเตอร์ไซค์",
    serviceType: "ส่งมอบรถมอเตอร์ไซค์ถึงหน้าบ้าน",
    location: "กรุงเทพฯ และปริมณฑล",
    icon: <Bike className="w-4 h-4" aria-hidden="true" />,
    imgUrl: "/images/WM12.webp",
    imgAlt: "การเข็นรถจักรยานยนต์บิ๊กไบค์ลงจากท้ายรถตู้ทึบ WMS ด้วยสะพานลาดอลูมิเนียมส่งมอบหน้าบ้าน",
    title: "ส่งมอบรถจักรยานยนต์ถึงมือลูกค้า Door-to-Door",
    caption: "ใช้สะพานลาดอลูมิเนียมมาตรฐานและเข็นส่งมอบรถถึงหน้าบ้านลูกค้าอย่างนุ่มนวลและปลอดภัย ไร้รอยขูดขีด",
    detailHref: "/pricing/motorcycle-transport",
    linkLabel: "ดูอัตราค่าบริการส่งมอเตอร์ไซค์",
  },
];

function WorkCard({ project, index }: { project: AuthenticWorkItem; index: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md flex flex-col justify-between">
      {/* Photo with fixed aspect ratio */}
      <div>
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          <Image
            src={project.imgUrl}
            alt={project.imgAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            quality={80}
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            priority={index < 2}
          />

          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-slate-200" />
          )}

          {/* Authentic Job Badge */}
          <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/85 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs shadow-xs">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#06C755]" aria-hidden="true" />
            <span>งานจริง WMS</span>
          </div>
        </div>

        {/* Solid Readable Caption Panel Below Photograph */}
        <div className="p-5 bg-white border-t border-slate-100">
          {/* Service & Location Metadata Tags */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
              {project.icon}
              <span>{project.serviceType}</span>
            </span>

            <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-600">
              <MapPin className="w-3 h-3 text-rose-500" aria-hidden="true" />
              <span>{project.location}</span>
            </span>
          </div>

          <h3 className="text-base font-bold text-navy leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3 font-normal">
            {project.caption}
          </p>
        </div>
      </div>

      {/* Footer with Crawlable Case/Service Link */}
      <div className="px-5 pb-5 pt-0 bg-white">
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
          <Link
            href={project.detailHref}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group-hover:gap-1.5 no-underline"
          >
            <span>{project.linkLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>

          <span className="text-[11px] text-slate-400 font-medium inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#06C755]" aria-hidden="true" />
            <span>ตรวจสอบได้</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function GalleryMasonry() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ทั้งหมด");

  const categories = [
    { id: "ทั้งหมด", label: "ทั้งหมด" },
    { id: "moving", label: "ย้ายบ้าน/คอนโด" },
    { id: "motorcycle", label: "ขนส่งมอเตอร์ไซค์" },
    { id: "freight", label: "ขนส่งสินค้าโรงงาน" },
  ];

  const filteredProjects =
    selectedFilter === "ทั้งหมด"
      ? AUTHENTIC_PROJECTS
      : AUTHENTIC_PROJECTS.filter((p) => p.category === selectedFilter);

  const imageSchema = filteredProjects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `https://wms-transport.com${project.imgUrl}`,
    name: `${project.title} - ${project.location}`,
    caption: project.caption,
    creator: {
      "@id": "https://wms-transport.com/#moving-company",
    },
  }));

  return (
    <div className="relative z-10 w-full font-sans content-auto section-contain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />

      {/* Section Heading Area */}
      <div className="mx-auto max-w-3xl text-center mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 tracking-wide shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>หลักฐานผลงานจริง WMS</span>
        </span>

        <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-navy">
          ตัวอย่างงานขนย้ายจริงของ <span className="text-blue-600">WMS TRANSPORT</span>
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm sm:leading-relaxed text-slate-600 font-normal">
          ภาพถ่ายบันทึกจากการปฏิบัติงานจริงของฟลีตรถกระบะตู้ทึบและทีมงาน WMS TRANSPORT ตรวจสอบเคสงานได้จริง ไม่ใช้ภาพสต็อกหรือภาพโฆษณาจำลอง
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mx-auto mb-10 flex w-fit max-w-full gap-2 overflow-x-auto sm:flex-wrap rounded-xl border border-slate-200 bg-slate-100 p-1.5 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedFilter(cat.id)}
            className={`min-h-10 shrink-0 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              selectedFilter === cat.id
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3-Column Grid of Authentic Job Cards */}
      <div className="mx-auto max-w-7xl mb-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Clear Portfolio Directory CTA */}
      <div className="text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-navy hover:bg-blue-900 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all active:scale-[0.99] no-underline"
        >
          <span>ดูผลงานการขนย้ายทั้งหมด</span>
          <ArrowRight className="w-4 h-4 text-sky-400" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
