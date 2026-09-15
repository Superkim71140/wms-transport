"use client";

import { useState } from "react";
import Image from "next/image";
import { Bike, Truck, Package, CheckCircle2 } from "lucide-react";
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
    icon: <Bike className="w-4 h-4" />,
    imgUrl: "/images/WMS24.webp",
    desc: "ตัวอย่างงานขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์ โดยมีการดูแลการแพ็กและขนย้ายอย่างปลอดภัย"
  },
  {
    id: 2,
    category: "ขนส่งมอเตอร์ไซค์",
    serviceType: "ส่งมอเตอร์ไซค์ถึงหน้าบ้าน",
    location: "กรุงเทพ",
    icon: <Bike className="w-4 h-4" />,
    imgUrl: "/images/WM12.webp",
    desc: "ส่งมอบรถมอเตอร์ไซค์บิ๊กไบค์ถึงมือลูกค้าอย่างปลอดภัย รวดเร็วทันใจ พร้อมดูแลความปลอดภัยของสิ่งของ"
  },
  {
    id: 3,
    category: "ย้ายบ้าน/คอนโด",
    serviceType: "ย้ายบ้าน",
    location: "สมุทรสาคร",
    icon: <Truck className="w-4 h-4" />,
    imgUrl: "/images/WM15.webp",
    desc: "จัดเรียงสิ่งของและเฟอร์นิเจอร์ขึ้นรถอย่างเป็นระเบียบ แพ็กซีลกันกระแทกอย่างดี ปลอดภัยทุกขั้นตอน"
  },
  {
    id: 4,
    category: "ย้ายบ้าน/คอนโด",
    serviceType: "ขนย้ายคอนโด",
    location: "บางนา",
    icon: <Package className="w-4 h-4" />,
    imgUrl: "/images/WM16.webp",
    desc: "ขนย้ายสัมภาระส่วนตัว กล่องใส่ของ และเฟอร์นิเจอร์เข้าคอนโดมิเนียมชั้นสูงอย่างรวดเร็วและเป็นมืออาชีพ"
  },
  {
    id: 6,
    category: "ขนส่งสินค้าทั่วไป",
    serviceType: "ขนส่งทั่วไป",
    location: "นนทบุรี",
    icon: <Package className="w-4 h-4" />,
    imgUrl: "/images/WM10.webp",
    desc: "ขนย้ายตู้เย็น เครื่องใช้ไฟฟ้าขนาดใหญ่ และกล่องสินค้าทั่วไปพร้อมพนักงานช่วยยกอย่างปลอดภัย"
  }
];

function GalleryCard({ project, index }: { project: Project; index: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 lg:aspect-16/11">
        <Image
          src={project.imgUrl}
          alt={`${project.serviceType} ${project.location}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={78}
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          priority={index < 2}
        />

        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-200" />
        )}

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#06C755]" />
          งานจริง
        </div>
      </div>

      <div className="p-5 relative z-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
            {project.icon}
            {project.serviceType}
          </span>

          <span className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            {project.location}
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-600 line-clamp-3">
          {project.desc}
        </p>

        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
          <CheckCircle2 className="h-4 w-4 text-[#06C755]" />
          <span>งานจริงโดยทีม WMS TRANSPORT</span>
        </div>
      </div>
    </article>
  );
}

export default function GalleryMasonry() {
  const [selectedFilter, setSelectedFilter] = useState("ทั้งหมด");

  const categories = ["ทั้งหมด", "ย้ายบ้าน/คอนโด", "ขนส่งมอเตอร์ไซค์", "ขนส่งสินค้าทั่วไป"];

  const filteredProjects =
    selectedFilter === "ทั้งหมด"
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const imageSchema = filteredProjects.map(project => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": `https://wms-transport.com${project.imgUrl}`,
    "name": `${project.serviceType} - ${project.location}`,
    "caption": project.desc,
    "creator": {
      "@id": "https://wms-transport.com/#moving-company"
    }
  }));

  return (
    <div className="relative z-10 w-full font-sans content-auto section-contain">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} 
      />
      <div className="mx-auto max-w-3xl text-center mb-10">
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 tracking-wide">
          ผลงานจริงของเรา
        </span>

        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-[#0B1F3A]">
          ผลงานจริง
          <span className="text-blue-600">จากลูกค้าของเรา</span>
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          ภาพหน้างานจริง ไม่มีภาพสต็อก ทุกงานดำเนินการโดยทีมงาน WMS TRANSPORT
        </p>
      </div>

      <div className="mx-auto mb-10 flex w-fit max-w-full gap-2 overflow-x-auto sm:flex-wrap rounded-xl border border-slate-200 bg-slate-100 p-1.5 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedFilter(cat)}
            className={`min-h-[40px] shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200 ${
              selectedFilter === cat
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filteredProjects.map((project, index) => (
            <GalleryCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
