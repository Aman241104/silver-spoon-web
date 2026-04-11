# Phase 5: Product Details & WhatsApp Inquiry Guide

## 1. Product Gallery
Create `src/components/product/ProductGallery.tsx`:
- Use a slider library (like `embla-carousel-react`) or a custom grid.
- Zoom feature for viewing intricate silver details.
- High-quality, original images are critical for silver texture.

## 2. Inquiry System (The WhatsApp Hook)
Create `src/components/product/InquireButton.tsx`:
```tsx
const InquireButton = ({ productName, productCategory }: any) => {
  const WHATSAPP_NUMBER = "+91XXXXXXXXXX"; // Replace with actual number
  const message = `Hi Silver Spoon, I am interested in the "${productName}" from your ${productCategory} collection. Could you please share more details like weight and price?`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white hover:bg-[#128C7E] transition-all font-medium tracking-wide uppercase text-sm"
    >
      Inquire on WhatsApp
    </a>
  );
};
```

## 3. Product Detail View
Create dynamic route `src/app/product/[id]/page.tsx`:
- Detailed description.
- Specifications (Material: 925 Sterling Silver, Weight: Approx Xg).
- Shipping & Return policies.
- Related Products slider at the bottom.
