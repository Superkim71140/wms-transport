import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { posts } from "./posts";
import { Metadata } from "next";

// Re-export posts so sitemap.ts can import it from here if configured
export { posts };

export const metadata: Metadata = {
  title: "บล็อกความรู้การขนย้ายและขนส่ง | WMS TRANSPORT",
  description: "อ่านบทความ เคล็ดลับ และคู่มือการย้ายบ้าน การแพ็กของ และการเตรียมตัวขนส่งมอเตอร์ไซค์อย่างมืออาชีพจาก WMS Transport",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogHubPage() {
  const articlesList = Object.entries(posts).map(([slug, post]) => ({
    slug,
    ...post,
  }));

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
            <span className="text-blue-400 tracking-[0.2em] uppercase font-bold text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block animate-pulse">
              WMS Content Hub
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              บล็อกรวมความรู้ <span className="text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">เรื่องการขนย้าย</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              เคล็ดลับการย้ายบ้าน วิธีแพ็กสินค้า การส่งมอเตอร์ไซค์ และคู่มือขนย้ายจากผู้เชี่ยวชาญตัวจริง
            </p>
          </div>

          {/* Grid Layout for Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesList.map((post) => (
              <article 
                key={post.slug}
                className="bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-blue-500/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col group"
              >
                <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040b15] via-[#040b15]/30 to-transparent opacity-80" />
                </Link>
                
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-xs text-blue-400 font-bold mb-3 inline-block bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/10 w-fit">
                    {post.date}
                  </span>
                  <h2 className="text-xl font-extrabold text-white mb-4 leading-snug group-hover:text-blue-300 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {post.description}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-blue-300 transition-colors mt-auto w-fit"
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
