"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BudgetGifting = () => {
  const ranges = [
    { title: "Artisan Gifts", price: "Under ₹ 1499", bg: "bg-[#0a0a0a]" },
    { title: "Signature Pieces", price: "₹ 1499 - ₹ 2499", bg: "bg-[#111111]" },
    { title: "Legacy Treasures", price: "₹ 2499 - ₹ 4999", bg: "bg-[#0a0a0a]" },
    { title: "Masterpieces", price: "Above ₹ 4999", bg: "bg-[#111111]" },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
             <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Curated by Value</p>
             <h2 className="text-5xl md:text-6xl font-serif text-charcoal leading-[0.9] tracking-tighter">
               Shop by <span className="italic text-silver-400">Budget</span>
             </h2>
          </div>
          <p className="text-sm text-charcoal/40 font-sans tracking-widest uppercase mb-2 hidden lg:block max-w-xs text-right leading-loose">
            Exquisite silver craftsmanship, accessible for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ranges.map((range) => (
            <Link key={range.price} href="/products" className={`group relative h-[300px] overflow-hidden ${range.bg} flex flex-col items-center justify-center p-10 text-white text-center transition-all duration-700 hover:shadow-2xl`}>
               <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                  <p className="text-[9px] uppercase tracking-[0.5em] mb-4 text-gold font-bold">{range.title}</p>
                  <h3 className="text-2xl md:text-3xl font-serif tracking-tight leading-tight">
                    {range.price}
                  </h3>
               </div>
               
               <div className="absolute bottom-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Discover</span>
                  <ArrowRight size={12} className="text-gold" />
               </div>

               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="absolute inset-8 border border-white/5 group-hover:border-gold/20 transition-all duration-700" />
               
               {/* Decorative corner */}
               <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 -mr-8 -mt-8 rotate-45 group-hover:bg-gold/10 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetGifting;
