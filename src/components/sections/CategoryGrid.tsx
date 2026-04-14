"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";

const categories = [
  { name: "Anklets", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop" },
  { name: "Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop" },
  { name: "Pendant", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400&auto=format&fit=crop" },
  { name: "Chains", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=400&auto=format&fit=crop" },
  { name: "Earrings", image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=400&auto=format&fit=crop" },
  { name: "Gifts", image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=400&auto=format&fit=crop" },
  { name: "Mangalsutra", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop" },
  { name: "Necklace", image: "https://images.unsplash.com/photo-1599643477877-537ef5278533?q=80&w=400&auto=format&fit=crop" },
  { name: "Nose Pin", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=400&auto=format&fit=crop" },
  { name: "Pendant Set", image: "https://images.unsplash.com/photo-1617033930343-dc8116270b92?q=80&w=400&auto=format&fit=crop" },
  { name: "Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop" },
  { name: "Toe Rings", image: "https://images.unsplash.com/photo-1598560912005-59a0d5c1a612?q=80&w=400&auto=format&fit=crop" }
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
          Our Categories
        </h2>
        <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold mb-16">
          Explore Our Handpicked Collections
        </p>

        <div className="cat-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-16">
          {categories.map((cat) => (
            <Link key={cat.name} href={`/collections/${cat.name.toLowerCase().replace(" ", "-")}`} className="group flex flex-col items-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 border border-silver-100 group-hover:border-gold transition-all duration-500 bg-silver-50">
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
