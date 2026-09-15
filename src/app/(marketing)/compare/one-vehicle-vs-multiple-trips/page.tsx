import { Metadata } from "next";
import { CheckCircle, XCircle, Phone } from "lucide-react";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "ย้ายของรอบเดียวจบ VS ขนส่งหลายเที่ยว แบบไหนประหยัดคุ้มกว่ากัน? | WMS",
  description: "เปรียบเทียบวิเคราะห์ความแตกต่างทางต้นทุนระหว่างการจัดขนย้ายเที่ยวเดียวจบด้วยรถขนาดที่เหมาะสม กับการวิ่งหลายรอบบานปลาย เลือกอย่างไรให้ประหยัดที่สุด",
  alternates: {
    canonical: "/compare/one-vehicle-vs-multiple-trips",
  },
};

export default function CompareOneVsMultipleTripsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans">
      <main className="flex-1 relative pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Ambient subtle light background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="flex justify-start">
            <Breadcrumbs
              items={[
                { name: "บล็อกความรู้", item: "/guides/truck-capacity-cbm" },
                { name: "รอบเดียวจบ VS วิ่งหลายเที่ยว", item: "/compare/one-vehicle-vs-multiple-trips" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-700 tracking-wider uppercase font-bold text-xs bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-4 inline-block">
              Expert Comparison Guide
            </span>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
              ขนย้ายของรอบเดียวจบ VS วิ่งหลายเที่ยว <br />
              <span className="text-blue-600">
                ประเมินค่าน้ำมันและค่าเสียเวลา เลือกแบบไหนคุ้มกว่า?
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-8 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 space-y-8 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                
                {/* Introduction */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    บทนำ: ทางเลือกความคุ้มค่าในการขนย้ายระยะทางใกล้-ไกล
                  </h2>
                  <p>
                    เวลาที่ของมีปริมาณปานกลางค่อนไปทางเยอะ ปัญหาโลกแตกคือเราควรจะเลือกเช่ารถกระบะขนส่งชิ้นที่พอดีวิ่งเที่ยวเดียวจบ 
                    หรือควรจะขับรถคันเล็กวิ่งสลับไปกลับหลายรอบดีกว่ากัน เพราะมองเผินๆ การวิ่งสลับไปกลับอาจใช้รถคันที่เล็กกว่าแต่ค่าน้ำมัน คันเสียเวลา และความเหนื่อยล้าหน้างานสะสมอาจบานปลายจนคิดเป็นต้นทุนรวมที่แพงกว่าการขนย้ายเที่ยวเดียวจบอย่างแน่นอน
                  </p>
                </section>

                {/* Section 1: One-Trip Move */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    1. ขนย้ายรอบเดียวจบ (One-Trip Move)
                  </h2>
                  <p>
                    คือการกะปริมาตรของ คิว (CBM) อย่างถูกต้อง และเรียกรถกระบะรับจ้างตู้ทึบที่จุของได้ครบในคราวเดียว เพื่อส่งให้ถึงหน้าบ้านในเที่ยวเดียว
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    <div className="bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-xl">
                      <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5 text-sm">
                        <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> ข้อดีของงานรอบเดียวจบ
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                        <li>ประหยัดเวลาอย่างเป็นรูปธรรม ทำงานเสร็จสิ้นภายในครึ่งวัน ไม่ยืดเยื้อ</li>
                        <li>ควบคุมการปิดนิติบุคคลและลิฟต์ขนของคอนโดในรอบเวลาเดียว ลดโอกาสโดนปรับ</li>
                        <li>ประหยัดค่าน้ำมันรวม และลดความเมื่อยล้าสะสมของกล้ามเนื้อ</li>
                      </ul>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-200/80 p-5 rounded-xl">
                      <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-1.5 text-sm">
                        <XCircle className="w-4 h-4 shrink-0 text-rose-600" /> ข้อเสียของงานรอบเดียวจบ
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                        <li>ต้องการการวางแผนจองล่วงหน้าและประเมินขนาดรถอย่างแม่นยำ</li>
                        <li>อัตราค่าจ้างเริ่มต้นอาจสูงกว่ารถคันเล็กประเภทรถจักรยานยนต์หรือรถเก๋งส่วนบุคคล</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2: Multiple Trips */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    2. วิ่งสลับขนหลายเที่ยว (Multiple Trips)
                  </h2>
                  <p>
                    คือการใช้รถกระบะคันเล็กหรือรถส่วนตัวขนของออกสลับไปมาระหว่างจุดรับ-ส่งหลายครั้ง
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    <div className="bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-xl">
                      <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5 text-sm">
                        <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> ข้อดีของการวิ่งหลายเที่ยว
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                        <li>ยืดหยุ่นในการจัดวาง โดยไม่ต้องแรปหุ้มเฟอร์นิเจอร์ทั้งหมดพร้อมกันทีเดียว</li>
                        <li>เหมาะสำหรับการเคลื่อนย้ายในระยะทางใกล้มากๆ (ไม่เกิน 2-3 กิโลเมตร)</li>
                      </ul>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-200/80 p-5 rounded-xl">
                      <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-1.5 text-sm">
                        <XCircle className="w-4 h-4 shrink-0 text-rose-600" /> ข้อเสียของการวิ่งหลายเที่ยว
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                        <li>ค่าน้ำมันสะสมจะทวีคูณตามจำนวนรอบบวกเพิ่มจนบานปลาย</li>
                        <li>เสียค่าผ่านทางพิเศษหลายครั้ง และเหนื่อยสะสมเพราะต้องแบกและรอโหลดของวนซ้ำหลายรอบ</li>
                        <li>ความเสี่ยงในการจราจรติดขัดเพิ่มขึ้นหลายเท่าตัว</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Comparison Summary */}
                <section className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-6 sm:p-8 space-y-3">
                  <h3 className="text-lg font-black text-blue-950">คำแนะนำเชิงโลจิสติกส์:</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    WMS Transport แนะนำว่า หากระยะทางขนย้ายเกิน 10 กิโลเมตรขึ้นไป การจัดสรรรถกระบะตอนเดียวตู้ทึบที่มีปริมาตร 7.62 คิว ขนย้ายเสร็จสิ้นในเที่ยวเดียวคือทางเลือกที่คุ้มค่า ปลอดภัย และเซฟต้นทุนพลังงานรวมได้สูงสุดครับ ช่วยลดความเสี่ยงจากการขีดข่วนของเคลื่อนตัวระหว่างทางได้เป็นอย่างดี
                  </p>
                </section>
              </div>

              {/* Sidebar Column: CTA */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                <div className="bg-[#0B1F3A] border border-blue-900/30 rounded-2xl p-6 text-center space-y-4 shadow-md">
                  <h4 className="text-white font-black text-base">ปรึกษาวิธีจัดเรียงของรอบเดียวจบ</h4>
                  <p className="text-xs text-blue-100/80 leading-relaxed">
                    ช่วยคำนวณคิว (CBM) และจัดหารถขนาดที่พอดีเพื่อให้จบงานเร็ว ปลอดภัย ไร้บานปลาย
                  </p>
                  <div className="space-y-3 pt-2">
                    <a
                      href="https://line.me/ti/p/DtICkMaDet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-sm font-bold shadow-xs"
                    >
                      <Image src="/images/LINE_icon.webp" alt="LINE" width={18} height={18} className="shrink-0" />
                      <span>ประเมินราคาเที่ยวเดียว (LINE)</span>
                    </a>
                    <a
                      href="tel:0612402436"
                      className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 text-xs font-semibold transition-all"
                    >
                      <Phone className="h-3.5 w-3.5 text-blue-300" />
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
