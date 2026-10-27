import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  ShieldCheck,
  Clock,
  Users,
  Home,
  Bike,
  Package,
  ArrowRight,
  Truck,
} from "lucide-react";
import InternalLinks from "@/components/InternalLinks";
import { provinceMap } from "../page";
import { geoMatrix } from "@/app/data/geoMatrix";
import ServiceAreaLayout from "@/components/service-area/ServiceAreaLayout";
import ServiceAreaRouteTable from "@/components/service-area/ServiceAreaRouteTable";
import ServiceAreaFAQ from "@/components/service-area/ServiceAreaFAQ";
import ServiceAreaQuoteForm from "@/components/service-area/ServiceAreaQuoteForm";

// ─────────────────────────────────────────────
// Service metadata by slug
// ─────────────────────────────────────────────
const serviceConfig: Record<
  string,
  {
    label: string;
    labelEn: string;
    icon: React.ElementType;
    badge: string;
    badgeColor: string;
    headline: string;
    subheadline: string;
    description: string;
    highlights: { title: string; body: string }[];
    faqs: { q: string; a: string }[];
    pricing: { type: string; detail: string; price: string }[];
  }
> = {
  moving: {
    label: "ย้ายบ้าน / คอนโด / หอพัก",
    labelEn: "Moving Service",
    icon: Home,
    badge: "ยอดนิยม",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    headline: "บริการย้ายบ้าน คอนโด",
    subheadline: "และหอพัก ทั่วไทย",
    description:
      "บริการย้ายบ้าน ย้ายคอนโด ย้ายหอพัก ด้วยรถกระบะตู้ทึบมาตรฐานสูง ปิดมิดชิดกันฝน กันฝุ่น พร้อมทีมงานช่วยยกของมืออาชีพ แพ็กซีลเฟอร์นิเจอร์ให้ฟรี ส่งตรงถึงที่หมายอย่างปลอดภัย",
    highlights: [
      {
        title: "รถกระบะตู้ทึบมาตรฐาน",
        body: "โครงสร้างอลูมิเนียมปิดล็อกมิดชิด ความสูง 2.1 ม. จุโซฟา ที่นอน 6 ฟุต และของได้จำนวนมาก",
      },
      {
        title: "พนักงานช่วยยกของมืออาชีพ",
        body: "ทีมงานยกของระมัดระวัง ลดความเหนื่อยล้าและป้องกันของชำรุดเสียหาย",
      },
      {
        title: "อุปกรณ์แพ็กพร้อมบริการ",
        body: "บริการแรปพลาสติก แอร์บับเบิล ป้องกันริ้วรอยเฟอร์นิเจอร์ชิ้นสำคัญตลอดทาง",
      },
      {
        title: "ดูแลความปลอดภัยตลอดเส้นทาง",
        body: "มีมาตรการป้องกันความเสียหายระหว่างการขนย้าย อุ่นใจทุกขั้นตอน",
      },
    ],
    faqs: [
      {
        q: "ย้ายบ้านข้ามจังหวัดต้องจองล่วงหน้ากี่วัน?",
        a: "แนะนำให้จองล่วงหน้า 1-3 วันสำหรับงานข้ามจังหวัด เพื่อให้ทีมงานเตรียมรถและวางแผนเส้นทางได้อย่างเหมาะสม",
      },
      {
        q: "บริการพร้อมคนยกของรวมอยู่ในราคาหรือไม่?",
        a: "บริการคนช่วยยกของสามารถเลือกเพิ่มได้ตามปริมาณสัมภาระ โดยแจ้งรายละเอียดเพื่อให้ทีมงานประเมินจำนวนคนที่เหมาะสม",
      },
      {
        q: "ของชิ้นใหญ่ เช่น ตู้เสื้อผ้า โซฟา ที่นอน 6 ฟุต ใส่รถกระบะตู้ทึบได้ไหม?",
        a: "รถกระบะตู้ทึบหลังคาสูง 2.1 เมตร สามารถบรรจุที่นอน 6 ฟุตในแนวตั้ง โซฟา ตู้เย็น และกล่องสัมภาระจำนวนมากได้สบาย",
      },
    ],
    pricing: [
      {
        type: "ย้ายหอพัก / ห้องขนาดเล็ก",
        detail: "ที่นอน 3-5 ฟุต, ตู้เย็นเล็ก, กล่อง 5-10 ใบ",
        price: "เริ่มต้น 1,500 บาท",
      },
      {
        type: "ย้ายคอนโด / ห้องขนาดกลาง",
        detail: "ที่นอน 6 ฟุต, ทีวี, ตู้เย็น, โซฟา, โต๊ะ",
        price: "เริ่มต้น 2,500 บาท",
      },
      {
        type: "ย้ายบ้าน / ออฟฟิศ (ข้ามจังหวัด)",
        detail: "เฟอร์นิเจอร์ครบชุด, เครื่องใช้ไฟฟ้า, เอกสาร",
        price: "เริ่มต้นตามระยะทาง",
      },
    ],
  },
  motorcycle: {
    label: "ขนส่งมอเตอร์ไซค์ / บิ๊กไบค์",
    labelEn: "Motorcycle Transport",
    icon: Bike,
    badge: "ดูแลปลอดภัย",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    headline: "ขนส่งมอเตอร์ไซค์",
    subheadline: "และบิ๊กไบค์ ทุกรุ่น ทุกเส้นทาง",
    description:
      "บริการขนส่งมอเตอร์ไซค์และบิ๊กไบค์ทุกรุ่น ด้วยรถกระบะตู้ทึบปิดมิดชิด รัดตรึงด้วยสายรัดพิเศษ ป้องกันรอยขีดข่วนและการกระแทก ส่งถึงบ้านอย่างปลอดภัยและได้มาตรฐาน",
    highlights: [
      {
        title: "รถกระบะตู้ทึบปิดมิดชิด",
        body: "ป้องกันฝน ฝุ่น แสงแดด และสะเก็ดหิน มอเตอร์ไซค์ถึงปลายทางสะอาด ปลอดภัย",
      },
      {
        title: "รัดตรึงด้วยสายรัดพิเศษ 4 จุด",
        body: "ยึดรถมอเตอร์ไซค์ให้อยู่นิ่ง ไม่ล้มระหว่างทาง ด้วยอุปกรณ์ล็อกล้อและสายรัดมาตรฐาน",
      },
      {
        title: "รับได้ทุกรุ่น ทุกขนาด",
        body: "ตั้งแต่มอเตอร์ไซค์ครอบครัว สกู๊ตเตอร์ ไปจนถึงบิ๊กไบค์ 300cc - 1000cc+",
      },
      {
        title: "ส่งมอบ Door-to-Door",
        body: "รับรถถึงหน้าบ้านและส่งมอบถึงจุดหมายปลายทาง ไม่ต้องไปรับที่สถานีหรือขนส่ง",
      },
    ],
    faqs: [
      {
        q: "ค่าขนส่งมอเตอร์ไซค์คิดราคาอย่างไร?",
        a: "คิดราคาตามระยะทางจริงและขนาดรุ่นรถ โดยเริ่มต้นที่ 1,500 บาทสำหรับงานระยะสั้น ประเมินราคาสุทธิล่วงหน้าฟรี",
      },
      {
        q: "ต้องเตรียมรถอย่างไรก่อนส่ง?",
        a: "ตรวจสอบว่าน้ำมันในถังไม่มากเกินไป (แนะนำไม่เกิน 1/4 ถัง) ถอดกระจกข้างหากเป็นแบบถอดได้ และปลดล็อกคอรถเพื่อให้เข็นขึ้นทางลาดได้สะดวก",
      },
      {
        q: "ใช้เวลานานแค่ไหนในการจัดส่ง?",
        a: "ระยะทางใกล้ในวันเดียวกัน สำหรับงานข้ามภาคเฉลี่ย 1-2 วัน ทีมงานเดินทางตรงไม่แชร์สัมภาระกับผู้อื่น",
      },
    ],
    pricing: [
      {
        type: "มอเตอร์ไซค์ทั่วไป / สกู๊ตเตอร์",
        detail: "Scoopy, Wave, Fazzio, Lead",
        price: "เริ่มต้น 1,500 บาท",
      },
      {
        type: "บิ๊กสกู๊ตเตอร์ / บิ๊กไบค์ขนาดกลาง",
        detail: "PCX, Forza, XMAX, 300-500cc",
        price: "เริ่มต้น 2,200 บาท",
      },
      {
        type: "บิ๊กไบค์ขนาดใหญ่ / ซูเปอร์ไบค์ ข้ามภาค",
        detail: "650cc - 1000cc+ ทั่วไทย",
        price: "เริ่มต้นตามระยะทาง",
      },
    ],
  },
  freight: {
    label: "ขนส่งสินค้า / เหมาคัน",
    labelEn: "Freight Transport",
    icon: Package,
    badge: "เหมาคัน",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    headline: "ขนส่งสินค้า",
    subheadline: "เหมาคัน ตู้ทึบ รับส่งทั่วไทย",
    description:
      "บริการรถรับจ้างขนส่งสินค้าเหมาคัน ด้วยรถกระบะตู้ทึบหลังคาสูง รับส่งสินค้าทั่วไป วัสดุก่อสร้าง อุปกรณ์สำนักงาน และสินค้าอุตสาหกรรม ทั่วทุกจังหวัดในประเทศไทย",
    highlights: [
      {
        title: "รถตู้ทึบหลังคาสูง",
        body: "ความสูงภายใน 2.1 ม. จุสินค้าได้ปริมาณมาก วางซ้อนกล่องหรือพาเลทได้อย่างมีประสิทธิภาพ",
      },
      {
        title: "เหมาคันตลอดเส้นทาง",
        body: "จองรถเฉพาะสินค้าของคุณ ไม่แชร์กับผู้อื่น ปลอดภัยจากของปะปนและตรงเวลา",
      },
      {
        title: "บริการวิ่งรอบดึก 24 ชม.",
        body: "พร้อมวิ่งงานด่วน วิ่งรอบดึกเพื่อหลบหลีกเวลาติดเวลาของรถบรรทุกใหญ่",
      },
      {
        title: "ดูแลความปลอดภัยทุกเที่ยว",
        body: "มีอุปกรณ์ยึดตรึงสัมภาระ มั่นใจได้ว่าสินค้าถึงโรงงานหรือปลายทางสมบูรณ์ 100%",
      },
    ],
    faqs: [
      {
        q: "รับขนส่งสินค้าประเภทอะไรบ้าง?",
        a: "รับขนส่งสินค้าทั่วไปทุกประเภท เช่น สินค้าอุปโภคบริโภค วัสดุก่อสร้าง อุปกรณ์สำนักงาน เฟอร์นิเจอร์ และชิ้นส่วนอุตสาหกรรม ยกเว้นวัตถุอันตรายและสารเคมีไวไฟ",
      },
      {
        q: "สามารถจองรถล่วงหน้าหรือเรียกงานด่วนได้ไหม?",
        a: "สามารถเรียกงานด่วนหรือจองคิวล่วงหน้า 1-2 วัน ทีมงานพร้อมสแตนด์บายตลอด 24 ชั่วโมง",
      },
      {
        q: "คิดราคาอย่างไร มีค่าใช้จ่ายซ่อนเร้นไหม?",
        a: "คิดราคาตามระยะทางจริงและจุดรับส่ง ไม่มีค่าใช้จ่ายแอบแฝง แจ้งราคาสุทธิตามข้อตกลงก่อนเริ่มงาน",
      },
    ],
    pricing: [
      {
        type: "สินค้าขนาดเล็ก-กลาง (ในพื้นที่)",
        detail: "กล่อง/พัสดุ, วัสดุอุปกรณ์, ชิ้นงานอุตสาหกรรม",
        price: "เริ่มต้น 1,200 บาท",
      },
      {
        type: "สินค้าโรงงาน / เหมาคันข้ามจังหวัด",
        detail: "พาเลทสินค้า, อุปกรณ์การผลิต, ขนส่งเต็มคัน",
        price: "เริ่มต้น 2,500 บาท",
      },
      {
        type: "เหมาคันระยะไกลข้ามภาค",
        detail: "ขนส่งตรง Door-to-Door ทั่วประเทศ",
        price: "เริ่มต้นตามระยะทาง",
      },
    ],
  },
};

const serviceIds = Object.keys(serviceConfig);

// ─────────────────────────────────────────────
// Static params: all province × service combos
// ─────────────────────────────────────────────
export async function generateStaticParams() {
  const provinces = Object.keys(provinceMap);
  return provinces.flatMap((province) =>
    serviceIds.map((serviceId) => ({ province, serviceId }))
  );
}

export const revalidate = 3600;
export const dynamicParams = false;

// ─────────────────────────────────────────────
// SEO Metadata
// ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; serviceId: string }>;
}): Promise<Metadata> {
  const { province, serviceId } = await params;
  const loc = provinceMap[province];
  const service = serviceConfig[serviceId];

  if (!loc || !service) {
    return {
      title: "ไม่พบบริการที่ต้องการ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  const provinceName = loc.name;
  const serviceLabel = service.label;

  return {
    title: `${serviceLabel} ${provinceName} | WMS TRANSPORT`,
    description: `บริการ${serviceLabel}ในพื้นที่${provinceName} และทั่วไทย โดย WMS Transport — รถกระบะตู้ทึบมาตรฐาน พร้อมคนยกของ ดูแลความปลอดภัย ติดต่อได้ 24 ชม.`,
    alternates: {
      canonical: `/service/${province}/${serviceId}`,
    },
  };
}

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ province: string; serviceId: string }>;
}) {
  const { province, serviceId } = await params;
  const loc = provinceMap[province];
  const provinceName = loc?.name ?? province;
  const provinceShort = loc?.shortName ?? province;

  const service = serviceConfig[serviceId];

  if (!loc || !service) {
    notFound();
  }

  const otherServices = serviceIds
    .filter((s) => s !== serviceId)
    .map((s) => ({ id: s, ...serviceConfig[s] }));

  const geoData = geoMatrix[province];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.label} ${provinceName}`,
    description: service.description,
    provider: {
      "@id": "https://wms-transport.com/#moving-company",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: provinceName,
      },
      ...(geoData
        ? [
            ...geoData.districts.map((d) => ({
              "@type": "Place",
              name: d,
            })),
            ...geoData.landmarks.map((l) => ({
              "@type": "Place",
              name: l,
            })),
          ]
        : []),
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const routeRates = service.pricing.map((p) => ({
    route: `${service.label}: ${p.type}`,
    distanceOrScope: p.detail,
    transitTime: "ตามระยะทางจริง",
    price: p.price,
  }));

  const formJobType =
    serviceId === "moving"
      ? "condo_dorm"
      : serviceId === "motorcycle"
      ? "motorcycle"
      : "factory_cargo";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ServiceAreaLayout
        heroProps={{
          breadcrumbs: [
            { label: "หน้าแรก", href: "/" },
            { label: "พื้นที่ให้บริการ", href: "/areas" },
            { label: provinceName, href: `/service/${province}` },
            {
              label: service.label,
              href: `/service/${province}/${serviceId}`,
            },
          ],
          h1: `${service.headline} ${service.subheadline}`,
          thaiName: `${service.label} ${provinceName}`,
          description: `${service.description} ให้บริการครอบคลุมพื้นที่ ${provinceName} และเส้นทางเชื่อมต่อทั่วประเทศ`,
          isHeadquarters: province === "samutsakhon",
          isRegionalHub: province === "bangkok" || province === "bkk-thonburi",
          startingPrice: service.pricing[0]?.price || "เริ่มต้น 1,500 บาท",
          deliveryEstimate: "เข้าถึงหน้างานภายใน 30-60 นาที",
          imageSrc: geoData?.images?.[0]?.url || "/images/WM10.webp",
        }}
        sidebarProps={{
          thaiName: `${service.label} ${provinceName}`,
          isHeadquarters: province === "samutsakhon",
          isRegionalHub: province === "bangkok" || province === "bkk-thonburi",
          geographicType:
            province === "samutsakhon"
              ? "headquarters"
              : province === "bangkok" || province === "bkk-thonburi"
              ? "regional_hub"
              : "service_area",
          startingPrice: service.pricing[0]?.price || "เริ่มต้น 1,500 บาท",
          deliveryEstimate: "เข้าถึงหน้างานภายใน 30-60 นาที",
          parentArea: {
            name: `${provinceName} (ดูบริการทั้งหมด)`,
            href: `/service/${province}`,
          },
          corridors: geoData?.corridors?.map((c) => ({ name: c })) || [],
          nearbyAreas: otherServices.map((s) => ({
            name: s.label,
            slug: s.id,
            href: `/service/${province}/${s.id}`,
          })),
        }}
        nearbyAreas={otherServices.map((s) => ({
          name: `${s.label} (${provinceShort})`,
          badge: s.badge,
          description: s.description,
          href: `/service/${province}/${s.id}`,
        }))}
      >
        {/* ── 1. SERVICE INTRODUCTION & HIGHLIGHTS ── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block animate-pulse" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {service.labelEn} · {loc?.region ?? "ทั่วประเทศ"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
            จุดเด่นบริการ{service.label}ในพื้นที่{provinceName}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            {service.description} พร้อมให้คำปรึกษาและวางแผนการขนย้ายโดยทีมงานผู้เชี่ยวชาญ คุ้มครองความปลอดภัยทุกขั้นตอน
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {service.highlights.map((h, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-2xs flex items-start gap-3.5"
              >
                <div className="mt-0.5 p-2 bg-blue-50 border border-blue-200 rounded-xl shrink-0 text-blue-600">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {h.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {h.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. TRANSPORT & ROUTE TABLE ── */}
        <ServiceAreaRouteTable
          thaiName={`${service.label} ${provinceName}`}
          rates={routeRates}
          customTitle={`อัตราค่าบริการ ${service.label} ใน${provinceShort}`}
          customDescription={`อัตราค่าบริการอ้างอิงสำหรับการบริการในพื้นที่ ${provinceName} และเส้นทางข้ามจังหวัด`}
        />

        {/* ── 3. FLEET & SAFETY STANDARDS ── */}
        <section className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>มาตรฐานความปลอดภัยและการดูแลสัมภาระ</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
                <Truck className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900 mb-1">
                รถตู้ทึบหลังคาสูง 2.1 ม.
              </div>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                โครงสร้างปิดมิดชิด ป้องกันสิ่งของตกหล่น กันแดด กันฝน 100%
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900 mb-1">
                บริการตลอด 24 ชั่วโมง
              </div>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                ทีมงานพร้อมสแตนด์บายรับงานด่วนและงานวิ่งรอบดึกทั่วประเทศ
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
                <Users className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900 mb-1">
                ทีมงานมืออาชีพ
              </div>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                พนักงานสุภาพ ผ่านการอบรมการจัดเรียงและการยกของหนักอย่างถูกต้อง
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. FAQS ── */}
        <ServiceAreaFAQ
          thaiName={`${service.label} ${provinceName}`}
          faqs={service.faqs}
        />

        {/* ── 6. OTHER SERVICES IN THIS PROVINCE ── */}
        <section className="mb-10">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            บริการอื่นๆ ใน{provinceShort}
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mb-4">
            เลือกบริการที่เหมาะสมกับรูปแบบงานขนย้ายของคุณ
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherServices.map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.id}
                  href={`/service/${province}/${s.id}`}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      <SIcon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                        {s.label}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {s.description}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── 7. QUOTATION REQUEST FORM ── */}
        <ServiceAreaQuoteForm
          currentLocationName={provinceName}
          currentProvince={province}
          prefillJobType={formJobType}
        />
      </ServiceAreaLayout>

      {/* Internal links for crawlability */}
      <InternalLinks currentCategory="service" currentSlug={province} />
    </>
  );
}
