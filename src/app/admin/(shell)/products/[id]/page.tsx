import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProductById, getCategoryFormOptions } from "@/lib/db";
import { updateProduct } from "@/app/actions/products";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategoryFormOptions(),
  ]);

  if (!product) notFound();

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <Link
        href="/admin/products"
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2c2c2c] transition-colors mb-8"
      >
        <ChevronLeft size={14} /> Back to Products
      </Link>

      <div className="mb-8">
        <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Edit Product</h2>
        <p className="text-gray-400 text-sm mt-1 font-mono">{product.id}</p>
      </div>

      <ProductForm product={product} action={updateProduct} submitLabel="Save Changes" categories={categories} />
    </div>
  );
}
