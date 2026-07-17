"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { deleteSubcategory } from "@/app/actions/subcategories";
import { useToast } from "@/components/admin/ui/Toast";

export default function SubcategoryListCard({ slug, name }: { slug: string; name: string }) {
  const { toast } = useToast();
  const [deleting, setDeleting] = React.useState(false);

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteSubcategory(slug);
    if (result?.error) {
      toast(result.error, "error");
      setDeleting(false);
    } else {
      toast(`"${name}" deleted`);
    }
  }

  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 px-5 py-4">
      <div>
        <p className="text-sm font-medium text-[#2c2c2c]">{name}</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-0.5">{slug}</p>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50"
        aria-label={`Delete ${name}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
