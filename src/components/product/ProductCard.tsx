"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { ArrowUpRight, Heart, ShoppingBag, Check } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group block relative font-sans">
      <Link
        href={`/product/${product.id}`}
        className="block"
      >
        <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden mb-6 border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-700 rounded-sm">
          {/* Product Image */}
          <div className="w-full h-full relative transition-transform duration-1000 ease-out group-hover:scale-105">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#FAF8F5]">
                <span className="text-4xl font-serif text-gray-200">SS</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-300 font-bold">No Image</span>
              </div>
            )}
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

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          className={cn(
            "p-2.5 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white border border-gray-100",
            isInWishlist(product.id) && "opacity-100"
          )}
        >
          <Heart size={16} strokeWidth={1.5} className={cn("transition-all duration-500", isInWishlist(product.id) ? "fill-charcoal text-charcoal" : "text-gray-400")} />
        </button>

        <button 
          onClick={handleAddToCart}
          aria-label={isAdded ? "Added to Bag" : "Add to Bag"}
          className={cn(
            "p-2.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 border border-gray-100",
            isAdded ? "bg-gold text-white" : "bg-white/90 text-gray-400 hover:text-charcoal hover:bg-white"
          )}
        >
          {isAdded ? <Check size={16} strokeWidth={2.5} className="animate-in zoom-in duration-300" /> : <ShoppingBag size={16} strokeWidth={1.5} />}
        </button>
      </div>

      <div className="px-1 text-center lg:text-left">
        <Link href={`/product/${product.id}`} className="space-y-1.5 md:space-y-2 block">
          <h3 className="text-lg md:text-xl font-serif text-[#2c2c2c] transition-colors group-hover:text-gray-600 leading-tight">
            {product.name}
          </h3>
          <div className="w-8 h-[1px] bg-gray-200 my-2 md:my-3 mx-auto lg:mx-0 transition-all duration-500 group-hover:w-16 group-hover:bg-gray-400" />
          <p className="text-[10px] md:text-[11px] text-[#2c2c2c] font-sans tracking-widest uppercase font-bold">
            {product.price > 0 ? `₹${product.price.toLocaleString()}` : "Price on Request"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
