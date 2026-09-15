"use client";

import { motion } from "framer-motion";
import { PhoneCall, ClipboardList, Box, Truck, CheckCircle } from "lucide-react";

const PROCESS_STEPS = [
  { id: 1, title: "รับงานและประเมินราคา", desc: "ติดต่อเราเพื่อแจ้งรายละเอียดงานและรับใบเสนอราคาฟรีไม่มีค่าใช้จ่าย", icon: PhoneCall },
  { id: 2, title: "วางแผนการขนย้าย", desc: "ทีมงานจัดเตรียมรถและอุปกรณ์ที่เหมาะสมกับประเภทสินค้าของคุณ", icon: ClipboardList },
  { id: 3, title: "แพ็กและป้องกัน", desc: "เข้าพื้นที่เพื่อแพ็กสินค้าด้วยวัสดุกันกระแทกคุณภาพสูง ถอดประกอบเฟอร์นิเจอร์", icon: Box },
  { id: 4, title: "ขนย้ายและเดินทาง", desc: "ขนส่งอย่างระมัดระวังด้วยรถกระบะตู้ทึบ ควบคุมความเร็วและติดตามสถานะได้", icon: Truck },
  { id: 5, title: "ส่งมอบเรียบร้อย", desc: "จัดวางสิ่งของในตำแหน่งที่ต้องการ ตรวจสอบความเรียบร้อยก่อนส่งมอบงาน", icon: CheckCircle },
];

export default function PortfolioProcess() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wide mb-3 inline-block">
            ขั้นตอนการทำงาน
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight font-sans mt-2">
            ขั้นตอนการทำงาน <span className="text-blue-600">ของเรา</span>
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-base">
            เราทำงานอย่างเป็นระบบทุกขั้นตอน เพื่อให้คุณมั่นใจได้ว่าสินค้าจะถึงที่หมายอย่างปลอดภัย
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-10 left-0 w-full h-0.5 bg-blue-200 hidden lg:block z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-18 h-18 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200 relative">
                  <step.icon className="w-7 h-7" />
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] mb-2 font-sans group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-1 font-medium">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
