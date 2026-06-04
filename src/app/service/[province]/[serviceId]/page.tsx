import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
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
        title: "มีประกันสินค้าสูงสุด 100,000 บาท",
        body: "คุ้มครองความเสียหายระหว่างการขนย้ายทุกเที่ยวการเดินทาง อุ่นใจทุกขั้นตอน",
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
        a: "เรามีวงเงินประกันสินค้าชำรุดหรืออุบัติเหตุระหว่างเดินทางสูงสุดถึง 100,000 บาท ตามเงื่อนไขที่กำหนด โปรดแจ้งเจ้าหน้าที่ทันทีเมื่อพบความเสียหาย",
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
    badge: "มีประกัน",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    headline: "ขนส่งมอเตอร์ไซค์",
    subheadline: "และบิ๊กไบค์ ทุกรุ่น ทุกเส้นทาง",
    description:
      "บริการขนส่งมอเตอร์ไซค์และบิ๊กไบค์ทุกรุ่น ด้วยรถกระบะตู้ทึบปิดมิดชิด รัดตรึงด้วยสายรัดพิเศษ ป้องกันรอยขีดข่วนและการกระแทก ส่งถึงบ้านอย่างปลอดภัย 100%",
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
        title: "มีประกันสินค้าครบถ้วน",
        body: "ประกันภัยคุ้มครองตลอดการเดินทาง หมดกังวลทุกกิโลเมตร",
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
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/20",
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
        title: "ประกันสินค้าคุ้มครองทุกเที่ยว",
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
        a: "คิดราคาตามระยะทางจริงและขนาดของที่ต้องการขนส่ง ไม่มีค่าใช้จ่ายแอบแฝง ราคาที่ตกลงกันคือราคาที่จ่ายจริง 100%",
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
  const provinceName = loc?.name ?? province;
  const service = serviceConfig[serviceId];
  const serviceLabel = service?.label ?? serviceId;

  return {
    title: `${serviceLabel} ${provinceName} | WMS TRANSPORT`,
    description: `บริการ${serviceLabel}ในพื้นที่${provinceName} และทั่วไทย โดย WMS Transport — รถกระบะตู้ทึบมาตรฐาน พร้อมคนยกของ มีประกัน ติดต่อได้ 24 ชม.`,
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

  // Fallback for unknown serviceId
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">
          <h1 className="text-4xl font-black text-white mb-4">ไม่พบบริการที่ต้องการ</h1>
          <p className="text-slate-400 mb-8">กรุณากลับไปเลือกบริการที่ต้องการจากหน้าจังหวัด</p>
          <Link
            href={`/service/${province}`}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้า {provinceName}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  const otherServices = serviceIds
    .filter((s) => s !== serviceId)
    .map((s) => ({ id: s, ...serviceConfig[s] }));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.label} ${provinceName}`,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "WMS Transport",
      telephone: "0612402436",
      address: {
        "@type": "PostalAddress",
        addressLocality: provinceName,
        addressCountry: "TH",
      },
    },
    areaServed: provinceName,
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
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                { name: provinceName, item: `/service/${province}` },
                {
                  name: service.label,
                  item: `/service/${province}/${serviceId}`,
                },
              ]}
            />
          </div>

          {/* ── HERO ── */}
          <div className="mt-8 mb-20">
            <span
              className={`inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-[0.15em] mb-6 ${service.badgeColor}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {service.labelEn} · {loc?.region ?? "ทั่วประเทศ"}
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              {service.headline}
              <br />
              <span className="text-blue-400">
                {service.subheadline}
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-10 font-medium">
              {service.description} ครอบคลุมพื้นที่{" "}
              <strong className="text-white">{provinceName}</strong> และเส้นทางข้ามจังหวัดทั่วประเทศ
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(6,199,85,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(6,199,85,0.4)]"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt="LINE"
                  width={24}
                  height={24}
                  className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0"
                />
                <span>ติดต่อผ่าน LINE ฟรี</span>
              </a>
              <a
                href="tel:0612402436"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-400/50 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="font-mono tracking-wider">061-240-2436</span>
              </a>
            </div>
          </div>

          {/* ── HIGHLIGHTS GRID ── */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 text-center">
              จุดเด่นบริการ{service.label}
            </h2>
            <p className="text-slate-400 text-center text-sm mb-10">
              ครบ จบ ในที่เดียว ดูแลทุกขั้นตอนโดยทีมงานมืออาชีพ
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.highlights.map((h, i) => (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-white/[0.02] to-white/[0.04] hover:from-blue-900/20 hover:to-slate-900/50 border border-white/5 hover:border-blue-500/40 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 flex items-start gap-4"
                >
                  <div className="mt-0.5 p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:bg-blue-500/20 transition-all shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {h.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{h.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PRICING TABLE ── */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-10 text-center">
              อัตราค่าบริการใน{provinceShort}
            </h2>
            <div className="overflow-x-auto bg-white/[0.01] border border-white/5 rounded-3xl p-1 backdrop-blur-xl">
              <table className="w-full text-left border-collapse text-sm min-w-[480px]">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-bold bg-white/5">
                    <th className="p-4">ประเภทงาน</th>
                    <th className="p-4">รายละเอียด</th>
                    <th className="p-4 text-right">ราคาเริ่มต้น</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-semibold text-slate-200">
                  {service.pricing.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-white">{row.type}</td>
                      <td className="p-4 text-slate-400">{row.detail}</td>
                      <td className="p-4 text-right text-blue-400 font-bold">{row.price}</td>
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
          <div className="relative bg-gradient-to-br from-blue-600/[0.12] via-blue-500/[0.06] to-cyan-500/[0.04] border border-blue-500/30 rounded-[32px] p-8 md:p-12 mb-20 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold text-sm">ประเมินราคาฟรีภายใน 5 นาที</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                  สนใจบริการ{service.label}ใน{provinceShort}?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
                  ติดต่อทีมงานผ่าน LINE หรือโทรได้เลย ประเมินราคาจากภาพถ่ายหรือวิดีโอ รวดเร็วใน 5 นาที ไม่มีค่าใช้จ่าย
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://line.me/ti/p/DtICkMaDet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-7 py-4 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-2xl font-black text-base shadow-[0_8px_25px_rgba(6,199,85,0.3)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Image
                    src="/images/LINE_icon.webp"
                    alt="LINE"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain shrink-0"
                  />
                  <span>ส่ง LINE ฟรี</span>
                </a>
                <a
                  href="tel:0612402436"
                  className="flex items-center justify-center gap-2.5 px-7 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-400/40 text-white rounded-2xl font-bold text-base transition-all duration-300"
                >
                  <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                  <span>โทรเลย</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── FAQ ── */}
          <section className="max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">
              คำถามที่พบบ่อย (FAQ)
            </h2>
            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white/[0.02] border border-white/5 open:border-blue-500/30 open:bg-gradient-to-br open:from-blue-950/20 open:via-[#040b15]/50 open:to-[#040b15] open:shadow-[0_20px_50px_rgba(59,130,246,0.1)] rounded-3xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all duration-300 hover:border-white/10 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-300 opacity-0 group-open:opacity-100 transition-opacity duration-300" />
                  <summary className="flex justify-between items-center font-extrabold text-white text-base list-none select-none">
                    <span className="group-open:text-blue-400 transition-colors duration-300 pr-4">
                      {faq.q}
                    </span>
                    <span className="ml-1.5 shrink-0 p-2 bg-white/5 group-open:bg-blue-500/10 text-slate-400 group-open:text-blue-400 rounded-xl border border-white/10 group-open:border-blue-500/20 group-open:rotate-180 transition-all duration-300 text-lg leading-none">
                      ﹀
                    </span>
                  </summary>
                  <div className="mt-5 text-slate-300 leading-relaxed font-medium pl-4 border-l border-white/10 group-open:border-blue-500/30 transition-colors duration-300">
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
                title: "มีประกันสินค้าสูงสุด 100k",
                body: "คุ้มครองความเสียหายระหว่างการขนส่งทุกเที่ยว",
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
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex items-start gap-4"
              >
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl shrink-0">
                  <b.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white mb-1">{b.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{b.body}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ── OTHER SERVICES IN THIS PROVINCE ── */}
          <section className="pt-8 border-t border-white/10 mb-4">
            <div className="bg-gradient-to-br from-blue-950/20 via-white/[0.01] to-transparent border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
              <h4 className="text-lg font-extrabold text-white mb-2">
                บริการอื่นๆ ใน{provinceShort}
              </h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                WMS Transport ยังมีบริการอื่นๆ ในพื้นที่เดียวกัน ครบวงจร ดูแลทุกการขนย้าย
              </p>
              <div className="flex flex-wrap gap-4">
                {otherServices.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <Link
                      key={s.id}
                      href={`/service/${province}/${s.id}`}
                      className="flex items-center gap-2.5 px-5 py-3 bg-white/[0.02] border border-white/10 hover:border-blue-400/50 hover:bg-blue-500/5 rounded-2xl text-slate-300 hover:text-white font-bold text-sm transition-all duration-300 group shadow-md"
                    >
                      <SIcon className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{s.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
                <Link
                  href={`/service/${province}`}
                  className="flex items-center gap-2 px-5 py-3 bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] rounded-2xl text-slate-400 hover:text-white font-bold text-sm transition-all duration-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  ดูบริการทั้งหมดใน{provinceShort}
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
