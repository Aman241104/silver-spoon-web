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
        className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-white z-[201] shadow-2xl translate-x-full flex flex-col"
      >
        <div className="flex justify-between items-center px-6 py-5 md:p-8 border-b border-silver-100 shrink-0">
          <div className="flex items-center gap-3">
             <Heart size={18} className="text-gold fill-gold" />
             <h2 className="text-lg md:text-xl font-serif text-charcoal tracking-widest uppercase">Wishlist</h2>
             <span className="bg-silver-100 text-charcoal/60 text-[9px] md:text-[10px] px-2 py-0.5 rounded-full font-bold">
                {wishlistCount}
             </span>
          </div>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="text-charcoal/40 hover:text-charcoal transition-colors p-1"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-silver-50 rounded-full flex items-center justify-center mb-6">
                  <Heart strokeWidth={1} className="w-7 h-7 md:w-8 md:h-8 text-silver-300" />
               </div>
               <p className="font-serif italic text-charcoal/40 text-base md:text-lg mb-8">Your wishlist is empty.</p>
               <Button 
                variant="outline" 
                onClick={() => setIsWishlistOpen(false)}
                className="uppercase tracking-ultra text-[9px] md:text-[10px] font-bold"
               >
                  Explore Products
               </Button>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8">
              {wishlist.map((item) => (
                <div key={item.id} className="flex gap-4 md:gap-6 group">
                  <Link 
                    href={`/product/${item.id}`}
                    onClick={() => setIsWishlistOpen(false)}
                    className="relative w-20 h-28 md:w-24 md:h-32 bg-silver-50 border border-silver-100 overflow-hidden shrink-0"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </Link>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <Link 
                        href={`/product/${item.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="min-w-0 pr-2"
                      >
                        <p className="text-[7px] md:text-[8px] uppercase tracking-widest text-gold font-bold mb-0.5 truncate">{item.subCategory || item.category}</p>
                        <h3 className="text-xs md:text-sm font-serif text-charcoal hover:text-gold transition-colors line-clamp-2 leading-snug">{item.name}</h3>
                      </Link>
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-charcoal/20 hover:text-gold transition-colors shrink-0 p-1 -mr-1"
                      >
                        <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-charcoal/40 mb-auto italic">Price on Request</p>
                    
                    <button 
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item.id);
                      }}
                      className="mt-3 md:mt-4 flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-charcoal hover:text-gold transition-colors border-b border-silver-100 pb-1 w-fit"
                    >
                      <ShoppingBag className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      Move to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 bg-silver-50 border-t border-silver-100 text-center shrink-0">
           <p className="text-[9px] md:text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold mb-1">Save your favorites</p>
           <p className="text-[8px] md:text-[9px] text-charcoal/30">Your wishlist items are saved for your next visit.</p>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
