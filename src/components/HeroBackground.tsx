import React from "react";

export default function HeroBackground({ children }: { children?: React.ReactNode }) {
  return (
    <section className="relative w-full max-w-full pt-20 pb-10 sm:pt-22 sm:pb-12 md:pt-24 md:pb-14 overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white flex flex-col items-center justify-center border-b border-slate-200/60">
      {/* Soft atmospheric ambient tints */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[350px] bg-blue-400/8 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[300px] bg-sky-400/6 rounded-full blur-[120px]" />
      </div>

      {children && <div className="relative z-10 w-full">{children}</div>}
    </section>
  );
}
