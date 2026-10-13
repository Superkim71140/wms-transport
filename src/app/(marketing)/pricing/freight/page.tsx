import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Factory, PackageCheck, Truck, FileCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import { getPricingBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { siteConfig } from "@/lib/seo/site-config";
import PricingHeroBrandBanner from "@/components/pricing/PricingHeroBrandBanner";
import PricingPriceCard from "@/components/pricing/PricingPriceCard";
import PricingGallery, { GalleryPhotoItem } from "@/components/pricing/PricingGallery";
import PricingChecklist, { ChecklistStep } from "@/components/pricing/PricingChecklist";
import PricingFAQ, { FAQItem } from "@/components/pricing/PricingFAQ";
import PricingBottomCTA from "@/components/pricing/PricingBottomCTA";
import PricingMobileBottomBar from "@/components/pricing/PricingMobileBottomBar";

export const metadata: Metadata = {
  title: "ราคาเหมารถกระบะตู้ทึบขนส่งสินค้าทั่วไทย | WMS TRANSPORT",
  description: "ตารางราคาบริการขนส่งสินค้าโรงงานและกระจายสินค้าเชิงพาณิชย์แบบเหมาเที่ยวทั่วไทย คิดตามจริงพร้อมเอกสารประกอบครบถ้วนพร้อมมาตรการดูแลความปลอดภัย",
  alternates: {
    canonical: `${siteConfig.productionUrl}/pricing/freight`,
  },
};

export default function PricingFreightPage() {
  const freightPhotos: GalleryPhotoItem[] = [
    {
      src: "/images/WM14.webp",
      alt: "รถกระบะตอนเดียวตู้ทึบ WMS บรรทุกถังสีและกระสอบสินค้าอุตสาหกรรมเต็มตู้",
      caption: "เหมารถกระบะตอนเดียวตู้ทึบ ขนส่งถังสีและสินค้าอุตสาหกรรม วางเต็มความจุตู้พร้อมสายรัดอย่างปลอดภัย",
      tag: "ขนส่งถังสี/โรงงาน"
    },
    {
      src: "/images/WM17.webp",
      alt: "รถบรรทุกตู้ทึบขนาด 6 ล้อ รับสินค้ากล่องบรรจุภัณฑ์ ณ จุดโหลดสินค้าโรงงาน",
      caption: "รถบรรทุกตู้ทึบขนาดใหญ่ รับกล่องบรรจุภัณฑ์ ณ จุดโหลดสินค้า (Loading Dock) ในนิคมอุตสาหกรรม",
      tag: "โหลดสินค้าคลัง"
    },
    {
      src: "/images/WM11.webp",
      alt: "รถกระบะตู้ทึบ WMS พร้อมขนส่งสินค้าทั่วประเทศ ปิดตู้มิดชิดกันฝน",
      caption: "รถกระบะตู้ทึบโครงสร้างมาตรฐาน WMS ปิดล็อกมิดชิด ป้องกันน้ำฝนและฝุ่นละออง 100% ตลอดการขนส่ง",
      tag: "ตู้ทึบกันฝน 100%"
    },
    {
      src: "/images/WM8.webp",
      alt: "การจัดเตรียมพื้นที่ท้ายรถตู้ทึบ WMS พร้อมอุปกรณ์คลุมผ้าใบและรัดตรึงสินค้า",
      caption: "จัดวางสัมภาระและสินค้าในตู้ทึบอย่างเป็นสัดส่วน พร้อมผ้าใบและอุปกรณ์รัดตรึงป้องกันการเคลื่อนที่",
      tag: "จัดวางเป็นสัดส่วน"
    }
  ];

  const quotationSteps: ChecklistStep[] = [
    {
      step: "01",
      title: "ประเภทสินค้าและบรรจุภัณฑ์",
      desc: "ระบุประเภทสินค้า ลักษณะบรรจุภัณฑ์ (เช่น กล่องกระดาษ, พาเลท, ลังไม้, หรือถังเคมีภัณฑ์ไม่ไวไฟ)"
    },
    {
      step: "02",
      title: "ขนาดมิติและน้ำหนักรวม",
      desc: "ระบุกว้าง x ยาว x สูง (ซม./ม.) และน้ำหนักสินค้ารวมโดยประมาณ (กก.) เพื่อเลือกประเภทรถที่เหมาะสม"
    },
    {
      step: "03",
      title: "จุดรับ-ส่ง และจุดแวะพัก",
      desc: "ระบุพิกัดคลังต้นทาง ปลายทาง และจำนวนจุดแวะพักรับหรือส่งสินค้าเพิ่มเติม (Multiple Drops) ถ้ามี"
    },
    {
      step: "04",
      title: "อุปกรณ์โหลดของและเอกสาร",
      desc: "แจ้งว่ามีโฟล์กลิฟต์โหลดของหรือไม่ ต้องการคนยกของเสริม หรือต้องการเอกสารใบเสร็จในนามนิติบุคคล"
    }
  ];

  const freightFaqs: FAQItem[] = [
    {
      question: "รถกระบะตอนเดียวตู้ทึบ WMS สามารถรับน้ำหนักและปริมาตรได้เท่าไร?",
      answer: "ความจุภายในตู้คือ กว้าง 1.65 ม. x ยาว 2.20 ม. x สูง 2.10 ม. ปริมาตรรวม 7.62 ลูกบาศก์เมตร (CBM) และสามารถรับน้ำหนักบรรทุกปลอดภัยตามมาตรฐานของ WMS สูงสุดประมาณ 1,800 - 2,200 กิโลกรัม ขึ้นอยู่กับลักษณะการกระจายน้ำหนักของสินค้า"
    },
    {
      question: "สินค้าที่วางบนพาเลท สามารถใช้รถโฟล์กลิฟต์ยกใส่ท้ายตู้ได้ไหม?",
      answer: "สามารถใช้รถโฟล์กลิฟต์ยกพาเลทมาตรฐานเสียบวางท้ายตู้ได้ครับ โดยประตูตู้เปิดกว้าง 1.65 เมตร และพื้นตู้เรียบแข็งแรง รองรับการดันพาเลทเข้าสู่ด้านในตู้ได้อย่างสะดวก"
    },
    {
      question: "สามารถออกใบเสร็จรับเงินหรือเอกสารสำหรับนิติบุคคลได้หรือไม่?",
      answer: "WMS มีใบเสร็จรับเงินและใบส่งสินค้าแสดงรายการขนส่งและยืนยันการรับชำระเงินที่สามารถใช้เป็นหลักฐานทางการเงินได้ หากฝ่ายจัดซื้อหรือแผนกบัญชีต้องการข้อมูลนิติบุคคลเพิ่มเติม สามารถสอบถามเจ้าหน้าที่ขณะขอใบเสนอราคาได้ครับ"
    },
    {
      question: "สินค้าจะถูกนำไปรวมเที่ยวกับลูกค้ารายอื่นหรือไม่?",
      answer: "ไม่ปะปนแน่นอนครับ บริการขนส่งสินค้า WMS เป็นการเหมารอบเฉพาะคัน (Dedicated Truckload) สินค้าในตู้เป็นของท่านเพียงรายเดียว วิ่งตรงจากจุดรับถึงจุดส่งทันที ไม่มีการแวะถ่ายของหรือรวมเที่ยวกับลูกค้ารายอื่น"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900 pb-28 md:pb-16">
      <main className="grow relative pt-8 sm:pt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-4">
            <Breadcrumbs items={getPricingBreadcrumbs("เหมารถตู้ทึบขนส่งสินค้า", "freight")} />
          </div>

          <div className="mb-6">
            <Link 
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>กลับหน้าอัตราค่าบริการรวม</span>
            </Link>
          </div>

          {/* 1. Hero Section */}
          <section className="pt-2 pb-4">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
                FREIGHT SERVICE PRICING
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-snug sm:leading-tight mb-4">
                ราคาเหมารถกระบะตู้ทึบขนส่งสินค้าทั่วไทย
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                บริการเหมารถกระบะตอนเดียวตู้ทึบ ความจุ 7.62 ลบ.ม. ส่งสินค้าโรงงาน คลังสินค้า และเชิงพาณิชย์ <br className="hidden sm:inline" />
                วิ่งตรงถึงปลายทาง ไม่ปะปนสินค้าอื่น พร้อมเอกสารหลักฐานครบถ้วน
              </p>
            </div>

            {/* Person-holding-WMS-boxes Brand Section directly below H1 */}
            <PricingHeroBrandBanner />
          </section>

          {/* 2. Verified Starting Price Card & 4. Included/Excluded Comparison */}
          <PricingPriceCard
            startingPrice={1000}
            priceHeadline="อัตราค่าบริการเหมารายเที่ยวเริ่มต้น (ระยะใกล้)"
            eligibilityNote="สำหรับงานเหมารถกระบะตู้ทึบส่งสินค้ารายเที่ยวระยะใกล้ (จุดรับ-ส่งเดียวในพื้นที่ใกล้เคียง) สินค้าแพ็กบรรจุกล่องหรือวางพาเลทพร้อมโหลด"
            volumeNote="คำชี้แจง: รถกระบะตู้ทึบมีความจุภายใน 7.62 ลูกบาศก์เมตร (CBM) รับน้ำหนักบรรทุกปลอดภัยสูงสุด 1,800–2,200 กก. โดยงานระยะไกล (300 กม. ขึ้นไป) ราคาคิดเริ่มต้นที่กิโลเมตรละ 16 บาท"
            lastReviewedDate="มิถุนายน 2569"
            includedItems={[
              "รถกระบะตอนเดียวตู้ทึบอลูมิเนียมความจุ 7.62 ลูกบาศก์เมตร (CBM) 1 คัน",
              "พนักงานขับรถควบคุมการขับขี่มาตรฐาน WMS (ตรวจสอบประวัติและความพร้อม)",
              "น้ำมันเชื้อเพลิงสำหรับการขับขี่ตลอดเส้นทางที่ตกลง",
              "ใบเสร็จรับเงินยืนยันการชำระเงินสำหรับใช้เป็นหลักฐานทางบัญชี",
              "มาตรการดูแลความปลอดภัยของสินค้าตลอดการเดินทาง"
            ]}
            excludedItems={[
              "ค่าแรงพนักงานยกของขึ้นและลงสินค้า ณ จุดรับส่ง (หากต้องการโปรดแจ้งล่วงหน้า)",
              "ค่าผ่านทางด่วนพิเศษ หรือค่าธรรมเนียมเข้าจอดของคลังสินค้าเอกชน (คิดตามจริง)",
              "จุดแวะพักรับหรือส่งสินค้าเพิ่มเติม (Multiple Drops คิดเพิ่มจุดละ 200-300 บาท)",
              "ระยะเวลารอโหลดของเกิน 2 ชั่วโมง ณ หน้างาน (คิดค่าเสียเวลาชั่วโมงละ 150 บาท)",
              "บริการตีลังไม้หรือการแพ็กเกจจิ้งสินค้าหน้างาน (สินค้าต้องแพ็กเสร็จก่อนรถเข้าถึง)"
            ]}
          />

          {/* 3. เหมาะกับงานแบบไหน (Who it suits) */}
          <section className="my-10 bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              บริการเหมารถส่งสินค้า WMS เหมาะกับงานแบบไหน?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6">
              รองรับทั้งงานโรงงานอุตสาหกรรม คลังสินค้า และธุรกิจร้านค้าทั่วไป
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Factory className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>สินค้าโรงงานและนิคมอุตสาหกรรม</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  ถังสี, กระสอบเม็ดพลาสติก, อะไหล่เครื่องจักร, บรรจุภัณฑ์ และสินค้าชิ้นส่วนประกอบ วิ่งรับส่งระหว่างโรงงาน
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <PackageCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>กระจายสินค้าระหว่างคลัง-สาขา (Cross-docking)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  รับสินค้าจากคลังสินค้าหลัก (เช่น มหาชัย, บางนา, วังน้อย) ไปส่งมอบยังศูนย์กระจายสินค้าหรือหน้าร้านสาขา
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>งานเหมาคันด่วน ส่งตรงจุดเดียว (Direct Charter)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  ต้องการส่งของด่วนถึงลูกค้าปลายทางทันทีโดยไม่รอรอบรวมเที่ยว ป้องกันสินค้าสูญหายและลดความล่าช้า
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>สินค้าพาณิชย์และจัดบูธนิทรรศการ</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  ขนส่งอุปกรณ์จัดแสดงสินค้า โครงสร้างบูธ ป้ายโฆษณา และสินค้าพร้อมจำหน่ายในงานอีเวนต์
                </p>
              </div>
            </div>
          </section>

          {/* 5. Relevant Real Job Gallery */}
          <PricingGallery
            title="ผลงานจริงการเหมารถกระบะตู้ทึบขนส่งสินค้า"
            subtitle="ภาพถ่ายจริงจากหน้างานโรงงานและคลังสินค้า ยืนยันการจัดเรียงสินค้าเต็มตู้และการดูแลความปลอดภัย"
            photos={freightPhotos}
            caseStudyLink={{
              href: "/portfolio/freight-delivery-maha-chai",
              text: "อ่านเคสตัวอย่างเหมาตู้ทึบกระจายสินค้าโรงงานมหาชัย"
            }}
          />

          {/* 6. Main Factors Affecting the Quotation */}
          <section className="my-8 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              ปัจจัยหลักที่มีผลต่อราคาขนส่งสินค้าเชิงพาณิชย์
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-5">
              เราคำนวณตามข้อมูลจริงของสินค้าและเส้นทาง เพื่อให้ฝ่ายจัดซื้อเปรียบเทียบราคาได้อย่างโปร่งใส
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "1. ปริมาตร (CBM) และน้ำหนักรวม (กก.)",
                  desc: "ตรวจสอบว่าสินค้าอยู่ในเกณฑ์ความจุตู้ 7.62 ลบ.ม. และน้ำหนักไม่เกิน 1,800–2,200 กก. หรือไม่"
                },
                {
                  title: "2. ระยะทางระหว่างจุดรับและจุดส่งจริง",
                  desc: "คำนวณระยะทางจากหน้าโรงงานถึงคลังปลายทาง โดยงานระยะไกลมีอัตราเฉลี่ยกิโลเมตรละ 16 บาท"
                },
                {
                  title: "3. จำนวนจุดแวะพักรับหรือส่งของ (Drops)",
                  desc: "กรณีต้องแวะส่งหลายจุด คิดค่าบริการเพิ่มตามจำนวนจุดแวะพัก (จุดละ 200-300 บาท)"
                },
                {
                  title: "4. ความพร้อมในการโหลดสินค้าหน้างาน",
                  desc: "มีเจ้าหน้าที่คลังหรือรถโฟล์กลิฟต์เตรียมพร้อม หรือต้องการให้ทีมงานช่วยยกโหลดขึ้น-ลง"
                },
                {
                  title: "5. ระยะเวลารอคิวหน้าคลัง",
                  desc: "เวลารอโหลดของมาตรฐานไม่เกิน 2 ชั่วโมง หากเกินกว่านั้นคิดค่าเสียเวลาตามจริงชั่วโมงละ 150 บาท"
                }
              ].map((item, i) => (
                <div key={i} className="p-3.5 bg-slate-50/70 border border-slate-200/60 rounded-xl">
                  <div className="font-bold text-sm sm:text-base text-slate-900 mb-1">{item.title}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Simple Quotation Checklist */}
          <PricingChecklist
            title="เช็กลิสต์ข้อมูลที่ควรเตรียมเพื่อขอใบเสนอราคาขนส่งสินค้า"
            subtitle="แจ้งข้อมูล 4 ข้อนี้ทาง LINE เพื่อให้เจ้าหน้าที่ออกใบเสนอราคาอย่างรวดเร็วและเป็นทางการ"
            steps={quotationSteps}
          />

          {/* Contextual Local Links */}
          <section className="my-8 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              พื้นที่ศูนย์กลางขนส่งสินค้ายอดนิยม
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              ตรวจสอบจุดรับส่ง โกดัง นิคมอุตสาหกรรม และเส้นทางขนส่งสินค้าเฉพาะพื้นที่:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/service/samutsakhon"
                className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl block transition-all group"
              >
                <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 mb-1">
                  บริการขนส่งสินค้าโรงงานสมุทรสาคร
                </div>
                <div className="text-xs text-slate-500">
                  แกนถนนพระราม 2 เชื่อมต่อกรุงเทพฯ ปริมณฑล และภาคใต้
                </div>
              </Link>
              <Link
                href="/areas/samutsakhon/maha-chai"
                className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl block transition-all group"
              >
                <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 mb-1">
                  รถรับจ้างขนส่งสินค้ามหาชัย–พระราม 2
                </div>
                <div className="text-xs text-slate-500">
                  เจาะลึกนิคมอุตสาหกรรมสมุทรสาคร สินสาคร ตลาดมหาชัย และกระทุ่มแบน
                </div>
              </Link>
            </div>
          </section>

          {/* 8. Brief FAQ & Final Contact Section */}
          <PricingFAQ
            title="คำถามที่พบบ่อยเกี่ยวกับการเหมารถขนส่งสินค้า"
            subtitle="ข้อสงสัยเรื่องน้ำหนักบรรทุก พาเลท และเอกสารทางธุรกิจ"
            faqs={freightFaqs}
          />

          {/* Bottom Conversion CTA */}
          <PricingBottomCTA
            title="ขอใบเสนอราคาขนส่งสินค้าอุตสาหกรรม"
            description="แจ้งรายการสินค้า น้ำหนักรวม จุดแวะพัก และวันเวลาโหลดงาน เพื่อรับราคาประเมินและเอกสารเสนอราคาเชิงพาณิชย์"
            serviceTag="บริการเหมารถส่งสินค้า WMS TRANSPORT"
          />

        </div>
      </main>

      <InternalLinks currentCategory="pricing" currentSlug="freight" />
      <PricingMobileBottomBar serviceLabel="บริการขนส่งสินค้า" />
    </div>
  );
}
