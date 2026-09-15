import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, DollarSign, Calendar, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import IntentHero from "@/components/IntentHero";

export const metadata: Metadata = {
  title: "ราคารถรับจ้างตู้ทึบ ค่าขนส่งมอเตอร์ไซค์และย้ายบ้านคอนโด | WMS TRANSPORT",
  description: "เช็กอัตราค่าบริการรถกระบะตู้ทึบรับจ้าง ย้ายหอพัก คอนโด และขนส่งมอเตอร์ไซค์ ราคาประเมินตามระยะทางจริง โปร่งใสไม่มีค่าใช้จ่ายบวกเพิ่มลึกลับ",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingParentHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <main className="grow relative pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-6">
            <Breadcrumbs
              items={[
                { name: "อัตราค่าบริการ", item: "/pricing" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <IntentHero
            h1="นโยบายราคาขนส่งที่เป็นธรรม ไม่มีบวกเพิ่มลึกลับหน้างาน"
            supporting="ตรวจเช็กราคารถกระบะตู้ทึบรับจ้าง ย้ายบ้านคอนโด และส่งมอเตอร์ไซค์อย่างโปร่งใส ประเมินราคาจริงใจตามเงื่อนไขชัดเจน"
            badge="TRANSPARENT PRICING"
            className="pt-2 pb-10"
          />

          {/* Sub Hub Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "ราคาบริการย้ายบ้าน / คอนโด",
                desc: "บริการย้ายห้องชุด หอพัก บ้าน พร้อมอุปกรณ์หุ้มฟิล์มและคนยกของมืออาชีพ",
                href: "/pricing/moving",
                badge: "ย้ายบ้าน/คอนโด"
              },
              {
                title: "ราคาจัดส่งมอเตอร์ไซค์ / บิ๊กไบค์",
                desc: "ราคาจัดส่งรถตู้ทึบ รัดยางกันรอย Wheel Chock ดูแลความปลอดภัยทุกเที่ยวทั่วประเทศ",
                href: "/pricing/motorcycle-transport",
                badge: "ขนส่งมอเตอร์ไซค์"
              },
              {
                title: "ราคาเหมารถกระบะตู้ทึบ / ส่งสินค้า",
                desc: "สำหรับสินค้าโรงงาน คลังสินค้าเกษตร กระจายสินค้าเชิงพาณิชย์ ออกเอกสารใบเสร็จยืนยันได้",
                href: "/pricing/freight",
                badge: "ขนส่งสินค้าเหมาคัน"
              }
            ].map((card, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs transition-all duration-200 hover:border-blue-300 hover:shadow-md group"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md mb-3">
                    {card.badge}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium mb-6">
                    {card.desc}
                  </p>
                </div>
                <Link 
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-xs text-blue-700 font-bold hover:text-blue-800 group/link"
                >
                  <span>ดูตารางราคาแบบละเอียด</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {/* Pricing Overview Table */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 mb-12 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] mb-6 flex items-center gap-2">
              <DollarSign className="text-blue-600 h-6 w-6" />
              <span>สรุปราคาเริ่มต้นของ WMS TRANSPORT</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-700 text-xs sm:text-sm font-medium border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/60">
                    <th className="py-3.5 px-4 rounded-l-xl">ประเภทบริการ</th>
                    <th className="py-3.5 px-4">จุดเด่นบริการ</th>
                    <th className="py-3.5 px-4">ราคาเริ่มต้น</th>
                    <th className="py-3.5 px-4 text-right rounded-r-xl">รายละเอียด</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#0B1F3A]">ย้ายบ้าน / คอนโด / หอพัก</td>
                    <td className="py-4 px-4 text-slate-600">ตู้ทึบความสูง 2.1 เมตร กันฝนกันฝุ่นมิดชิด + ฟรีแรปของใหญ่</td>
                    <td className="py-4 px-4 text-blue-700 font-extrabold">1,500 บาท</td>
                    <td className="py-4 px-4 text-right">
                      <Link href="/pricing/moving" className="text-blue-600 hover:text-blue-800 font-bold text-xs underline">
                        เช็กเงื่อนไข
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#0B1F3A]">ส่งรถมอเตอร์ไซค์ / บิ๊กไบค์</td>
                    <td className="py-4 px-4 text-slate-600">ล็อกล้อ Wheel Chock ยึดเชือกรัดแน่นหนา 4 จุดข้ามจังหวัด</td>
                    <td className="py-4 px-4 text-blue-700 font-extrabold">2,500 บาท</td>
                    <td className="py-4 px-4 text-right">
                      <Link href="/pricing/motorcycle-transport" className="text-blue-600 hover:text-blue-800 font-bold text-xs underline">
                        เช็กเงื่อนไข
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#0B1F3A]">รถกระบะขนส่งสินค้า (เหมารอบ)</td>
                    <td className="py-4 px-4 text-slate-600">ขนส่งเหมาเที่ยว มีการดูแลสินค้า ออกเอกสารใบเสร็จการชำระเงินได้</td>
                    <td className="py-4 px-4 text-blue-700 font-extrabold">1,000 บาท</td>
                    <td className="py-4 px-4 text-right">
                      <Link href="/pricing/freight" className="text-blue-600 hover:text-blue-800 font-bold text-xs underline">
                        เช็กเงื่อนไข
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Refund & Cancellation Policy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
                <Calendar className="text-blue-600 h-5 w-5" />
                <span>นโยบายการเลื่อนหรือยกเลิกคิวงาน</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium list-disc list-inside leading-relaxed">
                <li>แจ้งเลื่อนคิวงานฟรีล่วงหน้าอย่างน้อย 24 ชั่วโมงก่อนเวลานัดหมาย</li>
                <li>กรณีเลื่อนด่วนต่ำกว่า 24 ชั่วโมง หรือคนขับเดินทางถึงหน้างานแล้ว จะมีค่าจอดรถเสียเวลาอิงตามจริง</li>
                <li>การแจ้งยกเลิกคิวงานหลังโอนเงินจอง สามารถทำเรื่องขอเงินจองคืนเต็มจำนวนเมื่อแจ้งล่วงหน้า 3 วันขึ้นไป</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
                <Clock className="text-blue-600 h-5 w-5" />
                <span>มาตรการดูแลความปลอดภัยของสิ่งของ</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium list-disc list-inside leading-relaxed">
                <li>WMS คุ้มครองความเสียหายของเฟอร์นิเจอร์หลักที่เกิดจากการกระแทกหรือการขนส่งในตู้ทึบ</li>
                <li>มาตรการดูแลความเสียหายอิงตามข้อตกลงและเงื่อนไขประเภทงานที่ตกลงก่อนเริ่มงาน</li>
                <li>ไม่รับผิดชอบของชิ้นเล็กที่ชำรุดภายในกล่องกระดาษที่ลูกค้าแพ็กผนึกมาด้วยตนเองโดยไม่ได้ให้พนักงานช่วยตรวจสอบ</li>
              </ul>
            </div>
          </div>

          {/* Transparent CTA */}
          <div className="bg-[#0B1F3A] border border-blue-950 rounded-2xl p-6 sm:p-10 text-center text-white shadow-md relative overflow-hidden">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-wider block mb-2">จองคิวรถขนส่ง WMS</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              รับราคาประเมินละเอียดสำหรับหน้างานของคุณฟรี
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6 font-medium">
              เราประเมินราคาอิงจากระยะทาง ขนาดสิ่งของ และลิฟต์นิติบุคคล ไม่ทิ้งงาน ไม่ชาร์จเพิ่มหน้างานลึกลับ
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-base rounded-xl transition-colors shadow-xs"
              >
                <Image src="/images/LINE_icon.webp" alt="LINE" width={20} height={20} className="shrink-0" />
                <span>ประเมินราคาด่วนผ่าน LINE</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base rounded-xl transition-colors"
              >
                <Phone className="h-4.5 w-4.5 text-blue-400" />
                <span className="font-mono">โทร. 061-240-2436</span>
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
