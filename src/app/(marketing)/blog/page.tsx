import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import ServiceContactBanner from "@/components/service-area/ServiceContactBanner";
import { posts } from "./posts";

// Re-export posts so sitemap.ts can import it from here if configured
export { posts };

export const metadata: Metadata = {
  title: "บทความและสาระน่ารู้เรื่องการขนย้าย | WMS TRANSPORT",
  description:
    "รวมเทคนิคการแพ็กของ วิธีคำนวณขนาดตู้บรรทุก การเตรียมตัวย้ายบ้าน-คอนโด และคู่มือขนส่งสินค้าอย่างมืออาชีพจากทีมงาน WMS TRANSPORT",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogHubPage() {
  const articlesList = Object.entries(posts)
    .filter(([, post]) => !post.isDraft)
    .map(([slug, post]) => ({
      slug,
      ...post,
    }));

  const categories = [
    "ทั้งหมด",
    "เทคนิคการขนย้าย",
    "คู่มือขนาดรถและพื้นที่",
    "ย้ายบ้านและคอนโด",
    "ขนส่งสินค้าโรงงาน",
    "ขนส่งมอเตอร์ไซค์",
    "การวางแผนราคา",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <main className="grow pt-10 sm:pt-14 pb-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-blue-700 tracking-wide uppercase font-bold text-xs bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-3.5 inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>WMS KNOWLEDGE & LOGISTICS GUIDE</span>
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#07152F] mb-3 tracking-tight">
              บทความและสาระน่ารู้ <span className="text-blue-600">เรื่องการขนย้าย</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
              รวมเทคนิคการแพ็กของ วิธีคำนวณขนาดตู้บรรทุก การเตรียมตัวย้ายบ้าน-คอนโด
              และคู่มือขนส่งสินค้าจากประสบการณ์ปฏิบัติงานจริงของ WMS TRANSPORT
            </p>
          </div>

          {/* Categories Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-2">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className={`text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
                  idx === 0
                    ? "bg-[#07152F] text-white border-[#07152F] shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Grid Layout for Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {articlesList.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col group"
              >
                {/* 16:10 Aspect Ratio Image */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-16/10 overflow-hidden block bg-slate-100"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.category && (
                    <span className="absolute top-3 left-3 text-[11px] font-bold text-blue-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                      {post.category}
                    </span>
                  )}
                </Link>

                <div className="p-5 sm:p-6 flex flex-col grow">
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.date}</span>
                    </span>
                    {post.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.readTime}</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-base sm:text-lg font-bold text-[#07152F] mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Description Snippet */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 grow line-clamp-3 font-normal">
                    {post.description}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 group-hover:text-blue-800 transition-colors mt-auto w-fit"
                  >
                    <span>อ่านบทความฉบับเต็ม</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Contact & Quotation Banner at end of blog directory */}
          <ServiceContactBanner
            areaName="ทั่วไทย"
            className="mt-16"
          />
        </div>
      </main>
    </div>
  );
}
