"use client";

import * as React from "react";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";

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

        <Button variant="primary" size="lg" className="px-12 bg-charcoal text-white hover:bg-gold-dark">
          View All
        </Button>
      </div>
    </section>
  );
};

export default TopSellers;
