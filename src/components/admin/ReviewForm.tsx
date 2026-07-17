"use client";

import * as React from "react";
import { Save, Plus, X } from "lucide-react";
import { createReview } from "@/app/actions/reviews";
import { useToast } from "@/components/admin/ui/Toast";

export default function ReviewForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setSaving(true);
    const result = await createReview(new FormData(formRef.current));
    if (result?.error) {
      toast(result.error, "error");
    } else {
      toast("Review added");
      formRef.current.reset();
      setOpen(false);
    }
    setSaving(false);
  }

  const inputClass = "w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#2F3131] transition-colors bg-white";
  const labelClass = "text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1";

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-[#2F3131] text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
      >
        <Plus size={13} />
        Add Review
      </button>
    );
  }

  return (
    <div className="bg-white border border-[#D4AF37]/40 p-5 mb-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#2c2c2c]">New Review</p>
        <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-[#2c2c2c] transition-colors">
          <X size={15} />
        </button>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Customer Name *</label>
            <input name="name" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Rating *</label>
            <select name="rating" defaultValue="5" className={inputClass}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} star{n !== 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Review Text *</label>
          <textarea name="body" required rows={3} className={`${inputClass} resize-none`} />
        </div>
        <div className="flex items-center gap-6">
          <div>
            <label className={labelClass}>Sort Order</label>
            <input name="sortOrder" type="number" defaultValue={0} className={`${inputClass} w-24`} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer mt-4">
            <input type="checkbox" name="published" value="true" defaultChecked className="w-4 h-4 accent-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-gray-600">Published</span>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-[#2F3131] text-white hover:bg-black transition-colors disabled:opacity-50"
          >
            <Save size={12} />
            {saving ? "Saving…" : "Save Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
