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
    <div className="group block relative font-sans">
      <Link
        href={`/product/${product.id}`}
        className="block"
      >
        <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden mb-6 border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-700 rounded-sm">
          {/* Actual Product Image */}
          <div className="w-full h-full relative transition-transform duration-1000 ease-out group-hover:scale-105">
             <Image 
               src={product.image} 
               alt={product.name}
               fill
               className="object-cover mix-blend-multiply"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
             />
          </div>

          {/* Quick View Button */}
          <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
             <div className="bg-white/95 backdrop-blur-md py-4 flex items-center justify-center gap-3 border-t border-gray-100">
                <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal">View Details</span>
                <ArrowUpRight size={14} className="text-gray-400" />
             </div>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/90 px-3 py-1 shadow-sm border border-gray-100">
                <span className="text-[9px] uppercase tracking-widest font-bold text-charcoal">
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
          "absolute top-4 right-4 z-10 p-2.5 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white border border-gray-100",
          isInWishlist(product.id) && "opacity-100"
        )}
      >
        <Heart size={16} strokeWidth={1.5} className={cn("transition-all duration-500", isInWishlist(product.id) ? "fill-charcoal text-charcoal" : "text-gray-400")} />
      </button>

      <div className="px-1 text-center lg:text-left">
        <Link href={`/product/${product.id}`} className="space-y-1.5 md:space-y-2 block">
          <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5 md:mb-1">
            {product.subCategory || product.category}
          </p>
          <h3 className="text-lg md:text-xl font-serif text-[#2c2c2c] transition-colors group-hover:text-gray-600 leading-tight">
            {product.name}
          </h3>
          <div className="w-8 h-[1px] bg-gray-200 my-2 md:my-3 mx-auto lg:mx-0 transition-all duration-500 group-hover:w-16 group-hover:bg-gray-400" />
          <p className="text-[10px] md:text-[11px] text-gray-400 font-sans tracking-widest uppercase font-bold">
            Price on Request
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
