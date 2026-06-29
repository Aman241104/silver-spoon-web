"use client";

import { useOptimistic, useTransition, useState } from "react";
import { useToast } from "@/components/admin/ui/Toast";
import { toggleOfferActive, deleteOffer } from "@/app/actions/offers";
import OfferAdminCard from "@/components/admin/OfferAdminCard";
import type { DbOffer } from "@/lib/db";

type OptAction =
  | { id: number; is_active: boolean }
  | { id: number; deleted: true };

export default function OffersGrid({ offers }: { offers: DbOffer[] }) {
  const { toast } = useToast();
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  const [optimistic, setOptimistic] = useOptimistic(
    offers,
    (state, action: OptAction) => {
      if ("deleted" in action) return state.filter((o) => o.id !== action.id);
      return state.map((o) => (o.id === action.id ? { ...o, is_active: action.is_active } : o));
    }
  );

  function handleToggle(id: number, current: boolean) {
    if (pendingId !== null) return;
    const next = !current;
    setPendingId(id);
    startTransition(async () => {
      setOptimistic({ id, is_active: next });
      const result = await toggleOfferActive(id, next);
      if (result?.error) {
        setOptimistic({ id, is_active: current });
        toast(result.error, "error");
      } else {
        toast(next ? "Offer is now live" : "Offer hidden");
      }
      setPendingId(null);
    });
  }

  function handleDelete(id: number) {
    return async () => {
      const result = await deleteOffer(id);
      if (!result?.error) {
        startTransition(() => setOptimistic({ id, deleted: true }));
        toast("Offer deleted");
      }
      return result;
    };
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {optimistic.map((offer) => (
        <OfferAdminCard
          key={offer.id}
          offer={offer}
          pending={pendingId === offer.id}
          onToggleActive={() => handleToggle(offer.id, offer.is_active)}
          onDelete={handleDelete(offer.id)}
        />
      ))}
    </div>
  );
}
