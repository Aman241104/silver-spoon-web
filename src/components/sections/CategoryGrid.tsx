"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";

const categories = [
  { name: "Rings", image: "/images/products/regular-ring.png" },
  { name: "Bracelets", image: "/images/products/bracelets.png" },
  { name: "Chains & Pendants", slug: "chains-pendants", image: "/images/collections/jewellery.png" },
  { name: "Bangles / Kada", slug: "bangles-kada", image: "/images/products/bracelets.png" },
  { name: "Anklets (Payal)", slug: "anklets", image: "/images/products/payal.png" },
  { name: "Mangalsutra", image: "/images/collections/jewellery.png" },
  { name: "Toe Rings", image: "/images/products/artisan-toe-ring.png" },
  { name: "Idol / Gifts", slug: "idols-gifts", image: "/images/collections/pooja.png" },
  { name: "Pooja / Utensils", slug: "pooja-utensils", image: "/images/products/pooja-utensils.png" },
  { name: "Frames", image: "/images/products/bracelets.png" },
  { name: "German Silver Gifts", image: "/images/collections/gifting.png" },
  { name: "Silver Coins", slug: "coins", image: "/images/collections/gifting.png" }
];

const CategoryGrid = () => {
  const containerRef = useGSAP(() => {
    gsap.from(".cat-circle", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".cat-grid",
        start: "top 85%",
      },
    });
  });

  return (
    <section ref={containerRef} className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-charcoal mb-4 uppercase tracking-ultra">
          Our Collections
        </h2>
        <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold mb-16">
          Explore Our Handpicked Silver Treasures
        </p>

        <div className="cat-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-16">
          {categories.map((cat) => (
            <Link key={cat.name} href={`/collections/${cat.slug || cat.name.toLowerCase().replace(/ \/ | & /g, "-").replace(/ /g, "-")}`} className="group flex flex-col items-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 border border-silver-100 group-hover:border-gold transition-all duration-500 bg-silver-50 shadow-sm">
                <Image 
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100px, 150px"
                />
                <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-charcoal/60 group-hover:text-gold transition-all duration-300 border-b border-silver-50 pb-2 group-hover:border-gold">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
