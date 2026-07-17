import { Suspense } from "react";
import { getCategoryImages, getCategoryFormOptions } from "@/lib/db";
import { categories } from "@/data/products";
import CategoryImageEditCard from "@/components/admin/CategoryImageEditCard";
import NewCategoryForm from "@/components/admin/NewCategoryForm";

function slugToName(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const HARDCODED: Record<string, string> = {
  brooches:          "/images/category/SILVER 925 BROOCH/BRO001.jpg",
  rings:             "/images/category/WOMEN RINGS/LR001.jpg",
  bracelets:         "/images/category/ladies braclete/LBR925001.jpg",
  chains:            "/images/category/MAINS CHAIN/MCH001.jpg",
  kadas:             "/images/category/PANJABI KADA MENS SEGMENT/PBK010.jpg",
  anklets:           "/images/category/Anklets/PYL011.jpg",
  "toe-rings":       "/images/category/TOE RING BICHIYA/TR022P2.jpg",
  mangalsutra:       "/images/category/Mangalsutra/oxidised-floral-ruby-jade-pendant-mangalsutra.jpeg",
  utensils:          "/images/products/silver-filigree-bottle-set.png",
  "german-silver":   "/images/category/GERMAN SILVER/GSIMP001.jpg",
  "silver-coated":   "/images/category/SILVER COATED/SLCO001.jpg",
  "silver-idols":    "/images/category/SILVER IDOL 999/SL001.jpg",
  "silver-frames":   "/images/category/SILVER FRAMES/FR001.jpg",
  earrings:          "/images/category/STUDS/JHUKA/EARRINGS/ER001.jpg",
  bangles:           "/images/category/LADIES BANGADI/LBNG 001.jpg",
  "chain-pendants":  "/images/category/CHAIN PANDENT/CHNP001.jpg",
  men:               "/images/collections/men-category-new.png",
  women:             "/images/collections/women-category.png",
  rakhi:             "/images/category/SILVER 925 RAKHI BRACELATE/RAKHI001.jpg",
};

const DISPLAY_CATS = categories.filter(c => !["coins"].includes(c.id));

const HARDCODED_SLUGS = new Set(DISPLAY_CATS.map((c) => c.slug));

async function CategoryList() {
  const dbImages = await getCategoryImages();
  const imageMap = { ...HARDCODED, ...dbImages };

  const allOptions = await getCategoryFormOptions();
  const nameBySlug = Object.fromEntries(allOptions.map((o) => [o.id, o.name]));

  const customSlugs = Object.keys(dbImages).filter((s) => !HARDCODED_SLUGS.has(s));

  return (
    <div className="space-y-3">
      {DISPLAY_CATS.map((cat) => (
        <CategoryImageEditCard
          key={cat.slug}
          slug={cat.slug}
          name={cat.name}
          currentImage={imageMap[cat.slug] ?? ""}
        />
      ))}

      {customSlugs.length > 0 && (
        <>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pt-4 pb-1">
            Custom Categories
          </p>
          {customSlugs.map((slug) => (
            <CategoryImageEditCard
              key={slug}
              slug={slug}
              name={nameBySlug[slug] ?? slugToName(slug)}
              currentImage={dbImages[slug]}
              showDelete
            />
          ))}
        </>
      )}
    </div>
  );
}

export default function AdminCategoryImagesPage() {
  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Category Images</h2>
          <p className="text-gray-400 text-sm mt-1">
            Set the hero image for each category on the{" "}
            <code className="font-mono text-xs">/products</code> page. Add new categories or update existing ones.
          </p>
        </div>
        <NewCategoryForm />
      </div>

      <Suspense
        fallback={
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 p-5 flex gap-4 items-center">
                <div className="w-24 h-24 bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                  <div className="h-8 bg-gray-100 rounded" />
                </div>
                <div className="w-16 h-9 bg-gray-200 rounded shrink-0" />
              </div>
            ))}
          </div>
        }
      >
        <CategoryList />
      </Suspense>
    </div>
  );
}
