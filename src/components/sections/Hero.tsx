"use client";

import * as React from "react";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";

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
      className="relative h-[85vh] flex items-center justify-center pt-20 overflow-hidden bg-[#2d1b14] text-white"
    >
      {/* Decorative Circle from Reference */}
      <div className="hero-circle absolute -left-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/20 rounded-full" />
      <div className="hero-circle absolute left-[-100px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold/10 rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="hero-content text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.5em] text-gold mb-4 font-bold">
            925 Pure Silver Puja Utensils
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
            Pure Silver. <br />
            <span className="italic">Pure Living.</span>
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-lg mb-10 font-sans tracking-wide mx-auto lg:mx-0">
            Crafted in pure silver for rituals, gifting & daily use.
          </p>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-charcoal px-12">
            Shop Now
          </Button>
        </div>

        {/* Hero Image Area */}
        <div className="hidden lg:flex justify-center items-center relative">
           <div className="w-[450px] h-[450px] bg-gradient-to-br from-silver-100 to-silver-300 rounded-full flex items-center justify-center p-12 shadow-2xl relative overflow-hidden group">
              <div className="w-full h-full relative rounded-full overflow-hidden border border-white/20">
                 <Image 
                   src="https://images.unsplash.com/photo-1567591974574-e862630b79df?q=80&w=1200&auto=format&fit=crop"
                   alt="Pure Silver Ganesha Idol"
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-110"
                   priority
                 />
              </div>
              {/* Shine effect */}
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-45 animate-[shine_5s_infinite]" />
           </div>
        </div>
      </div>
      
      {/* Sparkles / Stars as in reference */}
      <div className="absolute top-20 right-[15%] text-gold opacity-50 text-2xl">✦</div>
      <div className="absolute bottom-40 right-[10%] text-gold opacity-30 text-xl">✦</div>
      <div className="absolute top-[40%] right-[5%] text-gold opacity-40 text-lg">✦</div>
    </section>
  );
};

export default Hero;
