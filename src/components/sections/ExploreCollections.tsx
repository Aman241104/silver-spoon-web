"use client";

import Link from "next/link";
import Image from "next/image";
import { Diamond } from "lucide-react";

const collections = [
  { title: "SILVER IDOLS", slug: "silver-idols", image: "/images/collections/pooja.png" },
  { title: "GERMAN SILVER", slug: "german-silver", image: "/images/products/pooja-utensils.png" },
  { title: "SILVER FRAMES", slug: "silver-frames", image: "/images/collections/gifting.png" },
  { title: "SILVER COATED", slug: "silver-coated", image: "/images/collections/jewellery.png" },
];

const ExploreCollections = () => {
  return (
    <section className="py-12 md:py-20 bg-white font-sans">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-[28px] md:text-[36px] font-serif text-[#2c2c2c] tracking-[0.1em] uppercase mb-4 font-medium">
          Explore Our Collections
        </h2>
        
        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-10 md:mb-16">
          <div className="h-[1px] w-14 bg-gray-200"></div>
          <Diamond size={12} className="text-gray-300" fill="currentColor" />
          <div className="h-[1px] w-14 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {collections.map((col, idx) => (
            <Link key={idx} href={`/collections/${col.slug}`} className="group flex flex-col items-center">
              <div className="relative w-full aspect-square mb-6 md:mb-10 overflow-hidden bg-[#FAF8F5]">
                <Image 
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <h3 className="text-[17px] md:text-[18px] font-serif text-[#2c2c2c] mb-3 tracking-wide uppercase font-medium">
                {col.title}
              </h3>
              <span className="text-[12px] text-gray-400 group-hover:text-charcoal transition-all font-bold tracking-widest uppercase flex items-center gap-2">
                View Collection <span className="text-lg leading-none">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCollections;
