"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Camera, Share2, Send } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] pt-32 pb-16 text-white border-t border-white/5 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-24">
          {/* Brand Info */}
          <div className="flex flex-col gap-10">
            <Link href="/" className="relative h-14 w-40 group">
              <Image
                src="/images/logo.png"
                alt="Silver Spoon Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-[11px] text-white/40 leading-loose font-sans max-w-xs uppercase tracking-[0.2em] font-bold">
              Defining the standard of purity since 1995. Our artisan collections celebrate the timeless brilliance of pure silver.
            </p>
            <div className="flex gap-6">
               <Link href="#" className="text-white/40 hover:text-gold transition-colors">
                  <Camera size={18} strokeWidth={1.5} />
               </Link>
               <Link href="#" className="text-white/40 hover:text-gold transition-colors">
                  <Share2 size={18} strokeWidth={1.5} />
               </Link>
               <Link href="#" className="text-white/40 hover:text-gold transition-colors">
                  <Send size={18} strokeWidth={1.5} />
               </Link>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-12">
              The Treasury
            </h4>
            <ul className="flex flex-col gap-5">
              {[
                { name: "Artisan Jewellery", href: "/collections/rings" },
                { name: "Divine Idols", href: "/collections/idols-gifts" },
                { name: "Ritual Utensils", href: "/collections/pooja-utensils" },
                { name: "Silver Coins", href: "/collections/coins" },
                { name: "For Men", href: "/collections/men" },
                { name: "For Women", href: "/collections/women" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-300 font-bold">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-12">
              Our Legacy
            </h4>
            <ul className="flex flex-col gap-5">
              {[
                { name: "Our Story", href: "/about" },
                { name: "Contact Expert", href: "/contact" },
                { name: "Shipping Policy", href: "#" },
                { name: "Authentication", href: "#" },
                { name: "Privacy Policy", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-300 font-bold">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-12">
              Concierge
            </h4>
            <ul className="flex flex-col gap-8">
              <li className="flex items-start gap-5">
                <MapPin size={18} strokeWidth={1} className="text-gold shrink-0 mt-1" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 leading-loose font-bold">
                  123 Jewellery Street, Silver Market,<br />Mumbai, MH 400001
                </span>
              </li>
              <li className="flex items-center gap-5">
                <Phone size={18} strokeWidth={1} className="text-gold shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-bold">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-5">
                <Mail size={18} strokeWidth={1} className="text-gold shrink-0" />
                <span className="text-[11px] lowercase tracking-[0.2em] text-white/40 font-bold">hello@silverspoon.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">
            © {currentYear} Silver Spoon. Crafted for a Legacy.
          </p>
          <div className="flex gap-12 opacity-40">
             <span className="text-[8px] uppercase tracking-[0.5em] text-white font-bold">925 Pure Silver</span>
             <span className="text-[8px] uppercase tracking-[0.5em] text-white font-bold">BIS Hallmarked</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
