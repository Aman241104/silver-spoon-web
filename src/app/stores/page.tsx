"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

export default function StoreLocatorPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-gold font-bold mb-6">
              OUR PRESENCE
            </span>
            <h1 className="text-[36px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium uppercase">
              Store <br /> Locator
            </h1>
            <p className="text-[#5a5a5a] text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
              Visit our boutique to experience the brilliance of pure silver in person. Our experts are ready to guide you through our collections.
            </p>
          </div>
        </div>
      </section>

      {/* Flagship Store */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative group">
               <div className="absolute -inset-4 bg-[#FAF8F5] rounded-sm -z-10 transition-transform duration-500 group-hover:scale-105" />
               <div className="relative aspect-[4/3] bg-white rounded-none overflow-hidden border border-gray-100 shadow-2xl">
                  {/* Map Placeholder */}
                  <div className="w-full h-full bg-[#FAF8F5] flex flex-col items-center justify-center p-12 text-center relative">
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                          style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
                     <MapPin size={48} strokeWidth={1} className="text-gold mb-6 animate-bounce" />
                     <p className="font-serif italic text-charcoal/40 text-xl tracking-ultra uppercase block mb-2">The Ahmedabad Boutique</p>
                     <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Interactive Map Coming Soon</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col lg:pl-4">
               <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-[1px] bg-gold/30" />
                  <h2 className="text-3xl md:text-4xl font-serif text-[#2c2c2c] tracking-tight uppercase font-medium">Flagship Presence</h2>
               </div>
               
               <div className="space-y-12">
                  <div className="flex gap-8 group">
                     <div className="w-14 h-14 flex items-center justify-center bg-[#FAF8F5] rounded-none border border-gray-100 shrink-0 group-hover:border-gold transition-colors duration-500">
                        <MapPin size={22} strokeWidth={1.2} className="text-gold" />
                     </div>
                     <div className="pt-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-extrabold mb-3">Location</p>
                        <p className="text-lg text-charcoal/70 leading-relaxed font-serif italic">
                           F-14 Omkar Lotus, Chandkheda, <br />
                           Ahmedabad, Gujarat - 382424
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-8 group">
                     <div className="w-14 h-14 flex items-center justify-center bg-[#FAF8F5] rounded-none border border-gray-100 shrink-0 group-hover:border-gold transition-colors duration-500">
                        <Phone size={22} strokeWidth={1.2} className="text-gold" />
                     </div>
                     <div className="pt-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-extrabold mb-3">Concierge</p>
                        <p className="text-lg text-charcoal/70 leading-relaxed font-serif italic">+91 99981 23479</p>
                     </div>
                  </div>

                  <div className="flex gap-8 group">
                     <div className="w-14 h-14 flex items-center justify-center bg-[#FAF8F5] rounded-none border border-gray-100 shrink-0 group-hover:border-gold transition-colors duration-500">
                        <Mail size={22} strokeWidth={1.2} className="text-gold" />
                     </div>
                     <div className="pt-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-extrabold mb-3">Support</p>
                        <p className="text-lg text-charcoal/70 leading-relaxed font-serif italic">info@silverspoon.com</p>
                     </div>
                  </div>
               </div>
               
               <div className="mt-16 pt-10 border-t border-gray-100">
                  <button 
                    onClick={() => window.open('https://wa.me/919998123479?text=Hi, I would like to book a virtual tour.', '_blank')}
                    className="w-full md:w-auto bg-[#1a1a1a] text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-none hover:bg-black transition-all shadow-lg"
                  >
                    Book a Virtual Tour
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
