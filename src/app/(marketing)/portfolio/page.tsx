import { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/PortfolioHero";

import PortfolioProcess from "@/components/portfolio/PortfolioProcess";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import DeliveryMap from "@/components/portfolio/DeliveryMap";
import CustomerReviews from "@/components/portfolio/CustomerReviews";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

export const metadata: Metadata = {
  title: "ผลงานขนส่งของเรา | WMS Transport",
  description: "รวมผลงานและรีวิวการขนย้ายสินค้าจากลูกค้าทั่วประเทศไทย โดยทีมงานคุณภาพ WMS Transport พร้อมบริการด้วยมาตรฐานสากล",
  alternates: {
    canonical: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden">
      <main className="flex-1 relative">
        {/* Global background effects matching homepage */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-[5%] left-[-5%] w-[1200px] h-[1200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent" />
          <div className="absolute top-[50%] right-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-indigo-500/5 to-transparent" />
          <div className="absolute bottom-[5%] left-[-10%] w-[1400px] h-[1400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-sky-500/5 to-transparent" />
        </div>
        <div className="relative z-10">
          <PortfolioHero />

          <PortfolioGallery />
          <DeliveryMap />
          <PortfolioProcess />
          <CustomerReviews />
          <PortfolioCTA />
        </div>
      </main>

      </div>
  );
}
