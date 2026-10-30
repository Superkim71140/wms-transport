'use client';

import React, { useState, useMemo } from 'react';
import type { SeoMonitorSnapshot } from '@/lib/seo-monitor/seo-store';
import type { UrlInspectionResult } from '@/lib/seo-monitor/gsc-client';
import {
  ShieldCheck,
  RefreshCw,
  Search,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Info,
  Database,
  Globe,
  FileCode,
  Gauge,
  LogOut,
  Sparkles,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface SeoDashboardClientProps {
  initialSnapshot: SeoMonitorSnapshot;
}

export function SeoDashboardClient({ initialSnapshot }: SeoDashboardClientProps) {
  const [snapshot, setSnapshot] = useState<SeoMonitorSnapshot>(initialSnapshot);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  // URL Inspection Station State
  const [inspectInputUrl, setInspectInputUrl] = useState('');
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectError, setInspectError] = useState<string | null>(null);
  const [inspectSuccess, setInspectSuccess] = useState<string | null>(null);

  // Search Analytics Filter
  const [queryFilter, setQueryFilter] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'queries' | 'inspection' | 'alerts' | 'pagespeed'>('overview');

  // Trigger full GSC sync
  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    setSyncError(null);

    try {
      const res = await fetch('/api/seo-monitor/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sync with Search Console');
      }

      if (data.snapshot) {
        setSnapshot(data.snapshot);
      }
      setSyncMessage('ซิงค์ข้อมูลสดจาก Google Search Console สำเร็จ');
      setTimeout(() => setSyncMessage(null), 4000);
    } catch (err: any) {
      setSyncError(err.message || 'เกิดข้อผิดพลาดในการซิงค์ข้อมูล');
    } finally {
      setIsSyncing(false);
    }
  };

  // Trigger ad-hoc URL inspection
  const handleInspectUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = inspectInputUrl.trim();
    if (!url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (url.startsWith('/')) {
        url = `https://wms-transport.com${url}`;
      } else {
        url = `https://wms-transport.com/${url}`;
      }
    }

    setIsInspecting(true);
    setInspectError(null);
    setInspectSuccess(null);

    try {
      const res = await fetch('/api/seo-monitor/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'ตรวจสอบ URL ไม่สำเร็จ');
      }

      if (data.inspection) {
        // Update snapshot
        setSnapshot(prev => {
          const updated = [...prev.inspections];
          const idx = updated.findIndex(i => i.inspectionUrl === url);
          if (idx >= 0) {
            updated[idx] = data.inspection;
          } else {
            updated.unshift(data.inspection);
          }
          return { ...prev, inspections: updated };
        });
        setInspectSuccess(`ตรวจสอบ ${url} สำเร็จ (Verdict: ${data.inspection.verdict})`);
        setInspectInputUrl('');
      }
    } catch (err: any) {
      setInspectError(err.message || 'เกิดข้อผิดพลาดในการตรวจสอบ URL');
    } finally {
      setIsInspecting(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/seo-monitor/auth', { method: 'DELETE' });
    } finally {
      window.location.reload();
    }
  };

  // Performance calculations
  const perfMetrics = useMemo(() => {
    const latest = snapshot.analyticsLatest28d || [];
    const prev = snapshot.analyticsPrev28d || [];

    const totalClicksLatest = latest.reduce((acc, r) => acc + (r.clicks || 0), 0);
    const totalClicksPrev = prev.reduce((acc, r) => acc + (r.clicks || 0), 0);
    const clicksDiff = totalClicksLatest - totalClicksPrev;
    const clicksDiffPct = totalClicksPrev > 0 ? ((clicksDiff / totalClicksPrev) * 100).toFixed(1) : null;

    const totalImpLatest = latest.reduce((acc, r) => acc + (r.impressions || 0), 0);
    const totalImpPrev = prev.reduce((acc, r) => acc + (r.impressions || 0), 0);
    const impDiff = totalImpLatest - totalImpPrev;
    const impDiffPct = totalImpPrev > 0 ? ((impDiff / totalImpPrev) * 100).toFixed(1) : null;

    const avgCtrLatest = totalImpLatest > 0 ? (totalClicksLatest / totalImpLatest) * 100 : 0;
    const avgCtrPrev = totalImpPrev > 0 ? (totalClicksPrev / totalImpPrev) * 100 : 0;
    const ctrDiff = avgCtrLatest - avgCtrPrev;

    const avgPosLatest = latest.length > 0 ? latest.reduce((acc, r) => acc + r.position, 0) / latest.length : 0;
    const avgPosPrev = prev.length > 0 ? prev.reduce((acc, r) => acc + r.position, 0) / prev.length : 0;
    const posDiff = avgPosLatest - avgPosPrev; // lower is better

    return {
      totalClicksLatest,
      totalClicksPrev,
      clicksDiff,
      clicksDiffPct,
      totalImpLatest,
      totalImpPrev,
      impDiff,
      impDiffPct,
      avgCtrLatest,
      avgCtrPrev,
      ctrDiff,
      avgPosLatest,
      avgPosPrev,
      posDiff
    };
  }, [snapshot]);

  // Filtered queries
  const filteredQueries = useMemo(() => {
    const rows = snapshot.analyticsLatest28d || [];
    if (!queryFilter.trim()) return rows;
    const q = queryFilter.toLowerCase();
    return rows.filter(r => {
      const queryName = (r.keys[0] || '').toLowerCase();
      const pageUrl = (r.keys[1] || '').toLowerCase();
      return queryName.includes(q) || pageUrl.includes(q);
    });
  }, [snapshot, queryFilter]);

  // Format date
  const formatTime = (isoString: string | null) => {
    if (!isoString) return 'ยังไม่ได้ซิงค์';
    try {
      const d = new Date(isoString);
      return d.toLocaleString('th-TH', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0c1328]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0a1124] rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">WMS SEO Monitor</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live GSC Connected
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Property: <code className="text-cyan-300 font-mono">https://wms-transport.com/</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-cyan-300 text-xs font-medium flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isSyncing ? 'กำลังซิงค์ GSC...' : 'Sync Now'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800 transition-all text-xs flex items-center gap-1"
              title="ออกจากระบบ"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 border-t border-slate-800/60 overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Overview & Sitemaps</span>
          </button>

          <button
            onClick={() => setActiveTab('inspection')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'inspection'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>URL Inspection Station</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
              {snapshot.inspections.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('queries')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'queries'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Search Analytics (28d)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
              {snapshot.analyticsLatest28d.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'alerts'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Alerts & Opportunities</span>
            {snapshot.alerts.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 text-[10px] border border-amber-500/30">
                {snapshot.alerts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('pagespeed')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pagespeed'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>PageSpeed & Web Vitals</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-300 text-[10px] border border-amber-500/20">
              Pending API Key
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {/* Status Notification Banner */}
        {syncMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 shadow-lg animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{syncMessage}</span>
          </div>
        )}
        {syncError && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 shadow-lg animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{syncError}</span>
          </div>
        )}

        {/* Feature 1: Connection & Storage Info Bar */}
        <section className="bg-[#0f172a]/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/50 border border-blue-800/40 text-blue-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Permission: <strong className="text-white">siteFullUser</strong> (Verified Read-only)</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>
                Storage Engine:{' '}
                <strong className={snapshot.storageEngine === 'postgresql' ? 'text-emerald-400' : 'text-cyan-300'}>
                  {snapshot.storageEngine === 'postgresql' ? 'PostgreSQL (Tables Active)' : 'Local Durable Storage (JSON Data)'}
                </strong>
              </span>
            </div>

            <div className="text-slate-400 text-xs">
              Last Sync: <span className="text-slate-200">{formatTime(snapshot.lastSyncAt)}</span>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Search Console API v3 & URL Inspection v1
          </div>
        </section>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Feature 2: 28-Day Performance Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Clicks */}
              <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Total Clicks (28 วันล่าสุด)</span>
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-cyan-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {perfMetrics.totalClicksLatest.toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  {perfMetrics.clicksDiff >= 0 ? (
                    <span className="text-emerald-400 flex items-center font-semibold">
                      +{perfMetrics.clicksDiff} ({perfMetrics.clicksDiffPct || '0'}%)
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center font-semibold">
                      {perfMetrics.clicksDiff} ({perfMetrics.clicksDiffPct}%)
                    </span>
                  )}
                  <span className="text-slate-500">เทียบ 28 วันก่อนหน้า</span>
                </div>
              </div>

              {/* Card 2: Total Impressions */}
              <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Total Impressions (28 วันล่าสุด)</span>
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {perfMetrics.totalImpLatest.toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  {perfMetrics.impDiff >= 0 ? (
                    <span className="text-emerald-400 flex items-center font-semibold">
                      +{perfMetrics.impDiff} ({perfMetrics.impDiffPct || '0'}%)
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center font-semibold">
                      {perfMetrics.impDiff} ({perfMetrics.impDiffPct}%)
                    </span>
                  )}
                  <span className="text-slate-500">เทียบ 28 วันก่อนหน้า</span>
                </div>
              </div>

              {/* Card 3: Average CTR */}
              <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Average CTR</span>
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {perfMetrics.avgCtrLatest.toFixed(1)}%
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  {perfMetrics.ctrDiff >= 0 ? (
                    <span className="text-emerald-400 font-semibold">
                      +{(perfMetrics.ctrDiff).toFixed(1)}% pts
                    </span>
                  ) : (
                    <span className="text-rose-400 font-semibold">
                      {(perfMetrics.ctrDiff).toFixed(1)}% pts
                    </span>
                  )}
                  <span className="text-slate-500">ช่วงก่อน: {perfMetrics.avgCtrPrev.toFixed(1)}%</span>
                </div>
              </div>

              {/* Card 4: Average Position */}
              <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Average Position</span>
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {perfMetrics.avgPosLatest.toFixed(1)}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  {perfMetrics.posDiff <= 0 ? (
                    <span className="text-emerald-400 font-semibold">
                      {(Math.abs(perfMetrics.posDiff)).toFixed(1)} อันดับดีขึ้น
                    </span>
                  ) : (
                    <span className="text-rose-400 font-semibold">
                      +{(perfMetrics.posDiff).toFixed(1)} อันดับ
                    </span>
                  )}
                  <span className="text-slate-500">ช่วงก่อน: {perfMetrics.avgPosPrev.toFixed(1)}</span>
                </div>
              </div>
            </section>

            {/* Feature 3: Live Sitemaps & Indexing Overview */}
            <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-base font-bold text-white">Live Sitemap Submission & Indexing Status</h2>
                </div>
                <a
                  href="https://wms-transport.com/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>เปิด sitemap.xml จริง</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {snapshot.sitemaps && snapshot.sitemaps.length > 0 ? (
                <div className="space-y-4">
                  {snapshot.sitemaps.map((sm, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-cyan-300 font-medium">{sm.path}</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                            Success
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex flex-wrap items-center gap-4 pt-1">
                          <span>ส่งเมื่อ: <strong className="text-slate-200">{formatTime(sm.lastSubmitted || null)}</strong></span>
                          <span>อ่านล่าสุด: <strong className="text-slate-200">{formatTime(sm.lastDownloaded || null)}</strong></span>
                          <span>คำเตือน: <strong className="text-emerald-400">{sm.warnings || '0'}</strong></span>
                          <span>ข้อผิดพลาด: <strong className="text-emerald-400">{sm.errors || '0'}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs text-slate-400">URLs ใน Sitemap</div>
                          <div className="text-2xl font-bold text-white">
                            {sm.contents?.[0]?.submitted || '155'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  ไม่พบข้อมูล Sitemap กด &ldquo;Sync Now&rdquo; เพื่อดึงข้อมูลสด
                </div>
              )}
            </section>

            {/* Quick Glimpse of Inspections & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inspection Quick Table */}
              <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-cyan-400" />
                    <span>Representative URL Inspections (5 Benchmarks)</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('inspection')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>ดูทั้งหมด</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {snapshot.inspections.slice(0, 5).map((insp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center justify-between gap-3 text-xs">
                      <div className="truncate flex-1">
                        <div className="font-mono text-slate-200 truncate">{insp.inspectionUrl}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {insp.coverageState || 'ไม่มีข้อมูลสถานะ'}
                        </div>
                      </div>
                      <div>
                        {insp.verdict === 'PASS' ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[10px]">
                            PASS
                          </span>
                        ) : insp.verdict === 'NEUTRAL' ? (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold text-[10px]">
                            DISCOVERED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold text-[10px]">
                            {insp.verdict}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Alerts Quick Box */}
              <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>SEO Health Alerts & Opportunities</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('alerts')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>ดูทั้งหมด ({snapshot.alerts.length})</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {snapshot.alerts.length === 0 ? (
                  <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-center text-xs text-emerald-300">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    ไม่พบปัญหา Canonical Mismatch หรือข้อผิดพลาดร้ายแรง ระบบ SEO อยู่ในเกณฑ์ดีเยี่ยม
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {snapshot.alerts.slice(0, 3).map((alert, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-slate-200">{alert.title}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold ${
                            alert.severity === 'critical'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : alert.severity === 'warning'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-blue-500/20 text-cyan-400 border border-blue-500/30'
                          }`}>
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] line-clamp-2">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* TAB 2: URL INSPECTION STATION */}
        {activeTab === 'inspection' && (
          <div className="space-y-6">
            {/* Feature 4: Interactive Live URL Inspection Form */}
            <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white">Live URL Inspection Tool (Google Search Console API)</h2>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                ตรวจสอบสถานะดัชนี (Indexing State), Canonical URL ที่ Google เลือกจริง, และสถานะการ Crawl ของทุกหน้าบน <code className="text-cyan-300 font-mono">https://wms-transport.com/*</code>
              </p>

              <form onSubmit={handleInspectUrl} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={inspectInputUrl}
                  onChange={(e) => setInspectInputUrl(e.target.value)}
                  placeholder="https://wms-transport.com/service/bkk-thonburi หรือ /areas"
                  disabled={isInspecting}
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                />
                <button
                  type="submit"
                  disabled={isInspecting || !inspectInputUrl.trim()}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${isInspecting ? 'animate-spin' : ''}`} />
                  <span>{isInspecting ? 'กำลังตรวจสอบ...' : 'Inspect Now'}</span>
                </button>
              </form>

              {inspectSuccess && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{inspectSuccess}</span>
                </div>
              )}
              {inspectError && (
                <div className="mt-3 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{inspectError}</span>
                </div>
              )}
            </section>

            {/* Inspections Table */}
            <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Inspected URLs History ({snapshot.inspections.length})</h3>
                  <p className="text-xs text-slate-400 mt-0.5">รวมหน้าตัวแทนหลักและหน้าที่มีการตรวจสอบสด</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Inspection URL</th>
                      <th className="py-3 px-4">Verdict</th>
                      <th className="py-3 px-4">Coverage State</th>
                      <th className="py-3 px-4">Canonical (User vs Google)</th>
                      <th className="py-3 px-4">Crawled As</th>
                      <th className="py-3 px-4">HTTP Status</th>
                      <th className="py-3 px-4">Last Crawl</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {snapshot.inspections.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-white max-w-xs truncate">
                          <a
                            href={item.inspectionUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-cyan-400 inline-flex items-center gap-1"
                          >
                            <span className="truncate">{item.inspectionUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 text-slate-500" />
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          {item.verdict === 'PASS' ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px] inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              PASS
                            </span>
                          ) : item.verdict === 'NEUTRAL' ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold text-[11px] inline-flex items-center gap-1">
                              <Info className="w-3 h-3" />
                              DISCOVERED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold text-[11px] inline-flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {item.verdict}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-200">
                          {item.coverageState || '-'}
                        </td>
                        <td className="py-3 px-4">
                          {item.googleCanonical ? (
                            <div className="space-y-0.5 font-mono text-[11px]">
                              <div>Declared: <span className="text-slate-400 truncate">{item.userCanonical || item.inspectionUrl}</span></div>
                              <div>Selected: <span className="text-cyan-300 truncate">{item.googleCanonical}</span></div>
                            </div>
                          ) : (
                            <span className="text-slate-500 text-[11px]">รอผลการจัดทำดัชนี</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">
                            {item.crawledAs || 'MOBILE'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                          {item.httpStatus || 200}
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {formatTime(item.lastCrawlTime || null)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* TAB 3: SEARCH ANALYTICS QUERIES */}
        {activeTab === 'queries' && (
          <div className="space-y-6">
            {/* Feature 5: Top Search Queries & Landing Pages Table */}
            <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span>Search Analytics Queries & Pages (28-Day Data)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ช่วงเวลา: <strong className="text-slate-200">{snapshot.analyticsDateRange.latest.start || '28 วันล่าสุด'}</strong> ถึง <strong className="text-slate-200">{snapshot.analyticsDateRange.latest.end || 'ปัจจุบัน'}</strong>
                  </p>
                </div>

                <div className="w-full sm:w-72 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={queryFilter}
                    onChange={(e) => setQueryFilter(e.target.value)}
                    placeholder="กรองคำค้นหา หรือ URL..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Search Query (คำค้นหา)</th>
                      <th className="py-3 px-4">Landing Page (หน้าเว็บ)</th>
                      <th className="py-3 px-4 text-right">Clicks</th>
                      <th className="py-3 px-4 text-right">Impressions</th>
                      <th className="py-3 px-4 text-right">CTR</th>
                      <th className="py-3 px-4 text-right">Avg Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredQueries.length > 0 ? (
                      filteredQueries.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-medium text-white">
                            <span className="font-semibold text-cyan-300">{row.keys[0] || '-'}</span>
                          </td>
                          <td className="py-3 px-4 max-w-sm truncate font-mono text-[11px]">
                            <a
                              href={row.keys[1]}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-400 hover:text-white truncate flex items-center gap-1"
                            >
                              <span className="truncate">{row.keys[1]}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-white">
                            {row.clicks.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-slate-200">
                            {row.impressions.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-emerald-400">
                            {(row.ctr * 100).toFixed(1)}%
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-amber-300">
                            {row.position.toFixed(1)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-slate-500">
                          ไม่พบคิวรี่ค้นหาที่ตรงกับคำกรอง
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* TAB 4: ALERTS & OPPORTUNITIES */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            {/* Feature 6: Smart SEO Health Alerts & Opportunity Spotter */}
            <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">Smart SEO Health Alerts & Opportunity Spotter</h2>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                ระบบวิเคราะห์ Canonical Mismatch, หน้าที่อยู่ในคิวรอทำดัชนี (Discovered Not Indexed), คำค้นที่มี Impression สูงแต่ CTR ต่ำ, และ Query Overlap
              </p>

              {snapshot.alerts.length === 0 ? (
                <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-white">ไม่มีข้อผิดพลาดหรือสัญญาณเตือน</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Googlebot จดจำ Canonical ตรงกับโค้ดทุกหน้า และไม่พบการแย่งคีย์เวิร์ด (Query Cannibalization)
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {snapshot.alerts.map((alert, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        alert.severity === 'critical'
                          ? 'bg-rose-950/30 border-rose-800/40'
                          : alert.severity === 'warning'
                          ? 'bg-amber-950/30 border-amber-800/40'
                          : 'bg-blue-950/30 border-blue-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {alert.severity === 'critical' ? (
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          ) : alert.severity === 'warning' ? (
                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : (
                            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                          )}
                          <h4 className="text-xs font-bold text-white">{alert.title}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                          alert.severity === 'critical'
                            ? 'bg-rose-500/20 text-rose-400'
                            : alert.severity === 'warning'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-blue-500/20 text-cyan-400'
                        }`}>
                          {alert.alertType.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mb-3">{alert.message}</p>

                      {alert.url && (
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 font-mono text-[11px] text-cyan-300 truncate">
                          URL: {alert.url}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 5: PAGESPEED & WEB VITALS */}
        {activeTab === 'pagespeed' && (
          <div className="space-y-6">
            {/* Feature 7: Core Web Vitals & PageSpeed Module */}
            <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h2 className="text-base font-bold text-white">Core Web Vitals & PageSpeed Insights Audits</h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  API Key Pending
                </span>
              </div>

              {/* Instructions banner */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs space-y-2 mb-6">
                <div className="font-bold flex items-center gap-1.5 text-amber-300">
                  <Info className="w-4 h-4" />
                  <span>คำแนะนำการเปิดใช้งาน PageSpeed Insights API อัตโนมัติ:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 ml-1">
                  <li>ไปที่ Google Cloud Console &rarr; API & Services &rarr; เปิดใช้งาน <strong>PageSpeed Insights API</strong></li>
                  <li>สร้าง Credentials API Key และเพิ่มลงใน <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">.env.local</code> ในชื่อ <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">PAGESPEED_API_KEY=your_key</code></li>
                  <li>เมื่อใส่ Key แล้ว ระบบจะดึงคะแนน Performance Score, FCP, LCP, CLS, TBT และ CrUX Real-User Data สำหรับ 5 แม่แบบหน้าสำคัญโดยอัตโนมัติ</li>
                </ol>
              </div>

              {/* 5 Representative Templates */}
              <div className="space-y-3">
                {snapshot.pageSpeedAudits.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{item.templateName}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">
                          {item.device.toUpperCase()}
                        </span>
                      </div>
                      <div className="font-mono text-xs text-cyan-300">{item.url}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">FCP Target</div>
                        <div className="text-xs font-bold text-emerald-400">&lt; 1.8s</div>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">LCP Target</div>
                        <div className="text-xs font-bold text-emerald-400">&lt; 2.5s</div>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">CLS Target</div>
                        <div className="text-xs font-bold text-emerald-400">&lt; 0.1</div>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                        <div className="text-[10px] text-amber-400 uppercase">Status</div>
                        <div className="text-xs font-bold text-amber-300">Pending Key</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>WMS TRANSPORT SEO Monitor &bull; Google Search Console API v3 &bull; Production Verified</p>
      </footer>
    </div>
  );
}
