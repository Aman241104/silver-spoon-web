"use client";

import * as React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, Product } from "@/data/products";
import Image from "next/image";
import { ArrowRight, Box, Package, Video, QrCode, CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4;

const BuildABox = () => {
  const [step, setStep] = React.useState<Step>(1);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [selectedBox, setSelectedBox] = React.useState("");
  const [personalization, setPersonalization] = React.useState({
    text: "",
    videoUrl: "",
  });

  const boxes = [
    { id: "velvet", name: "Royal Velvet Red", color: "bg-[#4a0e0e]" },
    { id: "wooden", name: "Artisan Walnut", color: "bg-[#3e2723]" },
    { id: "silk", name: "Heritage Silk White", color: "bg-[#f5f5f5]" },
  ];

  const handleNext = () => {
    setStep((step + 1) as Step);
  };

  const handlePrev = () => {
    setStep((step - 1) as Step);
  };

  const handleFinalize = () => {
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setSelectedProduct(null);
    setSelectedBox("");
    setPersonalization({ text: "", videoUrl: "" });
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      <section className="pt-24 pb-12 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12 text-center">
            <span className="text-[11px] uppercase tracking-widest text-charcoal font-bold mb-4 block">
              GIFTING SUITE
            </span>
            <h1 className="text-[42px] md:text-[56px] font-serif text-[#2c2c2c] leading-[1.05] tracking-tight font-medium">
              Build Your Gift Box
            </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left: Interactive Preview */}
            <div className="sticky top-32 bg-[#FAF8F5] border border-gray-100 p-12 md:p-20 flex flex-col items-center justify-center min-h-[500px] shadow-sm rounded-sm">
               <div className="absolute top-8 left-8 flex items-center gap-2">
                  <Box size={18} className="text-gray-400" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Virtual Atelier</span>
               </div>

               <div className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000">
                  <div className={cn(
                    "w-full h-full border border-gray-200 shadow-md transition-all duration-700 flex items-center justify-center p-8 relative",
                    selectedBox === "Royal Velvet Red" ? "bg-[#4a0e0e]" : 
                    selectedBox === "Artisan Walnut" ? "bg-[#3e2723]" : 
                    selectedBox === "Heritage Silk White" ? "bg-white" : "bg-white"
                  )}>
                     {selectedProduct && (
                       <div className="relative w-full h-full overflow-hidden shadow-sm">
                          <Image src={selectedProduct.image} alt="Selected Piece" fill className="object-cover mix-blend-multiply" />
                       </div>
                     )}
                     
                     {!selectedProduct && (
                       <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Awaiting Masterpiece</p>
                     )}

                     {personalization.videoUrl && (
                        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white p-2 shadow-md border border-gray-100">
                           <QrCode className="w-full h-full text-[#2c2c2c]" strokeWidth={1} />
                        </div>
                     )}
                  </div>
               </div>

               <div className="mt-16 text-center w-full max-w-xs border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-serif text-[#2c2c2c] mb-6">Box Composition</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-gray-400">Artisan Piece:</span>
                        <span className="text-[#2c2c2c] truncate max-w-[150px]">{selectedProduct?.name || "Pending Selection"}</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-gray-400">Vault Case:</span>
                        <span className="text-[#2c2c2c]">{selectedBox || "Standard Packaging"}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Steps */}
            <div className="flex flex-col pt-4">
               <div className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                     <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                        {step === 4 ? "Completion" : `Phase ${step} of 3`}
                     </p>
                     <div className="flex gap-2">
                        {[1, 2, 3].map((s) => (
                          <div key={s} className={cn("w-12 h-1 transition-all duration-500", s <= (step === 4 ? 3 : step) ? "bg-[#2c2c2c]" : "bg-gray-200")} />
                        ))}
                     </div>
                  </div>
               </div>

               {/* Step 4: Success */}
               {step === 4 && (
                 <div className="space-y-10 fade-in py-8">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 border border-green-100">
                       <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-[#2c2c2c] leading-tight">Curated Box <br /> Prepared</h2>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed font-serif italic">
                       Your custom artisan set has been curated. Our concierge will finalize the details of this request via WhatsApp.
                    </p>
                    
                    <div className="space-y-4 pt-6">
                       <button 
                         onClick={() => window.open('https://wa.me/919998123479?text=Hi, I have built a custom gift box and want to inquire about its price.', '_blank')}
                         className="w-full bg-[#25D366] text-white py-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#128C7E] transition-all rounded-sm shadow-lg"
                       >
                          Finalize on WhatsApp <ArrowRight size={14} />
                       </button>
                       <button 
                         onClick={reset}
                         className="w-full bg-white text-charcoal border border-silver-200 py-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#FAF8F5] transition-all rounded-sm"
                       >
                          Start New Creation
                       </button>
                    </div>
                 </div>
               )}

               {/* Step 1: Select Product */}
               {step === 1 && (
                 <div className="space-y-8 fade-in">
                    <p className="text-[14px] font-serif text-[#2c2c2c] tracking-wide uppercase mb-6">I. Select an artisan silver piece</p>
                    <div className="grid grid-cols-2 gap-6">
                       {products.slice(0, 6).map((p) => (
                         <button 
                          key={p.id}
                          onClick={() => setSelectedProduct(p)}
                          className={cn(
                            "group relative aspect-square overflow-hidden bg-[#FAF8F5] border transition-all duration-300 rounded-sm shadow-sm",
                            selectedProduct?.id === p.id ? "border-[#2c2c2c] ring-2 ring-[#2c2c2c]/10" : "border-gray-100 hover:border-gray-300"
                          )}
                         >
                            <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply transition-transform group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-3 text-[9px] uppercase tracking-widest font-bold text-center border-t border-gray-100 text-[#2c2c2c]">
                               {p.name}
                            </div>
                         </button>
                       ))}
                    </div>
                    <button 
                      disabled={!selectedProduct}
                      onClick={handleNext}
                      className="w-full bg-[#1a1a1a] text-white py-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all disabled:opacity-30 rounded-sm mt-8"
                    >
                       Select Packaging <ArrowRight size={14} />
                    </button>
                 </div>
               )}

               {/* Step 2: Select Box */}
               {step === 2 && (
                 <div className="space-y-12 fade-in">
                    <div className="flex items-center justify-between mb-8">
                       <p className="text-[14px] font-serif text-[#2c2c2c] tracking-wide uppercase">II. Choose Premium Packaging</p>
                       <button onClick={handlePrev} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2c2c2c] flex items-center gap-2 transition-colors">
                          <ArrowLeft size={14} /> Back
                       </button>
                    </div>
                    <div className="space-y-6">
                       {boxes.map((box) => (
                          <button
                            key={box.id}
                            onClick={() => setSelectedBox(box.name)}
                            className={cn(
                              "w-full flex items-center justify-between p-6 border transition-all duration-300 rounded-sm bg-white shadow-sm",
                              selectedBox === box.name ? "border-[#2c2c2c] bg-gray-50" : "border-gray-200 hover:border-gray-400"
                            )}
                          >
                             <div className="flex items-center gap-6">
                                <div className={cn("w-10 h-10 rounded-full shadow-sm border border-black/10", box.color)} />
                                <span className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c]">{box.name}</span>
                             </div>
                             <Package size={18} className={selectedBox === box.name ? "text-[#2c2c2c]" : "text-gray-300"} strokeWidth={1.5} />
                          </button>
                       ))}
                    </div>
                    <button 
                      disabled={!selectedBox}
                      onClick={handleNext}
                      className="w-full bg-[#1a1a1a] text-white py-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all disabled:opacity-30 rounded-sm"
                    >
                      Personalize <ArrowRight size={14} />
                    </button>
                 </div>
               )}

               {/* Step 3: Personalize */}
               {step === 3 && (
                 <div className="space-y-12 fade-in">
                    <div className="flex items-center justify-between mb-8">
                       <p className="text-[14px] font-serif text-[#2c2c2c] tracking-wide uppercase">III. Add the Heart of the Gift</p>
                       <button onClick={handlePrev} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2c2c2c] flex items-center gap-2 transition-colors">
                          <ArrowLeft size={14} /> Back
                       </button>
                    </div>
                    <div className="space-y-10">
                       <div className="space-y-4">
                          <label className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c]">Handwritten Message</label>
                          <textarea 
                             className="w-full bg-white border border-gray-200 p-5 text-[14px] font-sans focus:ring-0 focus:border-gray-400 transition-colors outline-none h-32 shadow-sm rounded-sm resize-none"
                             placeholder="Type your heartfelt message here..."
                             value={personalization.text}
                             onChange={(e) => setPersonalization({...personalization, text: e.target.value})}
                          />
                       </div>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center">
                             <label className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c] flex items-center gap-2">
                                <Video size={14} className="text-gray-400" /> Video Message Link
                             </label>
                             <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Legacy Feature</span>
                          </div>
                          <input 
                             type="url"
                             className="w-full bg-white border border-gray-200 p-5 text-[14px] font-sans focus:ring-0 focus:border-gray-400 transition-colors outline-none shadow-sm rounded-sm"
                             placeholder="Paste YouTube/Drive link here"
                             value={personalization.videoUrl}
                             onChange={(e) => setPersonalization({...personalization, videoUrl: e.target.value})}
                          />
                          <p className="text-[11px] text-gray-500 leading-relaxed pt-2">
                             We will print a custom QR code inside the gift box that plays your video message when scanned.
                          </p>
                       </div>
                    </div>

                    <button 
                      className="w-full bg-[#1a1a1a] text-white py-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all rounded-sm"
                      onClick={handleFinalize}
                    >
                      Finalize Gift Box <CheckCircle2 size={14} strokeWidth={2} />
                    </button>
                 </div>
               )}

            </div>

          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BuildABox;
