"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Diamond } from "lucide-react";

const sections = [
  {
    title: "Storage",
    tips: [
      "Store each silver piece individually in an airtight zip-lock pouch or anti-tarnish bag to prevent oxidation.",
      "Keep jewellery and idols away from direct sunlight and high-humidity areas such as bathrooms.",
      "Use silica gel packets inside your storage box to absorb excess moisture.",
      "Avoid stacking multiple pieces together — silver is soft and can scratch easily.",
    ],
  },
  {
    title: "Daily Care",
    tips: [
      "Remove silver jewellery before bathing, swimming, or exercising — water, chlorine, and sweat accelerate tarnishing.",
      "Apply perfume, lotions, and hairspray before wearing your silver, never after.",
      "Wipe your silver gently with a soft, dry, lint-free cloth after each use to remove oils and residue.",
      "Never use paper towels or tissue paper, which can scratch the surface.",
    ],
  },
  {
    title: "Cleaning Your Silver",
    tips: [
      "For light tarnish, rub gently with a silver polishing cloth in straight back-and-forth motions — not circular.",
      "For heavier tarnish, use a small amount of mild silver cleaning solution on a soft cloth and rinse with warm water.",
      "Avoid toothpaste, baking soda, and abrasive cleaners — they can damage fine hallmarked surfaces.",
      "Ultrasonic cleaners are not recommended for gemstone-set or intricate pieces.",
    ],
  },
  {
    title: "Caring for Pooja Idols",
    tips: [
      "Wipe idols with a soft dry cloth after each puja to remove incense residue and flower oils.",
      "Avoid using milk, turmeric, or acidic substances directly on solid silver idols for extended periods without rinsing — rinse with plain water and dry immediately.",
      "Panch Amrit (used in abhishek) should be rinsed off promptly; leaving it on can accelerate tarnish.",
      "Polish with a silver cloth monthly to maintain the natural shine of your idol.",
    ],
  },
  {
    title: "Caring for Silver Jewellery",
    tips: [
      "Rings and bangles worn daily will tarnish faster — clean weekly with a polishing cloth.",
      "For filigree or textured pieces, use a soft-bristle toothbrush with a tiny amount of mild soap and rinse with warm water. Dry completely before storing.",
      "Oxidized silver jewellery (intentionally darkened) should not be polished as it will remove the oxidation finish.",
      "Sterling silver chains should be stored unclasped and laid flat to prevent kinking.",
    ],
  },
];

export default function CarePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold mb-6">
              SILVER CARE GUIDE
            </span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium">
              Care <br /> Instructions
            </h1>
            <p className="text-[#5a5a5a] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Silver is a living metal — it responds to its environment. With the right care, your Silver Spoon pieces will retain their brilliance for generations.
            </p>
          </div>
        </div>
      </section>

      {/* Care Sections */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">

            <div className="flex items-center justify-center gap-3 mb-16">
              <div className="h-[1px] w-14 bg-gray-200" />
              <Diamond size={12} className="text-gray-300" fill="currentColor" />
              <div className="h-[1px] w-14 bg-gray-200" />
            </div>

            <div className="space-y-16">
              {sections.map((section, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-1">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">0{index + 1}</span>
                    <h2 className="text-[22px] font-serif text-[#2c2c2c] font-medium">{section.title}</h2>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    {section.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 shrink-0" />
                        <p className="text-[14px] text-gray-500 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 p-10 bg-[#FAF8F5] border border-gray-100 rounded-sm text-center">
              <p className="font-serif italic text-[#2c2c2c] text-lg mb-3">Have a question about caring for a specific piece?</p>
              <p className="text-[13px] text-gray-400 mb-6">Our team is happy to give you personalized advice.</p>
              <button
                onClick={() => window.open("https://wa.me/919998123479?text=Hi, I need advice on caring for my silver.", "_blank")}
                className="bg-[#1a1a1a] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all rounded-sm"
              >
                Ask on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
