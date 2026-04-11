# Phase 3: Homepage Development Guide

## 1. Hero Section
Create `src/components/sections/Hero.tsx`:
- Use GSAP for entry animations.
- Large, high-resolution imagery of silver jewellery.
- Headline: "Elegance in Every Detail" or "Premium Silver for Timeless Moments."
- CTA: "Explore Collections."

```tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen flex items-center justify-center bg-silver-50">
      <div className="max-w-4xl text-center">
        <h1 className="hero-text text-6xl md:text-8xl mb-6 font-serif text-charcoal tracking-tight">
          Silver Spoon
        </h1>
        <p className="hero-text text-lg md:text-xl text-charcoal/70 mb-8 max-w-xl mx-auto uppercase tracking-widest">
          The Art of Pure Silver & Gifting
        </p>
        <div className="hero-text">
          <button className="px-10 py-4 bg-charcoal text-white hover:bg-silver-800 transition-colors uppercase tracking-widest text-sm">
            View Collections
          </button>
        </div>
      </div>
    </section>
  );
}
```

## 2. Featured Categories
Create `src/components/sections/Categories.tsx`:
- 3 main cards: "Silver Jewellery," "Pooja & Idols," "German Silver Gifts."
- Use hover effects (zoom-in on image) for a premium feel.
- Grid layout with responsive column counts.

## 3. Brand Philosophy
Create `src/components/sections/Philosophy.tsx`:
- Minimalist text and a single high-quality image.
- Content about "Purity, Heritage, and Modern Design."
- Highlight 925 and 999 silver certifications.
