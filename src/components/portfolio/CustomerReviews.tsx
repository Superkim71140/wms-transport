"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "คุณสมชาย อ.",
    role: "เจ้าของธุรกิจ SME",
    initial: "ส",
    rating: 5,
    type: "ขนส่งสินค้าต่างจังหวัด",
    text: "บริการดีมากครับ รถตรงเวลา พนักงานยกของสุภาพและระมัดระวังสินค้าเป็นอย่างดี ประทับใจมากครับ แนะนำสำหรับคนหาบริษัทขนส่งที่เชื่อถือได้"
  },
  {
    id: 2,
    name: "คุณพรทิพา ส.",
    role: "พนักงานบริษัท",
    initial: "พ",
    rating: 5,
    type: "ย้ายคอนโด High-Rise",
    text: "ทีมงานมืออาชีพมาก ช่วยถอดประกอบตู้เตียงให้เรียบร้อย ขนของรวดเร็ว ไม่มีอะไรเสียหายเลยค่ะ แถมยังช่วยแพ็กของจุกจิกด้วย ประทับใจจริงๆ"
  },
  {
    id: 3,
    name: "บจก. เอ็นจิเนียริ่ง",
    role: "ลูกค้าองค์กร",
    initial: "อ",
    rating: 5,
    type: "เหมาตู้ทึบขนส่งอุปกรณ์",
    text: "ใช้บริการประจำสำหรับงานโปรเจกต์ รถสภาพใหม่มั่นใจได้ เอกสารครบถ้วน ระบบบิลลิ่งชัดเจนครับ เหมาะสำหรับบริษัทที่ต้องการความเป๊ะ"
  },
  {
    id: 4,
    name: "คลินิกทันตกรรมสไมล์",
    role: "สถานพยาบาล",
    initial: "ส",
    rating: 5,
    type: "ย้ายอุปกรณ์การแพทย์",
    text: "ตอนแรกกังวลมากเพราะเครื่องมือแพทย์เซนซิทีฟต่อแรงกระแทก แต่ทีมงาน WMS ดูแลอย่างระมัดระวัง มีการห่อหุ้มหลายชั้น ถึงที่หมายอย่างปลอดภัย 100%"
  },
  {
    id: 5,
    name: "คุณนภัทร ร.",
    role: "ผู้จัดอีเวนท์",
    initial: "น",
    rating: 5,
    type: "ขนย้ายบูธจัดแสดง",
    text: "งานอีเวนท์เลิกดึกแค่ไหนทีมงานก็สแตนด์บายรอ ขนของออกรวดเร็ว ไม่ทำให้เสียเวลาและค่าปรับพื้นที่ คุ้มค่ากับราคาที่จ่ายไปมากครับ"
  },
  {
    id: 6,
    name: "คลังสินค้า สเตชั่น",
    role: "โรงงานอุตสาหกรรม",
    initial: "ค",
    rating: 5,
    type: "ย้ายคลังสินค้า",
    text: "จัดการระบบขนย้ายคลังสินค้าขนาดใหญ่ได้เป็นระบบมากครับ ช่วยลด Downtime ของธุรกิจได้เยอะ ประเมินราคาโปร่งใส ไม่มีบวกหน้างาน"
  }
];

export default function CustomerReviews() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#040b15] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 font-sans">
        <div className="text-center mb-16">
          <span className="px-5 py-2 bg-white/[0.03] text-blue-400 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-4 inline-block">
            รีวิวจากลูกค้า
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-4 mb-6">
            ความประทับใจ <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">จากลูกค้า</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            เสียงตอบรับจากผู้ใช้บริการจริง การันตีด้วยคุณภาพและความพึงพอใจสูงสุดที่เรามอบให้
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-blue-500/30 hover:from-white/[0.05] hover:to-blue-950/20 transition-all duration-300 relative group flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.3)] min-h-[300px]"
            >
              {/* Ambient inner card glow */}
              <div className="absolute -inset-px bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Row: Stars & Quote Watermark */}
              <div className="flex items-center justify-between z-10 mb-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4.5 w-4.5 fill-amber-400 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                  ))}
                </div>
                <Quote className="h-10 w-10 text-blue-500/10 group-hover:text-blue-500/20 group-hover:scale-110 transition-all duration-300" />
              </div>

              {/* Comment text */}
              <p className="text-slate-100 font-medium leading-relaxed mb-6 relative z-10 flex-1 text-[15px] sm:text-base">
                &quot;{review.text}&quot;
              </p>

              {/* Reviewer Row */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-5 mt-auto relative z-10">
                <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
                  <span className="text-white font-extrabold text-base">{review.initial}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-bold text-white text-sm sm:text-base truncate">{review.name}</h4>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 select-none">
                      <BadgeCheck className="h-3.5 w-3.5 shrink-0" />
                      <span className="text-[10px] font-bold whitespace-nowrap">ลูกค้าจริง</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{review.role} • {review.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
