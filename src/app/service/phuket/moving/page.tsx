import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, CheckCircle, ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import RelatedServices from "@/components/RelatedServices";
import InContentCTA from "@/components/InContentCTA";

export const metadata: Metadata = {
  title: "รับย้ายบ้าน ภูเก็ต ย้ายหอ คอนโด อพาร์ทเม้นท์ | WMS TRANSPORT",
  description: "บริการรับย้ายบ้าน ภูเก็ต ขนย้ายหอพัก คอนโดมิเนียม เฟอร์นิเจอร์สำนักงาน จากกรุงเทพฯ ไปภูเก็ต หรือภายในจังหวัดภูเก็ต พร้อมคนช่วยยกของ แพ็กซีลกันกระแทกอย่างหนาแน่น 24 ชม.",
};

export default function PhuketMovingPage() {
  const faqs = [
    {
      q: "ย้ายบ้านไปภูเก็ตใช้เวลากี่วัน? ต้องจองล่วงหน้าไหม?",
      a: "การย้ายบ้านระยะไกลแนะนำให้จองคิวก่อนล่วงหน้า 1-3 วันครับ โดยเฉลี่ยจากกรุงเทพฯ ไปภูเก็ต ใช้เวลาเดินทางและจัดส่งของถึงที่หมายประมาณ 1 วัน (24 ชั่วโมง)"
    },
    {
      q: "มีบริการพร้อมคนช่วยยกของและแพ็กเฟอร์นิเจอร์ให้หรือไม่?",
      a: "มีแน่นอนครับ! ทีมงานขนย้ายของ WMS Transport มาพร้อมคนช่วยยกของและดูแลการแพ็กซีลเฟอร์นิเจอร์ชิ้นสำคัญให้ฟรี (กล่องกระดาษและเทป) เพื่อกันรอยขีดข่วนและฝุ่นละอองตลอดเส้นทาง"
    },
    {
      q: "ถ้าสิ่งของเกิดชำรุดเสียหาย มีประกันรองรับไหม?",
      a: "เพื่อความสบายใจสูงสุดของลูกค้า เรามีวงเงินประกันภัยสินค้าชำรุดหรืออุบัติเหตุระหว่างเดินทางสูงสุดถึง 100,000 บาท ตามเงื่อนไขที่กำหนด"
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
                { name: "ย้ายบ้าน ภูเก็ต", item: "/service/phuket/moving" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              Phuket Moving Services
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              บริการรับย้ายบ้าน <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                ย้ายคอนโด หอพัก ถึงภูเก็ต
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 toc-content space-y-12">
                
                {/* 1. Overview Section */}
                <section className="space-y-6">
                  <h2 id="overview" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    ภาพรวมบริการย้ายบ้านภูเก็ต
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    การขนย้ายสิ่งของเครื่องใช้ในบ้าน ย้ายคอนโด หรือย้ายหอพักทางไกลไปยังภาคใต้ โดยเฉพาะภูเก็ต 
                    ไม่ใช่เรื่องง่ายเนื่องจากระยะทางที่ไกลและสภาพภูมิอากาศ WMS Transport ยินดีให้บริการ 
                    <strong>ย้ายบ้าน ภูเก็ต</strong> และย้ายหอพัก คอนโด ด้วย <strong>รถกระบะตู้ทึบ</strong> มาตรฐานสูง 
                    ที่จะช่วยปกป้องตู้เย็น ทีวี ที่นอน และของรักของท่านไม่ให้เปียกน้ำฝนหรือโดนความร้อนจากแดด 
                    บริการของเราดูแลแบบครบวงจร <strong>พร้อมคนช่วยยก</strong> ช่วยยกลงถอดประกอบย้ายจุดตามที่คุณต้องการ 
                    เพื่อส่งสิ่งของชิ้นสำคัญของท่าน <strong>ส่งตรงถึงภูเก็ต</strong> ปลายทางอย่างปลอดภัยและตรงเวลา
                  </p>
                  
                  {/* Highlight card */}
                  <div className="bg-gradient-to-r from-blue-600/10 to-cyan-500/5 border border-blue-500/20 rounded-3xl p-6">
                    <p className="text-sm font-semibold text-slate-200">
                      🏡 <strong>บริการย้ายบ้านข้ามจังหวัดครบวงจร</strong>: เรามีกล่องกระดาษ ซีลพลาสติกแรป 
                      และวัสดุกันกระแทกต่างๆ คอยซัพพอร์ตให้แก่เฟอร์นิเจอร์ชิ้นสำคัญของท่านฟรี ไม่มีบวกราคาจุกจิก
                    </p>
                  </div>
                </section>

                {/* 2. Key Advantages Section */}
                <section className="space-y-6">
                  <h2 id="advantages" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    จุดเด่นบริการย้ายบ้าน WMS
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="truck-box" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        ขนส่งด้วยรถกระบะตู้ทึบ
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        โครงสร้างตู้อลูมิเนียมปิดล็อกมิดชิด ความสูง 2.1 เมตร สามารถจุโซฟา ที่นอน 6 ฟุต และกล่องสัมภาระได้จำนวนมาก
                      </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="helper-staff" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        พนักงานช่วยยกของมืออาชีพ
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        มีพนักงานช่วยยกจัดวางและยกของหนักอย่างระมัดระวัง ลดความเหนื่อยล้าของท่านในการย้ายบ้านใหม่ได้ 100%
                      </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="wrapping-supplies" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        อุปกรณ์แพ็กเกจจิ้งรองรับฟรี
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        บริการแรปพลาสติกกันฝุ่น แอร์บับเบิล และกล่องบรรจุภัณฑ์มาตรฐานเพื่อจัดระเบียบของขนาดเล็ก
                      </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
                      <h3 id="damage-insurance" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        มีประกันสินค้าเสียหาย
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        คุ้มครองความปลอดภัยสูงสุดตลอดทริปเดินทางย้ายสู่ภูเก็ตหรือย้ายออกนอกจังหวัด วงเงินสูง 100,000 บาท
                      </p>
                    </div>
                  </div>
                </section>

                <InContentCTA />

                {/* 3. Pricing Section */}
                <section className="space-y-6">
                  <h2 id="pricing-details" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    อัตราค่าบริการย้ายบ้าน
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    เราคิดราคาจริงใจ โปร่งใส ตามปริมาณของและประเภทของระยะทางการขนย้ายจริง:
                  </p>
                  
                  <div className="overflow-x-auto bg-white/[0.01] border border-white/5 rounded-3xl p-1 backdrop-blur-xl">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 font-bold bg-white/5">
                          <th className="p-4">ประเภทงานย้าย</th>
                          <th className="p-4">รายละเอียดสิ่งของ</th>
                          <th className="p-4 text-right">ราคาเริ่มต้น</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-semibold text-slate-200">
                        <tr>
                          <td className="p-4 text-white">ย้ายหอพัก / ย้ายห้องชุดขนาดเล็ก</td>
                          <td className="p-4">ที่นอน 3-5 ฟุต, ตู้เย็นขนาดเล็ก, กล่องพัสดุ 5-10 กล่อง, เสื้อผ้า</td>
                          <td className="p-4 text-right text-blue-400">เริ่มต้น 1,500 บาท</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">ย้ายคอนโด / ย้ายห้องขนาดกลาง</td>
                          <td className="p-4">ที่นอน 6 ฟุต, ทีวี, ตู้เย็น, โซฟา, โต๊ะเครื่องแป้ง, ตู้เสื้อผ้า</td>
                          <td className="p-4 text-right text-blue-400">เริ่มต้น 2,500 บาท</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-white">ย้ายบ้าน / ออฟฟิศ (ข้ามจังหวัดไปภูเก็ต)</td>
                          <td className="p-4">ที่นอนหลายชิ้น, โต๊ะทำงาน, เก้าอี้, เอกสาร, เครื่องใช้ไฟฟ้าครบชุด</td>
                          <td className="p-4 text-right text-blue-400">เริ่มต้น 6,000 บาท</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-400">
                    * ราคาเริ่มต้นข้างต้นเป็นราคารถเปล่าเฉพาะงานในพื้นที่ใกล้เคียง สำหรับงานข้ามจังหวัดไปภูเก็ตโปรดให้เจ้าหน้าที่ประเมินราคารวมคนยกแบบเหมาฟรี
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
                    <h3 className="text-xl font-bold text-white mb-2">ประเมินราคาย้ายบ้านไปภูเก็ตฟรี</h3>
                    <p className="text-slate-300 text-sm">บริการประเมินจากภาพถ่ายหรือวิดีโอผ่าน LINE รวดเร็วใน 5 นาที</p>
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
                <RelatedServices province="phuket" currentServiceSlug="moving" />

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
