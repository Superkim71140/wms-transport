"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/seo/site-config";
import { Phone, MapPin, ChevronRight } from "lucide-react";
import TwoToneHeading from "./TwoToneHeading";

export interface ServiceAreaBreadcrumb {
  label: string;
  href?: string;
}

export interface ServiceAreaHeroProps {
  breadcrumbs: ServiceAreaBreadcrumb[];
  h1: string;
  thaiName: string;
  description: string;
  isHeadquarters?: boolean;
  isRegionalHub?: boolean;
  startingPrice?: string;
  deliveryEstimate?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageFocalPoint?: string;
  highlightPhrase?: string | string[];
  phoneHref?: string;
  phone?: string;
  lineUrl?: string;
}

export default function ServiceAreaHero({
  breadcrumbs,
  h1,
  thaiName,
  description,
  isHeadquarters = false,
  isRegionalHub = false,
  imageSrc = "/images/WM10.webp",
  imageAlt,
  imageCaption,
  imageFocalPoint,
  highlightPhrase,
  phoneHref = siteConfig.phoneHref,
  phone = siteConfig.phone,
  lineUrl = siteConfig.lineUrl,
}: ServiceAreaHeroProps) {
  const resolvedImageAlt =
    imageAlt ||
    `บริการรถกระบะตู้ทึบรับจ้าง ${thaiName} ย้ายบ้าน คอนโด ขนส่งสินค้า - WMS TRANSPORT`;

  // Logical Breadcrumb Normalization (Fixes double segment bug)
  const normalizedBreadcrumbs = useMemo(() => {
    if (!breadcrumbs || breadcrumbs.length === 0) {
      return [
        { label: "หน้าแรก", href: "/" },
        { label: "พื้นที่ให้บริการ", href: "/areas" },
        { label: thaiName },
      ];
    }
    const first = breadcrumbs[0];
    if (first && (first.label === "หน้าแรก" || first.href === "/")) {
      return breadcrumbs;
    }
    return [{ label: "หน้าแรก", href: "/" }, ...breadcrumbs];
  }, [breadcrumbs, thaiName]);

  // Authentic factual caption fallback that never invents unverified district claims
  const resolvedCaption = useMemo(() => {
    if (imageCaption) return imageCaption;
    if (isHeadquarters) {
      return "ภาพงานจริง: รถกระบะตู้ทึบ WMS ประจำจุดบริการสำนักงานใหญ่สมุทรสาคร (พระราม 2)";
    }
    if (isRegionalHub) {
      return `ภาพงานจริง: รถกระบะตู้ทึบ WMS ให้บริการขนย้ายในพื้นที่ ${thaiName} และเส้นทางเชื่อมต่อ`;
    }
    return "ภาพตัวอย่างงานจริง: รถกระบะตู้ทึบ WMS พร้อมทีมงานและอุปกรณ์รัดตรึงนิรภัยมาตรฐาน";
  }, [imageCaption, isHeadquarters, isRegionalHub, thaiName]);

  const badgeText = isHeadquarters
    ? "สำนักงานใหญ่สมุทรสาคร (HQ)"
    : isRegionalHub
    ? `ศูนย์บริการ ${thaiName}`
    : `พื้นที่ให้บริการ ${thaiName}`;

  // Candidates for H1 emphasis: custom phrase, full thaiName, or thaiName without "เขต"
  const highlightCandidates = useMemo(() => {
    if (highlightPhrase) {
      return Array.isArray(highlightPhrase) ? highlightPhrase : [highlightPhrase];
    }
    const candidates: string[] = [];
    if (thaiName) {
      candidates.push(thaiName);
      if (thaiName.startsWith("เขต")) {
        candidates.push(thaiName.replace(/^เขต/, ""));
      }
    }
    return candidates;
  }, [highlightPhrase, thaiName]);

  return (
    <section
      className="w-full text-white relative overflow-hidden"
      style={{
        backgroundColor: "#07152F",
        backgroundImage:
          "radial-gradient(ellipse 65% 55% at 85% 15%, rgba(56, 189, 248, 0.12), transparent)",
        borderBottom: "1px solid rgba(30, 41, 59, 0.8)",
        paddingTop: "calc(var(--site-header-offset) + 1.25rem)",
        paddingBottom: "3.25rem",
      }}
      aria-label={`ข้อมูลบริการรถกระบะตู้ทึบรับจ้าง ${thaiName}`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Single Logical Breadcrumbs Trail (No duplication) */}
        <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
          <ol className="inline-flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-300 list-none p-0 m-0">
            {normalizedBreadcrumbs.map((crumb, idx) => {
              const isLast = idx === normalizedBreadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0 select-none" />
                  )}
                  {isLast || !crumb.href ? (
                    <li
                      className="text-white font-bold truncate max-w-[220px] sm:max-w-none"
                      aria-current="page"
                    >
                      {crumb.label}
                    </li>
                  ) : (
                    <li>
                      <Link
                        href={crumb.href}
                        className="hover:text-white text-sky-300 transition-colors no-underline"
                      >
                        {crumb.label}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>

        {/* 2. Two-Column Hero Composition (Desktop 58/42 balance; Mobile Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Context & High-Contrast CTAs */}
          <div className="lg:col-span-7">
            {/* Verified Operational Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-400/30 mb-3.5 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{badgeText}</span>
            </div>

            {/* Semantic H1 with vivid two-tone accent styling */}
            <TwoToneHeading
              as="h1"
              text={h1}
              highlight={highlightCandidates}
              variant="dark"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold text-white tracking-tight leading-snug sm:leading-tight mb-4"
              highlightClassName="text-sky-300 font-black"
            />

            {/* Concise Supporting Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal">
              {description}
            </p>

            {/* Action Row: Primary LINE CTA & Secondary Phone CTA (min 48px touch targets) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-[0.98] cursor-pointer"
                title="แอด LINE เพื่อส่งรูปประเมินราคา"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt=""
                  width={22}
                  height={22}
                  className="w-5 h-5 shrink-0 object-contain"
                  aria-hidden="true"
                />
                <span>ส่งรูปประเมินราคาทาง LINE</span>
              </a>

              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm sm:text-base shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                title={`โทรสอบถามเจ้าหน้าที่ ${phone}`}
              >
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>โทรสอบถาม {phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Service Visual in Intentional Container with Semantic Figure/Figcaption */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Soft blue glow behind the image, away from text */}
              <div
                className="absolute -inset-1.5 rounded-3xl bg-sky-500/15 blur-xl pointer-events-none"
                aria-hidden="true"
              />
              <figure className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-[#0B2444] border border-sky-400/25 flex flex-col m-0">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-slate-900 overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={resolvedImageAlt}
                    fill
                    priority={true}
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className={`object-cover w-full h-full ${imageFocalPoint || "object-center"}`}
                  />
                </div>
                {/* Readable opaque navy caption surface placed below photo in normal document flow */}
                {resolvedCaption && (
                  <figcaption className="px-4 py-3 sm:px-5 sm:py-3.5 bg-[#0B2444] border-t border-sky-400/20 text-slate-200 text-xs sm:text-sm leading-relaxed flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 inline-block" aria-hidden="true" />
                    <span className="font-medium">{resolvedCaption}</span>
                  </figcaption>
                )}
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
