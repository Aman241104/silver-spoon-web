"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingBag, MapPin, Truck, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <div className="w-full flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-[#2c2c2c] text-white text-[10px] md:text-xs py-2 px-6 md:px-12 flex justify-between items-center tracking-wide">
        <div className="flex items-center gap-2">
          <Package size={14} className="opacity-80" />
          <span>Free Shipping on Orders Above ₹1999</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/track" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            <Truck size={14} className="opacity-80" />
            <span>Track Order</span>
          </Link>
          <Link href="/stores" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            <MapPin size={14} className="opacity-80" />
            <span>Store Locator</span>
          </Link>
          <Link href="/corporate" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            <User size={14} className="opacity-80" />
            <span>Bulk / Corporate Gifting</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between py-6">
          
          {/* Left: Logo */}
          <Link href="/" className="flex flex-col items-center">
            <div className="relative h-16 w-32 md:w-48 mb-1">
              <Image
                src="/images/logo.png"
                alt="Silver Spoon Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* If logo image already has text we don't need this, but let's add it in case */}
            <span className="text-[7px] uppercase tracking-widest text-charcoal/60 font-semibold">
              Timeless Elegance, Everyday
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            <Link href="/" className="text-[11px] font-extrabold text-charcoal uppercase tracking-[0.2em] hover:text-gray-600 transition-colors">
              HOME
            </Link>
            <Link href="/products" className="text-[11px] font-extrabold text-charcoal uppercase tracking-[0.2em] hover:text-gray-600 transition-colors">
              COLLECTION
            </Link>
            
            {/* MEN Dropdown */}
            <div className="relative group">
              <Link href="/collections/men" className="flex items-center gap-1 text-[11px] font-extrabold text-charcoal uppercase tracking-[0.2em] hover:text-gray-600 cursor-pointer pb-2">
                MEN <span className="text-[7px] ml-0.5">▼</span>
              </Link>
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 py-4">
                <Link href="/collections/brooches?gender=men" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Brooches</Link>
                <Link href="/collections/bracelets?gender=men" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Bracelets</Link>
                <Link href="/collections/chains?gender=men" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Chains</Link>
                <Link href="/collections/kadas?gender=men" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Kada</Link>
                <Link href="/collections/rings?gender=men" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Rings</Link>
              </div>
            </div>

            {/* WOMEN Dropdown */}
            <div className="relative group">
              <Link href="/collections/women" className="flex items-center gap-1 text-[11px] font-extrabold text-charcoal uppercase tracking-[0.2em] hover:text-gray-600 cursor-pointer pb-2">
                WOMEN <span className="text-[7px] ml-0.5">▼</span>
              </Link>
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 py-4">
                <Link href="/collections/rings?gender=women" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Rings</Link>
                <Link href="/collections/bracelets?gender=women" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Bracelets</Link>
                <Link href="/collections/chains?gender=women" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Chains</Link>
                <Link href="/collections/anklets?gender=women" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Anklets</Link>
                <Link href="/collections/toe-rings?gender=women" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Toe Rings</Link>
                <Link href="/collections/mangalsutra?gender=women" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Mangalsutra</Link>
              </div>
            </div>

            {/* GIFTS Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-1 text-[11px] font-extrabold text-charcoal uppercase tracking-[0.2em] hover:text-gray-600 cursor-pointer pb-2">
                GIFTS <span className="text-[7px] ml-0.5">▼</span>
              </div>
              <div className="absolute top-full left-0 w-56 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 py-4">
                <Link href="/collections/utensils" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Silver Utensils</Link>
                <Link href="/collections/silver-idols" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Silver Idols</Link>
                <Link href="/collections/silver-frames" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Silver Frames</Link>
                <Link href="/collections/silver-coated" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">Silver Coated</Link>
                <Link href="/collections/german-silver" className="block px-6 py-2 text-[10px] font-bold text-charcoal hover:bg-[#FAF8F5] tracking-widest uppercase">German Silver</Link>
              </div>
            </div>

            <Link href="/about" className="text-[11px] font-extrabold text-charcoal uppercase tracking-[0.2em] hover:text-gray-600">
              ABOUT US
            </Link>
            <Link href="/contact" className="text-[11px] font-extrabold text-charcoal uppercase tracking-[0.2em] hover:text-gray-600">
              CONTACT
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-6 text-charcoal">
            <button className="hover:opacity-70 transition-opacity">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link href="/account" className="hover:opacity-70 transition-opacity">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button className="relative hover:opacity-70 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 bg-charcoal text-white text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
