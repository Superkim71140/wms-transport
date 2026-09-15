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
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden text-slate-900">
      <main className="flex-1 relative">
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
