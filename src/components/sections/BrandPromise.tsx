"use client";

import * as React from "react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ShieldCheck, Award, Leaf, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BrandPromise = () => {
  const containerRef = useGSAP(() => {
    gsap.from(".promise-card", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".promise-grid",
        start: "top 85%",
      },
    });
  });

  const promises = [
    {
      icon: <Award size={28} strokeWidth={1} />,
      title: "Certified Hallmarked",
      description: "Every piece in our treasury is crafted in 925 sterling or 999 fine silver, certified for absolute purity."
    },
    {
      icon: <ShieldCheck size={28} strokeWidth={1} />,
      title: "Master Authenticity",
      description: "Our designs blend heritage mastery with modern standards, authenticated by generations of trust."
    },
    {
      icon: <Zap size={28} strokeWidth={1} />,
      title: "Lustrous Luster",
      description: "Premium finish that ensures a lifetime of brilliance, crafted with skin-friendly and ethical materials."
    }
  ];

  return (
    <section ref={containerRef} className="py-40 bg-[#0a0a0a] text-white overflow-hidden relative border-t border-white/5">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-28">
          <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-8">The Silver Spoon Covenant</p>
          <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-[0.9] tracking-tighter">
             Defining the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-silver-200 to-white/40">Standard</span> <br /> 
             of Purity.
          </h2>
          <div className="w-20 h-[1px] bg-gold/30 mx-auto mb-10" />
          <p className="text-sm text-white/40 font-sans leading-loose tracking-[0.2em] uppercase max-w-2xl mx-auto">
             We curate experiences that celebrate life&apos;s most precious moments with handcrafted brilliance.
          </p>
        </div>

        <div className="promise-grid grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {promises.map((promise, index) => (
            <div key={index} className="promise-card flex flex-col items-center text-center group">
              <div className="mb-10 w-20 h-20 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-700 text-gold">
                {promise.icon}
              </div>
              <h3 className="text-xl font-serif mb-6 tracking-tight">{promise.title}</h3>
              <p className="text-[11px] text-white/30 font-sans leading-relaxed tracking-widest uppercase font-bold max-w-xs">
                {promise.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-32 pt-16 border-t border-white/5 flex flex-wrap justify-center gap-x-20 gap-y-8 opacity-30">
           <div className="flex items-center gap-4 group cursor-default">
              <CheckCircle2 size={16} className="text-gold group-hover:scale-125 transition-transform" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">925 Hallmark Certified</span>
           </div>
           <div className="flex items-center gap-4 group cursor-default">
              <CheckCircle2 size={16} className="text-gold group-hover:scale-125 transition-transform" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Secure Global Shipping</span>
           </div>
           <div className="flex items-center gap-4 group cursor-default">
              <CheckCircle2 size={16} className="text-gold group-hover:scale-125 transition-transform" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Ethically Handcrafted</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPromise;
