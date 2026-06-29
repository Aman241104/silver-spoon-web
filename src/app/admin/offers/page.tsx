import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllOffers } from "@/lib/db";
import OffersGrid from "@/components/admin/OffersGrid";

async function OffersContent() {
  const offers = await getAllOffers();

  if (offers.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-serif text-3xl text-gray-300 italic tracking-tight mb-6">No offers yet</p>
        <Link
          href="/admin/offers/new"
          className="text-[11px] uppercase tracking-widest font-bold text-[#2c2c2c] border-b border-[#2c2c2c] pb-0.5"
        >
          Create your first offer
        </Link>
      </div>
    );
  }

  return <OffersGrid offers={offers} />;
}

export default function AdminOffersPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Offers &amp; Promotions</h2>
          <p className="text-gray-400 text-sm mt-0.5">
            Toggle offers on/off directly — or edit to change content.
          </p>
        </div>
        <Link
          href="/admin/offers/new"
          className="flex items-center gap-2 bg-[#2F3131] text-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors shrink-0"
        >
          <Plus size={13} />
          New Offer
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white border border-gray-100">
                <div className="h-28 bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3.5 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-50 rounded w-1/2" />
                  <div className="h-px bg-gray-50 my-3" />
                  <div className="flex justify-between">
                    <div className="h-5 w-14 bg-gray-100 rounded-full" />
                    <div className="flex gap-2">
                      <div className="h-4 w-4 bg-gray-100 rounded" />
                      <div className="h-4 w-4 bg-gray-100 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <OffersContent />
      </Suspense>
    </div>
  );
}
