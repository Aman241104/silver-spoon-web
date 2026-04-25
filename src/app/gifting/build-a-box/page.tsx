"use client";

import * as React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, Product } from "@/data/products";
import Image from "next/image";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ArrowRight, Box, Package, Video, QrCode, CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const BuildABox = () => {
  const [step, setStep] = React.useState(1);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [selectedBox, setSelectedBox] = React.useState("");
  const [personalization, setPersonalization] = React.useState({
    text: "",
    videoUrl: "",
  });
  const containerRef = React.useRef(null);

  const boxes = [
    { id: "velvet", name: "Royal Velvet Red", color: "bg-[#4a0e0e]" },
    { id: "wooden", name: "Artisan Walnut", color: "bg-[#3e2723]" },
    { id: "silk", name: "Heritage Silk White", color: "bg-[#f5f5f5]" },
  ];

  const handleNext = () => {
    gsap.to(".step-content", {
      opacity: 0,
      x: -30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setStep(step + 1)
    });
  };

  const handlePrev = () => {
    gsap.to(".step-content", {
      opacity: 0,
      x: 30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setStep(step - 1)
    });
  };

  useGSAP(() => {
    // Entrance for current step content
    gsap.fromTo(".step-content", 
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );

    gsap.from(".box-reveal", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.2
    });
  }, { dependencies: [step], scope: containerRef });

  // Floating animation for the virtual box
  useGSAP(() => {
    gsap.to(".virtual-box", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-white text-charcoal pt-40 pb-24 overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left: Interactive Preview */}
          <div className="preview-container sticky top-40 bg-[#fcfcfc] border border-silver-100 p-12 md:p-20 flex flex-col items-center justify-center min-h-[500px] shadow-sm">
             <div className="absolute top-10 left-10 flex items-center gap-3">
                <Box size={20} className="text-gold" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/30">Virtual Atelier</span>
             </div>

             <div className="virtual-box relative w-64 h-64 md:w-80 md:h-80 perspective-1000">
                <div className={cn(
                  "w-full h-full border-4 border-white/20 shadow-2xl transition-all duration-1000 flex items-center justify-center p-8 relative",
                  selectedBox === "Royal Velvet Red" ? "bg-[#4a0e0e]" : 
                  selectedBox === "Artisan Walnut" ? "bg-[#3e2723]" : 
                  selectedBox === "Heritage Silk White" ? "bg-white border-silver-100" : "bg-silver-100"
                )}>
                   {selectedProduct && (
                     <div className="relative w-full h-full overflow-hidden shadow-xl">
                        <Image src={selectedProduct.image} alt="Selected Piece" fill className="object-cover" />
                     </div>
                   )}
                   
                   {!selectedProduct && (
                     <p className="text-[10px] uppercase tracking-[0.4em] text-charcoal/20 font-bold">Awaiting Masterpiece</p>
                   )}

                   {personalization.videoUrl && (
                      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white p-2 shadow-2xl border border-silver-100 rotate-12">
                         <QrCode className="w-full h-full text-charcoal" strokeWidth={1} />
                      </div>
                   )}
                </div>
             </div>

             <div className="mt-16 text-center w-full max-w-xs">
                <h3 className="text-xl font-serif text-charcoal mb-4">Box Composition</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-bold">
                      <span className="text-charcoal/40">Artisan Piece:</span>
                      <span className="text-gold truncate max-w-[150px]">{selectedProduct?.name || "Pending Selection"}</span>
                   </div>
                   <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-bold">
                      <span className="text-charcoal/40">Vault Case:</span>
                      <span className="text-gold">{selectedBox || "Standard Packaging"}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Right: Steps */}
          <div className="step-content flex flex-col pt-10">
             <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                   <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold">Phase {step} of 3</p>
                   <div className="flex gap-2">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className={cn("w-10 h-1 transition-all duration-500", s <= step ? "bg-gold" : "bg-silver-200")} />
                      ))}
                   </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif tracking-tighter">Build Your <span className="italic text-silver-400">Gift Box.</span></h1>
             </div>

             {/* Step 1: Select Product */}
             {step === 1 && (
               <div className="space-y-8">
                  <p className="text-sm uppercase tracking-widest text-charcoal/60 font-bold mb-10">I. Select an artisan silver piece</p>
                  <div className="grid grid-cols-2 gap-4">
                     {products.slice(0, 6).map((p) => (
                       <button 
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className={cn(
                          "box-reveal group relative aspect-square overflow-hidden bg-silver-50 border transition-all duration-500",
                          selectedProduct?.id === p.id ? "border-gold ring-4 ring-gold/5" : "border-silver-100 hover:border-gold/50"
                        )}
                       >
                          <Image src={p.image} alt={p.name} fill className="object-cover transition-transform group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-2 text-[8px] uppercase tracking-widest font-bold">
                             {p.name}
                          </div>
                       </button>
                     ))}
                  </div>
                  <button 
                    disabled={!selectedProduct}
                    onClick={handleNext}
                    className="box-reveal w-full bg-charcoal text-white py-6 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all disabled:opacity-30"
                  >
                     Select Packaging <ArrowRight size={14} />
                  </button>
               </div>
             )}

             {/* Step 2: Select Box */}
             {step === 2 && (
               <div className="space-y-12">
                  <div className="flex items-center justify-between mb-10">
                     <p className="text-sm uppercase tracking-widest text-charcoal/60 font-bold">II. Choose Premium Packaging</p>
                     <button onClick={handlePrev} className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 hover:text-gold flex items-center gap-2">
                        <ArrowLeft size={14} /> Back
                     </button>
                  </div>
                  <div className="space-y-6">
                     {boxes.map((box) => (
                        <button
                          key={box.id}
                          onClick={() => setSelectedBox(box.name)}
                          className={cn(
                            "box-reveal w-full flex items-center justify-between p-8 border transition-all duration-500",
                            selectedBox === box.name ? "border-gold bg-gold/5" : "border-silver-100 hover:border-gold/30"
                          )}
                        >
                           <div className="flex items-center gap-6">
                              <div className={cn("w-10 h-10 rounded-none shadow-xl", box.color)} />
                              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{box.name}</span>
                           </div>
                           <Package size={16} className={selectedBox === box.name ? "text-gold" : "text-silver-300"} />
                        </button>
                     ))}
                  </div>
                  <button 
                    disabled={!selectedBox}
                    onClick={handleNext}
                    className="box-reveal w-full bg-charcoal text-white py-6 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all disabled:opacity-30"
                  >
                    Personalize <ArrowRight size={14} />
                  </button>
               </div>
             )}

             {/* Step 3: Personalize */}
             {step === 3 && (
               <div className="space-y-12">
                  <div className="flex items-center justify-between mb-10">
                     <p className="text-sm uppercase tracking-widest text-charcoal/60 font-bold">III. Add the Heart of the Gift</p>
                     <button onClick={handlePrev} className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 hover:text-gold flex items-center gap-2">
                        <ArrowLeft size={14} /> Back
                     </button>
                  </div>
                  <div className="space-y-10">
                     <div className="box-reveal space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/40">Handwritten Message</label>
                        <textarea 
                           className="w-full bg-silver-50 border-none p-6 text-sm font-sans focus:ring-1 focus:ring-gold/30 transition-all outline-none h-32"
                           placeholder="Type your heartfelt message here..."
                           onChange={(e) => setPersonalization({...personalization, text: e.target.value})}
                        />
                     </div>
                     <div className="box-reveal space-y-4">
                        <div className="flex justify-between items-center">
                           <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/40 flex items-center gap-3">
                              <Video size={14} className="text-gold" /> Video Message Link
                           </label>
                           <span className="text-[8px] uppercase tracking-widest text-gold font-bold">Legacy Feature</span>
                        </div>
                        <input 
                           type="url"
                           className="w-full bg-silver-50 border-none p-6 text-sm font-sans focus:ring-1 focus:ring-gold/30 transition-all outline-none"
                           placeholder="Paste YouTube/Drive link here"
                           onChange={(e) => setPersonalization({...personalization, videoUrl: e.target.value})}
                        />
                        <p className="text-[9px] text-charcoal/30 uppercase tracking-widest leading-relaxed">
                           We will print a custom QR code inside the gift box that plays your video message when scanned.
                        </p>
                     </div>
                  </div>

                  <button 
                    className="box-reveal w-full bg-[#0a0a0a] text-white py-6 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all"
                    onClick={() => alert("Box Ready! In a real app, this adds the full custom set to your bag.")}
                  >
                    Finalize Treasury Box <CheckCircle2 size={14} />
                  </button>
               </div>
             )}

          </div>

        </div>

      </div>
      <Footer />
    </main>
  );
};

export default BuildABox;
