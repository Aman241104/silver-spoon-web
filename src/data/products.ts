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
  createProduct("sc-1", "KALASH SM", "silver-coated", "Silver Coated", "/images/collections/gifting.png", undefined, undefined, 1200),
  createProduct("sc-2", "TABLE CLOCK M ONSTAND", "silver-coated", "Silver Coated", "/images/collections/gifting.png", undefined, undefined, 2500),
  createProduct("sc-3", "MINI GANESHA TRUNK PEN STAND", "silver-coated", "Silver Coated", "/images/collections/gifting.png", undefined, undefined, 1500),
  createProduct("sc-4", "ROMANTIC COUPLE ON MOON", "silver-coated", "Silver Coated", "/images/products/romantic-couple-moon.png", undefined, undefined, 3200),
  createProduct("sc-5", "ROMANTIC COUPLE UNDER ARCH", "silver-coated", "Silver Coated", "/images/products/romantic-couple-arch.png", undefined, undefined, 3800),
  createProduct("sc-6", "GUARDIAN ANGEL FIGURINE", "silver-coated", "Silver Coated", "/images/products/silver-angel-figurine.png", undefined, undefined, 2500),
  createProduct("sc-7", "SERENE MINI ANGEL", "silver-coated", "Silver Coated", "/images/products/silver-angel-mini.png", undefined, undefined, 1800),
  createProduct("sc-8", "ROMANTIC COUPLE IN EVENING WEAR", "silver-coated", "Silver Coated", "/images/products/romantic-couple-evening.png", undefined, undefined, 3500),
  createProduct("sc-9", "ASHOKA PILLAR EMBLEM", "silver-coated", "Silver Coated", "/images/products/ashoka-pillar.png", undefined, undefined, 4500),
  createProduct("sc-10", "ORNATE FLORAL TABLE CLOCK", "silver-coated", "Silver Coated", "/images/products/ornate-floral-clock.png", undefined, undefined, 3800),
  createProduct("sc-11", "FLORAL DESK PEN STAND & CARD HOLDER", "silver-coated", "Silver Coated", "/images/products/floral-desk-set.png", undefined, undefined, 2800),
  createProduct("sc-12", "ORNATE SWASTIKA KALASH", "silver-coated", "Silver Coated", "/images/products/swastika-kalash.png", undefined, undefined, 1800),

  // 12. SILVER IDOLS
  createProduct("id-1", "DIVINE GANESHA IDOL", "silver-idols", "Silver Idols", "/images/products/sitting-ganesha-lotus.png", undefined, "999/925", 8500),
  createProduct("id-2", "RADHA KRISHNA ON WOODEN BASE", "silver-idols", "Silver Idols", "/images/products/radha-krishna-wooden-base.png", undefined, "999", 12500),
  createProduct("id-3", "NATRAJ GANESHA IDOL", "silver-idols", "Silver Idols", "/images/products/dancing-ganesha-idol.png", undefined, "999/925", 9500),
  createProduct("id-18", "RADHA KRISHNA CLASSIC IDOL", "silver-idols", "Silver Idols", "/images/products/radha-krishna-classic.png", undefined, "999", 11000),
  createProduct("id-19", "RADHA KRISHNA ANTIQUE HALO IDOL", "silver-idols", "Silver Idols", "/images/products/radha-krishna-antique-halo.png", undefined, "999", 13500),
  createProduct("id-4", "DIVINE HANUMAN IDOL", "silver-idols", "Silver Idols", "/images/products/hanuman-idol.png", undefined, "999", 7500),
  createProduct("id-5", "KAMADHENU COW & CALF IDOL", "silver-idols", "Silver Idols", "/images/products/kamadhenu-cow-idol-v2.png", undefined, "999", 8200),
  createProduct("id-6", "SILVER KURMA TORTOISE", "silver-idols", "Silver Idols", "/images/products/silver-tortoise-idol.png", undefined, "999", 3500),
  createProduct("id-7", "GANESHA ON LOTUS IDOL", "silver-idols", "Silver Idols", "/images/products/ganesha-lotus-idol.png", undefined, "999", 8800),
  createProduct("id-8", "LORD NARAYANA SERPENT IDOL", "silver-idols", "Silver Idols", "/images/products/narayana-serpent-idol.png", undefined, "999", 11500),
  createProduct("id-9", "KRISHNA WITH TULSI SET", "silver-idols", "Silver Idols", "/images/products/krishna-tulsi-set.png", undefined, "999", 14500),
  createProduct("id-10", "GURU NANAK DEV JI IDOL", "silver-idols", "Silver Idols", "/images/products/guru-nanak-idol.png", undefined, "999", 9500),
  createProduct("id-11", "SITTING GANESHA IDOL", "silver-idols", "Silver Idols", "/images/products/ganesha-sitting-idol.png", undefined, "999", 7200),
  createProduct("id-12", "PANCHAMUKHI GANESHA ON THRONE", "silver-idols", "Silver Idols", "/images/products/panchamukhi-ganesha-idol.png", undefined, "999", 15500),
  createProduct("id-13", "LORD PARSHVANATH IDOL", "silver-idols", "Silver Idols", "/images/products/parshvanath-tirthankara-idol.png", undefined, "999", 12800),
  createProduct("id-14", "DIVINE LAKSHMI ON LOTUS", "silver-idols", "Silver Idols", "/images/products/sitting-lakshmi-lotus.png", undefined, "999", 8500),
  createProduct("id-15", "MINI GANESHA ON LOTUS", "silver-idols", "Silver Idols", "/images/products/mini-ganesha-lotus.png", undefined, "999", 2500),
  createProduct("id-16", "ANTIQUE LAKSHMI ON LOTUS", "silver-idols", "Silver Idols", "/images/products/sitting-lakshmi-antique.png", undefined, "999", 9200),
  createProduct("id-17", "COW CALF & TULSI WOODEN SET", "silver-idols", "Silver Idols", "/images/products/cow-calf-tulsi-set.png", undefined, "999", 18500),
  createProduct("id-20", "GANESHA WITH TURBAN ON TREE TRUNK", "silver-idols", "Silver Idols", "/images/products/ganesha-turban-tree.png", undefined, "999", 7500),
  createProduct("id-21", "DIVINE LAXMI CHARAN PADUKA", "silver-idols", "Silver Idols", "/images/products/laxmi-charan.png", undefined, "999", 4200),
  createProduct("id-22", "ORNATE SILVER KURMA TORTOISE", "silver-idols", "Silver Idols", "/images/products/ornate-kurma-tortoise.png", undefined, "999", 4800),

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