"use client";

import Link from "next/link";
import Image from "next/image";
import { Diamond } from "lucide-react";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { DbCollection } from "@/lib/db";

const FALLBACK: DbCollection[] = [
  { slug: "mens",      title: "Men's Collection",      image_url: "/images/collections/men-category-new.png",  link_href: "/products?gender=men",  sort_order: 1, is_active: true },
  { slug: "womens",    title: "Women's Collection",    image_url: "/images/collections/women-category.png",    link_href: "/products?gender=women", sort_order: 2, is_active: true },
  { slug: "gifting",   title: "Gifting Collection",    image_url: "/images/collections/gifting-collection.jpg", link_href: "/gifting",              sort_order: 3, is_active: true },
  { slug: "tableware", title: "Silverware & Tableware", image_url: "/images/collections/new-arrivals.jpg",     link_href: "/collections/utensils", sort_order: 4, is_active: true },
];

interface Props {
  collections?: DbCollection[];
}

const ExploreCollections = ({ collections }: Props) => {
  const items = collections && collections.length > 0 ? collections : FALLBACK;

  const containerRef = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    tl.from(".section-title", { y: 30, opacity: 0, duration: 1 })
      .from(".divider", { scaleX: 0, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".collection-card", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.4");
  });

  return (
    <section ref={containerRef} className="py-8 md:py-16 lg:py-20 bg-white font-sans">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-[24px] md:text-[28px] font-serif text-[#1a1a1a] tracking-[0.05em] uppercase mb-3 font-medium section-title">
          Explore Our Collections
        </h2>

        <div className="flex items-center justify-center gap-2 mb-6 md:mb-16 divider">
          <div className="h-[1px] w-10 bg-gray-200"></div>
          <Diamond size={8} className="text-gold" fill="currentColor" />
          <div className="h-[1px] w-10 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-[1400px] mx-auto">
          {items.map((col) => {
            const card = (
              <div className="group flex flex-col items-center collection-card">
                <div className="relative w-full aspect-square mb-5 overflow-hidden bg-[#FAF8F5]">
                  {col.image_url ? (
                    <Image
                      src={col.image_url}
                      alt={col.title}
                      fill
                      className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-serif text-gray-200">SS</span>
                    </div>
                  )}
                </div>
                <h3 className="text-[15px] md:text-[16px] font-serif text-[#1a1a1a] mb-2 tracking-[0.02em] font-medium">
                  {col.title}
                </h3>
                <span className="text-[10px] text-gray-400 group-hover:text-gold transition-all font-bold tracking-[0.12em] uppercase flex items-center gap-1.5">
                  View Collection <span className="text-[14px] leading-none mb-0.5">→</span>
                </span>
              </div>
            );

            return col.link_href ? (
              <Link key={col.slug} href={col.link_href}>
                {card}
              </Link>
            ) : (
              <div key={col.slug}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreCollections;
