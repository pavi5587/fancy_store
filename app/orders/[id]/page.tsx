"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SAMPLE_ORDERS } from "@/lib/data";
import { formatINR } from "@/lib/format";
import { OrderStatus } from "@/lib/types";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: "placed", label: "Order placed" },
  { key: "packed", label: "Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "out-for-delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
];

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 md:px-8 py-10 text-sm text-plum-400">Loading...</div>}>
      <OrderTrackingInner params={params} />
    </Suspense>
  );
}

function OrderTrackingInner({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const justPlaced = searchParams.get("placed") === "1";

  const existing = SAMPLE_ORDERS.find((o) => o.id === params.id);
  const order =
    existing ||
    {
      id: params.id,
      date: new Date().toISOString().slice(0, 10),
      items: [],
      total: 0,
      status: "placed" as OrderStatus,
      address: { name: "Customer", line1: "—", city: "—", state: "—", pincode: "—", phone: "—" },
      eta: "within 5–7 business days",
    };

  const activeIndex = STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      {justPlaced && (
        <div className="bg-blush border border-gold-400 rounded-xl p-5 mb-8 text-center">
          <p className="font-display text-2xl text-ink mb-1">Order placed successfully</p>
          <p className="text-sm text-plum-600">Confirmation sent to your email. Your order ID is {order.id}.</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink">Order {order.id}</h1>
          <p className="text-sm text-plum-400">Placed on {order.date}</p>
        </div>
        <Link href="/account" className="text-sm text-plum-600 hover:text-gold-600">
          All orders
        </Link>
      </div>

      {/* Status timeline */}
      <div className="border border-gold-200 rounded-xl p-6 mb-10">
        <div className="flex justify-between relative">
          <div className="absolute top-3 left-0 right-0 h-0.5 bg-gold-200" />
          <div
            className="absolute top-3 left-0 h-0.5 bg-gold-500 transition-all"
            style={{ width: `${(activeIndex / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((step, i) => (
            <div key={step.key} className="relative z-10 flex flex-col items-center flex-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                  i <= activeIndex ? "bg-gold-500 text-ivory" : "bg-ivory border border-gold-200 text-plum-400"
                }`}
              >
                {i <= activeIndex ? "✓" : i + 1}
              </div>
              <p className={`text-[11px] mt-2 text-center max-w-[70px] ${i <= activeIndex ? "text-ink" : "text-plum-400"}`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-plum-600 mt-8">
          {order.status === "delivered" ? "Delivered" : `Expected delivery: ${order.eta}`}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-xl text-ink mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.length === 0 && <p className="text-sm text-plum-400">No item details available for this order.</p>}
            {order.items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-blush shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="text-ink">{item.name}</p>
                  <p className="text-plum-400 text-xs">Qty {item.quantity}</p>
                </div>
                <p className="text-sm text-ink">{formatINR(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          {order.total > 0 && (
            <div className="border-t border-gold-200 mt-4 pt-4 flex justify-between font-medium text-ink">
              <span>Total</span>
              <span>{formatINR(order.total)}</span>
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-xl text-ink mb-4">Delivery address</h2>
          <div className="text-sm text-plum-600 leading-relaxed">
            <p className="text-ink">{order.address.name}</p>
            <p>{order.address.line1}</p>
            <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
            <p>Phone: {order.address.phone}</p>
          </div>

          <div className="mt-6">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I have a question about order ${order.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm border border-ink rounded-full px-5 py-2 hover:bg-ink hover:text-ivory transition-colors"
            >
              Ask about this order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
