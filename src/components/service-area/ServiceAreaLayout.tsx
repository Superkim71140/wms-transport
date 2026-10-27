import React from "react";
import ServiceAreaHero, { ServiceAreaHeroProps } from "./ServiceAreaHero";
import ServiceAreaSidebar, { ServiceAreaSidebarProps } from "./ServiceAreaSidebar";
import ServiceAreaWorkGallery, { GalleryItem } from "./ServiceAreaWorkGallery";
import ServiceAreaNearbyLinks, { NearbyAreaCardItem } from "./ServiceAreaNearbyLinks";
import ServiceAreaFAQ, { ServiceAreaFAQProps } from "./ServiceAreaFAQ";
import AreaServiceConfidenceBanner from "./AreaServiceConfidenceBanner";

export interface ServiceAreaLayoutProps {
  heroProps: ServiceAreaHeroProps;
  sidebarProps: ServiceAreaSidebarProps;
  galleryItems?: GalleryItem[];
  nearbyAreas?: NearbyAreaCardItem[];
  faqProps?: ServiceAreaFAQProps;
  children: React.ReactNode;
}

export default function ServiceAreaLayout({
  heroProps,
  sidebarProps,
  galleryItems,
  nearbyAreas,
  faqProps,
  children,
}: ServiceAreaLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans">
      {/* 1. TOP HERO SECTION (Full-width Deep Navy #07152F with 2-Column Layout) */}
      <ServiceAreaHero {...heroProps} />

      {/* 2. MAIN TWO-COLUMN CONTENT AREA */}
      <section className="w-full bg-white py-10 md:py-14">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (8 cols): Overview, Quotation Form & Access Guidance */}
            <div className="lg:col-span-8 min-w-0">
              {children}
            </div>

            {/* Right Column (4 cols): Sticky Sidebar */}
            <div className="lg:col-span-4 min-w-0">
              <ServiceAreaSidebar {...sidebarProps} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICE CONFIDENCE BANNER (Immediately before the authentic work gallery) */}
      <section className="w-full bg-slate-50 py-4 sm:py-6 border-t border-slate-200/80">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <AreaServiceConfidenceBanner areaName={heroProps.thaiName} />
        </div>
      </section>

      {/* 4. AUTHENTIC WORK PROOF GALLERY SECTION (Full-Width) */}
      <ServiceAreaWorkGallery
        thaiName={heroProps.thaiName}
        customItems={galleryItems}
      />

      {/* 5. NEIGHBORING AREA CROSS-LINKING (Full-Width) */}
      <ServiceAreaNearbyLinks
        thaiName={heroProps.thaiName}
        nearbyAreas={nearbyAreas}
      />

      {/* 6. FREQUENTLY ASKED QUESTIONS (Strictly bottom-most section before footer) */}
      {faqProps && (
        <ServiceAreaFAQ
          {...faqProps}
          isFullWidthSection={true}
        />
      )}
    </div>
  );
}
