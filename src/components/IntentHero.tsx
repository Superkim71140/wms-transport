import React from "react";

interface IntentHeroProps {
  h1: string;
  supporting: string;
  badge?: string;
  className?: string;
}

export default function IntentHero({ h1, supporting, badge, className = "" }: IntentHeroProps) {
  return (
    <div className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center z-10 ${className}`}>
      {/* Glow Effect behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[150px] sm:h-[300px] bg-blue-500/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -z-10" />
      
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto gap-4 md:gap-6 bg-slate-950/45 backdrop-blur-md px-6 py-8 sm:px-10 sm:py-12 rounded-3xl border border-white/5 shadow-2xl relative z-10">
        {badge && (
          <div className="flex justify-center z-20">
            <span className="inline-flex items-center px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-black tracking-wider uppercase shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              {badge}
            </span>
          </div>
        )}
        
        {/* Visible, Natural H1 */}
        <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.4] drop-shadow-md z-20">
          {h1}
        </h1>
        
        {/* Supporting statement */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 font-medium leading-[1.6] max-w-2xl drop-shadow-sm z-20">
          {supporting}
        </p>
        
        {/* Decorative separator line */}
        <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-indigo-500 rounded-full mt-2 opacity-60 z-20" />
      </div>
    </div>
  );
}
