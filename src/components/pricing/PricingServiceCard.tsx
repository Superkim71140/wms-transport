import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";

export interface PricingServiceCardData {
  title: string;
  badge: string;
  photoUrl: string;
  photoAlt: string;
  photoCaption?: string;
  suitableFor: string[];
  startingPrice: number;
  priceNote: string;
  href: string;
  highlightPoints: string[];
}

export default function PricingServiceCard({ card }: { card: PricingServiceCardData }) {
  return (
    <article className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Card Header Badge */}
        <div className="p-4 sm:p-5 pb-3 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
          <span className="inline-block text-xs font-bold text-blue-900 bg-blue-100/80 border border-blue-200 px-3 py-1 rounded-full">
            {card.badge}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            บริการมาตรฐาน WMS
          </span>
        </div>

        {/* Photo Container: Shows photograph in full without cropping */}
        <div className="relative aspect-[4/3] w-full bg-slate-100/70 p-2 flex items-center justify-center">
          <Image
            src={card.photoUrl}
            alt={card.photoAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-2"
            loading="eager"
          />
        </div>

        {/* Photo Caption BELOW the image on white in dark navy text (16–18px) */}
        {card.photoCaption && (
          <div className="px-5 py-3.5 bg-white border-b border-slate-100">
            <p className="text-base sm:text-[17px] font-bold text-[#0B1F3A] leading-relaxed">
              {card.photoCaption}
            </p>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] group-hover:text-blue-700 transition-colors mb-3">
            {card.title}
          </h2>

          {/* Suitable for */}
          <div className="mb-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              เหมาะกับงาน
            </div>
            <ul className="space-y-2 text-base text-slate-700 font-medium">
              {card.suitableFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Box */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 my-5">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-semibold text-slate-600">ราคาประเมินเริ่มต้น</span>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-blue-700">
                  {card.startingPrice.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-slate-700 ml-1">บาท</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-2 pt-2 border-t border-blue-100/80">
              {card.priceNote}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-1.5 mb-2">
            {card.highlightPoints.map((pt, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="p-5 sm:p-6 pt-0">
        <Link
          href={card.href}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0B1F3A] hover:bg-blue-600 text-white font-bold text-base transition-colors shadow-xs group/btn"
        >
          <span>ดูรายละเอียดและตารางราคา</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
