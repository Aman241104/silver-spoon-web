"use client";

import * as React from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase-browser";
import { categories } from "@/data/products";
import type { DbOffer } from "@/lib/db";

const CATEGORY_OPTIONS = categories
  .filter(c => !["coins", "weekly-fast-moving"].includes(c.id))
  .map(c => ({ label: c.name, value: `/collections/${c.slug}` }));

function detectLinkMode(href?: string): "none" | "category" | "custom" {
  if (!href) return "none";
  if (CATEGORY_OPTIONS.some(o => o.value === href)) return "category";
  return "custom";
}

interface Props {
  offer?: DbOffer;
  action: (prev: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;
  submitLabel: string;
}

export default function OfferForm({ offer, action, submitLabel }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = React.useState(offer?.image_url ?? "");
  const [uploading, setUploading] = React.useState(false);

  const [linkMode, setLinkMode] = React.useState<"none" | "category" | "custom">(
    detectLinkMode(offer?.link_href)
  );
  const [categoryLink, setCategoryLink] = React.useState(
    CATEGORY_OPTIONS.some(o => o.value === offer?.link_href) ? (offer?.link_href ?? "") : ""
  );
  const [customLink, setCustomLink] = React.useState(
    detectLinkMode(offer?.link_href) === "custom" ? (offer?.link_href ?? "") : ""
  );

  const computedLinkHref =
    linkMode === "none" ? "" :
    linkMode === "category" ? categoryLink :
    customLink;

  const [state, formAction, pending] = useActionState(
    async (prev: { error?: string } | undefined, formData: FormData) => {
      formData.set("image_url", imageUrl);
      formData.set("link_href", computedLinkHref);
      const result = await action(prev, formData);
      if (!result?.error) router.push("/admin/offers");
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
      const filename = `offer-${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(filename, compressed, { contentType: "image/webp", upsert: false });
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

  const inputClass = "w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#2F3131] transition-colors bg-white";
  const labelClass = "text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1.5";

  return (
    <form action={formAction} className="space-y-6">
      {offer && <input type="hidden" name="id" value={offer.id} />}

      {/* Title + Subtitle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={labelClass}>Offer Title *</label>
          <input
            name="title"
            required
            defaultValue={offer?.title}
            placeholder="e.g. Monsoon Sale — Up to 20% Off"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description Line</label>
          <input
            name="subtitle"
            defaultValue={offer?.subtitle}
            placeholder="e.g. On select silverware collections"
            className={inputClass}
          />
          <p className="text-[10px] text-gray-400 mt-1">One short line shown below the title</p>
        </div>

        <div>
          <label className={labelClass}>Label Tag</label>
          <input
            name="badge_text"
            defaultValue={offer?.badge_text}
            placeholder="e.g. Sale / New Arrival / Limited Time"
            className={inputClass}
          />
          <p className="text-[10px] text-gray-400 mt-1">Small tag shown on the banner (optional)</p>
        </div>
      </div>

      {/* Link — simplified */}
      <div>
        <label className={labelClass}>Where does the button go?</label>
        <div className="flex gap-2 mb-2">
          {(["none", "category", "custom"] as const).map(mode => (
            <button
              key={mode}
              type="button"
              onClick={() => setLinkMode(mode)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                linkMode === mode
                  ? "border-[#2F3131] bg-[#2F3131] text-white"
                  : "border-gray-200 text-gray-400 hover:border-gray-300"
              }`}
            >
              {mode === "none" ? "No link" : mode === "category" ? "A category" : "Custom URL"}
            </button>
          ))}
        </div>

        {linkMode === "category" && (
          <select
            value={categoryLink}
            onChange={e => setCategoryLink(e.target.value)}
            className={inputClass}
          >
            <option value="">— Pick a category —</option>
            {CATEGORY_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        )}

        {linkMode === "custom" && (
          <input
            type="text"
            value={customLink}
            onChange={e => setCustomLink(e.target.value)}
            placeholder="e.g. /products or https://..."
            className={inputClass}
          />
        )}

        {linkMode === "none" && (
          <p className="text-[11px] text-gray-400 bg-gray-50 border border-gray-100 px-3 py-2">
            Banner is decorative — the button will be hidden.
          </p>
        )}
      </div>

      {/* Button text + Sort order */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Button Text</label>
          <input
            name="cta_text"
            defaultValue={offer?.cta_text ?? "Shop Now"}
            placeholder="Shop Now"
            className={inputClass}
          />
          <p className="text-[10px] text-gray-400 mt-1">Text shown on the button (e.g. Shop Now, View Collection)</p>
        </div>

        <div>
          <label className={labelClass}>Display Order</label>
          <input
            name="sort_order"
            type="number"
            min={0}
            defaultValue={offer?.sort_order ?? 0}
            className={inputClass}
          />
          <p className="text-[10px] text-gray-400 mt-1">Lower number = shows first on the page</p>
        </div>
      </div>

      {/* Banner Image */}
      <div>
        <label className={labelClass}>Banner Image (Optional)</label>
        <div className="flex gap-4 items-start">
          {imageUrl && (
            <div className="relative w-36 h-20 bg-[#FAF8F5] border border-gray-100 shrink-0 overflow-hidden rounded-sm">
              <Image src={imageUrl} alt="Preview" fill className="object-cover" unoptimized />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute -top-1.5 -right-1.5 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                <X size={10} />
              </button>
            </div>
          )}
          <label className="flex-1 border-2 border-dashed border-gray-200 rounded-sm p-5 text-center cursor-pointer hover:border-gray-300 transition-colors">
            <Upload size={18} className="mx-auto text-gray-300 mb-2" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-gray-400 block">
              {uploading ? "Uploading…" : "Click to upload image"}
            </span>
            <span className="text-[10px] text-gray-300 mt-1 block">Auto-compressed to WebP</span>
            <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} className="hidden" />
          </label>
        </div>
        <input
          type="text"
          placeholder="Or paste image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className={`${inputClass} mt-2`}
        />
      </div>

      {/* Active toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="is_active"
          value="true"
          defaultChecked={offer ? offer.is_active : true}
          className="w-4 h-4 accent-[#D4AF37]"
        />
        <span className="text-[11px] uppercase tracking-widest font-bold text-gray-600">
          Active (visible on homepage)
        </span>
      </label>

      {state?.error && (
        <p className="text-red-500 text-xs bg-red-50 border border-red-100 px-3 py-2">{state.error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending || uploading}
          className="bg-[#2F3131] text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : submitLabel}
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
