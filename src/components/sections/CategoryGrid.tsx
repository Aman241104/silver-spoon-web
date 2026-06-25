"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Diamond } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";
import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = [
  { name: "Men's Collection",   href: "/products?gender=men",         image: "/images/collections/men-category-new.png" },
  { name: "Women's Collection", href: "/products?gender=women",        image: "/images/collections/women-category-circle.png" },
  { name: "Gifting Collection", href: "/gifting",                       image: "/images/collections/image-removebg-preview(1).png" },
  { name: "Silverware",         href: "/collections/utensils",          image: "/images/collections/silverware.png" },
  { name: "Pooja & Spiritual",  href: "/collections/silver-idols",      image: "/images/collections/ganesha-statue.png" },
  { name: "German Silver",      href: "/collections/german-silver",     image: "/images/collections/gifts-hampers.png" },
  { name: "Rakhi Collection",   href: "/collections/rakhi",             image: "/images/collections/rakhi.png" },
];

const VISIBLE = 6;

const CategoryGrid = () => {
  const [offset, setOffset] = useState(0);
  const maxOffset = categories.length - VISIBLE;
  const trackRef = useRef<HTMLDivElement>(null);

  const slide = useCallback((dir: number) => {
    setOffset(prev => Math.max(0, Math.min(maxOffset, prev + dir)));
  }, [maxOffset]);

  const containerRef = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
    });

    tl.from(".section-title",  { y: 30, opacity: 0, duration: 1 })
      .from(".divider",        { scaleX: 0, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".category-item",  { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out" }, "-=0.3");
  });

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center relative">

        <h2 className="text-[24px] md:text-[28px] font-serif text-[#1a1a1a] tracking-[0.05em] uppercase mb-3 font-medium section-title">
          Shop By Category
        </h2>

        <div className="flex items-center justify-center gap-2 mb-10 md:mb-16 divider">
          <div className="h-[1px] w-10 bg-gray-200" />
          <Diamond size={8} className="text-gold" fill="currentColor" />
          <div className="h-[1px] w-10 bg-gray-200" />
        </div>

        {/* Carousel */}
        <div className="relative max-w-[1400px] mx-auto">

          {/* Prev arrow */}
          <button
            aria-label="Previous categories"
            onClick={() => slide(-1)}
            disabled={offset === 0}
            className="absolute left-0 top-[45px] md:top-[56px] -translate-y-1/2 z-10 w-10 h-10 border rounded-full flex items-center justify-center bg-white shadow-md -ml-4 md:-ml-12 transition-all duration-300 disabled:opacity-30 disabled:cursor-default border-charcoal/20 text-charcoal/60 hover:text-gold hover:border-gold"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${offset} * (100% / ${VISIBLE})))` }}
            >
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={cat.href}
                  style={{ minWidth: `calc(100% / ${VISIBLE})` }}
                  className="flex flex-col items-center group category-item px-2 md:px-3"
                >
                  <div className="relative w-20 h-20 md:w-28 md:h-28 mb-4 rounded-full bg-[#F5F2EB] flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-gold/40 group-hover:shadow-lg transition-all duration-500">
                    <div className="relative w-3/4 h-3/4 transform transition-all duration-700 ease-out group-hover:scale-110">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 80px, 112px"
                        className="object-contain drop-shadow-sm"
                      />
                    </div>
                    {/* Gold shimmer ring on hover */}
                    <div className="absolute inset-0 rounded-full ring-0 ring-gold/0 group-hover:ring-2 group-hover:ring-gold/30 transition-all duration-500" />
                  </div>
                  <span className="text-[12px] md:text-[13px] font-serif text-[#2c2c2c] group-hover:text-gold transition-colors duration-300 font-medium tracking-tight text-center leading-tight">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <button
            aria-label="Next categories"
            onClick={() => slide(1)}
            disabled={offset >= maxOffset}
            className="absolute right-0 top-[45px] md:top-[56px] -translate-y-1/2 z-10 w-10 h-10 border rounded-full flex items-center justify-center bg-white shadow-md -mr-4 md:-mr-12 transition-all duration-300 disabled:opacity-30 disabled:cursor-default border-charcoal/20 text-charcoal/60 hover:text-gold hover:border-gold"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Dot indicators */}
        {maxOffset > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {Array.from({ length: maxOffset + 1 }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setOffset(i)}
                className={`rounded-full transition-all duration-300 ${
                  offset === i ? "w-5 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default CategoryGrid;
