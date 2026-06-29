"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { categories } from "@/data/products";
import type { Product } from "@/data/products";
import { ArrowRight, Diamond, Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  allProducts: Product[];
  categoryImages?: Record<string, string>;
}

export default function ProductsContent({ allProducts, categoryImages = {} }: Props) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryParam = searchParams.get("category");
  const genderParam = searchParams.get("gender");

  const displayCategories = categories.filter(c => !["coins"].includes(c.id));

  const searchResults = searchQuery
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const NON_JEWELLERY = ["utensils", "german-silver", "silver-coated", "silver-idols", "silver-frames", "rakhi"];

  const filteredProducts = (categoryParam || genderParam)
    ? allProducts.filter(p => {
        const matchCategory = categoryParam ? p.category === categoryParam : true;
        const matchGender = genderParam ? p.gender === genderParam : true;
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
        <section className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-[28px] md:text-[36px] font-serif text-[#2c2c2c] tracking-[0.1em] uppercase mb-4 font-medium">
              Explore Categories
            </h2>
            <div className="flex items-center justify-center gap-3 mb-12 md:mb-20">
              <div className="h-[1px] w-14 bg-gray-200"></div>
              <Diamond size={12} className="text-gray-300" fill="currentColor" />
              <div className="h-[1px] w-14 bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-20">
              {displayCategories.map((cat) => {
                const HARDCODED: Record<string, string> = {
                  "men":           "/images/collections/men-category-new.png",
                  "women":         "/images/collections/women-category.png",
                  "brooches":      "/images/category/SILVER 925 BROOCH/BRO001.jpg",
                  "rings":         "/images/category/WOMEN RINGS/LR001.jpg",
                  "bracelets":     "/images/category/ladies braclete/LBR925001.jpg",
                  "chains":        "/images/category/MAINS CHAIN/MCH001.jpg",
                  "anklets":       "/images/category/Anklets/PYL011.jpg",
                  "toe-rings":     "/images/category/TOE RING BICHIYA/TR022P2.jpg",
                  "mangalsutra":   "/images/category/Mangalsutra/oxidised-floral-ruby-jade-pendant-mangalsutra.jpeg",
                  "earrings":      "/images/category/STUDS/JHUKA/EARRINGS/ER001.jpg",
                  "bangles":       "/images/category/LADIES BANGADI/LBNG 001.jpg",
                  "chain-pendants":"/images/category/CHAIN PANDENT/CHNP001.jpg",
                  "utensils":      "/images/products/silver-filigree-bottle-set.png",
                  "german-silver": "/images/category/GERMAN SILVER/GSIMP001.jpg",
                  "silver-coated": "/images/category/SILVER COATED/SLCO001.jpg",
                  "silver-idols":  "/images/category/SILVER IDOL 999/SL001.jpg",
                  "silver-frames": "/images/category/SILVER FRAMES/FR001.jpg",
                  "rakhi":         "/images/category/SILVER 925 RAKHI BRACELATE/RAKHI001.jpg",
                  "kadas":         "/images/category/PANJABI KADA MENS SEGMENT/PBK010.jpg",
                };
                // DB image overrides hardcoded; fallback to first product image
                const catImage = categoryImages[cat.slug]
                  || HARDCODED[cat.slug]
                  || allProducts.find(p => p.category === cat.slug)?.image
                  || "";

                return (
                  <Link
                    key={cat.id}
                    href={`/collections/${cat.slug}`}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative w-full aspect-[4/5] mb-6 md:mb-8 overflow-hidden bg-[#FAF8F5]">
                      {catImage ? (
                        <Image
                          src={catImage}
                          alt={cat.name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                          <span className="text-5xl font-serif text-gray-200">SS</span>
                          <span className="text-[9px] uppercase tracking-widest text-gray-300 font-bold">No Image</span>
                        </div>
                      )}
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
