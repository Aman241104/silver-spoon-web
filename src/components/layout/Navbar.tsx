"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const leftLinks = [
    { name: "Jewellery", href: "/collections/jewellery" },
    { name: "For Men", href: "/collections/men" },
    { name: "For Women", href: "/collections/women" },
  ];

  const rightLinks = [
    { name: "Silver Coins", href: "/collections/coins" },
    { name: "Gifting", href: "/collections/gifting" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-white py-4 shadow-sm border-b border-silver-100"
          : "bg-white/10 backdrop-blur-sm py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-3 items-center">
          
          {/* Left: Search + Nav */}
          <div className="flex items-center gap-8">
            <button className={cn("transition-colors", isScrolled ? "text-charcoal" : "text-white")}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <div className="hidden lg:flex items-center gap-8">
              {leftLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[10px] uppercase tracking-ultra font-bold transition-colors relative group",
                    isScrolled ? "text-charcoal/80 hover:text-charcoal" : "text-white/80 hover:text-white"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-[-4px] left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                    isScrolled ? "bg-charcoal" : "bg-white"
                  )} />
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className={cn(
              "text-2xl md:text-3xl font-serif tracking-widest uppercase transition-colors duration-500",
              isScrolled ? "text-charcoal" : "text-white"
            )}>
              Silver Spoon
            </span>
            <span className={cn(
                "text-[8px] tracking-[0.4em] uppercase font-sans -mt-1 transition-colors",
                isScrolled ? "text-charcoal/40" : "text-white/40"
            )}>
                Pure Silver & Gifting
            </span>
          </Link>

          {/* Right: Nav + Icons */}
          <div className="flex items-center justify-end gap-8">
            <div className="hidden lg:flex items-center gap-8">
              {rightLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[10px] uppercase tracking-ultra font-bold transition-colors relative group",
                    isScrolled ? "text-charcoal/80 hover:text-charcoal" : "text-white/80 hover:text-white"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-[-4px] left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                    isScrolled ? "bg-charcoal" : "bg-white"
                  )} />
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <button className={cn("transition-colors hidden md:block", isScrolled ? "text-charcoal" : "text-white")}>
                <Heart size={20} strokeWidth={1.5} />
              </button>
              <button className={cn("transition-colors", isScrolled ? "text-charcoal" : "text-white")}>
                <ShoppingBag size={20} strokeWidth={1.5} />
              </button>
              <button
                className={cn("lg:hidden transition-colors", isScrolled ? "text-charcoal" : "text-white")}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-charcoal z-[60] lg:hidden transition-transform duration-700 ease-in-out px-10 py-12 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-16">
          <span className="text-xl font-serif tracking-widest uppercase text-white">
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-gold transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {[...leftLinks, ...rightLinks].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif tracking-widest text-white hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
