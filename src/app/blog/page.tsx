import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    slug: "how-to-pack-fridge",
    title: "5 วิธีแพ็กตู้เย็นก่อนย้ายบ้านอย่างปลอดภัย",
    excerpt: "ไขข้อข้องใจเรื่องการเตรียมตู้เย็น ถอดปลั๊กล่วงหน้ากี่ชั่วโมง แพ็กอย่างไรไม่ให้เกิดรอยบุบและป้องกันระบบน้ำยาทำความเย็นเสียหาย",
    date: "15 พ.ค. 2569",
    image: "/images/WM15.webp"
  },
  {
    slug: "prepare-motorcycle-transport",
    title: "ขั้นตอนเตรียมตัวส่งมอเตอร์ไซค์/บิ๊กไบค์ข้ามจังหวัด",
    excerpt: "แชร์วิธีเตรียมรถ ถอดของแต่ง การจองคิวรถขนส่ง และสิ่งที่ต้องเช็กก่อนส่งมอบกุญแจ เพื่อความปลอดภัยสูงสุดตลอดเส้นทาง",
    date: "20 พ.ค. 2569",
    image: "/images/WMS24.webp"
  },
  {
    slug: "moving-house-checklist",
    title: "Checklist เตรียมย้ายบ้านใหม่ใน 7 วันแบบมือโปร",
    excerpt: "วางแผนขนของย้ายบ้านอย่างไรให้ราบรื่น ไม่ตกหล่น ตั้งแต่วันเริ่มวางแผนไปจนถึงจัดระเบียบของเมื่อเข้าบ้านใหม่",
    date: "25 พ.ค. 2569",
    image: "/images/WM11.webp"
  }
];

export const metadata = {
  title: "บล็อกความรู้การขนย้ายและขนส่ง | WMS TRANSPORT",
  description: "อ่านบทความ เคล็ดลับ และคู่มือการย้ายบ้าน การแพ็กของ และการเตรียมตัวขนส่งมอเตอร์ไซค์อย่างมืออาชีพจาก WMS Transport",
};

export default function BlogHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 md:pt-40 md:pb-36 relative">
        {/* Glow Backgrounds */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[1000px] h-[1000px] bg-blue-600/[0.04] rounded-full blur-[200px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[1000px] h-[1000px] bg-indigo-500/[0.05] rounded-full blur-[250px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
              WMS Content Hub
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              บล็อกรวมความรู้ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">เรื่องการขนย้าย</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              เคล็ดลับการย้ายบ้าน วิธีแพ็กสินค้า การส่งมอเตอร์ไซค์ และข่าวสารน่ารู้จากผู้เชี่ยวชาญด้านการขนส่ง
            </p>
          </div>

          {/* Grid Layout for Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((post) => (
              <article 
                key={post.slug}
                className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040b15]/90 via-transparent to-transparent opacity-80" />
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-xs text-blue-400 font-bold mb-3 inline-block">{post.date}</span>
                  <h2 className="text-xl font-extrabold text-white mb-4 leading-snug group-hover:text-blue-300 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-blue-300 transition-colors mt-auto"
                  >
                    <span>อ่านเพิ่มเติม</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
