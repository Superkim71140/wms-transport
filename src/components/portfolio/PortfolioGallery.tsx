"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FILTERS = ["ทั้งหมด", "ย้ายบ้าน", "ย้ายคอนโด", "ขนส่งมอเตอร์ไซค์", "ขนย้ายออฟฟิศ", "แพ็กของ", "งานขนส่งจริง"];

// Updated image dataset according to the requirements
const GALLERY_IMAGES = [
  { id: 1, src: "/images/cargo_packing.jpg", category: "แพ็กของ" },
  { id: 2, src: "/images/condo_moving.jpg", category: "ย้ายคอนโด" },
  { id: 3, src: "/images/home_moving.jpg", category: "ย้ายบ้าน" },
  { id: 4, src: "/images/motorcycle_delivery.jpg", category: "ขนส่งมอเตอร์ไซค์" },
  { id: 5, src: "/images/office_relocation.jpg", category: "ขนย้ายออฟฟิศ" },
  { id: 6, src: "/images/truck_fleet.jpg", category: "งานขนส่งจริง" },
  { id: 7, src: "/images/wms-cover.png", category: "งานขนส่งจริง" },
  { id: 8, src: "/images/WM8.jpg", category: "งานขนส่งจริง" },
  { id: 9, src: "/images/WM9.jpg", category: "แพ็กของ" },
  { id: 10, src: "/images/WM10.jpg", category: "ย้ายบ้าน" },
  { id: 11, src: "/images/WM11.jpg", category: "ขนส่งมอเตอร์ไซค์" },
  { id: 12, src: "/images/WM12.jpg", category: "งานขนส่งจริง" },
  { id: 13, src: "/images/WM13.jpg", category: "แพ็กของ" },
  { id: 14, src: "/images/WM14.jpg", category: "ขนย้ายออฟฟิศ" },
  { id: 15, src: "/images/WM15.jpg", category: "ย้ายคอนโด" },
  { id: 16, src: "/images/WM16.jpg", category: "งานขนส่งจริง" },
  { id: 17, src: "/images/WM17.jpg", category: "แพ็กของ" },
  // Kept the woman standing at the bottom. Assuming WMS7 based on previous analysis.
  { id: 18, src: "/images/WMS7.jpg", category: "งานขนส่งจริง" }, 
];

// Helper to convert filename to an elegant tag
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
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const filteredImages = GALLERY_IMAGES.filter(img => 
    activeFilter === "ทั้งหมด" ? true : img.category === activeFilter
  );

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#040b15] via-[#081325] to-[#040b15] min-h-screen relative overflow-hidden z-0">

      {/* Subtle Dot Pattern Overlay (Matched with FAQ) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10" />

      {/* Premium Ambient Glow Orbs (Matched with FAQ) */}
      <div className="absolute -top-32 left-0 md:left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="absolute -bottom-32 right-0 md:right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 font-sans">
        <div className="text-center mb-16">
          <span className="px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)] mb-4 inline-block">
            Our Gallery
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            ภาพผลงานจริงจากสถานที่
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            สัมผัสความเป็นมืออาชีพผ่านผลงานการขนย้ายจริงของเรา ที่ใส่ใจในทุกรายละเอียดเพื่อความพึงพอใจสูงสุดของคุณ
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="relative z-10">{filter}</span>
              {activeFilter === filter && (
                <motion.div 
                  layoutId="activeFilterBubble"
                  className="absolute inset-0 border-2 border-blue-500 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Masonry Grid (Tailwind Columns for perfect Framer Motion layout support) */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={img.id}
                className="relative rounded-2xl overflow-hidden group break-inside-avoid bg-white/[0.02] border border-white/10 cursor-pointer shadow-md hover:shadow-2xl hover:border-blue-500/30 dark:hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500"
                onMouseEnter={() => setHoveredImage(img.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                {/* Skeleton Loading State Base */}
                <div className="absolute inset-0 bg-slate-800 animate-pulse -z-10" />

                <Image 
                  src={img.src} 
                  alt={formatFilenameToTag(img.src)}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] block"
                  priority={img.id <= 6}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
                  <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.15em] mb-3 rounded-md shadow-lg shadow-blue-500/30">
                      {img.category}
                    </span>

                    
                    {/* Dynamic Tag from Filename */}
                    <h4 className="text-white font-black text-xl lg:text-2xl tracking-wide drop-shadow-md">
                      {formatFilenameToTag(img.src)}
                    </h4>
                    
                    {/* Decorative Line */}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: hoveredImage === img.id ? "40px" : 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="h-1 bg-red mt-3 rounded-full"
                    />
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
