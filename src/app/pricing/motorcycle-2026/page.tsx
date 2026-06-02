import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Flame } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";

export const metadata: Metadata = {
  title: "อัปเดตราคาขนส่งมอเตอร์ไซค์และบิ๊กไบค์ ทั่วไทย ปี 2569 | WMS TRANSPORT",
  description: "เช็กอัตราค่าบริการส่งมอเตอร์ไซค์ ขนส่งบิ๊กไบค์ ทั่วไทย ปี 2569 รายละเอียดราคาตามระยะทางจริงและรุ่นรถ ขนส่งด้วยรถกระบะตู้ทึบมีประกัน 100,000 บาท",
};

export default function MotorcyclePricing2026Page() {
  const routesData = [
    { region: "กรุงเทพฯ / ปริมณฑล ไป ภาคใต้ (ภูเก็ต, กระบี่, หาดใหญ่)", price1: "2,500 - 3,500", price2: "3,500 - 4,500", price3: "4,500 - 6,500" },
    { region: "กรุงเทพฯ / ปริมณฑล ไป ภาคเหนือ (เชียงใหม่, เชียงราย, ลำปาง)", price1: "2,200 - 3,200", price2: "3,200 - 4,200", price3: "4,200 - 6,000" },
    { region: "กรุงเทพฯ / ปริมณฑล ไป ภาคอีสาน (ขอนแก่น, โคราช, อุดรธานี)", price1: "2,000 - 3,000", price2: "3,000 - 4,000", price3: "4,000 - 5,500" },
    { region: "กรุงเทพฯ / ปริมณฑล ไป ภาคตะวันออก (ชลบุรี, พัทยา, ระยอง)", price1: "1,500 - 2,500", price2: "2,500 - 3,000", price3: "3,000 - 4,500" },
    { region: "เส้นทางระยะสั้น ภายในจังหวัด / ปริมณฑล (ไม่เกิน 100 กม.)", price1: "1,000 - 1,500", price2: "1,500 - 2,000", price3: "2,000 - 3,000" }
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
                { name: "บล็อกความรู้", item: "/blog" },
                { name: "ตารางราคาขนส่งมอเตอร์ไซค์ 2569", item: "/pricing/motorcycle-2026" },
              ]}
            />
          </div>

          <div className="mt-6">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              2026 Pricing Matrix
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              อัปเดตราคาขนส่งมอเตอร์ไซค์ <br />
              <span className="text-blue-400">
                และบิ๊กไบค์ ทั่วไทย ปี 2569
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 toc-content space-y-12">
                
                {/* 1. Overview Section */}
                <section className="space-y-6">
                  <h2 id="overview" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    ภาพรวมค่าบริการส่งมอเตอร์ไซค์ข้ามจังหวัด
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    ยินดีต้อนรับสู่ตารางอัตราค่าบริการอย่างเป็นทางการของ WMS Transport ประจำปี 2569 (2026) 
                    เราเป็นผู้ให้บริการขนส่งมอเตอร์ไซค์ บิ๊กไบค์ และรถสามล้อ ด้วยระบบ <strong>รถกระบะตู้ทึบ</strong> 
                    ตู้ขนาดใหญ่ปิดมิดชิดหนาแน่น ป้องกันหินดีด กันน้ำฝน กันลม และฝุ่นละออง 100% 
                    พร้อมคนขับและพนักงาน <strong>พร้อมคนช่วยยก</strong> ที่มีความเชี่ยวชาญในการขนย้ายและจัดยึดตามหลักมาตรฐานสากล 
                    ดูแลส่งมอบรถของท่านถึงปลายทางทั่วประเทศอย่างรวดเร็วและคุ้มค่าที่สุด
                  </p>
                </section>

                {/* 2. Key Pricing Features Section */}
                <section className="space-y-6">
                  <h2 id="pricing-features" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    เกณฑ์การประเมินราคาขนส่งรถจักรยานยนต์
                  </h2>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    ราคาของ WMS Transport มีความโปร่งใสและไม่มีการแอบแฝงค่าใช้จ่ายบวกเพิ่มหน้างาน 100% โดยคำนวณจาก 3 เกณฑ์สำคัญ:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider block mb-1">เกณฑ์ที่ 1</span>
                      <h4 className="font-bold text-white mb-2">ระยะทางจริง</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        คิดค่าบริการตามต้นทาง-ปลายทางจริง วัดด้วยระบบ GPS ไม่มีมโนระยะทางเพื่อเพิ่มราคา
                      </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider block mb-1">เกณฑ์ที่ 2</span>
                      <h4 className="font-bold text-white mb-2">ขนาดเครื่องยนต์ (cc)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        แบ่งขนาดรุ่นรถเนื่องจากน้ำหนักและมิติตัวถังที่แตกต่างกัน (รถเล็ก, รถครอบครัว, บิ๊กไบค์)
                      </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider block mb-1">เกณฑ์ที่ 3</span>
                      <h4 className="font-bold text-white mb-2">บริการเสริมยกของ</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        บริการจัดส่งแบบ Door-to-Door มีคนช่วยยกลงและประคองรถเข้าจอดในพื้นที่อย่างเรียบร้อย
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. Pricing Grid Table Section */}
                <section className="space-y-6">
                  <h2 id="pricing-grid" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    ตารางราคาอัปเดต ปี 2569 (ทั่วประเทศ)
                  </h2>
                  
                  <div className="overflow-x-auto bg-white/[0.01] border border-white/5 rounded-3xl p-1 backdrop-blur-xl">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 font-bold bg-white/5">
                          <th className="p-4">เส้นทาง / ภูมิภาค</th>
                          <th className="p-4 text-center">รถเล็ก (100cc - 125cc)</th>
                          <th className="p-4 text-center">รถใหญ่ (150cc - 300cc)</th>
                          <th className="p-4 text-center">บิ๊กไบค์ (400cc+)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-semibold text-slate-200">
                        {routesData.map((route, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.01]">
                            <td className="p-4 text-white font-bold">{route.region}</td>
                            <td className="p-4 text-center text-blue-400">฿{route.price1}</td>
                            <td className="p-4 text-center text-cyan-300">฿{route.price2}</td>
                            <td className="p-4 text-center text-emerald-400">฿{route.price3}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-400">
                    * ราคาข้างต้นเป็นราคาโดยประมาณ สำหรับราคาตามพิกัดจริงโปรดสอบถามทีมงานเพื่อรับใบเสนอราคาที่เป็นลายลักษณ์อักษร
                  </p>
                </section>

                {/* 4. Safety Guarantee Section */}
                <section className="space-y-6">
                  <h2 id="safety-guarantee" className="text-2xl md:text-3xl font-black text-white border-b border-white/10 pb-3">
                    มาตรฐานความปลอดภัยระหว่างขนย้าย
                  </h2>
                  <ul className="space-y-3.5 text-slate-300 font-medium">
                    <li className="flex items-center gap-3">
                      <span className="text-emerald-400">✓</span> <span>ล็อกด้วยสายรัดประเภท Webbing Straps คุณภาพสูง ไม่สร้างริ้วรอยขูดขีดบนตัวถังรถ</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-emerald-400">✓</span> <span>ขนส่งด้วยรถกระบะตู้ทึบที่ปิดล็อกอย่างแน่นหนา ปลอดภัยจากสภาพอากาศเลวร้าย</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-emerald-400">✓</span> <span>ประกันภัยสินค้าชำรุดเสียหายและอุบัติเหตุ วงเงินคุ้มครองสูงสูดถึง 100,000 บาท</span>
                    </li>
                  </ul>
                </section>

                {/* Pulsing CTA Block */}
                <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl text-center space-y-6 mt-12">
                  <h3 className="text-2xl font-black text-white">จองคิวจัดส่งมอเตอร์ไซค์วันนี้ เพื่อรับสิทธิ์ล็อกเรตราคานี้!</h3>
                  <p className="text-slate-300 text-sm max-w-xl mx-auto">
                    โปรโมชั่นราคาพิเศษนี้จำกัดเฉพาะผู้ที่ติดต่อจองคิวรถล่วงหน้าผ่านช่องทางออนไลน์เท่านั้น ล็อกราคาด่วนก่อนคิวเต็ม
                  </p>
                  
                  <div className="flex justify-center">
                    <a
                      href="https://line.me/ti/p/DtICkMaDet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white rounded-2xl font-black text-lg shadow-[0_10px_35px_rgba(239,68,68,0.4)] transition-all duration-300 hover:-translate-y-0.5 animate-pulse cursor-pointer"
                    >
                      <Flame className="w-5 h-5 text-yellow-300" />
                      <span>🔥 ล็อกคิวราคานี้</span>
                    </a>
                  </div>
                  
                  <div className="text-xs text-slate-500">
                    * ลูกค้าสามารถติดต่อจองคิวได้ 24 ชั่วโมง ดำเนินการล็อกวันขนส่งได้ทันที
                  </div>
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
