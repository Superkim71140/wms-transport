import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import AchievementStats from "@/components/portfolio/AchievementStats";
import FeaturedPortfolio from "@/components/portfolio/FeaturedPortfolio";
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
    <div className="min-h-screen flex flex-col bg-gray-bg dark:bg-navy-dark overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1">
        <PortfolioHero />
        <AchievementStats />
        <FeaturedPortfolio />
        <PortfolioProcess />
        <PortfolioGallery />
        <CustomerReviews />
        <DeliveryMap />
        <PortfolioCTA />
      </main>

      <Footer />
    </div>
  );
}
