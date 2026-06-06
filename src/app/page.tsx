
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceSteps from "@/components/ServiceSteps";
import Image from "next/image";
import ServiceMap from "@/components/ServiceMap";
import CustomerReviews from "@/components/CustomerReviews";
import HeroBackground from "@/components/HeroBackground";
import FloatingLine from "@/components/FloatingLine";
import dynamic from "next/dynamic";

const GalleryMasonry = dynamic(() => import('@/components/GalleryMasonry'), {
  loading: () => <div className="h-[400px] w-full rounded-[32px] bg-white/[0.02] border border-white/5 animate-pulse" />,
});
const TrustCounters = dynamic(() => import('@/components/TrustCounters'), {
  loading: () => <div className="h-40 w-full rounded-[32px] bg-white/[0.02] border border-white/5 animate-pulse" />,
});
const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="h-[300px] w-full rounded-[32px] bg-white/[0.02] border border-white/5 animate-pulse" />,
});

// ISR: Revalidate every hour
export const revalidate = 3600;

export default function Home() {

  const services = [
    {
      title: "ย้ายหอพัก / คอนโด",
      thaiName: "ย้ายหอ / คอนโด",
      desc: "บริการย้ายห้องชุด หอพัก อพาร์ทเม้นท์ คอนโดมิเนียม แพ็กซีลกันกระแทกอย่างดี ปลอดภัยทุกขั้นตอน",
      features: ["รวมคนช่วยยกของ", "มีกล่องกระดาษบริการ", "ถอดประกอบเฟอร์นิเจอร์พื้นฐาน"],
      icon: <Building className="h-7 w-7" />,
      price: "2,000"
    },
    {
      title: "ขนส่งสินค้า / ทั่วไทย",
      thaiName: "ขนส่งสินค้า",
      desc: "รับส่งสินค้าอุปโภคบริโภค สินค้าโรงงาน วัสดุก่อสร้าง แบบเหมาเที่ยวทั่วประเทศ 77 จังหวัด",
      features: ["ออกใบเสร็จ/ใบกำกับภาษีได้", "พนักงานขับรถชำนาญทาง", "เช็กสถานะ GPS ตลอดทาง"],
      icon: <Package className="h-7 w-7" />,
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
      icon: <Bike className="h-7 w-7" />,
      price: "1,500"
    },
    {
      title: "บริการพร้อมคนช่วยยกของ",
      thaiName: "คนช่วยยกของ",
      desc: "บริการพร้อมทีมงานช่วยยกของและจัดเรียงอย่างมืออาชีพ",
      features: ["ช่วยยกและจัดวางของ", "มีทีมงานมืออาชีพ", "ปลอดภัยและรวดเร็ว"],
      icon: <Users className="h-7 w-7" />,
      price: "500"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "มีประกันภัยสินค้าทุกเที่ยว",
      desc: "อุ่นใจทุกการเดินทางด้วยวงเงินประกันภัยอุบัติเหตุระหว่างการขนส่ง ครอบคลุมทรัพย์สินเสียหายสูงสุดตามตกลง"
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "ยานพาหนะขนส่งมาตรฐานสากล",
      desc: "เลือกใช้เฉพาะรถกระบะตู้ทึบโครงสร้างพิเศษที่แข็งแรงสูง มิดชิดหนาแน่น สามารถป้องกันลม ฝน ฝุ่นละออง และแรงกระแทกได้อย่างเด็ดขาด 100% ตลอดการเดินทาง"
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
      <Navbar />

      <main className="flex-grow relative bg-gradient-to-b from-[#020817] via-[#04152D] to-[#061F45] text-slate-200 pb-28 md:pb-0">
        
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">รถกระบะตู้ทึบรับจ้าง ขนส่งมอเตอร์ไซค์ ย้ายบ้านทั่วไทย บริการพร้อมคนช่วยยก</h1>
        
        <HeroBackground />

        {/* 2. TRUST SECTION ("Why Choose WMS") */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
              
              {/* Left Tile: Real Image Proof */}
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col justify-between group">
                {/* Soft blue glow behind the image container */}
                <div className="absolute inset-0 bg-blue-500/10 blur-xl z-0 pointer-events-none"></div>
                
                <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-full min-h-[380px] lg:min-h-[560px] overflow-hidden z-10">
                  <Image
                    src="/images/S__5668870.webp"
                    alt="WMS TRANSPORT ให้บริการขนส่งมอเตอร์ไซค์และรถกระบะตู้ทึบจริง"
                    fill
                    className="object-cover object-[center_55%] transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                    priority
                    quality={82}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B15]/75 via-[#040B15]/15 to-transparent pointer-events-none" />
                  
                  {/* Floating Pill - Top Left */}
                  <div className="absolute top-5 left-5 md:top-6 md:left-6 z-20 flex flex-col gap-2">
                    <div className="inline-flex rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 backdrop-blur-md shadow-lg items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-black text-slate-100 tracking-wide">
                        งานจริงล่าสุด
                      </span>
                      <span className="text-[11px] text-blue-300 font-bold border-l border-white/20 pl-2.5">
                        ขนส่งมอเตอร์ไซค์
                      </span>
                    </div>
                    <div className="inline-flex rounded-full border border-white/5 bg-slate-950/60 px-3 py-1 backdrop-blur-sm ml-1 w-max">
                      <span className="text-[10px] text-slate-300 font-medium">
                        แพ็กกันรอย • รถตู้ทึบ WMS
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Tile: Value Props & Action */}
              <div className="rounded-[2.25rem] border border-white/10 bg-[#071426]/70 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-center relative overflow-hidden">
                {/* Decorative radial glow */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="mb-6">
                    <span className="inline-flex items-center px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                      บริการของเรา
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.1] mb-5 text-white">
                    บริการ<span className="text-blue-400">รถกระบะตู้ทึบรับจ้าง</span> และ<br className="hidden sm:block" />
                    ขนย้ายระดับพรีเมียม
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-xl">
                    ครอบคลุมทุกความต้องการด้านการขนส่ง ขนย้ายสิ่งของด้วยมาตรฐานระดับสากล ปลอดภัย ตรงเวลา ไร้กังวล
                  </p>

                  {/* Proof Pills 2x2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-10">
                    {[
                      "มีผลงานจริง",
                      "มีทีมงานมืออาชีพ",
                      "ให้บริการทั่วไทย",
                      "ตอบกลับเร็ว",
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 transition-all duration-300 hover:bg-white/[0.06] hover:border-blue-400/30 hover:-translate-y-0.5 group cursor-default"
                      >
                        <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm sm:text-base text-white font-extrabold tracking-wide">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2.5 PREMIUM SERVICES GRID SECTION */}
        <section id="services" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-0 z-10">

          {/* Premium header block has been removed */}

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 justify-center min-w-0">
            {services.map((service, i) => (
              <div 
                key={i}
                className="w-full min-w-0 perf-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 md:hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] group/card font-sans overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-blue-500/0 group-hover/card:bg-blue-500/5 transition-colors duration-500 rounded-2xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-5">
                    <div className="p-3 bg-white/5 text-blue-400 border border-white/10 rounded-xl group-hover/card:bg-blue-500/20 group-hover/card:text-blue-300 group-hover/card:border-blue-400/50 transition-all duration-500 shadow-lg">
                      {service.icon}
                    </div>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 border border-blue-500/20 font-bold px-3 py-1 rounded-full tracking-wider uppercase backdrop-blur-sm">
                      มาตรฐาน WMS
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-2 group-hover/card:text-blue-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed mb-4 line-clamp-3 md:line-clamp-none min-h-0 md:min-h-[4rem]">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-2 border-t border-white/10 pt-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
                        <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 relative z-10">
                  {/* Pricing highlight under description */}
                  <div className="mb-4 flex items-center justify-between border-t border-white/10 pt-4 gap-2">
                    <span className="text-xs font-bold text-slate-400">เริ่มต้นเพียง</span>
                    <span className="text-sm sm:text-base font-black text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      {service.price} บาท
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-2">
                    <a 
                      href="https://line.me/ti/p/DtICkMaDet"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact WMS Transport via LINE"
                      className="w-full bg-[#06C755] hover:bg-[#05B34F] text-white font-sans font-black text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 min-h-[44px]"
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
                      href="https://www.facebook.com/share/1DnN6iGodp/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact WMS Transport via Facebook"
                      className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-sans font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 min-h-[44px]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>สอบถามผ่าน Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. MOTORCYCLE PRICING SECTION */}
        <section id="pricing" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-24 z-10">
          {/* Section ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[180px]" />
          </div>

          <div className="w-full max-w-7xl mx-auto relative z-10 min-w-0">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                ราคาขนส่ง
              </span>
              <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 mt-8">
                ราคาขนส่ง<span className="text-blue-400">มอเตอร์ไซค์และบิ๊กไบค์</span>
              </h2>
              <p className="text-lg text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                บริการขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์ระดับพรีเมียม ครอบคลุมทุกเส้นทางทั่วประเทศ ดูแลรถทุกคันด้วยมาตรฐานสูงสุดเสมือนรถของเราเอง ปลอดภัย ไร้รอยขีดข่วนตลอดการเดินทาง
              </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full max-w-7xl mx-auto min-w-0">
              {/* Card 1: 100-125cc */}
              <div
                className="w-full min-w-0 relative perf-card rounded-3xl p-8 hover:border-blue-400/40 flex flex-col transition-all duration-300 md:hover:-translate-y-2 hover:bg-white/[0.05] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500 rounded-3xl pointer-events-none" />
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">มอเตอร์ไซค์ทั่วไป</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">100cc – 125cc</h3>

                <div className="mt-auto">
                  <div className="text-4xl font-black text-white mb-1">2,500 <span className="text-xl font-bold text-slate-400">บาท</span></div>
                  <p className="text-xs text-slate-500 mb-6">แพ็กกันรอย รัดยึดปลอดภัย ดูแลโดยมืออาชีพ</p>
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact WMS Transport via LINE"
                    className="w-full line-btn-pulse text-white font-black text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt="LINE"
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain shrink-0"
                    />
                    <span>สอบถามราคาผ่าน LINE</span>
                  </a>
                </div>
              </div>

              {/* Card 2: 150-300cc */}
              <div
                className="w-full min-w-0 relative perf-card rounded-3xl p-8 hover:border-blue-400/40 flex flex-col transition-all duration-300 md:hover:-translate-y-2 hover:bg-white/[0.05] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500 rounded-3xl pointer-events-none" />
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">มอเตอร์ไซค์ขนาดกลาง</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">150cc – 300cc</h3>

                <div className="mt-auto">
                  <div className="text-4xl font-black text-white mb-1">3,000 <span className="text-xl font-bold text-slate-400">บาท</span></div>
                  <p className="text-xs text-slate-500 mb-6">แพ็กกันรอย รัดยึดปลอดภัย ดูแลโดยมืออาชีพ</p>
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact WMS Transport via LINE"
                    className="w-full line-btn-pulse text-white font-black text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt="LINE"
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain shrink-0"
                    />
                    <span>สอบถามราคาผ่าน LINE</span>
                  </a>
                </div>
              </div>

              {/* Card 3: BigBike 400cc — PREMIUM HIGHLIGHT */}
              <div
                className="w-full min-w-0 relative bg-gradient-to-b from-blue-600/[0.12] to-blue-900/[0.08] backdrop-blur-sm md:backdrop-blur-xl rounded-3xl p-8 border border-blue-500/40 shadow-[0_15px_60px_rgba(59,130,246,0.2)] flex flex-col transition-all duration-300 md:hover:-translate-y-2 group overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-500/[0.06] group-hover:bg-blue-500/[0.10] transition-colors duration-500 rounded-3xl pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[80px] bg-blue-400/20 rounded-full blur-[40px] pointer-events-none" />
                {/* Premium badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]">⭐ พรีเมียม</span>
                </div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-300 bg-blue-500/20 border border-blue-400/30 px-3 py-1.5 rounded-full">บิ๊กไบค์</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">400cc BigBike</h3>

                <div className="mt-auto">
                  <div className="text-4xl font-black text-blue-300 mb-1">4,500 <span className="text-xl font-bold text-blue-400">บาท</span></div>
                  <p className="text-xs text-blue-400/70 mb-6">แพ็กกันรอย รัดยึดพิเศษ ดูแลบิ๊กไบค์โดยเฉพาะ</p>
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact WMS Transport via LINE"
                    className="w-full line-btn-pulse text-white font-black text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt="LINE"
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain shrink-0"
                    />
                    <span>สอบถามราคาผ่าน LINE</span>
                  </a>
                </div>
              </div>

              {/* Card 4: เหมาขนส่ง */}
              <div
                className="w-full min-w-0 relative perf-card rounded-3xl p-8 hover:border-blue-400/40 flex flex-col transition-all duration-300 md:hover:-translate-y-2 hover:bg-white/[0.05] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500 rounded-3xl pointer-events-none" />
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">เหมาระยะไกล</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">บริการเหมาขนส่ง</h3>
                <p className="text-sm text-slate-400 mb-6">สำหรับระยะทาง 300 กม. ขึ้นไป</p>
                <div className="mt-auto">
                  <div className="text-3xl font-black text-emerald-400 mb-1">16 บาท<span className="text-lg font-bold text-slate-400">/กม.</span></div>
                  <p className="text-xs text-slate-500 mb-6">ราคาเริ่มต้น ขึ้นอยู่กับเส้นทางและประเภทรถ</p>
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact WMS Transport via LINE"
                    className="w-full line-btn-pulse text-white font-black text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Image
                      src="/images/LINE_icon.webp"
                      alt="LINE"
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain shrink-0"
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
                className="inline-flex items-center gap-3 px-10 py-5 text-white font-black text-lg rounded-2xl shadow-[0_0_25px_rgba(225,29,72,0.5)] transform transition-all duration-300 hover:scale-105 animate-[pulse_2s_ease-in-out_infinite] border border-red-400/50 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 relative overflow-hidden shimmer-btn mb-6"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt="LINE"
                  width={24}
                  height={24}
                  className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0 relative z-10"
                />
                <span className="relative z-10">🔥 ล็อกคิวราคานี้ (ทัก LINE)</span>
              </a>
              <p className="text-sm text-slate-500 max-w-2xl mx-auto">
                หมายเหตุ: ราคาขึ้นอยู่กับจุดรับ-ส่งจริง ประเภทรถ และเงื่อนไขการขนส่ง กรุณาติดต่อแอดมินเพื่อประเมินราคาที่แม่นยำ
              </p>
            </div>
          </div>
        </section>

        {/* 4. REAL JOB PORTFOLIO SECTION */}
        <section id="gallery" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-24 z-10 content-auto section-contain">
          <div className="w-full max-w-7xl mx-auto min-w-0">
            <GalleryMasonry />
          </div>
        </section>

        {/* 4. TRUST COUNTER SECTION */}
        <div className="relative z-10 w-full">
          <TrustCounters />
        </div>

        {/* 5. CUSTOMER REVIEW SECTION */}
        <section id="reviews" className="relative z-10 w-full py-12 content-auto section-contain">
          <CustomerReviews />
        </section>

        {/* 6. SERVICE COVERAGE MAP */}
        <section id="areas" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-24 z-10 content-auto section-contain">
          <div className="w-full max-w-7xl mx-auto min-w-0">
            <ServiceMap />
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-choose-us" className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-24 z-10 section-contain">
          <div className="w-full max-w-7xl mx-auto text-center mb-20 min-w-0">
            <span className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              ทำไมต้องเลือกเรา
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 mt-8">
              เหตุผลที่ลูกค้าไว้วางใจ <span className="text-blue-400">WMS</span>
            </h2>
            <p className="text-lg text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              เรายกระดับงานบริการขนของด้วยความซื่อสัตย์ ปลอดภัย และราคาที่ยุติธรรมสูงสุด ระดับองค์กร
            </p>
          </div>

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-w-0">
            {whyChooseUs.map((item, i) => (
              <div 
                key={i} 
                className="perf-card rounded-3xl p-8 flex flex-col sm:flex-row items-start gap-6 transition-all duration-300 md:hover:bg-white/[0.05] hover:border-blue-500/30 md:hover:-translate-y-2 group font-sans"
              >
                <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-800 border border-blue-500/40 text-white rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-slate-400 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <div className="relative z-10 w-full py-12">
          <ServiceSteps />
        </div>

        {/* 7. FAQ SECTION */}
        <div className="relative z-10 w-full py-12">
          <FAQ />
        </div>

        {/* 8. FINAL CTA SECTION */}
        <section className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-24 z-10 section-contain">
          <div className="w-full max-w-7xl mx-auto min-w-0">
            <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#04152D] via-[#061F45] to-[#04152D] border border-blue-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[150px] -translate-y-1/2 hidden md:block"></div>
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] hidden md:block"></div>
              
              <div className="relative z-10 py-20 px-8 text-center flex flex-col items-center">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-md">
                  พร้อมสัมผัสประสบการณ์<span className="text-blue-400">พรีเมียม?</span>
                </h2>
                <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto font-medium mb-12">
                  จองคิวเช่ารถล่วงหน้า หรือโทรปรึกษาประเมินราคาด่วนได้ทันที ตลอด 24 ชั่วโมง ดำเนินการโดยมืออาชีพ
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6">
                  <a
                    href="tel:0612402436"
                    className="flex items-center justify-center gap-3 px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-400/50 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.2)] group"
                  >
                    <Phone className="h-6 w-6 text-blue-400 group-hover:animate-pulse" />
                    <span className="font-mono tracking-wider text-xl">061-240-2436</span>
                  </a>
                  <a
                    href="tel:0981796946"
                    className="flex items-center justify-center gap-3 px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-400/50 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.2)] group"
                  >
                    <Phone className="h-5 w-5 text-blue-400 group-hover:animate-pulse" />
                    <span className="font-mono tracking-wider text-sm">098-179-6946 (คุณดาว - สำรอง)</span>
                  </a>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <a
                      href="https://line.me/ti/p/DtICkMaDet"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact WMS Transport via LINE"
                      className="flex items-center justify-center gap-3 px-8 py-5 line-btn-pulse hover:bg-[#05B34F] text-white rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_15px_40px_rgba(6,199,85,0.3)] hover:shadow-[0_20px_50px_rgba(6,199,85,0.5)] border border-[#06C755]/30 transform hover:-translate-y-1"
                    >
                      <Image
                        src="/images/LINE_icon.webp"
                        alt="LINE"
                        width={24}
                        height={24}
                        className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0"
                      />
                      <span className="tracking-wide">ติดต่อผ่าน LINE</span>
                    </a>
                    
                    <a
                      href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 px-8 py-5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_15px_40px_rgba(24,119,242,0.3)] hover:shadow-[0_20px_50px_rgba(24,119,242,0.5)] border border-[#1877F2]/30 transform hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current shrink-0">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="tracking-wide">สอบถามขนส่งผ่าน Facebook</span>
                    </a>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 mt-10 font-medium">
                  * รับประกันสินค้าทุกเที่ยวสูงสุด 100,000 บาท ตามเงื่อนไขของบริษัท
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingLine />
    </div>
  );
}
