import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Phone,
  ArrowRight,
  Route
} from "lucide-react";

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
    <div className="w-full text-slate-200 font-sans section-contain" style={{ fontFamily: "var(--font-noto-sans-thai), sans-serif" }}>
      {/* 1. SECTION HEADER */}
      <div className="text-center mb-10 md:mb-16 relative z-10">
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          พื้นที่ให้บริการ
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          พื้นที่ให้บริการและ<span className="text-blue-400">เส้นทางยอดนิยม</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
          รับขนส่งทั่วไทย พร้อมเส้นทางยอดนิยมเริ่มต้นจาก สมุทรสาคร กรุงเทพฯ และปริมณฑล ดูแลงานโดยทีมงานมืออาชีพ ส่งตรงถึงหน้าบ้านทุกจังหวัด
        </p>
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10 min-w-0">
        {/* LEFT COLUMN: Route chips & CTA buttons */}
        <div className="lg:col-span-5 flex flex-col justify-between perf-card rounded-2xl p-6 sm:p-8 w-full min-w-0">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
              <Route className="w-5 h-5 text-blue-400 shrink-0" />
              <h3 className="text-lg sm:text-xl font-extrabold text-white">เส้นทางยอดนิยม</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
              เรามีรอบรถกระบะตู้ทึบสแตนด์บายให้บริการเป็นประจำ โดยมีฐานจุดจอดหลักที่ จ.สมุทรสาคร และ กทม. พร้อมวิ่งงานด่วนทั่วประเทศอย่างปลอดภัย
            </p>

            {/* Route Chips */}
            <div className="flex flex-col gap-3">
              {routes.map((route, idx) => (
                <div 
                  key={idx}
                  className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-blue-900/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] md:hover:-translate-y-1 transition-all duration-300 group/route"
                >
                  <div className="flex flex-wrap items-center gap-2 font-bold text-xs sm:text-sm">
                    <span className="text-slate-200">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover/route:translate-x-2 group-hover/route:text-blue-300 transition-all shrink-0" />
                    <span className="text-blue-400">{route.to}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded-md">
                    {route.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <a
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-black text-sm transition-all duration-300 md:hover:-translate-y-0.5 min-h-[44px] shadow-[0_4px_12px_rgba(6,199,85,0.2)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current shrink-0">
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-15.008 3.018h-2.158c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h2.158c.287 0 .521.233.521.521v3.954h1.479c.287 0 .521.234.521.521v1.041c0 .287-.234.521-.521.521zm4.842 0h-1.042c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h1.042c.287 0 .521.233.521.521v4.996c0 .287-.234.521-.521.521zm2.355 0h-1.042c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h1.042c.287 0 .521.233.521.521v1.942l1.62-1.942c.13-.156.326-.239.531-.239h1.018c.36 0 .584.382.399.696l-1.688 2.015 1.776 2.456c.164.228-.002.548-.283.548h-.988c-.173 0-.336-.084-.438-.224l-1.306-1.851v1.597c0 .287-.234.521-.521.521z"/>
              </svg>
              <span>สอบถามเส้นทางผ่าน LINE</span>
            </a>
            <a
              href="tel:0612402436"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-blue-400/40 font-bold text-sm transition-all duration-300 md:hover:scale-[1.01] min-h-[44px]"
            >
              <Phone className="h-4.5 w-4.5 text-blue-400 shrink-0" />
              <span>โทรสอบถามเส้นทาง</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Service features */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 justify-center">
          {blocks.map((block, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-white/[0.02] to-white/[0.05] hover:to-blue-900/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-start gap-4 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl group-hover:bg-blue-600/20 group-hover:text-blue-300 transition-all duration-300 shadow-inner shrink-0">
                <block.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-base sm:text-lg font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    {block.title}
                  </h4>
                  <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {block.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
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
