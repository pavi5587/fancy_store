"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { getProductById } from "@/lib/data";
import { formatINR } from "@/lib/format";
import CouponInput from "@/components/CouponInput";
import { Coupon } from "@/lib/types";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const router = useRouter();

  const lines = cart
    .map((line) => ({ line, product: getProductById(line.productId) }))
    .filter((x): x is { line: typeof cart[0]; product: NonNullable<ReturnType<typeof getProductById>> } => Boolean(x.product));

  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.quantity, 0);
  const shipping = subtotal >= 599 || subtotal === 0 ? 0 : 49;
  const discount = coupon
    ? coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value
    : 0;
  const total = Math.max(0, subtotal - discount) + shipping;

  if (lines.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-ink mb-3">Your cart is empty</h1>
        <p className="text-plum-400 mb-6">Add a few pieces you love and they'll show up here.</p>
        <Link href="/" className="text-sm bg-ink text-ivory rounded-full px-6 py-3 hover:bg-plum-600 transition-colors">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-8">Your cart</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {lines.map(({ line, product }) => (
            <div key={`${product.id}-${line.color}`} className="flex gap-4 border-b border-gold-200 pb-6">
              <Link href={`/products/${product.id}`} className="relative w-24 h-24 rounded-lg overflow-hidden bg-blush shrink-0">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <Link href={`/products/${product.id}`}>
                      <p className="text-sm font-medium text-ink">{product.name}</p>
                    </Link>
                    {line.color && <p className="text-xs text-plum-400 mt-0.5">Colour: {line.color}</p>}
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id, line.color)}
                    className="text-xs text-plum-400 hover:text-plum-600 underline h-fit focus-ring"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center border border-gold-200 rounded-full">
                    <button
                      onClick={() => updateQuantity(product.id, line.color, line.quantity - 1)}
                      className="w-8 h-8 focus-ring"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm">{line.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, line.color, line.quantity + 1)}
                      className="w-8 h-8 focus-ring"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-medium text-ink">{formatINR(product.price * line.quantity)}</p>
                </div>
              </div>
            </div>
          ))}

          <CouponInput subtotal={subtotal} applied={coupon} onApply={setCoupon} onRemove={() => setCoupon(null)} />
        </div>

        <div className="border border-gold-200 rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl text-ink mb-4">Order summary</h2>
          <div className="space-y-2 text-sm text-plum-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-gold-600">
                <span>Coupon ({coupon?.code})</span>
                <span>− {formatINR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
          </div>
          <div className="border-t border-gold-200 mt-4 pt-4 flex justify-between font-medium text-ink">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="w-full mt-6 bg-ink text-ivory rounded-full py-3.5 text-sm font-medium hover:bg-plum-600 transition-colors focus-ring"
          >
            Proceed to checkout
          </button>
          <Link href="/" className="block text-center text-xs text-plum-400 mt-3 hover:text-plum-600">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
