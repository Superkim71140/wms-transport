import { Metadata } from "next";
import { provinceMap } from "@/app/(marketing)/service/[province]/page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomerReviews from "@/components/CustomerReviews";
import { Phone } from "lucide-react";
import Image from "next/image";

// Haversine formula to calculate rough distance
function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
}

export function calculateBasePrice(fromId: string, toId: string) {
  const fromData = provinceMap[fromId];
  const toData = provinceMap[toId];
  
  if (!fromData || !toData) return 1500; // default base

  const dist = getDistanceInKm(
    parseFloat(fromData.lat), 
    parseFloat(fromData.lng), 
    parseFloat(toData.lat), 
    parseFloat(toData.lng)
  );
  
  // Base 1000 + 10 THB per km, rounded to nearest 100
  const calculatedPrice = 1000 + (dist * 10);
  return Math.ceil(calculatedPrice / 100) * 100;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ from: string; to: string }>;
}): Promise<Metadata> {
  const { from, to } = await params;
  const fromName = provinceMap[from]?.name || from;
  const toName = provinceMap[to]?.name || to;
  const startPrice = calculateBasePrice(from, to);

  return {
    title: `บริการขนส่งและรถกระบะรับจ้างจาก ${fromName} ไป ${toName} | WMS TRANSPORT`,
    description: `บริการรถรับจ้างตู้ทึบ ขนส่งสินค้า ย้ายบ้าน ย้ายหอพัก และขนส่งมอเตอร์ไซค์จาก ${fromName} ไปยัง ${toName} อย่างปลอดภัย เริ่มต้นเพียง ${startPrice.toLocaleString()} บาท พร้อมพนักงานช่วยยกของมืออาชีพ`,
    alternates: {
      canonical: `/route/${from}/${to}`,
    },
  };
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ from: string; to: string }>;
}) {
  const { from, to } = await params;
  const fromName = provinceMap[from]?.name || from;
  const toName = provinceMap[to]?.name || to;
  const startPrice = calculateBasePrice(from, to);

  const routeSchema = {
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    "name": `บริการขนส่งจาก ${fromName} ไป ${toName}`,
    "description": `บริการรถรับจ้างตู้ทึบ ย้ายบ้าน และขนส่งมอเตอร์ไซค์เส้นทาง ${fromName} ไป ${toName}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "WMS Transport",
      "image": "https://wms-transport.com/logoWMS.png",
      "telephone": "0612402436",
    },
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": startPrice.toString(),
        "priceCurrency": "THB",
        "valueAddedTaxIncluded": true
      }
    },
    "potentialAction": {
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://line.me/ti/p/DtICkMaDet",
        "inLanguage": "th",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(routeSchema) }}
      />
      <Navbar />
      
      <main className="flex-1 relative pt-32 pb-24 md:pt-40 md:pb-36 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16">
            <span className="text-blue-400 tracking-wider font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 inline-block mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              เส้นทางยอดนิยม · {fromName} → {toName}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              บริการขนย้ายจาก <span className="text-blue-400">{fromName}</span>
              <br />ส่งตรงถึง <span className="text-emerald-400">{toName}</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto font-medium mb-12">
              รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ขนส่งมอเตอร์ไซค์ พร้อมทีมงานช่วยยกของอย่างมืออาชีพ ปลอดภัย 100% มีประกันอุบัติเหตุตลอดการเดินทาง
            </p>

            <div className="inline-flex flex-col items-center p-6 bg-linear-to-br from-blue-900/40 to-slate-900/80 border border-blue-500/30 rounded-3xl mb-12 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              <span className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">ราคาเริ่มต้นโดยประมาณ</span>
              <div className="text-5xl font-black text-white flex items-baseline gap-2">
                {startPrice.toLocaleString()} <span className="text-xl text-blue-400">THB</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(6,199,85,0.3)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Image src="/images/LINE_icon.webp" alt="LINE" width={24} height={24} className="h-6 w-6 object-contain" />
                <span>สอบถามราคาเป๊ะๆ ผ่าน LINE</span>
              </a>
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-lg transition-all duration-300"
              >
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="font-mono tracking-wider">061-240-2436</span>
              </a>
            </div>
          </div>
          
          <CustomerReviews currentProvince={to} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
