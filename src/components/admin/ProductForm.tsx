"use client";

import * as React from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase-browser";
import type { Product } from "@/data/products";
import type { DbProduct } from "@/lib/db";

interface Props {
  product?: DbProduct;
  action: (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;
  submitLabel: string;
  categories: { id: string; name: string }[];
  subcategories: { slug: string; name: string }[];
}

export default function ProductForm({ product, action, submitLabel, categories, subcategories }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = React.useState(product?.image ?? "");
  const [uploading, setUploading] = React.useState(false);

  const [state, formAction, pending] = useActionState(
    async (prev: { error?: string } | undefined, formData: FormData) => {
      formData.set("image", imageUrl);
      const result = await action(prev, formData);
      if (!result?.error) router.push("/admin/products");
      return result;
    },
    undefined
  );

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: "image/webp",
      });

      const supabase = createClient();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(filename, compressed, { contentType: "image/webp", upsert: false });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(filename);

      setImageUrl(publicUrl);
    } catch (err) {
      alert("Image upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  const inputClass = "w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#2F3131] transition-colors bg-white";
  const labelClass = "text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1.5";

  return (
    <form action={formAction} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="md:col-span-2">
          <label className={labelClass}>Product Name *</label>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Category *</label>
          <select name="category" required defaultValue={product?.category ?? ""} className={inputClass}>
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Sub-category</label>
          <select name="subCategory" defaultValue={product?.subCategory ?? ""} className={inputClass}>
            <option value="">None</option>
            {subcategories.map(s => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={labelClass}>Price (₹)</label>
          <input name="price" type="number" min="0" defaultValue={product?.price ?? 0} className={inputClass} />
          <p className="text-[10px] text-gray-400 mt-1">Leave 0 for &quot;Price on Request&quot;</p>
        </div>
        <div>
          <label className={labelClass}>Gender</label>
          <select name="gender" defaultValue={product?.gender ?? ""} className={inputClass}>
            <option value="">Unspecified</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Purity</label>
          <input name="purity" defaultValue={product?.purity} placeholder="e.g. 925" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={labelClass}>Serial Number</label>
          <input name="serialNumber" defaultValue={product?.serialNumber} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Weight</label>
          <input name="weight" defaultValue={product?.weight} placeholder="e.g. 12.5g" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Dimensions</label>
          <input name="dimensions" defaultValue={product?.dimensions} placeholder="e.g. 5 x 3 cm" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" rows={3} defaultValue={product?.description} className={`${inputClass} resize-none`} />
      </div>

      {/* Image Upload */}
      <div>
        <label className={labelClass}>Product Image</label>
        <div className="flex gap-4 items-start">
          {imageUrl && (
            <div className="relative w-24 h-24 bg-[#FAF8F5] border border-gray-100 shrink-0">
              <Image src={imageUrl} alt="Preview" fill className="object-contain p-2" />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute -top-2 -right-2 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                <X size={10} />
              </button>
            </div>
          )}
          <label className="flex-1 border-2 border-dashed border-gray-200 rounded-sm p-6 text-center cursor-pointer hover:border-gray-300 transition-colors">
            <Upload size={20} className="mx-auto text-gray-300 mb-2" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-gray-400 block">
              {uploading ? "Uploading..." : "Click to upload image"}
            </span>
            <span className="text-[10px] text-gray-300 mt-1 block">Auto-compressed to WebP ≤ 150 KB</span>
            <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} className="hidden" />
          </label>
        </div>
        <input
          type="text"
          placeholder="Or paste image URL / path"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className={`${inputClass} mt-2`}
        />
      </div>

      {/* Flags */}
      <div className="flex flex-wrap gap-6">
        {[
          { name: "featured", label: "Featured", defaultChecked: product?.featured },
          { name: "trending", label: "Trending", defaultChecked: product?.trending },
          { name: "isWeekly", label: "Weekly Pick", defaultChecked: product?.isWeekly },
        ].map(({ name, label, defaultChecked }) => (
          <label key={name} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name={name}
              value="true"
              defaultChecked={defaultChecked}
              className="w-4 h-4 accent-[#D4AF37]"
            />
            <span className="text-[11px] uppercase tracking-widest font-bold text-gray-600">{label}</span>
          </label>
        ))}
      </div>

      {state?.error && (
        <p className="text-red-500 text-xs bg-red-50 border border-red-100 px-3 py-2">{state.error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending || uploading}
          className="bg-[#2F3131] text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors disabled:opacity-50"
        >
          {pending ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-200 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
