import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, CheckCircle, ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import RelatedServices from "@/components/RelatedServices";
import InContentCTA from "@/components/InContentCTA";

export const metadata: Metadata = {
  title: "ขนส่งมอเตอร์ไซค์ ภูเก็ต ทั่วไทย ปลอดภัย 100% | WMS TRANSPORT",
  description: "บริการส่งรถมอเตอร์ไซค์ บิ๊กไบค์ จากกรุงเทพฯ และทั่วประเทศ ส่งตรงถึงภูเก็ต ด้วยรถกระบะตู้ทึบมาตรฐานความปลอดภัยสูง บริการพร้อมคนช่วยยกของ ประเมินราคาฟรี 24 ชม.",
};

export default function PhuketMotorcyclePage() {
  const faqs = [
    {
      q: "การขนส่งมอเตอร์ไซค์ไปภูเก็ตใช้เวลากี่วัน?",
      a: "โดยปกติการขนย้ายจากกรุงเทพฯ หรือภาคกลาง ส่งตรงถึงภูเก็ต จะใช้เวลาเดินทางประมาณ 24-48 ชั่วโมง ทีมงานขนส่งของเราเดินทางทุกวัน ปลอดภัยและรวดเร็วแน่นอนครับ"
    },
    {
      q: "มีบริการคนช่วยยกของและยกมอเตอร์ไซค์หรือไม่?",
      a: "มีแน่นอนครับ! บริการของเรามาพร้อมคนช่วยยกของที่มีความชำนาญในการยกและประคองรถมอเตอร์ไซค์/บิ๊กไบค์ขึ้นรถกระบะตู้ทึบเพื่อรัดตรึงอย่างหนาแน่น ป้องกันความเสียหาย 100%"
    },
    {
      q: "มีประกันสินค้าเสียหายระหว่างทางหรือไม่?",
      a: "อุ่นใจได้เลยครับ WMS Transport มีวงเงินประกันภัยอุบัติเหตุระหว่างการขนส่งสูงสุดถึง 100,000 บาท คุ้มครองตัวรถมอเตอร์ไซค์ของท่านตลอดการเดินทางจนถึงหน้าบ้าน"
    }
  ];

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
                { name: "บริการของเรา", item: "/#services" },
                { name: "ขนส่งมอเตอร์ไซค์ ภูเก็ต", item: "/service/phuket/motorcycle" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              Phuket Specialized Route
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              บริการขนส่งมอเตอร์ไซค์ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                ส่งตรงถึงภูเก็ต และทั่วประเทศ
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 toc-content space-y-12">
                
                {/* 1. Overview Section */}
                <section className="space-y-6">
                  <h2 id="overview" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    ภาพรวมบริการขนส่งมอเตอร์ไซค์ไปภูเก็ต
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    WMS Transport ให้บริการ <strong>ขนส่งมอเตอร์ไซค์ ภูเก็ต</strong> และบิ๊กไบค์ข้ามจังหวัดแบบครบวงจร 
                    ไม่ว่าจะเป็นรถขนาดเล็ก บิ๊กไบค์ราคาแพง หรือรถมอเตอร์ไซค์ไฟฟ้า 
                    เราใช้ <strong>รถกระบะตู้ทึบ</strong> ในการเดินทางเพื่อป้องกันลม แดด ฝุ่น และฝน 100% ตลอดเส้นทาง 
                    และทุกเที่ยวการเดินทางจะมีทีมงาน <strong>พร้อมคนช่วยยก</strong> และดูแลจัดยึดอย่างแน่นหนาด้วยสายรัดชนิดพิเศษ 
                    ไม่มีล้ม ไม่มีรอยขีดข่วน ส่งตรงถึงหน้าบ้านท่านที่ภูเก็ตอย่างปลอดภัย
                  </p>
                  
                  {/* Highlight card */}
                  <div className="bg-gradient-to-r from-blue-600/10 to-cyan-500/5 border border-blue-500/20 rounded-3xl p-6">
                    <p className="text-sm font-semibold text-slate-200">
                      💡 <strong>เส้นทางวิ่งประจำกรุงเทพฯ - ภูเก็ต</strong>: เรามีรอบรถวิ่งขึ้น-ลงเป็นประจำทุกสัปดาห์ 
                      บริการรวดเร็ว ปลอดภัย และราคาประหยัดที่สุดในการขนส่งรถสองล้อคู่ใจของคุณ
                    </p>
                  </div>
                </section>

                {/* 2. Why Choose Us Section */}
                <section className="space-y-6">
                  <h2 id="why-choose-us" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    ทำไมต้องส่งมอเตอร์ไซค์กับเรา
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="safe-vehicle" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        ขนส่งด้วยรถกระบะตู้ทึบ
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        หมดห่วงเรื่องหินดีด ฝุ่นเกาะ หรือพายุฝน เพราะตู้ทึบของเราปิดมิดชิด ปกป้องรถสุดรักจากสภาพแวดล้อมภายนอกได้สูงสุด
                      </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="helper-staff" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        พร้อมคนช่วยยกของ
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        ไม่ว่าจะเป็นทางลาดชัน ยกรถขึ้นหรือลง ทีมงานขนของมีความเป็นมืออาชีพ มีความชำนาญในการจับประคองรถจักรยานยนต์คันใหญ่
                      </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="professional-strapping" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        การรัดตรึงที่ได้มาตรฐาน
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        เราใช้สายรัดรถประเภท Polyester Webbing รัดกับตัวยึดภายในรถกระบะตู้ทึบ มั่นใจได้ว่าไม่มีการกดทับแฮนด์หรือเฟรมจนเสียหาย
                      </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="transit-insurance" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        มีประกันสินค้าเสียหาย
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        รับประกันอุบัติเหตุและคุ้มครองความปลอดภัยสูงสุดตลอดทริปเดินทางส่งตรงถึงภูเก็ต วงเงินสูงสุด 100,000 บาทต่อเที่ยว
                      </p>
                    </div>
                  </div>
                </section>

                <InContentCTA
                  heading="ส่งมอเตอร์ไซค์หรือบิ๊กไบค์ไปภูเก็ต? ประเมินราคาฟรีทันที!"
                  subtext="แค่ส่งรูปรุ่นรถและระบุจุดรับ-ส่ง ทีมงาน WMS Transport จะเสนอราคาที่ดีที่สุดให้ภายใน 5 นาที"
                />

                {/* 3. Pricing Section */}
                <section className="space-y-6">
                  <h2 id="pricing-details" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    อัตราค่าบริการขนส่งมอเตอร์ไซค์
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    เราประเมินราคาตามระยะทางจริงและขนาดความจุเครื่องยนต์ของมอเตอร์ไซค์ เพื่อให้ราคาประหยัดที่สุด:
                  </p>
                  
                  <div className="overflow-x-auto bg-white/[0.01] border border-white/5 rounded-3xl p-1 backdrop-blur-xl">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 font-bold bg-white/5">
                          <th className="p-4">ประเภทรถจักรยานยนต์</th>
                          <th className="p-4">รายละเอียด</th>
                          <th className="p-4 text-right">ราคาเริ่มต้น</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-semibold text-slate-200">
                        <tr>
                          <td className="p-4 text-white">มอเตอร์ไซค์ทั่วไป (100cc - 125cc)</td>
                          <td className="p-4">Wave, Scoopy I, Fino, Click, GPX ฯลฯ</td>
                          <td className="p-4 text-right text-blue-400">เริ่มต้น 2,500 บาท</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">มอเตอร์ไซค์ขนาดกลาง (150cc - 300cc)</td>
                          <td className="p-4">PCX, NMAX, XMAX, Forza, Vespa, CBR ฯลฯ</td>
                          <td className="p-4 text-right text-blue-400">เริ่มต้น 3,500 บาท</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">บิ๊กไบค์ / Big Bike (400cc ขึ้นไป)</td>
                          <td className="p-4">Ducati, BMW GS, Kawasaki Ninja, Harley-Davidson ฯลฯ</td>
                          <td className="p-4 text-right text-blue-400">เริ่มต้น 4,500 บาท</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-400">
                    * ราคาข้างต้นเป็นราคาเริ่มต้นจากกรุงเทพฯ/ปริมณฑลไปยังภูเก็ต สำหรับพื้นที่อื่นโปรดส่งจุดปักหมุดเพื่อคำนวณราคาพิเศษฟรี
                  </p>
                </section>

                {/* 4. Steps Section */}
                <section className="space-y-6">
                  <h2 id="service-steps" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    ขั้นตอนง่ายๆ ในการใช้บริการ
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold shrink-0 text-sm mt-1">1</span>
                      <div>
                        <h4 className="font-bold text-white">สอบถามข้อมูลและประเมินราคา</h4>
                        <p className="text-xs text-slate-400">ส่งรูปภาพรุ่นมอเตอร์ไซค์ พร้อมระบุจุดรับและจุดส่งในภูเก็ตให้แอดมินทาง LINE</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold shrink-0 text-sm mt-1">2</span>
                      <div>
                        <h4 className="font-bold text-white">จองวันเดินทาง</h4>
                        <p className="text-xs text-slate-400">ระบุวันที่สะดวกให้เข้าไปรับรถ ทีมงานจะล็อกคิวรถกระบะตู้ทึบให้ทันที</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold shrink-0 text-sm mt-1">3</span>
                      <div>
                        <h4 className="font-bold text-white">ทีมงานเข้ายกรถและตรวจเช็กสภาพ</h4>
                        <p className="text-xs text-slate-400">ถ่ายภาพบันทึกรอยดั้งเดิมร่วมกับเจ้าของรถก่อนส่งขึ้นรถขนส่ง</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold shrink-0 text-sm mt-1">4</span>
                      <div>
                        <h4 className="font-bold text-white">เดินทางและนำส่งปลายทางภูเก็ต</h4>
                        <p className="text-xs text-slate-400">จัดส่งตรงถึงภูเก็ตอย่างปลอดภัย และแจ้งสเตตัสให้กับท่านตลอดเส้นทาง</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 5. FAQs Section */}
                <section className="space-y-6">
                  <h2 id="faq-section" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    คำถามที่พบบ่อย (FAQ)
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details
                        key={index}
                        className="group bg-white/[0.02] border border-white/5 open:border-blue-500/30 open:bg-gradient-to-br open:from-blue-950/20 open:via-[#040b15]/50 open:to-[#040b15] open:shadow-[0_20px_50px_rgba(59,130,246,0.1)] rounded-3xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all duration-300 hover:border-white/10 relative overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-300 opacity-0 group-open:opacity-100 transition-opacity duration-300" />
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
                <div className="bg-gradient-to-r from-blue-600/[0.15] to-cyan-500/[0.05] border border-blue-500/30 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">สอบถามราคาขนส่งรถมอเตอร์ไซค์ไปภูเก็ต</h3>
                    <p className="text-slate-300 text-sm">บริการประเมินราคาฟรี ยินดีให้คำแนะนำตลอด 24 ชั่วโมง</p>
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
                <RelatedServices province="phuket" currentServiceSlug="motorcycle" />

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
