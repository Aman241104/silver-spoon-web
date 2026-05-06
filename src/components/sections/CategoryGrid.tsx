"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Diamond } from "lucide-react";

const categories = [
  { name: "Brooches", slug: "brooches", image: "/images/collections/jewellery.png" },
  { name: "German Silver", slug: "german-silver", image: "/images/products/pooja-utensils.png" },
  { name: "Silver Idols", slug: "silver-idols", image: "/images/collections/pooja.png" },
  { name: "Silver Frames", slug: "silver-frames", image: "/images/collections/gifting.png" },
  { name: "Women's Collection", slug: "women", image: "/images/collections/jewellery.png" },
  { name: "Men's Collection", slug: "men", image: "/images/products/regular-ring.png" },
];

const CategoryGrid = () => {
  return (
    <section className="py-12 md:py-20 bg-white font-sans">
      <div className="container mx-auto px-6 md:px-12 text-center relative">
        <h2 className="text-[28px] md:text-[36px] font-serif text-[#2c2c2c] tracking-[0.1em] uppercase mb-4 font-medium">
          Shop By Category
        </h2>
        
        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-10 md:mb-16">
          <div className="h-[1px] w-14 bg-gray-200"></div>
          <Diamond size={12} className="text-gray-300" fill="currentColor" />
          <div className="h-[1px] w-14 bg-gray-200"></div>
        </div>

        {/* Slider Area */}
        <div className="relative max-w-[1400px] mx-auto flex items-center">
          <button className="absolute left-0 z-10 w-11 h-11 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-charcoal bg-white -ml-4 md:-ml-8 shadow-sm transition-all hover:border-gray-300">
            <ChevronLeft size={22} strokeWidth={1} />
          </button>

          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
            {categories.map((cat, idx) => (
              <Link key={idx} href={`/collections/${cat.slug}`} className="flex flex-col items-center group">
                <div className="relative w-28 h-28 md:w-36 md:h-36 mb-6">
                  <div className="relative w-full h-full drop-shadow-md">
                    <Image 
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <span className="text-[14px] md:text-[15px] font-serif text-[#2c2c2c] group-hover:text-[#8a8a8a] transition-colors font-medium">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>

          <button className="absolute right-0 z-10 w-11 h-11 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-charcoal bg-white -mr-4 md:-mr-8 shadow-sm transition-all hover:border-gray-300">
            <ChevronRight size={22} strokeWidth={1} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
