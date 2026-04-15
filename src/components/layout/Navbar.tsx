"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, products } from "@/data/products";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Cart from "./Cart";
import Wishlist from "./Wishlist";

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
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

  const shouldBeSolid = !isHomePage || isScrolled;

  // GSAP for Mobile Menu
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(".mobile-menu", {
        x: 0,
        duration: 0.6,
        ease: "power4.out"
      });
      gsap.fromTo(".mobile-nav-link", 
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.3,
          clearProps: "all"
        }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".mobile-menu", {
        x: "-100%",
        duration: 0.6,
        ease: "power4.in"
      });
      document.body.style.overflow = "auto";
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
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          shouldBeSolid
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
                className={cn("transition-colors", shouldBeSolid ? "text-charcoal" : "text-white")}
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
                      shouldBeSolid ? "text-charcoal/80 hover:text-charcoal" : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.name}
                    <span className={cn(
                      "absolute bottom-[-4px] left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                      shouldBeSolid ? "bg-charcoal" : "bg-white"
                    )} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex flex-col items-center group">
              <span className={cn(
                "text-xl md:text-3xl font-serif tracking-widest uppercase transition-colors duration-500",
                shouldBeSolid ? "text-charcoal" : "text-white"
              )}>
                Silver Spoon
              </span>
              <span className={cn(
                  "text-[7px] md:text-[8px] tracking-[0.4em] uppercase font-sans -mt-1 transition-colors",
                  shouldBeSolid ? "text-charcoal/40" : "text-white/40"
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
                        shouldBeSolid ? "text-charcoal/80 hover:text-charcoal" : "text-white/80 hover:text-white"
                      )}
                    >
                      {link.name}
                      {link.isDropdown && <ChevronDown size={12} className={cn("transition-transform duration-300", isProductsHovered && "rotate-180")} />}
                      <span className={cn(
                        "absolute bottom-[-4px] left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                        shouldBeSolid ? "bg-charcoal" : "bg-white"
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
                <button 
                  className={cn("transition-colors hidden md:block relative", shouldBeSolid ? "text-charcoal" : "text-white")}
                  onClick={() => setIsWishlistOpen(true)}
                >
                  <Heart size={20} strokeWidth={1.5} className={cn(wishlistCount > 0 && "fill-gold text-gold")} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button 
                  className={cn("transition-colors relative", shouldBeSolid ? "text-charcoal" : "text-white")}
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  className={cn("lg:hidden transition-colors", shouldBeSolid ? "text-charcoal" : "text-white")}
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>

      <Cart />
      <Wishlist />

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "mobile-menu fixed inset-0 bg-[#141414] z-[120] lg:hidden -translate-x-full px-8 py-8 flex flex-col h-[100dvh] w-full"
        )}
      >
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col">
            <span className="text-xl font-serif tracking-widest uppercase text-white">
              Silver Spoon
            </span>
            <span className="text-[7px] tracking-[0.4em] text-white/40 uppercase font-sans mt-0.5">
              Pure Silver & Gifting
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white/60 hover:text-white transition-colors p-2 -mr-2"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-8 mt-4 overflow-y-auto pr-2 custom-scrollbar">
          {[...leftLinks, ...rightLinks].map((link) => (
            <div key={link.name} className="mobile-nav-link">
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif tracking-wider text-white/90 hover:text-gold transition-all duration-300 flex items-center justify-between group"
              >
                <span>{link.name}</span>
                <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity text-sm">✦</span>
              </Link>
              <div className="w-full h-[1px] bg-white/5 mt-4" />
            </div>
          ))}
          
          <div className="mobile-nav-link pt-4">
            <Link 
              href="/collections/new-arrivals" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block bg-gold/10 border border-gold/20 text-gold px-6 py-3 text-[10px] uppercase tracking-[0.3em] font-bold"
            >
              New Arrivals ✦
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-8">
           <div className="flex justify-between items-end">
             <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gold mb-3 font-bold opacity-60">Enquiries</p>
                <p className="text-white font-serif text-2xl tracking-wide">+91 98765 43210</p>
             </div>
             <div className="flex gap-4">
                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                  <span className="text-[10px] font-bold">IG</span>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                  <span className="text-[10px] font-bold">FB</span>
                </Link>
             </div>
           </div>
           
           <div className="bg-white/[0.03] p-6 border border-white/5">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2 font-bold italic">Newsletter</p>
              <div className="flex gap-2">
                 <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-transparent border-b border-white/10 text-xs py-2 outline-none flex-1 text-white placeholder:text-white/20"
                 />
                 <button className="text-gold text-[10px] uppercase tracking-widest font-bold border-b border-gold pb-1">Join</button>
              </div>
           </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div 
        className={cn(
          "search-overlay fixed inset-0 bg-white z-[150] flex flex-col items-center justify-start p-6 md:p-20 pt-24 md:pt-40 transition-[pointer-events] duration-500",
          isSearchOpen ? "pointer-events-auto" : "pointer-events-none"
        )} 
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <button 
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-8 right-8 md:top-10 md:right-10 text-charcoal hover:text-gold transition-colors p-2"
        >
          <X className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1} />
        </button>

        <div className="search-content w-full max-w-4xl text-center">
           <p className="text-[9px] md:text-xs uppercase tracking-[0.4em] text-gold font-bold mb-6 md:mb-8">What are you looking for?</p>
           <div className="relative mb-12 md:mb-20">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for silver..."
                className="w-full text-2xl md:text-6xl font-serif text-charcoal border-b border-silver-200 pb-4 md:pb-8 outline-none text-center bg-transparent"
              />
              <Search className="absolute right-0 bottom-6 md:bottom-10 text-charcoal/20 hidden md:block" size={40} strokeWidth={1} />
           </div>

           {searchQuery && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 text-left overflow-y-auto max-h-[60vh] md:max-h-[50vh] pr-2 custom-scrollbar pb-10">
                <div className="space-y-8">
                   <h4 className="text-[9px] md:text-[10px] uppercase tracking-ultra font-bold text-charcoal/40 mb-6 md:mb-8 border-b border-silver-100 pb-4">Product Results</h4>
                   {searchResults.length > 0 ? (
                     <div className="space-y-5 md:space-y-6">
                        {searchResults.map((product) => (
                          <Link 
                            key={product.id} 
                            href={`/product/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-4 md:gap-6 group"
                          >
                             <div className="w-14 h-18 md:w-16 md:h-20 bg-silver-50 overflow-hidden relative border border-silver-100 shrink-0">
                                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                             </div>
                             <div className="min-w-0">
                                <p className="text-[7px] md:text-[8px] uppercase tracking-widest text-gold font-bold truncate">{product.category}</p>
                                <h5 className="text-base md:text-lg font-serif text-charcoal group-hover:text-gold transition-colors truncate">{product.name}</h5>
                             </div>
                          </Link>
                        ))}
                     </div>
                   ) : (
                     <p className="font-serif italic text-charcoal/30 text-sm">No products matching your search.</p>
                   )}
                </div>
                <div className="space-y-8">
                   <h4 className="text-[9px] md:text-[10px] uppercase tracking-ultra font-bold text-charcoal/40 mb-6 md:mb-8 border-b border-silver-100 pb-4">Quick Collections</h4>
                   <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {categories.slice(0, 8).map((cat) => (
                        <Link 
                          key={cat.id} 
                          href={`/collections/${cat.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="text-[9px] md:text-[10px] uppercase tracking-widest text-charcoal/60 hover:text-gold transition-colors py-2.5 md:py-3 border border-silver-100 px-3 md:px-4 hover:bg-silver-50 text-center font-bold"
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
    </>
  );
};

export default Navbar;
