"use client";

import { Diamond, Heart, Award, Star, Users } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Features = () => {
  const containerRef = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    tl.from(".section-title", { y: 30, opacity: 0, duration: 1 })
      .from(".divider", { scaleX: 0, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".feature-item", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3");
  });

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 bg-white font-sans">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-[24px] md:text-[28px] font-serif text-[#1a1a1a] tracking-[0.05em] uppercase mb-3 font-medium section-title">
          Why Choose Silver Spoon?
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 mb-10 md:mb-16 divider">
          <div className="h-[1px] w-10 bg-gray-200"></div>
          <Diamond size={8} className="text-gold" fill="currentColor" />
          <div className="h-[1px] w-10 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-[1400px] mx-auto">

          <div className="flex items-center lg:justify-center gap-4 px-2 feature-item">
            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border border-charcoal/5 rounded-full text-charcoal shrink-0 bg-[#FAF8F5]">
              <Heart size={24} strokeWidth={1} className="opacity-70" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-bold text-[#1a1a1a] mb-1 uppercase tracking-tight">Premium Quality</p>
              <p className="text-[11px] text-gray-500 leading-tight font-medium">Finest Silver & <br /> German Silver</p>
            </div>
          </div>

          <div className="flex items-center lg:justify-center gap-4 px-2 feature-item">
            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border border-charcoal/5 rounded-full text-charcoal shrink-0 bg-[#FAF8F5]">
              <Award size={24} strokeWidth={1} className="opacity-70" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-bold text-[#1a1a1a] mb-1 uppercase tracking-tight">Expert Craftsmanship</p>
              <p className="text-[11px] text-gray-500 leading-tight font-medium">Intricate designs by <br /> skilled artisans</p>
            </div>
          </div>

          <div className="flex items-center lg:justify-center gap-4 px-2 feature-item">
            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border border-charcoal/5 rounded-full text-charcoal shrink-0 bg-[#FAF8F5]">
              <Star size={24} strokeWidth={1} className="opacity-70" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-bold text-[#1a1a1a] mb-1 uppercase tracking-tight">Perfect for Every Occasion</p>
              <p className="text-[11px] text-gray-500 leading-tight font-medium">Weddings, Festivals, <br /> Corporate & more</p>
            </div>
          </div>

          <div className="flex items-center lg:justify-center gap-4 px-2 feature-item">
            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border border-charcoal/5 rounded-full text-charcoal shrink-0 bg-[#FAF8F5]">
              <Users size={24} strokeWidth={1} className="opacity-70" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-bold text-[#1a1a1a] mb-1 uppercase tracking-tight">Trusted by Thousands</p>
              <p className="text-[11px] text-gray-500 leading-tight font-medium">Loved by customers <br /> across India</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;