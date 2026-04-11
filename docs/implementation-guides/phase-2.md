# Phase 2: Design System & Core Components Guide

## 1. Typography & Colors
Ensure `tailwind.config.ts` reflects the silver-charcoal theme. Create a `Typography.tsx` component (or global CSS) for headings:
```css
/* src/styles/globals.css */
@layer base {
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif;
  }
}
```

## 2. Shared Components
Create a `src/components/ui/Button.tsx`:
```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = ({ className, children, ...props }: any) => (
  <button
    className={cn(
      "px-6 py-3 border border-charcoal/20 bg-white hover:bg-charcoal hover:text-white transition-all duration-300 font-medium tracking-wide",
      className
    )}
    {...props}
  >
    {children}
  </button>
);
```

## 3. Navigation Bar
Create a `src/components/layout/Navbar.tsx`:
- Transparent header with silver/charcoal accents.
- Sticky position.
- Lucide icons for Search, Heart (wishlist concept), and Menu.
- GSAP animation for scrolling effects (background change on scroll).

## 4. Footer
Create a `src/components/layout/Footer.tsx`:
- Links to categories.
- Social icons (Instagram, Facebook).
- Newsletter signup with a "Premium Club" feel.
- Copyright and location details.
