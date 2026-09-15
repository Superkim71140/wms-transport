import ThonburiHubView from "@/components/ThonburiHubView";
import InternalLinks from "@/components/InternalLinks";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/seo/site-config";
import { escapeJsonLd } from "@/lib/seo/schema";
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
  MapPin,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TransitTimeVisualizer from "@/components/TransitTimeVisualizer";
import LocalOperationsAtlas from "@/components/LocalOperationsAtlas";
import { geoMatrix } from "@/app/data/geoMatrix";
import IntentHero from "@/components/IntentHero";
import { getProvinceIntent } from "@/data/searchIntentMap";
import ServiceAreaPromoBanner from "@/components/service-area/ServiceAreaPromoBanner";
import CompactServiceSummary from "@/components/service-area/CompactServiceSummary";

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
  "bkk-phra-nakhon": {
    name: "กรุงเทพฯ ฝั่งพระนคร",
    shortName: "ฝั่งพระนคร",
    region: "ภาคกลาง",
    lat: "13.7500",
    lng: "100.4916",
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
    text: "จ้างเหมารถกระบะตู้ทึบส่งสินค้าจากโรงงานชลบุรีไปกทม. รวดเร็วทันใจ ดูแลความปลอดภัยสินค้า วิ่งรอบดึกให้ด้วยครับ",
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
  "bkk-phra-nakhon": {
    author: "คุณศิริชัย (ฝั่งพระนคร)",
    text: "ขนย้ายร้านอาหารย่านเมืองเก่า ทีมงานมืออาชีพมาก เข้าซอยแคบได้สบาย รวดเร็วและของปลอดภัยเรียบร้อย",
    rating: 5,
    tag: "ย้ายร้าน/ธุรกิจ",
  },
};

export async function generateStaticParams() {
  return Object.keys(provinceMap).map((province) => ({ province }));
}

// ISR: Revalidate every hour
export const revalidate = 3600;
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>;
}): Promise<Metadata> {
  const { province } = await params;
  const loc = provinceMap[province];
  if (!loc) {
    return {
      title: "ไม่พบหน้าที่ต้องการ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }
  const name = loc?.name ?? province;
  
  let description = `บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ในพื้นที่${name}และทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ ประเมินราคาฟรี 24 ชม.`;
  
  if (province === "bkk-thonburi") {
    return {
      title: "รถรับจ้างฝั่งธนบุรี ย้ายบ้าน คอนโด ขนของ พร้อมคนยก | WMS TRANSPORT",
      description: "บริการรถรับจ้างและขนย้ายฝั่งธนบุรี ครอบคลุม 15 เขต ทั้งกรุงธนเหนือและกรุงธนใต้ รถกระบะตู้ทึบความสูงภายใน 2.1 ม. ขนย้ายสิ่งของมิดชิดปลอดภัย พร้อมทีมงานช่วยยกของ",
      alternates: {
        canonical: "/service/bkk-thonburi",
      },
    };
  }

  if (province === "bkk-phra-nakhon") {
    description = "บริการรถกระบะรับจ้าง กทม ฝั่งพระนคร ขนส่งมอเตอร์ไซค์ พระนคร ย้ายหอพัก ย้ายบ้าน ย้ายคอนโด บริการตู้ทึบรับจ้างพร้อมคนช่วยยกของอย่างมืออาชีพ ราคาถูก ปลอดภัย";
  }

  return {
    title: `บริการขนส่ง รถกระบะรับจ้าง ${name} | WMS TRANSPORT`,
    description,
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
  if (!loc) {
    notFound();
  }
  const provinceThai = loc?.name ?? province;
  const provinceShort = loc?.shortName ?? province;
  const lat = loc?.lat ?? "13.7563";
  const lng = loc?.lng ?? "100.5018";

  if (province === "bkk-thonburi") {
    const thonburiServiceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteConfig.baseUrl}/service/bkk-thonburi#service`,
      name: "WMS TRANSPORT บริการรถรับจ้างและขนย้ายฝั่งธนบุรี",
      description: "บริการรถรับจ้างตู้ทึบ ย้ายบ้าน คอนโด และขนส่งสินค้า ครอบคลุม 15 เขตฝั่งธนบุรี",
      provider: {
        "@id": `${siteConfig.baseUrl}/#moving-company`,
      },
      serviceType: "Moving and Transportation Service",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "กรุงเทพฯ ฝั่งธนบุรี",
      },
    };

    const thonburiFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "รถรับจ้างตู้ทึบ WMS สามารถเข้าลานจอดใต้อาคารคอนโดมิเนียมฝั่งธนบุรีได้หรือไม่?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "รถกระบะตู้ทึบของ WMS TRANSPORT มีความสูงภายในตู้ 2.1 เมตร สำหรับรองรับสิ่งของชิ้นใหญ่ การเข้าจอดเทียบขนย้ายแนะนำให้ประสานงานจุดโหลดของชั้นล่าง (Loading Bay) หรือลานจอดที่ไม่มีสิ่งกีดขวางความสูงกับนิติบุคคลของอาคาร"
          }
        },
        {
          "@type": "Question",
          name: "ตรอกซอยแคบในชุมชนเก่าฝั่งธนบุรี เช่น ย่านตลาดพลู บางยี่เรือ หรือซอยเพชรเกษม รถเข้าได้ไหม?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "รถกระบะตอนเดียวตู้ทึบของเรามีความคล่องตัวสูง สามารถเลี้ยวเข้าตรอกซอยแคบ ข้ามสะพานคลอง และหลบหลีกสายไฟต่ำได้ดีกว่ารถบรรทุก 6 ล้อ ทำให้เข้าถึงหน้าบ้านในซอยลึกของฝั่งธนบุรีได้อย่างปลอดภัย"
          }
        },
        {
          "@type": "Question",
          name: "การขนย้ายข้ามฝั่งแม่น้ำเจ้าพระยา หรือข้ามจังหวัดจากฝั่งธนบุรีคิดราคาอย่างไร?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "เราคำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดรับของในฝั่งธนบุรีไปยังจุดหมายปลายทาง ไม่ว่าจะเป็นการข้ามสะพานเข้าฝั่งพระนคร หรือการวิ่งออกต่างจังหวัด โดยแจ้งราคาและเงื่อนไขชัดเจนก่อนเริ่มงาน ไม่มีค่าใช้จ่ายแอบแฝง"
          }
        },
        {
          "@type": "Question",
          name: "มีบริการพนักงานช่วยยกของด้วยหรือไม่ และต้องจองคิวล่วงหน้านานแค่ไหน?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "มีพนักงานช่วยยกของตามขนาดงานที่ตกลง คอยดูแลความปลอดภัยของสิ่งของ จัดเรียง และแรปฟิล์มกันรอยเฟอร์นิเจอร์ แนะนำให้จองคิวล่วงหน้า 1-2 วัน โดยเฉพาะช่วงวันหยุดสุดสัปดาห์หรือช่วงสิ้นเดือนเพื่อให้ตรงกับคิวจองลิฟต์ของนิติบุคคล"
          }
        }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(thonburiServiceSchema)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(thonburiFaqSchema)) }}
        />
        <ThonburiHubView />
        <InternalLinks currentCategory="service" currentSlug="bkk-thonburi" />
      </>
    );
  }

  const geoData = geoMatrix[province];
  const provinceIntent = getProvinceIntent(province, provinceThai);

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
      title: province === "bkk-thonburi"
        ? "ย้ายหอพัก คอนโด บ้าน ฝั่งธนบุรี พร้อมคนยกของ"
        : province === "bkk-phra-nakhon"
        ? "ย้ายบ้าน หอพัก คอนโด ฝั่งพระนคร มืออาชีพ"
        : province === "samutsakhon"
        ? "ย้ายหอพัก คอนโด บ้าน สมุทรสาคร ราคาประหยัด"
        : `ย้ายหอพัก / คอนโด ${provinceShort}`,
      description:
        "บริการย้ายบ้าน คอนโด หอพัก พร้อมคนช่วยยกของ แพ็กซีลกันกระแทกอย่างหนาแน่น ส่งตรงถึงที่",
      href: `/service/${province}/moving`,
      badge: "ยอดนิยม",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    },
    {
      icon: Bike,
      title: province === "bkk-thonburi"
        ? "ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ เพชรเกษม ปิ่นเกล้า"
        : province === "bkk-phra-nakhon"
        ? "ขนส่งมอเตอร์ไซค์ พระนคร สุขุมวิท สีลม"
        : province === "samutsakhon"
        ? "ส่งมอเตอร์ไซค์ บิ๊กไบค์ มหาชัย กระทุ่มแบน"
        : `ขนส่งมอเตอร์ไซค์ ${provinceShort}`,
      description:
        "ขนส่งรถมอเตอร์ไซค์ บิ๊กไบค์ ทุกรุ่น ด้วยรถกระบะตู้ทึบปิดมิดชิด รัดตรึงด้วยสายรัดพิเศษ ปลอดภัยมั่นใจได้",
      href: `/service/${province}/motorcycle`,
      badge: "ดูแลปลอดภัย",
      badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      icon: Package,
      title: province === "bkk-thonburi"
        ? "รถกระบะตู้ทึบขนส่งสินค้า เหมาคัน ฝั่งธน"
        : province === "bkk-phra-nakhon"
        ? "รถกระบะขนส่งสินค้า ตู้ทึบหลังคาสูง ฝั่งพระนคร"
        : province === "samutsakhon"
        ? "รถรับจ้างขนส่งสินค้าโรงงาน มหาชัย สมุทรสาคร"
        : `ขนส่งสินค้า ${provinceShort}`,
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
      a: `ค่าบริการรถรับจ้างตู้ทึบในพื้นที่ ${provinceThai} คิดราคาเริ่มต้นตามระยะทางจริงและขนาดของรถ โดยมีราคาเริ่มต้นสำหรับการขนของในเมืองที่โปร่งใส ประเมินราคาโปร่งใส แจ้งรายละเอียดชัดเจนก่อนเริ่มงาน`,
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
    "@type": "Service",
    "@id": `${siteConfig.baseUrl}/service/${province}#service`,
    name: `WMS Transport บริการขนส่งและรถรับจ้าง ${provinceThai}`,
    description: `บริการรถรับจ้างตู้ทึบ ย้ายบ้าน และขนส่งมอเตอร์ไซค์ ในพื้นที่จังหวัด ${provinceThai}`,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`
    },
    serviceType: "Moving and Transportation Service",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: provinceThai
      },
      ...(geoData?.districts ? geoData.districts.map(d => ({
        "@type": "AdministrativeArea",
        name: d
      })) : [])
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(logisticsSchema)) }}
      />
      {geoData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": geoData.images.map((img, index) => ({
                "@type": "ImageObject",
                "url": `https://wms-transport.com${img.url}`,
                "name": img.alt,
                "description": img.alt,
                "contentLocation": {
                  "@type": "Place",
                  "name": geoData.landmarks[index] || geoData.name,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": geoData.districts[0] || geoData.name,
                    "addressRegion": geoData.name,
                    "addressCountry": "TH"
                  }
                },
                "spatialCoverage": {
                  "@type": "Place",
                  "name": geoData.name,
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": lat,
                    "longitude": lng
                  },
                  "containedInPlace": geoData.districts.map(dist => ({
                    "@type": "Place",
                    "name": dist
                  }))
                }
              }))
            })
          }}
        />
      )}
      <main className="flex-1 relative pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Ambient subtle light background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] bg-size-[32px_32px]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl" />
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
          <div className="text-center mt-6 mb-12">
            <IntentHero
              h1={provinceIntent.h1}
              supporting={provinceIntent.heroSupportingStatement}
              badge={`${loc?.region ?? "ทั่วประเทศ"} · บริการขนส่ง`}
              className="pt-6 pb-2"
            />

            {/* Quick CTA */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-xl font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt="LINE"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain shrink-0"
                />
                <span>ติดต่อผ่าน LINE</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 text-slate-800 rounded-xl font-bold text-base shadow-xs transition-all hover:-translate-y-0.5"
              >
                <Phone className="h-4.5 w-4.5 text-blue-600" />
                <span className="font-mono tracking-wider">061-240-2436</span>
              </a>
            </div>
          </div>

          {/* ── PROMOTIONAL SHOWCASE BANNER ── */}
          <ServiceAreaPromoBanner />

          {/* ── COMPACT LOCAL SERVICE SUMMARY ── */}
          <CompactServiceSummary
            locationName={provinceThai}
            serviceAreas={
              geoData
                ? [
                    ...(geoData.districts || []).slice(0, 3),
                    ...(geoData.corridors || []).slice(0, 2),
                  ]
                : [provinceThai, "ตัวเมือง", "อำเภอใกล้เคียง"]
            }
            services={[
              `ย้ายบ้าน หอพัก คอนโด ${provinceShort}`,
              `ขนส่งมอเตอร์ไซค์ ${provinceShort}`,
              `รถกระบะตู้ทึบขนส่งสินค้า`,
            ]}
          />

          {/* ── SUB-SERVICES GRID ── */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-3">
              {province === "bkk-thonburi"
                ? "บริการรถกระบะตู้ทึบรับจ้างย้ายบ้านฝั่งธนบุรี พร้อมคนช่วยยกมืออาชีพ"
                : province === "bkk-phra-nakhon"
                ? "บริการรถกระบะตู้ทึบรับจ้างย้ายบ้านฝั่งพระนคร พร้อมคนช่วยยกและขนย้ายครบวงจร"
                : province === "samutsakhon"
                ? "บริการรถรับจ้างสมุทรสาคร ขนส่งสินค้ามหาชัย และย้ายบ้านกระทุ่มแบน-บ้านแพ้ว"
                : `บริการรถกระบะตู้ทึบรับจ้างย้ายบ้าน ${provinceThai} พร้อมคนช่วยยกของมืออาชีพ`}
            </h2>
            <p className="text-slate-500 text-center text-sm mb-10">
              คลิกที่บริการเพื่อดูรายละเอียด ราคา และขั้นตอนการสั่งจอง
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="group bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-300 transition-all duration-300 p-6 sm:p-7 rounded-2xl flex flex-col gap-4 shadow-xs hover:shadow-md relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600 transition-colors shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider shrink-0 ${service.badgeColor}`}
                      >
                        {service.badge}
                      </span>
                    </div>

                    <div className="grow">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-blue-600 text-sm font-bold group-hover:gap-2.5 transition-all">
                      <span>ดูรายละเอียด</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── UI/UX REGIONAL PORTFOLIO MEDIA INTEGRATION ── */}
          {geoData && (
            <section className="mb-20 content-auto">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-3">
                {province === "bkk-thonburi"
                  ? "ภาพผลงานการขนย้ายจริงฝั่งธนบุรี และจุดจอดบริการเด่น"
                  : province === "bkk-phra-nakhon"
                  ? "ภาพผลงานการขนย้ายย่านพระนคร และบริการธุรกิจชั้นนำ"
                  : province === "samutsakhon"
                  ? "ผลงานย้ายบ้านขนส่งสินค้าสมุทรสาคร และนิคมอุตสาหกรรม"
                  : `ภาพผลงานการขนย้ายและรถตู้ทึบรับจ้างในพื้นที่ ${provinceThai}`}
              </h2>
              <p className="text-slate-500 text-center text-sm mb-8 max-w-2xl mx-auto">
                รีวิวผลงานการขับรถตู้ทึบ ขนของ ย้ายหอ ขนย้ายบิ๊กไบค์จริง ยืนยันความน่าเชื่อถือด้วยรูปพนักงานและรถบริการจริงของบริษัท
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {geoData.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-16/10 shadow-xs"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      loading="lazy"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
                    
                    <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
                      <span className="text-xs font-bold text-white bg-blue-600/90 px-2.5 py-0.5 rounded-md w-fit mb-2">
                        {geoData.landmarks[index] || geoData.name}
                      </span>
                      <h3 className="text-white font-bold text-base md:text-lg leading-snug drop-shadow-xs">
                        {img.alt}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── HYPERLOCAL OPERATIONS ATLAS ── */}
          {geoData && <LocalOperationsAtlas geoData={geoData} />}

          {/* ── PORTFOLIO CTA BANNER ── */}
          <section className="mb-20">
            <div className="bg-[#0B1F3A] border border-blue-900/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white shadow-md">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  มั่นใจทุกการขนย้าย ด้วยผลงานจริงระดับมืออาชีพ
                </h3>
                <p className="text-blue-100/80 text-sm font-medium">
                  ดูรูปภาพและรีวิวผลงานการขนย้ายของเราที่ผ่านมาได้ที่นี่
                </p>
              </div>
              <Link
                href="/portfolio"
                className="shrink-0 whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-xs transition-all duration-200 font-bold flex items-center gap-2"
              >
                ดูภาพผลงาน <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* ── HYPER-LOCAL TESTIMONIAL ── */}
          <section className="mb-20 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-8">
              เสียงตอบรับจากผู้ใช้บริการในพื้นที่{provinceShort}
            </h2>
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col gap-2 shrink-0 items-center md:items-start relative z-10">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {review.tag}
                </span>
                <div className="flex items-center gap-1 mt-2 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current shrink-0" />
                  ))}
                </div>
                <p className="text-slate-900 font-extrabold text-base mt-2">{review.author}</p>
                <p className="text-slate-500 text-xs font-semibold">ผู้รับบริการจริงในพื้นที่</p>
              </div>
              <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 pt-5 md:pt-0 md:pl-8 relative z-10">
                <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* ── TRANSIT TIME VISUALIZER ── */}
          <section className="mb-20">
            <TransitTimeVisualizer province={province} />
          </section>

          {/* ── FEATURES STRIP ── */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="bg-white border border-slate-200/80 p-6 sm:p-7 rounded-2xl shadow-xs">
              <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center mb-5 text-blue-600">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                ขนส่งด้วยตู้ทึบมาตรฐาน
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                รถกระบะตู้ทึบหลังคาสูง กันฝน กันแดด กันฝุ่นอย่างมิดชิด
                เหมาะสำหรับขนย้ายบ้าน ขนย้ายเฟอร์นิเจอร์ หรือขนส่งสินค้าทุกประเภท
              </p>
            </div>
            <div className="bg-white border border-slate-200/80 p-6 sm:p-7 rounded-2xl shadow-xs">
              <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center mb-5 text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                พนักงานช่วยยกของมืออาชีพ
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                ไม่ต้องเหนื่อยยกของเอง เรามีทีมงานพนักงานขนย้ายที่มีความชำนาญ
                สุภาพ จัดเรียงสิ่งของประหยัดพื้นที่ และทะนุถนอมสิ่งของเป็นอย่างดี
              </p>
            </div>
            <div className="bg-white border border-slate-200/80 p-6 sm:p-7 rounded-2xl shadow-xs">
              <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center mb-5 text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                ดูแลความปลอดภัยของสินค้า
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                มีมาตรการดูแลความปลอดภัยระหว่างทาง ช่วยเพิ่มความอุ่นใจให้กับทุกขั้นตอน
                เพื่อให้ทรัพย์สินของคุณถึงปลายทางอย่างไร้กังวล
              </p>
            </div>
          </section>

          {/* ── PRICING INFO ── */}
          <div className="bg-blue-50/70 border border-blue-200/80 p-6 sm:p-8 rounded-2xl text-left mb-20 font-sans shadow-xs">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-5">
              อัตราค่าบริการและโปรโมชั่นพิเศษในพื้นที่ {provinceThai}
            </h2>
            <ul className="space-y-3.5 text-slate-700 font-medium text-sm sm:text-base">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  บริการขนส่งรถมอเตอร์ไซค์/บิ๊กไบค์ จาก {provinceThai} ไปทุกภาคทั่วประเทศ ราคาเริ่มต้น 1,500 บาท
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  บริการย้ายหอพัก คอนโด บ้าน พร้อมคนยกของ ดำเนินการโดยรวดเร็วในเขต {provinceThai}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  คิดราคาจริงใจตามระยะทางและประเภทการใช้งาน ไม่มีบวกเพิ่มทีหลัง แจ้งราคาชัดเจนก่อนเริ่มงาน
                </span>
              </li>
            </ul>
          </div>

          {/* ── INTERNAL LINKING ENGINE (TOPIC CLUSTERS) ── */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="h-px bg-slate-200 flex-1 max-w-[100px]"></div>
              <h2 className="text-2xl font-black text-slate-900 text-center">
                พื้นที่ให้บริการ<span className="text-blue-600">ใกล้เคียง</span>
              </h2>
              <div className="h-px bg-slate-200 flex-1 max-w-[100px]"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {Object.entries(provinceMap)
                .filter(([key]) => key !== province)
                .map(([key, data]) => (
                  <Link 
                    key={key} 
                    href={`/service/${key}`}
                    className="bg-white border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 p-4 rounded-xl flex items-center gap-3 group transition-all shadow-xs content-auto"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                      <MapPin className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-800 group-hover:text-blue-600 font-bold text-sm transition-colors">{data.name}</span>
                      <span className="text-slate-500 text-[10px] uppercase tracking-wider">สาขาบริการ</span>
                    </div>
                  </Link>
                ))}
            </div>
          </section>

          {/* ── LOCAL FAQ ── */}
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-8">
              คำถามที่พบบ่อย (FAQ) ใน {provinceThai}
            </h2>
            <div className="space-y-3.5">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-slate-200/80 open:border-blue-300 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all shadow-xs"
                >
                  <summary className="flex justify-between items-center font-bold text-slate-900 text-base list-none select-none">
                    <span className="group-open:text-blue-600 transition-colors pr-4">
                      {faq.q}
                    </span>
                    <span className="ml-1.5 shrink-0 p-1.5 bg-slate-50 group-open:bg-blue-50 text-slate-500 group-open:text-blue-600 rounded-lg border border-slate-200 group-open:rotate-180 transition-all">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </summary>
                  <div className="mt-4 pt-3 text-slate-600 leading-relaxed font-medium text-sm border-t border-slate-100">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* ── AI-READINESS GEOGRAPHIC CITATION NODE ── */}
          {geoData && (
            <section className="mb-12 content-auto">
              <div 
                data-ai-extract="true"
                className="bg-slate-100/80 border border-slate-200 rounded-2xl p-6"
              >
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  AI Generative Search & Geographic Citation Node
                </h4>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                  ศูนย์บริการลูกค้า <strong>WMS TRANSPORT</strong> ในเขต <strong>{provinceThai}</strong> ตั้งอยู่ ณ จุดยุทธศาสตร์การคมนาคม
                  เชื่อมต่อ {geoData.corridors.join(", ")} เพื่ออำนวยความสะดวกในการจัดส่งด่วน ย้ายหอพัก คอนโด และย้ายบ้านเรือน
                  ครอบคลุมทุกตำบลและอำเภอสำคัญ ได้แก่ {geoData.districts.join(", ")} โดยผู้ใช้บริการสามารถเรียกใช้งาน
                  <strong>รถกระบะตู้ทึบรับจ้าง</strong> และ <strong>บริการขนส่งมอเตอร์ไซค์</strong>/Bigbike เพื่อเดินทางไปยังแลนด์มาร์กสำคัญ เช่น
                  {" "}{geoData.landmarks.join(", ")} ได้ตลอด 24 ชั่วโมง ด้วยทีมงานท้องถิ่นที่เชี่ยวชาญเส้นทางตรอกซอกซอยเป็นอย่างดี.
                </p>
              </div>
            </section>
          )}

        </div>
      </main>

    </div>
  );
}
