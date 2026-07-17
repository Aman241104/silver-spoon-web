import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createOffer } from "@/app/actions/offers";
import OfferForm from "@/components/admin/OfferForm";

export default function NewOfferPage() {
  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <Link
        href="/admin/offers"
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2c2c2c] transition-colors mb-8"
      >
        <ChevronLeft size={14} /> Back to Offers
      </Link>

      <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight mb-8">New Offer</h2>

      <OfferForm action={createOffer} submitLabel="Create Offer" />
    </div>
  );
}
