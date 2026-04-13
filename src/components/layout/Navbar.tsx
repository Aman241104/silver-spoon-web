"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, products } from "@/data/products";
import gsap from "gsap";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProductsHovered, setIsProductsHovered] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const searchResults = searchQuery 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP for Mobile Menu
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(".mobile-menu", {
        x: 0,
        duration: 0.6,
        ease: "power4.out"
      });
      gsap.from(".mobile-nav-link", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        delay: 0.2
      });
    } else {
      gsap.to(".mobile-menu", {
        x: "-100%",
        duration: 0.6,
        ease: "power4.in"
      });
    }
  }, [isMobileMenuOpen]);

  // GSAP for Search Overlay
  React.useEffect(() => {
    if (isSearchOpen) {
      gsap.to(".search-overlay", {
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.8,
        ease: "power3.inOut"
      });
      gsap.from(".search-content > *", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3
      });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".search-overlay", {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.8,
        ease: "power3.inOut"
      });
      document.body.style.overflow = "auto";
    }
  }, [isSearchOpen]);

  const leftLinks = [
    { name: "Jewellery", href: "/collections/rings" },
    { name: "For Men", href: "/collections/men" },
    { name: "For Women", href: "/collections/women" },
  ];

  const rightLinks = [
    { name: "Products", href: "/products", isDropdown: true },
    { name: "Silver Coins", href: "/collections/coins" },
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
        <div className="flex justify-between items-center lg:grid lg:grid-cols-3">
          
          {/* Left: Search + Nav */}
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={cn("transition-colors", isScrolled ? "text-charcoal" : "text-white")}
            >
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
              "text-xl md:text-3xl font-serif tracking-widest uppercase transition-colors duration-500",
              isScrolled ? "text-charcoal" : "text-white"
            )}>
              Silver Spoon
            </span>
            <span className={cn(
                "text-[7px] md:text-[8px] tracking-[0.4em] uppercase font-sans -mt-1 transition-colors",
                isScrolled ? "text-charcoal/40" : "text-white/40"
            )}>
                Pure Silver & Gifting
            </span>
          </Link>

          {/* Right: Nav + Icons */}
          <div className="flex items-center justify-end gap-4 md:gap-8">
            <div className="hidden lg:flex items-center gap-8">
              {rightLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => link.isDropdown && setIsProductsHovered(true)}
                  onMouseLeave={() => link.isDropdown && setIsProductsHovered(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[10px] uppercase tracking-ultra font-bold transition-colors flex items-center gap-1",
                      isScrolled ? "text-charcoal/80 hover:text-charcoal" : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.name}
                    {link.isDropdown && <ChevronDown size={12} className={cn("transition-transform duration-300", isProductsHovered && "rotate-180")} />}
                    <span className={cn(
                      "absolute bottom-[-4px] left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                      isScrolled ? "bg-charcoal" : "bg-white"
                    )} />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {link.isDropdown && (
                    <div className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-500",
                      isProductsHovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
                    )}>
                      <div className="bg-white shadow-2xl border border-silver-100 p-8 min-w-[600px] grid grid-cols-3 gap-8">
                         {categories.slice(0, 11).map((cat) => (
                           <div key={cat.id} className="space-y-3">
                              <Link 
                                href={`/collections/${cat.slug}`}
                                className="text-[10px] uppercase tracking-ultra font-bold text-charcoal hover:text-gold transition-colors block border-b border-silver-50 pb-2"
                              >
                                {cat.name}
                              </Link>
                              {cat.subCategories && (
                                <div className="flex flex-col gap-1.5">
                                  {cat.subCategories.slice(0, 3).map((sub) => (
                                    <Link 
                                      key={sub} 
                                      href={`/collections/${cat.slug}`}
                                      className="text-[9px] uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors"
                                    >
                                      {sub}
                                    </Link>
                                  ))}
                                </div>
                              )}
                           </div>
                         ))}
                         <div className="col-span-3 pt-4 border-t border-silver-100 text-center">
                            <Link href="/products" className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold hover:text-charcoal transition-colors">
                               View All Collections
                            </Link>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 md:gap-6">
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
          "mobile-menu fixed inset-0 bg-charcoal z-[120] lg:hidden -translate-x-full px-10 py-12 flex flex-col"
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
              className="mobile-nav-link text-2xl font-serif tracking-widest text-white hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-12 border-t border-white/10">
           <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Contact Support</p>
           <p className="text-white font-serif text-lg">+91 98765 43210</p>
        </div>
      </div>

      {/* Search Overlay */}
      <div className="search-overlay fixed inset-0 bg-white z-[150] flex flex-col items-center justify-center p-6 md:p-20" style={{ clipPath: "circle(0% at 100% 0%)" }}>
        <button 
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-10 right-10 text-charcoal hover:text-gold transition-colors"
        >
          <X size={32} strokeWidth={1} />
        </button>

        <div className="search-content w-full max-w-4xl text-center">
           <p className="text-xs uppercase tracking-[0.4em] text-gold font-bold mb-8">What are you looking for?</p>
           <div className="relative mb-20">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for silver..."
                className="w-full text-2xl md:text-6xl font-serif text-charcoal border-b border-silver-200 pb-8 outline-none text-center bg-transparent"
              />
              <Search className="absolute right-0 bottom-10 text-charcoal/20 hidden md:block" size={40} strokeWidth={1} />
           </div>

           {searchQuery && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left overflow-y-auto max-h-[50vh] pr-4">
                <div>
                   <h4 className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/40 mb-8 border-b border-silver-100 pb-4">Product Results</h4>
                   {searchResults.length > 0 ? (
                     <div className="space-y-6">
                        {searchResults.map((product) => (
                          <Link 
                            key={product.id} 
                            href={`/product/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-6 group"
                          >
                             <div className="w-16 h-20 bg-silver-50 overflow-hidden relative border border-silver-100 shrink-0">
                                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                             </div>
                             <div>
                                <p className="text-[8px] uppercase tracking-widest text-gold font-bold">{product.category}</p>
                                <h5 className="text-lg font-serif text-charcoal group-hover:text-gold transition-colors">{product.name}</h5>
                             </div>
                          </Link>
                        ))}
                     </div>
                   ) : (
                     <p className="font-serif italic text-charcoal/30">No products matching your search.</p>
                   )}
                </div>
                <div>
                   <h4 className="text-[10px] uppercase tracking-ultra font-bold text-charcoal/40 mb-8 border-b border-silver-100 pb-4">Quick Collections</h4>
                   <div className="grid grid-cols-2 gap-4">
                      {categories.slice(0, 8).map((cat) => (
                        <Link 
                          key={cat.id} 
                          href={`/collections/${cat.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="text-[10px] uppercase tracking-widest text-charcoal/60 hover:text-gold transition-colors py-3 border border-silver-50 px-4 hover:bg-silver-50 text-center font-bold"
                        >
                          {cat.name}
                        </Link>
                      ))}
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
