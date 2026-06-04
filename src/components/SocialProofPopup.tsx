"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

const liveUpdates = [
  { text: "เพิ่งส่งมอบรถมอเตอร์ไซค์สำเร็จ: กรุงเทพฯ → ภูเก็ต", time: "เมื่อ 15 นาทีที่แล้ว" },
  { text: "รถรับจ้างย้ายหอเข้ารับงานแล้ว: รังสิต → ลาดพร้าว", time: "เมื่อ 8 นาทีที่แล้ว" },
  { text: "จัดส่งสินค้าทั่วไทยสำเร็จ: สมุทรสาคร → เชียงใหม่", time: "เมื่อ 23 นาทีที่แล้ว" },
  { text: "ขนย้ายคอนโดเรียบร้อยแล้ว: พระราม 2 → บางนา", time: "เมื่อ 5 นาทีที่แล้ว" },
  { text: "รับงานขนส่งด่วนแล้ว: หาดใหญ่ → กรุงเทพฯ", time: "เมื่อ 12 นาทีที่แล้ว" }
];

const INITIAL_DELAY = 4500;
const AUTO_HIDE_DELAY = 7000;
const RE_SHOW_INTERVAL = 45000;
const SNOOZE_DURATION = 180000; // 3 minutes

export default function SocialProofPopup() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const checkSnooze = () => {
      if (typeof window !== "undefined") {
        const dismissedAt = localStorage.getItem("wms-live-update-dismissed-at");
        if (dismissedAt) {
          const timePassed = Date.now() - parseInt(dismissedAt, 10);
          if (timePassed < SNOOZE_DURATION) {
            return true;
          }
        }
      }
      return false;
    };

    let initialTimer: NodeJS.Timeout;
    if (!checkSnooze()) {
      initialTimer = setTimeout(() => {
        setIsVisible(true);
      }, INITIAL_DELAY);
    }

    return () => {
      if (initialTimer) clearTimeout(initialTimer);
    };
  }, []);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    let cycleTimer: NodeJS.Timeout;

    if (isVisible) {
      // Auto hide after 7 seconds
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, AUTO_HIDE_DELAY);
    } else if (isMounted) {
      // Check snooze before scheduling the next cycle
      const checkSnooze = () => {
        if (typeof window !== "undefined") {
          const dismissedAt = localStorage.getItem("wms-live-update-dismissed-at");
          if (dismissedAt) {
            const timePassed = Date.now() - parseInt(dismissedAt, 10);
            if (timePassed < SNOOZE_DURATION) {
              return true;
            }
          }
        }
        return false;
      };

      if (!checkSnooze()) {
        cycleTimer = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % liveUpdates.length);
          setIsVisible(true);
        }, RE_SHOW_INTERVAL);
      }
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
      if (cycleTimer) clearTimeout(cycleTimer);
    };
  }, [isVisible, isMounted]);

  const handleManualDismiss = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("wms-live-update-dismissed-at", Date.now().toString());
    }
  };

  if (!isMounted) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[90] w-[calc(100vw-24px)] max-w-[300px] pointer-events-none sm:top-24 sm:right-4 sm:left-auto sm:translate-x-0">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            dragElastic={0.4}
            onDragEnd={(event, info) => {
              // Dismiss if swiped more than 80px horizontally
              if (Math.abs(info.offset.x) > 80) {
                handleManualDismiss();
              }
            }}
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="pointer-events-auto relative cursor-grab active:cursor-grabbing w-full rounded-xl border border-white/10 bg-slate-950/85 p-3 shadow-2xl backdrop-blur-xl flex items-start gap-2.5 pr-8"
          >
            {/* Status dot / Live icon */}
            <div className="relative mt-0.5 shrink-0">
              <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              </div>
              {/* Pulsing green dot indicator */}
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#06C755] rounded-full border border-slate-950">
                <div className="absolute inset-0 bg-[#06C755] rounded-full animate-ping opacity-75" />
              </div>
            </div>

            {/* Middle Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] font-black text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-full border border-blue-500/20 uppercase tracking-wider">
                  Live Update
                </span>
                <span className="text-[9px] text-slate-500 font-medium">
                  • กำลังให้บริการทั่วไทย
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-200 leading-normal">
                {liveUpdates[currentIndex].text}
              </p>
              <span className="text-[9px] text-slate-400 mt-1 block font-bold">
                {liveUpdates[currentIndex].time}
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleManualDismiss}
              aria-label="ปิดการแจ้งเตือน"
              className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors duration-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
