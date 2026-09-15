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
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden font-sans w-full">
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Headings & Stat Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left relative z-10">
          <div>
            <span className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide mb-3 inline-block">
              พื้นที่ให้บริการทั่วประเทศ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight mt-1">
              พื้นที่ให้บริการ<br />
              <span className="text-blue-600">ครอบคลุมทั่วไทย</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal mt-4">
              ไม่ว่าจะเป็นเหนือจรดใต้ หรืออีสานสุดชายแดน เราพร้อมให้บริการรับจ้างย้ายบ้าน ย้ายหอพัก และขนส่งรถมอเตอร์ไซค์ถึงปลายทางอย่างปลอดภัย ด้วยรถกระบะตู้ทึบมาตรฐาน ป้องกันแดดและฝน พร้อมทีมงานคนยกของมืออาชีพดูแลตลอดการเดินทาง
            </p>
          </div>

          {/* Stat Cards Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5 mt-1">
            
            {/* Stat 1: 77 จังหวัด */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 text-blue-700">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-[#0B1F3A] font-mono tracking-tight">77 จังหวัด</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">ให้บริการครอบคลุมทุกอำเภอทั่วไทย</p>
              </div>
            </div>

            {/* Stat 2: 24/7 บริการ */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 text-blue-700">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-[#0B1F3A] font-mono tracking-tight">24/7</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">สแตนด์บายรับงานขนย้ายตลอดวัน</p>
              </div>
            </div>

            {/* Stat 3: ดูแลความปลอดภัย */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-[#0B1F3A] font-mono tracking-tight">ดูแลความปลอดภัย</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">มีมาตรการดูแลสิ่งของตลอดการเดินทาง</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Regional Route Explorer */}
        <div className="lg:col-span-7 flex flex-col gap-4 relative z-10 w-full">
          
          {/* Tab Navigation selectors */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-1.5 flex gap-1.5 overflow-x-auto whitespace-nowrap flex-nowrap w-full lg:flex-wrap pb-1.5 scrollbar-hide relative z-20">
            {regionsData.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[95px] py-2.5 text-xs sm:text-sm font-bold text-center rounded-xl transition-all relative select-none cursor-pointer min-h-[40px] flex items-center justify-center ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-xs" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white"
                  }`}
                >
                  <span className="relative z-10">{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Animated Tab Content Panel */}
          <div className="relative min-h-[380px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs relative overflow-hidden h-full"
              >
                <div className="space-y-5 text-left">
                  
                  {/* Region Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] flex items-center gap-2 pb-1">
                    {activeRegion.name}
                  </h3>

                  {/* Regional Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {activeRegion.description}
                  </p>

                  {/* Delivery Speed Highlight Banner */}
                  <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-xl text-left">
                    <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider block mb-1">
                      ระยะเวลาจัดส่งสินค้าโดยประมาณ
                    </span>
                    <p className="text-[#0B1F3A] text-xs sm:text-sm font-bold flex items-center gap-2 mt-0.5">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      {activeRegion.speed}
                    </p>
                  </div>

                  {/* Popular Route Tickets */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      เส้นทางยอดนิยม (Popular Routes)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeRegion.routes.map((route, i) => (
                        <div
                          key={i}
                          className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-700">
                            <span className="truncate">{route.from}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-blue-600 mx-2 shrink-0" />
                            <span className="truncate text-blue-700 font-bold">{route.to}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supported Services Badges */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      บริการที่รองรับ (Supported Services)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeRegion.services.map((service, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-lg select-none"
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
