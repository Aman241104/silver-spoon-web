"use client";

import * as React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGSAP } from "@/hooks/use-gsap";
import gsap from "gsap";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const containerRef = useGSAP(() => {
    gsap.from(".contact-reveal", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  });

  const contactInfo = [
    {
      icon: <Phone className="text-gold" size={24} strokeWidth={1.5} />,
      title: "Call Us",
      details: "+91 98765 43210",
      subtext: "Mon-Sat, 10am to 7pm",
    },
    {
      icon: <Mail className="text-gold" size={24} strokeWidth={1.5} />,
      title: "Email Us",
      details: "hello@silverspoon.com",
      subtext: "We reply within 24 hours",
    },
    {
      icon: <MapPin className="text-gold" size={24} strokeWidth={1.5} />,
      title: "Visit Us",
      details: "123 Jewellery Street, Silver Market, Mumbai",
      subtext: "Maharashtra 400001",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle form submission
    alert("Thank you for your message. We will get back to you soon!");
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-40 pb-20 bg-silver-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="contact-reveal text-xs uppercase tracking-[0.4em] text-gold font-bold mb-6">
            Get In Touch
          </p>
          <h1 className="contact-reveal text-5xl md:text-6xl font-serif text-charcoal mb-8">
            We&apos;d love to hear from you.
          </h1>
          <p className="contact-reveal text-lg text-charcoal/60 font-sans max-w-2xl mx-auto">
            Whether you have a question about our collections, need assistance with an order, or want to discuss a custom piece, our team is here to help.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Details */}
            <div className="lg:col-span-1 space-y-12">
              {contactInfo.map((info) => (
                <div key={info.title} className="contact-reveal flex items-start gap-6">
                  <div className="p-4 bg-silver-50 rounded-full shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-ultra font-bold text-charcoal mb-2">{info.title}</h3>
                    <p className="text-lg font-serif text-charcoal mb-1">{info.details}</p>
                    <p className="text-sm text-charcoal/50">{info.subtext}</p>
                  </div>
                </div>
              ))}

              <div className="contact-reveal pt-12 border-t border-silver-100">
                 <h3 className="text-sm uppercase tracking-ultra font-bold text-charcoal mb-6">Connect on WhatsApp</h3>
                 <Button 
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] border-none flex items-center justify-center gap-3 py-6"
                    onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                 >
                    <MessageSquare size={18} />
                    Chat with an Expert
                 </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 md:p-12 border border-silver-100 shadow-xl contact-reveal">
               <h2 className="text-3xl font-serif text-charcoal mb-8">Send us a Message</h2>
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/40">Full Name</label>
                        <input 
                           type="text" 
                           placeholder="John Doe"
                           required
                           className="w-full bg-silver-50 border-none px-6 py-4 focus:ring-1 focus:ring-gold/30 outline-none font-sans text-sm transition-all"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/40">Email Address</label>
                        <input 
                           type="email" 
                           placeholder="john@example.com"
                           required
                           className="w-full bg-silver-50 border-none px-6 py-4 focus:ring-1 focus:ring-gold/30 outline-none font-sans text-sm transition-all"
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/40">Subject</label>
                     <input 
                        type="text" 
                        placeholder="Inquiry about Silver Coins"
                        className="w-full bg-silver-50 border-none px-6 py-4 focus:ring-1 focus:ring-gold/30 outline-none font-sans text-sm transition-all"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/40">Your Message</label>
                     <textarea 
                        rows={6}
                        placeholder="How can we help you?"
                        required
                        className="w-full bg-silver-50 border-none px-6 py-4 focus:ring-1 focus:ring-gold/30 outline-none font-sans text-sm transition-all resize-none"
                     ></textarea>
                  </div>
                  <Button size="lg" className="w-full md:w-auto px-12 py-6 bg-charcoal text-white hover:bg-gold transition-all flex items-center justify-center gap-3">
                     <Send size={18} />
                     Send Message
                  </Button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="h-[400px] bg-silver-100 relative overflow-hidden grayscale contrast-125">
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
               <MapPin size={48} className="text-gold/30 mx-auto mb-4" />
               <p className="text-xs uppercase tracking-ultra font-bold text-charcoal/30">Interactive Map Location</p>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
