"use client";

import * as React from "react";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { categories, products } from "@/data/products";
import { ArrowRight, Diamond, Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";

export default function ProductsOverviewPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Diamond size={48} className="text-gray-200 mb-4" />
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Loading Collection...</p>
        </div>
      </main>
    }>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryParam = searchParams.get("category");
  const genderParam = searchParams.get("gender");

  // Filter out meta-categories if necessary, but here we'll show the main display ones
  const displayCategories = categories.filter(c => !["coins"].includes(c.id));

  const searchResults = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const NON_JEWELLERY = ["utensils", "german-silver", "silver-coated", "silver-idols", "silver-frames", "rakhi"];

  const filteredProducts = (categoryParam || genderParam)
    ? products.filter(p => {
        const matchCategory = categoryParam ? p.category === categoryParam : true;
        const matchGender = genderParam ? (p.gender === genderParam || p.gender === "unisex") : true;
        // Exclude kitchenware/puja/gifting items from gender browsing pages
        const isGenderBrowse = genderParam && !categoryParam;
        if (isGenderBrowse && NON_JEWELLERY.includes(p.category)) return false;
        return matchCategory && matchGender;
      })
    : null;

  const filterLabel = categoryParam
    ? categories.find(c => c.slug === categoryParam)?.name ?? categoryParam
    : genderParam === "men" ? "Men's Collection" : genderParam === "women" ? "Women's Collection" : null;

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold mb-4 md:mb-6">
              THE COLLECTION
            </span>
            <h1 className="text-[36px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-6 md:mb-8 tracking-tight font-medium">
              {searchQuery ? `Search: ${searchQuery}` : filterLabel ? filterLabel : <>Curated <br /> Collections</>}
            </h1>
            <p className="text-[#5a5a5a] text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
              {searchQuery
                ? `Discovered ${searchResults.length} artisan pieces matching your search.`
                : filteredProducts
                ? `${filteredProducts.length} piece${filteredProducts.length !== 1 ? "s" : ""} found.`
                : "Discover a legacy crafted in pure silver. Each piece tells a story of devotion, tradition, and timeless elegance."
              }
            </p>
          </div>
        </div>
      </section>

      {searchQuery ? (
        /* Search Results Grid */
        <section className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center">
                <SearchIcon size={48} className="text-gray-200 mb-8" strokeWidth={1} />
                <p className="font-serif text-3xl text-gray-300 italic tracking-tight mb-8">No pieces found matching &quot;{searchQuery}&quot;</p>
                <Link href="/products" className="text-[11px] uppercase tracking-widest font-bold text-charcoal border-b border-charcoal pb-1">View All Collections</Link>
              </div>
            )}
          </div>
        </section>
      ) : filteredProducts ? (
        /* Category / Gender Filtered Grid */
        <section className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center">
                <Diamond size={48} className="text-gray-200 mb-8" strokeWidth={1} />
                <p className="font-serif text-3xl text-gray-300 italic tracking-tight mb-8">No pieces found in this category</p>
                <Link href="/products" className="text-[11px] uppercase tracking-widest font-bold text-charcoal border-b border-charcoal pb-1">View All Collections</Link>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Categories Grid */
        <section className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-[28px] md:text-[36px] font-serif text-[#2c2c2c] tracking-[0.1em] uppercase mb-4 font-medium">
              Explore Categories
            </h2>
            
            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-12 md:mb-20">
              <div className="h-[1px] w-14 bg-gray-200"></div>
              <Diamond size={12} className="text-gray-300" fill="currentColor" />
              <div className="h-[1px] w-14 bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-20">
              {displayCategories.map((cat) => {
                const PLACEHOLDER = "/images/placeholder-need-image.svg";
                const categoryImageMap: Record<string, string> = {
                  "men":           "/images/collections/men-category-new.png",
                  "women":         "/images/collections/women-category.png",
                  "brooches":      "/images/category/SILVER 925 BROOCH/BRO001.png",
                  "rings":         "/images/category/WOMEN RINGS/LR001.png",
                  "bracelets":     "/images/category/ladies braclete/LBR925001.png",
                  "chains":        "/images/category/CHAIN PANDENT/CHNP001.png",
                  "anklets":       PLACEHOLDER,
                  "toe-rings":     PLACEHOLDER,
                  "mangalsutra":   PLACEHOLDER,
                  "earrings":      "/images/category/STUDS/JHUKA/EARRINGS/ER001.png",
                  "bangles":       "/images/category/LADIES BANGADI/LBNG 001.png",
                  "chain-pendants":"/images/category/CHAIN PANDENT/CHNP001.png",
                  "utensils":      "/images/products/pooja-utensils.png",
                  "german-silver": "/images/category/GERMAN SILVER/GSIMP001.png",
                  "silver-coated": "/images/category/SILVER COATED/SLCO001.png",
                  "silver-idols":  "/images/category/SILVER IDOL 999/SL001.png",
                  "silver-frames": "/images/category/SILVER FRAMES/FR001.png",
                  "rakhi":         PLACEHOLDER,
                  "kadas":         PLACEHOLDER,
                };
                const catImage = categoryImageMap[cat.slug]
                  ?? products.find(p => p.category === cat.slug)?.image
                  ?? "/images/category/SILVER 925 BROOCH/BRO001.png";

                return (
                  <Link 
                    key={cat.id} 
                    href={`/collections/${cat.slug}`}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative w-full aspect-[4/5] mb-6 md:mb-8 overflow-hidden bg-[#FAF8F5]">
                       <Image 
                         src={catImage}
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
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
