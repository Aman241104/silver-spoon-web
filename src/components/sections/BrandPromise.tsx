"use client";

import * as React from "react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ShieldCheck, Heart, Sparkles, Award, Leaf } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BrandPromise = () => {
  const containerRef = useGSAP(() => {
    gsap.from(".promise-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".promise-grid",
        start: "top 80%",
      },
    });
  });

  const promises = [
    {
      icon: <Award size={32} strokeWidth={1} />,
      title: "Hallmarked Certified",
      description: "Every item is crafted in 925 sterling or 999 fine silver, hallmarked for guaranteed authenticity."
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1} />,
      title: "100% Genuine",
      description: "Our designs are authenticated for purity, blending traditional mastery with modern standards."
    },
    {
      icon: <Leaf size={32} strokeWidth={1} />,
      title: "Cadmium Free",
      description: "Skin-friendly and ethically sourced materials ensuring health, safety, and a lifetime of luster."
    }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-charcoal text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-silver-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-[0.5em] text-gold font-bold mb-6">Our Commitment</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight uppercase tracking-ultra">
            The Silver Spoon <span className="italic text-silver-300">Standard</span>
          </h2>
          <p className="text-sm md:text-base text-white/50 font-sans leading-relaxed tracking-widest uppercase text-[10px] font-bold">
            We don&apos;t just sell silver; we curate experiences that celebrate life&apos;s most precious moments with brilliance.
          </p>
        </div>

        <div className="promise-grid grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {promises.map((promise, index) => (
            <div key={index} className="promise-card flex flex-col items-center text-center group">
              <div className="mb-8 p-6 bg-white/5 rounded-full border border-white/10 group-hover:border-gold/50 group-hover:bg-white/10 transition-all duration-500 text-gold">
                {promise.icon}
              </div>
              <h3 className="text-lg font-serif mb-4 tracking-widest uppercase">{promise.title}</h3>
              <p className="text-xs text-white/40 font-sans leading-relaxed max-w-xs">
                {promise.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-40">
           <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-gold" />
              <span className="text-[10px] uppercase tracking-widest font-bold">925 Hallmark Certified</span>
           </div>
           <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-gold" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Secure Delivery</span>
           </div>
           <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-gold" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Ethically Sourced</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPromise;
