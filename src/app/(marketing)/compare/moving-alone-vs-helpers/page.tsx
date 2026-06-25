import { Metadata } from "next";
import { CheckCircle, XCircle, Phone } from "lucide-react";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "ย้ายของเอง VS จ้างคนช่วยยกของ WMS เลือกแบบไหนคุ้มค่าที่สุด | WMS",
  description: "เปรียบเทียบวิเคราะห์ความแตกต่างระหว่างการย้ายหอ/ย้ายบ้านเอง กับการจ้างพนักงานช่วยยกเสริม คุ้มราคาต่างกันอย่างไร ช่วยเซฟหลังและทรัพย์สินคุณได้จริงไหม",
  alternates: {
    canonical: "/compare/moving-alone-vs-helpers",
  },
};

export default function CompareAloneVsHelpersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <main className="flex-1 relative pt-32 pb-24 md:pt-40 md:pb-36">
        {/* Ambient background glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-[10%] left-[-5%] w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent" />
          <div className="absolute bottom-[10%] right-[-5%] w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-indigo-500/5 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="flex justify-start">
            <Breadcrumbs
              items={[
                { name: "บล็อกความรู้", item: "/guides/truck-capacity-cbm" },
                { name: "ย้ายเอง VS จ้างคนยกของ", item: "/compare/moving-alone-vs-helpers" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              Expert Comparison Guide
            </span>
            
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
              ย้ายของเอง VS จ้างคนช่วยยกของ WMS <br />
              <span className="text-blue-400">
                แบบไหนคุ้มค่าและถนอมร่างกายมากกว่ากัน?
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 space-y-12 text-slate-300 font-medium text-sm sm:text-base leading-relaxed">
                
                {/* Introduction */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-white border-b border-white/5 pb-2">
                    บทนำ: ทางเลือกความสบายใจในการย้ายบ้านคอนโด
                  </h2>
                  <p>
                    เวลาที่ต้องจัดแจงย้ายหอพัก คอนโด หรือย้ายสินค้า คนส่วนใหญ่มักเริ่มคิดคำนวณว่าจะยกและขนของด้วยตัวเองทั้งหมดเพื่อประหยัดต้นทุน 
                    หรือจะเสริมบริการพนักงานยกของของบริษัทรับจ้างดี เพราะดูเหมือนมีค่าใช้จ่ายเพิ่มเติม แต่ถ้าพิจารณาถึงความเสี่ยงด้านสุขภาพ ความเสียหายของเครื่องใช้ไฟฟ้า และเวลาที่เสียไป การจ้างมืออาชีพอาจให้ความคุ้มค่าที่สูงกว่าในระยะยาว
                  </p>
                </section>

                {/* Section 1: Moving Alone */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-white border-b border-white/5 pb-2">
                    1. ยกขนย้ายสิ่งของด้วยตัวเอง (DIY Moving)
                  </h2>
                  <p>
                    คือการยกแพ็ก โหลดของ และยกของขึ้นห้องใหม่ทั้งหมดด้วยตนเอง โดยอาจไหว้วานเพื่อนฝูงหรือครอบครัวให้มาช่วยเบาแรง
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-5 h-5 shrink-0" /> ข้อดีของการยกย้ายของเอง
                      </h4>
                      <ul className="space-y-2 text-xs list-disc list-inside">
                        <li>ประหยัดค่าแรงพนักงานยก (ลดงบประมาณเริ่มต้นได้ 500-1,000 บาท)</li>
                        <li>ควบคุมการจัดวางของมีค่าส่วนตัวได้เอง โดยไม่ต้องกังวลเรื่องการจับต้องของคนนอก</li>
                        <li>มีความยืดหยุ่นในกำหนดเวลาการคัดกรองของ จัดของช้าๆ ได้ตามใจ</li>
                      </ul>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                        <XCircle className="w-5 h-5 shrink-0" /> ข้อเสียของการยกย้ายของเอง
                      </h4>
                      <ul className="space-y-2 text-xs list-disc list-inside">
                        <li>เสี่ยงเกิดอาการบาดเจ็บกล้ามเนื้อหลังหรือข้อต่อเฉียบพลันจากการยกท่าทางที่ไม่ถูกต้อง</li>
                        <li>ของชิ้นใหญ่เช่นตู้เย็นหรือเตียงนอนอาจกระแทกผนังบันได/ผนังห้องจนชำรุด โดยไม่มีประกันชดใช้</li>
                        <li>เสียเวลามากและเหนื่อยล้าจนส่งผลต่อกิจกรรมการทำงานในวันถัดไป</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2: Using WMS Helpers */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-white border-b border-white/5 pb-2">
                    2. การจ้างคนช่วยยกของมืออาชีพ WMS (WMS Loading Helpers)
                  </h2>
                  <p>
                    คือการเลือกซื้อบริการพนักงานยกของเพิ่มเข้ามาช่วยในการเคลื่อนย้าย จัดวางของหนัก และจัดระเบียบตู้ทึบอย่างเป็นระบบ
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-5 h-5 shrink-0" /> ข้อดีของการใช้บริการคนช่วยยก WMS
                      </h4>
                      <ul className="space-y-2 text-xs list-disc list-inside">
                        <li>เซฟสุขภาพทางร่างกาย ไม่ต้องแบกรับความเสี่ยงเรื่องเจ็บปวดกระดูกกล้ามเนื้อหลัง</li>
                        <li>พนักงานผ่านการเทรนนิ่งด้านทักษะยกของหนัก รู้วิธีหลบเลี่ยงบันไดและลิฟต์นิติบุคคล</li>
                        <li>มีอุปกรณ์หุ้มฟิล์ม แอร์บับเบิล และมีประกันภัยคุ้มครองสินค้าเสียหายฟรีกรณีเกิดอุบัติเหตุ</li>
                      </ul>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                        <XCircle className="w-5 h-5 shrink-0" /> ข้อเสียของการใช้บริการคนช่วยยก WMS
                      </h4>
                      <ul className="space-y-2 text-xs list-disc list-inside">
                        <li>มีค่าใช้จ่ายพนักงานยกเพิ่มเติม (เริ่มต้นที่ 500 บาทต่อคน)</li>
                        <li>ต้องคอยแจ้งนิติคอนโดหรือจัดจองพื้นที่จอดจดทะเบียนคนนอกล่วงหน้าตามมาตรการความปลอดภัย</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Comparison Summary */}
                <section className="bg-white/1 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-black text-white">บทสรุปส่งท้าย:</h3>
                  <p className="text-xs sm:text-sm">
                    หากสัมภาระมีเพียงกล่องขนาดเล็ก เสื้อผ้า ของจิปาถะไม่เกิน 5 กล่อง การย้ายของเองอาจเป็นคำตอบที่สมเหตุสมผลครับ แต่หากในของของคุณมีที่นอน 5-6 ฟุต โซฟา เครื่องซักผ้า หรือตู้เย็นขนาดใหญ่ การเรียกคนช่วยยกเสริมของ WMS จะคุ้มค่ากว่าอย่างมาก ช่วยให้ของถึงปลายทางในความปลอดภัยสูงสุด และเซฟหลังของคุณได้อย่างสมบูรณ์แบบ
                  </p>
                </section>
              </div>

              {/* Sidebar Column: CTA */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-linear-to-b from-blue-600/20 to-blue-900/10 border border-blue-500/20 rounded-2xl p-6 text-center space-y-4">
                  <h4 className="text-white font-black text-sm">จองคนช่วยยกพร้อมรถขนส่ง WMS</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    เลือกสัดส่วนแรงงานที่ลงตัว พนักงานสุภาพ ผ่านประวัติอาชญากรรม คุยง่าย ปลอดภัยสูงสุด
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://line.me/ti/p/DtICkMaDet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-xs font-black"
                    >
                      <Image src="/images/LINE_icon.webp" alt="LINE" width={16} height={16} className="shrink-0" />
                      <span>ขอใบเสนอราคา (LINE)</span>
                    </a>
                    <a
                      href="tel:0612402436"
                      className="w-full bg-slate-900 border border-white/5 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:-translate-y-0.5 text-xs font-bold"
                    >
                      <Phone className="h-3 w-3 text-blue-400" />
                      <span className="font-mono">061-240-2436</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      </div>
  );
}
