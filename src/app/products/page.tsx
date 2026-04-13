"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { categories, products } from "@/data/products";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";

export default function ProductsOverviewPage() {
  const containerRef = useGSAP(() => {
    gsap.from(".product-cat-card", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  });

  // Filter out the meta-categories like "men", "women" if they don't have images in this view
  const displayCategories = categories.filter(c => !["men", "women", "coins"].includes(c.id));

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-40 pb-20 bg-silver-50">
        <div className="container mx-auto px-6 md:px-12 text-center lg:text-left">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-gold font-bold mb-6">Our Treasury</p>
            <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8 leading-tight">
              Curated <span className="italic text-silver-400">Collections</span>
            </h1>
            <p className="text-base md:text-lg text-charcoal/60 font-sans leading-relaxed">
              Discover our comprehensive range of pure silver craftsmanship. Each category represents a unique facet of our heritage, designed for the discerning individual.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {displayCategories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/collections/${cat.slug}`}
                className="product-cat-card group block"
              >
                <div className="relative aspect-[16/9] mb-8 overflow-hidden bg-silver-50 border border-silver-100">
                   {/* Finding an image from products for this category or using a general one */}
                   <Image 
                     src={products.find(p => p.category === cat.slug)?.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"}
                     alt={cat.name}
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="flex justify-between items-end mb-4">
                  <h2 className="text-3xl font-serif text-charcoal group-hover:text-gold transition-colors">
                    {cat.name}
                  </h2>
                  <ChevronRight size={20} className="text-gold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </div>
                
                <p className="text-xs text-charcoal/50 font-sans leading-relaxed mb-6 h-8 overflow-hidden line-clamp-2 uppercase tracking-widest font-bold">
                  {cat.description}
                </p>

                {cat.subCategories && (
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-silver-100">
                    {cat.subCategories.slice(0, 3).map((sub) => (
                      <span key={sub} className="text-[8px] uppercase tracking-widest px-4 py-1.5 border border-silver-200 text-charcoal/40 font-bold rounded-full">
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
