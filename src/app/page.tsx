import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import PromoBanners from "@/components/sections/PromoBanners";
import TopSellers from "@/components/sections/TopSellers";
import PolicySection from "@/components/sections/PolicySection";
import CategoryGrid from "@/components/sections/CategoryGrid";
import CollectionByColor from "@/components/sections/CollectionByColor";
import BudgetGifting from "@/components/sections/BudgetGifting";
import CuratedCollections from "@/components/sections/CuratedCollections";
import SpecialFeatures from "@/components/sections/SpecialFeatures";
import BrandPromise from "@/components/sections/BrandPromise";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PromoBanners />
      <TopSellers title="Top Seller" />
      <PolicySection />
      <CategoryGrid />
      <TopSellers title="Our New Products" />
      <CollectionByColor />
      <BudgetGifting />
      <CuratedCollections />
      <SpecialFeatures />
      <BrandPromise />
      <Footer />
    </main>
  );
}
