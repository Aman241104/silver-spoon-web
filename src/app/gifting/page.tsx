"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Gift, Package, ArrowRight } from "lucide-react";

export default function GiftingOverviewPage() {
  const giftingServices = [
    {
      title: "Gifting Concierge",
      description: "Let our digital assistant help you find the perfect gift based on the occasion and recipient.",
      href: "/gifting/concierge",
      icon: <Sparkles size={24} className="text-gold" />,
      image: "/images/collections/gifting-collection.png"
    },
    {
      title: "Build A Gift Box",
      description: "Customise a premium gift set with your choice of artisan silver pieces and luxury packaging.",
      href: "/gifting/build-a-box",
      icon: <Package size={24} className="text-gold" />,
      image: "/images/collections/gifts-hampers.png"
    },
    {
      title: "Corporate Gifting",
      description: "Executive gifts for partners and employees with custom branding and bulk fulfillment.",
      href: "/corporate",
      icon: <Gift size={24} className="text-gold" />,
      image: "/images/collections/corporate-gifting.png"
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
            Make every celebration unforgettable with our curated gifting services. From personal tokens of affection to grand corporate gestures.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
            {giftingServices.map((service) => (
              <div key={service.title} className="group flex flex-col items-start bg-[#FAF8F5] p-8 md:p-10 rounded-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-10 shadow-sm">
                   {service.icon}
                </div>
                <h3 className="text-2xl font-serif text-[#2c2c2c] mb-4 uppercase tracking-tight">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-10 min-h-[60px]">
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
