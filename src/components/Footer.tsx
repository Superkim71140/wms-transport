import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";

export default function Footer() {
  const serviceLinks = [
    { label: "บริการย้ายบ้านและย้ายคอนโด", href: "/#services" },
    { label: "บริการขนส่งมอเตอร์ไซค์ทั่วไทย", href: "/pricing/motorcycle-2026" },
    { label: "รถกระบะตู้ทึบขนส่งสินค้าโรงงาน", href: "/pricing/freight" },
    { label: "บริการพนักงานช่วยยกของ", href: "/compare/moving-alone-vs-helpers" },
    { label: "เปรียบเทียบกระบะตู้ทึบ VS กระบะคอก", href: "/compare/pickup-vs-box-truck" },
  ];

  const priorityAreaLinks = [
    { label: "รถรับจ้างมหาชัย (สมุทรสาคร)", href: "/areas/samutsakhon/maha-chai" },
    { label: "รถรับจ้างกระทุ่มแบน–อ้อมน้อย", href: "/areas/krathumbaen-omnoi" },
    { label: "รถรับจ้างบ้านแพ้ว", href: "/areas/banphaeo-kaset" },
    { label: "รถรับจ้างบางแค", href: "/areas/bangkok/bang-khae" },
    { label: "รถรับจ้างหนองแขม", href: "/areas/bangkok/nong-khaem" },
    { label: "รถรับจ้างบางบอน", href: "/areas/bangkok/bang-bon" },
    { label: "รถรับจ้างพระราม 2–บางกระดี่", href: "/areas/rama2-bangkradi" },
    { label: "รถรับจ้างศาลายา–พุทธมณฑล", href: "/areas/salaya-phutthamonthon" },
    { label: "รถรับจ้างสามพราน–เพชรเกษม", href: "/areas/samphran-phetkasem" },
  ];

  const helpfulLinks = [
    { label: "เช็กขนาดรถและคิวบรรทุก (CBM Guide)", href: "/guides/truck-capacity-cbm" },
    { label: "คู่มือเตรียมตัวก่อนย้ายบ้านและหอพัก", href: "/blog/moving-house-checklist" },
    { label: "ขั้นตอนเตรียมรถมอเตอร์ไซค์ก่อนส่ง", href: "/blog/prepare-motorcycle-transport" },
    { label: "ตัวอย่างผลงานการขนย้ายจริง (Portfolio)", href: "/portfolio" },
  ];

  return (
    <footer
      className="text-slate-300 font-sans border-t border-slate-800/80 pt-14 sm:pt-16 pb-[calc(env(safe-area-inset-bottom)+96px)] md:pb-14"
      style={{ backgroundColor: "#07162E" }}
      aria-label="ส่วนท้ายเว็บไซต์ WMS TRANSPORT"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Structured Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Factual Identity (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <Image
                src="/images/logoWMS.webp"
                alt="WMS TRANSPORT โลโก้"
                width={64}
                height={64}
                className="w-14 h-14 rounded-full object-cover border-2 border-sky-400/40 shadow-md shadow-sky-500/10"
              />
              <div>
                <span className="text-lg font-black text-white tracking-tight block">
                  WMS TRANSPORT
                </span>
                <span className="text-xs text-sky-400 font-medium block">
                  ดับบลิวเอ็มเอส ทรานสปอร์ต
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              บริการรถกระบะตู้ทึบรับจ้าง ขนส่งมอเตอร์ไซค์ ย้ายบ้าน คอนโด หอพัก และกระจายสินค้าโรงงานทั่วไทย ประเมินราคาสุทธิชัดเจนก่อนเริ่มงาน พร้อมทีมงานช่วยยกของมืออาชีพ
            </p>

            {/* Verified Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.lineUrl}
                aria-label="ติดต่อ WMS TRANSPORT ผ่าน LINE Official"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt=""
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain"
                />
                <span>แอด LINE สอบถาม</span>
                <ExternalLink className="w-3 h-3 text-white/80" aria-hidden="true" />
              </a>

              <a
                href={siteConfig.facebookPageAlt || siteConfig.facebookUrl}
                aria-label="ติดตามเพจเฟซบุ๊ก WMS TRANSPORT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-[#1877F2] hover:border-[#1877F2] text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <svg
                  className="h-4.5 w-4.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>

            {/* Operational Commitment Highlights */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span>บริการ 24 ชม. (นัดหมาย)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>รัดตรึงสินค้าปลอดภัย</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm sm:text-base mb-4 tracking-tight">
              บริการของเรา
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm list-none p-0 m-0">
              {serviceLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-sky-300 transition-colors inline-flex items-center gap-1.5 leading-snug group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Main Service Areas (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm sm:text-base mb-4 tracking-tight">
              พื้นที่บริการหลัก
            </h3>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm list-none p-0 m-0">
              {priorityAreaLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-sky-300 transition-colors inline-flex items-center gap-1.5 leading-snug group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/areas"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-bold text-xs sm:text-sm"
                >
                  <span>สำรวจพื้นที่บริการทั้งหมด (Area Directory) &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Helpful Information & Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base mb-3.5 tracking-tight">
                ข้อมูลแนะนำ & ติดต่อ
              </h3>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm list-none p-0 m-0 mb-5">
                {helpfulLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-sky-300 transition-colors inline-flex items-center gap-1.5 leading-snug group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Details */}
            <div className="pt-3 border-t border-slate-800 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={siteConfig.phoneHref}
                  className="text-white font-bold hover:text-sky-300 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  สำนักงานใหญ่: {siteConfig.address.streetAddress} {siteConfig.address.addressLocality} จ.{siteConfig.address.addressRegion} {siteConfig.address.postalCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-400">
          <p className="m-0">
            © {new Date().getFullYear()} WMS TRANSPORT (ดับบลิวเอ็มเอส ทรานสปอร์ต). All rights reserved.
          </p>
          <p className="m-0 text-slate-400">
            บริการรถกระบะตู้ทึบรับจ้าง ย้ายบ้าน มอเตอร์ไซค์ ขนส่งสินค้า • สมุทรสาคร–กรุงเทพฯ ทั่วไทย
          </p>
        </div>
      </div>
    </footer>
  );
}
