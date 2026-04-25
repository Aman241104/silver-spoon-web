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
import { ChevronRight, Share2, Heart, ShieldCheck, Truck, RotateCcw, MessageSquare, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const params = useParams();
  const id = params.id as string;

  const product = products.find((p) => p.id === id);

  const containerRef = useGSAP(() => {
    gsap.from(".product-reveal", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.from(".product-image-box", {
      scale: 1.05,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
    });
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
          <Link href="/" className="text-gold uppercase tracking-ultra text-xs font-bold">Return Home</Link>
        </div>
      </main>
    );
  }

  const handleInquiry = () => {
    const WHATSAPP_NUMBER = "+919876543210"; // Replace with client's actual number
    const message = `Hi Silver Spoon By AC Jewellers, I am interested in the "${product.name}" from your ${product.subCategory || product.category} collection. Could you please share more details like weight and current price?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <nav className="product-reveal flex items-center gap-2 mb-12 text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href={`/collections/${product.category}`} className="hover:text-charcoal transition-colors">{product.category}</Link>
            <ChevronRight size={10} />
            <span className="text-gold">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Image Gallery */}
            <div className="product-image-box relative aspect-[4/5] bg-silver-50 border border-silver-100 overflow-hidden group">
               <Image 
                 src={product.image} 
                 alt={product.name}
                 fill
                 className="object-cover"
                 priority
                 sizes="(max-width: 1024px) 100vw, 50vw"
               />
               
               {/* Gallery Thumbnails Placeholder */}
               <div className="absolute bottom-8 left-8 flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-16 h-20 border border-charcoal/10 bg-white/50 backdrop-blur-sm p-1 cursor-pointer hover:border-gold transition-colors overflow-hidden">
                       <Image 
                         src={product.image} 
                         alt={`${product.name} thumbnail ${i}`}
                         width={64}
                         height={80}
                         className="object-cover w-full h-full opacity-60"
                       />
                    </div>
                  ))}
               </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
               <p className="product-reveal text-xs uppercase tracking-[0.4em] text-gold font-bold mb-4">
                  {product.subCategory || product.category}
               </p>
               <h1 className="product-reveal text-4xl md:text-5xl font-serif text-charcoal mb-6">
                  {product.name}
               </h1>
               
               <div className="product-reveal flex items-center gap-6 mb-8 py-4 border-y border-silver-100">
                  <span className="text-2xl font-serif text-charcoal">Price on Request</span>
                  <div className="w-[1px] h-6 bg-silver-200" />
                  <div className="flex items-center gap-2">
                     <ShieldCheck size={18} className="text-gold" />
                     <span className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/60">Purity Guaranteed</span>
                  </div>
               </div>

               <p className="product-reveal text-base text-charcoal/70 font-sans leading-relaxed mb-10 max-w-lg">
                  {product.description}
                  <br /><br />
                  Crafted with precision, this piece represents the pinnacle of silver artistry. Perfect for special occasions or as a meaningful gift that lasts for generations.
               </p>

               <div className="product-reveal flex flex-col gap-4 mb-12">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="flex-1 bg-charcoal text-white hover:bg-gold border-none flex items-center justify-center gap-3 py-8 rounded-none uppercase tracking-widest text-xs font-bold"
                      onClick={() => product && addToCart(product)}
                    >
                      <ShoppingBag size={18} />
                      Add to Bag
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="flex-1 border-gold text-gold hover:bg-gold hover:text-white flex items-center justify-center gap-3 py-8 rounded-none uppercase tracking-widest text-xs font-bold"
                      onClick={handleInquiry}
                    >
                      <MessageSquare size={18} />
                      Inquire on WhatsApp
                    </Button>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className={cn(
                        "flex-1 border-charcoal/10 rounded-none py-6 flex items-center gap-2 transition-all",
                        product && isInWishlist(product.id) && "border-gold text-gold"
                      )}
                      onClick={() => product && toggleWishlist(product)}
                    >
                      <Heart size={16} strokeWidth={1.5} className={cn(product && isInWishlist(product.id) && "fill-gold")} />
                      <span className="text-[10px] uppercase tracking-widest">
                        {product && isInWishlist(product.id) ? "In Wishlist" : "Wishlist"}
                      </span>
                    </Button>
                    <Button variant="outline" className="flex-1 border-charcoal/10 rounded-none py-6 flex items-center gap-2">
                      <Share2 size={16} strokeWidth={1.5} />
                      <span className="text-[10px] uppercase tracking-widest">Share</span>
                    </Button>
                  </div>
               </div>

               {/* Trust Badges */}
               <div className="product-reveal grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-silver-100">
                  <div className="flex flex-col items-center text-center px-4">
                     <Truck size={24} strokeWidth={1} className="text-gold mb-4" />
                     <span className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/80 mb-1">Fast Delivery</span>
                     <span className="text-[9px] text-charcoal/50">Across India</span>
                  </div>
                  <div className="flex flex-col items-center text-center px-4">
                     <RotateCcw size={24} strokeWidth={1} className="text-gold mb-4" />
                     <span className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/80 mb-1">Easy Returns</span>
                     <span className="text-[9px] text-charcoal/50">7 Days Policy</span>
                  </div>
                  <div className="flex flex-col items-center text-center px-4">
                     <ShieldCheck size={24} strokeWidth={1} className="text-gold mb-4" />
                     <span className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/80 mb-1">Authentic</span>
                     <span className="text-[9px] text-charcoal/50">100% Pure Silver</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
