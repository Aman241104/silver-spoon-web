"use client";

import * as React from "react";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";

interface TopSellersProps {
  title: string;
}

const TopSellers = ({ title }: TopSellersProps) => {
  const containerRef = useGSAP(() => {
    gsap.from(".seller-item", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".sellers-grid",
        start: "top 85%",
      },
    });
  });

  return (
    <section ref={containerRef} className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4 uppercase tracking-ultra">
          {title}
        </h2>
        <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold mb-16">
          Exclusive Handcrafted Silver Designs
        </p>

        <div className="sellers-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="seller-item text-left">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/products" className="bg-charcoal text-white hover:bg-gold px-16 py-4 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold transition-all duration-500 shadow-xl">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
