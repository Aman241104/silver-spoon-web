"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
      <div className="text-center max-w-sm px-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-3">
          Admin Error
        </p>
        <h2 className="text-2xl font-serif text-[#2c2c2c] mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-400 text-sm mb-1">
          {error.message || "An unexpected error occurred."}
        </p>
        {error.digest && (
          <p className="text-[10px] font-mono text-gray-300 mb-6">
            ref: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="bg-[#2F3131] text-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
