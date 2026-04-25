"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-content", {
      y: 50,
      opacity: 0,
      duration: 1.5,
    })
    .from(".hero-circle", {
      scale: 0.8,
      opacity: 0,
      duration: 2,
    }, 0);
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[85vh] md:h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-[#1a0a05] text-white"
    >
      {/* Decorative Circles from Reference */}
      <div className="hero-circle absolute -left-40 top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] border border-gold/10 rounded-full" />
      <div className="hero-circle absolute -left-20 top-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[700px] border border-gold/5 rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="hero-content text-center lg:text-left">
          <div className="relative h-20 w-48 mb-8 mx-auto lg:mx-0 opacity-90">
            <Image
              src="/images/logo.png"
              alt="Silver Spoon Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold mb-6 font-bold">
            925 Pure Silver Puja Utensils
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif mb-8 leading-[1.1] tracking-tight">
            Pure Silver. <br />
            <span className="italic text-white/90">Pure Living.</span>
          </h1>
          <p className="text-xs md:text-base text-white/50 max-w-lg mb-12 font-sans tracking-[0.2em] uppercase mx-auto lg:mx-0">
            Crafted in pure silver for rituals, gifting & daily use.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link href="/products" className="border border-white text-white hover:bg-white hover:text-charcoal px-12 md:px-16 py-4 md:py-5 text-sm md:text-base uppercase tracking-[0.3em] font-bold transition-all duration-500 bg-transparent">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Hero Image Area - Large Circle as in Reference */}
        <div className="hidden lg:flex justify-center items-center relative">
           <div className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-white/5 rounded-full flex items-center justify-center p-12 relative">
              <div className="w-full h-full relative rounded-full overflow-hidden border border-white/10 shadow-2xl">
                 <Image 
                   src="/images/products/pooja-utensils.png"
                   alt="Pure Silver Puja Utensils"
                   fill
                   className="object-cover transition-transform duration-700 hover:scale-110"
                   priority
                 />
              </div>
              
              {/* Decorative small sparkle as in reference */}
              <div className="absolute -top-10 right-20 text-gold text-4xl animate-pulse">✦</div>
           </div>
        </div>
      </div>
      
      {/* Background Sparkles */}
      <div className="absolute top-40 right-[5%] text-gold opacity-20 text-3xl">✦</div>
      <div className="absolute bottom-20 left-[10%] text-gold opacity-10 text-2xl">✦</div>
    </section>
  );
};

export default Hero;
