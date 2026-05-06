"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-8 text-charcoal font-sans border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="flex flex-col">
              <div className="relative h-16 w-40 mb-2">
                <Image
                  src="/images/logo.png"
                  alt="Silver Spoon Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[8px] uppercase tracking-[0.4em] text-gray-400 font-bold ml-1">
                TIMELESS ELEGANCE, EVERYDAY
              </span>
            </Link>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-[280px]">
              Discover a wide range of beautifully crafted Silver & German Silver products that add a touch of elegance to every moment.
            </p>
            <div className="flex gap-4">
               <Link href="#" className="w-9 h-9 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-charcoal hover:border-gray-300 transition-all text-[11px] font-bold">
                  FB
               </Link>
               <Link href="#" className="w-9 h-9 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-charcoal hover:border-gray-300 transition-all text-[11px] font-bold">
                  IG
               </Link>
               <Link href="#" className="w-9 h-9 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-charcoal hover:border-gray-300 transition-all text-[11px] font-bold">
                  WA
               </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#2c2c2c] mb-10">
              QUICK LINKS
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Shop", href: "/products" },
                { name: "Collections", href: "/collections" },
                { name: "Gifting", href: "/gifting" },
                { name: "Bulk Orders", href: "/corporate" },
                { name: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[13px] text-gray-500 hover:text-charcoal transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#2c2c2c] mb-10">
              CUSTOMER SERVICE
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "FAQ's", href: "#" },
                { name: "Shipping & Delivery", href: "#" },
                { name: "Return & Refund", href: "#" },
                { name: "Care Instructions", href: "#" },
                { name: "Track Order", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[13px] text-gray-500 hover:text-charcoal transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#2c2c2c] mb-10">
              CONTACT US
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin size={18} strokeWidth={1} className="text-gray-300 shrink-0 mt-1" />
                <span className="text-[13px] text-gray-500 leading-relaxed font-medium">
                  123, Silver Street, Jaipur,<br />Rajasthan - 302001, India
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} strokeWidth={1} className="text-gray-300 shrink-0" />
                <span className="text-[13px] text-gray-500 font-medium">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} strokeWidth={1} className="text-gray-300 shrink-0" />
                <span className="text-[13px] text-gray-500 font-medium">info@silverspoon.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] text-gray-400 font-medium">
            © 2024 Silver Spoon. All Rights Reserved.
          </p>
          <div className="flex gap-3">
             <div className="bg-gray-50 border border-gray-100 px-4 py-1.5 text-[10px] font-bold text-gray-500 rounded-sm">VISA</div>
             <div className="bg-gray-50 border border-gray-100 px-4 py-1.5 text-[10px] font-bold text-gray-500 rounded-sm">UPI</div>
             <div className="bg-gray-50 border border-gray-100 px-4 py-1.5 text-[10px] font-bold text-gray-500 rounded-sm">RuPay</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;