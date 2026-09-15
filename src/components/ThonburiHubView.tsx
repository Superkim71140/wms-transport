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

export default function ThonburiHubView() {
  const northernDistricts = getThonburiDistrictsByZone("northern");
  const southernDistricts = getThonburiDistrictsByZone("southern");

  const faqs = [
    {
      q: "รถรับจ้างตู้ทึบ WMS สามารถเข้าลานจอดใต้อาคารคอนโดมิเนียมฝั่งธนบุรีได้หรือไม่?",
      a: "รถกระบะตู้ทึบของ WMS TRANSPORT มีความสูงภายในตู้ 2.1 เมตร สำหรับรองรับสิ่งของชิ้นใหญ่ การเข้าจอดเทียบขนย้ายแนะนำให้ประสานงานจุดโหลดของชั้นล่าง (Loading Bay) หรือลานจอดที่ไม่มีสิ่งกีดขวางความสูงกับนิติบุคคลของอาคาร"
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
              รถรับจ้างและบริการขนย้ายฝั่งธนบุรี
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-8">
              WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างขนย้ายครอบคลุม 15 เขตทั่วฝั่งธนบุรี ทั้งกลุ่มเขตกรุงธนเหนือและกรุงธนใต้ รองรับงานย้ายคอนโดมิเนียมตามแนวรถไฟฟ้า BTS สายสีลมและ MRT สายสีน้ำเงิน ย้ายทาวน์โฮม บ้านเดี่ยว ขนส่งมอเตอร์ไซค์ และขนส่งสินค้าโรงงาน ด้วยรถกระบะตู้ทึบความสูงภายใน 2.1 เมตร ขนย้ายสิ่งของมิดชิดปลอดภัย พร้อมทีมงานช่วยยกของ
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
                  <span>ดูรายละเอียด</span>
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
                    ขนส่งในตู้ทึบมิดชิด รัดตรึงด้วยสายรัด Ratchet Strap และล็อกล้อ ปลอดภัยจากแดด ฝน และริ้วรอย
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-blue-600 text-sm font-bold group-hover:gap-2.5 transition-all">
                  <span>ดูรายละเอียด</span>
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
                  <span>ดูรายละเอียด</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
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
                      className={`bg-white border rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all duration-200 ${
                        isPublished
                          ? "border-blue-200 hover:border-blue-400 hover:shadow-sm"
                          : "border-slate-200/80 bg-slate-50/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="font-bold text-base text-slate-900">
                            เขต{d.districtThaiName} ({d.districtSlug})
                          </h4>
                          {isPublished ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                              เปิดหน้าพื้นที่แล้ว
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                              ครอบคลุมบริการ
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                          {d.directAnswer}
                        </p>

                        <div className="text-[11px] text-slate-500 mb-4">
                          <span className="font-semibold text-slate-700">ถนนสำคัญ: </span>
                          <span>{d.travelCorridors.slice(0, 3).join(", ")}</span>
                        </div>
                      </div>

                      {isPublished ? (
                        <Link
                          href={`/areas/bkk-thonburi/${d.districtSlug}`}
                          className="mt-2 inline-flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                        >
                          <span>ดูข้อมูลและผลงานเขต{d.districtThaiName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <div className="mt-2 text-[11px] text-slate-500 bg-slate-100/70 px-3 py-2 rounded-lg flex items-center justify-between">
                          <span>พร้อมให้บริการ (สอบถามคิวงาน)</span>
                          <Phone className="w-3 h-3 text-slate-400" />
                        </div>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {northernDistricts.map((d) => {
                  const isPublished = isDistrictPageIndexable(d);
                  return (
                    <div
                      key={d.districtSlug}
                      className={`bg-white border rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all duration-200 ${
                        isPublished
                          ? "border-blue-200 hover:border-blue-400 hover:shadow-sm"
                          : "border-slate-200/80 bg-slate-50/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="font-bold text-sm text-slate-900">
                            เขต{d.districtThaiName}
                          </h4>
                          {isPublished ? (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              เปิดหน้าแล้ว
                            </span>
                          ) : (
                            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              ครอบคลุมบริการ
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                          {d.directAnswer}
                        </p>

                        <div className="text-[11px] text-slate-500 mb-3">
                          <span className="font-semibold text-slate-700">เส้นทาง: </span>
                          <span>{d.travelCorridors.slice(0, 2).join(", ")}</span>
                        </div>
                      </div>

                      {isPublished ? (
                        <Link
                          href={`/areas/bkk-thonburi/${d.districtSlug}`}
                          className="mt-2 inline-flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                        >
                          <span>ดูข้อมูลเขต{d.districtThaiName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <div className="mt-2 text-[11px] text-slate-500 bg-slate-100/70 px-2.5 py-1.5 rounded-lg flex items-center justify-between">
                          <span>พร้อมให้บริการ</span>
                          <Phone className="w-3 h-3 text-slate-400" />
                        </div>
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
                  2.1M
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  ความสูงภายในตู้ 2.1 เมตร
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ความจุภายในตู้สูง 2.1 เมตร รองรับการวางตู้เสื้อผ้าและที่นอน 6 ฟุตในแนวตั้ง ขนย้ายสิ่งของชิ้นใหญ่ได้เต็มพื้นที่
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
                    alt="ทีมงาน WMS ขนย้ายคอนโด High-rise เขตบางแค ฝั่งธนบุรี"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                    เขตบางแค · MRT หลักสอง
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mb-1">
                    เคสขนย้ายคอนโด 1 ห้องนอน ชั้น 18
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    แรปฟิล์มป้องกันเฟอร์นิเจอร์หลัก ขนของลงลิฟต์บริการ และนำขึ้นรถตู้ทึบความสูงภายในตู้ 2.1 ม. ที่จุดจอดโหลดสินค้าได้อย่างราบรื่น
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
                <div className="relative w-full aspect-16/10">
                  <Image
                    src="/images/WM11.webp"
                    alt="การจัดส่งรถมอเตอร์ไซค์บิ๊กไบค์ย่านปิ่นเกล้า เขตบางพลัด/บางกอกน้อย"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                    ย่านปิ่นเกล้า · บรมราชชนนี
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mb-1">
                    การล็อกยึดรถมอเตอร์ไซค์ในตู้ทึบ
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใช้สายรัด Ratchet Strap รัดตรึงตัวถังและล็อกล้อหน้าอย่างแน่นหนา ปลอดภัยไร้ริ้วรอยขูดขีดตลอดเส้นทาง
                  </p>
                </div>
              </div>
            </div>
          </section>

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
