"use client";

import { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
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
  Globe,
  Building2, 
  Truck, 
  Building, 
  Home, 
  Factory, 
  Mountain, 
  Wheat, 
  Palmtree, 
  Map
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
  icon: React.ComponentType<any>;
};

const hubs: Hub[] = [
  {
    id: "samutsakhon",
    name: "สมุทรสาคร (จุดให้บริการหลัก)",
    engName: "Samut Sakhon (Main Station)",
    region: "จุดจอดรถหลักและพื้นที่ให้บริการครอบคลุมภาคกลาง WMS TRANSPORT",
    time: "บริการด่วนทันที / สแตนด์บาย 24 ชม.",
    price: "เริ่มต้น 500 บาท",
    routes: ["ต.บ้านเกาะ", "อ.เมืองสมุทรสาคร", "กระทุ่มแบน", "บ้านแพ้ว", "ถนนพระราม 2", "มหาชัย", "บางโทรัด"],
    isMainHub: true,
    icon: Building2
  },
  {
    id: "bkk",
    name: "กรุงเทพมหานคร",
    engName: "Bangkok",
    region: "พื้นที่กรุงเทพฯ และรอบปริมณฑลชั้นใน",
    time: "จัดส่งด่วนภายใน 1-3 ชั่วโมง",
    price: "เริ่มต้น 500 บาท",
    routes: ["ลาดกระบัง", "บางนา", "จตุจักร", "ดอนเมือง", "บางขุนเทียน", "ห้วยขวาง", "สาทร", "ปทุมวัน"],
    icon: Building
  },
  {
    id: "nonthaburi",
    name: "นนทบุรี & ปทุมธานี",
    engName: "Nonthaburi & Pathum Thani",
    region: "พื้นที่นนทบุรี ปทุมธานี และปริมณฑลโซนเหนือ",
    time: "จัดส่งด่วนภายใน 1-3 ชั่วโมง",
    price: "เริ่มต้น 500 บาท",
    routes: ["ปากเกร็ด", "บางใหญ่", "บางบัวทอง", "เมืองนนทบุรี", "รังสิต", "คลองหลวง", "ธัญบุรี", "ไทรน้อย"],
    icon: Home
  },
  {
    id: "chonburi",
    name: "ชลบุรี (ภาคตะวันออก)",
    engName: "Chonburi & Eastern Economic Zone",
    region: "พื้นที่ชลบุรี พัทยา และโซนนิคมอุตสาหกรรมภาคตะวันออก",
    time: "บริการด่วนพิเศษภายใน 3-4 ชั่วโมง",
    price: "เริ่มต้น 1,800 บาท",
    routes: ["พัทยา", "ศรีราชา", "อมตะนคร", "บางแสน", "สัตหีบ", "แหลมฉบัง", "บ่อวิน"],
    icon: Factory
  },
  {
    id: "chiangmai",
    name: "เชียงใหม่ (ภาคเหนือ)",
    engName: "Chiang Mai (Northern Hub)",
    region: "เส้นทางวิ่งประจำภาคเหนือและจุดกระจายงาน",
    time: "ส่งถึงปลายทางภายใน 24 ชม. (1 วัน)",
    price: "เริ่มต้น 5,500 บาท",
    routes: ["เชียงราย", "ลำปาง", "ลำพูน", "แพร่", "พะเยา", "แม่ฮ่องสอน", "ฝาง"],
    icon: Mountain
  },
  {
    id: "khonkaen",
    name: "ขอนแก่น (ภาคอีสาน)",
    engName: "Khon Kaen (Northeast Hub)",
    region: "เส้นทางวิ่งประจำภาคตะวันออกเฉียงเหนือ",
    time: "ส่งถึงปลายทางภายใน 12-24 ชั่วโมง",
    price: "เริ่มต้น 3,500 บาท",
    routes: ["อุดรธานี", "อุบลราชธานี", "นครราชสีมา", "บุรีรัมย์", "สุรินทร์", "ร้อยเอ็ด", "หนองคาย"],
    icon: Wheat
  },
  {
    id: "phuket",
    name: "ภูเก็ต (ภาคใต้)",
    engName: "Phuket (Southern Hub)",
    region: "เส้นทางลงใต้หลัก (เน้นส่งมอเตอร์ไซค์/บิ๊กไบค์)",
    time: "ส่งถึงปลายทางภายใน 24-48 ชม. (1-2 วัน)",
    price: "เริ่มต้น 6,500 บาท",
    routes: ["หาดใหญ่", "กระบี่", "พังงา", "สุราษฎร์ธานี", "นครศรีธรรมราช", "ชุมพร", "เกาะสมุย"],
    icon: Palmtree
  }
];

const serviceHighlights = [
  { icon: <Clock className="w-5 h-5 text-blue-400" />, title: "รวดเร็วฉับไว", desc: "สแตนด์บายรับงานทันที ตลอด 24 ชั่วโมง" },
  { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, title: "ปลอดภัย 100%", desc: "รับประกันสินค้าเสียหายสูงสุด 100,000 บาท" },
  { icon: <Users className="w-5 h-5 text-sky-400" />, title: "บริการครบวงจร", desc: "มีพนักงานช่วยยกของ แพ็กกันกระแทกอย่างดี" }
];

const parsePrice = (priceStr: string): number => {
  const match = priceStr.replace(/,/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export default function ServiceMap() {
  const [activeHub, setActiveHub] = useState<Hub>(hubs[0]);
  
  const [displayPrice, setDisplayPrice] = useState<number>(() => parsePrice(hubs[0].price));
  const currentPriceRef = useRef(displayPrice);
  
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const facadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentPriceRef.current = displayPrice;
  }, [displayPrice]);

  useEffect(() => {
    const targetPrice = parsePrice(activeHub.price);
    const controls = animate(currentPriceRef.current, targetPrice, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayPrice(latest)
    });
    return () => controls.stop();
  }, [activeHub.price]);

  useEffect(() => {
    if (isMapLoaded) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "200px" } // Load slightly before it comes into full view
    );
    
    if (facadeRef.current) {
      observer.observe(facadeRef.current);
    }
    
    return () => observer.disconnect();
  }, [isMapLoaded]);

  if (!isMapLoaded) {
    return (
      <div 
        ref={facadeRef}
        className="w-full min-h-[600px] flex items-center justify-center rounded-3xl bg-[#040b15]/40 backdrop-blur-2xl border border-white/10 relative overflow-hidden group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-sans"
        style={{ fontFamily: "var(--font-noto-sans-thai), sans-serif" }}
        onClick={() => setIsMapLoaded(true)}
      >
        {/* Subtle grid and glows */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700" />
        
        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <Map className="w-12 h-12 opacity-80" />
          </div>
          <button 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-lg shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.5)] transition-all duration-300 transform group-hover:-translate-y-1 animate-pulse flex items-center gap-3"
            onClick={(e) => {
              e.stopPropagation();
              setIsMapLoaded(true);
            }}
          >
            📍 คลิกเพื่อโหลดแผนที่
          </button>
          <p className="text-slate-400 text-sm font-medium">โหลดแผนที่และพื้นที่ให้บริการแบบอินเทอร์แอคทีฟ</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-white font-sans" style={{ fontFamily: "var(--font-noto-sans-thai), sans-serif" }}>
      
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
          เส้นทางและพื้นที่<span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">ให้บริการรับ-ส่ง</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-medium"
        >
          บริการรถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ ครอบคลุมทั่วไทย ส่งตรงถึงหน้าบ้านอย่างรวดเร็ว ปลอดภัย พร้อมพนักงานช่วยยกของทุกเที่ยว
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
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex items-center justify-between shadow-lg relative overflow-hidden group ${
                    isSelected
                      ? "bg-blue-600/10 backdrop-blur-md border-blue-500/30 border-l-4 border-l-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                  }`}
                >

                  <div className="flex items-center gap-4">
                    {/* Region icon badge */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${
                      isSelected ? "bg-blue-600/30 text-blue-400" : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-300"
                    }`}>
                      {(() => {
                        const IconComponent = hub.icon;
                        return <IconComponent className="w-6 h-6" />;
                      })()}
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-extrabold tracking-tight ${isSelected ? "text-white" : "text-slate-200"}`}>
                          {hub.name.split(" ")[0]}
                        </span>
                        {hub.isMainHub && (
                          <span className="text-[9px] bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            จุดจอดรถหลัก
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
        <div className="lg:col-span-7 bg-[#040b15]/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[500px]">
          
          {/* Subtle grid backing and overlay glow */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
          
          <motion.div 
            key={activeHub.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 space-y-6 flex-1 flex flex-col justify-between"
          >
            
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
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
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
            <div className="bg-gradient-to-b from-blue-950/30 to-transparent border border-blue-500/20 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner h-[150px]">
              <div className="absolute top-3 left-4 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] text-slate-400 font-mono font-bold tracking-widest uppercase">TRANSPORT ROUTE</span>
              </div>

              {/* Connecting Nodes Layout */}
              <div className="w-full flex items-center justify-between px-2 sm:px-6 relative z-10 mt-2">
                {/* Main Hub Node */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-blue-600 border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center text-white select-none">
                    <Building2 className="w-5 h-5" />
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
                    className="absolute w-6 h-6 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                  >
                    <Truck className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                </div>

                {/* Target Hub Node */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center justify-center text-slate-300 select-none group-hover:scale-105 transition-transform duration-300">
                    {(() => {
                      const IconComponent = activeHub.icon;
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                  </div>
                  <span className="text-[11px] font-black text-blue-400 whitespace-nowrap">{activeHub.name.split(" ")[0]}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all text-left">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">ความเร็วในการจัดส่ง</span>
                <p className="text-white text-base font-extrabold flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                  {activeHub.time}
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all text-left">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">อัตราค่าบริการเริ่มต้น</span>
                <p className="text-emerald-400 text-base font-black flex items-center gap-2">
                  <TrendingUp className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  เริ่มต้น {Math.round(displayPrice).toLocaleString()} บาท
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
                    className="px-3 py-1.5 bg-blue-500/5 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-default"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    {route}
                  </span>
                ))}
              </div>
            </div>
            
          </motion.div>

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
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl line-btn-pulse text-white font-black text-base transition-all duration-300 hover:-translate-y-0.5 border border-[#06C755]/30 transform active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                  <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-15.008 3.018h-2.158c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h2.158c.287 0 .521.233.521.521v3.954h1.479c.287 0 .521.234.521.521v1.041c0 .287-.234.521-.521.521zm4.842 0h-1.042c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h1.042c.287 0 .521.233.521.521v4.996c0 .287-.234.521-.521.521zm2.355 0h-1.042c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h1.042c.287 0 .521.233.521.521v1.942l1.62-1.942c.13-.156.326-.239.531-.239h1.018c.36 0 .584.382.399.696l-1.688 2.015 1.776 2.456c.164.228-.002.548-.283.548h-.988c-.173 0-.336-.084-.438-.224l-1.306-1.851v1.597c0 .287-.234.521-.521.521z"/>
                </svg>
                <span>ติดต่อผ่าน LINE</span>
              </a>

              <a
                href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white font-black text-base transition-all duration-300 hover:-translate-y-0.5 border border-[#1877F2]/30 transform active:scale-95 shadow-[0_4px_15px_rgba(24,119,242,0.2)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
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
