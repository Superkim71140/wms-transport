import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Phone,
  ArrowRight,
  Route
} from "lucide-react";
import Image from "next/image";

export default function ServiceMap() {
  const routes = [
    { from: "สมุทรสาคร (ศูนย์หลัก)", to: "กรุงเทพฯ / ปริมณฑล", type: "เส้นทางหลัก" },
    { from: "กรุงเทพฯ", to: "ต่างจังหวัดทั่วไทย", type: "ขนส่งด่วน" },
    { from: "สมุทรสาคร / กทม.", to: "ภาคตะวันออก (ชลบุรี / ระยอง)", type: "ขนส่งอุตสาหกรรม" },
    { from: "สมุทรสาคร / กทม.", to: "ภาคใต้ (ภูเก็ต / สงขลา)", type: "เหมาเที่ยว" }
  ];

  const blocks = [
    {
      title: "ครอบคลุม 77 จังหวัด",
      desc: "รับงานขนส่งและขนย้ายทุกจังหวัดทั่วประเทศ จากเหนือจรดใต้ สะดวกรวดเร็วเข้าถึงทุกพื้นที่",
      icon: MapPin,
      badge: "บริการทั่วประเทศ"
    },
    {
      title: "บริการเร่งด่วน 24 ชม.",
      desc: "ประเมินราคาไว ติดต่อประสานงานและจองคิวรถได้ทุกวัน ตลอด 24 ชั่วโมง รถเข้าหน้างานรวดเร็ว",
      icon: Clock,
      badge: "ประเมินด่วน"
    },
    {
      title: "ติดตามงานได้ตลอดทาง",
      desc: "แจ้งสถานะการขนส่ง ประสานงานระหว่างขนส่งอย่างรัดกุม สินค้าถึงปลายทางปลอดภัยและตรงเวลา",
      icon: ShieldCheck,
      badge: "มีประกันสินค้า"
    }
  ];

  return (
    <div className="w-full text-slate-800 font-sans section-contain py-12 md:py-20">
      {/* 1. SECTION HEADER */}
      <div className="text-center mb-10 md:mb-16 relative z-10 max-w-4xl mx-auto px-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          พื้นที่ให้บริการ
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1F3A] tracking-tight mb-3">
          พื้นที่ให้บริการและ<span className="text-blue-600">เส้นทางยอดนิยม</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed">
          รับขนส่งทั่วไทย พร้อมเส้นทางยอดนิยมเริ่มต้นจาก สมุทรสาคร กรุงเทพฯ และปริมณฑล ดูแลงานโดยทีมงานมืออาชีพ ส่งตรงถึงหน้าบ้านทุกจังหวัด
        </p>
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch relative z-10 min-w-0">
        {/* LEFT COLUMN: Route chips & CTA buttons */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs w-full min-w-0">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Route className="w-5 h-5 text-blue-600 shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A]">เส้นทางยอดนิยม</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              เรามีรอบรถกระบะตู้ทึบสแตนด์บายให้บริการเป็นประจำ โดยมีฐานจุดจอดหลักที่ จ.สมุทรสาคร และ กทม. พร้อมวิ่งงานด่วนทั่วประเทศอย่างปลอดภัย
            </p>

            {/* Route Chips */}
            <div className="flex flex-col gap-2.5">
              {routes.map((route, idx) => (
                <div 
                  key={idx}
                  className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-blue-50/50 hover:border-blue-300 transition-all duration-200 group/route"
                >
                  <div className="flex flex-wrap items-center gap-2 font-bold text-xs sm:text-sm">
                    <span className="text-slate-800">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover/route:translate-x-1 transition-transform shrink-0" />
                    <span className="text-blue-600">{route.to}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md">
                    {route.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <a
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm transition-all shadow-xs min-h-[44px]"
            >
              <Image
                src="/images/LINE_icon.webp"
                alt="LINE"
                width={18}
                height={18}
                className="h-4.5 w-4.5 object-contain shrink-0"
              />
              <span>สอบถามเส้นทางผ่าน LINE</span>
            </a>
            <a
              href="tel:0612402436"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-sm transition-all min-h-[44px]"
            >
              <Phone className="h-4 w-4 text-blue-600 shrink-0" />
              <span>โทรสอบถามเส้นทาง</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Service features */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 justify-center">
          {blocks.map((block, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex items-start gap-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="p-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl shrink-0">
                <block.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h4 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
                    {block.title}
                  </h4>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {block.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {block.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
