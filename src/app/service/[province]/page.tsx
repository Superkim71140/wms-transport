import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  ShieldCheck,
  Users,
  Phone,
  ChevronDown,
  Home,
  Bike,
  Package,
  ArrowRight,
  Star,
  Quote,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TransitTimeVisualizer from "@/components/TransitTimeVisualizer";

// ─────────────────────────────────────────────
// Location data — add new regions here only
// ─────────────────────────────────────────────
export const provinceMap: Record<
  string,
  {
    name: string;
    shortName: string;
    region: string;
    lat: string;
    lng: string;
  }
> = {
  bangkok: {
    name: "กรุงเทพมหานคร",
    shortName: "กรุงเทพฯ",
    region: "ภาคกลาง",
    lat: "13.7563",
    lng: "100.5018",
  },
  phuket: {
    name: "ภูเก็ต",
    shortName: "ภูเก็ต",
    region: "ภาคใต้",
    lat: "7.8906",
    lng: "98.3981",
  },
  chonburi: {
    name: "ชลบุรี",
    shortName: "ชลบุรี",
    region: "ภาคตะวันออก",
    lat: "13.3611",
    lng: "100.9847",
  },
  "chiang-mai": {
    name: "เชียงใหม่",
    shortName: "เชียงใหม่",
    region: "ภาคเหนือ",
    lat: "18.7883",
    lng: "98.9853",
  },
  samutsakhon: {
    name: "สมุทรสาคร",
    shortName: "สมุทรสาคร",
    region: "ภาคกลาง",
    lat: "13.5475",
    lng: "100.2744",
  },
  "samut-songkhram": {
    name: "สมุทรสงคราม",
    shortName: "สมุทรสงคราม",
    region: "ภาคกลาง",
    lat: "13.4098",
    lng: "100.0022",
  },
  "bkk-thonburi": {
    name: "กรุงเทพฯ ฝั่งธนบุรี",
    shortName: "ฝั่งธนบุรี",
    region: "ภาคกลาง",
    lat: "13.7251",
    lng: "100.4788",
  },
};

// ─────────────────────────────────────────────
// Hyper-local reviews mapping
// ─────────────────────────────────────────────
const localReviews: Record<
  string,
  { author: string; text: string; rating: number; tag: string }
> = {
  bangkok: {
    author: "คุณปิยะพล (กทม.)",
    text: "ใช้บริการย้ายหอพักในกรุงเทพฯ ประทับใจมาก พนักงานตรงเวลา คอยระมัดระวังเฟอร์นิเจอร์เป็นพิเศษ แพ็กของดีมากครับ",
    rating: 5,
    tag: "ย้ายคอนโด/หอพัก",
  },
  phuket: {
    author: "คุณวรัญญา (ภูเก็ต)",
    text: "ขนส่งมอเตอร์ไซค์มาภูเก็ต รถไม่มีรอยเลย ทีมงานดูแลดีมาก",
    rating: 5,
    tag: "ส่งมอเตอร์ไซค์",
  },
  chonburi: {
    author: "คุณสมศักดิ์ (ศรีราชา)",
    text: "จ้างเหมารถกระบะตู้ทึบส่งสินค้าจากโรงงานชลบุรีไปกทม. รวดเร็วทันใจ มีประกันเคลมสินค้า วิ่งรอบดึกให้ด้วยครับ",
    rating: 5,
    tag: "ส่งสินค้าโรงงาน",
  },
  "chiang-mai": {
    author: "คุณธนารีย์ (เชียงใหม่)",
    text: "ย้ายบ้านจากนนทบุรีมาเชียงใหม่ ระยะทางไกลแต่ของไม่เสียหายเลย คนยกสุภาพ สรุปงานเร็ว ประทับใจมากค่ะ",
    rating: 5,
    tag: "ย้ายบ้านต่างจังหวัด",
  },
  samutsakhon: {
    author: "คุณเกรียงไกร (มหาชัย)",
    text: "ย้ายของจากกระทุ่มแบน รวดเร็ว ตรงเวลา แพ็กของแน่นหนาครับ",
    rating: 5,
    tag: "ย้ายบ้าน/หอพัก",
  },
  "bkk-thonburi": {
    author: "คุณจินดา (ฝั่งธนบุรี)",
    text: "เรียกใช้บริการย้ายหอแถวปิ่นเกล้า น้องๆ ยกของระมัดระวังมาก",
    rating: 5,
    tag: "รถรับจ้างตู้ทึบ",
  },
};

export async function generateStaticParams() {
  return Object.keys(provinceMap).map((province) => ({ province }));
}

// ISR: Revalidate every hour
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>;
}): Promise<Metadata> {
  const { province } = await params;
  const loc = provinceMap[province];
  const name = loc?.name ?? province;
  return {
    title: `ศูนย์รวมบริการขนส่ง รถกระบะรับจ้าง ${name} | WMS TRANSPORT`,
    description: `บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ในพื้นที่${name}และทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ ประเมินราคาฟรี 24 ชม.`,
    alternates: {
      canonical: `/service/${province}`,
    },
  };
}

export default async function LocationHubPage({
  params,
}: {
  params: Promise<{ province: string }>;
}) {
  const { province } = await params;
  const loc = provinceMap[province];
  const provinceThai = loc?.name ?? province;
  const provinceShort = loc?.shortName ?? province;
  const lat = loc?.lat ?? "13.7563";
  const lng = loc?.lng ?? "100.5018";

  // Dynamic review matching
  const review = localReviews[province] || {
    author: "คุณกฤษดา",
    text: "ประทับใจการบริการ ขนส่งรวดเร็ว ปลอดภัย พนักงานสุภาพและเอาใจใส่สิ่งของเป็นอย่างดี ราคาเป็นกันเองตรงไปตรงมา",
    rating: 5,
    tag: "บริการประทับใจ",
  };

  const subServices = [
    {
      icon: Home,
      title: `ย้ายหอพัก / คอนโด ${provinceShort}`,
      description:
        "บริการย้ายบ้าน คอนโด หอพัก พร้อมคนช่วยยกของ แพ็กซีลกันกระแทกอย่างหนาแน่น ส่งตรงถึงที่",
      href: `/service/${province}/moving`,
      badge: "ยอดนิยม",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    },
    {
      icon: Bike,
      title: `ขนส่งมอเตอร์ไซค์ ${provinceShort}`,
      description:
        "ขนส่งรถมอเตอร์ไซค์ บิ๊กไบค์ ทุกรุ่น ด้วยรถกระบะตู้ทึบปิดมิดชิด รัดตรึงด้วยสายรัดพิเศษ ปลอดภัย 100%",
      href: `/service/${province}/motorcycle`,
      badge: "มีประกัน",
      badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      icon: Package,
      title: `ขนส่งสินค้า ${provinceShort}`,
      description:
        "รถรับจ้างขนส่งสินค้า เหมาคัน ตู้ทึบหลังคาสูง รับส่งสินค้าทั่วไป วัสดุก่อสร้าง อุปกรณ์สำนักงาน",
      href: `/service/${province}/freight`,
      badge: "เหมาคัน",
      badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    },
  ];

  const faqs = [
    {
      q: `รถรับจ้างตู้ทึบใน ${provinceThai} คิดราคาอย่างไร?`,
      a: `ค่าบริการรถรับจ้างตู้ทึบในพื้นที่ ${provinceThai} คิดราคาเริ่มต้นตามระยะทางจริงและขนาดของรถ โดยมีราคาเริ่มต้นสำหรับการขนของในเมืองที่โปร่งใส ไม่มีค่าใช้จ่ายลึกลับบวกเพิ่มหน้างาน 100%`,
    },
    {
      q: `ใช้เวลาย้ายบ้านจากกรุงเทพไป ${provinceThai} กี่ชั่วโมง?`,
      a: `ระยะเวลาในการขนย้ายขึ้นอยู่กับระยะทางจากกรุงเทพมหานครไปยังปลายทางใน ${provinceThai} โดยเฉลี่ยสำหรับการเดินทางระยะไกล ทีมงานของเราสามารถดำเนินการขนย้ายและจัดส่งถึงที่หมายอย่างปลอดภัยในเวลาที่รวดเร็วที่สุดตามที่กำหนด`,
    },
    {
      q: `มีบริการคนช่วยยกของในจังหวัด ${provinceThai} หรือไม่?`,
      a: `เรามีทีมงานพนักงานช่วยยกของมืออาชีพคอยให้บริการในพื้นที่ ${provinceThai} เพื่อช่วยแบ่งเบาภาระในการยกของหนัก ขนย้ายเฟอร์นิเจอร์ หรือย้ายหอพัก คอนโด อย่างเป็นระบบและระมัดระวังสูงสุด`,
    },
  ];

  // Schema Definitions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const logisticsSchema = {
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    name: `WMS Transport บริการขนส่งและรถรับจ้าง ${provinceThai}`,
    description: `บริการรถรับจ้างตู้ทึบ ย้ายบ้าน และขนส่งมอเตอร์ไซค์ ในพื้นที่จังหวัด ${provinceThai}`,
    provider: {
      "@type": "LocalBusiness",
      name: "WMS Transport",
      image: "https://wms-transport.com/logoWMS.png",
      telephone: "0612402436",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: provinceThai,
        addressCountry: "TH",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: lat,
        longitude: lng,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(logisticsSchema) }}
      />
      <Navbar />

      <main className="flex-1 relative pt-32 pb-24 md:pt-40 md:pb-36">
        {/* Ambient background glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-[10%] left-[-5%] w-[1000px] h-[1000px] bg-blue-600/[0.04] rounded-full blur-[200px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[1000px] h-[1000px] bg-indigo-500/[0.05] rounded-full blur-[250px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex justify-start">
            <Breadcrumbs
              items={[
                { name: "พื้นที่ให้บริการ", item: "/#areas" },
                { name: provinceThai, item: `/service/${province}` },
              ]}
            />
          </div>

          {/* ── HERO SECTION ── */}
          <div className="text-center mt-6 mb-20">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              {loc?.region ?? "ทั่วประเทศ"} · ศูนย์บริการขนส่ง
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              บริการขนย้าย และรถรับจ้าง
              <br />
              <span className="text-blue-400">
                ในพื้นที่ {provinceThai}
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              WMS Transport ให้บริการรถกระบะตู้ทึบรับจ้างครอบคลุมพื้นที่{provinceThai}{" "}
              และขนส่งข้ามจังหวัดทั่วประเทศ พร้อมทีมงานช่วยยกของมืออาชีพ
              ปลอดภัย มีประกันภัยอุบัติเหตุทุกเที่ยวการเดินทาง
            </p>

            {/* Quick CTA */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(6,199,85,0.3)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt="LINE"
                  width={24}
                  height={24}
                  className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0"
                />
                <span>ติดต่อผ่าน LINE</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-400/50 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="font-mono tracking-wider">061-240-2436</span>
              </a>
            </div>
          </div>

          {/* ── SUB-SERVICES GRID ── */}
          <section className="mb-24">
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-3">
              เลือกบริการที่คุณต้องการใน{provinceShort}
            </h2>
            <p className="text-slate-400 text-center text-sm mb-10">
              คลิกที่บริการเพื่อดูรายละเอียด ราคา และขั้นตอนการสั่งจอง
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="group bg-gradient-to-br from-white/[0.02] to-white/[0.04] hover:from-blue-900/20 hover:to-slate-900/50 backdrop-blur-xl border border-white/5 hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-300 p-8 rounded-3xl flex flex-col gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] relative overflow-hidden"
                  >
                    {/* Top glow on hover */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Bottom animated gradient line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500" />

                    <div className="flex items-start justify-between gap-3">
                      <div className="w-14 h-14 bg-blue-600/15 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600/25 group-hover:scale-110 transition-all duration-300 shrink-0">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider shrink-0 ${service.badgeColor}`}
                      >
                        {service.badge}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-blue-400 text-sm font-bold group-hover:gap-3 transition-all duration-300">
                      <span>ดูรายละเอียด</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── PORTFOLIO CTA BANNER ── */}
          <section className="mb-24">
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 backdrop-blur-xl rounded-[32px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  มั่นใจทุกการขนย้าย ด้วยผลงานจริงระดับมืออาชีพ
                </h3>
                <p className="text-slate-300 text-sm font-medium">
                  ดูรูปภาพและรีวิวผลงานการขนย้ายของเราที่ผ่านมาได้ที่นี่
                </p>
              </div>
              <Link
                href="/portfolio"
                className="shrink-0 whitespace-nowrap bg-white/10 hover:bg-blue-500 text-white border border-blue-400/50 hover:border-blue-500 px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 font-bold flex items-center gap-2 group/btn"
              >
                ดูภาพผลงาน <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* ── HYPER-LOCAL TESTIMONIAL ── */}
          <section className="mb-24 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">
              เสียงตอบรับจากผู้ใช้บริการในพื้นที่{provinceShort}
            </h2>
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group hover:border-blue-500/30 transition-all duration-500">
              {/* Subtle accent glow */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
              <div className="absolute top-4 right-4 text-blue-500/10 pointer-events-none">
                <Quote className="w-24 h-24 rotate-180" />
              </div>
              <div className="flex flex-col gap-2 shrink-0 items-center md:items-start relative z-10">
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/25">
                  {review.tag}
                </span>
                <div className="flex items-center gap-1 mt-2 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current shrink-0" />
                  ))}
                </div>
                <p className="text-white font-extrabold text-lg mt-2">{review.author}</p>
                <p className="text-slate-500 text-xs font-semibold">ผู้รับบริการจริงในพื้นที่</p>
              </div>
              <div className="flex-1 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 relative z-10">
                <p className="text-slate-200 text-lg font-medium leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* ── TRANSIT TIME VISUALIZER ── */}
          <section className="mb-24">
            <TransitTimeVisualizer province={province} />
          </section>

          {/* ── FEATURES STRIP ── */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">
                ขนส่งด้วยตู้ทึบมาตรฐาน
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                รถกระบะตู้ทึบหลังคาสูง กันฝน กันแดด กันฝุ่น 100%
                เหมาะสำหรับขนย้ายบ้าน ขนย้ายเฟอร์นิเจอร์ หรือขนส่งสินค้าทุกประเภท
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">
                พนักงานช่วยยกของมืออาชีพ
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                ไม่ต้องเหนื่อยยกของเอง เรามีทีมงานพนักงานขนย้ายที่มีความชำนาญ
                สุภาพ จัดเรียงสิ่งของประหยัดพื้นที่ และทะนุถนอมสิ่งของเป็นอย่างดี
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">
                มีประกันสินค้าปลอดภัย
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                รับประกันความเสียหายระหว่างทาง ช่วยเพิ่มความอุ่นใจให้กับทุกขั้นตอน
                เพื่อให้ทรัพย์สินของคุณถึงปลายทางอย่างไร้กังวล
              </p>
            </div>
          </section>

          {/* ── PRICING INFO ── */}
          <div className="bg-gradient-to-r from-blue-600/[0.1] to-cyan-500/[0.05] border border-blue-500/20 p-8 md:p-12 rounded-[32px] text-left mb-24 font-sans">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              อัตราค่าบริการและโปรโมชั่นพิเศษในพื้นที่ {provinceThai}
            </h2>
            <ul className="space-y-4 text-slate-300 font-medium">
              <li className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  บริการขนส่งรถมอเตอร์ไซค์/บิ๊กไบค์ จาก {provinceThai} ไปทุกภาคทั่วประเทศ ราคาเริ่มต้น 1,500 บาท
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  บริการย้ายหอพัก คอนโด บ้าน พร้อมคนยกของ ดำเนินการโดยรวดเร็วในเขต {provinceThai}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  คิดราคาจริงใจตามระยะทางและประเภทการใช้งาน ไม่มีบวกเพิ่มทีหลัง 100%
                </span>
              </li>
            </ul>
          </div>

          {/* ── LOCAL FAQ ── */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-white text-center mb-12">
              คำถามที่พบบ่อย (FAQ) ใน {provinceThai}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white/[0.02] border border-white/5 open:border-blue-500/30 open:bg-gradient-to-br open:from-blue-950/20 open:via-[#040b15]/50 open:to-[#040b15] open:shadow-[0_20px_50px_rgba(59,130,246,0.1)] rounded-3xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all duration-300 hover:border-white/10 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-300 opacity-0 group-open:opacity-100 transition-opacity duration-300" />
                  <summary className="flex justify-between items-center font-extrabold text-white text-lg list-none select-none">
                    <span className="group-open:text-blue-400 transition-colors duration-300 pr-4">
                      {faq.q}
                    </span>
                    <span className="ml-1.5 shrink-0 p-2 bg-white/5 group-open:bg-blue-500/10 text-slate-400 group-open:text-blue-400 rounded-xl border border-white/10 group-open:border-blue-500/20 group-open:rotate-180 transition-all duration-300">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="mt-5 text-slate-300 leading-relaxed font-medium pl-4 border-l border-white/10 group-open:border-blue-500/30 transition-colors duration-300">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
