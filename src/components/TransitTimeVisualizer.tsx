"use client";

import React from "react";
import { MapPin, Truck, ShieldCheck, ArrowRight } from "lucide-react";

type TransitInfo = {
  distance: string;
  time: string;
  route: string;
};

const transitData: Record<string, TransitInfo> = {
  bangkok: {
    distance: "กรุงเทพฯ - ปริมณฑล",
    time: "1-3 ชั่วโมง (ขึ้นอยู่กับพื้นที่)",
    route: "กรุงเทพฯ - ครอบคลุมทุกเขตพื้นที่",
  },
  phuket: {
    distance: "~840 กม.",
    time: "12-14 ชั่วโมง",
    route: "กรุงเทพฯ (พระราม 2) - ชุมพร - สุราษฎร์ธานี - พังงา - ภูเก็ต",
  },
  chonburi: {
    distance: "~80 กม.",
    time: "1.5 - 2 ชั่วโมง",
    route: "กรุงเทพฯ - บางนา-ตราด / มอเตอร์เวย์ - ชลบุรี",
  },
  "chiang-mai": {
    distance: "~690 กม.",
    time: "9-11 ชั่วโมง",
    route: "กรุงเทพฯ - นครสวรรค์ - ตาก - ลำปาง - เชียงใหม่",
  },
  samutsakhon: {
    distance: "~45 กม.",
    time: "1 ชั่วโมง",
    route: "กรุงเทพฯ - พระราม 2 - สมุทรสาคร (มหาชัย)",
  },
  "bkk-thonburi": {
    distance: "พื้นที่ กทม. ฝั่งธนบุรี",
    time: "45 นาที - 1.5 ชั่วโมง",
    route: "กรุงเทพฯ - พื้นที่ฝั่งธนบุรีทั้งหมด",
  },
};

export default function TransitTimeVisualizer({ province }: { province: string }) {
  const info = transitData[province] || {
    distance: "ทั่วประเทศ",
    time: "ประเมินตามระยะทางจริง",
    route: "กรุงเทพฯ - ปลายทางของท่าน",
  };

  const summaries: Record<string, string> = {
    phuket: "กทม. ➔ ภูเก็ต | ระยะทาง ~840 กม. | เวลาเดินทาง 12-14 ชม.",
    samutsakhon: "กทม. ➔ สมุทรสาคร | ระยะทาง ~45 กม. | เวลาเดินทาง 1 ชม.",
    "bkk-thonburi": "กทม. ➔ กทม. ฝั่งธนบุรี | ระยะทาง พื้นที่ กทม. ฝั่งธนบุรี | เวลาเดินทาง 45 นาที - 1.5 ชม.",
    bangkok: "กทม. ➔ กรุงเทพฯ | ระยะทาง กรุงเทพฯ - ปริมณฑล | เวลาเดินทาง 1-3 ชม.",
    chonburi: "กทม. ➔ ชลบุรี | ระยะทาง ~80 กม. | เวลาเดินทาง 1.5 - 2 ชม.",
    "chiang-mai": "กทม. ➔ เชียงใหม่ | ระยะทาง ~690 กม. | เวลาเดินทาง 9-11 ชม.",
  };
  const summaryText = summaries[province] || "กทม. ➔ ปลายทางของท่าน | ระยะทาง ประเมินตามระยะทางจริง | เวลาเดินทาง ประเมินตามเส้นทาง";

  return (
    <div className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-blue-500/20 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 relative overflow-hidden my-8">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-blue-400 tracking-[0.15em] uppercase font-bold text-xs bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3 inline-block">
              ระยะเวลาขนส่งโดยประมาณ
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white">
              เส้นทางและการจัดส่งสินค้า
            </h3>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-blue-300 font-bold tracking-wide flex items-center gap-2 self-start md:self-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span className="text-emerald-400 animate-pulse">●</span>
            <span>{summaryText}</span>
          </div>
        </div>

        {/* Visual Timeline Row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 py-4 px-4 bg-white/[0.01] border border-white/5 rounded-2xl">
          {/* Start Point */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">ต้นทาง</p>
              <p className="text-sm font-extrabold text-white">กรุงเทพฯ / ปริมณฑล</p>
            </div>
          </div>

          {/* Connection Line & Icon */}
          <div className="flex flex-col items-center justify-center flex-1 w-full md:w-auto py-2 md:py-0">
            <div className="w-full flex items-center justify-center gap-2 relative">
              <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-blue-500/20 to-blue-500/60" />
              <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center gap-2 text-blue-400 text-xs font-bold animate-pulse">
                <Truck className="w-3.5 h-3.5" />
                <span>กำลังขนส่ง</span>
              </div>
              <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-blue-500/60 to-blue-500/20" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 text-center font-mono">
              {info.distance}
            </p>
          </div>

          {/* End Point */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">ปลายทาง</p>
              <p className="text-sm font-extrabold text-emerald-400">
                {province === "bangkok" ? "กรุงเทพฯ" : province === "phuket" ? "ภูเก็ต" : province === "chonburi" ? "ชลบุรี" : province === "chiang-mai" ? "เชียงใหม่" : province === "samutsakhon" ? "สมุทรสาคร" : province === "bkk-thonburi" ? "กทม. ฝั่งธน" : "ปลายทางของท่าน"}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
            <p className="text-xs font-bold text-slate-500 mb-1">ระยะเวลาเดินทางปกติ</p>
            <p className="text-base font-extrabold text-blue-400">
              {info.time}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
            <p className="text-xs font-bold text-slate-500 mb-1">เส้นทางหลัก</p>
            <p className="text-sm font-semibold text-slate-300 leading-snug">
              {info.route}
            </p>
          </div>
        </div>

        {/* Insurance & Trust Note */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>มีระบบติดตามสถานะพิกัดรถ และประกันสินค้าทุกเที่ยวการขนส่ง</span>
        </div>
      </div>
    </div>
  );
}
