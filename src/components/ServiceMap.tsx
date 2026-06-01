"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ShieldCheck, 
  Clock, 
  Users, 
  Phone, 
  CheckCircle,
  TrendingUp,
  Activity,
  Compass,
  Globe
} from "lucide-react";

type Hub = {
  id: string;
  name: string;
  engName: string;
  region: string;
  time: string;
  price: string;
  routes: string[];
  isMainHub?: boolean;
  icon: string;
};

const hubs: Hub[] = [
  {
    id: "samutsakhon",
    name: "สมุทรสาคร (ศูนย์บริการหลัก)",
    engName: "Samut Sakhon (Main Hub)",
    region: "จุดยุทธศาสตร์หลักและกระจายสินค้าภาคกลาง WMS TRANSPORT",
    time: "บริการด่วนทันที / สแตนด์บาย 24 ชม.",
    price: "เริ่มต้น 500 บาท",
    routes: ["ต.บ้านเกาะ", "อ.เมืองสมุทรสาคร", "กระทุ่มแบน", "บ้านแพ้ว", "ถนนพระราม 2", "มหาชัย", "บางโทรัด"],
    isMainHub: true,
    icon: "🏢"
  },
  {
    id: "bkk",
    name: "กรุงเทพมหานคร",
    engName: "Bangkok",
    region: "พื้นที่กรุงเทพฯ และรอบปริมณฑลชั้นใน",
    time: "จัดส่งด่วนภายใน 1-3 ชั่วโมง",
    price: "เริ่มต้น 500 บาท",
    routes: ["ลาดกระบัง", "บางนา", "จตุจักร", "ดอนเมือง", "บางขุนเทียน", "ห้วยขวาง", "สาทร", "ปทุมวัน"],
    icon: "🏙️"
  },
  {
    id: "nonthaburi",
    name: "นนทบุรี & ปทุมธานี",
    engName: "Nonthaburi & Pathum Thani",
    region: "พื้นที่นนทบุรี ปทุมธานี และปริมณฑลโซนเหนือ",
    time: "จัดส่งด่วนภายใน 1-3 ชั่วโมง",
    price: "เริ่มต้น 500 บาท",
    routes: ["ปากเกร็ด", "บางใหญ่", "บางบัวทอง", "เมืองนนทบุรี", "รังสิต", "คลองหลวง", "ธัญบุรี", "ไทรน้อย"],
    icon: "🏡"
  },
  {
    id: "chonburi",
    name: "ชลบุรี (ภาคตะวันออก)",
    engName: "Chonburi & Eastern Economic Zone",
    region: "พื้นที่ชลบุรี พัทยา และโซนนิคมอุตสาหกรรมภาคตะวันออก",
    time: "บริการด่วนพิเศษภายใน 3-4 ชั่วโมง",
    price: "เริ่มต้น 1,800 บาท",
    routes: ["พัทยา", "ศรีราชา", "อมตะนคร", "บางแสน", "สัตหีบ", "แหลมฉบัง", "บ่อวิน"],
    icon: "🏭"
  },
  {
    id: "chiangmai",
    name: "เชียงใหม่ (ภาคเหนือ)",
    engName: "Chiang Mai (Northern Hub)",
    region: "จุดกระจายสินค้าและเส้นทางภาคเหนือหลัก",
    time: "ส่งถึงปลายทางภายใน 24 ชม. (1 วัน)",
    price: "เริ่มต้น 5,500 บาท",
    routes: ["เชียงราย", "ลำปาง", "ลำพูน", "แพร่", "พะเยา", "แม่ฮ่องสอน", "ฝาง"],
    icon: "⛰️"
  },
  {
    id: "khonkaen",
    name: "ขอนแก่น (ภาคอีสาน)",
    engName: "Khon Kaen (Northeast Hub)",
    region: "จุดประสานงานและเส้นทางภาคตะวันออกเฉียงเหนือ",
    time: "ส่งถึงปลายทางภายใน 12-24 ชั่วโมง",
    price: "เริ่มต้น 3,500 บาท",
    routes: ["อุดรธานี", "อุบลราชธานี", "นครราชสีมา", "บุรีรัมย์", "สุรินทร์", "ร้อยเอ็ด", "หนองคาย"],
    icon: "🌾"
  },
  {
    id: "phuket",
    name: "ภูเก็ต (ภาคใต้)",
    engName: "Phuket (Southern Hub)",
    region: "จุดประสานงานขนส่งและเส้นทางภาคใต้หลัก",
    time: "ส่งถึงปลายทางภายใน 24-48 ชม. (1-2 วัน)",
    price: "เริ่มต้น 6,500 บาท",
    routes: ["หาดใหญ่", "กระบี่", "พังงา", "สุราษฎร์ธานี", "นครศรีธรรมราช", "ชุมพร", "เกาะสมุย"],
    icon: "🌴"
  }
];

const serviceHighlights = [
  { icon: <Clock className="w-5 h-5 text-blue-400" />, title: "รวดเร็วฉับไว", desc: "สแตนด์บายรับงานทันที ตลอด 24 ชั่วโมง" },
  { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, title: "ปลอดภัย 100%", desc: "รับประกันสินค้าเสียหายสูงสุด 100,000 บาท" },
  { icon: <Users className="w-5 h-5 text-sky-400" />, title: "บริการครบวงจร", desc: "มีพนักงานช่วยยกของ แพ็กกันกระแทกอย่างดี" }
];

export default function ServiceMap() {
  const [activeHub, setActiveHub] = useState<Hub>(hubs[0]);

  return (
    <div className="w-full text-white font-sans">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-24 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-5 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          พื้นที่ให้บริการครอบคลุมทั่วไทย
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        >
          ศูนย์บริการและจุดจอดรถขนย้าย
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-medium"
        >
          กระจายครอบคลุมทั่วทุกภูมิภาคหลักของประเทศ ขนส่งเร็ว ตรงเวลา ปลอดภัย พร้อมประกันสินค้าทุกเที่ยว
        </motion.p>
      </div>

      {/* 2. MAIN INTERACTIVE DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 max-w-[1600px] mx-auto items-stretch">
        
        {/* LEFT COLUMN: Premium interactive Region Selector Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2 px-1">
            <Compass className="w-5 h-5 text-blue-400 animate-spin-slow" />
            <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">เลือกสาขา / พื้นที่บริการ</span>
          </div>

          <div className="space-y-3.5 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
            {hubs.map((hub) => {
              const isSelected = activeHub.id === hub.id;
              return (
                <motion.div
                  key={hub.id}
                  whileHover={{ scale: isSelected ? 1 : 1.015, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveHub(hub)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between shadow-lg relative overflow-hidden group ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-950/70 to-blue-900/60 border-blue-500/50 shadow-[0_10px_25px_rgba(37,99,235,0.15)]"
                      : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                  }`}
                >
                  {/* Subtle active indicator accent block */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500" />
                  )}

                  <div className="flex items-center gap-4">
                    {/* Region icon badge */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${
                      isSelected ? "bg-blue-600/30 text-white" : "bg-white/5 text-slate-300 group-hover:bg-white/10"
                    }`}>
                      {hub.icon}
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-extrabold tracking-tight ${isSelected ? "text-white" : "text-slate-200"}`}>
                          {hub.name.split(" ")[0]}
                        </span>
                        {hub.isMainHub && (
                          <span className="text-[9px] bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Main Hub
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-medium line-clamp-1">{hub.engName}</p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                      isSelected
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-white/5 text-slate-400 border-white/5"
                    }`}>
                      {hub.time.includes("1-3") ? "ด่วน 1-3 ชม." : hub.time.includes("24-48") ? "1-2 วัน" : "ใน 24 ชม."}
                    </span>
                    <span className="text-xs font-black text-blue-400 mt-1">{hub.price}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Highly Detailed Interactive Dashboard Panel */}
        <div className="lg:col-span-7 bg-white/[0.01] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden min-h-[500px]">
          
          {/* Subtle grid backing and overlay glow */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="text-[10px] tracking-widest text-blue-400 font-bold uppercase block mb-1">สาขาที่กำลังดูข้อมูล</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-400 animate-pulse shrink-0" />
                  {activeHub.name}
                </h3>
              </div>
              
              <div className="flex items-center gap-2 self-start sm:self-auto bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-inner">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                พร้อมให้บริการ 24 ชม.
              </div>
            </div>

            {/* Description Info */}
            <div className="text-left">
              <p className="text-slate-300 text-sm font-semibold leading-relaxed">
                {activeHub.region}
              </p>
            </div>

            {/* LIVE SVG ROUTE CONNECTIVITY SIMULATOR */}
            <div className="bg-[#050f21] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner h-[150px]">
              <div className="absolute top-3 left-4 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] text-slate-400 font-mono font-bold tracking-widest uppercase">LOGISTICS CONNECTOR</span>
              </div>

              {/* Connecting Nodes Layout */}
              <div className="w-full flex items-center justify-between px-2 sm:px-6 relative z-10 mt-2">
                {/* Main Hub Node */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-blue-600 border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center text-lg select-none">
                    🏢
                  </div>
                  <span className="text-[11px] font-black text-white whitespace-nowrap">สมุทรสาคร (หลัก)</span>
                </div>

                {/* Animated Line Container */}
                <div className="flex-1 px-4 relative flex items-center justify-center h-4">
                  <svg className="w-full h-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line 
                      x1="0" 
                      y1="4" 
                      x2="100%" 
                      y2="4" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="2" 
                      strokeDasharray="4,4"
                    />
                    <motion.line 
                      x1="0" 
                      y1="4" 
                      x2="100%" 
                      y2="4" 
                      stroke="#3b82f6" 
                      strokeWidth="2.5" 
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: [100, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      strokeDasharray="10, 15"
                    />
                  </svg>
                  {/* Glowing moving truck indicator */}
                  <motion.div 
                    animate={{ left: ["0%", "92%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center shadow-[0_0_10px_#3b82f6] text-[10px]"
                  >
                    🚚
                  </motion.div>
                </div>

                {/* Target Hub Node */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center justify-center text-lg select-none group-hover:scale-105 transition-transform duration-300">
                    {activeHub.icon}
                  </div>
                  <span className="text-[11px] font-black text-blue-400 whitespace-nowrap">{activeHub.name.split(" ")[0]}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-left">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">ความเร็วในการจัดส่ง</span>
                <p className="text-white text-base font-extrabold flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                  {activeHub.time}
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-left">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">อัตราค่าบริการเริ่มต้น</span>
                <p className="text-emerald-400 text-base font-black flex items-center gap-2">
                  <TrendingUp className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  {activeHub.price}
                </p>
              </div>
            </div>

            {/* Popular Routes list */}
            <div className="text-left space-y-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">เส้นทางเดินรถและพื้นที่ให้บริการแนะนำ</span>
              <div className="flex flex-wrap gap-2">
                {activeHub.routes.map((route) => (
                  <span
                    key={route}
                    className="px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-xs font-bold text-slate-300 hover:border-blue-500/30 hover:bg-blue-900/10 hover:text-white transition-all duration-200 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    {route}
                  </span>
                ))}
              </div>
            </div>
            
          </div>

          {/* Footer Highlights & CTA Buttons */}
          <div className="mt-8 pt-6 border-t border-white/10 relative z-10 space-y-6">
            
            {/* Value Props Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {serviceHighlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.03] transition-colors duration-300">
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/10 shrink-0">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-white">{item.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://line.me/ti/p/~@wmstransport"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl line-btn-pulse text-white font-black text-base transition-all duration-300 hover:-translate-y-0.5 border border-[#06C755]/30 transform active:scale-95 shadow-md"
              >
                <Image 
                  src="/images/LINE_Brand_icon.png" 
                  alt="LINE Logo" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5 object-contain shrink-0" 
                />
                <span>ติดต่อผ่าน LINE</span>
              </a>

              <a
                href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white font-black text-base transition-all duration-300 hover:-translate-y-0.5 border border-[#1877F2]/30 transform active:scale-95 shadow-[0_4px_15px_rgba(24,119,242,0.2)]"
              >
                <Image 
                  src="/images/Facebook_Logo_.png" 
                  alt="Facebook Logo" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5 object-contain shrink-0" 
                />
                <span>สอบถามผ่าน Facebook</span>
              </a>

              <a
                href="tel:0612402436"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-blue-400/50 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.01] text-center"
              >
                <Phone className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                <span>โทร 061-240-2436</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
