"use client";

import Link from "next/link";

const BudgetGifting = () => {
  const ranges = [
    { title: "Gifts Under", price: "₹ 1499", bg: "bg-[#801b1b]" },
    { title: "Gifts Between", price: "₹ 1499 - ₹ 2499", bg: "bg-[#a62626]" },
    { title: "Gifts Between", price: "₹ 2499 - ₹ 4999", bg: "bg-[#8c1c1c]" },
    { title: "Gifts Above", price: "₹ 4999", bg: "bg-[#5c1313]" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl font-serif text-charcoal mb-4 uppercase tracking-ultra">
          Shop on Budget
        </h2>
        <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold mb-16">
          Find The Perfect Gift For Every Budget
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {ranges.map((range) => (
            <Link key={range.price} href="#" className={`group relative h-[250px] overflow-hidden ${range.bg} flex flex-col items-center justify-center p-6 text-white text-center`}>
               <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-ultra mb-2 opacity-80">{range.title}</p>
                  <h3 className="text-2xl font-serif tracking-widest leading-tight">
                    {range.price}
                  </h3>
               </div>
               
               {/* Decorative Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:bg-black/20 transition-all duration-500" />
               <div className="absolute inset-4 border border-white/10 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetGifting;
