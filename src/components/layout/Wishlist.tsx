"use client";

import * as React from "react";
import Image from "next/image";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";
import Link from "next/link";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, isWishlistOpen, setIsWishlistOpen, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const wishlistRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isWishlistOpen) {
      gsap.to(".wishlist-overlay", { opacity: 1, display: "block", duration: 0.3 });
      gsap.to(wishlistRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".wishlist-overlay", { opacity: 0, display: "none", duration: 0.3 });
      gsap.to(wishlistRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
      document.body.style.overflow = "auto";
    }
  }, [isWishlistOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className="wishlist-overlay fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] hidden opacity-0"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Wishlist Drawer */}
      <div 
        ref={wishlistRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl translate-x-full flex flex-col"
      >
        <div className="flex justify-between items-center p-8 border-b border-silver-100">
          <div className="flex items-center gap-3">
             <Heart size={20} className="text-gold fill-gold" />
             <h2 className="text-xl font-serif text-charcoal tracking-widest uppercase">Wishlist</h2>
             <span className="bg-silver-100 text-charcoal/60 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {wishlistCount}
             </span>
          </div>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="text-charcoal/40 hover:text-charcoal transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 bg-silver-50 rounded-full flex items-center justify-center mb-6">
                  <Heart size={32} strokeWidth={1} className="text-silver-300" />
               </div>
               <p className="font-serif italic text-charcoal/40 text-lg mb-8">Your wishlist is empty.</p>
               <Button 
                variant="outline" 
                onClick={() => setIsWishlistOpen(false)}
                className="uppercase tracking-ultra text-[10px] font-bold"
               >
                  Explore Products
               </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {wishlist.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <Link 
                    href={`/product/${item.id}`}
                    onClick={() => setIsWishlistOpen(false)}
                    className="relative w-24 h-32 bg-silver-50 border border-silver-100 overflow-hidden shrink-0"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </Link>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <Link 
                        href={`/product/${item.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                      >
                        <p className="text-[8px] uppercase tracking-widest text-gold font-bold mb-1">{item.subCategory || item.category}</p>
                        <h3 className="text-sm font-serif text-charcoal hover:text-gold transition-colors">{item.name}</h3>
                      </Link>
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-charcoal/20 hover:text-gold transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] text-charcoal/40 mb-auto italic">Price on Request</p>
                    
                    <button 
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item.id);
                      }}
                      className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-charcoal hover:text-gold transition-colors border-b border-silver-100 pb-1 w-fit"
                    >
                      <ShoppingBag size={14} />
                      Move to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 bg-silver-50 border-t border-silver-100 text-center">
           <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold mb-2">Save your favorites</p>
           <p className="text-[9px] text-charcoal/30">Your wishlist items are saved for your next visit.</p>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
