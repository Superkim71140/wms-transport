"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Users, 
  Navigation, 
  MessageSquare, 
  Phone, 
  Truck, 
  Zap, 
  CheckCircle,
  TrendingUp,
  Activity
} from "lucide-react";

type Hub = {
  id: string;
  name: string;
  engName: string;
  region: string;
  x: number;
  y: number;
  time: string;
  price: string;
  routes: string[];
  isMainHub?: boolean;
  labelXOffset: number;
  labelYOffset: number;
  labelTextAnchor: "start" | "middle" | "end";
};

const hubs: Hub[] = [
  {
    id: "samutsakhon",
    name: "สมุทรสาคร (ศูนย์บริการหลัก)",
    engName: "Samut Sakhon (Main Hub)",
    region: "ศูนย์บริการหลัก WMS TRANSPORT",
    x: 185,
    y: 330,
    time: "ด่วนทันที / สแตนด์บาย 24 ชม.",
    price: "เริ่มต้น 1,000 บาท",
    routes: ["ต.บ้านเกาะ", "อ.เมืองสมุทรสาคร", "กระทุ่มแบน", "บ้านแพ้ว", "ถนนพระราม 2"],
    isMainHub: true,
    labelXOffset: -12,
    labelYOffset: 16,
    labelTextAnchor: "end"
  },
  {
    id: "bkk",
    name: "กรุงเทพมหานคร",
    engName: "Bangkok",
    region: "พื้นที่กรุงเทพฯ และรอบปริมณฑล",
    x: 200,
    y: 320,
    time: "ด่วนภายใน 1-3 ชั่วโมง",
    price: "เริ่มต้น 1,000 บาท",
    routes: ["ลาดกระบัง", "บางนา", "จตุจักร", "ดอนเมือง", "บางขุนเทียน"],
    labelXOffset: 14,
    labelYOffset: 4,
    labelTextAnchor: "start"
  },
  {
    id: "nonthaburi",
    name: "นนทบุรี",
    engName: "Nonthaburi",
    region: "พื้นที่นนทบุรี และปริมณฑลเหนือ",
    x: 195,
    y: 305,
    time: "ด่วนภายใน 1-3 ชั่วโมง",
    price: "เริ่มต้น 1,000 บาท",
    routes: ["ปากเกร็ด", "บางใหญ่", "บางบัวทอง", "เมืองนนทบุรี", "ไทรน้อย"],
    labelXOffset: -12,
    labelYOffset: -6,
    labelTextAnchor: "end"
  },
  {
    id: "chonburi",
    name: "ชลบุรี (ภาคตะวันออก)",
    engName: "Chonburi (Eastern)",
    region: "พื้นที่ชลบุรี & นิคมอุตสาหกรรม",
    x: 235,
    y: 345,
    time: "ด่วนพิเศษภายใน 3-4 ชั่วโมง",
    price: "เริ่มต้น 1,800 บาท",
    routes: ["พัทยา", "ศรีราชา", "อมตะนคร", "บางแสน", "สัตหีบ"],
    labelXOffset: 14,
    labelYOffset: 4,
    labelTextAnchor: "start"
  },
  {
    id: "chiangmai",
    name: "เชียงใหม่ (ภาคเหนือ)",
    engName: "Chiang Mai (Northern Hub)",
    region: "เส้นทางภาคเหนือหลัก",
    x: 140,
    y: 120,
    time: "ส่งถึงภายใน 24 ชม. (1 วัน)",
    price: "เริ่มต้น 5,500 บาท",
    routes: ["เชียงราย", "ลำปาง", "ลำพูน", "แพร่", "พะเยา"],
    labelXOffset: 0,
    labelYOffset: -12,
    labelTextAnchor: "middle"
  },
  {
    id: "khonkaen",
    name: "ขอนแก่น (ภาคอีสาน)",
    engName: "Khon Kaen (Northeast Hub)",
    region: "เส้นทางภาคตะวันออกเฉียงเหนือ",
    x: 280,
    y: 220,
    time: "ส่งถึงภายใน 12-24 ชั่วโมง",
    price: "เริ่มต้น 3,500 บาท",
    routes: ["อุดรธานี", "อุบลราชธานี", "นครราชสีมา", "บุรีรัมย์", "สุรินทร์"],
    labelXOffset: 0,
    labelYOffset: -12,
    labelTextAnchor: "middle"
  },
  {
    id: "phuket",
    name: "ภูเก็ต (ภาคใต้)",
    engName: "Phuket (Southern Hub)",
    region: "เส้นทางภาคใต้หลัก",
    x: 155,
    y: 520,
    time: "ส่งถึงภายใน 24-48 ชม. (1-2 วัน)",
    price: "เริ่มต้น 6,500 บาท",
    routes: ["หาดใหญ่", "กระบี่", "พังงา", "สุราษฎร์ธานี", "นครศรีธรรมราช"],
    labelXOffset: 0,
    labelYOffset: -12,
    labelTextAnchor: "middle"
  }
];

const serviceTags = [
  "สมุทรสาคร",
  "กรุงเทพ",
  "ปริมณฑล",
  "ต่างจังหวัด",
  "ส่งมอเตอร์ไซค์",
  "ขนย้ายบ้าน",
  "ขนย้ายคอนโด",
  "ขนส่งสินค้า"
];

const trustItems = [
  { icon: <Clock className="w-4 h-4 text-blue-400" />, text: "บริการ 24 ชั่วโมง" },
  { icon: <ShieldCheck className="w-4 h-4 text-blue-400" />, text: "มีประกันสินค้า" },
  { icon: <Users className="w-4 h-4 text-blue-400" />, text: "ทีมงานมืออาชีพ" },
  { icon: <Navigation className="w-4 h-4 text-blue-400" />, text: "ติดตามงานได้" },
  { icon: <Truck className="w-4 h-4 text-blue-400" />, text: "รถพร้อมใช้งานทุกวัน" }
];

export default function ServiceMap() {
  const [activeHub, setActiveHub] = useState<Hub>(hubs[0]);
  const [hoveredHub, setHoveredHub] = useState<Hub | null>(null);

  // Dynamic quadratic bezier curve calculator
  const getCurvePath = (fromX: number, fromY: number, toX: number, toY: number) => {
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const len = Math.sqrt(dx * dx + dy * dy);
    
    const offset = len * 0.18;
    
    const px = -dy / len;
    const py = dx / len;
    
    const ctrlX = midX + px * offset;
    const ctrlY = midY + py * offset;
    
    return `M ${fromX} ${fromY} Q ${ctrlX} ${ctrlY} ${toX} ${toY}`;
  };

  return (
    <div className="w-full text-white font-sans">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-24 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-5 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          พื้นที่ให้บริการ WMS TRANSPORT
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        >
          ศูนย์บริการและเส้นทางขนส่งทั่วประเทศ
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-medium"
        >
          ให้บริการขนย้าย ขนส่งสินค้า และส่งมอเตอร์ไซค์ทั่วไทย ด้วยทีมงานมืออาชีพ พร้อมรถกระบะตู้ทึบมาตรฐาน
        </motion.p>

        <div className="relative w-48 h-[2px] mx-auto mt-8 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent">
          <motion.div 
            animate={{ 
              left: ["-10%", "110%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 w-8 h-full bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </div>
      </div>

      {/* Main Grid: Left Map & Right Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start max-w-[1600px] mx-auto">
        
        {/* 2. MAP AREA (LEFT SIDE) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative bg-white/[0.02] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl overflow-hidden group/map min-h-[500px] lg:min-h-[640px]">
          
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-blue-500/30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-blue-500/30" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-blue-500/30" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-blue-500/30" />

          <div className="absolute top-4 left-6 flex items-center gap-2 select-none pointer-events-none">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] tracking-widest text-emerald-400 font-mono font-bold uppercase">
              เครือข่ายเส้นทางขนส่ง
            </span>
          </div>

          <svg
            viewBox="0 0 400 620"
            className="w-full max-w-[390px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="thaiOutlineClip">
                <path d="M130 80 L230 60 L240 100 L210 140 L250 180 L310 210 L300 280 L250 300 L240 330 L260 380 L230 400 L190 350 L195 310 L170 320 L180 370 L140 400 L160 460 L140 520 L160 560 L180 580 L160 590 L140 570 L150 510 L130 460 L145 420 L165 370 L150 330 L110 320 L135 250 L110 200 L140 150 Z" />
              </clipPath>
              <pattern id="dotPattern" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" className="fill-white/10" />
              </pattern>
            </defs>

            <path
              d="M130 80 L230 60 L240 100 L210 140 L250 180 L310 210 L300 280 L250 300 L240 330 L260 380 L230 400 L190 350 L195 310 L170 320 L180 370 L140 400 L160 460 L140 520 L160 560 L180 580 L160 590 L140 570 L150 510 L130 460 L145 420 L165 370 L150 330 L110 320 L135 250 L110 200 L140 150 Z"
              className="stroke-blue-500/20 stroke-[8px] blur-md fill-none pointer-events-none"
              strokeLinejoin="round"
            />

            <path
              d="M130 80 L230 60 L240 100 L210 140 L250 180 L310 210 L300 280 L250 300 L240 330 L260 380 L230 400 L190 350 L195 310 L170 320 L180 370 L140 400 L160 460 L140 520 L160 560 L180 580 L160 590 L140 570 L150 510 L130 460 L145 420 L165 370 L150 330 L110 320 L135 250 L110 200 L140 150 Z"
              className="fill-[#04152D]/80 stroke-white/20 stroke-[2px]"
              strokeLinejoin="round"
            />

            <rect
              x="50"
              y="30"
              width="300"
              height="580"
              fill="url(#dotPattern)"
              clipPath="url(#thaiOutlineClip)"
              className="pointer-events-none"
            />

            <circle cx="185" cy="330" r="6" className="fill-blue-500/40 pointer-events-none">
              <animate
                attributeName="r"
                values="6;30"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>

            {hubs.map((hub) => {
              if (hub.id === "samutsakhon") return null;
              
              const isSelected = activeHub.id === hub.id;
              const isHovered = hoveredHub?.id === hub.id;
              const curve = getCurvePath(185, 330, hub.x, hub.y);

              return (
                <g key={`route-group-${hub.id}`}>
                  <path
                    d={curve}
                    className="stroke-white/10 stroke-[1.5px]"
                    fill="none"
                  />

                  {(isSelected || isHovered) && (
                    <>
                      <path
                        d={curve}
                        className="stroke-blue-500/30 stroke-[5px] blur-sm"
                        fill="none"
                      />
                      <path
                        d={curve}
                        className="stroke-blue-400 stroke-[2px]"
                        fill="none"
                      />
                      
                      <circle r="4.5" className="fill-white filter drop-shadow-[0_0_8px_#3b82f6] stroke-blue-500 stroke-1">
                        <animateMotion
                          dur="2.2s"
                          repeatCount="indefinite"
                          path={curve}
                        />
                      </circle>
                      <circle r="2" className="fill-blue-200">
                        <animateMotion
                          dur="2.2s"
                          repeatCount="indefinite"
                          path={curve}
                        />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}

            {hubs.map((hub) => {
              const isSelected = activeHub.id === hub.id;
              const isHovered = hoveredHub?.id === hub.id;
              
              return (
                <g
                  key={hub.id}
                  className="cursor-pointer group/node"
                  onClick={() => setActiveHub(hub)}
                  onMouseEnter={() => setHoveredHub(hub)}
                  onMouseLeave={() => setHoveredHub(null)}
                >
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected ? 16 : isHovered ? 12 : 7}
                    className={`transition-all duration-300 ${
                      isSelected 
                        ? "fill-blue-500/20 stroke-blue-500/40 stroke-2 animate-pulse" 
                        : "fill-blue-500/5 stroke-blue-500/10 stroke-1 group-hover/node:fill-blue-500/10 group-hover/node:stroke-blue-500/30"
                    }`}
                  />
                  
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected ? 6 : 4}
                    className={`transition-all duration-300 ${
                      isSelected 
                        ? "fill-blue-500 stroke-white stroke-[1.5px]" 
                        : "fill-slate-500 group-hover/node:fill-blue-400 group-hover/node:stroke-white group-hover/node:stroke-1"
                    }`}
                  />

                  <text
                    x={hub.x + hub.labelXOffset}
                    y={hub.y + hub.labelYOffset}
                    textAnchor={hub.labelTextAnchor}
                    className={`font-sans text-[10.5px] font-bold select-none transition-all duration-300 ${
                      isSelected
                        ? "fill-blue-400 font-black scale-105 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        : isHovered
                          ? "fill-white font-extrabold"
                          : "fill-slate-400 group-hover/node:fill-white"
                    }`}
                  >
                    {hub.id === "samutsakhon" ? "สมุทรสาคร" : hub.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}

            <g transform="translate(185, 330)" className="pointer-events-none">
              <line x1="0" y1="0" x2="-35" y2="-30" className="stroke-blue-500 stroke-[1.5px] opacity-75" />
              <circle cx="-35" cy="-30" r="3" className="fill-blue-500" />
              
              <g transform="translate(-108, -42)">
                <rect 
                  width="70" 
                  height="22" 
                  rx="4" 
                  className="fill-blue-600/90 stroke-blue-400/30 stroke-[1px] filter drop-shadow-[0_4px_10px_rgba(37,99,235,0.4)]" 
                />
                <text 
                  x="35" 
                  y="14" 
                  textAnchor="middle" 
                  className="fill-white font-sans text-[9px] font-black tracking-widest"
                >
                  ศูนย์บริการหลัก
                </text>
              </g>
            </g>
          </svg>

          <div className="absolute bottom-4 left-6 bg-[#04152D]/80 backdrop-blur-md px-4 py-3 rounded-xl text-[11px] space-y-2 border border-white/10 shadow-lg select-none">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="font-bold text-white">ศูนย์บริการหลัก (สมุทรสาคร)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-1 w-5 bg-gradient-to-r from-blue-500 to-blue-500/30 rounded-full"></span>
              <span className="text-slate-300 font-medium">เส้นทางเดินรถและกระจายสินค้า</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-slate-500"></span>
              <span className="text-slate-300 font-medium">จุดสแตนด์บายให้บริการ</span>
            </div>
          </div>
        </div>

        {/* 3. INFORMATION PANEL (RIGHT SIDE) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="pb-2">
            <span className="text-xs font-black text-blue-400 tracking-widest uppercase bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              พื้นที่ให้บริการหลัก
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white mt-4 flex items-center gap-3">
              <Activity className="w-7 h-7 text-blue-500 animate-pulse" />
              {activeHub.name}
            </h3>
            <p className="text-slate-400 text-sm mt-3 font-medium leading-relaxed">
              {activeHub.id === "samutsakhon" 
                ? "ศูนย์กระจายสินค้าและจุดให้บริการหลัก WMS TRANSPORT" 
                : `${activeHub.region} (${activeHub.engName})`
              }
            </p>
          </div>

          <div className="space-y-5">
            
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden group/addr shadow-xl hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover/addr:bg-blue-500/20 transition-colors duration-500" />
              
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-white/5 text-blue-400 border border-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg group-hover/addr:bg-blue-600 group-hover/addr:text-white group-hover/addr:border-blue-500 transition-all duration-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-black tracking-widest text-blue-400 uppercase">
                    ศูนย์บริการหลัก WMS TRANSPORT
                  </h4>
                  <p className="text-white text-lg font-bold leading-relaxed">
                    75/535 ซ.13 หมู่บ้านสุขถาวร
                    <br />
                    ต.บ้านเกาะ อ.เมือง
                    <br />
                    จ.สมุทรสาคร 74000
                  </p>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed pt-3 border-t border-white/10 mt-2">
                    “พร้อมให้บริการขนส่งทั่วไทย เดินทางสะดวก รองรับงานด่วนและงานระยะไกล”
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden group/express shadow-xl hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-white/5 text-blue-400 border border-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg group-hover/express:scale-105 transition-transform duration-500">
                  <Zap className="h-6 w-6 animate-pulse" />
                </div>
                <div className="space-y-3 w-full">
                  <h4 className="text-xs font-black tracking-widest text-blue-400 uppercase flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span>บริการขนส่งด่วน</span>
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-sans tracking-wide">
                      {activeHub.time}
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-slate-300 leading-relaxed mt-2">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>รับงานเร่งด่วน 24 ชม.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>วิ่งงานเหมาเที่ยวทั่วไทย</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>ส่งตรงถึงปลายทาง</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>ทีมงานยกของมืออาชีพ</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden group/price shadow-xl hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 group-hover/price:opacity-100 transition-opacity" />
              
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-white/5 text-blue-400 border border-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg group-hover/price:scale-105 transition-transform duration-500">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-black tracking-widest text-slate-300 uppercase">
                    อัตราค่าบริการ {activeHub.name.split(" ")[0]}
                  </h4>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-bold text-white">เริ่มต้น</span>
                    <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-black text-4xl tracking-tight drop-shadow-sm">
                      {activeHub.price.replace("เริ่มต้น ", "")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed pt-2">
                    * ราคาขึ้นอยู่กับระยะทาง ขนาดงาน และประเภทสินค้า
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="pt-4">
            <h4 className="text-xs font-black text-slate-300 tracking-widest uppercase mb-4">
              บริการครอบคลุมการขนย้าย
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {serviceTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {trustItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl text-[13px] font-bold text-slate-300 select-none hover:bg-white/[0.06] transition-colors duration-300"
                >
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://line.me/ti/p/~@wmstransport"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl line-btn-pulse text-white font-black text-lg transition-all duration-300 hover:-translate-y-1 border border-[#06C755]/30 transform active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 10.304c0-4.757-5.37-8.561-12-8.561s-12 3.804-12 8.561c0 4.22 4.266 7.748 10.029 8.442.39.084.92.258.92.657v1.815c0 .428-.23.931.817.636 1.048-.296 5.629-3.284 7.683-5.507 3.023-3.111 4.551-6.185 4.551-9.479z" />
                </svg>
                <span>💬 ขอใบเสนอราคาฟรีผ่าน LINE</span>
              </a>


              <a
                href="tel:0981796946"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-blue-400/50 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-[1.02] text-center"
              >
                <Phone className="h-6 w-6 text-blue-400 animate-pulse" />
                <span>โทร 098-179-6946</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-slate-400">
              <span className="text-[13px] font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                พร้อมให้บริการทุกวัน ไม่มีวันหยุด
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                WMS TRANSPORT HOTLINE
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
