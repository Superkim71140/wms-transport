"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FILTERS = ["ทั้งหมด", "ย้ายบ้าน", "ย้ายคอนโด", "ขนส่งมอเตอร์ไซค์", "ขนย้ายออฟฟิศ", "แพ็กของ", "งานขนส่งจริง"];

const GALLERY_IMAGES = [
  { id: 1, src: "/images/WM8.webp", category: "ขนส่งมอเตอร์ไซค์" },
  { id: 2, src: "/images/WM9.webp", category: "แพ็กของ" },
  { id: 3, src: "/images/WM10.webp", category: "ย้ายบ้าน" },
  { id: 4, src: "/images/WM11.webp", category: "ขนส่งมอเตอร์ไซค์" },
  { id: 5, src: "/images/WM12.webp", category: "งานขนส่งจริง" },
  { id: 6, src: "/images/WM13.webp", category: "แพ็กของ" },
  { id: 8, src: "/images/WM15.webp", category: "ย้ายคอนโด" },
  { id: 9, src: "/images/WM16.webp", category: "งานขนส่งจริง" },
  { id: 10, src: "/images/WM17.webp", category: "แพ็กของ" },
  { id: 12, src: "/images/WMS4.webp", category: "งานขนส่งจริง" },
  { id: 13, src: "/images/WMS6.webp", category: "งานขนส่งจริง" },
  { id: 14, src: "/images/WMS24.webp", category: "งานขนส่งจริง" },
];

const formatFilenameToTag = (src: string) => {
  const filename = src.split("/").pop()?.split(".")[0] || "";
  if (filename.startsWith("WM") || filename.startsWith("WMS")) return "WMS Transport";
  return filename
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด");

  const filteredImages = GALLERY_IMAGES.filter(img => 
    activeFilter === "ทั้งหมด" ? true : img.category === activeFilter
  );

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white min-h-screen relative z-0">
      <div className="max-w-7xl mx-auto relative z-10 font-sans">
        <div className="text-center mb-10 md:mb-14">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wide mb-3 inline-block">
            แกลเลอรีผลงาน
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mb-3">
            ภาพผลงานจริง <span className="text-blue-600">จากสถานที่</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            สัมผัสความเป็นมืออาชีพผ่านผลงานการขนย้ายจริงของเรา ที่ใส่ใจในทุกรายละเอียดเพื่อความพึงพอใจสูงสุดของคุณ
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[40px] flex items-center justify-center cursor-pointer ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 border border-slate-200/80 hover:bg-white hover:text-slate-900"
              }`}
            >
              <span>{filter}</span>
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                key={img.id}
                className="relative rounded-2xl overflow-hidden group break-inside-avoid bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <Image 
                    src={img.src} 
                    alt={formatFilenameToTag(img.src)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    priority={img.id <= 4}
                  />
                  
                  {/* Subtle bottom gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end text-left">
                    <span className="inline-block self-start px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider mb-1.5 rounded-md shadow-xs">
                      {img.category}
                    </span>
                    <h4 className="text-white font-bold text-base tracking-wide drop-shadow-sm">
                      {formatFilenameToTag(img.src)}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
