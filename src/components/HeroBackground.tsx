import Image from "next/image";
import React from "react";

export default function HeroBackground({ children }: { children?: React.ReactNode }) {
  return (
    <section className="relative w-full max-w-full pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-0 md:pb-0 min-h-[380px] md:h-[68vh] md:min-h-[560px] overflow-hidden bg-[#020817] flex items-center justify-center">
      {/* Hero Cover Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/wms-cover.webp"
          alt="WMS Transport Cover — รถกระบะตู้ทึบรับจ้าง"
          fill
          sizes="100vw"
          className="object-cover object-[center_32%]"
          priority
          fetchPriority="high"
        />
      </div>

      {/* Dark overlay gradient to blend into the page below */}
      <div className="absolute inset-0 bg-linear-to-b from-[#020817]/40 via-transparent to-[#020817] pointer-events-none z-10" />

      {/* Subtle floating blurred light sources (depth effect) - Desktop Only */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden hidden md:block">
        <div className="absolute top-[5%] left-[-5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/6 rounded-full blur-[150px]" />
      </div>

      {/* Subtle dot grid overlay — kept inside hero section only */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none z-20" />

      {children && <div className="relative z-30 w-full">{children}</div>}
    </section>
  );
}

