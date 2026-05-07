"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Diamond } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = [
  { name: "Pooja & Spiritual", slug: "pooja", image: "/images/collections/ganesha-statue.png" },
  { name: "Silverware", slug: "silverware", image: "/images/collections/silverware.png" },
  { name: "Decor", slug: "decor", image: "/images/collections/decor.png" },
  { name: "Tableware", slug: "tableware", image: "/images/collections/tableware.png" },
  { name: "Gifts & Hampers", slug: "gifting", image: "/images/collections/gifts-hampers.png" },
  { name: "Personalised", slug: "personalised", image: "/images/collections/personalised.png" },
];

const CategoryGrid = () => {
  const containerRef = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    tl.from(".section-title", { y: 30, opacity: 0, duration: 1 })
      .from(".divider", { scaleX: 0, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".category-item", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.3");
  });

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center relative">
        <h2 className="text-[24px] md:text-[28px] font-serif text-[#1a1a1a] tracking-[0.05em] uppercase mb-3 font-medium section-title">
          Shop By Category
        </h2>
        
        {/* Divider */}
        <div className="flex items-center justify-center gap-2 mb-10 md:mb-16 divider">
          <div className="h-[1px] w-10 bg-gray-200"></div>
          <Diamond size={8} className="text-gold" fill="currentColor" />
          <div className="h-[1px] w-10 bg-gray-200"></div>
        </div>

        {/* Slider Area */}
        <div className="relative max-w-[1400px] mx-auto">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-charcoal/5 rounded-full flex items-center justify-center text-charcoal/30 hover:text-gold hover:border-gold bg-white -ml-4 md:-ml-10 transition-all duration-300">
            <ChevronLeft size={20} strokeWidth={1} />
          </button>

          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
            {categories.map((cat, idx) => (
              <Link key={idx} href={`/collections/${cat.slug}`} className="flex flex-col items-center group category-item">
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 flex items-center justify-center">
                  <div className="relative w-full h-full transform transition-all duration-700 ease-out group-hover:scale-105">
                    <Image 
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain mix-blend-multiply drop-shadow-sm"
                    />
                  </div>
                </div>
                <span className="text-[13px] md:text-[14px] font-serif text-[#2c2c2c] group-hover:text-gold transition-colors font-medium tracking-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-charcoal/5 rounded-full flex items-center justify-center text-charcoal/30 hover:text-gold hover:border-gold bg-white -mr-4 md:-mr-10 transition-all duration-300">
            <ChevronRight size={20} strokeWidth={1} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
