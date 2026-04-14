export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  gender?: "men" | "women" | "kids" | "unisex";
  description: string;
  image: string;
  price?: string;
  featured?: boolean;
}

export const products: Product[] = [
  // RINGS
  {
    id: "ring-1",
    name: "Classic Solitaire Ring",
    category: "rings",
    subCategory: "Solitaire",
    gender: "women",
    description: "Elegant 925 sterling silver solitaire ring with a brilliant-cut stone.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "ring-2",
    name: "Antique Floral Band",
    category: "rings",
    subCategory: "Antique",
    gender: "women",
    description: "Intricately carved floral patterns on an antique silver finish.",
    image: "https://images.unsplash.com/photo-1617033930343-dc8116270b92?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-3",
    name: "Men's Signature Signet",
    category: "rings",
    subCategory: "Regular",
    gender: "men",
    description: "Bold and masculine signet ring in polished 925 silver.",
    image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "brace-3",
    name: "Classic Men's Kada",
    category: "bracelets",
    subCategory: "CNC",
    gender: "men",
    description: "Traditional heavy silver kada with a modern CNC finish for a sophisticated look.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "chain-1",
    name: "Heavy Silver Box Chain",
    category: "chain-pendants",
    gender: "men",
    description: "Substantial 925 silver box chain, perfect for daily wear or with a pendant.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "brace-4",
    name: "Artisan Braided Bracelet",
    category: "bracelets",
    subCategory: "Light Weight",
    gender: "men",
    description: "Intricately braided silver wires forming a stylish and comfortable bracelet.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-11",
    name: "Textured Band for Men",
    category: "rings",
    subCategory: "Regular",
    gender: "men",
    description: "A rugged, hammered texture gives this silver band a unique, handcrafted feel.",
    image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "pendant-1",
    name: "Lion Head Silver Pendant",
    category: "chain-pendants",
    gender: "men",
    description: "Bold lion head pendant crafted in detailed antique silver.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "brace-5",
    name: "Brushed Silver Cuff",
    category: "bracelets",
    subCategory: "Adjustable",
    gender: "men",
    description: "Minimalist cuff bracelet with a premium brushed silver finish.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-4",
    name: "Royal Cocktail Ring",
    category: "rings",
    subCategory: "Cocktail",
    gender: "women",
    description: "A statement piece featuring a large, brilliant stone surrounded by intricate silver work.",
    image: "https://images.unsplash.com/photo-1603961501913-5c7ad5652495?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-5",
    name: "Emerald Cut Stone Ring",
    category: "rings",
    subCategory: "Cut Stone",
    gender: "women",
    description: "Modern emerald-cut stone set in a minimalist 925 silver band.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-6",
    name: "Artisan Thumb Ring",
    category: "rings",
    subCategory: "Thumb Ring",
    gender: "unisex",
    description: "Handcrafted wide band thumb ring with a brushed silver texture.",
    image: "https://images.unsplash.com/photo-1598560912005-59a0d5c1a612?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-7",
    name: "Eternal Couple Bands",
    category: "rings",
    subCategory: "Couple Ring",
    gender: "unisex",
    description: "Matching silver bands for couples, featuring a sleek and timeless design.",
    image: "https://images.unsplash.com/photo-1516131206008-dd041a9764fd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-8",
    name: "Minimalist Daily Band",
    category: "rings",
    subCategory: "Regular",
    gender: "unisex",
    description: "Clean and simple 925 silver band, perfect for everyday elegance.",
    image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-9",
    name: "Vintage Victorian Ring",
    category: "rings",
    subCategory: "Antique",
    gender: "women",
    description: "Exquisite Victorian-inspired design with delicate silver filigree.",
    image: "https://images.unsplash.com/photo-1535160107868-58335dd30964?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ring-10",
    name: "Classic Marquise Solitaire",
    category: "rings",
    subCategory: "Solitaire",
    gender: "women",
    description: "Stunning marquise-cut solitaire stone set in a tapered 925 silver band.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
  },

  // BRACELETS
  {
    id: "brace-1",
    name: "Tennis Silver Bracelet",
    category: "bracelets",
    subCategory: "Tennis",
    gender: "women",
    description: "A continuous strand of sparkling stones set in pure silver.",
    image: "https://images.unsplash.com/photo-1535160107868-58335dd30964?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "brace-2",
    name: "Adjustable Silver Bangle",
    category: "bracelets",
    subCategory: "Adjustable",
    gender: "women",
    description: "Modern adjustable design with a high-polish finish.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
  },

  // ANKLETS
  {
    id: "anklet-1",
    name: "Oxidised Ghungroo Payal",
    category: "anklets",
    subCategory: "Oxidised",
    gender: "women",
    description: "Traditional oxidised silver anklets with gentle tinkling bells.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "anklet-2",
    name: "Fancy Dora Payal",
    category: "anklets",
    subCategory: "Dora Payal",
    gender: "women",
    description: "Lightweight and elegant Dora style anklet for daily wear.",
    image: "https://images.unsplash.com/photo-1598560911995-fe2922129e71?q=80&w=800&auto=format&fit=crop",
  },

  // IDOLS & GIFTS
  {
    id: "idol-1",
    name: "Pure Silver Ganesha",
    category: "idol-gift",
    subCategory: "Idols",
    description: "Pure 999 silver Ganesha idol, perfect for home pooja.",
    image: "https://images.unsplash.com/photo-1590731057692-bb202febc667?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "gift-1",
    name: "German Silver Dinner Set",
    category: "german-silver-gifts",
    description: "Exquisite 5-piece German silver set for luxury gifting.",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=800&auto=format&fit=crop",
  },

  // MANGALSUTRA
  {
    id: "mangal-1",
    name: "Traditional Silver Mangalsutra",
    category: "mangalsutra",
    gender: "women",
    description: "Pure silver beads combined with traditional black beads for a sacred bond.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
  },
];

export const categories = [
  { id: "rings", name: "Rings", slug: "rings", description: "Regular, Solitaire, Antique, Cocktail, Cut stone, Thumb Ring, Couple Ring.", subCategories: ["Regular", "Solitaire", "Antique", "Cocktail", "Cut Stone", "Thumb Ring", "Couple Ring"] },
  { id: "bracelets", name: "Bracelets", slug: "bracelets", description: "Light weight, Adjustable, CNC, Tennis bracelets in pure silver.", subCategories: ["Light Weight", "Adjustable", "CNC", "Tennis"] },
  { id: "chain-pendants", name: "Chain / Pendants", slug: "chain-pendants", description: "Elegant silver chains and detailed pendants." },
  { id: "bangadi-kada", name: "Bangadi / Kada", slug: "bangadi-kada", description: "Traditional silver bangles and kadas." },
  { id: "anklets", name: "Anklets / Payal", slug: "anklets", description: "Oxidised, Fancy Payal, Dora Payal, Agra Payal.", subCategories: ["Oxidised", "Fancy Payal", "Dora Payal", "Agra Payal"] },
  { id: "mangalsutra", name: "Mangalsutra", slug: "mangalsutra", description: "Sacred silver mangalsutras with traditional and modern designs." },
  { id: "toe-rings", name: "Toe Rings", slug: "toe-rings", description: "Beautifully crafted silver toe rings." },
  { id: "idol-gift", name: "Idol / Gift", slug: "idol-gift", description: "Pure silver idols and premium gifting items." },
  { id: "pooja-utensils", name: "Pooja / Utensils", slug: "pooja-utensils", description: "Pure silver essentials for your spiritual practices." },
  { id: "frame", name: "Frame", slug: "frame", description: "Exquisite silver frames for your precious memories." },
  { id: "german-silver-gifts", name: "German Silver Gifts", slug: "german-silver-gifts", description: "Elegant German silver items perfect for bulk gifting and celebrations." },
  { id: "coins", name: "Silver Coins", slug: "coins", description: "Pure 999 silver coins for investment and gifting." },
  { id: "men", name: "Men's Collection", slug: "men", description: "Masculine silver jewellery for the modern man." },
  { id: "women", name: "Women's Collection", slug: "women", description: "Elegant and stylish silver jewellery for her." },
];
