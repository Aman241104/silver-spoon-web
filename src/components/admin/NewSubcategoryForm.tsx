"use client";

import * as React from "react";
import { Plus, Save, X } from "lucide-react";
import { upsertSubcategory } from "@/app/actions/subcategories";
import { useToast } from "@/components/admin/ui/Toast";

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NewSubcategoryForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [subcategoryName, setSubcategoryName] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  function reset() {
    setSubcategoryName("");
    setOpen(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const cleanName = subcategoryName.trim();
    const slug = toSlug(cleanName);
    if (!cleanName || !slug) return toast("Sub-category name is required", "error");
    setSaving(true);
    const result = await upsertSubcategory(slug, cleanName);
    if (result?.error) {
      toast(result.error, "error");
    } else {
      toast(`Sub-category "${cleanName}" created`);
      reset();
    }
    setSaving(false);
  }

  const inputClass =
    "w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#2F3131] transition-colors bg-white";
  const labelClass = "text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1";

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-[#2F3131] text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
      >
        <Plus size={13} />
        Add Sub-category
      </button>
    );
  }

  return (
    <div className="bg-white border border-[#D4AF37]/40 p-5 mb-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#2c2c2c]">New Sub-category</p>
        <button type="button" onClick={reset} className="text-gray-400 hover:text-[#2c2c2c] transition-colors">
          <X size={15} />
        </button>
      </div>

      <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1 min-w-0">
          <label className={labelClass}>Sub-category Name *</label>
          <input
            type="text"
            required
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            placeholder="e.g. Women's Rings"
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#2c2c2c] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || !subcategoryName.trim()}
            className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-[#2F3131] text-white hover:bg-black transition-colors disabled:opacity-50"
          >
            <Save size={12} />
            {saving ? "Creating…" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
