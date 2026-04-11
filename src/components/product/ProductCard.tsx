"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] bg-silver-50 overflow-hidden mb-6 border border-silver-100">
        {/* Actual Product Image */}
        <div className="w-full h-full relative transition-transform duration-700 group-hover:scale-105">
           <Image 
             src={product.image} 
             alt={product.name}
             fill
             className="object-cover"
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
           />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick View Button */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <div className="bg-white px-6 py-2 shadow-xl flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-ultra font-bold text-charcoal">View Details</span>
              <ArrowUpRight size={14} className="text-gold" />
           </div>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 text-[8px] uppercase tracking-ultra font-bold text-gold border border-gold/10">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold">
          {product.subCategory || product.category}
        </p>
        <h3 className="text-lg font-serif text-charcoal transition-colors group-hover:text-gold">
          {product.name}
        </h3>
        <p className="text-xs text-charcoal/50 font-sans tracking-wide">
          Inquire for price
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
