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
      y: 80,
      opacity: 0,
      duration: 1.8,
      delay: 0.5,
    })
    .from(".hero-circle", {
      scale: 0.9,
      opacity: 0,
      duration: 2.5,
      stagger: 0.2,
    }, 0)
    .from(".hero-image-container", {
      x: 100,
      opacity: 0,
      duration: 2,
      ease: "expo.out",
    }, 0.5);

    // Parallax effect on scroll
    gsap.to(".hero-circle", {
      y: (i) => (i + 1) * 50,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  });

  return (
    <section
      ref={containerRef}
      className="hero-section relative h-[90vh] md:h-[100vh] flex items-center justify-center pt-20 overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Dynamic Background Elements */}
      <div className="hero-circle absolute -left-40 top-1/4 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] border border-white/5 rounded-full" />
      <div className="hero-circle absolute -right-40 bottom-1/4 w-[400px] h-[400px] md:w-[800px] md:h-[800px] border border-gold/5 rounded-full" />
      
      {/* Animated Sparkles */}
      <div className="absolute top-[20%] right-[15%] text-gold opacity-30 text-2xl animate-pulse">✦</div>
      <div className="absolute bottom-[30%] left-[10%] text-gold opacity-20 text-xl animate-pulse delay-700">✦</div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        <div className="hero-content text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 border border-gold/20 bg-gold/5 mb-8">
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-gold font-bold">
              EST. 1995 • PURE SILVER ARTISTRY
            </p>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-serif mb-8 leading-[0.9] tracking-tighter">
            Pure <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-silver-200 to-white/40 italic">Silver</span> <br />
            Heritage.
          </h1>
          <p className="text-sm md:text-base text-white/40 max-w-lg mb-12 font-sans tracking-[0.3em] uppercase mx-auto lg:mx-0 leading-loose">
            Handcrafted Masterpieces for Rituals, Gifting & Legacy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
            <Link href="/products" className="group relative overflow-hidden bg-gold text-charcoal px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 hover:bg-white">
              <span className="relative z-10">Explore Collections</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            <Link href="/about" className="border border-white/20 text-white hover:border-gold px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 backdrop-blur-sm">
              Our Story
            </Link>
          </div>
        </div>

        {/* Enhanced Hero Image Area */}
        <div className="hero-image-container hidden lg:flex justify-center items-center relative">
           <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] relative">
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-10 border border-gold/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              <div className="absolute inset-20 rounded-full overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] bg-charcoal/50 backdrop-blur-md">
                 <Image 
                   src="/images/products/pooja-utensils.png"
                   alt="Pure Silver Heritage"
                   fill
                   className="object-cover scale-110 group-hover:scale-125 transition-transform duration-1000"
                   priority
                 />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute top-20 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-none shadow-2xl rotate-12">
                 <p className="text-gold text-[8px] uppercase tracking-ultra font-bold mb-1">Purity Guaranteed</p>
                 <p className="text-white text-xl font-serif">925 Silver</p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
