"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import Rating from "./Rating";

export default function ReviewSection({ product }: { product: Product }) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = product.reviews.filter((r) => Math.round(r.rating) === star).length;
    const pct = product.reviews.length ? Math.round((count / product.reviews.length) * 100) : 0;
    return { star, count, pct };
  });

  return (
    <section id="reviews" className="max-w-7xl mx-auto px-4 md:px-8 py-14 border-t border-gold-200">
      <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">Reviews & ratings</h2>

      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl text-ink">{product.rating.toFixed(1)}</span>
            <Rating value={product.rating} size={16} />
          </div>
          <p className="text-sm text-plum-400 mt-1">Based on {product.reviewCount} ratings</p>

          <div className="mt-5 space-y-1.5">
            {breakdown.map((b) => (
              <div key={b.star} className="flex items-center gap-2 text-xs text-plum-400">
                <span className="w-8">{b.star} star</span>
                <div className="flex-1 h-1.5 bg-blush rounded-full overflow-hidden">
                  <div className="h-full bg-gold-500" style={{ width: `${b.pct}%` }} />
                </div>
                <span className="w-6 text-right">{b.count}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowForm((v) => !v)}
            className="mt-6 text-sm border border-ink rounded-full px-5 py-2 hover:bg-ink hover:text-ivory transition-colors focus-ring"
          >
            Write a review
          </button>

          {showForm && !submitted && (
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <textarea
                required
                placeholder="Share your experience with this product..."
                className="w-full border border-gold-200 rounded-lg p-3 text-sm h-24 focus-ring"
              />
              <button type="submit" className="text-sm bg-ink text-ivory rounded-full px-5 py-2 focus-ring">
                Submit review
              </button>
            </form>
          )}
          {submitted && <p className="mt-4 text-sm text-gold-600">Thanks — your review has been submitted for moderation.</p>}
        </div>

        <div className="md:col-span-2 space-y-6">
          {product.reviews.length === 0 && (
            <p className="text-sm text-plum-400">No reviews yet. Be the first to share your experience.</p>
          )}
          {product.reviews.map((r) => (
            <div key={r.id} className="border-b border-gold-200 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-ink">{r.author}</span>
                  {r.verified && <span className="text-[10px] text-gold-600 border border-gold-400 rounded-full px-2 py-0.5">Verified buyer</span>}
                </div>
                <span className="text-xs text-plum-400">{r.date}</span>
              </div>
              <div className="mt-1"><Rating value={r.rating} size={12} /></div>
              <p className="mt-2 text-sm font-medium text-ink">{r.title}</p>
              <p className="mt-1 text-sm text-plum-400 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
