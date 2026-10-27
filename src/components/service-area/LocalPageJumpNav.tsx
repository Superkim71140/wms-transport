"use client";

import React from "react";
import { ArrowDown, Layers, Image as ImageIcon, MapPin, FileText } from "lucide-react";

export interface JumpNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface LocalPageJumpNavProps {
  className?: string;
  areaName?: string;
}

const DEFAULT_JUMP_LINKS: JumpNavItem[] = [
  { id: "services", label: "บริการที่รองรับ", icon: Layers },
  { id: "evidence", label: "ผลงานจริงและมาตรฐาน", icon: ImageIcon },
  { id: "local-logistics", label: "ข้อมูลพื้นที่และเส้นทาง", icon: MapPin },
  { id: "quote-prep", label: "เตรียมประเมินราคา", icon: FileText },
];

/**
 * LocalPageJumpNav
 * 
 * Provides concise in-page anchor links for quick visitor navigation:
 * - Services (#services)
 * - Real Job Evidence & Standards (#evidence)
 * - Coverage & Logistics (#local-logistics)
 * - Quotation Preparation (#quote-prep)
 * 
 * Preserves anchor IDs, uses smooth scrolling, and accounts for fixed header offset.
 */
export default function LocalPageJumpNav({
  className = "",
  areaName,
}: LocalPageJumpNavProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update hash in URL without jumping
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <nav
      aria-label={`เมนูกระโดดข้ามส่วนเนื้อหาหน้า${areaName ? ` ${areaName}` : ""}`}
      className={`w-full bg-slate-50/90 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 mb-8 shadow-2xs ${className}`}
    >
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 px-2 hidden sm:inline-flex items-center gap-1">
          <ArrowDown className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>หัวข้อสำคัญ:</span>
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
          {DEFAULT_JUMP_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 hover:border-blue-300 transition-all active:scale-[0.98] whitespace-nowrap shadow-2xs min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Icon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
