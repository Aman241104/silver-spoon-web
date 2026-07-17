import { Suspense } from "react";
import { getAllReviews } from "@/lib/db";
import ReviewListCard from "@/components/admin/ReviewListCard";
import ReviewForm from "@/components/admin/ReviewForm";

async function ReviewList() {
  const reviews = await getAllReviews();
  if (reviews.length === 0) {
    return <p className="text-gray-400 text-sm py-8 text-center">No reviews yet — add one above.</p>;
  }
  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <ReviewListCard key={r.id} review={r} />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Customer Reviews</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage the &ldquo;Happy Customers&rdquo; section on the homepage.
          </p>
        </div>
        <ReviewForm />
      </div>
      <Suspense fallback={<div className="animate-pulse space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-white border border-gray-100" />)}</div>}>
        <ReviewList />
      </Suspense>
    </div>
  );
}
