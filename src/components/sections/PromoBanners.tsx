"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const PromoBanners = () => {
  const containerRef = useGSAP(() => {
    gsap.from(".promo-banner", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".promo-grid",
        start: "top 85%",
      },
    });
  });

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="promo-grid grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Banner 1: Personalized Gifting */}
          <Link href="/collections/german-silver-gifts" className="promo-banner group relative h-[450px] md:h-[600px] overflow-hidden bg-[#0a0a0a] flex flex-col justify-end p-10 md:p-16">
             <Image
               src="/images/collections/gifting.png"
               alt="Pure Silver Gifting"
               fill
               className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80" />
             
             {/* Text Content */}
             <div className="relative z-10 max-w-sm">
                <div className="inline-block px-3 py-1 bg-gold/20 backdrop-blur-sm border border-gold/30 mb-6">
                   <p className="text-[8px] uppercase tracking-[0.5em] text-gold font-bold">Personalized Treasury</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-[0.9] tracking-tighter">
                   Seal Your <span className="italic text-silver-200">Love</span> in 999 Silver.
                </h3>
                <div className="flex items-center gap-4 text-white group-hover:gap-6 transition-all duration-500">
                   <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Customize Now</span>
                   <ArrowRight size={14} className="text-gold" />
                </div>
             </div>
             
             {/* Decorative Element */}
             <div className="absolute top-10 right-10 text-white/5 text-[120px] font-serif select-none">999</div>
          </Link>

          {/* Banner 2: Women's Collection */}
          <Link href="/collections/women" className="promo-banner group relative h-[450px] md:h-[600px] overflow-hidden bg-[#1a0a05] flex flex-col justify-end p-10 md:p-16">
             <Image 
               src="/images/collections/jewellery.png"
               alt="Oxidised Collection"
               fill
               className="object-cover opacity-40 group-hover:scale-110 transition-all duration-[2000ms]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a05] via-[#1a0a05]/20 to-transparent opacity-80" />
             
             <div className="relative z-10 max-w-sm">
                <div className="inline-block px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
                   <p className="text-[8px] uppercase tracking-[0.5em] text-white/60 font-bold">Artisan Jewellery</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-[0.9] tracking-tighter">
                   Celebrate Her <span className="italic text-silver-300">Grace</span> in Pure Silver.
                </h3>
                <div className="flex items-center gap-4 text-white group-hover:gap-6 transition-all duration-500">
                   <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Shop Collection</span>
                   <ArrowRight size={14} className="text-gold" />
                </div>
             </div>
             
             {/* Decorative Sparkle */}
             <div className="absolute bottom-20 right-20 text-gold/20 text-4xl animate-pulse">✦</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
