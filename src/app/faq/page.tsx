"use client";

import * as React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Diamond } from "lucide-react";

const faqs = [
  {
    question: "How do I care for and clean my silver items?",
    answer:
      "Store silver in airtight pouches or anti-tarnish bags when not in use. Wipe gently with a soft, lint-free cloth after each use. Avoid exposure to perfume, lotion, and household chemicals. For deeper cleaning, use a silver polishing cloth or a mild silver cleaner. Visit our Care Instructions page for detailed guidance.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery across India takes 7–10 business days. You will receive WhatsApp updates on your order status after dispatch.",
  },
  {
    question: "Do you offer customization or bulk orders?",
    answer:
      "Yes! We welcome custom orders for gifting, corporate events, and weddings. Please reach out to us on WhatsApp at +91 99981 23479 to discuss your requirements, quantities, and timelines. Bulk orders typically require a lead time of 7–14 business days.",
  },
  {
    question: "What payment modes do you accept?",
    answer:
      "We accept all major UPI apps (GPay, PhonePe, Paytm), bank transfers (NEFT/IMPS/RTGS), and cash on in-store purchases. To place an order, simply reach out to us on WhatsApp and our team will guide you through payment.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return window for unused and undamaged items in original packaging. Customized and engraved pieces are not eligible for return. To initiate a return, contact us on WhatsApp with your order details. Refunds are processed within 5–7 business days of receiving the returned item.",
  },
  {
    question: "Are your pooja idols suitable for daily worship?",
    answer:
      "Yes. Our pooja idols are crafted for daily worship and long-term use. They are made from pure 925 silver and are designed to withstand routine use. We recommend gentle cleaning with a soft cloth and periodic polishing to maintain their sheen.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we ship within India only. If you are based abroad and wish to place an order, please contact us on WhatsApp and we will do our best to assist you.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold mb-6">
              HELP & SUPPORT
            </span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium">
              Frequently Asked <br /> Questions
            </h1>
            <p className="text-[#5a5a5a] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about Silver Spoon — our products, policies, and how we can serve you.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-16">
              <div className="h-[1px] w-14 bg-gray-200" />
              <Diamond size={12} className="text-gray-300" fill="currentColor" />
              <div className="h-[1px] w-14 bg-gray-200" />
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-100 rounded-sm overflow-hidden shadow-sm">
                  <button
                    className="w-full flex items-center justify-between px-8 py-6 text-left bg-[#FAF8F5] hover:bg-gray-50 transition-colors"
                    onClick={() => toggle(index)}
                  >
                    <span className="text-[14px] font-bold text-[#2c2c2c] uppercase tracking-tight pr-4">
                      {faq.question}
                    </span>
                    <span className="text-[20px] text-gray-400 font-light shrink-0">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-8 py-6 bg-white border-t border-gray-100">
                      <p className="text-[14px] text-gray-500 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-[13px] text-gray-400 mb-6">Still have questions? We&apos;re happy to help.</p>
              <button
                onClick={() => window.open("https://wa.me/919998123479?text=Hi, I have a question.", "_blank")}
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
