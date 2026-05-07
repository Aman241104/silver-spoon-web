import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/layout/LenisScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Silver Spoon (LJ India Services) | Premium Silver Jewellery & Gifting",
  description: "Exquisite silver jewellery, idols, and gifting items from Silver Spoon (LJ India Services). Crafted with purity and elegance since 1995.",
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Cart from "@/components/layout/Cart";
import Wishlist from "@/components/layout/Wishlist";
import StickyWhatsApp from "@/components/ui/StickyWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-white text-charcoal font-sans antialiased selection:bg-silver-200 selection:text-charcoal">
        <WishlistProvider>
          <CartProvider>
            <Wishlist />
            <Cart />
            <LenisScroll>
              {children}
            </LenisScroll>
            <StickyWhatsApp />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
