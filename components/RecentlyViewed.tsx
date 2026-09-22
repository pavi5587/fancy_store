"use client";

import { useStore } from "@/context/StoreContext";
import { getProductById } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function RecentlyViewed({ exclude }: { exclude?: string }) {
  const { recentlyViewed } = useStore();
  const products = recentlyViewed
    .filter((id) => id !== exclude)
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
      <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Recently viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
