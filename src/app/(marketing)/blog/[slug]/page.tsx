import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Layers,
  Calendar,
  Clock,
  UserCheck,
  ListOrdered,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";
import ServiceContactBanner from "@/components/service-area/ServiceContactBanner";
import { posts } from "../posts";

// Re-export posts to support any backwards-compatibility import
export { posts };

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const post = posts[slug] || posts[decoded];
  if (!post) {
    return {
      title: "ไม่พบหน้าบทความ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  if (post.isDraft) {
    return {
      title: `${post.title} (แบบร่าง) | WMS TRANSPORT`,
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${post.title} | WMS TRANSPORT`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.baseUrl}/blog/${slug}`,
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${siteConfig.baseUrl}${post.image}`,
          alt: post.title,
        },
      ],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const post = posts[slug] || posts[decoded];

  if (!post) {
    notFound();
  }

  // Find up to 3 genuinely related published articles (exclude current post and drafts)
  const relatedPosts = Object.entries(posts)
    .filter(([s, p]) => s !== slug && s !== decoded && !p.isDraft)
    .filter(([, p]) => (post.category && p.category === post.category) || true)
    .slice(0, 3)
    .map(([s, p]) => ({ slug: s, ...p }));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image.startsWith("http") ? post.image : `${siteConfig.baseUrl}${post.image}`,
    datePublished: post.dateISO,
    dateModified: post.updatedDate ? "2026-10-26T08:00:00+07:00" : post.dateISO,
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.baseUrl}/#moving-company`,
      name: post.author || siteConfig.businessName,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.baseUrl}/#moving-company`,
      name: siteConfig.businessFullName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.baseUrl}/logoWMS.png`,
      },
    },
    description: post.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.baseUrl}/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าหลัก",
        item: siteConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "บทความและสาระน่ารู้",
        item: `${siteConfig.baseUrl}/blog`,
      },
      ...(post.category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: post.category,
              item: `${siteConfig.baseUrl}/blog#${encodeURIComponent(post.category)}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: post.title,
              item: `${siteConfig.baseUrl}/blog/${slug}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: `${siteConfig.baseUrl}/blog/${slug}`,
            },
          ]),
    ],
  };

  // Build Table of Contents list
  const tocItems: { id: string; label: string }[] = [];
  if (post.directAnswer) {
    tocItems.push({ id: "quick-summary", label: "สรุปคำตอบสำคัญก่อนอ่าน" });
  }
  if (post.sections && post.sections.length > 0) {
    post.sections.forEach((s, idx) => {
      tocItems.push({ id: `section-${idx + 1}`, label: s.title });
    });
  }
  if (post.decisionAid) {
    tocItems.push({ id: "decision-aid", label: post.decisionAid.title });
  }
  if (post.authenticExample) {
    tocItems.push({ id: "authentic-example", label: "ภาพงานจริงและข้อแนะนำหน้างาน" });
  }
  if (post.checklist && post.checklist.length > 0) {
    tocItems.push({ id: "action-checklist", label: "เช็กลิสต์สำคัญสำหรับการขนย้าย" });
  }
  if (post.relatedLinks && post.relatedLinks.length > 0) {
    tocItems.push({ id: "related-services", label: "บริการและเส้นทางที่เกี่ยวข้อง" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="grow pt-8 sm:pt-12 pb-20 relative">
        <div className="max-w-[780px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">
                  บทความและสาระน่ารู้
                </Link>
              </li>
              {post.category && (
                <>
                  <li>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </li>
                  <li className="text-blue-700 font-semibold">{post.category}</li>
                </>
              )}
            </ol>
          </nav>

          <article>
            {/* IMPROVEMENT 1: Editorial Article Header */}
            <header className="mb-8">
              {/* Category & Status Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.category && (
                  <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                )}
                {post.isDraft && (
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    แบบร่าง (Draft)
                  </span>
                )}
              </div>

              {/* Single H1 */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#07152F] leading-[1.25] tracking-tight mb-4">
                {post.title}
              </h1>

              {/* Concise Introduction Lead */}
              <p className="text-base sm:text-lg md:text-[19px] text-slate-600 font-normal leading-[1.7] mb-6">
                {post.description}
              </p>

              {/* Editorial Meta Bar: Author, Dates, Read Time */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-600 bg-slate-50/70 p-3.5 rounded-xl border">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-900">
                    {post.author || "ทีมงาน WMS TRANSPORT (ฝ่ายปฏิบัติการขนย้าย)"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>เผยแพร่: {post.date}</span>
                  </div>

                  {post.updatedDate && (
                    <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                      <span>(อัปเดต: {post.updatedDate})</span>
                    </div>
                  )}

                  {post.readTime && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>ใช้เวลาอ่าน {post.readTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Featured Optimized Cover Image (Balanced 16:9) */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-xs bg-slate-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 780px) 100vw, 780px"
                className="object-cover"
                priority
              />
            </div>

            {/* IMPROVEMENT 2: Quick Answer Panel ("สรุปก่อนอ่าน") */}
            {post.directAnswer && (
              <div
                id="quick-summary"
                className="scroll-mt-28 mb-8 p-5 sm:p-6 bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-white rounded-2xl border-l-4 border-blue-600 border-y border-r border-blue-200 shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    สรุปก่อนอ่าน (Direct Answer)
                  </span>
                </div>
                <p className="text-[16px] sm:text-[17px] text-slate-800 font-medium leading-[1.75]">
                  {post.directAnswer}
                </p>
              </div>
            )}

            {/* IMPROVEMENT 2: Clickable Table of Contents (TOC) */}
            {tocItems.length > 2 && (
              <div className="mb-10">
                {/* Mobile Collapsible */}
                <details className="sm:hidden group border border-slate-200 rounded-xl bg-slate-50 p-4 transition-all">
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-sm text-[#07152F] select-none list-none">
                    <span className="flex items-center gap-2">
                      <ListOrdered className="w-4 h-4 text-blue-600" />
                      <span>สารบัญเนื้อหาในบทความ (แตะเพื่อดู)</span>
                    </span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">
                      ▼
                    </span>
                  </summary>
                  <ol className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-xs font-medium text-slate-700">
                    {tocItems.map((item, idx) => (
                      <li key={idx}>
                        <a
                          href={`#${item.id}`}
                          className="hover:text-blue-600 transition-colors block py-0.5"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>

                {/* Desktop Inline Panel */}
                <div className="hidden sm:block border border-slate-200/90 rounded-2xl bg-slate-50/70 p-5 shadow-2xs">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                    <ListOrdered className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-[#07152F] uppercase tracking-wide">
                      สารบัญเนื้อหาในบทความ
                    </h3>
                  </div>
                  <ol className="grid grid-cols-1 gap-2 text-sm text-slate-700 font-medium">
                    {tocItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold shrink-0 text-xs mt-0.5">
                          {idx + 1}.
                        </span>
                        <a
                          href={`#${item.id}`}
                          className="hover:text-blue-600 transition-colors hover:underline"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Core Article Body Sections */}
            {post.sections && post.sections.length > 0 ? (
              <div className="space-y-10 text-slate-800 text-[17px] md:text-[18px] leading-[1.75] md:leading-[1.8] font-normal">
                {post.sections.map((section, idx) => (
                  <section
                    key={idx}
                    id={`section-${idx + 1}`}
                    className="scroll-mt-28 space-y-3"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-[#07152F] tracking-tight border-b border-slate-100 pb-2">
                      {section.title}
                    </h2>
                    <p className="text-slate-700 text-[16px] sm:text-[17px] leading-[1.75] font-normal">
                      {section.content}
                    </p>
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700 text-[15px] sm:text-[16px] leading-[1.7]">
                        {section.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            <span className="font-normal text-slate-700">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              /* Fallback for legacy posts */
              <div className="text-slate-800 text-[17px] md:text-[18px] leading-[1.75] md:leading-[1.8] space-y-6 font-normal whitespace-pre-line">
                {post.content}
              </div>
            )}

            {/* IMPROVEMENT 3: Practical Decision Aid (Table & Dimensions Guide) */}
            {post.decisionAid && (
              <section
                id="decision-aid"
                className="scroll-mt-28 mt-12 p-5 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-xs"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
                    <h3 className="text-lg sm:text-xl font-bold text-[#07152F]">
                      {post.decisionAid.title}
                    </h3>
                  </div>
                  {post.decisionAid.description && (
                    <p className="text-xs sm:text-sm text-slate-600">
                      {post.decisionAid.description}
                    </p>
                  )}
                </div>

                {/* Responsive Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#07152F] text-white">
                        {post.decisionAid.headers.map((h, hIdx) => (
                          <th
                            key={hIdx}
                            className="p-3 sm:p-3.5 font-bold border-b border-blue-900 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {post.decisionAid.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-3 sm:p-3.5 text-slate-700 leading-relaxed ${
                                cIdx === 0 ? "font-semibold text-slate-900" : ""
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Critical Warning Callout (e.g. Volume alone doesn't guarantee fit) */}
                {post.decisionAid.warningNotice && (
                  <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-medium">
                      {post.decisionAid.warningNotice}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* IMPROVEMENT 4: Authentic Visual Examples */}
            {post.authenticExample && (
              <section
                id="authentic-example"
                className="scroll-mt-28 mt-12 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs"
              >
                <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                    ภาพปฏิบัติงานจริง (Authentic Work Evidence)
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#07152F]">
                    ตัวอย่างการจัดเรียงและการปฏิบัติงานจริงจากฟลีตรถ WMS
                  </h3>
                </div>

                <div className="relative aspect-video w-full bg-slate-100">
                  <Image
                    src={post.authenticExample.image}
                    alt={post.authenticExample.caption}
                    fill
                    sizes="(max-width: 780px) 100vw, 780px"
                    className="object-cover"
                  />
                </div>

                {/* Caption below photo on solid readable background */}
                <div className="p-4 sm:p-5 bg-white space-y-3">
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {post.authenticExample.caption}
                  </p>

                  {/* Practical packing/loading tip */}
                  <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-blue-950 leading-relaxed">
                      {post.authenticExample.tipTitle && (
                        <span className="font-bold block mb-0.5">
                          {post.authenticExample.tipTitle}:
                        </span>
                      )}
                      <span>{post.authenticExample.tip}</span>
                    </div>
                  </div>

                  {/* Contextual Link */}
                  {post.authenticExample.serviceText && post.authenticExample.serviceHref && (
                    <div className="pt-2">
                      <Link
                        href={post.authenticExample.serviceHref}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>{post.authenticExample.serviceText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Action Checklist Panel */}
            {post.checklist && post.checklist.length > 0 && (
              <section
                id="action-checklist"
                className="scroll-mt-28 mt-12 p-5 sm:p-7 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-[#07152F]">
                    เช็กลิสต์สำคัญสำหรับคุณ (Action Checklist)
                  </h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {post.checklist.map((item, cIdx) => (
                    <li
                      key={cIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Contextual Internal Links Section */}
            {post.relatedLinks && post.relatedLinks.length > 0 && (
              <section
                id="related-services"
                className="scroll-mt-28 mt-12 pt-8 border-t border-slate-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-[#07152F]">
                    ลิงก์บริการและข้อมูลพื้นที่ที่เกี่ยวข้อง
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {post.relatedLinks.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      href={link.href}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition-all flex flex-col justify-between group no-underline shadow-2xs"
                    >
                      <div>
                        {link.badge && (
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md inline-block mb-2">
                            {link.badge}
                          </span>
                        )}
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                          {link.title}
                        </h4>
                        {link.description && (
                          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {link.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-blue-600">
                        <span>อ่านข้อมูลเพิ่มเติม</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* IMPROVEMENT 5: Compact Contact & Quotation Banner (Matches Screenshot 1) */}
            <ServiceContactBanner
              areaName="ขนของ"
              className="mt-12 mb-10"
            />

            {/* IMPROVEMENT 5: Related Reading (Up to 3 Published Articles) */}
            {relatedPosts.length > 0 && (
              <section className="pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#07152F]">
                    บทความน่าอ่านที่เกี่ยวข้อง
                  </h3>
                  <Link
                    href="/blog"
                    className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    ดูบทความทั้งหมด →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/blog/${rPost.slug}`}
                      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                        <Image
                          src={rPost.image}
                          alt={rPost.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 250px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3.5 flex flex-col grow">
                        {rPost.category && (
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 w-fit mb-1.5">
                            {rPost.category}
                          </span>
                        )}
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                          {rPost.title}
                        </h4>
                        <div className="mt-auto pt-2 flex items-center justify-between text-[11px] text-slate-400">
                          <span>{rPost.date}</span>
                          <span className="text-blue-600 font-semibold group-hover:underline">
                            อ่านต่อ →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </main>
    </div>
  );
}
