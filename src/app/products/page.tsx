"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { categories, products } from "@/data/products";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function ProductsOverviewPage() {
  const containerRef = useGSAP(() => {
    gsap.from(".product-cat-card", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  });

  // Filter out the meta-categories like "men", "women" if they don't have images in this view
  const displayCategories = categories.filter(c => !["men", "women", "coins"].includes(c.id));

  return (
    <main ref={containerRef} className="min-h-screen bg-white text-charcoal">
      <Navbar />

      <section className="pt-48 pb-24 bg-[#0a0a0a] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <div className="w-[1000px] h-[1000px] border border-white rounded-full -mr-80 -mt-40" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-10 border-l-2 border-gold pl-6">The Vault of Artisan Silver</p>
            <h1 className="text-6xl md:text-9xl font-serif mb-12 leading-[0.85] tracking-tighter">
              Curated <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-silver-200 to-white/40">Collections.</span>
            </h1>
            <p className="text-sm md:text-base text-white/40 font-sans leading-loose tracking-[0.2em] uppercase max-w-2xl">
              Discover a legacy crafted in pure silver. Each piece tells a story of devotion, tradition, and timeless elegance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {displayCategories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/collections/${cat.slug}`}
                className="product-cat-card group block"
              >
                <div className="relative aspect-[3/4] mb-10 overflow-hidden bg-[#fcfcfc] border border-silver-100/50 shadow-sm group-hover:shadow-2xl transition-all duration-1000">
                   <Image 
                     src={products.find(p => p.category === cat.slug)?.image || "/images/collections/jewellery.png"}
                     alt={cat.name}
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-all duration-700" />
                   
                   {/* Overlay Link */}
                   <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                      <div className="bg-white/90 backdrop-blur-xl px-8 py-4 flex items-center gap-4 w-full shadow-2xl">
                         <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal">Enter Collection</span>
                         <ArrowRight size={14} className="text-gold ml-auto" />
                      </div>
                   </div>
                </div>
                
                <div className="px-2">
                  <div className="flex justify-between items-end mb-6">
                    <h2 className="text-4xl font-serif text-charcoal group-hover:text-gold transition-all duration-700 tracking-tighter">
                      {cat.name}
                    </h2>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold opacity-0 group-hover:opacity-100 transition-all duration-700">
                       {products.filter(p => p.category === cat.slug).length} Pieces
                    </span>
                  </div>
                  
                  <p className="text-[9px] text-charcoal/40 font-sans leading-relaxed mb-8 uppercase tracking-[0.3em] font-bold h-12 overflow-hidden line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="w-12 h-[1px] bg-silver-200 group-hover:w-full group-hover:bg-gold transition-all duration-700" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
