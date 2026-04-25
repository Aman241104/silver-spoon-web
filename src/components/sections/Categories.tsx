"use client";

import * as React from "react";
import Link from "next/link";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  {
    title: "Exquisite Jewellery",
    description: "Handcrafted rings, bracelets, and necklaces in 925 sterling silver.",
    image: "/images/collections/jewellery.png",
    href: "/collections/jewellery",
    color: "bg-silver-100",
  },
  {
    title: "Sacred Pooja & Idols",
    description: "Divine silver idols and pooja utensils for your spiritual space.",
    image: "/images/collections/pooja.png",
    href: "/collections/pooja-idols",
    color: "bg-platinum",
  },
  {
    title: "German Silver Gifts",
    description: "Premium thali sets and gifting items for every celebration.",
    image: "/images/collections/gifting.png",
    href: "/collections/gifting",
    color: "bg-silver-200",
  },
];

const Categories = () => {
  const containerRef = useGSAP(() => {
    gsap.from(".category-card", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".categories-grid",
        start: "top 80%",
      },
    });

    gsap.from(".section-header", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".section-header",
        start: "top 85%",
      },
    });
  });

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="section-header mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-gold font-bold mb-4">
            Curated Collections
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
            Shop by Category
          </h2>
          <div className="w-20 h-[1px] bg-gold" />
        </div>

        <div className="categories-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="category-card group relative block overflow-hidden aspect-[3/4]"
            >
              {/* Background Color/Placeholder Image */}
              <div className={`absolute inset-0 ${category.color} transition-transform duration-700 group-hover:scale-110`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Visual Placeholder Content */}
                <div className="w-full h-full flex items-center justify-center opacity-10">
                   <span className="font-serif text-7xl -rotate-12 select-none uppercase tracking-widest">{category.title.split(' ')[1]}</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <p className="text-[10px] uppercase tracking-ultra mb-2 opacity-80 group-hover:translate-x-1 transition-transform duration-500">
                  Explore Collection
                </p>
                <h3 className="text-2xl md:text-3xl font-serif mb-4 leading-tight">
                  {category.title}
                </h3>
                <p className="text-sm text-white/70 max-w-xs font-sans mb-6 line-clamp-2 group-hover:opacity-100 transition-opacity">
                  {category.description}
                </p>
                
                <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-500">
                   <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-charcoal transition-all">
                      <ArrowUpRight size={18} />
                   </div>
                   <span className="text-xs uppercase tracking-ultra font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop Now
                   </span>
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-4 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
