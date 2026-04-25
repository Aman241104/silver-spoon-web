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
    { name: "Men's Collection", href: "/collections/men" },
    { name: "Women's Collection", href: "/collections/women" },
  ];

  const rightLinks = [
    { name: "Products", href: "/products", isDropdown: true },
    { name: "Coins", href: "/collections/coins" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-700",
          shouldBeSolid
            ? "bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-silver-100"
            : "bg-transparent py-8"
        )}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center lg:grid lg:grid-cols-3">
            
            {/* Left: Search + Nav */}
            <div className="flex items-center gap-4 md:gap-8">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={cn("transition-colors duration-500 hover:text-gold", shouldBeSolid ? "text-charcoal" : "text-white")}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <div className="hidden lg:flex items-center gap-10">
                {leftLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-[9px] uppercase tracking-[0.4em] font-bold transition-all duration-500 relative group",
                      shouldBeSolid ? "text-charcoal/60 hover:text-charcoal" : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.name}
                    <span className={cn(
                      "absolute bottom-[-6px] left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full",
                      shouldBeSolid ? "bg-gold" : "bg-white"
                    )} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex flex-col items-center group">
              <div className="relative h-12 md:h-14 w-32 md:w-40 transition-all duration-700">
                <Image
                  src="/images/logo.png"
                  alt="Silver Spoon Logo"
                  fill
                  className={cn(
                    "object-contain transition-all duration-700 group-hover:scale-105",
                    shouldBeSolid ? "brightness-0" : "brightness-0 invert"
                  )}
                  priority
                />
              </div>
            </Link>

            {/* Right: Nav + Icons */}
            <div className="flex items-center justify-end gap-4 md:gap-8">
              <div className="hidden lg:flex items-center gap-10">
                {rightLinks.map((link) => (
                  <div 
                    key={link.name} 
                    className="relative"
                    onMouseEnter={() => link.isDropdown && setIsProductsHovered(true)}
                    onMouseLeave={() => link.isDropdown && setIsProductsHovered(false)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-[9px] uppercase tracking-[0.4em] font-bold transition-all duration-500 flex items-center gap-1 group",
                        shouldBeSolid ? "text-charcoal/60 hover:text-charcoal" : "text-white/70 hover:text-white"
                      )}
                    >
                      {link.name}
                      {link.isDropdown && <ChevronDown size={10} className={cn("transition-transform duration-500", isProductsHovered && "rotate-180")} />}
                      <span className={cn(
                        "absolute bottom-[-6px] left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full",
                        shouldBeSolid ? "bg-gold" : "bg-white"
                      )} />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {link.isDropdown && (
                      <div className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-700",
                        isProductsHovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
                      )}>
                        <div className="bg-white/95 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-silver-100 p-12 min-w-[1000px] grid grid-cols-5 gap-x-10 gap-y-14">
                           {categories.filter(c => !["men", "women", "coins"].includes(c.id)).map((cat) => (
                             <div key={cat.id} className="space-y-5">
                                <Link 
                                  href={`/collections/${cat.slug}`}
                                  className="text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal hover:text-gold transition-colors block border-b border-silver-50 pb-3"
                                  onClick={() => setIsProductsHovered(false)}
                                >
                                  {cat.name}
                                </Link>
                                {cat.subCategories && (
                                  <div className="flex flex-col gap-3">
                                    {cat.subCategories.map((sub) => (
                                      <Link 
                                        key={sub} 
                                        href={`/collections/${cat.slug}`}
                                        className="text-[8px] uppercase tracking-[0.3em] text-charcoal/40 hover:text-charcoal hover:translate-x-1 transition-all duration-300 leading-relaxed font-bold"
                                        onClick={() => setIsProductsHovered(false)}
                                      >
                                        {sub}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                             </div>
                           ))}

                           {/* Gifting Suite Section */}
                           <div className="space-y-6 bg-gold/[0.03] p-8 border border-gold/10 flex flex-col justify-center">
                              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold block border-b border-gold/20 pb-4">Gifting Suite</span>
                              <div className="flex flex-col gap-6">
                                 <Link href="/gifting/concierge" className="group/item flex flex-col gap-2" onClick={() => setIsProductsHovered(false)}>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal group-hover/item:text-gold transition-colors">Concierge</span>
                                    <span className="text-[8px] uppercase tracking-widest text-charcoal/40 leading-relaxed">Artisan Gift Finder</span>
                                 </Link>
                                 <Link href="/gifting/build-a-box" className="group/item flex flex-col gap-2" onClick={() => setIsProductsHovered(false)}>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal group-hover/item:text-gold transition-colors">Custom Box</span>
                                    <span className="text-[8px] uppercase tracking-widest text-charcoal/40 leading-relaxed">Packaging & Video</span>
                                 </Link>
                              </div>
                           </div>

                           <div className="col-span-5 pt-10 border-t border-silver-100 flex justify-between items-center">
                              <p className="text-[9px] uppercase tracking-[0.4em] text-charcoal/30 font-bold italic">Handcrafted with precision since 1995</p>
                              <Link 
                                href="/products" 
                                className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold hover:text-charcoal transition-all duration-500 hover:tracking-[0.6em]"
                                onClick={() => setIsProductsHovered(false)}
                              >
                                 View All Collections ✦
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
                  className={cn("transition-all duration-500 hover:text-gold hidden md:block relative group", shouldBeSolid ? "text-charcoal" : "text-white")}
                  onClick={() => setIsWishlistOpen(true)}
                >
                  <Heart size={18} strokeWidth={1.5} className={cn("transition-all duration-500 group-hover:scale-110", wishlistCount > 0 && "fill-gold text-gold")} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold text-white text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button 
                  className={cn("transition-all duration-500 hover:text-gold relative group", shouldBeSolid ? "text-charcoal" : "text-white")}
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingBag size={18} strokeWidth={1.5} className="transition-all duration-500 group-hover:scale-110" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-charcoal text-white text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  className={cn("lg:hidden transition-colors", shouldBeSolid ? "text-charcoal" : "text-white")}
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu size={22} />
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
          "mobile-menu fixed inset-0 bg-[#0a0a0a] z-[120] lg:hidden -translate-x-full px-8 py-12 flex flex-col h-[100dvh] w-full"
        )}
      >
        <div className="flex justify-between items-center mb-12 pb-8 border-b border-white/5">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col">
            <span className="text-2xl font-serif tracking-tighter uppercase text-white">
              Silver Spoon
            </span>
            <span className="text-[8px] tracking-[0.5em] text-gold uppercase font-bold mt-1">
              Pure Silver Artistry
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white/40 hover:text-white transition-colors p-2"
          >
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-10 mt-4 overflow-y-auto pr-2 custom-scrollbar">
          {[...leftLinks, ...rightLinks].map((link) => (
            <div key={link.name} className="mobile-nav-link">
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-serif tracking-tighter text-white/90 hover:text-gold transition-all duration-500 flex items-center justify-between group"
              >
                <span>{link.name}</span>
                <span className="text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 text-base">✦</span>
              </Link>
              <div className="w-12 h-[1px] bg-white/10 mt-6 group-hover:w-full transition-all duration-700" />
            </div>
          ))}

          {/* Gifting Suite in Mobile */}
          <div className="mobile-nav-link space-y-4">
            <p className="text-[8px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Premium Gifting</p>
            <Link href="/gifting/concierge" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg uppercase tracking-[0.3em] text-white/60 font-bold hover:text-gold transition-colors">Treasury Concierge</Link>
            <Link href="/gifting/build-a-box" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg uppercase tracking-[0.3em] text-white/60 font-bold hover:text-gold transition-colors">Build-a-Gift Box</Link>
          </div>
          
          <div className="mobile-nav-link pt-6">
            <Link 
              href="/products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block bg-gold text-charcoal px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-bold"
            >
              Masterpieces ✦
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-10">
           <div className="flex justify-between items-end">
             <div>
                <p className="text-[9px] uppercase tracking-[0.5em] text-gold mb-4 font-bold opacity-60">Consultations</p>
                <p className="text-white font-serif text-3xl tracking-tighter">+91 98765 43210</p>
             </div>
             <div className="flex gap-6">
                <Link href="#" className="text-white/30 hover:text-gold transition-all">
                  <span className="text-[10px] font-bold tracking-widest uppercase">IG</span>
                </Link>
                <Link href="#" className="text-white/30 hover:text-gold transition-all">
                  <span className="text-[10px] font-bold tracking-widest uppercase">FB</span>
                </Link>
             </div>
           </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div 
        className={cn(
          "search-overlay fixed inset-0 bg-[#0a0a0a] z-[150] flex flex-col items-center justify-start p-6 md:p-20 pt-24 md:pt-40 transition-[pointer-events] duration-700",
          isSearchOpen ? "pointer-events-auto" : "pointer-events-none"
        )} 
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <button 
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-8 right-8 md:top-12 md:right-12 text-white/40 hover:text-gold transition-colors p-2"
        >
          <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
        </button>

        <div className="search-content w-full max-w-5xl text-center">
           <p className="text-[9px] md:text-xs uppercase tracking-[0.5em] text-gold font-bold mb-10">Searching the Treasury</p>
           <div className="relative mb-16 md:mb-24">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Seek pure silver..."
                className="w-full text-3xl md:text-8xl font-serif text-white border-b border-white/10 pb-6 md:pb-12 outline-none text-center bg-transparent placeholder:text-white/5 transition-all duration-700 focus:border-gold/50"
              />
              <Search className="absolute right-0 bottom-10 md:bottom-16 text-white/5 hidden md:block" size={48} strokeWidth={1} />
           </div>

           {searchQuery && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 text-left overflow-y-auto max-h-[60vh] md:max-h-[50vh] pr-4 custom-scrollbar pb-10">
                <div className="space-y-10">
                   <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8 md:mb-10 border-b border-white/5 pb-5">Artisan Pieces</h4>
                   {searchResults.length > 0 ? (
                     <div className="space-y-6 md:space-y-8">
                        {searchResults.map((product) => (
                          <Link 
                            key={product.id} 
                            href={`/product/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-6 md:gap-8 group"
                          >
                             <div className="w-16 h-20 md:w-20 md:h-24 bg-white/5 overflow-hidden relative border border-white/5 shrink-0">
                                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-125 transition-transform duration-1000" />
                             </div>
                             <div className="min-w-0">
                                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-gold font-bold mb-1 truncate">{product.category}</p>
                                <h5 className="text-xl md:text-2xl font-serif text-white group-hover:text-gold transition-colors truncate">{product.name}</h5>
                             </div>
                          </Link>
                        ))}
                     </div>
                   ) : (
                     <p className="font-serif italic text-white/20 text-lg">No matches found in the treasury.</p>
                   )}
                </div>
                <div className="space-y-10">
                   <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8 md:mb-10 border-b border-white/5 pb-5">Treasury Vaults</h4>
                   <div className="grid grid-cols-2 gap-4 md:gap-6">
                      {categories.slice(0, 8).map((cat) => (
                        <Link 
                          key={cat.id} 
                          href={`/collections/${cat.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-gold transition-all duration-500 py-4 md:py-5 border border-white/5 px-4 md:px-6 hover:bg-white/5 text-center font-bold"
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
