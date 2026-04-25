"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const SpecialFeatures = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Feature 1: Silver Idols */}
          <Link href="/collections/idols-gifts" className="group relative h-[600px] md:h-[750px] overflow-hidden bg-[#fafafa] flex flex-col items-center justify-start p-16 text-center border border-silver-100/50 shadow-sm transition-all duration-700 hover:shadow-2xl">
             <div className="relative z-10 flex flex-col items-center w-full">
                <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-8">Sacred Treasures</p>
                <h3 className="text-4xl md:text-6xl font-serif text-charcoal mb-10 leading-[0.9] tracking-tighter">
                   Divine <span className="italic text-silver-400">Blessings</span> <br /> 
                   in Pure 925.
                </h3>
                
                <div className="flex items-center gap-4 text-charcoal/60 group-hover:text-gold transition-colors duration-500 mb-16">
                   <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Explore Divine Idols</span>
                   <ArrowRight size={14} />
                </div>
                
                {/* Visual Image Treatment */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center p-8 border border-gold/5 overflow-hidden transition-transform duration-1000 group-hover:scale-105">
                   <Image 
                     src="/images/collections/pooja.png"
                     alt="Silver Idols"
                     fill
                     className="object-cover opacity-90 transition-transform duration-[2000ms] group-hover:scale-110"
                   />
                </div>
             </div>
             
             {/* Decorative Background Pattern */}
             <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
             
             {/* Light glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
          </Link>

          {/* Feature 2: Silver Utensils */}
          <Link href="/collections/pooja-utensils" className="group relative h-[600px] md:h-[750px] overflow-hidden bg-[#f5f5f5] flex flex-col items-center justify-start p-16 text-center border border-silver-100/50 shadow-sm transition-all duration-700 hover:shadow-2xl">
             <div className="relative z-10 flex flex-col items-center w-full">
                <p className="text-[10px] uppercase tracking-[0.5em] text-charcoal/40 font-bold mb-8">Ritual Purity</p>
                <h3 className="text-4xl md:text-6xl font-serif text-charcoal mb-10 leading-[0.9] tracking-tighter">
                   Purity Served <br /> 
                   in <span className="italic text-silver-400">925 Silver.</span>
                </h3>
                
                <div className="flex items-center gap-4 text-charcoal/60 group-hover:text-charcoal transition-colors duration-500 mb-16">
                   <span className="text-[10px] uppercase tracking-[0.5em] font-bold">View Utensils</span>
                   <ArrowRight size={14} className="text-gold" />
                </div>

                {/* Visual Image Treatment */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white shadow-2xl flex items-center justify-center p-8 border border-silver-200 overflow-hidden transition-transform duration-1000 group-hover:scale-105">
                   <Image 
                     src="/images/products/pooja-utensils.png"
                     alt="Silver Utensils"
                     fill
                     className="object-cover opacity-90 transition-transform duration-[2000ms] group-hover:scale-110"
                   />
                </div>
             </div>

             <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialFeatures;
