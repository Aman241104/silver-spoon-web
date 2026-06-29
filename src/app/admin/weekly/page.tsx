import { Suspense } from "react";
import { Flame } from "lucide-react";
import { getAllProductsLean } from "@/lib/db";
import WeeklyToggleList from "@/components/admin/WeeklyToggleList";

async function WeeklyList() {
  const products = await getAllProductsLean();
  return <WeeklyToggleList products={products} />;
}

function WeeklyListSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      {/* Slot counter skeleton */}
      <div className="bg-white border border-gray-100 p-5 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full border-2 border-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-32 bg-gray-200 rounded" />
          <div className="h-1.5 bg-gray-100 rounded-full" />
        </div>
      </div>
      {/* Search skeleton */}
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-white border border-gray-100 rounded-sm" />
        <div className="h-10 w-28 bg-white border border-gray-100 rounded-sm" />
      </div>
      {/* List skeleton */}
      <div className="bg-white border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-sm shrink-0" />
            <div className="flex-1">
              <div className="h-3.5 w-48 bg-gray-200 rounded mb-1.5" />
              <div className="h-2.5 w-24 bg-gray-100 rounded" />
            </div>
            <div className="h-3 w-12 bg-gray-100 rounded hidden sm:block" />
            <div className="w-11 h-6 bg-gray-200 rounded-full shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WeeklyManagerPage() {
  return (
    <div className="p-8 md:p-12">
      <div className="mb-8 flex items-start gap-3">
        <div className="w-10 h-10 bg-[#2F3131] flex items-center justify-center shrink-0 mt-0.5">
          <Flame size={16} className="text-[#D4AF37]" />
        </div>
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Weekly Picks</h2>
          <p className="text-gray-400 text-sm mt-1">
            Toggle products to feature them in the &ldquo;Weekly Fast Moving&rdquo; section. Up to 6 appear on the homepage.
          </p>
        </div>
      </div>

      <Suspense fallback={<WeeklyListSkeleton />}>
        <WeeklyList />
      </Suspense>
    </div>
  );
}
