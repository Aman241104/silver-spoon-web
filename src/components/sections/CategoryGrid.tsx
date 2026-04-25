"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";

const categories = [
  { name: "Rings", slug: "rings", image: "/images/products/regular-ring.png" },
  { name: "Bracelets", slug: "bracelets", image: "/images/products/bracelets.png" },
  { name: "Chains & Pendants", slug: "chains-pendants", image: "/images/collections/jewellery.png" },
  { name: "Bangles & Kada", slug: "bangles-kada", image: "/images/products/bracelets.png" },
  { name: "Artisan Anklets", slug: "anklets", image: "/images/products/payal.png" },
  { name: "Toe Rings", slug: "toe-rings", image: "/images/products/artisan-toe-ring.png" },
  { name: "Divine Idols", slug: "idols-gifts", image: "/images/collections/pooja.png" },
  { name: "Pooja Utensils", slug: "pooja-utensils", image: "/images/products/pooja-utensils.png" },
  { name: "Luxury Frames", slug: "frames", image: "/images/products/bracelets.png" },
  { name: "Silver Coins", slug: "coins", image: "/images/collections/gifting.png" }
];

const CategoryGrid = () => {
  const containerRef = useGSAP(() => {
    gsap.from(".cat-circle", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cat-grid",
        start: "top 85%",
      },
    });

    gsap.from(".cat-title-reveal", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cat-grid-section",
        start: "top 85%",
      },
    });
  });

  return (
    <section ref={containerRef} className="cat-grid-section py-32 bg-[#fcfcfc] border-y border-silver-100/50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto mb-20">
           <p className="cat-title-reveal text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Treasury Vaults</p>
           <h2 className="cat-title-reveal text-5xl md:text-6xl font-serif text-charcoal leading-tight tracking-tighter">
             Explore Our <span className="italic text-silver-400">Artisan</span> Collections
           </h2>
        </div>

        <div className="cat-grid grid grid-cols-2 md:grid-cols-5 gap-x-12 gap-y-20">
          {categories.map((cat) => (
            <Link key={cat.name} href={`/collections/${cat.slug}`} className="cat-circle group flex flex-col items-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 border border-silver-100 p-2 group-hover:border-gold group-hover:p-0 transition-all duration-700 bg-white shadow-sm">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                   <Image 
                     src={cat.image}
                     alt={cat.name}
                     fill
                     className="object-cover group-hover:scale-110 transition-transform duration-1000"
                     sizes="(max-width: 768px) 150px, 200px"
                   />
                </div>
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-700" />
              </div>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-charcoal/40 group-hover:text-gold transition-all duration-500 text-center">
                {cat.name}
              </span>
              <div className="w-6 h-[1px] bg-silver-200 mt-4 group-hover:w-12 group-hover:bg-gold transition-all duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
