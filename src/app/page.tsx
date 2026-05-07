import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CategoryGrid from "@/components/sections/CategoryGrid";
import ExploreCollections from "@/components/sections/ExploreCollections";
import Features from "@/components/sections/Features";
import Philosophy from "@/components/sections/Philosophy";
import BrandPromise from "@/components/sections/BrandPromise";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <ExploreCollections />
      <Philosophy />
      <BrandPromise />
      <Features />
      <Newsletter />
      <Footer />
    </main>
  );
}
