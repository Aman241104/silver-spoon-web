# Phase 4: Product Catalog Guide

## 1. Product Data (JSON)
Create `src/data/products.json`:
```json
[
  {
    "id": "1",
    "name": "Classic Solitaire Ring",
    "category": "Rings",
    "subCategory": "Solitaire",
    "price": "Inquire for price",
    "images": ["/products/ring-1-1.jpg", "/products/ring-1-2.jpg"],
    "description": "Exquisite solitaire ring crafted in pure 925 sterling silver.",
    "featured": true
  },
  {
    "id": "2",
    "name": "Antique Lakshmi Diya",
    "category": "Pooja/Utensils",
    "subCategory": "Diya",
    "price": "Inquire for price",
    "images": ["/products/diya-1.jpg"],
    "description": "Handcrafted antique silver diya for auspicious occasions.",
    "featured": true
  }
]
```

## 2. Category Pages
Create dynamic routes in `src/app/collections/[slug]/page.tsx`:
- List all subcategories for a given category (e.g., Rings -> Solitaire, Antique, Cocktail).
- Show products filtered by category/slug.
- Elegant grid layout (2 columns mobile, 3-4 columns desktop).

## 3. Product Cards
Create `src/components/product/ProductCard.tsx`:
- Focus on clean, minimal aesthetics.
- Subdued price/inquiry labels.
- "Quick View" hover effect or direct link to details.
- Subtle fade-in animations on scroll (GSAP ScrollTrigger).
