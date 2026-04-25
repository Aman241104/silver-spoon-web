"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

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
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".artisan-grid",
        start: "top 75%",
      },
    });
  });

  return (
    <section ref={containerRef} className="artisan-section py-32 bg-[#fcfcfc] overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="artisan-header text-center mb-24">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">
            Heritage Mastery
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-charcoal leading-[0.85] tracking-tighter">
            Artisan <span className="italic text-silver-400 text-6xl md:text-8xl">Finger & Toe</span> Rings
          </h2>
          <div className="w-20 h-[1px] bg-gold/30 mx-auto mt-12 mb-10" />
          <p className="text-base text-charcoal/50 max-w-2xl mx-auto font-sans leading-loose tracking-widest uppercase text-[10px] font-bold">
            Handcrafted silver rings where traditional artistry meets contemporary elegance.
          </p>
        </div>

        <div className="artisan-grid grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Thumb Rings */}
          <Link href="/collections/rings" className="artisan-card group relative block h-[550px] md:h-[700px] overflow-hidden bg-charcoal shadow-2xl transition-all duration-1000">
            <Image 
              src="/images/products/artisan-toe-ring.png"
              alt="Artisan Thumb Rings"
              fill
              className="object-cover opacity-80 transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-16">
              <span className="inline-block px-4 py-1.5 bg-gold/20 backdrop-blur-md border border-gold/30 text-[9px] uppercase tracking-[0.4em] font-bold text-gold mb-6 self-start">
                Exclusive Collection
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight tracking-tighter">Artisan Thumb Rings</h3>
              <p className="text-sm text-white/50 max-w-sm font-sans mb-10 leading-relaxed uppercase tracking-widest text-[10px] font-bold">
                Bold, statement bands crafted in 925 sterling silver for those who appreciate unique style.
              </p>
              <div className="flex items-center gap-4 text-gold group-hover:gap-6 transition-all duration-500">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-gold transition-colors">View Artisan Designs</span>
                <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>

          {/* Toe Rings */}
          <Link href="/collections/toe-rings" className="artisan-card group relative block h-[550px] md:h-[700px] overflow-hidden bg-charcoal shadow-2xl transition-all duration-1000 mt-12 md:mt-24">
            <Image 
              src="/images/products/artisan-toe-ring.png"
              alt="Artisan Toe Rings"
              fill
              className="object-cover opacity-80 transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-16">
              <span className="inline-block px-4 py-1.5 bg-gold/20 backdrop-blur-md border border-gold/30 text-[9px] uppercase tracking-[0.4em] font-bold text-gold mb-6 self-start">
                Handcrafted Bichhiya
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight tracking-tighter">Artisan Toe Rings</h3>
              <p className="text-sm text-white/50 max-w-sm font-sans mb-10 leading-relaxed uppercase tracking-widest text-[10px] font-bold">
                Traditional silver toe rings reimagined with intricate patterns and modern finesse.
              </p>
              <div className="flex items-center gap-4 text-gold group-hover:gap-6 transition-all duration-500">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-gold transition-colors">Explore Collection</span>
                <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Decorative background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left text-[15vw] font-serif text-charcoal/5 pointer-events-none select-none tracking-tighter italic">
        Artistry
      </div>
    </section>
  );
};

export default ArtisanDesigns;
