"use client";

import Link from "next/link";
import Image from "next/image";

const SpecialFeatures = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Silver Idols */}
          <Link href="/collections/idols-gifts" className="group relative h-[450px] md:h-[550px] overflow-hidden bg-[#fef5e7] flex flex-col items-center justify-center p-12 text-center border border-silver-100">
             <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-3xl md:text-5xl font-serif text-gold mb-8">Divine Blessings in 925 Silver Idols.</h3>
                <div className="inline-block border border-gold text-gold px-10 py-3 text-[10px] uppercase tracking-ultra hover:bg-gold hover:text-white transition-all mb-12">
                   Explore Collection
                </div>
                
                {/* Visual Placeholder - Circle */}
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-white shadow-2xl flex items-center justify-center p-4 border border-gold/10 relative overflow-hidden">
                   <Image 
                     src="/images/collections/pooja.png"
                     alt="Silver Idols"
                     fill
                     className="object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                </div>
             </div>
             
             {/* Decorative Background as in reference */}
             <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:30px_30px]" />
          </Link>

          {/* Feature 2: Silver Utensils */}
          <Link href="/collections/pooja-utensils" className="group relative h-[450px] md:h-[550px] overflow-hidden bg-[#fef5e7] flex flex-col items-center justify-center p-12 text-center border border-silver-100">
             <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-3xl md:text-5xl font-serif text-[#8b6f4e] mb-8">Purity Served in 925 Silver Utensils.</h3>
                <div className="inline-block border border-[#8b6f4e] text-[#8b6f4e] px-10 py-3 text-[10px] uppercase tracking-ultra hover:bg-[#8b6f4e] hover:text-white transition-all mb-12">
                   Explore Collection
                </div>

                {/* Visual Placeholder - Square */}
                <div className="w-56 h-56 md:w-64 md:h-64 bg-white shadow-2xl flex items-center justify-center p-4 border border-gold/10 relative overflow-hidden">
                   <Image 
                     src="/images/products/pooja-utensils.png"
                     alt="Silver Utensils"
                     fill
                     className="object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                </div>
             </div>

             <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#8b6f4e_1px,transparent_1px)] [background-size:30px_30px]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialFeatures;
