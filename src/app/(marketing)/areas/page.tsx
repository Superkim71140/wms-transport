import type { Metadata } from "next";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Navigation, 
  ExternalLink, 
  ArrowRight,
  Compass,
  CheckCircle2,
  Truck
} from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";
import QuotationPreparationGuide from "@/components/QuotationPreparationGuide";

export const metadata: Metadata = {
  title: "พื้นที่บริการรถรับจ้าง WMS Transport | สมุทรสาคร กรุงเทพฯ และทั่วประเทศ",
  description: "ตรวจสอบพื้นที่บริการรถรับจ้าง WMS Transport สำหรับย้ายบ้าน ขนส่งมอเตอร์ไซค์ และขนส่งสินค้า จากสมุทรสาคร กรุงเทพฯ และปริมณฑล ไปยังปลายทางทั่วประเทศ",
  alternates: {
    canonical: "/areas",
  },
  openGraph: {
    title: "พื้นที่บริการรถรับจ้าง WMS Transport | สมุทรสาคร กรุงเทพฯ และทั่วประเทศ",
    description: "ตรวจสอบพื้นที่บริการรถรับจ้าง WMS Transport สำหรับย้ายบ้าน ขนส่งมอเตอร์ไซค์ และขนส่งสินค้า จากสมุทรสาคร กรุงเทพฯ และปริมณฑล ไปยังปลายทางทั่วประเทศ",
    url: `${siteConfig.baseUrl}/areas`,
    type: "website",
    siteName: siteConfig.businessName,
    locale: siteConfig.locale,
    images: [
      {
        url: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "พื้นที่บริการรถรับจ้าง WMS Transport | สมุทรสาคร กรุงเทพฯ และทั่วประเทศ",
    description: "ตรวจสอบพื้นที่บริการรถรับจ้าง WMS Transport สำหรับย้ายบ้าน ขนส่งมอเตอร์ไซค์ และขนส่งสินค้า จากสมุทรสาคร กรุงเทพฯ และปริมณฑล ไปยังปลายทางทั่วประเทศ",
    images: [`${siteConfig.baseUrl}${siteConfig.defaultOgImage}`],
  },
};

export default function AreasPage() {
  const gmapsEmbedUrl = `https://maps.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}&hl=th&z=16&output=embed`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "หน้าหลัก",
        "item": siteConfig.baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "พื้นที่บริการ",
        "item": `${siteConfig.baseUrl}/areas`
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${siteConfig.baseUrl}/#moving-company`,
    "name": siteConfig.businessFullName,
    "url": `${siteConfig.baseUrl}/areas`,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "openingHours": siteConfig.openingHours,
    "hasMap": siteConfig.googleMapsUrl,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.streetAddress,
      "addressLocality": siteConfig.address.addressLocality,
      "addressRegion": siteConfig.address.addressRegion,
      "postalCode": siteConfig.address.postalCode,
      "addressCountry": siteConfig.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.geo.latitude,
      "longitude": siteConfig.geo.longitude
    },
    "areaServed": siteConfig.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      "name": area
    }))
  };

  // 4 Priority Local Hubs with varied descriptive Thai anchors
  const priorityHubs = [
    {
      title: "บริการรถรับจ้างฝั่งธนบุรี",
      subtitle: "ศูนย์กลางบริการ 15 เขตฝั่งธนฯ",
      corridor: "เพชรเกษม • กาญจนาภิเษก • ราชพฤกษ์",
      desc: "ครอบคลุมทั้งกลุ่มเขตกรุงธนเหนือและกรุงธนใต้ ย้ายคอนโดมิเนียมแนว BTS/MRT ทาวน์โฮม บ้านเดี่ยว และขนส่งสินค้า",
      tag: "โซนหลัก กทม.",
      href: "/service/bkk-thonburi",
      actionText: "ดูข้อมูลรถรับจ้างฝั่งธนบุรี 15 เขต",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "รถรับจ้างย่านเพชรเกษม–บางแค",
      subtitle: "จุดบริการย่อยเขตบางแคและพุทธมณฑล",
      corridor: "เพชรเกษม • กาญจนาภิเษก • พุทธมณฑลสาย 1–3",
      desc: "เจาะลึกพื้นที่เขตบางแค ย้ายหอพัก คอนโดเดอะมอลล์บางแค หมู่บ้านจัดสรร และขนส่งมอเตอร์ไซค์บิ๊กไบค์",
      tag: "จุดบริการเจาะลึก",
      href: "/areas/bkk-thonburi/bang-khae",
      actionText: "ดูข้อมูลรถรับจ้างเพชรเกษม–บางแค",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      title: "บริการรถรับจ้างสมุทรสาคร",
      subtitle: "ฐานปฏิบัติการหลักและจุดจอดรถ WMS",
      corridor: "พระราม 2 • ตัวเมือง • กระทุ่มแบน • บ้านแพ้ว",
      desc: "ศูนย์รวมรถกระบะตู้ทึบ รับขนย้ายบ้าน ขนส่งสินค้าโรงงานอุตสาหกรรม และกระจายสินค้าสู่ทุกภูมิภาค",
      tag: "ฐานปฏิบัติการ",
      href: "/service/samutsakhon",
      actionText: "ดูข้อมูลรถรับจ้างสมุทรสาครและพระราม 2",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "รถรับจ้างมหาชัย–พระราม 2",
      subtitle: "ย่านการค้าและนิคมอุตสาหกรรม",
      corridor: "นิคมอุตสาหกรรม • ตลาดมหาชัย • ถนนเศรษฐกิจ 1",
      desc: "เน้นงานขนส่งสินค้าโรงงาน โกดังสินค้า สินค้าประมงแห้ง/แปรรูป และขนย้ายที่อยู่อาศัยในเขตอำเภอเมือง",
      tag: "ศูนย์กลางเศรษฐกิจ",
      href: "/areas/samutsakhon/maha-chai",
      actionText: "ดูข้อมูลรถรับจ้างมหาชัย–นิคมฯ",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  const supportingCorridors = [
    {
      title: "สมุทรสงคราม",
      desc: "เมืองสมุทรสงคราม อัมพวา บางคนที และเส้นทางเชื่อมต่อแม่กลอง",
      href: "/service/samut-songkhram",
      anchorText: "บริการขนส่งสมุทรสงคราม",
    },
    {
      title: "เส้นทางสายใต้และภูเก็ต",
      desc: "บริการขนย้ายบ้าน ขนส่งมอเตอร์ไซค์ และสินค้าเหมาเที่ยวสู่ภาคใต้",
      href: "/service/phuket",
      anchorText: "บริการขนส่งภูเก็ตและสายใต้",
    },
    {
      title: "เส้นทางต่างจังหวัดทั่วประเทศ",
      desc: "บริการเหมารถกระบะตู้ทึบเดินทางไปยังทุกจังหวัดตามนัดหมาย",
      href: "/pricing/freight",
      anchorText: "ตรวจสอบราคาขนส่งต่างจังหวัด",
    },
  ];

  const guideSteps = [
    {
      stepNum: "01",
      title: "เลือกโซนบริการที่ใกล้จุดรับของ",
      desc: "เลือกศูนย์บริการฝั่งธนบุรีหรือสมุทรสาครตามพิกัดตั้งต้น เพื่อให้ทีมงานจัดสรรคิวรถในพื้นที่ที่ใกล้ที่สุด",
    },
    {
      stepNum: "02",
      title: "แจ้งจุดรับและจุดส่งจริง",
      desc: "ระบุชื่อซอย ถนน โครงการหมู่บ้าน หรืออาคารคอนโดมิเนียม เพื่อให้คำนวณระยะทางวิ่งจริงได้อย่างแม่นยำ",
    },
    {
      stepNum: "03",
      title: "ตรวจสอบการเข้าถึงอาคาร",
      desc: "เช็คความสูงของจุดจอดเทียบรถ ลิฟต์ขนของ หรือบันได เพื่อจัดเตรียมรถกระบะตู้ทึบและอุปกรณ์ป้องกันที่เหมาะสม",
    },
    {
      stepNum: "04",
      title: "ขอใบเสนอราคาเฉพาะกรณี",
      desc: "ประเมินราคาตามระยะทางจริง ปริมาณสัมภาระ และจำนวนคนช่วยยก ไม่มีค่าใช้จ่ายแอบแฝงหรือคิดราคาเหมาสุ่ม",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* 1. HERO SECTION: WMS OPERATIONAL BASE */}
      <section className="relative w-full pt-24 pb-28 sm:pt-28 lg:pt-32 lg:pb-36 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  หน้าหลัก
                </Link>
              </li>
              <li className="text-white/40 select-none">/</li>
              <li>
                <Link href="/areas" className="text-white/70 hover:text-white transition-colors">
                  พื้นที่บริการ
                </Link>
              </li>
              <li className="text-white/40 select-none">/</li>
              <li className="text-white/90 font-semibold" aria-current="page">
                จุดจอดรถและสำนักงานใหญ่
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
            ที่ตั้งสำนักงานและฐานปฏิบัติการ WMS
          </h1>
          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl mx-auto">
            ศูนย์กลางการเดินรถเพื่อกระจายงานขนส่งไปยังกรุงเทพฯ ปริมณฑล และทั่วประเทศ พร้อมระบบประสานงานที่รวดเร็ว
          </p>
        </div>
      </section>

      {/* 2. FLOATING ACTION CARDS */}
      <section className="relative z-20 -mt-12 sm:-mt-16 w-full">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: LINE Chat */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#06c755]/10 text-[#06c755] flex items-center justify-center mb-3">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.365 9.864c0-4.043-4.197-7.33-9.365-7.33-5.167 0-9.364 3.287-9.364 7.33 0 3.619 3.208 6.647 7.545 7.218.294.064.694.195.795.447.091.229.06.586.03.816-.06.456-.277 1.777-.308 1.97-.046.287-.215 1.123.987.612 1.202-.511 6.48-3.818 8.847-6.536 1.488-1.745 1.833-3.085 1.833-4.527z"/>
              </svg>
            </div>
            <div className="mb-2">
              <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/80 mb-2">ประเมินราคาฟรี</span>
              <h2 className="text-lg font-bold text-slate-900">แชทประเมินราคา</h2>
              <p className="text-xs font-semibold text-emerald-600 mt-0.5">ส่งรูปของ & พิกัดประเมินราคา</p>
            </div>
            <p className="text-sm text-slate-600 mb-5 flex-grow">
              แจ้งพิกัดรับ-ส่งและรายการสิ่งของเบื้องต้นทาง LINE เจ้าหน้าที่จะตรวจสอบรถและสรุปราคาให้โดยไม่มีค่าใช้จ่ายแอบแฝง
            </p>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ติดต่อผ่าน LINE ทันที"
              className="w-full py-3 px-4 bg-[#06c755] hover:bg-[#05b34c] text-white text-sm font-bold rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <span>ติดต่อผ่าน LINE ทันที</span>
            </a>
          </div>

          {/* Card 2: Featured Hotline */}
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-900/10 border-t-4 border-amber-400 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <div className="mb-2">
              <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200/80 mb-2">โทรสอบถามคิวงาน</span>
              <h2 className="text-lg font-bold text-slate-900">โทรสายด่วน</h2>
              <p className="text-xs font-semibold text-blue-600 mt-0.5">โทรจองคิว & เช็คพื้นที่ด่วน</p>
            </div>
            <p className="text-sm text-slate-600 mb-5 flex-grow">
              คุยตรงกับคนขับเพื่อเช็คความพร้อมของรถและนัดหมายวันเวลาเดินทาง ปรึกษาเรื่องคนช่วยยกของได้ทันที
            </p>
            <a
              href={siteConfig.phoneHref}
              aria-label={`โทร ${siteConfig.phone}`}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>โทร 061-240-2436</span>
            </a>
          </div>

          {/* Card 3: GPS Navigation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="mb-2">
              <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/80 mb-2">หมุดที่ตั้งจริงบน Google Maps</span>
              <h2 className="text-lg font-bold text-slate-900">เปิดนำทาง GPS / หมุดที่ตั้งจริง</h2>
            </div>
            <p className="text-sm text-slate-600 mb-5 flex-grow">
              เช็คพื้นที่บริการและเดินทางมายังจุดจอดหลัก สมุทรสาคร พร้อมพิกัด GPS ที่แม่นยำ
            </p>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="เปิดเส้นทางใน Google Maps"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>เปิดเส้นทางใน Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2.5 SERVICE INTRO & LOCATION DETAILS (Modern Luxury Logistics Bento Grid) */}
      <section className="relative py-10 md:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden w-full">
        {/* Section Header */}
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center">
            เช็คพื้นที่บริการและติดต่อประเมินราคา
          </h2>
          <p className="mt-3 text-slate-600 text-sm md:text-base max-w-3xl mx-auto text-center leading-relaxed">
            WMS Transport ให้บริการรถกระบะตู้ทึบรับจ้างขนย้ายบ้าน คอนโด ขนส่งมอเตอร์ไซค์ และสินค้า จากจุดจอดหลักสมุทรสาคร กรุงเทพฯ ฝั่งธนบุรี สู่ปลายทางทั่วประเทศ
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="relative max-w-6xl mx-auto px-4 mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Official Contact & Profile Bento Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100 p-6 md:p-7 flex flex-col justify-between">
            
            {/* Brand & Geo Badges */}
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">WMS Transport</h3>
              <p className="text-blue-600 font-semibold text-sm mt-1">รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ บิ๊กไบค์</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200/60">ต.บ้านเกาะ</span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200/60">อ.เมืองสมุทรสาคร</span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200/60">จ.สมุทรสาคร</span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200/60">Plus Code: J62W+QG</span>
              </div>
            </div>

            {/* Bento Detail Tiles */}
            <address className="not-italic space-y-4 my-6 flex-grow">
              {/* Row 1 (Location) */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-0.5">ที่อยู่สถานที่ตั้งจริง</span>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    75 535 ซ.13 ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร จังหวัดสมุทรสาคร 74000
                  </p>
                </div>
              </div>
              
              {/* Row 2 (Hours) */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-0.5">เวลาทำการ</span>
                  <p className="text-sm font-semibold text-slate-800">เปิดรับงานทุกวัน (กรุณานัดหมายคิวล่วงหน้า)</p>
                </div>
              </div>

              {/* Row 3 (Hotline) */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-0.5">ติดต่อด่วน</span>
                  <a href={siteConfig.phoneHref} className="text-base font-bold text-blue-700 hover:text-blue-800 transition-colors">061-240-2436</a>
                </div>
              </div>

              {/* Row 4 (Email) */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-0.5">อีเมล</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-xs md:text-sm font-medium text-slate-700 break-all hover:text-blue-600 transition-colors">1999.kittinanwimonset@gmail.com</a>
                </div>
              </div>
            </address>

            {/* Primary Action CTA */}
            <div>
              <a
                href={siteConfig.phoneHref}
                aria-label="โทรสอบถาม 061-240-2436"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 text-white font-bold text-sm md:text-base shadow-lg shadow-blue-700/25 hover:shadow-blue-700/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>โทรสอบถาม</span>
              </a>
            </div>

            {/* Social Proof Container (Facebook Card) */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-1.5">
                <svg className="w-4 h-4 fill-current text-blue-600 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <h4 className="font-bold text-slate-800 text-xs">ชมภาพงานจริง & ส่งข้อความ</h4>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium ml-auto">อัปเดตผลงานจริง</span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                ตรวจสอบภาพถ่ายงานขนย้ายจริง การจัดเรียงสิ่งของ และการดูแลมอเตอร์ไซค์บนหน้าเพจ Facebook เพื่อความมั่นใจ
              </p>
              <a href={siteConfig.facebookPageAlt || siteConfig.facebookUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold text-xs inline-flex items-center gap-1 mt-2.5 hover:underline">
                ชมเพจ Facebook <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Clean Interactive Map Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100 overflow-hidden flex flex-col">
            
            {/* Top Header Bar */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-200">พิกัดจุดจอดหลัก: ต.บ้านเกาะ อ.เมือง จ.สมุทรสาคร</span>
              </div>
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-300 hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
              >
                เปิดแอป Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Map Frame Area */}
            <div className="relative w-full h-[440px] md:h-full min-h-[440px] border-0 bg-slate-100 flex-grow">
              <iframe
                title="แผนที่แสดงที่ตั้งสำนักงานและจุดจอดรถ WMS Transport ต.บ้านเกาะ อ.เมืองสมุทรสาคร"
                src={gmapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Bottom Coordinates Bar */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200/70">
                พิกัด: {siteConfig.geo.latitude}, {siteConfig.geo.longitude}
              </span>
              <a 
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-bold hover:underline inline-flex items-center gap-1 transition-colors"
              >
                ดูแผนที่ขนาดใหญ่และขอเส้นทาง <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FOUR PRIORITY SERVICE HUBS (Core Local SEO & Crawlable Links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full text-xs font-bold tracking-wide mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>พื้นที่ให้บริการหลัก 4 โซนสำคัญ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#071326] tracking-tight leading-tight mb-3">
            เส้นทางประจำและศูนย์บริการเฉพาะจุด
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            เลือกดูข้อมูลเจาะลึกเฉพาะพื้นที่เพื่อตรวจสอบเส้นทางสัญจรประจำ รูปแบบงานที่รองรับ และเงื่อนไขการขนย้ายในแต่ละย่าน
          </p>
        </div>

        {/* 4 Cards Grid with Strong Visual Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {priorityHubs.map((hub, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold border ${hub.badgeColor}`}>
                    {hub.tag}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {hub.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#071326] group-hover:text-blue-600 transition-colors mb-1.5">
                  {hub.title}
                </h3>

                <p className="text-xs font-semibold text-blue-600 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{hub.corridor}</span>
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {hub.desc}
                </p>
              </div>

              <Link
                href={hub.href}
                className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-blue-600 text-slate-800 hover:text-white font-bold text-xs sm:text-sm border border-slate-200 hover:border-blue-600 transition-all duration-200"
              >
                <span>{hub.actionText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Supporting Corridors Strip */}
        <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>เส้นทางเชื่อมโยงภูมิภาคและต่างจังหวัด</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {supportingCorridors.map((c, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/70 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">{c.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{c.desc}</p>
                </div>
                <Link
                  href={c.href}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 mt-auto"
                >
                  <span>{c.anchorText}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CUSTOMER GUIDANCE: HOW TO CHOOSE SERVICE AREA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full">
        <div className="bg-gradient-to-br from-blue-50/60 via-white to-slate-50 border border-blue-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/80 text-blue-800 rounded-full text-xs font-bold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>คำแนะนำสำหรับลูกค้า</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071326] tracking-tight mb-3">
              คำแนะนำในการเลือกพื้นที่บริการและขอราคา
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              เพื่อให้การวางแผนขนย้ายสะดวก รวดเร็ว และได้ราคาที่ตรงตามงานจริง แนะนำให้ดำเนินการตาม 4 ขั้นตอนง่าย ๆ ดังนี้
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {guideSteps.map((step) => (
              <div
                key={step.stepNum}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-blue-200 transition-colors"
              >
                <div>
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-3 shadow-2xs">
                    {step.stepNum}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EMBEDDED QUOTATION PREPARATION GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        <QuotationPreparationGuide pageContext="พื้นที่ให้บริการ WMS TRANSPORT" />
      </section>

      {/* 6. BOTTOM CTA PANEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#071326] border border-blue-900/60 p-8 sm:p-12 lg:p-14 text-center overflow-hidden shadow-2xl text-white">
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none select-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #60A5FA 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              ไม่แน่ใจว่าเส้นทางของคุณอยู่ในพื้นที่บริการหรือไม่?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              ส่งจุดรับ จุดส่ง วันที่ต้องการใช้บริการ และภาพสิ่งของให้ทีมงานช่วยตรวจสอบได้ทันที ยินดีให้คำแนะนำและประเมินราคาตามจริง
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ส่งรายละเอียดทาง LINE"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] min-h-[44px]"
              >
                <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M19.365 9.864c0-4.043-4.197-7.33-9.365-7.33-5.167 0-9.364 3.287-9.364 7.33 0 3.619 3.208 6.647 7.545 7.218.294.064.694.195.795.447.091.229.06.586.03.816-.06.456-.277 1.777-.308 1.97-.046.287-.215 1.123.987.612 1.202-.511 6.48-3.818 8.847-6.536 1.488-1.745 1.833-3.085 1.833-4.527z"/>
                </svg>
                <span>ส่งรายละเอียดทาง LINE</span>
              </a>

              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs sm:text-sm rounded-xl transition-all duration-300 hover:scale-[1.02] min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>โทรสอบถามพื้นที่บริการ</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
