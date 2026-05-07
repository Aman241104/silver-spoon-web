"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-12 md:pt-16 pb-0 text-charcoal font-sans border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 md:mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex flex-col">
              <div className="relative h-10 md:h-12 w-32 md:w-40 mb-1.5">
                <Image
                  src="/images/logo.png"
                  alt="Silver Spoon Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <span className="text-[8px] uppercase tracking-[0.4em] text-gray-400 font-bold ml-0.5">
                TIMELESS ELEGANCE, EVERYDAY
              </span>
            </Link>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-[280px] font-medium opacity-90">
              Discover a wide range of beautifully crafted Silver & German Silver products that add a touch of elegance to every moment.
            </p>
            <div className="flex gap-3">
               {/* Facebook */}
               <Link href="#" className="w-8 h-8 border border-charcoal/5 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:bg-[#1877F2]/5 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
               </Link>
               {/* Instagram */}
               <Link href="#" className="w-8 h-8 border border-charcoal/5 rounded-full flex items-center justify-center text-gray-400 hover:text-[#E4405F] hover:bg-[#E4405F]/5 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
               </Link>
               {/* WhatsApp */}
               <Link href="#" className="w-8 h-8 border border-charcoal/5 rounded-full flex items-center justify-center text-gray-400 hover:text-[#25D366] hover:bg-[#25D366]/5 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
               </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a] mb-6">
              QUICK LINKS
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Shop", href: "/products" },
                { name: "Collections", href: "/collections" },
                { name: "Gifting", href: "/gifting" },
                { name: "Bulk Orders", href: "/corporate" },
                { name: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[13px] text-gray-500 hover:text-gold transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a] mb-6">
              CUSTOMER SERVICE
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "FAQ's", href: "/contact" },
                { name: "Shipping & Delivery", href: "/contact" },
                { name: "Return & Refund", href: "/contact" },
                { name: "Care Instructions", href: "/contact" },
                { name: "Track Order", href: "/track" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[13px] text-gray-500 hover:text-gold transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a] mb-6">
              CONTACT US
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <Phone size={16} strokeWidth={1} className="text-gray-300 shrink-0" />
                <span className="text-[13px] text-gray-500 font-medium">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} strokeWidth={1} className="text-gray-300 shrink-0" />
                <span className="text-[13px] text-gray-500 font-medium">info@silverspoon.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#111827] -mx-6 md:-mx-12 px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
          <p className="text-[11px] text-white/50 font-semibold tracking-tight">
            © 2024 Silver Spoon. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;