"use client";

import { Diamond, Heart, Award, Star, ShieldCheck } from "lucide-react";

const Features = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] font-sans">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-[32px] md:text-[36px] font-serif text-[#2c2c2c] tracking-[0.1em] uppercase mb-4 font-medium">
          Why Choose Silver Spoon?
        </h2>
        
        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-20">
          <div className="h-[1px] w-14 bg-gray-200"></div>
          <Diamond size={12} className="text-gray-300" fill="currentColor" />
          <div className="h-[1px] w-14 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-5">
            <div className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full text-charcoal shrink-0 bg-white shadow-sm">
              <Heart size={24} strokeWidth={1} />
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-[15px] font-bold text-[#2c2c2c] mb-1 uppercase tracking-tight">Premium Quality</h4>
              <p className="text-[13px] text-gray-500 leading-tight">Finest Silver & <br className="hidden lg:block"/> German Silver</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-5">
            <div className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full text-charcoal shrink-0 bg-white shadow-sm">
              <Award size={24} strokeWidth={1} />
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-[15px] font-bold text-[#2c2c2c] mb-1 uppercase tracking-tight">Expert Craftsmanship</h4>
              <p className="text-[13px] text-gray-500 leading-tight">Intricate designs by <br className="hidden lg:block"/> skilled artisans</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-5">
            <div className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full text-charcoal shrink-0 bg-white shadow-sm">
              <Star size={24} strokeWidth={1} />
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-[15px] font-bold text-[#2c2c2c] mb-1 uppercase tracking-tight">Perfect for Every Occasion</h4>
              <p className="text-[13px] text-gray-500 leading-tight">Weddings, Festivals, <br className="hidden lg:block"/> Corporate & more</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-5">
            <div className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full text-charcoal shrink-0 bg-white shadow-sm">
              <ShieldCheck size={24} strokeWidth={1} />
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-[15px] font-bold text-[#2c2c2c] mb-1 uppercase tracking-tight">Trusted by Thousands</h4>
              <p className="text-[13px] text-gray-500 leading-tight">Loved by customers <br className="hidden lg:block"/> across India</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;