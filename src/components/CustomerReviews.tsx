"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Quote } from "lucide-react";

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
      className="py-24 px-4 sm:px-6 lg:px-8 relative w-full font-sans overflow-hidden"
    >
      {/* Dynamic ambient glow effects */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.5 }}
          className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block shadow-[0_0_20px_rgba(59,130,246,0.15)] will-change-transform"
        >
          รีวิวจากลูกค้า
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md will-change-transform"
        >
          เสียงตอบรับจากลูกค้าจริง
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-medium will-change-transform"
        >
          การันตีความประทับใจ ความตรงเวลา และงานบริการที่ยอดเยี่ยมจากผู้ใช้บริการจริงของเรา
        </motion.p>
      </div>

      {/* Reviews Infinite Marquee */}
      <div className="relative w-full overflow-hidden py-4 z-10 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-custom {
            animation: marquee 30s linear infinite;
          }
        `}} />
        <div className="flex gap-6 animate-marquee-custom hover:[animation-play-state:paused] w-max">
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((test, i) => (
            <div 
              key={i}
              className="w-[350px] md:w-[450px] shrink-0 bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:border-blue-500/30 hover:from-white/[0.05] hover:to-blue-950/20 transition-all duration-300 min-h-[320px] group relative overflow-hidden"
            >
              {/* Ambient inner card glow */}
              <div className="absolute -inset-px bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Row: Stars & Quote Watermark */}
              <div className="flex items-center justify-between z-10">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: test.stars }).map((_, idx) => (
                    <Star 
                      key={idx} 
                      className="h-4.5 w-4.5 fill-current filter drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                    />
                  ))}
                </div>
                <Quote className="h-10 w-10 text-blue-500/10 group-hover:text-blue-500/20 group-hover:scale-110 transition-all duration-300" />
              </div>

              {/* Comment Body */}
              <div className="z-10 flex-1 py-2">
                <p className="text-slate-100 font-medium leading-relaxed text-[15px] sm:text-base">
                  &quot;{test.comment}&quot;
                </p>
              </div>

              {/* Reviewer Row */}
              <div className="flex items-center justify-between mt-4 pt-5 border-t border-white/10 z-10">
                <div className="flex items-center gap-3">
                  {/* Initial Avatar with Gradient */}
                  <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-full flex items-center justify-center text-white font-extrabold text-base shadow-[0_4px_12px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
                    {test.initial}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {test.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {test.role}
                    </p>
                  </div>
                </div>
                
                {/* Verified Trust Badge */}
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.05)] select-none">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{test.badge === "Verified Booking" ? "ยืนยันการจอง" : test.badge === "Verified Customer" ? "ลูกค้าจริง" : "พาร์ทเนอร์"}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
