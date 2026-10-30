import React from "react";
import Link from "next/link";
import { ArrowRight, Scale, BookOpen } from "lucide-react";

interface RelatedComparisonsProps {
  currentPath: string;
}

export default function RelatedComparisons({ currentPath }: RelatedComparisonsProps) {
  const articles = [
    {
      title: "เปรียบเทียบกระบะคอก VS กระบะตู้ทึบ",
      href: "/compare/pickup-vs-box-truck",
      desc: "วิเคราะห์ความคุ้มค่า การป้องกันแดดฝน และความปลอดภัยของสิ่งของ",
      category: "เปรียบเทียบประเภทรถ",
    },
    {
      title: "ย้ายของเอง VS จ้างคนช่วยยกของ WMS",
      href: "/compare/moving-alone-vs-helpers",
      desc: "เปรียบเทียบต้นทุน ค่าเสียเวลา และความเสี่ยงต่อสุขภาพร่างกาย",
      category: "เปรียบเทียบคนช่วยยก",
    },
    {
      title: "ขนย้ายเที่ยวเดียวจบ VS วิ่งหลายเที่ยว",
      href: "/compare/one-vehicle-vs-multiple-trips",
      desc: "ประเมินค่าน้ำมัน ค่าทางด่วน และค่าเสียเวลาสะสมจากการวิ่งหลายรอบ",
      category: "เปรียบเทียบรอบวิ่ง",
    },
  ];

  const guides = [
    {
      title: "ตารางคำนวณขนาดตู้และความจุสิ่งของ (CBM)",
      href: "/guides/truck-capacity-cbm",
      desc: "วิธีวัดขนาดของก่อนย้ายบ้านเพื่อเลือกประเภทรถที่พอดีเที่ยวเดียวจบ",
    },
    {
      title: "ข้อแนะนำการขนย้ายสิ่งของช่วงหน้าฝน",
      href: "/guides/moving-in-rain",
      desc: "มาตรฐานตู้ทึบอลูมิเนียมปิดมิดชิด ป้องกันละอองฝนและสิ่งของเปียกชื้น",
    },
    {
      title: "คู่มือขนย้ายคอนโดและหอพักที่ไม่มีลิฟต์",
      href: "/guides/condo-no-elevator",
      desc: "การวางแผนเดินขึ้น-ลงบันได และการประเมินทีมงานช่วยยกของอย่างเหมาะสม",
    },
  ];

  const filteredArticles = articles.filter((a) => a.href !== currentPath);
  const filteredGuides = guides.filter((g) => g.href !== currentPath);

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
          <Scale className="w-3.5 h-3.5" />
          <span>บทความเปรียบเทียบและคู่มือที่เกี่ยวข้อง</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          ข้อมูลประกอบการตัดสินใจก่อนเลือกใช้บริการ
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          สำรวจบทวิเคราะห์เปรียบเทียบและคำแนะนำจากทีมงาน WMS TRANSPORT เพื่อเลือกแผนการขนย้ายที่คุ้มค่าที่สุด
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {filteredArticles.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-4 bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-xs rounded-xl transition-all group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 block w-fit mb-1.5">
                {item.category}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {item.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>อ่านบทวิเคราะห์</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>คู่มือแนะนำเพิ่มเติมสำหรับผู้ใช้บริการ:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/20 transition-all block group"
            >
              <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-0.5">
                {guide.title}
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed">
                {guide.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

