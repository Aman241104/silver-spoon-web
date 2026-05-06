"use client";

import * as React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
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

  const steps: { id: Step; title: string; options: { label: string; value: string | number }[] }[] = [
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

  const handleOptionSelect = (val: string | number) => {
    const newAnswers = { ...answers, [step]: val };
    setAnswers(newAnswers);

    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1].id);
    } else {
      calculateResults(newAnswers);
      setStep("results");
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1].id);
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
    setStep("occasion");
    setAnswers({ occasion: "", recipient: "", budget: 0, style: "" });
    setResults([]);
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      <section className="pt-24 pb-12 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12 text-center">
            <span className="text-[11px] uppercase tracking-widest text-charcoal font-bold mb-4 block">
              GIFTING CONCIERGE
            </span>
            <h1 className="text-[42px] md:text-[56px] font-serif text-[#2c2c2c] leading-[1.05] tracking-tight font-medium">
              The Treasury Guide
            </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          
          {step !== "results" ? (
            <div className="max-w-4xl mx-auto">
               <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-gray-100 flex items-center justify-center text-gray-400">
                        <Sparkles size={20} strokeWidth={1.5} />
                     </div>
                     <div>
                        <p className="text-[11px] uppercase tracking-widest text-[#2c2c2c] font-bold mb-0.5">Concierge Assistant</p>
                        <p className="text-[13px] text-gray-500 font-serif">Let us help you find the perfect gift.</p>
                     </div>
                  </div>
                  {currentStepIndex > 0 && (
                     <button 
                       onClick={handleBack}
                       className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2c2c2c] transition-colors"
                     >
                        <ArrowLeft size={14} /> Back
                     </button>
                  )}
               </div>

               <div className="bg-[#FAF8F5] border border-gray-100 p-10 md:p-20 shadow-sm relative overflow-hidden rounded-sm">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#2c2c2c]" />
                  
                  <div className="flex justify-between items-center mb-10">
                     <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                        Step {currentStepIndex + 1} of {steps.length}
                     </p>
                     <div className="flex gap-2">
                        {steps.map((_, i) => (
                          <div key={i} className={cn("w-8 h-1 transition-all duration-500", i <= currentStepIndex ? "bg-[#2c2c2c]" : "bg-gray-200")} />
                        ))}
                     </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-serif text-[#2c2c2c] mb-16 leading-tight font-medium">
                     {currentStepData?.title}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                     {currentStepData?.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleOptionSelect(opt.value)}
                          className="group relative flex items-center justify-between p-6 border border-gray-200 text-left hover:border-gray-400 transition-all duration-300 bg-white rounded-sm shadow-sm"
                        >
                           <span className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c] transition-colors">
                              {opt.label}
                           </span>
                           <ChevronRight size={16} className="text-gray-300 group-hover:text-[#2c2c2c] transition-all" />
                        </button>
                     ))}
                  </div>
               </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-20">
                  <div className="inline-block p-5 bg-[#FAF8F5] border border-gray-100 rounded-full text-gray-400 mb-8 shadow-sm">
                     <Gift size={28} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[42px] md:text-[56px] font-serif tracking-tight text-[#2c2c2c] mb-6 font-medium">Curated For You</h2>
                  <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-10">Based on your treasury preferences</p>
                  <button 
                    onClick={reset}
                    className="flex items-center gap-2 mx-auto text-[10px] uppercase tracking-widest font-bold text-[#2c2c2c] hover:text-gray-500 transition-colors"
                  >
                     <RefreshCcw size={14} /> Start Over
                  </button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {results.length > 0 ? (
                    results.map((p) => (
                      <div key={p.id}>
                         <ProductCard product={p} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center bg-[#FAF8F5] border border-gray-100 font-serif text-gray-400 text-xl shadow-sm rounded-sm">
                       Our artisans are crafting new pieces for these specific criteria.
                    </div>
                  )}
               </div>
            </div>
          )}

        </div>
      </section>
      <Footer />
    </main>
  );
};

export default GiftingConcierge;
