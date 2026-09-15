import Link from "next/link";
import { ArrowUpRight, MapPin, Truck, ShieldCheck, Calculator } from "lucide-react";
import { approvedRouteCorridors } from "@/data/approvedRouteCorridors";

interface InternalLinksProps {
  currentCategory?: "service" | "area" | "route" | "pricing" | "guide";
  currentSlug?: string;
  className?: string;
}

export default function InternalLinks({
  currentCategory,
  currentSlug,
  className = "",
}: InternalLinksProps) {
  // Filter out current page to eliminate self-linking and maximize contextual SEO value
  const isCurrent = (href: string) => {
    if (!currentSlug && !currentCategory) return false;
    if (currentCategory === "pricing" && href === "/pricing") return true;
    if (currentSlug && (href.endsWith(`/${currentSlug}`) || href.includes(`/${currentSlug}/`))) return true;
    if (currentCategory === "route" && currentSlug && href === `/route/${currentSlug}`) return true;
    return false;
  };

  const serviceLinks = [
    { title: "บริการย้ายบ้าน คอนโด หอพัก", href: "/pricing/moving", desc: "พร้อมทีมงานช่วยยกของและอุปกรณ์แพ็กป้องกันรอย" },
    { title: "บริการขนส่งมอเตอร์ไซค์ บิ๊กไบค์", href: "/pricing/motorcycle-transport", desc: "ตู้ทึบมิดชิด สายรัดนิรภัยเฉพาะทาง ปลอดภัย มั่นใจได้" },
    { title: "บริการเหมารถกระบะตู้ทึบขนส่งสินค้า", href: "/pricing/freight", desc: "เหมาเที่ยวส่งสินค้าโรงงานและกระจายสินค้าทั่วไทย" },
    { title: "ตารางคำนวณขนาดตู้และความจุ (CBM)", href: "/guides/truck-capacity-cbm", desc: "วิธีวัดขนาดของก่อนย้ายเพื่อเลือกรถที่เหมาะสมที่สุด" },
  ];

  const hubLinks = [
    { name: "กรุงเทพฯ และปริมณฑล", href: "/service/bangkok", note: "ศูนย์กลางกระจายสินค้าและขนย้ายในเมือง" },
    { name: "ฝั่งธนบุรี (บางแค / ปิ่นเกล้า)", href: "/service/bkk-thonburi", note: "เข้าซอยแคบ ตรอกเล็ก ชำนาญเส้นทาง" },
    { name: "สมุทรสาคร (มหาชัย / กระทุ่มแบน)", href: "/service/samutsakhon", note: "ฐานปฏิบัติการหลัก ขนของโรงงานและบ้านพัก" },
    { name: "สมุทรสงคราม (อัมพวา / บางคนที)", href: "/service/samut-songkhram", note: "เชื่อมต่อเส้นทางแม่กลองสู่ภาคใต้และ กทม." },
    { name: "ชลบุรี (พัทยา / ศรีราชา)", href: "/service/chonburi", note: "สายส่งโซนภาคตะวันออกและนิคมอุตสาหกรรม" },
    { name: "ภูเก็ต (เมืองภูเก็ต / กะทู้ / ถลาง)", href: "/service/phuket", note: "สายยาวลงใต้ ขนย้ายของและบิ๊กไบค์" },
  ];

  const popularRoutes = approvedRouteCorridors.map((c) => ({
    from: c.from,
    to: c.to,
    label: c.label || `${c.from} ⇄ ${c.to}`,
  }));

  const displayRoutes = popularRoutes.filter(
    (route) => !isCurrent(`/route/${route.from}/${route.to}`)
  );

  return (
    <section aria-label="ลิงก์บริการและพื้นที่ที่เกี่ยวข้อง" className={`bg-slate-50 border-t border-slate-200/80 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            บริการและเส้นทางขนส่งที่เกี่ยวข้อง
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            สำรวจบริการขนส่ง พื้นที่ให้บริการครอบคลุม และเส้นทางยอดนิยมของ WMS TRANSPORT
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Services Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-1">
              <Truck className="w-4 h-4" />
              <span>บริการหลักของเรา</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {serviceLinks.filter(item => !isCurrent(item.href)).slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block p-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Area Hubs Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-1">
              <MapPin className="w-4 h-4" />
              <span>พื้นที่ให้บริการประจำ</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {hubLinks.filter(item => !isCurrent(item.href)).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group p-2.5 rounded-lg bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-sm font-medium text-slate-800 group-hover:text-emerald-700 block">
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-500">{item.note}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Routes Column (Self-links filtered out) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>เส้นทางวิ่งงานยอดนิยม</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
              {displayRoutes.slice(0, 5).map((route) => (
                <Link
                  key={`${route.from}-${route.to}`}
                  href={`/route/${route.from}/${route.to}`}
                  className="group px-3 py-2.5 rounded-lg bg-white border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-indigo-600"
                >
                  <span>{route.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                </Link>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5">
              <Calculator className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800 block">ต้องการประเมินราคาเส้นทางอื่น?</span>
                สอบถามค่าบริการตามระยะทางจริงได้ตลอด 24 ชม. แจ้งราคาชัดเจนก่อนเริ่มงาน
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
