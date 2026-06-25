"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Diamond } from "lucide-react";
import { products } from "@/data/products";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const weeklyProducts = products.filter((p) => p.category === "weekly-fast-moving").slice(0, 6);

const WeeklyCollection = () => {
  const containerRef = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".weekly-card", {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".weekly-grid",
        start: "top 80%",
      },
    });
  });

  if (weeklyProducts.length === 0) return null;

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-[#0f1115] text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame size={14} className="text-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">This Week&apos;s Picks</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              Weekly Fast Moving <br />
              <span className="italic text-white/60">New Collection</span>
            </h2>
          </div>
          <Link
            href="/collections/weekly-fast-moving"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1 w-fit"
          >
            View All 50 <ArrowRight size={14} />
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-[1px] flex-1 bg-white/10" />
          <Diamond size={8} className="text-gold" fill="currentColor" />
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Grid */}
        <div className="weekly-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {weeklyProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="weekly-card group flex flex-col"
            >
              <div className="relative aspect-square bg-white/5 overflow-hidden mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-2 left-2">
                  <span className="bg-gold text-[#0f1115] text-[8px] uppercase tracking-wider font-bold px-2 py-0.5">
                    New
                  </span>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                {product.subCategory || product.category}
              </p>
              <h3 className="text-[13px] font-serif text-white/90 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                {product.name}
              </h3>
              {product.price > 0 && (
                <p className="text-[12px] text-white/50 mt-1">₹{product.price.toLocaleString("en-IN")}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyCollection;
