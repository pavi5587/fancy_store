import type { Metadata } from "next";
import Link from "next/link";
import { OFFERS, COUPONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Offers & Coupons",
  description: "Current deals and coupon codes at Aikya — festive discounts, free shipping, and bundle offers.",
};

export default function OffersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">Offers</h1>
      <p className="text-plum-400 text-sm mb-10">Everything live right now, in one place — no digging required.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-14">
        {OFFERS.map((o) => (
          <Link
            key={o.title}
            href={o.href}
            className="border border-gold-200 rounded-xl p-5 hover:border-gold-500 transition-colors"
          >
            <p className="font-display text-xl text-ink">{o.title}</p>
            <p className="text-sm text-plum-400 mt-1">{o.subtitle}</p>
          </Link>
        ))}
      </div>

      <h2 className="font-display text-2xl text-ink mb-5">Coupon codes</h2>
      <div className="space-y-3">
        {COUPONS.map((c) => (
          <div
            key={c.code}
            className="flex items-center justify-between border border-gold-200 rounded-xl p-5 bg-white"
          >
            <div>
              <p className="text-sm font-semibold text-ink tracking-wideish">{c.code}</p>
              <p className="text-sm text-plum-400 mt-1">{c.description}</p>
              <p className="text-xs text-plum-400 mt-0.5">Minimum order ₹{c.minOrder}</p>
            </div>
            <Link
              href="/cart"
              className="text-sm border border-ink rounded-full px-5 py-2 hover:bg-ink hover:text-ivory transition-colors shrink-0"
            >
              Use code
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
