"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X, ChevronLeft, ChevronRight, Bike, Truck, Package } from "lucide-react";
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
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group aspect-[4/3] sm:aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4] h-[380px] sm:h-[420px] md:h-[450px] lg:h-[480px] xl:h-[500px] shine-effect w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center md:snap-align-none transition-all duration-300 transform scale-100 hover:scale-[1.01]"
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
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={80}
          className={`object-cover object-center transition-all duration-700 ease-out md:group-hover:scale-110 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
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
    </div>
  );
}

export default function GalleryMasonry() {
  const [selectedFilter, setSelectedFilter] = useState("ทั้งหมด");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSnapIndex, setActiveSnapIndex] = useState(0);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  const categories = ["ทั้งหมด", "ย้ายบ้าน/คอนโด", "ขนส่งมอเตอร์ไซค์", "ขนส่งสินค้าทั่วไป"];

  const filteredProjects = selectedFilter === "ทั้งหมด" 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

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
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredProjects.length : null));
        setLightboxLoaded(false);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredProjects.length) % filteredProjects.length : null));
        setLightboxLoaded(false);
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
      setLightboxLoaded(false);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length);
      setLightboxLoaded(false);
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
        <div className="flex flex-col items-center gap-4 mb-4">
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase">
            ผลงานจริงของเรา
          </span>
        </div>
        
        <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-6">
          ผลงานจริง<span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">จากลูกค้าของเรา</span>
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
          ภาพหน้างานจริง ไม่มีภาพสต็อก ทุกงานดำเนินการโดยทีมงาน WMS TRANSPORT
        </p>
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
      <div 
        onScroll={handleScroll}
        className="flex flex-nowrap w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide gap-6 pb-12 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-12"
      >
        {filteredProjects.map((project, idx) => (
          <GalleryCard
            key={project.id}
            project={project}
            onClick={() => { setLightboxIndex(idx); setLightboxLoaded(false); }}
          />
        ))}
      </div>

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
        <div 
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#020617]/95 p-3 backdrop-blur-xl sm:p-6 select-none animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="ดูรูปผลงาน"
        >
          {/* Back button */}
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="ย้อนกลับ"
            className="fixed left-3 top-3 z-[100000] inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-slate-950/90 px-4 py-2 text-sm font-bold text-white shadow-2xl backdrop-blur-xl transition hover:bg-white/10 sm:left-6 sm:top-6"
          >
            <span aria-hidden="true">←</span>
            <span>ย้อนกลับ</span>
          </button>

          {/* Close button */}
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="ปิดรูปภาพ"
            className="fixed right-3 top-3 z-[100000] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/90 text-white shadow-2xl backdrop-blur-xl transition hover:bg-red-600/90 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev Button */}
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Previous image"
            className="fixed left-4 top-1/2 z-[100000] flex h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-white backdrop-blur-xl transition hover:bg-blue-600/70 sm:left-6 md:left-8 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Main Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto flex w-full max-w-[min(92vw,920px)] flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-950/85 p-2 shadow-[0_30px_120px_rgba(0,0,0,0.75)] sm:p-3 lg:max-w-[min(86vw,980px)] z-[10005]"
          >
            <div className={`relative flex max-h-[62vh] min-h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl bg-black/40 sm:max-h-[70vh] lg:max-h-[74vh] ${!lightboxLoaded ? "animate-pulse" : ""}`}>
              <Image
                src={filteredProjects[lightboxIndex].imgUrl}
                alt={`${filteredProjects[lightboxIndex].serviceType} ${filteredProjects[lightboxIndex].location}`}
                width={1200}
                height={900}
                className={`h-auto max-h-[62vh] w-auto max-w-full rounded-2xl object-contain sm:max-h-[70vh] lg:max-h-[74vh] transition-opacity duration-500 ${lightboxLoaded ? "opacity-100" : "opacity-0"}`}
                priority
                sizes="(max-width: 768px) 94vw, 920px"
                onLoad={() => setLightboxLoaded(true)}
              />
            </div>
            
            {/* Caption Area */}
            <div className="w-full px-3 py-3 text-center sm:px-5 sm:py-4">
              <div className="mb-1 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300 ring-1 ring-blue-400/20">
                  {filteredProjects[lightboxIndex].serviceType}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200 ring-1 ring-white/10">
                  {filteredProjects[lightboxIndex].location}
                </span>
              </div>
              <p className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
                {filteredProjects[lightboxIndex].desc}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next image"
            className="fixed right-4 top-1/2 z-[100000] flex h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-white backdrop-blur-xl transition hover:bg-blue-600/70 sm:right-6 md:right-8 active:scale-95"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
