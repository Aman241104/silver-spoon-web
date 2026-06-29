"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, X, Save, Plus, Wand2 } from "lucide-react";
import { useActionState } from "react";
import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase-browser";
import { upsertCollection } from "@/app/actions/collections";
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

export default function NewCollectionForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [slugEdited, setSlugEdited] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  function reset() {
    setTitle("");
    setSlug("");
    setSlugEdited(false);
    setImageUrl("");
    formRef.current?.reset();
    setOpen(false);
  }

  const [state, formAction, pending] = useActionState(
    async (prev: { error?: string } | undefined, formData: FormData) => {
      formData.set("image_url", imageUrl);
      const result = await upsertCollection(prev, formData);
      if (!result?.error) {
        toast("Collection created");
        reset();
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
      const filename = `collection-${Date.now()}.webp`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(filename, compressed, { contentType: "image/webp", upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(filename);
      setImageUrl(publicUrl);
    } catch (err) {
      toast("Image upload failed", "error");
      console.error(err);
    } finally {
      setUploading(false);
    }
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
        Add Collection
      </button>
    );
  }

  return (
    <div className="bg-white border border-[#D4AF37]/40 p-6 mb-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#2c2c2c]">New Collection</p>
        <button type="button" onClick={reset} className="text-gray-400 hover:text-[#2c2c2c] transition-colors">
          <X size={15} />
        </button>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Image preview */}
          <div className="relative w-28 h-20 bg-[#FAF8F5] border border-gray-100 shrink-0 overflow-hidden rounded-sm">
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
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] font-bold uppercase tracking-widest">
                No image
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            {/* Title first — drives the auto-slug */}
            <div>
              <label className={labelClass}>Title *</label>
              <input
                name="title"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slugEdited) setSlug(toSlug(e.target.value));
                }}
                placeholder="e.g. Rings Collection"
                className={inputClass}
              />
            </div>

            {/* Slug — auto-filled, can be overridden */}
            <div>
              <label className={labelClass}>
                URL ID *
                {!slugEdited && slug && (
                  <span className="ml-2 normal-case font-normal text-[#D4AF37] text-[9px] inline-flex items-center gap-0.5">
                    <Wand2 size={8} />
                    auto-generated
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                    setSlugEdited(true);
                  }}
                  placeholder="Fills automatically from title"
                  pattern="[a-z0-9-]+"
                  title="Lowercase letters, numbers, hyphens only"
                  className={inputClass}
                />
                {slugEdited && (
                  <button
                    type="button"
                    onClick={() => { setSlug(toSlug(title)); setSlugEdited(false); }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#2c2c2c] transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
              <p className="text-[9px] text-gray-400 mt-1">This is the unique ID used in the URL. Auto-filled — only change if needed.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Link URL</label>
                <input name="link_href" placeholder="/collections/rings" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Sort Order</label>
                <input name="sort_order" type="number" defaultValue={99} min={1} className={inputClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Image upload */}
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
              <Upload size={12} />
              {uploading ? "Uploading…" : "Upload"}
              <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} className="hidden" />
            </label>
          </div>
        </div>

        {state?.error && (
          <p className="text-red-500 text-xs bg-red-50 border border-red-100 px-3 py-2">{state.error}</p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-1 gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_active" value="true" defaultChecked className="w-4 h-4 accent-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">Visible on homepage</span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#2c2c2c] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending || uploading}
              className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-[#2F3131] text-white hover:bg-black transition-colors disabled:opacity-50"
            >
              <Save size={12} />
              {pending ? "Creating…" : "Create Collection"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
