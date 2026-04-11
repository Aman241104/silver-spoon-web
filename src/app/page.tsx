import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import Philosophy from "@/components/sections/Philosophy";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <Philosophy />
      {/* Featured Products or Testimonials can go here next */}
      <Footer />
    </main>
  );
}
