"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS, searchProducts } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import SortBar, { SortOption } from "@/components/SortBar";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-sm text-plum-400">Loading...</div>}>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const [term, setTerm] = useState(q);
  const [sort, setSort] = useState<SortOption>("featured");

  const results = useMemo(() => {
    if (!q) return [];
    if (q.toLowerCase() === "bestseller") return PRODUCTS.filter((p) => p.tags.includes("bestseller"));
    return searchProducts(q);
  }, [q]);

  const sorted = [...results].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <form onSubmit={handleSubmit} className="max-w-lg mb-8">
        <div className="relative">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for earrings, bangles, hair claws..."
            className="w-full border border-gold-200 rounded-full py-3 pl-5 pr-12 text-sm focus-ring bg-white"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#96602F" strokeWidth="1.6" />
              <path d="M21 21l-4-4" stroke="#96602F" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </form>

      {q ? (
        <>
          <h1 className="font-display text-2xl text-ink mb-1">Results for "{q}"</h1>
          <div className="mt-4">
            <SortBar value={sort} onChange={setSort} count={sorted.length} />
            <ProductGrid products={sorted} />
          </div>
        </>
      ) : (
        <p className="text-plum-400 text-sm">Try searching for "earrings", "bangles" or "kids".</p>
      )}
    </div>
  );
}
