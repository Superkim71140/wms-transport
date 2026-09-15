import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
  Home,
  Bike,
  Package,
} from "lucide-react";
import { provinceMap } from "../page";
import { geoMatrix } from "@/app/data/geoMatrix";


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
        title: "อุปกรณ์แพ็กฟรี",
        body: "บริการแรปพลาสติก แอร์บับเบิล กล่องกระดาษ เพื่อปกป้องเฟอร์นิเจอร์ชิ้นสำคัญ",
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
        a: "บริการคนช่วยยกของสามารถเพิ่มเข้ามาได้ตามที่ต้องการ โดยมีราคาแยกตามจำนวนคนและชั่วโมงการทำงาน",
      },
      {
        q: "ถ้าของเสียหายระหว่างขนย้ายทำอย่างไร?",
        a: "เรามีมาตรการดูแลความปลอดภัยสินค้าและสิ่งของตลอดการเดินทาง หากพบข้อกังวลหรือสิ่งผิดปกติ โปรดแจ้งเจ้าหน้าที่ทันที",
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
        price: "เริ่มต้น 6,000 บาท",
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
        body: "ป้องกันฝน ฝุ่น และอุณหภูมิ รถมอเตอร์ไซค์ถึงปลายทางสดใส ไม่มีรอยใหม่",
      },
      {
        title: "รัดตรึงด้วยสายรัดพิเศษ",
        body: "ยึดรถมอเตอร์ไซค์ให้อยู่นิ่ง ไม่ล้มระหว่างทาง ด้วยสายรัดมาตรฐานนำเข้า",
      },
      {
        title: "รับได้ทุกรุ่น",
        body: "ตั้งแต่มอเตอร์ไซค์ทั่วไป สกู๊ตเตอร์ ไปจนถึงบิ๊กไบค์ทุกยี่ห้อ ทุกขนาด",
      },
      {
        title: "ดูแลความปลอดภัยครบถ้วน",
        body: "มีมาตรการดูแลความปลอดภัยตลอดการเดินทาง หมดกังวลทุกกิโลเมตร",
      },
    ],
    faqs: [
      {
        q: "ค่าขนส่งมอเตอร์ไซค์คิดราคาอย่างไร?",
        a: "คิดราคาตามระยะทางจริงของเส้นทาง โดยเริ่มต้นที่ 1,500 บาทสำหรับงานระยะสั้น ราคาแน่นอนโปรดสอบถามผ่าน LINE หรือโทรหาทีมงาน",
      },
      {
        q: "ต้องเตรียมรถอย่างไรก่อนส่ง?",
        a: "ตรวจสอบว่าน้ำมันในถังไม่มากเกินไป (ไม่เกิน 1/4 ถัง) ถอดกระจกข้างหากเป็นแบบถอดได้ และล็อกล้อรถให้เรียบร้อย",
      },
      {
        q: "ใช้เวลานานแค่ไหนในการจัดส่ง?",
        a: "ขึ้นอยู่กับระยะทาง โดยเฉลี่ยกรุงเทพฯ-เชียงใหม่ใช้เวลาประมาณ 1 วัน กรุงเทพฯ-ภูเก็ตใช้เวลาประมาณ 1-2 วัน",
      },
    ],
    pricing: [
      {
        type: "มอเตอร์ไซค์ทั่วไป / สกู๊ตเตอร์",
        detail: "ระยะทางใกล้ถึงกลาง",
        price: "เริ่มต้น 1,500 บาท",
      },
      {
        type: "บิ๊กไบค์ขนาดกลาง",
        detail: "ระยะทางกลางถึงไกล",
        price: "เริ่มต้น 2,500 บาท",
      },
      {
        type: "บิ๊กไบค์ขนาดใหญ่ / ข้ามภาค",
        detail: "ทุกเส้นทางทั่วประเทศ",
        price: "ติดต่อสอบถาม",
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
        body: "ความสูงภายใน 2.1 ม. จุสินค้าได้ปริมาณมาก เหมาะสำหรับสินค้าทุกประเภท",
      },
      {
        title: "เหมาคันตลอดเส้นทาง",
        body: "จองรถเฉพาะสินค้าของคุณ ไม่แชร์กับผู้อื่น ปลอดภัยและตรงเวลา",
      },
      {
        title: "วิ่งรอบดึกได้",
        body: "บริการตลอด 24 ชั่วโมง ทีมงานพร้อมรับงานทุกเวลาตามที่ลูกค้าต้องการ",
      },
      {
        title: "ดูแลความปลอดภัยทุกเที่ยว",
        body: "มั่นใจทุกขั้นตอนการขนส่ง คุ้มครองความเสียหายระหว่างทาง",
      },
    ],
    faqs: [
      {
        q: "รับขนส่งสินค้าประเภทอะไรบ้าง?",
        a: "รับขนส่งสินค้าทั่วไปทุกประเภท ได้แก่ สินค้าอุปโภคบริโภค วัสดุก่อสร้าง อุปกรณ์สำนักงาน เฟอร์นิเจอร์ และสินค้าอุตสาหกรรมเบา ยกเว้นวัตถุอันตรายและวัตถุระเบิด",
      },
      {
        q: "สามารถจองรถล่วงหน้าได้ไหม?",
        a: "จองล่วงหน้าได้เลยครับ แนะนำให้จองล่วงหน้า 1-2 วันเพื่อให้ทีมงานเตรียมรถที่มีขนาดเหมาะสมกับปริมาณสินค้าของท่าน",
      },
      {
        q: "คิดราคาอย่างไร มีค่าใช้จ่ายซ่อนเร้นไหม?",
        a: "คิดราคาตามระยะทางจริงและขนาดของที่ต้องการขนส่ง ไม่มีค่าใช้จ่ายแอบแฝง ราคาที่ตกลงกันคือราคาที่ยืนยันตามเนื้องานจริง",
      },
    ],
    pricing: [
      {
        type: "สินค้าขนาดเล็ก-กลาง",
        detail: "กล่อง/พัสดุ, เฟอร์นิเจอร์ชิ้นเล็ก",
        price: "เริ่มต้น 800 บาท",
      },
      {
        type: "สินค้าขนาดกลาง-ใหญ่",
        detail: "เครื่องใช้ไฟฟ้า, วัสดุก่อสร้าง",
        price: "เริ่มต้น 1,500 บาท",
      },
      {
        type: "เหมาคันข้ามจังหวัด",
        detail: "ขนส่งสินค้าเต็มคัน ทุกเส้นทาง",
        price: "ติดต่อสอบถาม",
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

  const Icon = service.icon;

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
      ...(geoData ? [
        ...geoData.districts.map(d => ({
          "@type": "Place",
          name: d
        })),
        ...geoData.landmarks.map(l => ({
          "@type": "Place",
          name: l
        }))
      ] : [])
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
                { name: provinceName, item: `/service/${province}` },
                {
                  name: service.label,
                  item: `/service/${province}/${serviceId}`,
                },
              ]}
            />
          </div>

          {/* ── HERO ── */}
          <div className="mt-8 mb-16">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider mb-5 ${service.badgeColor}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {service.labelEn} · {loc?.region ?? "ทั่วประเทศ"}
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-5">
              {service.headline}
              <br />
              <span className="text-blue-600">
                {service.subheadline}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-8 font-medium">
              {service.description} ครอบคลุมพื้นที่{" "}
              <strong className="text-slate-900">{provinceName}</strong> และเส้นทางข้ามจังหวัดทั่วประเทศ
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-xl font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt="LINE"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain shrink-0"
                />
                <span>ติดต่อผ่าน LINE ฟรี</span>
              </a>
              <a
                href="tel:0612402436"
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 text-slate-800 rounded-xl font-bold text-base shadow-xs transition-all hover:-translate-y-0.5"
              >
                <Phone className="h-4.5 w-4.5 text-blue-600" />
                <span className="font-mono tracking-wider">061-240-2436</span>
              </a>
            </div>
          </div>

          {/* ── HIGHLIGHTS GRID ── */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 text-center">
              จุดเด่นบริการ{service.label}
            </h2>
            <p className="text-slate-500 text-center text-sm mb-10">
              ครบ จบ ในที่เดียว ดูแลทุกขั้นตอนโดยทีมงานมืออาชีพ
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-start gap-4"
                >
                  <div className="mt-0.5 p-2 bg-blue-50 border border-blue-200 rounded-xl shrink-0 text-blue-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {h.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{h.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PRICING TABLE ── */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 text-center">
              อัตราค่าบริการใน{provinceShort}
            </h2>
            <div className="overflow-x-auto bg-white border border-slate-200/80 rounded-2xl p-1 shadow-xs">
              <table className="w-full text-left border-collapse text-sm min-w-[480px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-600 font-bold bg-slate-50/80">
                    <th className="p-4">ประเภทงาน</th>
                    <th className="p-4">รายละเอียด</th>
                    <th className="p-4 text-right">ราคาเริ่มต้น</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {service.pricing.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 text-slate-900 font-bold">{row.type}</td>
                      <td className="p-4 text-slate-600">{row.detail}</td>
                      <td className="p-4 text-right text-blue-600 font-bold">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3 px-1">
              * ราคาเริ่มต้นสำหรับงานในพื้นที่ใกล้เคียง สำหรับงานข้ามจังหวัดโปรดให้เจ้าหน้าที่ประเมินราคาฟรี
            </p>
          </section>

          {/* ── LARGE CTA BANNER ── */}
          <div className="relative bg-[#0B1F3A] border border-blue-900/30 rounded-2xl p-6 sm:p-10 mb-20 overflow-hidden text-white shadow-md">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-bold text-xs">ประเมินราคาฟรีภายใน 5 นาที</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                  สนใจบริการ{service.label}ใน{provinceShort}?
                </h3>
                <p className="text-blue-100/80 text-sm leading-relaxed max-w-lg">
                  ติดต่อทีมงานผ่าน LINE หรือโทรได้เลย ประเมินราคาจากภาพถ่ายหรือวิดีโอ รวดเร็วใน 5 นาที ไม่มีค่าใช้จ่าย
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://line.me/ti/p/DtICkMaDet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-xl font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Image
                    src="/images/LINE_icon.webp"
                    alt="LINE"
                    width={18}
                    height={18}
                    className="h-4.5 w-4.5 object-contain shrink-0"
                  />
                  <span>ส่ง LINE ฟรี</span>
                </a>
                <a
                  href="tel:0612402436"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4 text-blue-300 shrink-0" />
                  <span>โทรเลย</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── FAQ ── */}
          <section className="max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-8">
              คำถามที่พบบ่อย (FAQ)
            </h2>
            <div className="space-y-3.5">
              {service.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-slate-200/80 open:border-blue-300 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all shadow-xs"
                >
                  <summary className="flex justify-between items-center font-bold text-slate-900 text-base list-none select-none">
                    <span className="group-open:text-blue-600 transition-colors pr-4">
                      {faq.q}
                    </span>
                    <span className="ml-1.5 shrink-0 p-1.5 bg-slate-50 group-open:bg-blue-50 text-slate-500 group-open:text-blue-600 rounded-lg border border-slate-200 group-open:rotate-180 transition-all text-xs font-mono">
                      ▼
                    </span>
                  </summary>
                  <div className="mt-4 pt-3 text-slate-600 leading-relaxed font-medium text-sm border-t border-slate-100">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── TRUST BADGES ── */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: ShieldCheck,
                title: "ดูแลความปลอดภัยสิ่งของ",
                body: "มีมาตรการดูแลความปลอดภัยของสิ่งของตลอดเส้นทาง",
              },
              {
                icon: Clock,
                title: "บริการตลอด 24 ชั่วโมง",
                body: "ติดต่อประเมินราคาและจองคิวรถได้ทุกเวลา",
              },
              {
                icon: Users,
                title: "ทีมงานมืออาชีพ",
                body: "พนักงานผ่านการอบรม สุภาพ ตรงต่อเวลา",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-start gap-4"
              >
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl shrink-0 text-blue-600">
                  <b.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.body}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ── OTHER SERVICES IN THIS PROVINCE ── */}
          <section className="pt-8 border-t border-slate-200 mb-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                บริการอื่นๆ ใน{provinceShort}
              </h4>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                WMS Transport ยังมีบริการอื่นๆ ในพื้นที่เดียวกัน ครบวงจร ดูแลทุกการขนย้าย
              </p>
              <div className="flex flex-wrap gap-3">
                {otherServices.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <Link
                      key={s.id}
                      href={`/service/${province}/${s.id}`}
                      className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 rounded-xl text-slate-700 hover:text-blue-600 font-bold text-sm transition-all group"
                    >
                      <SIcon className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{s.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
                <Link
                  href={`/service/${province}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-sm transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  ดูบริการทั้งหมดใน{provinceShort}
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}
