import { Metadata } from "next";
import { Phone, CheckCircle, ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import RelatedServices from "@/components/RelatedServices";
import InContentCTA from "@/components/InContentCTA";

export const metadata: Metadata = {
  title: "รถรับจ้างขนส่งสินค้า ภูเก็ต ทั่วไทย เริ่มต้นราคากันเอง | WMS TRANSPORT",
  description: "บริการรถรับจ้างขนส่งสินค้าทั่วไป สินค้าโรงงาน วัสดุก่อสร้าง ไปกลับภูเก็ต-กรุงเทพฯ ทั่วประเทศ ด้วยรถกระบะตู้ทึบ มีคนช่วยยกยกของอย่างปลอดภัย มีประกันภัยอุบัติเหตุ 24 ชม.",
  alternates: {
    canonical: "/service/phuket/freight",
  },
};

export default function PhuketFreightPage() {
  const faqs = [
    {
      q: "รถรับจ้างขนส่งสินค้าไปภูเก็ตคิดราคาอย่างไร?",
      a: "เราประเมินราคาตามระยะทางจริง น้ำหนัก และประเภทของรถกระบะตู้ทึบ โดยเริ่มคำนวณราคาแบบเป็นกันเอง ไม่มีค่าใช้จ่ายบวกเพิ่มนอกเหนือจากที่ตกลงกัน 100%"
    },
    {
      q: "มีบริการพร้อมคนช่วยยกของที่ภูเก็ตหรือไม่?",
      a: "มีแน่นอนครับ! เรามีคนช่วยยกของมืออาชีพคอยให้บริการโหลดของและกระจายของ เพื่อเบาแรงลูกค้าในการยกสัมภาระหนักหรือสินค้าจำนวนมาก"
    },
    {
      q: "สามารถส่งสินค้าประเภทไหนได้บ้าง?",
      a: "เราสามารถรับส่งสินค้าอุปโภคบริโภค เครื่องจักรเบา เฟอร์นิเจอร์ อุปกรณ์จัดงานอีเวนต์ พัสดุกล่อง และวัสดุก่อสร้างที่ไม่ขัดต่อกฎหมาย โดยขนส่งด้วยรถกระบะตู้ทึบป้องกันฝุ่นและน้ำฝนได้สมบูรณ์แบบ"
    }
  ];

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
                { name: "บริการของเรา", item: "/#services" },
                { name: "รถรับจ้างขนส่งสินค้า ภูเก็ต", item: "/service/phuket/freight" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              Phuket Freight specialized
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              รถรับจ้างขนส่งสินค้า <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                ขนส่งด่วน ส่งตรงถึงภูเก็ต
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 toc-content space-y-12">
                
                {/* 1. Overview Section */}
                <section className="space-y-6">
                  <h2 id="overview" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    ภาพรวมบริการรถรับจ้างขนส่งสินค้า ภูเก็ต
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    หากคุณต้องการขนส่งพัสดุ สินค้าการค้า หรือวัสดุก่อสร้างไปยังภูเก็ต หรือกระจายสินค้าในพื้นที่ภูเก็ต WMS Transport มีบริการ 
                    <strong>รถรับจ้างขนส่งสินค้า ภูเก็ต</strong> ที่รวดเร็ว ปลอดภัย และราคาโปร่งใส ด้วยรถกระบะตู้ทึบหลังคาสูง 
                    ที่รองรับปริมาณของได้จุใจ ปกป้องสินค้าไม่ให้เปียกน้ำหรือโดนแดดทำลาย 100% พร้อมบริการ <strong>พร้อมคนช่วยยก</strong> 
                    ช่วยประหยัดเวลาและแรงงาน ดำเนินการย้ายของขึ้นลงอย่างระมัดระวังตลอดระยะทาง <strong>ส่งตรงถึงภูเก็ต</strong> ทันทีตามกำหนดเวลา
                  </p>
                  
                  {/* Highlight card */}
                  <div className="bg-linear-to-r from-blue-600/10 to-cyan-500/5 border border-blue-500/20 rounded-3xl p-6">
                    <p className="text-sm font-semibold text-slate-200">
                      🚚 <strong>บริการเหมาเที่ยวราคาสุดพิเศษ</strong>: เราให้บริการวิ่งงานด่วนข้ามจังหวัดจากกรุงเทพฯ 
                      และจังหวัดอื่นๆ ปลายทางสู่ภูเก็ตแบบเช่าเหมาคัน ให้สิทธิ์พื้นที่ของรถแก่สินค้าคุณรายเดียว ปลอดภัยสูงสุด
                    </p>
                  </div>
                </section>

                {/* 2. Key Advantages Section */}
                <section className="space-y-6">
                  <h2 id="advantages" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    จุดเด่นบริการขนส่งสินค้า WMS
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/1 border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="truck-spec" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        รถกระบะตู้ทึบหลังคาสูง
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        ขนาดความกว้างและสูงที่ได้มาตรฐาน กว้าง 1.8-2.1 เมตร ป้องกันความชื้น ลม แดด ฝุ่น ฝน 100% ตลอดส้นทางสู่ภูเก็ต
                      </p>
                    </div>

                    <div className="bg-white/1 border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="lifts-crew" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        พร้อมคนช่วยยกของมืออาชีพ
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        ทีมงานทุกคนมีประสบการณ์ยกสินค้า จัดเรียงอย่างประหยัดพื้นที่ และใช้ฟิล์มยืดซีลกันกระแทกอย่างหนาแน่น
                      </p>
                    </div>

                    <div className="bg-white/1 border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="transparent-quotes" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        ประเมินราคาไม่มีบวกเพิ่ม
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        ราคาค่าขนส่งเสนอตามที่ตกลงทางข้อความ จบงานไว ไม่มีค่าน้ำมันหรือค่าทางด่วนบวกเพิ่มทีหลัง 100%
                      </p>
                    </div>

                    <div className="bg-white/1 border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="accident-cover" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        คุ้มครองความปลอดภัยเต็มวงเงิน
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        อุ่นใจกับประกันสินค้าเสียหายที่คุ้มครองทุกเที่ยวเดินทาง สูงสุด 100,000 บาท ตามเงื่อนไขของบริษัท
                      </p>
                    </div>
                  </div>
                </section>

                <InContentCTA
                  heading="ต้องการส่งสินค้าเหมาคันไปภูเก็ต? เช็กราคาได้เลยฟรี!"
                  subtext="บอกต้นทาง ปลายทาง และปริมาณสินค้า ทีมงานจะเสนอราคาเหมาคันที่ดีที่สุดให้คุณทันที"
                />

                {/* 3. Pricing Matrix Section */}
                <section className="space-y-6">
                  <h2 id="pricing-matrix" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    ตารางราคาประเมินค่าขนส่งสินค้าไปภูเก็ต
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    อัตราค่ารถกระบะตู้ทึบเหมาคัน จากจุดหลักต่างๆ ปลายทางจังหวัดภูเก็ต:
                  </p>
                  
                  <div className="overflow-x-auto bg-white/1 border border-white/5 rounded-3xl p-1 backdrop-blur-xl">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 font-bold bg-white/5">
                          <th className="p-4">ต้นทาง</th>
                          <th className="p-4">ปลายทาง</th>
                          <th className="p-4">ประเภทรถ</th>
                          <th className="p-4 text-right">ราคาเริ่มต้น</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-semibold text-slate-200">
                        <tr>
                          <td className="p-4 text-white">กรุงเทพฯ / ปริมณฑล</td>
                          <td className="p-4 text-white">ภูเก็ต (ทั่วทุกอำเภอ)</td>
                          <td className="p-4">กระบะตู้ทึบ (หลังคาสูง 2.1 ม.)</td>
                          <td className="p-4 text-right text-blue-400">เริ่มต้น 6,500 บาท</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">ชลบุรี / ระยอง</td>
                          <td className="p-4 text-white">ภูเก็ต (ทั่วทุกอำเภอ)</td>
                          <td className="p-4">กระบะตู้ทึบ (หลังคาสูง 2.1 ม.)</td>
                          <td className="p-4 text-right text-blue-400">เริ่มต้น 7,500 บาท</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">สมุทรสาคร / สมุทรสงคราม</td>
                          <td className="p-4 text-white">ภูเก็ต (ทั่วทุกอำเภอ)</td>
                          <td className="p-4">กระบะตู้ทึบ (หลังคาสูง 2.1 ม.)</td>
                          <td className="p-4 text-right text-blue-400">เริ่มต้น 6,000 บาท</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-400">
                    * ราคาดังกล่าวไม่รวมค่าพนักงานช่วยยกของกรณีน้ำหนักเกินเกณฑ์มาตรฐาน หรือขนส่งข้ามเกาะ สำหรับราคารถเปล่าโปรดทักสอบถามแอดมิน 24 ชม.
                  </p>
                </section>

                {/* 4. FAQs Section */}
                <section className="space-y-6">
                  <h2 id="faq-section" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    คำถามที่พบบ่อย (FAQ)
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details
                        key={index}
                        className="group bg-white/2 border border-white/5 open:border-blue-500/30 open:bg-linear-to-br open:from-blue-950/20 open:via-[#040b15]/50 open:to-[#040b15] open:shadow-[0_20px_50px_rgba(59,130,246,0.1)] rounded-3xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all duration-300 hover:border-white/10 relative overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-blue-400 to-cyan-300 opacity-0 group-open:opacity-100 transition-opacity duration-300" />
                        <summary className="flex justify-between items-center font-extrabold text-white text-lg list-none select-none">
                          <span className="group-open:text-blue-400 transition-colors duration-300 pr-4">
                            {faq.q}
                          </span>
                          <span className="ml-1.5 shrink-0 p-2 bg-white/5 group-open:bg-blue-500/10 text-slate-400 group-open:text-blue-400 rounded-xl border border-white/10 group-open:border-blue-500/20 group-open:rotate-180 transition-all duration-300">
                            <ChevronDown className="w-5 h-5" />
                          </span>
                        </summary>
                        <div className="mt-5 text-slate-300 leading-relaxed font-medium pl-4 border-l border-white/10 group-open:border-blue-500/30 transition-colors duration-300">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>

                {/* Inline CTA block */}
                <div className="bg-linear-to-r from-blue-600/15 to-cyan-500/5 border border-blue-500/30 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">สอบถามราคาขนส่งด่วนเหมาคันไปภูเก็ต</h3>
                    <p className="text-slate-300 text-sm">บริการรถรับจ้างขนของครอบคลุมทั่วประเทศ ปลอดภัย รวดเร็ว</p>
                  </div>
                  <a
                    href="tel:0612402436"
                    className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20 active:scale-95 shrink-0"
                  >
                    <Phone className="w-5 h-5 animate-pulse" />
                    <span>โทร 061-240-2436</span>
                  </a>
                </div>

                {/* Related links cluster */}
                <RelatedServices province="phuket" currentServiceSlug="freight" />

              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-4 lg:sticky lg:top-36">
                <TableOfContents />
              </div>

            </div>

          </div>

        </div>
      </main>

      </div>
  );
}
