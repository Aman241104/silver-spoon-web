import { Suspense } from "react";
import { getSubcategories } from "@/lib/db";
import SubcategoryListCard from "@/components/admin/SubcategoryListCard";
import NewSubcategoryForm from "@/components/admin/NewSubcategoryForm";

async function SubcategoryList() {
  const subcategories = await getSubcategories();
  if (subcategories.length === 0) {
    return <p className="text-gray-400 text-sm py-8 text-center">No sub-categories yet — add one above.</p>;
  }
  return (
    <div className="space-y-2">
      {subcategories.map((s) => (
        <SubcategoryListCard key={s.slug} slug={s.slug} name={s.name} />
      ))}
    </div>
  );
}

export default function AdminSubcategoriesPage() {
  return (
    <div className="p-8 md:p-12 max-w-2xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Sub-categories</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage the sub-category list used on the add-product form (e.g. Men&apos;s Collection, Women&apos;s Collection, Gifting).
          </p>
        </div>
        <NewSubcategoryForm />
      </div>
      <Suspense fallback={<div className="animate-pulse h-40 bg-white border border-gray-100" />}>
        <SubcategoryList />
      </Suspense>
    </div>
  );
}
