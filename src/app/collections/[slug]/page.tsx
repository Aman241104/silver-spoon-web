import { Suspense } from "react";
import { Diamond } from "lucide-react";
import { getProductsByCategory } from "@/lib/db";
import CategoryContent from "@/components/collections/CategoryContent";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Diamond size={48} className="text-gray-200 mb-4" />
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Loading Collection...</p>
        </div>
      </main>
    }>
      <CategoryContent slug={slug} products={products} />
    </Suspense>
  );
}
