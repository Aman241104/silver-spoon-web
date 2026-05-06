"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gem, Award, Gift } from "lucide-react"; 

const Hero = () => {
  return (
    <section className="bg-[#FAF8F5] relative overflow-hidden font-sans pt-16 pb-32">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        
        {/* Left Content */}
        <div className="flex flex-col items-start lg:pl-10">
          <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium">
            Timeless Elegance, <br /> Thoughtful Gifting
          </h1>
          <p className="text-[#5a5a5a] text-lg mb-12 max-w-lg leading-relaxed">
            Exquisite Silver & German Silver products crafted to celebrate every moment.
          </p>
          
          <Link href="/collections" className="bg-[#1a1a1a] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all mb-20 rounded-sm">
            EXPLORE COLLECTION
          </Link>

          {/* Features */}
          <div className="flex flex-wrap gap-8 md:gap-14 mt-16">
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
