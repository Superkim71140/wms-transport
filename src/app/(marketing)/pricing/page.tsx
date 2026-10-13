import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPricingBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { siteConfig } from "@/lib/seo/site-config";
import PricingHeroBrandBanner from "@/components/pricing/PricingHeroBrandBanner";
import PricingServiceCard, { PricingServiceCardData } from "@/components/pricing/PricingServiceCard";
import PricingComparisonTable from "@/components/pricing/PricingComparisonTable";
import PricingChecklist from "@/components/pricing/PricingChecklist";
import PricingBottomCTA from "@/components/pricing/PricingBottomCTA";
import PricingMobileBottomBar from "@/components/pricing/PricingMobileBottomBar";

export const metadata: Metadata = {
  title: "ราคารถรับจ้างตู้ทึบ ค่าขนส่งมอเตอร์ไซค์และย้ายบ้านคอนโด | WMS TRANSPORT",
  description: "เช็กอัตราค่าบริการรถกระบะตู้ทึบรับจ้าง ย้ายหอพัก คอนโด และขนส่งมอเตอร์ไซค์ ราคาประเมินตามระยะทางจริง โปร่งใสไม่มีค่าใช้จ่ายบวกเพิ่มลึกลับ",
  alternates: {
    canonical: `${siteConfig.productionUrl}/pricing`,
  },
};

export default function PricingParentHubPage() {
  const serviceCards: PricingServiceCardData[] = [
    {
      title: "บริการย้ายบ้าน / คอนโด / หอพัก",
      badge: "ย้ายที่พักอาศัย",
      photoUrl: "/images/WM15.webp",
      photoAlt: "งานขนย้ายบ้านและห้องพัก จัดวางตู้ ชั้นไม้ และกล่องในรถกระบะตู้ทึบ WMS",
      photoCaption: "จัดเรียงสิ่งของและสัมภาระในตู้ทึบอย่างเป็นระเบียบ ปิดมิดชิดกันฝน",
      suitableFor: [
        "ย้ายห้องสตูดิโอ หอพักนักศึกษา อพาร์ทเม้นท์",
        "ย้ายคอนโด 1 ห้องนอน พร้อมที่นอนและตู้เย็น",
        "ขนย้ายเฟอร์นิเจอร์ชิ้นใหญ่ โซฟา โต๊ะทำงาน",
        "ขนย้ายบ้าน ทาวน์โฮม บางส่วนหรือเหมาคัน"
      ],
      startingPrice: 1500,
      priceNote: "สำหรับห้องสตูดิโอขนาดเล็ก ปริมาตรสิ่งของไม่เกิน 4 ลบ.ม. ระยะทางใกล้ รวมคนขับช่วยจัดของท้ายตู้ + ฟรีแรปชิ้นใหญ่ 1-2 ชิ้น",
      href: "/pricing/moving",
      highlightPoints: [
        "ตู้ทึบสูง 2.1 ม. จุสิ่งของได้ถึง 7.62 ลบ.ม.",
        "มีบริการพนักงานช่วยยกของเสริมตามต้องการ",
        "ประเมินตามระยะทางและระดับชั้นอาคารจริง"
      ]
    },
    {
      title: "บริการขนส่งมอเตอร์ไซค์ / บิ๊กไบค์",
      badge: "ขนส่งมอเตอร์ไซค์ทั่วไทย",
      photoUrl: "/images/WMS6.webp",
      photoAlt: "การรัดยึดรถมอเตอร์ไซค์ Vespa ในรถตู้ทึบ WMS ด้วยสายรัด 4 จุด",
      photoCaption: "รัดยึดแน่นหนา 4 ทิศทาง พร้อมแท่นล็อกล้อ Wheel Chock",
      suitableFor: [
        "รถมอเตอร์ไซค์ทั่วไป 100cc-125cc (Wave, Scoopy, Click)",
        "รถออโตเมติกขนาดกลาง 150cc-350cc (PCX, ADV, Forza)",
        "รถบิ๊กไบค์และทัวร์ริ่ง 400cc+ (Ninja, CB500, Harley)",
        "ขนส่งข้ามจังหวัด ย้ายกลับภูมิลำเนา หรือส่งมอบรถ"
      ],
      startingPrice: 1000,
      priceNote: "สำหรับรถขนาดเล็กทั่วไป 100cc–125cc ราคาขึ้นอยู่กับรุ่นรถ ระยะทาง และจุดรับ–ส่ง กรุณาสอบถามราคาก่อนจอง",
      href: "/pricing/motorcycle-transport",
      highlightPoints: [
        "รถตู้ทึบปิดมิดชิด ป้องกันหินกระเด็น แดด และฝน 100%",
        "มีทางลาดอะลูมิเนียม (Ramp) เข็นขึ้น-ลงปลอดภัย",
        "บิ๊กไบค์ 400cc+ คิดตามขนาดเครื่องยนต์และน้ำหนักรถ"
      ]
    },
    {
      title: "บริการเหมารถกระบะตู้ทึบขนส่งสินค้า",
      badge: "ขนส่งสินค้าเชิงพาณิชย์",
      photoUrl: "/images/WM14.webp",
      photoAlt: "รถกระบะตอนเดียวตู้ทึบ WMS บรรทุกสินค้าโรงงานและถังสีเต็มคัน",
      photoCaption: "เหมารถขนส่งสินค้าอุตสาหกรรม วิ่งตรงไม่ปะปนกับผู้อื่น",
      suitableFor: [
        "สินค้าโรงงานอุตสาหกรรม ถังสี บรรจุภัณฑ์ อะไหล่",
        "สินค้าพาณิชย์ อีคอมเมิร์ซ ของใช้ทั่วไป กล่องพัสดุ",
        "กระจายสินค้าระหว่างคลัง-สาขา (มหาชัย, พระราม 2, ต่างจังหวัด)",
        "งานเหมาคันด่วน ส่งตรงถึงปลายทางไม่ต้องรอรอบ"
      ],
      startingPrice: 1000,
      priceNote: "สำหรับงานเหมารายเที่ยวระยะใกล้ จุดรับ-ส่งเดียว รถกระบะตู้ทึบจุ 7.62 ลบ.ม. น้ำหนักตามเกณฑ์ปลอดภัย ออกใบเสร็จได้",
      href: "/pricing/freight",
      highlightPoints: [
        "วิ่งตรงเฉพาะเที่ยวของท่าน ไม่ปะปนสินค้าอื่น",
        "ออกใบเสร็จรับเงิน / ใบส่งสินค้าเชิงพาณิชย์ได้",
        "คิดค่าเสียเวลาโหลดและจุดแวะเพิ่มตามจริง"
      ]
    }
  ];

  const quotationSteps = [
    {
      step: "ขั้นตอน 01",
      title: "แจ้งเส้นทางและกำหนดการ",
      desc: "ระบุพิกัดต้นทางและปลายทาง (เขต/อำเภอ/จังหวัด) พร้อมวันและเวลาที่ต้องการรับส่ง",
      detailPoints: ["ระบุจุดปักหมุดหรือชื่อซอย", "แจ้งช่วงเวลาเช้า/บ่าย/เย็น"]
    },
    {
      step: "ขั้นตอน 02",
      title: "ระบุสิ่งของหรือประเภทงาน",
      desc: "แจ้งประเภทงาน: ย้ายบ้าน, ส่งมอเตอร์ไซค์ (รุ่น/cc), หรือขนส่งสินค้า (ขนาด/น้ำหนัก)",
      detailPoints: ["ส่งรูปถ่ายของชิ้นใหญ่ทาง LINE", "ระบุจำนวนกล่องโดยประมาณ"]
    },
    {
      step: "ขั้นตอน 03",
      title: "แจ้งสภาพหน้างานและการยก",
      desc: "ระบุชั้นอาคาร มีลิฟต์หรือบันได และต้องการพนักงานช่วยยกของกี่ท่าน",
      detailPoints: ["แจ้งความกว้างของทางเดิน/บันได", "แจ้งระยะเดินราบจากจุดจอดเทียบ"]
    },
    {
      step: "ขั้นตอน 04",
      title: "รับใบเสนอราคาและล็อกคิว",
      desc: "เจ้าหน้าที่สรุปราคาประเมินตามจริง แจ้งยอดชัดเจน ไม่มีค่าใช้จ่ายบวกเพิ่มหน้างาน",
      detailPoints: ["ราคาโปร่งใส ตรวจสอบได้", "ล็อกคิวงานได้ทันทีเมื่อตกลง"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900 pb-28 md:pb-16">
      <main className="grow relative pt-8 sm:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-6">
            <Breadcrumbs items={getPricingBreadcrumbs()} />
          </div>

          {/* Hero Section */}
          <section className="pt-2 pb-4">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
                WMS TRANSPORT PRICING
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-snug sm:leading-tight mb-4">
                เลือกราคาบริการขนส่งที่เหมาะกับงานคุณ
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                รถกระบะตู้ทึบรับจ้างมาตรฐานสูง ย้ายบ้าน คอนโด ส่งมอเตอร์ไซค์ และขนส่งสินค้าโรงงาน <br className="hidden sm:inline" />
                ราคาโปร่งใส ประเมินตามระยะทางจริงและเงื่อนไขหน้างาน ไม่มีบวกเพิ่มลึกลับ
              </p>
            </div>

            {/* Person-holding-WMS-boxes Brand Section directly below H1 */}
            <PricingHeroBrandBanner />
          </section>

          {/* Three Photo-Led Service Cards */}
          <section className="my-8 sm:my-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  3 บริการขนส่งหลักของ WMS TRANSPORT
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  คลิกที่บริการเพื่อดูรายละเอียดสิ่งที่รวมในราคา และปัจจัยคำนวณราคาแบบเจาะลึก
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {serviceCards.map((card, idx) => (
                <PricingServiceCard key={idx} card={card} />
              ))}
            </div>
          </section>

          {/* Compact Comparison Table */}
          <section className="my-10 sm:my-14">
            <PricingComparisonTable />
          </section>

          {/* Quotation Preparation Checklist */}
          <section className="my-10 sm:my-14">
            <PricingChecklist
              title="เช็กลิสต์เตรียมข้อมูลก่อนขอราคา"
              subtitle="เตรียมข้อมูลเพียง 4 ข้อนี้ เพื่อให้แอดมินคำนวณราคาได้อย่างรวดเร็วและถูกต้องที่สุด"
              steps={quotationSteps}
            />
          </section>

          {/* Transparent CTA Bottom */}
          <PricingBottomCTA
            title="ขอใบเสนอราคาด่วนสำหรับงานของคุณ"
            description="เพียงส่งรูปสิ่งของหรือระบุจุดรับ-ส่ง แอดมิน WMS TRANSPORT พร้อมประเมินราคาตามจริงให้ทันที ยืนยันราคาชัดเจนก่อนเริ่มงาน"
            serviceTag="ติดต่อทีมงาน WMS TRANSPORT"
          />

        </div>
      </main>

      {/* Sticky Mobile Bottom Bar */}
      <PricingMobileBottomBar serviceLabel="บริการขนส่ง WMS" />
    </div>
  );
}
