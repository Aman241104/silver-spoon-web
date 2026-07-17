"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, X, Save } from "lucide-react";
import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase-browser";
import { upsertCategoryImage, deleteCategoryImage } from "@/app/actions/categoryImages";
import { useToast } from "@/components/admin/ui/Toast";
import AdminDeleteButton from "@/components/admin/ui/AdminDeleteButton";

interface Props {
  slug: string;
  name: string;
  currentImage: string;
  showDelete?: boolean;
}

export default function CategoryImageEditCard({ slug, name, currentImage, showDelete }: Props) {
  const { toast } = useToast();
  const [deleted, setDeleted] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(currentImage);
  const [uploading, setUploading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  async function handleDelete() {
    const result = await deleteCategoryImage(slug);
    if (result?.error) {
      toast(result.error, "error");
    } else {
      toast(`${name} removed`);
      setDeleted(true);
    }
    return result;
  }

  if (deleted) return null;

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
      const filename = `category-${slug}-${Date.now()}.webp`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filename, compressed, { contentType: "image/webp", upsert: true });
      if (uploadError) throw uploadError;
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

  async function handleSave() {
    setSaving(true);
    const result = await upsertCategoryImage(slug, name, imageUrl);
    if (result?.error) {
      toast(result.error, "error");
    } else {
      toast(`${name} image saved`);
    }
    setSaving(false);
  }

  const inputClass = "w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#2F3131] transition-colors bg-white";

  return (
    <div className="bg-white border border-gray-100 p-5 flex flex-col sm:flex-row gap-4 items-start">
      {/* Image preview */}
      <div className="relative w-24 h-24 bg-[#FAF8F5] border border-gray-100 shrink-0 overflow-hidden rounded-sm">
        {imageUrl ? (
          <>
            <Image src={imageUrl} alt={name} fill className="object-cover" unoptimized />
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

      <div className="flex-1 min-w-0 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#2c2c2c]">{name}</p>
        <p className="text-[9px] font-mono text-gray-400">{slug}</p>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste image URL or upload →"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className={`${inputClass} flex-1`}
          />
          <label className="shrink-0 border border-dashed border-gray-200 px-3 py-2 cursor-pointer hover:border-gray-300 transition-colors flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-gray-400">
            <Upload size={11} />
            {uploading ? "…" : "Upload"}
            <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-3 self-end sm:self-center">
        {showDelete && <AdminDeleteButton onConfirm={handleDelete} size={14} />}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || uploading}
          className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-[#2F3131] text-white hover:bg-black transition-colors disabled:opacity-50"
        >
          <Save size={12} />
          {saving ? "…" : "Save"}
        </button>
      </div>
    </div>
  );
}
