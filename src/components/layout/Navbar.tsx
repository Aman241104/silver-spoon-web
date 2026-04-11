"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Jewellery", href: "/collections/jewellery" },
    { name: "Pooja & Idols", href: "/collections/pooja-idols" },
    { name: "Gifting", href: "/collections/gifting" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-silver-100"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-charcoal hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-center group"
          >
            <span className="text-2xl md:text-3xl font-serif tracking-widest text-charcoal group-hover:text-gold transition-colors duration-500 uppercase">
              Silver Spoon
            </span>
            <span className="text-[8px] md:text-[10px] tracking-[0.5em] text-charcoal/60 uppercase font-sans -mt-1">
              Pure Silver & Gifting
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-ultra font-medium text-charcoal/80 hover:text-charcoal transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-charcoal transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-charcoal/80 hover:text-charcoal transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hidden md:block text-charcoal/80 hover:text-charcoal transition-colors">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button className="text-charcoal/80 hover:text-charcoal transition-colors relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-gold text-[8px] text-white rounded-full w-3 h-3 flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-[60] lg:hidden transition-transform duration-700 ease-in-out px-10 py-12 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-16">
          <span className="text-xl font-serif tracking-widest uppercase text-charcoal">
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-charcoal hover:text-gold transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif tracking-widest text-charcoal hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-silver-100 pt-8 flex flex-col gap-4">
          <p className="text-[10px] tracking-widest text-charcoal/50 uppercase">
            Get in touch
          </p>
          <p className="text-sm font-sans text-charcoal">
            support@silverspoon.com
          </p>
          <div className="flex gap-6 mt-4">
             {/* Social Links would go here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
