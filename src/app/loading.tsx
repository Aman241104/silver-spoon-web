import { Diamond } from "lucide-react";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Navbar skeleton */}
      <div className="h-16 bg-white border-b border-gray-100" />

      {/* Hero skeleton */}
      <div className="h-[75vh] bg-gray-100 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200" />
      </div>

      {/* Weekly picks skeleton */}
      <div className="py-20 bg-[#0f1115]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-3 w-3 bg-white/10 rounded" />
            <div className="h-2.5 w-28 bg-white/10 rounded" />
          </div>
          <div className="h-10 w-72 bg-white/10 rounded mb-12 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2 animate-pulse" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="aspect-square bg-white/5 rounded-sm" />
                <div className="h-2 w-16 bg-white/5 rounded" />
                <div className="h-3 w-24 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collections skeleton */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center mb-12">
            <div className="h-6 w-56 bg-gray-100 rounded mb-4 animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-8 bg-gray-200" />
              <Diamond size={8} className="text-gray-200" fill="currentColor" />
              <div className="h-[1px] w-8 bg-gray-200" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="aspect-square bg-gray-100 rounded-sm mb-3" />
                <div className="h-3.5 w-28 bg-gray-100 rounded mx-auto mb-2" />
                <div className="h-2.5 w-20 bg-gray-50 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
