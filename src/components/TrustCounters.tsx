"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { ShieldCheck, Clock3, Award, Map } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  startTrigger: boolean;
}

function CountUp({ end, suffix = "", duration = 1.5, startTrigger }: CounterProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    checkMobile();
  }, []);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString() + suffix);

  useEffect(() => {
    if (isMobile) return;
    if (!startTrigger) return;
    
    const controls = animate(count, end, {
      duration: duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [end, duration, startTrigger, count, isMobile]);

  if (isMobile) {
    return <span>{end.toLocaleString() + suffix}</span>;
  }

  return <motion.span>{rounded}</motion.span>;
}

export default function TrustCounters() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    {
      value: 10000,
      suffix: "+",
      label: "งานที่ให้บริการ",
      desc: "ความไว้วางใจจากลูกค้ากว่าหมื่นราย",
      icon: <ShieldCheck className="h-7 w-7 text-blue-400" />,
      type: "number"
    },
    {
      value: 24,
      suffix: "/7",
      label: "พร้อมให้บริการ",
      desc: "ดูแลช่วยเหลือตลอด 24 ชั่วโมง ไม่มีวันหยุด",
      icon: <Clock3 className="h-7 w-7 text-emerald-400" />,
      type: "number"
    },
    {
      value: 99,
      suffix: "%",
      label: "ความพึงพอใจลูกค้า",
      desc: "คะแนนรีวิวระดับ 5 ดาวจากผู้ใช้จริง",
      icon: <Award className="h-7 w-7 text-amber-400" />,
      type: "number"
    },
    {
      value: "ทั่วไทย",
      label: "ครอบคลุมทุกจังหวัด",
      desc: "ขนส่งขนย้ายสินค้าได้ทุกภูมิภาคทั่วประเทศ",
      icon: <Map className="h-7 w-7 text-sky-400" />,
      type: "text"
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 relative z-10 font-sans section-contain">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <span className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            สถิติและความน่าเชื่อถือ
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 mt-6">
            ความน่าเชื่อถือที่พิสูจน์ได้ด้วย<span className="text-blue-400">ตัวเลข</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            ผลงานจริงและมาตรฐานการบริการระดับประเทศที่พร้อมรองรับงานขนย้ายทุกประเภทของท่าน
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="perf-card rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-300 md:hover:-translate-y-2 md:hover:scale-[1.02] flex flex-col items-center text-center group"
            >
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mb-6 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300 shadow-inner">
                {stat.icon}
              </div>
              
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight mb-3 select-none">
                {stat.type === "number" ? (
                  <CountUp 
                    end={stat.value as number} 
                    suffix={stat.suffix} 
                    startTrigger={isInView} 
                  />
                ) : (
                  <span className="text-white">
                    {stat.value}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-blue-300 mb-2 group-hover:text-blue-400 transition-colors">
                {stat.label}
              </h3>
              
              <p className="text-sm text-slate-400 leading-relaxed max-w-[200px]">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
