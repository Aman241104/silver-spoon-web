"use client";

import { useState, useTransition } from "react";
import { Trash2, X, Check } from "lucide-react";
import { useToast } from "./Toast";

interface Props {
  onConfirm: () => void | Promise<{ error?: string } | undefined | void>;
  size?: number;
}

export default function AdminDeleteButton({ onConfirm, size = 14 }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  function handleConfirm() {
    startTransition(async () => {
      const result = await onConfirm();
      if (result?.error) {
        toast(result.error, "error");
        setConfirming(false);
      } else {
        setConfirming(false);
      }
    });
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleConfirm}
          disabled={isPending}
          className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
          title="Confirm delete"
        >
          {isPending ? <span className="text-[10px] text-red-400">…</span> : <Check size={size} />}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-gray-300 hover:text-gray-500 transition-colors"
          title="Cancel"
        >
          <X size={size} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      disabled={isPending}
      className="text-gray-300 hover:text-red-400 transition-colors"
      title="Delete"
    >
      <Trash2 size={size} />
    </button>
  );
}
