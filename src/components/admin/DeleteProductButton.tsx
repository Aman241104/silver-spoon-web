"use client";

import { useState } from "react";
import { Trash2, X, Check } from "lucide-react";
import { deleteProduct } from "@/app/actions/products";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteProduct(id);
    if (result?.error) {
      alert(`Error: ${result.error}`);
      setDeleting(false);
      setConfirming(false);
    } else {
      router.refresh();
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5" title={`Delete "${name}"?`}>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
          title="Confirm delete"
        >
          {deleting ? <span className="text-[10px] text-red-400">...</span> : <Check size={14} />}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-gray-300 hover:text-gray-500 transition-colors"
          title="Cancel"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-gray-300 hover:text-red-400 transition-colors"
      title="Delete"
    >
      <Trash2 size={14} />
    </button>
  );
}
