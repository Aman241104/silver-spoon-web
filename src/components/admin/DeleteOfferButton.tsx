"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { deleteOffer } from "@/app/actions/offers";

export default function DeleteOfferButton({ id }: { id: number }) {
  const [confirming, setConfirming] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Delete?</span>
        <button
          onClick={() =>
            startTransition(async () => {
              await deleteOffer(id);
              setConfirming(false);
            })
          }
          disabled={pending}
          className="text-[10px] uppercase tracking-widest font-bold text-red-500 hover:text-red-700 disabled:opacity-50"
        >
          {pending ? "…" : "Yes"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-gray-600"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 text-gray-300 hover:text-red-400 transition-colors"
      title="Delete offer"
    >
      <Trash2 size={14} />
    </button>
  );
}
