"use client";

import { useState, useOptimistic, useTransition } from "react";
import { useToast } from "@/components/admin/ui/Toast";
import { toggleWeekly } from "@/app/actions/weekly";
import { toggleFeatured, deleteProduct } from "@/app/actions/products";
import ProductAdminCard from "@/components/admin/ProductAdminCard";
import type { DbProductLean } from "@/lib/db";

type OptimisticAction =
  | { id: string; field: "featured" | "isWeekly"; value: boolean }
  | { id: string; deleted: true };

export default function ProductsGrid({ products }: { products: DbProductLean[] }) {
  const { toast } = useToast();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [optimistic, setOptimistic] = useOptimistic<DbProductLean[], OptimisticAction>(
    products,
    (state, action) => {
      if ("deleted" in action) return state.filter((p) => p.id !== action.id);
      return state.map((p) =>
        p.id === action.id ? { ...p, [action.field]: action.value } : p
      );
    }
  );

  function handleToggle(id: string, field: "featured" | "isWeekly", current: boolean) {
    const pendingKey = `${id}:${field}`;
    if (pendingId) return;
    const next = !current;
    setPendingId(pendingKey);
    startTransition(async () => {
      setOptimistic({ id, field, value: next });
      const action = field === "isWeekly" ? toggleWeekly : toggleFeatured;
      const result = await action(id, next);
      if (result?.error) {
        setOptimistic({ id, field, value: current });
        toast(result.error, "error");
      } else {
        const label =
          field === "isWeekly"
            ? next ? "Added to Weekly Picks" : "Removed from Weekly"
            : next ? "Marked as Featured" : "Removed from Featured";
        toast(label);
      }
      setPendingId(null);
    });
  }

  function handleDelete(id: string) {
    if (pendingId) return;
    setPendingId(`${id}:delete`);
    startTransition(async () => {
      setOptimistic({ id, deleted: true });
      const result = await deleteProduct(id);
      if (result?.error) {
        toast(result.error, "error");
      } else {
        toast("Product deleted");
      }
      setPendingId(null);
    });
  }

  if (optimistic.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400 text-sm">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {optimistic.map((product) => (
        <ProductAdminCard
          key={product.id}
          product={product}
          pendingId={pendingId}
          onToggleFeatured={() => handleToggle(product.id, "featured", !!product.featured)}
          onToggleWeekly={() => handleToggle(product.id, "isWeekly", !!product.isWeekly)}
          onDelete={() => handleDelete(product.id)}
        />
      ))}
    </div>
  );
}
