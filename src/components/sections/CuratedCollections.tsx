"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CuratedCollections = () => {
  const items = [
    { 
      title: "Elegant", 
      audience: "For Women", 
      tagline: "Artisan Grace",
      image: "/images/collections/jewellery.png",
      href: "/collections/women"
    },
    { 
      title: "Timeless", 
      audience: "For Men", 
      tagline: "Classic Strength",
      image: "/images/products/bracelets.png",
      href: "/collections/men"
    },
    { 
      title: "Charming", 
      audience: "For Kids", 
      tagline: "Adorable Heritage",
      image: "/images/products/payal.png",
      href: "/collections/kids"
    },
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl text-center md:text-left">
             <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Bespoke Curation</p>
             <h2 className="text-5xl md:text-6xl font-serif text-charcoal leading-[0.9] tracking-tighter">
               Portraits of <span className="italic text-silver-400">Purity</span>
             </h2>
          </div>
          <p className="text-sm text-charcoal/40 font-sans tracking-widest uppercase mb-2 hidden lg:block max-w-xs text-right leading-loose">
            Thoughtfully curated collections designed for every personality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item) => (
            <Link key={item.audience} href={item.href} className="group relative h-[600px] overflow-hidden bg-[#0a0a0a] p-12 flex flex-col items-center justify-between text-white transition-all duration-700 hover:shadow-2xl">
               {/* Header */}
               <div className="relative z-10 text-center">
                  <p className="font-serif italic text-3xl text-silver-200 mb-2 transition-transform duration-700 group-hover:translate-y-[-4px]">{item.title}</p>
                  <h3 className="text-sm uppercase tracking-[0.5em] font-bold text-gold">{item.audience}</h3>
               </div>
               
               {/* Arched Image Treatment */}
               <div className="relative w-full aspect-[4/5] rounded-t-full border-t border-x border-white/5 bg-charcoal/50 overflow-hidden transition-all duration-1000 group-hover:border-gold/20">
                  <Image 
                    src={item.image}
                    alt={item.audience}
                    fill
                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
               </div>
               
               {/* Footer */}
               <div className="relative z-10 text-center w-full">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-all duration-700 border-b border-white/5 pb-4 mb-6">{item.tagline}</p>
                  <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                     <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Discover</span>
                     <ArrowRight size={12} className="text-gold" />
                  </div>
               </div>
               
               {/* Patterned Background */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.07]">
                  <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;
