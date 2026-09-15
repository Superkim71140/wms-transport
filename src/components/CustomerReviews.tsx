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

  return (
    <section 
      id="reviews" 
      className="relative w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-10 font-sans bg-gradient-to-b from-[#F7FAFF] via-white to-white"
    >
      {/* Ambient subtle decorative background element */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(37,99,235,0.03),transparent)] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Header Area */}
      <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-emerald-800 text-xs font-semibold mb-3.5 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
          <span>ความคิดเห็นจากผู้ใช้บริการ</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
          เสียงตอบรับจาก<span className="text-blue-600">ลูกค้าผู้ใช้บริการ</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 font-normal mt-3 max-w-xl mx-auto leading-relaxed">
          ความประทับใจ ความตรงเวลา และงานบริการขนย้ายที่ตั้งใจดูแลสิ่งของของลูกค้าทุกชิ้น
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="max-w-7xl mx-auto relative z-10 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center min-w-0">
          {displayTestimonials.map((test) => {
            const initial = test.displayName.startsWith("คุณ") ? test.displayName.charAt(3) : test.displayName.charAt(0);
            const role = 
              test.serviceType === "moving" ? "ย้ายบ้าน/คอนโด" : 
              test.serviceType === "motorcycle" ? "ขนส่งมอเตอร์ไซค์" : 
              test.serviceType === "freight" ? "ขนส่งสินค้าโรงงาน" : "บริการช่วยยก";
            
            return (
              <div 
                key={test.id}
                className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-xs transition-all duration-200 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-300 hover:-translate-y-1 motion-reduce:transform-none text-left relative overflow-hidden group min-w-0"
              >
                {/* Subtle top accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400" 
                  aria-hidden="true" 
                />

                {/* Top Row: Stars & Pale Blue Quote Watermark */}
                <div className="flex items-center justify-between">
                  <div 
                    className="flex gap-1 text-amber-400"
                    role="img"
                    aria-label={`คะแนน ${test.rating} เต็ม 5 ดาว`}
                  >
                    {Array.from({ length: test.rating }).map((_, sIdx) => (
                      <Star 
                        key={sIdx} 
                        className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" 
                        aria-hidden="true" 
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-blue-100/80 group-hover:text-blue-200/80 transition-colors shrink-0" aria-hidden="true" />
                </div>

                {/* Review Quotation Body */}
                <div className="flex-1 py-1">
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                    &ldquo;{test.reviewText}&rdquo;
                  </p>
                </div>

                {/* Reviewer Identity Row */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Initial Avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0 select-none">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A] truncate">
                        {test.displayName}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5 truncate">
                        {role} • {test.broadServiceArea}
                      </p>
                    </div>
                  </div>
                  
                  {/* Source Badge (Non-simulated) */}
                  <span 
                    className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-tight shrink-0" 
                  >
                    {test.source}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
