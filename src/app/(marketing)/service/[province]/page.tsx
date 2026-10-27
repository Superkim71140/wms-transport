import ThonburiHubView from "@/components/ThonburiHubView";
import InternalLinks from "@/components/InternalLinks";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/seo/site-config";
import { escapeJsonLd } from "@/lib/seo/schema";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  Users,
  Home,
  Bike,
  Package,
  ArrowRight,
  Route,
  ChevronDown,
} from "lucide-react";
import TransitTimeVisualizer from "@/components/TransitTimeVisualizer";
import LocalOperationsAtlas from "@/components/LocalOperationsAtlas";
import { geoMatrix } from "@/app/data/geoMatrix";
import { getProvinceIntent } from "@/data/searchIntentMap";
import ServiceAreaLayout from "@/components/service-area/ServiceAreaLayout";
import ServiceAreaRouteTable from "@/components/service-area/ServiceAreaRouteTable";
import ServiceAreaCoverage from "@/components/service-area/ServiceAreaCoverage";
import ServiceAreaAccordions from "@/components/service-area/ServiceAreaAccordions";
import ServiceAreaRelatedServices from "@/components/service-area/ServiceAreaRelatedServices";
import ServiceAreaQuoteForm from "@/components/service-area/ServiceAreaQuoteForm";
import TwoToneHeading from "@/components/service-area/TwoToneHeading";

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

export const PROVINCE_HERO_IMAGES: Record<string, { src: string; caption: string }> = {
  samutsakhon: {
    src: "/images/WM8.webp",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS ณ ศูนย์ปฏิบัติการหลักมหาชัย–สมุทรสาคร (พระราม 2)",
  },
  bangkok: {
    src: "/images/WM11.webp",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS พร้อมให้บริการขนย้ายครอบคลุมตรอกซอยในกรุงเทพมหานคร",
  },
  chonburi: {
    src: "/images/S__5668870.webp",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS บริการขนส่งสินค้าโรงงานและมอเตอร์ไซค์เส้นทางชลบุรี-ภาคตะวันออก",
  },
  "chiang-mai": {
    src: "/images/WM12.webp",
    caption: "ภาพตัวอย่างงานจริง: รถกระบะตู้ทึบ WMS พร้อมสะพานลาดอลูมิเนียมขนส่งมอเตอร์ไซค์และสินค้าสู่เชียงใหม่",
  },
  phuket: {
    src: "/images/WM15.webp",
    caption: "ภาพตัวอย่างงานจริง: รถกระบะตู้ทึบ WMS จัดเรียงสัมภาระเต็มคันปิดมิดชิด ขนส่งตรงสู่ภูเก็ตและภาคใต้",
  },
  "samut-songkhram": {
    src: "/images/WM10.webp",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS สแตนด์บายเชื่อมโยงเส้นทางสมุทรสงคราม–แม่กลอง",
  },
  "bkk-phra-nakhon": {
    src: "/images/WM11.webp",
    caption: "ภาพงานจริง: รถกระบะตู้ทึบ WMS เข้าถึงตรอกซอยและอาคารในเขตฝั่งพระนคร",
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

  if (province === "bkk-thonburi") {
    return {
      title: "รถรับจ้างฝั่งธนบุรี เพชรเกษม–พุทธมณฑล | WMS",
      description:
        "บริการรถรับจ้างฝั่งธนบุรี รถกระบะตู้ทึบย้ายบ้าน คอนโด หอพัก และส่งของ ครอบคลุมกาญจนาภิเษก กัลปพฤกษ์ ราชพฤกษ์ แยกบางบอน ท่าพระ วงเวียนใหญ่ เคหะธนบุรี พร้อมคนยก",
      alternates: {
        canonical: "/service/bkk-thonburi",
      },
    };
  }

  if (province === "samutsakhon") {
    return {
      title: "รถรับจ้างสมุทรสาคร มหาชัย–พระราม 2 | WMS",
      description:
        "บริการรถรับจ้างสมุทรสาคร รถกระบะตู้ทึบขนส่งสินค้าโรงงาน ย้ายบ้านและหอพัก ครอบคลุมมหาชัย กระทุ่มแบน อ้อมน้อย พุทธมณฑลสาย 4 สาย 5 และอ้อมใหญ่ พร้อมคนยก",
      alternates: {
        canonical: "/service/samutsakhon",
      },
    };
  }

  let description = `บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ในพื้นที่${name} บริการพร้อมคนช่วยยกของอย่างมืออาชีพ ติดต่อประเมินราคาได้ทุกวัน`;

  if (province === "bkk-phra-nakhon") {
    description =
      "บริการรถกระบะรับจ้าง กทม ฝั่งพระนคร ขนส่งมอเตอร์ไซค์ พระนคร ย้ายหอพัก ย้ายบ้าน ย้ายคอนโด บริการตู้ทึบรับจ้างพร้อมคนช่วยยกของอย่างมืออาชีพ ราคาถูก ปลอดภัย";
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

  if (province === "bkk-thonburi") {
    const thonburiServiceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteConfig.baseUrl}/service/bkk-thonburi#service`,
      name: "WMS TRANSPORT บริการรถรับจ้างและขนย้ายฝั่งธนบุรี",
      description:
        "บริการรถรับจ้างตู้ทึบ ย้ายบ้าน คอนโด และขนส่งสินค้า ครอบคลุม 15 เขตฝั่งธนบุรี",
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
            text: "รถกระบะตู้ทึบของ WMS TRANSPORT เป็นรถกระบะตู้ทึบหลังคาสูงปิดมิดชิด (โปรดแจ้งรายละเอียดหน้างานเพื่อให้เจ้าหน้าที่ตรวจสอบรถและอุปกรณ์ที่เหมาะสม) สำหรับรองรับสิ่งของชิ้นใหญ่ การเข้าจอดเทียบขนย้ายแนะนำให้ประสานงานจุดโหลดของชั้นล่าง (Loading Bay) หรือลานจอดที่ไม่มีสิ่งกีดขวางความสูงกับนิติบุคคลของอาคาร",
          },
        },
        {
          "@type": "Question",
          name: "ตรอกซอยแคบในชุมชนเก่าฝั่งธนบุรี เช่น ย่านตลาดพลู บางยี่เรือ หรือซอยเพชรเกษม รถเข้าได้ไหม?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "รถกระบะตอนเดียวตู้ทึบของเรามีความคล่องตัวสูง สามารถเลี้ยวเข้าตรอกซอยแคบ ข้ามสะพานคลอง และหลบหลีกสายไฟต่ำได้ดีกว่ารถบรรทุก 6 ล้อ ทำให้เข้าถึงหน้าบ้านในซอยลึกของฝั่งธนบุรีได้อย่างปลอดภัย",
          },
        },
        {
          "@type": "Question",
          name: "การขนย้ายข้ามฝั่งแม่น้ำเจ้าพระยา หรือข้ามจังหวัดจากฝั่งธนบุรีคิดราคาอย่างไร?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "เราคำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดรับของในฝั่งธนบุรีไปยังจุดหมายปลายทาง ไม่ว่าจะเป็นการข้ามสะพานเข้าฝั่งพระนคร หรือการวิ่งออกต่างจังหวัด โดยแจ้งราคาและเงื่อนไขชัดเจนก่อนเริ่มงาน ไม่มีค่าใช้จ่ายแอบแฝง",
          },
        },
        {
          "@type": "Question",
          name: "มีบริการพนักงานช่วยยกของด้วยหรือไม่ และต้องจองคิวล่วงหน้านานแค่ไหน?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "มีพนักงานช่วยยกของตามขนาดงานที่ตกลง คอยดูแลความปลอดภัยของสิ่งของ จัดเรียง และแรปฟิล์มกันรอยเฟอร์นิเจอร์ แนะนำให้จองคิวล่วงหน้า 1-2 วัน โดยเฉพาะช่วงวันหยุดสุดสัปดาห์หรือช่วงสิ้นเดือนเพื่อให้ตรงกับคิวจองลิฟต์ของนิติบุคคล",
          },
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: escapeJsonLd(JSON.stringify(thonburiServiceSchema)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: escapeJsonLd(JSON.stringify(thonburiFaqSchema)),
          }}
        />
        <ThonburiHubView />
        <InternalLinks currentCategory="service" currentSlug="bkk-thonburi" />
      </>
    );
  }

  const geoData = geoMatrix[province];
  const provinceIntent = getProvinceIntent(province, provinceThai);

  const subServices = [
    {
      icon: Home,
      title:
        province === "samutsakhon"
          ? "ย้ายหอพัก คอนโด บ้าน สมุทรสาคร ราคาประหยัด"
          : province === "bkk-phra-nakhon"
          ? "ย้ายบ้าน หอพัก คอนโด ฝั่งพระนคร มืออาชีพ"
          : `ย้ายหอพัก / คอนโด ${provinceShort}`,
      description:
        "บริการย้ายบ้าน คอนโด หอพัก พร้อมคนช่วยยกของ แพ็กซีลกันกระแทกอย่างหนาแน่น ส่งตรงถึงที่",
      href: `/service/${province}/moving`,
      badge: "ยอดนิยม",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      icon: Bike,
      title:
        province === "samutsakhon"
          ? "ส่งมอเตอร์ไซค์ บิ๊กไบค์ มหาชัย กระทุ่มแบน"
          : province === "bkk-phra-nakhon"
          ? "ขนส่งมอเตอร์ไซค์ พระนคร สุขุมวิท สีลม"
          : `ขนส่งมอเตอร์ไซค์ ${provinceShort}`,
      description:
        "ขนส่งรถมอเตอร์ไซค์ บิ๊กไบค์ ทุกรุ่น ด้วยรถกระบะตู้ทึบปิดมิดชิด รัดตรึงด้วยสายรัดพิเศษ ปลอดภัยมั่นใจได้",
      href: `/service/${province}/motorcycle`,
      badge: "ดูแลปลอดภัย",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      icon: Package,
      title:
        province === "samutsakhon"
          ? "รถรับจ้างขนส่งสินค้าโรงงาน มหาชัย สมุทรสาคร"
          : province === "bkk-phra-nakhon"
          ? "รถกระบะขนส่งสินค้า ตู้ทึบหลังคาสูง ฝั่งพระนคร"
          : `ขนส่งสินค้า ${provinceShort}`,
      description:
        "รถรับจ้างขนส่งสินค้า เหมาคัน ตู้ทึบหลังคาสูง รับส่งสินค้าทั่วไป วัสดุก่อสร้าง อุปกรณ์สำนักงาน",
      href: `/service/${province}/freight`,
      badge: "เหมาคัน",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
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
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType: "Moving and Transportation Service",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: provinceThai,
      },
      ...(geoData?.districts
        ? geoData.districts.map((d) => ({
            "@type": "AdministrativeArea",
            name: d,
          }))
        : []),
    ],
  };

  // Specific child areas
  const childAreas =
    province === "samutsakhon"
      ? [
          {
            name: "มหาชัย – พระราม 2 (ตัวเมืองสมุทรสาคร)",
            href: "/areas/samutsakhon/maha-chai",
            subtitle: "ศูนย์บริการสำนักงานใหญ่ WMS ขนส่งสินค้าโรงงานและย้ายบ้าน",
          },
          {
            name: "กระทุ่มแบน (พุทธสาคร – พุทธมณฑลสาย 4/5)",
            href: `/service/${province}`,
            subtitle: "บริการรถตู้ทึบรับจ้าง ย้ายหอพักพนักงานและบ้านจัดสรร",
          },
          {
            name: "บ้านแพ้ว (เกษตรกรรม – คลองดำเนินสะดวก)",
            href: `/service/${province}`,
            subtitle: "รถกระบะรับจ้างขนส่งสินค้าเกษตรและขนย้ายทั่วไป",
          },
        ]
      : (geoData?.districts?.map((d) => ({
          name: `อำเภอ${d}`,
          href: `/service/${province}`,
          subtitle: `บริการรถกระบะตู้ทึบรับจ้าง ${provinceShort} 24 ชม.`,
        })) || []);

  const routeRates = [
    {
      route: `ในเขต ${provinceThai} และพื้นที่ใกล้เคียง`,
      distanceOrScope: "ย้ายหอพัก คอนโด สินค้าทั่วไป ขนส่งมอเตอร์ไซค์",
      transitTime: "30 - 60 นาที",
      price: "เริ่มต้น 1,500 บาท",
    },
    {
      route: `${provinceThai} ➔ กรุงเทพฯ และปริมณฑล`,
      distanceOrScope: "ขนย้ายบ้าน ทาวน์โฮม สินค้าโรงงาน และบิ๊กไบค์",
      transitTime: "1 - 3 ชั่วโมง",
      price: "เริ่มต้น 1,800 บาท",
    },
    {
      route: `${provinceThai} ➔ ภาคกลาง / ภาคตะวันออก (ชลบุรี, ระยอง)`,
      distanceOrScope: "ขนส่งเหมาเที่ยว สินค้าโรงงาน และย้ายที่อยู่อาศัย",
      transitTime: "2 - 4 ชั่วโมง",
      price: "เริ่มต้น 3,000 บาท",
    },
    {
      route: `${provinceThai} ➔ ต่างจังหวัดระยะไกล (เหนือ, อีสาน, ใต้)`,
      distanceOrScope: "เหมารถกระบะตู้ทึบวิ่งตรง ไม่รวมของ ส่งมอบ Door-to-Door",
      transitTime: "ตามระยะทางจริง",
      price: "เริ่มต้นตามระยะทาง",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: escapeJsonLd(JSON.stringify(logisticsSchema)),
        }}
      />

      <ServiceAreaLayout
        heroProps={{
          breadcrumbs: [
            { label: "หน้าแรก", href: "/" },
            { label: "พื้นที่ให้บริการ", href: "/areas" },
            { label: provinceThai, href: `/service/${province}` },
          ],
          h1: provinceIntent.h1,
          thaiName: provinceThai,
          description: provinceIntent.heroSupportingStatement,
          isHeadquarters: province === "samutsakhon",
          isRegionalHub: province === "bangkok",
          startingPrice: "เริ่มต้น 1,500 บาท",
          deliveryEstimate: "เข้าถึงหน้างานภายใน 30-60 นาที",
          imageSrc: PROVINCE_HERO_IMAGES[province]?.src || geoData?.images?.[0]?.url || "/images/WM15.webp",
          imageCaption: PROVINCE_HERO_IMAGES[province]?.caption || `ภาพตัวอย่างงานจริง: รถกระบะตู้ทึบ WMS ให้บริการขนย้ายในพื้นที่ ${provinceThai}`,
          highlightPhrase: provinceThai,
        }}
        sidebarProps={{
          thaiName: provinceThai,
          isHeadquarters: province === "samutsakhon",
          isRegionalHub: province === "bangkok",
          geographicType:
            province === "samutsakhon"
              ? "headquarters"
              : province === "bangkok"
              ? "regional_hub"
              : "service_area",
          startingPrice: "เริ่มต้น 1,500 บาท",
          deliveryEstimate: "เข้าถึงหน้างานภายใน 30-60 นาที",
          parentArea: {
            name: "พื้นที่ให้บริการทั้งหมด",
            href: "/areas",
          },
          corridors: geoData?.corridors?.map((c) => ({ name: c })) || [],
          nearbyAreas: Object.entries(provinceMap)
            .filter(([k]) => k !== province)
            .map(([k, d]) => ({
              name: d.name,
              slug: k,
              href: `/service/${k}`,
            })),
        }}
        nearbyAreas={[
          {
            name: "สมุทรสาคร (สำนักงานใหญ่)",
            badge: "สำนักงานใหญ่ WMS",
            description:
              "ศูนย์กลางบริการมหาชัย พระราม 2 กระทุ่มแบน ขนส่งสินค้าโรงงานและย้ายบ้านตลอด 24 ชม.",
            href: "/service/samutsakhon",
          },
          {
            name: "กรุงเทพฯ ฝั่งธนบุรี (15 เขต)",
            badge: "ศูนย์กระจายสินค้า",
            description:
              "ครอบคลุมเพชรเกษม ปิ่นเกล้า บางแค พระราม 2 ขนย้ายคอนโดแนว BTS/MRT และส่งมอเตอร์ไซค์",
            href: "/service/bkk-thonburi",
          },
          {
            name: "กรุงเทพฯ ฝั่งพระนคร",
            badge: "ศูนย์กลางเศรษฐกิจ",
            description:
              "บริการขนย้ายบ้าน คอนโด สุขุมวิท สีลม สาทร ลาดพร้าว รถตู้ทึบเข้าซอยแคบคล่องตัว พร้อมคนยกของ",
            href: "/service/bkk-phra-nakhon",
          },
        ]}
        faqProps={{
          thaiName: provinceThai,
          faqs,
        }}
      >
        {/* ── 1. LOCAL SERVICE INTRODUCTION ── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block animate-pulse" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {loc?.region ?? "ทั่วประเทศ"} · ศูนย์บริการ WMS TRANSPORT
            </span>
          </div>
          <TwoToneHeading
            as="h2"
            text={
              province === "samutsakhon"
                ? "บริการรถรับจ้างสมุทรสาคร ขนส่งสินค้ามหาชัย และย้ายบ้านกระทุ่มแบน-บ้านแพ้ว"
                : province === "bkk-phra-nakhon"
                ? "บริการรถกระบะตู้ทึบรับจ้างย้ายบ้านฝั่งพระนคร พร้อมคนช่วยยกและขนย้ายครบวงจร"
                : `บริการรถกระบะตู้ทึบรับจ้างย้ายบ้าน ${provinceThai} พร้อมคนช่วยยกของมืออาชีพ`
            }
            highlight={provinceThai}
            variant="light"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4"
            highlightClassName="text-blue-600 font-black"
          />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            WMS TRANSPORT ให้บริการรถกระบะตอนเดียวตู้ทึบหลังคาสูงปิดมิดชิด สำหรับขนย้ายบ้าน คอนโด หอพัก และขนส่งสินค้าโรงงานในพื้นที่ <strong>{provinceThai}</strong> มั่นใจในความปลอดภัยของสัมภาระด้วยสายรัดตรึงและทีมงานพนักงานยกของมืออาชีพ
          </p>

          {/* Sub-services triad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {subServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${service.badgeColor}`}
                      >
                        {service.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                    <span>
                      {service.href.includes("moving")
                        ? `ดูข้อมูลบริการย้ายบ้าน${provinceShort}`
                        : service.href.includes("motorcycle")
                        ? `ดูข้อมูลขนส่งมอเตอร์ไซค์${provinceShort}`
                        : `ดูข้อมูลเหมารถกระบะส่งสินค้า${provinceShort}`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── 2. TRANSPORT & ROUTE TABLE ── */}
        <ServiceAreaRouteTable
          thaiName={provinceThai}
          rates={routeRates}
          customTitle={`ตารางอัตราค่าบริการรถรับจ้างในพื้นที่ ${provinceThai}`}
          customDescription={`อัตราค่าบริการเริ่มต้นสำหรับการขนย้ายในเขต ${provinceThai} และเส้นทางเชื่อมต่อข้ามจังหวัด`}
        />

        {/* ── 3. COVERAGE & CHILD AREAS ── */}
        <ServiceAreaCoverage
          coverageAreas={
            geoData?.districts
              ? geoData.districts.map((d) => `อำเภอ${d}`)
              : [provinceThai, "ตัวเมือง", "อำเภอใกล้เคียง"]
          }
          title={`อำเภอและเขตพื้นที่ที่ครอบคลุมใน ${provinceThai}`}
          childAreas={childAreas}
          childTitle={
            province === "samutsakhon"
              ? "พื้นที่ย่อยและศูนย์บริการสำคัญในสมุทรสาคร"
              : `เขตพื้นที่บริการใน ${provinceThai}`
          }
        />

        {/* ── 4. SAMUT SAKHON CORRIDORS & BIDIRECTIONAL INTERNAL LINKS (Progressive Disclosure) ── */}
        {province === "samutsakhon" && (
          <section className="mb-10 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs" id="economic-corridors">
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Route className="w-5 h-5 text-blue-600 shrink-0" />
                <span>พื้นที่และเส้นทางเศรษฐกิจสำคัญในจังหวัดสมุทรสาคร</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                โครงข่ายเชื่อมต่อระหว่างมหาชัย พระราม 2 กระทุ่มแบน และอ้อมน้อย พร้อมรองรับงานขนส่งสินค้าโรงงานและย้ายบ้าน
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {/* Corridor 1: โซนมหาชัย – พระราม 2 – ตัวเมือง */}
              <details className="group bg-slate-50/70 rounded-2xl border border-slate-200/90 transition-all duration-200 overflow-hidden open:bg-white open:border-blue-300 open:shadow-xs">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none hover:bg-slate-100/60 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                  <div className="pr-4">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-0.5">
                      โซนมหาชัย – พระราม 2 – ตัวเมือง
                    </h4>
                    <p className="text-xs text-slate-500 font-normal line-clamp-1">
                      พื้นที่หลัก: ตลาดมหาชัย • ถนนพระราม 2 • ถนนเอกชัย • นิคมฯ สมุทรสาคร
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/80 transition-colors">
                    <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" />
                  </div>
                </summary>
                <div className="p-4 sm:p-5 pt-2 border-t border-slate-200/70 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed">
                  เหมาะสำหรับส่งสินค้าโรงงาน สินค้าอาหารทะเลแปรรูป ย้ายหอพักพนักงาน และย้ายบ้านพักอาศัย เชื่อมแกนถนนพระราม 2 เข้าฝั่งธนบุรี และวิ่งตรงสู่ภาคใต้
                </div>
              </details>

              {/* Corridor 2: โซนกระทุ่มแบน – พุทธมณฑลสาย 4/5 */}
              <details className="group bg-slate-50/70 rounded-2xl border border-slate-200/90 transition-all duration-200 overflow-hidden open:bg-white open:border-blue-300 open:shadow-xs">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none hover:bg-slate-100/60 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                  <div className="pr-4">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-0.5">
                      โซนกระทุ่มแบน – พุทธมณฑลสาย 4/5
                    </h4>
                    <p className="text-xs text-slate-500 font-normal line-clamp-1">
                      พื้นที่หลัก: กระทุ่มแบน • พุทธมณฑลสาย 4 • พุทธมณฑลสาย 5 • ถนนพุทธสาคร
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/80 transition-colors">
                    <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" />
                  </div>
                </summary>
                <div className="p-4 sm:p-5 pt-2 border-t border-slate-200/70 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed">
                  เหมาะสำหรับย้ายบ้านเดี่ยว ทาวน์โฮมจัดสรร ส่งชิ้นงานอุตสาหกรรม เชื่อมต่อเพชรเกษมและบรมราชชนนี เลี่ยงรถติดพระราม 2 ได้อย่างคล่องตัว
                </div>
              </details>

              {/* Corridor 3: โซนอ้อมน้อย – อ้อมใหญ่ (สามพราน) */}
              <details className="group bg-slate-50/70 rounded-2xl border border-slate-200/90 transition-all duration-200 overflow-hidden open:bg-white open:border-blue-300 open:shadow-xs">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none hover:bg-slate-100/60 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                  <div className="pr-4">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-0.5">
                      โซนอ้อมน้อย – อ้อมใหญ่ (สามพราน)
                    </h4>
                    <p className="text-xs text-slate-500 font-normal line-clamp-1">
                      พื้นที่หลัก: อ้อมน้อย • อ้อมใหญ่ • เพชรเกษม 91/93 • รอยต่อนครปฐม
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/80 transition-colors">
                    <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" />
                  </div>
                </summary>
                <div className="p-4 sm:p-5 pt-2 border-t border-slate-200/70 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed">
                  เหมาะสำหรับย้ายหอพักพนักงาน ย้ายบ้านชุมชนโรงงาน และขนส่งอุปกรณ์การผลิต รอยต่อสมุทรสาคร-นครปฐม มุ่งหน้าหนองแขม-บางแค
                </div>
              </details>
            </div>

            {/* Bidirectional Contextual Links Card for Maha Chai */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-slate-900">
                  ข้อมูลเฉพาะพื้นที่มหาชัย–พระราม 2 และอัตราค่าบริการ
                </div>
                <div className="text-xs text-slate-600">
                  สำรวจข้อมูลการขนย้ายเจาะลึกเฉพาะเขตมหาชัย ตรวจสอบราคา และชมผลงานจริง
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/areas/samutsakhon/maha-chai"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                >
                  <span>ดูข้อมูลรถรับจ้างมหาชัย–พระราม 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-bold transition-colors"
                >
                  <span>ตรวจสอบอัตราค่าบริการ</span>
                </Link>
                <Link
                  href="/portfolio"
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-bold transition-colors"
                >
                  <span>ชมภาพผลงานจริง</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── 5. LOCAL OPERATIONS ACCORDIONS ── */}
        <ServiceAreaAccordions
          thaiName={provinceThai}
          landmarks={geoData?.landmarks}
          routes={geoData?.corridors}
        />

        {/* ── 6. TRANSIT TIME & ATLAS ── */}
        <section className="mb-10">
          <TransitTimeVisualizer province={province} />
        </section>

        {geoData && (
          <section className="mb-10">
            <LocalOperationsAtlas geoData={geoData} />
          </section>
        )}

        {/* ── 7. FEATURES STRIP ── */}
        <section className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>มาตรฐานการบริการของ WMS TRANSPORT ในพื้นที่ {provinceThai}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
                <Truck className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900 mb-1">
                รถกระบะตู้ทึบมาตรฐาน
              </div>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                ตู้ทึบอลูมิเนียมหลังคาสูงปิดมิดชิด กันแดด กันฝน และฝุ่นละออง 100% ปลอดภัยตลอดทาง
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
                <Users className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900 mb-1">
                พนักงานช่วยยกของมืออาชีพ
              </div>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                ทีมงานสุภาพ มีความชำนาญ จัดเรียงสิ่งของประหยัดพื้นที่ และดูแลเฟอร์นิเจอร์อย่างดี
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900 mb-1">
                ดูแลความปลอดภัยทุกขั้นตอน
              </div>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                มีมาตรการยึดตรึงสิ่งของและล็อกล้อมอเตอร์ไซค์แน่นหนา เพิ่มความอุ่นใจจนถึงปลายทาง
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. LIGHT BLUE PRICING NOTE ── */}
        <div className="mb-10 p-5 rounded-2xl bg-blue-50 border border-blue-200">
          <h4 className="font-bold text-sm text-slate-900 mb-2">
            อัตราค่าบริการและโปรโมชั่นพิเศษในพื้นที่ {provinceThai}
          </h4>
          <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>ขนส่งมอเตอร์ไซค์/บิ๊กไบค์ จาก {provinceThai} ไปปลายทางต่าง ๆ ประเมินราคาตามรุ่นและระยะทางจริง</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>ย้ายหอพัก คอนโด บ้าน พร้อมคนยกของ ดำเนินการรวดเร็วในเขต {provinceThai}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>คิดราคาจริงใจตามระยะทางและประเภทงาน ไม่มีบวกเพิ่มทีหลัง แจ้งราคาสุทธิก่อนเริ่มงาน</span>
            </li>
          </ul>
        </div>

        {/* ── 10. RELATED SERVICES GRID ── */}
        <ServiceAreaRelatedServices currentProvince={province} />

        {/* ── 12. QUOTATION REQUEST FORM ── */}
        <ServiceAreaQuoteForm
          currentLocationName={provinceThai}
          currentProvince={province}
        />
      </ServiceAreaLayout>

      {/* Internal links for crawlability and topic clusters */}
      <InternalLinks currentCategory="service" currentSlug={province} />
    </>
  );
}
