"use client";

import * as React from "react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const containerRef = useGSAP((ctx) => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-title span", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
    })
      .from(
        ".hero-sub",
        {
          y: 20,
          opacity: 0,
          duration: 1,
        },
        "-=0.8"
      )
      .from(
        ".hero-cta",
        {
          y: 20,
          opacity: 0,
          duration: 1,
        },
        "-=0.8"
      )
      .from(
        ".hero-image-container",
        {
          scale: 1.1,
          opacity: 0,
          duration: 2,
          ease: "expo.out",
        },
        "0"
      );
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-silver-50"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-silver-100/50 -skew-x-12 translate-x-1/4 z-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <p className="hero-sub text-xs md:text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">
              Est. 1995 • Purity Guaranteed
            </p>
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-serif text-charcoal leading-[1.1] mb-8">
              <span className="block overflow-hidden">Elegance</span>
              <span className="block overflow-hidden">In Every</span>
              <span className="block overflow-hidden italic text-silver-400">Detail.</span>
            </h1>
            <p className="hero-sub text-base md:text-lg text-charcoal/70 font-sans leading-relaxed mb-12 max-w-lg">
              Discover our exquisite collection of handcrafted silver jewellery,
              sacred idols, and premium gifting items. Each piece tells a story
              of heritage and timeless beauty.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="group">
                Explore Collections
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Our Story
              </Button>
            </div>
          </div>

          <div className="hero-image-container relative aspect-[4/5] lg:aspect-square w-full max-w-xl mx-auto">
             {/* Placeholder for Premium Product Image */}
             <div className="absolute inset-0 bg-silver-200 border border-silver-300 overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-silver-100 to-silver-300 flex items-center justify-center p-20">
                    <div className="w-full h-full border border-white/30 relative flex items-center justify-center">
                        <span className="font-serif text-silver-500/20 text-9xl absolute -rotate-12 select-none">SILVER</span>
                        <div className="relative z-10 text-center">
                            <div className="w-48 h-48 rounded-full border border-gold/20 mb-6 mx-auto animate-pulse flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full border border-gold/40" />
                            </div>
                            <p className="font-serif italic text-charcoal/40 text-xl tracking-widest uppercase">Premium Product Image</p>
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Decorative Badges */}
             <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl hidden md:block border border-silver-100">
                <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 mb-2">Purity Standard</p>
                <p className="text-xl font-serif text-charcoal tracking-widest uppercase">925 Sterling</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
