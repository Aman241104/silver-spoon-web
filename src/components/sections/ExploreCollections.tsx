"use client";

import Link from "next/link";
import Image from "next/image";
import { Diamond } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ExploreCollections = () => {
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
      .from(".collection-card", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.4");
  });

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 bg-white font-sans">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-[24px] md:text-[28px] font-serif text-[#1a1a1a] tracking-[0.05em] uppercase mb-3 font-medium section-title">
          Explore Our Collections
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 mb-10 md:mb-16 divider">
          <div className="h-[1px] w-10 bg-gray-200"></div>
          <Diamond size={8} className="text-gold" fill="currentColor" />
          <div className="h-[1px] w-10 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-[1400px] mx-auto">
          {[
            { title: "MEN'S COLLECTION", href: "/products?gender=men", image: "/images/collections/men-category-new.png" },
            { title: "WOMEN'S COLLECTION", href: "/products?gender=women", image: "/images/collections/women-category.png" },
            { title: "GIFTING COLLECTION", href: "/gifting", image: "/images/collections/gifting-collection.png" },
            { title: "SILVERWARE & TABLEWARE", href: "/collections/utensils", image: "/images/collections/new-arrivals.png" },
          ].map((col, idx) => (
            <Link key={idx} href={col.href} className="group flex flex-col items-center collection-card">              <div className="relative w-full aspect-square mb-5 overflow-hidden bg-[#FAF8F5]">
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
            </div>
              <h3 className="text-[15px] md:text-[16px] font-serif text-[#1a1a1a] mb-2 tracking-[0.02em] font-medium">
                {col.title}
              </h3>
              <span className="text-[10px] text-gray-400 group-hover:text-gold transition-all font-bold tracking-[0.12em] uppercase flex items-center gap-1.5">
                View Collection <span className="text-[14px] leading-none mb-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCollections;
