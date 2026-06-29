"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Star, Flame } from "lucide-react";
import AdminDeleteButton from "@/components/admin/ui/AdminDeleteButton";
import AdminToggle from "@/components/admin/ui/AdminToggle";
import type { DbProductLean } from "@/lib/db";

interface Props {
  product: DbProductLean;
  pendingId: string | null;
  onToggleFeatured: () => void;
  onToggleWeekly: () => void;
  onDelete: () => void;
}

export default function ProductAdminCard({
  product,
  pendingId,
  onToggleFeatured,
  onToggleWeekly,
  onDelete,
}: Props) {
  const pendingFeatured = pendingId === `${product.id}:featured`;
  const pendingWeekly = pendingId === `${product.id}:weekly`;

  return (
    <div className="bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-150 flex flex-col group">
      {/* Image */}
      <div className="relative w-full aspect-square bg-[#FAF8F5] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl font-serif text-gray-200">SS</span>
          </div>
        )}
        {/* Badge overlay */}
        {(product.featured || product.isWeekly) && (
          <div className="absolute top-1.5 left-1.5 flex gap-1">
            {product.featured && (
              <span className="bg-[#D4AF37] text-[#2F3131] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest leading-none flex items-center gap-0.5">
                <Star size={7} fill="currentColor" />
              </span>
            )}
            {product.isWeekly && (
              <span className="bg-[#2F3131] text-[#D4AF37] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest leading-none flex items-center gap-0.5">
                <Flame size={7} fill="currentColor" />
              </span>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <div>
          <p className="text-[12px] font-medium text-[#2c2c2c] line-clamp-2 leading-snug">{product.name}</p>
          <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mt-0.5">{product.category}</p>
          {product.price > 0 && (
            <p className="text-[11px] text-gray-500 mt-0.5">₹{product.price.toLocaleString("en-IN")}</p>
          )}
        </div>

        {/* Toggles */}
        <div className="space-y-1.5 border-t border-gray-50 pt-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold text-gray-400">
              <Star size={9} className={product.featured ? "text-[#D4AF37]" : ""} />
              Featured
            </span>
            <AdminToggle
              active={!!product.featured}
              pending={pendingFeatured}
              onClick={onToggleFeatured}
              label={product.featured ? "Remove from featured" : "Mark as featured"}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold text-gray-400">
              <Flame size={9} className={product.isWeekly ? "text-[#D4AF37]" : ""} />
              Weekly
            </span>
            <AdminToggle
              active={!!product.isWeekly}
              pending={pendingWeekly}
              onClick={onToggleWeekly}
              label={product.isWeekly ? "Remove from weekly" : "Add to weekly picks"}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-50 mt-auto">
          <p className="text-[9px] font-mono text-gray-300">{product.id}</p>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/products/${product.id}`}
              className="text-gray-300 hover:text-[#2c2c2c] transition-colors"
              title="Edit product"
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
