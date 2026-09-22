"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatINR, discountPercent } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import Rating from "./Rating";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wishlisted = isWishlisted(product.id);
  const off = discountPercent(product.price, product.mrp);

  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-blush">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.tags.includes("bestseller") && (
            <span className="absolute top-2 left-2 bg-ink text-ivory text-[10px] px-2 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {product.tags.includes("new") && (
            <span className="absolute top-2 left-2 bg-gold-500 text-ivory text-[10px] px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>
      </Link>
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-sm focus-ring"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "#5C2338" : "none"}>
          <path
            d="M12 20s-7-4.35-9.5-8.5C.8 8.1 2.4 5 5.6 5c1.9 0 3.3 1 4.4 2.5C11.1 6 12.5 5 14.4 5c3.2 0 4.8 3.1 3.1 6.5C19 15.65 12 20 12 20z"
            stroke="#5C2338"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <div className="mt-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-ink leading-snug line-clamp-1">{product.name}</h3>
        </Link>
        <div className="mt-1">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">{formatINR(product.price)}</span>
          {off > 0 && (
            <>
              <span className="text-xs text-plum-400 line-through">{formatINR(product.mrp)}</span>
              <span className="text-xs text-gold-600">{off}% off</span>
            </>
          )}
        </div>
        <button
          onClick={() => addToCart(product.id, product.colors[0])}
          className="mt-2 w-full text-xs border border-ink/20 rounded-full py-1.5 hover:bg-ink hover:text-ivory transition-colors focus-ring"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
