"use client";

import * as React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageSquare, Send, Diamond } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="text-[#2c2c2c]" size={28} strokeWidth={1} />,
      title: "Call Us",
      details: "+91 98765 43210",
      subtext: "Mon-Sat, 10am to 7pm",
    },
    {
      icon: <Mail className="text-[#2c2c2c]" size={28} strokeWidth={1} />,
      title: "Email Us",
      details: "hello@silverspoon.com",
      subtext: "We reply within 24 hours",
    },
    {
      icon: <MapPin className="text-[#2c2c2c]" size={28} strokeWidth={1} />,
      title: "Visit Us",
      details: "123, Silver Street, Jaipur",
      subtext: "Rajasthan - 302001",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you soon!");
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold mb-6">
              GET IN TOUCH
            </span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-serif text-[#2c2c2c] leading-[1.05] mb-8 tracking-tight font-medium">
              We&apos;d love to hear <br /> from you
            </h1>
            <p className="text-[#5a5a5a] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Whether you have a question about our collections, need assistance with an order, or want to discuss a custom piece, our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Contact Details */}
            <div className="lg:col-span-1 space-y-12 flex flex-col items-start lg:pr-8">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-5">
                  <div className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full shrink-0 bg-white shadow-sm">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#2c2c2c] mb-1 uppercase tracking-tight">{info.title}</h3>
                    <p className="text-[16px] font-serif text-[#2c2c2c] mb-1 font-medium">{info.details}</p>
                    <p className="text-[13px] text-gray-500 leading-tight">{info.subtext}</p>
                  </div>
                </div>
              ))}

              <div className="pt-10 w-full">
                 <button 
                    className="w-full bg-[#FAF8F5] border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-3 py-4 text-[13px] font-bold text-[#2c2c2c] uppercase tracking-widest shadow-sm rounded-sm"
                    onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                 >
                    <MessageSquare size={18} strokeWidth={1.5} />
                    Chat on WhatsApp
                 </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
               <h2 className="text-[32px] md:text-[36px] font-serif text-[#2c2c2c] tracking-[0.1em] uppercase mb-10 font-medium">
                 Send us a Message
               </h2>
               
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c]">Full Name *</label>
                        <input 
                           type="text" 
                           placeholder="Enter your name"
                           required
                           className="w-full bg-white border border-gray-200 px-5 py-4 focus:ring-0 focus:border-gray-400 outline-none font-sans text-[14px] transition-colors shadow-sm"
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c]">Email Address *</label>
                        <input 
                           type="email" 
                           placeholder="Enter your email"
                           required
                           className="w-full bg-white border border-gray-200 px-5 py-4 focus:ring-0 focus:border-gray-400 outline-none font-sans text-[14px] transition-colors shadow-sm"
                        />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c]">Subject</label>
                     <input 
                        type="text" 
                        placeholder="What is this regarding?"
                        className="w-full bg-white border border-gray-200 px-5 py-4 focus:ring-0 focus:border-gray-400 outline-none font-sans text-[14px] transition-colors shadow-sm"
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c]">Your Message *</label>
                     <textarea 
                        rows={5}
                        placeholder="How can we help you?"
                        required
                        className="w-full bg-white border border-gray-200 px-5 py-4 focus:ring-0 focus:border-gray-400 outline-none font-sans text-[14px] transition-colors resize-none shadow-sm"
                     ></textarea>
                  </div>
                  <button type="submit" className="w-full md:w-auto px-12 py-4 bg-[#1a1a1a] text-white hover:bg-black transition-all flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
                     <Send size={16} strokeWidth={2} />
                     Send Message
                  </button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="h-[400px] bg-[#FAF8F5] relative overflow-hidden border-t border-gray-100 flex items-center justify-center">
         <div className="text-center flex flex-col items-center">
            <MapPin size={40} className="text-gray-300 mb-4" strokeWidth={1} />
            <p className="text-[11px] uppercase tracking-widest font-bold text-gray-400">Interactive Map Location</p>
         </div>
      </section>

      <Footer />
    </main>
  );
}
