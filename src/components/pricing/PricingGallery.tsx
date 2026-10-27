import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, ExternalLink } from "lucide-react";

export interface GalleryPhotoItem {
  src: string;
  alt: string;
  caption: string;
  tag?: string;
}

export interface PricingGalleryProps {
  title?: string;
  subtitle?: string;
  photos: GalleryPhotoItem[];
  caseStudyLink?: {
    href: string;
    text: string;
  };
}

export default function PricingGallery({
  title = "ภาพถ่ายหน้างานจริง WMS TRANSPORT",
  subtitle = "ชมภาพการปฏิบัติงานจริงที่บันทึกจากหน้างาน แสดงความเรียบร้อยของตัวรถและอุปกรณ์ป้องกันทุกเที่ยว",
  photos,
  caseStudyLink,
}: PricingGalleryProps) {
  return (
    <section className="my-10 bg-slate-50/60 border border-slate-200/90 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xs">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span>หลักฐานหน้างานจริง</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A]">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-1 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {caseStudyLink && (
          <Link
            href={caseStudyLink.href}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors shrink-0"
          >
            <span>{caseStudyLink.text}</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Grid of photos: All work photographs shown in full, without crops cutting people or cargo */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${photos.length >= 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
        {photos.map((item, idx) => (
          <figure
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
          >
            {/* Image frame using object-contain to show the entire photograph without cropping */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-slate-100/70 p-2 flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-1"
                quality={90}
                loading="eager"
              />
            </div>

            {/* Caption on pure white background, dark navy text at 16–18px, comfortable spacing */}
            <figcaption className="p-4 sm:p-5 bg-white border-t border-slate-100 grow flex items-center">
              <p className="text-base sm:text-[17px] font-bold text-[#0B1F3A] leading-relaxed">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
