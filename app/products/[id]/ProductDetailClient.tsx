"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById, getRelatedProducts, getCategory } from "@/lib/data";
import { formatINR, discountPercent } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import Rating from "@/components/Rating";
import ReviewSection from "@/components/ReviewSection";
import RelatedProducts from "@/components/RelatedProducts";
import RecentlyViewed from "@/components/RecentlyViewed";

export default function ProductDetailClient({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted, recordView } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product?.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) recordView(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) return notFound();

  const category = getCategory(product.category);
  const off = discountPercent(product.price, product.mrp);
  const wishlisted = isWishlisted(product.id);
  const related = getRelatedProducts(product);

  function handleAddToCart() {
    addToCart(product!.id, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addToCart(product!.id, color, qty);
    router.push("/checkout");
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 text-xs text-plum-400">
        <Link href="/">Home</Link> / <Link href={`/categories/${product.category}`}>{category?.name}</Link> / <span className="text-ink">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-blush">
            <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover" priority />
          </div>
          <div className="flex gap-3 mt-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 focus-ring ${
                  activeImage === i ? "border-gold-500" : "border-transparent"
                }`}
              >
                <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          {product.tags.length > 0 && (
            <div className="flex gap-2 mb-3">
              {product.tags.map((t) => (
                <span key={t} className="text-[11px] uppercase tracking-wideish bg-blush text-plum-600 px-2 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-display text-3xl md:text-4xl text-ink">{product.name}</h1>
          <div className="mt-2">
            <a href="#reviews">
              <Rating value={product.rating} count={product.reviewCount} />
            </a>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold text-ink">{formatINR(product.price)}</span>
            {off > 0 && (
              <>
                <span className="text-plum-400 line-through">{formatINR(product.mrp)}</span>
                <span className="text-sm text-gold-600 font-medium">{off}% off</span>
              </>
            )}
          </div>
          <p className="text-xs text-plum-400 mt-1">Inclusive of all taxes</p>

          <p className="mt-5 text-sm text-plum-600 leading-relaxed max-w-md">{product.description}</p>

          {/* Colour */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink mb-2">Colour: {color}</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`text-xs rounded-full px-4 py-2 border transition-colors focus-ring ${
                    color === c ? "bg-ink text-ivory border-ink" : "border-gold-200 text-plum-900 hover:border-gold-500"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink mb-2">Quantity</p>
            <div className="inline-flex items-center border border-gold-200 rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 focus-ring" aria-label="Decrease quantity">
                −
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="w-9 h-9 focus-ring" aria-label="Increase quantity">
                +
              </button>
            </div>
            <span className="ml-3 text-xs text-plum-400">
              {product.stock > 10 ? "In stock" : `Only ${product.stock} left`}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 border border-ink text-ink rounded-full py-3 text-sm font-medium hover:bg-ink hover:text-ivory transition-colors focus-ring"
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-ink text-ivory rounded-full py-3 text-sm font-medium hover:bg-plum-600 transition-colors focus-ring"
            >
              Buy now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="w-12 rounded-full border border-gold-200 flex items-center justify-center focus-ring"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "#5C2338" : "none"}>
                <path
                  d="M12 20s-7-4.35-9.5-8.5C.8 8.1 2.4 5 5.6 5c1.9 0 3.3 1 4.4 2.5C11.1 6 12.5 5 14.4 5c3.2 0 4.8 3.1 3.1 6.5C19 15.65 12 20 12 20z"
                  stroke="#5C2338"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>

          {/* Details list */}
          <div className="mt-10 border-t border-gold-200 pt-6">
            <p className="text-sm font-medium text-ink mb-3">Material & care</p>
            <p className="text-sm text-plum-600 mb-3">{product.material}</p>
            <ul className="text-sm text-plum-600 space-y-1.5 list-disc list-inside">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ReviewSection product={product} />
      <RelatedProducts products={related} />
      <RecentlyViewed exclude={product.id} />
    </div>
  );
}
