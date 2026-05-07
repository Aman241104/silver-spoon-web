"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { products } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Share2, Heart, ShieldCheck, Truck, RotateCcw, MessageSquare, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import GroupGiftingModal from "@/components/product/GroupGiftingModal";

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isGroupGiftingOpen, setIsGroupGiftingOpen] = React.useState(false);
  const params = useParams();
  const id = params.id as string;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5] text-charcoal font-sans">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-8 tracking-tighter">Piece Not Found</h1>
          <Link href="/products" className="bg-[#1a1a1a] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
            Return to Collection
          </Link>
        </div>
      </main>
    );
  }

  const handleInquiry = () => {
    const WHATSAPP_NUMBER = "919998123479"; 
    const productUrl = typeof window !== "undefined" ? window.location.href : "";
    const message = `Hi Silver Spoon, I am interested in the "${product.name}" (${product.serialNumber || product.id}) from your ${product.subCategory || product.category} collection.\n\nProduct Link: ${productUrl}\n\nCould you please share more details?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="pt-24 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-12 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <Link href="/products" className="hover:text-charcoal transition-colors">Collection</Link>
            <span>/</span>
            <Link href={`/collections/${product.category}`} className="hover:text-charcoal transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Image Area */}
            <div className="relative aspect-[1/1] bg-[#FAF8F5] overflow-hidden">
               <Image 
                 src={product.image} 
                 alt={product.name}
                 fill
                 className="object-contain mix-blend-multiply p-12"
                 priority
               />
               
               {/* Detail Overlays */}
               <div className="absolute top-8 right-8 bg-white/90 border border-gray-100 p-5 shadow-sm">
                  <p className="text-gray-400 text-[9px] uppercase tracking-widest font-bold mb-1">Authentic 925</p>
                  <p className="text-[#2c2c2c] text-xl font-serif">Pure Silver</p>
               </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
               <span className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-4">
                  {product.subCategory || product.category}
               </span>
               
               <h1 className="text-[42px] md:text-[52px] font-serif text-[#2c2c2c] mb-8 leading-tight font-medium uppercase tracking-tight">
                  {product.name}
               </h1>
               
               <div className="flex items-center gap-10 mb-10 pb-10 border-b border-gray-100">
                  <div className="flex flex-col">
                     <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Investment</span>
                     <span className="text-2xl font-serif text-[#2c2c2c]">Price on Request</span>
                  </div>
                  <div className="w-[1px] h-10 bg-gray-100" />
                  <div className="flex items-center gap-3">
                     <ShieldCheck size={20} className="text-gray-300" strokeWidth={1.5} />
                     <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Assurance</span>
                        <span className="text-[11px] uppercase font-bold text-[#2c2c2c] tracking-tight">Purity Certified</span>
                     </div>
                  </div>
               </div>

               <p className="text-[15px] md:text-[16px] text-gray-500 leading-relaxed mb-12 max-w-xl">
                  {product.description}
                  <br /><br />
                  Exquisitely hand-finished by our master silversmiths, this piece embodies the timeless elegance of heritage craftsmanship. A divine addition to your sanctuary or a precious gift for a legacy.
               </p>

               <div className="space-y-6 mb-16">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      className="flex-1 bg-[#1a1a1a] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-black transition-all flex items-center justify-center gap-3"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingBag size={16} strokeWidth={1.5} />
                      Add to Bag
                    </button>
                    <button 
                      className="flex-1 bg-[#FAF8F5] border border-gray-200 text-[#2c2c2c] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-all flex items-center justify-center gap-3"
                      onClick={handleInquiry}
                    >
                      <MessageSquare size={16} strokeWidth={1.5} />
                      Inquire on WhatsApp
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      className={cn(
                        "flex-1 border border-gray-200 py-4 flex items-center justify-center gap-3 transition-all hover:bg-gray-50 rounded-sm",
                        isInWishlist(product.id) && "bg-[#FAF8F5] border-gray-300"
                      )}
                      onClick={() => toggleWishlist(product)}
                    >
                      <Heart size={16} strokeWidth={1.5} className={cn(isInWishlist(product.id) && "fill-charcoal")} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">
                        {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                      </span>
                    </button>
                    <button className="flex-1 border border-gray-200 py-4 flex items-center justify-center gap-3 transition-all hover:bg-gray-50 rounded-sm">
                      <Share2 size={16} strokeWidth={1.5} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Share</span>
                    </button>
                  </div>
               </div>

               {/* Trust Badges */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-12 border-t border-gray-100">
                  <div className="flex flex-col items-center text-center">
                     <div className="w-12 h-12 flex items-center justify-center border border-gray-100 rounded-full mb-4">
                        <Truck size={20} strokeWidth={1} className="text-gray-400" />
                     </div>
                     <span className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c] mb-1">Secure Delivery</span>
                     <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Pan-India</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                     <div className="w-12 h-12 flex items-center justify-center border border-gray-100 rounded-full mb-4">
                        <RotateCcw size={20} strokeWidth={1} className="text-gray-400" />
                     </div>
                     <span className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c] mb-1">Easy Returns</span>
                     <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">7 Day Policy</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                     <div className="w-12 h-12 flex items-center justify-center border border-gray-100 rounded-full mb-4">
                        <ShieldCheck size={20} strokeWidth={1} className="text-gray-400" />
                     </div>
                     <span className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c] mb-1">925 Purity</span>
                     <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">BIS Hallmarked</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {product && (
        <GroupGiftingModal 
          product={product} 
          isOpen={isGroupGiftingOpen} 
          onClose={() => setIsGroupGiftingOpen(false)} 
        />
      )}
    </main>
  );
}
