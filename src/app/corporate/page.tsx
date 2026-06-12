"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Zap, MessageSquare } from "lucide-react";

export default function CorporateGiftingPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-gold font-bold mb-6">
              EXECUTIVE TREASURES
            </span>
            <h1 className="text-[36px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium uppercase">
              Corporate <br /> Gifting
            </h1>
            <p className="text-[#5a5a5a] text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
              Elevate your corporate relationships with timeless silver gifts that embody prestige, purity, and your brand&apos;s commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center bg-[#FAF8F5] rounded-full border border-gray-100 mb-8">
                <Award size={32} strokeWidth={1} className="text-gold" />
              </div>
              <h3 className="text-xl font-serif mb-4 text-[#2c2c2c]">Custom Branding</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Personalise your gifts with precision laser engraving of your corporate logo and custom messaging.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center bg-[#FAF8F5] rounded-full border border-gray-100 mb-8">
                <ShieldCheck size={32} strokeWidth={1} className="text-gold" />
              </div>
              <h3 className="text-xl font-serif mb-4 text-[#2c2c2c]">Purity Guaranteed</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Every corporate gift comes with a hallmark certificate of 925 sterling or 999 fine silver.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center bg-[#FAF8F5] rounded-full border border-gray-100 mb-8">
                <Zap size={32} strokeWidth={1} className="text-gold" />
              </div>
              <h3 className="text-xl font-serif mb-4 text-[#2c2c2c]">Priority Logistics</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Dedicated support for bulk orders with white-glove delivery and secure pan-India shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MOQ Section */}
      <section className="py-16 bg-[#FAF8F5] border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Bulk Orders</span>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2c2c2c] mt-3">Minimum Order Quantity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white border border-gray-100 rounded-sm p-8 text-center shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-3">Sterling Silver (925 / 999)</p>
              <p className="text-5xl font-serif text-[#2c2c2c] mb-2">50</p>
              <p className="text-sm text-gray-500">pieces minimum</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-sm p-8 text-center shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-3">German Silver &amp; Silver Coated</p>
              <p className="text-5xl font-serif text-[#2c2c2c] mb-2">50</p>
              <p className="text-sm text-gray-500">pieces minimum</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Snippet */}
      <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
         <div className="absolute inset-0 opacity-20">
            <Image 
              src="/images/collections/corporate-gifting.png" 
              alt="Background" 
              fill 
              className="object-cover"
            />
         </div>
         <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-10 tracking-tight">Curated for Success</h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-16 uppercase tracking-[0.2em]">
               From executive desk accessories to divine silver idols, our corporate range is designed to leave a lasting impression.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
               <Link href="/products" className="bg-white text-black px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-silver-100 transition-all">
                  Browse Catalog
               </Link>
               <button 
                onClick={() => window.open('https://wa.me/919998123479?text=Hi, I am interested in Corporate Gifting options.', '_blank')}
                className="bg-transparent border border-white/20 text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-all flex items-center gap-3"
               >
                  <MessageSquare size={16} />
                  Inquire Now
               </button>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
