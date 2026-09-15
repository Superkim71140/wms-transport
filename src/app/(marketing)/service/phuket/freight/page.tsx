import { Metadata } from "next";
import { Phone, CheckCircle, ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import RelatedServices from "@/components/RelatedServices";
import InContentCTA from "@/components/InContentCTA";

export const metadata: Metadata = {
  title: "รถรับจ้างขนส่งสินค้า ภูเก็ต ทั่วไทย เริ่มต้นราคากันเอง | WMS TRANSPORT",
  description: "บริการรถรับจ้างขนส่งสินค้าทั่วไป สินค้าโรงงาน วัสดุก่อสร้าง ไปกลับภูเก็ต-กรุงเทพฯ ทั่วประเทศ ด้วยรถกระบะตู้ทึบ มีคนช่วยยกยกของอย่างปลอดภัย ดูแลความปลอดภัย 24 ชม.",
  alternates: {
    canonical: "/service/phuket/freight",
  },
};

export default function PhuketFreightPage() {
  const faqs = [
    {
      q: "รถรับจ้างขนส่งสินค้าไปภูเก็ตคิดราคาอย่างไร?",
      a: "เราประเมินราคาตามระยะทางจริง น้ำหนัก และประเภทของรถกระบะตู้ทึบ โดยเริ่มคำนวณราคาแบบเป็นกันเอง ไม่มีค่าใช้จ่ายบวกเพิ่มนอกเหนือจากที่ตกลงกัน"
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
                { name: "บริการของเรา", item: "/#services" },
                { name: "รถรับจ้างขนส่งสินค้า ภูเก็ต", item: "/service/phuket/freight" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-700 tracking-wider uppercase font-bold text-xs bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-4 inline-block">
              Phuket Freight specialized
            </span>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
              รถรับจ้างขนส่งสินค้า <br />
              <span className="text-blue-600">
                ขนส่งด่วน ส่งตรงถึงภูเก็ต
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-8 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 toc-content space-y-10">
                
                {/* 1. Overview Section */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-6">
                  <h2 id="overview" className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    ภาพรวมบริการรถรับจ้างขนส่งสินค้า ภูเก็ต
                  </h2>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    หากคุณต้องการขนส่งพัสดุ สินค้าการค้า หรือวัสดุก่อสร้างไปยังภูเก็ต หรือกระจายสินค้าในพื้นที่ภูเก็ต WMS Transport มีบริการ 
                    <strong className="text-slate-900"> รถรับจ้างขนส่งสินค้า ภูเก็ต</strong> ที่รวดเร็ว ปลอดภัย และราคาโปร่งใส ด้วยรถกระบะตู้ทึบหลังคาสูง 
                    ที่รองรับปริมาณของได้จุใจ ปกป้องสินค้าไม่ให้เปียกน้ำหรือโดนแดดทำลายอย่างมิดชิด พร้อมบริการ <strong className="text-slate-900">พร้อมคนช่วยยก</strong> 
                    ช่วยประหยัดเวลาและแรงงาน ดำเนินการย้ายของขึ้นลงอย่างระมัดระวังตลอดระยะทาง <strong className="text-slate-900">ส่งตรงถึงภูเก็ต</strong> ทันทีตามกำหนดเวลา
                  </p>
                  
                  {/* Highlight card */}
                  <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-5">
                    <p className="text-sm font-semibold text-slate-700">
                      🚚 <strong>บริการเหมาเที่ยวราคาสุดพิเศษ</strong>: เราให้บริการวิ่งงานด่วนข้ามจังหวัดจากกรุงเทพฯ 
                      และจังหวัดอื่นๆ ปลายทางสู่ภูเก็ตแบบเช่าเหมาคัน ให้สิทธิ์พื้นที่ของรถแก่สินค้าคุณรายเดียว ปลอดภัยสูงสุด
                    </p>
                  </div>
                </section>

                {/* 2. Key Advantages Section */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-6">
                  <h2 id="advantages" className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    จุดเด่นบริการขนส่งสินค้า WMS
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-xl">
                      <h3 id="truck-spec" className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                        รถกระบะตู้ทึบหลังคาสูง
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        ขนาดความกว้างและสูงที่ได้มาตรฐาน กว้าง 1.8-2.1 เมตร ป้องกันความชื้น ลม แดด ฝุ่น ฝน ตลอดเส้นทางสู่ภูเก็ตอย่างมิดชิด
                      </p>
                    </div>

                    <div className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-xl">
                      <h3 id="lifts-crew" className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                        พร้อมคนช่วยยกของมืออาชีพ
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        ทีมงานทุกคนมีประสบการณ์ยกสินค้า จัดเรียงอย่างประหยัดพื้นที่ และใช้ฟิล์มยืดซีลกันกระแทกอย่างหนาแน่น
                      </p>
                    </div>

                    <div className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-xl">
                      <h3 id="transparent-quotes" className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                        ประเมินราคาไม่มีบวกเพิ่ม
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        ราคาค่าขนส่งเสนอตามที่ตกลงทางข้อความ จบงานไว ไม่มีค่าน้ำมันหรือค่าทางด่วนบวกเพิ่มทีหลัง
                      </p>
                    </div>

                    <div className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-xl">
                      <h3 id="accident-cover" className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                        คุ้มครองความปลอดภัยเต็มวงเงิน
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        อุ่นใจกับมาตรการดูแลความปลอดภัยของสินค้าตลอดเที่ยวการเดินทางตามเงื่อนไขที่ตกลง
                      </p>
                    </div>
                  </div>
                </section>

                <InContentCTA
                  heading="ต้องการส่งสินค้าเหมาคันไปภูเก็ต? เช็กราคาได้เลยฟรี!"
                  subtext="บอกต้นทาง ปลายทาง และปริมาณสินค้า ทีมงานจะเสนอราคาเหมาคันที่ดีที่สุดให้คุณทันที"
                />

                {/* 3. Pricing Matrix Section */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-6">
                  <h2 id="pricing-matrix" className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    ตารางราคาประเมินค่าขนส่งสินค้าไปภูเก็ต
                  </h2>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm sm:text-base">
                    อัตราค่ารถกระบะตู้ทึบเหมาคัน จากจุดหลักต่างๆ ปลายทางจังหวัดภูเก็ต:
                  </p>
                  
                  <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-600 font-bold bg-slate-50/80">
                          <th className="p-3.5">ต้นทาง</th>
                          <th className="p-3.5">ปลายทาง</th>
                          <th className="p-3.5">ประเภทรถ</th>
                          <th className="p-3.5 text-right">ราคาเริ่มต้น</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        <tr className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3.5 text-slate-900 font-bold">กรุงเทพฯ / ปริมณฑล</td>
                          <td className="p-3.5 text-slate-900">ภูเก็ต (ทั่วทุกอำเภอ)</td>
                          <td className="p-3.5 text-slate-600">กระบะตู้ทึบ (หลังคาสูง 2.1 ม.)</td>
                          <td className="p-3.5 text-right text-blue-600 font-bold">เริ่มต้น 6,500 บาท</td>
                        </tr>
                        <tr className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3.5 text-slate-900 font-bold">ชลบุรี / ระยอง</td>
                          <td className="p-3.5 text-slate-900">ภูเก็ต (ทั่วทุกอำเภอ)</td>
                          <td className="p-3.5 text-slate-600">กระบะตู้ทึบ (หลังคาสูง 2.1 ม.)</td>
                          <td className="p-3.5 text-right text-blue-600 font-bold">เริ่มต้น 7,500 บาท</td>
                        </tr>
                        <tr className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3.5 text-slate-900 font-bold">สมุทรสาคร / สมุทรสงคราม</td>
                          <td className="p-3.5 text-slate-900">ภูเก็ต (ทั่วทุกอำเภอ)</td>
                          <td className="p-3.5 text-slate-600">กระบะตู้ทึบ (หลังคาสูง 2.1 ม.)</td>
                          <td className="p-3.5 text-right text-blue-600 font-bold">เริ่มต้น 6,000 บาท</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-500">
                    * ราคาดังกล่าวไม่รวมค่าพนักงานช่วยยกของกรณีน้ำหนักเกินเกณฑ์มาตรฐาน หรือขนส่งข้ามเกาะ สำหรับราคารถเปล่าโปรดทักสอบถามแอดมิน 24 ชม.
                  </p>
                </section>

                {/* 4. FAQs Section */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-6">
                  <h2 id="faq-section" className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    คำถามที่พบบ่อย (FAQ)
                  </h2>
                  <div className="space-y-3.5">
                    {faqs.map((faq, index) => (
                      <details
                        key={index}
                        className="group bg-slate-50/60 border border-slate-200/80 open:border-blue-300 rounded-xl p-4.5 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all"
                      >
                        <summary className="flex justify-between items-center font-bold text-slate-900 text-sm sm:text-base list-none select-none">
                          <span className="group-open:text-blue-600 transition-colors pr-4">
                            {faq.q}
                          </span>
                          <span className="ml-1.5 shrink-0 p-1.5 bg-white text-slate-500 group-open:text-blue-600 rounded-lg border border-slate-200 group-open:rotate-180 transition-all">
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </summary>
                        <div className="mt-3.5 pt-3 text-slate-600 leading-relaxed font-medium text-xs sm:text-sm border-t border-slate-200/60">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>

                {/* Inline CTA block */}
                <div className="bg-[#0B1F3A] border border-blue-900/30 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-white shadow-md">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">สอบถามราคาขนส่งด่วนเหมาคันไปภูเก็ต</h3>
                    <p className="text-blue-100/80 text-sm">บริการรถรับจ้างขนของครอบคลุมทั่วประเทศ ปลอดภัย รวดเร็ว</p>
                  </div>
                  <a
                    href="tel:0612402436"
                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-xs active:scale-98 shrink-0"
                  >
                    <Phone className="w-4.5 h-4.5" />
                    <span>โทร 061-240-2436</span>
                  </a>
                </div>

                {/* Related links cluster */}
                <RelatedServices province="phuket" currentServiceSlug="freight" />

              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <TableOfContents />
              </div>

            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
