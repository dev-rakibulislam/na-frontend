"use client";
import HeroSection from "@/components/home/hero-section";
import AnnouncementBar from "@/components/public/anouncment-bar";
import Banner from "@/components/public/banner";
import Footer from "@/components/public/footer";
import Header from "@/components/public/header";

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
