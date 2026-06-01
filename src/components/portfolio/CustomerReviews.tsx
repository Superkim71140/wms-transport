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

      <div className="max-w-7xl mx-auto relative z-10 font-sans">
        <div className="text-center mb-16">
          <span className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)] mb-4 inline-block">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-4 mb-6">
            ความประทับใจจากลูกค้า
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
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
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-white/[0.02] p-8 rounded-3xl border border-white/10 hover:border-blue-500/30 relative group hover:-translate-y-2 transition-all duration-300 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-white/5 group-hover:text-blue-500/10 transition-colors" />

              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="h-5 w-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                ))}
              </div>

              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-8 relative z-10 flex-1">
                &quot;{review.text}&quot;
              </p>

              <div className="flex items-center gap-4 border-t border-slate-100 dark:border-white/5 pt-6 mt-auto">
                <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center shadow-sm">
                   <span className="text-white font-bold text-lg">{review.initial}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-navy dark:text-white text-sm">{review.name}</h4>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <BadgeCheck className="h-3 w-3" />
                      <span className="text-[10px] font-bold">ลูกค้าจริง</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{review.role} • {review.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
