import React from "react";
import { 
  Truck, 
  Clock, 
  CheckCircle, 
  Phone, 
  Users, 
  Award,
  DollarSign, 
  Zap,
  Building,
  Package,
  Bike,
} from "lucide-react";

import Image from "next/image";
import HeroBackground from "@/components/HeroBackground";
import HeroImageCarousel from "@/components/HeroImageCarousel";
import ServiceSplitShowcase from "@/components/ServiceSplitShowcase";
import FloatingLine from "@/components/FloatingLine";
import dynamic from "next/dynamic";
import TLDRVerdict from "@/components/TLDRVerdict";
import { searchIntentMap } from "@/data/searchIntentMap";

const ServiceMap = dynamic(() => import('@/components/ServiceMap'), {
  loading: () => <div className="h-[400px] w-full rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />
});

const ServiceSteps = dynamic(() => import('@/components/ServiceSteps'), {
  loading: () => <div className="h-40 w-full rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />
});

const CustomerReviews = dynamic(() => import('@/components/CustomerReviews'), {
  loading: () => <div className="h-[300px] w-full rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />
});

const DecisionAnswerSurface = dynamic(() => import('@/components/DecisionAnswerSurface'), {
  loading: () => <div className="h-32 w-full rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />
});

const GalleryMasonry = dynamic(() => import('@/components/GalleryMasonry'), {
  loading: () => <div className="h-[400px] w-full rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />,
});
const TrustCounters = dynamic(() => import('@/components/TrustCounters'), {
  loading: () => <div className="h-40 w-full rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />,
});
const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="h-[300px] w-full rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />,
});

import { Metadata } from "next";

// ISR: Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const services = [
    {
      title: "ย้ายหอพัก / คอนโด",
      thaiName: "ย้ายหอ / คอนโด",
      desc: "บริการย้ายห้องชุด หอพัก อพาร์ทเม้นท์ คอนโดมิเนียม แพ็กซีลกันกระแทกอย่างดี ปลอดภัยทุกขั้นตอน",
      features: ["รวมคนช่วยยกของ", "มีกล่องกระดาษบริการ", "ถอดประกอบเฟอร์นิเจอร์พื้นฐาน"],
      icon: <Building className="h-8 w-8 text-blue-600" />,
      price: "2,000"
    },
    {
      title: "ขนส่งสินค้า / ทั่วไทย",
      thaiName: "ขนส่งสินค้า",
      desc: "รับส่งสินค้าอุปโภคบริโภค สินค้าโรงงาน วัสดุก่อสร้าง แบบเหมาเที่ยวทั่วประเทศ 77 จังหวัด",
      features: ["มีเอกสารใบเสร็จยืนยัน", "พนักงานขับรถชำนาญทาง", "ประสานงานติดตามสถานะได้ตลอดการขนส่ง"],
      icon: <Package className="h-8 w-8 text-blue-600" />,
      price: "1,000"
    },
    {
      title: "ขนส่งรถมอเตอร์ไซค์ / บิ๊กไบค์",
      thaiName: "ส่งมอเตอร์ไซค์",
      desc: "บริการขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์ทั่วไทย โดยทีมงานมืออาชีพ มีการแพ็กกันรอย รัดยึดแน่นหนา และดูแลรถของคุณอย่างปลอดภัยตั้งแต่ต้นทางถึงปลายทาง สายหลัก ภูเก็ต - กรุงเทพฯ",
      features: [
        "แพ็กกันรอย รัดยึดปลอดภัยทุกขั้นตอน",
        "รองรับทั้งมอเตอร์ไซค์ทั่วไปและบิ๊กไบค์",
        "ดูแลโดยทีมงานมืออาชีพตั้งแต่ต้นทางถึงปลายทาง"
      ],
      icon: <Bike className="h-8 w-8 text-blue-600" />,
      price: "1,500"
    },
    {
      title: "บริการพร้อมคนช่วยยกของ",
      thaiName: "คนช่วยยกของ",
      desc: "บริการพร้อมทีมงานช่วยยกของและจัดเรียงอย่างมืออาชีพ ประสบการณ์สูง ซื่อสัตย์ ไร้กังวล",
      features: ["ช่วยยกและจัดวางของ", "มีทีมงานมืออาชีพ", "ปลอดภัยและรวดเร็ว"],
      icon: <Users className="h-8 w-8 text-blue-600" />,
      price: "500"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "ดูแลความปลอดภัยทุกเที่ยว",
      desc: "อุ่นใจทุกการเดินทางด้วยมาตรการดูแลความปลอดภัยระหว่างการขนส่ง รัดตรึงสิ่งของแน่นหนาตามมาตรฐาน"
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "ยานพาหนะขนส่งมาตรฐานสากล",
      desc: "เลือกใช้เฉพาะรถกระบะตู้ทึบโครงสร้างพิเศษที่แข็งแรงสูง มิดชิดหนาแน่น สามารถป้องกันลม ฝน ฝุ่นละออง และแรงกระแทกได้อย่างมิดชิดตลอดการเดินทาง"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "ทีมงานมืออาชีพ สุภาพ",
      desc: "คนขับรถและพนักงานยกของมีความชำนาญ ผ่านการตรวจประวัติอาชญากรรม แต่งกายสะอาด สุภาพ ซื่อสัตย์"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "ตรงเวลา นัดหมายแม่นยำ",
      desc: "เราให้ความสำคัญกับเวลาของท่านอย่างสูงสุด รถเข้าตรงเวลา ดำเนินงานไว ไม่ล่าช้าให้เสียแผนงาน"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "ราคาโปร่งใส ไม่มีบวกเพิ่ม",
      desc: "เสนอราคาจริงใจตามระยะทางและประเภทรถ ไม่มีค่าใช้จ่ายลึกลับบวกเพิ่มหน้างานให้ปวดหัว"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "ดูแลช่วยเหลือตลอด 24 ชั่วโมง",
      desc: "มีแอดมินคอยตอบคำถาม ประเมินราคาด่วน และประสานงานดูแลตลอด 24 ชั่วโมง ไม่มีวันหยุด"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow relative bg-white text-slate-900 pb-24 md:pb-0">
        
        <HeroBackground>
          <HeroImageCarousel />
          
          {/* Two-Column Editorial Introduction & Assurance Bridge */}
          <div className="relative z-10 mt-8 sm:mt-11 lg:mt-13 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 xl:gap-16">
              
              {/* Left Column: Heading & Description (58%) */}
              <div className="w-full lg:w-[58%] xl:w-[60%] flex flex-col items-start text-left">
                {/* Minimalist Route Marker Decoration (No words) */}
                <div className="flex items-center gap-2 mb-4 sm:mb-5 pointer-events-none" aria-hidden="true">
                  <div className="w-12 h-1 bg-blue-600 rounded-full" />
                  <div className="w-2 h-2 bg-sky-400 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                </div>

                {/* Exactly ONE Semantic H1 */}
                <h1 className="font-sans text-[1.875rem] sm:text-4xl lg:text-[2.65rem] xl:text-[2.95rem] font-extrabold text-[#0B1F3A] tracking-tight leading-[1.25] sm:leading-[1.22] text-left text-balance max-w-3xl">
                  <span className="text-[#0B1F3A]">รถกระบะตู้ทึบรับจ้าง </span>
                  <span className="text-blue-600">ขนส่งมอเตอร์ไซค์</span>
                  <span className="text-[#0B1F3A]"> และย้ายบ้านคอนโด</span>
                  <br className="hidden sm:inline" />
                  <span className="text-[#0B1F3A]"> พร้อมทีม</span>
                  <span className="text-[#0284C7]">คนยกของ</span>
                </h1>

                {/* Supporting Description */}
                <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-[1.0625rem] text-[#475569] font-normal leading-[1.7] max-w-2xl text-left text-pretty">
                  {searchIntentMap.home.heroSupportingStatement}
                </p>
              </div>

              {/* Right Column: Refined Assurance Panel (42%) */}
              <div className="w-full lg:w-[42%] xl:w-[40%]">
                <div className="rounded-2xl sm:rounded-3xl bg-[#EFF6FF] border border-blue-200/80 p-6 sm:p-7 lg:p-8 shadow-xs text-left">
                  {/* Panel Heading */}
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0B1F3A] tracking-tight mb-1">
                    มั่นใจก่อนเริ่มงาน
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mb-5 sm:mb-6">
                    รายละเอียดชัดเจนก่อนยืนยันการจอง
                  </p>

                  {/* Three Vertically Stacked Trust Items */}
                  <div className="space-y-3 sm:space-y-3.5">
                    <div className="flex items-center gap-3 bg-white/90 border border-blue-100 rounded-xl px-4 py-3 shadow-2xs">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-[#0B1F3A]">
                        ประเมินราคาก่อนจอง
                      </span>
                    </div>

                    <div className="flex items-center gap-3 bg-white/90 border border-blue-100 rounded-xl px-4 py-3 shadow-2xs">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-[#0B1F3A]">
                        แจ้งราคาชัดเจน
                      </span>
                    </div>

                    <div className="flex items-center gap-3 bg-white/90 border border-blue-100 rounded-xl px-4 py-3 shadow-2xs">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-[#0B1F3A]">
                        ไม่มีบวกเพิ่มหน้างานตามเงื่อนไข
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Subtle downward visual bridge to next section */}
            <div className="hidden lg:flex justify-center mt-9 -mb-3 pointer-events-none" aria-hidden="true">
              <div className="w-px h-6 bg-gradient-to-b from-blue-300 to-transparent" />
            </div>
          </div>
        </HeroBackground>

        {/* 2. CONNECTED SERVICE SHOWCASE SECTION */}
        <ServiceSplitShowcase />

        {/* 2.5 PREMIUM SERVICES GRID SECTION */}
        <section id="services-grid" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-10 bg-gradient-to-b from-white via-[#F7FBFF] to-white">
          {/* Ambient radial highlight */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_35%,rgba(37,99,235,0.035),transparent)] pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="w-full max-w-7xl mx-auto relative z-10">
            {/* Heading Area */}
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-50/90 text-blue-700 border border-blue-200/80 rounded-full text-xs font-semibold mb-3.5 shadow-xs">
                <Package className="w-3.5 h-3.5 text-blue-600" />
                <span>หมวดหมู่บริการ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
                บริการขนส่งและขนย้าย <span className="text-blue-600">ยอดนิยม</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal mt-3 max-w-xl mx-auto leading-relaxed">
                เลือกบริการที่เหมาะกับงานของคุณ พร้อมดูราคาเริ่มต้นได้อย่างชัดเจน
              </p>
            </div>

            {/* Services Grid with Connected Rail */}
            <div className="relative pt-10 sm:pt-12">
              {/* Horizontal route line connecting the service nodes on desktop (1200px+) */}
              <div 
                className="hidden xl:block absolute top-[48px] left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-blue-200/90 z-0 pointer-events-none" 
                aria-hidden="true" 
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 sm:gap-8 xl:gap-6 justify-center min-w-0">
                {services.map((service, i) => (
                  <div 
                    key={i}
                    className="relative flex flex-col group/card min-w-0 transition-transform duration-200 hover:-translate-y-1.5 motion-reduce:transform-none"
                  >
                    {/* Floating Circular Icon Node */}
                    <div className="relative z-20 mx-auto -mb-10 sm:-mb-11 flex items-center justify-center">
                      <div className="relative w-20 h-20 sm:w-[84px] sm:h-[84px] rounded-full bg-white border-2 border-blue-100 shadow-md shadow-blue-500/10 flex items-center justify-center text-blue-600 transition-colors duration-200 group-hover/card:border-blue-300">
                        {service.icon}
                        {/* Green status accent dot */}
                        <span 
                          className="absolute top-1.5 right-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" 
                          aria-hidden="true" 
                        />
                      </div>
                    </div>

                    {/* Elevated White Service Card Surface */}
                    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 pt-14 sm:pt-16 pb-6 px-5 sm:px-6 flex flex-col justify-between shadow-xs transition-all duration-200 group-hover/card:border-blue-300 group-hover/card:shadow-xl group-hover/card:shadow-blue-900/5 relative z-10 overflow-hidden flex-1">
                      {/* Subtle top accent strip */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500" 
                        aria-hidden="true" 
                      />

                      {/* Content Area */}
                      <div className="flex flex-col flex-1">
                        {/* Service Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] tracking-tight mb-2 text-center">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4 text-center min-h-0 sm:min-h-[4.5rem]">
                          {service.desc}
                        </p>

                        {/* Benefits List */}
                        <ul className="space-y-2.5 border-t border-slate-100 pt-4 mb-6">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium leading-normal">
                              <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer: Price Capsule & Contact Actions */}
                      <div className="mt-auto pt-2">
                        {/* Green Price Capsule */}
                        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3 sm:p-3.5 mb-3 text-center">
                          <div className="text-xs font-semibold text-emerald-800 mb-0.5">
                            ราคาเริ่มต้น
                          </div>
                          <div className="flex items-baseline justify-center gap-1.5">
                            <span className="text-2xl sm:text-3xl font-black text-[#047857] tracking-tight">
                              {service.price}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-emerald-700">
                              บาท
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1">
                            ราคาจริงขึ้นอยู่กับรายละเอียดงาน
                          </div>
                        </div>

                        {/* Contact Actions */}
                        <div className="flex flex-col gap-2">
                          <a 
                            href="https://line.me/ti/p/DtICkMaDet"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="ติดต่อผ่าน LINE เพื่อสอบถามราคา"
                            className="w-full bg-[#06C755] hover:bg-[#05B34F] active:bg-[#049B44] text-white font-sans font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none"
                          >
                            <Image
                              src="/images/LINE_icon.webp"
                              alt="LINE"
                              width={18}
                              height={18}
                              className="h-4.5 w-4.5 object-contain shrink-0"
                            />
                            <span>สอบถามผ่าน LINE</span>
                          </a>
                          <a 
                            href="https://www.facebook.com/share/1DnN6iGodp/?mibextid=wwXIfr"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="สอบถามผ่าน Facebook"
                            className="w-full bg-blue-50/70 hover:bg-blue-100/80 text-blue-700 font-sans font-semibold text-xs sm:text-sm py-2 px-4 rounded-xl flex items-center justify-center gap-2 border border-blue-200/80 transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span>สอบถามผ่าน Facebook</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. MOTORCYCLE PRICING SECTION */}
        <section id="pricing" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-14 md:py-20 z-10 bg-slate-50/60 border-y border-slate-200/80">
          <div className="w-full max-w-7xl mx-auto relative z-10 min-w-0">
            <div className="text-center mb-12">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wide">
                ราคาขนส่ง
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mb-3 mt-4">
                ราคาขนส่ง<span className="text-blue-600">มอเตอร์ไซค์และบิ๊กไบค์</span>
              </h2>
              <p className="text-base text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
                บริการขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์ระดับพรีเมียม ครอบคลุมทุกเส้นทางทั่วประเทศ ดูแลรถทุกคันด้วยมาตรฐานสูงสุดเสมือนรถของเราเอง ปลอดภัย ไร้รอยขีดข่วนตลอดการเดินทาง
              </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full max-w-7xl mx-auto min-w-0">
              {/* Card 1: 100-125cc */}
              <div className="w-full min-w-0 relative bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:border-blue-300 hover:shadow-md flex flex-col transition-all duration-200 overflow-hidden">
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">มอเตอร์ไซค์ทั่วไป</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-2">100cc – 125cc</h3>

                <div className="mt-auto">
                  <div className="text-3xl sm:text-4xl font-black text-[#0B1F3A] mb-1">2,500 <span className="text-base font-bold text-slate-500">บาท</span></div>
                  <p className="text-xs text-slate-500 mb-5">แพ็กกันรอย รัดยึดปลอดภัย ดูแลโดยมืออาชีพ</p>
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact WMS Transport via LINE"
                    className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt="LINE"
                      width={18}
                      height={18}
                      className="h-4.5 w-4.5 object-contain shrink-0"
                    />
                    <span>สอบถามราคาผ่าน LINE</span>
                  </a>
                </div>
              </div>

              {/* Card 2: 150-300cc */}
              <div className="w-full min-w-0 relative bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:border-blue-300 hover:shadow-md flex flex-col transition-all duration-200 overflow-hidden">
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">มอเตอร์ไซค์ขนาดกลาง</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-2">150cc – 300cc</h3>

                <div className="mt-auto">
                  <div className="text-3xl sm:text-4xl font-black text-[#0B1F3A] mb-1">3,000 <span className="text-base font-bold text-slate-500">บาท</span></div>
                  <p className="text-xs text-slate-500 mb-5">แพ็กกันรอย รัดยึดปลอดภัย ดูแลโดยมืออาชีพ</p>
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact WMS Transport via LINE"
                    className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt="LINE"
                      width={18}
                      height={18}
                      className="h-4.5 w-4.5 object-contain shrink-0"
                    />
                    <span>สอบถามราคาผ่าน LINE</span>
                  </a>
                </div>
              </div>

              {/* Card 3: BigBike 400cc — PREMIUM HIGHLIGHT */}
              <div className="w-full min-w-0 relative bg-blue-50/40 rounded-2xl p-7 border-2 border-blue-500 shadow-sm flex flex-col transition-all duration-200 overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-white bg-blue-600 px-2.5 py-1 rounded-md shadow-xs">⭐ ยอดนิยม</span>
                </div>
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-blue-700 bg-blue-100 border border-blue-300 px-3 py-1 rounded-full">บิ๊กไบค์</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-2">400cc BigBike</h3>

                <div className="mt-auto">
                  <div className="text-3xl sm:text-4xl font-black text-blue-700 mb-1">4,500 <span className="text-base font-bold text-blue-600">บาท</span></div>
                  <p className="text-xs text-blue-900/70 mb-5 font-medium">แพ็กกันรอย รัดยึดพิเศษ ดูแลบิ๊กไบค์โดยเฉพาะ</p>
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact WMS Transport via LINE"
                    className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt="LINE"
                      width={18}
                      height={18}
                      className="h-4.5 w-4.5 object-contain shrink-0"
                    />
                    <span>สอบถามราคาผ่าน LINE</span>
                  </a>
                </div>
              </div>

              {/* Card 4: เหมาขนส่ง */}
              <div className="w-full min-w-0 relative bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:border-blue-300 hover:shadow-md flex flex-col transition-all duration-200 overflow-hidden">
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">เหมาระยะไกล</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-2">บริการเหมาขนส่ง</h3>
                <p className="text-xs text-slate-500 mb-4">สำหรับระยะทาง 300 กม. ขึ้นไป</p>
                <div className="mt-auto">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-700 mb-1">16 บาท<span className="text-base font-bold text-slate-500">/กม.</span></div>
                  <p className="text-xs text-slate-500 mb-5">ราคาเริ่มต้น ขึ้นอยู่กับเส้นทางและประเภทรถ</p>
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact WMS Transport via LINE"
                    className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt="LINE"
                      width={18}
                      height={18}
                      className="h-4.5 w-4.5 object-contain shrink-0"
                    />
                    <span>สอบถามราคาผ่าน LINE</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Main CTA + note */}
            <div className="text-center">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact WMS Transport via LINE for pricing"
                className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-base sm:text-lg rounded-xl shadow-xs bg-[#06C755] hover:bg-[#05b34c] transition-colors mb-4"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt="LINE"
                  width={22}
                  height={22}
                  className="h-5 w-5 sm:h-5.5 sm:w-5.5 object-contain shrink-0"
                />
                <span>ล็อกคิวราคานี้ (ทัก LINE ฟรี)</span>
              </a>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
                หมายเหตุ: ราคาขึ้นอยู่กับจุดรับ-ส่งจริง ประเภทรถ และเงื่อนไขการขนส่ง กรุณาติดต่อแอดมินเพื่อประเมินราคาที่แม่นยำ
              </p>
            </div>
          </div>
        </section>

        {/* 4. REAL JOB PORTFOLIO SECTION */}
        <section id="gallery" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-10 content-auto section-contain bg-white">
          <div className="w-full max-w-7xl mx-auto min-w-0">
            <GalleryMasonry />
          </div>
        </section>

        {/* 4. TRUST COUNTER SECTION */}
        <TrustCounters />

        {/* 5. CUSTOMER REVIEW SECTION */}
        <CustomerReviews />

        {/* 6. SERVICE COVERAGE MAP */}
        <section id="areas" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-10 content-auto section-contain bg-slate-50/50 border-y border-slate-200/70">
          <div className="w-full max-w-7xl mx-auto min-w-0">
            <ServiceMap />
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-choose-us" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-14 md:py-20 z-10 section-contain bg-white">
          <div className="w-full max-w-7xl mx-auto text-center mb-14 min-w-0">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wide">
              ทำไมต้องเลือกเรา
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mb-3 mt-4">
              เหตุผลที่ลูกค้าไว้วางใจ <span className="text-blue-600">WMS</span>
            </h2>
            <p className="text-base text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
              เรายกระดับงานบริการขนของด้วยความซื่อสัตย์ ปลอดภัย และราคาที่ยุติธรรมสูงสุด ระดับองค์กร
            </p>
          </div>

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
            {whyChooseUs.map((item, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-5 transition-all duration-200 hover:border-blue-300 hover:shadow-md shadow-xs group font-sans"
              >
                <div className="p-3.5 bg-blue-600 text-white rounded-xl shadow-xs shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <div className="relative z-10 w-full py-10 bg-slate-50/50 border-y border-slate-200/70">
          <ServiceSteps />
        </div>

        {/* AI EXTRACTION / SUMMARY BLOCK */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 bg-white">
          <DecisionAnswerSurface data={{
            directAnswer: "WMS Transport บริการรถรับจ้างขนของ ขนส่งมอเตอร์ไซค์ และย้ายบ้านทั่วประเทศ พร้อมทีมงานมืออาชีพและราคามาตรฐานโปร่งใส",
            bestFitCustomer: "ลูกค้าทั่วไปที่ต้องการย้ายที่อยู่อาศัย หรือธุรกิจที่ต้องการขนส่งสินค้าเป็นประจำ",
            serviceCoverage: "ครอบคลุมทุกจังหวัดทั่วประเทศไทย พร้อมเส้นทางหลักกรุงเทพฯ-ต่างจังหวัด",
            vehicleSuitability: "กระบะตู้ทึบกันฝนปิดมิดชิด รองรับการบรรทุกสินค้าหลากหลายขนาด และรถกระบะสำหรับมอเตอร์ไซค์",
            priceFactors: ["ระยะทางรวม", "ประเภทรถที่ใช้", "ความต้องการเด็กยกของ", "ข้อจำกัดจุดรับ-ส่ง"],
            timingExpectations: "บริการตลอด 24 ชั่วโมง เรียกรถด่วนได้ภายใน 2 ชั่วโมงในเขตกรุงเทพฯ",
            preparationRequirements: ["เตรียมประเมินขนาดและน้ำหนักของโดยประมาณ", "แจ้งเงื่อนไขพื้นที่ล่วงหน้าเพื่อเตรียมอุปกรณ์"],
            exclusions: ["ของเหลวอันตราย", "สินค้าผิดกฎหมายทุกชนิด"],
            evidenceLinks: [{ label: "ดูพอร์ตโฟลิโอผลงาน", url: "/portfolio" }],
            lastReviewedDate: "2026-06-25"
          }} />
          <TLDRVerdict />
        </div>

        {/* 7. FAQ SECTION */}
        <div className="relative z-10 w-full py-8 bg-slate-50/50 border-y border-slate-200/70">
          <FAQ />
        </div>

        {/* 8. FINAL CTA SECTION */}
        <section className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-14 md:py-20 z-10 bg-white">
          <div className="w-full max-w-7xl mx-auto min-w-0">
            <div className="relative rounded-2xl overflow-hidden bg-[#0B1F3A] border border-blue-950 p-8 sm:p-14 text-center shadow-md">
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                  พร้อมสัมผัสประสบการณ์<span className="text-blue-400">ระดับมืออาชีพ?</span>
                </h2>
                <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal mb-10">
                  จองคิวเช่ารถล่วงหน้า หรือโทรปรึกษาประเมินราคาด่วนได้ทันที ตลอด 24 ชั่วโมง ดำเนินการโดยมืออาชีพ
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-5">
                  <a
                    href="tel:0612402436"
                    className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl font-bold text-base transition-colors shadow-xs"
                  >
                    <Phone className="h-5 w-5 text-blue-400" />
                    <span className="font-mono tracking-wide text-lg">061-240-2436</span>
                  </a>
                  <a
                    href="tel:0981796946"
                    className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl font-bold text-sm transition-colors shadow-xs"
                  >
                    <Phone className="h-4.5 w-4.5 text-blue-400" />
                    <span className="font-mono tracking-wide">098-179-6946 (คุณดาว - สำรอง)</span>
                  </a>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <a
                      href="https://line.me/ti/p/DtICkMaDet"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact WMS Transport via LINE"
                      className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-xl font-bold text-base transition-colors shadow-xs"
                    >
                      <Image
                        src="/images/LINE_icon.webp"
                        alt="LINE"
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain shrink-0"
                      />
                      <span>ติดต่อผ่าน LINE</span>
                    </a>
                    
                    <a
                      href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl font-bold text-base transition-colors shadow-xs"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>สอบถามผ่าน Facebook</span>
                    </a>
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 mt-8 font-medium">
                  * มีมาตรการดูแลความปลอดภัยสินค้าตลอดเที่ยวการขนส่งตามเงื่อนไขที่ตกลง
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <FloatingLine />
    </div>
  );
}
