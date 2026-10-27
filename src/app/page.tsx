"use client";
import HeroSection from "@/components/home/hero-section";
import AnnouncementBar from "@/components/layout/public/anouncment-bar";
import Banner from "@/components/layout/public/banner";
import Footer from "@/components/layout/public/footer";
import Header from "@/components/layout/public/header";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <Banner />
      <Footer />
    </>
  );
}
/***
 * Announcement Bar →
 *  Header →
 *  Hero Banner →
 *
 * Categories → Featured Products → Best Sellers → Promotional Banner → New Arrivals → Benefits → Customer Reviews → Newsletter → Footer
 */
