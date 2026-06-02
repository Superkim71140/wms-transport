import Image from "next/image";

export default function HeroBackground() {
  return (
    <section className="relative w-full max-w-full pt-16 sm:pt-20 md:pt-0 h-[280px] sm:h-[340px] md:h-[68vh] md:min-h-[560px] overflow-hidden bg-[#020817]">
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/30 via-transparent to-[#020817] pointer-events-none z-10" />

      {/* Subtle floating blurred light sources (depth effect) - Desktop Only */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden hidden md:block">
        <div className="absolute top-[5%] left-[-5%] w-[600px] h-[600px] bg-blue-600/[0.05] rounded-full blur-[150px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/[0.06] rounded-full blur-[150px]" />
      </div>

      {/* Subtle dot grid overlay — kept inside hero section only */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none z-20" />
    </section>
  );
}
