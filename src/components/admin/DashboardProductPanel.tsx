"use client";

import { useState, useOptimistic, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, Flame, ArrowRight } from "lucide-react";
import { useToast } from "@/components/admin/ui/Toast";
import { toggleWeekly } from "@/app/actions/weekly";
import { toggleFeatured } from "@/app/actions/products";
import AdminToggle from "@/components/admin/ui/AdminToggle";
import type { DbProductLean } from "@/lib/db";

interface Props {
  products: DbProductLean[];
}

export default function DashboardProductPanel({ products }: Props) {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [optimistic, setOptimistic] = useOptimistic<DbProductLean[], { id: string; field: "featured" | "isWeekly"; value: boolean }>(
    products,
    (state, action) =>
      state.map((p) => (p.id === action.id ? { ...p, [action.field]: action.value } : p))
  );

  const lower = search.toLowerCase();
  const filtered = lower
    ? optimistic.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
      )
    : optimistic;

  function handleToggle(id: string, field: "featured" | "isWeekly", current: boolean) {
    if (pendingId) return;
    const next = !current;
    setPendingId(`${id}:${field}`);
    startTransition(async () => {
      setOptimistic({ id, field, value: next });
      const action = field === "isWeekly" ? toggleWeekly : toggleFeatured;
      const result = await action(id, next);
      if (result?.error) {
        setOptimistic({ id, field, value: current });
        toast(result.error, "error");
      } else {
        toast(
          field === "isWeekly"
            ? next ? "Added to Weekly Picks" : "Removed from Weekly"
            : next ? "Marked as Featured" : "Removed from Featured"
        );
      }
      setPendingId(null);
    });
  }

  return (
    <div className="bg-white border border-gray-100">
      {/* Search */}
      <div className="p-4 border-b border-gray-50">
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Quick search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 pl-8 pr-4 py-2 text-[13px] focus:outline-none focus:border-[#2F3131] transition-colors bg-white"
          />
        </div>
      </div>

      {/* Product rows */}
      <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-[12px]">No products match</div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAF8F5] transition-colors">
              {/* Thumbnail */}
              <div className="w-8 h-8 bg-[#FAF8F5] border border-gray-100 shrink-0 relative overflow-hidden rounded-sm">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-contain p-0.5" sizes="32px" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-300 text-[8px] font-serif font-bold">SS</span>
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-[#2c2c2c] truncate leading-tight">{p.name}</p>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{p.category}</p>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <Star size={9} className={p.featured ? "text-[#D4AF37]" : "text-gray-300"} />
                  <AdminToggle
                    active={!!p.featured}
                    pending={pendingId === `${p.id}:featured`}
                    onClick={() => handleToggle(p.id, "featured", !!p.featured)}
                    label={p.featured ? "Remove from featured" : "Mark as featured"}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame size={9} className={p.isWeekly ? "text-[#D4AF37]" : "text-gray-300"} />
                  <AdminToggle
                    active={!!p.isWeekly}
                    pending={pendingId === `${p.id}:weekly`}
                    onClick={() => handleToggle(p.id, "isWeekly", !!p.isWeekly)}
                    label={p.isWeekly ? "Remove from weekly" : "Add to weekly picks"}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-50 bg-[#FAF8F5] flex items-center justify-between">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Showing {Math.min(filtered.length, products.length)} of {products.length} products
        </p>
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#2c2c2c] hover:text-[#D4AF37] transition-colors"
        >
          View all <ArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
}
