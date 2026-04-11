"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";

const PromoBanners = () => {
  const containerRef = useGSAP(() => {
    gsap.from(".promo-banner", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".promo-grid",
        start: "top 85%",
      },
    });
  });

  return (
    <section ref={containerRef} className="py-12 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="promo-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner 1: Seal Your Love */}
          <Link href="/collections/gifting" className="promo-banner group relative h-[300px] md:h-[400px] overflow-hidden bg-black flex items-center justify-center p-8">
             <Image 
               src="https://images.unsplash.com/photo-1603912190130-97424cc768e1?q=80&w=800&auto=format&fit=crop"
               alt="Pure Silver Gifting"
               fill
               className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
             />
             {/* Text Content */}
             <div className="relative z-10 text-center text-white">
                <p className="font-serif italic text-xl md:text-2xl mb-2">A personalized gift for your home</p>
                <h3 className="text-3xl md:text-5xl font-serif mb-6">Seal Your Love in 999 Pure Silver</h3>
                <p className="text-[10px] uppercase tracking-ultra opacity-60">Customize with your photo & message</p>
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </Link>

          {/* Banner 2: Celebrate Her Strength */}
          <Link href="/collections/women" className="promo-banner group relative h-[300px] md:h-[400px] overflow-hidden bg-[#1a0a05] flex items-center justify-center p-8">
             <Image 
               src="https://images.unsplash.com/photo-1599643477877-537ef5278533?q=80&w=800&auto=format&fit=crop"
               alt="Oxidised Collection"
               fill
               className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
             />
             <div className="relative z-10 text-center text-white">
                <h3 className="text-3xl md:text-5xl font-serif mb-8">Celebrate Her Strength in Silver</h3>
                <p className="text-[10px] uppercase tracking-ultra opacity-60 mb-8">Oxidised Collection & Jhumka Jewellery</p>
                <div className="inline-block border border-white text-white px-8 py-3 text-[10px] uppercase tracking-ultra hover:bg-white hover:text-[#1a0a05] transition-all">
                  Shop Now
                </div>
             </div>

             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
