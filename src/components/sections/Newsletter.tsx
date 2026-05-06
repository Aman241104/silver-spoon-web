"use client";

import Image from "next/image";

const Newsletter = () => {
  return (
    <section className="bg-[#FAF8F5] border-t border-gray-100">
      <div className="container mx-auto px-0 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          
          {/* Left Image Area */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/images/products/pooja-utensils.png" // placeholder for silver jar
              alt="Silver Container"
              fill
              className="object-cover mix-blend-multiply"
            />
          </div>

          {/* Right Content Area */}
          <div className="flex flex-col justify-center px-8 py-20 md:p-20 lg:p-28 bg-[#FAF8F5]">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#2c2c2c] font-bold mb-6">
              STAY UPDATED
            </span>
            <h2 className="text-[42px] md:text-[52px] font-serif text-[#2c2c2c] leading-[1.1] mb-6 font-medium">
              Exclusive Offers & <br /> New Arrivals
            </h2>
            <p className="text-gray-500 text-[15px] mb-12 leading-relaxed">
              Subscribe to our newsletter and never miss an update.
            </p>
            
            <form className="flex flex-col sm:flex-row w-full max-w-lg shadow-sm">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white border border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <button 
                type="submit" 
                className="bg-[#1a1a1a] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;