"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export type GalleryCategory = "all" | "moving" | "freight" | "motorcycle";

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  title: string;
  location?: string;
  category: "moving" | "freight" | "motorcycle";
  tag: string;
  date?: string;
}

export interface ServiceAreaWorkGalleryProps {
  thaiName: string;
  customItems?: GalleryItem[];
}

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-1",
    image: "/images/WM15.webp",
    alt: "สิ่งของและเฟอร์นิเจอร์เครื่องใช้ในบ้านจัดเรียงเต็มท้ายรถกระบะตู้ทึบสำหรับงานย้ายที่พักอาศัย",
    title: "งานขนย้ายของใช้และเฟอร์นิเจอร์บ้านพักอาศัย จัดเรียงในตู้ทึบ",
    category: "moving",
    tag: "ย้ายบ้าน/คอนโด",
  },
  {
    id: "gallery-2",
    image: "/images/WM10.webp",
    alt: "พนักงาน WMS กำลังแพ็กแรปฟิล์มยืดกันรอยเฟอร์นิเจอร์ไม้ก่อนทำการยกเคลื่อนย้าย",
    title: "งานขนย้ายเฟอร์นิเจอร์ แรปฟิล์มยืดกันรอยก่อนขนย้าย",
    category: "moving",
    tag: "ย้ายบ้าน/คอนโด",
  },
  {
    id: "gallery-3",
    image: "/images/WM8.webp",
    alt: "รถกระบะตอนเดียวตู้ทึบ WMS จอดประจำจุดโหลดสินค้าในโรงงานอุตสาหกรรม",
    title: "รถกระบะตู้ทึบเทียบจุดโหลดสินค้า ณ โกดังโรงงาน",
    category: "freight",
    tag: "ส่งสินค้าโรงงาน",
  },
  {
    id: "gallery-4",
    image: "/images/WM11.webp",
    alt: "รถจักรยานยนต์ยึดตรึงด้วยสายรัดอย่างแน่นหนาภายในตู้ทึบเพื่อความปลอดภัยในการขนส่ง",
    title: "ขนส่งมอเตอร์ไซค์ในตู้ทึบ ยึดรัดตรึงมั่นคงป้องกันการเคลื่อนที่",
    category: "motorcycle",
    tag: "ส่งมอเตอร์ไซค์",
  },
  {
    id: "gallery-5",
    image: "/images/WM17.webp",
    alt: "รถบรรทุกตู้ทึบเทียบท่าโหลดสินค้ากล่องบรรจุภัณฑ์ที่โกดังโรงงาน",
    title: "ขนส่งสินค้ากล่องบรรจุภัณฑ์โรงงานอุตสาหกรรมและคลังสินค้า",
    category: "freight",
    tag: "ส่งสินค้าโรงงาน",
  },
  {
    id: "gallery-6",
    image: "/images/WM12.webp",
    alt: "รถจักรยานยนต์ทัวร์ริ่งห่อฟิล์มกันรอยสีแดงเตรียมเข็นขึ้นท้ายรถกระบะตู้ทึบ WMS TRANSPORT ด้วยสะพานลาดอลูมิเนียม",
    title: "เตรียมขนส่งมอเตอร์ไซค์ขึ้นตู้ทึบด้วยสะพานลาดอลูมิเนียม พร้อมห่อหุ้มฟิล์มกันรอย",
    category: "motorcycle",
    tag: "ส่งมอเตอร์ไซค์",
  },
];

export default function ServiceAreaWorkGallery({
  thaiName,
  customItems,
}: ServiceAreaWorkGalleryProps) {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("all");

  const items = customItems && customItems.length > 0 ? customItems : DEFAULT_GALLERY_ITEMS;

  const filteredItems = items.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <section
      id="evidence"
      className="w-full py-12 md:py-16 bg-slate-50 border-t border-slate-200/80 scroll-mt-20"
      aria-label={`ภาพรถและตัวอย่างผลงานจริงที่ให้บริการในเขต ${thaiName}`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <span
              className="px-3 py-1 rounded-full font-bold text-xs mb-2 inline-flex items-center gap-1.5"
              style={{
                backgroundColor: "rgba(8, 123, 255, 0.1)",
                color: "#087BFF",
                border: "1px solid rgba(8, 123, 255, 0.2)",
              }}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>DELIVERY PROOF • ภาพงานจริง</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
              ภาพรถและตัวอย่างผลงาน <span className="text-blue-600">WMS TRANSPORT</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-0">
              ตัวอย่างงานขนย้ายจริงด้วยรถกระบะตู้ทึบมาตรฐาน WMS TRANSPORT ให้บริการครอบคลุมพื้นที่ {thaiName} และเส้นทางทั่วไทย
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            {[
              { id: "all", label: "ทั้งหมด" },
              { id: "moving", label: "ย้ายบ้าน/คอนโด" },
              { id: "freight", label: "ส่งสินค้าโรงงาน" },
              { id: "motorcycle", label: "ส่งมอเตอร์ไซค์" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as GalleryCategory)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid (3 cards per desktop view) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, 6).map((item) => (
            <figure
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group m-0"
            >
              <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover w-full h-full"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600/90 text-white shadow-sm">
                  {item.tag}
                </span>
              </div>

              <figcaption className="p-4 sm:p-5 flex flex-col flex-1">
                {item.location && (
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                )}

                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>ภาพงานปฏิบัติจริง</span>
                  </span>
                  {item.date ? (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">WMS TRANSPORT</span>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
