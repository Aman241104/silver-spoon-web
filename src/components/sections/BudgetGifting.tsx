"use client";

import Link from "next/link";

const BudgetGifting = () => {
  const ranges = [
    { title: "Gifts Under", price: "₹ 1499", bg: "bg-[#4a0e0e]" },
    { title: "Gifts Between", price: "₹ 1499 - ₹ 2499", bg: "bg-[#6b1414]" },
    { title: "Gifts Between", price: "₹ 2499 - ₹ 4999", bg: "bg-[#4a0e0e]" },
    { title: "Gifts Above", price: "₹ 4999", bg: "bg-[#2d0909]" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-charcoal mb-4 uppercase tracking-ultra">
          Shop on Budget
        </h2>
        <p className="text-[10px] uppercase tracking-ultra text-charcoal/40 font-bold mb-16">
          Find The Perfect Gift For Every Budget
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {ranges.map((range) => (
            <Link key={range.price} href="/products" className={`group relative h-[200px] overflow-hidden ${range.bg} flex flex-col items-center justify-center p-6 text-white text-center transition-all duration-500 hover:scale-[1.02] shadow-xl`}>
               <div className="relative z-10">
                  <p className="text-[9px] uppercase tracking-[0.4em] mb-3 opacity-60 font-bold">{range.title}</p>
                  <h3 className="text-xl md:text-2xl font-serif tracking-widest leading-tight">
                    {range.price}
                  </h3>
               </div>
               
               {/* Decorative elements as in reference */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
               <div className="absolute inset-4 border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetGifting;
