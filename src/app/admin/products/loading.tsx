export default function ProductsLoading() {
  return (
    <div className="p-8 md:p-12 animate-pulse">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="h-7 w-28 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-40 bg-gray-100 rounded" />
        </div>
        <div className="h-9 w-32 bg-gray-200 rounded" />
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 bg-[#FAF8F5] px-4 py-3 flex gap-8">
          {["Name", "Category", "Price", "Weekly"].map((h) => (
            <div key={h} className="h-3 w-16 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="divide-y divide-gray-50">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="px-4 py-3 flex items-center gap-8">
              <div className="flex-1">
                <div className="h-3.5 w-48 bg-gray-200 rounded mb-1.5" />
                <div className="h-2.5 w-24 bg-gray-100 rounded" />
              </div>
              <div className="h-3 w-20 bg-gray-100 rounded hidden md:block" />
              <div className="h-3 w-14 bg-gray-100 rounded hidden sm:block" />
              <div className="h-3 w-6 bg-gray-100 rounded hidden lg:block" />
              <div className="h-3 w-8 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
