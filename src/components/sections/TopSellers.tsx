"use client";

import * as React from "react";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface TopSellersProps {
  title: string;
}

const TopSellers = ({ title }: TopSellersProps) => {
  const containerRef = useGSAP(() => {
    gsap.from(".seller-header-reveal", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".sellers-section",
        start: "top 85%",
      },
    });

    gsap.from(".seller-item", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".sellers-grid",
        start: "top 80%",
      },
    });
  });

  return (
    <section ref={containerRef} className="sellers-section py-32 bg-white relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-silver-50 opacity-30 pointer-events-none select-none -z-10 tracking-tighter">
        Heritage
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <p className="seller-header-reveal text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Masterfully Crafted</p>
            <h2 className="seller-header-reveal text-5xl md:text-6xl font-serif text-charcoal leading-[0.9] tracking-tighter">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "italic text-silver-400" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h2>
          </div>
          <p className="seller-header-reveal text-sm text-charcoal/40 font-sans tracking-widest uppercase mb-2 hidden lg:block">
            Curated selection of our most loved artisan pieces.
          </p>
        </div>

        <div className="sellers-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20 mb-24">
          {products.filter(p => p.featured || title.includes("New")).slice(0, 4).map((product) => (
            <div key={product.id} className="seller-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="seller-header-reveal flex justify-center">
          <Link href="/products" className="group relative overflow-hidden bg-charcoal text-white px-16 py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 hover:bg-gold">
            <span className="relative z-10 flex items-center gap-4">
               View Entire Treasury <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
