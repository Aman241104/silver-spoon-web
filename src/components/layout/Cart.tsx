"use client";

import * as React from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2, MessageSquare } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, handleBulkOrder, cartCount } = useCart();
  const cartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isCartOpen) {
      gsap.to(".cart-overlay", { opacity: 1, display: "block", duration: 0.3 });
      gsap.to(cartRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".cart-overlay", { opacity: 0, display: "none", duration: 0.3 });
      gsap.to(cartRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
      document.body.style.overflow = "auto";
    }
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className="cart-overlay fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] hidden opacity-0"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div 
        ref={cartRef}
        className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-white z-[201] shadow-2xl translate-x-full flex flex-col"
      >
        <div className="flex justify-between items-center px-6 py-5 md:p-8 border-b border-silver-100 shrink-0">
          <div className="flex items-center gap-3">
             <ShoppingBag size={18} className="text-gold" />
             <h2 className="text-lg md:text-xl font-serif text-charcoal tracking-widest uppercase">Your Bag</h2>
             <span className="bg-silver-100 text-charcoal/60 text-[9px] md:text-[10px] px-2 py-0.5 rounded-full font-bold">
                {cartCount}
             </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-charcoal/40 hover:text-charcoal transition-colors p-1"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-silver-50 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag strokeWidth={1} className="w-7 h-7 md:w-8 md:h-8 text-silver-300" />
               </div>
               <p className="font-serif italic text-charcoal/40 text-base md:text-lg mb-8">Your bag is empty.</p>
               <Button 
                variant="outline" 
                onClick={() => setIsCartOpen(false)}
                className="uppercase tracking-ultra text-[9px] md:text-[10px] font-bold"
               >
                  Start Shopping
               </Button>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 md:gap-6 group">
                  <div className="relative w-20 h-28 md:w-24 md:h-32 bg-silver-50 border border-silver-100 overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="min-w-0 pr-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-widest text-gold font-bold mb-0.5 truncate">{item.subCategory || item.category}</p>
                        <h3 className="text-xs md:text-sm font-serif text-charcoal line-clamp-2 leading-snug">{item.name}</h3>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-charcoal/20 hover:text-gold transition-colors shrink-0 p-1 -mr-1"
                      >
                        <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-charcoal/40 mb-auto italic">Price on Request</p>
                    
                    <div className="flex items-center justify-between mt-3 md:mt-4">
                      <div className="flex items-center border border-silver-100 bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 md:p-2 text-charcoal/40 hover:text-charcoal transition-colors"
                        >
                          <Minus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        </button>
                        <span className="w-6 md:w-8 text-center text-[10px] md:text-xs font-bold text-charcoal">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 md:p-2 text-charcoal/40 hover:text-charcoal transition-colors"
                        >
                          <Plus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 md:p-8 bg-silver-50 border-t border-silver-100 shrink-0">
            <div className="mb-5 space-y-2">
               <p className="text-[9px] md:text-[10px] text-charcoal/40 uppercase tracking-widest text-center">
                  Prices are shared upon inquiry
               </p>
            </div>
            <Button 
              className="w-full bg-[#25D366] hover:bg-[#128C7E] border-none flex items-center justify-center gap-3 py-5 md:py-6 rounded-none"
              onClick={handleBulkOrder}
            >
              <MessageSquare className="w-4 h-4 md:w-4.5 md:h-4.5" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold">Bulk Order on WhatsApp</span>
            </Button>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="w-full mt-4 text-[9px] md:text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold hover:text-charcoal transition-colors text-center"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
