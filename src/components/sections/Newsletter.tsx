"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Newsletter = () => {
  const containerRef = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.from(".newsletter-content", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .from(".newsletter-image", {
      scale: 1.05,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }, 0);
  });

  return (
    <section ref={containerRef} className="relative w-full min-h-[500px] md:min-h-[700px] overflow-hidden bg-[#F5F2EB] flex items-center">
      
      {/* Full-width Background Image with Fade */}
      <div className="absolute inset-0 w-full h-full flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-1/2 h-[300px] lg:h-full newsletter-image">
          <Image
            src="/images/collections/new-arrivals.jpg"
            alt="Silver Lifestyle"
            fill
            className="object-cover object-left"
            priority
          />
          {/* Seamless fade to background color */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent/40 via-80% to-[#F5F2EB] hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/40 via-70% to-[#F5F2EB] lg:hidden" />
        </div>
        <div className="hidden lg:block lg:w-1/2 bg-[#F5F2EB]" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-end">
          <div className="lg:w-1/2 flex flex-col justify-center newsletter-content lg:pl-16">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#1a1a1a]/50 font-bold mb-4">
              LIMITED EDITION
            </span>
            <h2 className="text-[36px] md:text-[56px] lg:text-[64px] font-serif text-[#1a1a1a] leading-[1.05] mb-6 font-normal tracking-tight">
              Exclusive Offers & <br /> New Arrivals
            </h2>
            <p className="text-[#444444] text-base md:text-lg mb-10 leading-relaxed font-medium max-w-md">
              Discover our latest handcrafted masterpieces. From divine idols to artisan jewellery, explore the legacy of pure silver.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products" 
                className="inline-block bg-[#111827] text-white px-12 py-6 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all text-center rounded-sm"
              >
                View Collection
              </Link>
              <Link
                href="/gifting"
                className="inline-block bg-white text-[#111827] border border-[#111827] px-12 py-6 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-all text-center rounded-sm"
              >
                Artisan Gifting
              </Link>
              </div>

              <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              *New designs added every week to our curated collection
              </p>          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
