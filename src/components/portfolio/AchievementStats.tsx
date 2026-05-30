"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Map } from "lucide-react";

const STATS = [
  { value: "10,000+", label: "งานขนส่งเสร็จสิ้น", icon: TrendingUp },
  { value: "24/7", label: "ดูแลช่วยเหลือตลอดเวลา", icon: Clock },
  { value: "100%", label: "ผลงานจากลูกค้าจริง", icon: Star },
  { value: "77", label: "จังหวัดครอบคลุมทั่วไทย", icon: Map },
];

export default function AchievementStats() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-navy-dark relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center text-center p-6 sm:p-8 bg-slate-50 dark:bg-navy-light/40 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(214,40,40,0.1)] hover:-translate-y-2 hover:border-red/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-16 w-16 rounded-2xl bg-white dark:bg-navy flex items-center justify-center text-red mb-6 shadow-sm border border-slate-100 dark:border-white/5 group-hover:scale-110 group-hover:bg-red group-hover:text-white transition-all duration-300 z-10">
                <stat.icon className="h-8 w-8" />
              </div>
              <p className="relative text-3xl sm:text-5xl font-black text-navy dark:text-white tracking-tight mb-2 z-10 font-sans">
                {stat.value}
              </p>
              <p className="relative text-sm font-bold text-slate-500 dark:text-slate-400 z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
