"use client";

import * as React from "react";
import { useActionState } from "react";
import Image from "next/image";
import { Upload, X, Save } from "lucide-react";
import { useToast } from "@/components/admin/ui/Toast";
import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase-browser";
import { upsertCollection, deleteCollection } from "@/app/actions/collections";
import AdminDeleteButton from "@/components/admin/ui/AdminDeleteButton";
import type { DbCollection } from "@/lib/db";

interface Props {
  collection: DbCollection;
}

export default function CollectionEditCard({ collection }: Props) {
  const { toast } = useToast();
  const [deleted, setDeleted] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(collection.image_url ?? "");
  const [uploading, setUploading] = React.useState(false);

  const [state, formAction, pending] = useActionState(
    async (prev: { error?: string } | undefined, formData: FormData) => {
      formData.set("image_url", imageUrl);
      const result = await upsertCollection(prev, formData);
      if (!result?.error) {
        toast("Collection saved");
      } else {
        toast(result.error, "error");
      }
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
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp",
      });
      const supabase = createClient();
      const filename = `collection-${collection.slug}-${Date.now()}.webp`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(filename, compressed, { contentType: "image/webp", upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(filename);
      setImageUrl(publicUrl);
    } catch (err) {
      alert("Image upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    const result = await deleteCollection(collection.slug);
    if (result?.error) {
      toast(result.error, "error");
    } else {
      toast("Collection deleted");
      setDeleted(true);
    }
    return result;
  }

  const inputClass = "w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#2F3131] transition-colors bg-white";
  const labelClass = "text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1";

  if (deleted) return null;

  return (
    <div className="bg-white border border-gray-100 p-6">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="slug" value={collection.slug} />
        <input type="hidden" name="sort_order" value={collection.sort_order} />

        <div className="flex gap-5 items-start">
          <div className="relative w-28 h-20 bg-[#FAF8F5] border border-gray-100 shrink-0 overflow-hidden rounded-sm">
            {imageUrl ? (
              <>
                <Image src={imageUrl} alt={collection.title} fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-1 right-1 bg-red-400 text-white rounded-full w-4 h-4 flex items-center justify-center z-10"
                >
                  <X size={8} />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] font-bold uppercase tracking-widest">
                No image
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <label className={labelClass}>Title</label>
              <input name="title" required defaultValue={collection.title} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Link URL</label>
              <input name="link_href" defaultValue={collection.link_href} placeholder="/collections/rings" className={inputClass} />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Image</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste image URL or upload →"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className={`${inputClass} flex-1`}
            />
            <label className="shrink-0 border border-dashed border-gray-200 px-3 py-2 cursor-pointer hover:border-gray-300 transition-colors flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <Upload size={12} />
              {uploading ? "Uploading…" : "Upload"}
              <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} className="hidden" />
            </label>
          </div>
        </div>

        {state?.error && (
          <p className="text-red-500 text-xs bg-red-50 border border-red-100 px-3 py-2">{state.error}</p>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                value="true"
                defaultChecked={collection.is_active}
                className="w-4 h-4 accent-[#D4AF37]"
              />
              <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">Visible on homepage</span>
            </label>
            <AdminDeleteButton onConfirm={handleDelete} size={14} />
          </div>

          <button
            type="submit"
            disabled={pending || uploading}
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-[#2F3131] text-white hover:bg-black transition-colors disabled:opacity-50"
          >
            <Save size={12} />
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
