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
  trending?: boolean;
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
    id: "earrings",
    name: "Earrings",
    slug: "earrings",
    description: "Stunning 925 silver earrings — studs, drops, and traditional jhumkas for every occasion.",
    subCategories: ["Studs", "Drop Earrings", "Jhumkas"]
  },
  {
    id: "bangles",
    name: "Ladies Bangadi",
    slug: "bangles",
    description: "Traditional 925 silver bangles (bangadi) crafted in classic and contemporary styles.",
    subCategories: ["Plain Bangles", "Enamel Bangles"]
  },
  {
    id: "chain-pendants",
    name: "Chain Pendants",
    slug: "chain-pendants",
    description: "Charming 925 silver chain pendant sets for every personality and occasion.",
    subCategories: ["Women's Pendants", "Unisex Pendants"]
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
  },
  {
    id: "rakhi",
    name: "Rakhi Collection",
    slug: "rakhi",
    description: "Pure silver rakhis and festive sets crafted for the bond of a lifetime.",
    subCategories: ["Silver Rakhi", "Rakhi Gift Sets", "Lumba Rakhi"]
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
  createProduct("sc-7", "MINI GANESHA ON STAND", "silver-coated", "Silver Coated", "/images/category/SILVER COATED/SLCO007.png", "SLCO/007", undefined, 999, "unisex", undefined, '1.7"'),
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

  // LADIES BRACELETS
  createProduct("lbr-001", "Triple Ring Multi-Strand Chain Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925001.png", "LBR925001", "925", 0, "women"),
  createProduct("lbr-002", "Pink CZ Tennis Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925002.png", "LBR925002", "925", 0, "women"),
  createProduct("lbr-003", "Diamond Butterfly CZ Station Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925003.png", "LBR925003", "925", 0, "women"),
  createProduct("lbr-004", "Circle of Love Engraved Multi-Strand Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925004.png", "LBR925004", "925", 0, "women"),
  createProduct("lbr-005", "Baguette & Pavé CZ Bangle", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925005.png", "LBR925005", "925", 0, "women"),
  createProduct("lbr-006", "Blue Butterfly & Pearl Open Cuff", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925006.png", "LBR925006", "925", 0, "women"),
  createProduct("lbr-007", "Sapphire Blue Butterfly Enamel Cuff", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925007.png", "LBR925007", "925", 0, "women"),
  createProduct("lbr-008", "Ocean Life Sea Turtle & Starfish Cuff", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925008.png", "LBR925008", "925", 0, "women"),
  createProduct("lbr-009", "Garden Bloom Floral Enamel Cuff", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925009.png", "LBR925009", "925", 0, "women"),
  createProduct("lbr-010", "I Love You Letter Chain Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925010.png", "LBR925010", "925", 0, "women"),
  createProduct("lbr-011", "Silver Woven Mesh Magnetic Clasp Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925011.png", "LBR925011", "925", 0, "women"),
  createProduct("lbr-012", "Oval Charm Drop Chain Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925012.png", "LBR925012", "925", 0, "women"),
  createProduct("lbr-013", "Butterfly Charm CZ Tennis Slider Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925013.png", "LBR925013", "925", 0, "women"),
  createProduct("lbr-014", "Diamond Drop Ornate Charm Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925014.png", "LBR925014", "925", 0, "women"),
  createProduct("lbr-015", "Rainbow Seed Bead Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925015.png", "LBR925015", "925", 0, "women"),
  createProduct("lbr-016", "Double Chain Crystal Cube Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925016.png", "LBR925016", "925", 0, "women"),
  createProduct("lbr-017", "Infinity Link CZ Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925017.png", "LBR925017", "925", 0, "women"),
  createProduct("lbr-018", "Infinity & CZ Diamond Station Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925018.png", "LBR925018", "925", 0, "women"),
  createProduct("lbr-019", "Daisy Flower CZ Leaf Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925019.png", "LBR925019", "925", 0, "women"),
  createProduct("lbr-020", "Infinity Heart CZ Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925020.png", "LBR925020", "925", 0, "women"),
  createProduct("lbr-021", "Tulip Vine CZ Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925021.png", "LBR925021", "925", 0, "women"),
  createProduct("lbr-022", "Blue Opal Crown Chain Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925022.png", "LBR925022", "925", 0, "women"),
  createProduct("lbr-024", "CZ Diamond Heart Pendant Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925024.png", "LBR925024", "925", 0, "women"),
  createProduct("lbr-026", "White Opal Lotus Floral Station Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925026.png", "LBR925026", "925", 0, "women"),
  createProduct("lbr-027", "Blue Opal & White CZ Butterfly Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925027.png", "LBR925027", "925", 0, "women"),
  createProduct("lbr-028", "White Opal Heart Chain Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/LBR925028.png", "LBR925028", "925", 0, "women"),
  createProduct("rlbr-029", "Rose Gold Multi-Charm Floral Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/RLBR925029.png", "RLBR925029", "925", 0, "women"),
  createProduct("rlbr-030", "Rose Gold Green Clover CZ Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/RLBR925030.png", "RLBR925030", "925", 0, "women"),
  createProduct("rlbr-031", "Rose Gold Infinity CZ Link Bracelet", "bracelets", "Women's Bracelets", "/images/category/ladies braclete/RLBR925031.png", "RLBR925031", "925", 0, "women"),

  // WOMEN RINGS
  createProduct("lr-001", "CZ Full Eternity Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR001.png", "LR001", "925", 0, "women"),
  createProduct("lr-002", "Ornate Sun Wheel CZ Statement Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR002.png", "LR002", "925", 0, "women"),
  createProduct("lr-003", "Chain Link CZ Solitaire Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR003.png", "LR003", "925", 0, "women"),
  createProduct("lr-004", "Hexagonal Bezel CZ Eternity Band", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR004.png", "LR004", "925", 0, "women"),
  createProduct("lr-005", "Love Script Open Silver Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR005.png", "LR005", "925", 0, "women"),
  createProduct("lr-006", "Triple CZ Solitaire Pavé Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR006.png", "LR006", "925", 0, "women"),
  createProduct("lr-007", "Green Solitaire Clover Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR007.png", "LR007", "925", 0, "women"),
  createProduct("lr-008", "Oxidised Celtic Infinity Eternity Band", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR008.png", "LR008", "925", 0, "women"),
  createProduct("lr-009", "Oxidised Filigree CZ Solitaire Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR009.png", "LR009", "925", 0, "women"),
  createProduct("lr-011", "Ruby & CZ Pear Cluster Half Eternity Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR011.png", "LR011", "925", 0, "women"),
  createProduct("lr-012", "Handshake Friendship Fede Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR012.png", "LR012", "925", 0, "women"),
  createProduct("lr-013", "Ruby Oval CZ Halo Cocktail Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR013.png", "LR013", "925", 0, "women"),
  createProduct("lr-014", "Open CZ Flower & Bezel Bypass Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR014.png", "LR014", "925", 0, "women"),
  createProduct("lr-015", "CZ Shooting Star Chevron Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR015.png", "LR015", "925", 0, "women"),
  createProduct("lr-016", "Pink Enamel Peacock Scroll Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR016.png", "LR016", "925", 0, "women"),
  createProduct("lr-017", "Sapphire Blue & CZ Alternating Half Eternity Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR017.png", "LR017", "925", 0, "women"),
  createProduct("lr-018", "Diagonal Leaf Engraved Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR018.png", "LR018", "925", 0, "women"),
  createProduct("lr-019", "CZ Pavé Full Eternity Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR019.png", "LR019", "925", 0, "women"),
  createProduct("lr-020", "Celtic Rope Engraved Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR020.png", "LR020", "925", 0, "women"),
  createProduct("lr-021", "Wave CZ Dome Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR021.png", "LR021", "925", 0, "women"),
  createProduct("lr-022", "Multicolour CZ Dome Cocktail Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR022.png", "LR022", "925", 0, "women"),
  createProduct("lr-023", "Pink & Black CZ Star Dome Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR023.png", "LR023", "925", 0, "women"),
  createProduct("lr-024", "Pink & Black CZ Eternity Band", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR024.png", "LR024", "925", 0, "women"),
  createProduct("lr-025", "Ruby Marquise Flower Cluster Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR025.png", "LR025", "925", 0, "women"),
  createProduct("lr-026", "Triple Stripe Engraved Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR026.png", "LR026", "925", 0, "women"),
  createProduct("lr-027", "Oxidised Diagonal Stripe Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR027.png", "LR027", "925", 0, "women"),
  createProduct("lr-028", "Engraved Star & Flower Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR028.png", "LR028", "925", 0, "women"),
  createProduct("lr-029", "Diamond-Cut Crosshatch Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR029.png", "LR029", "925", 0, "women"),
  createProduct("lr-030", "LOVE Engraved Silver Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR030.png", "LR030", "925", 0, "women"),
  createProduct("lr-031", "Green Opal Floral Filigree Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR031.png", "LR031", "925", 0, "women"),
  createProduct("lr-032", "Ruby & CZ Alternating Full Eternity Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR032.png", "LR032", "925", 0, "women"),
  createProduct("lr-033", "Oval CZ Halo Solitaire Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR033.png", "LR033", "925", 0, "women"),
  createProduct("lr-034", "Sapphire Blue & Baguette CZ Full Eternity Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR034.png", "LR034", "925", 0, "women"),
  createProduct("lr-035", "Round CZ Solitaire Pavé Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR035.png", "LR035", "925", 0, "women"),
  createProduct("lr-036", "Twin Pink Heart Toi et Moi Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR036.png", "LR036", "925", 0, "women"),
  createProduct("lr-037", "White Opal Butterfly Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR037.png", "LR037", "925", 0, "women"),
  createProduct("lr-038", "Moonstone Crown Heart Stacking Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR038.png", "LR038", "925", 0, "women"),
  createProduct("lr-039", "Lavender CZ Floral Six-Prong Solitaire Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR039.png", "LR039", "925", 0, "women"),
  createProduct("lr-040", "Twisted Rope CZ Knot Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR040.png", "LR040", "925", 0, "women"),
  createProduct("lr-041", "Princess CZ Square Halo Cocktail Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR041.png", "LR041", "925", 0, "women"),
  createProduct("lr-042", "Round CZ Scroll Shoulder Solitaire Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR042.png", "LR042", "925", 0, "women"),
  createProduct("lr-043", "Round CZ Infinity Shoulder Solitaire Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR043.png", "LR043", "925", 0, "women"),
  createProduct("lr-044", "Lavender CZ Sunburst Halo Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR044.png", "LR044", "925", 0, "women"),
  createProduct("lr-045", "Wide Filigree Lace Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR045.png", "LR045", "925", 0, "women"),
  createProduct("lr-046", "Princess CZ Pavé Channel Band Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR046.png", "LR046", "925", 0, "women"),
  createProduct("lr-047", "Round CZ Micro-Pavé Shoulder Solitaire Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR047.png", "LR047", "925", 0, "women"),
  createProduct("lr-048", "Princess CZ Classic Pavé Solitaire Ring", "rings", "Women's Rings", "/images/category/WOMEN RINGS/LR048.png", "LR048", "925", 0, "women"),

  // EARRINGS
  createProduct("er-001", "White Enamel Flower Pearl Stud Earrings", "earrings", "Studs", "/images/category/STUDS/JHUKA/EARRINGS/ER001.png", "ER001", "925", 0, "women"),
  createProduct("er-002", "White Opal Teardrop CZ Halo Drop Earrings", "earrings", "Drop Earrings", "/images/category/STUDS/JHUKA/EARRINGS/ER002.png", "ER002", "925", 0, "women"),
  createProduct("er-003", "Baguette & Pavé CZ Cushion Stud Earrings", "earrings", "Studs", "/images/category/STUDS/JHUKA/EARRINGS/ER003.png", "ER003", "925", 0, "women"),
  createProduct("er-004", "Baguette & Pavé CZ Round Stud Earrings", "earrings", "Studs", "/images/category/STUDS/JHUKA/EARRINGS/ER004.png", "ER004", "925", 0, "women"),
  createProduct("er-005", "Oval Pavé CZ Double Halo Stud Earrings", "earrings", "Studs", "/images/category/STUDS/JHUKA/EARRINGS/ER005.png", "ER005", "925", 0, "women"),
  createProduct("er-006", "Pearl Flower & CZ Snowflake Drop Earrings", "earrings", "Drop Earrings", "/images/category/STUDS/JHUKA/EARRINGS/ER006.png", "ER006", "925", 0, "women"),
  createProduct("er-010", "Multi-Layer Open Heart Drop Earrings", "earrings", "Drop Earrings", "/images/category/STUDS/JHUKA/EARRINGS/ER010.png", "ER010", "925", 0, "women"),
  createProduct("erjh-007", "Oxidised Floral Top Beaded Jhumka Earrings", "earrings", "Jhumkas", "/images/category/STUDS/JHUKA/EARRINGS/ERJH007.png", "ERJH007", "925", 0, "women"),

  // LADIES BANGADI
  createProduct("lbng-001", "Twisted Engraved Silver Bangle Pair", "bangles", "Plain Bangles", "/images/category/LADIES BANGADI/LBNG 001.png", "LBNG001", "925", 0, "women"),
  createProduct("lbng-002", "Ball Cap Textured Silver Bangle Pair", "bangles", "Plain Bangles", "/images/category/LADIES BANGADI/LBNG002.png", "LBNG002", "925", 0, "women"),
  createProduct("lbng-003", "Antique Engraved Ruby & Navy Enamel Bangle Pair", "bangles", "Enamel Bangles", "/images/category/LADIES BANGADI/LBNG003.png", "LBNG003", "925", 0, "women"),
  createProduct("lbng-004", "Multicolour Enamel Bead Bangle Pair", "bangles", "Enamel Bangles", "/images/category/LADIES BANGADI/LBNG004.png", "LBNG004", "925", 0, "women"),
  createProduct("lbng-005", "Diamond-Cut Sparkle Silver Bangle Pair", "bangles", "Plain Bangles", "/images/category/LADIES BANGADI/LBNG005.png", "LBNG005", "925", 0, "women"),
  createProduct("lbng-006", "Frosted Textured Silver Bangle Pair", "bangles", "Plain Bangles", "/images/category/LADIES BANGADI/LBNG006.png", "LBNG006", "925", 0, "women"),
  createProduct("lbng-007", "Dual Finish Frosted & Polished Silver Bangle Pair", "bangles", "Plain Bangles", "/images/category/LADIES BANGADI/LBNG007.png", "LBNG007", "925", 0, "women"),

  // CHAIN PENDANTS
  createProduct("chnp-001", "White Enamel Sea Turtle Pendant Chain", "chains", "Women's Chains", "/images/category/CHAIN PANDENT/CHNP001.png", "CHNP001", "925", 0, "women"),
  createProduct("chnp-002", "Pink Barbie Handbag Charm Pendant Chain", "chains", "Women's Chains", "/images/category/CHAIN PANDENT/CHNP002.png", "CHNP002", "925", 0, "women"),
  createProduct("chnp-003", "CZ Love Script Pendant Chain", "chains", "Women's Chains", "/images/category/CHAIN PANDENT/CHNP003.png", "CHNP003", "925", 0, "women"),
  createProduct("chnp-004", "CZ Love Script Snake Chain Pendant", "chains", "Women's Chains", "/images/category/CHAIN PANDENT/CHNP004.png", "CHNP004", "925", 0, "women"),
  createProduct("chnp-005", "Oxidised CZ Love Script Ball Chain Pendant", "chains", "Women's Chains", "/images/category/CHAIN PANDENT/CHNP005.png", "CHNP005", "925", 0, "women"),
  createProduct("chnp-006", "Articulated Fish Skeleton Pendant Chain", "chains", "Unisex Chains", "/images/category/CHAIN PANDENT/CHNP006.png", "CHNP006", "925", 0, "unisex"),
  createProduct("chnp-007", "Orange Spotted Dinosaur Enamel Charm Pendant", "chains", "Unisex Chains", "/images/category/CHAIN PANDENT/CHNP007.png", "CHNP007", "925", 0, "unisex"),
  createProduct("chnp-008", "Lucky Elephant CZ Charm Pendant Chain", "chains", "Women's Chains", "/images/category/CHAIN PANDENT/CHNP008.png", "CHNP008", "925", 0, "women"),
  createProduct("chnp-009", "CZ Aeroplane Pendant Chain", "chains", "Unisex Chains", "/images/category/CHAIN PANDENT/CHNP009.png", "CHNP009", "925", 0, "unisex"),
  createProduct("chnp-010", "Oxidised CZ Star Flower Pendant Chain", "chains", "Women's Chains", "/images/category/CHAIN PANDENT/CHNP010.png", "CHNP010", "925", 0, "women"),
  createProduct("chnp-011", "Yellow Panda Enamel Charm Pendant Chain", "chains", "Unisex Chains", "/images/category/CHAIN PANDENT/CHNP011.png", "CHNP011", "925", 0, "unisex"),
  createProduct("chnp-012", "Blue Bird Open Heart Pendant Chain", "chains", "Women's Chains", "/images/category/CHAIN PANDENT/CHNP012.png", "CHNP012", "925", 0, "women"),
  createProduct("chnp-013", "Blue Bell Enamel Pendant Chain", "chains", "Women's Chains", "/images/category/CHAIN PANDENT/CHNP013.png", "CHNP013", "925", 0, "women"),

  // 13. SILVER FRAMES
  createProduct("fr-1", "Laddu Gopal Silver & White Frame", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR001.png", "FR/001", "999", 0),
  createProduct("fr-2", "Radhe Krishna Blue Acrylic Clock & Pen Stand", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR002.png", "FR/002", "999", 0),
  createProduct("fr-3", "Laxmi Ji Blue Acrylic Cutout Stand", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR003.png", "FR/003", "999", 0),
  createProduct("fr-4", "Ganesh Ji Blue Acrylic Cutout Stand", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR004.png", "FR/004", "999", 0),
  createProduct("fr-5", "Laxmi Ganesh Shubh Labh White & Gold Frame", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR005.png", "FR/005", "999", 0),
  createProduct("fr-6", "Ganesh Ji White & Silver Scalloped Frame", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR006.png", "FR/006", "999", 0),
  createProduct("fr-7", "Ganesh Laxmi Saraswati White & Silver Frame", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR007.png", "FR/007", "999", 0),
  createProduct("fr-8", "Radhe Krishna White & Silver Floral Frame", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR008.png", "FR/008", "999", 0),
  createProduct("fr-9", "Ram Darbar White & Silver Heart Border Frame", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR009.png", "FR/009", "999", 0),
  createProduct("fr-10", "Radhe Krishna Blue Acrylic Cutout Stand", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR010.png", "FR/010", "999", 0),
  createProduct("fr-11", "Ganesh Ji Clear Acrylic Block Stand", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR011.png", "FR/011", "999", 0),
  createProduct("fr-12", "Ram Mandir White & Silver Frame", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR012.png", "FR/012", "999", 0),
  createProduct("fr-13", "Radhe Krishna Clear Leaf-Shaped Acrylic Stand", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR013.png", "FR/013", "999", 0),
  createProduct("fr-14", "Laddu Gopal Clear Leaf-Shaped Acrylic Stand", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR014.png", "FR/014", "999", 0),
  createProduct("fr-15", "Radhe Krishna Clear Acrylic Block Stand", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR015.png", "FR/015", "999", 0),
  createProduct("fr-16", "Laddu Gopal Clear Leaf-Shaped Acrylic Stand", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR016.png", "FR/016", "999", 0),
  createProduct("fr-17", "Laxmi Ji White & Silver Heart Border Frame", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR017.png", "FR/017", "999", 0),
  createProduct("fr-18", "Laddu Gopal White & Gold Ornate Frame", "silver-frames", "Frames", "/images/category/SILVER FRAMES/FR018.png", "FR/018", "999", 0),

];