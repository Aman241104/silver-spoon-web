"use client";

import * as React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Truck, MessageSquare, Search, Diamond } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = React.useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    const message = `Hi, I want to track my order. Order ID: ${orderId}`;
    window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center py-24 md:py-32">
        <div className="container mx-auto px-6 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-[#FAF8F5] rounded-full flex items-center justify-center mb-10 border border-gray-100">
             <Truck size={32} strokeWidth={1} className="text-gold" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-[#2c2c2c] mb-6 tracking-tighter uppercase font-medium">
            Track Your Order
          </h1>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-[1px] w-12 bg-gray-200"></div>
            <Diamond size={10} className="text-gray-300" fill="currentColor" />
            <div className="h-[1px] w-12 bg-gray-200"></div>
          </div>

          <div className="max-w-md w-full bg-[#FAF8F5] p-8 md:p-12 border border-gray-100 rounded-sm shadow-sm mb-12">
            <p className="text-gray-500 text-sm md:text-base mb-10 leading-relaxed font-serif italic">
               Enter your Order ID below to receive real-time updates via our WhatsApp concierge.
            </p>
            
            <form onSubmit={handleTrack} className="space-y-6">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="ORDER ID (e.g. SS-12345)"
                  className="w-full bg-white border border-gray-200 px-6 py-4 text-xs md:text-sm font-bold tracking-widest text-charcoal outline-none focus:border-gold transition-all uppercase placeholder:text-gray-300"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors" />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-[#111827] text-white py-5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-none hover:bg-black transition-all"
              >
                Track Journey
              </Button>
            </form>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-xs">
             <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Prefer direct inquiry?</p>
             <button 
              onClick={() => window.open('https://wa.me/+919876543210?text=Hi, I need assistance with an order.', '_blank')}
              className="bg-[#25D366] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3"
             >
                <MessageSquare size={16} />
                WhatsApp Concierge
             </button>
             <Link href="/contact" className="text-[11px] uppercase tracking-widest font-bold text-charcoal border-b border-charcoal/20 pb-1 self-center hover:border-charcoal transition-colors">
                Contact Support
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
