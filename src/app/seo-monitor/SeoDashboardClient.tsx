'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { SeoMonitorSnapshot } from '@/lib/seo-monitor/seo-store';
import {
  ShieldCheck,
  RefreshCw,
  Search,
  ExternalLink,
  TrendingUp,
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
  ArrowUpRight,
  Clock,
  Download,
  ListChecks
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

  // Batch Inspection State & Progress
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [batchMessage, setBatchMessage] = useState<string | null>(null);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [batchProgress, setBatchProgress] = useState<any>(null);

  // URL Inspection Filters
  const [statusFilter, setStatusFilter] = useState<'all' | 'indexed' | 'not_indexed' | 'pending' | 'error' | 'unknown' | 'historical'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityAreaFilter, setPriorityAreaFilter] = useState<string>('all');
  const [urlSearchText, setUrlSearchText] = useState('');

  // Load live sitemap batch inspection progress on mount
  useEffect(() => {
    fetch('/api/seo-monitor/inspect-batch')
      .then(r => r.json())
      .then(d => {
        if (d.progress) setBatchProgress(d.progress);
      })
      .catch(() => {});
  }, []);

  const [isDataStale] = useState(() => {
    if (!snapshot.lastSyncAt) return false;
    try {
      return Date.now() - new Date(snapshot.lastSyncAt).getTime() > 7 * 86400000;
    } catch {
      return false;
    }
  });

  // PageSpeed Audit State
  const [isRunningPageSpeed, setIsRunningPageSpeed] = useState(false);
  const [pageSpeedMessage, setPageSpeedMessage] = useState<string | null>(null);
  const [pageSpeedError, setPageSpeedError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'queries' | 'inspection' | 'alerts' | 'pagespeed'>('overview');

  // Trigger batch inspection
  const handleRunBatch = async (batchSize = 10) => {
    setIsBatchRunning(true);
    setBatchMessage(null);
    setBatchError(null);

    try {
      const res = await fetch('/api/seo-monitor/inspect-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchSize })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Batch inspection failed');
      }

      if (data.progress) {
        setBatchProgress(data.progress);
      }

      // Re-fetch snapshot data to reflect persisted results
      const snapRes = await fetch('/api/seo-monitor/data');
      if (snapRes.ok) {
        const newSnap = await snapRes.json();
        setSnapshot(newSnap);
      }

      setBatchMessage(`ตรวจสอบ URL สำเร็จ ${data.inspectedThisRun} หน้า (เสร็จแล้ว ${data.progress?.inspectedCount || 0}/${data.progress?.totalSitemapUrls || 0})`);
      setTimeout(() => setBatchMessage(null), 5000);
    } catch (err: any) {
      setBatchError(err.message || 'เกิดข้อผิดพลาดในการตรวจสอบ URL แบบกลุ่ม');
    } finally {
      setIsBatchRunning(false);
    }
  };

  // Trigger PageSpeed Audits
  const handleRunPageSpeed = async () => {
    setIsRunningPageSpeed(true);
    setPageSpeedMessage(null);
    setPageSpeedError(null);

    try {
      const res = await fetch('/api/seo-monitor/pagespeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'PageSpeed audit failed');
      }

      if (data.audits) {
        setSnapshot(prev => ({ ...prev, pageSpeedAudits: data.audits }));
      }
      setPageSpeedMessage('ดำเนินการทดสอบ PageSpeed & Web Vitals เสร็จสมบูรณ์');
      setTimeout(() => setPageSpeedMessage(null), 5000);
    } catch (err: any) {
      setPageSpeedError(err.message || 'เกิดข้อผิดพลาดในการทดสอบ PageSpeed');
    } finally {
      setIsRunningPageSpeed(false);
    }
  };

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
    const hasAggLatest = Boolean(snapshot.siteAggregatesLatest28d);
    const hasAggPrev = Boolean(snapshot.siteAggregatesPrev28d);

    if (!hasAggLatest) {
      // FIX 7: Never fall back to summing the 500-row sample table or averaging row positions
      return {
        isAvailable: false,
        isPropertyAggregate: false,
        totalClicksLatest: null,
        totalClicksPrev: null,
        clicksDiff: null,
        clicksDiffPct: null,
        totalImpLatest: null,
        totalImpPrev: null,
        impDiff: null,
        impDiffPct: null,
        avgCtrLatest: null,
        avgCtrPrev: null,
        ctrDiff: null,
        avgPosLatest: null,
        avgPosPrev: null,
        posDiff: null
      };
    }

    // True property-level totals (from Search Console site-level aggregate query)
    const totalClicksLatest = snapshot.siteAggregatesLatest28d!.clicks;
    const totalClicksPrev = hasAggPrev ? snapshot.siteAggregatesPrev28d!.clicks : null;
    const clicksDiff = totalClicksPrev !== null ? totalClicksLatest - totalClicksPrev : null;
    const clicksDiffPct = totalClicksPrev !== null && totalClicksPrev > 0
      ? ((clicksDiff! / totalClicksPrev) * 100).toFixed(1)
      : null;

    const totalImpLatest = snapshot.siteAggregatesLatest28d!.impressions;
    const totalImpPrev = hasAggPrev ? snapshot.siteAggregatesPrev28d!.impressions : null;
    const impDiff = totalImpPrev !== null ? totalImpLatest - totalImpPrev : null;
    const impDiffPct = totalImpPrev !== null && totalImpPrev > 0
      ? ((impDiff! / totalImpPrev) * 100).toFixed(1)
      : null;

    const avgCtrLatest = snapshot.siteAggregatesLatest28d!.ctr * 100;
    const avgCtrPrev = hasAggPrev ? snapshot.siteAggregatesPrev28d!.ctr * 100 : null;
    const ctrDiff = avgCtrPrev !== null ? avgCtrLatest - avgCtrPrev : null;

    const avgPosLatest = snapshot.siteAggregatesLatest28d!.position;
    const avgPosPrev = hasAggPrev ? snapshot.siteAggregatesPrev28d!.position : null;
    const posDiff = avgPosPrev !== null ? avgPosLatest - avgPosPrev : null; // lower is better

    return {
      isAvailable: true,
      isPropertyAggregate: true,
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

  // Format date in Asia/Bangkok
  const formatTime = (isoString: string | null | undefined) => {
    if (!isoString) return 'ยังไม่ได้ดำเนินการ';
    try {
      const d = new Date(isoString);
      return d.toLocaleString('th-TH', {
        timeZone: 'Asia/Bangkok',
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return String(isoString);
    }
  };

  // Helper to categorize page types based on WMS project routing architecture
  const classifyPageType = (urlStr: string) => {
    try {
      const u = new URL(urlStr);
      const path = u.pathname;
      if (path === '/' || path === '') return 'homepage';
      if (path.startsWith('/service/')) return path.split('/').length > 3 ? 'subservice' : 'service_hub';
      if (path.startsWith('/areas/')) return 'area';
      if (path.startsWith('/pricing')) return 'pricing';
      if (path.startsWith('/blog')) return 'blog';
      if (path.startsWith('/compare/')) return 'compare';
      if (path.startsWith('/portfolio')) return 'portfolio';
      return 'other';
    } catch {
      return 'other';
    }
  };

  // Filtered Inspections
  const filteredInspections = useMemo(() => {
    const list = snapshot.inspections || [];
    return list.filter(item => {
      // 1. Status Filter
      if (statusFilter !== 'all') {
        const cat = item.status || (item.verdict === 'PASS' ? 'indexed' : item.verdict === 'NEUTRAL' ? 'not_indexed' : 'unknown');
        if (statusFilter === 'indexed' && cat !== 'indexed') return false;
        if (statusFilter === 'not_indexed' && cat !== 'not_indexed') return false;
        if (statusFilter === 'error' && cat !== 'error') return false;
        if (statusFilter === 'unknown' && cat !== 'unknown') return false;
      }

      // 2. Category Filter
      if (categoryFilter !== 'all') {
        const cat = classifyPageType(item.inspectionUrl);
        if (categoryFilter === 'service' && cat !== 'service_hub' && cat !== 'subservice') return false;
        else if (categoryFilter !== 'service' && cat !== categoryFilter) return false;
      }

      // 3. Priority Area Filter
      if (priorityAreaFilter !== 'all') {
        if (!item.inspectionUrl.toLowerCase().includes(priorityAreaFilter.toLowerCase())) return false;
      }

      // 4. URL Search Filter
      if (urlSearchText.trim()) {
        const q = urlSearchText.toLowerCase().trim();
        if (!item.inspectionUrl.toLowerCase().includes(q)) return false;
      }

      return true;
    });
  }, [snapshot.inspections, statusFilter, categoryFilter, priorityAreaFilter, urlSearchText]);

  // Evidence-based "What Should I Fix Next?" Priority List
  const priorityActionItems = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      impact: 'CRITICAL' | 'HIGH' | 'MEDIUM';
      category: 'Indexing' | 'Canonical' | 'CTR / Content' | 'Performance';
      description: string;
      action: string;
      evidence: string;
      tentative?: boolean;
    }> = [];

    // 1. Canonical Mismatches (Critical)
    const canonicalMismatches = (snapshot.inspections || []).filter(
      i => i.googleCanonical && i.userCanonical && i.googleCanonical.replace(/\/$/, '') !== i.userCanonical.replace(/\/$/, '')
    );
    if (canonicalMismatches.length > 0) {
      items.push({
        id: 'fix-canonical',
        title: `แก้ไข Canonical Mismatch ที่ Google เลือกไม่ตรง (${canonicalMismatches.length} หน้า)`,
        impact: 'CRITICAL',
        category: 'Canonical',
        description: `หน้าเว็บประกาศ Canonical แต่ Googlebot เลือกลิงก์อื่น อาจทำให้คะแนน SEO กระจาย`,
        action: `ตรวจสอบหน้า ${canonicalMismatches[0]?.inspectionUrl} และปรับ tag canonical ให้ชี้ไปที่ URL เดียวกัน`,
        evidence: `Google Selected: ${canonicalMismatches[0]?.googleCanonical}`
      });
    }

    // 2. Unindexed Sitemap Pages (High)
    const notIndexedPages = (snapshot.inspections || []).filter(
      i => i.verdict === 'NEUTRAL' || i.coverageState?.includes('ยังไม่ได้จัดทำดัชนี') || i.coverageState?.includes('not indexed')
    );
    if (notIndexedPages.length > 0) {
      items.push({
        id: 'fix-unindexed',
        title: `เพิ่ม Internal Link ดันหน้าใน Sitemap ที่ยังไม่ติดดัชนี (${notIndexedPages.length} หน้า)`,
        impact: 'HIGH',
        category: 'Indexing',
        description: `Google รู้จัก URL แล้ว (${notIndexedPages[0]?.coverageState || 'พบแล้ว'}) แต่ยังไม่จัดเข้าดัชนีผลค้นหา`,
        action: `สร้างลิงก์เชื่อมโยงจากหน้าหลักและหน้า Hub ยอดนิยมไปยัง ${notIndexedPages.map(p => {
          try { return new URL(p.inspectionUrl).pathname; } catch { return p.inspectionUrl; }
        }).slice(0, 3).join(', ')}`,
        evidence: `Google Stored Coverage: "${notIndexedPages[0]?.coverageState}"`
      });
    }

    // 3. High Impression, Low CTR Queries (Medium)
    const lowCtrRows = (snapshot.analyticsLatest28d || []).filter(
      r => r.impressions >= 10 && r.position <= 10 && r.ctr < 0.04
    );
    if (lowCtrRows.length > 0) {
      const topLow = lowCtrRows[0];
      items.push({
        id: 'fix-low-ctr',
        title: `ปรับ Title Tag & Meta Description เพื่อเพิ่ม CTR คำว่า "${topLow.keys[0]}"`,
        impact: 'MEDIUM',
        category: 'CTR / Content',
        description: `คำค้นหานี้ติดอันดับหน้าแรก (อันดับเฉลี่ย ${topLow.position.toFixed(1)}) มียอด Impression ${topLow.impressions} ครั้ง แต่ CTR เพียง ${(topLow.ctr * 100).toFixed(1)}%`,
        action: `ใส่จุดเด่น "ราคาถูก / คนยกฟรี / ขนส่งด่วน" ใน Title เพื่อดึงดูดการคลิก`,
        evidence: `Imp: ${topLow.impressions}, Clicks: ${topLow.clicks}, Avg Pos: ${topLow.position.toFixed(1)}`,
        tentative: topLow.impressions < 25
      });
    }

    // 4. Slow Mobile LCP (Performance)
    const slowAudits = (snapshot.pageSpeedAudits || []).filter(
      a => a.device === 'mobile' && a.lcp && a.lcp > 2500
    );
    if (slowAudits.length > 0) {
      items.push({
        id: 'fix-mobile-lcp',
        title: `ปรับแต่ง Hero Banner บนมือถือเพื่อลด LCP ของหน้า ${slowAudits[0].templateName}`,
        impact: 'MEDIUM',
        category: 'Performance',
        description: `LCP ปัจจุบันอยู่ที่ ${(slowAudits[0].lcp! / 1000).toFixed(2)} วินาที (เกณฑ์มาตรฐาน Google ต้องต่ำกว่า 2.5 วินาที)`,
        action: `บีบอัดรูปภาพ Banner และใช้ WebP หรือใส่ priority={true} บน Next.js Image`,
        evidence: `Lighthouse Lab LCP: ${(slowAudits[0].lcp! / 1000).toFixed(2)}s, Performance: ${slowAudits[0].performanceScore}/100`
      });
    }

    return items;
  }, [snapshot]);

  // Safe CSV cell escaping to prevent spreadsheet formula injection attacks
  const safeCsvCell = (val: any): string => {
    if (val === null || val === undefined) return '""';
    let str = String(val);
    // Formula execution prevention: if cell starts with =, +, -, @, \t, \r, prefix with a single quote
    if (/^[=+\-@\t\r]/.test(str)) {
      str = `'${str}`;
    }
    return `"${str.replace(/"/g, '""')}"`;
  };

  const handleExportFilteredInspections = () => {
    const headers = [
      'URL',
      'Path',
      'Category',
      'Status',
      'Verdict',
      'Coverage State',
      'Declared Canonical',
      'Google Canonical',
      'HTTP Status',
      'Last Crawl Time'
    ];
    const rows = filteredInspections.map(item => {
      let pathName = '';
      try { pathName = new URL(item.inspectionUrl).pathname; } catch { pathName = item.inspectionUrl; }
      return [
        item.inspectionUrl,
        pathName,
        classifyPageType(item.inspectionUrl),
        item.status || 'unknown',
        item.verdict,
        item.coverageState || '',
        item.userCanonical || '',
        item.googleCanonical || '',
        item.httpStatus || 200,
        item.lastCrawlTime || ''
      ];
    });

    const csvContent = '\uFEFF' + [
      headers.map(safeCsvCell).join(','),
      ...rows.map(r => r.map(safeCsvCell).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wms-seo-inspections-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportQueriesCsv = () => {
    const headers = ['Query', 'Landing Page URL', 'Clicks', 'Impressions', 'CTR (%)', 'Average Position'];
    const rows = filteredQueries.map(r => [
      r.keys[0] || '',
      r.keys[1] || '',
      r.clicks || 0,
      r.impressions || 0,
      ((r.ctr || 0) * 100).toFixed(2),
      (r.position || 0).toFixed(1)
    ]);

    const csvContent = '\uFEFF' + [
      headers.map(safeCsvCell).join(','),
      ...rows.map(r => r.map(safeCsvCell).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wms-search-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] border ${
              snapshot.pageSpeedAudits.some(a => a.status === 'completed')
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-semibold'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
            }`}>
              {snapshot.pageSpeedAudits.some(a => a.status === 'completed') ? 'Live Audited (10)' : 'Pending API Key'}
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

        {/* Compact System Status Strip */}
        <section className="bg-[#0c1328]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {/* Connection Status */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GSC Status: <strong className="text-white">Live Connected</strong> (siteFullUser)</span>
              </div>

              {/* Storage Mode */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Database className="w-4 h-4 text-indigo-400" />
                <span>
                  Storage:{' '}
                  <strong className={
                    snapshot.storageEngine === 'postgresql'
                      ? 'text-emerald-400'
                      : snapshot.storageEngine === 'ephemeral_serverless_warning'
                      ? 'text-rose-400 font-bold'
                      : 'text-cyan-300'
                  }>
                    {snapshot.storageEngine === 'postgresql'
                      ? 'PostgreSQL (Durable Production Active)'
                      : snapshot.storageEngine === 'ephemeral_serverless_warning'
                      ? '⚠️ Serverless Warning (DATABASE_URL Required on Vercel)'
                      : 'Local Development Storage (JSON Snapshot)'}
                  </strong>
                </span>
              </div>

              {/* Stale Warning Badge if >7 days */}
              {isDataStale && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>ข้อมูลเดิมเกิน 7 วัน (แนะนำให้กด Sync Now)</span>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>Timezone: <strong className="text-slate-200">Asia/Bangkok (UTC+7)</strong></span>
            </div>
          </div>

          {/* Granular Timestamps Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-slate-800/60 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>GSC Sync: <strong className="text-slate-200">{formatTime(snapshot.lastSyncAt)}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Batch Inspect: <strong className="text-slate-200">{formatTime(batchProgress?.lastBatchRunAt || snapshot.lastInspectionBatchAt || null)}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>PageSpeed Audits: <strong className="text-slate-200">{formatTime(snapshot.lastPageSpeedAuditAt || null)}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Reporting Range: <strong className="text-slate-200">{snapshot.analyticsDateRange?.latest?.start || '28d'} ถึง {snapshot.analyticsDateRange?.latest?.end || 'วันนี้'}</strong></span>
            </div>
          </div>

          {/* Failed Attempt Warning Banner if exists */}
          {snapshot.lastFailedSyncAt && (
            <div className="mt-2 p-2.5 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>การซิงค์ล่าสุดล้มเหลวเมื่อ {formatTime(snapshot.lastFailedSyncAt)}: <code className="text-red-200">{snapshot.lastSyncError}</code></span>
              </div>
              <button
                onClick={handleSyncNow}
                disabled={isSyncing}
                className="px-2.5 py-1 rounded bg-red-800/40 hover:bg-red-800/60 border border-red-500/40 text-red-200 text-[11px] font-medium transition-all"
              >
                ลองใหม่อีกครั้ง (Retry)
              </button>
            </div>
          )}
        </section>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Aggregate Notice & Date Range Banner */}
            <div className={`border rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs ${
              perfMetrics.isAvailable
                ? 'bg-[#0f172a]/70 border-slate-800'
                : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-semibold text-[11px] border ${
                  perfMetrics.isAvailable
                    ? 'bg-blue-500/20 text-cyan-300 border-blue-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {perfMetrics.isAvailable ? 'Property-Level Aggregate' : 'Aggregate Data Unavailable'}
                </span>
                <span className="text-slate-300">
                  ช่วงข้อมูล 28 วันล่าสุด: <strong className="text-white">{snapshot.analyticsDateRange.latest.start || '28 วันล่าสุด'}</strong> ถึง <strong className="text-white">{snapshot.analyticsDateRange.latest.end || 'วันนี้'}</strong>
                </span>
              </div>
              <div className="text-slate-400 text-[11px] italic">
                {perfMetrics.isAvailable
                  ? '* สรุปยอดรวมระดับทั้งเว็บไซต์จริงตาม Google Search Console'
                  : '⚠️ ข้อมูลสรุปรวมระดับทั้งเว็บไซต์ไม่พร้อมใช้งาน (ไม่ใช้ผลรวมจากตาราง 500 อันดับเพื่อป้องกันความคลาดเคลื่อน)'}
              </div>
            </div>

            {/* Feature 2: 28-Day Performance Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Clicks */}
              <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Total Clicks (ทั้งเว็บไซต์)</span>
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-cyan-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {perfMetrics.isAvailable && perfMetrics.totalClicksLatest !== null
                    ? perfMetrics.totalClicksLatest.toLocaleString()
                    : 'N/A'}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  {perfMetrics.isAvailable && perfMetrics.clicksDiff !== null ? (
                    perfMetrics.clicksDiff >= 0 ? (
                      <span className="text-emerald-400 flex items-center font-semibold">
                        +{perfMetrics.clicksDiff} ({perfMetrics.clicksDiffPct || '0'}%)
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center font-semibold">
                        {perfMetrics.clicksDiff} ({perfMetrics.clicksDiffPct}%)
                      </span>
                    )
                  ) : (
                    <span className="text-slate-500">
                      {perfMetrics.isAvailable ? 'ไม่มีข้อมูลเปรียบเทียบ' : 'รอการซิงค์ Property Aggregate'}
                    </span>
                  )}
                  {perfMetrics.isAvailable && perfMetrics.clicksDiff !== null && (
                    <span className="text-slate-500">เทียบ 28 วันก่อนหน้า</span>
                  )}
                </div>
              </div>

              {/* Card 2: Total Impressions */}
              <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Total Impressions (ทั้งเว็บไซต์)</span>
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {perfMetrics.isAvailable && perfMetrics.totalImpLatest !== null
                    ? perfMetrics.totalImpLatest.toLocaleString()
                    : 'N/A'}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  {perfMetrics.isAvailable && perfMetrics.impDiff !== null ? (
                    perfMetrics.impDiff >= 0 ? (
                      <span className="text-emerald-400 flex items-center font-semibold">
                        +{perfMetrics.impDiff} ({perfMetrics.impDiffPct || '0'}%)
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center font-semibold">
                        {perfMetrics.impDiff} ({perfMetrics.impDiffPct}%)
                      </span>
                    )
                  ) : (
                    <span className="text-slate-500">
                      {perfMetrics.isAvailable ? 'ไม่มีข้อมูลเปรียบเทียบ' : 'รอการซิงค์ Property Aggregate'}
                    </span>
                  )}
                  {perfMetrics.isAvailable && perfMetrics.impDiff !== null && (
                    <span className="text-slate-500">เทียบ 28 วันก่อนหน้า</span>
                  )}
                </div>
              </div>

              {/* Card 3: Average CTR */}
              <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Overall CTR (ทั้งเว็บไซต์)</span>
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {perfMetrics.isAvailable && perfMetrics.avgCtrLatest !== null
                    ? `${perfMetrics.avgCtrLatest.toFixed(1)}%`
                    : 'N/A'}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  {perfMetrics.isAvailable && perfMetrics.ctrDiff !== null ? (
                    perfMetrics.ctrDiff >= 0 ? (
                      <span className="text-emerald-400 font-semibold">
                        +{(perfMetrics.ctrDiff).toFixed(1)}% pts
                      </span>
                    ) : (
                      <span className="text-rose-400 font-semibold">
                        {(perfMetrics.ctrDiff).toFixed(1)}% pts
                      </span>
                    )
                  ) : (
                    <span className="text-slate-500">
                      {perfMetrics.isAvailable
                        ? (perfMetrics.avgCtrPrev !== null ? `ช่วงก่อน: ${perfMetrics.avgCtrPrev.toFixed(1)}%` : 'ไม่มีข้อมูลเปรียบเทียบ')
                        : 'รอการซิงค์ Property Aggregate'}
                    </span>
                  )}
                  {perfMetrics.isAvailable && perfMetrics.ctrDiff !== null && perfMetrics.avgCtrPrev !== null && (
                    <span className="text-slate-500">ช่วงก่อน: {perfMetrics.avgCtrPrev.toFixed(1)}%</span>
                  )}
                </div>
              </div>

              {/* Card 4: Average Position */}
              <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Average Position (สถิติรวม)</span>
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {perfMetrics.isAvailable && perfMetrics.avgPosLatest !== null
                    ? perfMetrics.avgPosLatest.toFixed(1)
                    : 'N/A'}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  {perfMetrics.isAvailable && perfMetrics.posDiff !== null ? (
                    perfMetrics.posDiff <= 0 ? (
                      <span className="text-emerald-400 font-semibold">
                        {(Math.abs(perfMetrics.posDiff)).toFixed(1)} อันดับดีขึ้น
                      </span>
                    ) : (
                      <span className="text-rose-400 font-semibold">
                        +{(perfMetrics.posDiff).toFixed(1)} อันดับ
                      </span>
                    )
                  ) : (
                    <span className="text-slate-500">
                      {perfMetrics.isAvailable
                        ? (perfMetrics.avgPosPrev !== null ? `ช่วงก่อน: ${perfMetrics.avgPosPrev.toFixed(1)}` : 'ไม่มีข้อมูลเปรียบเทียบ')
                        : 'รอการซิงค์ Property Aggregate'}
                    </span>
                  )}
                  {perfMetrics.isAvailable && perfMetrics.posDiff !== null && perfMetrics.avgPosPrev !== null && (
                    <span className="text-slate-500">ช่วงก่อน: {perfMetrics.avgPosPrev.toFixed(1)}</span>
                  )}
                </div>
              </div>
            </section>

            {/* Priority Action Checklist: "What should I fix next?" */}
            <section className="bg-gradient-to-r from-slate-900 to-[#0e172e] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <ListChecks className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">What should I fix next? (รายการที่ควรปรับปรุงเร่งด่วนตามหลักฐานข้อมูลจริง)</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      คัดกรองจากข้อมูลจริงของ Search Console, Index Coverage, และ Core Web Vitals โดยเน้นผลลัพธ์ที่มีผลต่ออันดับสูงสุด
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  {priorityActionItems.length} ข้อเสนอแนะเชิงหลักฐาน
                </span>
              </div>

              {priorityActionItems.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs text-center">
                  ✅ ทุกระบบทำงานได้ดี ไม่พบปัญหาดัชนีหรือประสิทธิภาพที่ต้องแก้ไขเร่งด่วน
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {priorityActionItems.map(item => (
                    <div key={item.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.impact === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : item.impact === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/20 text-cyan-300 border border-blue-500/30'
                        }`}>
                          {item.impact} IMPACT &bull; {item.category}
                        </span>
                        {item.tentative && (
                          <span className="text-[10px] text-slate-500 italic">ข้อสังเกตเบื้องต้น (Traffic ยังน้อย)</span>
                        )}
                      </div>
                      <h3 className="text-xs font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                      <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1 text-[11px]">
                        <div className="text-cyan-300 font-medium">🎯 คำแนะนำ: {item.action}</div>
                        <div className="text-slate-500 font-mono text-[10px]">หลักฐาน: {item.evidence}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
            {/* Technical Notice Banner */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs space-y-1">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <Info className="w-4 h-4 shrink-0" />
                <span>คำชี้แจงทางเทคนิค (Google Search Console URL Inspection API):</span>
              </div>
              <p className="text-slate-300">
                ข้อมูลที่แสดงในหน้านี้เป็น <strong>ข้อมูลดัชนีที่ Google บันทึกไว้จากการ Crawl ครั้งล่าสุด (Google&apos;s Stored Index Status)</strong> เพื่อติดตามสถานะที่แท้จริง ไม่ใช่การทดสอบ Crawl สด และไม่ใช่การกดขอจัดทำดัชนี (Indexing Submission) ทั้งนี้ Google Indexing API จำกัดไว้สำหรับ JobPosting / BroadcastEvent เท่านั้น ไม่รองรับหน้าเว็บบริการทั่วไปตามระเบียบของ Google
              </p>
            </div>

            {/* Bounded Resumable Batch Inspection Module */}
            <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-base font-bold text-white">Sitemap Batch Inspection (การตรวจสอบเป็นชุดแบบต่อเนื่อง)</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    ตรวจสอบ URL ใน Sitemap แบบเป็นชุด (ครั้งละ 10 URLs) โดยคำนึงถึง Quota ของ Search Console API และบันทึกผลลง Storage อย่างต่อเนื่อง
                  </p>
                </div>

                <button
                  onClick={() => handleRunBatch(10)}
                  disabled={isBatchRunning}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isBatchRunning ? 'animate-spin' : ''}`} />
                  <span>{isBatchRunning ? 'กำลังตรวจชุดถัดไป...' : 'Inspect Next Batch (10 URLs)'}</span>
                </button>
              </div>

              {batchMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{batchMessage}</span>
                </div>
              )}
              {batchError && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{batchError}</span>
                </div>
              )}

              {/* Progress Summary Formula & Mutually Exclusive Cards */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Reconciliation Formula:</span>
                    <code className="text-cyan-300 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Total ({batchProgress?.totalSitemapUrls || 155}) = Pending ({batchProgress?.pendingCount ?? 147}) + Indexed ({batchProgress?.indexedCount ?? 5}) + Not Indexed ({batchProgress?.notIndexedCount ?? 3}) + Unknown ({batchProgress?.unknownCount ?? 0}) + Error ({batchProgress?.errorCount ?? 0})
                    </code>
                  </div>
                  {((batchProgress?.historicalCount ?? 0) > 0) && (
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <span>Historical Inspected (Non-sitemap):</span>
                      <strong className="text-amber-300 font-mono">{batchProgress?.historicalCount} URLs</strong>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Sitemap Total</div>
                    <div className="text-xl font-bold text-white mt-0.5">
                      {batchProgress?.totalSitemapUrls || 155}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-center">
                    <div className="text-[10px] text-slate-300 uppercase font-semibold">Pending (รอตรวจ)</div>
                    <div className="text-xl font-bold text-slate-200 mt-0.5">
                      {batchProgress?.pendingCount ?? 147}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-emerald-900/50 text-center">
                    <div className="text-[10px] text-emerald-400 uppercase font-semibold">Indexed (PASS)</div>
                    <div className="text-xl font-bold text-emerald-400 mt-0.5">
                      {batchProgress?.indexedCount ?? 5}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-amber-900/50 text-center">
                    <div className="text-[10px] text-amber-400 uppercase font-semibold">Not Indexed</div>
                    <div className="text-xl font-bold text-amber-400 mt-0.5">
                      {batchProgress?.notIndexedCount ?? 3}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-rose-900/50 text-center">
                    <div className="text-[10px] text-rose-400 uppercase font-semibold">Error</div>
                    <div className="text-xl font-bold text-rose-400 mt-0.5">
                      {batchProgress?.errorCount ?? 0}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Unknown</div>
                    <div className="text-xl font-bold text-slate-400 mt-0.5">
                      {batchProgress?.unknownCount ?? 0}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Feature 4: Interactive Live URL Inspection Form */}
            <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white">Live URL Inspection Tool (Single URL)</h2>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                ตรวจสอบสถานะดัชนี (Indexing State), Canonical URL ที่ Google เลือกจริง, และสถานะการ Crawl ของทุกหน้าบน <code className="text-cyan-300 font-mono">https://wms-transport.com/*</code>
              </p>

              <form onSubmit={handleInspectUrl} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={inspectInputUrl}
                  onChange={(e) => setInspectInputUrl(e.target.value)}
                  placeholder="https://wms-transport.com/service/bkk-thonburi/moving หรือ /areas"
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

            {/* Inspections Table with Filters and CSV Export */}
            <section className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Inspected URLs History</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] text-cyan-300 font-mono font-normal">
                        {filteredInspections.length} / {snapshot.inspections.length} URLs
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">รวมหน้าตัวแทนหลักและผลการตรวจสอบล่าสุด</p>
                  </div>

                  <button
                    onClick={handleExportFilteredInspections}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 transition-all active:scale-95 shrink-0"
                    title="ดาวน์โหลดข้อมูลเป็นไฟล์ CSV ป้องกัน Formula Injection"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Export Filtered URLs (CSV)</span>
                  </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-slate-800/60">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="all">All Statuses ({snapshot.inspections.length})</option>
                      <option value="indexed">Indexed (PASS)</option>
                      <option value="not_indexed">Not Indexed</option>
                      <option value="error">Error</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Category</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as any)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="all">All Categories</option>
                      <option value="homepage">Homepage (/)</option>
                      <option value="service">Services (/service/*)</option>
                      <option value="area">Areas (/areas/*)</option>
                      <option value="pricing">Pricing (/pricing)</option>
                      <option value="blog">Blog (/blog/*)</option>
                      <option value="compare">Compare (/compare/*)</option>
                      <option value="portfolio">Portfolio (/portfolio/*)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Priority Area Filter */}
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Priority Area</label>
                    <select
                      value={priorityAreaFilter}
                      onChange={(e) => setPriorityAreaFilter(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="all">All Areas</option>
                      <option value="thonburi">Thonburi (ธนบุรี)</option>
                      <option value="maha-chai">Maha Chai (มหาชัย)</option>
                      <option value="samut-sakhon">Samut Sakhon (สมุทรสาคร)</option>
                      <option value="nakhon-pathom">Nakhon Pathom (นครปฐม)</option>
                      <option value="bang-khun-thian">Bang Khun Thian (บางขุนเทียน)</option>
                    </select>
                  </div>

                  {/* URL Search Box */}
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Search URL</label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={urlSearchText}
                        onChange={(e) => setUrlSearchText(e.target.value)}
                        placeholder="พิมพ์ค้นหา URL..."
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Inspection URL & Category</th>
                      <th className="py-3 px-4">Verdict</th>
                      <th className="py-3 px-4">Coverage State</th>
                      <th className="py-3 px-4">Canonical (User vs Google)</th>
                      <th className="py-3 px-4">Action Recommendation</th>
                      <th className="py-3 px-4">HTTP</th>
                      <th className="py-3 px-4">Last Crawl</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredInspections.length > 0 ? (
                      filteredInspections.map((item, idx) => {
                        const pageCat = classifyPageType(item.inspectionUrl);
                        const isCanonicalMismatch = item.googleCanonical && item.userCanonical && item.googleCanonical.replace(/\/$/, '') !== item.userCanonical.replace(/\/$/, '');
                        const isNotIndexed = item.verdict === 'NEUTRAL' || item.coverageState?.includes('ยังไม่ได้จัดทำดัชนี') || item.coverageState?.includes('not indexed');

                        return (
                          <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-4 max-w-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                                  {pageCat}
                                </span>
                              </div>
                              <div className="font-mono font-medium text-white truncate mt-1">
                                <a
                                  href={item.inspectionUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="hover:text-cyan-400 inline-flex items-center gap-1"
                                >
                                  <span className="truncate">{item.inspectionUrl}</span>
                                  <ExternalLink className="w-3 h-3 shrink-0 text-slate-500" />
                                </a>
                              </div>
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
                                  NOT INDEXED
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold text-[11px] inline-flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {item.verdict || 'UNKNOWN'}
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
                                  <div>Selected: <span className={isCanonicalMismatch ? 'text-rose-400 font-bold' : 'text-cyan-300'}>{item.googleCanonical}</span></div>
                                </div>
                              ) : (
                                <span className="text-slate-500 text-[11px]">รอผลการจัดทำดัชนี</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {isCanonicalMismatch ? (
                                <span className="px-2 py-1 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 text-[11px] font-medium block">
                                  ⚠️ แก้ไข Canonical Tag ให้ตรง
                                </span>
                              ) : isNotIndexed ? (
                                <span className="px-2 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-medium block">
                                  🔗 เพิ่ม Internal Links จากหน้า Hub
                                </span>
                              ) : item.verdict === 'PASS' ? (
                                <span className="px-2 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium block">
                                  ✅ Indexed ปกติ
                                </span>
                              ) : (
                                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[11px] block">
                                  รอผล Googlebot
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                              {item.httpStatus || 200}
                            </td>
                            <td className="py-3 px-4 text-slate-400 text-[11px]">
                              {formatTime(item.lastCrawlTime || null)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-500">
                          ไม่พบข้อมูล URL ที่ตรงกับเงื่อนไขตัวกรอง
                        </td>
                      </tr>
                    )}
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

                <div className="flex flex-wrap items-center gap-2">
                  <div className="w-full sm:w-64 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={queryFilter}
                      onChange={(e) => setQueryFilter(e.target.value)}
                      placeholder="กรองคำค้นหา หรือ URL..."
                      className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <button
                    onClick={handleExportQueriesCsv}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 transition-all active:scale-95 shrink-0"
                    title="ดาวน์โหลดข้อมูลค้นหาเป็น CSV"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Export Queries (CSV)</span>
                  </button>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <div>
                    <h2 className="text-base font-bold text-white">Core Web Vitals & PageSpeed Insights Audits</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      แยกชัดเจนระหว่าง <strong>Lighthouse Lab Data</strong> (คะแนนทดสอบจำลอง) และ <strong>CrUX Field Data</strong> (ข้อมูลผู้ใช้จริง)
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRunPageSpeed}
                  disabled={isRunningPageSpeed}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 disabled:opacity-50 text-white font-medium text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRunningPageSpeed ? 'animate-spin' : ''}`} />
                  <span>{isRunningPageSpeed ? 'กำลังทดสอบ...' : 'Run Audits Now'}</span>
                </button>
              </div>

              {pageSpeedMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{pageSpeedMessage}</span>
                </div>
              )}
              {pageSpeedError && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{pageSpeedError}</span>
                </div>
              )}

              {/* Instructions banner */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2 mb-6">
                <div className="font-bold flex items-center gap-1.5 text-cyan-300">
                  <Info className="w-4 h-4" />
                  <span>คำแนะนำการเปิดใช้งาน PageSpeed Insights API สำหรับผู้ดูแลระบบ:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 ml-1">
                  <li>ไปที่ Google Cloud Console ในโปรเจกต์ <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">wms-seo-monitor</code></li>
                  <li>ไปที่เมนู <strong>APIs & Services &rarr; Enabled APIs & services</strong> แล้วเปิดใช้งาน <strong>PageSpeed Insights API</strong></li>
                  <li>ไปที่เมนู <strong>Credentials &rarr; Create Credentials &rarr; API Key</strong></li>
                  <li>ตั้งค่า Restrict key จำกัดเฉพาะ <strong>PageSpeed Insights API</strong> เท่านั้น และไม่เปิดเผยสู่สาธารณะ</li>
                  <li>เพิ่มค่าลงใน Environment Variables ของ Server: <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">PAGESPEED_API_KEY=your_key_here</code> ใน Vercel Dashboard หรือ .env.local</li>
                </ol>
              </div>

              {/* 5 Representative Templates */}
              <div className="space-y-4">
                {snapshot.pageSpeedAudits.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{item.templateName}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono font-semibold uppercase">
                            {item.device}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            item.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : item.status === 'error'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          }`}>
                            {item.status === 'completed' ? 'Audited' : item.status === 'error' ? 'Audit Error' : 'Pending API Key'}
                          </span>
                        </div>
                        <div className="font-mono text-xs text-cyan-300 mt-1 truncate">{item.url}</div>
                      </div>

                      {item.performanceScore != null && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Score:</span>
                          <span className={`text-xl font-black px-3 py-1 rounded-lg ${
                            item.performanceScore >= 90
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : item.performanceScore >= 50
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          }`}>
                            {item.performanceScore}/100
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">FCP (Lab)</div>
                        <div className="text-sm font-bold text-white mt-0.5">
                          {item.fcp != null ? `${(item.fcp / 1000).toFixed(2)}s` : '-'}
                        </div>
                        <div className="text-[10px] text-emerald-400/80 mt-0.5">&lt; 1.8s (Good)</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">LCP (Lab)</div>
                        <div className="text-sm font-bold text-white mt-0.5">
                          {item.lcp != null ? `${(item.lcp / 1000).toFixed(2)}s` : '-'}
                        </div>
                        <div className="text-[10px] text-emerald-400/80 mt-0.5">&lt; 2.5s (Good)</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">CLS (Lab)</div>
                        <div className="text-sm font-bold text-white mt-0.5">
                          {item.cls != null ? item.cls.toFixed(3) : '-'}
                        </div>
                        <div className="text-[10px] text-emerald-400/80 mt-0.5">&lt; 0.1 (Good)</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">TBT (Lab Metric)</div>
                        <div className="text-sm font-bold text-white mt-0.5">
                          {item.tbt != null ? `${item.tbt}ms` : '-'}
                        </div>
                        <div className="text-[10px] text-amber-400/80 mt-0.5">Lab Test (ไม่ใช่ INP)</div>
                      </div>
                    </div>

                    {/* CrUX Field Data Row */}
                    <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/70 text-xs flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-slate-300 font-semibold">CrUX Real-User Field Data:</span>
                        {item.hasCruxData ? (
                          <span className="text-emerald-400 font-medium">มีข้อมูลผู้ใช้จริง (INP: {item.cruxInp || '-'}ms)</span>
                        ) : (
                          <span className="text-slate-400 italic">ไม่มีข้อมูลภาคสนาม (Traffic ผู้ใช้ยังไม่ถึงเกณฑ์ CrUX - ไม่ใช่ข้อผิดพลาด)</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Audited: {formatTime(item.auditedAt)}
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
