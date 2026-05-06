"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, MapPin, Truck, Package, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>(null);

  const toggleAccordion = (val: string) => {
    setActiveAccordion(activeAccordion === val ? null : val);
  };

  const menuItems = [
    { title: "HOME", href: "/" },
    { title: "COLLECTION", href: "/products" },
    { 
      title: "MEN", 
      href: "/collections/men",
      subItems: [
        { title: "Brooches", href: "/collections/brooches?gender=men" },
        { title: "Bracelets", href: "/collections/bracelets?gender=men" },
        { title: "Chains", href: "/collections/chains?gender=men" },
        { title: "Kada", href: "/collections/kadas?gender=men" },
        { title: "Rings", href: "/collections/rings?gender=men" },
      ]
    },
    { 
      title: "WOMEN", 
      href: "/collections/women",
      subItems: [
        { title: "Rings", href: "/collections/rings?gender=women" },
        { title: "Bracelets", href: "/collections/bracelets?gender=women" },
        { title: "Chains", href: "/collections/chains?gender=women" },
        { title: "Anklets", href: "/collections/anklets?gender=women" },
        { title: "Toe Rings", href: "/collections/toe-rings?gender=women" },
        { title: "Mangalsutra", href: "/collections/mangalsutra?gender=women" },
      ]
    },
    { 
      title: "GIFTS", 
      href: "#",
      subItems: [
        { title: "Silver Utensils", href: "/collections/utensils" },
        { title: "Silver Idols", href: "/collections/silver-idols" },
        { title: "Silver Frames", href: "/collections/silver-frames" },
        { title: "Silver Coated", href: "/collections/silver-coated" },
        { title: "German Silver", href: "/collections/german-silver" },
      ]
    },
    { title: "ABOUT US", href: "/about" },
    { title: "CONTACT", href: "/contact" },
  ];

  return (
    <div className="w-full flex flex-col font-sans relative z-50">
      {/* Top Bar - Hidden on mobile for more space, but can be kept if needed */}
      <div className="bg-[#2c2c2c] text-white text-[10px] md:text-xs py-2 px-6 md:px-12 flex justify-between items-center tracking-wide overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2 min-w-max">
          <Package size={14} className="opacity-80" />
          <span>Free Shipping on Orders Above ₹1999</span>
        </div>
        <div className="flex items-center gap-6 ml-6 min-w-max">
          <Link href="/track" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            <Truck size={14} className="opacity-80" />
            <span>Track Order</span>
          </Link>
          <Link href="/stores" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            <MapPin size={14} className="opacity-80" />
            <span>Store Locator</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#FAF8F5] border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between py-4 md:py-6">
          
          {/* Left: Hamburger for Mobile */}
          <button 
            className="lg:hidden p-2 -ml-2 text-charcoal"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Center: Logo (Mobile: Shifted center or right, Desktop: Left) */}
          <Link href="/" className="flex flex-col items-center flex-1 lg:flex-none">
            <div className="relative h-12 w-28 md:h-16 md:w-48 mb-1">
              <Image
                src="/images/logo.png"
                alt="Silver Spoon Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden md:block text-[7px] uppercase tracking-widest text-charcoal/60 font-semibold">
              Timeless Elegance, Everyday
            </span>
          </Link>

          {/* Center: Navigation Links (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {menuItems.map((item) => (
              item.subItems ? (
                <div key={item.title} className="relative group">
                  <Link href={item.href} className="flex items-center gap-1 text-[11px] font-extrabold text-charcoal uppercase tracking-[0.2em] hover:text-gray-600 cursor-pointer pb-2">
                    {item.title} <span className="text-[7px] ml-0.5">▼</span>
                  </Link>
                  <div className="absolute top-full left-0 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 py-4">
                    {item.subItems.map((sub) => (
                      <Link key={sub.title} href={sub.href} className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.title} href={item.href} className="text-[11px] font-extrabold text-charcoal uppercase tracking-[0.2em] hover:text-gray-600 transition-colors">
                  {item.title}
                </Link>
              )
            ))}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 md:gap-6 text-charcoal">
            <button className="hover:opacity-70 transition-opacity">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="relative hover:opacity-70 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 bg-charcoal text-white text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <div className={cn(
        "fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "absolute inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#FAF8F5]">
            <div className="relative h-10 w-24">
              <Image src="/images/logo.png" alt="Silver Spoon" fill className="object-contain" />
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal p-1">
              <X size={24} />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="flex flex-col">
              {menuItems.map((item) => (
                <div key={item.title} className="border-b border-gray-50 last:border-none">
                  {item.subItems ? (
                    <>
                      <button 
                        onClick={() => toggleAccordion(item.title)}
                        className="w-full flex items-center justify-between px-8 py-4 text-left"
                      >
                        <span className="text-[12px] font-extrabold text-charcoal uppercase tracking-[0.2em]">
                          {item.title}
                        </span>
                        {activeAccordion === item.title ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <div className={cn(
                        "bg-[#FAF8F5] overflow-hidden transition-all duration-300",
                        activeAccordion === item.title ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      )}>
                        <div className="px-10 py-4 flex flex-col gap-4">
                          <Link 
                            href={item.href} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[11px] font-bold text-gold uppercase tracking-[0.15em]"
                          >
                            View All {item.title}
                          </Link>
                          {item.subItems.map((sub) => (
                            <Link 
                              key={sub.title} 
                              href={sub.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-[11px] font-bold text-charcoal/70 hover:text-charcoal uppercase tracking-[0.15em]"
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link 
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-8 py-4 text-[12px] font-extrabold text-charcoal uppercase tracking-[0.2em]"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-100 bg-[#FAF8F5]">
            <div className="flex flex-col gap-4">
              <Link href="/track" className="flex items-center gap-3 text-[11px] font-bold text-charcoal/60 uppercase tracking-widest">
                <Truck size={16} /> Track Order
              </Link>
              <Link href="/stores" className="flex items-center gap-3 text-[11px] font-bold text-charcoal/60 uppercase tracking-widest">
                <MapPin size={16} /> Store Locator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
