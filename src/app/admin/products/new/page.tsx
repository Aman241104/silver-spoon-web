import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createProduct } from "@/app/actions/products";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <Link
        href="/admin/products"
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2c2c2c] transition-colors mb-8"
      >
        <ChevronLeft size={14} /> Back to Products
      </Link>

      <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight mb-8">Add New Product</h2>

      <ProductForm action={createProduct} submitLabel="Create Product" />
    </div>
  );
}
