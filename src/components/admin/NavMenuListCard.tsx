"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { deleteNavMenuItem } from "@/app/actions/navMenu";
import { useToast } from "@/components/admin/ui/Toast";

export default function NavMenuListCard({ id, title, href }: { id: string; title: string; href: string }) {
  const { toast } = useToast();
  const [deleting, setDeleting] = React.useState(false);

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteNavMenuItem(id);
    if (result?.error) {
      toast(result.error, "error");
      setDeleting(false);
    } else {
      toast(`"${title}" removed`);
    }
  }

  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 px-5 py-4">
      <div>
        <p className="text-sm font-medium text-[#2c2c2c]">{title}</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-0.5">{href}</p>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50"
        aria-label={`Delete ${title}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
