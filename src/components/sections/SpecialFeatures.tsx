"use client";

import Link from "next/link";

const SpecialFeatures = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Silver Idols */}
          <Link href="#" className="group relative h-[450px] overflow-hidden bg-[#fef5e7] flex flex-col items-center justify-center p-12 text-center border border-silver-100">
             <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-serif text-gold mb-4">Divine Blessings in 925 Silver Idols.</h3>
                <div className="inline-block border border-gold text-gold px-10 py-3 text-[10px] uppercase tracking-ultra hover:bg-gold hover:text-white transition-all">
                   Explore Collection
                </div>
                
                {/* Visual Placeholder */}
                <div className="mt-12 w-64 h-64 mx-auto rounded-full bg-white shadow-xl flex items-center justify-center p-10 border border-gold/10">
                   <div className="w-full h-full bg-silver-100 rounded-full animate-pulse" />
                </div>
             </div>
             
             {/* Decorative Background as in reference */}
             <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:30px_30px]" />
          </Link>

          {/* Feature 2: Silver Utensils */}
          <Link href="#" className="group relative h-[450px] overflow-hidden bg-[#fef5e7] flex flex-col items-center justify-center p-12 text-center border border-silver-100">
             <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-serif text-[#8b6f4e] mb-4">Purity Served in 925 Silver Utensils.</h3>
                <div className="inline-block border border-[#8b6f4e] text-[#8b6f4e] px-10 py-3 text-[10px] uppercase tracking-ultra hover:bg-[#8b6f4e] hover:text-white transition-all">
                   Explore Collection
                </div>

                {/* Visual Placeholder */}
                <div className="mt-12 w-64 h-64 mx-auto bg-white shadow-xl flex items-center justify-center p-10 border border-gold/10 overflow-hidden">
                   <div className="w-full h-full bg-silver-100 rounded-lg animate-pulse" />
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
