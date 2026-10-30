import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { portfolioCasesData, PortfolioCase } from "@/data/mediaEvidence";

interface WorkEvidenceSummaryProps {
  evidenceIds?: string[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function WorkEvidenceSummary({
  evidenceIds,
  title = "ตัวอย่างผลงานจริงในพื้นที่และเส้นทางที่เกี่ยวข้อง",
  subtitle = "ภาพและบันทึกขั้นตอนการปฏิบัติงานจริงโดยทีมงาน WMS TRANSPORT",
  className = "mb-10",
}: WorkEvidenceSummaryProps) {
  if (!evidenceIds || evidenceIds.length === 0) return null;

  const validCases = evidenceIds
    .map((id) => portfolioCasesData[id])
    .filter((c): c is PortfolioCase => Boolean(c))
    .slice(0, 3);

  if (validCases.length === 0) return null;

  return (
    <section className={`bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 sm:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-blue-100 text-blue-700">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              บันทึกการทำงานจริง · ไม่ใช้รูปจำลอง
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {validCases.map((item) => {
          const photo = item.approvedPhotos?.[0];
          return (
            <article
              key={item.slug}
              className="bg-white border border-slate-200/90 rounded-xl overflow-hidden flex flex-col hover:border-blue-300 hover:shadow-xs transition-all"
            >
              {photo && (
                <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                  <Image
                    src={photo.path}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                    {item.broadArea}
                  </div>
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 line-clamp-2 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                    {item.jobChallenge}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {item.serviceType === "moving"
                      ? "ย้ายบ้าน/คอนโด"
                      : item.serviceType === "motorcycle"
                      ? "ขนส่งมอเตอร์ไซค์"
                      : "ขนส่งสินค้า"}
                  </span>
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                  >
                    <span>ดูขั้นตอนงานจริง</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
