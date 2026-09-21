"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ShieldCheck, Clock3, Award, Map, CheckCircle2 } from "lucide-react";

interface StatItem {
  image: string;
  alt: string;
  value: number | string;
  suffix?: string;
  label: string;
  desc: string;
  badge: string;
  accentGradient: string;
  iconBg: string;
  iconBorder: string;
  icon: React.ReactNode;
  type: "number" | "text";
}

function StatNumber({ value, suffix = "", type }: { value: number | string; suffix?: string; type: "number" | "text" }) {
  const [displayValue, setDisplayValue] = useState<number | string>(value);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (type !== "number" || typeof value !== "number") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let startTime: number | null = null;
    const duration = 1400; // ms
    let animationFrameId: number;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        observer.disconnect();

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          // Ease-out cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.floor(ease * value));

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(step);
          } else {
            setDisplayValue(value);
          }
        };

        animationFrameId = requestAnimationFrame(step);
      }
    }, { threshold: 0.2 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value, type]);

  return (
    <span ref={containerRef} className="tabular-nums">
      {typeof displayValue === "number" ? displayValue.toLocaleString() + suffix : displayValue}
    </span>
  );
}

export default function TrustCounters() {
  const sectionRef = useRef<HTMLElement>(null);

  const stats: StatItem[] = [
    {
      image: "/WMSA1.webp",
      alt: "บริการขนส่งทั่วไทยครอบคลุมทุกภูมิภาค WMS Transport",
      value: "ทั่วไทย",
      label: "ครอบคลุมทุกภูมิภาค",
      desc: "ขนส่งขนย้ายสินค้าได้ทุกเส้นทางทั่วประเทศ",
      badge: "บริการทั่วไทย",
      accentGradient: "from-sky-500 via-blue-500 to-emerald-400",
      iconBg: "bg-sky-50",
      iconBorder: "border-sky-200",
      icon: <Map className="h-6 w-6 text-sky-600" />,
      type: "text"
    },
    {
      image: "/WMSA2.webp",
      alt: "บริการขนย้ายครบทุกประเภท WMS Transport",
      value: "ครบวงจร",
      label: "บริการขนย้ายครอบคลุม",
      desc: "ย้ายบ้าน คอนโด ส่งมอเตอร์ไซค์ และสินค้าทั่วไป",
      badge: "บริการทุกประเภท",
      accentGradient: "from-blue-600 via-sky-500 to-blue-400",
      iconBg: "bg-blue-50",
      iconBorder: "border-blue-200",
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      type: "text"
    },
    {
      image: "/WMSA3.webp",
      alt: "บริการประสานงานตลอด 24 ชั่วโมง WMS Transport",
      value: 24,
      suffix: "/7",
      label: "พร้อมประสานงาน",
      desc: "สอบถามข้อมูลและประเมินราคาล่วงหน้าได้ตลอดเวลา",
      badge: "ติดต่อได้ตลอด",
      accentGradient: "from-emerald-500 via-teal-500 to-emerald-400",
      iconBg: "bg-emerald-50",
      iconBorder: "border-emerald-200",
      icon: <Clock3 className="h-6 w-6 text-emerald-600" />,
      type: "number"
    },
    {
      image: "/WMSA4.webp",
      alt: "ทีมงานขนย้ายมืออาชีพใส่ใจทุกขั้นตอน WMS Transport",
      value: "มืออาชีพ",
      label: "ใส่ใจทุกขั้นตอน",
      desc: "ทีมงานยกของระมัดระวัง พร้อมอุปกรณ์ป้องกันรอย",
      badge: "ดูแลด้วยใจ",
      accentGradient: "from-blue-600 via-indigo-500 to-emerald-500",
      iconBg: "bg-blue-50",
      iconBorder: "border-blue-200",
      icon: <Award className="h-6 w-6 text-blue-600" />,
      type: "text"
    }
  ];

  return (
    <section 
      id="trust" 
      ref={sectionRef} 
      className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-10 font-sans bg-gradient-to-br from-[#071A33] via-[#0B2A50] to-[#0F3B6D] text-white"
    >
      {/* Subtle ambient radial blue glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_25%,rgba(37,99,235,0.18),transparent)] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Area */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            มาตรฐานบริการที่สร้างความมั่นใจในทุก<span className="text-sky-400">เส้นทาง</span>
          </h2>

          <p className="text-sm sm:text-base text-blue-100/80 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
            ความพร้อมด้านยานพาหนะ ทีมงาน และการดูแลความปลอดภัยของสิ่งของทุกชิ้นตลอดการขนย้าย
          </p>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center min-w-0 relative z-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl sm:rounded-3xl border border-white/20 shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-200 hover:-translate-y-1.5 motion-reduce:transform-none flex flex-col group min-w-0 relative overflow-hidden text-left"
            >
              {/* Main Visual: Clipped square image at top */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <Image
                  src={stat.image}
                  alt={stat.alt}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Compact Content Area */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 items-center text-center">
                {/* Label */}
                <h3 className="text-base sm:text-lg font-bold text-blue-700 mb-1.5 tracking-tight">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 min-h-0 sm:min-h-[2.5rem]">
                  {stat.desc}
                </p>

                {/* Controlled Trust Badge */}
                <div className="mt-auto pt-3 border-t border-slate-100 w-full flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{stat.badge}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
