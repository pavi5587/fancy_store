"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { getProductById } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const products = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-8">Your wishlist</h1>
      {products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-plum-400 mb-4">Nothing saved yet — tap the heart on any product to keep it here.</p>
          <Link href="/" className="text-sm border border-ink rounded-full px-5 py-2 hover:bg-ink hover:text-ivory transition-colors">
            Start browsing
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
