"use client";

import * as React from "react";
import { Plus, Save, X } from "lucide-react";
import { createNavMenuItem } from "@/app/actions/navMenu";
import { useToast } from "@/components/admin/ui/Toast";
import type { NavMenu } from "@/lib/db";
import type { CategoryOption } from "@/lib/categoryMerge";

const MENUS: { value: NavMenu; label: string; gender?: "men" | "women" }[] = [
  { value: "WOMEN", label: "Women", gender: "women" },
  { value: "MEN", label: "Men", gender: "men" },
  { value: "GIFTS", label: "Gifts" },
  { value: "COLLECTION", label: "Collection" },
];

export default function NewNavMenuItemForm({ categories }: { categories: CategoryOption[] }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState<NavMenu>("WOMEN");
  const [title, setTitle] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(categories[0]?.id ?? "");
  const [saving, setSaving] = React.useState(false);

  function reset() {
    setTitle("");
    setCategoryId(categories[0]?.id ?? "");
    setOpen(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle || !categoryId) return toast("Title and category are required", "error");
    const gender = MENUS.find((m) => m.value === menu)?.gender;
    const href = `/products?category=${categoryId}${gender ? `&gender=${gender}` : ""}`;
    setSaving(true);
    const result = await createNavMenuItem(menu, cleanTitle, href);
    if (result?.error) {
      toast(result.error, "error");
    } else {
      toast(`"${cleanTitle}" added to ${menu} menu`);
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
        Add Menu Item
      </button>
    );
  }

  return (
    <div className="bg-white border border-[#D4AF37]/40 p-5 mb-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#2c2c2c]">New Nav Menu Item</p>
        <button type="button" onClick={reset} className="text-gray-400 hover:text-[#2c2c2c] transition-colors">
          <X size={15} />
        </button>
      </div>

      <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-4 items-start flex-wrap">
        <div className="w-full sm:w-36">
          <label className={labelClass}>Menu *</label>
          <select value={menu} onChange={(e) => setMenu(e.target.value as NavMenu)} className={inputClass}>
            {MENUS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-0">
          <label className={labelClass}>Item Name *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Necklace"
            className={inputClass}
          />
        </div>

        <div className="flex-1 min-w-0">
          <label className={labelClass}>Links to Category *</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputClass}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
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
            disabled={saving || !title.trim() || !categoryId}
            className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-[#2F3131] text-white hover:bg-black transition-colors disabled:opacity-50"
          >
            <Save size={12} />
            {saving ? "Adding…" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
