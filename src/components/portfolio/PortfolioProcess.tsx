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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-navy-dark relative overflow-hidden border-t border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            Our Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-navy dark:text-white tracking-tight font-sans">
            ขั้นตอนการทำงานของเรา
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            เราทำงานอย่างเป็นระบบทุกขั้นตอน เพื่อให้คุณมั่นใจได้ว่าสินค้าจะถึงที่หมายอย่างปลอดภัย
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-10 left-0 w-full h-0.5 bg-slate-200 dark:bg-white/10 hidden lg:block z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-navy-light shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 relative">
                  <step.icon className="w-8 h-8" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red text-white flex items-center justify-center text-sm font-bold shadow-md">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2 font-sans group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed px-2">
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
