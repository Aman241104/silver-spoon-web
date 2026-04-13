"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";

const CollectionByColor = () => {
  const collections = [
    {
      title: "Shine in Silver",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
      color: "bg-charcoal/40",
    },
    {
      title: "Glow in Rose Gold",
      image: "https://images.unsplash.com/photo-1617033930343-dc8116270b92?q=80&w=800&auto=format&fit=crop",
      color: "bg-[#5c3d2e]/60",
    },
    {
      title: "Bold in Oxidised",
      image: "https://images.unsplash.com/photo-1599643477877-537ef5278533?q=80&w=800&auto=format&fit=crop",
      color: "bg-[#2d1b14]/60",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-charcoal mb-4 uppercase tracking-ultra">
          Shop by Color
        </h2>
        <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold mb-16">
          Find Your Perfect Hue
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((col) => (
            <Link key={col.title} href="/collections/rings" className="group relative h-[400px] md:h-[450px] overflow-hidden flex flex-col items-center justify-center p-8 text-white">
               <Image 
                 src={col.image}
                 alt={col.title}
                 fill
                 className="object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               <div className={`absolute inset-0 transition-opacity duration-500 ${col.color} group-hover:opacity-40`} />
               
               <div className="relative z-10 text-center">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                    {col.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-white/40 mx-auto mb-8" />
                  <div className="inline-block border border-white px-8 py-3 text-[10px] uppercase tracking-ultra hover:bg-white hover:text-charcoal transition-all">
                    Shop Now
                  </div>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionByColor;
