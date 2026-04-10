# Phase 1: Project Setup & Infrastructure Guide

## 1. Initialization
Run the following command to initialize the Next.js project:
```bash
npx create-next-app@latest silver-spoon-web --typescript --tailwind --eslint --app
```
Choose the following options:
- **Project name:** silver-spoon-web
- **TypeScript:** Yes
- **ESLint:** Yes
- **Tailwind CSS:** Yes
- **src/ directory:** Yes
- **App Router:** Yes
- **Import alias (@/*):** Yes

## 2. Dependencies
Install the required packages:
```bash
npm install gsap lucide-react clsx tailwind-merge framer-motion
```
- `gsap`: For premium animations.
- `lucide-react`: For high-quality, lightweight icons.
- `clsx` and `tailwind-merge`: For cleaner Tailwind class management.
- `framer-motion`: For simple layout animations (optional, but good for simple interactions).

## 3. Project Structure
Organize your `src` directory as follows:
```
src/
├── app/                  # App router pages
├── components/           # Reusable components
│   ├── ui/               # Base UI elements (buttons, inputs)
│   ├── layout/           # Layout components (navbar, footer)
│   ├── sections/         # Homepage/Page sections
│   └── product/          # Product-related components
├── lib/                  # Utility functions (gsap, constants)
├── hooks/                # Custom React hooks
├── data/                 # Product JSON and static content
├── styles/               # Global CSS
└── types/                # TypeScript interfaces
```

## 4. Global Styles & Tailwind Configuration
Update `tailwind.config.ts` with custom colors and fonts:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: {
          50: "#f9f9f9",
          100: "#f2f2f2",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        platinum: "#E5E4E2",
        charcoal: "#36454F",
        gold: "#D4AF37", // Use sparingly for accents
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

Update `src/app/layout.tsx` to include Google Fonts (Playfair Display and Inter):
```typescript
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-white text-charcoal font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```
