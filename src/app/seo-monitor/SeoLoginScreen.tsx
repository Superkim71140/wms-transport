'use client';

import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowRight, Loader2, Sparkles } from 'lucide-react';

interface SeoLoginScreenProps {
  onSuccess?: () => void;
}

export function SeoLoginScreen({ onSuccess }: SeoLoginScreenProps) {
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/seo-monitor/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'รหัสผ่านไม่ถูกต้อง');
      }

      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-xl shadow-blue-500/20 mb-4">
            <div className="w-full h-full bg-[#0d1527] rounded-[14px] flex items-center justify-center">
              <Lock className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            WMS SEO Monitor
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            แดชบอร์ดติดตามประสิทธิภาพการค้นหาและดัชนี Google Search Console
          </p>
        </div>

        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Server-side Protected | Read-only Google API</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                รหัสผ่านสำหรับเข้าใช้งาน (SEO Dashboard Passcode)
              </label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="ระบุรหัสผ่านผู้ดูแลระบบ"
                autoComplete="current-password"
                disabled={loading}
                className="w-full px-4 py-3 bg-[#1e293b]/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm transition-all"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-red-300 text-xs">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !passcode.trim()}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังตรวจสอบสิทธิ์...</span>
                </>
              ) : (
                <>
                  <span>เข้าสู่ระบบ SEO Monitor</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-500">
              กำหนดค่าผ่าน <code className="text-slate-400 bg-slate-900 px-1 py-0.5 rounded">SEO_DASHBOARD_PASSCODE</code> ใน <code className="text-slate-400 bg-slate-900 px-1 py-0.5 rounded">.env.local</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
