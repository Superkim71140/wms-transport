"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  ArrowRight,
  Route,
  CheckCircle2
} from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";

export default function ServiceMap() {
  const gmapsEmbedUrl = `https://maps.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}&hl=th&z=16&output=embed`;

  const popularRoutes = [
    { 
      from: "สมุทรสาคร", 
      to: "กรุงเทพฯ และปริมณฑล", 
      detail: "เหมาะสำหรับย้ายบ้าน ย้ายหอพัก คอนโดมิเนียม และขนส่งของทั่วไป",
      badge: "โซนหลัก"
    },
    { 
      from: "กรุงเทพฯ และปริมณฑล", 
      to: "ต่างจังหวัดทั่วไทย", 
      detail: "รองรับงานขนส่งสินค้าและสิ่งของหลายประเภท ขนส่งตรงตามเวลานัดหมาย",
      badge: "เหมาคันทั่วไทย"
    },
    { 
      from: "สมุทรสาคร / กรุงเทพฯ", 
      to: "ชลบุรีและระยอง", 
      detail: "เหมาะสำหรับขนส่งมอเตอร์ไซค์ บิ๊กไบค์ และสินค้าโรงงานอุตสาหกรรม",
      badge: "สายตะวันออก"
    },
    { 
      from: "ต้นทางหรือปลายทางจังหวัดอื่น", 
      to: "สอบถามเส้นทางได้", 
      detail: "แจ้งสถานที่ให้ทีมงานตรวจสอบคิวรถและประเมินเส้นทางได้ล่วงหน้า",
      badge: "ประเมินตามจริง"
    }
  ];

  const priorityHubs = [
    {
      title: "บริการรถรับจ้างฝั่งธนบุรี",
      subtitle: "ศูนย์บริการ 15 เขต",
      corridor: "เพชรเกษม • กาญจนาภิเษก • ราชพฤกษ์",
      desc: "ครอบคลุม 15 เขต คอนโด ทาวน์โฮม บ้านเดี่ยว และสินค้า",
      href: "/service/bkk-thonburi",
      tag: "กทม. โซนหลัก",
      tagColor: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "รถรับจ้างย่านเพชรเกษม–บางแค",
      subtitle: "จุดบริการย่อยเขตบางแค",
      corridor: "เพชรเกษม • พุทธมณฑลสาย 1–3",
      desc: "ถนนเพชรเกษม พุทธมณฑลสาย 1–3 ขนย้ายคอนโดและบ้าน",
      href: "/areas/bkk-thonburi/bang-khae",
      tag: "เจาะลึกพื้นที่",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200"
    },
    {
      title: "บริการรถรับจ้างสมุทรสาคร",
      subtitle: "ฐานปฏิบัติการหลัก WMS",
      corridor: "พระราม 2 • ตัวเมือง • กระทุ่มแบน",
      desc: "ขนส่งสินค้าโรงงานและขนย้ายบ้าน โซนพระราม 2",
      href: "/service/samutsakhon",
      tag: "ฐานปฏิบัติการ",
      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      title: "รถรับจ้างมหาชัย–พระราม 2",
      subtitle: "ย่านเศรษฐกิจและอุตสาหกรรม",
      corridor: "นิคมอุตสาหกรรม • ตลาดมหาชัย",
      desc: "นิคมอุตสาหกรรม โกดังสินค้า ตลาดมหาชัย กระทุ่มแบน",
      href: "/areas/samutsakhon/maha-chai",
      tag: "นิคมฯ-มหาชัย",
      tagColor: "bg-amber-50 text-amber-700 border-amber-200"
    }
  ];

  return (
    <section className="py-12 md:py-18 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden text-slate-800 font-sans">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION HEADER                                             */}
      {/* ------------------------------------------------------------- */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold mx-auto">
          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>จุดจอดรถและสำนักงานใหญ่ WMS Transport</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight text-center mt-3">
          พื้นที่ให้บริการและฐานปฏิบัติการ สมุทรสาคร–ทั่วไทย
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-3xl mx-auto text-center mt-2 leading-relaxed">
          ศูนย์กลางการเดินรถและจุดจอดรถกระบะตู้ทึบ ณ สมุทรสาคร เชื่อมต่อเส้นทางพระราม 2 และเพชรเกษม พร้อมกระจายงานขนส่งไปยังกรุงเทพฯ ปริมณฑล และทั่วประเทศ
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. GRID ARCHITECTURE: PHOTO & OPERATIONS MAP CARD            */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-10">
        
        {/* LEFT COLUMN (lg:col-span-5) - Solid Image Card */}
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg shadow-slate-200/40 h-full min-h-[460px] lg:min-h-full bg-slate-100">
          <img
            src="/wms1.webp"
            alt="รถกระบะตู้ทึบรับจ้าง WMS Transport ทีมงานขนย้ายบ้าน ขนส่งมอเตอร์ไซค์ จุดจอดสมุทรสาคร"
            className="w-full h-full object-cover object-center block"
          />
        </div>

        {/* RIGHT COLUMN (lg:col-span-7) - Operations & Map Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/40 p-6 md:p-7 flex flex-col justify-between h-full">
          <div>
            {/* Header */}
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                WMS TRANSPORT (สำนักงาน &amp; จุดจอดรถ)
              </h3>
              <p className="text-xs md:text-sm text-blue-600 font-medium mt-0.5">
                ฐานปฏิบัติการรถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์
              </p>
            </div>

            {/* Address Box */}
            <address className="not-italic bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 mt-3 block">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                ที่อยู่สถานที่ตั้งจริง
              </span>
              <p className="text-xs md:text-sm font-semibold text-slate-800 leading-snug mt-1">
                75 535 ซ.13 ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร จังหวัดสมุทรสาคร 74000
              </p>
              <div className="text-xs bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200 mt-2 inline-flex gap-1.5 flex-wrap">
                <span>ต.บ้านเกาะ</span>
                <span>•</span>
                <span>อ.เมืองสมุทรสาคร</span>
                <span>•</span>
                <span>จ.สมุทรสาคร</span>
                <span>•</span>
                <span className="font-mono text-blue-700">Plus Code: J62W+QG</span>
              </div>
            </address>

            {/* Interactive Google Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/70 my-3.5 min-h-[220px] md:min-h-[240px] w-full shadow-inner relative bg-slate-100">
              <iframe
                title="แผนที่แสดงที่ตั้งสำนักงานและจุดจอดรถ WMS Transport ต.บ้านเกาะ อ.เมืองสมุทรสาคร"
                src={gmapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Operation & Hotline Bar */}
            <div className="bg-slate-50/80 rounded-xl px-4 py-2.5 border border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-slate-600 font-medium">เปิดรับงานทุกวัน (นัดหมายล่วงหน้า)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <a href="tel:0612402436" className="text-blue-700 hover:text-blue-800 font-bold font-mono text-sm">
                  061-240-2436
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Dual Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-3.5">
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="เปิดเส้นทางใน Google Maps"
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 shrink-0" />
              <span>เปิดเส้นทางใน Google Maps</span>
            </a>
            <a
              href={siteConfig.phoneHref}
              aria-label="โทรสอบถาม 061-240-2436"
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs md:text-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-slate-600 shrink-0" />
              <span>โทรสอบถาม</span>
            </a>
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. MIDDLE TIER: POPULAR SERVICE ROUTES & FAST QUOTE STEPS     */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-10">
        
        {/* LEFT COLUMN: Popular Routes */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Route className="w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] tracking-tight">
                  เส้นทางที่ลูกค้าใช้บริการบ่อย
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
                สมุทรสาคร • กรุงเทพฯ • ปริมณฑล
              </span>
            </div>

            {/* Routes List */}
            <ul className="space-y-3">
              {popularRoutes.map((route, idx) => (
                <li 
                  key={idx}
                  className="p-3.5 sm:p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl hover:bg-blue-50/40 hover:border-blue-300 transition-all duration-200 group/route"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-white px-2.5 py-0.5 rounded-md border border-slate-200 text-xs font-bold text-[#0B1F3A]">
                        {route.from}
                      </span>
                      <div className="flex items-center text-blue-600 px-0.5">
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover/route:translate-x-0.5 transition-transform" />
                      </div>
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-200 text-xs font-bold">
                        {route.to}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200/70">
                      {route.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {route.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>เครือข่ายรถกระบะตู้ทึบครอบคลุมการขนส่งทั่วประเทศ ประเมินงานตามระยะทางจริง</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Quote Preparation Panel */}
        <div className="bg-slate-50/80 border border-blue-200/80 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="pb-3.5 border-b border-slate-200/80 mb-4">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] tracking-tight">
                  เช็กเส้นทางและคิวรถได้เร็วขึ้น
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                ส่งข้อมูลสำคัญ 3 ข้อให้ทีมงาน เพื่อตรวจสอบคิวรถและประเมินราคาได้อย่างถูกต้อง
              </p>
            </div>

            {/* 3 Numbered Steps */}
            <ol className="space-y-2.5 mb-4">
              <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                  แจ้งจุดรับและจุดส่งจริง (ซอย/ถนน/ชื่ออาคาร)
                </span>
              </li>
              <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                  แจ้งประเภทและจำนวนสิ่งของ (หรือส่งรูปถ่าย)
                </span>
              </li>
              <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                  แจ้งวันที่และช่วงเวลาที่ต้องการใช้บริการ
                </span>
              </li>
            </ol>

            {/* Reassurance Row */}
            <div className="grid grid-cols-3 gap-1.5 py-2.5 px-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-slate-700 font-medium mb-4 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>แจ้งราคาก่อนเริ่มงาน</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 border-x border-blue-200/60 px-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>เลือกทีมช่วยยกได้</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>รับงานทั้งใกล้และไกล</span>
              </div>
            </div>
          </div>

          {/* Contact Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ส่งจุดรับ–ส่งทาง LINE"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-[0.98] shadow-xs min-h-[44px]"
            >
              <Image
                src="/images/LINE_icon.webp"
                alt="LINE"
                width={18}
                height={18}
                className="w-4.5 h-4.5 object-contain shrink-0"
              />
              <span>ส่งจุดรับ–ส่งทาง LINE</span>
            </a>
            <a
              href={siteConfig.phoneHref}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0B1F3A] border border-slate-300 font-bold text-xs sm:text-sm transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              <span>โทร {siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. BOTTOM TIER: TARGET LOCAL SERVICE PAGES (Crawlable Links)  */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
              พื้นที่และเส้นทางให้บริการเฉพาะจุด
            </h3>
            <span className="text-xs sm:text-sm text-slate-500">
              บริการรถรับจ้างขนของในย่านเศรษฐกิจ ชุมชนสำคัญ และเส้นทางหลัก
            </span>
          </div>
          <Link
            href="/areas"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>ดูภาพรวมพื้นที่บริการและจุดจอดรถทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {priorityHubs.map((hub, i) => (
            <Link
              key={i}
              href={hub.href}
              className="p-4 bg-white hover:bg-blue-50/40 border border-slate-200/90 hover:border-blue-300 rounded-xl transition-all duration-200 group flex flex-col justify-between shadow-2xs hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${hub.tagColor}`}>
                    {hub.tag}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 mb-1">
                  {hub.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  {hub.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                {hub.corridor}
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}
