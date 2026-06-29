"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag, Diamond } from "lucide-react";
import type { DbOffer } from "@/lib/db";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  offers: DbOffer[];
}

function OfferCard({ offer }: { offer: DbOffer }) {
  return (
    <div className="relative overflow-hidden bg-[#2F3131] min-h-[220px] md:min-h-[260px] flex group-hover:brightness-110 transition-all duration-500">
      {offer.image_url && (
        <div className="absolute inset-0">
          <Image
            src={offer.image_url}
            alt={offer.title}
            fill
            className="object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-700"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2F3131]/90 via-[#2F3131]/60 to-transparent" />
        </div>
      )}
      <div className="relative z-10 flex-1 p-8 md:p-12 flex flex-col justify-center max-w-lg">
        {offer.badge_text && (
          <span className="inline-block bg-[#D4AF37] text-[#2F3131] text-[8px] uppercase tracking-[0.3em] font-bold px-3 py-1 mb-5 w-fit">
            {offer.badge_text}
          </span>
        )}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-3 leading-tight">
          {offer.title}
        </h3>
        {offer.subtitle && (
          <p className="text-white/50 text-sm md:text-base mb-7 leading-relaxed">{offer.subtitle}</p>
        )}
        {offer.link_href && (
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] group-hover:gap-4 transition-all w-fit border-b border-[#D4AF37]/30 pb-1">
            {offer.cta_text}
            <ArrowRight size={13} />
          </span>
        )}
      </div>
    </div>
  );
}

export default function OffersSection({ offers }: Props) {
  const containerRef = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".offer-card", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".offers-grid",
        start: "top 82%",
      },
    });
  });

  if (offers.length === 0) return null;

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-[#FAF8F5] font-sans overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Tag size={13} className="text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                Exclusive Offers
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2c2c2c] leading-tight">
              Special Promotions
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-10 bg-gray-300" />
            <Diamond size={8} className="text-[#D4AF37]" fill="currentColor" />
            <div className="h-[1px] w-10 bg-gray-300" />
          </div>
        </div>

        <div
          className={`offers-grid grid gap-5 ${
            offers.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card group">
              {offer.link_href ? (
                <Link href={offer.link_href} className="block">
                  <OfferCard offer={offer} />
                </Link>
              ) : (
                <OfferCard offer={offer} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
