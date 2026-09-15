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
    text: "ตอนแรกกังวลมากเพราะเครื่องมือแพทย์เซนซิทีฟต่อแรงกระแทก แต่ทีมงาน WMS ดูแลอย่างระมัดระวัง มีการห่อหุ้มหลายชั้น ถึงที่หมายอย่างปลอดภัยเรียบร้อยดี"
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
    text: "จัดการระบบขนย้ายคลังสินค้าขนาดใหญ่ได้เป็นระบบมากครับ ช่วยลด Downtime ของธุรกิจได้เยอะ ประเมินราคาโปร่งใส แจ้งราคาชัดเจนตรงไปตรงมา"
  }
];

export default function CustomerReviews() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 font-sans">
        <div className="text-center mb-14">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wide mb-3 inline-block">
            รีวิวจากลูกค้า
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mt-2 mb-3">
            ความประทับใจ <span className="text-blue-600">จากลูกค้า</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
            เสียงตอบรับจากผู้ใช้บริการจริง การันตีด้วยคุณภาพและความตั้งใจในงานบริการ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 relative flex flex-col justify-between shadow-xs min-h-[280px]"
            >
              {/* Top Row: Stars & Quote Watermark */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-blue-100" />
              </div>

              {/* Comment text */}
              <p className="text-slate-700 font-normal leading-relaxed mb-6 flex-1 text-sm sm:text-base">
                &quot;{review.text}&quot;
              </p>

              {/* Reviewer Row */}
              <div className="flex items-center gap-3.5 border-t border-slate-100 pt-4 mt-auto">
                <div className="h-10 w-10 rounded-full overflow-hidden shrink-0 bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm">
                  {review.initial}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-[#0B1F3A] text-sm truncate">{review.name}</h4>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 select-none">
                      <BadgeCheck className="h-3 w-3 shrink-0 text-slate-500" />
                      <span className="text-[10px] font-medium whitespace-nowrap">ผู้ใช้บริการ</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{review.role} • {review.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
