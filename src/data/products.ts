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
  // Women's Jewellery
  {
    id: "w-ring-1",
    name: "Classic Solitaire Ring",
    category: "jewellery",
    subCategory: "Rings",
    gender: "women",
    description: "Elegant 925 sterling silver solitaire ring with a brilliant-cut stone.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "w-neck-1",
    name: "Floral Silver Necklace",
    category: "jewellery",
    subCategory: "Necklace",
    gender: "women",
    description: "Intricately designed floral patterns in pure sterling silver.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
  },
  // Men's Jewellery
  {
    id: "m-brace-1",
    name: "Bold Silver Kada",
    category: "jewellery",
    subCategory: "Bracelets",
    gender: "men",
    description: "Heavy weight 925 silver kada for a bold masculine look.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "m-ring-1",
    name: "Signature Signet Ring",
    category: "jewellery",
    subCategory: "Rings",
    gender: "men",
    description: "Classic signet ring in polished silver for the modern man.",
    image: "https://images.unsplash.com/photo-1603561591411-071c4f71a21a?q=80&w=800&auto=format&fit=crop",
  },
  // Kids
  {
    id: "k-anklet-1",
    name: "Tiny Bells Anklet",
    category: "jewellery",
    subCategory: "Anklets",
    gender: "kids",
    description: "Soft silver anklets with gentle tinkling bells for kids.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
  },
  // Pooja & Idols
  {
    id: "idol-1",
    name: "Pure Silver Ganesha",
    category: "pooja-idols",
    subCategory: "Idols",
    description: "Pure 999 silver Ganesha idol, perfect for home pooja or gifting.",
    image: "https://images.unsplash.com/photo-1567591974574-e862630b79df?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "diya-1",
    name: "Traditional Silver Diya",
    category: "pooja-idols",
    subCategory: "Pooja Utensils",
    description: "Beautifully detailed silver diya with traditional patterns.",
    image: "https://images.unsplash.com/photo-1603912190130-97424cc768e1?q=80&w=800&auto=format&fit=crop",
  },
];

export const categories = [
  { id: "jewellery", name: "Jewellery", slug: "jewellery", description: "A timeless collection of silver rings, bracelets, and necklaces." },
  { id: "pooja-idols", name: "Pooja & Idols", slug: "pooja-idols", description: "Divine silver idols and essentials for your spiritual practices." },
  { id: "gifting", name: "Gifting", slug: "gifting", description: "Elegant silver items perfect for celebrations and corporate gifts." },
  { id: "coins", name: "Silver Coins", slug: "coins", description: "Pure 999 silver coins for investment and gifting." },
  { id: "men", name: "Men's Collection", slug: "men", description: "Masculine silver jewellery for the modern man." },
  { id: "women", name: "Women's Collection", slug: "women", description: "Elegant and stylish silver jewellery for her." },
];
