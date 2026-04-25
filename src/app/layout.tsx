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
  title: "Silver Spoon By AC Jewellers | Premium Silver Jewellery & Gifting",
  description: "Exquisite silver jewellery, idols, and gifting items from Silver Spoon By AC Jewellers. Crafted with purity and elegance since 1995.",
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-white text-charcoal font-sans antialiased selection:bg-silver-200 selection:text-charcoal">
        <WishlistProvider>
          <CartProvider>
            <LenisScroll>
              {children}
            </LenisScroll>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
