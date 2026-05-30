"use client";

import Image from "next/image";
import { Truck, CheckCircle2, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const STATIC_DATA = [
  {
    id: 1,
    title: "ย้ายคอนโดกรุงเทพ",
    service: "ย้ายคอนโด",
    route: "กรุงเทพฯ - ปริมณฑล",
    desc: "บริการแพ็กของและถอดประกอบเฟอร์นิเจอร์โดยช่างผู้เชี่ยวชาญ ดูแลพื้นและผนังอย่างดีเยี่ยม พร้อมจัดวางให้เข้าที่",
    image: "/images/condo_moving.jpg",
  },
  {
    id: 2,
    title: "ขนย้ายบ้านจริง",
    service: "ย้ายบ้าน",
    route: "กรุงเทพฯ - เชียงใหม่",
    desc: "ขนย้ายบ้านเดี่ยวเต็มคันรถ ด้วยรถกระบะตู้ทึบหลายคัน แพ็กซีลกันกระแทกทุกชิ้นเพื่อป้องกันความเสียหายตลอดเส้นทางไกล",
    image: "/images/home_moving.jpg",
  },
  {
    id: 3,
    title: "ส่งมอเตอร์ไซค์ด่วน",
    service: "ขนส่งมอเตอร์ไซค์",
    route: "กรุงเทพฯ - ภูเก็ต",
    desc: "บริการขนส่งบิ๊กไบค์และมอเตอร์ไซค์ทุกประเภท แพ็กซีลหนาพิเศษพร้อมระบบสายรัดนิรภัยมาตรฐาน มั่นใจไร้รอยขีดข่วน",
    image: "/images/motorcycle_delivery.jpg",
  },
  {
    id: 4,
    title: "ขนของออฟฟิศ",
    service: "ย้ายออฟฟิศ",
    route: "สีลม - สาทร",
    desc: "รื้อถอนและติดตั้งพาร์ทิชัน อุปกรณ์ไอที และเอกสารสำคัญอย่างเป็นระบบ เพื่อให้ธุรกิจของคุณกลับมาดำเนินการได้รวดเร็วที่สุด",
    image: "/images/office_relocation.jpg",
  },
  {
    id: 5,
    title: "แพ็กของและขนสินค้า",
    service: "ขนส่งสินค้า",
    route: "โรงงาน - ศูนย์กระจายสินค้า",
    desc: "บริการแพ็กสินค้าอุตสาหกรรมและเตรียมความพร้อมก่อนการขนส่ง จัดเรียงขึ้นรถอย่างมืออาชีพเพื่อประหยัดพื้นที่และปลอดภัย",
    image: "/images/cargo_packing.jpg",
  },
  {
    id: 6,
    title: "รถฟลีทงานขนส่ง",
    service: "บริการรถรับจ้าง",
    route: "ทั่วประเทศ",
    desc: "ทีมงานรถกระบะตู้ทึบพร้อมให้บริการขนส่งจำนวนมาก รับประกันเวลาเข้ารับและส่งมอบที่แม่นยำ พร้อมระบบติดตามสถานะ",
    image: "/images/truck_fleet.jpg",
  }
];

export default function FeaturedPortfolio() {
  return (
    <section id="featured" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#040b15] relative overflow-hidden">
      <div className="max-w-7xl mx-auto font-sans">
        <div className="text-center mb-16">
           <span className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)] mb-4 inline-block">
            Featured Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            ผลงานเด่นของเรา
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
             รวมเคสการทำงานจริงที่แสดงถึงความเป็นมืออาชีพและความใส่ใจในทุกรายละเอียด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STATIC_DATA.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              key={item.id} 
              className="bg-white/[0.02] rounded-3xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:border-blue-500/30 flex flex-col group transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="relative h-64 w-full bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                {item.image ? (
                   <Image 
                     src={item.image} 
                     alt={item.title} 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                   />
                ) : (
                   <Truck className="h-16 w-16 text-white/10" />
                )}
                <div className="absolute top-4 left-4 bg-[#040b15]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 shadow-md">
                   <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-xs font-bold text-white">ส่งมอบสำเร็จ</span>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 flex flex-col flex-1 relative">
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-xs font-bold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md uppercase tracking-wide">
                     {item.service}
                   </span>
                   <div className="flex items-center text-xs text-slate-400 font-medium">
                     <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                     {item.route}
                   </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                  {item.desc}
                </p>
                
                <a 
                  href="https://line.me/ti/p/~@wmstransport"
                  target="_blank"
                  rel="noreferrer"
                  className="line-btn-pulse text-white font-bold py-3.5 px-4 rounded-xl text-center w-full mt-auto border border-[#06C755]/30 hover:scale-[1.02] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 10.304c0-4.757-5.37-8.561-12-8.561s-12 3.804-12 8.561c0 4.22 4.266 7.748 10.029 8.442.39.084.92.258.92.657v1.815c0 .428-.23.931.817.636 1.048-.296 5.629-3.284 7.683-5.507 3.023-3.111 4.551-6.185 4.551-9.479z" />
                  </svg>
                  <span>💬 ขอใบเสนอราคาฟรีผ่าน LINE</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
