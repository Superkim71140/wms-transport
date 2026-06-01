import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioHero from "@/components/portfolio/PortfolioHero";

import PortfolioProcess from "@/components/portfolio/PortfolioProcess";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import DeliveryMap from "@/components/portfolio/DeliveryMap";
import CustomerReviews from "@/components/portfolio/CustomerReviews";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

export const metadata: Metadata = {
  title: "ผลงานขนส่งของเรา | WMS Transport",
  description: "รวมผลงานและรีวิวการขนย้ายสินค้าจากลูกค้าทั่วประเทศไทย โดยทีมงานคุณภาพ WMS Transport พร้อมบริการด้วยมาตรฐานสากล",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 relative">
        {/* Global background effects matching homepage */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-[5%] left-[-5%] w-[1200px] h-[1200px] bg-blue-600/[0.04] rounded-full blur-[200px]" />
          <div className="absolute top-[50%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-500/[0.05] rounded-full blur-[250px]" />
          <div className="absolute bottom-[5%] left-[-10%] w-[1400px] h-[1400px] bg-sky-500/[0.03] rounded-full blur-[250px]" />
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

      <Footer />
    </div>
  );
}
