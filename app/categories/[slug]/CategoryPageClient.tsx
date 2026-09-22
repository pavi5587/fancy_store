"use client";

import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getCategory, getProductsByCategory } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar, { Filters } from "@/components/FilterSidebar";
import SortBar, { SortOption } from "@/components/SortBar";

export default function CategoryPageClient({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  const products = useMemo(() => getProductsByCategory(params.slug), [params.slug]);

  const allColors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))),
    [products]
  );

  const [filters, setFilters] = useState<Filters>({ maxPrice: 1500, colors: [], minRating: 0 });
  const [sort, setSort] = useState<SortOption>("featured");

  if (!category) return notFound();

  const filtered = products.filter((p) => {
    if (p.price > filters.maxPrice) return false;
    if (filters.colors.length > 0 && !p.colors.some((c) => filters.colors.includes(c))) return false;
    if (p.rating < filters.minRating) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.tags.includes("new") ? 1 : 0) - (a.tags.includes("new") ? 1 : 0);
      default:
        return (b.tags.includes("bestseller") ? 1 : 0) - (a.tags.includes("bestseller") ? 1 : 0);
    }
  });

  return (
    <div>
      <div className="relative h-44 md:h-56 bg-plum-900 overflow-hidden">
        <Image src={category.image} alt={category.name} fill className="object-cover opacity-40" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center text-ivory">
          <h1 className="font-display text-4xl md:text-5xl">{category.name}</h1>
          <p className="text-plum-100/80 mt-1">{category.tagline}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row">
        <FilterSidebar
          allColors={allColors}
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters({ maxPrice: 1500, colors: [], minRating: 0 })}
        />
        <div className="flex-1 mt-8 md:mt-0">
          <SortBar value={sort} onChange={setSort} count={sorted.length} />
          <ProductGrid products={sorted} />
        </div>
      </div>
    </div>
  );
}
