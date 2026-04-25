"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { products, categories } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const category = categories.find((c) => c.slug === slug);
  
  const filteredProducts = products.filter((p) => {
    if (slug === "men") return p.gender === "men";
    if (slug === "women") return p.gender === "women";
    return p.category === slug;
  });

  const containerRef = useGSAP(() => {
    gsap.from(".category-header-text", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
    });

    gsap.from(".product-grid-item", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: "power3.out",
      delay: 0.4,
    });
  }, [slug]);

  if (!category) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <h1 className="text-6xl font-serif mb-8 tracking-tighter">Collection Not Found</h1>
          <Link href="/" className="group relative inline-block overflow-hidden bg-gold text-charcoal px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 hover:bg-white">
            <span className="relative z-10">Return to Treasury</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      <Navbar />
      
      {/* Category Header */}
      <section className="pt-48 pb-24 bg-[#fcfcfc] border-b border-silver-100/50">
        <div className="container mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <nav className="category-header-text flex items-center gap-3 mb-10 text-[9px] uppercase tracking-[0.4em] text-charcoal/30 font-bold">
            <Link href="/" className="hover:text-gold transition-colors">Treasury</Link>
            <span className="text-silver-300">/</span>
            <Link href="/products" className="hover:text-gold transition-colors">Collections</Link>
            <span className="text-silver-300">/</span>
            <span className="text-gold italic">{category.name}</span>
          </nav>

          <div className="max-w-4xl">
            <h1 className="category-header-text text-6xl md:text-8xl font-serif text-charcoal mb-8 leading-[0.9] tracking-tighter">
               {category.name.split(' ').map((word, i) => (
                 <span key={i} className={i % 2 !== 0 ? "italic text-silver-400" : ""}>
                   {word}{' '}
                 </span>
               ))}
            </h1>
            <p className="category-header-text text-sm md:text-base text-charcoal/50 font-sans leading-relaxed tracking-widest uppercase max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8 border-b border-silver-100 pb-10">
             <div className="flex items-center gap-4">
                <span className="w-10 h-[1px] bg-gold" />
                <p className="text-[9px] uppercase tracking-[0.5em] text-charcoal/40 font-bold">
                   Displaying {filteredProducts.length} Artisan Pieces
                </p>
             </div>
             <div className="flex gap-10 text-[9px] uppercase tracking-[0.4em] font-bold text-charcoal/60">
                <button className="text-charcoal border-b border-gold pb-1">All Pieces</button>
                <button className="hover:text-gold transition-colors pb-1 border-b border-transparent">New Arrivals</button>
                <button className="hover:text-gold transition-colors pb-1 border-b border-transparent">Masterpieces</button>
             </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-grid-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center">
              <div className="w-20 h-[1px] bg-silver-200 mx-auto mb-10" />
              <p className="font-serif text-3xl text-charcoal/20 italic tracking-tight">The treasury is currently being replenished.</p>
              <Link href="/products" className="inline-block mt-8 text-[10px] uppercase tracking-[0.4em] font-bold text-gold hover:text-charcoal transition-colors">Explore Other Collections ✦</Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

