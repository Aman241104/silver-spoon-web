"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { ArrowUpRight, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="group block relative">
      <Link
        href={`/product/${product.id}`}
        className="block"
      >
        <div className="relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden mb-6 border border-silver-100/50 shadow-sm group-hover:shadow-2xl transition-all duration-700">
          {/* Actual Product Image */}
          <div className="w-full h-full relative transition-transform duration-1000 ease-out group-hover:scale-110">
             <Image 
               src={product.image} 
               alt={product.name}
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
             />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-all duration-700" />
          
          {/* Quick View Button */}
          <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
             <div className="bg-white/90 backdrop-blur-md py-4 flex items-center justify-center gap-3 border-t border-silver-100">
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-charcoal">View Details</span>
                <ArrowUpRight size={12} className="text-gold" />
             </div>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-5 left-5 z-10">
              <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 shadow-sm border border-gold/10">
                <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-gold">
                  Top Seller
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>

      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={cn(
          "absolute top-5 right-5 z-10 p-3 bg-white/90 backdrop-blur-md rounded-none shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gold hover:text-white border border-silver-100",
          isInWishlist(product.id) && "opacity-100 text-gold border-gold/20"
        )}
      >
        <Heart size={14} strokeWidth={1.5} className={cn("transition-all duration-500", isInWishlist(product.id) ? "fill-gold text-white" : "text-charcoal/60")} />
      </button>

      <div className="px-1 text-center lg:text-left">
        <Link href={`/product/${product.id}`} className="space-y-2 block">
          <p className="text-[8px] uppercase tracking-[0.5em] text-gold font-bold mb-1">
            {product.subCategory || product.category}
          </p>
          <h3 className="text-xl font-serif text-charcoal transition-colors group-hover:text-gold leading-tight">
            {product.name}
          </h3>
          <div className="w-8 h-[1px] bg-silver-200 my-3 mx-auto lg:mx-0 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
          <p className="text-[10px] text-charcoal/40 font-sans tracking-[0.2em] uppercase font-bold">
            Price on Request
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
