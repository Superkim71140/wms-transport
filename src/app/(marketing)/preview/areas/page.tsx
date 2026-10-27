import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getDraftLocalPoints, getZoneHub } from "@/data/areaZonesData";
import { AlertTriangle, Eye, ShieldAlert, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ระบบตรวจสอบแบบร่างพื้นที่บริการ (Draft Preview Dashboard) | WMS TRANSPORT",
  description: "แดชบอร์ดตรวจสอบแบบร่างพื้นที่บริการสำหรับทีมงานภายใน ไม่อนุญาตให้ Search Engine ทำดัชนี",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function DraftPreviewIndexPage() {
  const draftPoints = getDraftLocalPoints();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Back */}
        <div className="mb-6">
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าสารบัญพื้นที่บริการสาธารณะ (/areas)</span>
          </Link>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-200/80 text-amber-900 mb-2">
                <span>ระบบภายใน (Internal Verification Only)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                ระบบตรวจสอบแบบร่างพื้นที่บริการ (Draft Candidates Preview)
              </h1>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-3">
                หน้านี้รวบรวมรายการพื้นที่บริการที่อยู่ระหว่างการวิจัยและประเมินความพร้อมในการปฏิบัติงานจริง (Operational Feasibility)
                พื้นที่เหล่านี้<strong>ยังไม่ผ่านเกณฑ์การเผยแพร่ (Publication Gate)</strong> จึงถูกแยกออกจากเส้นทางสาธารณะ
                ไม่อยู่ใน <code>sitemap.xml</code> และไม่อนุญาตให้ Search Engine ทำดัชนี (<code>noindex, nofollow</code>)
              </p>
              <div className="text-xs text-amber-900/90 font-medium bg-amber-100/60 p-3 rounded-lg border border-amber-200/60">
                <strong>เกณฑ์การปลดล็อกสู่ Published:</strong> ต้องมีหลักฐานการปฏิบัติงานจริงในพื้นที่, ข้อมูลจุดจอด/เวลา/ข้อจำกัดที่ชัดเจน,
                และเส้นทางวิ่งประจำวัน เพื่อป้องกันการสร้างหน้าเนื้อหาที่ไม่มีข้อมูลจริง (Thin / Misleading Content)
              </div>
            </div>
          </div>
        </div>

        {/* Draft Items Table / Cards */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                รายการแบบร่างที่รอการตรวจสอบ ({draftPoints.length} พื้นที่)
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
              สถานะ: Draft
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {draftPoints.map((point) => {
              const zone = getZoneHub(point.zoneSlug);
              const previewUrl = `/preview/areas/${point.zoneSlug}/${point.slug}`;

              return (
                <div
                  key={point.pointId}
                  className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                        จุดที่ {point.pointId} • Draft
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        โซน: {zone?.thaiName || point.zoneSlug}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      {point.thaiName}
                    </h3>

                    {point.disambiguation && (
                      <p className="text-xs text-slate-500 mb-2">
                        {point.disambiguation}
                      </p>
                    )}

                    <div className="mt-2 p-2.5 rounded-lg bg-slate-100/70 border border-slate-200/70 text-xs text-slate-700">
                      <span className="font-bold text-slate-800">เหตุผลที่ยังไม่เปิดเผยแพร่: </span>
                      <span>{point.draftReason}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Link
                      href={previewUrl}
                      className="px-4 py-2 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-2 shadow-xs transition no-underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ดูตัวอย่างหน้า (Preview)</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-400">
          WMS TRANSPORT • Internal Local SEO Verification System • Publication Gate Protected
        </div>
      </div>
    </div>
  );
}
