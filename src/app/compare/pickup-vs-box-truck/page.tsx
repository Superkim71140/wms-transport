import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, XCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";

export const metadata: Metadata = {
  title: "เปรียบเทียบรถกระบะคอก VS รถกระบะตู้ทึบ ย้ายบ้านแบบไหนดีกว่ากัน? | WMS TRANSPORT",
  description: "เจาะลึกข้อดีข้อเสียระหว่างรถกระบะคอกและรถกระบะตู้ทึบสำหรับการขนย้ายบ้าน หอพัก คอนโด เลือกแบบไหนปลอดภัยที่สุด ประหยัดที่สุด คุ้มค่าที่สุดสำหรับคุณ",
};

export default function CompareTrucksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <Navbar />

      <main className="flex-1 relative pt-32 pb-24 md:pt-40 md:pb-36">
        {/* Ambient background glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-[10%] left-[-5%] w-[1000px] h-[1000px] bg-blue-600/[0.04] rounded-full blur-[200px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[1000px] h-[1000px] bg-indigo-500/[0.05] rounded-full blur-[250px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="flex justify-start">
            <Breadcrumbs
              items={[
                { name: "บล็อกความรู้", item: "/blog" },
                { name: "เปรียบเทียบกระบะคอก VS กระบะตู้ทึบ", item: "/compare/pickup-vs-box-truck" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              Expert Comparison Guide
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              เปรียบเทียบรถกระบะคอก VS รถกระบะตู้ทึบ <br />
              <span className="text-blue-400">
                ย้ายบ้านแบบไหนตอบโจทย์ที่สุด?
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 toc-content space-y-12">
                
                {/* 1. Overview Section */}
                <section className="space-y-6">
                  <h2 id="overview" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    บทนำ: การเลือกประเภทรถรับจ้างขนของ
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    เมื่อถึงคราวต้องย้ายบ้าน ย้ายหอพัก หรือย้ายคอนโด คำถามแรกที่พบบ่อยที่สุดคือจะเลือกใช้ 
                    <strong>รถกระบะคอก (มีผ้าใบคลุม)</strong> หรือ <strong>รถกระบะตู้ทึบ</strong> ดีกว่ากัน? 
                    เนื่องจากลักษณะของตัวรถมีความแตกต่างกันอย่างมาก ทั้งในเรื่องระดับการปกป้องสิ่งของ ความสะดวกในการจัดวาง 
                    และข้อจำกัดทางสภาพแวดล้อม WMS Transport ได้ทำการรวบรวมข้อมูลเจาะลึกเพื่อช่วยคุณตัดสินใจได้อย่างถูกต้องที่สุด
                  </p>
                </section>

                {/* 2. Pickup Bed Guide Section */}
                <section className="space-y-6">
                  <h2 id="pickup-bed" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    รถกระบะคอก (Pickup Truck with High Rack)
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    เป็นรถกระบะที่ติดตั้งโครงเหล็กต่อขยายด้านข้างและหลังคาผ้าใบคลุม (มักจะเป็นผ้าใบสีกรมท่าหรือสีดำรัดด้วยเชือก)
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-5 h-5" /> ข้อดีของรถกระบะคอก
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                        <li>สามารถบรรทุกสิ่งของที่มีความสูงเกินหลังคารถมาตรฐานได้ (เช่น ต้นไม้ใหญ่, เสาขนาดยาว)</li>
                        <li>มีความยืดหยุ่นในการจัดวางของที่มีรูปทรงแปลกๆ โค้งมน</li>
                        <li>ระบายอากาศได้ดีกว่า ตู้ไม่อบความร้อน</li>
                      </ul>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                        <XCircle className="w-5 h-5" /> ข้อเสียของรถกระบะคอก
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                        <li>ผ้าใบอาจมีรอยรั่วซึม ทำให้ฝุ่น แดด และน้ำฝนทำลายเฟอร์นิเจอร์หรือเครื่องใช้ไฟฟ้าได้</li>
                        <li>มีโอกาสที่สิ่งของจะปลิวหรือหลุดร่วงหากมัดเชือกรัดไม่แน่นหนา</li>
                        <li>ความปลอดภัยในการป้องกันการโจรกรรมระหว่างจอดพักต่ำกว่าแบบตู้ทึบ</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 3. Box Truck Guide Section */}
                <section className="space-y-6">
                  <h2 id="box-truck" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    รถกระบะตู้ทึบ (Box Truck / Closed Cabinet)
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    เป็นรถกระบะมาตรฐานที่ต่อตู้อลูมิเนียมทึบด้านหลัง มิดชิดและมีความสูงเฉลี่ย 2.1 เมตรจากพื้นกระบะ
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-5 h-5" /> ข้อดีของรถกระบะตู้ทึบ
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                        <li>กันแดด กันน้ำฝน กันฝุ่นละอองได้ 100% ปกป้องที่นอน เครื่องซักผ้า โซฟา ได้สมบูรณ์แบบ</li>
                        <li>ตัวตู้ปิดมิดชิด มีระบบกุญแจและซีลปิด ปลอดภัยจากการสูญหายและโจรกรรมระหว่างทาง</li>
                        <li>จัดเรียงกล่องพัสดุซ้อนกันขึ้นไปได้ง่ายและเป็นระเบียบเรียบร้อย</li>
                      </ul>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl">
                      <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                        <XCircle className="w-5 h-5" /> ข้อเสียของรถกระบะตู้ทึบ
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                        <li>จำกัดความสูงของสิ่งของ ไม่สามารถขนย้ายของที่มีความสูงเกิน 2.1 เมตรในแนวตั้งได้</li>
                        <li>อุณหภูมิภายในตู้อาจจะร้อนอบอ้าวหากจอดตากแดดเป็นเวลานาน</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 4. Comparison Table Section */}
                <section className="space-y-6">
                  <h2 id="comparison-table" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    ตารางเปรียบเทียบคุณสมบัติหลัก
                  </h2>
                  
                  <div className="overflow-x-auto bg-white/[0.01] border border-white/5 rounded-3xl p-1 backdrop-blur-xl">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 font-bold bg-white/5">
                          <th className="p-4">คุณสมบัติการขนย้าย</th>
                          <th className="p-4">รถกระบะคอก (+ผ้าใบ)</th>
                          <th className="p-4">รถกระบะตู้ทึบ (WMS)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-semibold text-slate-200">
                        <tr>
                          <td className="p-4 text-white">การกันแดดและฝุ่นละออง</td>
                          <td className="p-4 text-rose-400">ปานกลาง (อาจมีลมพัดฝุ่นเข้าตามรอยพับ)</td>
                          <td className="p-4 text-emerald-400">ดีเยี่ยม (มิดชิด 100%)</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">การกันพายุและฝนตกหนัก</td>
                          <td className="p-4 text-rose-400">ต่ำ-ปานกลาง (เสี่ยงน้ำไหลซึมจากด้านล่างผ้าใบ)</td>
                          <td className="p-4 text-emerald-400">ดีเยี่ยม (กันฝน 100%)</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">ความปลอดภัยจากการโจรกรรม</td>
                          <td className="p-4 text-rose-400">ต่ำ (ใช้มีดกรีดผ้าใบเข้าถึงของได้ง่าย)</td>
                          <td className="p-4 text-emerald-400">สูงมาก (ประตูปิดแข็งแรง ใส่แม่กุญแจล็อกได้)</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">การบรรทุกของสูงเกินมาตรฐาน</td>
                          <td className="p-4 text-emerald-400">ทำได้ยืดหยุ่น (เปิดท้ายหรือคอกสูงได้)</td>
                          <td className="p-4 text-rose-400">ไม่ได้ (จำกัดความสูงที่ 2.1 เมตร)</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">ความสะดวกในการย้ายบ้านทั่วไป</td>
                          <td className="p-4">เหมาะกับสิ่งของสวน เครื่องจักรก่อสร้าง</td>
                          <td className="p-4 text-blue-400">เหมาะที่สุดสำหรับย้ายบ้าน คอนโด หอพัก รถมอเตอร์ไซค์</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* 5. Summary Verdict Section */}
                <section className="space-y-6">
                  <h2 id="verdict" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    บทสรุป: ควรเลือกคันไหนย้ายบ้าน?
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    สำหรับ <strong>การขนย้ายบ้าน คอนโด หรือหอพักทั่วไป</strong> ที่มีเฟอร์นิเจอร์ เตียงนอน เสื้อผ้า 
                    และเครื่องใช้ไฟฟ้า WMS Transport ขอแนะนำอย่างยิ่งให้เลือกใช้ <strong>รถกระบะตู้ทึบ</strong> 
                    เนื่องจากความปลอดภัยและความสะอาดสูงสุด ปกป้องสิ่งของเสียหายจากน้ำฝนและแดดประเทศไทยได้อย่างดีที่สุด 
                    โดยบริการของเรายัง <strong>พร้อมคนช่วยยก</strong> เพื่อประคองสิ่งของขึ้นจัดเรียงเป็นระเบียบ 
                    ป้องกันความกระทบกระเทือนตลอดการเดินทาง
                  </p>
                </section>

                {/* Inline CTA block */}
                <div className="bg-gradient-to-r from-blue-600/[0.15] to-cyan-500/[0.05] border border-blue-500/30 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">สนใจจองคิวรถกระบะตู้ทึบรับจ้างขนของ</h3>
                    <p className="text-slate-300 text-sm">บริการจริงใจ ประเมินราคาโปร่งใส ตลอด 24 ชั่วโมง</p>
                  </div>
                  <a
                    href="tel:0612402436"
                    className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20 active:scale-95 shrink-0"
                  >
                    <span>ติดต่อประเมินราคาฟรี</span>
                  </a>
                </div>

              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-4 lg:sticky lg:top-36">
                <TableOfContents />
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
