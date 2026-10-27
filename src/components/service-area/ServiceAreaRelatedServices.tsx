import React from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

export interface RelatedServiceCard {
  title: string;
  subtitle: string;
  href: string;
}

export interface ServiceAreaRelatedServicesProps {
  thaiName?: string;
  provinceSlug?: string;
  currentProvince?: string;
  services?: RelatedServiceCard[];
}

export default function ServiceAreaRelatedServices({
  thaiName,
  provinceSlug,
  currentProvince,
  services,
}: ServiceAreaRelatedServicesProps) {
  const resolvedSlug = currentProvince || provinceSlug;
  const resolvedName = thaiName || (resolvedSlug === "samutsakhon" ? "สมุทรสาคร" : resolvedSlug === "bkk-thonburi" ? "ฝั่งธนบุรี" : "พื้นที่บริการ");

  const defaultServices: RelatedServiceCard[] = [
    {
      title: `บริการรถรับจ้างย้ายบ้าน คอนโด ${resolvedName}`,
      subtitle: "ย้ายหอพัก อพาร์ตเมนต์ ทาวน์โฮม พร้อมทีมงานช่วยยกของและแรปฟิล์ม",
      href: resolvedSlug ? `/service/${resolvedSlug}/moving` : "/pricing",
    },
    {
      title: `บริการขนส่งสินค้าโรงงานและพาเลท ${resolvedName}`,
      subtitle: "ตู้ทึบสูง 2.1 ม. กันฝน 100% ส่งตรงจากโกดังถึงหน้างานแบบ Door-to-Door",
      href: resolvedSlug ? `/service/${resolvedSlug}/freight` : "/pricing",
    },
    {
      title: `บริการส่งมอเตอร์ไซค์และ BigBike ${resolvedName}`,
      subtitle: "สะพานขึ้นลงมาตรฐาน ล็อกล้อและรัดตรึง 4 ทิศทางในตู้ทึบปลอดภัย",
      href: resolvedSlug ? `/service/${resolvedSlug}/motorcycle` : "/pricing",
    },
    {
      title: "ผลงานจริง: บริการขนส่งและขนย้ายทั่วไทย",
      subtitle: "ภาพหน้างานจริงและประวัติการขนส่งสินค้าของทีมงาน WMS TRANSPORT",
      href: "/portfolio",
    },
  ];

  const activeServices = services && services.length > 0 ? services : defaultServices;

  return (
    <section
      className="mb-8 p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs"
      aria-label={`บริการและตัวอย่างงานขนส่งที่เกี่ยวข้อง ${thaiName}`}
    >
      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
        <Link2 className="w-4.5 h-4.5 text-blue-600 shrink-0" />
        <span>บริการและตัวอย่างงานขนส่งที่เกี่ยวข้องในพื้นที่ {thaiName}</span>
      </h3>
      <p className="text-slate-600 text-xs sm:text-sm mb-3">
        เชื่อมโยงบริการรถรับจ้างตู้ทึบเฉพาะทางและผลงานขนส่งจริงของ WMS TRANSPORT ในเขต{thaiName}และพื้นที่ใกล้เคียง
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {activeServices.map((svc, idx) => (
          <Link
            key={idx}
            href={svc.href}
            className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-400 hover:shadow-xs transition-all flex justify-between items-center no-underline group"
          >
            <div>
              <div className="font-bold text-slate-900 group-hover:text-blue-600 text-xs sm:text-sm">
                {svc.title}
              </div>
              <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                {svc.subtitle}
              </div>
            </div>
            <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform ml-2 shrink-0">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
