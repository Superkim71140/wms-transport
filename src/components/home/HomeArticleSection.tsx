import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { posts } from "@/app/(marketing)/blog/posts";

/**
 * HomeArticleSection
 * 
 * Displays "บทความแนะนำก่อนขนย้าย" on the homepage.
 * Modern navy, blue, and white style consistent with WMS design system.
 * Responsive: 3 columns desktop, 2 columns tablet, 1 column mobile.
 * Shows 3-6 curated published article cards with verified images, titles, summaries,
 * and crawlable links, plus a primary "ดูบทความทั้งหมด" button to /blog.
 */
export default function HomeArticleSection() {
  // Select 6 featured published articles (excluding drafts)
  const featuredSlugs = [
    "how-to-request-quote-checklist",
    "what-can-box-truck-carry",
    "moving-condo-thonburi-elevator-parking",
    "prepare-motorcycle-transport",
    "hire-truck-with-helpers-vs-diy",
    "what-determines-moving-cost-factors",
  ];

  const articles = featuredSlugs
    .map((slug) => {
      const post = posts[slug];
      if (!post || post.isDraft) return null;
      return {
        slug,
        ...post,
      };
    })
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (articles.length === 0) return null;

  return (
    <section
      id="articles"
      aria-labelledby="articles-heading"
      className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-10 bg-slate-50/70 border-t border-slate-200/80"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold mb-3.5 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span>คลังความรู้การขนย้าย</span>
          </div>

          <h2
            id="articles-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight leading-tight"
          >
            บทความแนะนำ<span className="text-blue-600">ก่อนขนย้าย</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal mt-3 max-w-xl mx-auto leading-relaxed">
            รวมคำแนะนำ เช็กลิสต์ และเทคนิคเตรียมตัวจากผู้เชี่ยวชาญ WMS TRANSPORT เพื่อให้ทุกงานย้ายบ้าน คอนโด มอเตอร์ไซค์ และส่งสินค้า เป็นเรื่องง่ายและคุ้มค่าที่สุด
          </p>
        </div>

        {/* 3-Column Desktop, 2-Column Tablet, 1-Column Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 flex flex-col group"
            >
              {/* Image Container with consistent aspect ratio */}
              <Link
                href={`/blog/${article.slug}`}
                className="relative aspect-16/10 overflow-hidden block bg-slate-100"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-white bg-slate-900/80 backdrop-blur-xs shadow-xs">
                    <CheckCircle2 className="w-3 h-3 text-[#06C755]" aria-hidden="true" />
                    <span>คู่มือ WMS</span>
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{article.date}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-navy leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${article.slug}`} className="no-underline text-inherit">
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-5 line-clamp-3 flex-1">
                  {article.description}
                </p>

                {/* Crawlable "อ่านบทความ" Link */}
                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group-hover:gap-2 duration-150 no-underline"
                  >
                    <span>อ่านบทความ</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Directory CTA Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-navy font-bold text-sm sm:text-base border border-slate-300 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>ดูบทความทั้งหมด</span>
            <ArrowRight className="w-4 h-4 text-blue-600" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
