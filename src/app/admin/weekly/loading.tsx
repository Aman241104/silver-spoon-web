export default function WeeklyLoading() {
  return (
    <div className="p-8 md:p-12 animate-pulse space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-8">
        <div className="w-10 h-10 bg-gray-200 shrink-0" />
        <div>
          <div className="h-7 w-36 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-72 bg-gray-100 rounded" />
        </div>
      </div>
      {/* Slot counter */}
      <div className="bg-white border border-gray-100 p-5 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full border-2 border-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-32 bg-gray-200 rounded" />
          <div className="h-1.5 w-full bg-gray-100 rounded-full" />
        </div>
      </div>
      {/* Search + filter */}
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-white border border-gray-100" />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => <div key={i} className="h-10 w-24 bg-white border border-gray-100" />)}
        </div>
      </div>
      {/* List */}
      <div className="bg-white border border-gray-100 divide-y divide-gray-50">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 shrink-0" />
            <div className="flex-1">
              <div className="h-3.5 w-44 bg-gray-200 rounded mb-1.5" />
              <div className="h-2.5 w-24 bg-gray-100 rounded" />
            </div>
            <div className="h-3 w-12 bg-gray-100 rounded hidden sm:block" />
            <div className="w-11 h-6 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
