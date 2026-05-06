"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gem, Award, Gift } from "lucide-react"; 

const Hero = () => {
  return (
    <section className="bg-[#FAF8F5] relative overflow-hidden font-sans pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">
        
        {/* Left Content */}
        <div className="flex flex-col items-start lg:pl-10">
          <h1 className="text-[40px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-6 md:mb-8 tracking-tight font-medium">
            Timeless Elegance, <br /> Thoughtful Gifting
          </h1>
          <p className="text-[#5a5a5a] text-base md:text-lg mb-8 md:mb-12 max-w-lg leading-relaxed">
            Exquisite Silver & German Silver products crafted to celebrate every moment.
          </p>
          
          <Link href="/collections" className="bg-[#1a1a1a] text-white px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all mb-12 md:mb-20 rounded-sm">
            EXPLORE COLLECTION
          </Link>

          {/* Features */}
          <div className="flex flex-wrap gap-6 md:gap-14 mt-8 md:mt-16">
            <div className="flex items-center gap-3">
              <Gem size={28} className="text-[#2c2c2c] stroke-[1.5]" />
              <div>
                <h4 className="text-[13px] font-bold text-[#2c2c2c] mb-0.5">Pure Quality</h4>
                <p className="text-[11px] text-[#6a6a6a]">Crafted to Perfection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Award size={28} className="text-[#2c2c2c] stroke-[1.5]" />
              <div>
                <h4 className="text-[13px] font-bold text-[#2c2c2c] mb-0.5">Elegant Designs</h4>
                <p className="text-[11px] text-[#6a6a6a]">For Every Occasion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Gift size={28} className="text-[#2c2c2c] stroke-[1.5]" />
              <div>
                <h4 className="text-[13px] font-bold text-[#2c2c2c] mb-0.5">Perfect for Gifting</h4>
                <p className="text-[11px] text-[#6a6a6a]">Make Moments Special</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="relative w-full h-[500px] md:h-[650px] lg:h-[750px] flex justify-center items-center">
          <Image
            src="/images/collections/pooja.png"
            alt="Silver Elegance"
            fill
            className="object-contain mix-blend-multiply drop-shadow-2xl"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
