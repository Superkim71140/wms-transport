"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], ["0%", "20%"]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full h-[280px] sm:h-[340px] md:h-[68vh] md:min-h-[560px] overflow-hidden">
      {/* Hero Cover Image with Parallax */}
      <motion.div
        style={{ y: isMobile ? "0%" : y }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/wms-cover.webp"
          alt="WMS Transport Cover — รถกระบะตู้ทึบรับจ้าง"
          fill
          sizes="100vw"
          className="object-cover object-[center_32%]"
          priority
          fetchPriority="high"
        />
      </motion.div>

      {/* Dark overlay gradient to blend into the page below */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/30 via-transparent to-[#020817] pointer-events-none z-10" />

      {/* Subtle floating blurred light sources (depth effect) */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="absolute top-[5%] left-[-5%] w-[900px] h-[900px] bg-blue-600/[0.05] rounded-full blur-[200px]" />
        <div className="absolute top-[30%] right-[-10%] w-[700px] h-[700px] bg-indigo-500/[0.06] rounded-full blur-[200px]" />
      </div>

      {/* Subtle dot grid overlay — kept inside hero section only */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none z-20" />
    </section>
  );
}
