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
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <main className="grow relative pt-24 pb-24">
        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent" />
          <div className="absolute bottom-[20%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-indigo-500/5 to-transparent" />
        </div>

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
            className="pt-4 pb-12"
          />

          {/* Sub Hub Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "ราคาบริการย้ายบ้าน / คอนโด",
                desc: "บริการย้ายห้องชุด หอพัก บ้าน พร้อมอุปกรณ์หุ้มฟิล์มและคนยกของมืออาชีพ",
                href: "/pricing/moving",
                bg: "from-blue-600/10 to-indigo-600/5",
                border: "border-blue-500/20"
              },
              {
                title: "ราคาจัดส่งมอเตอร์ไซค์ / บิ๊กไบค์",
                desc: "ราคาจัดส่งรถตู้ทึบ รัดยางกันรอย Wheel Chock ประกันภัยฟรีทุกเที่ยวทั่วประเทศ",
                href: "/pricing/motorcycle-transport",
                bg: "from-purple-600/10 to-pink-600/5",
                border: "border-purple-500/20"
              },
              {
                title: "ราคาเหมารถกระบะตู้ทึบ / ส่งสินค้า",
                desc: "สำหรับสินค้าโรงงาน คลังสินค้าเกษตร กระจายสินค้าเชิงพาณิชย์ ออกใบกำกับภาษีได้",
                href: "/pricing/freight",
                bg: "from-emerald-600/10 to-teal-600/5",
                border: "border-emerald-500/20"
              }
            ].map((card, i) => (
              <div 
                key={i} 
                className={`bg-linear-to-br ${card.bg} border ${card.border} rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 md:hover:-translate-y-1`}
              >
                <div>
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-semibold mb-6">
                    {card.desc}
                  </p>
                </div>
                <Link 
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-extrabold hover:text-blue-300 group/link"
                >
                  <span>ดูตารางราคาแบบละเอียด</span>
                  <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {/* Pricing Overview Table */}
          <div className="perf-card rounded-3xl p-6 sm:p-8 mb-16">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-2">
              <DollarSign className="text-blue-400 h-6 w-6" />
              <span>สรุปราคาเริ่มต้นของ WMS TRANSPORT</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-300 text-xs sm:text-sm font-semibold border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-bold">
                    <th className="py-4 px-4">ประเภทบริการ</th>
                    <th className="py-4 px-4">จุดเด่นบริการ</th>
                    <th className="py-4 px-4">ราคาเริ่มต้น (บาท)</th>
                    <th className="py-4 px-4 text-right">ลิงก์เพิ่มเติม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-4 px-4 font-extrabold text-white">ย้ายบ้าน / คอนโด / หอพัก</td>
                    <td className="py-4 px-4">ตู้ทึบความสูง 2.1 เมตร กันฝนฝุ่น 100% + ฟรีแรปของใหญ่</td>
                    <td className="py-4 px-4 text-blue-400 font-black">1,500 บาท</td>
                    <td className="py-4 px-4 text-right">
                      <Link href="/pricing/moving" className="text-slate-400 hover:text-white underline text-xs">
                        เช็กเงื่อนไข
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-extrabold text-white">ส่งรถมอเตอร์ไซค์ / บิ๊กไบค์</td>
                    <td className="py-4 px-4">ล็อกล้อ Wheel Chock ยึดเชือกรัดแน่นหนา 4 จุดข้ามจังหวัด</td>
                    <td className="py-4 px-4 text-blue-400 font-black">2,500 บาท</td>
                    <td className="py-4 px-4 text-right">
                      <Link href="/pricing/motorcycle-transport" className="text-slate-400 hover:text-white underline text-xs">
                        เช็กเงื่อนไข
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-extrabold text-white">รถกระบะขนส่งสินค้า (เหมารอบ)</td>
                    <td className="py-4 px-4">ขนส่งเหมาเที่ยว มีประกันเคลมสินค้า ออกเอกสารหักภาษีได้</td>
                    <td className="py-4 px-4 text-blue-400 font-black">1,000 บาท</td>
                    <td className="py-4 px-4 text-right">
                      <Link href="/pricing/freight" className="text-slate-400 hover:text-white underline text-xs">
                        เช็กเงื่อนไข
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Refund & Cancellation Policy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="perf-card rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Calendar className="text-blue-400 h-5 w-5" />
                <span>นโยบายการเลื่อนหรือยกเลิกคิวงาน</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-semibold list-disc list-inside">
                <li>แจ้งเลื่อนคิวงานฟรีล่วงหน้าอย่างน้อย 24 ชั่วโมงก่อนเวลานัดหมาย</li>
                <li>กรณีเลื่อนด่วนต่ำกว่า 24 ชั่วโมง หรือคนขับเดินทางถึงหน้างานแล้ว จะมีค่าจอดรถเสียเวลาอิงตามจริง</li>
                <li>การแจ้งยกเลิกคิวงานหลังโอนเงินจอง สามารถทำเรื่องขอเงินจองคืนเต็มจำนวนเมื่อแจ้งล่วงหน้า 3 วันขึ้นไป</li>
              </ul>
            </div>

            <div className="perf-card rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Clock className="text-blue-400 h-5 w-5" />
                <span>ความรับผิดชอบและการรับประกันความเสียหาย</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-semibold list-disc list-inside">
                <li>WMS คุ้มครองความเสียหายของเฟอร์นิเจอร์หลักที่เกิดจากการกระแทกหรือการขนส่งในตู้ทึบ</li>
                <li>วงเงินรับประกันมาตรฐานอยู่ที่ 10,000 - 50,000 บาทต่อเคสตามประเภทสัญญาการจ้าง</li>
                <li>ไม่รับผิดชอบของชิ้นเล็กที่ชำรุดภายในกล่องกระดาษที่ลูกค้าแพ็กผนึกมาด้วยตนเองโดยไม่ได้ให้พนักงานช่วยตรวจสอบ</li>
              </ul>
            </div>
          </div>

          {/* Transparent CTA */}
          <div className="bg-linear-to-b from-[#071426] to-[#040B15] border border-white/10 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent pointer-events-none" />
            <span className="text-blue-400 font-black text-xs uppercase tracking-widest block mb-3">จองคิวรถขนส่ง WMS</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
              รับราคาประเมินละเอียดสำหรับหน้างานของคุณฟรี
            </h3>
            <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed mb-8 font-semibold">
              เราประเมินราคาอิงจากระยะทาง ขนาดสิ่งของ และลิฟต์นิติบุคคล ไม่ทิ้งงาน ไม่ชาร์จเพิ่มหน้างานลึกลับ
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#06C755] hover:bg-[#05B34F] text-white font-black text-base rounded-2xl transition-all shadow-[0_10px_20px_rgba(6,199,85,0.2)] hover:-translate-y-0.5"
              >
                <Image src="/images/LINE_icon.webp" alt="LINE" width={20} height={20} className="shrink-0" />
                <span>ประเมินราคาด่วนผ่าน LINE</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-blue-400/50 text-white font-bold text-base rounded-2xl transition-all hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="font-mono">โทร. 061-240-2436</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      </div>
  );
}
