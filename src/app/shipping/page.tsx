"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Truck, Package, MessageSquare, ShieldCheck } from "lucide-react";

const policies = [
  {
    icon: <Truck size={28} strokeWidth={1} className="text-[#2c2c2c]" />,
    title: "Pan-India Delivery",
    description:
      "We deliver across all states and union territories in India. Whether you are in a metro city or a smaller town, we ensure your silver reaches you safely and on time.",
  },
  {
    icon: <Package size={28} strokeWidth={1} className="text-[#2c2c2c]" />,
    title: "Secure & Elegant Packaging",
    description:
      "Every order is packed in our signature tamper-proof, cushioned packaging designed specifically for silver goods. Idols and fragile pieces receive additional protective wrapping to prevent damage in transit.",
  },
  {
    icon: <MessageSquare size={28} strokeWidth={1} className="text-[#2c2c2c]" />,
    title: "WhatsApp Order Tracking",
    description:
      "Once your order is dispatched, you will receive a tracking update directly on WhatsApp. Our team is available Mon–Sat, 10am to 8:30pm to answer any queries about your shipment.",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1} className="text-[#2c2c2c]" />,
    title: "Insured Shipments",
    description:
      "All orders above ₹5,000 are dispatched with transit insurance. In the rare event of damage or loss in transit, we will replace or refund your order at no extra cost.",
  },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold mb-6">
              DELIVERY INFORMATION
            </span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium">
              Shipping & <br /> Delivery
            </h1>
            <p className="text-[#5a5a5a] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Your silver deserves to arrive safely. Here is everything you need to know about how we ship your orders.
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Timeframes */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-2xl mx-auto">
              <div className="bg-[#FAF8F5] border border-gray-100 p-10 text-center rounded-sm shadow-sm">
                <p className="text-[36px] font-serif text-[#2c2c2c] mb-2">7–10</p>
                <p className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-3">Business Days</p>
                <p className="text-[13px] text-gray-500">Standard Delivery across India</p>
              </div>
              <div className="bg-[#FAF8F5] border border-gray-100 p-10 text-center rounded-sm shadow-sm">
                <p className="text-[36px] font-serif text-[#2c2c2c] mb-2">Free</p>
                <p className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-3">Shipping</p>
                <p className="text-[13px] text-gray-500">On all orders above ₹2,000</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {policies.map((policy) => (
                <div key={policy.title} className="flex items-start gap-6 p-8 border border-gray-100 rounded-sm bg-white shadow-sm">
                  <div className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full shrink-0 bg-[#FAF8F5]">
                    {policy.icon}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#2c2c2c] uppercase tracking-tight mb-3">{policy.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{policy.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-10 bg-[#FAF8F5] border border-gray-100 rounded-sm text-center">
              <p className="text-[13px] text-gray-500 mb-6">
                For custom orders, bulk orders, or urgent deliveries, please contact us directly.
              </p>
              <button
                onClick={() => window.open("https://wa.me/919998123479?text=Hi, I have a query about shipping.", "_blank")}
                className="bg-[#1a1a1a] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all rounded-sm"
              >
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
