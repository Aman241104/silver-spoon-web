"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

const StickyWhatsApp = () => {
  const phoneNumber = "919998123479"; // Updated with client's number
  const message = "Hello Silver Spoon, I'm interested in your artisan collection.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" strokeWidth={0} />
      
      {/* Tooltip/Label on Hover */}
      <span className="absolute right-full mr-4 bg-white text-[#2c2c2c] px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap border border-gray-100">
        Chat with us
      </span>
      
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </a>
  );
};

export default StickyWhatsApp;