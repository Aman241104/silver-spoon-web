import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-silver-50 pt-24 pb-12 border-t border-silver-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex flex-col group">
              <span className="text-2xl font-serif tracking-widest text-charcoal group-hover:text-gold transition-colors duration-500 uppercase">
                Silver Spoon
              </span>
              <span className="text-[10px] tracking-[0.4em] text-charcoal/60 uppercase font-sans">
                Pure Silver & Gifting
              </span>
            </Link>
            <p className="text-sm text-charcoal/70 leading-relaxed font-sans max-w-xs">
              Crafting elegance and purity in every piece. Our silver collections are designed to celebrate the timeless beauty of tradition and modern craftsmanship.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-8 h-8 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:border-charcoal transition-all">
                <span className="text-[10px] uppercase tracking-tighter font-bold">IG</span>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:border-charcoal transition-all">
                <span className="text-[10px] uppercase tracking-tighter font-bold">TW</span>
              </Link>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra font-bold text-charcoal mb-8">
              Collections
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Silver Jewellery", href: "/collections/jewellery" },
                { name: "Pooja & Idols", href: "/collections/pooja-idols" },
                { name: "Silver Coins", href: "/collections/coins" },
                { name: "Men's Collection", href: "/collections/men" },
                { name: "Women's Collection", href: "/collections/women" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-charcoal/70 hover:text-charcoal transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra font-bold text-charcoal mb-8">
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
                  <Link href={item.href} className="text-sm text-charcoal/70 hover:text-charcoal transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra font-bold text-charcoal mb-8">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                <span className="text-sm text-charcoal/70 leading-relaxed">
                  123 Jewellery Street, Silver Market,<br />Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-gold shrink-0" />
                <span className="text-sm text-charcoal/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-gold shrink-0" />
                <span className="text-sm text-charcoal/70">hello@silverspoon.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-charcoal/50">
            © {currentYear} Silver Spoon. All Rights Reserved.
          </p>
          <div className="flex gap-8">
             <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Crafted with Purity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
