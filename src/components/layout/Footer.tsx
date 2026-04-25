import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-silver-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="relative h-16 w-40 group">
              <Image
                src="/images/logo.png"
                alt="Silver Spoon Logo"
                fill
                className="object-contain brightness-0"
              />
            </Link>
            <p className="text-[11px] md:text-xs text-charcoal/50 leading-relaxed font-sans max-w-xs uppercase tracking-widest">
              Crafting elegance and purity in every piece. Our silver collections are designed to celebrate the timeless beauty of tradition.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra font-bold text-charcoal mb-10 pb-2 border-b border-silver-50">
              Collections
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Silver Jewellery", href: "/collections/rings" },
                { name: "Pooja & Idols", href: "/collections/idol-gift" },
                { name: "Silver Coins", href: "/collections/coins" },
                { name: "Men's Collection", href: "/collections/men" },
                { name: "Women's Collection", href: "/collections/women" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[10px] uppercase tracking-widest text-charcoal/60 hover:text-gold transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra font-bold text-charcoal mb-10 pb-2 border-b border-silver-50">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Shipping Policy", href: "#" },
                { name: "Terms & Conditions", href: "#" },
                { name: "Privacy Policy", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[10px] uppercase tracking-widest text-charcoal/60 hover:text-gold transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra font-bold text-charcoal mb-10 pb-2 border-b border-silver-100">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin size={16} className="text-gold shrink-0" />
                <span className="text-[11px] uppercase tracking-widest text-charcoal/60 leading-relaxed">
                  123 Jewellery Street, Silver Market,<br />Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={16} className="text-gold shrink-0" />
                <span className="text-[11px] uppercase tracking-widest text-charcoal/60">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={16} className="text-gold shrink-0" />
                <span className="text-[11px] lowercase tracking-widest text-charcoal/60">hello@silverspoon.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-silver-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/40 font-bold">
            © {currentYear} Silver Spoon. All Rights Reserved.
          </p>
          <div className="flex gap-8">
             <span className="text-[9px] uppercase tracking-[0.3em] text-charcoal/30">Premium Silver & Gifting</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
