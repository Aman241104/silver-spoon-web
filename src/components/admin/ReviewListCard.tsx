"use client";

import * as React from "react";
import { Star, Trash2 } from "lucide-react";
import { deleteReview, togglePublished } from "@/app/actions/reviews";
import { useToast } from "@/components/admin/ui/Toast";
import type { DbReview } from "@/lib/db";
import AdminToggle from "@/components/admin/ui/AdminToggle";

export default function ReviewListCard({ review }: { review: DbReview }) {
  const { toast } = useToast();
  const [published, setPublished] = React.useState(review.published);
  const [pending, setPending] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  async function handleToggle() {
    setPending(true);
    const next = !published;
    const result = await togglePublished(review.id, next);
    if (result?.error) toast(result.error, "error");
    else setPublished(next);
    setPending(false);
  }

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteReview(review.id);
    if (result?.error) {
      toast(result.error, "error");
      setDeleting(false);
    } else {
      toast("Review deleted");
    }
  }

  return (
    <div className="bg-white border border-gray-100 p-4 flex items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium text-[#2c2c2c]">{review.name}</p>
          <div className="flex text-[#D4AF37]">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{review.body}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <AdminToggle active={published} pending={pending} onClick={handleToggle} label="Published" />
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50"
          aria-label={`Delete review from ${review.name}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
