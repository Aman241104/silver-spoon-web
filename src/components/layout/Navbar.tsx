"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, MapPin, Package, Menu, X, ChevronDown, ChevronUp, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleAccordion = (val: string) => {
    setActiveAccordion(activeAccordion === val ? null : val);
  };

  const menuItems = [
    { title: "HOME", href: "/" },
    { 
      title: "COLLECTION", 
      href: "/products",
      subItems: [
        { title: "Men's Collection", href: "/products?gender=men" },
        { title: "Women's Collection", href: "/products?gender=women" },
        { title: "Gifting Collection", href: "/gifting" },
        { title: "Silverware", href: "/collections/utensils" },
        { title: "Tableware", href: "/collections/utensils" },
        { title: "Pooja & Spiritual", href: "/collections/silver-idols" },
        { title: "Decor", href: "/collections/silver-coated" },
        { title: "German Silver", href: "/collections/german-silver" },
      ]
    },
    { 
      title: "MEN", 
      href: "/products?gender=men",
      subItems: [
        { title: "Brooches", href: "/products?category=brooches" },
        { title: "Bracelet", href: "/products?category=bracelets&gender=men" },
        { title: "Chain", href: "/products?category=chains&gender=men" },
        { title: "Kada", href: "/products?category=kadas" },
        { title: "Rings", href: "/products?category=rings&gender=men" },
      ]
    },
    { 
      title: "WOMEN", 
      href: "/products?gender=women",
      subItems: [
        { title: "Rings", href: "/products?category=rings&gender=women" },
        { title: "Bracelet", href: "/products?category=bracelets&gender=women" },
        { title: "Chain", href: "/products?category=chains&gender=women" },
        { title: "Anklets", href: "/products?category=anklets" },
        { title: "Toe Rings", href: "/products?category=toe-rings" },
        { title: "Mangalsutra", href: "/products?category=mangalsutra" },
      ]
    },
    { 
      title: "GIFTS", 
      href: "/gifting",
      subItems: [
        { title: "Corporate Gifting", href: "/corporate" },
        { title: "Build a Box", href: "/gifting/build-a-box" },
        { title: "Gifting Concierge", href: "/gifting/concierge" },
      ]
    },
    { title: "ABOUT US", href: "/about" },
    { title: "CONTACT US", href: "/contact" },
  ];

  return (
    <header className="relative w-full z-[100] font-sans">
      {/* Top Bar - Hidden on scroll */}
      <div className={cn(
        "bg-[#111827] text-white/90 text-[10px] md:text-[11px] px-6 md:px-12 flex justify-end items-center border-b border-white/5 font-medium tracking-tight overflow-hidden transition-all duration-300 ease-in-out",
        isScrolled ? "h-0 opacity-0 border-none" : "h-10 opacity-100"
      )}>
        <div className="flex items-center gap-6 ml-6 min-w-max">
          <Link href="/gifting" className="hover:text-white transition-colors">Gift</Link>
          <Link href="/collections/utensils" className="hover:text-white transition-colors">Silverware</Link>
          <Link href="/collections/utensils" className="hover:text-white transition-colors">Tableware</Link>
          <Link href="/corporate" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Package size={14} className="text-white/60" />
            <span>Bulk / Corporate Gifting</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar Wrapper - Becomes fixed on scroll */}
      <div className={cn(
        "w-full transition-all duration-300",
        isScrolled ? "fixed top-0 left-0 bg-white/95 backdrop-blur-md shadow-sm py-1 md:py-2" : "relative bg-white py-3 md:py-4"
      )}>
        <nav className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex flex-col items-start lg:w-[250px] group">
            <div className={cn(
              "relative transition-all duration-300 ease-in-out",
              isScrolled ? "h-6 w-20 md:h-7 md:w-24" : "h-8 w-24 md:h-10 md:w-32"
            )}>
              <Image
                src="/images/logo.png"
                alt="Silver Spoon Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            {!isScrolled && (
              <div className="h-3 opacity-100 mt-0.5 transition-all duration-300">
                <span className="hidden md:block text-[7px] uppercase tracking-[0.3em] text-charcoal/50 font-bold">
                  Timeless Elegance, Everyday
                </span>
              </div>
            )}
          </Link>

          {/* Center: Navigation Links (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 flex-1">
            {menuItems.map((item) => (
              item.subItems ? (
                <div key={item.title} className="relative group">
                  <Link href={item.href} className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#2c2c2c] uppercase tracking-[0.15em] hover:text-gray-600 cursor-pointer py-2">
                    {item.title} <ChevronDown size={10} strokeWidth={3} className="mt-0.5 group-hover:rotate-180 transition-transform duration-300" />
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 py-4 mt-1">
                    {item.subItems.map((sub) => (
                      <Link key={sub.title} href={sub.href} className="block px-6 py-2.5 text-[10px] font-bold text-charcoal/80 hover:text-charcoal hover:bg-gray-50 tracking-widest uppercase">
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.title} href={item.href} className="text-[11px] font-extrabold text-[#2c2c2c] uppercase tracking-[0.15em] hover:text-gray-600 transition-colors py-2 border-b-2 border-transparent hover:border-charcoal/10">
                  {item.title}
                </Link>
              )
            ))}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center justify-end gap-5 md:gap-6 text-charcoal lg:w-[250px]">
            <button 
              className="hover:opacity-60 transition-opacity"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <button 
              className="relative hover:opacity-60 transition-opacity"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
            >
              <Heart size={20} className={wishlistCount > 0 ? "fill-gold text-gold" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              className="relative hover:opacity-60 transition-opacity"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-charcoal text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="lg:hidden p-1 text-charcoal"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>

        {/* Search Overlay */}
        <div className={cn(
          "absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg overflow-hidden transition-all duration-300",
          isSearchOpen ? "max-h-[100px] opacity-100 border-b" : "max-h-0 opacity-0"
        )}>
          <div className="container mx-auto px-6 md:px-12 py-4">
            <form 
              className="flex items-center gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
            >
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-sans tracking-wide text-charcoal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu - Higher Z-Index */}
      <div className={cn(
        "fixed inset-0 bg-black/60 z-[200] transition-opacity duration-300 lg:hidden",
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        <div 
          className="absolute inset-0" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
        <div className={cn(
          "absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
            <div className="relative h-9 w-24">
              <Image src="/images/logo.png" alt="Silver Spoon" fill className="object-contain object-left" />
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal p-1">
              <X size={22} />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto py-4 bg-white">
            <div className="flex flex-col">
              {menuItems.map((item) => (
                <div key={item.title} className="border-b border-gray-50 last:border-none">
                  {item.subItems ? (
                    <>
                      <button 
                        onClick={() => toggleAccordion(item.title)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left"
                      >
                        <span className="text-[12px] font-extrabold text-charcoal uppercase tracking-[0.2em]">
                          {item.title}
                        </span>
                        {activeAccordion === item.title ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                      </button>
                      <div className={cn(
                        "bg-gray-50/50 overflow-hidden transition-all duration-300",
                        activeAccordion === item.title ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      )}>
                        <div className="px-8 py-3 flex flex-col gap-3.5">
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
                      className="block px-6 py-4 text-[12px] font-extrabold text-charcoal uppercase tracking-[0.2em]"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-100 bg-white mt-auto">
            <div className="flex flex-col gap-4">
              <Link 
                href="/stores" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-[11px] font-bold text-charcoal/60 uppercase tracking-widest hover:text-charcoal transition-colors"
              >
                <MapPin size={16} /> Store Locator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;