import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CategoryGrid from "@/components/sections/CategoryGrid";
import ExploreCollections from "@/components/sections/ExploreCollections";
import Features from "@/components/sections/Features";
import Philosophy from "@/components/sections/Philosophy";
import BrandPromise from "@/components/sections/BrandPromise";
import Newsletter from "@/components/sections/Newsletter";
import WeeklyCollection from "@/components/sections/WeeklyCollection";
import OffersSection from "@/components/sections/OffersSection";
import { getWeeklyProducts, getCollections, getActiveOffers } from "@/lib/db";

async function WeeklySection() {
  const products = await getWeeklyProducts();
  return <WeeklyCollection products={products} />;
}

async function CollectionsSection() {
  const collections = await getCollections();
  return <ExploreCollections collections={collections} />;
}

async function PromotionsSection() {
  const offers = await getActiveOffers();
  return <OffersSection offers={offers} />;
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="h-[500px] bg-[#FAF8F5]" />}>
        <WeeklySection />
      </Suspense>
      <Suspense fallback={<div className="h-[200px] bg-[#FAF8F5]" />}>
        <PromotionsSection />
      </Suspense>
      <CategoryGrid />
      <Suspense fallback={<div className="h-[500px] bg-white" />}>
        <CollectionsSection />
      </Suspense>
      <Philosophy />
      <BrandPromise />
      <Features />
      <Newsletter />
      <Footer />
    </main>
  );
}
