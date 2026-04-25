"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const CollectionByColor = () => {
  const collections = [
    {
      title: "Radiant Silver",
      image: "/images/products/bracelets.png",
      overlay: "bg-charcoal/40",
      tag: "Pure 925"
    },
    {
      title: "Rose Gold",
      image: "/images/products/regular-ring.png",
      overlay: "bg-[#5c3d2e]/50",
      tag: "Warm Glow"
    },
    {
      title: "Antique Oxidised",
      image: "/images/products/payal.png",
      overlay: "bg-[#2d1b14]/60",
      tag: "Heritage"
    },
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-24">
           <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">A Palette of Craftsmanship</p>
           <h2 className="text-5xl md:text-7xl font-serif text-charcoal leading-[0.85] tracking-tighter">
             Artisan <span className="italic text-silver-400">Hues.</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {collections.map((col) => (
            <Link key={col.title} href="/products" className="group relative h-[500px] md:h-[650px] overflow-hidden flex flex-col items-center justify-end p-12 text-white">
               <Image 
                 src={col.image}
                 alt={col.title}
                 fill
                 className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
               />
               <div className={`absolute inset-0 transition-all duration-1000 ${col.overlay} group-hover:opacity-80`} />
               
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

               <div className="relative z-10 text-center w-full">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">{col.tag}</p>
                  <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight tracking-tighter">
                    {col.title}
                  </h3>
                  <div className="w-0 h-[1px] bg-white/40 mx-auto mb-10 group-hover:w-full transition-all duration-1000" />
                  
                  <div className="flex items-center justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Explore Piece</span>
                    <ArrowUpRight size={14} className="text-gold" />
                  </div>
               </div>

               {/* Decorative border */}
               <div className="absolute inset-8 border border-white/0 group-hover:border-white/10 transition-all duration-1000 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionByColor;
