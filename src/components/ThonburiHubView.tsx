"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  Users,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Layers,
  Compass,
  ChevronDown,
} from "lucide-react";
import {
  getThonburiDistrictsByZone,
  isDistrictPageIndexable,
} from "@/data/districtLandingPages";
import { siteConfig } from "@/lib/seo/site-config";
import ServiceAreaLayout from "@/components/service-area/ServiceAreaLayout";
import ServiceAreaRouteTable from "@/components/service-area/ServiceAreaRouteTable";
import ServiceAreaRelatedServices from "@/components/service-area/ServiceAreaRelatedServices";
import ServiceAreaQuoteForm from "@/components/service-area/ServiceAreaQuoteForm";
import TwoToneHeading from "@/components/service-area/TwoToneHeading";

export default function ThonburiHubView() {
  const northernDistricts = getThonburiDistrictsByZone("northern");
  const southernDistricts = getThonburiDistrictsByZone("southern");

  // Auto-expand disclosure if anchor link points inside
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      try {
        const target = document.querySelector(hash);
        if (target) {
          const details = target.closest("details");
          if (details && !details.open) {
            details.open = true;
          }
        }
      } catch {
        // ignore selector error
      }
    };
    window.addEventListener("hashchange", handleHash, { passive: true });
    handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const faqs = [
    {
      q: "รถรับจ้างตู้ทึบ WMS สามารถเข้าลานจอดใต้อาคารคอนโดมิเนียมฝั่งธนบุรีได้หรือไม่?",
      a: "รถกระบะตู้ทึบของ WMS TRANSPORT เป็นรถกระบะตู้ทึบหลังคาสูงปิดมิดชิด (โปรดแจ้งรายละเอียดหน้างานเพื่อให้เจ้าหน้าที่ตรวจสอบรถและอุปกรณ์ที่เหมาะสม) สำหรับรองรับสิ่งของชิ้นใหญ่ การเข้าจอดเทียบขนย้ายแนะนำให้ประสานงานจุดโหลดของชั้นล่าง (Loading Bay) หรือลานจอดที่ไม่มีสิ่งกีดขวางความสูงกับนิติบุคคลของอาคาร"
    },
    {
      q: "ตรอกซอยแคบในชุมชนเก่าฝั่งธนบุรี เช่น ย่านตลาดพลู บางยี่เรือ หรือซอยเพชรเกษม รถเข้าได้ไหม?",
      a: "รถกระบะตอนเดียวตู้ทึบของเรามีความคล่องตัวสูง สามารถเลี้ยวเข้าตรอกซอยแคบ ข้ามสะพานคลอง และหลบหลีกสายไฟต่ำได้ดีกว่ารถบรรทุก 6 ล้อ ทำให้เข้าถึงหน้าบ้านในซอยลึกของฝั่งธนบุรีได้อย่างปลอดภัย"
    },
    {
      q: "การขนย้ายข้ามฝั่งแม่น้ำเจ้าพระยา หรือข้ามจังหวัดจากฝั่งธนบุรีคิดราคาอย่างไร?",
      a: "เราคำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดรับของในฝั่งธนบุรีไปยังจุดหมายปลายทาง ไม่ว่าจะเป็นการข้ามสะพานเข้าฝั่งพระนคร หรือการวิ่งออกต่างจังหวัด (เช่น สมุทรสาคร นครปฐม หรือสายใต้) โดยแจ้งราคาและเงื่อนไขตามขอบเขตงานอย่างโปร่งใสก่อนเริ่มงาน"
    },
    {
      q: "มีบริการพนักงานช่วยยกของด้วยหรือไม่ และต้องจองคิวล่วงหน้านานแค่ไหน?",
      a: "มีพนักงานช่วยยกของตามขนาดงานที่ตกลง คอยดูแลความปลอดภัยของสิ่งของ จัดเรียง และแรปฟิล์มกันรอยเฟอร์นิเจอร์ แนะนำให้จองคิวล่วงหน้า 1-2 วัน โดยเฉพาะช่วงวันหยุดสุดสัปดาห์หรือช่วงสิ้นเดือนเพื่อให้ตรงกับคิวจองลิฟต์ของนิติบุคคล"
    }
  ];

  const bookingSteps = [
    {
      step: "01",
      title: "แจ้งจุดรับ-ส่งและรายการของ",
      desc: "ส่งรูปถ่ายสิ่งของ พิกัดต้นทางฝั่งธนบุรี และปลายทางผ่านทาง LINE หรือโทรติดต่อเจ้าหน้าที่"
    },
    {
      step: "02",
      title: "ประเมินราคาตามจริง",
      desc: "เจ้าหน้าที่ประเมินขนาดรถ จำนวนพนักงานยกของ และแจ้งราคาสุทธิโดยไม่มีค่าใช้จ่ายแฝง"
    },
    {
      step: "03",
      title: "ล็อกคิวงานและเตรียมสถานที่",
      desc: "ยืนยันวันเวลา นัดหมายคิว และติดต่อจองลิฟต์หรือขอใบผ่านทางกับนิติบุคคลของอาคาร"
    },
    {
      step: "04",
      title: "เข้าบริการตรงเวลา ปลอดภัย",
      desc: "ทีมงานเข้าเทียบจุดนัดหมาย ขนย้ายอย่างระมัดระวัง รัดตรึงในตู้ทึบ และส่งมอบปลายทางเรียบร้อย"
    }
  ];

  const routeRates = [
    {
      route: "ภายใน 15 เขตฝั่งธนบุรี (เพชรเกษม, ปิ่นเกล้า, ท่าพระ, บางแค)",
      distanceOrScope: "ย้ายหอพัก คอนโดแนว BTS/MRT สิ่งของทั่วไป และส่งมอเตอร์ไซค์",
      transitTime: "30 - 60 นาที",
      price: "เริ่มต้น 1,500 บาท",
    },
    {
      route: "ฝั่งธนบุรี ➔ ฝั่งพระนคร / สุขุมวิท / บางนา (ข้ามสะพานเจ้าพระยา)",
      distanceOrScope: "ขนย้ายคอนโด ทาวน์โฮม สินค้าโรงงาน และมอเตอร์ไซค์บิ๊กไบค์",
      transitTime: "1 - 2 ชั่วโมง",
      price: "เริ่มต้น 1,800 บาท",
    },
    {
      route: "ฝั่งธนบุรี ➔ ปริมณฑล (สมุทรสาคร, นนทบุรี, นครปฐม)",
      distanceOrScope: "ถนนพระราม 2, บรมราชชนนี, กาญจนาภิเษก เหมาเที่ยวสินค้าและย้ายบ้าน",
      transitTime: "1 - 3 ชั่วโมง",
      price: "เริ่มต้น 2,200 บาท",
    },
    {
      route: "ฝั่งธนบุรี ➔ ต่างจังหวัดทั่วประเทศ (สายใต้, สายเหนือ, อีสาน)",
      distanceOrScope: "เหมารถกระบะตู้ทึบวิ่งตรง ไม่รวมของ ส่งมอบ Door-to-Door ปลอดภัย",
      transitTime: "ตามระยะทางจริง",
      price: "เริ่มต้นตามระยะทาง",
    },
  ];

  return (
    <ServiceAreaLayout
      heroProps={{
        breadcrumbs: [
          { label: "หน้าแรก", href: "/" },
          { label: "พื้นที่ให้บริการ", href: "/areas" },
          { label: "กรุงเทพฯ ฝั่งธนบุรี", href: "/service/bkk-thonburi" },
        ],
        h1: "รถรับจ้างฝั่งธนบุรี เพชรเกษม–พุทธมณฑล ขนย้ายบ้าน คอนโด ส่งของทั่วไป",
        thaiName: "กรุงเทพฯ ฝั่งธนบุรี",
        description:
          "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างขนย้ายครอบคลุม 15 เขตทั่วฝั่งธนบุรี ทั้งกลุ่มเขตกรุงธนเหนือและกรุงธนใต้ รองรับงานย้ายคอนโดมิเนียมตามแนวรถไฟฟ้า BTS สายสีลมและ MRT สายสีน้ำเงิน ย้ายทาวน์โฮม บ้านเดี่ยว ขนส่งมอเตอร์ไซค์ และขนส่งสินค้าโรงงาน ด้วยรถกระบะตู้ทึบหลังคาสูงปิดมิดชิด พร้อมทีมงานช่วยยกของ",
        isRegionalHub: true,
        startingPrice: "เริ่มต้น 1,500 บาท",
        deliveryEstimate: "เข้าถึงหน้างานภายใน 30-60 นาที",
        imageSrc: "/images/WM11.webp",
        imageCaption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS ประจำการบนเส้นทางฝั่งธนบุรี พร้อมบริการขนย้าย 15 เขต",
        highlightPhrase: "ฝั่งธนบุรี",
      }}
      sidebarProps={{
        thaiName: "กรุงเทพฯ ฝั่งธนบุรี",
        isRegionalHub: true,
        geographicType: "regional_hub",
        startingPrice: "เริ่มต้น 1,500 บาท",
        deliveryEstimate: "เข้าถึงหน้างานภายใน 30-60 นาที",
        parentArea: {
          name: "พื้นที่ให้บริการทั้งหมด",
          href: "/areas",
        },
        corridors: [
          { name: "ถนนเพชรเกษม" },
          { name: "ถนนบรมราชชนนี" },
          { name: "ถนนราชพฤกษ์" },
          { name: "ถนนกาญจนาภิเษก" },
          { name: "ถนนพระราม 2" },
        ],
        nearbyAreas: [
          { name: "สมุทรสาคร (สำนักงานใหญ่)", slug: "samutsakhon", href: "/service/samutsakhon" },
          { name: "กรุงเทพฯ ฝั่งพระนคร", slug: "bkk-phra-nakhon", href: "/service/bkk-phra-nakhon" },
          { name: "ชลบุรี", slug: "chonburi", href: "/service/chonburi" },
          { name: "เชียงใหม่", slug: "chiang-mai", href: "/service/chiang-mai" },
          { name: "ภูเก็ต", slug: "phuket", href: "/service/phuket" },
        ],
      }}
      nearbyAreas={[
        {
          name: "สมุทรสาคร",
          badge: "สำนักงานใหญ่ WMS",
          description: "ศูนย์กลางปฏิบัติการหลักมหาชัย พระราม 2 กระทุ่มแบน รองรับงานขนส่งสินค้าโรงงานและย้ายบ้านตลอดเวลาทำการ",
          href: "/service/samutsakhon",
        },
        {
          name: "กรุงเทพฯ ฝั่งพระนคร",
          badge: "ศูนย์กลางเศรษฐกิจ",
          description: "บริการขนย้ายบ้าน คอนโด สุขุมวิท สีลม สาทร ลาดพร้าว รถตู้ทึบเข้าซอยแคบคล่องตัว พร้อมคนยกของ",
          href: "/service/bkk-phra-nakhon",
        },
        {
          name: "ชลบุรี & ภาคตะวันออก",
          badge: "เขตอุตสาหกรรม",
          description: "เหมารถกระบะตู้ทึบส่งสินค้าโรงงาน อมตะ ซิตี้ แหลมฉบัง ศรีราชา พัทยา มีรอบวิ่งต่อเนื่อง",
          href: "/service/chonburi",
        },
      ]}
      faqProps={{
        thaiName: "กรุงเทพฯ ฝั่งธนบุรี",
        faqs,
      }}
    >
      {/* ── 1. COMPACT SERVICE OVERVIEW (3 Core Services in Thonburi) ── */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block animate-pulse" />
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            ศูนย์รวมข้อมูลบริการขนย้าย 15 เขตฝั่งธนบุรี
          </span>
        </div>
        <TwoToneHeading
          as="h2"
          text="บริการรถกระบะตู้ทึบรับจ้างฝั่งธนบุรี ครอบคลุม 15 เขต พร้อมทีมงานมืออาชีพ"
          highlight="ฝั่งธนบุรี"
          variant="light"
          className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3"
          highlightClassName="text-blue-600 font-black"
        />
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
          WMS TRANSPORT มุ่งมั่นให้บริการขนย้ายที่สะดวกรวดเร็วและปลอดภัยในเขตฝั่งธนบุรี ไม่ว่าจะเป็นการย้ายหอพักนักศึกษา ย้ายคอนโดมิเนียมตามแนวรถไฟฟ้า หรือขนส่งสินค้า รถกระบะตู้ทึบหลังคาสูงของเราปิดมิดชิด ป้องกันแดด ฝน และฝุ่นละอองตลอดการเดินทาง พร้อมพนักงานยกของ
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <Link
            href="/service/bkk-thonburi/moving"
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold mb-2.5">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                ย้ายบ้าน คอนโด หอพัก
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                พร้อมคนช่วยยก แรปฟิล์มกันรอยเฟอร์นิเจอร์ เข้าเทียบจุดโหลดคอนโด BTS/MRT
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>ดูข้อมูลย้ายบ้าน</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/service/bkk-thonburi/motorcycle"
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold mb-2.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                ขนส่งมอเตอร์ไซค์ บิ๊กไบค์
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                รัดตรึงด้วยสายรัดพิเศษและล็อกล้อหน้าในตู้ทึบ ปลอดภัยไร้ริ้วรอยตลอดทาง
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>ดูข้อมูลส่งมอเตอร์ไซค์</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/service/bkk-thonburi/freight"
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold mb-2.5">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                ขนส่งสินค้า เหมาเที่ยว
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                เหมารถกระบะตู้ทึบส่งสินค้าโรงงาน วัสดุก่อสร้าง อุปกรณ์สำนักงาน ทั่วไทย
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>ดูข้อมูลขนส่งสินค้า</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ── 3. TRANSPORT & ROUTE TABLE ── */}
      <ServiceAreaRouteTable
        thaiName="กรุงเทพฯ ฝั่งธนบุรี"
        rates={routeRates}
        customTitle="ตารางอัตราค่าบริการรถรับจ้างขนของในฝั่งธนบุรี"
        customDescription="อัตราค่าบริการเริ่มต้นสำหรับการขนย้ายในเขตฝั่งธนบุรี ข้ามฝั่งแม่น้ำเจ้าพระยา และวิ่งออกต่างจังหวัด"
      />

      {/* ── 4. COMPACT DISTRICT AND ROAD SECTIONS (COLLAPSIBLE DISCLOSURES) ── */}
      <section id="thonburi-areas" className="mb-10 scroll-mt-24">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
            <TwoToneHeading
              as="h2"
              text="พื้นที่ให้บริการฝั่งธนบุรี"
              highlightPhrase="ฝั่งธนบุรี"
              variant="light"
              className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
            />
          </div>
          <p className="text-slate-600 text-xs sm:text-sm">
            เลือกดูพื้นที่และรายละเอียดการเข้ารับบริการ
          </p>
        </div>

        <div className="space-y-3">
          {/* Disclosure 1: กรุงธนเหนือ · 8 เขต */}
          <details className="group bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-colors hover:border-slate-300 open:border-blue-300 open:shadow-xs">
            <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-sm sm:text-base text-slate-900 list-none select-none hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                <span>กรุงธนเหนือ · 8 เขต</span>
              </span>
              <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200 group-open:rotate-180 shrink-0" aria-hidden="true" />
            </summary>
            <div className="p-4 pt-1 border-t border-slate-100 bg-slate-50/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {northernDistricts.map((d) => {
                  const isPublished = isDistrictPageIndexable(d);
                  return (
                    <div
                      key={d.districtSlug}
                      className="p-3 rounded-lg bg-white border border-slate-200/80 hover:border-blue-300 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-slate-900">
                          เขต{d.districtThaiName}
                        </div>
                        {d.subdistricts && d.subdistricts.length > 0 && (
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {d.subdistricts.slice(0, 3).join(" • ")}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0">
                        {isPublished ? (
                          <Link
                            href={`/areas/bkk-thonburi/${d.districtSlug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors py-1 px-2 rounded hover:bg-blue-50"
                          >
                            <span>ดูข้อมูลเขต{d.districtThaiName}</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        ) : (
                          <a
                            href={siteConfig.lineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors py-1 px-2 rounded hover:bg-slate-100"
                          >
                            <span>สอบถามคิวงาน (LINE)</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </details>

          {/* Disclosure 2: กรุงธนใต้ · 7 เขต */}
          <details className="group bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-colors hover:border-slate-300 open:border-blue-300 open:shadow-xs">
            <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-sm sm:text-base text-slate-900 list-none select-none hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                <span>กรุงธนใต้ · 7 เขต</span>
              </span>
              <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200 group-open:rotate-180 shrink-0" aria-hidden="true" />
            </summary>
            <div className="p-4 pt-1 border-t border-slate-100 bg-slate-50/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {southernDistricts.map((d) => {
                  const isPublished = isDistrictPageIndexable(d);
                  return (
                    <div
                      key={d.districtSlug}
                      className="p-3 rounded-lg bg-white border border-slate-200/80 hover:border-blue-300 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-slate-900">
                          เขต{d.districtThaiName}
                        </div>
                        {d.subdistricts && d.subdistricts.length > 0 && (
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {d.subdistricts.slice(0, 3).join(" • ")}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0">
                        {isPublished ? (
                          <Link
                            href={`/areas/bkk-thonburi/${d.districtSlug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors py-1 px-2 rounded hover:bg-blue-50"
                          >
                            <span>ดูข้อมูลเขต{d.districtThaiName}</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        ) : (
                          <a
                            href={siteConfig.lineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors py-1 px-2 rounded hover:bg-slate-100"
                          >
                            <span>สอบถามคิวงาน (LINE)</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </details>

          {/* Sibling Disclosure: ถนนหลักและการเดินทาง */}
          <details className="group bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-colors hover:border-slate-300 open:border-blue-300 open:shadow-xs">
            <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-sm sm:text-base text-slate-900 list-none select-none hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
              <span className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                <span>ถนนหลักและการเดินทาง</span>
              </span>
              <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200 group-open:rotate-180 shrink-0" aria-hidden="true" />
            </summary>
            <div className="p-4 pt-1 border-t border-slate-100 bg-slate-50/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white border border-slate-200/80 rounded-lg p-3">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">
                    แนวเพชรเกษม – หนองแขม – บางแค
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    รองรับงานย้ายคอนโดแนว MRT/BTS ย้ายทาวน์โฮม รถตู้ทึบเข้าซอยเพชรเกษม 81 ได้สะดวก
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href="/areas/bkk-thonburi/bang-khae"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span>ดูข้อมูลรถรับจ้างเพชรเกษม–บางแค</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/areas/bkk-thonburi/nong-khaem"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span>ดูข้อมูลรถรับจ้างหนองแขม–เพชรเกษม 81</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-lg p-3">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">
                    แนวกาญจนาภิเษก – กัลปพฤกษ์ – บางบอน
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    ย้ายบ้านเดี่ยว ทาวน์โฮมจัดสรร ส่งสินค้าโรงงาน และมอเตอร์ไซค์ เชื่อมพระราม 2 สู่สมุทรสาคร
                  </p>
                  <Link
                    href="/areas/bkk-thonburi/bang-bon"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>ดูข้อมูลรถรับจ้างบางบอน–เอกชัย</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-lg p-3">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">
                    แนวราชพฤกษ์ – บรมราชชนนี – ปิ่นเกล้า
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    ขนย้ายบ้าน คอนโด ออฟฟิศ เชื่อมทางด่วนศรีรัช ศาลายา นครชัยศรี และนนทบุรี
                  </p>
                  <Link
                    href="/areas/bkk-thonburi/pinklao"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>ดูข้อมูลรถรับจ้างปิ่นเกล้า–บรมราชชนนี</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* ── 5. FLEET SPECIFICATION & ACCESS GUIDANCE ── */}
      <section className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-600" />
          <span>มาตรฐานรถตู้ทึบและการเข้าถึงอาคารในฝั่งธนบุรี</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
            <div className="font-bold text-xs text-slate-900 mb-1">
              ตู้ทึบหลังคาสูงปิดมิดชิด
            </div>
            <div className="text-[11px] text-slate-600 leading-relaxed">
              โครงสร้างตู้ทึบปิดมิดชิด รองรับสัมภาระทรงสูง ที่นอน 6 ฟุต ตู้เย็น และเฟอร์นิเจอร์ชิ้นใหญ่
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
            <div className="font-bold text-xs text-slate-900 mb-1">
              ป้องกันแดดและฝน
            </div>
            <div className="text-[11px] text-slate-600 leading-relaxed">
              ตู้ทึบอลูมิเนียมมิดชิด ประตูล็อกแน่นหนา ปลอดภัยจากสภาพอากาศทุกฤดูกาล
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
            <div className="font-bold text-xs text-slate-900 mb-1">
              คล่องตัวในตรอกซอยแคบ
            </div>
            <div className="text-[11px] text-slate-600 leading-relaxed">
              รถกระบะตอนเดียวช่วงยาว เลี้ยวเข้าตรอกซอยย่อยและข้ามสะพานคลองในย่านชุมชนเมืองเก่าได้สะดวก
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. 4-STEP BOOKING PROCESS ── */}
      <section className="mb-10">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>ขั้นตอนการจองรถรับจ้างฝั่งธนบุรี</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {bookingSteps.map((b) => (
            <div key={b.step} className="bg-white border border-slate-200 p-3.5 rounded-xl">
              <div className="text-blue-600 font-black text-xs mb-1">ขั้นตอน {b.step}</div>
              <div className="font-bold text-xs text-slate-900 mb-1">{b.title}</div>
              <div className="text-[11px] text-slate-500 leading-relaxed">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. LIGHT BLUE PRICING NOTE CALLOUT ── */}
      <div className="mb-10 p-5 rounded-2xl bg-blue-50 border border-blue-200">
        <h4 className="font-bold text-sm text-slate-900 mb-2">
          ข้อควรรู้เกี่ยวกับการคิดราคาในฝั่งธนบุรี
        </h4>
        <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
          <li className="flex items-start gap-1.5">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span>คำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดรับของไปยังปลายทาง</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span>แจ้งราคาสุทธิชัดเจนก่อนเริ่มงาน ไม่มีค่าบริการแฝงหรือบวกเพิ่มหน้างาน</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span>บริการคนช่วยยกของพร้อมอุปกรณ์แรปฟิล์มป้องกันรอยขีดข่วน</span>
          </li>
        </ul>
      </div>

      {/* ── 8. BORDERED RELATED SERVICES GRID ── */}
      <ServiceAreaRelatedServices currentProvince="bkk-thonburi" />

      {/* ── 10. INTERACTIVE QUOTATION REQUEST FORM ── */}
      <ServiceAreaQuoteForm
        currentLocationName="กรุงเทพฯ ฝั่งธนบุรี"
        currentProvince="bkk-thonburi"
      />
    </ServiceAreaLayout>
  );
}
