"use client";

import * as React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Diamond, Heart, Award, Star } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Years of Experience in Jewellery Making", value: "40+" },
    { label: "Clients", value: "500+" },
    { label: "Designs", value: "100+" },
    { label: "Purity Rating", value: "99.9%" },
  ];

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold mb-6">
              OUR STORY
            </span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium">
              A Legacy of Purity <br /> & Timeless Elegance
            </h1>
            <p className="text-[#5a5a5a] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Since 2019, Silver Spoon has been a sanctuary for those who appreciate the timeless beauty and divine aura of pure silver.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Image Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden">
              <Image 
                src="/images/collections/pooja.png"
                alt="Silver Craftsmanship"
                fill
                className="object-cover mix-blend-multiply"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col">
              <h2 className="text-[32px] md:text-[42px] font-serif text-[#2c2c2c] leading-tight mb-8 font-medium uppercase tracking-tight">
                Redefining the Silver <br /> Experience
              </h2>
              <div className="space-y-6 text-[#5a5a5a] leading-relaxed text-[15px] md:text-[16px]">
                <p>
                  Silver Spoon was born from a vision to bring the highest quality silver products to discerning customers who seek both aesthetic appeal and material integrity.
                </p>
                <p>
                  Over the past two decades, we have evolved from a small family-run workshop into a premier destination for silver jewellery, pooja idols, and luxury gifting items. Our journey is defined by a relentless pursuit of perfection and a deep respect for Indian silver-working traditions.
                </p>
                <p>
                  Every piece in our collection is meticulously inspected for purity and craftsmanship, ensuring that what you take home is not just an object, but a treasure that lasts for generations.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-10 pt-12 mt-12 border-t border-gray-100">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[28px] font-serif text-[#2c2c2c] mb-1">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Values Section */}
      <section className="py-12 md:py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-[28px] md:text-[36px] font-serif text-[#2c2c2c] tracking-[0.1em] uppercase mb-4 font-medium">
            Our Core Values
          </h2>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-12 md:mb-20">
            <div className="h-[1px] w-14 bg-gray-200"></div>
            <Diamond size={12} className="text-gray-300" fill="currentColor" />
            <div className="h-[1px] w-14 bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-full text-charcoal mb-8 bg-white shadow-sm group-hover:border-gray-300 transition-all">
                <Heart size={28} strokeWidth={1} />
              </div>
              <h3 className="text-[16px] font-bold text-[#2c2c2c] mb-4 uppercase tracking-wider">Authenticity</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs">We guarantee the highest standards of silver purity, hallmarked and certified for your trust.</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-full text-charcoal mb-8 bg-white shadow-sm group-hover:border-gray-300 transition-all">
                <Award size={28} strokeWidth={1} />
              </div>
              <h3 className="text-[16px] font-bold text-[#2c2c2c] mb-4 uppercase tracking-wider">Craftsmanship</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs">Our pieces are handcrafted by master artisans who blend traditional techniques with modern aesthetics.</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-full text-charcoal mb-8 bg-white shadow-sm group-hover:border-gray-300 transition-all">
                <Star size={28} strokeWidth={1} />
              </div>
              <h3 className="text-[16px] font-bold text-[#2c2c2c] mb-4 uppercase tracking-wider">Integrity</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs">Transparency in pricing and quality is the cornerstone of our long-standing relationship with customers.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
