"use client";

import * as React from "react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ShieldCheck, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Philosophy = () => {
  const containerRef = useGSAP(() => {
    gsap.from(".philosophy-text", {
      x: -50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".philosophy-content",
        start: "top 75%",
      },
    });

    gsap.from(".philosophy-image", {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".philosophy-content",
        start: "top 75%",
      },
    });

    gsap.from(".trust-item", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".trust-section",
        start: "top 85%",
      },
    });
  });

  const trustPoints = [
    {
      icon: <Award className="text-gold" size={32} strokeWidth={1} />,
      title: "Certified Purity",
      description: "Every piece comes with a hallmark certificate of 925 sterling or 999 pure silver.",
    },
    {
      icon: <Sparkles className="text-gold" size={32} strokeWidth={1} />,
      title: "Handcrafted Heritage",
      description: "Our artisans use traditional techniques passed down through generations.",
    },
    {
      icon: <ShieldCheck className="text-gold" size={32} strokeWidth={1} />,
      title: "Timeless Quality",
      description: "Silver designed to last a lifetime, becoming heirlooms for your future.",
    },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-silver-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="philosophy-content grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div className="relative order-2 lg:order-1">
            <div className="philosophy-image aspect-[4/5] bg-white p-4 shadow-2xl border border-silver-100 overflow-hidden">
                <div className="w-full h-full bg-silver-200 relative flex items-center justify-center">
                    <div className="text-center p-12">
                        <span className="font-serif italic text-charcoal/30 text-2xl tracking-ultra uppercase block mb-4">The Craft</span>
                        <div className="w-24 h-[1px] bg-gold/40 mx-auto" />
                    </div>
                </div>
            </div>
            {/* Decorative Offset Element */}
            <div className="absolute -top-10 -left-10 w-full h-full border border-gold/10 -z-10 hidden md:block" />
          </div>

          <div className="order-1 lg:order-2">
            <p className="philosophy-text text-xs uppercase tracking-[0.4em] text-gold font-bold mb-6">
              Our Philosophy
            </p>
            <h2 className="philosophy-text text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal leading-tight mb-8">
              Crafting Purity Since <span className="italic text-silver-400">1995.</span>
            </h2>
            <div className="philosophy-text space-y-6">
              <p className="text-base md:text-lg text-charcoal/70 font-sans leading-relaxed">
                At Silver Spoon, we believe that silver is more than just a metal—it&apos;s a celebration of moments, a symbol of devotion, and a bridge to our rich heritage. 
              </p>
              <p className="text-base md:text-lg text-charcoal/70 font-sans leading-relaxed">
                From the intricate patterns of our bridal jewellery to the divine presence of our handcrafted idols, every creation is a testament to our commitment to absolute purity and aesthetic perfection.
              </p>
            </div>
            <div className="philosophy-text pt-10">
              <div className="flex items-center gap-6">
                 <div className="flex flex-col">
                    <span className="text-3xl font-serif text-charcoal">25+</span>
                    <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Years of Trust</span>
                 </div>
                 <div className="w-[1px] h-12 bg-silver-200" />
                 <div className="flex flex-col">
                    <span className="text-3xl font-serif text-charcoal">10k+</span>
                    <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Designs Crafted</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="trust-section grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-silver-200">
          {trustPoints.map((point) => (
            <div key={point.title} className="trust-item flex flex-col items-center text-center max-w-sm mx-auto">
              <div className="mb-8 p-6 bg-white rounded-full shadow-sm border border-silver-100">
                {point.icon}
              </div>
              <h4 className="text-xl font-serif text-charcoal mb-4 uppercase tracking-widest">{point.title}</h4>
              <p className="text-sm text-charcoal/60 leading-relaxed font-sans">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
