"use client";

import React, { useState, useId, Suspense } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/seo/site-config";
import {
  ShieldCheck,
  Phone,
  Home,
  Bike,
  Package,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  Send,
  AlertTriangle,
  Camera,
  X,
  Lock,
  MapPin,
  Truck,
  Info,
} from "lucide-react";

export interface ServiceAreaQuoteFormProps {
  prefillJobType?: string;
  prefillOriginProvince?: string;
  prefillOriginDistrict?: string;
  currentLocationName?: string;
  currentProvince?: string;
  className?: string;
}

interface AttachedImage {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

const JOB_TYPE_OPTIONS = [
  {
    id: "condo_dorm",
    label: "ย้ายหอพัก / คอนโด",
    badge: "ยอดนิยม",
    icon: Home,
  },
  {
    id: "house_moving",
    label: "ย้ายบ้าน / ทาวน์โฮม",
    badge: "ครอบครัว",
    icon: Home,
  },
  {
    id: "motorcycle",
    label: "ส่งมอเตอร์ไซค์ / BigBike",
    badge: "ล็อกล้อ 4 จุด",
    icon: Bike,
  },
  {
    id: "factory_cargo",
    label: "ขนส่งสินค้า / เหมาคัน",
    badge: "โรงงาน/พาเลท",
    icon: Package,
  },
  {
    id: "office_moving",
    label: "ย้ายสำนักงาน / ออฟฟิศ",
    badge: "ธุรกิจ",
    icon: Building2,
  },
];

const THAI_PROVINCES = [
  "สมุทรสาคร",
  "กรุงเทพมหานคร",
  "สมุทรสงคราม",
  "นนทบุรี",
  "ปทุมธานี",
  "สมุทรปราการ",
  "นครปฐม",
  "ชลบุรี",
  "ระยอง",
  "ฉะเชิงเทรา",
  "พระนครศรีอยุธยา",
  "สระบุรี",
  "ลพบุรี",
  "เพชรบุรี",
  "ประจวบคีรีขันธ์",
  "ราชบุรี",
  "กาญจนบุรี",
  "สุพรรณบุรี",
  "นครนายก",
  "ปราจีนบุรี",
  "สระแก้ว",
  "จันทบุรี",
  "ตราด",
  "เชียงใหม่",
  "เชียงราย",
  "ลำปาง",
  "ลำพูน",
  "แม่ฮ่องสอน",
  "น่าน",
  "พะเยา",
  "แพร่",
  "พิษณุโลก",
  "สุโขทัย",
  "ตาก",
  "อุตรดิตถ์",
  "กำแพงเพชร",
  "พิจิตร",
  "นครสวรรค์",
  "อุทัยธานี",
  "ชัยนาท",
  "สิงห์บุรี",
  "อ่างทอง",
  "ขอนแก่น",
  "นครราชสีมา",
  "อุดรธานี",
  "อุบลราชธานี",
  "บุรีรัมย์",
  "สุรินทร์",
  "ศรีสะเกษ",
  "ร้อยเอ็ด",
  "มหาสารคาม",
  "กาฬสินธุ์",
  "สกลนคร",
  "นครพนม",
  "มุกดาหาร",
  "เลย",
  "หนองคาย",
  "หนองบัวลำภู",
  "บึงกาฬ",
  "ยโสธร",
  "อำนาจเจริญ",
  "ชัยภูมิ",
  "ภูเก็ต",
  "สุราษฎร์ธานี",
  "กระบี่",
  "พังงา",
  "สงขลา",
  "นครศรีธรรมราช",
  "ตรัง",
  "พัทลุง",
  "ชุมพร",
  "ระนอง",
  "สตูล",
  "ปัตตานี",
  "ยะลา",
  "นราธิวาส",
];

const MOTORCYCLE_TYPES = [
  "รถครอบครัว / ออโตเมติก (Scoopy, Wave, Fazzio)",
  "บิ๊กสกู๊ตเตอร์ (Forza, XMAX, PCX)",
  "สปอร์ต / บิ๊กไบค์ 300cc - 1000cc+",
  "รถคลาสสิก / เวสป้า / มอเตอร์ไซค์ไฟฟ้า",
];

const FLOOR_ACCESS_OPTIONS = [
  "ชั้น 1 (ไม่ต้องขึ้นบันได)",
  "มีลิฟต์ขนของ / ลิฟต์โดยสาร",
  "ขึ้นบันไดชั้น 2 (ไม่มีลิฟต์)",
  "ขึ้นบันไดชั้น 3-4 (ไม่มีลิฟต์)",
];

const LIFTING_HELP_OPTIONS = [
  "คนขับช่วยยกของ (มาตรฐานสำหรับของทั่วไป)",
  "ต้องการพนักงานช่วยยกเพิ่ม 1 คน",
  "ต้องการพนักงานช่วยยกเพิ่ม 2 คน (งานย้ายบ้านเต็มหลัง)",
  "ลูกค้ายกเองทั้งหมด (ต้องการเฉพาะรถรับจ้างพร้อมคนขับ)",
];

function ServiceAreaQuoteFormInner({
  prefillJobType = "condo_dorm",
  prefillOriginProvince,
  prefillOriginDistrict = "",
  currentLocationName,
  currentProvince,
  className = "",
}: ServiceAreaQuoteFormProps) {
  const baseId = useId();

  // Resolved default origin province
  const resolvedOriginProvince =
    prefillOriginProvince ||
    currentLocationName?.replace(/^(จังหวัด|เขต|อำเภอ)/, "") ||
    (currentProvince === "samutsakhon"
      ? "สมุทรสาคร"
      : currentProvince === "bkk-thonburi" || currentProvince === "bkk-phra-nakhon" || currentProvince === "bangkok"
      ? "กรุงเทพมหานคร"
      : currentProvince === "chonburi"
      ? "ชลบุรี"
      : currentProvince === "chiang-mai"
      ? "เชียงใหม่"
      : currentProvince === "phuket"
      ? "ภูเก็ต"
      : currentProvince === "samut-songkhram"
      ? "สมุทรสงคราม"
      : "สมุทรสาคร");

  // Form State
  const [jobType, setJobType] = useState<string>(prefillJobType);
  const [originProvince, setOriginProvince] = useState<string>(resolvedOriginProvince);
  const [originDistrict, setOriginDistrict] = useState<string>(prefillOriginDistrict);
  const [destinationProvince, setDestinationProvince] = useState<string>("");
  const [destinationDistrict, setDestinationDistrict] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("สะดวกทั้งวัน (08:00 - 18:00)");
  const [cargoDescription, setCargoDescription] = useState<string>("");

  // Conditional Fields: Motorcycle
  const [motorcycleType, setMotorcycleType] = useState<string>(MOTORCYCLE_TYPES[0]);
  const [motorcycleModel, setMotorcycleModel] = useState<string>("");
  const [isRideable, setIsRideable] = useState<string>("ขี่ได้ปกติ");

  // Conditional Fields: Moving
  const [floorOrigin, setFloorOrigin] = useState<string>(FLOOR_ACCESS_OPTIONS[0]);
  const [floorDestination, setFloorDestination] = useState<string>(FLOOR_ACCESS_OPTIONS[0]);
  const [liftingHelp, setLiftingHelp] = useState<string>(LIFTING_HELP_OPTIONS[0]);

  // Conditional Fields: Factory
  const [factoryPackaging, setFactoryPackaging] = useState<string>("พาเลทสินค้า");
  const [factoryWeight, setFactoryWeight] = useState<string>("");
  const [needsPodReturn, setNeedsPodReturn] = useState<boolean>(false);

  // Contact Info
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerLineId, setCustomerLineId] = useState<string>("");

  // Photos
  const [images, setImages] = useState<AttachedImage[]>([]);
  const [imageError, setImageError] = useState<string>("");

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [successResult, setSuccessResult] = useState<{
    quoteRef: string;
    formattedSummary: string;
  } | null>(null);

  // Active Job Label
  const selectedJob = JOB_TYPE_OPTIONS.find((j) => j.id === jobType);
  const activeJobName = selectedJob ? selectedJob.label : "ขนย้ายทั่วไป";

  // Image Upload Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 3) {
      setImageError("สามารถแนบรูปภาพได้ไม่เกิน 3 รูปเท่านั้น");
      return;
    }

    Array.from(files).forEach((file) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setImageError(`ไฟล์ '${file.name}' ไม่ถูกต้อง รองรับเฉพาะ JPG, PNG, WEBP`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setImageError(`ไฟล์ '${file.name}' ใหญ่เกินไป (สูงสุด 5 MB/รูป)`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImages((prev) => [
            ...prev,
            {
              name: file.name,
              type: file.type,
              size: file.size,
              dataUrl: reader.result as string,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Live Summary Text Builder
  const liveSummaryText = [
    `📦 ขอประเมินราคาค่าขนส่ง WMS TRANSPORT:`,
    `• ประเภทงาน: ${activeJobName}`,
    `• ต้นทาง (จุดรับ): ${originProvince}${originDistrict ? ` (${originDistrict})` : ""}`,
    `• ปลายทาง (จุดส่ง): ${destinationProvince || "ยังไม่ระบุ"}${destinationDistrict ? ` (${destinationDistrict})` : ""}`,
    `• วันที่ต้องการขนย้าย: ${appointmentDate || "ระบุภายหลัง"} ${timeSlot ? `(${timeSlot})` : ""}`,
    jobType === "motorcycle" && motorcycleModel ? `• รถมอเตอร์ไซค์: ${motorcycleModel} (${motorcycleType}, ${isRideable})` : null,
    jobType === "house_moving" || jobType === "condo_dorm" || jobType === "office_moving"
      ? `• การเข้าตึก: ต้นทาง [${floorOrigin}] ➔ ปลายทาง [${floorDestination}]`
      : null,
    jobType === "house_moving" || jobType === "condo_dorm" || jobType === "office_moving"
      ? `• ทีมงานช่วยยก: ${liftingHelp}`
      : null,
    jobType === "factory_cargo"
      ? `• สินค้าโรงงาน: ${factoryPackaging} (${factoryWeight || "ไม่ระบุน้ำหนัก"})${needsPodReturn ? " • ต้องการส่งคืนเอกสาร POD" : ""}`
      : null,
    cargoDescription ? `• รายละเอียดเพิ่มเติม: ${cargoDescription}` : null,
    `• เบอร์ติดต่อกลับ: ${customerPhone || "ยังไม่ระบุ"}`,
    customerLineId ? `• LINE ID: ${customerLineId}` : null,
    customerName ? `• ผู้ติดต่อ: ${customerName}` : null,
    images.length > 0 ? `• แนบรูปสิ่งของแล้ว: ${images.length} รูป (แชร์รูปเพิ่มเติมใน LINE ได้)` : null,
    `---------------------------------------`,
    `* สเปกรถมาตรฐาน: กระบะตู้ทึบหลังคาสูง (ภายใน 2.10 ม. / ภายนอก ~2.80-3.00 ม.)`,
    `* เจ้าหน้าที่จะยืนยันราคาสุทธิและคิวว่างตามระยะทางจริง ไม่มีค่าใช้จ่ายแอบแฝง`,
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopySummary = () => {
    const textToCopy = successResult ? successResult.formattedSummary : liveSummaryText;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!destinationProvince) {
      setSubmitError("กรุณาเลือกจังหวัดปลายทาง (จุดส่งของ)");
      return;
    }

    const cleanPhone = customerPhone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 9 || cleanPhone.length > 10) {
      setSubmitError("กรุณากรอกหมายเลขโทรศัพท์ 9-10 หลัก ให้ถูกต้อง เพื่อให้เจ้าหน้าที่ติดต่อกลับได้");
      return;
    }

    if (!appointmentDate) {
      setSubmitError("กรุณาเลือกวันที่ต้องการขนย้ายหรือรับของ");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: customerName.trim() || undefined,
        customerPhone: cleanPhone,
        customerLineId: customerLineId.trim() || undefined,
        jobType: activeJobName,
        originProvince,
        originDistrict: originDistrict || undefined,
        destinationProvince,
        destinationDistrict: destinationDistrict || undefined,
        appointmentDate,
        timeSlot,
        cargoDescription: cargoDescription.trim() || undefined,
        liftingHelp,
        floorOrigin,
        floorDestination,
        motorcycleType: jobType === "motorcycle" ? motorcycleType : undefined,
        motorcycleModel: jobType === "motorcycle" ? motorcycleModel : undefined,
        isRideable: jobType === "motorcycle" ? isRideable : undefined,
        factoryPackaging: jobType === "factory" ? factoryPackaging : undefined,
        factoryWeight: jobType === "factory" ? factoryWeight : undefined,
        needsPodReturn: jobType === "factory" ? needsPodReturn : undefined,
        summaryText: liveSummaryText,
        sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
      };

      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }

      const quoteRef = data.quoteRef || `WMS-${Date.now().toString().slice(-6)}`;
      setSuccessResult({
        quoteRef,
        formattedSummary: `[รหัสอ้างอิง: ${quoteRef}]\n${liveSummaryText}`,
      });
    } catch (err) {
      console.error("[QuoteForm] Submission error:", err);
      setSuccessResult(null);
      setSubmitError(
        (err as Error).message ||
          "ระบบไม่สามารถบันทึกข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง หรือคัดลอกข้อความด้านล่างเพื่อส่งทาง LINE ได้ทันที"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="quotation-calculator"
      className={`p-4 sm:p-6 md:p-8 my-8 bg-white shadow-xl ${className}`}
      style={{
        border: "1px solid rgba(226, 232, 240, 0.9)",
        borderRadius: "1.75rem",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* 1. Header & Trust Banner */}
      <div className="text-center mb-6">
        <span
          className="px-3 py-1.5 rounded-full font-semibold text-xs mb-2 inline-flex items-center gap-1.5"
          style={{
            backgroundColor: "#EFF6FF",
            color: "#1D4ED8",
            border: "1px solid #BFDBFE",
          }}
        >
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>ประเมินราคาจบก่อนเริ่มงาน • ปราศจากค่าใช้จ่ายแอบแฝง</span>
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          ระบบขอใบเสนอราคาและเช็กคิวรถรับจ้างออนไลน์
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mb-0 leading-relaxed">
          กรอกรายละเอียดงานเบื้องต้นเพื่อประเมินค่าขนส่งและตรวจสอบคิวรถกระบะตู้ทึบ (ความสูงตู้ภายใน 2.1 ม.)
          <br className="hidden md:inline" />
          ส่งคำขอถึงทีมงาน WMS TRANSPORT โดยตรง หรือคัดลอกส่งผ่านทาง LINE ได้ตลอด 24 ชั่วโมง
        </p>
      </div>

      {/* SUCCESS STATE VIEW */}
      {successResult ? (
        <div className="p-5 sm:p-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 text-center">
          <div
            className="mb-3 inline-flex items-center justify-center rounded-full"
            style={{ width: "64px", height: "64px", backgroundColor: "#DCFCE7", color: "#16A34A" }}
          >
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 mb-1">
            บันทึกข้อมูลขอใบเสนอราคาเรียบร้อยแล้ว!
          </h3>
          <p className="text-emerald-800 text-xs sm:text-sm mb-3">
            เลขอ้างอิงของคุณ:{" "}
            <strong className="px-2 py-0.5 bg-white rounded border border-emerald-300 text-emerald-900 font-mono">
              {successResult.quoteRef}
            </strong>
          </p>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto mb-4 leading-relaxed">
            เจ้าหน้าที่ได้รับข้อมูลแล้ว และจะตรวจสอบคิวรถตู้ทึบพร้อมประเมินราคาสุทธิ
            เพื่อติดต่อกลับทางหมายเลขโทรศัพท์ <strong>{customerPhone}</strong> หรือทาง LINE โดยเร็วที่สุด
          </p>

          {/* Formatted Confirmation Slip */}
          <div
            className="text-left bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs mx-auto mb-4"
            style={{ maxWidth: "600px" }}
          >
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100">
              <span className="text-xs sm:text-sm font-bold text-slate-700">ใบสรุปข้อมูลงานขนส่ง</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                WMS TRANSPORT
              </span>
            </div>
            <pre
              className="p-2 mb-0 text-slate-800 font-sans text-xs sm:text-sm whitespace-pre-wrap"
              style={{ lineHeight: 1.6 }}
            >
              {successResult.formattedSummary}
            </pre>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap justify-center gap-2.5 mx-auto max-w-lg">
            <a
              href={`${siteConfig.lineUrl}?text=${encodeURIComponent(
                `สวัสดีครับ แจ้งเลขอ้างอิง ${successResult.quoteRef} ขอเช็กคิวรถครับ\n\n${successResult.formattedSummary}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full font-bold text-white inline-flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm transition hover:opacity-95"
              style={{ backgroundColor: "#06C755" }}
            >
              <Image
                src="/images/LINE_icon.webp"
                alt="LINE"
                width={18}
                height={18}
                className="w-4.5 h-4.5 shrink-0 object-contain"
              />
              <span>แจ้งคิวทาง LINE ทันที</span>
            </a>

            <button
              type="button"
              onClick={handleCopySummary}
              className="px-4 py-2.5 rounded-full font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "คัดลอกข้อความแล้ว!" : "คัดลอกสรุปข้อมูล"}</span>
            </button>

            <a
              href={siteConfig.phoneHref}
              className="px-4 py-2.5 rounded-full font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm transition no-underline"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>โทร {siteConfig.phone}</span>
            </a>
          </div>

          {images.length > 0 && (
            <p className="text-slate-500 text-xs mt-3">
              💡 หมายเหตุ: หากแนบรูปถ่ายสิ่งของไว้ ท่านสามารถกดเปิดแชท LINE เพื่อแชร์รูปถ่ายเพิ่มเติมให้เจ้าหน้าที่ประเมินขนาดรถได้ทันที
            </p>
          )}

          <div className="mt-4 pt-3 border-t border-emerald-200/60">
            <button
              type="button"
              onClick={() => {
                setSuccessResult(null);
                setSubmitError("");
                setDestinationProvince("");
              }}
              className="text-slate-600 text-xs underline cursor-pointer hover:text-slate-800"
            >
              ← ประเมินราคางานใหม่อีกครั้ง
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Error Banner */}
          {submitError && (
            <div
              className="p-3.5 mb-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs sm:text-sm flex items-start gap-2.5"
              role="alert"
            >
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong>แจ้งเตือน:</strong> {submitError}
              </div>
            </div>
          )}

          {/* STEP 1: JOB TYPE SELECTION */}
          <div className="mb-5 pb-4 border-b border-slate-100">
            <label className="font-bold text-xs sm:text-sm text-slate-900 mb-2.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs inline-flex items-center justify-center font-bold">
                1
              </span>
              <span>เลือกประเภทงานขนส่ง</span>
              <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {JOB_TYPE_OPTIONS.map((opt) => {
                const isSelected = jobType === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setJobType(opt.id)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all h-full flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 shadow-2xs ring-2 ring-blue-500/20"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 w-full">
                      <span className={`${isSelected ? "text-blue-600" : "text-slate-500"}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {opt.badge}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs leading-snug">
                      {opt.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: ORIGIN & DESTINATION LOCATIONS */}
          <div className="mb-5 pb-4 border-b border-slate-100">
            <label className="font-bold text-xs sm:text-sm text-slate-900 mb-2.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs inline-flex items-center justify-center font-bold">
                2
              </span>
              <span>ระบุจุดรับ (ต้นทาง) และจุดส่ง (ปลายทาง)</span>
              <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Origin */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/40">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-blue-700">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>จุดรับสินค้า / สิ่งของ (ต้นทาง)</span>
                </div>
                <label htmlFor={`${baseId}-origin-prov`} className="text-xs text-slate-600 mb-1 block">
                  จังหวัดต้นทาง <span className="text-red-500">*</span>
                </label>
                <select
                  id={`${baseId}-origin-prov`}
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm mb-2.5 bg-white"
                  value={originProvince}
                  onChange={(e) => setOriginProvince(e.target.value)}
                >
                  {THAI_PROVINCES.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>

                <label htmlFor={`${baseId}-origin-dist`} className="text-xs text-slate-600 mb-1 block">
                  อำเภอ / เขต / ซอย / ชื่ออาคาร
                </label>
                <input
                  id={`${baseId}-origin-dist`}
                  type="text"
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  placeholder="เช่น มหาชัย, นาดี, เพชรเกษม, พระราม 2"
                  value={originDistrict}
                  onChange={(e) => setOriginDistrict(e.target.value)}
                />
              </div>

              {/* Destination */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/40">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-emerald-700">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>จุดส่งมอบสินค้า / ปลายทาง</span>
                </div>
                <label htmlFor={`${baseId}-dest-prov`} className="text-xs text-slate-600 mb-1 block">
                  จังหวัดปลายทาง <span className="text-red-500">*</span>
                </label>
                <select
                  id={`${baseId}-dest-prov`}
                  className={`w-full py-2 px-3 rounded-xl text-xs sm:text-sm mb-2.5 bg-white ${
                    !destinationProvince ? "border-amber-400 bg-amber-50/20" : "border-slate-300"
                  }`}
                  value={destinationProvince}
                  onChange={(e) => setDestinationProvince(e.target.value)}
                >
                  <option value="">-- กรุณาเลือกจังหวัดปลายทาง --</option>
                  {THAI_PROVINCES.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>

                <label htmlFor={`${baseId}-dest-dist`} className="text-xs text-slate-600 mb-1 block">
                  อำเภอ / เขต / จุดหมายปลายทาง
                </label>
                <input
                  id={`${baseId}-dest-dist`}
                  type="text"
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  placeholder="เช่น เมืองเชียงใหม่, อำเภอหาดใหญ่, พัทยา"
                  value={destinationDistrict}
                  onChange={(e) => setDestinationDistrict(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* STEP 3: PROGRESSIVE DISCLOSURE (SPECIFIC QUESTIONS) */}
          <div className="mb-5 pb-4 border-b border-slate-100">
            <label className="font-bold text-xs sm:text-sm text-slate-900 mb-2.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs inline-flex items-center justify-center font-bold">
                3
              </span>
              <span>รายละเอียดเฉพาะสำหรับ: {activeJobName}</span>
            </label>

            {/* Condition A: Motorcycle */}
            {jobType === "motorcycle" && (
              <div className="p-3.5 rounded-2xl border border-sky-200 bg-sky-50/40 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${baseId}-mc-type`} className="text-xs font-semibold text-slate-700 mb-1 block">
                      ประเภทรถมอเตอร์ไซค์
                    </label>
                    <select
                      id={`${baseId}-mc-type`}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      value={motorcycleType}
                      onChange={(e) => setMotorcycleType(e.target.value)}
                    >
                      {MOTORCYCLE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`${baseId}-mc-model`} className="text-xs font-semibold text-slate-700 mb-1 block">
                      ยี่ห้อและรุ่นรถ (ระบุให้ชัดเจน) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`${baseId}-mc-model`}
                      type="text"
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      placeholder="เช่น Honda Forza 350, Yamaha XMAX, Vespa 150"
                      value={motorcycleModel}
                      onChange={(e) => setMotorcycleModel(e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                      สภาพการใช้งานของรถ
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["ขี่ได้ปกติ", "สตาร์ทไม่ติด (ต้องเข็น)", "มีพ่วงข้าง / ล้อแต่ง"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setIsRideable(status)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                            isRideable === status
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-700 border-slate-300 hover:border-blue-400"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Condition B: Moving & Building Access */}
            {(jobType === "house_moving" || jobType === "condo_dorm" || jobType === "office_moving") && (
              <div className="p-3.5 rounded-2xl border border-indigo-200 bg-indigo-50/30 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${baseId}-floor-orig`} className="text-xs font-semibold text-slate-700 mb-1 block">
                      การเข้าตึกฝั่งต้นทาง (จุดยกของขึ้น)
                    </label>
                    <select
                      id={`${baseId}-floor-orig`}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      value={floorOrigin}
                      onChange={(e) => setFloorOrigin(e.target.value)}
                    >
                      {FLOOR_ACCESS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`${baseId}-floor-dest`} className="text-xs font-semibold text-slate-700 mb-1 block">
                      การเข้าตึกฝั่งปลายทาง (จุดยกของลง)
                    </label>
                    <select
                      id={`${baseId}-floor-dest`}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      value={floorDestination}
                      onChange={(e) => setFloorDestination(e.target.value)}
                    >
                      {FLOOR_ACCESS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor={`${baseId}-lifting-help`} className="text-xs font-semibold text-slate-700 mb-1 block">
                      ต้องการทีมงานช่วยยกของหรือไม่?
                    </label>
                    <select
                      id={`${baseId}-lifting-help`}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      value={liftingHelp}
                      onChange={(e) => setLiftingHelp(e.target.value)}
                    >
                      {LIFTING_HELP_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Condition C: Factory Cargo */}
            {jobType === "factory_cargo" && (
              <div className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/30 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${baseId}-pkg`} className="text-xs font-semibold text-slate-700 mb-1 block">
                      รูปแบบการบรรจุสินค้า
                    </label>
                    <input
                      id={`${baseId}-pkg`}
                      type="text"
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      placeholder="เช่น 2 พาเลทมาตรฐาน (1x1.2 ม.), 40 ลังกล่อง"
                      value={factoryPackaging}
                      onChange={(e) => setFactoryPackaging(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${baseId}-weight`} className="text-xs font-semibold text-slate-700 mb-1 block">
                      น้ำหนักโดยประมาณ (สำหรับรถกระบะตอนเดียวตู้ทึบ)
                    </label>
                    <input
                      id={`${baseId}-weight`}
                      type="text"
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      placeholder="เช่น ประมาณ 800 กิโลกรัม"
                      value={factoryWeight}
                      onChange={(e) => setFactoryWeight(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={needsPodReturn}
                        onChange={(e) => setNeedsPodReturn(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span>ต้องการส่งคืนใบส่งของ (POD) หรือเอกสารลงนามต้นฉบับกลับบริษัท</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* General Description */}
            <div>
              <label htmlFor={`${baseId}-cargo-desc`} className="text-xs text-slate-700 mb-1 block">
                รายการสิ่งของชิ้นใหญ่ หรือข้อมูลเพิ่มเติม
              </label>
              <textarea
                id={`${baseId}-cargo-desc`}
                className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                rows={2}
                placeholder="เช่น ที่นอน 6 ฟุต 1 หลัง, ตู้เย็น 2 ประตู 1 เครื่อง, มอเตอร์ไซค์ 1 คัน, กล่องพัสดุ 10 ลัง"
                value={cargoDescription}
                onChange={(e) => setCargoDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* STEP 4: SCHEDULE & DATE */}
          <div className="mb-5 pb-4 border-b border-slate-100">
            <label className="font-bold text-xs sm:text-sm text-slate-900 mb-2.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs inline-flex items-center justify-center font-bold">
                4
              </span>
              <span>วันและเวลาที่ต้องการขนย้าย</span>
              <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor={`${baseId}-date`} className="text-xs text-slate-600 mb-1 block">
                  วันที่ต้องการเข้ารับ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id={`${baseId}-date`}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${baseId}-timeslot`} className="text-xs text-slate-600 mb-1 block">
                  ช่วงเวลาที่สะดวก
                </label>
                <select
                  id={`${baseId}-timeslot`}
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <option value="งานด่วนที่สุด (พร้อมรับภายใน 1-2 ชม.)">งานด่วนที่สุด (พร้อมรับภายใน 1-2 ชม.)</option>
                  <option value="ช่วงเช้า (08:00 - 12:00)">ช่วงเช้า (08:00 - 12:00)</option>
                  <option value="ช่วงบ่าย (12:00 - 17:00)">ช่วงบ่าย (12:00 - 17:00)</option>
                  <option value="ช่วงเย็น / ค่ำ (17:00 - 22:00)">ช่วงเย็น / ค่ำ (17:00 - 22:00)</option>
                  <option value="สะดวกทั้งวัน (08:00 - 18:00)">สะดวกทั้งวัน (08:00 - 18:00)</option>
                </select>
              </div>
            </div>
          </div>

          {/* STEP 5: PHOTO ATTACHMENTS */}
          <div className="mb-5 pb-4 border-b border-slate-100">
            <label className="font-bold text-xs sm:text-sm text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs inline-flex items-center justify-center font-bold">
                5
              </span>
              <span>แนบรูปถ่ายสิ่งของ / สินค้า (ถ้ามี — ช่วยให้ประเมินขนาดรถได้แม่นยำ)</span>
            </label>
            <p className="text-slate-500 text-xs mb-2.5">
              แนบได้สูงสุด 3 รูป (ขนาดไม่เกิน 5 MB/รูป รองรับ JPG, PNG, WEBP)
            </p>

            <div className="flex flex-wrap gap-2.5 items-center mb-2">
              <label
                className="cursor-pointer px-3.5 py-2 rounded-xl border border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-100/60 text-blue-700 text-xs font-semibold inline-flex items-center gap-2 transition"
                htmlFor={`${baseId}-photos`}
              >
                <Camera className="w-4 h-4" />
                <span>+ เลือกรูปถ่ายจากเครื่อง</span>
              </label>
              <input
                id={`${baseId}-photos`}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="text-slate-500 text-xs">
                (แนบแล้ว {images.length}/3 รูป)
              </span>
            </div>

            {imageError && (
              <div className="text-red-600 text-xs mb-2">
                {imageError}
              </div>
            )}

            {/* Thumbnail Preview */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mt-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden border border-slate-200"
                    style={{ width: "80px", height: "80px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.dataUrl} alt={`รูปแนบที่ ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 shadow-sm cursor-pointer"
                      aria-label="ลบรูปภาพนี้"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-[11px] mt-2 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>รูปภาพจะถูกใช้เพื่อการประเมินขนาดรถของทีมงาน WMS TRANSPORT เท่านั้น ปลอดภัย ไม่เผยแพร่สู่สาธารณะ</span>
            </div>
          </div>

          {/* STEP 6: CONTACT INFORMATION */}
          <div className="mb-5 pb-4 border-b border-slate-100">
            <label className="font-bold text-xs sm:text-sm text-slate-900 mb-2.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs inline-flex items-center justify-center font-bold">
                6
              </span>
              <span>ข้อมูลสำหรับติดต่อกลับเพื่อแจ้งราคาและคิวรถ</span>
              <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor={`${baseId}-phone`} className="text-xs text-slate-700 mb-1 block">
                  หมายเลขโทรศัพท์ติดต่อ <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${baseId}-phone`}
                  type="tel"
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold bg-white"
                  placeholder="เช่น 08X-XXX-XXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor={`${baseId}-lineid`} className="text-xs text-slate-700 mb-1 block">
                  LINE ID (สะดวกต่อการส่งรูปสรุปใบเสนอราคา)
                </label>
                <input
                  id={`${baseId}-lineid`}
                  type="text"
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  placeholder="เช่น line_id หรือเบอร์โทร"
                  value={customerLineId}
                  onChange={(e) => setCustomerLineId(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor={`${baseId}-name`} className="text-xs text-slate-700 mb-1 block">
                  ชื่อผู้ติดต่อ (ถ้าสะดวกระบุ)
                </label>
                <input
                  id={`${baseId}-name`}
                  type="text"
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  placeholder="เช่น คุณกฤษณ์, คุณสมชาย"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* VEHICLE CLEARANCE & PRICING TRANSPARENCY CALLOUT */}
          <div className="mb-5 p-3.5 rounded-2xl border border-amber-200 bg-amber-50/60 text-slate-800 text-xs leading-relaxed space-y-1.5">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-950">ข้อกำหนดความสูงและการเข้าอาคาร:</strong> ความสูงภายในตู้สินค้าคือ 2.10 เมตร ส่วนความสูงรวมตัวรถภายนอกอยู่ที่ประมาณ 2.80 - 3.00 เมตร ไม่สามารถเข้าใต้อาคารที่มีคานกั้นต่ำกว่า 2.80 ม. ได้ โดยทีมงานจะเทียบจุดโหลดของชั้นล่าง (Loading Bay) หรือหน้าโถงล็อบบี้
              </div>
            </div>
            <div className="flex items-start gap-2 pt-1 border-t border-amber-200/50">
              <Truck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>เงื่อนไขราคา:</strong> การส่งคำขอในหน้านี้เป็นการขอประเมินราคาและตรวจสอบคิวรถว่างล่วงหน้า ยังไม่มีผลเป็นการจองคิวที่มีข้อผูกมัดจนกว่าจะได้รับการยืนยันราคาสุทธิจากเจ้าหน้าที่
              </div>
            </div>
          </div>

          {/* LIVE INSTANT DRAFT SUMMARY BOX */}
          <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center text-xs">
                  ✓
                </span>
                <span className="font-bold text-xs sm:text-sm text-slate-800">
                  ตัวอย่างข้อความสรุปงาน (อัปเดตตามข้อมูลที่กรอกอัตโนมัติ)
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                WMS TRANSPORT
              </span>
            </div>

            <pre
              className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 text-xs whitespace-pre-wrap mb-3 font-sans"
              style={{ lineHeight: 1.6 }}
            >
              {liveSummaryText}
            </pre>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "คัดลอกข้อความแล้ว!" : "คัดลอกข้อความนี้"}</span>
              </button>

              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold inline-flex items-center gap-1.5 transition no-underline"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt="LINE"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 shrink-0 object-contain"
                />
                <span>เปิดแชท LINE ติดต่อเจ้าหน้าที่</span>
              </a>
            </div>
          </div>

          {/* PRIMARY SUBMISSION BUTTONS */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full font-bold inline-flex items-center justify-center gap-2 shadow-sm text-white transition hover:opacity-95 active:scale-[0.99] cursor-pointer"
              style={{
                backgroundColor: "#087BFF",
                fontSize: "1rem",
              }}
            >
              {isSubmitting ? (
                <span>กำลังบันทึกข้อมูล...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" />
                  <span>ส่งข้อมูลเพื่อขอใบเสนอราคา & เช็กคิวรถว่าง</span>
                </>
              )}
            </button>

            <div className="text-center text-slate-500 text-xs mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
              เจ้าหน้าที่จะสรุปราคาสุทธิและติดต่อกลับทางโทรศัพท์/LINE ทันทีในเวลาทำการ
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ServiceAreaQuoteForm(props: ServiceAreaQuoteFormProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 shadow-sm my-4">
          <span className="text-sm">กำลังโหลดแบบฟอร์มประเมินราคา...</span>
        </div>
      }
    >
      <ServiceAreaQuoteFormInner {...props} />
    </Suspense>
  );
}
