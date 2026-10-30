"use client";

import React, { useState } from "react";
import { Home, Building2, Truck, Bike, Check, AlertCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";

export interface JobTypeItem {
  id: "house" | "dorm" | "freight" | "motorcycle";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortDesc: string;
  checklist: string[];
  vehicleNote: string;
  recommendedServiceHref: string;
}

export interface JobTypeSelectorProps {
  className?: string;
  areaName: string;
  provinceSlug?: string;
}

const JOB_TYPES: JobTypeItem[] = [
  {
    id: "house",
    label: "ย้ายบ้าน / ทาวน์โฮม",
    icon: Home,
    shortDesc: "เหมาะสำหรับบ้านเดี่ยว ทาวน์เฮ้าส์ และทาวน์โฮม มีเฟอร์นิเจอร์ชิ้นใหญ่",
    checklist: [
      "คัดแยกของแตกง่ายและของมีค่าใส่กล่องพร้อมปิดเทปแน่นหนา",
      "วัดขนาดเฟอร์นิเจอร์หลัก เช่น ที่นอน 6 ฟุต, ตู้เสื้อผ้า, ตู้เย็น",
      "สำรวจทางลาดและพื้นที่จอดรถหน้าบ้านหรือซอยหมู่บ้าน",
      "มีทีมงานช่วยยกของและจัดเรียงในตู้ทึบอย่างเป็นระเบียบ",
    ],
    vehicleNote: "รถกระบะตอนเดียวตู้ทึบ ความสูงภายใน 2.1 ม. จุสัมภาระได้เต็มคัน ปิดมิดชิดกันฝน 100%",
    recommendedServiceHref: "/pricing",
  },
  {
    id: "dorm",
    label: "ย้ายหอพัก / คอนโด",
    icon: Building2,
    shortDesc: "เหมาะสำหรับอพาร์ตเมนต์ หอพักนักศึกษา และคอนโดมิเนียมแนวสูง",
    checklist: [
      "นัดหมายและจองเวลาใช้ลิฟต์ขนของกับนิติบุคคลอาคารล่วงหน้า",
      "ตรวจสอบความสูงคานกั้นทางเข้าลานจอด (รถตู้ทึบ WMS สูง 2.1 ม.)",
      "แพ็กเสื้อผ้า เครื่องนอน และของใช้ส่วนตัวลงกล่องหรือกระสอบ",
      "แจ้งเจ้าหน้าที่หากไม่มีลิฟต์และต้องเดินยกขึ้น-ลงบันได",
    ],
    vehicleNote: "คล่องตัวสูง เข้าช่องโหลดของอาคารและจอดเทียบจุดขึ้นลิฟต์ได้สะดวก",
    recommendedServiceHref: "/guides/condo-no-elevator",
  },
  {
    id: "freight",
    label: "ขนส่งสินค้า / โรงงาน",
    icon: Truck,
    shortDesc: "ขนส่งสินค้าโรงงาน วัตถุดิบ อุปกรณ์ออกบูธ และสต็อกร้านค้า",
    checklist: [
      "นับจำนวนกล่อง บรรจุภัณฑ์ หรือพาเลทสินค้าก่อนนัดรับ",
      "เตรียมเอกสารใบส่งสินค้า (POD) หรือใบกำกับภาษีให้คนขับ",
      "นัดเวลาเข้าเทียบ Loading Bay คลังสินค้าหรือหน้าโรงงาน",
      "จัดเรียงกล่องสินค้าหนักไว้ด้านล่าง ป้องกันการยุบตัวระหว่างทาง",
    ],
    vehicleNote: "ตู้ทึบอลูมิเนียมมาตรฐาน สะอาด ปลอดภัย ป้องกันละอองฝนและสิ่งสกปรก",
    recommendedServiceHref: "/pricing",
  },
  {
    id: "motorcycle",
    label: "ขนส่งมอเตอร์ไซค์",
    icon: Bike,
    shortDesc: "บริการส่งมอเตอร์ไซค์ บิ๊กไบค์ และสกู๊ตเตอร์ ปลอดภัยไร้ริ้วรอย",
    checklist: [
      "ล็อกล้อหน้าด้วย Wheel Chock ประคองรถตั้งตรง 90 องศา",
      "รัดตรึงด้วยสายรัด Ratchet Strap ขนาดใหญ่ 4 จุดเฉียง 45 องศา",
      "แรปฟิล์มป้องกันรอยขูดขีดบริเวณแฮนด์ แฟริ่ง และท่อไอเสีย",
      "ขนส่งในตู้ทึบมิดชิด ป้องกันสะเก็ดหิน แดด และลมพายุตลอดเส้นทาง",
    ],
    vehicleNote: "ขนย้ายเฉพาะคัน ปลอดภัย มั่นใจได้ ไม่เสี่ยงต่อการเสียดสีกับคันอื่น",
    recommendedServiceHref: "/pricing",
  },
];

/**
 * JobTypeSelector
 * 
 * Interactive job-type selector allowing customers to pick their moving task
 * and see a tailored preparation checklist.
 * 
 * - Fully server-rendered in HTML (all 4 types present in markup).
 * - Accessible tabs with aria controls.
 * - Pure client-side state without URL filter parameters (zero duplicate indexable URLs).
 */
export default function JobTypeSelector({
  className = "",
  areaName,
}: JobTypeSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>("house");

  return (
    <section
      aria-labelledby="job-type-selector-title"
      className={`w-full bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs mb-10 ${className}`}
    >
      <div className="mb-5">
        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 inline-block mb-2">
          เลือกประเภทงานขนย้าย
        </span>
        <h3
          id="job-type-selector-title"
          className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
        >
          เตรียมตัวก่อนขนย้ายในย่าน{areaName} ตามประเภทงานของคุณ
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          คลิกเลือกประเภทงานด้านล่างเพื่อดูคำแนะนำการเตรียมตัวและมาตรฐานการดูแลเฉพาะด้าน
        </p>
      </div>

      {/* Accessible Tab List (No URL query params) */}
      <div
        role="tablist"
        aria-label="ประเภทงานขนย้าย WMS TRANSPORT"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-xl mb-6"
      >
        {JOB_TYPES.map((jt) => {
          const Icon = jt.icon;
          const isActive = selectedId === jt.id;
          return (
            <button
              key={jt.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${jt.id}`}
              id={`tab-${jt.id}`}
              onClick={() => setSelectedId(jt.id)}
              className={`flex items-center justify-center gap-2 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[46px] select-none ${
                isActive
                  ? "bg-white text-blue-600 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
              <span className="truncate">{jt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels (All server-rendered into DOM for SEO, toggled visually via state) */}
      <div className="space-y-4">
        {JOB_TYPES.map((jt) => {
          const isVisible = selectedId === jt.id;
          return (
            <div
              key={jt.id}
              role="tabpanel"
              id={`panel-${jt.id}`}
              aria-labelledby={`tab-${jt.id}`}
              hidden={!isVisible}
              className={`p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 ${
                isVisible ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200/70">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                    คำแนะนำสำหรับ: {jt.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">{jt.shortDesc}</p>
                </div>

                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs self-start md:self-auto transition-colors"
                >
                  <span>ปรึกษางานนี้ทาง LINE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Checklist Grid */}
              <div className="mb-5">
                <h5 className="text-xs sm:text-sm font-bold text-slate-800 mb-2.5">
                  สิ่งที่ควรเตรียมก่อนวันขนย้าย:
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {jt.checklist.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60"
                    >
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Standard Fleet Note */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/80 border border-blue-200/70 text-xs text-blue-900">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>การจัดรถ:</strong> {jt.vehicleNote}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
