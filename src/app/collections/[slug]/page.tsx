"use client";

import * as React from "react";
import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { Diamond, ChevronDown } from "lucide-react";

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Diamond size={48} className="text-gray-200 mb-4" />
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Loading Collection...</p>
        </div>
      </main>
    }>
      <CategoryContent />
    </Suspense>
  );
}

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const genderFilter = searchParams.get("gender");
  
  const [priceFilter, setPriceFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("featured");

  const category = categories.find((c) => c.slug === slug);
  
  const filteredProducts = products.filter((p) => {
    // 1. Category/Gender Filter
    let matchesCategory = false;
    if (slug === "men") matchesCategory = p.gender === "men";
    else if (slug === "women") matchesCategory = p.gender === "women";
    else matchesCategory = p.category === slug;

    if (!matchesCategory) return false;

    // 2. Gender Sub-filter (if provided via query param)
    if (genderFilter && p.gender !== genderFilter) return false;

    // 3. Price Filter
    if (priceFilter === "under-2000") return p.price < 2000;
    if (priceFilter === "2000-5000") return p.price >= 2000 && p.price <= 5000;
    if (priceFilter === "5000-10000") return p.price > 5000 && p.price <= 10000;
    if (priceFilter === "over-10000") return p.price > 10000;

    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0; // default (featured/newest)
  });

  if (!category) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5] text-charcoal font-sans">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-8 tracking-tighter">Collection Not Found</h1>
          <Link href="/products" className="bg-[#1a1a1a] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
            Return to Treasury
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Category Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6 md:mb-8 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-charcoal transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-charcoal">{category.name}</span>
          </nav>

          <h1 className="text-[36px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-6 md:mb-8 tracking-tight font-medium uppercase">
             {category.name} {genderFilter && <span className="text-gray-400">for {genderFilter}</span>}
          </h1>
          <p className="text-[#5a5a5a] text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-20 gap-6 md:gap-8 border-b border-gray-100 pb-8 md:pb-10">
             <div className="flex items-center gap-4">
                <span className="w-10 h-[1px] bg-gray-300" />
                <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                   Displaying {filteredProducts.length} Artisan Pieces
                </p>
             </div>

             <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                {/* Sort By */}
                <div className="relative group">
                   <button className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c] bg-[#FAF8F5] px-4 py-2 rounded-sm border border-gray-100 hover:border-gray-200 transition-all">
                      Sort By: {sortBy === "featured" ? "Featured" : sortBy.replace("-", " ").toUpperCase()}
                      <ChevronDown size={14} />
                   </button>
                   <div className="absolute top-full right-0 mt-1 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100 py-2">
                      <button onClick={() => setSortBy("featured")} className="w-full text-left px-4 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Featured</button>
                      <button onClick={() => setSortBy("price-asc")} className="w-full text-left px-4 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Price: Low to High</button>
                      <button onClick={() => setSortBy("price-desc")} className="w-full text-left px-4 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Price: High to Low</button>
                      <button onClick={() => setSortBy("name-asc")} className="w-full text-left px-4 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Name: A-Z</button>
                   </div>
                </div>

                {/* Price Filter */}
                <div className="relative group">
                   <button className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c] bg-[#FAF8F5] px-4 py-2 rounded-sm border border-gray-100 hover:border-gray-200 transition-all">
                      Price: {priceFilter === "all" ? "All" : priceFilter.replace("-", " ").toUpperCase()}
                      <ChevronDown size={14} />
                   </button>
                   <div className="absolute top-full right-0 mt-1 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100 py-2">
                      <button onClick={() => setPriceFilter("all")} className="w-full text-left px-4 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">All Prices</button>
                      <button onClick={() => setPriceFilter("under-2000")} className="w-full text-left px-4 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Under ₹2,000</button>
                      <button onClick={() => setPriceFilter("2000-5000")} className="w-full text-left px-4 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">₹2,000 - ₹5,000</button>
                      <button onClick={() => setPriceFilter("5000-10000")} className="w-full text-left px-4 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">₹5,000 - ₹10,000</button>
                      <button onClick={() => setPriceFilter("over-10000")} className="w-full text-left px-4 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Over ₹10,000</button>
                   </div>
                </div>

                </div>
                </div>
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {sortedProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center flex flex-col items-center">
              <Diamond size={24} className="text-gray-200 mb-8" strokeWidth={1} />
              <p className="font-serif text-3xl text-gray-300 italic tracking-tight mb-8">No pieces match your current filters.</p>
              <button onClick={() => {setPriceFilter("all")}} className="text-[11px] uppercase tracking-widest font-bold text-charcoal border-b border-charcoal pb-1">Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
