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
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <main className="flex-1 relative pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="flex justify-start mb-4">
            <Breadcrumbs
              items={[
                { name: "บล็อกความรู้", item: "/guides/truck-capacity-cbm" },
                { name: "ย้ายเอง VS จ้างคนยกของ", item: "/compare/moving-alone-vs-helpers" },
              ]}
            />
          </div>

          <div className="mt-4">
            <span className="text-blue-700 tracking-wide uppercase font-bold text-xs bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-4 inline-block">
              Expert Comparison Guide
            </span>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0B1F3A] leading-tight mb-6">
              ย้ายของเอง VS จ้างคนช่วยยกของ WMS <br />
              <span className="text-blue-600">
                แบบไหนคุ้มค่าและถนอมร่างกายมากกว่ากัน?
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mt-8 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 space-y-10 text-slate-700 font-normal text-sm sm:text-base leading-relaxed">
                
                {/* Introduction */}
                <section className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F3A] border-b border-slate-200 pb-2">
                    บทนำ: ทางเลือกความสบายใจในการย้ายบ้านคอนโด
                  </h2>
                  <p>
                    เวลาที่ต้องจัดแจงย้ายหอพัก คอนโด หรือย้ายสินค้า คนส่วนใหญ่มักเริ่มคิดคำนวณว่าจะยกและขนของด้วยตัวเองทั้งหมดเพื่อประหยัดต้นทุน 
                    หรือจะเสริมบริการพนักงานยกของของบริษัทรับจ้างดี เพราะดูเหมือนมีค่าใช้จ่ายเพิ่มเติม แต่ถ้าพิจารณาถึงความเสี่ยงด้านสุขภาพ ความเสียหายของเครื่องใช้ไฟฟ้า และเวลาที่เสียไป การจ้างมืออาชีพอาจให้ความคุ้มค่าที่สูงกว่าในระยะยาว
                  </p>
                </section>

                {/* Section 1: Moving Alone */}
                <section className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F3A] border-b border-slate-200 pb-2">
                    1. ยกขนย้ายสิ่งของด้วยตัวเอง (DIY Moving)
                  </h2>
                  <p>
                    คือการยกแพ็ก โหลดของ และยกของขึ้นห้องใหม่ทั้งหมดด้วยตนเอง โดยอาจไหว้วานเพื่อนฝูงหรือครอบครัวให้มาช่วยเบาแรง
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-xl shadow-xs">
                      <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> ข้อดีของการยกย้ายของเอง
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
                        <li>ประหยัดค่าแรงพนักงานยก (ลดงบประมาณเริ่มต้นได้ 500-1,000 บาท)</li>
                        <li>ควบคุมการจัดวางของมีค่าส่วนตัวได้เอง โดยไม่ต้องกังวลเรื่องการจับต้องของคนนอก</li>
                        <li>มีความยืดหยุ่นในกำหนดเวลาการคัดกรองของ จัดของช้าๆ ได้ตามใจ</li>
                      </ul>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-200 p-5 rounded-xl shadow-xs">
                      <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" /> ข้อเสียของการยกย้ายของเอง
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
                        <li>เสี่ยงเกิดอาการบาดเจ็บกล้ามเนื้อหลังหรือข้อต่อเฉียบพลันจากการยกท่าทางที่ไม่ถูกต้อง</li>
                        <li>ของชิ้นใหญ่เช่นตู้เย็นหรือเตียงนอนอาจกระแทกผนังบันได/ผนังห้องจนชำรุด โดยไม่มีผู้ช่วยประคองดูแล</li>
                        <li>เสียเวลามากและเหนื่อยล้าจนส่งผลต่อกิจกรรมการทำงานในวันถัดไป</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2: Using WMS Helpers */}
                <section className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F3A] border-b border-slate-200 pb-2">
                    2. การจ้างคนช่วยยกของมืออาชีพ WMS (WMS Loading Helpers)
                  </h2>
                  <p>
                    คือการเลือกซื้อบริการพนักงานยกของเพิ่มเข้ามาช่วยในการเคลื่อนย้าย จัดวางของหนัก และจัดระเบียบตู้ทึบอย่างเป็นระบบ
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-xl shadow-xs">
                      <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> ข้อดีของการใช้บริการคนช่วยยก WMS
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
                        <li>เซฟสุขภาพทางร่างกาย ไม่ต้องแบกรับความเสี่ยงเรื่องเจ็บปวดกระดูกกล้ามเนื้อหลัง</li>
                        <li>พนักงานผ่านการเทรนนิ่งด้านทักษะยกของหนัก รู้วิธีหลบเลี่ยงบันไดและลิฟต์นิติบุคคล</li>
                        <li>มีอุปกรณ์หุ้มฟิล์ม แอร์บับเบิล และมีมาตรการดูแลความปลอดภัยของสิ่งของตลอดเส้นทาง</li>
                      </ul>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-200 p-5 rounded-xl shadow-xs">
                      <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" /> ข้อเสียของการใช้บริการคนช่วยยก WMS
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
                        <li>มีค่าใช้จ่ายพนักงานยกเพิ่มเติม (เริ่มต้นที่ 500 บาทต่อคน)</li>
                        <li>ต้องคอยแจ้งนิติคอนโดหรือจัดจองพื้นที่จอดจดทะเบียนคนนอกล่วงหน้าตามมาตรการความปลอดภัย</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Comparison Summary */}
                <section className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 sm:p-7 space-y-2.5 shadow-xs">
                  <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">บทสรุปส่งท้าย:</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    หากสัมภาระมีเพียงกล่องขนาดเล็ก เสื้อผ้า ของจิปาถะไม่เกิน 5 กล่อง การย้ายของเองอาจเป็นคำตอบที่สมเหตุสมผลครับ แต่หากในของของคุณมีที่นอน 5-6 ฟุต โซฟา เครื่องซักผ้า หรือตู้เย็นขนาดใหญ่ การเรียกคนช่วยยกเสริมของ WMS จะคุ้มค่ากว่าอย่างมาก ช่วยให้ของถึงปลายทางในความปลอดภัยสูงสุด และเซฟหลังของคุณได้อย่างสมบูรณ์แบบ
                  </p>
                </section>
              </div>

              {/* Sidebar Column: CTA */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#0B1F3A] border border-blue-950 rounded-2xl p-6 text-center space-y-4 text-white shadow-md">
                  <h4 className="text-white font-extrabold text-sm">จองคนช่วยยกพร้อมรถขนส่ง WMS</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    เลือกสัดส่วนแรงงานที่ลงตัว พนักงานสุภาพ ผ่านประวัติอาชญากรรม คุยง่าย ปลอดภัยสูงสุด
                  </p>
                  <div className="space-y-2.5">
                    <a
                      href="https://line.me/ti/p/DtICkMaDet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors text-xs font-bold shadow-xs"
                    >
                      <Image src="/images/LINE_icon.webp" alt="LINE" width={16} height={16} className="shrink-0" />
                      <span>ขอใบเสนอราคา (LINE)</span>
                    </a>
                    <a
                      href="tel:0612402436"
                      className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-blue-400" />
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
