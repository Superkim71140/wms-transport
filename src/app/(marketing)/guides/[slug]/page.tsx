import React from "react";
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
      title: "บทความและคู่มือการขนย้าย | WMS TRANSPORT",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    robots: guide.isIndexable ? "index, follow" : "noindex, nofollow",
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guidesData[slug];

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex flex-col justify-between">
        <div className="grow flex flex-col items-center justify-center pt-32 pb-24 px-4 text-center">
          <h1 className="text-3xl font-black mb-4">ไม่พบคู่มือนี้</h1>
          <p className="text-slate-400 mb-8 max-w-md">บทความคู่มือที่คุณต้องการกำลังอยู่ระหว่างการเรียบเรียงข้อมูลหรือไม่มีอยู่ในระบบ</p>
          <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition-all">
            กลับหน้าหลัก
          </Link>
        </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <main className="grow relative pt-24 pb-24">
        {/* Ambient background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent" />
          <div className="absolute bottom-[20%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-indigo-500/5 to-transparent" />
        </div>

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
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors"
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
            className="pt-4 pb-8"
          />

          {/* E-E-A-T Author Card */}
          <div className="border border-white/10 bg-white/2 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3.5 text-left">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-blue-500/20 bg-slate-800 flex items-center justify-center shrink-0">
                <User className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <span className="text-[10px] text-blue-400 tracking-wider font-black block uppercase">เขียนและตรวจสอบเนื้อหาโดย</span>
                <span className="text-sm font-black text-white block">{guide.author.name}</span>
                <span className="text-xs text-slate-400 font-semibold">{guide.author.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto shrink-0 justify-around sm:justify-start">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span>อัปเดต: {guide.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-500" />
                <span>{guide.readTime}</span>
              </div>
            </div>
          </div>

          {/* Guide Article Content */}
          <article className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-8 font-medium">
            <p className="text-base sm:text-lg text-slate-200 border-l-4 border-blue-500 pl-4 py-1 italic font-semibold">
              {guide.introduction}
            </p>

            {guide.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight border-b border-white/5 pb-2">
                  {section.title}
                </h2>
                <p className="font-semibold">{section.content}</p>
                {section.bullets && (
                  <ul className="list-disc list-inside pl-4 space-y-2 text-slate-300 font-semibold">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>

          {/* EMBED CARGO FIT PLANNER (Only on flagship capacity guide) */}
          {slug === "truck-capacity-cbm" && (
            <div className="mt-12 mb-16 scroll-mt-24">
              <div className="text-center mb-6">
                <span className="px-3.5 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                  เครื่องมือจำลองหน้างานจริง
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-4">
                  คำนวณปริมาตรของรวม และทดสอบการโหลดเข้าตู้รับจ้าง
                </h2>
              </div>
              <CargoFitPlanner />
            </div>
          )}

          {/* Quote Factors Explainer Component */}
          <div className="mt-12 perf-card rounded-2xl p-6 sm:p-8 border border-white/5 bg-[#071426]/60">
            <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="text-blue-400 h-5 w-5" />
              <span>ปัจจัยอะไรบ้างที่มีผลต่อการคำนวณค่าบริการขนย้าย?</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mt-6">
              <div className="space-y-4">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">ระยะทางจริงจากจุดรับถึงจุดส่ง:</strong>
                    <p className="text-slate-400 text-xs">คิดราคาเริ่มต้นและอัตรากิโลเมตรตามเส้นทางวิ่งจริงจากระบบแผนที่ดาวเทียม</p>
                  </div>
                </div>
                
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">ระดับชั้นอาคารและลิฟต์ขนของ:</strong>
                    <p className="text-slate-400 text-xs">อาคารชั้นสูงที่ไม่มีลิฟต์ หรือมีระยะเดินจอดรถเดินเข้างนลึก จำเป็นต้องบวกค่าบริการแรงงาน</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">จำนวนคนช่วยยกของที่ระบุ:</strong>
                    <p className="text-slate-400 text-xs">เลือกคนช่วยยกเพิ่ม 1-3 คนตามขนาดของหนัก เช่น ที่นอน โซฟา เพื่อเซฟพลังงานและถนอมเฟอร์นิเจอร์</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">บริการถอดประกอบเฟอร์นิเจอร์:</strong>
                    <p className="text-slate-400 text-xs">ตู้เสื้อผ้าขนาดใหญ่ เตียงนอนน็อคดาวน์ หากต้องการให้ช่างถอดและประกอบปลายทางสามารถแจ้งล่วงหน้าได้</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-linear-to-b from-[#071426] to-[#040B15] border border-white/10 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent pointer-events-none" />
            <span className="text-blue-400 font-black text-xs uppercase tracking-widest block mb-3">จองคิวด่วน / ประเมินราคาฟรี</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
              ต้องการจ้างรถตู้ทึบรับจ้างขนย้ายใช่หรือไม่?
            </h3>
            <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed mb-8 font-semibold">
              แจ้งข้อมูลประเภทของ จุดรับ-ส่ง เพื่อให้แอดมินประเมินราคาตามจริงที่เหมาะสมที่สุด ปลอดภัย ไร้กังวล 24 ชั่วโมง
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#06C755] hover:bg-[#05B34F] text-white font-black text-base rounded-2xl transition-all shadow-[0_10px_20px_rgba(6,199,85,0.2)] hover:-translate-y-0.5"
              >
                <Image src="/images/LINE_icon.webp" alt="LINE" width={20} height={20} className="shrink-0" />
                <span>คุยรายละเอียดผ่าน LINE</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-blue-400/50 text-white font-bold text-base rounded-2xl transition-all hover:-translate-y-0.5"
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
