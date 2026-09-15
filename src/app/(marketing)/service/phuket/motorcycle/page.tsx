import { Metadata } from "next";
import { Phone, CheckCircle, ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import RelatedServices from "@/components/RelatedServices";
import InContentCTA from "@/components/InContentCTA";

export const metadata: Metadata = {
  title: "ขนส่งมอเตอร์ไซค์ ภูเก็ต ทั่วไทย ตู้ทึบปลอดภัย | WMS TRANSPORT",
  description: "บริการส่งรถมอเตอร์ไซค์ บิ๊กไบค์ จากกรุงเทพฯ และทั่วประเทศ ส่งตรงถึงภูเก็ต ด้วยรถกระบะตู้ทึบมาตรฐานความปลอดภัยสูง บริการพร้อมคนช่วยยกของ ประเมินราคาฟรี 24 ชม.",
  alternates: {
    canonical: "/service/phuket/motorcycle",
  },
};

export default function PhuketMotorcyclePage() {
  const faqs = [
    {
      q: "การขนส่งมอเตอร์ไซค์ไปภูเก็ตใช้เวลากี่วัน?",
      a: "โดยปกติการขนย้ายจากกรุงเทพฯ หรือภาคกลาง ส่งตรงถึงภูเก็ต จะใช้เวลาเดินทางประมาณ 24-48 ชั่วโมง ทีมงานขนส่งของเราเดินทางทุกวัน ปลอดภัยและรวดเร็วแน่นอนครับ"
    },
    {
      q: "มีบริการคนช่วยยกของและยกมอเตอร์ไซค์หรือไม่?",
      a: "มีแน่นอนครับ! บริการของเรามาพร้อมคนช่วยยกของที่มีความชำนาญในการยกและประคองรถมอเตอร์ไซค์/บิ๊กไบค์ขึ้นรถกระบะตู้ทึบเพื่อรัดตรึงอย่างหนาแน่น ป้องกันความเสียหายอย่างรัดกุม"
    },
    {
      q: "ดูแลความปลอดภัยสิ่งของระหว่างทางหรือไม่?",
      a: "อุ่นใจได้เลยครับ WMS Transport มีมาตรการดูแลความปลอดภัยและรัดยึดตัวรถมอเตอร์ไซค์อย่างแน่นหนาตลอดการเดินทางจนถึงหน้าบ้าน"
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
                { name: "ขนส่งมอเตอร์ไซค์ ภูเก็ต", item: "/service/phuket/motorcycle" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-700 tracking-wider uppercase font-bold text-xs bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-4 inline-block">
              Phuket Specialized Route
            </span>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
              บริการขนส่งมอเตอร์ไซค์ <br />
              <span className="text-blue-600">
                ส่งตรงถึงภูเก็ต และทั่วประเทศ
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-8 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 toc-content space-y-10">
                
                {/* 1. Overview Section */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-6">
                  <h2 id="overview" className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    ภาพรวมบริการขนส่งมอเตอร์ไซค์ไปภูเก็ต
                  </h2>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    WMS Transport ให้บริการ <strong className="text-slate-900">ขนส่งมอเตอร์ไซค์ ภูเก็ต</strong> และบิ๊กไบค์ข้ามจังหวัดแบบครบวงจร 
                    ไม่ว่าจะเป็นรถขนาดเล็ก บิ๊กไบค์ราคาแพง หรือรถมอเตอร์ไซค์ไฟฟ้า 
                    เราใช้ <strong className="text-slate-900">รถกระบะตู้ทึบ</strong> ในการเดินทางเพื่อป้องกันลม แดด ฝุ่น และฝนอย่างมิดชิดตลอดเส้นทาง 
                    และทุกเที่ยวการเดินทางจะมีทีมงาน <strong className="text-slate-900">พร้อมคนช่วยยก</strong> และดูแลจัดยึดอย่างแน่นหนาด้วยสายรัดชนิดพิเศษ 
                    ไม่มีล้ม ไม่มีรอยขีดข่วน ส่งตรงถึงหน้าบ้านท่านที่ภูเก็ตอย่างปลอดภัย
                  </p>
                  
                  {/* Highlight card */}
                  <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-5">
                    <p className="text-sm font-semibold text-slate-700">
                      💡 <strong>เส้นทางวิ่งประจำกรุงเทพฯ - ภูเก็ต</strong>: เรามีรอบรถวิ่งขึ้น-ลงเป็นประจำทุกสัปดาห์ 
                      บริการรวดเร็ว ปลอดภัย และราคาประหยัดที่สุดในการขนส่งรถสองล้อคู่ใจของคุณ
                    </p>
                  </div>
                </section>

                {/* 2. Why Choose Us Section */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-6">
                  <h2 id="why-choose-us" className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    ทำไมต้องส่งมอเตอร์ไซค์กับเรา
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-xl">
                      <h3 id="safe-vehicle" className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                        ขนส่งด้วยรถกระบะตู้ทึบ
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        หมดห่วงเรื่องหินดีด ฝุ่นเกาะ หรือพายุฝน เพราะตู้ทึบของเราปิดมิดชิด ปกป้องรถสุดรักจากสภาพแวดล้อมภายนอกได้สูงสุด
                      </p>
                    </div>

                    <div className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-xl">
                      <h3 id="helper-staff" className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                        พร้อมคนช่วยยกของ
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        ไม่ว่าจะเป็นทางลาดชัน ยกรถขึ้นหรือลง ทีมงานขนของมีความเป็นมืออาชีพ มีความชำนาญในการจับประคองรถจักรยานยนต์คันใหญ่
                      </p>
                    </div>

                    <div className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-xl">
                      <h3 id="professional-strapping" className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                        การรัดตรึงที่ได้มาตรฐาน
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        เราใช้สายรัดรถประเภท Polyester Webbing รัดกับตัวยึดภายในรถกระบะตู้ทึบ มั่นใจได้ว่าไม่มีการกดทับแฮนด์หรือเฟรมจนเสียหาย
                      </p>
                    </div>

                    <div className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-xl">
                      <h3 id="transit-insurance" className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                        ดูแลความปลอดภัยสิ่งของ
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        ดูแลความปลอดภัยสูงสุดตลอดทริปเดินทางส่งตรงถึงภูเก็ตด้วยอุปกรณ์ล็อกมาตรฐานต่อเที่ยว
                      </p>
                    </div>
                  </div>
                </section>

                <InContentCTA
                  heading="ส่งมอเตอร์ไซค์หรือบิ๊กไบค์ไปภูเก็ต? ประเมินราคาฟรีทันที!"
                  subtext="แค่ส่งรูปรุ่นรถและระบุจุดรับ-ส่ง ทีมงาน WMS Transport จะเสนอราคาที่ดีที่สุดให้ภายใน 5 นาที"
                />

                {/* 3. Pricing Section */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-6">
                  <h2 id="pricing-details" className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    อัตราค่าบริการขนส่งมอเตอร์ไซค์
                  </h2>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm sm:text-base">
                    เราประเมินราคาตามระยะทางจริงและขนาดความจุเครื่องยนต์ของมอเตอร์ไซค์ เพื่อให้ราคาประหยัดที่สุด:
                  </p>
                  
                  <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-600 font-bold bg-slate-50/80">
                          <th className="p-3.5">ประเภทรถจักรยานยนต์</th>
                          <th className="p-3.5">รายละเอียด</th>
                          <th className="p-3.5 text-right">ราคาเริ่มต้น</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        <tr className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3.5 text-slate-900 font-bold">มอเตอร์ไซค์ทั่วไป (100cc - 125cc)</td>
                          <td className="p-3.5 text-slate-600">Wave, Scoopy I, Fino, Click, GPX ฯลฯ</td>
                          <td className="p-3.5 text-right text-blue-600 font-bold">เริ่มต้น 2,500 บาท</td>
                        </tr>
                        <tr className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3.5 text-slate-900 font-bold">มอเตอร์ไซค์ขนาดกลาง (150cc - 300cc)</td>
                          <td className="p-3.5 text-slate-600">PCX, NMAX, XMAX, Forza, Vespa, CBR ฯลฯ</td>
                          <td className="p-3.5 text-right text-blue-600 font-bold">เริ่มต้น 3,500 บาท</td>
                        </tr>
                        <tr className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3.5 text-slate-900 font-bold">บิ๊กไบค์ / Big Bike (400cc ขึ้นไป)</td>
                          <td className="p-3.5 text-slate-600">Ducati, BMW GS, Kawasaki Ninja, Harley-Davidson ฯลฯ</td>
                          <td className="p-3.5 text-right text-blue-600 font-bold">เริ่มต้น 4,500 บาท</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-500">
                    * ราคาข้างต้นเป็นราคาเริ่มต้นจากกรุงเทพฯ/ปริมณฑลไปยังภูเก็ต สำหรับพื้นที่อื่นโปรดส่งจุดปักหมุดเพื่อคำนวณราคาพิเศษฟรี
                  </p>
                </section>

                {/* 4. Steps Section */}
                <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 space-y-6">
                  <h2 id="service-steps" className="text-xl md:text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
                    ขั้นตอนง่ายๆ ในการใช้บริการ
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold shrink-0 text-sm mt-0.5">1</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">สอบถามข้อมูลและประเมินราคา</h4>
                        <p className="text-xs sm:text-sm text-slate-600">ส่งรูปภาพรุ่นมอเตอร์ไซค์ พร้อมระบุจุดรับและจุดส่งในภูเก็ตให้แอดมินทาง LINE</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold shrink-0 text-sm mt-0.5">2</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">จองวันเดินทาง</h4>
                        <p className="text-xs sm:text-sm text-slate-600">ระบุวันที่สะดวกให้เข้าไปรับรถ ทีมงานจะล็อกคิวรถกระบะตู้ทึบให้ทันที</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold shrink-0 text-sm mt-0.5">3</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">ทีมงานเข้ายกรถและตรวจเช็กสภาพ</h4>
                        <p className="text-xs sm:text-sm text-slate-600">ถ่ายภาพบันทึกรอยดั้งเดิมร่วมกับเจ้าของรถก่อนส่งขึ้นรถขนส่ง</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold shrink-0 text-sm mt-0.5">4</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">เดินทางและนำส่งปลายทางภูเก็ต</h4>
                        <p className="text-xs sm:text-sm text-slate-600">จัดส่งตรงถึงภูเก็ตอย่างปลอดภัย และแจ้งสเตตัสให้กับท่านตลอดเส้นทาง</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 5. FAQs Section */}
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
                    <h3 className="text-xl font-bold text-white mb-2">สอบถามราคาขนส่งรถมอเตอร์ไซค์ไปภูเก็ต</h3>
                    <p className="text-blue-100/80 text-sm">บริการประเมินราคาฟรี ยินดีให้คำแนะนำตลอด 24 ชั่วโมง</p>
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
                <RelatedServices province="phuket" currentServiceSlug="motorcycle" />

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

