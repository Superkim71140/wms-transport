"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight
} from "lucide-react";

type RouteTicket = {
  from: string;
  to: string;
};

type RegionData = {
  id: string;
  name: string;
  speed: string;
  routes: RouteTicket[];
  services: string[];
  description: string;
};

const regionsData: RegionData[] = [
  {
    id: "north",
    name: "ภาคเหนือ",
    speed: "จัดส่งถึงปลายทางภายใน 24 ชั่วโมง (1 วันทำการ)",
    routes: [
      { from: "กรุงเทพฯ / ปริมณฑล", to: "เชียงใหม่" },
      { from: "กรุงเทพฯ / ปริมณฑล", to: "เชียงราย" },
      { from: "กรุงเทพฯ / ปริมณฑล", to: "พิษณุโลก / ลำปาง" },
      { from: "เชียงใหม่", to: "แม่ฮ่องสอน / พะเยา" }
    ],
    services: ["ย้ายบ้าน", "มอเตอร์ไซค์", "ขนส่งสินค้าทั่วไป"],
    description: "บริการขนย้ายและขนส่งสินค้าขึ้นภาคเหนือด้วยรถกระบะตู้ทึบและพนักงานยกของมืออาชีพ ดูแลความปลอดภัยของสิ่งของตลอดเส้นทางท้าทายบนดอยสูง"
  },
  {
    id: "northeast",
    name: "ภาคอีสาน",
    speed: "จัดส่งถึงปลายทางภายใน 12-24 ชั่วโมง",
    routes: [
      { from: "กรุงเทพฯ / ปริมณฑล", to: "นครราชสีมา (โคราช)" },
      { from: "กรุงเทพฯ / ปริมณฑล", to: "ขอนแก่น" },
      { from: "กรุงเทพฯ / ปริมณฑล", to: "อุดรธานี / หนองคาย" },
      { from: "กรุงเทพฯ / ปริมณฑล", to: "อุบลราชธานี / ศรีสะเกษ" }
    ],
    services: ["ย้ายบ้าน", "มอเตอร์ไซค์", "ขนส่งสินค้าทั่วไป"],
    description: "รับจัดส่งและเหมาเที่ยวขนย้ายครอบคลุมทุกจังหวัดในภาคอีสาน รวดเร็ว ฉับไว พร้อมพนักงานขนย้ายสุภาพและเชี่ยวชาญการจัดวาง"
  },
  {
    id: "central",
    name: "ภาคกลาง & กทม.",
    speed: "จัดส่งด่วนภายในวัน หรือ 1-2 วันทำการ (Same Day / Next Day)",
    routes: [
      { from: "กรุงเทพฯ", to: "สมุทรสาคร / สมุทรปราการ" },
      { from: "กรุงเทพฯ", to: "นนทบุรี / ปทุมธานี" },
      { from: "กรุงเทพฯ", to: "ชลบุรี / พัทยา" },
      { from: "กรุงเทพฯ", to: "นครปฐม / ราชบุรี" }
    ],
    services: ["ย้ายบ้าน", "มอเตอร์ไซค์", "ขนส่งสินค้าทั่วไป"],
    description: "จุดจอดรถและเส้นทางหลักของงานขนย้ายในพื้นที่กรุงเทพฯ ปริมณฑล และภาคกลางทั้งหมด พร้อมบริการด่วน 24 ชั่วโมง"
  },
  {
    id: "south",
    name: "ภาคใต้",
    speed: "จัดส่งถึงปลายทางภายใน 24-48 ชั่วโมง (1-2 วัน)",
    routes: [
      { from: "กรุงเทพฯ / ปริมณฑล", to: "ภูเก็ต (เส้นทางแนะนำ)" },
      { from: "กรุงเทพฯ / ปริมณฑล", to: "สุราษฎร์ธานี / เกาะสมุย" },
      { from: "กรุงเทพฯ / ปริมณฑล", to: "หาดใหญ่ / สงขลา" },
      { from: "กรุงเทพฯ / ปริมณฑล", to: "กระบี่ / พังงา / ตรัง" }
    ],
    services: ["ย้ายบ้าน", "มอเตอร์ไซค์", "ขนส่งสินค้าทั่วไป"],
    description: "เส้นทางลงใต้หลัก โดยเฉพาะเส้นทางภูเก็ต-กรุงเทพฯ ที่ได้รับความไว้วางใจสูงสุด ขนส่งมอเตอร์ไซค์/บิ๊กไบค์แบบแพ็กกันรอยและรัดแน่นพิเศษ"
  }
];

export default function DeliveryMap() {
  const [activeTab, setActiveTab] = useState<string>("north");
  const activeRegion = regionsData.find((r) => r.id === activeTab) || regionsData[0];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#040b15] relative overflow-hidden font-sans w-full" style={{ fontFamily: "var(--font-noto-sans-thai), sans-serif" }}>
      {/* Background patterns and glowing orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Headings & Stat Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left relative z-10">
          <div>
            <span className="px-5 py-2 bg-linear-to-r from-red-500/10 to-blue-500/10 border border-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)] mb-4 inline-block">
              พื้นที่ให้บริการทั่วประเทศ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mt-2">
              พื้นที่ให้บริการ<br />
              <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">ครอบคลุมทั่วไทย</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base font-semibold mt-6">
              ไม่ว่าจะเป็นเหนือจรดใต้ หรืออีสานสุดชายแดน เราพร้อมให้บริการรับจ้างย้ายบ้าน ย้ายหอพัก และขนส่งรถมอเตอร์ไซค์ถึงปลายทางอย่างปลอดภัย ด้วยรถกระบะตู้ทึบมาตรฐาน กันแดดกันฝน 100% พร้อมทีมงานคนยกของมืออาชีพดูแลตลอดการเดินทาง
            </p>
          </div>

          {/* Enhanced Glassmorphism Stat Cards Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 mt-2">
            
            {/* Stat 1: 77 จังหวัด */}
            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/2 backdrop-blur-xl border border-white/10 hover:border-red-500/30 hover:bg-white/5 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <MapPin className="w-5 h-5 text-blue-400 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              </div>
              <div>
                <p className="text-xl font-black text-white font-mono tracking-tight">77 จังหวัด</p>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">ให้บริการครอบคลุมทุกตำบลทั่วไทย</p>
              </div>
            </motion.div>

            {/* Stat 2: 24/7 บริการ */}
            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/2 backdrop-blur-xl border border-white/10 hover:border-red-500/30 hover:bg-white/5 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <Clock className="w-5 h-5 text-sky-400 group-hover:text-red-400 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              </div>
              <div>
                <p className="text-xl font-black text-white font-mono tracking-tight">24/7</p>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">สแตนด์บายรับงานขนย้ายตลอดวัน</p>
              </div>
            </motion.div>

            {/* Stat 3: ประกันภัยสินค้า */}
            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/2 backdrop-blur-xl border border-white/10 hover:border-red-500/30 hover:bg-white/5 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-600/20 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <ShieldCheck className="w-5 h-5 text-emerald-400 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </div>
              <div>
                <p className="text-xl font-black text-white font-mono tracking-tight">คุ้มครองสินค้า</p>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">รับประกันสินค้าเสียหายสูงสุด 100k บ.</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Regional Route Explorer */}
        <div className="lg:col-span-7 flex flex-col gap-4 relative z-10 w-full">
          
          {/* Tab Navigation selectors - Scrollable on mobile */}
          <div className="bg-white/2 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 flex gap-1.5 overflow-x-auto whitespace-nowrap flex-nowrap w-full lg:flex-wrap pb-2 scrollbar-hide relative z-20">
            {regionsData.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[100px] py-3.5 text-xs sm:text-sm font-bold text-center rounded-xl transition-all duration-300 relative select-none cursor-pointer min-h-[44px] flex items-center justify-center ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="portfolioActiveTabGlow"
                      className="absolute inset-0 bg-blue-600/20 border border-blue-500/30 rounded-xl"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Animated Tab Content Panel */}
          <div className="relative min-h-[420px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white/2 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.3)] relative overflow-hidden h-full group"
              >
                {/* Visual Glow */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />

                <div className="space-y-6 text-left">
                  
                  {/* Region Title (Solid White text) */}
                  <h3 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-2.5 pb-2">
                    {activeRegion.name}
                  </h3>

                  {/* Regional Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                    {activeRegion.description}
                  </p>

                  {/* Delivery Speed Highlight Banner */}
                  <div className="bg-linear-to-r from-blue-950/40 via-blue-900/20 to-transparent border border-blue-500/20 p-5 rounded-2xl text-left">
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block mb-1">
                      ระยะเวลาจัดส่งสินค้าโดยประมาณ
                    </span>
                    <p className="text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-red-400 shrink-0 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
                      {activeRegion.speed}
                    </p>
                  </div>

                  {/* Popular Route Tickets */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      เส้นทางยอดนิยม (Popular Routes)
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeRegion.routes.map((route, i) => (
                        <div
                          key={i}
                          className="relative overflow-hidden bg-linear-to-r from-white/3 to-white/1 border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-md hover:border-blue-500/20 transition-all duration-300 group/ticket"
                        >
                          {/* Left ticket notch */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#040b15] rounded-r-full border-r border-t border-b border-white/10 group-hover/ticket:border-r-blue-500/30 transition-colors duration-300" />
                          {/* Right ticket notch */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#040b15] rounded-l-full border-l border-t border-b border-white/10 group-hover/ticket:border-l-red-500/40 transition-colors duration-300" />
                          
                          <div className="flex items-center justify-center w-full px-2 text-xs sm:text-sm font-bold text-slate-200">
                            <span className="truncate max-w-[120px] sm:max-w-none text-slate-300 group-hover/ticket:text-white transition-colors duration-300">{route.from}</span>
                            <ArrowRight className="w-4 h-4 text-blue-400 group-hover/ticket:text-red-400 mx-3 shrink-0 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover/ticket:translate-x-1 transition-all duration-300" />
                            <span className="truncate max-w-[120px] sm:max-w-none text-blue-400 font-extrabold group-hover/ticket:text-blue-300 transition-colors duration-300">{route.to}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supported Services Badges */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      บริการที่รองรับ (Supported Services)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeRegion.services.map((service, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-bold rounded-full select-none"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
