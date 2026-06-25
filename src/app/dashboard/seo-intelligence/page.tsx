"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle, AlertCircle, Layers, UploadCloud } from "lucide-react";

interface GSCReportItem {
  query: string;
  pageGroup: string;
  district: string;
  service: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
  conversions: number;
  cannibalizationWarning: boolean;
  staleContentWarning: boolean;
}

// Initial mock report seeded for demonstrating GSC CSV analysis
const SEEDED_INTELLIGENCE: GSCReportItem[] = [
  {
    query: "รถรับจ้างตู้ทึบ บางแค",
    pageGroup: "/areas/bkk-thonburi/bang-khae",
    district: "บางแค",
    service: "ย้ายบ้าน/คอนโด",
    impressions: 1250,
    clicks: 110,
    ctr: 8.8,
    avgPosition: 2.1,
    conversions: 18,
    cannibalizationWarning: false,
    staleContentWarning: false
  },
  {
    query: "ขนส่งมอเตอร์ไซค์ บางแค",
    pageGroup: "/areas/bkk-thonburi/bang-khae",
    district: "บางแค",
    service: "ส่งมอเตอร์ไซค์",
    impressions: 800,
    clicks: 12,
    ctr: 1.5, // Weak CTR warning
    avgPosition: 5.4,
    conversions: 1,
    cannibalizationWarning: true, // Cannibalized by /service/bkk-thonburi/motorcycle
    staleContentWarning: false
  },
  {
    query: "รถกระบะรับจ้าง มหาชัย",
    pageGroup: "/areas/samutsakhon/maha-chai",
    district: "มหาชัย",
    service: "ขนส่งสินค้าโรงงาน",
    impressions: 2100,
    clicks: 185,
    ctr: 8.8,
    avgPosition: 1.8,
    conversions: 32,
    cannibalizationWarning: false,
    staleContentWarning: false
  },
  {
    query: "รถตู้ทึบ ปิ่นเกล้า ย้ายหอ",
    pageGroup: "/areas/bkk-thonburi/pinklao",
    district: "ปิ่นเกล้า",
    service: "ย้ายบ้าน/คอนโด",
    impressions: 650,
    clicks: 45,
    ctr: 6.9,
    avgPosition: 3.2,
    conversions: 6,
    cannibalizationWarning: false,
    staleContentWarning: true // Stale warning example
  }
];

export default function SeoDashboardPage() {
  const [data, setData] = useState<GSCReportItem[]>(SEEDED_INTELLIGENCE);
  const [isCsvUploaded, setIsCsvUploaded] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "wmsseo2026") {
      setIsAuthenticated(true);
    } else {
      alert("รหัสผ่านไม่ถูกต้อง สำหรับผู้ดูแลระบบ WMS เท่านั้น");
    }
  };

  const handleSimulateUpload = () => {
    setIsCsvUploaded(true);
    // Add additional mock records as if parsed from GSC CSV
    setData((prev) => [
      ...prev,
      {
        query: "ส่งมอเตอร์ไซค์ไปภูเก็ต ราคา",
        pageGroup: "/pricing/motorcycle-transport",
        district: "ทั่วประเทศ",
        service: "ส่งมอเตอร์ไซค์",
        impressions: 3400,
        clicks: 380,
        ctr: 11.1,
        avgPosition: 1.4,
        conversions: 45,
        cannibalizationWarning: false,
        staleContentWarning: false
      },
      {
        query: "รถกระบะตู้ทึบย้ายคอนโดกรุงเทพ",
        pageGroup: "/",
        district: "กรุงเทพมหานคร",
        service: "ย้ายบ้าน/คอนโด",
        impressions: 4800,
        clicks: 85,
        ctr: 1.7, // Weak CTR warning
        avgPosition: 8.2,
        conversions: 12,
        cannibalizationWarning: true,
        staleContentWarning: false
      }
    ]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex flex-col justify-between">
        <Navbar />
        <div className="grow flex flex-col items-center justify-center pt-32 pb-24 px-4">
          <div className="perf-card rounded-3xl p-8 max-w-md w-full border border-white/10 text-center space-y-6">
            <Layers className="h-12 w-12 text-blue-400 mx-auto" />
            <h1 className="text-2xl font-black">WMS Search Intelligence</h1>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              แดชบอร์ดตรวจสอบคำค้นหา คอนเทนต์ทับซ้อน (Cannibalization) และสุขภาพ SEO ภายในระบบผู้ใช้ที่ได้รับอนุญาตเท่านั้น
            </p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="ป้อนรหัสผ่านผู้เข้าดูแลระบบ (wmsseo2026)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-white/15 px-4 py-3 rounded-xl text-center text-sm font-semibold focus:outline-none focus:border-blue-500 text-white"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold text-sm transition-all"
              >
                ยืนยันรหัสผ่านเพื่อเข้าใช้งาน
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Analytics variables calculation
  const totalImpressions = data.reduce((sum, item) => sum + item.impressions, 0);
  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  const averageCtr = Math.round((totalClicks / totalImpressions) * 1000) / 10;
  const cannibalizationCount = data.filter(item => item.cannibalizationWarning).length;
  const staleCount = data.filter(item => item.staleContentWarning).length;
  const weakCtrCount = data.filter(item => item.ctr < 2.0).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <Navbar />

      <main className="grow relative pt-32 pb-24">
        {/* Ambient background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[800px] h-[800px] bg-blue-600/4 rounded-full blur-[180px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[800px] h-[800px] bg-indigo-500/4 rounded-full blur-[200px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <span className="text-xs text-blue-400 tracking-widest font-black uppercase">INTERNAL SEO MONITOR</span>
              <h1 className="text-3xl font-black text-white">Search Intelligence & Cannibalization Watcher</h1>
            </div>

            <button
              onClick={handleSimulateUpload}
              disabled={isCsvUploaded}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                isCsvUploaded 
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5" 
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
              }`}
            >
              <UploadCloud className="h-4 w-4" />
              <span>{isCsvUploaded ? "โหลดไฟล์ GSC CSV เรียบร้อย" : "นำเข้ารายงาน GSC CSV"}</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="perf-card rounded-2xl p-5 border border-white/5 bg-slate-900/50">
              <span className="text-[10px] text-slate-500 font-bold block">การแสดงผลรวม (Impressions)</span>
              <span className="text-2xl font-black text-white block mt-1">{totalImpressions.toLocaleString()}</span>
            </div>
            <div className="perf-card rounded-2xl p-5 border border-white/5 bg-slate-900/50">
              <span className="text-[10px] text-slate-500 font-bold block">จำนวนคลิก (Clicks)</span>
              <span className="text-2xl font-black text-white block mt-1">{totalClicks.toLocaleString()}</span>
            </div>
            <div className="perf-card rounded-2xl p-5 border border-white/5 bg-slate-900/50">
              <span className="text-[10px] text-slate-500 font-bold block">อัตราคลิกเฉลี่ย (Average CTR)</span>
              <span className="text-2xl font-black text-blue-400 block mt-1">{averageCtr}%</span>
            </div>
            <div className="perf-card rounded-2xl p-5 border border-white/5 bg-slate-900/50">
              <span className="text-[10px] text-slate-500 font-bold block">ความเสี่ยงทับซ้อน (Cannibalization)</span>
              <span className="text-2xl font-black text-red-400 block mt-1">{cannibalizationCount} คีย์เวิร์ด</span>
            </div>
          </div>

          {/* Warnings Panel */}
          {(cannibalizationCount > 0 || staleCount > 0 || weakCtrCount > 0) && (
            <div className="perf-card rounded-3xl p-6 sm:p-8 mb-10 border border-yellow-500/20 bg-yellow-500/2">
              <h2 className="text-lg font-black text-yellow-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span>คำเตือนด่วนสำหรับโครงสร้าง SEO</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
                {cannibalizationCount > 0 && (
                  <div className="border border-white/5 bg-slate-950/20 rounded-xl p-4 space-y-2">
                    <span className="text-red-400 font-bold flex items-center gap-1.5">
                      <AlertCircle className="h-4.5 w-4.5" />
                      <span>พบหน้าแย่งอันดับกันเอง (Cannibalization)</span>
                    </span>
                    <p className="text-[11px] text-slate-400">
                      มีคำค้นหาหลักที่แสดงผลซ้อนทับกันระหว่างหน้าเขตและหน้าบริการหลัก แนะนำตรวจสอบโครงสร้าง Internal Link
                    </p>
                  </div>
                )}

                {staleCount > 0 && (
                  <div className="border border-white/5 bg-slate-950/20 rounded-xl p-4 space-y-2">
                    <span className="text-yellow-400 font-bold flex items-center gap-1.5">
                      <AlertCircle className="h-4.5 w-4.5" />
                      <span>คอนเทนต์ล้าสมัย (Stale Content)</span>
                    </span>
                    <p className="text-[11px] text-slate-400">
                      พบคอนเทนต์เขตหรือคู่มือที่ไม่ได้ถูกอัปเดตหรือตรวจสอบข้อมูลหน้างานจริงนานเกิน 60 วัน แนะนำเข้าแก้ไขวันที่รีวิว
                    </p>
                  </div>
                )}

                {weakCtrCount > 0 && (
                  <div className="border border-white/5 bg-slate-950/20 rounded-xl p-4 space-y-2">
                    <span className="text-blue-400 font-bold flex items-center gap-1.5">
                      <AlertCircle className="h-4.5 w-4.5" />
                      <span>CTR ต่ำกว่าเกณฑ์มาตรฐาน</span>
                    </span>
                    <p className="text-[11px] text-slate-400">
                      พบคีย์เวิร์ดที่มีการแสดงผล (Impressions) สูง แต่อัตราคลิกต่ำกว่า 2% แนะนำปรับปรุง Meta Title หรือ Alt Text
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Table */}
          <div className="perf-card rounded-3xl p-6 sm:p-8 overflow-hidden">
            <h2 className="text-xl font-black text-white mb-6">ตารางวิเคราะห์คำค้นหาและหน้าเป้าหมาย</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-300 text-xs sm:text-sm font-semibold border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-bold">
                    <th className="py-4 px-3">คำค้นหาหลัก (Query)</th>
                    <th className="py-4 px-3">หน้าเป้าหมาย (Page Group)</th>
                    <th className="py-4 px-3">พิกัดเขต/จังหวัด</th>
                    <th className="py-4 px-3 text-center">CTR (%)</th>
                    <th className="py-4 px-3 text-center">อันดับเฉลี่ย</th>
                    <th className="py-4 px-3 text-center">ผู้ทับซ้อน/แจ้งเตือน</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/1">
                      <td className="py-4 px-3 font-extrabold text-white">{item.query}</td>
                      <td className="py-4 px-3 font-mono text-[11px] text-slate-400">{item.pageGroup}</td>
                      <td className="py-4 px-3 text-slate-300">{item.district}</td>
                      <td className={`py-4 px-3 text-center font-bold ${item.ctr < 2.0 ? "text-red-400" : "text-emerald-400"}`}>{item.ctr}%</td>
                      <td className="py-4 px-3 text-center font-bold text-white">{item.avgPosition}</td>
                      <td className="py-4 px-3 text-center">
                        <div className="flex flex-col gap-1 items-center">
                          {item.cannibalizationWarning && (
                            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                              Cannibalized ⚠️
                            </span>
                          )}
                          {item.staleContentWarning && (
                            <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                              Stale Content ⚠️
                            </span>
                          )}
                          {!item.cannibalizationWarning && !item.staleContentWarning && (
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                              Healthy
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
