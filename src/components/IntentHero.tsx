import React from "react";

interface IntentHeroProps {
  h1: string;
  supporting: string;
  badge?: string;
  className?: string;
}

export default function IntentHero({ h1, supporting, badge, className = "" }: IntentHeroProps) {
  return (
    <div className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 ${className}`}>
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto gap-4 md:gap-5 relative z-10">
        {badge && (
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs">
              {badge}
            </span>
          </div>
        )}
        
        {/* Visible, Natural H1 */}
        <h1 className="font-sans text-3xl sm:text-4xl lg:text-[3.25rem] font-black text-[#0B1F3A] tracking-tight leading-[1.25] text-balance">
          {h1}
        </h1>
        
        {/* Supporting statement */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-[1.65] max-w-3xl text-pretty">
          {supporting}
        </p>
        
        {/* Subtle accent bar */}
        <div className="w-16 h-1 bg-blue-600 rounded-full mt-1" />
      </div>
    </div>
  );
}
