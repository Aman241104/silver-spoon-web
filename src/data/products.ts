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
  // 1. RINGS
  {
    id: "ring-1",
    name: "Classic Regular Band",
    category: "rings",
    subCategory: "Regular Rings",
    gender: "unisex",
    description: "Elegant 925 sterling silver regular band for daily wear.",
    image: "/images/products/regular-ring.png",
    featured: true,
  },
  {
    id: "ring-2",
    name: "Brilliant Solitaire Ring",
    category: "rings",
    subCategory: "Solitaire Rings",
    gender: "women",
    description: "Stunning solitaire stone set in a pure silver band.",
    image: "/images/products/regular-ring.png",
    featured: true,
  },
  {
    id: "ring-3",
    name: "Antique Filigree Ring",
    category: "rings",
    subCategory: "Antique Rings",
    gender: "women",
    description: "Intricately designed antique finish ring with traditional motifs.",
    image: "/images/products/antique-filigree-ring.png",
  },
  {
    id: "ring-4",
    name: "Cocktail Cut Stone Ring",
    category: "rings",
    subCategory: "Cocktail (Cut Stone) Rings",
    gender: "women",
    description: "Bold statement ring with a large, beautifully cut center stone.",
    image: "/images/products/cocktail-cut-stone-ring.png",
  },
  {
    id: "ring-5",
    name: "Artisan Thumb Ring",
    category: "rings",
    subCategory: "Thumb Rings",
    gender: "unisex",
    description: "Stylish and comfortable wide-band silver thumb ring with handcrafted artisan details.",
    image: "/images/products/artisan-toe-ring.png",
  },
  {
    id: "ring-6",
    name: "Eternal Couple Bands",
    category: "rings",
    subCategory: "Couple Rings",
    gender: "unisex",
    description: "Matching silver bands for couples, symbols of eternal love.",
    image: "/images/products/regular-ring.png",
  },

  // 2. BRACELETS
  {
    id: "brace-1",
    name: "Lightweight Daily Bracelet",
    category: "bracelets",
    subCategory: "Lightweight Bracelets",
    gender: "women",
    description: "Delicate and lightweight silver bracelet for everyday elegance.",
    image: "/images/products/bracelets.png",
  },
  {
    id: "brace-2",
    name: "Adjustable Silver Cuff",
    category: "bracelets",
    subCategory: "Adjustable Bracelets",
    gender: "unisex",
    description: "Versatile adjustable silver bracelet with a modern finish.",
    image: "/images/products/bracelets.png",
  },
  {
    id: "brace-3",
    name: "CNC Precision Bracelet",
    category: "bracelets",
    subCategory: "CNC Bracelets",
    gender: "men",
    description: "Machine-finished silver bracelet with high precision patterns.",
    image: "/images/products/bracelets.png",
  },
  {
    id: "brace-4",
    name: "Elegant Tennis Bracelet",
    category: "bracelets",
    subCategory: "Tennis Bracelets",
    gender: "women",
    description: "A continuous strand of sparkling stones set in pure silver.",
    image: "/images/products/bracelets.png",
    featured: true,
  },

  // 3. CHAINS & PENDANTS
  {
    id: "chain-1",
    name: "Silver Chain with Pendant",
    category: "chains-pendants",
    subCategory: "Chain with Pendants",
    gender: "unisex",
    description: "Beautifully crafted silver chain paired with an elegant pendant.",
    image: "/images/collections/jewellery.png",
    featured: true,
  },

  // 4. BANGLES / KADA
  {
    id: "bangle-1",
    name: "Traditional Silver Bangles",
    category: "bangles-kada",
    subCategory: "Traditional Bangles",
    gender: "women",
    description: "Timeless traditional silver bangles with detailed engraving.",
    image: "/images/products/bracelets.png",
  },
  {
    id: "kada-1",
    name: "Majestic Silver Kada",
    category: "bangles-kada",
    subCategory: "Kada Designs",
    gender: "unisex",
    description: "Heavy and bold silver kada for a powerful statement.",
    image: "/images/products/bracelets.png",
  },

  // 5. ANKLETS (PAYAL)
  {
    id: "payal-1",
    name: "Oxidised Ethnic Payal",
    category: "anklets",
    subCategory: "Oxidised Payal",
    gender: "women",
    description: "Antique finish oxidised silver payal for a rustic look.",
    image: "/images/products/payal.png",
    featured: true,
  },
  {
    id: "payal-2",
    name: "Fancy Designer Payal",
    category: "anklets",
    subCategory: "Fancy Payal",
    gender: "women",
    description: "Contemporary and stylish fancy silver payal for special occasions.",
    image: "/images/products/payal.png",
  },
  {
    id: "payal-3",
    name: "Dora Style Payal",
    category: "anklets",
    subCategory: "Dora Payal",
    gender: "women",
    description: "Graceful Dora style silver payal with a delicate weave.",
    image: "/images/products/payal.png",
  },
  {
    id: "payal-4",
    name: "Aagna Traditional Payal",
    category: "anklets",
    subCategory: "Aagna Payal",
    gender: "women",
    description: "Traditional Aagna style payal with intricate craftsmanship.",
    image: "/images/products/payal.png",
  },

  // 6. MANGALSUTRA
  {
    id: "mangal-1",
    name: "Regular Silver Mangalsutra",
    category: "mangalsutra",
    subCategory: "Regular Mangalsutra",
    gender: "women",
    description: "Classic silver mangalsutra with traditional black beads.",
    image: "/images/collections/jewellery.png",
  },
  {
    id: "mangal-2",
    name: "Solitaire Pendant Mangalsutra",
    category: "mangalsutra",
    subCategory: "Solitaire Mangalsutra",
    gender: "women",
    description: "Elegant silver mangalsutra with a single solitaire pendant.",
    image: "/images/collections/jewellery.png",
  },
  {
    id: "mangal-3",
    name: "Oxidised Heritage Mangalsutra",
    category: "mangalsutra",
    subCategory: "Oxidised Mangalsutra",
    gender: "women",
    description: "Rustic oxidised silver mangalsutra for a unique ethnic look.",
    image: "/images/collections/jewellery.png",
  },
  {
    id: "mangal-4",
    name: "Contemporary Pendant Mangalsutra",
    category: "mangalsutra",
    subCategory: "Pendant Mangalsutra",
    gender: "women",
    description: "Modern silver mangalsutra featuring a stylish pendant.",
    image: "/images/collections/jewellery.png",
  },

  // 7. TOE RINGS
  {
    id: "toe-1",
    name: "Artisan Toe Ring Designs",
    category: "toe-rings",
    subCategory: "Toe Ring Designs",
    gender: "women",
    description: "Beautifully handcrafted silver toe rings (bichhiya) featuring traditional artisan craftsmanship.",
    image: "/images/products/artisan-toe-ring.png",
    featured: true,
  },

  // 8. IDOL / GIFTS
  {
    id: "idol-1",
    name: "Sacred God Idols",
    category: "idols-gifts",
    subCategory: "God Idols",
    description: "Pure silver idols of deities for your home shrine.",
    image: "/images/collections/pooja.png",
    featured: true,
  },
  {
    id: "idol-2",
    name: "Antique Silver Diyas",
    category: "idols-gifts",
    subCategory: "Antique Diyas",
    description: "Beautifully carved antique silver diyas for rituals.",
    image: "/images/products/pooja-utensils.png",
  },
  {
    id: "idol-3",
    name: "Sacred Laxmi Paduka",
    category: "idols-gifts",
    subCategory: "Laxmi Paduka",
    description: "Pure silver Laxmi Paduka for prosperity and blessings.",
    image: "/images/collections/pooja.png",
  },
  {
    id: "idol-4",
    name: "Divine Vishnu Charan",
    category: "idols-gifts",
    subCategory: "Vishnu Charan",
    description: "Exquisitely crafted Vishnu Charan in pure silver.",
    image: "/images/collections/pooja.png",
  },

  // 9. POOJA / UTENSILS
  {
    id: "pooja-1",
    name: "Ritual Silver Diya",
    category: "pooja-utensils",
    subCategory: "Diya",
    description: "Pure silver diya for daily pooja and special ceremonies.",
    image: "/images/products/pooja-utensils.png",
  },
  {
    id: "pooja-2",
    name: "Ornate Pooja Thali",
    category: "pooja-utensils",
    subCategory: "Pooja Thali",
    description: "Complete silver pooja thali set with traditional patterns.",
    image: "/images/collections/pooja.png",
  },
  {
    id: "pooja-3",
    name: "Traditional Katari",
    category: "pooja-utensils",
    subCategory: "Katari",
    description: "Ceremonial silver katari with detailed craftsmanship.",
    image: "/images/collections/pooja.png",
  },
  {
    id: "pooja-4",
    name: "Sacred Silver Ghanti",
    category: "pooja-utensils",
    subCategory: "Ghanti",
    description: "Clear-sounding silver ritual bell (ghanti) for pooja.",
    image: "/images/collections/pooja.png",
  },

  // 10. FRAMES
  {
    id: "frame-1",
    name: "999 Silver Frames",
    category: "frames",
    subCategory: "999 Silver Frames",
    description: "Premium 999 pure silver frames for divine images and memories.",
    image: "/images/products/bracelets.png",
  },

  // 11. GERMAN SILVER GIFTS
  {
    id: "gs-1",
    name: "Luxury Thali Set",
    category: "german-silver-gifts",
    subCategory: "Thali Set",
    description: "Elegant German silver thali set for high-end gifting.",
    image: "/images/products/pooja-utensils.png",
  },
  {
    id: "gs-2",
    name: "Pooja Thali Set",
    category: "german-silver-gifts",
    subCategory: "Pooja Thali",
    description: "Traditional German silver pooja thali set for gifting.",
    image: "/images/collections/pooja.png",
  },
  {
    id: "gs-3",
    name: "Designer Diya",
    category: "german-silver-gifts",
    subCategory: "Diya",
    description: "Stylishly crafted German silver diya for festive gifts.",
    image: "/images/products/pooja-utensils.png",
  },
  {
    id: "gs-4",
    name: "Mukhwas Box",
    category: "german-silver-gifts",
    subCategory: "Mukhwas Box",
    description: "Decorative German silver mukhwas box for hospitality.",
    image: "/images/products/pooja-utensils.png",
  },
  {
    id: "gs-5",
    name: "Serving Tray",
    category: "german-silver-gifts",
    subCategory: "Tray",
    description: "Elegant German silver tray for serving and gifting.",
    image: "/images/products/pooja-utensils.png",
  },
  {
    id: "gs-6",
    name: "Decorative Bowl",
    category: "german-silver-gifts",
    subCategory: "Bowl",
    description: "Finely crafted German silver bowl for decor and gifts.",
    image: "/images/products/pooja-utensils.png",
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
];
