"use client";

import Image from "next/image";
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

    tl.from(".newsletter-content > *", {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
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
    <section ref={containerRef} className="bg-white py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="relative flex flex-col lg:flex-row items-stretch min-h-[500px] md:min-h-[600px] bg-[#F5F2EB] rounded-sm overflow-hidden shadow-sm">
          
          {/* Left Image Area with Gradient Blend */}
          <div className="relative w-full lg:w-3/5 h-[350px] lg:h-auto newsletter-image">
            <Image
              src="/images/collections/new-arrivals.png"
              alt="Silver Lifestyle"
              fill
              className="object-cover"
            />
            {/* Soft Gradient Blend to the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent/50 via-80% to-[#F5F2EB] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/50 via-80% to-[#F5F2EB] lg:hidden" />
            
            {/* Additional blur layer for the transition */}
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-r from-transparent to-[#F5F2EB] blur-xl hidden lg:block -mr-16" />
          </div>

          {/* Right Content Area */}
          <div className="flex flex-col justify-center py-12 px-8 md:px-16 lg:px-20 newsletter-content relative z-10 lg:w-2/5">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#1a1a1a]/50 font-bold mb-4">
              STAY UPDATED
            </span>
            <h2 className="text-[32px] md:text-[48px] font-serif text-[#1a1a1a] leading-[1.1] mb-6 font-normal tracking-tight">
              Exclusive Offers & <br /> New Arrivals
            </h2>
            <p className="text-[#444444] text-sm md:text-base mb-10 leading-relaxed font-medium max-w-md">
              Subscribe to our newsletter and never miss an update on our artisan collections.
            </p>
            
            <form className="flex flex-col sm:flex-row w-full max-w-lg border border-charcoal/5 bg-white shadow-xl overflow-hidden rounded-sm group transition-all duration-300 focus-within:shadow-2xl">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-5 text-[14px] outline-none placeholder:text-gray-300 font-sans"
                required
              />
              <button 
                type="submit" 
                className="bg-[#111827] text-white px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;