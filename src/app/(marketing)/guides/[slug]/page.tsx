import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, User, ArrowLeft, Phone, ShieldCheck, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import IntentHero from "@/components/IntentHero";
import CargoFitPlanner from "@/components/CargoFitPlanner";
import { guidesData } from "@/data/guidesData";

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(guidesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesData[slug];

  if (!guide) {
    return {
      title: "ไม่พบคู่มือ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${guide.h1} | WMS TRANSPORT`,
    description: guide.description,
    alternates: {
      canonical: `/guides/${slug}`,
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guidesData[slug];

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <main className="grow relative pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-6">
            <Breadcrumbs
              items={[
                { name: "บทความและคู่มือ", item: "/guides/truck-capacity-cbm" },
                { name: guide.category, item: `/guides/${slug}` },
              ]}
            />
          </div>

          {/* Back button link */}
          <div className="mb-6">
            <Link 
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>กลับหน้าหลัก WMS</span>
            </Link>
          </div>

          {/* Hero Section */}
          <IntentHero
            h1={guide.h1}
            supporting={guide.description}
            badge={guide.category}
            className="pt-2 pb-6"
          />

          {/* E-E-A-T Author Card */}
          <div className="border border-slate-200/90 bg-slate-50/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-xs">
            <div className="flex items-center gap-3.5 text-left">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-blue-200 bg-blue-50 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <span className="text-[10px] text-blue-700 tracking-wider font-bold block uppercase">เขียนและตรวจสอบเนื้อหาโดย</span>
                <span className="text-sm font-bold text-[#0B1F3A] block">{guide.author.name}</span>
                <span className="text-xs text-slate-500 font-medium">{guide.author.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto shrink-0 justify-around sm:justify-start">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>อัปเดต: {guide.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>{guide.readTime}</span>
              </div>
            </div>
          </div>

          {/* Guide Article Content */}
          <article className="space-y-8 font-sans">
            <div className="p-4 sm:p-5 bg-blue-50/70 border border-blue-200 rounded-xl text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
              {guide.introduction}
            </div>

            {guide.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] tracking-tight border-b border-slate-200 pb-2">
                  {section.title}
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">{section.content}</p>
                {section.bullets && (
                  <ul className="list-disc list-inside pl-3 space-y-1.5 text-slate-700 font-normal text-sm sm:text-base">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>

          {/* EMBED CARGO FIT PLANNER */}
          {slug === "truck-capacity-cbm" && (
            <div className="mt-10 mb-12 scroll-mt-24">
              <div className="text-center mb-6">
                <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
                  เครื่องมือจำลองหน้างานจริง
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] mt-3">
                  คำนวณปริมาตรของรวม และทดสอบการโหลดเข้าตู้รับจ้าง
                </h2>
              </div>
              <CargoFitPlanner />
            </div>
          )}

          {/* Quote Factors Explainer Component */}
          <div className="mt-10 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1F3A] mb-3 flex items-center gap-2">
              <ShieldCheck className="text-blue-600 h-5 w-5" />
              <span>ปัจจัยอะไรบ้างที่มีผลต่อการคำนวณค่าบริการขนย้าย?</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mt-5">
              <div className="space-y-3.5">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold">ระยะทางจริงจากจุดรับถึงจุดส่ง:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">คิดราคาเริ่มต้นและอัตรากิโลเมตรตามเส้นทางวิ่งจริงจากระบบแผนที่ดาวเทียม</p>
                  </div>
                </div>
                
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold">ระดับชั้นอาคารและลิฟต์ขนของ:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">อาคารชั้นสูงที่ไม่มีลิฟต์ หรือมีระยะเดินจอดรถเดินเข้างนลึก จำเป็นต้องบวกค่าบริการแรงงาน</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold">จำนวนคนช่วยยกของที่ระบุ:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">เลือกคนช่วยยกเพิ่ม 1-3 คนตามขนาดของหนัก เช่น ที่นอน โซฟา เพื่อเซฟพลังงานและถนอมเฟอร์นิเจอร์</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold">บริการถอดประกอบเฟอร์นิเจอร์:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">ตู้เสื้อผ้าขนาดใหญ่ เตียงนอนน็อคดาวน์ หากต้องการให้ช่างถอดและประกอบปลายทางสามารถแจ้งล่วงหน้าได้</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-10 bg-[#0B1F3A] border border-blue-950 rounded-2xl p-6 sm:p-10 text-center text-white shadow-md relative overflow-hidden">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-wider block mb-2">จองคิวด่วน / ประเมินราคาฟรี</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              ต้องการจ้างรถตู้ทึบรับจ้างขนย้ายใช่หรือไม่?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6 font-medium">
              แจ้งข้อมูลประเภทของ จุดรับ-ส่ง เพื่อให้แอดมินประเมินราคาตามจริงที่เหมาะสมที่สุด ปลอดภัย ไร้กังวล 24 ชั่วโมง
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-base rounded-xl transition-colors shadow-xs"
              >
                <Image src="/images/LINE_icon.webp" alt="LINE" width={20} height={20} className="shrink-0" />
                <span>คุยรายละเอียดผ่าน LINE</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base rounded-xl transition-colors"
              >
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="font-mono">061-240-2436 (ติดต่อตรง)</span>
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
