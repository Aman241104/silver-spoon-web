"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { products } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import Link from "next/link";
import { ChevronRight, Share2, Heart, ShieldCheck, Truck, RotateCcw, MessageSquare, ShoppingBag, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
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

  const containerRef = useGSAP(() => {
    gsap.from(".product-reveal", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
    });

    gsap.from(".product-image-box", {
      scale: 1.1,
      opacity: 0,
      duration: 2,
      ease: "expo.out",
    });
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <h1 className="text-6xl font-serif mb-8 tracking-tighter">Piece Not Found</h1>
          <Link href="/" className="group relative inline-block overflow-hidden bg-gold text-charcoal px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 hover:bg-white">
            <span className="relative z-10">Return to Treasury</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </main>
    );
  }

  const handleInquiry = () => {
    const WHATSAPP_NUMBER = "+919876543210"; 
    const message = `Hi Silver Spoon, I am interested in the "${product.name}" from your ${product.subCategory || product.category} collection. Could you please share more details like weight and current price?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-white text-charcoal">
      <Navbar />

      <section className="pt-48 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <nav className="product-reveal flex items-center gap-3 mb-16 text-[9px] uppercase tracking-[0.4em] text-charcoal/30 font-bold">
            <Link href="/" className="hover:text-gold transition-colors">Treasury</Link>
            <span className="text-silver-300">/</span>
            <Link href={`/collections/${product.category}`} className="hover:text-gold transition-colors">{product.category}</Link>
            <span className="text-silver-300">/</span>
            <span className="text-gold italic">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Image Gallery */}
            <div className="product-image-box relative aspect-[4/5] bg-[#fcfcfc] border border-silver-100 shadow-sm overflow-hidden group">
               <Image 
                 src={product.image} 
                 alt={product.name}
                 fill
                 className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                 priority
                 sizes="(max-width: 1024px) 100vw, 50vw"
               />
               
               {/* Detail Overlays */}
               <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-xl border border-silver-100 p-6 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                  <p className="text-gold text-[8px] uppercase tracking-[0.4em] font-bold mb-1">Authentic 925</p>
                  <p className="text-charcoal text-lg font-serif">Pure Silver</p>
               </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
               <div className="product-reveal inline-flex items-center gap-4 mb-6">
                  <span className="w-12 h-[1px] bg-gold" />
                  <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">
                     {product.subCategory || product.category}
                  </p>
               </div>
               
               <h1 className="product-reveal text-5xl md:text-7xl font-serif text-charcoal mb-10 leading-[0.9] tracking-tighter">
                  {product.name.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? "italic text-silver-400" : ""}>
                      {word}{' '}
                    </span>
                  ))}
               </h1>
               
               <div className="product-reveal flex items-center gap-8 mb-12 py-8 border-y border-silver-100">
                  <div className="flex flex-col">
                     <span className="text-[9px] uppercase tracking-[0.4em] text-charcoal/30 font-bold mb-2">Investment</span>
                     <span className="text-3xl font-serif text-charcoal">Price on Request</span>
                  </div>
                  <div className="w-[1px] h-12 bg-silver-100" />
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center">
                        <ShieldCheck size={18} className="text-gold" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-charcoal/30 font-bold mb-1">Assurance</span>
                        <span className="text-[10px] uppercase tracking-ultra font-bold text-charcoal">Purity Certified</span>
                     </div>
                  </div>
               </div>

               <p className="product-reveal text-base text-charcoal/60 font-sans leading-loose tracking-wide mb-14 max-w-xl">
                  {product.description}
                  <br /><br />
                  Exquisitely hand-finished by our master silversmiths, this piece embodies the timeless elegance of heritage craftsmanship. A divine addition to your sanctuary or a precious gift for a legacy.
               </p>

               <div className="product-reveal space-y-6 mb-16">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                      className="group relative flex-1 overflow-hidden bg-charcoal text-white px-10 py-6 text-[10px] uppercase tracking-[0.5em] font-bold transition-all duration-500 hover:bg-gold"
                      onClick={() => product && addToCart(product)}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        <ShoppingBag size={16} />
                        Add to Bag
                      </span>
                      <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                    <button 
                      className="group relative flex-1 overflow-hidden border border-gold text-gold px-10 py-6 text-[10px] uppercase tracking-[0.5em] font-bold transition-all duration-500 hover:text-white"
                      onClick={handleInquiry}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        <MessageSquare size={16} />
                        Inquire on WhatsApp
                      </span>
                      <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </div>

                  {/* Group Gifting Button */}
                  {product && (product.price || 0) >= 4000 && (
                    <button 
                      onClick={() => setIsGroupGiftingOpen(true)}
                      className="w-full group relative overflow-hidden bg-gold/10 border border-gold/30 text-gold px-10 py-6 text-[10px] uppercase tracking-[0.5em] font-bold transition-all duration-500 hover:bg-gold hover:text-white"
                    >
                       <span className="relative z-10 flex items-center justify-center gap-4">
                          <Users size={16} />
                          Gift Together with Family
                       </span>
                    </button>
                  )}

                  <div className="flex gap-6">
                    <button 
                      className={cn(
                        "flex-1 border border-silver-100 py-5 flex items-center justify-center gap-4 transition-all duration-500 hover:border-gold group",
                        product && isInWishlist(product.id) && "border-gold text-gold bg-gold/5"
                      )}
                      onClick={() => product && toggleWishlist(product)}
                    >
                      <Heart size={14} strokeWidth={1.5} className={cn("transition-all duration-500 group-hover:scale-125", product && isInWishlist(product.id) && "fill-gold")} />
                      <span className="text-[9px] uppercase tracking-[0.4em] font-bold">
                        {product && isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                      </span>
                    </button>
                    <button className="flex-1 border border-silver-100 py-5 flex items-center justify-center gap-4 transition-all duration-500 hover:border-gold group">
                      <Share2 size={14} strokeWidth={1.5} className="group-hover:text-gold transition-colors" />
                      <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Share Masterpiece</span>
                    </button>
                  </div>
               </div>

               {/* Trust Badges */}
               <div className="product-reveal grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 border-t border-silver-100">
                  <div className="flex flex-col items-center text-center">
                     <div className="w-12 h-12 rounded-full bg-silver-50 flex items-center justify-center mb-6 group hover:bg-gold/10 transition-colors">
                        <Truck size={20} strokeWidth={1} className="text-gold" />
                     </div>
                     <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal mb-2">Concierge Delivery</span>
                     <span className="text-[9px] text-charcoal/40 uppercase tracking-widest font-bold">Secure Pan-India</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                     <div className="w-12 h-12 rounded-full bg-silver-50 flex items-center justify-center mb-6 hover:bg-gold/10 transition-colors">
                        <RotateCcw size={20} strokeWidth={1} className="text-gold" />
                     </div>
                     <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal mb-2">Legacy Returns</span>
                     <span className="text-[9px] text-charcoal/40 uppercase tracking-widest font-bold">7 Day Assurance</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                     <div className="w-12 h-12 rounded-full bg-silver-50 flex items-center justify-center mb-6 hover:bg-gold/10 transition-colors">
                        <ShieldCheck size={20} strokeWidth={1} className="text-gold" />
                     </div>
                     <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal mb-2">Hallmarked 925</span>
                     <span className="text-[9px] text-charcoal/40 uppercase tracking-widest font-bold">Guaranteed Purity</span>
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
