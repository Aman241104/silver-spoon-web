"use client";

import * as React from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { nextIndex } from "@/lib/reviewRotation";
import type { DbReview } from "@/lib/db";

const ROTATE_MS = 6000;

export default function HappyCustomers({ reviews }: { reviews: DbReview[] }) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => nextIndex(i, reviews.length, 1));
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, reviews.length]);

  if (reviews.length === 0) return null;
  const review = reviews[index];

  return (
    <section className="bg-[#111827] py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Happy Customers
          </h2>
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote size={64} className="text-[#D4AF37]/20 absolute -top-6 left-0 md:-left-10" strokeWidth={1} />

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="text-center px-4 md:px-8"
            >
              <div className="flex justify-center gap-1 mb-6 text-[#D4AF37]">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-lg md:text-2xl text-white/90 font-serif leading-relaxed mb-8 italic">
                &ldquo;{review.body}&rdquo;
              </p>
              <p className="text-[11px] uppercase tracking-widest font-bold text-[#D4AF37]">
                {review.name}
              </p>
            </motion.div>
          </AnimatePresence>

          {reviews.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setIndex((i) => nextIndex(i, reviews.length, -1))}
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-14 text-white/40 hover:text-white transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={28} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => nextIndex(i, reviews.length, 1))}
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-14 text-white/40 hover:text-white transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={28} strokeWidth={1.5} />
              </button>

              <div className="flex justify-center gap-2 mt-10">
                {reviews.map((r, i) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-[#D4AF37]" : "w-1.5 bg-white/25 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
