"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Diamond } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = [
  { name: "Men's Collection", href: "/products?gender=men", image: "/images/collections/men-category-new.png" },
  { name: "Women's Collection", href: "/products?gender=women", image: "/images/collections/women-category-circle.png" },
  { name: "Gifting Collection", href: "/gifting", image: "/images/collections/image-removebg-preview(1).png" },
  { name: "Silverware", href: "/collections/utensils", image: "/images/collections/silverware.png" },
  { name: "Pooja & Spiritual", href: "/collections/silver-idols", image: "/images/collections/ganesha-statue.png" },
  { name: "German Silver", href: "/collections/german-silver", image: "/images/collections/gifts-hampers.png" },
  { name: "Rakhi Collection", href: "/collections/rakhi", image: "/images/category/SILVER 925 RAKHI BRACELATE/925RAKHI001.jpg" },
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
          <button aria-label="Previous categories" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-charcoal/20 rounded-full flex items-center justify-center text-charcoal/60 hover:text-gold hover:border-gold bg-white shadow-md -ml-4 md:-ml-10 transition-all duration-300">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          <div className="w-full grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
            {categories.map((cat, idx) => (
              <Link key={idx} href={cat.href} className="flex flex-col items-center group category-item">
                <div className="relative w-20 h-20 md:w-28 md:h-28 mb-4 rounded-full bg-[#F5F2EB] flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-gold/40 group-hover:shadow-md transition-all duration-500">
                  <div className="relative w-3/4 h-3/4 transform transition-all duration-700 ease-out group-hover:scale-110">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain drop-shadow-sm"
                    />
                  </div>
                </div>
                <span className="text-[12px] md:text-[13px] font-serif text-[#2c2c2c] group-hover:text-gold transition-colors font-medium tracking-tight text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>

          <button aria-label="Next categories" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-charcoal/20 rounded-full flex items-center justify-center text-charcoal/60 hover:text-gold hover:border-gold bg-white shadow-md -mr-4 md:-mr-10 transition-all duration-300">
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
