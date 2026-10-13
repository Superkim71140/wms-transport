import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, Package, Truck, Users } from "lucide-react";
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
  title: "ราคาบริการย้ายบ้าน ย้ายคอนโด หอพัก และค่าจ้างคนช่วยยกของ | WMS TRANSPORT",
  description: "ค่าบริการขนย้ายบ้าน คอนโด อพาร์ทเม้นท์ และหอพักแบบละเอียด ประเมินราคาจริงตามปริมาณสิ่งของและชั้นอาคาร มีมาตรการดูแลความปลอดภัยทุกเที่ยว",
  alternates: {
    canonical: `${siteConfig.productionUrl}/pricing/moving`,
  },
};

export default function PricingMovingPage() {
  const movingPhotos: GalleryPhotoItem[] = [
    {
      src: "/images/WM15.webp",
      alt: "การจัดเรียงชั้นวางของ ตู้ลิ้นชัก และกล่องใส่ของในรถกระบะตู้ทึบ WMS",
      caption: "จัดวางสิ่งของและเฟอร์นิเจอร์หลักเต็มความจุตู้ทึบ 2.1 ม. ปิดมิดชิด ปลอดภัยจากสภาพอากาศ",
      tag: "ย้ายห้องพัก"
    },
    {
      src: "/images/WMS23-processed(lightpdf.com).webp",
      alt: "ตู้เย็น 2 ประตูขนาดใหญ่ ห่อฟิล์มยืดกันรอยขูดขีดอย่างแน่นหนาก่อนยกย้าย",
      caption: "ห่อหุ้มฟิล์มยืดกันกระแทกรอบตู้เย็น 2 ประตู ป้องกันรอยขูดขีดระหว่างยกและเคลื่อนย้าย",
      tag: "แพ็กแรปฟิล์ม"
    },
    {
      src: "/images/WM16.webp",
      alt: "งานขนย้ายห้องพักที่มีทั้งกล่องสัมภาระ กระเป๋าเดินทาง และรถมอเตอร์ไซค์ในเที่ยวเดียว",
      caption: "จัดเรียงสัมภาระ กล่องเก็บของ และมอเตอร์ไซค์คู่ใจในเที่ยวเดียว ช่วยประหยัดค่าใช้จ่าย",
      tag: "ย้ายห้องชุด"
    },
    {
      src: "/images/WM10.webp",
      alt: "การรัดยึดสัมภาระขนาดใหญ่ด้วยสายรัดนิรภัยภายในตู้ทึบ WMS",
      caption: "ใช้อุปกรณ์สายรัดนิรภัยล็อกสิ่งของขนาดใหญ่เข้ากับโครงสร้างตู้ ป้องกันการเลื่อนล้มขณะขับขี่",
      tag: "ล็อกตรึงแน่นหนา"
    }
  ];

  const quotationSteps: ChecklistStep[] = [
    {
      step: "01",
      title: "พิกัดและระยะทาง",
      desc: "ระบุพิกัดต้นทางและปลายทาง (เช่น เขต/อำเภอ หรือชื่อโครงการ) เพื่อประเมินระยะทางที่แม่นยำ"
    },
    {
      step: "02",
      title: "ประเภทอาคารและชั้น",
      desc: "ระบุว่าเป็นคอนโด ทาวน์โฮม หรืออพาร์ทเม้นท์ ชั้นใด มีลิฟต์ขนของหรือต้องเดินบันไดกี่ชั้น"
    },
    {
      step: "03",
      title: "รายการของชิ้นใหญ่",
      desc: "ถ่ายรูปหรือลิสต์ของชิ้นใหญ่ เช่น ที่นอน 5-6 ฟุต, ตู้เย็น, เครื่องซักผ้า, โซฟา เพื่อคำนวณพื้นที่ตู้"
    },
    {
      step: "04",
      title: "จำนวนผู้ช่วยยก",
      desc: "แจ้งว่าต้องการคนช่วยยกเพิ่มกี่ท่าน หรือมีคนช่วยยกเอง เพื่อจัดสรรทีมงานให้พอดีหน้างาน"
    }
  ];

  const movingFaqs: FAQItem[] = [
    {
      question: "รถกระบะตู้ทึบ WMS สามารถเข้าลานจอดรถใต้ดินของคอนโดได้หรือไม่?",
      answer: "ความสูงภายในตู้บรรทุกคือ 2.10 เมตร แต่ความสูงรวมตัวรถภายนอกจากพื้นถึงหลังคาตู้จะอยู่ที่ประมาณ 2.70 - 2.85 เมตร (ขึ้นอยู่กับแชสซีส์และแหนบ) จึงไม่สามารถเข้าลานจอดใต้อาคารที่มีคานกั้นความสูง 2.1 - 2.5 ม. ได้ ทางเราแนะนำให้เทียบจอดจุด Loading Bay หรือพื้นที่ขนถ่ายสินค้าชั้นล่างของอาคารครับ"
    },
    {
      question: "มีคิดค่าบริการพนักงานช่วยยกของอย่างไร?",
      answer: "ราคาเริ่มต้นรวมพนักงานขับรถช่วยจัดเรียงและประคองของท้ายตู้แล้ว หากลูกค้าต้องการพนักงานช่วยยกของเสริมแบกขึ้นห้อง สามารถแจ้งความต้องการได้ โดยค่าบริการจะประเมินตามจริงจากปริมาณสิ่งของ จำนวนชั้น และการมีลิฟต์ แจ้งยอดรวมชัดเจนก่อนเริ่มงาน ไม่มีเก็บเพิ่มหน้างาน"
    },
    {
      question: "กรณีไม่มีลิฟต์และต้องเดินบันได มีค่าใช้จ่ายเพิ่มไหม?",
      answer: "กรณีอาคารที่ไม่มีลิฟต์และต้องแบกหามขึ้นบันไดหลายชั้น (ตั้งแต่ชั้น 3 ขึ้นไป) หรือบันไดแคบ จะมีค่าบริการแรงงานเพิ่มตามความเหมาะสมของจำนวนชั้นและน้ำหนักของชิ้นใหญ่ ทางเราแนะนำให้ถ่ายรูปบันไดและแจ้งชั้นล่วงหน้าเพื่อให้ประเมินราคาล่วงหน้าได้ถูกต้องครับ"
    },
    {
      question: "ถ้าฝนตกหนัก สิ่งของในตู้จะเปียกเสียหายหรือไม่?",
      answer: "ตู้บรรทุกของ WMS เป็นตู้อลูมิเนียมทึบมาตรฐาน มีขอบยางซีลรอบประตู ปิดล็อกมิดชิด ป้องกันน้ำฝน ฝุ่นละออง และแสงแดดได้ 100% เฟอร์นิเจอร์ เครื่องใช้ไฟฟ้า และกล่องกระดาษจะปลอดภัยตลอดเส้นทางครับ"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900 pb-28 md:pb-16">
      <main className="grow relative pt-8 sm:pt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-4">
            <Breadcrumbs items={getPricingBreadcrumbs("ย้ายบ้านและคอนโด", "moving")} />
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
                MOVING SERVICE PRICING
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-snug sm:leading-tight mb-4">
                ราคาบริการย้ายบ้าน ย้ายคอนโด และหอพัก
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                รถกระบะตอนเดียวตู้ทึบ ความสูงภายใน 2.1 เมตร จุของได้มากถึง 7.62 ลูกบาศก์เมตร (CBM) <br className="hidden sm:inline" />
                ขนของมิดชิดกันฝน 100% ประเมินราคาจริงใจตามระยะทางและเงื่อนไขหน้างาน
              </p>
            </div>

            {/* Person-holding-WMS-boxes Brand Section directly below H1 */}
            <PricingHeroBrandBanner />
          </section>

          {/* 2. Verified Starting Price Card & 4. Included/Excluded Comparison */}
          <PricingPriceCard
            startingPrice={1500}
            priceHeadline="ราคาประเมินเริ่มต้นสำหรับย้ายหอพัก / สตูดิโอขนาดเล็ก"
            eligibilityNote="สำหรับห้องขนาดเล็ก ปริมาตรสิ่งของไม่เกิน 4 ลูกบาศก์เมตร ในระยะทางใกล้ (ไม่เกิน 15 กม.) จุดจอดเทียบรถเดินเท้าสะดวก"
            volumeNote="คำชี้แจง: ปริมาตรสิ่งของวัดเป็นลูกบาศก์เมตร (คิว / CBM) แยกจากน้ำหนักบรรทุก โดยรถตู้ทึบมีความจุภายใน 7.62 ลบ.ม. และรับน้ำหนักปลอดภัยสูงสุด 1,800–2,200 กก."
            lastReviewedDate="มิถุนายน 2569"
            includedItems={[
              "รถกระบะตอนเดียวตู้ทึบ ความสูงตู้ภายใน 2.10 เมตร ความยาวตู้ 2.20 เมตร 1 คัน",
              "น้ำมันเชื้อเพลิงสำหรับการขับขี่ตลอดเส้นทางที่ตกลง",
              "พนักงานขับรถช่วยจัดเรียงและประคองของท้ายตู้",
              "ฟรีบริการแรปฟิล์มยืดป้องกันฝุ่นและริ้วรอยชิ้นใหญ่ 1-2 ชิ้น",
              "มาตรการดูแลความปลอดภัยของสิ่งของตลอดการเดินทาง"
            ]}
            excludedItems={[
              "พนักงานช่วยยกของเสริม (ประเมินตามปริมาณงานและจำนวนแรงงานที่ต้องการ)",
              "การแบกหามขึ้นชั้นสูงที่ไม่มีลิฟต์ (ตั้งแต่ชั้น 3 ขึ้นไป หรือบันไดวนแคบ)",
              "ระยะทางเดินราบจากจุดจอดเทียบรถถึงหน้าประตูห้องเกินระยะปกติ (เกิน 15-20 ม.)",
              "บริการถอดประกอบเฟอร์นิเจอร์ชิ้นซับซ้อน เช่น ตู้เสื้อผ้าบิวท์อิน เตียงลิ้นชัก",
              "กล่องกระดาษบรรจุของ แอร์บับเบิล หรือวัสดุแพ็กเกจจิ้งสั่งซื้อเพิ่มเติม"
            ]}
          />

          {/* 3. เหมาะกับงานแบบไหน (Who it suits) */}
          <section className="my-10 bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              บริการย้ายบ้าน WMS เหมาะกับงานแบบไหน?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6">
              ยกตัวอย่างลักษณะสิ่งของและขนาดที่พักที่ลูกค้านิยมเรียกใช้บริการเป็นประจำ
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>ย้ายหอพัก / อพาร์ทเม้นท์ / ห้องสตูดิโอ</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  เหมาะสำหรับของใช้ส่วนตัว 10-15 กล่อง, พัดลม, ตู้เย็นมินิบาร์, ราวตากผ้า, เสื้อผ้า และโต๊ะญี่ปุ่น สามารถขนย้ายหมดในเที่ยวเดียว
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Package className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>ย้ายคอนโดมิเนียม 1 ห้องนอน (1-Bedroom)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  ที่นอน 5-6 ฟุต, โซฟา 2 ที่นั่ง, ตู้เย็น 2 ประตู, เครื่องซักผ้า และกล่องสัมภาระ โดยความสูงตู้ 2.1 ม. รองรับตู้ทรงสูงได้สบาย
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>ย้ายทาวน์โฮม / บ้านเดี่ยว (เฉพาะชิ้นใหญ่หรือเหมาคัน)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  เหมาะสำหรับการขนย้ายเครื่องใช้ไฟฟ้าหลัก เฟอร์นิเจอร์ชิ้นสำคัญ หรือการย้ายบ้านแบบเหมาหลายรอบตามคิวงานที่กำหนด
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Users className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>ขนย้ายเฟอร์นิเจอร์ชิ้นใหญ่แยกเดี่ยว</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  ส่งโซฟาเบด, ส่งต่อตู้เสื้อผ้าสำเร็จรูป, ย้ายโต๊ะกินข้าวหินอ่อน หรือเครื่องออกกำลังกาย พร้อมทีมงานช่วยประคองยกอย่างระมัดระวัง
                </p>
              </div>
            </div>
          </section>

          {/* 5. Relevant Real Job Gallery */}
          <PricingGallery
            title="ผลงานจริงการขนย้ายบ้านและคอนโด"
            subtitle="ภาพถ่ายจริงจากหน้างาน บันทึกขั้นตอนการจัดวาง การแพ็กแรปฟิล์ม และการรัดตรึงทรัพย์สินอย่างปลอดภัย"
            photos={movingPhotos}
            caseStudyLink={{
              href: "/portfolio/moving-condo-bang-khae",
              text: "อ่านเคสตัวอย่างย้ายคอนโด High-rise บางแค"
            }}
          />

          {/* 6. Main Factors Affecting the Quotation */}
          <section className="my-8 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              ปัจจัยหลักที่มีผลต่อราคาประเมินงานย้ายบ้าน
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-5">
              เราประเมินราคาตามโครงสร้างต้นทุนจริง เพื่อความชัดเจนและไม่มีข้อพิพาทหน้างาน
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "1. ปริมาตรและขนาดสิ่งของ (คิว / CBM)",
                  desc: "ขนาดความจุสิ่งของโดยรวมและจำนวนเฟอร์นิเจอร์ชิ้นใหญ่ เพื่อประเมินว่ารถ 1 คันจุพอดีหรือไม่"
                },
                {
                  title: "2. ระยะทางวิ่งจริง (กิโลเมตร)",
                  desc: "คำนวณจากพิกัดต้นทางถึงปลายทางตามเส้นทางมาตรฐานขนส่ง"
                },
                {
                  title: "3. ระดับชั้นอาคารและลิฟต์ขนของ",
                  desc: "ชั้นสูงที่มีลิฟต์โดยสาร/ลิฟต์บริการจะสะดวกกว่าชั้นสูงที่ต้องเดินแบกขึ้นบันได"
                },
                {
                  title: "4. จำนวนพนักงานช่วยยกของ",
                  desc: "คนขับช่วยจัดท้ายตู้เป็นมาตรฐาน หากต้องการคนยกเพิ่ม 1-2 คน จะคำนวณตามปริมาณของหน้างาน"
                },
                {
                  title: "5. ระยะทางเดินราบจากจุดจอดถึงห้อง",
                  desc: "กรณีจุดจอดรถเทียบอยู่ห่างจากลิฟต์หรือประตูทางเข้าเกินระยะมาตรฐาน ต้องใช้เวลาและแรงงานเพิ่ม"
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
            title="เช็กลิสต์ข้อมูลที่ควรเตรียมเพื่อประเมินราคาย้ายบ้าน"
            subtitle="แจ้งข้อมูล 4 ข้อนี้ทาง LINE เพื่อให้เจ้าหน้าที่ออกราคาประเมินที่แม่นยำได้ทันที"
            steps={quotationSteps}
          />

          {/* Contextual Local Links */}
          <section className="my-8 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              พื้นที่ให้บริการขนย้ายยอดนิยม
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              หากท่านต้องการตรวจสอบจุดจอดเทียบรถ ระเบียบนิติบุคคลคอนโด และเส้นทางขนย้ายเฉพาะเขต:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/service/bkk-thonburi"
                className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl block transition-all group"
              >
                <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 mb-1">
                  บริการขนย้ายบ้านและคอนโดฝั่งธนบุรี
                </div>
                <div className="text-xs text-slate-500">
                  ครอบคลุม 15 เขต คอนโดแนวรถไฟฟ้า และการประสานงานนิติบุคคล
                </div>
              </Link>
              <Link
                href="/areas/bkk-thonburi/bang-khae"
                className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl block transition-all group"
              >
                <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 mb-1">
                  รถรับจ้างย้ายบ้านเพชรเกษม–บางแค
                </div>
                <div className="text-xs text-slate-500">
                  เจาะลึกจุดโหลดของ MRT หลักสอง พุทธมณฑลสาย 1–3 และตรอกซอยแคบ
                </div>
              </Link>
            </div>
          </section>

          {/* 8. Brief FAQ & Final Contact Section */}
          <PricingFAQ
            title="คำถามที่พบบ่อยเกี่ยวกับการย้ายบ้านและคอนโด"
            subtitle="ข้อสงสัยเรื่องความสูงรถ คนช่วยยก และสภาพอากาศ"
            faqs={movingFaqs}
          />

          {/* Bottom Conversion CTA */}
          <PricingBottomCTA
            title="ประเมินราคาย้ายบ้าน คอนโด หรือหอพักของคุณ"
            description="ส่งรูปถ่ายสิ่งของหรือแจ้งพิกัดรับส่งทาง LINE เพื่อรับราคาประเมินละเอียด ไม่ผูกมัด ไม่ชาร์จเพิ่มลึกลับ"
            serviceTag="บริการขนย้าย WMS TRANSPORT"
          />

        </div>
      </main>

      <InternalLinks currentCategory="pricing" currentSlug="moving" />
      <PricingMobileBottomBar serviceLabel="บริการย้ายบ้าน" />
    </div>
  );
}
