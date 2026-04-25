"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ArtisanDesigns = () => {
  const containerRef = useGSAP(() => {
    gsap.from(".artisan-header", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".artisan-section",
        start: "top 80%",
      },
    });

    gsap.from(".artisan-card", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".artisan-grid",
        start: "top 75%",
      },
    });
  });

  return (
    <section ref={containerRef} className="artisan-section py-24 bg-[#faf9f6] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="artisan-header text-center mb-20">
          <p className="text-xs uppercase tracking-[0.5em] text-gold font-bold mb-4">
            Master Craftsmanship
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
            Artisan Thumb & Toe Rings
          </h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
          <p className="mt-8 text-charcoal/60 max-w-2xl mx-auto font-sans leading-relaxed">
            Discover our exclusive collection of handcrafted silver rings, where traditional artistry meets contemporary elegance. Each piece is a testament to the skill of our master silversmiths.
          </p>
        </div>

        <div className="artisan-grid grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Thumb Rings */}
          <Link href="/collections/rings?sub=Thumb+Rings" className="artisan-card group relative block h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-xl">
            <Image 
              src="/images/products/artisan-toe-ring.png"
              alt="Artisan Thumb Rings"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80" />
            
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <span className="inline-block px-3 py-1 bg-gold/20 backdrop-blur-md border border-gold/30 rounded-full text-[10px] uppercase tracking-widest mb-4">
                Exclusive Collection
              </span>
              <h3 className="text-3xl font-serif mb-4">Artisan Thumb Rings</h3>
              <p className="text-sm text-white/70 max-w-sm font-sans mb-8">
                Bold, statement bands crafted in 925 sterling silver for those who appreciate unique style.
              </p>
              <div className="flex items-center gap-3 text-gold group-hover:gap-5 transition-all duration-300">
                <span className="text-[10px] uppercase tracking-ultra font-bold">View Designs</span>
                <div className="w-10 h-[1px] bg-gold" />
              </div>
            </div>
          </Link>

          {/* Toe Rings */}
          <Link href="/collections/toe-rings" className="artisan-card group relative block h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-xl">
            <Image 
              src="/images/products/artisan-toe-ring.png"
              alt="Artisan Toe Rings"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80" />
            
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <span className="inline-block px-3 py-1 bg-gold/20 backdrop-blur-md border border-gold/30 rounded-full text-[10px] uppercase tracking-widest mb-4">
                Handcrafted Bichhiya
              </span>
              <h3 className="text-3xl font-serif mb-4">Artisan Toe Rings</h3>
              <p className="text-sm text-white/70 max-w-sm font-sans mb-8">
                Traditional silver toe rings reimagined with intricate patterns and modern finesse.
              </p>
              <div className="flex items-center gap-3 text-gold group-hover:gap-5 transition-all duration-300">
                <span className="text-[10px] uppercase tracking-ultra font-bold">View Designs</span>
                <div className="w-10 h-[1px] bg-gold" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-silver-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50 pointer-events-none" />
    </section>
  );
};

export default ArtisanDesigns;
