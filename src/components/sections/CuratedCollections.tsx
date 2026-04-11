"use client";

import Link from "next/link";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";

const CuratedCollections = () => {
  const items = [
    { title: "Elegant", audience: "Women's Collection", tagline: "Stylish Silver for Her" },
    { title: "Timeless", audience: "Men's Collection", tagline: "Classic Silver for Him" },
    { title: "Charming", audience: "Kid's Collection", tagline: "Adorable Silver for Kids" },
  ];

  return (
    <section className="py-24 bg-silver-50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl font-serif text-charcoal mb-4 uppercase tracking-ultra">
          Curated Collections for Your Loved Ones
        </h2>
        <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold mb-16">
          Thoughtfully Designed for Every Personality
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link key={item.audience} href="#" className="group relative h-[550px] overflow-hidden bg-[#2d1b14] p-10 flex flex-col items-center justify-start text-white">
               {/* Reference Style: Top Text, then Image, then Bottom Tagline */}
               <div className="relative z-10 text-center mb-10">
                  <p className="font-serif italic text-2xl mb-2">{item.title}</p>
                  <h3 className="text-2xl uppercase tracking-ultra font-bold">{item.audience}</h3>
               </div>
               
               {/* Circular Image Placeholder as in Reference */}
               <div className="relative w-64 h-80 rounded-t-full border-t-2 border-x-2 border-gold/30 bg-silver-100 overflow-hidden group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-silver-50 to-silver-200" />
               </div>
               
               <div className="relative z-10 mt-10 text-center">
                  <p className="text-xs uppercase tracking-[0.4em] opacity-60 group-hover:opacity-100 transition-opacity">{item.tagline}</p>
               </div>
               
               {/* Patterned Background as in Reference */}
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;
