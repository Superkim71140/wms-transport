import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getZoneHub,
  getLocalPointBySlug,
} from "@/data/areaZonesData";
import LocalPointView from "@/components/service-area/LocalPointView";
import { AlertCircle, ArrowLeft, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

interface PreviewAreaProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PreviewAreaProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length !== 2) {
    return {
      title: "ไม่พบแบบร่าง | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  const [zoneSlug, localitySlug] = slug;
  const point = getLocalPointBySlug(zoneSlug, localitySlug);

  if (!point) {
    return {
      title: "ไม่พบแบบร่าง | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `[แบบร่างภายใน - DRAFT PREVIEW] ${point.title}`,
    description: point.description,
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  };
}

export default async function PreviewAreaPage({ params }: PreviewAreaProps) {
  const { slug } = await params;

  if (!slug || slug.length !== 2) {
    notFound();
  }

  const [zoneSlug, localitySlug] = slug;
  const point = getLocalPointBySlug(zoneSlug, localitySlug);
  const zone = getZoneHub(zoneSlug);

  if (!point || !zone) {
    notFound();
  }

  return (
    <div className="relative">
      {/* Top Internal Verification Notice Banner */}
      <div className="bg-amber-500 text-slate-900 border-b-2 border-amber-600 px-4 py-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 font-bold">
            <span className="p-1 bg-amber-900 text-amber-200 rounded shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <span>
              [หน้าตรวจสอบแบบร่าง - INTERNAL DRAFT PREVIEW] จุดที่ {point.pointId}: {point.thaiName} ({zone.thaiName})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-amber-900/10 font-semibold border border-amber-900/20">
              สถานะ: {point.status === "draft" ? "แบบร่าง (ยังไม่เผยแพร่)" : "เผยแพร่แล้ว (Published)"}
            </span>
            <Link
              href="/preview/areas"
              className="inline-flex items-center gap-1 font-bold text-amber-950 underline hover:text-black"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>แดชบอร์ดแบบร่าง</span>
            </Link>
          </div>
        </div>

        {point.draftReason && (
          <div className="max-w-6xl mx-auto mt-2 pt-2 border-t border-amber-400/60 text-xs text-amber-950 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-900" />
            <span>
              <strong>เหตุผลที่ยังไม่เผยแพร่ต่อสาธารณะ:</strong> {point.draftReason} (ไม่อยู่ใน sitemap.xml และมีคำสั่ง noindex)
            </span>
          </div>
        )}
      </div>

      {/* Render the full standard LocalPointView for testing UX/UI layout */}
      <LocalPointView point={point} zone={zone} />
    </div>
  );
}
