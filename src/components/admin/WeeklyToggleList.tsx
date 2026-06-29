"use client";

import { useState, useOptimistic, useTransition } from "react";
import Image from "next/image";
import { Flame, Search } from "lucide-react";
import { toggleWeekly } from "@/app/actions/weekly";
import { useToast } from "@/components/admin/ui/Toast";
import AdminToggle from "@/components/admin/ui/AdminToggle";
import type { DbProductLean } from "@/lib/db";

const MAX_WEEKLY = 6;

export default function WeeklyToggleList({ products }: { products: DbProductLean[] }) {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "weekly" | "not-weekly">("all");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [optimisticProducts, setOptimistic] = useOptimistic<DbProductLean[], { id: string; isWeekly: boolean }>(
    products,
    (state, { id, isWeekly }) =>
      state.map((p) => (p.id === id ? { ...p, isWeekly } : p))
  );

  const weeklyCount = optimisticProducts.filter((p) => p.isWeekly).length;
  const slotsFull = weeklyCount >= MAX_WEEKLY;

  function handleToggle(id: string, current: boolean) {
    if (pendingId) return;
    const next = !current;
    setPendingId(id);
    startTransition(async () => {
      setOptimistic({ id, isWeekly: next });
      const result = await toggleWeekly(id, next);
      if (result?.error) {
        setOptimistic({ id, isWeekly: current });
        toast(result.error, "error");
      } else {
        toast(next ? "Added to Weekly Picks" : "Removed from Weekly");
      }
      setPendingId(null);
    });
  }

  const lowerSearch = search.toLowerCase();
  const filtered = optimisticProducts
    .filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(lowerSearch) ||
        p.category.toLowerCase().includes(lowerSearch);
      if (filter === "weekly") return matchSearch && p.isWeekly;
      if (filter === "not-weekly") return matchSearch && !p.isWeekly;
      return matchSearch;
    })
    .sort((a, b) => {
      if (filter !== "all") return 0;
      if (a.isWeekly && !b.isWeekly) return -1;
      if (!a.isWeekly && b.isWeekly) return 1;
      return 0;
    });

  const progress = Math.round((weeklyCount / MAX_WEEKLY) * 100);

  return (
    <div>
      {/* Slot counter */}
      <div className="mb-8 bg-white border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex items-center gap-4 shrink-0">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-serif font-medium border-2 transition-colors ${
            slotsFull ? "border-[#D4AF37] text-[#D4AF37]" : "border-gray-200 text-[#2c2c2c]"
          }`}>
            {weeklyCount}
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#2c2c2c]">
              of {MAX_WEEKLY} slots filled
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest font-bold">
              First {MAX_WEEKLY} shown on homepage
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                slotsFull ? "bg-[#D4AF37]" : "bg-[#2F3131]"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">0</span>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${slotsFull ? "text-[#D4AF37]" : "text-gray-400"}`}>
              {slotsFull ? "All slots filled" : `${MAX_WEEKLY - weeklyCount} remaining`}
            </span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{MAX_WEEKLY}</span>
          </div>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search by name or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#2F3131] transition-colors bg-white"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "weekly", "not-weekly"] as const).map((f) => {
            const label =
              f === "all" ? "All" : f === "weekly" ? `Weekly (${weeklyCount})` : "Not Weekly";
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-colors whitespace-nowrap ${
                  filter === f
                    ? "bg-[#2F3131] text-white"
                    : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-[#2c2c2c]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product list */}
      <div className="bg-white border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No products match your search.
          </div>
        ) : (
          filtered.map((product) => {
            const isThisPending = pendingId === product.id;
            return (
              <div
                key={product.id}
                className={`flex items-center gap-4 px-4 py-3 transition-colors ${
                  product.isWeekly
                    ? "bg-amber-50/60 border-l-2 border-l-[#D4AF37]"
                    : "border-l-2 border-l-transparent hover:bg-[#FAF8F5]"
                }`}
              >
                {/* Thumbnail */}
                <div className="w-11 h-11 bg-[#FAF8F5] border border-gray-100 shrink-0 relative overflow-hidden rounded-sm">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-0.5"
                      sizes="40px"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-300 text-[9px] font-serif font-bold">SS</span>
                    </div>
                  )}
                </div>

                {/* Name + category */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-[#2c2c2c] truncate leading-tight">
                      {product.name}
                    </p>
                    {product.isWeekly && (
                      <Flame size={11} className="text-[#D4AF37] shrink-0" fill="currentColor" />
                    )}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-0.5">
                    {product.category}
                  </p>
                </div>

                {/* Price */}
                <span className="text-[12px] text-gray-400 shrink-0 hidden sm:block w-16 text-right">
                  {product.price > 0 ? `₹${product.price.toLocaleString("en-IN")}` : "POR"}
                </span>

                {/* Toggle */}
                <AdminToggle
                  active={!!product.isWeekly}
                  pending={isThisPending}
                  onClick={() => handleToggle(product.id, !!product.isWeekly)}
                  label={product.isWeekly ? "Remove from weekly picks" : "Add to weekly picks"}
                />
              </div>
            );
          })
        )}
      </div>

      <p className="text-[10px] text-gray-400 mt-3 px-1 font-bold uppercase tracking-widest">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} shown
      </p>
    </div>
  );
}
