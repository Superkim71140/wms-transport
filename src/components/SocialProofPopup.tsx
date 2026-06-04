"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const mockNotifications = [
  "🚚 เพิ่งจัดส่งมอเตอร์ไซค์สำเร็จ: กทม. -> ภูเก็ต (เมื่อ 15 นาทีที่แล้ว)",
  "📦 คิวรถกระบะตู้ทึบ ถูกจองที่สมุทรสาคร (เมื่อ 2 นาทีที่แล้ว)",
  "🏠 ย้ายบ้านครบชุดสำเร็จ: ชลบุรี -> เชียงใหม่ (เมื่อ 1 ชั่วโมงที่แล้ว)",
  "✅ ประเมินราคาขนส่งด่วนสำเร็จ: ลูกค้าจากปทุมธานี (เมื่อ 5 นาทีที่แล้ว)",
  "🚚 คิวรถรับจ้าง ถูกจองเหมาคันที่ กทม. ฝั่งธน (เมื่อ 10 นาทีที่แล้ว)"
];

export default function SocialProofPopup() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    // Initial delay before first popup
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      // If not visible, wait and then show next message
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockNotifications.length);
        setIsVisible(true);
      }, Math.random() * 7000 + 8000); // 8-15s delay between popups
      return () => clearTimeout(timer);
    } else {
      // If visible, wait and then hide
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 6000); // show for 6 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none w-full max-w-[320px] sm:max-w-[360px]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="bg-[#040b15]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-4 flex items-start gap-4"
          >
            <div className="relative mt-1 shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
              </div>
              {/* Pulsing green dot indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#06C755] rounded-full border-2 border-[#040b15]">
                <div className="absolute inset-0 bg-[#06C755] rounded-full animate-ping opacity-75" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                  Live Update
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-300 leading-snug">
                {mockNotifications[currentIndex]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
