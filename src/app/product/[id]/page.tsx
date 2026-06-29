import Link from "next/link";
import { getProductById } from "@/lib/db";
import ProductDetailClient from "@/components/product/ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5] text-charcoal font-sans">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-8 tracking-tighter">Piece Not Found</h1>
          <Link href="/products" className="bg-[#1a1a1a] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
            Return to Collection
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetailClient product={product} />;
}
