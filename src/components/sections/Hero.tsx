"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award, Gift } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 1.5 }
    });

    tl.from(".hero-content > *", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
    })
    .from(".hero-image", {
      scale: 1.1,
      opacity: 0,
      duration: 2,
    }, 0)
    .from(".hero-feature", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 1
    }, "-=1");
  });

  return (
    <section ref={containerRef} className="relative w-full h-[85vh] md:h-screen bg-[#F5F2EB] overflow-hidden flex items-center">
      {/* Background Image - Taking whole section */}
      <div className="absolute inset-0 w-full h-full hero-image">
        <Image
          src="/images/hero-gifting.jpg"
          alt="Silver Elegance Hero"
          fill
          priority
          className="object-cover object-right md:object-center opacity-60 md:opacity-100"
        />
        {/* Gradient Overlay for better text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EB] via-[#F5F2EB]/50 to-transparent md:hidden" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-start lg:w-1/2 hero-content">
          <h1 className="text-[42px] md:text-[64px] lg:text-[80px] font-serif text-[#1a1a1a] leading-[1] mb-6 font-normal tracking-tight">
            Timeless Elegance, <br />
            Thoughtful Gifting
          </h1>
          
          <p className="text-[#444444] text-base md:text-lg mb-10 max-w-md leading-relaxed">
            Exquisite Silver & German Silver products crafted to celebrate every life moment with purity and grace.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-16 md:mb-20">
            <Link 
              href="/products" 
              className="inline-block bg-[#111827] text-white px-10 py-4 text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              EXPLORE COLLECTION
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div className="flex items-center gap-3 hero-feature">
              <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Sparkles size={18} className="text-[#1a1a1a] stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">Pure Quality</p>
                <p className="text-[10px] text-[#666666] font-medium italic">Crafted to Perfection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 hero-feature">
              <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Award size={18} className="text-[#1a1a1a] stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">Elegant Designs</p>
                <p className="text-[10px] text-[#666666] font-medium italic">For Every Occasion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 hero-feature">
              <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Gift size={18} className="text-[#1a1a1a] stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">Perfect for Gifting</p>
                <p className="text-[10px] text-[#666666] font-medium italic">Make Moments Special</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
