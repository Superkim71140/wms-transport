import { Metadata } from "next";
import { CheckCircle, XCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";

export const metadata: Metadata = {
  title: "เปรียบเทียบรถกระบะคอก VS รถกระบะตู้ทึบ ย้ายบ้านแบบไหนดีกว่ากัน? | WMS TRANSPORT",
  description: "เจาะลึกข้อดีข้อเสียระหว่างรถกระบะคอกและรถกระบะตู้ทึบสำหรับการขนย้ายบ้าน หอพัก คอนโด เลือกแบบไหนปลอดภัยที่สุด ประหยัดที่สุด คุ้มค่าที่สุดสำหรับคุณ",
  alternates: {
    canonical: "/compare/pickup-vs-box-truck",
  },
};

export default function CompareTrucksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <main className="flex-1 relative pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="flex justify-start mb-4">
            <Breadcrumbs
              items={[
                { name: "บล็อกความรู้", item: "/blog" },
                { name: "เปรียบเทียบกระบะคอก VS กระบะตู้ทึบ", item: "/compare/pickup-vs-box-truck" },
              ]}
            />
          </div>

          <div className="mt-4">
            <span className="text-blue-700 tracking-wide uppercase font-bold text-xs bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-4 inline-block">
              Expert Comparison Guide
            </span>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0B1F3A] leading-tight mb-6">
              เปรียบเทียบรถกระบะคอก VS รถกระบะตู้ทึบ <br />
              <span className="text-blue-600">
                ย้ายบ้านแบบไหนตอบโจทย์ที่สุด?
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mt-8 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 toc-content space-y-10">
                
                {/* 1. Overview Section */}
                <section className="space-y-4">
                  <h2 id="overview" className="text-xl md:text-2xl font-bold text-[#0B1F3A] border-b border-slate-200 pb-2.5">
                    บทนำ: การเลือกประเภทรถรับจ้างขนของ
                  </h2>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    เมื่อถึงคราวต้องย้ายบ้าน ย้ายหอพัก หรือย้ายคอนโด คำถามแรกที่พบบ่อยที่สุดคือจะเลือกใช้ 
                    <strong>รถกระบะคอก (มีผ้าใบคลุม)</strong> หรือ <strong>รถกระบะตู้ทึบ</strong> ดีกว่ากัน? 
                    เนื่องจากลักษณะของตัวรถมีความแตกต่างกันอย่างมาก ทั้งในเรื่องระดับการปกป้องสิ่งของ ความสะดวกในการจัดวาง 
                    และข้อจำกัดทางสภาพแวดล้อม WMS Transport ได้ทำการรวบรวมข้อมูลเจาะลึกเพื่อช่วยคุณตัดสินใจได้อย่างถูกต้องที่สุด
                  </p>
                </section>

                {/* 2. Pickup Bed Guide Section */}
                <section className="space-y-4">
                  <h2 id="pickup-bed" className="text-xl md:text-2xl font-bold text-[#0B1F3A] border-b border-slate-200 pb-2.5">
                    รถกระบะคอก (Pickup Truck with High Rack)
                  </h2>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    เป็นรถกระบะที่ติดตั้งโครงเหล็กต่อขยายด้านข้างและหลังคาผ้าใบคลุม (มักจะเป็นผ้าใบสีกรมท่าหรือสีดำรัดด้วยเชือก)
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-xl shadow-xs">
                      <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> ข้อดีของรถกระบะคอก
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                        <li>สามารถบรรทุกสิ่งของที่มีความสูงเกินหลังคารถมาตรฐานได้ (เช่น ต้นไม้ใหญ่, เสาขนาดยาว)</li>
                        <li>มีความยืดหยุ่นในการจัดวางของที่มีรูปทรงแปลกๆ โค้งมน</li>
                        <li>ระบายอากาศได้ดีกว่า ตู้ไม่อบความร้อน</li>
                      </ul>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-200 p-5 rounded-xl shadow-xs">
                      <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" /> ข้อเสียของรถกระบะคอก
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                        <li>ผ้าใบอาจมีรอยรั่วซึม ทำให้ฝุ่น แดด และน้ำฝนทำลายเฟอร์นิเจอร์หรือเครื่องใช้ไฟฟ้าได้</li>
                        <li>มีโอกาสที่สิ่งของจะปลิวหรือหลุดร่วงหากมัดเชือกรัดไม่แน่นหนา</li>
                        <li>ความปลอดภัยในการป้องกันการโจรกรรมระหว่างจอดพักต่ำกว่าแบบตู้ทึบ</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 3. Box Truck Guide Section */}
                <section className="space-y-4">
                  <h2 id="box-truck" className="text-xl md:text-2xl font-bold text-[#0B1F3A] border-b border-slate-200 pb-2.5">
                    รถกระบะตู้ทึบ (Box Truck / Closed Cabinet)
                  </h2>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    เป็นรถกระบะมาตรฐานที่ต่อตู้อลูมิเนียมทึบด้านหลัง มิดชิดและมีความสูงเฉลี่ย 2.1 เมตรจากพื้นกระบะ
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-xl shadow-xs">
                      <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> ข้อดีของรถกระบะตู้ทึบ
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                        <li>กันแดด กันน้ำฝน กันฝุ่นละอองได้อย่างมิดชิด ปกป้องที่นอน เครื่องซักผ้า โซฟา ได้สมบูรณ์แบบ</li>
                        <li>ตัวตู้ปิดมิดชิด มีระบบกุญแจและซีลปิด ปลอดภัยจากการสูญหายและโจรกรรมระหว่างทาง</li>
                        <li>จัดเรียงกล่องพัสดุซ้อนกันขึ้นไปได้ง่ายและเป็นระเบียบเรียบร้อย</li>
                      </ul>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-200 p-5 rounded-xl shadow-xs">
                      <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" /> ข้อเสียของรถกระบะตู้ทึบ
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                        <li>จำกัดความสูงของสิ่งของ ไม่สามารถขนย้ายของที่มีความสูงเกิน 2.1 เมตรในแนวตั้งได้</li>
                        <li>อุณหภูมิภายในตู้อาจจะร้อนอบอ้าวหากจอดตากแดดเป็นเวลานาน</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 4. Comparison Table Section */}
                <section className="space-y-4">
                  <h2 id="comparison-table" className="text-xl md:text-2xl font-bold text-[#0B1F3A] border-b border-slate-200 pb-2.5">
                    ตารางเปรียบเทียบคุณสมบัติหลัก
                  </h2>
                  
                  <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-xs">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50">
                          <th className="p-3.5">คุณสมบัติการขนย้าย</th>
                          <th className="p-3.5">รถกระบะคอก (+ผ้าใบ)</th>
                          <th className="p-3.5">รถกระบะตู้ทึบ (WMS)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        <tr>
                          <td className="p-3.5 text-[#0B1F3A] font-bold">การกันแดดและฝุ่นละออง</td>
                          <td className="p-3.5 text-rose-700">ปานกลาง (อาจมีลมพัดฝุ่นเข้าตามรอยพับ)</td>
                          <td className="p-3.5 text-emerald-700 font-bold">ดีเยี่ยม (ปิดมิดชิด)</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 text-[#0B1F3A] font-bold">การกันพายุและฝนตกหนัก</td>
                          <td className="p-3.5 text-rose-700">ต่ำ-ปานกลาง (เสี่ยงน้ำไหลซึมจากด้านล่างผ้าใบ)</td>
                          <td className="p-3.5 text-emerald-700 font-bold">ดีเยี่ยม (ป้องกันฝน)</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 text-[#0B1F3A] font-bold">ความปลอดภัยจากการโจรกรรม</td>
                          <td className="p-3.5 text-rose-700">ต่ำ (ใช้มีดกรีดผ้าใบเข้าถึงของได้ง่าย)</td>
                          <td className="p-3.5 text-emerald-700 font-bold">สูงมาก (ประตูปิดแข็งแรง ใส่แม่กุญแจล็อกได้)</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 text-[#0B1F3A] font-bold">การบรรทุกของสูงเกินมาตรฐาน</td>
                          <td className="p-3.5 text-emerald-700 font-bold">ทำได้ยืดหยุ่น (เปิดท้ายหรือคอกสูงได้)</td>
                          <td className="p-3.5 text-slate-500">ไม่ได้ (จำกัดความสูงที่ 2.1 เมตร)</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 text-[#0B1F3A] font-bold">ความสะดวกในการย้ายบ้านทั่วไป</td>
                          <td className="p-3.5 text-slate-600">เหมาะกับสิ่งของสวน เครื่องจักรก่อสร้าง</td>
                          <td className="p-3.5 text-blue-700 font-bold">เหมาะที่สุดสำหรับย้ายบ้าน คอนโด หอพัก รถมอเตอร์ไซค์</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* 5. Summary Verdict Section */}
                <section className="space-y-4">
                  <h2 id="verdict" className="text-xl md:text-2xl font-bold text-[#0B1F3A] border-b border-slate-200 pb-2.5">
                    บทสรุป: ควรเลือกคันไหนย้ายบ้าน?
                  </h2>
                  <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-slate-800 text-sm sm:text-base leading-relaxed font-normal shadow-xs">
                    สำหรับ <strong>การขนย้ายบ้าน คอนโด หรือหอพักทั่วไป</strong> ที่มีเฟอร์นิเจอร์ เตียงนอน เสื้อผ้า 
                    และเครื่องใช้ไฟฟ้า WMS Transport ขอแนะนำอย่างยิ่งให้เลือกใช้ <strong>รถกระบะตู้ทึบ</strong> 
                    เนื่องจากความปลอดภัยและความสะอาดสูงสุด ปกป้องสิ่งของเสียหายจากน้ำฝนและแดดประเทศไทยได้อย่างดีที่สุด 
                    โดยบริการของเรายัง <strong>พร้อมคนช่วยยก</strong> เพื่อประคองสิ่งของขึ้นจัดเรียงเป็นระเบียบ 
                    ป้องกันความกระทบกระเทือนตลอดการเดินทาง
                  </div>
                </section>

                {/* Inline CTA block */}
                <div className="bg-[#0B1F3A] border border-blue-950 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 text-white shadow-md">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1">สนใจจองคิวรถกระบะตู้ทึบรับจ้างขนของ</h3>
                    <p className="text-slate-300 text-xs sm:text-sm">บริการจริงใจ ประเมินราคาโปร่งใส ตลอด 24 ชั่วโมง</p>
                  </div>
                  <a
                    href="tel:0612402436"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-xs active:scale-95 shrink-0 text-sm"
                  >
                    <span>ติดต่อประเมินราคาฟรี</span>
                  </a>
                </div>

              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <TableOfContents />
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
