import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/seo/site-config";
import { 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  Info, 
  ArrowUpCircle, 
  Signpost, 
  MapPin 
} from "lucide-react";

export interface NearbyAreaLink {
  name: string;
  slug: string;
  href?: string;
}

export interface ParentAreaLink {
  name: string;
  href: string;
}

export interface CorridorLink {
  name: string;
  href?: string;
}

export interface ServiceAreaSidebarProps {
  thaiName: string;
  isHeadquarters?: boolean;
  isRegionalHub?: boolean;
  geographicType?: "headquarters" | "regional_hub" | "service_area";
  startingPrice?: string;
  deliveryEstimate?: string;
  parentArea?: ParentAreaLink;
  corridors?: CorridorLink[];
  nearbyAreas?: NearbyAreaLink[];
  phoneHref?: string;
  phone?: string;
  lineUrl?: string;
}

export default function ServiceAreaSidebar({
  thaiName,
  isHeadquarters = false,
  isRegionalHub = false,
  geographicType,
  startingPrice = "เริ่มต้น 1,500 บาท",
  deliveryEstimate = "เข้าถึงหน้างานภายใน 30-60 นาที",
  parentArea,
  corridors = [],
  nearbyAreas = [],
  phoneHref = siteConfig.phoneHref,
  phone = siteConfig.phone,
  lineUrl = siteConfig.lineUrl,
}: ServiceAreaSidebarProps) {
  const resolvedGeographicLabel =
    isHeadquarters || geographicType === "headquarters"
      ? "สำนักงานใหญ่"
      : isRegionalHub || geographicType === "regional_hub"
      ? "ศูนย์กลางภูมิภาค"
      : "พื้นที่ให้บริการ";

  return (
    <div className="sticky top-[calc(var(--site-header-offset)+16px)] z-10 space-y-4">
      {/* 1. Navy Service Summary Card */}
      <div
        className="p-5 rounded-2xl text-white shadow-xl border border-sky-400/25"
        style={{
          background: "linear-gradient(145deg, #071638 0%, #0F2A66 100%)",
          borderRadius: "1.25rem",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className="px-2.5 py-1 rounded-full font-semibold text-xs inline-flex items-center gap-1.5"
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              color: "#38BDF8",
              border: "1px solid rgba(56, 189, 248, 0.3)",
            }}
          >
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>สรุปข้อมูลเส้นทาง</span>
          </span>
          <span className="text-slate-300 text-xs" style={{ fontSize: "0.78rem" }}>
            {resolvedGeographicLabel}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-3 leading-snug">
          รถกระบะตู้ทึบ {thaiName}
        </h3>

        <div className="flex flex-col gap-2.5 mb-4 text-slate-200 text-xs sm:text-sm">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-slate-300">สถานะพื้นที่:</span>
            <span className="font-semibold text-emerald-400 inline-flex items-center gap-1.5">
              <span className="rounded-full bg-emerald-400 w-1.5 h-1.5"></span>
              <span>{isHeadquarters ? "สำนักงานใหญ่ (HQ)" : "ให้บริการจริง 100%"}</span>
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-slate-300">ราคาเริ่มต้น:</span>
            <span className="font-extrabold text-amber-300 text-sm">{startingPrice}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-slate-300">ระยะเวลาเข้ารับ:</span>
            <span className="font-semibold text-white">{deliveryEstimate}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-300">สเปกรถมาตรฐาน:</span>
            <span className="font-semibold text-sky-300">ตู้ทึบหลังคาสูง (2.1 ม.)</span>
          </div>
        </div>

        {/* High-Conversion CTAs */}
        <div className="flex flex-col gap-2">
          <a
            href={phoneHref}
            className="w-full py-2.5 font-bold inline-flex items-center justify-center gap-2 shadow-sm no-underline text-white transition hover:opacity-95 active:scale-[0.99]"
            style={{
              backgroundColor: "#087BFF",
              borderRadius: "9999px",
              fontSize: "0.92rem",
            }}
            title={`โทรด่วน ${phone}`}
          >
            <Phone className="w-4 h-4 text-white" />
            <span>โทรสอบถาม {phone}</span>
          </a>

          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 font-bold inline-flex items-center justify-center gap-2 shadow-sm no-underline text-white transition hover:opacity-95 active:scale-[0.99]"
            style={{
              backgroundColor: "#06C755",
              borderRadius: "9999px",
              fontSize: "0.92rem",
            }}
            title="แอด LINE ส่งรูปประเมินราคา"
          >
            <Image
              src="/images/LINE_icon.webp"
              alt="LINE"
              width={18}
              height={18}
              className="w-4 h-4 shrink-0 object-contain"
            />
            <span>แอด LINE ส่งรูปประเมินราคา</span>
          </a>
        </div>
      </div>

      {/* 2. Vehicle Standard Specification Card */}
      <div
        className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs"
        style={{ borderRadius: "1.25rem" }}
      >
        <h4 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-blue-600 shrink-0" />
          <span>มาตรฐานรถรับจ้าง WMS TRANSPORT</span>
        </h4>
        <div className="flex flex-col gap-2 text-slate-600 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>ตู้ทึบหลังคาสูง ปิดมิดชิดป้องกันแดดฝน</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>ความสูงภายในตู้ 2.10 เมตร จุของเต็มปริมาตร</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>ความสูงตัวรถภายนอก ~2.8-3.0 ม. เข้าเทียบจุดโหลดชั้น 1</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>มีสายรัดตรึงและผ้านวมกันรอยทุกเที่ยววิ่ง</span>
          </div>
        </div>
      </div>

      {/* 3. Hierarchy & Parent Link Card (if subdistrict/district) */}
      {parentArea && (
        <div
          className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs"
          style={{ borderRadius: "1.25rem" }}
        >
          <h4 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
            <ArrowUpCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
            <span>พื้นที่ส่วนกลาง / เขตปกครองหลัก</span>
          </h4>
          <div className="flex flex-col gap-1.5">
            <Link
              href={parentArea.href}
              className="p-2 px-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50/60 hover:border-blue-300 no-underline flex justify-between items-center transition-all group text-xs font-semibold text-slate-800"
            >
              <span className="group-hover:text-blue-600">{parentArea.name}</span>
              <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        </div>
      )}

      {/* 4. Connected Corridors / Routes if defined */}
      {corridors && corridors.length > 0 && (
        <div
          className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs"
          style={{ borderRadius: "1.25rem" }}
        >
          <h4 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
            <Signpost className="w-4.5 h-4.5 text-sky-600 shrink-0" />
            <span>แนวถนนและเส้นทางสำคัญ</span>
          </h4>
          <div className="flex flex-col gap-1.5">
            {corridors.slice(0, 5).map((c, idx) => (
              <div
                key={idx}
                className="p-2 px-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2 text-xs text-slate-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span className="font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Nearby Areas Links Card */}
      {nearbyAreas && nearbyAreas.length > 0 && (
        <div
          className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs"
          style={{ borderRadius: "1.25rem" }}
        >
          <h4 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-rose-500 shrink-0" />
            <span>พื้นที่ใกล้เคียงเชื่อมต่อ</span>
          </h4>
          <div className="flex flex-col gap-1.5 mb-2.5">
            {nearbyAreas.slice(0, 4).map((na, idx) => (
              <Link
                key={na.slug || idx}
                href={na.href || `/areas/${na.slug}`}
                className="p-2 px-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50/60 hover:border-blue-300 no-underline flex justify-between items-center transition-all group text-xs"
              >
                <span className="text-slate-800 font-semibold group-hover:text-blue-600">{na.name}</span>
                <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            ))}
          </div>
          <Link
            href="/areas"
            className="text-blue-600 font-bold text-xs no-underline inline-flex items-center gap-1 hover:underline"
          >
            <span>ดูพื้นที่บริการทั้งหมด →</span>
          </Link>
        </div>
      )}
    </div>
  );
}
