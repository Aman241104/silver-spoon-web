"use client";

import * as React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { ChevronRight, RefreshCcw, Sparkles, Gift, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "occasion" | "recipient" | "budget" | "style" | "results";

const GiftingConcierge = () => {
  const [step, setStep] = React.useState<Step>("occasion");
  const [answers, setAnswers] = React.useState({
    occasion: "",
    recipient: "",
    budget: 0,
    style: "",
  });
  const [results, setResults] = React.useState<Product[]>([]);
  const containerRef = React.useRef(null);

  const steps: { id: Step; title: string; options: any[] }[] = [
    {
      id: "occasion",
      title: "What is the occasion?",
      options: [
        { label: "Wedding", value: "Wedding" },
        { label: "Baby Born", value: "Baby Born" },
        { label: "Anniversary", value: "Anniversary" },
        { label: "Festivals", value: "Festivals" },
        { label: "Corporate", value: "Corporate" },
      ],
    },
    {
      id: "recipient",
      title: "Who is it for?",
      options: [
        { label: "For Her", value: "women" },
        { label: "For Him", value: "men" },
        { label: "For Kids", value: "kids" },
        { label: "Everyone", value: "unisex" },
      ],
    },
    {
      id: "budget",
      title: "What is your budget?",
      options: [
        { label: "Under ₹2,000", value: 2000 },
        { label: "₹2,000 - ₹5,000", value: 5000 },
        { label: "₹5,000 - ₹10,000", value: 10000 },
        { label: "Luxury (Above ₹10k)", value: 99999 },
      ],
    },
    {
      id: "style",
      title: "Select a style preference",
      options: [
        { label: "Traditional", value: "Traditional" },
        { label: "Modern", value: "Modern" },
        { label: "Minimalist", value: "Minimalist" },
        { label: "Artisan", value: "Artisan" },
      ],
    },
  ];

  const currentStepData = steps.find((s) => s.id === step);
  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const handleOptionSelect = (val: any) => {
    const newAnswers = { ...answers, [step]: val };
    setAnswers(newAnswers);

    // Fade out animation before state change
    gsap.to(".step-content", {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        if (currentStepIndex < steps.length - 1) {
          setStep(steps[currentStepIndex + 1].id);
        } else {
          calculateResults(newAnswers);
          setStep("results");
        }
      }
    });
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      gsap.to(".step-content", {
        opacity: 0,
        x: 20,
        duration: 0.3,
        onComplete: () => {
          setStep(steps[currentStepIndex - 1].id);
        }
      });
    }
  };

  const calculateResults = (finalAnswers: typeof answers) => {
    const filtered = products.filter((p) => {
      const matchOccasion = p.occasions?.some(occ => occ.toLowerCase() === finalAnswers.occasion.toLowerCase());
      const matchRecipient = p.gender === finalAnswers.recipient || p.gender === "unisex" || finalAnswers.recipient === "unisex";
      const matchBudget = (p.price || 0) <= finalAnswers.budget;
      const matchStyle = p.styles?.some(st => st.toLowerCase() === finalAnswers.style.toLowerCase());
      return matchBudget && (matchOccasion || matchRecipient || matchStyle);
    });
    
    const sorted = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
    setResults(sorted.slice(0, 8));
  };

  const reset = () => {
    gsap.to(".step-content", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setStep("occasion");
        setAnswers({ occasion: "", recipient: "", budget: 0, style: "" });
        setResults([]);
      }
    });
  };

  useGSAP(() => {
    // Initial entry for the whole container
    gsap.from(".concierge-header", {
       y: -20,
       opacity: 0,
       duration: 1,
       ease: "power4.out"
    });
  }, { scope: containerRef });

  useGSAP(() => {
    // Animation whenever step changes
    gsap.fromTo(".step-content", 
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", clearProps: "all" }
    );
    
    gsap.fromTo(".option-btn", 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.2 }
    );
  }, { dependencies: [step], scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-white text-charcoal pt-40 pb-24 overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-6 md:px-12">
        
        {step !== "results" ? (
          <div className="max-w-4xl mx-auto">
             <div className="concierge-header flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                      <Sparkles size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-1">Gifting Concierge</p>
                      <h1 className="text-3xl md:text-5xl font-serif tracking-tighter">The Treasury Guide</h1>
                   </div>
                </div>
                {currentStepIndex > 0 && (
                   <button 
                     onClick={handleBack}
                     className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-charcoal/40 hover:text-gold transition-colors group"
                   >
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
                   </button>
                )}
             </div>

             <div className="step-content bg-[#fcfcfc] border border-silver-100 p-10 md:p-20 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                
                <div className="flex justify-between items-center mb-10">
                   <p className="text-[9px] uppercase tracking-[0.6em] text-charcoal/30 font-bold">
                      Step {currentStepIndex + 1} of {steps.length}
                   </p>
                   <div className="flex gap-2">
                      {steps.map((_, i) => (
                        <div key={i} className={cn("w-8 h-1 transition-all duration-500", i <= currentStepIndex ? "bg-gold" : "bg-silver-200")} />
                      ))}
                   </div>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-serif text-charcoal mb-16 leading-tight">
                   {currentStepData?.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                   {currentStepData?.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleOptionSelect(opt.value)}
                        className="option-btn group relative flex items-center justify-between p-8 border border-silver-200 text-left hover:border-gold transition-all duration-500 bg-white"
                      >
                         <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-charcoal/60 group-hover:text-charcoal transition-colors">
                            {opt.label}
                         </span>
                         <ChevronRight size={16} className="text-silver-300 group-hover:text-gold group-hover:translate-x-2 transition-all" />
                      </button>
                   ))}
                </div>
             </div>
          </div>
        ) : (
          <div className="step-content max-w-6xl mx-auto">
             <div className="text-center mb-20">
                <div className="inline-block p-4 bg-gold/10 rounded-full text-gold mb-8">
                   <Gift size={32} />
                </div>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">Curated <span className="italic text-silver-400">For You.</span></h2>
                <p className="text-[10px] uppercase tracking-[0.6em] text-charcoal/40 font-bold mb-12">Based on your treasury preferences</p>
                <button 
                  onClick={reset}
                  className="flex items-center gap-3 mx-auto text-[9px] uppercase tracking-[0.4em] font-bold text-gold hover:text-charcoal transition-colors group"
                >
                   <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-700" /> Start Over
                </button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {results.length > 0 ? (
                  results.map((p) => (
                    <div key={p.id} className="option-btn">
                       <ProductCard product={p} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-silver-50 border border-silver-100 italic font-serif text-charcoal/40 text-2xl">
                     Our artisans are crafting new pieces for these specific criteria.
                  </div>
                )}
             </div>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
};

export default GiftingConcierge;
