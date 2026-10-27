"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/seo/site-config";
import Image from "next/image";
import {
  ClipboardCopy,
  Check,
  Truck,
  Calendar,
  MapPin,
  Camera,
  AlertCircle,
  ExternalLink,
  Layers,
} from "lucide-react";
import InputWithIcon from "@/components/ui/InputWithIcon";

export interface QuotationPlannerProps {
  areaName: string;
  className?: string;
}

const COMMON_ITEMS = [
  "เตียง/ที่นอน",
  "ตู้เสื้อผ้า",
  "ตู้เย็น",
  "เครื่องซักผ้า",
  "โซฟา",
  "โต๊ะ/เก้าอี้",
  "มอเตอร์ไซค์",
  "กล่องสัมภาระ/พัสดุ",
];

export default function QuotationPlanner({
  areaName,
  className = "",
}: QuotationPlannerProps) {
  // 1. Photos or Items List (Default hasPhotos to false so we don't pre-confirm condition without input)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customItemText, setCustomItemText] = useState("");
  const [hasPhotos, setHasPhotos] = useState(false);

  // 2. Pickup & Destination
  const [pickupLoc, setPickupLoc] = useState(`ย่าน${areaName}`);
  const [destinationLoc, setDestinationLoc] = useState("");

  // 3. Preferred Moving Date
  const [moveDate, setMoveDate] = useState("");

  // 4. Floor, Lift, Parking, and Access Information
  const [floorAccess, setFloorAccess] = useState("ชั้น 1 (พื้นราบ)");
  const [parkingAccess, setParkingAccess] = useState("รถจอดเทียบหน้าประตูได้");
  const [helperCount, setHelperCount] = useState("คนขับช่วยยกอย่างเดียว");

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const allItemsList = [
    ...selectedItems,
    ...(customItemText.trim() ? [customItemText.trim()] : []),
  ].join(", ");

  const formattedSummary = `[ข้อมูลประเมินราคารถรับจ้าง WMS TRANSPORT]
1. รายการสิ่งของ: ${allItemsList || "ของใช้ทั่วไป / เฟอร์นิเจอร์"} (${
    hasPhotos ? "เตรียมรูปถ่ายไว้พร้อมส่งใน LINE" : "ยังไม่ได้แนบรูปถ่าย"
  })
2. จุดรับ–ส่ง:
   - ต้นทาง: ${pickupLoc || `ย่าน${areaName}`}
   - ปลายทาง: ${destinationLoc || "โปรดระบุปลายทาง"}
3. วันและเวลาขนย้าย: ${moveDate || "ยังไม่ระบุวัน"}
4. ข้อมูลชั้นและหน้างาน:
   - ระดับชั้น/ลิฟต์: ${floorAccess}
   - จุดจอดเทียบ: ${parkingAccess}
   - บริการช่วยยก: ${helperCount}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formattedSummary);
        setCopied(true);
        setCopyError(false);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = formattedSummary;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (success) {
          setCopied(true);
          setCopyError(false);
        } else {
          setCopyError(true);
        }
      }
    } catch {
      setCopyError(true);
    }

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <section
      id="quote-prep"
      aria-labelledby="quotation-planner-title"
      className={`bg-white rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-200/90 shadow-xs scroll-mt-24 mb-10 ${className}`}
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2.5">
          <Truck className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
          <span>แผงเตรียมข้อมูลประเมินราคา 4 หัวข้อสำคัญ</span>
        </div>
        <h2
          id="quotation-planner-title"
          className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug"
        >
          เตรียมข้อมูล 4 ข้อเพื่อขอประเมินราคารถรับจ้าง {areaName}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          ระบุข้อมูล 4 ข้อด้านล่าง เพื่อให้ทีมงาน WMS ประเมินขนาดรถ คำนวณเส้นทาง และแจ้งราคาสุทธิได้อย่างรวดเร็วทาง LINE ไม่มีค่าใช้จ่ายแอบแฝง
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Form Inputs (Left 7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Fieldset 1: Photos or List of Items */}
          <fieldset className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200">
            <legend className="text-sm sm:text-base font-bold text-slate-900 px-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0" aria-hidden="true">
                1
              </span>
              <span>รูปถ่ายสิ่งของ หรือรายการของชิ้นใหญ่</span>
            </legend>

            <p className="text-xs sm:text-sm text-slate-500 mb-3 mt-1 leading-normal">
              แตะเลือกรายการของชิ้นใหญ่ หรือพิมพ์ระบุเพิ่มเติม:
            </p>

            <div className="flex flex-wrap gap-2 mb-3.5" role="group" aria-label="ตัวเลือกสิ่งของยอดนิยม">
              {COMMON_ITEMS.map((item) => {
                const isSelected = selectedItems.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleItem(item)}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span>{isSelected ? "✓" : "+"}</span>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>

            <div className="mb-3">
              <label htmlFor="custom-items-input" className="sr-only">
                ระบุสิ่งของเพิ่มเติม
              </label>
              <input
                id="custom-items-input"
                type="text"
                value={customItemText}
                onChange={(e) => setCustomItemText(e.target.value)}
                placeholder="พิมพ์ระบุสิ่งของเพิ่มเติม (เช่น กล่อง 10 ใบ, โซฟา 3 ที่นั่ง)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-base bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 min-h-[48px]"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={hasPhotos}
                onChange={(e) => setHasPhotos(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4.5 h-4.5 mt-0.5 shrink-0"
              />
              <span className="flex items-center gap-1.5 leading-snug">
                <Camera className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                <span>เตรียมรูปถ่ายของชิ้นใหญ่ไว้พร้อมส่งให้เจ้าหน้าที่ในแชท LINE (แนะนำที่สุด เพื่อประเมินขนาดรถได้แม่นยำ 100%)</span>
              </span>
            </label>
          </fieldset>

          {/* Fieldset 2: Pickup and Destination */}
          <fieldset className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200">
            <legend className="text-sm sm:text-base font-bold text-slate-900 px-1 flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0" aria-hidden="true">
                2
              </span>
              <span>จุดรับต้นทาง และจุดส่งปลายทาง</span>
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputWithIcon
                id="pickup-location-input"
                label="จุดรับ (ต้นทาง):"
                icon={<MapPin className="w-5 h-5 text-blue-600" />}
                value={pickupLoc}
                onChange={(e) => setPickupLoc(e.target.value)}
                placeholder={`เช่น ซอย/หมู่บ้าน ในย่าน${areaName}`}
              />

              <InputWithIcon
                id="destination-location-input"
                label="จุดส่ง (ปลายทาง):"
                icon={<MapPin className="w-5 h-5 text-emerald-600" />}
                value={destinationLoc}
                onChange={(e) => setDestinationLoc(e.target.value)}
                placeholder="เช่น อำเภอ/เขต/จังหวัด ปลายทาง"
              />
            </div>
          </fieldset>

          {/* Fieldset 3: Preferred Moving Date */}
          <fieldset className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200">
            <legend className="text-sm sm:text-base font-bold text-slate-900 px-1 flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0" aria-hidden="true">
                3
              </span>
              <span>วันและเวลาที่สะดวกขนย้าย</span>
            </legend>

            <InputWithIcon
              id="move-date-input"
              label="วันและเวลาที่ต้องการนัดหมาย:"
              icon={<Calendar className="w-5 h-5 text-slate-500" />}
              value={moveDate}
              onChange={(e) => setMoveDate(e.target.value)}
              placeholder="เช่น วันเสาร์นี้ ช่วงเช้า 09:00 น. หรือ ระบุวันที่ต้องการ"
            />
          </fieldset>

          {/* Fieldset 4: Floor, Lift, Parking, and Access Information */}
          <fieldset className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200">
            <legend className="text-sm sm:text-base font-bold text-slate-900 px-1 flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0" aria-hidden="true">
                4
              </span>
              <span>ข้อมูลชั้น ลิฟต์ ที่จอดรถ และพนักงานช่วยยก</span>
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label htmlFor="floor-access-select" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                  ระดับชั้น / ลิฟต์:
                </label>
                <div className="relative">
                  <select
                    id="floor-access-select"
                    value={floorAccess}
                    onChange={(e) => setFloorAccess(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-slate-300 text-sm sm:text-base bg-white text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 min-h-[48px]"
                  >
                    <option value="ชั้น 1 (พื้นราบ)">ชั้น 1 (พื้นราบ)</option>
                    <option value="มีลิฟต์โดยสาร/ลิฟต์ขนของ">มีลิฟต์ขนของ</option>
                    <option value="บันไดชั้น 2 (ไม่มีลิฟต์)">บันไดชั้น 2 (ไม่มีลิฟต์)</option>
                    <option value="บันไดชั้น 3 (ไม่มีลิฟต์)">บันไดชั้น 3 (ไม่มีลิฟต์)</option>
                    <option value="บันไดชั้น 4 ขึ้นไป">บันไดชั้น 4 ขึ้นไป</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="parking-access-select" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                  จุดจอดเทียบรถ:
                </label>
                <div className="relative">
                  <select
                    id="parking-access-select"
                    value={parkingAccess}
                    onChange={(e) => setParkingAccess(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-slate-300 text-sm sm:text-base bg-white text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 min-h-[48px]"
                  >
                    <option value="รถจอดเทียบหน้าประตูได้">เทียบหน้าประตูได้</option>
                    <option value="จอดในลานจอด (เดินยก 10-20 ม.)">เดินยก 10-20 ม.</option>
                    <option value="ซอยแคบ ต้องจอดปากซอย">ซอยแคบ เดินยกไกล</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="helper-count-select" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                  พนักงานช่วยยกของ:
                </label>
                <div className="relative">
                  <select
                    id="helper-count-select"
                    value={helperCount}
                    onChange={(e) => setHelperCount(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-slate-300 text-sm sm:text-base bg-white text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 min-h-[48px]"
                  >
                    <option value="คนขับช่วยยกอย่างเดียว">คนขับช่วยยกอย่างเดียว</option>
                    <option value="ต้องการคนยกเพิ่ม 1 คน">ขอคนยกเพิ่ม 1 คน</option>
                    <option value="ต้องการคนยกเพิ่ม 2 คน">ขอคนยกเพิ่ม 2 คน</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        {/* Live Formatted Summary & Handoff Card (Right 5 cols on lg) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50/80 to-white p-5 sm:p-6 shadow-xs sticky top-[calc(var(--site-header-offset,80px)+16px)]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-blue-100">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                <span>ข้อความสรุปสำหรับส่ง LINE</span>
              </span>
              <span className="text-[11px] text-slate-500 font-semibold bg-blue-100/60 px-2 py-0.5 rounded-full">
                WMS ประเมินราคาฟรี
              </span>
            </div>

            {/* Readonly Textarea preview */}
            <label htmlFor="quote-summary-textarea" className="sr-only">
              ตัวอย่างข้อความสรุปสำหรับส่ง LINE
            </label>
            <textarea
              id="quote-summary-textarea"
              readOnly
              value={formattedSummary}
              rows={9}
              className="w-full font-mono text-xs sm:text-sm leading-relaxed p-3.5 rounded-xl border border-blue-200/90 bg-white text-slate-700 resize-none select-all focus:outline-none mb-4 shadow-2xs"
            />

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleCopy}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition-all active:scale-[0.98] cursor-pointer min-h-[48px] ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>คัดลอกข้อความแล้ว!</span>
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="w-4 h-4" aria-hidden="true" />
                    <span>คัดลอกข้อความเพื่อส่ง LINE</span>
                  </>
                )}
              </button>

              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm shadow-xs transition-all active:scale-[0.98] min-h-[48px]"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt=""
                  width={20}
                  height={20}
                  className="w-4 h-4 object-contain"
                />
                <span>เปิดแชท LINE เพื่อวางข้อความ</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" aria-hidden="true" />
              </a>
            </div>

            {copyError && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5 mt-2.5 flex items-center gap-1.5 leading-tight">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                <span>ไม่สามารถคัดลอกอัตโนมัติได้ กรุณาแตะเลือกข้อความในกรอบด้านบนแล้วกดคัดลอกด้วยตนเอง</span>
              </p>
            )}

            <p className="text-xs text-slate-500 text-center mt-3.5 leading-normal">
              * เมื่อกดปุ่ม “เปิดแชท LINE” สามารถกดวาง (Paste) ข้อความที่คัดลอกไว้ลงในห้องแชทได้ทันที พร้อมแนบรูปสิ่งของเพื่อให้เจ้าหน้าที่คำนวณราคาได้แม่นยำ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
