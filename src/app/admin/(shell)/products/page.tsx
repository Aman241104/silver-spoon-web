import { Suspense } from "react";
import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { getProductsPaginatedLean, searchProductsLean } from "@/lib/db";
import ProductsGrid from "@/components/admin/ProductsGrid";
import type { DbProductLean } from "@/lib/db";

const LIMIT = 40;

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 animate-pulse">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-100">
          <div className="aspect-square bg-gray-100" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-4/5" />
            <div className="h-2.5 bg-gray-50 rounded w-1/2" />
            <div className="h-px bg-gray-50 my-2" />
            <div className="flex justify-between">
              <div className="h-2.5 bg-gray-100 rounded w-16" />
              <div className="h-4 w-8 bg-gray-100 rounded-full" />
            </div>
            <div className="flex justify-between">
              <div className="h-2.5 bg-gray-100 rounded w-14" />
              <div className="h-4 w-8 bg-gray-100 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page: pageParam, q } = await searchParams;
  const query = q?.trim() ?? "";

  let products: DbProductLean[] = [];
  let total = 0;
  let page = 1;
  let totalPages = 1;

  if (query) {
    products = await searchProductsLean(query);
    total = products.length;
  } else {
    page = Math.max(1, Number(pageParam) || 1);
    const result = await getProductsPaginatedLean(page, LIMIT);
    products = result.products;
    total = result.total;
    totalPages = Math.ceil(total / LIMIT);
  }

  return (
    <div>
      <ProductsGrid products={products} />

      {!query && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-1">
          <p className="text-[11px] text-gray-400">
            {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total} products
          </p>
          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link
                href={`/admin/products?page=${page - 1}`}
                className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest border border-gray-200 hover:border-gray-400 transition-colors text-[#2c2c2c]"
              >
                <ChevronLeft size={12} /> Prev
              </Link>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest border border-gray-100 text-gray-300 cursor-not-allowed">
                <ChevronLeft size={12} /> Prev
              </span>
            )}
            <span className="text-[11px] text-gray-400 px-2">{page} / {totalPages}</span>
            {page < totalPages ? (
              <Link
                href={`/admin/products?page=${page + 1}`}
                className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest border border-gray-200 hover:border-gray-400 transition-colors text-[#2c2c2c]"
              >
                Next <ChevronRight size={12} />
              </Link>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest border border-gray-100 text-gray-300 cursor-not-allowed">
                Next <ChevronRight size={12} />
              </span>
            )}
          </div>
        </div>
      )}

      {query && (
        <p className="text-[11px] text-gray-400 mt-3 px-1">
          {total} result{total !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}

export default function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Products</h2>
          <p className="text-gray-400 text-sm mt-0.5">Toggle featured &amp; weekly directly on each card</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#2F3131] text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
        >
          <Plus size={13} />
          Add Product
        </Link>
      </div>

      <form method="GET" className="mb-5">
        <div className="relative max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="q"
            type="search"
            placeholder="Search by name, category, ID…"
            className="w-full border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#2F3131] transition-colors bg-white"
          />
        </div>
      </form>

      <Suspense fallback={<GridSkeleton />}>
        <ProductsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
