export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  description: string;
  image: string;
  featured?: boolean;
}

export const products: Product[] = [
  // Rings
  {
    id: "ring-1",
    name: "Classic Solitaire Ring",
    category: "jewellery",
    subCategory: "Rings",
    description: "Elegant 925 sterling silver solitaire ring with a brilliant-cut stone.",
    image: "/products/ring-1.jpg",
    featured: true,
  },
  {
    id: "ring-2",
    name: "Antique Silver Band",
    category: "jewellery",
    subCategory: "Rings",
    description: "Intricately carved antique finish silver band.",
    image: "/products/ring-2.jpg",
  },
  // Pooja & Idols
  {
    id: "idol-1",
    name: "Handcrafted Ganesha Idol",
    category: "pooja-idols",
    subCategory: "Idols",
    description: "Pure 999 silver Ganesha idol, perfect for home pooja or gifting.",
    image: "/products/idol-1.jpg",
    featured: true,
  },
  {
    id: "diya-1",
    name: "Nakshi Work Diya",
    category: "pooja-idols",
    subCategory: "Pooja Utensils",
    description: "Beautifully detailed silver diya with traditional Nakshi patterns.",
    image: "/products/diya-1.jpg",
  },
  // Gifting
  {
    id: "gift-1",
    name: "Silver Thali Set",
    category: "gifting",
    subCategory: "German Silver",
    description: "Complete German silver thali set for ceremonies and gifting.",
    image: "/products/gift-1.jpg",
    featured: true,
  },
];

export const categories = [
  {
    id: "jewellery",
    name: "Exquisite Jewellery",
    slug: "jewellery",
    description: "A timeless collection of silver rings, bracelets, and necklaces.",
  },
  {
    id: "pooja-idols",
    name: "Sacred Pooja & Idols",
    slug: "pooja-idols",
    description: "Divine silver idols and essentials for your spiritual practices.",
  },
  {
    id: "gifting",
    name: "Luxury Gifting",
    slug: "gifting",
    description: "Elegant silver items perfect for celebrations and corporate gifts.",
  },
];
