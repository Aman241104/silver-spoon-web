export default function DashboardLoading() {
  return (
    <div className="p-8 md:p-12 animate-pulse">
      <div className="mb-10">
        <div className="h-7 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-52 bg-gray-100 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white border border-gray-100 p-6">
            <div className="h-4 w-4 bg-gray-200 rounded mb-4" />
            <div className="h-9 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-6 h-20 rounded-sm" />
        <div className="bg-white border border-gray-100 p-6 h-20 rounded-sm" />
      </div>
    </div>
  );
}
