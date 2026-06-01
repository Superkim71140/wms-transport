"use client";

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
  Bike
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingLine from "@/components/FloatingLine";
import ServiceMap from "@/components/ServiceMap";
import GalleryMasonry from "@/components/GalleryMasonry";
import ServiceSteps from "@/components/ServiceSteps";
import CustomerReviews from "@/components/CustomerReviews";
import FAQ from "@/components/FAQ";
import TrustCounters from "@/components/TrustCounters";
import { motion } from "framer-motion";


export default function Home() {

  const services = [
    {
      title: "ย้ายหอพัก / คอนโด",
      thaiName: "ย้ายหอ / คอนโด",
      desc: "บริการย้ายห้องชุด หอพัก อพาร์ทเม้นท์ คอนโดมิเนียม แพ็กซีลกันกระแทกอย่างดี ปลอดภัยทุกขั้นตอน",
      features: ["รวมคนช่วยยกของ", "มีกล่องกระดาษบริการ", "ถอดประกอบเฟอร์นิเจอร์พื้นฐาน"],
      icon: <Building className="h-7 w-7" />
    },
    {
      title: "ขนส่งสินค้า / ทั่วไทย",
      thaiName: "ขนส่งสินค้า",
      desc: "รับส่งสินค้าอุปโภคบริโภค สินค้าโรงงาน วัสดุก่อสร้าง แบบเหมาเที่ยวทั่วประเทศ 77 จังหวัด",
      features: ["ออกใบเสร็จ/ใบกำกับภาษีได้", "พนักงานขับรถชำนาญทาง", "เช็กสถานะ GPS ตลอดทาง"],
      icon: <Package className="h-7 w-7" />
    },
    {
      title: "ขนส่งรถมอเตอร์ไซค์ / บิ๊กไบค์",
      thaiName: "ส่งมอเตอร์ไซค์",
      desc: "บริการรับส่งรถมอเตอร์ไซค์และบิ๊กไบค์ทั่วไทย แพ็กป้องกันรอยอย่างดี ขึ้น-ลงอย่างปลอดภัย ดูแลทุกขั้นตอน พร้อมส่งตรงเวลา",
      features: [
        "แพ็กกันรอยและรัดยึดอย่างปลอดภัย",
        "รองรับรถมอเตอร์ไซค์และบิ๊กไบค์",
        "มีทีมงานดูแลการขนย้ายอย่างมืออาชีพ"
      ],
      icon: <Bike className="h-7 w-7" />
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
    <>
      <Navbar />

      <main className="flex-1 relative bg-gradient-to-b from-[#020817] via-[#04152D] to-[#061F45] text-slate-200 overflow-x-hidden">
        
        {/* GLOBAL CONTINUOUS BACKGROUND EFFECTS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Subtle Grid / Particles */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
          
          {/* Floating Blurred Light Sources for Depth */}
          <div className="absolute top-[5%] left-[-5%] w-[1200px] h-[1200px] bg-blue-600/[0.04] rounded-full blur-[200px]"></div>
          <div className="absolute top-[30%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-500/[0.05] rounded-full blur-[250px]"></div>
          <div className="absolute top-[60%] left-[-10%] w-[1400px] h-[1400px] bg-sky-500/[0.03] rounded-full blur-[250px]"></div>
          <div className="absolute bottom-[5%] right-[5%] w-[900px] h-[900px] bg-blue-700/[0.06] rounded-full blur-[200px]"></div>
        </div>

        {/* 1. HERO SECTION */}
        <section className="relative w-full aspect-[1717/916] md:aspect-auto md:h-[68vh] md:min-h-[560px] md:max-h-[720px] z-10 -mt-[2px] overflow-hidden flex items-center justify-center bg-[#020817]">
          {/* Dark overlay gradient for seamless navbar transition */}
          <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-[#020817]/30 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[#020817] via-[#020817]/30 to-transparent z-10 pointer-events-none"></div>

          {/* Luxury ambient glows behind image */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1000px] h-[400px] md:h-[600px] bg-blue-600/10 rounded-full blur-[120px] md:blur-[160px] pointer-events-none z-0"></div>
          
          <Image 
            src="/images/wms-cover.png" 
            alt="WMS Transport Cover" 
            fill
            className="object-cover object-[center_32%] opacity-100 relative z-1"
            priority 
          />
        </section>

        {/* 2. PREMIUM SERVICES SECTION */}
        <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-[1600px] mx-auto text-center mb-16">
            <span className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              บริการของเรา
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 mt-8">
              บริการขนย้ายระดับ<span className="text-blue-400">พรีเมียม</span>
            </h2>
            <p className="text-lg text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-12">
              ครอบคลุมทุกความต้องการด้านการขนส่ง ขนย้ายสิ่งของด้วยมาตรฐานระดับสากล ปลอดภัย ตรงเวลา ไร้กังวล
            </p>

            {/* FLOATING TRUST BADGES */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
              {[
                { text: "มีผลงานจริง", delay: 0 },
                { text: "มีทีมงานมืออาชีพ", delay: 0.2 },
                { text: "ให้บริการทั่วไทย", delay: 0.4 },
                { text: "ตอบกลับเร็ว", delay: 0.6 }
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: badge.delay
                  }}
                  className="px-6 py-3 bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-blue-400/40 rounded-full text-sm font-black text-blue-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-2"
                >
                  <span className="text-emerald-400 font-extrabold text-lg">✓</span>
                  <span className="text-slate-100">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between relative transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:bg-white/[0.04] group/card font-sans overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-blue-500/0 group-hover/card:bg-blue-500/5 transition-colors duration-500 rounded-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <div className="p-4 bg-white/5 text-blue-400 border border-white/10 rounded-2xl group-hover/card:bg-blue-500/20 group-hover/card:text-blue-300 group-hover/card:border-blue-400/50 transition-all duration-500 shadow-lg">
                      {service.icon}
                    </div>
                    <span className="text-[10px] bg-white/5 text-slate-300 border border-white/10 font-bold px-3 py-1.5 rounded-full tracking-wider uppercase backdrop-blur-sm">
                      มาตรฐาน WMS
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 group-hover/card:text-blue-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-base text-slate-400 font-normal leading-relaxed mb-6 h-20">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-4 border-t border-white/10 pt-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[15px] font-semibold text-slate-200">
                        <CheckCircle className="h-5 w-5 text-blue-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 relative z-10">
                  {/* Pricing highlight under description */}
                  <div className="mt-4 mb-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-sm font-bold text-slate-400">เริ่มต้นเพียง</span>
                    <span className="text-[17px] font-black text-red-500 bg-red-500/10 border border-red-500/20 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      เริ่มต้น 500 บาท
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    <a 
                      href="https://line.me/ti/p/~@wmstransport"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full line-btn-pulse text-white font-sans font-black text-[15px] py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                    >
                      <Image 
                        src="/images/LINE_Brand_icon.png" 
                        alt="LINE Logo" 
                        width={20} 
                        height={20} 
                        className="w-5 h-5 object-contain shrink-0" 
                      />
                      <span>💬 ติดต่อขนส่งผ่าน LINE</span>
                    </a>
                    
                    <a 
                      href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#1877F2] hover:bg-[#166FE5] shadow-[0_4px_15px_rgba(24,119,242,0.3)] text-white font-sans font-black text-[15px] py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                    >
                      <Image 
                        src="/images/Facebook_Logo_.png" 
                        alt="Facebook Logo" 
                        width={20} 
                        height={20} 
                        className="w-5 h-5 object-contain shrink-0" 
                      />
                      <span>สอบถามขนส่งผ่าน Facebook</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. REAL JOB PORTFOLIO SECTION */}
        <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-[1600px] mx-auto">
            <GalleryMasonry />
          </div>
        </section>

        {/* 4. TRUST COUNTER SECTION */}
        <div className="relative z-10 w-full">
          <TrustCounters />
        </div>

        {/* 5. CUSTOMER REVIEW SECTION */}
        <section id="reviews" className="relative z-10 w-full py-12">
          <CustomerReviews />
        </section>

        {/* 6. SERVICE COVERAGE MAP */}
        <section id="areas" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-[1600px] mx-auto">
            <ServiceMap />
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-choose-us" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-[1600px] mx-auto text-center mb-20">
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

          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 flex flex-col sm:flex-row items-start gap-6 transition-all duration-500 ease-out hover:bg-white/[0.05] hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] group font-sans"
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
              </motion.div>
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
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-[#04152D] via-[#061F45] to-[#04152D] border border-blue-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[150px] -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
              
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
                      href="https://line.me/ti/p/~@wmstransport"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 px-8 py-5 line-btn-pulse hover:bg-[#05B34F] text-white rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_15px_40px_rgba(6,199,85,0.3)] hover:shadow-[0_20px_50px_rgba(6,199,85,0.5)] border border-[#06C755]/30 transform hover:-translate-y-1"
                    >
                      <Image 
                        src="/images/LINE_Brand_icon.png" 
                        alt="LINE Logo" 
                        width={24} 
                        height={24} 
                        className="w-6 h-6 object-contain shrink-0" 
                      />
                      <span className="tracking-wide">ติดต่อผ่าน LINE</span>
                    </a>
                    
                    <a
                      href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 px-8 py-5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] shadow-[0_15px_40px_rgba(24,119,242,0.3)] hover:shadow-[0_20px_50px_rgba(24,119,242,0.5)] border border-[#1877F2]/30 transform hover:-translate-y-1"
                    >
                      <Image 
                        src="/images/Facebook_Logo_.png" 
                        alt="Facebook Logo" 
                        width={24} 
                        height={24} 
                        className="w-6 h-6 object-contain shrink-0" 
                      />
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
    </>
  );
}
