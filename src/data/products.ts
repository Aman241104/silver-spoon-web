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
  weight?: string;
  dimensions?: string;
  featured?: boolean;
  occasions?: string[];
  styles?: string[];
}

export const categories = [
  {
    id: "brooches",
    name: "Brooches & Buttons",
    slug: "brooches",
    description: "Elegant 925 silver brooches and buttons including heritage and divine designs.",
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
  serialNumber?: string, purity?: string, price: number = 2500, gender: "men" | "women" | "kids" | "unisex" = "unisex",
  weight?: string, dimensions?: string
): Product => ({
  id, name, category, subCategory, serialNumber, purity, gender,
  description: `Exquisite ${name} crafted with the finest materials. Perfect for any occasion.`,
  image,
  price,
  weight,
  dimensions,
  featured: true,
  occasions: ["Festivals", "Gifting"],
  styles: ["Classic"]
});

export const products: Product[] = [
  // 1. BROOCHES
  createProduct("bro-1", "CHATRAPATI LAGACY BROOCH", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO001.png", "BRO/001", "925", 12999, "men", "16.5g", "5 x 3.5 cm"),
  createProduct("bro-2", "DIVINE TRISHUL BROOCH", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO002.png", "BRO/002", "925", 14799, "men", "18.5g"),
  createProduct("bro-3", "KING LION BUTTON", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO003.png", "BRO/003", "925", 9999, "men", "12.81g", "3 x 2 cm"),
  createProduct("bro-4", "ETERNAL RADHA KRISHNA EMBLEM", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO004.png", "BRO/004", "925", 8999, "men", "11.45g", "4 x 2.8 cm"),
  createProduct("bro-5", "HANUMAN RAM", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO005.png", "BRO/005", "925", 8999, "men", "11.27g", "4 x 2 cm"),
  createProduct("bro-6", "ROYAL STALLION", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO006.png", "BRO/006", "925", 6999, "men", "9.13g", "3.5 x 3 cm"),
  createProduct("bro-7", "ASHOKA EMBLEM PESTIGE", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO007.png", "BRO/007", "925", 9699, "men", "12.2g", "3 x 2.8 cm"),
  createProduct("bro-8", "IMPERIAL ROSE", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO008.png", "BRO/008", "925", 11999, "men", "14.97g", "5.5 x 5.5 cm"),
  createProduct("bro-9", "ASHOKA EMBLEM PESTIGE BUTTON", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO009.png", "BRO/009", "925", 14399, "men", "18g", "3.5 x 3 cm"),
  createProduct("bro-10", "ROAYAL HORSE BUTTON", "brooches", "Brooches & Buttons", "/images/category/SILVER 925 BROOCH/BRO010.png", "BRO/010", "925", 10399, "men", "13g", "3 x 3 cm"),

  // 2. RINGS
  createProduct("men-ring-1", "Classic Men's Signet", "rings", "Men's Rings", "/images/products/regular-ring.png", undefined, "925", 2200, "men"),
  createProduct("men-ring-2", "Modern Silver Band", "rings", "Men's Rings", "/images/products/regular-ring.png", undefined, "925", 1800, "men"),
  createProduct("wr-1", "REGULAR RING", "rings", "Women's Rings", "/images/products/regular-ring.png", undefined, "925", 1500, "women"),
  createProduct("wr-2", "SOLITAIRE RING", "rings", "Women's Rings", "/images/products/multi-band-ring.png", undefined, "925", 2500, "women"),
  createProduct("wr-3", "ANTIQUE RING", "rings", "Women's Rings", "/images/products/antique-filigree-ring.png", undefined, "925", 3000, "women"),
  createProduct("wr-4", "COCKTAIL CUT STONE RING", "rings", "Women's Rings", "/images/products/cocktail-cut-stone-ring.png", undefined, "925", 4500, "women"),
  createProduct("wr-5", "THUMB RING", "rings", "Women's Rings", "/images/products/artisan-toe-ring.png", undefined, "925", 1800, "women"),

  // 3. BRACELETS
  createProduct("men-brace-1", "Premium Men's Link Bracelet", "bracelets", "Men's Bracelets", "/images/products/bracelets.png", undefined, "925", 4500, "men"),
  createProduct("men-brace-2", "Silver Rope Bracelet", "bracelets", "Men's Bracelets", "/images/products/bracelets.png", undefined, "925", 3800, "men"),
  createProduct("wb-1", "LIGHT WEIGHT BRACELET", "bracelets", "Women's Bracelets", "/images/products/bracelets.png", undefined, "925", 2800, "women"),
  createProduct("wb-2", "ADJUSTABLE BRACELET", "bracelets", "Women's Bracelets", "/images/products/bracelets.png", undefined, "925", 3200, "women"),
  createProduct("wb-3", "TENNIS BRACELET", "bracelets", "Women's Bracelets", "/images/products/bracelets.png", undefined, "925", 4800, "women"),
  createProduct("wb-4", "MS BRACELATE", "bracelets", "Women's Bracelets", "/images/products/bracelets.png", undefined, "925", 3500, "women"),
  createProduct("wb-5", "PEARL BRACELATE", "bracelets", "Women's Bracelets", "/images/products/bracelets.png", undefined, "925", 2800, "women"),
  createProduct("wb-6", "PENDORA BRACELATE", "bracelets", "Women's Bracelets", "/images/products/bracelets.png", undefined, "925", 5500, "women"),

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
  createProduct("wa-3", "AGRA PAYAL", "anklets", "Anklets", "/images/products/payal.png", undefined, "925", 5200, "women"),
  createProduct("wa-4", "FANCY PAYAL", "anklets", "Anklets", "/images/products/payal.png", undefined, "925", 3800, "women"),
  createProduct("wa-5", "OXODISED PAYAL", "anklets", "Anklets", "/images/products/payal.png", undefined, "925", 2500, "women"),
  createProduct("wa-6", "FUSION PAYAL", "anklets", "Anklets", "/images/products/payal.png", undefined, "925", 3200, "women"),
  createProduct("wa-7", "925 ANKLETS", "anklets", "Anklets", "/images/products/payal.png", undefined, "925", 1500, "women"),

  // 7. TOE RINGS
  createProduct("wtr-1", "Artisan Toe Ring Set", "toe-rings", "Toe Rings", "/images/products/artisan-toe-ring.png", undefined, "925", 850, "women"),
  createProduct("wtr-2", "Dual Tone Toe Ring", "toe-rings", "Toe Rings", "/images/products/artisan-toe-ring.png", undefined, "925", 1200, "women"),

  // 8. MANGALSUTRA
  createProduct("wm-1", "REGULAR MANGALSUTRA", "mangalsutra", "Mangalsutra", "/images/collections/jewellery.png", undefined, "925", 3500, "women"),
  createProduct("wm-2", "SOLITAIRE MANGALSUTRA", "mangalsutra", "Mangalsutra", "/images/collections/jewellery.png", undefined, "925", 4500, "women"),
  createProduct("wm-3", "OXODISE MANGALSUTRA", "mangalsutra", "Mangalsutra", "/images/collections/jewellery.png", undefined, "925", 3000, "women"),
  createProduct("wm-4", "PEARL MANGALSUTRA", "mangalsutra", "Mangalsutra", "/images/collections/jewellery.png", undefined, "925", 4000, "women"),

  // 9. UTENSILS (Pooja & Gifting)
  createProduct("ut-1", "PURE SILVER POOJA THALI", "utensils", "Utensils", "/images/products/pooja-thali-set.png", undefined, "925", 15000),
  createProduct("ut-2", "SILVER FILIGREE BOWL", "utensils", "Utensils", "/images/products/filigree-bowl.png", undefined, "925", 4500),
  createProduct("ut-3", "SILVER LOTA", "utensils", "Utensils", "/images/products/pooja-utensils.png", undefined, "925", 3800),
  createProduct("ut-4", "SQUARE FILIGREE TRAY", "utensils", "Utensils", "/images/products/square-filigree-tray.png", undefined, "925", 6500),
  createProduct("ut-5", "PREMIUM POOJA THALI SET", "utensils", "Utensils", "/images/products/premium-pooja-set.png", undefined, "925", 18500),
  createProduct("ut-6", "ROUND FILIGREE TRAY", "utensils", "Utensils", "/images/products/round-filigree-tray.png", undefined, "925", 7200),
  createProduct("ut-7", "ORNATE FILIGREE BOWL", "utensils", "Utensils", "/images/products/ornate-filigree-bowl.png", undefined, "925", 5200),
  createProduct("ut-8", "ORNATE SILVER DIYA", "utensils", "Utensils", "/images/products/ornate-silver-diya.png", undefined, "925", 2800),
  createProduct("ut-9", "DOUBLE SILVER DIYA SET", "utensils", "Utensils", "/images/products/double-silver-diya.png", undefined, "925", 4500),
  createProduct("ut-10", "SILVER STAND DIYA", "utensils", "Utensils", "/images/products/silver-stand-diya.png", undefined, "925", 3200),
  createProduct("ut-11", "TORTOISE KURMA DIYA", "utensils", "Utensils", "/images/products/tortoise-kurma-diya.png", undefined, "925", 3800),
  createProduct("ut-12", "FLUTED SILVER BOWL", "utensils", "Utensils", "/images/products/fluted-silver-bowl.png", undefined, "925", 3500),
  createProduct("ut-13", "PAIR OF SILVER DIYAS", "utensils", "Utensils", "/images/products/pair-silver-diyas.png", undefined, "925", 2200),
  createProduct("ut-14", "KUM KUM DAANI", "utensils", "Utensils", "/images/products/pooja-utensils.png", undefined, "925", 1200),
  createProduct("ut-15", "SINDOOR DAANI", "utensils", "Utensils", "/images/products/pooja-utensils.png", undefined, "925", 1500),
  createProduct("ut-16", "PRASHAD KATORI", "utensils", "Utensils", "/images/products/pooja-utensils.png", undefined, "925", 950),

  // 10. GERMAN SILVER
  createProduct("gs-1", "COMPASS J BOX", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP001.png", "GS/IMP/001", undefined, 1999, "unisex", undefined, '9" x 3.5"'),
  createProduct("gs-2", "ROUND PEACOCK DF BOX", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP002.png", "GS/IMP/002", undefined, 3399, "unisex", undefined, '8"'),
  createProduct("gs-3", "GLASS TRAY S", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP003.png", "GS/IMP/003", undefined, 3999, "unisex", undefined, '12" x 9"'),
  createProduct("gs-4", "TRAY SQUARE SMALL", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP004.png", "GS/IMP/004", undefined, 1199, "unisex", undefined, '5" x 5"'),
  createProduct("gs-5", "POOJA THALI", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP005.png", "GS/IMP/005", undefined, 2599, "unisex", undefined, '10"'),
  createProduct("gs-6", "BOWL", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP006.png", "GS/IMP/006", undefined, 1499, "unisex", undefined, '5"'),
  createProduct("gs-7", "GLASS TRAY B", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP007.png", "GS/IMP/007", undefined, 4499, "unisex", undefined, '14" x 10.7"'),
  createProduct("gs-8", "SWAN SPOON FORK SET (6-6)", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP008.png", "GS/IMP/008", undefined, 2799, "unisex", undefined, '6.5"'),
  createProduct("gs-9", "BARNI", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP009.png", "GS/IMP/009", undefined, 3499, "unisex", undefined, '7" x 5"'),
  createProduct("gs-10", "LOTA", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP010.png", "GS/IMP/010", undefined, 1799, "unisex", undefined, '4.2" x 4"'),
  createProduct("gs-11", "TRAY OVAL SMALL", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP011.png", "GS/IMP/011", undefined, 1199, "unisex", undefined, '6.5" x 5"'),
  createProduct("gs-12", "PEACOCK SUGAR POT ROUND", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP012.png", "GS/IMP/012", undefined, 1499, "unisex", undefined, '5" x 4"'),
  createProduct("gs-13", "AGARBATTI STAND", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP013.png", "GS/IMP/013", undefined, 599, "unisex", undefined, '1.7"'),
  createProduct("gs-14", "BELL", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP014.png", "GS/IMP/014", undefined, 699, "unisex", undefined, '4"'),
  createProduct("gs-15", "PEACOCK SUGAR POT WINGS", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP015.png", "GS/IMP/015", undefined, 1799, "unisex", undefined, '6"'),
  createProduct("gs-16", "BOTTLE GLASS", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP016.png", "GS/IMP/016", undefined, 1499, "unisex"),
  createProduct("gs-17", "KRISHNA POOJA THALI", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP017.png", "GS/IMP/017", undefined, 1199, "unisex"),
  createProduct("gs-18", "MUKHVAS SET (BOWL TRAY)", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP018.png", "GS/IMP/018", undefined, 4999, "unisex", undefined, '15"'),
  createProduct("gs-19", "PAN DRY FRUIT TRAY", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP019.png", "GS/IMP/019", undefined, 2399, "unisex", undefined, '8"'),
  createProduct("gs-20", "HEART RING BOX", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP020.png", "GS/IMP/020", undefined, 1599, "unisex", undefined, '3"'),
  createProduct("gs-21", "ROUND RING BOX", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP021.png", "GS/IMP/021", undefined, 1599, "unisex", undefined, '3"'),
  createProduct("gs-22", "BUTTERFLY RING BOX", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP022.png", "GS/IMP/022", undefined, 799, "unisex", undefined, '2.2" x 2.2"'),
  createProduct("gs-23", "FLOWER RING BOX", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP023.png", "GS/IMP/023", undefined, 599, "unisex", undefined, '2" x 2"'),
  createProduct("gs-24", "STONE IMP JEWELLERY BOX B", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP024.png", "GS/IMP/024", undefined, 2599, "unisex", undefined, '4" x 5"'),
  createProduct("gs-25", "JEWELLERY BOX RECTANGLE", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP025.png", "GS/IMP/025", undefined, 1999, "unisex", undefined, '4" x 5"'),
  createProduct("gs-26", "SWAN 2 PCS", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP026.png", "GS/IMP/026", undefined, 1799, "unisex", undefined, "6.5\" Approx"),
  createProduct("gs-27", "THALI", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP027.png", "GS/IMP/027", undefined, 3999, "unisex", undefined, '12"'),
  createProduct("gs-28", "HANGING MUKHVAS BOX", "german-silver", "German Silver", "/images/category/GERMAN SILVER/GSIMP028.png", "GS/IMP/028", undefined, 5599, "unisex"),

  // 11. SILVER COATED
  createProduct("sc-1", "KALASH SM", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO001.png", "SLCO/001", undefined, 999, "unisex", undefined, '2.25"'),
  createProduct("sc-2", "TABLE CLOCK M ONSTAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO002.png", "SLCO/002", undefined, 1199, "unisex", undefined, "2.5\" X 2.25\""),
  createProduct("sc-3", "MINI GANESHA TRUNK PEN STAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO003.png", "SLCO/003", undefined, 1499, "unisex", undefined, '3"'),
  createProduct("sc-4", "LAXMI CHARAN SM ONSTAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO004.png", "SLCO/004", undefined, 999, "unisex", undefined, '3"'),
  createProduct("sc-5", "LAXMI CHARAN MED ON STAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO005.png", "SLCO/005", undefined, 1399, "unisex", undefined, '4"'),
  createProduct("sc-6", "VASTU TORTOISE SM", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO006.png", "SLCO/006", undefined, 1399, "unisex", undefined, '2.25"'),
  createProduct("sc-7", "MINI GANESHA ON STAND", "silver-coated", "Silver Coated", "/images/collections/gifting.png", "SLCO/007", undefined, 999, "unisex", undefined, '1.7"'),
  createProduct("sc-8", "ASHOK STAMBH ON STAND BROWN", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO008.png", "SLCO/008", undefined, 2799, "unisex", undefined, '3.25"'),
  createProduct("sc-9", "CARD PEN ONSTAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO009.png", "SLCO/009", undefined, 2599, "unisex", undefined, '6"'),
  createProduct("sc-10", "MORDEN KRISHNA M BLACKSTAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO010.png", "SLCO/010", undefined, 2899, "unisex", undefined, '6.8" X 5.5"'),
  createProduct("sc-11", "NEST PEN STAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO011.png", "SLCO/011", undefined, 1899, "unisex", undefined, "3.5\" X 2.25\""),
  createProduct("sc-12", "HORSE GOLDEN BACK TT", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO012.png", "SLCO/012", undefined, 2799, "unisex", undefined, "9.5*4.5*16CM"),
  createProduct("sc-13", "HORSE SILVER", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO013.png", "SLCO/013", undefined, 2499, "unisex", undefined, "10*16*4.5CM"),
  createProduct("sc-14", "VEENA SM", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO014.png", "SLCO/014", undefined, 1699, "unisex", undefined, '3"'),
  createProduct("sc-15", "LAXMI JI & ELEPHANT OMSTAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO015.png", "SLCO/015", undefined, 2799, "unisex", undefined, '5"'),
  createProduct("sc-16", "PEACOCK CANDLESTAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO016.png", "SLCO/016", undefined, 1199, "unisex", undefined, '3"'),
  createProduct("sc-17", "FISH WAVE SM", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO017.png", "SLCO/017", undefined, 2199, "unisex", undefined, '3"'),

  // 12. SILVER IDOLS
  createProduct("id-1", "GANESH JI SM", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL001.png", "SL/001", "80T", 10199, "unisex", "22.6g", '1.2"'),
  createProduct("id-2", "RADHA KRISHNA", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL002.png", "SL/002", "925", 21599, "unisex", "30.9g", '2"'),
  createProduct("id-3", "DANCING GANESHA", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL003.png", "SL/003", "925", 24799, "unisex", "35.45g", '2"'),
  createProduct("id-4", "HANUMAN", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL004.png", "SL/004", "925", 28499, "unisex", "40.8g", '2.5"'),
  createProduct("id-5", "LAXMI JI SM", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL005.png", "SL/005", "80T", 9000, "unisex", "20g", '1.2"'),
  createProduct("id-6", "KAMDHENU", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL006.png", "SL/006", "999", 13499, "unisex", "17.93g", '2.2" X 2.25"'),
  createProduct("id-7", "KRISHNA WOODWN STAND", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL007.png", "SL/007", "999", 34600, "unisex", "45.3g", '3.5"'),
  createProduct("id-8", "RADHEKRISHNA WOODEN STAND", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL008.png", "SL/008", "999", 42000, "unisex", "55.3g", '5.25"'),
  createProduct("id-9", "DEEPAK BIG", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL009.png", "SL/009", "925", 22000, "unisex", "29.45g", '1.25" X 2.5"'),
  createProduct("id-10", "MAHAVEER (STANDING)", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL010.png", "SL/010", "999", 44599, "unisex", "59.45g", '5"'),
  createProduct("id-11", "FAIRY TAIL 01", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL011.png", "SL/011", "999", 17399, "unisex", "23.19g", '1.9"'),
  createProduct("id-12", "VASTU TORTOISE", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL012.png", "SL/012", "925", 14899, "unisex", "21.2g", '2.25"'),
  createProduct("id-13", "SHANKH DEEPAK", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL013.png", "SL/013", "925", 11199, "unisex", "16g", '0.75" X 2.25"'),
  createProduct("id-14", "TURTLE DEEPAK", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL014.png", "SL/014", "925", 30990, "unisex", "41.25g", '1.2" X 2"'),
  createProduct("id-15", "GANESHA SITTING M", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL015.png", "SL/015", "80T", 24999, "unisex", "55.9g", '1.7"'),
  createProduct("id-16", "GANESHA WHITE", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL016.png", "SL/016", "80T", 12150, "unisex", "27g", '1.5"'),
  createProduct("id-17", "LAXMI JI WHITE", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL017.png", "SL/017", "80T", 9200, "unisex", "20.45g", '1.75"'),
  createProduct("id-18", "FAIRY TAIL 02", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL018.png", "SL/018", "999", 13299, "unisex", "17.8g", '1.75"'),
  createProduct("id-19", "GANESHA 3FACE SM", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL019.png", "SL/019", "80T", 21199, "unisex", "47.15g", '2"'),
  createProduct("id-20", "COUPLE FLOWER", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL020.png", "SL/020", "999", 42249, "unisex", "56.25g", '4.25" X 2.7"'),
  createProduct("id-21", "COUPLE MOON", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL021.png", "SL/021", "999", 17999, "unisex", "23.9g", '3.3"'),
  createProduct("id-22", "COUPLE", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL022.png", "SL/022", "999", 27599, "unisex", "36.9g", '3.25"'),
  createProduct("id-23", "MAHAVEER SITTING", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL023.png", "SL/023", "999", 19000, "unisex", "25.52g", '3.8"'),
  createProduct("id-24", "GURU NANAK", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL024.png", "SL/024", "999", 31100, "unisex", "41.55g", '2.8"'),
  createProduct("id-25", "GANEHSA HOLLOW", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL025.png", "SL/025", "999", 27600, "unisex", "36.75g", '3.6"'),
  createProduct("id-26", "KAMDHENU TULSI WOODSTAND", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL026.png", "SL/026", "999", 47599, "unisex", "62.74g", '7.25"'),
  createProduct("id-27", "KAMDHENU STAND SILVER", "silver-idols", "Silver Idols", "/images/category/SILVER IDOL 999/SL027.png", "SL/027", "999", 21299, "unisex", "28.44g", '2.5" X 2.3"'),

  // 13. SILVER FRAMES
  createProduct("fr-1", "GANESH JI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 5500),
  createProduct("fr-2", "LAXMI JI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 5500),
  createProduct("fr-3", "TREE MURTI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 5800),
  createProduct("fr-4", "RADHE KRISHNA FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6500),
  createProduct("fr-5", "LADUU GOPAL FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 4500),
  createProduct("fr-6", "RAM DARBAR FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 7500),
  createProduct("fr-7", "SHIV PARIVAR FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 7200),
  createProduct("fr-8", "BALAJI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6800),
  createProduct("fr-9", "MAHAVEER SWAMI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6500),
  createProduct("fr-10", "RAM LALLA FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 7800),
  createProduct("fr-11", "SAI BABA FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 5200),
  createProduct("fr-12", "SHREENATH JI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6200),
  createProduct("fr-13", "HANUMAN JI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 5800),
  createProduct("fr-14", "KHATU SHYAM FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6500),
  createProduct("fr-15", "SALASAR BALAJI FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6800),
  createProduct("fr-16", "MAHALAXMI MAA FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6200),
  createProduct("fr-17", "UMIYA MAA FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6200),
  createProduct("fr-18", "GOGA MAHARAJ FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6200),
  createProduct("fr-19", "NAVAKAR MATRA FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 4500),
  createProduct("fr-20", "AMBE MAA FRAME", "silver-frames", "Frames", "/images/collections/gifting.png", undefined, "999", 6200),
];