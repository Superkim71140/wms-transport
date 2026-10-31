"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/seo/site-config";
import ServiceContactBanner from "./ServiceContactBanner";
import TwoToneHeading from "./TwoToneHeading";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Compass,
  ChevronDown,
  Navigation,
  CheckCircle2,
  HelpCircle,
  Search,
  X,
  ExternalLink,
  Layers,
  ArrowRight,
} from "lucide-react";

export type RegionFilter = "all" | "hq_thonburi" | "metro" | "east" | "provinces";

export interface AreaHubCard {
  slug: string;
  href: string;
  title: string;
  regionCategory: "hq_thonburi" | "metro" | "east" | "provinces";
  regionLabel: string;
  corridor: string;
  desc: string;
  badge: string;
  badgeColor: string;
  startingPrice: string;
  isHeadquarters?: boolean;
  isRegionalHub?: boolean;
}

export interface DirectoryPointItem {
  pointId: number;
  zoneSlug: string;
  slug: string;
  thaiName: string;
  disambiguation?: string;
  preferredUrl: string;
  primaryKeyword: string;
}

interface AreasDirectoryViewProps {
  initialPoints?: DirectoryPointItem[];
}

const ALL_AREA_CARDS: AreaHubCard[] = [
  {
    slug: "samutsakhon",
    href: "/service/samutsakhon",
    title: "บริการรถรับจ้างสมุทรสาคร (มหาชัย–พระราม 2)",
    regionCategory: "hq_thonburi",
    regionLabel: "ฐานปฏิบัติการหลัก (HQ)",
    corridor: "พระราม 2 • มหาชัย • กระทุ่มแบน • บ้านแพ้ว",
    desc: "ศูนย์รวมรถกระบะตู้ทึบ รับขนย้ายบ้าน ขนส่งสินค้าโรงงานอุตสาหกรรม โกดังสินค้า และกระจายสินค้าสู่ทุกภูมิภาคทั่วไทย",
    badge: "สำนักงานใหญ่ (HQ)",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    startingPrice: "ประเมินตามระยะทาง",
    isHeadquarters: true,
  },
  {
    slug: "bkk-thonburi",
    href: "/service/bkk-thonburi",
    title: "บริการรถรับจ้างกรุงเทพฯ ฝั่งธนบุรี (15 เขต)",
    regionCategory: "hq_thonburi",
    regionLabel: "ศูนย์กลางฝั่งธนบุรี",
    corridor: "เพชรเกษม • กาญจนาภิเษก • ราชพฤกษ์ • กัลปพฤกษ์",
    desc: "ครอบคลุม 15 เขตฝั่งธนฯ ทั้งกลุ่มกรุงธนเหนือและกรุงธนใต้ ย้ายคอนโดมิเนียมแนว BTS/MRT ทาวน์โฮม และขนส่งมอเตอร์ไซค์",
    badge: "ศูนย์กลาง กทม. ตะวันตก",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    startingPrice: "ประเมินตามระยะทาง",
    isRegionalHub: true,
  },
  {
    slug: "bang-khae",
    href: "/areas/bkk-thonburi/bang-khae",
    title: "รถรับจ้างย่านเพชรเกษม–บางแค",
    regionCategory: "hq_thonburi",
    regionLabel: "พื้นที่บริการหลักบางแค",
    corridor: "เพชรเกษม • กาญจนาภิเษก • พุทธมณฑลสาย 1–3",
    desc: "เจาะลึกพื้นที่เขตบางแค ย้ายหอพัก คอนโดเดอะมอลล์บางแค MRT หลักสอง หมู่บ้านจัดสรร และส่งมอเตอร์ไซค์",
    badge: "พื้นที่บริการหลัก",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
    startingPrice: "ประเมินตามระยะทาง",
  },
  {
    slug: "maha-chai",
    href: "/areas/samutsakhon/maha-chai",
    title: "รถรับจ้างมหาชัย–พระราม 2",
    regionCategory: "hq_thonburi",
    regionLabel: "ศูนย์กลางเศรษฐกิจ",
    corridor: "นิคมอุตสาหกรรม • ตลาดมหาชัย • ถนนเศรษฐกิจ 1",
    desc: "เน้นงานขนส่งสินค้าโรงงาน โกดังสินค้า สินค้าแปรรูป และขนย้ายที่อยู่อาศัยในเขตอำเภอเมืองสมุทรสาคร",
    badge: "เขตเศรษฐกิจ",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    startingPrice: "ประเมินตามระยะทาง",
  },
  {
    slug: "bangkok",
    href: "/service/bangkok",
    title: "บริการรถรับจ้างกรุงเทพมหานครและใจกลางเมือง",
    regionCategory: "metro",
    regionLabel: "กรุงเทพฯ ชั้นใน",
    corridor: "สุขุมวิท • สาทร • พระราม 9 • ลาดพร้าว",
    desc: "ขนย้ายคอนโดมิเนียมใจกลางกรุง ขนย้ายออฟฟิศสำนักงาน ขนส่งสินค้าทั่วไป และบริการรถรับจ้างพร้อมคนยก",
    badge: "ทั่วกรุงเทพฯ",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    startingPrice: "ประเมินตามระยะทาง",
  },
  {
    slug: "bkk-phra-nakhon",
    href: "/service/bkk-phra-nakhon",
    title: "รถรับจ้างกรุงเทพฯ ฝั่งพระนคร",
    regionCategory: "metro",
    regionLabel: "ฝั่งพระนคร",
    corridor: "พญาไท • ดุสิต • จตุจักร • บางซื่อ",
    desc: "ขนย้ายที่พักอาศัย คอนโด และย้ายร้านค้า เข้าตรอกซอยแคบได้อย่างคล่องตัว ปลอดภัย",
    badge: "ฝั่งพระนคร",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    startingPrice: "ประเมินตามระยะทาง",
  },
  {
    slug: "samut-songkhram",
    href: "/service/samut-songkhram",
    title: "บริการรถรับจ้างสมุทรสงคราม (แม่กลอง–อัมพวา)",
    regionCategory: "metro",
    regionLabel: "ภาคกลางตอนล่าง",
    corridor: "แม่กลอง • อัมพวา • บางคนที • พระราม 2",
    desc: "เชื่อมต่อสมุทรสงครามกับสมุทรสาครและกรุงเทพฯ ย้ายบ้าน ขนส่งผลผลิต และมอเตอร์ไซค์",
    badge: "แม่กลอง",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    startingPrice: "ประเมินตามระยะทาง",
  },
  {
    slug: "chonburi",
    href: "/service/chonburi",
    title: "บริการรถรับจ้างชลบุรีและภาคตะวันออก (EEC)",
    regionCategory: "east",
    regionLabel: "ภาคตะวันออก",
    corridor: "อมตะนคร • ศรีราชา • แหลมฉบัง • พัทยา",
    desc: "ขนส่งสินค้าโรงงานอุตสาหกรรม นิคมอุตสาหกรรม EEC และขนย้ายที่อยู่อาศัยเส้นทางชลบุรี-กรุงเทพฯ",
    badge: "ระเบียงเศรษฐกิจ EEC",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    startingPrice: "ประเมินตามระยะทาง",
  },
  {
    slug: "phuket",
    href: "/service/phuket",
    title: "บริการรถรับจ้างภูเก็ตและเส้นทางสายใต้",
    regionCategory: "provinces",
    regionLabel: "ภาคใต้",
    corridor: "เพชรเกษม • สุราษฎร์ธานี • พังงา • ภูเก็ต",
    desc: "บริการเหมารถกระบะตู้ทึบย้ายบ้านระยะไกล ขนส่งมอเตอร์ไซค์ และสินค้าเหมาเที่ยวสู่ภาคใต้",
    badge: "เส้นทางสายใต้",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    startingPrice: "ประเมินตามระยะทาง",
  },
  {
    slug: "chiang-mai",
    href: "/service/chiang-mai",
    title: "บริการรถรับจ้างเชียงใหม่และภาคเหนือ",
    regionCategory: "provinces",
    regionLabel: "ภาคเหนือ",
    corridor: "พหลโยธิน • นครสวรรค์ • ลำปาง • เชียงใหม่",
    desc: "เหมารถกระบะตู้ทึบวิ่งตรง กรุงเทพฯ-เชียงใหม่ ขนย้ายบ้าน ขนส่งมอเตอร์ไซค์ และสินค้าเหมาเที่ยว",
    badge: "เส้นทางสายเหนือ",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    startingPrice: "ประเมินตามระยะทาง",
  },
];

const DIRECTORY_FAQS = [
  {
    q: "📍 WMS TRANSPORT มีฐานปฏิบัติการและจุดจอดรถหลักอยู่ที่ใดบ้าง?",
    a: `สำนักงานใหญ่และฐานปฏิบัติการหลักตั้งอยู่ที่ ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร (ซอย 13 ใกล้ถนนพระราม 2) พร้อมทีมงานให้บริการครอบคลุมพื้นที่กรุงเทพฯ ฝั่งธนบุรี และปริมณฑล โดยแนะนำจองคิวล่วงหน้าหรือสอบถามคิวรถรอบด่วนในเวลาทำการ และมีบริการรถสายยาวสู่ทุกภูมิภาคทั่วไทย`,
  },
  {
    q: "⚡ ในกรณีเรียกรถรับจ้างด่วน ใช้เวลาเดินทางถึงหน้างานประมาณกี่นาที?",
    a: "สำหรับพื้นที่สมุทรสาคร (มหาชัย, พระราม 2, กระทุ่มแบน) และกรุงเทพฯ ฝั่งธนบุรี (เพชรเกษม, บางแค) หากมีคิวรถว่างในรอบเวลา สามารถเข้าถึงหน้างานได้โดยเร็ว สำหรับพื้นที่อื่นๆ แนะนำจองคิวนัดหมายเวลาล่วงหน้าเพื่อความสะดวกและตรงเวลา",
  },
  {
    q: "🔒 รถกระบะตู้ทึบป้องกันละอองฝนและฝุ่นละอองได้ดีแค่ไหน?",
    a: "รถของ WMS TRANSPORT เป็นรถกระบะตอนเดียวตู้ทึบหลังคาสูง ตู้ปิดมิดชิดเพื่อปกป้องสิ่งของจากแดด ลม ละอองฝน และฝุ่นละออง พร้อมอุปกรณ์ล็อกล้อและสายรัดนิรภัยมาตรฐานเพื่อความปลอดภัยตลอดการเดินทาง",
  },
  {
    q: "💰 คิดราคาค่าบริการอย่างไร มีค่าใช้จ่ายแอบแฝงหรือไม่?",
    a: "WMS TRANSPORT คิดราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดต้นทางไปยังปลายทาง ปริมาณสิ่งของ และการใช้พนักงานช่วยยกของ โดยแจ้งราคาสุทธิตรงไปตรงมาก่อนเริ่มงาน ไม่มีบวกเพิ่มหน้างานและไม่มีค่าใช้จ่ายแอบแฝง",
  },
];

// Zone metadata for the 7 Strategic Zones
const STRATEGIC_ZONES = [
  {
    id: 1,
    slug: "maha-chai",
    name: "มหาชัย – เมืองสมุทรสาคร",
    badge: "12 พื้นที่บริการ",
    corridor: "เมืองสมุทรสาคร • ท่าทราย • บ้านเกาะ • นาดี • มหาชัย • บางน้ำจืด • โพธิ์แจ้ • พันท้ายนรสิงห์ • โคกขาม • คอกกระบือ • บ้านแพ้ว • ยกกระบัตร",
    href: "/areas/maha-chai",
  },
  {
    id: 2,
    slug: "krathumbaen-omnoi",
    name: "กระทุ่มแบน – อ้อมน้อย",
    badge: "10 พื้นที่บริการ",
    corridor: "กระทุ่มแบน • ตลาดกระทุ่มแบน • แคราย • คลองมะเดื่อ • สวนหลวง • พุทธสาคร • อ้อมน้อย • ดอนไก่ดี • ท่าไม้ • ท่าเสา",
    href: "/areas/krathumbaen-omnoi",
  },
  {
    id: 3,
    slug: "rama2-bangkradi",
    name: "พระราม 2 – บางกระดี่",
    badge: "10 พื้นที่บริการ",
    corridor: "พระราม 2 • แสมดำ • บางกระดี่ • ท่าข้าม • เคหะธนบุรี • เทียนทะเล • บางขุนเทียน • จอมทอง • ทุ่งครุ • ราษฎร์บูรณะ",
    href: "/areas/rama2-bangkradi",
  },
  {
    id: 4,
    slug: "bangbon-ekachai",
    name: "บางบอน – เอกชัย",
    badge: "10 พื้นที่บริการ",
    corridor: "บางบอน • เอกชัย • คลองบางพราน • กัลปพฤกษ์ • สำเพ็ง 2 • บางบอน 3 • บางบอน 5 • บางบอนเหนือ • บางบอนใต้ • คลองบางขุนเทียน",
    href: "/areas/bangbon-ekachai",
  },
  {
    id: 5,
    slug: "nongkhaem-phetkasem81",
    name: "หนองแขม – เพชรเกษม 81",
    badge: "10 พื้นที่บริการ",
    corridor: "หนองแขม • เพชรเกษม 69 • 77 • 79 • 81 • 110 • เลียบคลองภาษีเจริญเหนือ-ใต้ • หนองค้างพลู • แขวงหนองแขม",
    href: "/areas/nongkhaem-phetkasem81",
  },
  {
    id: 6,
    slug: "bang-khae",
    name: "บางแค – เพชรเกษม",
    badge: "10 พื้นที่บริการ",
    corridor: "บางแค • เพชรเกษม • หลักสอง • วัดม่วง • บางแวก • บางหว้า • ภาษีเจริญ • บางแคเหนือ • บางไผ่ • กาญจนาภิเษก บางแค",
    href: "/areas/bang-khae",
  },
  {
    id: 7,
    slug: "phutthamonthon-sai-1-4",
    name: "พุทธมณฑลสาย 1–4 – ศาลายา",
    badge: "13 พื้นที่บริการ",
    corridor: "พุทธมณฑลสาย 1 • สาย 2 • สาย 3 • สาย 4 • ถนนพระเทพฯ • สนามหลวง 2 • ศาลายา • ทวีวัฒนา • ตลิ่งชัน • สามพราน • ไร่ขิง • พุทธมณฑลสาย 5 • นครชัยศรี",
    href: "/areas/phutthamonthon-sai-1-4",
  },
];

export interface PriorityAreaCard {
  id: number;
  name: string;
  url: string;
  zoneLabel: string;
  primaryKeyword: string;
  tagline: string;
  highlights: string[];
  caseEvidence?: string;
  badge: string;
}

const PRIORITY_10_AREAS: PriorityAreaCard[] = [
  {
    id: 1,
    name: "มหาชัย",
    url: "/areas/samutsakhon/maha-chai",
    zoneLabel: "โซน 1 • สมุทรสาคร",
    primaryKeyword: "รถรับจ้างมหาชัย",
    tagline: "ศูนย์กลางเศรษฐกิจทางทะเล ตลาดมหาชัย ตลาดทะเลไทย นิคมฯ สินสาคร",
    highlights: ["ขนส่งสินค้าโรงงาน", "ย้ายบ้าน/คอนโด", "เหมาคันตู้ทึบ"],
    caseEvidence: "เคสขนส่งสินค้าโรงงานมหาชัย (WM8)",
    badge: "ยุทธศาสตร์หลัก",
  },
  {
    id: 2,
    name: "กระทุ่มแบน",
    url: "/areas/krathumbaen-omnoi/krathum-baen",
    zoneLabel: "โซน 2 • สมุทรสาคร",
    primaryKeyword: "รถรับจ้างกระทุ่มแบน",
    tagline: "ย่านอุตสาหกรรมและที่อยู่อาศัย ตลาดกระทุ่มแบน คลองมะเดื่อ สวนหลวง",
    highlights: ["ขนย้ายโรงงานขนาดย่อม", "ย้ายทาวน์โฮมจัดสรร", "เข้าตรอกซอยคล่องตัว"],
    badge: "ศูนย์กลางโซน 2",
  },
  {
    id: 3,
    name: "หนองแขม",
    url: "/areas/bkk-thonburi/nong-khaem",
    zoneLabel: "โซน 5 • กรุงเทพฯ ฝั่งธนบุรี",
    primaryKeyword: "รถรับจ้างหนองแขม",
    tagline: "เพชรเกษม 81 (ถนนมาเจริญ) พุทธสาคร เลียบคลองภาษีเจริญ ม.เอเชียอาคเนย์",
    highlights: ["ย้ายบ้านทาวน์โฮม", "ย้ายหอพักนักศึกษา", "พร้อมคนช่วยยกของ"],
    caseEvidence: "งานย้ายบ้านหนองแขมไปบางแค (WM15)",
    badge: "ผลงานจริงยืนยัน",
  },
  {
    id: 4,
    name: "บางแค",
    url: "/areas/bkk-thonburi/bang-khae",
    zoneLabel: "โซน 6 • กรุงเทพฯ ฝั่งธนบุรี",
    primaryKeyword: "รถรับจ้างบางแค",
    tagline: "MRT หลักสอง เดอะมอลล์บางแค พุทธมณฑลสาย 1–3 ตลาดสำเพ็ง 2",
    highlights: ["ย้ายคอนโด High-rise", "ย้ายบ้านจัดสรร", "ส่งมอเตอร์ไซค์"],
    caseEvidence: "เคสย้ายคอนโดบางแคชั้น 18 (WM10)",
    badge: "ฮับคอนโด MRT",
  },
  {
    id: 5,
    name: "บ้านแพ้ว",
    url: "/areas/maha-chai/ban-phaeo",
    zoneLabel: "โซน 1 • สมุทรสาคร",
    primaryKeyword: "รถรับจ้างบ้านแพ้ว สมุทรสาคร",
    tagline: "หลักสาม คลองดำเนินสะดวก สวนเกษตร และทางหลวง 3097",
    highlights: ["ขนส่งผลผลิตการเกษตร", "ย้ายบ้านสวน", "เข้าซอยเลียบคลองได้"],
    badge: "เชื่อมต่อสมุทรสงคราม",
  },
  {
    id: 6,
    name: "อ้อมน้อย",
    url: "/areas/krathumbaen-omnoi/om-noi",
    zoneLabel: "โซน 2 • สมุทรสาคร",
    primaryKeyword: "รถรับจ้างอ้อมน้อย",
    tagline: "เทศบาลนครอ้อมน้อย ถนนเพชรเกษม โรงงานอุตสาหกรรมและหอพัก",
    highlights: ["ขนส่งสินค้า B2B", "ย้ายหอพักคนทำงาน", "รถตู้ทึบสูง 2.1 ม."],
    badge: "ชุมทางเพชรเกษม",
  },
  {
    id: 7,
    name: "บางบอน",
    url: "/areas/bkk-thonburi/bang-bon",
    zoneLabel: "โซน 4 • กรุงเทพฯ ฝั่งธนบุรี",
    primaryKeyword: "รถรับจ้างบางบอน",
    tagline: "ถนนเอกชัย บางบอน 1–5 ถนนกัลปพฤกษ์ วงแหวนกาญจนาภิเษก",
    highlights: ["ย้ายทาวน์โฮมจัดสรร", "ขนย้ายสินค้าโรงกลึง/การ์เมนต์", "พร้อมทีมยก"],
    caseEvidence: "เคสย้ายทาวน์โฮมบางบอน 3 (WM16)",
    badge: "ผลงานจริงยืนยัน",
  },
  {
    id: 8,
    name: "พระราม 2",
    url: "/areas/rama2-bangkradi/rama-2",
    zoneLabel: "โซน 3 • กรุงเทพฯ-สมุทรสาคร",
    primaryKeyword: "รถรับจ้างพระราม 2",
    tagline: "แนวแกนทางหลวง 35 แสมดำ บางกระดี่ คลังสินค้าและบ้านจัดสรร",
    highlights: ["ขนส่งสินค้าคลัง/โกดัง", "ย้ายบ้านเดี่ยว", "สายตรงลงใต้"],
    badge: "คอร์ริดอร์หลัก",
  },
  {
    id: 9,
    name: "ศาลายา",
    url: "/areas/phutthamonthon-sai-1-4/salaya",
    zoneLabel: "โซน 7 • นครปฐม",
    primaryKeyword: "รถรับจ้างศาลายา",
    tagline: "ตำบลศาลายา ม.มหิดล เซ็นทรัล ศาลายา และคอนโดมิเนียมรอบมหาวิทยาลัย",
    highlights: ["ย้ายหอพักนักศึกษา", "ย้ายคอนโด", "ส่งโต๊ะ/ตู้/หนังสือ"],
    badge: "โซนมหาวิทยาลัย",
  },
  {
    id: 10,
    name: "สามพราน",
    url: "/areas/phutthamonthon-sai-1-4/sam-phran",
    zoneLabel: "โซน 7 • นครปฐม",
    primaryKeyword: "รถรับจ้างสามพราน นครปฐม",
    tagline: "อำเภอสามพราน อ้อมใหญ่ ไร่ขิง บางกระทึก สวนสามพราน",
    highlights: ["ขนย้ายบ้านพักอาศัย", "ขนส่งสินค้าโรงงานอ้อมใหญ่", "รถตู้ทึบกันฝน"],
    badge: "เชื่อมต่อนครปฐม",
  },
];

export default function AreasDirectoryView({ initialPoints = [] }: AreasDirectoryViewProps) {
  const [activeTab, setActiveTab] = useState<RegionFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filterTabs = [
    { id: "all", label: `พื้นที่ทั้งหมด (${ALL_AREA_CARDS.length} เส้นทาง)` },
    { id: "hq_thonburi", label: "สมุทรสาคร & ฝั่งธนบุรี (ฐานหลัก)" },
    { id: "metro", label: "กรุงเทพฯ & ปริมณฑล" },
    { id: "east", label: "ภาคกลาง & ตะวันออก (ชลบุรี)" },
    { id: "provinces", label: "ภาคใต้ (ภูเก็ต) • ภาคเหนือ (เชียงใหม่)" },
  ];

  const filteredCards = ALL_AREA_CARDS.filter((card) => {
    if (activeTab === "all") return true;
    return card.regionCategory === activeTab;
  });

  const hqCard = ALL_AREA_CARDS.find((c) => c.isHeadquarters);

  // Search logic
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return { points: [], cards: [] };

    const matchedPoints = initialPoints.filter((point) => {
      return (
        point.thaiName.toLowerCase().includes(normalizedQuery) ||
        (point.disambiguation && point.disambiguation.toLowerCase().includes(normalizedQuery)) ||
        point.primaryKeyword.toLowerCase().includes(normalizedQuery) ||
        point.slug.toLowerCase().includes(normalizedQuery)
      );
    });

    const matchedCards = ALL_AREA_CARDS.filter((card) => {
      return (
        card.title.toLowerCase().includes(normalizedQuery) ||
        card.corridor.toLowerCase().includes(normalizedQuery) ||
        card.desc.toLowerCase().includes(normalizedQuery)
      );
    });

    return { points: matchedPoints, cards: matchedCards };
  }, [normalizedQuery, initialPoints, isSearching]);

  // Group initialPoints by zone for the crawlable directory listing
  const pointsByZone = useMemo(() => {
    const map: Record<string, DirectoryPointItem[]> = {};
    for (const zone of STRATEGIC_ZONES) {
      map[zone.slug] = initialPoints.filter((p) => p.zoneSlug === zone.slug);
    }
    return map;
  }, [initialPoints]);

  return (
    <div className="w-full bg-white">
      {/* 1. TOP HERO SECTION (Full-width Navy) */}
      <section
        className="w-full text-white relative overflow-hidden"
        style={{
          backgroundColor: "#050F26",
          borderBottom: "1px solid rgba(30, 41, 59, 0.8)",
          paddingTop: "calc(var(--site-header-offset) + 1.25rem)",
          paddingBottom: "3.25rem",
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 list-none p-0 m-0">
              <li>
                <Link href="/" className="hover:text-white transition-colors no-underline text-sky-300">
                  หน้าแรก
                </Link>
              </li>
              <li className="text-slate-500">›</li>
              <li className="text-white font-bold" aria-current="page">
                พื้นที่ให้บริการทั่วไทย
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (55% desktop balance): Text & Actions */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs shadow-sm mb-3 bg-blue-500/20 text-sky-300 border border-blue-400/30">
                <Compass className="w-3.5 h-3.5" />
                <span>ครอบคลุมทุกภูมิภาคทั่วไทย • ศูนย์กลางสมุทรสาคร พระราม 2</span>
              </div>

              <TwoToneHeading
                as="h1"
                text="พื้นที่และเส้นทางให้บริการ รถกระบะตู้ทึบรับจ้าง ทั่วไทย"
                highlight="รถกระบะตู้ทึบ"
                variant="dark"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold text-white tracking-tight mb-3 leading-tight"
                highlightClassName="text-sky-300 font-black"
              />

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-normal">
                สำนักงานใหญ่ตั้งอยู่ในจังหวัดสมุทรสาคร เชื่อมต่อถนนพระราม 2 พร้อมบริการรถกระบะตู้ทึบรับจ้าง ดูแลงานย้ายบ้าน คอนโด ขนส่งสินค้าโรงงาน และส่งมอเตอร์ไซค์ เชื่อมโยงกรุงเทพฯ ฝั่งธนบุรี และทุกภูมิภาคทั่วไทย ปลอดภัย ตรงเวลา ราคาโปร่งใส
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full font-bold text-white text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-sm transition hover:opacity-95"
                  style={{ backgroundColor: "#06C755" }}
                >
                  <Image
                    src="/images/LINE_icon.webp"
                    alt="LINE"
                    width={18}
                    height={18}
                    className="w-4.5 h-4.5 shrink-0 object-contain"
                  />
                  <span>สอบถามคิวรถและประเมินราคาทาง LINE</span>
                </a>

                <a
                  href={siteConfig.phoneHref}
                  className="px-5 py-3 rounded-full font-bold text-slate-800 text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-sm bg-white hover:bg-slate-100 transition no-underline"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>โทรสายด่วน {siteConfig.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Column (45% desktop balance): Authentic Portfolio Photography */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Soft blue glow behind image, away from text */}
                <div
                  className="absolute -inset-2 rounded-3xl bg-sky-500/15 blur-xl pointer-events-none"
                  aria-hidden="true"
                />
                <figure className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-[#0B2444] border border-sky-400/25 flex flex-col m-0">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-slate-900 overflow-hidden">
                    <Image
                      src="/images/WM15.webp"
                      alt="รถกระบะตู้ทึบ WMS เปิดท้ายแสดงการจัดเรียงสิ่งของและกล่องบรรจุภัณฑ์ย้ายบ้านอย่างเป็นระเบียบ"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover object-[center_35%] w-full h-full"
                    />
                  </div>
                  {/* Readable opaque navy caption surface in normal document flow */}
                  <figcaption className="px-4 py-3 sm:px-5 sm:py-3.5 bg-[#0B2444] border-t border-sky-400/20 text-slate-200 text-xs sm:text-sm leading-relaxed flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 inline-block" aria-hidden="true" />
                    <span className="font-medium">ภาพงานจริง: รถกระบะตู้ทึบ WMS จัดเรียงสิ่งของและเฟอร์นิเจอร์เต็มคันอย่างเป็นระเบียบ ปิดมิดชิดปลอดภัย</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN DIRECTORY CONTENT */}
      <section className="w-full py-10 md:py-14 bg-white">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ── SEARCH & FILTER BAR ── */}
          <div className="mb-10 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="max-w-2xl mb-4">
              <span className="text-xs font-bold text-blue-600 bg-blue-100/70 border border-blue-200 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
                <Search className="w-3.5 h-3.5" />
                <span>ระบบค้นหาพื้นที่ให้บริการ</span>
              </span>
              <TwoToneHeading
                as="h2"
                text="ค้นหาพื้นที่ อำเภอ หรือตำบลที่ต้องการ ใช้บริการ"
                highlight="ใช้บริการ"
                variant="light"
                className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900"
                highlightClassName="text-blue-600 font-black"
              />
              <p className="text-xs sm:text-sm text-slate-500">
                พิมพ์ชื่อพื้นที่ เช่น บ้านแพ้ว, ไร่ขิง, นครชัยศรี, มหาชัย, บางแค, พระราม 2, สุขสวัสดิ์ เพื่อไปยังหน้ารายละเอียดบริการ
              </p>
            </div>

            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาพื้นที่บริการ (เช่น บ้านแพ้ว, ไร่ขิง, บางแค, พระราม 2, สามพราน...)"
                className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  aria-label="ล้างคำค้นหา"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Live Search Results */}
            {isSearching && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    ผลการค้นหาสำหรับ &quot;{searchQuery}&quot; (พบ {searchResults.points.length + searchResults.cards.length} รายการ)
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    ล้างการค้นหา
                  </button>
                </div>

                {searchResults.points.length === 0 && searchResults.cards.length === 0 ? (
                  <div className="p-6 text-center bg-white rounded-2xl border border-slate-200">
                    <p className="text-slate-600 text-sm mb-3">
                      ไม่พบหน้าที่ตรงกับ &quot;{searchQuery}&quot; โดยตรง
                    </p>
                    <p className="text-xs text-slate-500 mb-4">
                      WMS TRANSPORT รับงานขนส่งและย้ายบ้านครอบคลุมพื้นที่ใกล้เคียงและทั่วประเทศ สามารถสอบถามเส้นทางได้ทันที
                    </p>
                    <div className="flex justify-center gap-3">
                      <a
                        href={siteConfig.lineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white inline-flex items-center gap-1.5 shadow-2xs"
                        style={{ backgroundColor: "#06C755" }}
                      >
                        <span>เช็คคิวทาง LINE</span>
                      </a>
                      <a
                        href={siteConfig.phoneHref}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 inline-flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span>โทร {siteConfig.phone}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {/* Matched Local Points */}
                    {searchResults.points.map((pt) => (
                      <Link
                        key={pt.pointId}
                        href={pt.preferredUrl}
                        className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between group no-underline"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-blue-600">จุดที่ {pt.pointId}</span>
                            <span className="text-xs text-slate-400">พื้นที่บริการ</span>
                          </div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {pt.thaiName}
                          </div>
                          {pt.disambiguation && (
                            <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {pt.disambiguation}
                            </div>
                          )}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                          <span>ดูข้อมูลพื้นที่</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    ))}

                    {/* Matched Region Cards */}
                    {searchResults.cards.map((card) => (
                      <Link
                        key={card.slug}
                        href={card.href}
                        className="p-3.5 bg-white rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between group no-underline"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-emerald-600">{card.regionLabel}</span>
                            <span className="text-xs text-slate-400">เส้นทางภูมิภาค</span>
                          </div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {card.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {card.corridor}
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                          <span>ดูเส้นทาง</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FEATURED HEADQUARTERS HERO BLOCK (Verified HQ) */}
          {hqCard && !isSearching && (
            <div className="mb-10">
              <div
                className="p-6 sm:p-8 rounded-3xl border shadow-sm"
                style={{
                  borderColor: "#BFDBFE",
                  background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full font-bold text-xs bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1.5 shadow-2xs">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-600" />
                        <span>ที่ตั้งสำนักงานใหญ่ (Verified Headquarters)</span>
                      </span>

                      <span className="px-3 py-1 rounded-full font-bold text-xs bg-blue-50 text-blue-700 border border-blue-200">
                        {hqCard.startingPrice}
                      </span>

                      <span className="px-3 py-1 rounded-full font-medium text-xs bg-slate-100 text-slate-700 border border-slate-200">
                        รถกระบะตู้ทึบมาตรฐาน
                      </span>
                    </div>

                    <TwoToneHeading
                      as="h2"
                      text="ศูนย์บริการรถรับจ้าง สมุทรสาคร (พระราม 2–มหาชัย)"
                      highlight="สมุทรสาคร"
                      variant="light"
                      className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mb-2"
                      highlightClassName="text-blue-600 font-black"
                    />

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {hqCard.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="bg-white text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 text-xs shadow-2xs">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>{siteConfig.address.streetAddress} {siteConfig.address.addressLocality} {siteConfig.address.postalCode}</span>
                      </span>

                      <span className="bg-white text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 text-xs shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-sky-600" />
                        <span>เข้าเทียบหน้างานรวดเร็วในเขตสมุทรสาคร (ตามรอบคิวรถว่าง)</span>
                      </span>
                    </div>

                    <Link
                      href={hqCard.href}
                      className="px-5 py-2.5 rounded-full font-bold text-white text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs no-underline transition hover:opacity-95"
                      style={{ backgroundColor: "#087BFF" }}
                    >
                      <span>ดูข้อมูลศูนย์บริการสมุทรสาครอย่างละเอียด</span>
                      <span>→</span>
                    </Link>
                  </div>

                  <div className="lg:col-span-4">
                    <div
                      className="p-5 rounded-2xl border text-center shadow-xs text-white"
                      style={{
                        background: "linear-gradient(145deg, #071638 0%, #0F2A66 100%)",
                        borderColor: "rgba(56, 189, 248, 0.3)",
                      }}
                    >
                      <span className="text-sky-300 text-xs font-semibold uppercase tracking-wider block mb-1">
                        ศูนย์ประสานงานและประเมินราคา
                      </span>
                      <h3 className="text-lg font-bold mb-2">WMS TRANSPORT</h3>
                      <p className="text-slate-300 text-xs leading-relaxed mb-4">
                        สอบถามคิวรถว่างล่วงหน้า หรือส่งรูปประเมินราคาฟรีผ่าน LINE
                      </p>
                      <a
                        href={siteConfig.phoneHref}
                        className="w-full py-2.5 rounded-full font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white inline-flex items-center justify-center gap-2 shadow-sm no-underline transition"
                      >
                        <Phone className="w-4 h-4" />
                        <span>โทร {siteConfig.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 10 PRIORITY STRATEGIC AREAS (EVIDENCE-BASED HIGHLIGHT) ── */}
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-xs bg-amber-100 text-amber-900 border border-amber-300 mb-2">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-600" />
                  <span>10 พื้นที่ยุทธศาสตร์หลัก • รถกระบะตู้ทึบพร้อมคนยก</span>
                </div>
                <TwoToneHeading
                  as="h2"
                  text="10 พื้นที่ให้บริการหลัก ที่มีการเรียกใช้บริการสูงสุด"
                  highlight="10 พื้นที่ให้บริการหลัก"
                  variant="light"
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight"
                  highlightClassName="text-blue-600 font-black"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                พื้นที่ศูนย์กลางที่มีรอบวิ่งงานประจำ รถพร้อมเข้าเทียบหน้างานรวดเร็ว พร้อมผลงานจริงยืนยัน
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRIORITY_10_AREAS.map((area) => (
                <Link
                  key={area.id}
                  href={area.url}
                  className="group bg-white rounded-2xl border border-slate-200/90 p-4 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between no-underline"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {area.zoneLabel}
                      </span>
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {area.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                      {area.name}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                      {area.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {area.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {area.caseEvidence && (
                      <div className="text-[11px] text-emerald-700 font-medium bg-emerald-50/70 border border-emerald-100 rounded-lg px-2 py-1 mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-600" />
                        <span className="truncate">{area.caseEvidence}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>ดูข้อมูลรถรับจ้าง{area.name}</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── 7 STRATEGIC SERVICE ZONES (CRITICAL HIERARCHY EXPANSION) ── */}
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-xs bg-blue-100 text-blue-800 border border-blue-200 mb-2">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span>โครงสร้าง 7 โซนบริการยุทธศาสตร์ • 75 พื้นที่บริการครอบคลุม</span>
                </div>
                <TwoToneHeading
                  as="h2"
                  text="7 โซนบริการหลัก สมุทรสาคร–กรุงเทพฯ ฝั่งธนบุรี"
                  highlight="สมุทรสาคร–กรุงเทพฯ ฝั่งธนบุรี"
                  variant="light"
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight"
                  highlightClassName="text-blue-600 font-black"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                คลิกเข้าสู่หน้าฮับประจำโซนเพื่อดูรายละเอียดพื้นที่และเส้นทางเฉพาะ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {STRATEGIC_ZONES.map((zone) => (
                <Link
                  key={zone.id}
                  href={zone.href}
                  className={`group bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between ${
                    zone.id === 7 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        โซน {zone.id}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {zone.badge}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                      {zone.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                      {zone.corridor}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>เข้าสู่หน้าฮับโซน {zone.id}</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── BROWSEABLE DIRECTORY OF ALL 75 SERVICE AREAS (Grouped by Zone) ── */}
          {initialPoints && initialPoints.length > 0 && (
            <div className="mb-14 bg-slate-50/70 border border-slate-200 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-700 bg-blue-100/60 px-2.5 py-0.5 rounded-full">
                  ทำเนียบพื้นที่บริการทั้งหมด 75 แห่ง
                </span>
              </div>
              <TwoToneHeading
                as="h2"
                text="เลือกดูพื้นที่บริการย่อยแยกตามโซน (75 พื้นที่)"
                highlight="(75 พื้นที่)"
                variant="light"
                className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2"
                highlightClassName="text-blue-600 font-black"
              />
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                คลิกที่ชื่อพื้นที่เพื่อเข้าสู่หน้ารายละเอียด จุดจอดเทียบรถ และคำแนะนำการขนย้ายเฉพาะแห่ง
              </p>

              <div className="space-y-4">
                {STRATEGIC_ZONES.map((zone) => {
                  const points = pointsByZone[zone.slug] || [];
                  return (
                    <details
                      key={zone.slug}
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-colors hover:border-slate-300 open:border-blue-300 open:shadow-xs"
                    >
                      <summary className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer list-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            โซน {zone.id}
                          </span>
                          <div>
                            <span className="text-sm sm:text-base font-bold text-slate-900">
                              {zone.name}
                            </span>
                            <span className="ml-2 text-xs text-slate-500 font-normal">
                              ({points.length} พื้นที่บริการ)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link
                            href={zone.href}
                            onClick={(e) => e.stopPropagation()}
                            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline mr-2"
                          >
                            <span>หน้าฮับ</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                          <ChevronDown
                            className="w-4 h-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-blue-600"
                            aria-hidden="true"
                          />
                        </div>
                      </summary>

                      {/* Server-rendered HTML for search engine crawlability and accessibility */}
                      <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/40">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                          {points.map((pt) => (
                            <Link
                              key={pt.pointId}
                              href={pt.preferredUrl}
                              className="px-3 py-2 rounded-xl bg-white border border-slate-200/90 hover:border-blue-400 hover:text-blue-600 text-slate-800 text-xs font-medium transition-all shadow-2xs flex items-center justify-between group/link no-underline"
                            >
                              <span className="truncate">{pt.thaiName}</span>
                              <span className="text-slate-300 group-hover/link:text-blue-500 group-hover/link:translate-x-0.5 transition-all text-[11px] shrink-0 ml-1">
                                ›
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. INTERACTIVE REGION FILTER TABS */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <TwoToneHeading
                  as="h2"
                  text="เลือกจังหวัดและ เส้นทางเชื่อมต่อภูมิภาค"
                  highlight="เส้นทางเชื่อมต่อภูมิภาค"
                  variant="light"
                  className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
                  highlightClassName="text-blue-600 font-black"
                />
                <p className="text-slate-500 text-xs sm:text-sm mb-0">
                  คลิกที่การ์ดเพื่อดูรายละเอียดบริการ จุดขึ้นลงสินค้า และตารางประเมินราคาเฉพาะพื้นที่
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as RegionFilter)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. AREA CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCards.map((card) => (
              <div
                key={card.slug}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                    <span className="text-blue-600 font-bold text-xs">
                      {card.startingPrice}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {card.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-2">
                    <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-medium text-slate-700">{card.corridor}</span>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {card.desc}
                  </p>
                </div>

                <Link
                  href={card.href}
                  className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-blue-600 group-hover:text-blue-700 no-underline"
                >
                  <span>เช็คเส้นทางและรายละเอียด</span>
                  <span className="group-hover:translate-x-1 transition-transform">➔</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Contact Banner matching Screenshot 1 */}
          <ServiceContactBanner
            areaName="ทั่วประเทศ"
            className="mb-12"
          />

          {/* 5. LOCAL BUSINESS ADDRESS & MAP PANEL */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-slate-50/50 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <span className="px-3 py-1 rounded-full font-bold text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ฐานที่ตั้งจดทะเบียนและพิกัดศูนย์กระจายรถ</span>
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  ที่ตั้งสำนักงานใหญ่ WMS TRANSPORT
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  สำนักงานใหญ่ตั้งอยู่ในพื้นที่อำเภอเมืองสมุทรสาคร รองรับการวิ่งรับงานครอบคลุมมหาชัย พระราม 2 กระทุ่มแบน และเป็นจุดปล่อยรถสายยาววิ่งสู่ทั่วประเทศ
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{siteConfig.address.streetAddress} {siteConfig.address.addressLocality} จังหวัด{siteConfig.address.addressRegion} {siteConfig.address.postalCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{siteConfig.openingHoursTh}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>โทรศัพท์: {siteConfig.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={siteConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs inline-flex items-center gap-1.5 transition no-underline"
                  >
                    <span>เปิดแผนที่ Google Maps</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={siteConfig.phoneHref}
                    className="px-4 py-2 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white text-xs inline-flex items-center gap-1.5 transition no-underline shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>โทรสอบถามเส้นทาง</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-200">
                  <iframe
                    title="แผนที่ที่ตั้งสำนักงานใหญ่ WMS TRANSPORT"
                    src={`https://maps.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}&hl=th&z=15&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* 6. AREA HUB FAQS SECTION (Reference 2 Styling) */}
          <div className="max-w-4xl mx-auto mb-14 bg-[#EFF6FF] border border-blue-200/60 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="px-3 py-1 rounded-full font-bold text-xs mb-3 inline-flex items-center gap-1.5 bg-blue-100 text-blue-800">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>คำถามที่พบบ่อย</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight mb-2">
                คำถามที่พบบ่อยเกี่ยวกับ <span className="text-blue-600">พื้นที่ให้บริการ WMS TRANSPORT</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                ข้อมูลจุดสแตนด์บายรถ การเข้ารับสินค้าด่วน และขั้นตอนการจองคิวรถกระบะตู้ทึบ
              </p>
            </div>

            <div className="space-y-3.5">
              {DIRECTORY_FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs open:border-blue-300 open:shadow-md open:ring-2 open:ring-blue-500/10 transition-all duration-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors [&::-webkit-details-marker]:hidden">
                    <span className="pr-4 leading-snug">
                      {faq.q}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 transition-colors">
                      <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" />
                    </div>
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-blue-50 bg-[#F8FAFF]">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Internal Draft Preview Footer link (Subtle for Reviewers) */}
          <div className="text-center pt-6 border-t border-slate-200 text-xs text-slate-400">
            <span>สำหรับทีมงานตรวจสอบภายใน: </span>
            <Link
              href="/preview/areas"
              className="text-slate-500 hover:text-blue-600 underline"
            >
              ระบบตรวจสอบแบบร่างพื้นที่บริการ (Draft Preview Dashboard)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
