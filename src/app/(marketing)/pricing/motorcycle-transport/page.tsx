import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bike, Wrench, FileText } from "lucide-react";
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
  title: "ราคาขนส่งรถมอเตอร์ไซค์ บิ๊กไบค์ ทั่วไทย | WMS TRANSPORT",
  description: "เช็กอัตราค่าบริการส่งมอเตอร์ไซค์และบิ๊กไบค์ทั่วประเทศ อิงตามพิกัด cc ของรถ ปลอดภัยด้วยตู้ทึบกันฝนกันฝุ่น ดูแลความปลอดภัยทุกเที่ยว",
  alternates: {
    canonical: `${siteConfig.productionUrl}/pricing/motorcycle-transport`,
  },
};

export default function PricingMotorcyclePage() {
  const motorcyclePhotos: GalleryPhotoItem[] = [
    {
      src: "/images/WM12.webp",
      alt: "รถบิ๊กไบค์ทัวร์ริ่งแรปหุ้มฟิล์มกันรอยสีแดงบนทางลาดอะลูมิเนียมท้ายรถ WMS",
      caption: "รถบิ๊กไบค์ทัวร์ริ่งพร้อมกล่องข้าง แรปฟิล์มกันรอยรอบคันและเข็นขึ้นทางลาดอะลูมิเนียมท้ายรถตู้ทึบ",
      tag: "บิ๊กไบค์ทัวร์ริ่ง"
    },
    {
      src: "/images/WMS6.webp",
      alt: "การรัดยึดรถมอเตอร์ไซค์ Vespa ในตู้ทึบด้วยสายรัด Ratchet 4 จุด",
      caption: "ล็อกล้อหน้าและดึงสายรัด Ratchet 4 ทิศทางประคองรถตั้งตรง 90 องศา ปลอดภัยจากแรงสั่นสะเทือน",
      tag: "รัดยึด 4 จุด"
    },
    {
      src: "/images/WM9.webp",
      alt: "รถมอเตอร์ไซค์คัสตอมทรงบิ๊กไบค์ หุ้มฟิล์มใสทั้งคันเตรียมจัดส่ง",
      caption: "แรปฟิล์มยืดปกป้องถังน้ำมัน แฮนด์ และตัวถังรถคัสตอมทรงพิเศษ ป้องกันสะเก็ดหินและรอยขูดขีด",
      tag: "รถคัสตอม"
    },
    {
      src: "/images/WM13.webp",
      alt: "รถมอเตอร์ไซค์ Honda Wave แรปฟิล์มรอบคันขึ้นตู้ทึบช่วงค่ำ",
      caption: "ส่งมอบรถมอเตอร์ไซค์ใช้งานทั่วไป (Honda Wave) ปิดตู้มิดชิดกันฝน ขนส่งช่วงค่ำตรงเวลา",
      tag: "รถใช้งานทั่วไป"
    },
    {
      src: "/images/WMS24.webp",
      alt: "ส่งมอบรถจักรยานยนต์ล็อต 4 คัน Honda ADV ถึงมือผู้รับพร้อมเอกสาร",
      caption: "งานขนส่งรถจักรยานยนต์ล็อตหลายคัน (Honda ADV 4 คัน) ถึงจุดหมายปลายทางพร้อมส่งมอบเอกสาร",
      tag: "เหมาขนส่งหลายคัน"
    }
  ];

  const quotationSteps: ChecklistStep[] = [
    {
      step: "01",
      title: "ยี่ห้อ รุ่น และขนาด cc",
      desc: "ระบุยี่ห้อ รุ่น และขนาดความจุกระบอกสูบ (เช่น Honda Wave 110i, PCX 160, หรือ Ninja 400)"
    },
    {
      step: "02",
      title: "จุดรับและจุดส่งจริง",
      desc: "ระบุเขต/อำเภอ และจังหวัดต้นทาง-ปลายทาง เพื่อให้คำนวณระยะทางและเส้นทางอย่างแม่นยำ"
    },
    {
      step: "03",
      title: "สภาพความพร้อมของรถ",
      desc: "แจ้งว่ารถสามารถสตาร์ทและเข็นได้ตามปกติหรือไม่ มีกล่องข้างหรือของแต่งพิเศษหรือไม่"
    },
    {
      step: "04",
      title: "เอกสารและน้ำมันถัง",
      desc: "เตรียมกุญแจรถ สำเนาเล่มทะเบียนรถ/เอกสารซื้อขาย และลดระดับน้ำมันในถังต่ำกว่า 1/4"
    }
  ];

  const motorcycleFaqs: FAQItem[] = [
    {
      question: "รถมอเตอร์ไซค์จะเอียงล้มหรือมีรอยขูดขีดในตู้ทึบหรือไม่?",
      answer: "ทางเราใช้แท่นล็อกล้อ Wheel Chock ยึดล้อหน้าให้ตั้งตรง 90 องศา และดึงรั้งด้วยสายรัดนิรภัย Ratchet Strap 4 จุดเข้ากับโครงสร้างตู้โดยไม่กดทับแฟริ่งรถ พร้อมฟรีแรปฟิล์มป้องกันรอยบริเวณแฮนด์และกระจก รถจะไม่ขยับเขยื้อนหรือเสียดสีตลอดการเดินทางครับ"
    },
    {
      question: "ส่งมอเตอร์ไซค์ข้ามจังหวัดต้องใช้เอกสารอะไรบ้าง?",
      answer: "เพื่อความถูกต้องตามกฎหมายและป้องกันปัญหาการตรวจสอบระหว่างทาง เจ้าของรถต้องเตรียมสำเนาเล่มทะเบียนรถ (หรือสัญญาเช่าซื้อ/เอกสารซื้อขายจากร้าน) พร้อมสำเนาบัตรประชาชนของผู้ส่งมอบให้พนักงานขับรถพกติดตัวตลอดการเดินทาง"
    },
    {
      question: "ต้องถ่ายน้ำมันเครื่องหรือของเหลวออกจากรถก่อนส่งหรือไม่?",
      answer: "ไม่ต้องถ่ายน้ำมันเครื่องครับ รถจะถูกตั้งตรงบนแท่นล็อกตลอดทาง ของเหลวในเครื่องยนต์จะไม่รั่วไหล เพียงขอความร่วมมือให้ใช้น้ำมันเชื้อเพลิงในถังให้เหลือต่ำกว่า 1 ใน 4 ของถัง เพื่อความปลอดภัยสูงสุดขณะขนย้าย"
    },
    {
      question: "สามารถฝากหมวกกันน็อกหรืออุปกรณ์แต่งรถไปด้วยได้ไหม?",
      answer: "สามารถฝากหมวกกันน็อกหรือสัมภาระชิ้นเล็กที่จัดเก็บในกล่องท้ายหรือใต้เบาะรถได้ครับ หากมีสัมภาระกล่องภายนอกเพิ่มเติม โปรดแจ้งแอดมินล่วงหน้าเพื่อจัดสรรพื้นที่ท้ายตู้ให้เหมาะสม"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900 pb-28 md:pb-16">
      <main className="grow relative pt-8 sm:pt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex justify-start mb-4">
            <Breadcrumbs items={getPricingBreadcrumbs("ขนส่งมอเตอร์ไซค์", "motorcycle-transport")} />
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
                MOTORCYCLE TRANSPORT PRICING
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-snug sm:leading-tight mb-4">
                ราคาขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์ทั่วไทย
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                ขนส่งในรถกระบะตู้ทึบปิดมิดชิด ปลอดภัยจากสะเก็ดหิน แดด และฝน 100% <br className="hidden sm:inline" />
                พร้อมแท่นล็อกล้อ Wheel Chock และสายรัด Ratchet 4 ทิศทาง ดูแลความปลอดภัยทุกเที่ยว
              </p>
            </div>

            {/* Person-holding-WMS-boxes Brand Section directly below H1 */}
            <PricingHeroBrandBanner />
          </section>

          {/* 2. Starting Price Card & 4. Included/Excluded Comparison */}
          <PricingPriceCard
            badgeText="ราคาเริ่มต้น"
            pricePrefix="เริ่มต้น"
            startingPrice={1000}
            priceHeadline="ราคาประเมินเริ่มต้นสำหรับรถทั่วไป (100cc–125cc)"
            eligibilityNote="ราคาขึ้นอยู่กับรุ่นรถ ระยะทาง และจุดรับ–ส่ง กรุณาสอบถามราคาก่อนจอง"
            volumeNote="คำชี้แจง: อัตราค่าบริการส่งมอเตอร์ไซค์คิดตามพิกัดขนาดเครื่องยนต์ (cc), ขนาดมิติตัวรถ และระยะทางจริง โดยบิ๊กไบค์ 400cc+ จะมีอัตราเริ่มต้นที่สูงกว่าตามน้ำหนักและพื้นที่ตู้"
            lastReviewedDate="มิถุนายน 2569"
            includedItems={[
              "รถตู้ทึบป้องกันฝุ่น หินกระเด็น แดด และฝน ปิดล็อกมิดชิดตลอดเส้นทาง",
              "แท่นล็อกล้อหน้า Wheel Chock ประคองรถให้อยู่ในแนวตั้งตรง 90 องศา",
              "สายรัดนิรภัย Ratchet Strap 4 จุดดึงสมดุลเข้ากับโครงสร้างตู้",
              "ฟรีบริการแรปฟิล์มยืดหุ้มแฮนด์ กระจกมองข้าง และจุดเสี่ยงขูดขีด",
              "มีทางลาดอะลูมิเนียม (Ramp) สำหรับเข็นขึ้นและลงจากรถอย่างปลอดภัย",
              "มาตรการดูแลความปลอดภัยของตัวรถตลอดการเดินทาง"
            ]}
            excludedItems={[
              "ขนาดความจุกระบอกสูบสูง (รถบิ๊กไบค์ 400cc+ มีค่าระวางตามขนาดและน้ำหนัก)",
              "เส้นทางข้ามเกาะหรือพื้นที่พิเศษ (มีบวกค่าระวางตั๋วเรือเฟอร์รี่ตามใบเสร็จจริง)",
              "การบริการดูดล้างทำความสะอาดรถจักรยานยนต์หลังการเดินทาง",
              "สัมภาระแต่งรถภายนอกที่ไม่ได้ยึดแน่นกับตัวรถ (กรุณาแจ้งล่วงหน้า)",
              "กรณีรถสตาร์ทไม่ติด ล้อล็อก หรือเข็นไม่สะดวก (โปรดแจ้งเจ้าหน้าที่ล่วงหน้า)"
            ]}
          />

          {/* 3. เหมาะกับงานแบบไหน (Who it suits) */}
          <section className="my-10 bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              บริการส่งมอเตอร์ไซค์ WMS เหมาะกับรถแบบไหน?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6">
              รองรับตั้งแต่มอเตอร์ไซค์ใช้งานทั่วไป ไปจนถึงบิ๊กไบค์ทรงสปอร์ตระดับพรีเมียม
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Bike className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>รถมอเตอร์ไซค์ทั่วไป (100cc - 125cc)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Honda Wave, Scoopy, Click, Grand Filano, Lead 125 ขนส่งกลับภูมิลำเนา ย้ายที่ทำงาน หรือส่งให้นักศึกษา
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Bike className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>รถออโตเมติกขนาดกลาง (150cc - 350cc)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  PCX, ADV 160/350, NMAX, XMAX, Forza 350, Vespa รัดยึดระมัดระวังแฟริ่งและระบบชิลด์หน้าอย่างมืออาชีพ
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Wrench className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>รถบิ๊กไบค์ ทัวร์ริ่ง และสปอร์ต (400cc ขึ้นไป)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Kawasaki Ninja, Honda CB/CBR, BMW GS, Harley-Davidson ใช้อุปกรณ์รัดยึดหนาพิเศษและล็อกล้อหน้ามั่นคง
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm sm:text-base">
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>ขนส่งล็อตหลายคัน / ดีลเลอร์ร้านรถ</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  เหมาเที่ยวส่งมอบรถใหม่ให้ลูกค้า ส่งมอบรถหลายคันพร้อมเอกสารตรวจสอบครบถ้วนในเที่ยวเดียว
                </p>
              </div>
            </div>
          </section>

          {/* 5. Relevant Real Job Gallery */}
          <PricingGallery
            title="ผลงานจริงการขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์"
            subtitle="ชมภาพการปฏิบัติงานจริง บันทึกการล็อกล้อ Wheel Chock การแรปฟิล์ม และการขนส่งด้วยตู้ทึบ"
            photos={motorcyclePhotos}
            caseStudyLink={{
              href: "/portfolio/motorcycle-delivery-pinklao",
              text: "อ่านเคสตัวอย่างส่งบิ๊กไบค์ Kawasaki Ninja 400 ปิ่นเกล้า"
            }}
          />

          {/* 6. Main Factors Affecting the Quotation */}
          <section className="my-8 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              ปัจจัยหลักที่มีผลต่อราคาจัดส่งมอเตอร์ไซค์
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-5">
              โครงสร้างราคาอิงตามขนาดรถและเส้นทางจริง ไม่คิดราคาเหมาลอย
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "1. พิกัดความจุกระบอกสูบ (cc) และน้ำหนักรถ",
                  desc: "รถขนาดเล็ก 100-125cc น้ำหนักเบา vs รถบิ๊กไบค์ 400cc+ น้ำหนัก 200 กก.+ ต้องใช้พื้นที่และแรงงานล็อกมากกว่า"
                },
                {
                  title: "2. ระยะทางวิ่งจริงระหว่างจุดรับและจุดส่ง",
                  desc: "คิดตามระยะทางจริงจากต้นทางถึงปลายทาง วิ่งตรงหรือจัดส่งตามรอบเที่ยว"
                },
                {
                  title: "3. ขนาดตัวถังและของแต่งพิเศษ",
                  desc: "รถที่มีกล่องข้าง กระเป๋าทัวร์ริ่ง หรือแฮนด์แต่งกว้างพิเศษ อาจต้องใช้พื้นที่ตู้มากกว่าปกติ"
                },
                {
                  title: "4. พื้นที่เกาะหรือพื้นที่พิเศษ",
                  desc: "การจัดส่งข้ามเกาะ (เช่น สมุย, พะงัน, เกาะช้าง) จะมีค่าระวางตั๋วเรือเฟอร์รี่บวกเพิ่มตามใบเสร็จจริง"
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
            title="เช็กลิสต์ข้อมูลที่ควรเตรียมเพื่อประเมินราคาส่งมอไซค์"
            subtitle="แจ้งข้อมูล 4 ข้อนี้ทาง LINE เพื่อให้เจ้าหน้าที่ตรวจสอบคิวและประเมินราคาได้ทันที"
            steps={quotationSteps}
          />

          {/* 8. Brief FAQ & Final Contact Section */}
          <PricingFAQ
            title="คำถามที่พบบ่อยเกี่ยวกับการขนส่งมอเตอร์ไซค์"
            subtitle="ข้อสงสัยเรื่องความปลอดภัย เอกสาร และการเตรียมรถ"
            faqs={motorcycleFaqs}
          />

          {/* Bottom Conversion CTA */}
          <PricingBottomCTA
            title="เช็กราคาส่งรถมอเตอร์ไซค์ของคุณวันนี้"
            description="เพียงแจ้งรุ่นรถ ขนาด cc และจังหวัดปลายทาง แอดมิน WMS TRANSPORT พร้อมประเมินราคาและตรวจสอบคิวรถให้ทันที"
            serviceTag="บริการส่งมอเตอร์ไซค์ WMS TRANSPORT"
          />

        </div>
      </main>

      <InternalLinks currentCategory="pricing" currentSlug="motorcycle-transport" />
      <PricingMobileBottomBar serviceLabel="บริการส่งมอเตอร์ไซค์" />
    </div>
  );
}
