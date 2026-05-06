export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  serialNumber?: string;
  purity?: string;
  gender?: "men" | "women" | "kids" | "unisex";
  description: string;
  image: string;
  price: number;
  featured?: boolean;
  occasions?: string[];
  styles?: string[];
}

export const categories = [
  {
    id: "brooches",
    name: "Brooches",
    slug: "brooches",
    description: "Elegant 925 silver brooches including heritage and divine designs.",
    subCategories: []
  },
  {
    id: "rings",
    name: "Rings",
    slug: "rings",
    description: "Exquisite silver rings for every finger and occasion.",
    subCategories: ["Men's Rings", "Women's Rings", "Solitaires"]
  },
  {
    id: "bracelets",
    name: "Bracelets",
    slug: "bracelets",
    description: "Beautifully crafted silver bracelets and bangles.",
    subCategories: ["Men's Bracelets", "Women's Bracelets", "Adjustable"]
  },
  {
    id: "chains",
    name: "Chains",
    slug: "chains",
    description: "Classic and contemporary silver chains.",
    subCategories: ["Men's Chains", "Women's Chains"]
  },
  {
    id: "kadas",
    name: "Kadas",
    slug: "kadas",
    description: "Traditional and modern silver kadas for men.",
    subCategories: ["Panjabi Kada", "Designer Kada"]
  },
  {
    id: "anklets",
    name: "Anklets (Payal)",
    slug: "anklets",
    description: "Graceful silver anklets for every step.",
    subCategories: ["Traditional Payal", "Modern Anklets"]
  },
  {
    id: "toe-rings",
    name: "Toe Rings (Bichhiya)",
    slug: "toe-rings",
    description: "Elegant silver toe rings for women.",
    subCategories: ["Adjustable", "Traditional"]
  },
  {
    id: "mangalsutra",
    name: "Mangalsutra",
    slug: "mangalsutra",
    description: "Sacred silver mangalsutras with modern designs.",
    subCategories: ["Daily Wear", "Heavy Design"]
  },
  {
    id: "utensils",
    name: "Silver Utensils",
    slug: "utensils",
    description: "Premium silver utensils for pooja and gifting.",
    subCategories: ["Pooja Thali", "Bowls", "Glasses", "Lota"]
  },
  {
    id: "german-silver",
    name: "German Silver",
    slug: "german-silver",
    description: "Premium German silver gifting items for every occasion.",
    subCategories: ["Dry Fruit Box", "Trays", "Bowl", "Jewellery Box"]
  },
  {
    id: "silver-coated",
    name: "Silver Coated",
    slug: "silver-coated",
    description: "Beautifully silver coated decorative and gifting pieces.",
    subCategories: ["Kalash", "Table Clock", "Pen Stand", "Idols on Stand"]
  },
  {
    id: "silver-idols",
    name: "Silver Idols 999/925",
    slug: "silver-idols",
    description: "Divine pure silver idols for your home and gifting.",
    subCategories: ["Ganesh Ji", "Radha Krishna", "Laxmi Ji", "Hanuman"]
  },
  {
    id: "silver-frames",
    name: "999 Silver Frames",
    slug: "silver-frames",
    description: "Divine 999 pure silver frames.",
    subCategories: ["Deity Frames", "Spiritual Frames"]
  },
  {
    id: "men",
    name: "For Men",
    slug: "men",
    description: "Premium silver jewellery and accessories designed for men.",
    subCategories: ["Rings", "Bracelets", "Kadas", "Chains", "Brooches"]
  },
  {
    id: "women",
    name: "For Women",
    slug: "women",
    description: "Exquisite silver collections curated for women.",
    subCategories: ["Rings", "Bracelets", "Chains", "Anklets", "Toe Rings", "Mangalsutra"]
  }
];

const createProduct = (
  id: string, name: string, category: string, subCategory: string, image: string, 
  serialNumber?: string, purity?: string, price: number = 2500, gender: "men" | "women" | "kids" | "unisex" = "unisex"
): Product => ({
  id, name, category, subCategory, serialNumber, purity, gender,
  description: `Exquisite ${name} crafted with the finest materials. Perfect for any occasion.`,
  image,
  price,
  featured: true,
  occasions: ["Festivals", "Gifting"],
  styles: ["Classic"]
});

export const products: Product[] = [
  // 1. BROOCHES
  createProduct("bro-1", "CHATRAPATI LAGACY BROOCH", "brooches", "Brooches", "/images/collections/jewellery.png", "BRO/001", "925", 3500, "men"),
  createProduct("bro-2", "DIVINE TRISHUL BROOCH", "brooches", "Brooches", "/images/collections/jewellery.png", "BRO/002", "925", 2800, "men"),
  createProduct("bro-3", "REGAL LION CREST", "brooches", "Brooches", "/images/collections/jewellery.png", "BRO/003", "925", 3200, "men"),
  createProduct("bro-4", "ETERNAL RADHA KRISHNA EMBLEM", "brooches", "Brooches", "/images/collections/jewellery.png", "BRO/004", "925", 4000, "men"),
  createProduct("bro-5", "HANUMAN RAM", "brooches", "Brooches", "/images/collections/jewellery.png", "BRO/005", "925", 3800, "men"),
  createProduct("bro-6", "ROYAL STALLION", "brooches", "Brooches", "/images/collections/jewellery.png", "BRO/006", "925", 3000, "men"),
  createProduct("bro-7", "ASHOKA EMBLEM PESTIGE", "brooches", "Brooches", "/images/collections/jewellery.png", "BRO/007", "925", 4200, "men"),
  createProduct("bro-8", "IMPERIAL ROSE", "brooches", "Brooches", "/images/collections/jewellery.png", "BRO/008", "925", 2500, "men"),

  // 2. RINGS
  createProduct("men-ring-1", "Classic Men's Signet", "rings", "Men's Rings", "/images/products/regular-ring.png", undefined, "925", 2200, "men"),
  createProduct("men-ring-2", "Modern Silver Band", "rings", "Men's Rings", "/images/products/regular-ring.png", undefined, "925", 1800, "men"),
  createProduct("wr-1", "REGULAR RING", "rings", "Women's Rings", "/images/products/regular-ring.png", undefined, "925", 1500, "women"),
  createProduct("wr-2", "SOLITAIRE RING", "rings", "Women's Rings", "/images/products/regular-ring.png", undefined, "925", 2500, "women"),
  createProduct("wr-3", "ANTIQUE RING", "rings", "Women's Rings", "/images/products/antique-filigree-ring.png", undefined, "925", 3000, "women"),
  createProduct("wr-4", "COCKTAIL CUT STONE RING", "rings", "Women's Rings", "/images/products/cocktail-cut-stone-ring.png", undefined, "925", 4500, "women"),
  createProduct("wr-5", "THUMB RING", "rings", "Women's Rings", "/images/products/artisan-toe-ring.png", undefined, "925", 1800, "women"),

  // 3. BRACELETS
  createProduct("men-brace-1", "Premium Men's Link Bracelet", "bracelets", "Men's Bracelets", "/images/products/bracelets.png", undefined, "925", 4500, "men"),
  createProduct("men-brace-2", "Silver Rope Bracelet", "bracelets", "Men's Bracelets", "/images/products/bracelets.png", undefined, "925", 3800, "men"),
  createProduct("wb-1", "LIGHT WEIGHT BRACELET", "bracelets", "Women's Bracelets", "/images/products/bracelets.png", undefined, "925", 2800, "women"),
  createProduct("wb-2", "ADJUSTABLE BRACELET", "bracelets", "Women's Bracelets", "/images/products/bracelets.png", undefined, "925", 3200, "women"),

  // 4. CHAINS
  createProduct("men-chain-1", "Sterling Silver Box Chain", "chains", "Men's Chains", "/images/collections/jewellery.png", undefined, "925", 3500, "men"),
  createProduct("men-chain-2", "Heavy Curb Chain", "chains", "Men's Chains", "/images/collections/jewellery.png", undefined, "925", 5500, "men"),
  createProduct("wm-chain-1", "Delicate Silver Chain", "chains", "Women's Chains", "/images/collections/jewellery.png", undefined, "925", 2200, "women"),

  // 5. KADAS
  createProduct("men-kada-1", "Classic Panjabi Kada", "kadas", "Kadas", "/images/products/bracelets.png", undefined, "925", 5500, "men"),
  createProduct("men-kada-2", "Engraved Silver Kada", "kadas", "Kadas", "/images/products/bracelets.png", undefined, "925", 6200, "men"),

  // 6. ANKLETS
  createProduct("wa-1", "Traditional Bridal Payal", "anklets", "Anklets", "/images/products/payal.png", undefined, "925", 4500, "women"),
  createProduct("wa-2", "Contemporary Silver Anklet", "anklets", "Anklets", "/images/products/payal.png", undefined, "925", 1800, "women"),

  // 7. TOE RINGS
  createProduct("wtr-1", "Artisan Toe Ring Set", "toe-rings", "Toe Rings", "/images/products/artisan-toe-ring.png", undefined, "925", 850, "women"),
  createProduct("wtr-2", "Dual Tone Toe Ring", "toe-rings", "Toe Rings", "/images/products/artisan-toe-ring.png", undefined, "925", 1200, "women"),

  // 8. MANGALSUTRA
  createProduct("wm-1", "REGULAR MANGALSUTRA", "mangalsutra", "Mangalsutra", "/images/collections/jewellery.png", undefined, "925", 3500, "women"),
  createProduct("wm-2", "SOLITAIRE MANGALSUTRA", "mangalsutra", "Mangalsutra", "/images/collections/jewellery.png", undefined, "925", 4500, "women"),
  createProduct("wm-3", "OXODISE MANGALSUTRA", "mangalsutra", "Mangalsutra", "/images/collections/jewellery.png", undefined, "925", 3000, "women"),
  createProduct("wm-4", "PEARL MANGALSUTRA", "mangalsutra", "Mangalsutra", "/images/collections/jewellery.png", undefined, "925", 4000, "women"),

  // 9. UTENSILS (Pooja & Gifting)
  createProduct("ut-1", "PURE SILVER POOJA THALI", "utensils", "Utensils", "/images/products/pooja-utensils.png", undefined, "925", 15000),
  createProduct("ut-2", "SILVER BOWL SET", "utensils", "Utensils", "/images/products/pooja-utensils.png", undefined, "925", 4500),
  createProduct("ut-3", "SILVER LOTA", "utensils", "Utensils", "/images/products/pooja-utensils.png", undefined, "925", 3800),

  // 10. GERMAN SILVER
  createProduct("gs-1", "DRY FRUIT BOX", "german-silver", "German Silver", "/images/products/pooja-utensils.png", undefined, undefined, 2500),
  createProduct("gs-2", "POOJA THALI SET", "german-silver", "German Silver", "/images/products/pooja-utensils.png", undefined, undefined, 1800),
  createProduct("gs-8", "DRY FRUIT DESINER TRAY", "german-silver", "German Silver", "/images/products/pooja-utensils.png", undefined, undefined, 3000),
  createProduct("gs-12", "JEWELLERY BOX", "german-silver", "German Silver", "/images/products/pooja-utensils.png", undefined, undefined, 3500),

  // 11. SILVER COATED
  createProduct("sc-1", "KALASH SM", "silver-coated", "Silver Coated", "/images/collections/gifting.png", undefined, undefined, 1200),
  createProduct("sc-2", "TABLE CLOCK M ONSTAND", "silver-coated", "Silver Coated", "/images/collections/gifting.png", undefined, undefined, 2500),
  createProduct("sc-3", "MINI GANESHA TRUNK PEN STAND", "silver-coated", "Silver Coated", "/images/collections/gifting.png", undefined, undefined, 1500),

  // 12. SILVER IDOLS
  createProduct("id-1", "GANESH JI", "silver-idols", "Silver Idols", "/images/collections/pooja.png", undefined, "999/925", 8500),
  createProduct("id-2", "RADHA KRISHNA", "silver-idols", "Silver Idols", "/images/collections/pooja.png", undefined, "999/925", 12000),
  createProduct("id-3", "DANCING GANESHA", "silver-idols", "Silver Idols", "/images/collections/pooja.png", undefined, "999/925", 9500),

  // 13. SILVER FRAMES
  createProduct("fr-1", "GANESH JI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 5500),
  createProduct("fr-2", "LAXMI JI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 5500),
  createProduct("fr-4", "RADHE KRISHNA FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6500),
];