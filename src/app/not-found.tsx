import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Diamond } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] font-sans flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-lg">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-[1px] w-12 bg-gray-300" />
            <Diamond size={10} className="text-[#D4AF37]" fill="currentColor" />
            <div className="h-[1px] w-12 bg-gray-300" />
          </div>

          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-bold mb-6">
            404 — Page Not Found
          </p>

          <h1 className="text-5xl md:text-7xl font-serif text-[#2c2c2c] mb-6 tracking-tight leading-tight">
            Lost in the <br />
            <span className="italic text-gray-400">collection?</span>
          </h1>

          <p className="text-gray-400 text-base leading-relaxed mb-12 max-w-sm mx-auto">
            The piece you&apos;re looking for seems to have been moved or doesn&apos;t exist.
            Let us guide you back.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#2F3131] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/products"
              className="border border-gray-200 text-[#2c2c2c] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
