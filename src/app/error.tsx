"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-6">
      <div className="text-center max-w-sm">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
          Something went wrong
        </p>
        <h1 className="text-3xl font-serif text-[#2c2c2c] mb-3">
          We hit a snag
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          This page couldn&apos;t load properly. Please try again — if the problem
          persists, contact us on WhatsApp.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-[#2F3131] text-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
