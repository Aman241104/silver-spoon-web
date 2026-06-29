"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import AdminToggle from "@/components/admin/ui/AdminToggle";
import AdminDeleteButton from "@/components/admin/ui/AdminDeleteButton";
import type { DbOffer } from "@/lib/db";

interface Props {
  offer: DbOffer;
  pending: boolean;
  onToggleActive: () => void;
  onDelete: () => void;
}

export default function OfferAdminCard({ offer, pending, onToggleActive, onDelete }: Props) {
  return (
    <div className={`bg-white border border-gray-100 hover:border-gray-200 transition-all overflow-hidden ${
      !offer.is_active ? "opacity-60" : ""
    }`}>
      {/* Banner image */}
      {offer.image_url && (
        <div className="relative w-full h-28 bg-[#2F3131] overflow-hidden">
          <Image src={offer.image_url} alt={offer.title} fill className="object-cover" unoptimized />
          {offer.badge_text && (
            <span className="absolute top-2 left-2 bg-[#D4AF37] text-[#2F3131] text-[8px] font-bold uppercase tracking-widest px-2 py-0.5">
              {offer.badge_text}
            </span>
          )}
        </div>
      )}

      <div className="p-4">
        {/* No image badge */}
        {!offer.image_url && offer.badge_text && (
          <span className="inline-block bg-[#D4AF37]/15 text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 mb-2">
            {offer.badge_text}
          </span>
        )}

        <p className="text-[13px] font-bold text-[#2c2c2c] leading-snug line-clamp-2">{offer.title}</p>
        {offer.subtitle && (
          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{offer.subtitle}</p>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <AdminToggle
              active={offer.is_active}
              pending={pending}
              onClick={onToggleActive}
              label={offer.is_active ? "Deactivate offer" : "Activate offer"}
            />
            <span className={`text-[9px] font-bold uppercase tracking-widest ${
              offer.is_active ? "text-green-500" : "text-gray-400"
            }`}>
              {offer.is_active ? "Live" : "Hidden"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/offers/${offer.id}`}
              className="text-gray-300 hover:text-[#2c2c2c] transition-colors"
              title="Edit offer"
            >
              <Pencil size={13} />
            </Link>
            <AdminDeleteButton onConfirm={onDelete} size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}
