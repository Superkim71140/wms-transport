"use client";

import React, { useState } from "react";
import { Info, AlertCircle, Plus, Minus, RefreshCw } from "lucide-react";
import { vehicleCapacityData } from "@/data/vehicleCapacity";

interface InventoryItem {
  id: string;
  name: string;
  category: "furniture" | "appliances" | "boxes" | "misc";
  volumeCbm: number;
}

const INVENTORY_ITEMS: InventoryItem[] = [
  { id: "mattress-6", name: "ที่นอน 5-6 ฟุต (ชิ้นใหญ่)", category: "furniture", volumeCbm: 1.20 },
  { id: "mattress-3", name: "ที่นอน 3-3.5 ฟุต (ชิ้นเล็ก)", category: "furniture", volumeCbm: 0.70 },
  { id: "sofa-2", name: "โซฟา 2 ที่นั่ง (กว้างไม่เกิน 1.6ม.)", category: "furniture", volumeCbm: 0.80 },
  { id: "wardrobe-flat", name: "ตู้เสื้อผ้า (แบบถอดประกอบราบ)", category: "furniture", volumeCbm: 1.00 },
  { id: "table-dining", name: "โต๊ะกินข้าว + เก้าอี้ (ชุดเล็ก)", category: "furniture", volumeCbm: 0.90 },
  
  { id: "fridge-large", name: "ตู้เย็นขนาดใหญ่ (10 คิวขึ้นไป)", category: "appliances", volumeCbm: 0.90 },
  { id: "fridge-small", name: "ตู้เย็นขนาดเล็ก (ต่ำกว่า 10 คิว)", category: "appliances", volumeCbm: 0.40 },
  { id: "washing-machine", name: "เครื่องซักผ้า (ถังคู่หรือฝาหน้า)", category: "appliances", volumeCbm: 0.45 },
  { id: "tv-stand", name: "ทีวีพร้อมตู้วางทีวี", category: "appliances", volumeCbm: 0.50 },
  
  { id: "box-l", name: "กล่องกระดาษ Size L (50x50x50 ซม.)", category: "boxes", volumeCbm: 0.125 },
  { id: "box-m", name: "กล่องกระดาษ Size M (40x40x40 ซม.)", category: "boxes", volumeCbm: 0.064 },
  
  { id: "bicycle", name: "จักรยานทั่วไป", category: "misc", volumeCbm: 0.50 },
  { id: "suitcase", name: "กระเป๋าเดินทางขนาดใหญ่", category: "misc", volumeCbm: 0.10 },
  { id: "fan", name: "พัดลมตั้งพื้น / เครื่องใช้ไฟฟ้าชิ้นเล็ก", category: "misc", volumeCbm: 0.08 }
];

export default function CargoFitPlanner() {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const truckSpec = vehicleCapacityData["standard-pickup-box-210"];
  const maxVolume = truckSpec.dimensions.totalVolumeCbm; // 7.62

  const updateQty = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }
      return updated;
    });
  };

  const clearInventory = () => setSelectedItems({});

  const totalVolume = Object.entries(selectedItems).reduce((sum, [id, qty]) => {
    const item = INVENTORY_ITEMS.find((it) => it.id === id);
    return sum + (item ? item.volumeCbm * qty : 0);
  }, 0);

  const roundedTotalVolume = Math.round(totalVolume * 100) / 100;
  const fillPercentage = Math.min(100, Math.round((roundedTotalVolume / maxVolume) * 100));

  // Determine Fit Score & Status
  // fitScore: used contextually for status thresholds (values set in if-block below)
  let statusText = "รถว่างเปล่า";
  let statusColor = "text-slate-400";
  let statusBg = "bg-slate-500/10 border-slate-500/20";
  let advice = "กรุณาเลือกสิ่งของด้านล่างเพื่อเริ่มการประเมินพื้นที่จัดเก็บ";

  if (roundedTotalVolume > 0) {
    if (roundedTotalVolume <= 5.0) {
      statusText = "สบายมาก (ของพอดีตู้เหลือๆ)";
      statusColor = "text-emerald-400";
      statusBg = "bg-emerald-500/10 border-emerald-500/20";
      advice = "สิ่งของของคุณสามารถใส่ในตู้ทึบได้อย่างหลวมๆ ยังคงเหลือพื้นที่สำหรับกล่องเสื้อผ้าหรือกระเป๋าจิปาถะอีกประมาณ 2-3 คิว";
    } else if (roundedTotalVolume <= 6.8) {
      statusText = "ฟิตพอดี (จัดวางแน่หนา)";
      statusColor = "text-blue-400";
      statusBg = "bg-blue-500/10 border-blue-500/20";
      advice = "สิ่งของเกือบเต็มความจุ รถตู้ทึบรองรับได้พอดี แต่ต้องอาศัยการวางซ้อนและจัดเรียงอย่างมืออาชีพเพื่อความคุ้มค่าสูงสุด แนะนำบริการคนช่วยยกของของ WMS";
    } else if (roundedTotalVolume <= maxVolume) {
      statusText = "ปริ่มความจุ (พื้นที่จำกัด)";
      statusColor = "text-amber-400";
      statusBg = "bg-amber-500/10 border-amber-500/20";
      advice = "ใกล้เคียงขีดจำกัดตู้ทึบ WMS (7.62 คิว) ลูกค้าต้องแจ้งนิติบุคคล คัดของจัดวางแนวนอนและซ้อนกันอย่างระมัดระวังสูงสุด หรือลดขนาดกล่องลงเพื่อให้ปิดตู้ทึบได้มิดชิด";
    } else {
      statusText = "เกินความจุตู้ทึบ!";
      statusColor = "text-red-400";
      statusBg = "bg-red-500/10 border-red-500/20";
      advice = "ปริมาตรของรวมมากกว่าขีดจำกัดตู้ทึบใน 1 เที่ยว ไม่แนะนำให้ยัดของแน่นจนล้น แนะนำให้ตัดสิ่งของที่ไม่จำเป็นออก หรือแจ้ง WMS เพื่อขนย้าย 2 เที่ยว (มีส่วนลดเพิ่มพิเศษ)";
    }
  }

  return (
    <div className="perf-card rounded-4xl border border-white/10 p-6 sm:p-8 bg-[#071426]/90 backdrop-blur-md">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Fit Visualizer */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] text-blue-400 tracking-widest font-black uppercase">WMS CARGO FIT SCORE</span>
              <h3 className="text-xl font-black text-white">เครื่องคำนวณปริมาตร คิว (CBM)</h3>
            </div>
            {roundedTotalVolume > 0 && (
              <button 
                onClick={clearInventory}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-lg"
              >
                <RefreshCw className="h-3 w-3" />
                <span>รีเซ็ต</span>
              </button>
            )}
          </div>

          {/* Volume Status and Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-sm font-semibold text-slate-300">ปริมาตรรวมที่ใช้:</span>
              <div className="text-right">
                <span className="text-2xl font-black text-white">{roundedTotalVolume} </span>
                <span className="text-xs font-bold text-slate-400">/ {maxVolume} CBM (คิว)</span>
              </div>
            </div>
            
            {/* Visual Progress Bar */}
            <div className="w-full h-4 bg-slate-900 border border-white/5 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-linear-to-r from-blue-500 to-indigo-500 transition-all duration-500 rounded-full"
                style={{ width: `${fillPercentage}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {fillPercentage}%
              </span>
            </div>
          </div>

          {/* Status Message Block */}
          <div className={`border rounded-2xl p-4 sm:p-5 ${statusBg} transition-all duration-300`}>
            <div className="flex items-start gap-3">
              {roundedTotalVolume > maxVolume ? (
                <AlertCircle className={`h-5 w-5 ${statusColor} shrink-0 mt-0.5`} />
              ) : (
                <Info className={`h-5 w-5 ${statusColor} shrink-0 mt-0.5`} />
              )}
              <div>
                <h4 className={`text-base font-black ${statusColor}`}>{statusText}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1 font-semibold">{advice}</p>
              </div>
            </div>
          </div>

          {/* Quick Vehicle Specs Table */}
          <div className="border border-white/5 bg-white/1 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">สเปกขนาดรถอ้างอิง (ผ่านการรับรองแล้ว)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="border-r border-white/5 last:border-0 pr-2">
                <span className="text-[10px] text-slate-500 font-bold block">กว้างภายใน</span>
                <span className="text-sm font-black text-white">{truckSpec.dimensions.widthInternalMeters} ม.</span>
              </div>
              <div className="border-r border-white/5 last:border-0 pr-2">
                <span className="text-[10px] text-slate-500 font-bold block">ยาวภายใน</span>
                <span className="text-sm font-black text-white">{truckSpec.dimensions.lengthInternalMeters} ม.</span>
              </div>
              <div className="border-r border-white/5 last:border-0 pr-2">
                <span className="text-[10px] text-slate-500 font-bold block">สูงภายใน</span>
                <span className="text-sm font-black text-white">{truckSpec.dimensions.heightInternalMeters} ม.</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold block">รับน้ำหนักสูงสุด</span>
                <span className="text-sm font-black text-white">{truckSpec.dimensions.payloadCapacityKg} กก.</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 font-semibold italic text-center pt-1">
              *ได้รับการรับรองความถูกต้องโดย: {truckSpec.dimensions.verifiedBy} เมื่อ {truckSpec.dimensions.verifiedDate}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Checklist */}
        <div className="flex-1 space-y-4">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">เลือกรายการสิ่งของของคุณ</h4>
          
          <div className="h-[280px] sm:h-[350px] overflow-y-auto pr-2 space-y-2 border border-white/5 rounded-2xl p-3 bg-slate-950/20">
            {INVENTORY_ITEMS.map((item) => {
              const qty = selectedItems[item.id] || 0;
              return (
                <div 
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    qty > 0 
                      ? "bg-blue-500/5 border-blue-500/30" 
                      : "bg-white/1 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div>
                    <span className="text-xs sm:text-sm text-white font-extrabold block">{item.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block">ปริมาตร: {item.volumeCbm} คิว (CBM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {qty > 0 && (
                      <button 
                        onClick={() => updateQty(item.id, -1)}
                        className="p-1 hover:bg-white/10 border border-white/15 rounded-md text-slate-300 hover:text-white"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    )}
                    {qty > 0 && (
                      <span className="w-6 text-center font-mono font-black text-sm text-blue-400">{qty}</span>
                    )}
                    <button 
                      onClick={() => updateQty(item.id, 1)}
                      className="p-1 bg-blue-600 hover:bg-blue-500 border border-blue-400/30 rounded-md text-white shadow-md"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {roundedTotalVolume > 0 && (
            <div className="bg-slate-900 border border-white/5 rounded-xl p-4 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">สรุปสิ่งของทั้งหมด: {Object.values(selectedItems).reduce((a, b) => a + b, 0)} ชิ้น</span>
              <a 
                href={`https://line.me/ti/p/DtICkMaDet?text=สอบถามราคาขนของครับ%20คำนวณปริมาตรคิวจากเว็บแล้วได้ประมาณ%20${roundedTotalVolume}%20คิว`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2 rounded-lg transition-all"
              >
                ส่งข้อมูลประเมินราคาต่อ →
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
