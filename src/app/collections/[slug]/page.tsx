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
  const filteredProducts = products.filter((p) => p.category === slug);

  const containerRef = useGSAP(() => {
    gsap.from(".category-header-text", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.from(".product-grid-item", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.2,
    });
  }, [slug]);

  if (!category) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Category Not Found</h1>
          <Link href="/" className="text-gold uppercase tracking-ultra text-xs font-bold">Return Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      <Navbar />
      
      {/* Category Header */}
      <section className="pt-40 pb-20 bg-silver-50">
        <div className="container mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <nav className="category-header-text flex items-center gap-2 mb-8 text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-charcoal">Collections</span>
            <ChevronRight size={10} />
            <span className="text-gold">{category.name}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="category-header-text text-5xl md:text-6xl font-serif text-charcoal mb-6">
              {category.name}
            </h1>
            <p className="category-header-text text-base md:text-lg text-charcoal/60 font-sans leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold">
                Showing {filteredProducts.length} Results
             </p>
             <div className="flex gap-8 text-[10px] uppercase tracking-ultra font-bold text-charcoal">
                <button className="pb-1 border-b border-charcoal">All Items</button>
                <button className="pb-1 border-transparent hover:border-charcoal/20 transition-all">New Arrivals</button>
                <button className="pb-1 border-transparent hover:border-charcoal/20 transition-all">Popular</button>
             </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-grid-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl text-charcoal/30 italic">No products found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
