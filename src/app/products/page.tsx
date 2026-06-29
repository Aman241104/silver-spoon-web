import { Suspense } from "react";
import { Diamond } from "lucide-react";
import { getAllProducts, getCategoryImages } from "@/lib/db";
import ProductsContent from "@/components/products/ProductsContent";

export default async function ProductsOverviewPage() {
  const [allProducts, categoryImages] = await Promise.all([
    getAllProducts(),
    getCategoryImages(),
  ]);

  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Diamond size={48} className="text-gray-200 mb-4" />
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Loading Collection...</p>
        </div>
      </main>
    }>
      <ProductsContent allProducts={allProducts} categoryImages={categoryImages} />
    </Suspense>
  );
}
