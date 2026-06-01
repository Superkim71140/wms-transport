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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#040b15] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/[0.05] rounded-full blur-[180px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/[0.05] rounded-full blur-[180px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="px-5 py-2 bg-white/[0.03] text-blue-400 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-4 inline-block">
            ขั้นตอนการทำงาน
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans mt-4">
            ขั้นตอนการทำงาน <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">ของเรา</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
            เราทำงานอย่างเป็นระบบทุกขั้นตอน เพื่อให้คุณมั่นใจได้ว่าสินค้าจะถึงที่หมายอย่างปลอดภัย
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-10 left-0 w-full h-0.5 bg-white/5 hidden lg:block z-0" />
          
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
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-400 transition-all duration-300 relative">
                  <step.icon className="w-8 h-8" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed px-2">
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
