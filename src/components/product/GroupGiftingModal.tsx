"use client";

import * as React from "react";
import { X, Users, Share2, TrendingUp, Heart, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface GroupGiftingModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const GroupGiftingModal = ({ product, isOpen, onClose }: GroupGiftingModalProps) => {
  const [contribution, setContribution] = React.useState("");
  const target = product.price || 10000;
  const collected = target * 0.45; // Mock data: 45% collected
  const percentage = (collected / target) * 100;

  React.useEffect(() => {
    if (isOpen) {
      gsap.fromTo(".modal-content", 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power4.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12">
      <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="modal-content relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
         {/* Left Side: Progress & Info */}
         <div className="p-10 md:p-16 bg-[#fafafa] border-r border-silver-100 flex flex-col justify-between">
            <button onClick={onClose} className="absolute top-6 left-6 text-charcoal/40 hover:text-charcoal transition-colors">
               <X size={20} />
            </button>

            <div>
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                     <Users size={20} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Gifting Circle</span>
               </div>
               
               <h2 className="text-3xl md:text-5xl font-serif text-charcoal mb-8 leading-tight tracking-tighter">
                  Gift This <span className="italic text-silver-400">Together.</span>
               </h2>
               
               <p className="text-[11px] text-charcoal/50 uppercase tracking-widest leading-relaxed mb-12 font-bold">
                  Start a circle for the {product.name} and share the joy (and the cost) with family and friends.
               </p>

               <div className="space-y-6">
                  <div className="flex justify-between items-end">
                     <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/40">Circle Progress</span>
                     <span className="text-xl font-serif text-charcoal">₹{collected.toLocaleString()} / ₹{target.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-silver-100 relative overflow-hidden">
                     <div 
                        className="absolute top-0 left-0 h-full bg-gold transition-all duration-1000 ease-out" 
                        style={{ width: `${percentage}%` }}
                     />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-bold text-gold">
                     <TrendingUp size={12} />
                     <span>4 contributors have joined so far</span>
                  </div>
               </div>
            </div>

            <div className="mt-16 pt-10 border-t border-silver-200 flex items-center gap-6 opacity-40">
               <div className="flex flex-col items-center">
                  <Heart size={16} />
                  <span className="text-[7px] mt-2 font-bold uppercase tracking-widest">Shared Love</span>
               </div>
               <div className="flex flex-col items-center">
                  <Share2 size={16} />
                  <span className="text-[7px] mt-2 font-bold uppercase tracking-widest">Easy Share</span>
               </div>
            </div>
         </div>

         {/* Right Side: Action */}
         <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
            <h3 className="text-xl font-serif mb-10 text-charcoal">Add Your Contribution</h3>
            
            <div className="space-y-10">
               <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/40">Amount (₹)</label>
                  <input 
                     type="number"
                     placeholder="e.g. 2500"
                     className="w-full text-3xl font-serif border-b border-silver-200 pb-4 outline-none focus:border-gold transition-colors"
                     value={contribution}
                     onChange={(e) => setContribution(e.target.value)}
                  />
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/40">Your Message</label>
                  <textarea 
                     placeholder="A heartfelt note for the recipient..."
                     className="w-full bg-[#fcfcfc] border-none p-6 text-sm font-sans focus:ring-1 focus:ring-gold/30 outline-none h-32 resize-none transition-all"
                  />
               </div>

               <button className="w-full bg-[#0a0a0a] text-white py-6 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-gold transition-all">
                  Join Gifting Circle <ArrowRight size={14} />
               </button>

               <div className="pt-6 text-center">
                  <p className="text-[9px] uppercase tracking-widest text-charcoal/30 font-bold mb-4">Or share the link to start the circle</p>
                  <button className="flex items-center gap-3 mx-auto text-[9px] uppercase tracking-[0.4em] font-bold text-gold hover:text-charcoal transition-all">
                     <Share2 size={12} /> Copy Circle Link
                  </button>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default GroupGiftingModal;
