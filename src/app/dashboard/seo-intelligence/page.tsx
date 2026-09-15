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
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
        <Navbar />
        <div className="grow flex flex-col items-center justify-center pt-32 pb-24 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-slate-200/80 shadow-xs text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600">
              <Layers className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">WMS Search Intelligence</h1>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              แดชบอร์ดตรวจสอบคำค้นหา คอนเทนต์ทับซ้อน (Cannibalization) และสุขภาพ SEO ภายในระบบผู้ใช้ที่ได้รับอนุญาตเท่านั้น
            </p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="ป้อนรหัสผ่านผู้เข้าดูแลระบบ (wmsseo2026)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-center text-sm font-semibold focus:outline-none focus:border-blue-500 text-slate-900"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-xs"
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
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans">
      <Navbar />

      <main className="grow relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <span className="text-xs text-blue-700 tracking-wider font-bold uppercase">INTERNAL SEO MONITOR</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Search Intelligence & Cannibalization Watcher</h1>
            </div>

            <button
              onClick={handleSimulateUpload}
              disabled={isCsvUploaded}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isCsvUploaded 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <UploadCloud className="h-4 w-4" />
              <span>{isCsvUploaded ? "โหลดไฟล์ GSC CSV เรียบร้อย" : "นำเข้ารายงาน GSC CSV"}</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">การแสดงผลรวม (Impressions)</span>
              <span className="text-2xl font-black text-slate-900 block mt-1">{totalImpressions.toLocaleString()}</span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">จำนวนคลิก (Clicks)</span>
              <span className="text-2xl font-black text-slate-900 block mt-1">{totalClicks.toLocaleString()}</span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">อัตราคลิกเฉลี่ย (Average CTR)</span>
              <span className="text-2xl font-black text-blue-600 block mt-1">{averageCtr}%</span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">ความเสี่ยงทับซ้อน (Cannibalization)</span>
              <span className="text-2xl font-black text-rose-600 block mt-1">{cannibalizationCount} คีย์เวิร์ด</span>
            </div>
          </div>

          {/* Warnings Panel */}
          {(cannibalizationCount > 0 || staleCount > 0 || weakCtrCount > 0) && (
            <div className="bg-amber-50/70 rounded-2xl p-6 sm:p-8 mb-8 border border-amber-200/80 shadow-xs">
              <h2 className="text-base font-bold text-amber-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span>คำเตือนด่วนสำหรับโครงสร้าง SEO</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {cannibalizationCount > 0 && (
                  <div className="border border-rose-200 bg-white rounded-xl p-4 space-y-2 shadow-xs">
                    <span className="text-rose-700 font-bold flex items-center gap-1.5 text-xs">
                      <AlertCircle className="h-4 w-4 text-rose-600" />
                      <span>พบหน้าแย่งอันดับกันเอง (Cannibalization)</span>
                    </span>
                    <p className="text-xs text-slate-600">
                      มีคำค้นหาหลักที่แสดงผลซ้อนทับกันระหว่างหน้าเขตและหน้าบริการหลัก แนะนำตรวจสอบโครงสร้าง Internal Link
                    </p>
                  </div>
                )}

                {staleCount > 0 && (
                  <div className="border border-amber-200 bg-white rounded-xl p-4 space-y-2 shadow-xs">
                    <span className="text-amber-800 font-bold flex items-center gap-1.5 text-xs">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span>คอนเทนต์ล้าสมัย (Stale Content)</span>
                    </span>
                    <p className="text-xs text-slate-600">
                      พบคอนเทนต์เขตหรือคู่มือที่ไม่ได้ถูกอัปเดตหรือตรวจสอบข้อมูลหน้างานจริงนานเกิน 60 วัน แนะนำเข้าแก้ไขวันที่รีวิว
                    </p>
                  </div>
                )}

                {weakCtrCount > 0 && (
                  <div className="border border-blue-200 bg-white rounded-xl p-4 space-y-2 shadow-xs">
                    <span className="text-blue-700 font-bold flex items-center gap-1.5 text-xs">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <span>CTR ต่ำกว่าเกณฑ์มาตรฐาน</span>
                    </span>
                    <p className="text-xs text-slate-600">
                      พบคีย์เวิร์ดที่มีการแสดงผล (Impressions) สูง แต่อัตราคลิกต่ำกว่า 2% แนะนำปรับปรุง Meta Title หรือ Alt Text
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Table */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs overflow-hidden">
            <h2 className="text-lg font-bold text-slate-900 mb-5">ตารางวิเคราะห์คำค้นหาและหน้าเป้าหมาย</h2>
            
            <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
              <table className="w-full text-left text-slate-700 text-xs sm:text-sm font-medium border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-600 font-bold bg-slate-50/80">
                    <th className="py-3.5 px-3">คำค้นหาหลัก (Query)</th>
                    <th className="py-3.5 px-3">หน้าเป้าหมาย (Page Group)</th>
                    <th className="py-3.5 px-3">พิกัดเขต/จังหวัด</th>
                    <th className="py-3.5 px-3 text-center">CTR (%)</th>
                    <th className="py-3.5 px-3 text-center">อันดับเฉลี่ย</th>
                    <th className="py-3.5 px-3 text-center">ผู้ทับซ้อน/แจ้งเตือน</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-slate-900">{item.query}</td>
                      <td className="py-3.5 px-3 font-mono text-xs text-slate-600">{item.pageGroup}</td>
                      <td className="py-3.5 px-3 text-slate-600">{item.district}</td>
                      <td className={`py-3.5 px-3 text-center font-bold ${item.ctr < 2.0 ? "text-rose-600" : "text-emerald-600"}`}>{item.ctr}%</td>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-900">{item.avgPosition}</td>
                      <td className="py-3.5 px-3 text-center">
                        <div className="flex flex-col gap-1 items-center">
                          {item.cannibalizationWarning && (
                            <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                              Cannibalized ⚠️
                            </span>
                          )}
                          {item.staleContentWarning && (
                            <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                              Stale Content ⚠️
                            </span>
                          )}
                          {!item.cannibalizationWarning && !item.staleContentWarning && (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
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
