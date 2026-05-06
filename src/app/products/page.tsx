"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { categories, products } from "@/data/products";
import { ArrowRight, Diamond } from "lucide-react";

export default function ProductsOverviewPage() {
  // Filter out meta-categories if necessary, but here we'll show the main display ones
  const displayCategories = categories.filter(c => !["men", "women", "coins"].includes(c.id));

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold mb-6">
              THE TREASURY
            </span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium">
              Curated <br /> Collections
            </h1>
            <p className="text-[#5a5a5a] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Discover a legacy crafted in pure silver. Each piece tells a story of devotion, tradition, and timeless elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-[32px] md:text-[36px] font-serif text-[#2c2c2c] tracking-[0.1em] uppercase mb-4 font-medium">
            Explore Categories
          </h2>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-20">
            <div className="h-[1px] w-14 bg-gray-200"></div>
            <Diamond size={12} className="text-gray-300" fill="currentColor" />
            <div className="h-[1px] w-14 bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {displayCategories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/collections/${cat.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative w-full aspect-[4/5] mb-8 overflow-hidden bg-[#FAF8F5]">
                   <Image 
                     src={products.find(p => p.category === cat.slug)?.image || "/images/collections/jewellery.png"}
                     alt={cat.name}
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-105 mix-blend-multiply"
                   />
                </div>
                
                <h3 className="text-[22px] md:text-[24px] font-serif text-[#2c2c2c] mb-3 tracking-wide uppercase font-medium">
                  {cat.name}
                </h3>
                
                <p className="text-[13px] text-gray-500 mb-6 max-w-xs leading-relaxed">
                  {cat.description}
                </p>

                <span className="text-[12px] text-gray-400 group-hover:text-charcoal transition-all font-bold tracking-widest uppercase flex items-center gap-2">
                  View Collection <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
