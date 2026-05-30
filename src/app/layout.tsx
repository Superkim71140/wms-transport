import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "บริการรถกระบะตู้ทึบ รับส่งทั่วไทย & บริการย้ายบ้าน | WMS TRANSPORT",
  description: "บริการรถกระบะตู้ทึบรับจ้าง ย้ายหอ คอนโด บ้าน ขนส่งด่วนภายในวันเดียว ขนส่งสินค้าและมอเตอร์ไซค์ทั่วไทย พร้อมทีมงานคนยกของมืออาชีพ ปลอดภัย มีประกันสินค้า ประเมินราคาฟรี 24 ชม.",
  keywords: [
    "รถกระบะตู้ทึบรับจ้าง",
    "ย้ายหอ",
    "ย้ายคอนโด",
    "ย้ายบ้าน",
    "รับส่งสินค้าทั่วไทย",
    "ขนส่งด่วน",
    "ขนส่งมอเตอร์ไซค์",
    "บริการพร้อมคนยกของ",
    "WMS Transport",
    "รถรับจ้างตู้ทึบ"
  ],
  authors: [{ name: "WMS TRANSPORT" }],
  icons: {
    icon: "/logoWMS.png",
    shortcut: "/logoWMS.png",
    apple: "/logoWMS.png",
  },
  openGraph: {
    title: "บริการรถกระบะตู้ทึบ รับส่งทั่วไทย & บริการย้ายบ้าน | WMS TRANSPORT",
    description: "ขนส่งด่วนทั่วไทย บริการพร้อมคนยกของ มีประกันสินค้า ประเมินราคาฟรี 24 ชม.",
    type: "website",
    locale: "th_TH",
    siteName: "WMS TRANSPORT",
  },
  twitter: {
    card: "summary_large_image",
    title: "บริการรถกระบะตู้ทึบ รับส่งทั่วไทย & บริการย้ายบ้าน | WMS TRANSPORT",
    description: "ขนส่งด่วนทั่วไทย บริการพร้อมคนยกของ มีประกันสินค้า ประเมินราคาฟรี 24 ชม.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${notoSansThai.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-[#040b15] text-slate-200 selection:bg-red-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
