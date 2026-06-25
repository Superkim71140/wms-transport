import { Star, ShieldCheck, Quote } from "lucide-react";
import { reviewEvidenceData } from "@/data/reviewEvidence";

export default function CustomerReviews({ currentProvince }: { currentProvince?: string }) {
  // Filter and sort: prioritize reviews matching current province
  const filteredReviews = currentProvince
    ? [
        ...reviewEvidenceData.filter(r => r.provinceSlug === currentProvince),
        ...reviewEvidenceData.filter(r => r.provinceSlug !== currentProvince)
      ]
    : reviewEvidenceData;

  const displayTestimonials = filteredReviews
    .filter(r => r.moderationStatus === "approved")
    .slice(0, 3);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "WMS Transport",
    "image": "https://wms-transport.com/images/logoWMS.webp",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": reviewEvidenceData.length.toString()
    },
    "review": displayTestimonials.map(t => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.displayName
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating.toString(),
        "bestRating": "5"
      },
      "reviewBody": t.reviewText
    }))
  };

  return (
    <section 
      id="reviews" 
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative w-full font-sans overflow-hidden section-contain"
    >
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} 
      />
      {/* Dynamic ambient glow effects - Desktop Only */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10 hidden md:block" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10 hidden md:block" />

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10 md:mb-16 relative z-10">
        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          รีวิวจากลูกค้า
        </span>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
          เสียงตอบรับจากลูกค้าจริง
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 md:mt-6 leading-relaxed font-medium">
          การันตีความประทับใจ ความตรงเวลา และงานบริการที่ยอดเยี่ยมจากผู้ใช้บริการจริงของเรา
        </p>
      </div>

      {/* Grid container: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {displayTestimonials.map((test) => {
            const initial = test.displayName.startsWith("คุณ") ? test.displayName.charAt(3) : test.displayName.charAt(0);
            const role = 
              test.serviceType === "moving" ? "ย้ายบ้าน/คอนโด" : 
              test.serviceType === "motorcycle" ? "ขนส่งมอเตอร์ไซค์" : 
              test.serviceType === "freight" ? "ขนส่งสินค้าโรงงาน" : "บริการช่วยยก";
            
            return (
              <div 
                key={test.id}
                className="perf-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 relative transition-all duration-300 md:hover:-translate-y-1 hover:border-blue-400/40 hover:from-white/5 hover:to-blue-950/20 min-h-[300px] group overflow-hidden text-left"
              >
                {/* Ambient inner card glow */}
                <div className="absolute -inset-px bg-linear-to-b from-blue-500/0 via-blue-500/0 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Row: Stars & Quote Watermark */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: test.rating }).map((_, sIdx) => (
                      <Star 
                        key={sIdx} 
                        className="h-4.5 w-4.5 fill-current filter drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                      />
                    ))}
                  </div>
                  <Quote className="h-9 w-9 text-blue-500/10 group-hover:text-blue-500/20 group-hover:scale-110 transition-all duration-300 shrink-0" />
                </div>

                {/* Comment Body */}
                <div className="z-10 flex-1 py-1">
                  <p className="text-slate-100 font-bold leading-relaxed text-sm sm:text-base line-clamp-4 group-hover:text-white transition-colors">
                    &quot;{test.reviewText}&quot;
                  </p>
                </div>

                {/* Reviewer Row */}
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10 z-10 gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Initial Avatar with Gradient */}
                    <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-sky-400 rounded-full flex items-center justify-center text-white font-extrabold text-sm sm:text-base shadow-[0_4px_12px_rgba(37,99,235,0.3)] shrink-0">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                        {test.displayName}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5 truncate">
                        {role} • {test.broadServiceArea}
                      </p>
                    </div>
                  </div>
                  
                  {/* Verified Trust Badge */}
                  {test.isVerified && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide flex items-center gap-1 shadow-[0_0_15px_rgba(16,185,129,0.05)] select-none shrink-0" title={`Token: ${test.bookingToken}`}>
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>ยืนยันจองจริง</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
