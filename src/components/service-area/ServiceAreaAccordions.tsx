"use client";

import React, { useEffect } from "react";
import { MapPin, Route, Truck, Tag, ChevronDown } from "lucide-react";

export interface ServiceAreaAccordionsProps {
  thaiName: string;
  landmarks?: string[];
  keyRoutes?: string[];
  routes?: string[];
  mainServices?: string[];
  priceNote?: string;
  className?: string;
}

export default function ServiceAreaAccordions({
  thaiName,
  landmarks = [],
  keyRoutes,
  routes,
  mainServices = [],
  priceNote,
  className = "",
}: ServiceAreaAccordionsProps) {
  // Support fragment hash navigation (e.g. #local-landmarks, #local-routes)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash) return;
      try {
        const target = document.querySelector(hash);
        if (target) {
          const details = target.closest("details");
          if (details) {
            details.open = true;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      } catch {
        // Gracefully ignore selector issues
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const rawRoutes = keyRoutes || routes;
  const hasLandmarks = landmarks && landmarks.length > 0;
  const hasRoutes = rawRoutes && rawRoutes.length > 0;
  const hasServices = mainServices && mainServices.length > 0;

  // Defaults if empty
  const defaultLandmarks = [
    `ชุมชนและตลาดสำคัญในเขต ${thaiName}`,
    "อาคารชุด คอนโดมิเนียม และหมู่บ้านจัดสรร",
    "จุดโหลดสินค้า โกดัง และศูนย์กระจายสินค้า",
    "สถานีขนส่ง และจุดเชื่อมต่อคมนาคมหลัก",
  ];

  const defaultRoutes = [
    "ถนนสายหลักเชื่อมต่อใจกลางเมืองและปริมณฑล",
    "เส้นทางเลี่ยงเมืองและถนนวงแหวนรอบนอก",
    "ทางหลวงแผ่นดินเชื่อมโยงระหว่างจังหวัด",
  ];

  const defaultServices = [
    "รถรับจ้างย้ายบ้าน ทาวน์โฮม และคอนโดมิเนียม",
    "รถกระบะขนส่งสินค้าโรงงานและพัสดุด่วน",
    "บริการขนส่งมอเตอร์ไซค์และบิ๊กไบค์ล็อกล้อมาตรฐาน",
    "บริการพนักงานช่วยยกของมืออาชีพ",
  ];

  const activeLandmarks = hasLandmarks ? landmarks : defaultLandmarks;
  const activeRoutes = hasRoutes ? rawRoutes : defaultRoutes;
  const activeServices = hasServices ? mainServices : defaultServices;

  const resolvedPriceNote =
    priceNote ||
    `ประเมินราคาตามระยะทางจริง ปริมาณสิ่งของ และความต้องการพนักงานช่วยยกของ โดย WMS TRANSPORT ยึดหลักความโปร่งใส แจ้งราคาสุทธิตรงไปตรงมาก่อนเริ่มงาน ไม่มีบวกเพิ่มหน้างาน`;

  return (
    <div className={`mb-8 space-y-4 ${className}`} id="area-local-details">
      {/* PANEL 1: LANDMARKS & PICKUP POINTS */}
      <details
        className="group bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400/80 transition-all duration-200 overflow-hidden"
        id="details-landmarks"
      >
        <summary className="flex items-center justify-between p-3.5 sm:p-4 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-colors">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div
              className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80 group-hover:bg-blue-600 group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3
                id="local-landmarks"
                className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0 leading-snug"
              >
                จุดขึ้น-ลงสินค้าและแลนด์มาร์กสำคัญในโซน{thaiName}
              </h3>
              <p className="text-xs text-slate-500 m-0 mt-0.5 truncate leading-relaxed">
                ครอบคลุม {activeLandmarks.length} จุดยุทธศาสตร์และย่านสำคัญในพื้นที่
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-open:rotate-180 transition-transform duration-200 shrink-0" />
          </div>
        </summary>

        <div className="px-4 pb-4 pt-3 text-slate-600 text-sm border-t border-slate-100 bg-slate-50/30">
          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
            ทีมงานรถกระบะตู้ทึบ WMS TRANSPORT ชำนาญเส้นทางในพื้นที่ เข้าตรอก ซอยแคบ ลานจอดเทียบ หรืออาคารชุดได้อย่างคล่องตัว:
          </p>
          <div className="flex flex-wrap gap-2">
            {activeLandmarks.map((lm, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 shadow-2xs text-slate-800 text-xs sm:text-sm font-medium"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{lm}</span>
              </span>
            ))}
          </div>
        </div>
      </details>

      {/* PANEL 2: CONNECTED ROUTES */}
      <details
        className="group bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400/80 transition-all duration-200 overflow-hidden"
        id="details-routes"
      >
        <summary className="flex items-center justify-between p-3.5 sm:p-4 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-colors">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div
              className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100/80 group-hover:bg-sky-600 group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              <Route className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3
                id="local-routes"
                className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0 leading-snug"
              >
                โครงข่ายถนนและเส้นทางขนส่งหลัก
              </h3>
              <p className="text-xs text-slate-500 m-0 mt-0.5 truncate leading-relaxed">
                เชื่อมต่อเส้นทางขนส่งหลักในเขต {thaiName} เข้าสู่ทุกภูมิภาค
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-open:rotate-180 transition-transform duration-200 shrink-0" />
          </div>
        </summary>

        <div className="px-4 pb-4 pt-3 text-slate-600 text-sm border-t border-slate-100 bg-slate-50/30">
          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
            เส้นทางเชื่อมโยงสำคัญสำหรับการเดินทางและกระจายสินค้าด่วนตลอด 24 ชั่วโมง:
          </p>
          <div className="flex flex-wrap gap-2">
            {activeRoutes.map((rt, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 shadow-2xs text-slate-800 text-xs sm:text-sm font-medium"
              >
                <Route className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{rt}</span>
              </span>
            ))}
          </div>
        </div>
      </details>

      {/* PANEL 3: POPULAR SERVICES */}
      <details
        className="group bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400/80 transition-all duration-200 overflow-hidden"
        id="details-services"
      >
        <summary className="flex items-center justify-between p-3.5 sm:p-4 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-colors">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div
              className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/80 group-hover:bg-emerald-600 group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              <Truck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3
                id="local-services"
                className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0 leading-snug"
              >
                บริการที่ได้รับความนิยมสูงสุดในพื้นที่
              </h3>
              <p className="text-xs text-slate-500 m-0 mt-0.5 truncate leading-relaxed">
                ย้ายบ้าน • หอพัก • ส่งสินค้าโรงงาน • มอเตอร์ไซค์บิ๊กไบค์
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-open:rotate-180 transition-transform duration-200 shrink-0" />
          </div>
        </summary>

        <div className="px-4 pb-4 pt-3 text-slate-600 text-sm border-t border-slate-100 bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeServices.map((svc, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-white border border-slate-200/90 text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>{svc}</span>
              </div>
            ))}
          </div>
        </div>
      </details>

      {/* Pricing & Estimation Note Callout Box */}
      <div
        className="p-4 rounded-2xl border"
        style={{
          backgroundColor: "rgba(8, 123, 255, 0.05)",
          borderColor: "rgba(8, 123, 255, 0.2)",
          borderRadius: "1rem",
        }}
      >
        <h4 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600" />
          <span>ข้อมูลราคาและการประเมินค่าขนส่ง</span>
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 mb-0 leading-relaxed">
          {resolvedPriceNote}
        </p>
      </div>
    </div>
  );
}
