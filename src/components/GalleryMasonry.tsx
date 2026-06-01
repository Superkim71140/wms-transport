"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X, ChevronLeft, ChevronRight, Bike, Truck, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type Project = {
  id: number;
  category: string;
  serviceType: string;
  location: string;
  icon: React.ReactNode;
  imgUrl: string;
  desc: string;
};

const projects: Project[] = [
  {
    id: 1,
    category: "ขนส่งมอเตอร์ไซค์",
    serviceType: "ขนส่งรถมอเตอร์ไซค์ / บิ๊กไบค์",
    location: "ผลงานจริง",
    icon: <Bike className="w-5 h-5" />,
    imgUrl: "/images/WMS24.webp",
    desc: "ตัวอย่างงานขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์ โดยมีการดูแลการแพ็กและขนย้ายอย่างปลอดภัย"
  },
  {
    id: 2,
    category: "ขนส่งมอเตอร์ไซค์",
    serviceType: "ส่งมอเตอร์ไซค์ถึงหน้าบ้าน",
    location: "กรุงเทพ",
    icon: <Bike className="w-5 h-5" />,
    imgUrl: "/images/WM12.webp",
    desc: "ส่งมอบรถมอเตอร์ไซค์บิ๊กไบค์ถึงมือลูกค้าอย่างปลอดภัย รวดเร็วทันใจ พร้อมประกันความเสียหาย"
  },
  {
    id: 3,
    category: "ย้ายบ้าน/คอนโด",
    serviceType: "ย้ายบ้าน",
    location: "สมุทรสาคร",
    icon: <Truck className="w-5 h-5" />,
    imgUrl: "/images/WM15.webp",
    desc: "จัดเรียงสิ่งของและเฟอร์นิเจอร์ขึ้นรถอย่างเป็นระเบียบ แพ็กซีลกันกระแทกอย่างดี ปลอดภัยทุกขั้นตอน"
  },
  {
    id: 4,
    category: "ย้ายบ้าน/คอนโด",
    serviceType: "ขนย้ายคอนโด",
    location: "บางนา",
    icon: <Package className="w-5 h-5" />,
    imgUrl: "/images/WM16.webp",
    desc: "ขนย้ายสัมภาระส่วนตัว กล่องใส่ของ และเฟอร์นิเจอร์เข้าคอนโดมิเนียมชั้นสูงอย่างรวดเร็วและเป็นมืออาชีพ"
  },
  {
    id: 6,
    category: "ขนส่งสินค้าทั่วไป",
    serviceType: "ขนส่งทั่วไป",
    location: "นนทบุรี",
    icon: <Package className="w-5 h-5" />,
    imgUrl: "/images/WM10.webp",
    desc: "ขนย้ายตู้เย็น เครื่องใช้ไฟฟ้าขนาดใหญ่ และกล่องสินค้าทั่วไปพร้อมพนักงานช่วยยกอย่างปลอดภัย"
  }
];

function GalleryCard({
  project,
  idx,
  onClick,
}: {
  project: Project;
  idx: number;
  onClick: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="relative cursor-pointer group aspect-[4/3] sm:aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4] h-[380px] sm:h-[420px] md:h-[450px] lg:h-[480px] xl:h-[500px] shine-effect w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center md:snap-align-none"
    >
      {/* Image Container with reflection and skeleton loader */}
      <div
        className={`absolute inset-0 rounded-3xl overflow-hidden transition-all duration-500 [-webkit-box-reflect:below_4px_linear-gradient(transparent_50%,rgba(255,255,255,0.15))] ${
          !isLoaded ? "bg-slate-800/80 animate-pulse" : ""
        }`}
      >
        <Image
          src={project.imgUrl}
          alt={`${project.serviceType} ${project.location}`}
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
          className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onLoad={() => setIsLoaded(true)}
          priority={idx <= 1}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500"></div>

        {/* Expand Indicator on Hover */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <div className="bg-blue-600/90 p-5 rounded-full text-white backdrop-blur-md transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            <Search className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Text details at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white h-1/2 z-10 bg-gradient-to-t from-[#040b15] via-[#040b15]/95 to-transparent rounded-b-3xl pointer-events-none">
        {/* Badge layout: Icon, Service type, Location */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-base sm:text-lg font-bold text-blue-400 flex items-center gap-2">
            <div className="flex items-center justify-center p-1.5 bg-blue-500/10 border border-blue-400/20 rounded-md shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              {project.icon}
            </div>
            {project.serviceType}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-xs font-bold bg-white/10 border border-white/10 px-2.5 py-1 rounded-md text-slate-200 backdrop-blur-sm">
            {project.location}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed line-clamp-3 transition-colors duration-300 group-hover:text-white">
          {project.desc}
        </p>
      </div>

      {/* Ambient Hover Glow Border */}
      <div className="absolute inset-0 border border-transparent group-hover:border-blue-500/20 rounded-3xl pointer-events-none transition-all duration-500 z-20"></div>

      {/* Card Border Overlay */}
      <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none z-20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"></div>

      {/* Expand Indicator on Hover Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-30 rounded-b-3xl" />
    </motion.div>
  );
}

export default function GalleryMasonry() {
  const [selectedFilter, setSelectedFilter] = useState("ทั้งหมด");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSnapIndex, setActiveSnapIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  const categories = ["ทั้งหมด", "ย้ายบ้าน/คอนโด", "ขนส่งมอเตอร์ไซค์", "ขนส่งสินค้าทั่วไป"];

  const filteredProjects = selectedFilter === "ทั้งหมด" 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setLightboxLoaded(false);
  }, [lightboxIndex]);

  // Body scroll lock effect
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => prev !== null ? (prev + 1) % filteredProjects.length : null);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => prev !== null ? (prev - 1 + filteredProjects.length) % filteredProjects.length : null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, filteredProjects.length]);

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredProjects.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const totalItems = filteredProjects.length;
    
    if (maxScroll <= 0) return;
    
    const index = Math.round((scrollPosition / maxScroll) * (totalItems - 1));
    setActiveSnapIndex(index);
  };

  return (
    <div className="space-y-12 font-sans w-full relative z-10">
      
      {/* Headlines */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 mb-4"
        >
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase">
            ผลงานจริงของเรา
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-6"
        >
          ผลงานจริง<span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">จากลูกค้าของเรา</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed"
        >
          ภาพหน้างานจริง ไม่มีภาพสต็อก ทุกงานดำเนินการโดยทีมงาน WMS TRANSPORT
        </motion.p>
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-md w-fit mx-auto mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedFilter(cat);
              setLightboxIndex(null);
              setActiveSnapIndex(0);
            }}
            className={`px-6 py-3 min-h-[44px] flex items-center justify-center text-[13px] font-bold rounded-full transition-all duration-300 ${
              selectedFilter === cat
                ? "bg-gradient-to-r from-blue-600/80 to-blue-500/60 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/50 text-white scale-105"
                : "bg-transparent text-slate-300 border-transparent hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout (3 desktop, 2 tablet, 1 mobile) */}
      <motion.div 
        layout
        onScroll={handleScroll}
        className="flex flex-nowrap w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide gap-6 pb-12 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <GalleryCard
              key={project.id}
              project={project}
              idx={idx}
              onClick={() => setLightboxIndex(idx)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Scroll Progress Indicator */}
      <div className="flex md:hidden justify-center items-center gap-2 mt-2">
        {filteredProjects.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeSnapIndex 
                ? "bg-blue-500 w-6 shadow-[0_0_8px_rgba(59,130,246,0.8)]" 
                : "bg-white/20 w-2"
            }`}
          />
        ))}
      </div>

      {/* Lightbox / Modal */}
      {lightboxIndex !== null && (
        isMobile ? (
          /* Mobile "IG Story" style Lightbox */
          <div 
            className="fixed inset-0 z-[120] bg-black flex flex-col justify-between select-none overflow-hidden"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Segmented Progress Bar */}
            <div className="absolute top-4 left-4 right-4 z-[140] flex gap-1">
              {filteredProjects.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i === lightboxIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* Close Button - Highly visible, touch-friendly */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              aria-label="Close preview"
              className="absolute top-8 right-4 z-[140] w-12 h-12 bg-black/40 border border-white/20 rounded-full text-white flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Tap Zones */}
            <div 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-0 top-0 bottom-0 w-[30%] z-[130] cursor-pointer"
            />
            <div 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-0 top-0 bottom-0 w-[70%] z-[130] cursor-pointer"
            />

            {/* Main Image Container with Skeleton */}
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <div className={`relative w-full h-[80vh] ${!lightboxLoaded ? "bg-slate-900 animate-pulse" : ""}`}>
                <Image
                  src={filteredProjects[lightboxIndex].imgUrl}
                  alt={`${filteredProjects[lightboxIndex].serviceType} ${filteredProjects[lightboxIndex].location}`}
                  fill
                  className={`object-contain transition-opacity duration-500 ${lightboxLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setLightboxLoaded(true)}
                  priority
                />
              </div>
            </div>

            {/* Bottom Details Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pt-24 text-left bg-gradient-to-t from-black via-black/80 to-transparent z-[135] pointer-events-none">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-400 font-bold text-sm flex items-center gap-1.5">
                  <div className="flex items-center justify-center p-1 bg-blue-500/10 border border-blue-400/20 rounded-md">
                    {filteredProjects[lightboxIndex].icon}
                  </div>
                  {filteredProjects[lightboxIndex].serviceType}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-md text-slate-200">
                  {filteredProjects[lightboxIndex].location}
                </span>
              </div>
              <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-xl">
                {filteredProjects[lightboxIndex].desc}
              </p>
            </div>
          </div>
        ) : (
          /* Desktop style Lightbox */
          <div 
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]/95 backdrop-blur-xl animate-fade-in"
          >
            {/* Close Button - Glassmorphic, highly visible, and touch-friendly */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              aria-label="Close image preview"
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-slate-950/85 hover:bg-red-600/90 active:scale-95 border border-white/25 rounded-full text-white transition-all duration-300 z-[120] shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer backdrop-blur-md hover:scale-105"
            >
              <X className="h-6 w-6 md:h-7 md:w-7" />
            </button>

            {/* Prev Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              aria-label="Previous image"
              className="absolute left-4 md:left-8 p-4 bg-white/5 hover:bg-blue-600/50 border border-white/10 rounded-full text-white transition-all duration-300 z-[110] backdrop-blur-md cursor-pointer"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Main Image Container */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] px-4 md:px-16 flex flex-col items-center justify-center"
            >
              <div className={`relative w-full h-full drop-shadow-2xl ${!lightboxLoaded ? "bg-slate-900 animate-pulse rounded-2xl" : ""}`}>
                <Image
                  src={filteredProjects[lightboxIndex].imgUrl}
                  alt={`${filteredProjects[lightboxIndex].serviceType} ${filteredProjects[lightboxIndex].location}`}
                  fill
                  className={`object-contain transition-opacity duration-500 ${lightboxLoaded ? "opacity-100" : "opacity-0"}`}
                  sizes="100vw"
                  onLoad={() => setLightboxLoaded(true)}
                  priority
                />
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center bg-gradient-to-t from-[#020817] via-[#020817]/85 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-blue-400 font-black text-base md:text-lg flex items-center gap-2">
                    <div className="flex items-center justify-center p-1 bg-blue-500/10 border border-blue-400/20 rounded-md shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                      {filteredProjects[lightboxIndex].icon}
                    </div>
                    {filteredProjects[lightboxIndex].serviceType}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs bg-white/10 border border-white/10 px-2.5 py-1 rounded-md text-slate-200">
                    {filteredProjects[lightboxIndex].location}
                  </span>
                </div>
                <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl mx-auto font-medium leading-relaxed">
                  {filteredProjects[lightboxIndex].desc}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              aria-label="Next image"
              className="absolute right-4 md:right-8 p-4 bg-white/5 hover:bg-blue-600/50 border border-white/10 rounded-full text-white transition-all duration-300 z-[110] backdrop-blur-md cursor-pointer"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

          </div>
        )
      )}
    </div>
  );
}
