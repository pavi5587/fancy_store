"use client";

import { useState } from "react";
import Link from "next/link";
import { SAMPLE_ORDERS } from "@/lib/data";
import { formatINR } from "@/lib/format";
import { useStore } from "@/context/StoreContext";

const TABS = ["Orders", "Profile", "Addresses"] as const;

export default function AccountPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Orders");
  const { wishlist, cartCount } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-plum-900 text-ivory flex items-center justify-center font-display text-xl">
          A
        </div>
        <div>
          <h1 className="font-display text-2xl text-ink">Ananya R.</h1>
          <p className="text-sm text-plum-400">ananya.r@example.com</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-10">
        <Link href="/orders/AKY10234" className="border border-gold-200 rounded-xl p-4 text-center hover:border-gold-500">
          <p className="font-display text-2xl text-ink">{SAMPLE_ORDERS.length}</p>
          <p className="text-xs text-plum-400">Orders</p>
        </Link>
        <Link href="/wishlist" className="border border-gold-200 rounded-xl p-4 text-center hover:border-gold-500">
          <p className="font-display text-2xl text-ink">{wishlist.length}</p>
          <p className="text-xs text-plum-400">Wishlist</p>
        </Link>
        <Link href="/cart" className="border border-gold-200 rounded-xl p-4 text-center hover:border-gold-500">
          <p className="font-display text-2xl text-ink">{cartCount}</p>
          <p className="text-xs text-plum-400">In cart</p>
        </Link>
      </div>

      <div className="flex gap-6 border-b border-gold-200 mb-8">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm focus-ring ${
              tab === t ? "text-ink border-b-2 border-gold-500 font-medium" : "text-plum-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Orders" && (
        <div className="space-y-4">
          {SAMPLE_ORDERS.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between border border-gold-200 rounded-xl p-5 hover:border-gold-500 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-ink">Order {order.id}</p>
                <p className="text-xs text-plum-400">
                  Placed {order.date} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-ink">{formatINR(order.total)}</p>
                <p className="text-xs capitalize text-gold-600">{order.status.replace(/-/g, " ")}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {tab === "Profile" && (
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-xs text-plum-600 mb-1">Full name</label>
            <input defaultValue="Ananya R." className="input" />
          </div>
          <div>
            <label className="block text-xs text-plum-600 mb-1">Email</label>
            <input defaultValue="ananya.r@example.com" className="input" />
          </div>
          <div>
            <label className="block text-xs text-plum-600 mb-1">Phone</label>
            <input defaultValue="9876543210" className="input" />
          </div>
          <button className="text-sm bg-ink text-ivory rounded-full px-5 py-2.5 focus-ring">Save changes</button>
        </div>
      )}

      {tab === "Addresses" && (
        <div className="max-w-md border border-gold-200 rounded-xl p-5">
          <p className="text-sm font-medium text-ink mb-1">Home</p>
          <p className="text-sm text-plum-600 leading-relaxed">
            12, Lotus Apartments, 4th Cross
            <br />
            Madurai, Tamil Nadu 625001
            <br />
            Phone: 9876543210
          </p>
          <button className="text-xs text-plum-600 underline mt-3 focus-ring">Edit address</button>
        </div>
      )}
    </div>
  );
}
