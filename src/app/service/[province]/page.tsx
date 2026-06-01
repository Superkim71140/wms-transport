import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Truck, ShieldCheck, Clock, Users, Phone, ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const provinceMap: Record<string, string> = {
  bangkok: "กรุงเทพมหานคร",
  phuket: "ภูเก็ต",
  chonburi: "ชลบุรี",
  "chiang-mai": "เชียงใหม่",
};

export async function generateStaticParams() {
  return [
    { province: "bangkok" },
    { province: "phuket" },
    { province: "chonburi" },
    { province: "chiang-mai" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>;
}): Promise<Metadata> {
  const { province } = await params;
  const provinceThai = provinceMap[province] || province;
  return {
    title: `รถรับจ้างตู้ทึบ ย้ายบ้าน ขนส่งมอเตอร์ไซค์ จังหวัด ${provinceThai} | WMS`,
    description: `บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ในพื้นที่จังหวัด ${provinceThai} และทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ ประเมินราคาฟรี 24 ชม.`,
  };
}

export default async function ProvinceServicePage({
  params,
}: {
  params: Promise<{ province: string }>;
}) {
  const { province } = await params;
  const provinceThai = provinceMap[province] || province;

  const faqs = [
    {
      q: `รถรับจ้างตู้ทึบใน ${provinceThai} คิดราคาอย่างไร?`,
      a: `ค่าบริการรถรับจ้างตู้ทึบในพื้นที่ ${provinceThai} คิดราคาเริ่มต้นตามระยะทางจริงและขนาดของรถ โดยมีราคาเริ่มต้นสำหรับการขนของในเมืองที่โปร่งใส ไม่มีค่าใช้จ่ายลึกลับบวกเพิ่มหน้างาน 100%`
    },
    {
      q: `ใช้เวลาย้ายบ้านจากกรุงเทพไป ${provinceThai} กี่ชั่วโมง?`,
      a: `ระยะเวลาในการขนย้ายขึ้นอยู่กับระยะทางจากกรุงเทพมหานครไปยังปลายทางใน ${provinceThai} โดยเฉลี่ยสำหรับการเดินทางระยะไกล ทีมงานของเราสามารถดำเนินการขนย้ายและจัดส่งถึงที่หมายอย่างปลอดภัยในเวลาที่รวดเร็วที่สุดตามที่กำหนด`
    },
    {
      q: `มีบริการคนช่วยยกของในจังหวัด ${provinceThai} หรือไม่?`,
      a: `เรามีทีมงานพนักงานช่วยยกของมืออาชีพคอยให้บริการในพื้นที่ ${provinceThai} เพื่อช่วยแบ่งเบาภาระในการยกของหนัก ขนย้ายเฟอร์นิเจอร์ หรือย้ายหอพัก คอนโด อย่างเป็นระบบและระมัดระวังสูงสุด`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="flex-1 relative pt-32 pb-24 md:pt-40 md:pb-36">
        {/* Ambient background glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-[10%] left-[-5%] w-[1000px] h-[1000px] bg-blue-600/[0.04] rounded-full blur-[200px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[1000px] h-[1000px] bg-indigo-500/[0.05] rounded-full blur-[250px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="flex justify-start">
            <Breadcrumbs
              items={[
                { name: "บริการของเรา", item: "/#services" },
                { name: `ย้ายบ้าน ${provinceThai}`, item: `/service/${province}` },
              ]}
            />
          </div>

          <div className="text-center mt-6">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              พื้นที่ให้บริการหลัก: {provinceThai}
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              รถรับจ้างตู้ทึบ ย้ายบ้าน ขนส่งมอเตอร์ไซค์ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                พื้นที่จังหวัด {provinceThai}
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              บริการรถกระบะตู้ทึบรับจ้าง ขนย้ายบ้าน คอนโด หอพัก ขนส่งมอเตอร์ไซค์ และบิ๊กไบค์ ในเขตพื้นที่ {provinceThai} และขนส่งข้ามจังหวัดทั่วประเทศ พร้อมทีมงานช่วยยกของมืออาชีพ ปลอดภัย มีประกันภัยอุบัติเหตุทุกเที่ยวการเดินทาง
            </p>

            {/* Quick CTA */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-20">
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] hover:bg-[#05B34F] text-white rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(6,199,85,0.3)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Image 
                  src="/images/LINE_Brand_icon.png" 
                  alt="LINE" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 object-contain shrink-0" 
                />
                <span>ติดต่อผ่าน LINE</span>
              </a>
              
              <a
                href="tel:0612402436"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-400/50 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="font-mono tracking-wider">061-240-2436</span>
              </a>
            </div>

            {/* Core Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-20">
              <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-3">ขนส่งด้วยตู้ทึบมาตรฐาน</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  รถกระบะตู้ทึบหลังคาสูง กันฝน กันแดด กันฝุ่น 100% เหมาะสำหรับขนย้ายบ้าน ขนย้ายเฟอร์นิเจอร์ หรือขนส่งสินค้าทุกประเภท
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-3">พนักงานช่วยยกของมืออาชีพ</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  ไม่ต้องเหนื่อยยกของเอง เรามีทีมงานพนักงานขนย้ายที่มีความชำนาญ สุภาพ จัดเรียงสิ่งของประหยัดพื้นที่ และทะนุถนอมสิ่งของเป็นอย่างดี
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-3">มีประกันสินค้าปลอดภัย</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  รับประกันความเสียหายระหว่างทาง ช่วยเพิ่มความอุ่นใจให้กับทุกขั้นตอนการส่งต่อ เพื่อให้ทรัพย์สินของคุณถึงปลายทางอย่างไร้กังวล
                </p>
              </div>
            </div>

            {/* Pricing Info Section */}
            <div className="bg-gradient-to-r from-blue-600/[0.1] to-cyan-500/[0.05] border border-blue-500/20 p-8 md:p-12 rounded-[32px] text-left">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">อัตราค่าบริการและโปรโมชั่นพิเศษในพื้นที่ {provinceThai}</h2>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400">✓</span> <span>บริการขนส่งรถมอเตอร์ไซค์/บิ๊กไบค์ จาก {provinceThai} ไปทุกภาคทั่วประเทศ ราคาเริ่มต้น 1,500 บาท</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400">✓</span> <span>บริการย้ายหอพัก คอนโด บ้าน พร้อมคนยกของ ดำเนินการโดยรวดเร็วในเขต {provinceThai}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400">✓</span> <span>คิดราคาจริงใจตามระยะทางและประเภทการใช้งาน ไม่มีบวกเพิ่มทีหลัง 100%</span>
                </li>
              </ul>
            </div>

            {/* Local FAQ Section */}
            <div className="mt-24 text-left max-w-3xl mx-auto">
              <h2 className="text-3xl font-black text-white text-center mb-12">คำถามที่พบบ่อย (FAQ) ใน {provinceThai}</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white/[0.02] border border-white/5 open:border-blue-500/30 open:bg-gradient-to-br open:from-blue-950/20 open:via-[#040b15]/50 open:to-[#040b15] open:shadow-[0_20px_50px_rgba(59,130,246,0.1)] rounded-3xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all duration-300 hover:border-white/10 relative overflow-hidden"
                  >
                    {/* Left glowing border accent for active state */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-300 opacity-0 group-open:opacity-100 transition-opacity duration-300" />
                    
                    <summary className="flex justify-between items-center font-extrabold text-white text-lg list-none select-none">
                      <span className="group-open:text-blue-400 transition-colors duration-300 pr-4">
                        {faq.q}
                      </span>
                      <span className="ml-1.5 shrink-0 p-2 bg-white/5 group-open:bg-blue-500/10 text-slate-400 group-open:text-blue-400 rounded-xl border border-white/10 group-open:border-blue-500/20 group-open:rotate-180 transition-all duration-300">
                        <ChevronDown className="w-5 h-5" />
                      </span>
                    </summary>
                    
                    <div className="mt-5 text-slate-300 leading-relaxed font-medium pl-4 border-l border-white/10 group-open:border-blue-500/30 transition-colors duration-300">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
