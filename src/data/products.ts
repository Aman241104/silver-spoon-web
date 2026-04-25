export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  gender?: "men" | "women" | "kids" | "unisex";
  description: string;
  image: string;
  price?: number; // Changed to number for logic
  featured?: boolean;
  occasions?: string[];
  styles?: string[];
}

export const products: Product[] = [
  // 1. RINGS
  {
    id: "ring-1",
    name: "Classic Regular Band",
    category: "rings",
    subCategory: "Regular Rings",
    gender: "unisex",
    description: "Elegant 925 sterling silver regular band for daily wear.",
    image: "/images/products/regular-ring.png",
    price: 1200,
    featured: true,
    occasions: ["Daily Wear", "Corporate"],
    styles: ["Minimalist", "Modern"],
  },
  {
    id: "ring-2",
    name: "Brilliant Solitaire Ring",
    category: "rings",
    subCategory: "Solitaire Rings",
    gender: "women",
    description: "Stunning solitaire stone set in a pure silver band.",
    image: "/images/products/regular-ring.png",
    price: 2499,
    featured: true,
    occasions: ["Anniversary", "Wedding"],
    styles: ["Modern", "Elegant"],
  },
  {
    id: "ring-3",
    name: "Antique Filigree Ring",
    category: "rings",
    subCategory: "Antique Rings",
    gender: "women",
    description: "Intricately designed antique finish ring with traditional motifs.",
    image: "/images/products/antique-filigree-ring.png",
    price: 3500,
    occasions: ["Festivals", "Wedding"],
    styles: ["Traditional", "Artisan"],
  },
  {
    id: "ring-4",
    name: "Cocktail Cut Stone Ring",
    category: "rings",
    subCategory: "Cocktail (Cut Stone) Rings",
    gender: "women",
    description: "Bold statement ring with a large, beautifully cut center stone.",
    image: "/images/products/cocktail-cut-stone-ring.png",
    price: 4999,
    occasions: ["Party", "Anniversary"],
    styles: ["Bold", "Modern"],
  },
  {
    id: "ring-5",
    name: "Artisan Thumb Ring",
    category: "rings",
    subCategory: "Thumb Rings",
    gender: "unisex",
    description: "Stylish and comfortable wide-band silver thumb ring with handcrafted artisan details.",
    image: "/images/products/artisan-toe-ring.png",
    price: 1800,
    occasions: ["Daily Wear", "Casual"],
    styles: ["Artisan", "Modern"],
  },

  // ANKLETS
  {
    id: "payal-1",
    name: "Oxidised Ethnic Payal",
    category: "anklets",
    subCategory: "Oxidised Payal",
    gender: "women",
    description: "Antique finish oxidised silver payal for a rustic look.",
    image: "/images/products/payal.png",
    price: 2800,
    featured: true,
    occasions: ["Festivals", "Wedding"],
    styles: ["Traditional", "Ethnic"],
  },

  // IDOLS / GIFTS
  {
    id: "idol-1",
    name: "Sacred Ganesha Idol",
    category: "idols-gifts",
    subCategory: "God Idols",
    description: "Pure silver idol of Lord Ganesha for your home shrine.",
    image: "/images/collections/pooja.png",
    price: 8500,
    featured: true,
    occasions: ["Baby Born", "Wedding", "House Warming"],
    styles: ["Traditional", "Divine"],
  },
  {
    id: "idol-2",
    name: "Divine Laxmi Paduka",
    category: "idols-gifts",
    subCategory: "Laxmi Paduka",
    description: "Pure silver Laxmi Paduka for prosperity and blessings.",
    image: "/images/collections/pooja.png",
    price: 4500,
    occasions: ["Festivals", "Anniversary"],
    styles: ["Traditional"],
  },
  {
    id: "pooja-1",
    name: "Ornate Silver Diya",
    category: "pooja-utensils",
    subCategory: "Diya",
    description: "Pure silver diya for daily pooja and special ceremonies.",
    image: "/images/products/pooja-utensils.png",
    price: 3200,
    occasions: ["Festivals", "Daily Wear"],
    styles: ["Traditional"],
  },
  {
    id: "gs-1",
    name: "German Silver Thali Set",
    category: "german-silver-gifts",
    subCategory: "Thali Set",
    description: "Elegant German silver thali set for high-end gifting.",
    image: "/images/products/pooja-utensils.png",
    price: 1400,
    occasions: ["Corporate", "Festivals"],
    styles: ["Modern"],
  },
  {
    id: "coin-1",
    name: "999 Pure Silver Coin",
    category: "coins",
    subCategory: "Silver Coins",
    description: "Pure 999 silver coin (10g) for investment and gifting.",
    image: "/images/collections/gifting.png",
    price: 950,
    occasions: ["Baby Born", "Festivals", "Corporate"],
    styles: ["Minimalist"],
  },
];

export const categories = [
  { 
    id: "rings", 
    name: "Rings", 
    slug: "rings", 
    description: "Regular, Solitaire, Antique, Cocktail, Thumb, Couple Rings.", 
    subCategories: ["Regular Rings", "Solitaire Rings", "Antique Rings", "Cocktail (Cut Stone) Rings", "Thumb Rings", "Couple Rings"] 
  },
  { 
    id: "bracelets", 
    name: "Bracelets", 
    slug: "bracelets", 
    description: "Lightweight, Adjustable, CNC, Tennis Bracelets.", 
    subCategories: ["Lightweight Bracelets", "Adjustable Bracelets", "CNC Bracelets", "Tennis Bracelets"] 
  },
  { 
    id: "chains-pendants", 
    name: "Chains & Pendants", 
    slug: "chains-pendants", 
    description: "Chain with Pendants and elegant silver chains.", 
    subCategories: ["Chain with Pendants"] 
  },
  { 
    id: "bangles-kada", 
    name: "Bangles / Kada", 
    slug: "bangles-kada", 
    description: "Traditional Bangles and Kada Designs.", 
    subCategories: ["Traditional Bangles", "Kada Designs"] 
  },
  { 
    id: "anklets", 
    name: "Anklets (Payal)", 
    slug: "anklets", 
    description: "Oxidised, Fancy, Dora, Aagna Payal.", 
    subCategories: ["Oxidised Payal", "Fancy Payal", "Dora Payal", "Aagna Payal"] 
  },
  { 
    id: "mangalsutra", 
    name: "Mangalsutra", 
    slug: "mangalsutra", 
    description: "Regular, Solitaire, Oxidised, Pendant Mangalsutra.", 
    subCategories: ["Regular Mangalsutra", "Solitaire Mangalsutra", "Oxidised Mangalsutra", "Pendant Mangalsutra"] 
  },
  { 
    id: "toe-rings", 
    name: "Toe Rings", 
    slug: "toe-rings", 
    description: "Toe Ring Designs and traditional bichhiya.", 
    subCategories: ["Toe Ring Designs"] 
  },
  { 
    id: "idols-gifts", 
    name: "Idol / Gifts", 
    slug: "idols-gifts", 
    description: "God Idols, Antique Diyas, Laxmi Paduka, Vishnu Charan.", 
    subCategories: ["God Idols", "Antique Diyas", "Laxmi Paduka", "Vishnu Charan"] 
  },
  { 
    id: "pooja-utensils", 
    name: "Pooja / Utensils", 
    slug: "pooja-utensils", 
    description: "Diya, Pooja Thali, Katari, Ghanti.", 
    subCategories: ["Diya", "Pooja Thali", "Katari", "Ghanti"] 
  },
  { 
    id: "frames", 
    name: "Frames", 
    slug: "frames", 
    description: "999 Silver Frames.", 
    subCategories: ["999 Silver Frames"] 
  },
  { 
    id: "german-silver-gifts", 
    name: "German Silver Gifts", 
    slug: "german-silver-gifts", 
    description: "Thali Set, Pooja Thali, Diya, Mukhwas Box, Tray, Bowl.", 
    subCategories: ["Thali Set", "Pooja Thali", "Diya", "Mukhwas Box", "Tray", "Bowl"] 
  },
  { 
    id: "coins", 
    name: "Silver Coins", 
    slug: "coins", 
    description: "Pure 999 silver coins for investment and gifting." 
  },
  {
    id: "men",
    name: "For Men",
    slug: "men",
    description: "Premium silver jewellery and accessories designed for men."
  },
  {
    id: "women",
    name: "For Women",
    slug: "women",
    description: "Exquisite silver collections curated for women."
  },
];
