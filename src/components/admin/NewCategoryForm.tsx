"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, X, Save, Plus } from "lucide-react";
import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase-browser";
import { upsertCategoryImage } from "@/app/actions/categoryImages";
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

export default function NewCategoryForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const slug = toSlug(categoryName);

  function reset() {
    setCategoryName("");
    setImageUrl("");
    setOpen(false);
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp",
      });
      const supabase = createClient();
      const filename = `category-${slug || "new"}-${Date.now()}.webp`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(filename, compressed, { contentType: "image/webp", upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(filename);
      setImageUrl(publicUrl);
      toast("Image uploaded");
    } catch (err) {
      toast("Image upload failed", "error");
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const cleanName = categoryName.trim();
    if (!cleanName || !slug) return toast("Category name is required", "error");
    setSaving(true);
    const result = await upsertCategoryImage(slug, cleanName, imageUrl);
    if (result?.error) {
      toast(result.error, "error");
    } else {
      toast(`Category "${cleanName}" created`);
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
        Add Category
      </button>
    );
  }

  return (
    <div className="bg-white border border-[#D4AF37]/40 p-5 mb-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#2c2c2c]">New Category</p>
        <button type="button" onClick={reset} className="text-gray-400 hover:text-[#2c2c2c] transition-colors">
          <X size={15} />
        </button>
      </div>

      <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Image preview */}
        <div className="relative w-24 h-24 bg-[#FAF8F5] border border-gray-100 shrink-0 overflow-hidden rounded-sm">
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt="preview" fill className="object-cover" unoptimized />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute top-1 right-1 bg-red-400 text-white rounded-full w-4 h-4 flex items-center justify-center z-10"
              >
                <X size={8} />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-[9px] font-serif font-bold">
              SS
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          {/* Category Name — drives the auto-slug (generated server-side, not shown) */}
          <div>
            <label className={labelClass}>Category Name *</label>
            <input
              type="text"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g. Temple Jewellery"
              className={inputClass}
            />
          </div>

          {/* Image */}
          <div>
            <label className={labelClass}>Image</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste image URL or upload →"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`${inputClass} flex-1`}
              />
              <label className="shrink-0 border border-dashed border-gray-200 px-3 py-2 cursor-pointer hover:border-gray-300 transition-colors flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                <Upload size={11} />
                {uploading ? "…" : "Upload"}
                <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} className="hidden" />
              </label>
            </div>
          </div>
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
            disabled={saving || uploading || !slug}
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
