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
                { name: "รอบเดียวจบ VS วิ่งหลายเที่ยว", item: "/compare/one-vehicle-vs-multiple-trips" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              Expert Comparison Guide
            </span>
            
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
              ขนย้ายของรอบเดียวจบ VS วิ่งหลายเที่ยว <br />
              <span className="text-blue-400">
                ประเมินค่าน้ำมันและค่าเสียเวลา เลือกแบบไหนคุ้มกว่า?
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 space-y-12 text-slate-300 font-medium text-sm sm:text-base leading-relaxed">
                
                {/* Introduction */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-white border-b border-white/5 pb-2">
                    บทนำ: ทางเลือกความคุ้มค่าในการขนย้ายระยะทางใกล้-ไกล
                  </h2>
                  <p>
                    เวลาที่ของมีปริมาณปานกลางค่อนไปทางเยอะ ปัญหาโลกแตกคือเราควรจะเลือกเช่ารถกระบะขนส่งชิ้นที่พอดีวิ่งเที่ยวเดียวจบ 
                    หรือควรจะขับรถคันเล็กวิ่งสลับไปกลับหลายรอบดีกว่ากัน เพราะมองเผินๆ การวิ่งสลับไปกลับอาจใช้รถคันที่เล็กกว่าแต่ค่าน้ำมัน คันเสียเวลา และความเหนื่อยล้าหน้างานสะสมอาจบานปลายจนคิดเป็นต้นทุนรวมที่แพงกว่าการขนย้ายเที่ยวเดียวจบอย่างแน่นอน
                  </p>
                </section>

                {/* Section 1: One-Trip Move */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-white border-b border-white/5 pb-2">
                    1. ขนย้ายรอบเดียวจบ (One-Trip Move)
                  </h2>
                  <p>
                    คือการกะปริมาตรของ คิว (CBM) อย่างถูกต้อง และเรียกรถกระบะรับจ้างตู้ทึบที่จุของได้ครบในคราวเดียว เพื่อส่งให้ถึงหน้าบ้านในเที่ยวเดียว
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-5 h-5 shrink-0" /> ข้อดีของงานรอบเดียวจบ
                      </h4>
                      <ul className="space-y-2 text-xs list-disc list-inside">
                        <li>ประหยัดเวลาอย่างเป็นรูปธรรม ทำงานเสร็จสิ้นภายในครึ่งวัน ไม่ยืดเยื้อ</li>
                        <li>ควบคุมการปิดนิติบุคคลและลิฟต์ขนของคอนโดในรอบเวลาเดียว ลดโอกาสโดนปรับ</li>
                        <li>ประหยัดค่าน้ำมันรวม และลดความเมื่อยล้าสะสมของกล้ามเนื้อ</li>
                      </ul>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                        <XCircle className="w-5 h-5 shrink-0" /> ข้อเสียของงานรอบเดียวจบ
                      </h4>
                      <ul className="space-y-2 text-xs list-disc list-inside">
                        <li>ต้องการการวางแผนจองล่วงหน้าและประเมินขนาดรถอย่างแม่นยำ</li>
                        <li>อัตราค่าจ้างเริ่มต้นอาจสูงกว่ารถคันเล็กประเภทรถจักรยานยนต์หรือรถเก๋งส่วนบุคคล</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2: Multiple Trips */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-white border-b border-white/5 pb-2">
                    2. วิ่งสลับขนหลายเที่ยว (Multiple Trips)
                  </h2>
                  <p>
                    คือการใช้รถกระบะคันเล็กหรือรถส่วนตัวขนของออกสลับไปมาระหว่างจุดรับ-ส่งหลายครั้ง
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-5 h-5 shrink-0" /> ข้อดีของการวิ่งหลายเที่ยว
                      </h4>
                      <ul className="space-y-2 text-xs list-disc list-inside">
                        <li>ยืดหยุ่นในการจัดวาง โดยไม่ต้องแรปหุ้มเฟอร์นิเจอร์ทั้งหมดพร้อมกันทีเดียว</li>
                        <li>เหมาะสำหรับการเคลื่อนย้ายในระยะทางใกล้มากๆ (ไม่เกิน 2-3 กิโลเมตร)</li>
                      </ul>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                        <XCircle className="w-5 h-5 shrink-0" /> ข้อเสียของการวิ่งหลายเที่ยว
                      </h4>
                      <ul className="space-y-2 text-xs list-disc list-inside">
                        <li>ค่าน้ำมันสะสมจะทวีคูณตามจำนวนรอบบวกเพิ่มจนบานปลาย</li>
                        <li>เสียค่าผ่านทางพิเศษหลายครั้ง และเหนื่อยสะสมเพราะต้องแบกและรอโหลดของวนซ้ำหลายรอบ</li>
                        <li>ความเสี่ยงในการจราจรติดขัดเพิ่มขึ้นหลายเท่าตัว</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Comparison Summary */}
                <section className="bg-white/1 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-black text-white">คำแนะนำเชิงโลจิสติกส์:</h3>
                  <p className="text-xs sm:text-sm">
                     WMS Transport แนะนำว่า หากระยะทางขนย้ายเกิน 10 กิโลเมตรขึ้นไป การจัดสรรรถกระบะตอนเดียวตู้ทึบที่มีปริมาตร 7.62 คิว ขนย้ายเสร็จสิ้นในเที่ยวเดียวคือทางเลือกที่คุ้มค่า ปลอดภัย และเซฟต้นทุนพลังงานรวมได้สูงสุดครับ ช่วยลดความเสี่ยงจากการขีดข่วนของเคลื่อนตัวระหว่างทางได้เป็นอย่างดี
                  </p>
                </section>
              </div>

              {/* Sidebar Column: CTA */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-linear-to-b from-blue-600/20 to-blue-900/10 border border-blue-500/20 rounded-2xl p-6 text-center space-y-4">
                  <h4 className="text-white font-black text-sm">ปรึกษาวิธีจัดเรียงของรอบเดียวจบ</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    ช่วยคำนวณคิว (CBM) และจัดหารถขนาดที่พอดีเพื่อให้จบงานเร็ว ปลอดภัย ไร้บานปลาย
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://line.me/ti/p/DtICkMaDet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-xs font-black"
                    >
                      <Image src="/images/LINE_icon.webp" alt="LINE" width={16} height={16} className="shrink-0" />
                      <span>ประเมินราคาเที่ยวเดียว (LINE)</span>
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
