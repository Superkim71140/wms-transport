import { Metadata } from "next";
import { notFound } from "next/navigation";
import { provinceMap } from "@/app/(marketing)/service/[province]/page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomerReviews from "@/components/CustomerReviews";
import Breadcrumbs from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import { Phone } from "lucide-react";
import Image from "next/image";
import { buildRoutePageMetadata } from "@/lib/seo/metadata";
import { buildRouteServiceSchema, escapeJsonLd } from "@/lib/seo/schema";
import { getRouteBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { approvedRouteCorridors, isApprovedRouteCorridor } from "@/data/approvedRouteCorridors";

export const dynamicParams = false;

export async function generateStaticParams() {
  return approvedRouteCorridors.map(({ from, to }) => ({
    from,
    to,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ from: string; to: string }>;
}): Promise<Metadata> {
  const { from, to } = await params;
  
  if (!isApprovedRouteCorridor(from, to)) {
    notFound();
  }

  const fromData = provinceMap[from];
  const toData = provinceMap[to];

  if (!fromData || !toData) {
    notFound();
  }

  return buildRoutePageMetadata(fromData.name, toData.name, from, to);
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ from: string; to: string }>;
}) {
  const { from, to } = await params;

  if (!isApprovedRouteCorridor(from, to)) {
    notFound();
  }

  const fromData = provinceMap[from];
  const toData = provinceMap[to];

  if (!fromData || !toData) {
    notFound();
  }

  const fromName = fromData.name;
  const toName = toData.name;
  const routeSchema = buildRouteServiceSchema(fromName, toName, from, to);
  const breadcrumbItems = getRouteBreadcrumbs(fromName, toName, from, to);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(routeSchema)) }}
      />
      <Navbar />
      
      <main className="flex-1 relative pt-28 pb-20 md:pt-36 md:pb-28 z-10">
        {/* Ambient subtle light background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          <Breadcrumbs items={breadcrumbItems} />

          <div className="text-center mb-16">
            <span className="text-blue-700 tracking-wider font-bold text-xs bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-6">
              เส้นทางแนะนำ · {fromName} → {toName}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
              บริการขนย้ายจาก <span className="text-blue-600">{fromName}</span>
              <br />ส่งตรงถึง <span className="text-blue-600">{toName}</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium mb-10 leading-relaxed">
              รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ขนส่งมอเตอร์ไซค์ พร้อมทีมงานช่วยยกของอย่างมืออาชีพ ใส่ใจความปลอดภัยทุกขั้นตอน พร้อมดูแลตลอดการเดินทาง
            </p>

            <div className="inline-flex flex-col items-center p-6 bg-white border border-slate-200/80 rounded-2xl mb-10 shadow-xs">
              <span className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">การคำนวณราคา</span>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                ประเมินตามระยะทางจริง <span className="text-sm font-semibold text-blue-600">(ปรึกษาและเช็คราคาฟรี)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-xl font-bold text-base shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Image src="/images/LINE_icon.webp" alt="LINE" width={20} height={20} className="h-5 w-5 object-contain" />
                <span>สอบถามราคาเป๊ะๆ ผ่าน LINE</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-bold text-base shadow-xs transition-all hover:-translate-y-0.5"
              >
                <Phone className="h-4.5 w-4.5 text-blue-600" />
                <span className="font-mono tracking-wider">061-240-2436</span>
              </a>
            </div>
          </div>
          
          <CustomerReviews currentProvince={to} />

        </div>
      </main>

      <InternalLinks currentCategory="route" />
      <Footer />
    </div>
  );
}
