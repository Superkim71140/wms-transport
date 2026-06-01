import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const posts: Record<
  string,
  {
    title: string;
    description: string;
    date: string;
    dateISO: string;
    image: string;
    content: string;
  }
> = {
  "how-to-pack-fridge": {
    title: "5 วิธีแพ็กตู้เย็นก่อนย้ายบ้านอย่างปลอดภัย",
    description: "ไขข้อข้องใจเรื่องการเตรียมตู้เย็น ถอดปลั๊กล่วงหน้ากี่ชั่วโมง แพ็กอย่างไรไม่ให้เกิดรอยบุบและป้องกันระบบน้ำยาทำความเย็นเสียหาย",
    date: "15 พ.ค. 2569",
    dateISO: "2026-05-15T08:00:00+07:00",
    image: "/images/WM15.webp",
    content: `การขนย้ายตู้เย็นเป็นงานที่ต้องอาศัยความระมัดระวังอย่างสูง เนื่องจากตู้เย็นเป็นเครื่องใช้ไฟฟ้าที่มีทั้งชิ้นส่วนอะไหล่ที่เปราะบาง เช่น ชั้นวางกระจก รวมถึงระบบน้ำยาทำความเย็นที่ไวต่อการกระทบกระเทือน หากขนย้ายไม่ถูกวิธี อาจส่งผลให้คอมเพรสเซอร์เสียหายหรือตัวเครื่องเป็นรอยบุบได้

WMS Transport ได้รวบรวม 5 เคล็ดลับการแพ็กตู้เย็นอย่างถูกวิธีมาให้ทำตามกันครับ:

1. ถอดปลั๊กตู้เย็นล่วงหน้าอย่างน้อย 12-24 ชั่วโมง: เพื่อให้น้ำยาทำความเย็นไหลกลับเข้าสู่ระบบและให้ความเย็นภายในละลายหมดก่อนขนย้าย
2. นำของออกจากตู้เย็นให้หมด: ห้ามปล่อยอาหารหรือเครื่องดื่มไว้เด็ดขาด จากนั้นถอดชั้นวางและกล่องพลาสติกแยกออกไปหุ้มแอร์บับเบิลต่างหาก
3. ทำความสะอาดและเช็ดให้แห้ง: เพื่อป้องกันการสะสมของกลิ่นอับและความชื้นระหว่างเดินทาง
4. ยึดประตูด้วยเทปป้องกันรอย: ใช้กระดาษหรือโฟมหนารองขอบประตูก่อนรัดด้วยสายรัดหรือเทปกาวที่ไม่ทิ้งคราบเหนียว
5. หุ้มตู้เย็นด้วยพลาสติกซีล/บับเบิลกันกระแทก: ห่อหุ้มตู้เย็นทั้งหลังด้วยแอร์บับเบิลและซีลพลาสติกทับ เพื่อปกป้องผิวสีของตู้เย็นจากการขีดข่วน

เมื่อถึงบ้านใหม่แล้ว ควรตั้งตู้เย็นทิ้งไว้อย่างน้อย 4-6 ชั่วโมงเพื่อให้ระบบน้ำยาทำความเย็นเซ็ตตัว ก่อนจะเสียบปลั๊กใช้งานตามปกติครับ`
  },
  "prepare-motorcycle-transport": {
    title: "ขั้นตอนเตรียมตัวส่งมอเตอร์ไซค์/บิ๊กไบค์ข้ามจังหวัด",
    description: "แชร์วิธีเตรียมรถ ถอดของแต่ง การจองคิวรถขนส่ง และสิ่งที่ต้องเช็กก่อนส่งมอบกุญแจ เพื่อความปลอดภัยสูงสุดตลอดเส้นทาง",
    date: "20 พ.ค. 2569",
    dateISO: "2026-05-20T08:00:00+07:00",
    image: "/images/WMS24.webp",
    content: `การส่งมอบมอเตอร์ไซค์หรือบิ๊กไบค์คันโปรดของคุณเดินทางข้ามจังหวัด ต้องการมาตรฐานความปลอดภัยขั้นสูงสุดเพื่อความอุ่นใจอย่างเต็มที่ และนี่คือขั้นตอนง่ายๆ ในการเตรียมรถก่อนทำการส่งมอบขนส่งกับทีมงาน WMS Transport:

1. ล้างทำความสะอาดตัวรถ: เพื่อช่วยให้คุณตรวจพบรอยขีดข่วนหรือตำหนิเดิมรอบตัวรถได้ง่ายก่อนทำการส่งมอบ
2. ถอดชิ้นส่วนแต่งหรืออุปกรณ์เสริมที่แตกหักง่าย: เช่น กระจกมองข้าง กล่องเก็บของด้านหลัง โทรศัพท์มือถือ หรือตัวยึดจับต่างๆ แยกแพ็กไว้ต่างหาก
3. เตรียมเอกสารสำคัญ: แนบสำเนาเล่มทะเบียนรถ (Green Book) หรือสำเนาสัญญาซื้อขาย และสำเนาบัตรประชาชนของผู้ส่งมอบ เพื่อใช้ตรวจสอบสิทธิ์ในกรณีด่านตรวจทางหลวง
4. ปริมาณน้ำมันในถัง: แนะนำให้มีน้ำมันหลงเหลืออยู่ในถังประมาณ 1 ใน 4 เพื่อป้องกันปัญหาน้ำมันรั่วซึมระหว่างการรัดตรึงและขนส่ง และยังมีน้ำมันเพียงพอให้สตาร์ทขับขี่ตอนปลายทาง
5. ตรวจสอบกุญแจและจดเลขไมล์: บันทึกเลขไมล์เดิมและสภาพรถโดยรวมด้วยภาพถ่ายหรือคลิปวิดีโอสั้นๆ ร่วมกับพนักงานขนส่งก่อนนำรถขึ้นแท่นรัดตรึง

ที่ WMS Transport เราใช้ระบบรัดยึดพิเศษ และการแพ็กกันรอยรอบคัน เพื่อให้มั่นใจว่ามอเตอร์ไซค์และบิ๊กไบค์ของคุณจะถึงปลายทางในสภาพที่สมบูรณ์แบบ 100%`
  },
  "moving-house-checklist": {
    title: "Checklist เตรียมย้ายบ้านใหม่ใน 7 วันแบบมือโปร",
    description: "วางแผนขนของย้ายบ้านอย่างไรให้ราบรื่น ไม่ตกหล่น ตั้งแต่วันเริ่มวางแผนไปจนถึงจัดระเบียบของเมื่อเข้าบ้านใหม่",
    date: "25 พ.ค. 2569",
    dateISO: "2026-05-25T08:00:00+07:00",
    image: "/images/WM11.webp",
    content: `การย้ายบ้านไม่จำเป็นต้องเป็นเรื่องชวนปวดหัวอีกต่อไป หากคุณมีการเตรียมพร้อมที่ดีล่วงหน้าอย่างเป็นระบบ WMS Transport ได้ออกแบบ Checklist แผนเตรียมตัวย้ายบ้านใน 7 วันแบบมือโปรมาฝากครับ:

- วันที่ 1-2: คัดแยกของและจัดกลุ่มสิ่งของ
  - เริ่มเคลียร์สิ่งของที่ไม่จำเป็น เสื้อผ้าเก่าที่ไม่ใช้ หรือเฟอร์นิเจอร์ชำรุด โดยแบ่งออกเป็น 3 กลุ่ม: ทิ้ง, บริจาค, หรือเก็บเพื่อนำไปบ้านใหม่
- วันที่ 3-4: จัดซื้ออุปกรณ์แพ็กเกจจิ้งและเริ่มแพ็กของที่ไม่ค่อยได้ใช้
  - เตรียมกล่องกระดาษ เทปกาว แอร์บับเบิล ปากกาเคมีเขียนกำกับ และเริ่มแพ็กของใช้ที่ไม่ได้จำเป็นในชีวิตประจำวัน เช่น หนังสือ ของตกแต่ง เสื้อผ้าต่างฤดู
- วันที่ 5: แพ็กของใช้ส่วนตัวและเสื้อผ้า
  - จัดกระเป๋าเดินทางแยกไว้สำหรับของใช้ส่วนตัว ยาประจำตัว เสื้อผ้า และของใช้จำเป็นเร่งด่วนสำหรับช่วง 1-2 วันแรกเมื่อไปถึงบ้านใหม่
- วันที่ 6: เตรียมเคลียร์เครื่องใช้ไฟฟ้าใหญ่
  - ทำความสะอาดตู้เย็น ถอดปลั๊ก ละลายน้ำแข็ง ม้วนเก็บสายไฟเครื่องซักผ้า มัดสายเคเบิลของทีวีและชุดโฮมเธียเตอร์ให้เรียบร้อย
- วันที่ 7: วันขนย้ายจริง!
  - ตรวจสอบความถูกต้องและจำนวนกล่อง ตรวจเช็กห้องทุกจุดว่าไม่มีของลืมทิ้งไว้ จากนั้นปล่อยให้เป็นหน้าที่ของพนักงานขนย้าย WMS Transport จัดเรียงของขึ้นรถและเดินทางอย่างปลอดภัย

การวางแผนอย่างเป็นขั้นตอนแบบนี้ จะช่วยลดความวุ่นวาย และประหยัดเวลาการจัดระเบียบบ้านใหม่ได้เป็นอย่างดีเลยครับ`
  }
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) {
    return {
      title: "ไม่พบหน้าบทความ | WMS TRANSPORT",
    };
  }
  return {
    title: `${post.title} | WMS TRANSPORT`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": `https://www.wmstransport.com${post.image}`,
    "datePublished": post.dateISO,
    "author": {
      "@type": "Organization",
      "name": "WMS TRANSPORT"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WMS TRANSPORT",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.wmstransport.com/logoWMS.png"
      }
    },
    "description": post.description
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Navbar />

      <main className="flex-grow pt-32 pb-24 md:pt-40 md:pb-36 relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[1000px] h-[1000px] bg-blue-600/[0.04] rounded-full blur-[200px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[1000px] h-[1000px] bg-indigo-500/[0.05] rounded-full blur-[250px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <span>← กลับไปยังหน้าบล็อก</span>
          </Link>

          <article>
            <header className="mb-12">
              <span className="text-sm text-blue-400 font-bold mb-3 inline-block">
                เผยแพร่เมื่อ {post.date}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-lg text-slate-300 font-medium leading-relaxed">
                {post.description}
              </p>
            </header>

            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Render formatted paragraphs */}
            <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-6 font-medium whitespace-pre-line">
              {post.content}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
