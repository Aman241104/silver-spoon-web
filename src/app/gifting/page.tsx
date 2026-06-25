"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Gift, ArrowRight, Sparkles } from "lucide-react";

export default function GiftingOverviewPage() {
  const giftCategories = [
    {
      title: "German Silver",
      description: "Functional and decorative artisan pieces with a timeless silver-like luster.",
      href: "/collections/german-silver",
      image: "/images/category/GERMAN SILVER/GSIMP001.jpg"
    },
    {
      title: "Silver Coated",
      description: "Exquisite showpieces and spiritual items with a brilliant silver finish.",
      href: "/collections/silver-coated",
      image: "/images/category/SILVER COATED/SLCO001.jpg"
    },
    {
      title: "Silver Idols",
      description: "High-purity 999/925 silver idols of divine deities and spiritual symbols.",
      href: "/collections/silver-idols",
      image: "/images/category/SILVER IDOL 999/SL001.jpg"
    },
    {
      title: "Silver Frames",
      description: "Sacred 999 silver frames and murtis for homes and offices.",
      href: "/collections/silver-frames",
      image: "/images/category/SILVER FRAMES/FR001.jpg"
    },
    {
      title: "Rakhi Collection",
      description: "Pure 925 silver rakhis and festive sets for Raksha Bandhan.",
      href: "/collections/rakhi",
      image: "/images/category/SILVER 925 RAKHI BRACELATE/RAKHI001.jpg"
    }
  ];

  const giftingServices = [
    {
      title: "Corporate Gifting",
      description: "Executive gifts for partners and employees with custom branding and bulk fulfillment.",
      href: "/corporate",
      icon: <Gift size={24} className="text-gold" />,
    }
  ];

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-gold font-bold mb-6">
            ART OF GIVING
          </span>
          <h1 className="text-[36px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium uppercase">
            The Gifting <br /> Experience
          </h1>
          <p className="text-[#5a5a5a] text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
            Make every celebration unforgettable with our curated gifting collections. From sacred idols to elegant German silver decor.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftCategories.map((category) => (
              <Link key={category.title} href={category.href} className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-gray-100">
                <Image 
                  src={category.image} 
                  alt={category.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-serif text-white mb-2 uppercase tracking-tight">{category.title}</h3>
                  <p className="text-[11px] text-white/70 uppercase tracking-widest font-bold mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white border-b border-white/30 pb-1 w-fit">
                    Shop Collection <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2c2c2c] mb-6">Bespoke Gifting Services</h2>
            <div className="w-20 h-px bg-gold/50 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 max-w-5xl mx-auto">
            {giftingServices.map((service) => (
              <div key={service.title} className="group flex flex-col items-center text-center bg-white p-10 md:p-12 rounded-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 flex items-center justify-center bg-[#FAF8F5] rounded-full mb-8 shadow-sm group-hover:bg-gold group-hover:text-white transition-all">
                   {service.icon}
                </div>
                <h3 className="text-2xl font-serif text-[#2c2c2c] mb-4 uppercase tracking-tight">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-sm">
                   {service.description}
                </p>
                <Link href={service.href} className="text-[10px] uppercase tracking-widest font-bold text-charcoal flex items-center gap-3 group-hover:text-gold transition-colors mt-auto">
                   Explore Service <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Banner */}
      <section className="py-24 bg-white overflow-hidden">
         <div className="container mx-auto px-6 md:px-12">
            <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-charcoal rounded-sm overflow-hidden flex items-center justify-center">
               <Image 
                 src="/images/newsletter-bg.png" 
                 alt="Gifting Banner" 
                 fill 
                 className="object-cover opacity-30"
               />
               <div className="relative z-10 text-center px-6">
                  <h2 className="text-2xl md:text-4xl font-serif text-white mb-8 italic">Every gift tells a story. Let us help you write yours.</h2>
                  <Link href="/products" className="inline-block bg-white text-black px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-silver-100 transition-all">
                     View All Products
                  </Link>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
