import { Metadata } from "next";
import Link from "next/link";
import { Flame, Info } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "อัปเดตราคาขนส่งมอเตอร์ไซค์และบิ๊กไบค์ ทั่วไทย ปี 2569 | WMS TRANSPORT",
  description: "เช็กอัตราค่าบริการส่งมอเตอร์ไซค์ ขนส่งบิ๊กไบค์ ทั่วไทย ปี 2569 รายละเอียดราคาตามระยะทางจริงและรุ่นรถ ขนส่งด้วยรถกระบะตู้ทึบมาตรฐาน พร้อมอุปกรณ์รัดยึดปลอดภัย",
  alternates: {
    canonical: `${siteConfig.productionUrl}/pricing/motorcycle-2026`,
  },
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
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <main className="flex-1 relative pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="flex justify-start mb-4">
            <Breadcrumbs
              items={[
                { name: "บล็อกความรู้", item: "/blog" },
                { name: "ตารางราคาขนส่งมอเตอร์ไซค์ 2569", item: "/pricing/motorcycle-2026" },
              ]}
            />
          </div>

          <div className="mt-4">
            <span className="text-blue-700 tracking-wide uppercase font-bold text-xs bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-4 inline-block">
              2026 Pricing Matrix
            </span>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-navy leading-tight mb-6">
              อัปเดตราคาขนส่งมอเตอร์ไซค์ <br />
              <span className="text-blue-600">
                และบิ๊กไบค์ ทั่วไทย ปี 2569
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mt-8 items-start">
              
              {/* Content Column */}
              <div className="lg:col-span-8 toc-content space-y-10">
                
                {/* 1. Overview Section */}
                <section className="space-y-4">
                  <h2 id="overview" className="text-xl md:text-2xl font-bold text-navy border-b border-slate-200 pb-2.5">
                    ภาพรวมค่าบริการส่งมอเตอร์ไซค์ข้ามจังหวัด
                  </h2>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    ยินดีต้อนรับสู่ตารางอัตราค่าบริการอย่างเป็นทางการของ WMS Transport ประจำปี 2569 (2026) 
                    เราเป็นผู้ให้บริการขนส่งมอเตอร์ไซค์ บิ๊กไบค์ และรถสามล้อ ด้วยระบบ <strong>รถกระบะตู้ทึบ</strong> 
                    ตู้ขนาดใหญ่ปิดมิดชิดหนาแน่น ป้องกันหินดีด กันน้ำฝน กันลม และฝุ่นละอองอย่างมิดชิด 
                    พร้อมคนขับและพนักงาน <strong>พร้อมคนช่วยยก</strong> ที่มีความเชี่ยวชาญในการขนย้ายและจัดยึดตามหลักมาตรฐานสากล 
                    ดูแลส่งมอบรถของท่านถึงปลายทางทั่วประเทศอย่างรวดเร็วและคุ้มค่าที่สุด
                  </p>

                  {/* Contextual Intent Disambiguation */}
                  <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-bold block mb-1">คำแนะนำสำหรับผู้ค้นหาบริการ:</strong>
                      หน้านี้เป็นตารางประมาณการราคาอัปเดตประจำปี 2569 (Seasonal Rate Matrix) หากต้องการดูข้อมูลศูนย์บริการขนส่งมอเตอร์ไซค์หลัก สเปกรถ และวิธีการล็อกล้อ สามารถเข้าชมได้ที่{" "}
                      <Link href="/pricing/motorcycle-transport" className="text-blue-700 font-bold underline hover:text-blue-900">
                        ศูนย์บริการขนส่งมอเตอร์ไซค์ทั่วไทย (หน้าหลัก)
                      </Link>{" "}
                      หรือหากต้องการส่งรถมอเตอร์ไซค์ไปภาคใต้ สามารถดูข้อมูลเฉพาะเส้นทางได้ที่{" "}
                      <Link href="/service/phuket/motorcycle" className="text-blue-700 font-bold underline hover:text-blue-900">
                        บริการส่งมอเตอร์ไซค์ไปภูเก็ต
                      </Link>
                    </div>
                  </div>
                </section>

                {/* 2. Key Pricing Features Section */}
                <section className="space-y-4">
                  <h2 id="pricing-features" className="text-xl md:text-2xl font-bold text-navy border-b border-slate-200 pb-2.5">
                    เกณฑ์การประเมินราคาขนส่งรถจักรยานยนต์
                  </h2>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    ราคาของ WMS Transport มีความโปร่งใสและไม่มีการแอบแฝงค่าใช้จ่ายบวกเพิ่มหน้างาน โดยคำนวณจาก 3 เกณฑ์สำคัญ:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs">
                      <span className="text-blue-700 text-xs font-bold uppercase tracking-wider block mb-1">เกณฑ์ที่ 1</span>
                      <h4 className="font-bold text-navy mb-1.5 text-sm sm:text-base">ระยะทางจริง</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        คิดค่าบริการตามต้นทาง-ปลายทางจริง คำนวณระยะทางตามเส้นทางสัญจรจริง โปร่งใสชัดเจน
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs">
                      <span className="text-blue-700 text-xs font-bold uppercase tracking-wider block mb-1">เกณฑ์ที่ 2</span>
                      <h4 className="font-bold text-navy mb-1.5 text-sm sm:text-base">ขนาดเครื่องยนต์ (cc)</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        แบ่งขนาดรุ่นรถเนื่องจากน้ำหนักและมิติตัวถังที่แตกต่างกัน (รถเล็ก, รถครอบครัว, บิ๊กไบค์)
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs">
                      <span className="text-blue-700 text-xs font-bold uppercase tracking-wider block mb-1">เกณฑ์ที่ 3</span>
                      <h4 className="font-bold text-navy mb-1.5 text-sm sm:text-base">บริการเสริมยกของ</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        บริการจัดส่งแบบ Door-to-Door มีคนช่วยยกลงและประคองรถเข้าจอดในพื้นที่อย่างเรียบร้อย
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. Pricing Grid Table Section */}
                <section className="space-y-4">
                  <h2 id="pricing-grid" className="text-xl md:text-2xl font-bold text-navy border-b border-slate-200 pb-2.5">
                    ตารางราคาอัปเดต ปี 2569 (ทั่วประเทศ)
                  </h2>
                  
                  <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-xs">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                          <th className="p-3.5">เส้นทาง / ภูมิภาค</th>
                          <th className="p-3.5 text-center">รถเล็ก (100cc - 125cc)</th>
                          <th className="p-3.5 text-center">รถใหญ่ (150cc - 300cc)</th>
                          <th className="p-3.5 text-center">บิ๊กไบค์ (400cc+)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {routesData.map((route, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                            <td className="p-3.5 text-navy font-bold">{route.region}</td>
                            <td className="p-3.5 text-center text-blue-700 font-bold">฿{route.price1}</td>
                            <td className="p-3.5 text-center text-blue-700 font-bold">฿{route.price2}</td>
                            <td className="p-3.5 text-center text-emerald-700 font-bold">฿{route.price3}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-500">
                    * ราคาข้างต้นเป็นราคาโดยประมาณ สำหรับราคาตามพิกัดจริงโปรดสอบถามทีมงานเพื่อรับใบเสนอราคาที่เป็นลายลักษณ์อักษร
                  </p>
                </section>

                {/* 4. Safety Guarantee Section */}
                <section className="space-y-4">
                  <h2 id="safety-guarantee" className="text-xl md:text-2xl font-bold text-navy border-b border-slate-200 pb-2.5">
                    มาตรฐานความปลอดภัยระหว่างขนย้าย
                  </h2>
                  <ul className="space-y-2.5 text-slate-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> <span>ล็อกด้วยสายรัดประเภท Webbing Straps คุณภาพสูง ไม่สร้างริ้วรอยขูดขีดบนตัวถังรถ</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> <span>ขนส่งด้วยรถกระบะตู้ทึบที่ปิดล็อกอย่างแน่นหนา ปลอดภัยจากสภาพอากาศเลวร้าย</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> <span>มีมาตรการดูแลความปลอดภัยของตัวรถและอุปกรณ์ตลอดการเดินทางอย่างเข้มงวด</span>
                    </li>
                  </ul>
                </section>

                {/* Contextual Guide Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
                      คู่มือเตรียมตัวก่อนส่งรถ
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      ขั้นตอนและวิธีเตรียมรถมอเตอร์ไซค์ก่อนส่งข้ามจังหวัด
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      เช็กระดับน้ำมันเชื้อเพลิง เอกสารเล่มทะเบียน และอุปกรณ์ยึดล็อกที่ถูกต้อง
                    </p>
                  </div>
                  <Link
                    href="/guides/prep-motorcycle-transport"
                    className="shrink-0 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                  >
                    <span>อ่านคู่มือเตรียมรถ ›</span>
                  </Link>
                </div>

                {/* Pulsing CTA Block */}
                <div className="bg-navy border border-blue-950 p-8 rounded-2xl text-center space-y-4 mt-8 text-white shadow-md">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">จองคิวจัดส่งมอเตอร์ไซค์วันนี้ เพื่อรับสิทธิ์ล็อกเรตราคานี้!</h3>
                  <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
                    โปรโมชั่นราคาพิเศษนี้จำกัดเฉพาะผู้ที่ติดต่อจองคิวรถล่วงหน้าผ่านช่องทางออนไลน์เท่านั้น ล็อกราคาด่วนก่อนคิวเต็ม
                  </p>
                  
                  <div className="flex justify-center pt-2">
                    <a
                      href="https://line.me/ti/p/DtICkMaDet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-xl font-bold text-base shadow-xs transition-colors cursor-pointer"
                    >
                      <Flame className="w-5 h-5 text-amber-300" />
                      <span>ล็อกคิวราคานี้ (ทัก LINE)</span>
                    </a>
                  </div>
                  
                  <div className="text-xs text-slate-400">
                    * ลูกค้าสามารถติดต่อจองคิวได้ 24 ชั่วโมง ดำเนินการล็อกวันขนส่งได้ทันที
                  </div>
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
