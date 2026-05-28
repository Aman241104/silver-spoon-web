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
  title: "Silver Spoon | Best Premium Silver Jewellery & Gifting in Ahmedabad",
  description: "Silver Spoon (LJ India Services) offers the best premium silver jewellery, pure silver idols, German silver, and corporate gifting in Chandkheda, Ahmedabad, Gujarat.",
  keywords: "Silver Jewellery Ahmedabad, Best Silver Shop Chandkheda, Silver Idols Gujarat, Corporate Gifting Ahmedabad, Pure Silver Shop Ahmedabad, German Silver Gifts",
  openGraph: {
    title: "Silver Spoon | Premium Silver Jewellery & Gifting in Ahmedabad",
    description: "Discover exquisite silver jewellery, idols, and gifting items at Silver Spoon (LJ India Services) in Chandkheda, Ahmedabad.",
    siteName: "Silver Spoon",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "name": "Silver Spoon (LJ India Services)",
  "description": "Premium silver jewellery, pure silver idols, German silver, and corporate gifting.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "FF-14 First Floor, Omkar Lotus, Opposite Swaminarayan Temple, Chandkheda-Motera Road, Beside New CG Road",
    "addressLocality": "Chandkheda, Ahmedabad",
    "addressRegion": "Gujarat",
    "postalCode": "382424",
    "addressCountry": "IN"
  },
  "telephone": "+91-9998123479",
  "email": "info@silverspoon.com"
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
