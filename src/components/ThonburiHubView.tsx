import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  ShieldCheck,
  Users,
  Phone,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Layers,
  HelpCircle,
  Compass,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  getThonburiDistrictsByZone,
  isDistrictPageIndexable,
} from "@/data/districtLandingPages";
import ServiceAreaPromoBanner from "@/components/service-area/ServiceAreaPromoBanner";
import CompactServiceSummary from "@/components/service-area/CompactServiceSummary";
import QuotationPreparationGuide from "@/components/QuotationPreparationGuide";

export default function ThonburiHubView() {
  const northernDistricts = getThonburiDistrictsByZone("northern");
  const southernDistricts = getThonburiDistrictsByZone("southern");

  const faqs = [
    {
      q: "รถรับจ้างตู้ทึบ WMS สามารถเข้าลานจอดใต้อาคารคอนโดมิเนียมฝั่งธนบุรีได้หรือไม่?",
      a: "รถกระบะตู้ทึบของ WMS TRANSPORT เป็นรถกระบะตู้ทึบหลังคาสูงปิดมิดชิด (โปรดแจ้งรายละเอียดหน้างานเพื่อให้เจ้าหน้าที่ตรวจสอบรถและอุปกรณ์ที่เหมาะสม) สำหรับรองรับสิ่งของชิ้นใหญ่ การเข้าจอดเทียบขนย้ายแนะนำให้ประสานงานจุดโหลดของชั้นล่าง (Loading Bay) หรือลานจอดที่ไม่มีสิ่งกีดขวางความสูงกับนิติบุคคลของอาคาร"
    },
    {
      q: "ตรอกซอยแคบในชุมชนเก่าฝั่งธนบุรี เช่น ย่านตลาดพลู บางยี่เรือ หรือซอยเพชรเกษม รถเข้าได้ไหม?",
      a: "รถกระบะตอนเดียวตู้ทึบของเรามีความคล่องตัวสูง สามารถเลี้ยวเข้าตรอกซอยแคบ ข้ามสะพานคลอง และหลบหลีกสายไฟต่ำได้ดีกว่ารถบรรทุก 6 ล้อ ทำให้เข้าถึงหน้าบ้านในซอยลึกของฝั่งธนบุรีได้อย่างปลอดภัย"
    },
    {
      q: "การขนย้ายข้ามฝั่งแม่น้ำเจ้าพระยา หรือข้ามจังหวัดจากฝั่งธนบุรีคิดราคาอย่างไร?",
      a: "เราคำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดรับของในฝั่งธนบุรีไปยังจุดหมายปลายทาง ไม่ว่าจะเป็นการข้ามสะพานเข้าฝั่งพระนคร หรือการวิ่งออกต่างจังหวัด (เช่น สมุทรสาคร นครปฐม หรือสายใต้) โดยแจ้งราคาและเงื่อนไขตามขอบเขตงานอย่างโปร่งใสก่อนเริ่มงาน"
    },
    {
      q: "มีบริการพนักงานช่วยยกของด้วยหรือไม่ และต้องจองคิวล่วงหน้านานแค่ไหน?",
      a: "มีพนักงานช่วยยกของตามขนาดงานที่ตกลง คอยดูแลความปลอดภัยของสิ่งของ จัดเรียง และแรปฟิล์มกันรอยเฟอร์นิเจอร์ แนะนำให้จองคิวล่วงหน้า 1-2 วัน โดยเฉพาะช่วงวันหยุดสุดสัปดาห์หรือช่วงสิ้นเดือนเพื่อให้ตรงกับคิวจองลิฟต์ของนิติบุคคล"
    }
  ];

  const bookingSteps = [
    {
      step: "01",
      title: "แจ้งจุดรับ-ส่งและรายการของ",
      desc: "ส่งรูปถ่ายสิ่งของ พิกัดต้นทางฝั่งธนบุรี และปลายทางผ่านทาง LINE หรือโทรติดต่อเจ้าหน้าที่"
    },
    {
      step: "02",
      title: "ประเมินราคาตามจริง",
      desc: "เจ้าหน้าที่ประเมินขนาดรถ จำนวนพนักงานยกของ และแจ้งราคาสุทธิโดยไม่มีค่าใช้จ่ายแฝง"
    },
    {
      step: "03",
      title: "ล็อกคิวงานและเตรียมสถานที่",
      desc: "ยืนยันวันเวลา นัดหมายคิว และติดต่อจองลิฟต์หรือขอใบผ่านทางกับนิติบุคคลของอาคาร"
    },
    {
      step: "04",
      title: "เข้าบริการตรงเวลา ปลอดภัย",
      desc: "ทีมงานเข้าเทียบจุดนัดหมาย ขนย้ายอย่างระมัดระวัง รัดตรึงในตู้ทึบ และส่งมอบปลายทางเรียบร้อย"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans text-slate-900">
      <main className="grow relative pt-24 pb-20 md:pt-28 md:pb-28">
        {/* Background ambience */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-6">
            <Breadcrumbs
              items={[
                { name: "หน้าหลัก", item: "/" },
                { name: "พื้นที่บริการ", item: "/service/bangkok" },
                { name: "กรุงเทพฯ ฝั่งธนบุรี", item: "/service/bkk-thonburi" },
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>ศูนย์รวมข้อมูลบริการขนย้าย 15 เขตฝั่งธนบุรี</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              รถรับจ้างฝั่งธนบุรี ขนย้ายบ้าน คอนโด และส่งของทั่วไป
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-8">
              WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างขนย้ายครอบคลุม 15 เขตทั่วฝั่งธนบุรี ทั้งกลุ่มเขตกรุงธนเหนือและกรุงธนใต้ รองรับงานย้ายคอนโดมิเนียมตามแนวรถไฟฟ้า BTS สายสีลมและ MRT สายสีน้ำเงิน ย้ายทาวน์โฮม บ้านเดี่ยว ขนส่งมอเตอร์ไซค์ และขนส่งสินค้าโรงงาน ด้วยรถกระบะตู้ทึบหลังคาสูงปิดมิดชิด (โปรดแจ้งรายละเอียดหน้างานเพื่อให้เจ้าหน้าที่ตรวจสอบรถและอุปกรณ์ที่เหมาะสม) ขนย้ายสิ่งของมิดชิดปลอดภัย พร้อมทีมงานช่วยยกของ
            </p>

            {/* Quick Contact CTAs */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-xl font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt="LINE"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain shrink-0"
                />
                <span>ประเมินราคาผ่าน LINE ฟรี</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 text-slate-800 rounded-xl font-bold text-base shadow-xs transition-all hover:-translate-y-0.5"
              >
                <Phone className="h-4.5 w-4.5 text-blue-600" />
                <span className="font-mono tracking-wider">061-240-2436</span>
              </a>
            </div>
          </section>

          {/* Promotional Showcase Banner */}
          <ServiceAreaPromoBanner />

          {/* Compact Local Service Summary */}
          <CompactServiceSummary
            locationName="กรุงเทพฯ ฝั่งธนบุรี (15 เขต)"
            serviceAreas={[
              "กลุ่มเขตกรุงธนเหนือ",
              "กลุ่มเขตกรุงธนใต้",
              "ถนนเพชรเกษม",
              "ถนนบรมราชชนนี",
              "ถนนราชพฤกษ์",
            ]}
            services={[
              "ย้ายคอนโดแนว BTS/MRT",
              "ย้ายบ้านและทาวน์โฮม",
              "ขนส่งมอเตอร์ไซค์ บิ๊กไบค์",
              "ขนส่งสินค้าโรงงาน",
            ]}
          />

          {/* Sub-Services Triad */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                บริการหลักในพื้นที่ฝั่งธนบุรี
              </h2>
              <p className="text-slate-500 text-sm">
                เลือกรูปแบบงานขนย้ายที่ตรงกับความต้องการของคุณเพื่อดูข้อมูลเฉพาะด้าน
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/service/bkk-thonburi/moving"
                className="group bg-white hover:bg-blue-50/30 border border-slate-200/80 hover:border-blue-300 transition-all duration-300 p-6 sm:p-7 rounded-2xl flex flex-col gap-4 shadow-xs hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 uppercase tracking-wider">
                    ยอดนิยม
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                    ย้ายหอพัก คอนโด บ้าน ฝั่งธนบุรี
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    บริการย้ายที่อยู่อาศัยพร้อมทีมงานช่วยยกของ แรปฟิล์มกันกระแทก ป้องกันรอยขีดข่วนตลอดการเดินทาง
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-blue-600 text-sm font-bold group-hover:gap-2.5 transition-all">
                  <span>ดูข้อมูลบริการย้ายบ้าน คอนโด ฝั่งธนบุรี</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/service/bkk-thonburi/motorcycle"
                className="group bg-white hover:bg-blue-50/30 border border-slate-200/80 hover:border-blue-300 transition-all duration-300 p-6 sm:p-7 rounded-2xl flex flex-col gap-4 shadow-xs hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200 uppercase tracking-wider">
                    ดูแลพิเศษ
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                    ขนส่งมอเตอร์ไซค์ บิ๊กไบค์
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    ขนส่งในตู้ทึบมิดชิด รัดตรึงด้วยอุปกรณ์ยึดตรึงสิ่งของและล็อกล้อ ปลอดภัยจากแดด ฝน และริ้วรอย
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-blue-600 text-sm font-bold group-hover:gap-2.5 transition-all">
                  <span>ดูข้อมูลขนส่งมอเตอร์ไซค์ บิ๊กไบค์</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/service/bkk-thonburi/freight"
                className="group bg-white hover:bg-blue-50/30 border border-slate-200/80 hover:border-blue-300 transition-all duration-300 p-6 sm:p-7 rounded-2xl flex flex-col gap-4 shadow-xs hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200 uppercase tracking-wider">
                    เหมาคัน
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                    ขนส่งสินค้า เหมาเที่ยวฝั่งธนบุรี
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    บริการเหมารถกระบะตู้ทึบส่งสินค้าทั่วไป อุปกรณ์สำนักงาน สินค้าโรงงาน กระจายสู่ทุกภูมิภาค
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-blue-600 text-sm font-bold group-hover:gap-2.5 transition-all">
                  <span>ดูข้อมูลเหมารถกระบะขนส่งสินค้าฝั่งธนบุรี</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </section>

          {/* ── THONBURI CORRIDORS & BIDIRECTIONAL INTERNAL LINKS ── */}
          <section className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                พื้นที่และเส้นทางที่ให้บริการในฝั่งธนบุรี
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                เส้นทางคมนาคมหลักที่ทีมงาน WMS TRANSPORT สัญจรให้บริการเป็นประจำ วางแผนการเดินทางอย่างคล่องตัวเพื่อเข้าถึงทุกตรอกซอย
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Corridor 1 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-blue-300 transition-all">
                <h3 className="text-lg font-bold text-slate-900 mb-3 text-blue-600">
                  แนวเพชรเกษม – ท่าพระ – วงเวียนใหญ่
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["ถนนเพชรเกษม", "ท่าพระ", "วงเวียนใหญ่", "บางยี่เรือ", "ตลาดพลู"].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div>
                    <strong className="text-slate-800 block mb-0.5">ความเหมาะสมของบริการ:</strong>
                    เหมาะสำหรับย้ายคอนโดมิเนียมแนวรถไฟฟ้า MRT/BTS หอพัก และอาคารพาณิชย์ รถกระบะตู้ทึบเข้าตรอกซอยแคบได้ดีกว่ารถ 6 ล้อ
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">การเชื่อมต่อเส้นทาง:</strong>
                    จุดตัดศูนย์กลางคมนาคมฝั่งธนบุรี เชื่อมสะพานตากสิน สะพานพุทธ และสะพานพระปกเกล้า ข้ามสู่ฝั่งพระนครได้อย่างรวดเร็ว
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">ปัจจัยราคา:</strong>
                    คำนวณตามระยะทางจริงและชั้นอาคาร แจ้งราคาสุทธิก่อนเริ่มงาน ไม่มีบวกเพิ่มทีหลัง
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">การเตรียมตัวของลูกค้า:</strong>
                    ประสานงานนิติบุคคลเพื่อนัดหมายเวลาใช้ลิฟต์ขนของและสำรองจุดจอดเทียบรถชั้นล่าง
                  </div>
                </div>
              </div>

              {/* Corridor 2 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-blue-300 transition-all">
                <h3 className="text-lg font-bold text-slate-900 mb-3 text-blue-600">
                  แนวกาญจนาภิเษก – กัลปพฤกษ์ – บางบอน – เคหะธนบุรี
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["กาญจนาภิเษก", "กัลปพฤกษ์", "แยกบางบอน", "เคหะธนบุรี", "พระราม 2"].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div>
                    <strong className="text-slate-800 block mb-0.5">ความเหมาะสมของบริการ:</strong>
                    เหมาะสำหรับงานย้ายบ้านเดี่ยว ทาวน์โฮมโครงการจัดสรร ขนส่งสินค้าโรงงาน/ค้าส่ง และขนส่งมอเตอร์ไซค์บิ๊กไบค์
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">การเชื่อมต่อเส้นทาง:</strong>
                    ถนนวงแหวนกาญจนาภิเษก เชื่อมต่อโซนบางแค บางบอน มุ่งหน้าพระราม 2 ออกสู่สมุทรสาคร นครปฐม และนนทบุรี
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">ปัจจัยราคา:</strong>
                    ประเมินราคาตามจุดรับ-ส่งและอุปกรณ์ป้องกันสัมภาระอย่างโปร่งใส
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">การเตรียมตัวของลูกค้า:</strong>
                    เตรียมรายการสิ่งของชิ้นใหญ่และแจ้งความต้องการพนักงานช่วยยกของล่วงหน้า
                  </div>
                </div>
              </div>

              {/* Corridor 3 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-blue-300 transition-all">
                <h3 className="text-lg font-bold text-slate-900 mb-3 text-blue-600">
                  แนวราชพฤกษ์ – บรมราชชนนี – ปิ่นเกล้า
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["ราชพฤกษ์", "บรมราชชนนี", "ปิ่นเกล้า", "ตลิ่งชัน", "บางขุนนนท์"].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div>
                    <strong className="text-slate-800 block mb-0.5">ความเหมาะสมของบริการ:</strong>
                    เหมาะสำหรับงานย้ายบ้าน คอนโดมิเนียม และขนย้ายออฟฟิศ พร้อมอุปกรณ์สายรัดนิรภัยและแรปฟิล์มป้องกันรอยขีดข่วน
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">การเชื่อมต่อเส้นทาง:</strong>
                    ทางด่วนศรีรัช-วงแหวนรอบนอก และถนนบรมราชชนนี มุ่งหน้าสู่พุทธมณฑล ศาลายา และนครปฐม
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">ปัจจัยราคา:</strong>
                    คิดค่าบริการตามระยะทางจริงและจำนวนรอบที่วิ่ง ไม่มีบวกเพิ่มตามสภาพการจราจร
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">การเตรียมตัวของลูกค้า:</strong>
                    จัดเก็บของใช้ส่วนตัวและเอกสารสำคัญแยกไว้ก่อนเริ่มการขนย้าย
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      href="/areas/bkk-thonburi/pinklao"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>ดูข้อมูลรถรับจ้างปิ่นเกล้า–บรมราชชนนี</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contextual Links Card */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  สำรวจข้อมูลเจาะลึกเฉพาะเขตเพชรเกษม–บางแค และอัตราค่าบริการ
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  ดูรายละเอียดงานขนย้ายในเขตบางแค ตรวจสอบตารางราคา และชมผลงานจริง
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/areas/bkk-thonburi/bang-khae"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
                >
                  <span>ดูข้อมูลรถรับจ้างเพชรเกษม–บางแค พร้อมคนยก</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold transition-colors"
                >
                  <span>ตรวจสอบอัตราค่าบริการ</span>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold transition-colors"
                >
                  <span>ชมภาพผลงานจริง</span>
                </Link>
              </div>
            </div>
          </section>

          {/* District Architecture: Dual-Zone Sections */}
          <section className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                พื้นที่บริการ 15 เขตปกครองฝั่งธนบุรี
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                จำแนกตามโครงสร้างเขตการปกครองอย่างเป็นทางการของกรุงเทพมหานคร โดยเขตที่มีหลักฐานการปฏิบัติงานจริงและผลงานยืนยันแล้ว สามารถคลิกเพื่อดูข้อมูลเจาะลึกเฉพาะพื้นที่ได้ทันที
              </p>
            </div>

            {/* Zone 1: Southern Thonburi */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900">
                  กลุ่มเขตกรุงธนใต้ (Southern Thonburi — 7 เขต)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {southernDistricts.map((d) => {
                  const isPublished = isDistrictPageIndexable(d);
                  return (
                    <div
                      key={d.districtSlug}
                      className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between transition-all duration-200 ${
                        isPublished
                          ? "border-blue-300 ring-2 ring-blue-500/20 shadow-md bg-gradient-to-b from-white to-blue-50/20"
                          : "border-slate-200/90 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <h4 className="font-bold text-base text-slate-900">
                            เขต{d.districtThaiName}
                          </h4>
                          {isPublished ? (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-2xs">
                              เปิดหน้าบริการแล้ว
                            </span>
                          ) : (
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              พื้นที่พร้อมรับงาน
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 font-normal">
                          {d.directAnswer}
                        </p>

                        <div className="text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                          <span className="font-bold text-slate-800">ถนนและเส้นทางสำคัญ: </span>
                          <span className="text-slate-700">{d.travelCorridors.slice(0, 3).join(", ")}</span>
                        </div>
                      </div>

                      {isPublished ? (
                        <Link
                          href={`/areas/bkk-thonburi/${d.districtSlug}`}
                          className="mt-2 inline-flex items-center justify-between text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl transition-all shadow-xs group/btn"
                        >
                          <span>ดูข้อมูลและผลงานเขต{d.districtThaiName}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      ) : (
                        <a
                          href="https://line.me/ti/p/DtICkMaDet"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors min-h-[40px]"
                        >
                          <span>สอบถามคิวงานเขต{d.districtThaiName}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Zone 2: Northern Thonburi */}
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900">
                  กลุ่มเขตกรุงธนเหนือ (Northern Thonburi — 8 เขต)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {northernDistricts.map((d) => {
                  const isPublished = isDistrictPageIndexable(d);
                  return (
                    <div
                      key={d.districtSlug}
                      className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between transition-all duration-200 ${
                        isPublished
                          ? "border-blue-300 ring-2 ring-blue-500/20 shadow-md bg-gradient-to-b from-white to-blue-50/20"
                          : "border-slate-200/90 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <h4 className="font-bold text-base text-slate-900">
                            เขต{d.districtThaiName}
                          </h4>
                          {isPublished ? (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-2xs">
                              เปิดหน้าบริการแล้ว
                            </span>
                          ) : (
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              พื้นที่พร้อมรับงาน
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 font-normal">
                          {d.directAnswer}
                        </p>

                        <div className="text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                          <span className="font-bold text-slate-800">ถนนและเส้นทางสำคัญ: </span>
                          <span className="text-slate-700">{d.travelCorridors.slice(0, 3).join(", ")}</span>
                        </div>
                      </div>

                      {isPublished ? (
                        <Link
                          href={`/areas/bkk-thonburi/${d.districtSlug}`}
                          className="mt-2 inline-flex items-center justify-between text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl transition-all shadow-xs group/btn"
                        >
                          <span>ดูข้อมูลเขต{d.districtThaiName}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      ) : (
                        <a
                          href="https://line.me/ti/p/DtICkMaDet"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors min-h-[40px]"
                        >
                          <span>สอบถามคิวงานเขต{d.districtThaiName}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Fleet Specifications & Condo Access */}
          <section className="mb-20 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                มาตรฐานรถตู้ทึบและการเข้าถึงอาคารในฝั่งธนบุรี
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                การขนย้ายในฝั่งธนบุรีมีทั้งคอนโดมิเนียมสมัยใหม่และชุมชนตรอกซอยดั้งเดิม รถของ WMS ถูกออกแบบมาเพื่อตอบโจทย์ทั้งสองรูปแบบ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  ตู้ทึบหลังคาสูงปิดมิดชิด
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  โครงสร้างตู้ทึบหลังคาสูงปิดมิดชิด รองรับการจัดเรียงสัมภาระทรงสูงและสิ่งของชิ้นใหญ่ได้เต็มพื้นที่ (โปรดแจ้งรายละเอียดหน้างานเพื่อให้เจ้าหน้าที่ตรวจสอบรถและอุปกรณ์ที่เหมาะสม)
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  ตู้ทึบอลูมิเนียมมิดชิด
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ป้องกันทรัพย์สินจากน้ำฝน ละอองฝุ่น และแสงแดดระหว่างเดินทางอย่างปลอดภัย พร้อมประตูล็อกแน่นหนาลดความเสี่ยงของตกหล่น
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  คล่องตัวในตรอกซอยแคบ
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  รถกระบะตอนเดียวช่วงยาวมาตรฐาน เลี้ยวเข้าซอยย่อยและข้ามสะพานคลองในย่านชุมชนเมืองเก่าได้อย่างปลอดภัยโดยไม่กีดขวางการจราจร
                </p>
              </div>
            </div>
          </section>

          {/* 4-Step Booking Process */}
          <section className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                ขั้นตอนการจองรถรับจ้างฝั่งธนบุรี
              </h2>
              <p className="text-slate-600 text-sm">
                สะดวก โปร่งใส และรวดเร็ว ด้วยกระบวนการทำงาน 4 ขั้นตอนมาตรฐาน
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bookingSteps.map((b) => (
                <div key={b.step} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-2xs relative">
                  <span className="text-3xl font-black text-blue-600/20 absolute top-4 right-4">
                    {b.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center mb-4 border border-blue-200">
                    {b.step}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Factors (Factual, no unconfirmed numbers) */}
          <section className="mb-20 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                ปัจจัยการประเมินราคาที่เป็นธรรม
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                เรายึดมั่นในนโยบายราคาที่ตรงไปตรงมา โดยประเมินจากปัจจัยหน้างานจริงเพื่อให้ลูกค้าได้รับความคุ้มค่าสูงสุด
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                <h3 className="font-bold text-sm text-white mb-1">ระยะทางจริง</h3>
                <p className="text-xs text-slate-300">วัดจากจุดขึ้นของในฝั่งธนบุรีไปยังปลายทาง</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                <h3 className="font-bold text-sm text-white mb-1">ชั้นอาคารและลิฟต์</h3>
                <p className="text-xs text-slate-300">การมีลิฟต์ขนของหรือการยกขึ้นบันไดหลายชั้น</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                <h3 className="font-bold text-sm text-white mb-1">ทีมงานช่วยยกของ</h3>
                <p className="text-xs text-slate-300">เลือกจำนวนพนักงานให้พอดีกับปริมาณสัมภาระ</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                <h3 className="font-bold text-sm text-white mb-1">อุปกรณ์แพ็กเกจจิ้ง</h3>
                <p className="text-xs text-slate-300">บริการแรปฟิล์มและกล่องสำหรับสิ่งของแตกง่าย</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-300 hover:text-white underline underline-offset-4"
              >
                <span>ดูรายละเอียดนโยบายและตารางราคาอ้างอิงทั้งหมด</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Real Work & Portfolio Evidence */}
          <section className="mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  ภาพบันทึกผลงานจริงในฝั่งธนบุรี
                </h2>
                <p className="text-slate-500 text-sm">
                  บันทึกการส่งงานจริงของพนักงาน WMS TRANSPORT ในเขตฝั่งธนบุรี
                </p>
              </div>
              <Link
                href="/portfolio"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
              >
                <span>ดูคลังผลงานทั้งหมด</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
                <div className="relative w-full aspect-16/10">
                  <Image
                    src="/images/WM10.webp"
                    alt="ภาพตัวอย่างการขนย้ายสิ่งของด้วยรถกระบะตู้ทึบ WMS TRANSPORT"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                    ภาพประกอบการขนย้ายคอนโด
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mb-1">
                    การขนย้ายห้องพักและจัดเรียงสิ่งของ
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    แรปฟิล์มป้องกันเฟอร์นิเจอร์หลัก ขนของลงลิฟต์บริการ และนำขึ้นรถตู้ทึบที่จุดจอดเทียบโหลดสินค้าอย่างเป็นระบบ
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
                <div className="relative w-full aspect-16/10">
                  <Image
                    src="/images/WM11.webp"
                    alt="ภาพตัวอย่างการล็อกยึดรถมอเตอร์ไซค์ในตู้ทึบ WMS TRANSPORT"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                    ภาพประกอบการขนส่งมอเตอร์ไซค์
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mb-1">
                    การล็อกยึดรถมอเตอร์ไซค์ในตู้ทึบ
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใช้อุปกรณ์ยึดตรึงสิ่งของและล็อกล้อหน้าอย่างแน่นหนา ปลอดภัยไร้ริ้วรอยขูดขีดตลอดเส้นทาง
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quotation Preparation Guide */}
          <div className="mb-20 max-w-5xl mx-auto">
            <QuotationPreparationGuide pageContext="พื้นที่ฝั่งธนบุรี" />
          </div>

          {/* Visible FAQ Section */}
          <section className="mb-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                คำถามที่พบบ่อยเกี่ยวกับการขนย้ายฝั่งธนบุรี
              </h2>
              <p className="text-slate-500 text-sm">
                รวบรวมข้อสงสัยทั่วไปเกี่ยวกับการเข้าพื้นที่ กฎระเบียบนิติบุคคล และการเตรียมตัว
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
                  <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Conversion Banner */}
          <section className="bg-linear-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
              ต้องการย้ายบ้าน คอนโด หรือส่งของในฝั่งธนบุรี?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium">
              ทักแชทส่งรูปสิ่งของและพิกัดเพื่อรับการประเมินราคาตามจริง รวดเร็ว คุยง่าย พนักงานสุภาพพร้อมบริการ
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-xl font-bold text-base shadow-sm transition-all"
              >
                แอด LINE เพื่อปรึกษาฟรี
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl font-bold text-base transition-all font-mono"
              >
                โทร 061-240-2436
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
