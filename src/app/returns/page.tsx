"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RotateCcw, CheckCircle, XCircle, MessageSquare } from "lucide-react";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold mb-6">
              RETURNS & REFUNDS
            </span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium">
              Return & <br /> Refund Policy
            </h1>
            <p className="text-[#5a5a5a] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Your satisfaction is our priority. We have made our return process simple and transparent.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Return Window */}
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full shrink-0 bg-[#FAF8F5]">
                <RotateCcw size={24} strokeWidth={1} className="text-[#2c2c2c]" />
              </div>
              <div>
                <h2 className="text-[22px] font-serif text-[#2c2c2c] mb-4 font-medium uppercase tracking-tight">7-Day Return Window</h2>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  We accept returns within 7 days of delivery. To be eligible for a return, the item must be unused, undamaged, and in its original packaging with all tags and certificates intact. Items showing signs of use, tarnishing from improper care, or physical damage will not be accepted.
                </p>
              </div>
            </div>

            {/* Eligible & Non-Eligible */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#FAF8F5] border border-gray-100 p-8 rounded-sm shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle size={20} strokeWidth={1.5} className="text-green-500 shrink-0" />
                  <h3 className="text-[13px] font-bold text-[#2c2c2c] uppercase tracking-widest">Eligible for Return</h3>
                </div>
                <ul className="space-y-3 text-[13px] text-gray-500">
                  <li className="flex gap-2"><span className="text-green-400">•</span> Unused silver jewellery in original condition</li>
                  <li className="flex gap-2"><span className="text-green-400">•</span> Pooja idols without damage or wear</li>
                  <li className="flex gap-2"><span className="text-green-400">•</span> Gift items in sealed/original packaging</li>
                  <li className="flex gap-2"><span className="text-green-400">•</span> Items delivered with manufacturing defects</li>
                  <li className="flex gap-2"><span className="text-green-400">•</span> Wrong item received</li>
                </ul>
              </div>
              <div className="bg-[#FAF8F5] border border-gray-100 p-8 rounded-sm shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle size={20} strokeWidth={1.5} className="text-red-400 shrink-0" />
                  <h3 className="text-[13px] font-bold text-[#2c2c2c] uppercase tracking-widest">Not Eligible for Return</h3>
                </div>
                <ul className="space-y-3 text-[13px] text-gray-500">
                  <li className="flex gap-2"><span className="text-red-400">•</span> Customized or engraved pieces</li>
                  <li className="flex gap-2"><span className="text-red-400">•</span> Items damaged due to misuse or improper care</li>
                  <li className="flex gap-2"><span className="text-red-400">•</span> Returns initiated after 7 days of delivery</li>
                  <li className="flex gap-2"><span className="text-red-400">•</span> Items without original packaging or certificates</li>
                  <li className="flex gap-2"><span className="text-red-400">•</span> Bulk or corporate order items (case-by-case basis)</li>
                </ul>
              </div>
            </div>

            {/* How to Initiate */}
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full shrink-0 bg-[#FAF8F5]">
                <MessageSquare size={24} strokeWidth={1} className="text-[#2c2c2c]" />
              </div>
              <div>
                <h2 className="text-[22px] font-serif text-[#2c2c2c] mb-4 font-medium uppercase tracking-tight">How to Initiate a Return</h2>
                <ol className="space-y-3 text-[14px] text-gray-500 leading-relaxed list-none">
                  <li><span className="font-bold text-[#2c2c2c]">Step 1:</span> Contact us on WhatsApp at +91 99981 23479 within 7 days of receiving your order.</li>
                  <li><span className="font-bold text-[#2c2c2c]">Step 2:</span> Share your order details and photographs of the item showing its condition.</li>
                  <li><span className="font-bold text-[#2c2c2c]">Step 3:</span> Our team will review your request and confirm eligibility within 24 hours.</li>
                  <li><span className="font-bold text-[#2c2c2c]">Step 4:</span> Pack the item securely and ship it to our address. We will share the shipping label if applicable.</li>
                  <li><span className="font-bold text-[#2c2c2c]">Step 5:</span> Once received and inspected, your refund will be processed within 5–7 business days to the original payment method.</li>
                </ol>
              </div>
            </div>

            <div className="p-10 bg-[#FAF8F5] border border-gray-100 rounded-sm text-center">
              <p className="text-[13px] text-gray-500 mb-6">
                Have questions about your return? Our team is available Mon–Sat, 10am to 8:30pm.
              </p>
              <button
                onClick={() => window.open("https://wa.me/919998123479?text=Hi, I would like to initiate a return.", "_blank")}
                className="bg-[#1a1a1a] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all rounded-sm"
              >
                Initiate Return on WhatsApp
              </button>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
