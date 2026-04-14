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
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl translate-x-full flex flex-col"
      >
        <div className="flex justify-between items-center p-8 border-b border-silver-100">
          <div className="flex items-center gap-3">
             <ShoppingBag size={20} className="text-gold" />
             <h2 className="text-xl font-serif text-charcoal tracking-widest uppercase">Your Bag</h2>
             <span className="bg-silver-100 text-charcoal/60 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {cartCount}
             </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-charcoal/40 hover:text-charcoal transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 bg-silver-50 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag size={32} strokeWidth={1} className="text-silver-300" />
               </div>
               <p className="font-serif italic text-charcoal/40 text-lg mb-8">Your bag is empty.</p>
               <Button 
                variant="outline" 
                onClick={() => setIsCartOpen(false)}
                className="uppercase tracking-ultra text-[10px] font-bold"
               >
                  Start Shopping
               </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="relative w-24 h-32 bg-silver-50 border border-silver-100 overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-[8px] uppercase tracking-widest text-gold font-bold mb-1">{item.subCategory || item.category}</p>
                        <h3 className="text-sm font-serif text-charcoal">{item.name}</h3>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-charcoal/20 hover:text-gold transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] text-charcoal/40 mb-auto italic">Price on Request</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-silver-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-charcoal/40 hover:text-charcoal transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-charcoal">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-charcoal/40 hover:text-charcoal transition-colors"
                        >
                          <Plus size={12} />
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
          <div className="p-8 bg-silver-50 border-t border-silver-100">
            <div className="mb-6 space-y-2">
               <p className="text-[10px] text-charcoal/40 uppercase tracking-widest text-center">
                  Prices are shared upon inquiry
               </p>
            </div>
            <Button 
              className="w-full bg-[#25D366] hover:bg-[#128C7E] border-none flex items-center justify-center gap-3 py-6"
              onClick={handleBulkOrder}
            >
              <MessageSquare size={18} />
              Bulk Order on WhatsApp
            </Button>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="w-full mt-4 text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold hover:text-charcoal transition-colors text-center"
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
