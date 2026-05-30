"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  stars: number;
  comment: string;
  badge: string;
  initial: string;
};

const testimonials: Testimonial[] = [
  {
    name: "คุณเมย์ รัชดา",
    role: "ย้ายคอนโดมิเนียม",
    stars: 5,
    comment: "พี่ๆ พนักงานยกของดีมาก สุภาพและแพ็กกันกระแทกอย่างดี คอนโดของเยอะมากแต่เสร็จไวและจัดของเข้าที่เดิมให้ด้วย แนะนำเลยครับ ประทับใจมาก",
    badge: "Verified Booking",
    initial: "ม"
  },
  {
    name: "คุณบอย เชียงใหม่",
    role: "ส่งมอเตอร์ไซค์ Bigbike",
    stars: 5,
    comment: "ส่งบิ๊กไบค์จากกรุงเทพฯ ไปเชียงใหม่ ปลอดภัยไร้ริ้วรอยครับ พี่คนขับดูแลรถอย่างดี มีสายรัดล็อกหนาแน่นอุ่นใจมาก ราคาสมเหตุสมผลครับ",
    badge: "Verified Customer",
    initial: "บ"
  },
  {
    name: "คุณวิทูรย์ ชลบุรี",
    role: "ขนส่งสินค้าโรงงานประจำ",
    stars: 5,
    comment: "ใช้บริการรถกระบะตู้ทึบเหมาเที่ยวส่งชิ้นส่วนอิเล็กทรอนิกส์ประจำ รถสะอาด ตู้มิดชิดกันฝนร้อยเปอร์เซ็นต์ คนขับติดต่อได้ตลอดเวลา อัปเดตสถานะให้ทราบตลอดทาง ประสานงานง่ายมาก",
    badge: "Corporate Partner",
    initial: "ว"
  }
];

export default function CustomerReviews() {
  return (
    <section 
      id="reviews" 
      className="py-32 px-4 sm:px-6 lg:px-8 relative w-full font-sans z-10"
    >
      {/* Background radial glow behind the section */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[150px] -z-10 pointer-events-none" 
      />

      {/* Header */}
      <div className="max-w-[1600px] mx-auto text-center mb-24 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          รีวิวจากลูกค้า
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md"
        >
          เสียงตอบรับจากลูกค้าจริง
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-medium"
        >
          การันตีความประทับใจ ความตรงเวลา และงานบริการที่ยอดเยี่ยมจากลูกค้าจริง ระดับมืออาชีพ
        </motion.p>

        <div className="relative w-48 h-[2px] mx-auto mt-8 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
      </div>

      {/* Reviews Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {testimonials.map((test, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 relative overflow-hidden flex flex-col justify-between gap-8 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:border-blue-500/30 transition-all duration-500 min-h-[350px] group"
          >
            {/* Giant Quote Watermark */}
            <span className="absolute -top-6 right-4 text-9xl text-white/[0.03] font-serif select-none pointer-events-none leading-none group-hover:text-blue-500/[0.05] transition-colors duration-500">
              &ldquo;
            </span>

            {/* Content Group (Stars + Text) */}
            <div className="flex flex-col gap-6 z-10 relative">
              {/* Rating stars */}
              <div className="flex gap-1.5 text-blue-400">
                {Array.from({ length: test.stars }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className="h-5 w-5 fill-current drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-slate-300 font-medium leading-[1.8] text-[16px] tracking-wide border-l-4 border-blue-500/40 pl-5">
                {test.comment}
              </p>
            </div>

            {/* Customer Profile Row */}
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-4">
                {/* Initial Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#04152D] to-blue-900 border border-white/10 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg group-hover:border-blue-400/50 transition-colors">
                  {test.initial}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white leading-tight group-hover:text-blue-300 transition-colors">
                    {test.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1.5 leading-none">
                    {test.role}
                  </p>
                </div>
              </div>
              
              {/* Verified Trust Badge */}
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{test.badge === "Verified Booking" ? "ยืนยันการจอง" : test.badge === "Verified Customer" ? "ลูกค้าจริง" : "พาร์ทเนอร์"}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
